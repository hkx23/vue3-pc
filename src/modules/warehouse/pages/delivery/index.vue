<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
        <!-- ################# 送货单表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          row-key="id"
          active-row-type="single"
          :table-column="tableDeliveryColumns"
          :table-data="tableDataDelivery"
          :loading="loading"
          :total="dataTotal"
          max-height="300px"
          :hover="false"
          :stripe="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
          @cell-click="onEditDeliveryRowClick"
        >
          <template #title> {{ t('delivery.tableSubTilte') }} </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-row>
      <!-- ################# 子数据数据 ###################### -->
      <cmp-card :span="12">
        <cmp-table
          ref="tableDtlRef"
          row-key="id"
          active-row-type="single"
          :table-column="tableDeliveryDtlColumns"
          :table-data="tableDataDeliveryDtl"
          :loading="loadingDeliveryDtl"
          :total="dataTotal"
          :hover="false"
          :stripe="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
        >
          <template #title> {{ t('delivery.tableDtlSubTilte') }} </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref } from 'vue';

import { api as apiWarehouse, DeliveryDtlVO, DeliveryVO } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const { loading: loadingDeliveryDtl, setLoading: setLoadingDeliveryDtl } = useLoading();

// 查询组件值
const datePlanRangeDefault = ref([
  dayjs().subtract(31, 'day').format('YYYY-MM-DD 00:00:00'),
  dayjs().add(1, 'day').format('YYYY-MM-DD 23:59:59'),
]);
// 查询组件值
const optsValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;

// 查询组件
const opts = computed(() => {
  return {
    datePlanRange: {
      label: t('delivery.dateDelivery'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('common.placeholder.input', [`${t('delivery.dateDelivery')}`]),
      bind: {
        enableTimePicker: true,
      },
    },
    billNo: {
      label: t('delivery.billNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('delivery.billNo')}`]),
    },
    supplierId: {
      label: t('delivery.supplierId'),
      placeholder: t('common.placeholder.input', [`${t('delivery.supplierId')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'supplier',
      },
    },
  };
});

const tableDeliveryColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('delivery.billNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('delivery.dateDelivery')}`, width: 140, colKey: 'dateDelivery' },
  { title: `${t('delivery.supplierCode')}`, width: 140, colKey: 'supplierCode' },
  { title: `${t('delivery.supplierName')}`, width: 240, colKey: 'supplierName' },
  { title: `${t('delivery.statusName')}`, width: 120, colKey: 'statusName' },
];

const tableDeliveryDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('delivery.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('delivery.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('delivery.lineSeq')}`, width: 120, colKey: 'lineSeq' },
  { title: `${t('delivery.qty')}`, width: 120, colKey: 'qty' },
  { title: `${t('delivery.receivedQty')}`, width: 120, colKey: 'receivedQty' },
  { title: `${t('delivery.datePo')}`, width: 120, colKey: 'datePo' },
  { title: `${t('delivery.poNo')}`, width: 140, colKey: 'poNo' },
  { title: `${t('delivery.poLineNo')}`, width: 140, colKey: 'poLineNo' },
];

const tableDataDelivery = ref<DeliveryVO[]>([]);
const tableDataDeliveryDtl = ref<DeliveryDtlVO[]>([]);

const dataTotal = ref(0);
const tableRef = ref();
const tableDtlRef = ref();
const selectDeliveryRow = ref<DeliveryVO>({}); // 选中行

// 点击送货单行
const onEditDeliveryRowClick = (rowObject: any) => {
  console.log(`表格点击:${{ rowObject }}`);
  selectDeliveryRow.value = rowObject.row as DeliveryVO;
  fetchDeliveryDtlTable();
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  optsValue.value = data;
  selectDeliveryRow.value.id = '';
  fetchTable();
};

// 加载送货单表格
const fetchTable = async () => {
  setLoading(true);
  try {
    if (optsValue.value.datePlanRange) {
      if (optsValue.value.datePlanRange[0]) {
        optsValue.value.dateDeliveryStart = optsValue.value.datePlanRange[0].toString();
      }
      if (optsValue.value.datePlanRange[1]) {
        optsValue.value.dateDeliveryEnd = optsValue.value.datePlanRange[1].toString();
      }
    }
    const data = await apiWarehouse.delivery.getDeliveryList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    });
    tableDataDelivery.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
    fetchDeliveryDtlTable();
  }
};

// 加载送货单明细表格
const fetchDeliveryDtlTable = async () => {
  if (!selectDeliveryRow.value.id) {
    clearDeliveryDtlTable();
    return;
  }
  try {
    setLoadingDeliveryDtl(true);
    const data = (await apiWarehouse.delivery.getDeliveryDtl({
      deliveryId: selectDeliveryRow.value.id,
    })) as any;
    tableDataDeliveryDtl.value = data;
    nextTick(() => {
      tableDtlRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingDeliveryDtl(false);
  }
};

// 清除送货单明细表格
const clearDeliveryDtlTable = async () => {
  tableDataDeliveryDtl.value = [];
};

onMounted(() => {
  fetchTable();
});
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

  // .table-container {
  //   margin-top: var(--td-comp-margin-xxl);
  // }
}

.form-container-row {
  margin-top: 20px;
}

.pack-dtl-table {
  padding-top: 0;

  .pack-dtl-button {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8px;
  }
}

:deep(t-table__affixed-header-elm) {
  width: 0 !important;
}

.add-form {
  :deep(.t-dialog__body) {
    padding: 0 !important;
  }

  :deep(.t-dialog) {
    background: var(--td-bg-color-page) !important;
  }
}
</style>
