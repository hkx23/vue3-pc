<template>
  <cmp-container :full="true">
    <cmp-card>
      <!-- 查询组件  -->
      <cmp-query v-if="pageShow" :opts="opts" @submit="conditionEnter" @reset="onRest"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        @refresh="fetchTable"
      >
        <template #title> {{ t('incidentBill.title') }}</template>
        <template #detailsOp="{ row }">
          <t-button theme="primary" @click="onCheck(row)"> {{ t('incidentBill.check') }}</t-button></template
        >
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!--主表弹框-->
  <t-dialog
    v-model:visible="formVisible"
    :header="t('incidentBill.billDetails')"
    :close-on-overlay-click="false"
    :confirm-btn="null"
    width="80%"
  >
    <cmp-table
      v-model:pagination="pageUIDtl"
      row-key="id"
      :table-column="subColumns"
      :table-data="tableSubData"
      :loading="loading"
      :total="dataSubTotal"
      @refresh="onRefreshSub"
    >
      <template #title> {{ t('incidentBill.subTitle') }}</template>
    </cmp-table>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/daily';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { pageUI: pageUIDtl } = usePage();
const { loading } = useLoading();
const tableData = ref([]);
const tableSubData = ref([]);

const formVisible = ref(false);
const pageShow = ref(false);

const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('incidentBill.billNo')}`, width: 200, colKey: 'billNo' },
  { title: `${t('incidentBill.incidentType')}`, width: 100, colKey: 'incidentTypeName' },
  { title: `${t('incidentBill.billStatus')}`, width: 100, colKey: 'statusName' },
  { title: `${t('incidentBill.alertCfg')}`, width: 100, colKey: 'alertType' },
  { title: `${t('incidentBill.org')}`, width: 100, colKey: 'orgName' },
  { title: `${t('incidentBill.incidentMemo')}`, width: 120, colKey: 'memo' },
  { title: `${t('incidentBill.curSupportGroup')}`, width: 100, colKey: 'supportGroupName' },
  { title: `${t('incidentBill.sla')}`, width: 150, colKey: 'sla' },
  { title: `${t('incidentBill.ola')}`, width: 150, colKey: 'ola' },
  { title: `${t('incidentBill.curUserName')}`, width: 80, colKey: 'curDisplayName' },
  { title: `${t('incidentBill.details')}`, width: 90, colKey: 'detailsOp', fixed: 'right' },
];
const subColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('incidentBill.billNo')}`, width: 200, colKey: 'billNo' },
  { title: `${t('incidentBill.flow')}`, width: 100, colKey: 'statusName' },
  { title: `${t('incidentBill.creatorName')}`, width: 100, colKey: 'displayName' },
  { title: `${t('incidentBill.curUserName')}`, width: 100, colKey: 'curDisplayName' },
  { title: `${t('incidentBill.incidentType')}`, width: 130, colKey: 'incidentTypeName' },
  { title: `${t('incidentBill.timeUpdate')}`, width: 130, colKey: 'timeModified' },
  { title: `${t('incidentBill.supportGroup')}`, width: 100, colKey: 'supportGroupName' },
  { title: `${t('incidentBill.incidentDesc')}`, width: 150, colKey: 'incidentMemo' },
  { title: `${t('incidentBill.memo')}`, width: 150, colKey: 'memo' },
  { title: `${t('incidentBill.reason')}`, width: 100, colKey: 'incidentReason' },
  { title: `${t('incidentBill.dealMethod')}`, width: 100, colKey: 'dealMethod' },
  { title: `${t('incidentBill.dealDetail')}`, width: 100, colKey: 'dealDetail' },
];
// 初始渲染
onMounted(async () => {
  await getWorkshopId();
  await fetchTable();
});

const curBillNo = ref('');

const onRefreshSub = async () => {
  const data = (await api.incidentDealLog.getList({
    billNo: curBillNo.value,
    pageNum: pageUIDtl.value.page,
    pageSize: pageUIDtl.value.rows,
  })) as any;
  if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
    pageUIDtl.value.page = 1;
    pageUIDtl.value.rows = 20;
    onRefreshSub();
  }
  tableSubData.value = data.list;
  dataSubTotal.value = data.total;
};

const onCheck = async (row) => {
  curBillNo.value = row.billNo;
  const data = (await api.incidentDealLog.getList({
    billNo: row.billNo,
    pageNum: pageUIDtl.value.page,
    pageSize: pageUIDtl.value.rows,
  })) as any;
  tableSubData.value = data.list;
  dataSubTotal.value = data.total;
  formVisible.value = true;
};

const queryCompment = ref({
  timeCreateStart: '',
  timeCreateEnd: '',
  billNo: '',
  creator: '',
  curUserId: '',
  incidentModule: '',
  incidentTypeId: '',
  orgId: '',
  status: '',
});

const onRest = async () => {
  await getWorkshopId();
};

// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('incidentBill.billNo'),
      comp: 't-input',
      defaultVal: '',
    },
    creator: {
      label: t('incidentBill.creatorName'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        valueField: 'userName',
        showTitle: false,
      },
    },
    curUserId: {
      label: t('incidentBill.curUserName'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
    orgId: {
      label: t('incidentBill.org'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: queryCompment.value.orgId,
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    incidentModule: {
      label: t('incidentBill.incidentModule'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'state',
        showTitle: false,
        category: 'INCIDENT_MODULE',
      },
    },
    incidentTypeId: {
      label: t('incidentBill.incidentType'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'incidentType',
        showTitle: false,
      },
    },
    status: {
      label: t('incidentBill.billStatus'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'state',
        showTitle: false,
        category: 'INCIDENT_DEAL_STATUS',
      },
    },
    timeCreateStart: {
      label: t('incidentBill.timeCreateStart'),
      comp: 't-date-picker',
      defaultVal: '',
      bind: {
        enableTimePicker: true,
      },
    },
    timeCreateEnd: {
      label: t('incidentBill.timeCreateEnd'),
      comp: 't-date-picker',
      defaultVal: '',
      bind: {
        enableTimePicker: true,
      },
    },
  };
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  queryCompment.value = data;
  onRefresh();
};
const onRefresh = () => {
  fetchTable();
};
const dataTotal = ref(0);
const dataSubTotal = ref(0);

const fetchTable = async () => {
  try {
    const data = (await api.incidentDeal.getList({
      ...queryCompment.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
    tableData.value = data.list;
    dataTotal.value = data.total;
    MessagePlugin.success(t('incidentBill.querySuccess'));
  } catch (e) {
    console.log(e);
  }
};

const getWorkshopId = async () => {
  const id = await api.incidentDeal.getWorkShopIdByLoginUser();
  if (id) {
    queryCompment.value.orgId = id;
  }
  pageShow.value = true;
};
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}
</style>
