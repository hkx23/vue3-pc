<template>
  <cmp-container :full-screen="true" style="height: 95%">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="产品维修台账" style="background: var(--td-bg-color-page)">
        <cmp-card class="my-1" style="margin-bottom: 5px">
          <cmp-query :opts="opts" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
        </cmp-card>
        <cmp-card style="margin-bottom: 5px">
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="repairColumns"
            :table-data="repairData"
            :loading="loading"
            :total="repairDataTotal"
            :resizable="true"
            @select-change="onSelectRepairChange"
            @refresh="fetchTable"
          >
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
      <t-tab-panel :value="2" label="产品维修工作台"> </t-tab-panel>
    </t-tabs>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
// import { DialogPlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiControl, WipRepairDtlVO, WipRepairVO } from '@/api/control';
// import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();

const { pageUI } = usePage();

// const activeRowType = ref('single');
import { useLang } from './lang';

const repairDataTotal = ref(0);

const { t } = useLang(); // 使用多语言

const initialDate = ref(1);
const selectRepairId = ref('0');
const activeTab = ref('0');
const formData = reactive({
  queryData: {
    beginDate: dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    moScheId: '',
    barcode: '',
    isRepair: '',
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
    type: 'single',
    // type: 'multiple',
    checkProps: { allowUncheck: true }, // 允许单选(Radio)取消行选中
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
  setLoading(true);
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
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: [],
      filters: [],
    })) as any;
    repairData.value = data.list;
    repairDataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
const fetchDtlTable = async () => {
  setLoading(true);
  try {
    const data = await apiControl.wipRepairDtl.getListByWipRepairId({
      wipRepairId: selectRepairId.value,
    });
    repairDtlData.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const onSelectRepairChange = (value: any) => {
  selectRepairId.value = value;
  fetchDtlTable();
};

const onRepairRowClick = (value: any) => {
  activeTab.value = value.row;
  // formRef.value.getUom();
  // formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  // formVisible.value = true;
};
onMounted(() => {
  fetchTable();
});
</script>
