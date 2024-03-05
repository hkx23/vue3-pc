<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="optsTab1" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
    </cmp-card>
    <cmp-card :span="12">
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
          <t-button theme="primary" @click="onShowDialog(true, null)">报检</t-button>
          <t-button theme="default" :disabled="selectWaitId?.length == 0" @click="onHandlDeleteBillInfo">删除</t-button>
          <t-button theme="default" :disabled="selectWaitId?.length == 0" @click="onHandlePrint">打印</t-button>
          <t-button theme="default">启动品质改善</t-button>
        </template>
        <template #op="rowData">
          <!--：UNSUBMIT 待提报、INSPECT 待检验-->
          <t-space>
            <t-link
              v-if="rowData.row.status === 'UNSUBMIT' || rowData.row.status === 'INSPECT'"
              theme="primary"
              @click="onShowDialog(true, rowData)"
              >编辑</t-link
            >
          </t-space>
          <t-space>
            <t-link v-if="rowData.row.status === 'INSPECT'" theme="primary" @click="onShowDialog(true, rowData)"
              >检验</t-link
            >
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!--弹窗-->
  <formInspect ref="formRef" @parent-refresh-event="fetchTable"></formInspect>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formInspect from './formInspect.vue';
import { useLang } from './lang';

const { t } = useLang();
const formRef = ref(null);

const { loading } = useLoading();
const { pageUI: pageTab1 } = usePage();
const selectWaitId = ref([]);
// enum OperatorType {
//   BJ = 'BJ', // 报检
//   JY = 'JY', // 检验
//   DELETE = 'DELETE', // 删除
//   PRINT = 'PRINT', // 打印
// }
const datePlanRangeDefault = ref([
  dayjs().format('YYYY-MM-DD 00:00:00'),
  dayjs().subtract(-31, 'day').format('YYYY-MM-DD 23:59:59'),
]); // 初始化日期控件
const optsValue = ref({
  datePlanRange: datePlanRangeDefault.value,
  dateRangeCreate: datePlanRangeDefault.value,
}) as any;

const inspectGroupOption = ref([{ label: '全部', value: '' }]);
// 待检验
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
    },
    billNo: {
      label: '检验单号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    moScheId: {
      label: t('productInspection.moScheId'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('productInspection.moScheId')}`]),
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
    },
    inspectCategory: {
      label: '检验类型',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectCategoryOption.value,
        lazyLoad: true,
      },
    },
    isStartImprove: {
      label: '是否发起品质改善',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: YNOption.value,
        lazyLoad: true,
      },
    },
    inspectUserId: {
      label: '报检员',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'person',
        showTitle: false,
      },
    },
    inspectResult: {
      label: '单据状态',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: OKNGOption.value,
        lazyLoad: true,
      },
    },
    dateRange: {
      label: '检验日期', // 检验日期
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },
    dateRangeCreate: {
      label: '创建日期', // 创建日期
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },
    status: {
      label: '单据状态',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectStatusOption.value,
        lazyLoad: true,
      },
    },
  };
});

const inspectCategoryOption = ref([
  { value: '', label: '全部' },
  { value: 'RANDOM', label: '抽检' },
  { value: 'RECHECK', label: '复检' },
  { value: 'INCREASE', label: '加抽' },
  { value: 'REWORK', label: '返工' },
]);

const YNOption = ref([
  { value: '', label: '全部' },
  { value: '1', label: '是' },
  { value: '0', label: '否' },
]);

const OKNGOption = ref([
  { value: '', label: '全部' },
  { value: 'OK', label: '合格' },
  { value: 'NG', label: '不合格' },
]);

const inspectStatusOption = ref([]);
const oqcHandleMethodOption = ref([]);

const waitInspectDataTotal = ref(0);
const waitInspectData = ref([]);
const waitInspectColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { title: '检验单号', width: 160, colKey: 'billNo' },
  { title: '检验类型', width: 160, colKey: 'inspectCategoryName' },
  { title: '业务类型', width: 160, colKey: 'inspectCategoryName' },
  { title: '关联检验单号', width: 160, colKey: 'relateBillNo' },
  { title: '报检时间', width: 160, colKey: 'timeCreate' },
  { title: '检验完成时间', width: 160, colKey: 'datetimeInspect' },
  { title: '排产工单号', width: 160, colKey: 'scheCode' },
  { title: '产品编码', width: 160, colKey: 'mitemCode' },
  { title: '产品描述', width: 160, colKey: 'mitemDesc' },
  { title: '车间', width: 160, colKey: 'workShopName' },
  { title: '报检数量', width: 200, colKey: 'qty' },
  { title: '已检数量', width: 160, colKey: 'inspectQty' },
  { title: '检验结果', width: 160, colKey: 'inspectResultName' },
  { title: '单据状态', width: 160, colKey: 'statusName' },
  { title: '单据创建时间', width: 160, colKey: 'timeCreate' },
  { title: '单据创建人', width: 160, colKey: 'displayName' },
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
  oqcHandleMethodOption.value = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_IQC_HANDLE_METHOD',
  });

  oqcHandleMethodOption.value.push({ value: '', label: '全部' });
  data.forEach((item) => {
    oqcHandleMethodOption.value.push({ value: item.value, label: item.label });
  });
};
const conditionEnter = (query: any) => {
  // // 计算日期范围的天数差异
  // const daysDifference = dayjs(dateRangeEnd).diff(dayjs(dateRangeStart), 'day');
  // // 如果选择的天数超过31天，则调整日期范围
  // if (daysDifference > 31) {
  //   // 将结束日期调整为开始日期的后31天
  //   MessagePlugin.warning('日期跨度不得超过31天');
  //   return;
  // }
  optsValue.value = query;
  const [dateRangeStart, dateRangeEnd] = query.dateRange;
  const [dateRangeCreateStart, dateRangeCreateEnd] = query.dateRangeCreate;
  optsValue.value.beginDatetimeInspection = dateRangeStart;
  optsValue.value.endDatetimeInspection = dateRangeEnd;
  optsValue.value.beginDatetimeCreate = dateRangeCreateStart;
  optsValue.value.endDatetimeCreate = dateRangeCreateEnd;
  fetchTable();
};
const onReset = () => {
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
    const list = await apiQuality.oqcInspect.getOqcInspectDtlFullBillList({
      pageNum: pageTab1.value.page,
      pageSize: pageTab1.value.rows,
      ...optsValue.value,
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

const onShowDialog = async (isEdit: boolean, rowData: any) => {
  const { showForm, loadTable } = formRef.value;
  await showForm(isEdit, rowData.row);
  await loadTable();
};

// 删除
const onHandlDeleteBillInfo = async () => {
  checkSelected();
  const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);
  for (let index = 0; index < selectKeys.length; index++) {
    const element = selectKeys[index];
    if (!(element.status === 'INSPECT' || element.status === 'UNSUBMIT')) {
      MessagePlugin.error('只有状态为待提报、待检验的单据才允许操作.');
      return;
    }
  }
  await apiQuality.oqcInspect.deleteList({
    cancelledIds: selectKeys,
  });
  fetchTable();
};

// 打印
const onHandlePrint = async () => {
  checkSelected();
  const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);
  for (let index = 0; index < selectKeys.length; index++) {
    const element = selectKeys[index];
    if (!(element.status === 'COMPLETED')) {
      MessagePlugin.error('只有状态为已完成的单据才允许操作.');
      return;
    }
  }
  await apiQuality.oqcInspect.deleteList({
    cancelledIds: selectKeys,
  });
  fetchTable();
};

const checkSelected = () => {
  if (selectWaitId.value.length <= 0) {
    MessagePlugin.error('请勾选单据信息.');
    return false;
  }
  return true;
};

onMounted(() => {
  pageInit().then(() => {
    fetchTable();
  });
});
</script>

<style lang="less" scoped></style>
