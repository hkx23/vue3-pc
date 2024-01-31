<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" is-expansion @submit="onSearch" />
    </cmp-card>
    <cmp-card :span="12">
      <!-- ################# 处理组表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        row-key="id"
        :table-column="tableMainColumns"
        :table-data="tableMainData"
        :loading="loading"
        :total="mainDataTotal"
        :hover="false"
        :stripe="false"
        :header-affixed-top="true"
        @refresh="fetchTable"
        @cell-click="onRowClick"
      >
        <template #button>
          <t-button theme="primary" @click="onClickAdd">
            {{ t('common.button.add') }}
          </t-button>
          <t-button theme="default" :disabled="selectRowKeys?.length == 0" @click="onBatchCancelledClick">
            {{ t('salesDelivery.cancel') }}
          </t-button>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-row>
      <!-- ################# 子数据数据 ###################### -->
      <cmp-card :span="12">
        <cmp-table
          row-key="id"
          :table-column="tableChildrenColumns"
          :table-data="tableChildrenData"
          :loading="loadingChildren"
          :total="childrenDataTotal"
          :hover="false"
          :stripe="false"
          :show-pagination="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
        />
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!--销售发货制单主表弹框-->
  <formSalesDelivery
    ref="formRef"
    :is-add="isAdd"
    :row="selectRow"
    @show-close-event="onHandleShowClose"
  ></formSalesDelivery>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiWarehouse, SaleDeliveryVO } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formSalesDelivery from './formSalesDelivery.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const { loading: loadingChildren, setLoading: setLoadingChildren } = useLoading();

const isAdd = ref(true);

const datePlanRangeDefault = ref([dayjs().format('YYYY-MM-DD'), dayjs().subtract(-31, 'day').format('YYYY-MM-DD')]); // 初始化日期控件

// 查询组件值
const optsValue = ref({});

// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: '单据号',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入单据号',
    },
    customerId: {
      label: '客户',
      placeholder: '请选择客户',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'customer',
        valueField: 'id',
      },
    },
    saleOrderNo: {
      label: '销售订单',
      placeholder: '请选择销售订单',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'saleOrder',
        valueField: 'billNo',
      },
    },
    mitemId: {
      label: '产品编码',
      placeholder: '请选择产品编码',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        valueField: 'id',
      },
    },
    datePlanRange: {
      label: '创建时间',
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择创建时间',
    },
    status: {
      label: t('salesDelivery.statusName'),
      comp: 't-select',
      defaultVal: [],
      bind: {
        class: 'check-box-conditon',
        options: statusOption.value,
        lazyLoad: true,
      },
    },
  };
});
// 状态下拉初始数据
const statusOption = ref([
  { label: '全选', value: '', checkAll: true },
  { value: 'CREATED', label: '已创建' },
  { value: 'DELIVERED', label: '已发货' },
  { value: 'CANCELED', label: '已取消' },
]);

const tableMainData = ref([]);
const tableMainColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: '单据号', width: 140, colKey: 'billNo' },
  { title: '客户编码', width: 140, colKey: 'customerCode' },
  { title: '客户名称', width: 140, colKey: 'customerName' },
  { title: '单据状态', width: 140, colKey: 'statusName' },
  { title: '发货时间', width: 140, colKey: 'datetimeDelivery' },
  { title: '创建人', width: 140, colKey: 'creatorName' },
  { title: '创建时间', width: 140, colKey: 'timeCreate' },
  { title: '更新人', width: 140, colKey: 'modifierName' },
  { title: '更新时间', width: 140, colKey: 'timeModified' },
];

const tableChildrenData = ref([]);
const tableChildrenColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品编码', width: 140, colKey: 'mitemCode' },
  { title: '产品名称', width: 140, colKey: 'mitemName' },
  { title: '单位', width: 140, colKey: 'uomName' },
  { title: '仓库', width: 140, colKey: 'warehouseName' },
  { title: '货区', width: 140, colKey: 'districtName' },
  { title: '本次发货数', width: 140, colKey: 'qty' },
  { title: '待发货数', width: 140, colKey: 'requireQty' },
  { title: '销售订单', width: 140, colKey: 'saleOrderNo' },
  { title: '销售订单行号', width: 140, colKey: 'saleOrderDtlId' },
  { title: '备注', width: 140, colKey: 'memo' },
];

const formVisible = ref(false); // 显示和隐藏销售发货制单弹出框
const formRef = ref(null); // 规则主表
const mainDataTotal = ref(0);
const childrenDataTotal = ref(0);
const tableRef = ref();
const selectRow = ref({}) as any;

const selectRowKeys = computed(() => {
  return tableRef.value?.getSelectedRowKeys();
});

// 点击销售发货行
const onRowClick = (rowObject: any) => {
  selectRow.value = rowObject.row;
  fetchChildrenTable();
};

// 点击查询按钮
const onSearch = (data: any) => {
  optsValue.value = data;
  fetchTable();
};

// 加载销售发货表格
const fetchTable = async () => {
  try {
    setLoading(true);

    const data = await apiWarehouse.saleDelivery.getSalesDeliveryList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    });
    tableMainData.value = data.list;
    mainDataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 批量作废
const onBatchCancelledClick = async () => {
  const ids = [];
  selectRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmCanceled = DialogPlugin({
    header: '作废',
    body: '确认作废吗',
    theme: 'warning',
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: async () => {
      const deleteModel: SaleDeliveryVO = {
        cancelledIds: ids,
      };
      await apiWarehouse.saleDelivery.updateBillNoByCancelled(deleteModel);
      fetchTable();
      confirmCanceled.hide();
      MessagePlugin.success('作废成功');
    },
    onClose: () => {
      confirmCanceled.hide();
    },
  });
};

// 加载销售发货制单明细表格
const fetchChildrenTable = async () => {
  if (!selectRow.value.id) {
    clearSalesDeliveryDtl();
    return;
  }
  try {
    setLoadingChildren(true);
    const data = await apiWarehouse.saleDeliveryDtl.getSalesDeliveryDtlList({
      saleDeliveryId: selectRow.value.id,
    });
    tableChildrenData.value = data.list;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingChildren(false);
  }
};

// 清除销售发货制单明细表格
const clearSalesDeliveryDtl = async () => {
  tableChildrenData.value = [];
};

// 弹出新增销售发货制单界面
const onClickAdd = () => {
  const { reset } = formRef.value;
  reset();
  const { showPopform } = formRef.value;
  showPopform();
  formVisible.value = true;
  isAdd.value = true;
};

// 新增界面-提交后调用
const onHandleShowClose = () => {
  fetchTable();
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
