<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab">
      <cmp-card :ghost="true" class="padding-bottom-line-16">
        <cmp-query :opts="optsTab1" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
      </cmp-card>
      <cmp-card :ghost="true" class="padding-top-noline-16 padding-bottom-line-0">
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
            <t-button theme="primary">复检</t-button>
          </template>
          <template #op="rowData">
            <t-space>
              <t-link
                v-if="rowData.row.inspectResult === 'UNINSPECT' || _.isEmpty(rowData.row.iqcBillNo)"
                theme="primary"
                @click="onShowDialog(true, rowData)"
                >检验</t-link
              >
            </t-space>
          </template>

          <template #iqcBillNo="rowData">
            <t-space>
              <t-link theme="primary" @click="onShowDialog(false, rowData)">{{ rowData.row.iqcBillNo }}</t-link>
            </t-space>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-card>
  </cmp-container>

  <!--弹窗-->
  <formInspect ref="formRef" @parent-refresh-event="fetchTable"></formInspect>
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
    mitemCategoryId: '',
    mitemId: '',
    iqcBillNo: '',
    billNo: '',
    inspectGroupId: '',
  },
});

const inspectGroupOption = ref([{ label: '全部', value: '' }]);
const optsTab1 = computed(() => {
  return {
    inspectGroupId: {
      label: '检验组',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectGroupOption.value,
        lazyLoad: true,
      },
      row: 1,
    },
    billNo: {
      label: '接收单号', // 来料接收单号
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'billInfo',
        showTitle: false,
      },
      row: 1,
    },
    dateRange: {
      label: '接收日期', // 来料接收单接收时间
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 1,
    },
    mitemCategoryId: {
      label: '物料类别',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
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
    iqcBillNo: {
      label: '检验单号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      row: 2,
    },
  };
});
const inspectStatusOption = ref([]);
const iqcHandleMethodOption = ref([]);

const waitInspectDataTotal = ref(0);
const waitInspectData = ref([]);
const waitInspectColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { title: '检验单号', width: 160, colKey: 'iqcBillNo' },
  { title: '接收单号', width: 160, colKey: 'billNo' },
  { title: '物料类别', width: 160, colKey: 'mitemCategoryName' },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料描述', width: 160, colKey: 'mitemDesc' },
  { title: '供应商', width: 160, colKey: 'supplierName' },
  { title: '严格度', width: 160, colKey: 'inspectionStringencyName' },
  { title: '接收批量', width: 160, colKey: 'pickQty' },
  { title: '单位', width: 160, colKey: 'uomName' },
  { title: '接收人', width: 160, colKey: 'userReceiptedDisplayName' },
  { title: '接收时间', width: 200, colKey: 'datetimeReceipted' },
  { title: '停留时长', width: 160, colKey: 'waitTime' },
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
  formData.queryData.mitemCategoryId = query.mitemCategoryId;
  formData.queryData.inspectGroupId = query.inspectGroupId;
  formData.queryData.mitemId = query.mitemId;
  formData.queryData.billNo = query.billNo;
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
    // const list = await apiQuality.iqcInspect.getMitemReceiveBillVo({
    //   pageNum: pageTab1.value.page,
    //   pageSize: pageTab1.value.rows,
    //   prefix: 'PA',
    //   beginDatetimeRecheck: formData.queryData.beginDatetimeRecheck,
    //   endDatetimeRecheck: formData.queryData.endDatetimeRecheck,
    //   mitemCategoryId: formData.queryData.mitemCategoryId,
    //   inspectGroupId: formData.queryData.inspectGroupId,
    //   mitemId: formData.queryData.mitemId,
    //   iqcBillNo: formData.queryData.iqcBillNo,
    //   billNo: formData.queryData.billNo,
    // });
    // waitInspectData.value = list.list;
    // waitInspectDataTotal.value = list.total;
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
