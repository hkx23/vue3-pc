<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
        <!-- ################# 采购订单表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          row-key="id"
          active-row-type="single"
          :table-column="tablePurchaseOrderColumns"
          :table-data="tableDataPurchaseOrder"
          :loading="loading"
          :total="dataTotal"
          max-height="300px"
          :hover="false"
          :stripe="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
          @cell-click="onEditPurchaseOrderRowClick"
        >
          <template #title> {{ t('purchaseOrder.tableSubTilte') }} </template>
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
          :table-column="tablePurchaseOrderDtlColumns"
          :table-data="tableDataPurchaseOrderDtl"
          :loading="loadingPurchaseOrderDtl"
          :total="dataTotal"
          :hover="false"
          :stripe="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
        >
          <template #title> {{ t('purchaseOrder.tableDtlSubTilte') }} </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref } from 'vue';

import { api as apiWarehouse, PurchaseOrderDtlVO, PurchaseOrderVO } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading } = useLoading();

const { loading: loadingPurchaseOrderDtl, setLoading: setLoadingPurchaseOrderDtl } = useLoading();

// 查询组件值
const optsValue = ref({}) as any;
// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('purchaseOrder.billNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('purchaseOrder.billNo')}`]),
    },
    supplierId: {
      label: t('purchaseOrder.supplierId'),
      placeholder: t('common.placeholder.input', [`${t('purchaseOrder.supplierId')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'supplier',
      },
    },
  };
});

const tablePurchaseOrderColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('purchaseOrder.billNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('purchaseOrder.supplierCode')}`, width: 140, colKey: 'supplierCode' },
  { title: `${t('purchaseOrder.supplierName')}`, width: 240, colKey: 'supplierName' },
];

const tablePurchaseOrderDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('purchaseOrder.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('purchaseOrder.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('purchaseOrder.qty')}`, width: 120, colKey: 'qty' },
  { title: `${t('purchaseOrder.arrivaledQty')}`, width: 120, colKey: 'arrivaledQty' },
  { title: `${t('purchaseOrder.stockInQty')}`, width: 140, colKey: 'stockInQty' },
  { title: `${t('purchaseOrder.returnQty')}`, width: 120, colKey: 'returnQty' },
];

const tableDataPurchaseOrder = ref<PurchaseOrderVO[]>([]);
const tableDataPurchaseOrderDtl = ref<PurchaseOrderDtlVO[]>([]);

const dataTotal = ref(0);
const tableRef = ref();
const tableDtlRef = ref();
const selectPurchaseOrderRow = ref<PurchaseOrderVO>({}); // 选中行

// 点击领料制单行
const onEditPurchaseOrderRowClick = (rowObject: any) => {
  console.log(`表格点击:${{ rowObject }}`);
  selectPurchaseOrderRow.value = rowObject.row as PurchaseOrderVO;
  fetchPurchaseOrderDtlTable();
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  optsValue.value = data;
  selectPurchaseOrderRow.value.id = '';
  fetchTable();
};

// 加载领料制单表格
const fetchTable = async () => {
  utils.loadingPluginFullScreen(true);
  try {
    const data = await apiWarehouse.purchaseOrder.getPurchaseOrderList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    });
    tableDataPurchaseOrder.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
    fetchPurchaseOrderDtlTable();
  }
};

// 加载领料制单明细表格
const fetchPurchaseOrderDtlTable = async () => {
  if (!selectPurchaseOrderRow.value.id) {
    clearPurchaseOrderDtlTable();
    return;
  }
  try {
    setLoadingPurchaseOrderDtl(true);
    const data = (await apiWarehouse.purchaseOrder.getPurchaseOrderDtl({
      purchaseOrderId: selectPurchaseOrderRow.value.id,
    })) as any;
    tableDataPurchaseOrderDtl.value = data;
    nextTick(() => {
      tableDtlRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingPurchaseOrderDtl(false);
  }
};

// 清除领料制单明细表格
const clearPurchaseOrderDtlTable = async () => {
  tableDataPurchaseOrderDtl.value = [];
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
