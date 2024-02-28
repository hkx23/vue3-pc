<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
        <!-- ################# 处理组表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          row-key="id"
          active-row-type="single"
          :table-column="tableMaterialRequisitionColumns"
          :table-data="tableDataMaterialRequisition"
          :loading="loading"
          :total="dataTotal"
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
            <t-button theme="default" :disabled="selectRowKeys?.length == 0" @click="onBatchCancelledClick">
              {{ t('materialRequisition.cancel') }}
            </t-button>
            <!-- :disabled="!(selectRowKeys?.length == 1)" -->
            <cmp-print-button
              template-code="LL"
              :disabled="selectRowKeys?.length == 0"
              :data="printData"
              @before-print="onPrintClick"
            />
          </template>
          <template #title> {{ t('materialRequisition.tableSubTilte') }} </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-row>
      <!-- ################# 子数据数据 ###################### -->
      <cmp-card :span="12">
        <div class="pack-dtl-table">
          <!-- 规则明细表格-->
          <t-enhanced-table
            ref="tableDtlRef"
            lazy-load
            row-key="index"
            :columns="tableMaterialDtlColumns"
            :data="tableDataMaterialRequisitionDtl"
            :tree="treeConfig"
            active-row-type="single"
            :loading="loadingMaterialDtl"
            :header-affixed-top="true"
            :bordered="false"
            :resizable="true"
          >
          </t-enhanced-table>
        </div>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!--领料制单主表弹框-->
  <formMaterialRequisition
    ref="formRef"
    :is-add="isAdd"
    :row="selectMaterialRow"
    @show-close-event="onHandleShowClose"
  ></formMaterialRequisition>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';

import { api as apiWarehouse, MaterialRequisitionDTO } from '@/api/warehouse';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formMaterialRequisition from './formMaterialRequisition.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const { loading: loadingMaterialDtl, setLoading: setLoadingMaterialDtl } = useLoading();
const isAdd = ref(true);

const datePlanRangeDefault = ref([dayjs().format('YYYY-MM-DD'), dayjs().subtract(-31, 'day').format('YYYY-MM-DD')]); // 初始化日期控件

// 查询组件值
const optsValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('materialRequisition.billNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('materialRequisition.billNo')}`]),
    },
    workshopCode: {
      label: t('materialRequisition.workshopCode'),
      placeholder: t('common.placeholder.input', [`${t('materialRequisition.workshopCode')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        valueField: 'orgCode',
      },
    },
    moCodes: {
      label: t('materialRequisition.moScheCode'),
      placeholder: t('common.placeholder.input', [`${t('materialRequisition.moScheCode')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        valueField: 'scheCode',
        isMultiple: true,
      },
    },
    datePlanRange: {
      label: t('materialRequisition.createTime'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('common.placeholder.input', [`${t('materialRequisition.createTime')}`]),
    },
    status: {
      label: t('materialRequisition.statusName'),
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
// 状态下拉初始数据
const statusOption = ref([
  { label: '全选', value: '', checkAll: true },
  { value: 'CREATE', label: '已创建' },
  { value: 'TRANSFERRED', label: '已完成' },
  { value: 'CANCELED', label: '已取消' },
]);

const tableMaterialRequisitionColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('materialRequisition.billNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('materialRequisition.workshopName')}`, width: 100, colKey: 'workshopName' },
  { title: `${t('materialRequisition.statusName')}`, width: 80, colKey: 'statusName' },
  { title: `${t('business.main.creator')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('business.main.timeCreate')}`, width: 140, colKey: 'timeCreate' },
  { title: `${t('business.main.modifier')}`, width: 110, colKey: 'modifierName' },
  { title: `${t('business.main.timeModified')}`, width: 140, colKey: 'timeModified' },
];

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('materialRequisition.moScheCode')}`, width: 200, colKey: 'scheCode' },
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('materialRequisition.uomName')}`, width: 120, colKey: 'uomName' },
  { title: `${t('materialRequisition.warehouseName')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('materialRequisition.toWarehouseName')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.moRequestQty')}`, width: 120, colKey: 'moRequestQty' },
  { title: `${t('materialRequisition.reqQty')}`, width: 140, colKey: 'reqQty' },
  { title: `${t('materialRequisition.pickQty')}`, width: 120, colKey: 'pickQty' },
];

const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
});
const printData = ref([]);
const tableDataMaterialRequisition = ref([]);
const tableDataMaterialRequisitionDtl = ref([]);

const formVisible = ref(false); // 显示和隐藏领料制单弹出框
const formRef = ref(null); // 规则主表
const dataTotal = ref(0);
const tableRef = ref();
const tableDtlRef = ref();
const selectMaterialRow = ref({}) as any; // 选中领料制单行

const selectRowKeys = computed(() => {
  return tableRef.value?.getSelectedRowKeys();
});

// 点击领料制单行
const onEditMaterialRowClick = (rowObject: any) => {
  console.log(`领料制单表格点击:${{ rowObject }}`);
  selectMaterialRow.value = rowObject.row;
  fetchMaterialDtlTable();
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  optsValue.value = data;
  selectMaterialRow.value.id = '';
  fetchTable();
};

// 加载领料制单表格
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
    if (optsValue.value.moCodes) {
      optsValue.value.moCodeList = optsValue.value.moCodes.map((item) => item.value).join(',');
    }

    const data = (await apiWarehouse.materialRequisition.getMaterialRequisitionList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    })) as any;
    tableDataMaterialRequisition.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
    fetchMaterialDtlTable();
  }
};

// 批量作废
const onBatchCancelledClick = async (row: any) => {
  const ids = [];
  selectRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmDia = DialogPlugin({
    header: t('materialRequisition.cancel'),
    body: t('materialRequisition.confirmDelete'),
    theme: 'warning',
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      console.log(row);
      const deleteModel: MaterialRequisitionDTO = {
        cancelledIds: ids,
      };
      await apiWarehouse.materialRequisition.materialRequisitionCanceled(deleteModel);
      fetchTable();
      confirmDia.hide();
      MessagePlugin.success(t('materialRequisition.deleteSuccess'));
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
      const billInfo = tableDataMaterialRequisition.value.find((item: any) => item.id === element);
      if (billInfo) {
        const promiseQuery = getPrintBillInfo(billInfo.billNo).then((billInfoData: any) => {
          if (billInfoData) {
            const billDtls = billInfoData.dtls;
            // printData.value.push([{ datasource: billInfoData, datasource1: billDtls }]);
            printData.value.push({
              variable: billInfoData,
              datasource: { BillInfoList: billInfoData, BillDetailInfoList: billDtls },
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

const getPrintBillInfo = (billNo) => {
  return new Promise((resolve, reject) => {
    const billInfoData = apiWarehouse.materialRequisitionExcute.getMaterialRequisitionByBillNo({
      billNo,
      isNeedCheck: false,
    }) as any;
    if (billInfoData) {
      resolve(billInfoData);
    } else {
      reject();
    }
  });
};

// 加载领料制单明细表格
const fetchMaterialDtlTable = async () => {
  console.log(`加载领料制单明细表格:${selectMaterialRow.value.id}`);
  if (!selectMaterialRow.value.id) {
    clearMaterialDtlTable();
    return;
  }
  try {
    setLoadingMaterialDtl(true);
    const data = (await apiWarehouse.materialRequisition.tree({
      billNo: selectMaterialRow.value.billNo,
    })) as any;
    tableDataMaterialRequisitionDtl.value = data;
    nextTick(() => {
      tableDtlRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMaterialDtl(false);
  }
};

// 清除领料制单明细表格
const clearMaterialDtlTable = async () => {
  tableDataMaterialRequisitionDtl.value = [];
};

// 弹出新增领料制单界面
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
