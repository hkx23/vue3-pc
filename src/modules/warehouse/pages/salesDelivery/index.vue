<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="onSearch" />

        <!-- ################# 处理组表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="billNo"
          :table-column="tableMainColumns"
          :table-data="tableMainData"
          :loading="loading"
          :total="mainDataTotal"
          :hover="false"
          :stripe="false"
          max-height="300px"
          :header-affixed-top="true"
          @refresh="fetchTable"
          @cell-click="onRowClick"
        >
          <template #title>发货单据列表</template>
          <template #button>
            <t-button theme="primary" @click="onClickAdd">
              {{ t('common.button.add') }}
            </t-button>
            <t-popconfirm :content="$t('确认作废销售发货单？')" @confirm="onBatchCancelledClick">
              <t-button theme="default" :disabled="selectRowKeys?.length == 0">
                {{ t('salesDelivery.cancel') }}
              </t-button>
            </t-popconfirm>

            <cmp-print-button
              template-code="DELIVERY_LIST"
              :disabled="selectRowKeys?.length == 0"
              :data="printData"
              @before-print="onPrintClick"
            />
          </template>
        </cmp-table>
      </cmp-container>
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
          :show-toolbar="false"
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
<script lang="ts" setup>
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiWarehouse, SaleDeliveryVO } from '@/api/warehouse';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
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

const datePlanRangeDefault = ref([dayjs().subtract(6, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]); // 初始化日期控件

// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('salesDelivery.单据号'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('salesDelivery.请输入单据号'),
    },
    customerId: {
      label: t('salesDelivery.客户'),
      placeholder: t('salesDelivery.请选择客户'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'customer',
        valueField: 'id',
      },
    },
    saleOrderNo: {
      label: t('salesDelivery.销售订单'),
      placeholder: t('salesDelivery.请选择销售订单'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'saleOrder',
        valueField: 'billNo',
      },
    },
    mitemId: {
      label: t('salesDelivery.产品编码'),
      placeholder: t('salesDelivery.请选择产品编码'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        valueField: 'id',
      },
    },
    dateRange: {
      label: t('salesDelivery.创建时间'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('salesDelivery.请选择创建时间'),
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
  { value: 'CREATED', label: t('salesDelivery.已创建') },
  { value: 'DELIVERED', label: t('salesDelivery.已发货') },
  { value: 'CANCELED', label: t('salesDelivery.已取消') },
]);

const tableMainData = ref([]);
const tableMainColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: t('salesDelivery.单据号'), width: 140, colKey: 'billNo' },
  { title: t('salesDelivery.客户编码'), width: 140, colKey: 'customerCode' },
  { title: t('salesDelivery.客户名称'), width: 140, colKey: 'customerName' },
  { title: t('salesDelivery.单据状态'), width: 100, colKey: 'statusName' },
  { title: t('salesDelivery.发货时间'), width: 200, colKey: 'datetimeDelivery' },
  { title: t('salesDelivery.创建人'), width: 100, colKey: 'creatorName' },
  { title: t('salesDelivery.创建时间'), width: 200, colKey: 'timeCreate' },
  { title: t('salesDelivery.更新人'), width: 100, colKey: 'modifierName' },
  { title: t('salesDelivery.更新时间'), width: 200, colKey: 'timeModified' },
];

const tableChildrenData = ref([]);
const tableChildrenColumns: PrimaryTableCol<TableRowData>[] = [
  { title: t('salesDelivery.产品编码'), width: 140, colKey: 'mitemCode' },
  { title: t('salesDelivery.产品名称'), width: 140, colKey: 'mitemName' },
  { title: t('salesDelivery.单位'), width: 140, colKey: 'uomName' },
  { title: t('salesDelivery.仓库'), width: 140, colKey: 'warehouseName' },
  // { title: '货区', width: 140, colKey: 'districtName' },
  { title: t('salesDelivery.本次发货数'), width: 140, colKey: 'qty' },
  // { title: '待发货数', width: 140, colKey: 'requireQty' },
  { title: t('salesDelivery.销售订单'), width: 140, colKey: 'saleOrderNo' },
  { title: t('salesDelivery.销售订单行号'), width: 140, colKey: 'saleOrderDtlId' },
  { title: t('salesDelivery.备注'), width: 140, colKey: 'memo' },
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

const formData = reactive({
  salesTimeBegin: '',
  salesTimeEnd: '',
  billNo: '',
  customerId: '',
  mitemId: '',
  saleOrderNo: '',
  status: '',
});
// 点击查询按钮
const onSearch = (query: any) => {
  const [dateRangeStart, dateRangeEnd] = query.dateRange;

  formData.salesTimeBegin = dateRangeStart;
  formData.salesTimeEnd = dateRangeEnd;
  formData.billNo = query.billNo;
  formData.customerId = query.customerId;
  formData.mitemId = query.mitemId;
  formData.saleOrderNo = query.saleOrderNo;
  formData.status = query.status;

  pageUI.value.page = 1;
  fetchTable();
};

// 加载销售发货表格
const fetchTable = async () => {
  try {
    setLoading(true);
    tableChildrenData.value = [];
    tableRef.value.setSelectedRowKeys([]);

    const data = await apiWarehouse.saleDelivery.getSalesDeliveryList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      salesTimeBegin: formData.salesTimeBegin,
      salesTimeEnd: formData.salesTimeEnd,
      billNo: formData.billNo,
      customerId: formData.customerId,
      mitemId: formData.mitemId,
      saleOrderNo: formData.saleOrderNo,
      status: formData.status,
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
  const deleteModel: SaleDeliveryVO = {
    cancelledIds: ids,
  };
  await apiWarehouse.saleDelivery.updateBillNoByCancelled(deleteModel);
  fetchTable();
  MessagePlugin.success(t('salesDelivery.作废成功'));
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

// 打印数据
const printData = ref([]);
// 打印, 目前只支持单笔打印
const onPrintClick = async () => {
  let isSuccess = true;
  printData.value = [];
  const promiseAll = [];
  setLoading(true);
  try {
    selectRowKeys.value.forEach((element) => {
      const billInfo = tableMainData.value.find((item) => item.billNo === element);
      if (billInfo) {
        const promiseQuery = getPrintBillInfo(billInfo.billNo).then((billInfoData: any) => {
          if (billInfoData) {
            const billDtls = billInfoData.saleDeliveryDtlVOList;
            printData.value.push({
              variable: billInfoData,
              datasource: { head: billInfoData, body: billDtls },
            });
          }
        });
        promiseAll.push(promiseQuery);
      }
    });
    await Promise.all(promiseAll);
  } catch (e) {
    console.log(e);
    isSuccess = false;
  } finally {
    setLoading(false);
  }
  return isSuccess;
};
// 打印方法
const getPrintBillInfo = (billNo) => {
  return new Promise((resolve, reject) => {
    const billInfoData = apiWarehouse.saleDelivery.getPrintBillInfo({
      billNo,
    }) as any;
    if (billInfoData) {
      resolve(billInfoData);
    } else {
      reject();
    }
  });
};

onMounted(() => {
  formData.salesTimeBegin = dayjs().subtract(6, 'day').format('YYYY-MM-DD');
  formData.salesTimeEnd = dayjs().format('YYYY-MM-DD');
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
