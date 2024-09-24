<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
        <!-- ################# 处理组表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          active-row-type="single"
          :table-column="tableAllocationColumns"
          :table-data="tableDataAllocation"
          :loading="loading"
          :total="dataTotal"
          max-height="300px"
          :hover="false"
          :stripe="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
          @cell-click="onEditMaterialRowClick"
        >
          <template #button>
            <t-button theme="primary" @click="onClickAddMaterialRule">
              {{ t('common.button.add') }}
            </t-button>
            <t-button theme="default" :disabled="selectRowKeys?.length == 0" @click="onBatchCompleteClick">
              {{ t('allocation.complete') }}
            </t-button>
            <t-button theme="default" :disabled="selectRowKeys?.length == 0" @click="onBatchCancelledClick">
              {{ t('allocation.cancel') }}
            </t-button>
            <!-- :disabled="!(selectRowKeys?.length == 1)" -->
            <cmp-print-button
              template-code="TB"
              :show-icon="false"
              :disabled="selectRowKeys?.length == 0"
              :data="printData"
              @before-print="onPrintClick"
            >
              {{ t('common.button.print') }}</cmp-print-button
            >
          </template>
          <template #title> {{ t('allocation.tableSubTilte') }} </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-row>
      <!-- ################# 子数据数据 ###################### -->
      <cmp-card :span="12">
        <div class="pack-dtl-table">
          <cmp-table
            ref="tableDtlRef"
            row-key="id"
            active-row-type="single"
            :table-column="tableMaterialDtlColumns"
            :table-data="tableDataAllocationDtl"
            :show-pagination="false"
            :show-toolbar="false"
            :loading="loadingMaterialDtl"
            max-height="600px"
            :hover="false"
            :stripe="false"
            :header-affixed-top="true"
          ></cmp-table>

          <!-- <t-enhanced-table
            ref="tableDtlRef"
            lazy-load
            row-key="index"
            :columns="tableMaterialDtlColumns"
            :data="tableDataAllocationDtl"
            :tree="treeConfig"
            active-row-type="single"
            :loading="loadingMaterialDtl"
            :header-affixed-top="true"
            :bordered="false"
            :resizable="true"
          >
          </t-enhanced-table> -->
        </div>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!--调拨制单主表弹框-->
  <formAllocation
    ref="formRef"
    :is-add="isAdd"
    :row="selectMaterialRow"
    @show-close-event="onHandleShowClose"
  ></formAllocation>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref } from 'vue';

import { AllocationDTO, api as apiWarehouse } from '@/api/warehouse';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formAllocation from './formAllocation.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const { loading: loadingMaterialDtl, setLoading: setLoadingMaterialDtl } = useLoading();
const isAdd = ref(true);

const datePlanRangeDefault = ref([
  dayjs().subtract(31, 'day').format('YYYY-MM-DD 00:00:00'),
  dayjs().add(1, 'day').format('YYYY-MM-DD 23:59:59'),
]);
// 查询组件值
const optsValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('allocation.billNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('allocation.billNo')}`]),
    },
    warehouseId: {
      placeholder: t('common.placeholder.select', [`${t('allocation.warehouseId')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'warehouseAuth',
        title: t('allocation.warehouseId'),
      },
    },
    toWarehouseId: {
      placeholder: t('common.placeholder.select', [`${t('allocation.toWarehouseId')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'warehouseAuth',
        title: t('allocation.toWarehouseId'),
      },
    },
    mitemId: {
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.select', [`${t('allocation.mitemId')}`]),
      bind: {
        type: 'mitem',
        title: t('allocation.mitemId'),
      },
    },
    billType: {
      label: t('allocation.billType'),
      comp: 't-select',
      placeholder: t('common.placeholder.select', [`${t('allocation.billType')}`]),
      bind: {
        options: billTypeOptions,
      },
    },
    datePlanRange: {
      label: t('allocation.createTime'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('common.placeholder.input', [`${t('allocation.createTime')}`]),
      bind: {
        enableTimePicker: true,
      },
    },
    status: {
      label: t('allocation.statusName'),
      comp: 't-checkbox-group',
      flex: '600px',
      defaultVal: [],
      bind: {
        class: 'check-box-conditon',
        options: statusOption.value,
        lazyLoad: true,
      },
    },
  };
});

// 下拉初始数据
const billTypeOptions = [
  { label: '调拨出库', value: 'ALLOCATION_OUT' },
  { label: '跨组织调拨', value: 'ALLOCATION_ORG' },
  { label: '调拨出入库', value: 'ALLOCATION_IN_OUT' },
];

// 状态下拉初始数据
const statusOption = ref([
  { label: '全选', value: '', checkAll: true },
  { value: 'CREATED', label: '已创建' },
  { value: 'PICKING', label: '调拨中' },
  { value: 'RECEIPTED', label: '已完成' },
  { value: 'CANCELED', label: '已取消' },
]);

const tableAllocationColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('allocation.billNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('allocation.orgId')}`, width: 100, colKey: 'orgName' },
  { title: `${t('allocation.warehouseId')}`, width: 100, colKey: 'warehouseName' },
  { title: `${t('allocation.toOrgId')}`, width: 100, colKey: 'toOrgName' },
  { title: `${t('allocation.toWarehouseId')}`, width: 100, colKey: 'toWarehouseName' },
  { title: `${t('allocation.billType')}`, width: 80, colKey: 'billTypeName' },
  { title: `${t('allocation.statusName')}`, width: 80, colKey: 'statusName' },
  { title: `${t('business.main.creator')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('business.main.timeCreate')}`, width: 140, colKey: 'timeCreate' },
  { title: `${t('business.main.modifier')}`, width: 110, colKey: 'modifierName' },
  { title: `${t('business.main.timeModified')}`, width: 140, colKey: 'timeModified' },
];

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('allocation.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('allocation.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('allocation.uomName')}`, width: 120, colKey: 'uomName' },
  { title: `${t('allocation.reqQty')}`, width: 140, colKey: 'reqQty' },
  { title: `${t('allocation.pickQty')}`, width: 120, colKey: 'pickQty' },
];

const printData = ref([]);
const tableDataAllocation = ref([]);
const tableDataAllocationDtl = ref([]);

const formVisible = ref(false); // 显示和隐藏调拨制单弹出框
const formRef = ref(null); // 规则主表
const dataTotal = ref(0);
const tableRef = ref();
const tableDtlRef = ref();
const selectMaterialRow = ref({}) as any; // 选中调拨制单行

const selectRowKeys = computed(() => {
  return tableRef.value?.getSelectedRowKeys();
});

// 点击调拨制单行
const onEditMaterialRowClick = (rowObject: any) => {
  console.log(`调拨制单表格点击:${{ rowObject }}`);
  selectMaterialRow.value = rowObject.row;
  fetchMaterialDtlTable();
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  optsValue.value = data;
  selectMaterialRow.value.id = '';
  tableRef.value.setSelectedRowKeys([]);
  fetchTable();
};

// 加载调拨制单表格
const fetchTable = async () => {
  setLoading(true);
  try {
    if (optsValue.value.datePlanRange) {
      if (optsValue.value.datePlanRange[0]) {
        optsValue.value.datetimeStart = optsValue.value.datePlanRange[0].toString();
      }
      if (optsValue.value.datePlanRange[1]) {
        optsValue.value.datetimeEnd = optsValue.value.datePlanRange[1].toString();
      }
    }
    if (optsValue.value.status) {
      optsValue.value.statusList = optsValue.value.status.join(',');
    }

    const data = (await apiWarehouse.allocation.getAllocationList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    })) as any;
    tableDataAllocation.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
    fetchMaterialDtlTable();
  }
};

// 批量完成
const onBatchCompleteClick = async (row: any) => {
  const ids = [];
  selectRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmDia = DialogPlugin({
    header: t('allocation.complete'),
    body: t('allocation.confirmComplete'),
    theme: 'warning',
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      console.log(row);
      const deleteModel: AllocationDTO = {
        cancelledIds: ids,
      };
      await apiWarehouse.allocation.allocationComplete(deleteModel);
      fetchTable();
      confirmDia.hide();
      MessagePlugin.success(t('common.message.saveSuccess'));
      tableRef.value.setSelectedRowKeys([]);
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};

// 批量作废
const onBatchCancelledClick = async (row: any) => {
  const ids = [];
  selectRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmDia = DialogPlugin({
    header: t('allocation.cancel'),
    body: t('allocation.confirmDelete'),
    theme: 'warning',
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      try {
        console.log(row);
        const deleteModel: AllocationDTO = {
          cancelledIds: ids,
        };
        await apiWarehouse.allocation.allocationCanceled(deleteModel);
        fetchTable();
        confirmDia.hide();
        MessagePlugin.success(t('allocation.deleteSuccess'));
        tableRef.value.setSelectedRowKeys([]);
      } catch (e) {
        confirmDia.hide();
      }
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};

// 打印, 目前只支持单笔打印
const onPrintClick = async () => {
  let isSuccess = true;
  printData.value = [];
  const promiseAll = [];
  setLoading(true);
  try {
    selectRowKeys.value.forEach((element) => {
      const billInfo = tableDataAllocation.value.find((item: any) => item.id === element);
      if (billInfo) {
        const promiseQuery = getPrintBillInfo(billInfo.billNo).then((billInfoData: any) => {
          if (billInfoData) {
            const billDtls = billInfoData.dtls;
            // printData.value.push([{ dataSource: billInfoData, datasource1: billDtls }]);
            printData.value.push({
              variable: billInfoData,
              dataSource: { BillInfoList: billInfoData, BillDetailInfoList: billDtls },
            });
          }
        });
        promiseAll.push(promiseQuery);
      }
    });
    await Promise.all(promiseAll);
    tableRef.value.setSelectedRowKeys([]);
  } catch (e) {
    console.log(e);
    isSuccess = false;
  } finally {
    setLoading(false);
  }
  return isSuccess;
};

const getPrintBillInfo = (billNo) => {
  return new Promise((resolve, reject) => {
    const billInfoData = apiWarehouse.allocationExecute.getAllocationByBillNo({
      billNo,
      isNeedCheck: false,
      businessCategoryCode: 'TBCK',
    }) as any;
    if (billInfoData) {
      resolve(billInfoData);
    } else {
      reject();
    }
  });
};

// 加载调拨制单明细表格
const fetchMaterialDtlTable = async () => {
  console.log(`加载调拨制单明细表格:${selectMaterialRow.value.id}`);
  if (!selectMaterialRow.value.id) {
    clearMaterialDtlTable();
    return;
  }
  try {
    setLoadingMaterialDtl(true);
    const data = (await apiWarehouse.allocation.tree({
      billNo: selectMaterialRow.value.billNo,
    })) as any;
    tableDataAllocationDtl.value = data;
    nextTick(() => {
      tableDtlRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMaterialDtl(false);
  }
};

// 清除调拨制单明细表格
const clearMaterialDtlTable = async () => {
  tableDataAllocationDtl.value = [];
};

// 弹出新增调拨制单界面
const onClickAddMaterialRule = () => {
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
