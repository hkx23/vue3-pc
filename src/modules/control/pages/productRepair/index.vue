<template>
  <cmp-container :full-screen="true" style="height: 95%">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="产品维修台账" style="background: var(--td-bg-color-page)" :destroy-on-hide="false">
        <cmp-card style="margin-bottom: 10px">
          <cmp-query :opts="opts" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
        </cmp-card>
        <cmp-card style="margin-bottom: 10px">
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
            :selected-row-keys="selectRepairId"
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
          />
        </cmp-card>
      </t-tab-panel>
      <t-tab-panel
        :value="2"
        label="产品维修工作台"
        style="background: var(--td-bg-color-page)"
        :destroy-on-hide="false"
      >
        <cmp-card style="margin-bottom: 10px">
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
            @refresh="fetchRepairingTable"
          >
            <!-- <template #op="slotProps"> -->
            <template #op>
              <t-space>
                <t-link theme="primary">删除</t-link>
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
        <cmp-row>
          <cmp-card :span="4">缺陷原因</cmp-card>
          <cmp-card :span="4">处理方法</cmp-card>
          <cmp-card :span="4">责任别</cmp-card>
        </cmp-row>
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
const selectRepairId = ref([]);
const selectRepairRowId = ref(null);
const formData = reactive({
  queryData: {
    beginDate: dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    moScheId: '',
    barcode: '',
    isRepair: '',
    workCenterId: userStore.currUserOrgInfo.workCenterId,
    workCenterCode: userStore.currUserOrgInfo.workCenterCode,
    workCenterName: userStore.currUserOrgInfo.workCenterName,
    isRepairOptions: [{ value: 'REPAIRED', label: '已返修' }],
  },
});

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
  { title: t('business.control.ngTimes'), width: 160, colKey: 'ngTimes' },
  { title: t('business.control.repairTimes'), width: 160, colKey: 'repairTimes' },
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
  { title: t('business.control.scanTime'), width: 160, colKey: 'timeCreate' },
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
    const data = (await apiControl.wipRepair.search({
      keyword: '',
      moScheId: '',
      beginDate: '',
      endDate: '',
      isRepair: '',
      pageNum: pageTab2.value.page,
      pageSize: pageTab2.value.rows,
      statusList: ['REPAIRING'],
      sorts: [],
      filters: [],
    })) as any;
    repairingData.value = data.list;
    repairingDataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  }
};
const onSelectRepairChange = (value: any) => {
  selectRepairId.value = value;
};

const onRepairRowClick = async ({ row }) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
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
});
</script>

<style lang="less" scoped>
/deep/ .t-table__row--active {
  background-color: var(--td-brand-color-light) !important;
}
</style>
