<template>
  <cmp-container :full="true">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="产品维修台账" style="background: var(--td-bg-color-page)" :destroy-on-hide="false">
        <cmp-container :full="true">
          <cmp-card>
            <cmp-query :opts="opts" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
          </cmp-card>
          <cmp-card>
            <cmp-table
              v-model:pagination="pageTab1"
              row-key="id"
              :hover="false"
              :stript="false"
              :table-column="repairColumns"
              active-row-type="single"
              :table-data="repairData"
              :total="repairDataTotal"
              :loading="loading"
              :resizable="true"
              @select-change="onSelectRepairChange"
              @active-change="onActiveChange"
              @refresh="fetchTable"
            >
              <template #button>
                <t-button theme="primary" @click="onBatchRepairing">批量维修</t-button>
              </template>
              <template #op="slotProps">
                <t-space>
                  <t-link theme="primary" @click="onRepairRowClick(slotProps)">{{ t('productRepair.Repair') }}</t-link>
                </t-space>
              </template>
            </cmp-table>
          </cmp-card>
          <cmp-card>
            <cmp-table
              :show-pagination="false"
              row-key="id"
              :table-column="repairDtlColumns"
              :table-data="repairDtlData"
              :loading="loading"
              :resizable="true"
              @refresh="fetchDtlTable"
            >
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </t-tab-panel>
      <t-tab-panel
        :value="2"
        label="产品维修工作台"
        style="background: var(--td-bg-color-page)"
        :destroy-on-hide="false"
      >
        <cmp-container :full="true">
          <cmp-card>
            <cmp-table
              v-model:pagination="pageTab2"
              row-key="id"
              :hover="false"
              :stript="false"
              :table-column="repairingColumns"
              active-row-type="single"
              :table-data="repairingData"
              :total="repairingDataTotal"
              :loading="loading"
              :resizable="true"
              @select-change="onSelectRepairingChange"
              @refresh="fetchRepairingTable"
            >
              <!-- <template #op="slotProps"> -->
              <template #op="slotProps">
                <t-space>
                  <t-link theme="primary" @click="onDeleteClick(slotProps)">{{ t('productRepair.UnRepair') }}</t-link>
                </t-space>
              </template>
            </cmp-table>
          </cmp-card>
          <cmp-card :ghost="true">
            <cmp-row>
              <cmp-card :span="4">
                <div style="margin-bottom: 10px">缺陷原因</div>
                <t-radio-group
                  v-model="formData.queryData.checkedDefectReason"
                  style="
                    display: flex;
                    flex-direction: column;
                    overflow: auto;
                    height: calc(20vh);
                    align-items: flex-start;
                  "
                  :options="formData.queryData.defectReasonOptions"
                />
              </cmp-card>
              <cmp-card :span="4">
                <div style="margin-bottom: 10px">处理方法</div>
                <t-checkbox-group
                  v-model="formData.queryData.checkedDefectDealMethod"
                  style="
                    display: flex;
                    flex-direction: column;
                    overflow: auto;
                    height: calc(20vh);
                    align-items: flex-start;
                  "
                  :options="formData.queryData.defectDealMethodOptions"
                />
              </cmp-card>
              <cmp-card :span="4"
                ><div style="margin-bottom: 10px">责任别</div>
                <t-radio-group
                  v-model="formData.queryData.checkedDefectBlame"
                  style="
                    display: flex;
                    flex-direction: column;
                    overflow: auto;
                    height: calc(20vh);
                    align-items: flex-start;
                  "
                  :options="formData.queryData.defectBlameOptions"
                />
              </cmp-card>
            </cmp-row>
          </cmp-card>
          <cmp-card>
            <cmp-row>
              <cmp-card :span="4">
                <bcmp-select-business
                  v-model="formData.queryData.returnRoutingProcessId"
                  type="routingProcess"
                  placeholder="请选择回流工序"
                  :show-title="false"
                />
                <!-- :parent-id="formData.queryData.routingRevisionId" -->
              </cmp-card>
              <cmp-card :span="4">
                <t-checkbox v-model="formData.queryData.isScrapped" label="是否报废" />
              </cmp-card>
              <cmp-card :span="4">
                <t-button content="维修完成" @click="onSubmit" />
                <t-button content="重置" @click="onReset" />
              </cmp-card>
            </cmp-row>
          </cmp-card>
        </cmp-container>
      </t-tab-panel>
    </t-tabs>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
// import { DialogPlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiControl, WipRepairDtlVO, WipRepairVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
// import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import { useUserStore } from '@/store';

import { useLang } from './lang';

const { t } = useLang(); // 使用多语言
const userStore = useUserStore();
const { loading } = useLoading();
const { pageUI: pageTab1 } = usePage();
const { pageUI: pageTab2 } = usePage();
const repairDataTotal = ref(0);
const repairingDataTotal = ref(0);
const initialDate = ref(1);
const selectRepairId = ref([]); // 待维修的主表数据
const selectRepairingId = ref([]); // 维修中选中的明细数据
const selectWipRepairingId = ref([]); // 维修中选中的主表
const selectRepairRowId = ref(null);
const formData = reactive({
  queryData: {
    beginDate: dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    moScheId: '',
    mitemId: '',
    mitemCode: '',
    mitemName: '',
    barcode: '',
    isRepair: '',
    routingRevisionId: '',
    processId: userStore.currUserOrgInfo.processId,
    processCode: userStore.currUserOrgInfo.processCode,
    processName: userStore.currUserOrgInfo.processName,
    workCenterId: userStore.currUserOrgInfo.workCenterId,
    workCenterCode: userStore.currUserOrgInfo.workCenterCode,
    workCenterName: userStore.currUserOrgInfo.workCenterName,
    isRepairOptions: [{ value: 'REPAIRED', label: '已返修' }],
    checkedDefectDealMethod: [],
    defectDealMethodOptions: [],
    checkedDefectReason: '',
    defectReasonOptions: [],
    checkedDefectBlame: '',
    defectBlameOptions: [],
    returnRoutingProcessId: '',
    isScrapped: false,
    wipRepairIds: [],
  },
});

// const defectDealMethodOptions = ref([]);
// const checkedDefectDealMethodOptions = ref([]);
// 查询组件
const opts = computed(() => {
  return {
    dateRange: {
      label: '返工日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 1,
    },
    moScheId: {
      label: '排产工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
      row: 1,
    },
    barcode: {
      label: '条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      row: 2,
    },
    isRepair: {
      label: '已返修',
      comp: 't-checkbox-group',
      defaultVal: [],
      bind: {
        options: formData.queryData.isRepairOptions,
        lazyLoad: true,
      },
      row: 2,
    },
  };
});
const repairData = ref<WipRepairVO[]>([]);
const repairColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    // type: 'single',
    type: 'multiple',
    // checkProps: { allowUncheck: true }, // 允许单选(Radio)取消行选中
    width: 50,
  },
  { title: t('business.main.serialNumber'), colKey: 'serial-number', width: 74 },
  { title: t('business.control.scanBarcode'), width: 160, colKey: 'scanBarcode' },
  { title: t('business.control.moScheCode'), width: 160, colKey: 'moScheCode' },
  { title: t('business.control.productCode'), width: 160, colKey: 'mitemCode' },
  { title: t('business.control.productName'), width: 160, colKey: 'mitemName' },
  { title: t('business.control.fromRoutingProcessName'), width: 160, colKey: 'fromRoutingProcessName' },
  { title: t('business.control.fromWorkstationName'), width: 160, colKey: 'fromWorkstationName' },
  { title: t('business.control.scanTime'), width: 160, colKey: 'timeCreate' },
  { title: t('business.control.retentionTime'), width: 160, colKey: 'retentionTime' },
  {
    title: t('business.control.ngTimes'),
    width: 160,
    colKey: 'ngTimes',
    attrs: (content) => {
      if (content.row.outTimeShowColor === 'Red') {
        return {
          style: {
            color: 'white',
            backgroundColor: 'red',
          },
        };
      }
      return '';
    },
  },
  {
    title: t('business.control.repairTimes'),
    width: 160,
    colKey: 'repairTimes',
    attrs: (content) => {
      if (content.row.outTimeShowColor === 'Red') {
        return {
          style: {
            color: 'white',
            backgroundColor: 'red',
          },
        };
      }
      return '';
    },
  },
  { title: t('business.control.repairStatus'), width: 160, colKey: 'repairStatusName' },
  { title: t('common.button.operation'), align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
const repairDtlData = ref<WipRepairDtlVO[]>([]);
const repairDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: t('business.control.scanBarcode'), width: 160, colKey: 'scanBarcode' },
  { title: t('business.control.defectName'), width: 160, colKey: 'defectName' },
  { title: t('business.control.defectReason'), width: 160, colKey: 'defectReason' },
  { title: t('business.control.userNameRepair'), width: 160, colKey: 'displayNameRepair' },
  { title: t('business.control.datetimeRepaired'), width: 160, colKey: 'datetimeRepaired' },
  { title: t('business.control.repairTimes'), width: 160, colKey: 'repairTimes' },
  { title: t('business.control.defectDealMethodName'), width: 160, colKey: 'defectDealMethodName' },
  { title: t('business.control.defectBlame'), width: 160, colKey: 'defectBlame' },
  { title: t('business.control.repairResult'), width: 160, colKey: 'repairResult' },
];

const repairingData = ref<WipRepairVO[]>([]);
const repairingColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    // type: 'single',
    type: 'multiple',
    // checkProps: { allowUncheck: true }, // 允许单选(Radio)取消行选中
    width: 50,
  },
  { title: t('business.main.serialNumber'), colKey: 'serial-number', width: 74 },
  { title: t('business.control.scanBarcode'), width: 160, colKey: 'scanBarcode' },
  { title: t('business.control.moScheCode'), width: 160, colKey: 'moScheCode' },
  { title: t('business.control.productCode'), width: 160, colKey: 'mitemCode' },
  { title: t('business.control.productName'), width: 160, colKey: 'mitemName' },
  { title: t('business.control.fromRoutingProcessName'), width: 160, colKey: 'fromRoutingProcessName' },
  { title: t('business.control.fromWorkstationName'), width: 160, colKey: 'fromWorkstationName' },
  { title: t('business.control.scanTime'), width: 200, colKey: 'timeCreate' },
  { title: t('business.control.retentionTime'), width: 160, colKey: 'retentionTime' },
  { title: t('business.control.ngTimes'), width: 160, colKey: 'ngTimes' },
  { title: t('business.control.repairTimes'), width: 160, colKey: 'repairTimes' },
  { title: t('business.control.repairStatus'), width: 160, colKey: 'repairStatusName' },
  { title: t('common.button.operation'), align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

// 点击查询按钮
const conditionEnter = (query: any) => {
  formData.queryData.barcode = query.barcode;
  formData.queryData.moScheId = query.moScheId;

  const [dateRangeStart, dateRangeEnd] = query.dateRange;
  formData.queryData.beginDate = dateRangeStart;
  formData.queryData.endDate = dateRangeEnd;
  formData.queryData.isRepair = query.isRepair;

  fetchTable();
};
// 重置按钮
const onReset = () => {
  formData.queryData.barcode = '';
  formData.queryData.moScheId = '';
  formData.queryData.isRepair = '';
  formData.queryData.beginDate = dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD');
  formData.queryData.endDate = dayjs().format('YYYY-MM-DD');
  formData.queryData.routingRevisionId = '';
  formData.queryData.checkedDefectBlameOptions = [];
  formData.queryData.checkedDefectDealMethodOptions = [];
  formData.queryData.checkedDefectReasonOptions = [];

  fetchTable();
  fetchRepairingTable();
  getDefectDealMethod();
  getDefectReason();
  getDefectBlame();
};
// 删除按钮
const onDeleteClick = async ({ row }) => {
  await apiControl.wipRepair.updateWipRepairUnRepair({
    wipRepairIds: [row.id],
  });

  await fetchRepairingTable();
};

// 维修完成按钮
const onSubmit = async () => {
  if (selectRepairingId.value.length === 0) {
    MessagePlugin.success('请选择维修工单。');
    return;
  }

  if (_.isEmpty(formData.queryData.returnRoutingProcessId)) {
    MessagePlugin.success('请选择回流工序');
    return;
  }

  // if (_.isEmpty(formData.queryData.checkedDefectReason)) {
  //   MessagePlugin.success('请选择缺陷原因');
  //   return;
  // }

  // if (_.isEmpty(formData.queryData.checkedDefectDealMethod)) {
  //   MessagePlugin.success('请选择处理方法');
  //   return;
  // }

  // if (_.isEmpty(formData.queryData.checkedDefectBlame)) {
  //   MessagePlugin.success('请选择责任别');
  //   return;
  // }

  await apiControl.wipRepair.updateRepaired({
    loginProcessId: userStore.currUserOrgInfo.processId,
    loginWorkstationId: userStore.currUserOrgInfo.workStationId,
    returnRoutingProcessId: formData.queryData.returnRoutingProcessId,
    mitemId: formData.queryData.mitemId,
    defectReason: formData.queryData.checkedDefectReason,
    defectBlame: formData.queryData.checkedDefectBlame,
    defectDealMethodIdList: formData.queryData.checkedDefectDealMethod,
    isScrapped: formData.queryData.isScrapped,
    idsRepairingList: selectRepairingId.value,
    wipRepairIdList: selectWipRepairingId.value,
  });

  MessagePlugin.success('维修成功。');

  fetchTable();
  fetchRepairingTable();
};

const fetchTable = async () => {
  try {
    const rangDays = dayjs(formData.queryData.endDate).diff(dayjs(formData.queryData.beginDate), 'days');
    if (rangDays + 1 > 31) {
      MessagePlugin.success('日期跨度最大不超过31天');
      return;
    }

    const data = (await apiControl.wipRepair.search({
      keyword: formData.queryData.barcode,
      moScheId: formData.queryData.moScheId,
      beginDate: formData.queryData.beginDate,
      endDate: dayjs(formData.queryData.endDate).add(1, 'day').format('YYYY-MM-DD'),
      isRepair: formData.queryData.isRepair[0],
      pageNum: pageTab1.value.page,
      pageSize: pageTab1.value.rows,
      processId: formData.queryData.processId,
      statusList: ['UNREPAIR', 'REPAIRED'],
      sorts: [],
      filters: [],
    })) as any;
    repairData.value = data.list;
    repairDataTotal.value = data.total;
    selectRepairId.value = [];
  } catch (e) {
    console.log(e);
  }
};
const fetchDtlTable = async () => {
  try {
    const data = await apiControl.wipRepairDtl.getListByWipRepairId({
      wipRepairId: selectRepairRowId.value,
    });
    repairDtlData.value = data;
  } catch (e) {
    console.log(e);
  }
};
const fetchRepairingTable = async () => {
  try {
    const data = await apiControl.wipRepairDtl.getListByRepairing({
      pageNum: pageTab2.value.page,
      pageSize: pageTab2.value.rows,
    });
    repairingData.value = data.list;
    repairingDataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  }
};
const getDefectDealMethod = async () => {
  formData.queryData.defectDealMethodOptions = [];
  const data = await apiControl.wipRepair.getDefectDealMethodList({
    pageNum: 1,
    pageSize: 99999,
    dealMethodType: 'Q2',
    defectDealMethod: '',
  });

  data.list.forEach((item) => {
    formData.queryData.defectDealMethodOptions.push({ value: item.id, label: item.methodName });
  });
};
const getDefectReason = async () => {
  formData.queryData.defectReasonOptions = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_DEFECT_REASON',
  });

  data.forEach((item) => {
    formData.queryData.defectReasonOptions.push({ value: item.value, label: item.label });
  });
};
const getDefectBlame = async () => {
  formData.queryData.defectBlameOptions = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_DEFECT_BLAME',
  });

  data.forEach((item) => {
    formData.queryData.defectBlameOptions.push({ value: item.value, label: item.label });
  });
};
const onSelectRepairChange = (value: any) => {
  selectRepairId.value = value;
};
const onSelectRepairingChange = (value: any, { selectedRowData }) => {
  const distinctMitemCode = selectedRowData
    .map((n) => n.mitemCode)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctMitemCode) && distinctMitemCode.length > 1) {
    MessagePlugin.error('只能选择相同产品的返修工单');

    // 保留第一个产品的所有选择
    const ids = selectedRowData.filter((n) => n.mitemCode === selectedRowData[0].mitemCode).map((n) => n.id);
    _.remove(value, (n) => {
      return ids.indexOf(n) === -1;
    });
  }
  selectRepairingId.value = value;

  const distinctWipRepairingId = selectedRowData
    .map((n) => n.wipRepairId)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  selectWipRepairingId.value = distinctWipRepairingId;

  if (value.length > 0) {
    const firstRow = selectedRowData.find((n) => n.id === value[0]);
    formData.queryData.routingRevisionId = firstRow.routingRevisionId;
    formData.queryData.mitemId = firstRow.mitemId;
    formData.queryData.mitemCode = firstRow.mitemCode;
    formData.queryData.mitemName = firstRow.mitemName;
  } else {
    formData.queryData.routingRevisionId = '';
  }
};
const onRepairRowClick = async ({ row }) => {
  if (row.status === 'REPAIRING') {
    MessagePlugin.error('产品已开始维修，不能重复维修');
    return;
  }
  if (row.status === 'REPAIRED') {
    MessagePlugin.error('产品已维修完成');
    return;
  }

  await apiControl.wipRepair.updateWipRepairStatus({
    wipRepairIds: [row.id],
  });
  MessagePlugin.success('当前产品已开始维修');
  repairDtlData.value = [];
  fetchTable();
};
const onBatchRepairing = async () => {
  try {
    if (selectRepairId.value.length === 0) {
      MessagePlugin.error('请选择维修单');
      return;
    }

    const notCanRepair = repairData.value.filter(
      (n) => n.status !== 'UNREPAIR' && selectRepairId.value.some((obj) => obj === n.id),
    ).length;
    if (notCanRepair > 0) {
      MessagePlugin.error('只能选择待维修状态的单据');
      return;
    }

    await apiControl.wipRepair.updateWipRepairStatus({
      wipRepairIds: selectRepairId.value,
    });
    repairDtlData.value = [];
    fetchTable();
    MessagePlugin.success('选择产品已开始维修');
  } catch (e) {
    console.log(e);
  }
};
const onActiveChange = async (highlightRowKeys) => {
  selectRepairRowId.value = `${highlightRowKeys[0]}`;
  await fetchDtlTable();
};
onMounted(() => {
  fetchTable();
  fetchRepairingTable();
  getDefectDealMethod();
  getDefectReason();
  getDefectBlame();
});
</script>

<style lang="less" scoped>
/deep/ .t-table__row--active {
  background-color: var(--td-brand-color-light) !important;
}
</style>
