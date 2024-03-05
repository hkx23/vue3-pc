<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="optsTab1" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageTab1"
        row-key="id"
        :hover="false"
        :stript="false"
        :table-column="waitInspectColumns"
        active-row-type="single"
        :table-data="waitInspectData"
        :total="waitInspectDataTotal"
        :loading="loading"
        :resizable="true"
        :selected-row-keys="selectWaitId"
        @select-change="onSelectWaitInspectChange"
        @refresh="fetchTable"
      >
        <template #title> 工作台 </template>
        <template #button>
          <t-button theme="primary">新增复检</t-button>
        </template>
        <template #op="rowData">
          <t-space>
            <t-link
              v-if="rowData.row.inspectResult === 'UNINSPECT' || _.isEmpty(rowData.row.recheckBillNo)"
              theme="primary"
              @click="onShowDialog(true, rowData)"
              >复检</t-link
            >
          </t-space>
        </template>

        <template #recheckBillNo="rowData">
          <t-space>
            <t-link theme="primary" @click="onShowDialog(false, rowData)">{{ rowData.row.recheckBillNo }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!--弹窗-->
  <formInspect ref="formRef" @parent-refresh-event="fetchTable" @form-close-event="onFormCloseDialog"></formInspect>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formInspect from './formInspect.vue';

const formRef = ref(null);

const { loading } = useLoading();
const { pageUI: pageTab1 } = usePage();
const initialDate = ref(1);

const selectWaitId = ref([]);
const formData = reactive({
  queryData: {
    beginDatetimeRecheck: '',
    endDatetimeRecheck: '',
    personResponsibilityId: '',
    mitemId: '',
    supplierId: '',
    iqcBillNo: '',
    recheckBillNo: '',
  },
});

const inspectGroupOption = ref([{ label: '全部', value: '' }]);
const optsTab1 = computed(() => {
  return {
    dateRange: {
      label: '复检时间', // 来料接收单接收时间
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 1,
    },
    recheckBillNo: {
      label: '复检单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'reCheckBill',
        showTitle: false,
      },
      row: 1,
    },
    supplierId: {
      label: '供应商',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
      },
      row: 2,
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
      row: 2,
    },
    personResponsibilityId: {
      label: '报检人',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
      row: 2,
    },
    iqcBillNo: {
      label: '检验单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'IqcBillInfo',
        showTitle: false,
      },
      row: 2,
    },
  };
});
const inspectStatusOption = ref([]);
const iqcHandleMethodOption = ref([]);

const waitInspectDataTotal = ref(0);
const waitInspectData = ref([]);
const waitInspectColumns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 50,
  // },
  { title: '复检单号', width: 160, colKey: 'recheckBillNo' },
  { title: '复检类型', width: 100, colKey: 'reCheckTypeName' },
  { title: '来源检验单', width: 160, colKey: 'iqcBillNo' },
  { title: '物料类别', width: 160, colKey: 'mitemCategoryName' },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料描述', width: 160, colKey: 'mitemDesc' },
  { title: '供应商', width: 160, colKey: 'supplierName' },
  { title: '严格度', width: 100, colKey: 'inspectionStringencyName' },
  { title: '批量', width: 100, colKey: 'inspectQty' },
  { title: '报检人', width: 100, colKey: 'displayName' },
  { title: '报检时间', width: 200, colKey: 'timeCreate' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

const getIqcInspectionStatus = async () => {
  inspectStatusOption.value = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_INSPECTION_STATUS',
  });

  inspectStatusOption.value.push({ value: '', label: '全部' });
  data.forEach((item) => {
    inspectStatusOption.value.push({ value: item.value, label: item.label });
  });
};
const getIqcHandleMethod = async () => {
  iqcHandleMethodOption.value = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_IQC_HANDLE_METHOD',
  });

  iqcHandleMethodOption.value.push({ value: '', label: '全部' });
  data.forEach((item) => {
    iqcHandleMethodOption.value.push({ value: item.value, label: item.label });
  });
};
const conditionEnter = (query: any) => {
  const [dateRangeStart, dateRangeEnd] = query.dateRange;

  // 计算日期范围的天数差异
  const daysDifference = dayjs(dateRangeEnd).diff(dayjs(dateRangeStart), 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
    return;
  }

  formData.queryData.beginDatetimeRecheck = dateRangeStart;
  formData.queryData.endDatetimeRecheck = dateRangeEnd;
  formData.queryData.personResponsibilityId = query.personResponsibilityId;
  formData.queryData.mitemId = query.mitemId;
  formData.queryData.supplierId = query.supplierId;
  formData.queryData.recheckBillNo = query.recheckBillNo;
  formData.queryData.iqcBillNo = query.iqcBillNo;

  fetchTable();
};
const onReset = () => {
  formData.queryData.beginDatetimeRecheck = dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD');
  formData.queryData.endDatetimeRecheck = dayjs().format('YYYY-MM-DD');

  fetchTable();
};
const getInspectGroupByUser = async () => {
  try {
    const list = await apiQuality.inspectGroup.getInspectGroupByUser();
    list.forEach((item) => {
      inspectGroupOption.value.push({ label: item.inspectGroupName, value: item.id });
    });
  } catch (e) {
    console.log(e);
  }
};
const fetchTable = async () => {
  try {
    const list = await apiQuality.iqcInspectRecheck.getIqcInspectBillVoByRecheck({
      pageNum: pageTab1.value.page,
      pageSize: pageTab1.value.rows,
      recheckBillNo: formData.queryData.recheckBillNo,
      iqcBillNo: formData.queryData.iqcBillNo,
      beginDatetimeRecheck: formData.queryData.beginDatetimeRecheck,
      endDatetimeRecheck: formData.queryData.endDatetimeRecheck,
      personResponsibilityId: formData.queryData.personResponsibilityId,
      mitemId: formData.queryData.mitemId,
      supplierId: formData.queryData.supplierId,
    });

    waitInspectData.value = list.list;
    waitInspectDataTotal.value = list.total;
  } catch (e) {
    console.log(e);
  }
};
const pageInit = async () => {
  getInspectGroupByUser();
  getIqcHandleMethod();
  getIqcInspectionStatus();
};
const onSelectWaitInspectChange = (value: any) => {
  selectWaitId.value = value;
};
const onShowDialog = async (isEdit, rowData) => {
  const { showForm, loadTable } = formRef.value;
  await showForm(isEdit, rowData.row);
  await loadTable();
};
const onFormCloseDialog = async () => {
  fetchTable();
};

onMounted(() => {
  pageInit().then(() => {
    fetchTable();
  });
});
</script>

<style lang="less" scoped>
:deep .t-table__row--active {
  background-color: var(--td-brand-color-light) !important;
}
</style>
