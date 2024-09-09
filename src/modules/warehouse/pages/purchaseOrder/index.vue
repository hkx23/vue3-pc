<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter">
          <!-- <template #showState="{ param }">
            <t-checkbox v-model="param.showState">仅显示未完成</t-checkbox>
          </template> -->
        </cmp-query>
        <!-- ################# 采购订单表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
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
          :hover="false"
          :stripe="false"
          :fixed-height="true"
          :header-affixed-top="true"
          :show-pagination="false"
          :selected-row-keys="selectedRowKeys"
          @refresh="fetchTable"
          @select-change="onSelectChange"
        >
          <template #title> {{ t('purchaseOrder.tableDtlSubTilte') }} </template>
          <template #button>
            <t-button theme="primary" @click="onAllConfirm"> 一键确认 </t-button>
            <t-button theme="default" @click="onShowDialog"> 交货回复 </t-button>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>

    <!-- dialog 弹窗 -->
    <t-dialog
      v-model:visible="formVisible"
      width="50%"
      :cancel-btn="null"
      :confirm-btn="null"
      header="交付确认"
      @close="onReset"
    >
      <t-textarea v-model="formDataDialog.list.confirmDeliveryMemo" :autosize="{ minRows: 10 }" />
      <template #footer>
        <t-button theme="default" variant="base" @click="onReset">取消</t-button>
        <t-button theme="primary" @click="onSubmit">保存</t-button>
      </template>
    </t-dialog>
  </cmp-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiWarehouse, PurchaseOrderDtlVO, PurchaseOrderVO } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

// const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例

const { t } = useLang();

const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const { pageUI } = usePage();
const { loading } = useLoading();

const { loading: loadingPurchaseOrderDtl, setLoading } = useLoading();
const selectedRowKeys: Ref<any[]> = ref([]);
// 获取批量删除数组
const onSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

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
        type: 'supplierAuth',
      },
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        isMultiple: false,
      },
    },
    // showState: {
    //   label: '',
    //   labelWidth: '10',
    //   event: 'radio',
    //   defaultVal: 'true',
    //   slotName: 'showState',
    // },
  };
});

const tablePurchaseOrderColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('purchaseOrder.billNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('purchaseOrder.supplierCode')}`, width: 140, colKey: 'supplierCode' },
  { title: `${t('purchaseOrder.supplierName')}`, width: 240, colKey: 'supplierName' },
  { title: `${t('purchaseOrder.categoryCode')}`, width: 120, colKey: 'categoryCode' },
  { title: `${t('purchaseOrder.categoryName')}`, width: 160, colKey: 'categoryName' },
  { title: `${t('purchaseOrder.orgName')}`, width: 160, colKey: 'orgName' },
];

const tablePurchaseOrderDtlColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  { title: `${t('purchaseOrder.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('purchaseOrder.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('purchaseOrder.要求到货时间')}`, width: 170, colKey: 'datetimeArrive' },
  { title: `${t('purchaseOrder.qty')}`, width: 120, colKey: 'qty' },
  { title: `${t('purchaseOrder.billLineNo')}`, width: 120, colKey: 'billLineNo' },
  { title: `${t('purchaseOrder.arrivaledQty')}`, width: 120, colKey: 'arrivaledQty' },
  { title: `${t('purchaseOrder.stockInQty')}`, width: 140, colKey: 'stockInQty' },
  { title: `${t('purchaseOrder.returnQty')}`, width: 120, colKey: 'returnQty' },
  { title: `${t('purchaseOrder.isConfirmName')}`, width: 120, colKey: 'isConfirmName' },
  { title: `${t('purchaseOrder.confirmDeliveryMemo')}`, width: 120, colKey: 'confirmDeliveryMemo' },
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
  setLoading(true);
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
    setLoading(false);
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
    setLoading(true);
    const data = (await apiWarehouse.purchaseOrder.getPurchaseOrderDtl({
      purchaseOrderId: selectPurchaseOrderRow.value.id,
    })) as any;
    tableDataPurchaseOrderDtl.value = data;
    nextTick(() => {
      // tableDtlRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 清除领料制单明细表格
const clearPurchaseOrderDtlTable = async () => {
  tableDataPurchaseOrderDtl.value = [];
};

// dialog 弹框数据
const formDataDialog = reactive({
  list: {
    confirmDeliveryMemo: '',
  },
});
const onReset = () => {
  formDataDialog.list.confirmDeliveryMemo = '';
  formVisible.value = false;
};
const onSubmit = async () => {
  try {
    if (_.isEmpty(selectPurchaseOrderRow.value.id)) {
      MessagePlugin.error('请选择采购订单号。');
      return;
    }
    if (_.isEmpty(selectedRowKeys.value)) {
      MessagePlugin.error('请选择采购订单明细。');
      return;
    }

    setLoading(true);
    await apiWarehouse.purchaseOrder.confirmDelivery({
      purchaseOrderId: selectPurchaseOrderRow.value.id,
      confirmDeliveryMemo: formDataDialog.list.confirmDeliveryMemo,
      purchaseOrderDtlIds: selectedRowKeys.value,
    });

    selectedRowKeys.value = [];
    formVisible.value = false;

    await fetchPurchaseOrderDtlTable();
    MessagePlugin.success('回复成功');
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
const onShowDialog = () => {
  if (_.isEmpty(selectPurchaseOrderRow.value.id)) {
    MessagePlugin.error('请选择采购订单号。');
    return;
  }
  if (_.isEmpty(selectedRowKeys.value)) {
    MessagePlugin.error('请选择采购订单明细。');
    return;
  }

  const list = tableDataPurchaseOrderDtl.value.filter((item) => selectedRowKeys.value.includes(item.id));
  formDataDialog.list.confirmDeliveryMemo = list[0].confirmDeliveryMemo;
  formVisible.value = true;
};
const onAllConfirm = async () => {
  try {
    if (_.isEmpty(selectPurchaseOrderRow.value.id)) {
      MessagePlugin.error('请选择采购订单号。');
      return;
    }
    if (_.isEmpty(selectedRowKeys.value)) {
      MessagePlugin.error('请选择采购订单明细。');
      return;
    }

    setLoading(true);
    await apiWarehouse.purchaseOrder.oneClickConfirm({
      purchaseOrderId: selectPurchaseOrderRow.value.id,
      confirmDeliveryMemo: formDataDialog.list.confirmDeliveryMemo,
      purchaseOrderDtlIds: selectedRowKeys.value,
    });
    selectedRowKeys.value = [];
    await fetchPurchaseOrderDtlTable();
    MessagePlugin.success('确认成功');
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
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

:deep t-table__affixed-header-elm {
  width: 0 !important;
}

.add-form {
  :deep .t-dialog__body {
    padding: 0 !important;
  }

  :deep .t-dialog {
    background: var(--td-bg-color-page) !important;
  }
}
</style>
