<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
        <!-- ################# 送货单表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
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
          <template #button>
            <t-select v-model="printMode.printTempId" style="width: 240px" label="打印模板">
              <t-option
                v-for="item in onPrintTemplateList.list"
                :key="item.id"
                :label="item.tmplName"
                :value="item.id"
              />
            </t-select>
            <t-button theme="primary" :disabled="selectRowKeys?.length == 0" @click="onStartDeliveryClick">
              {{ t('delivery.startDelivery') }}
            </t-button>
            <t-button theme="default" :disabled="selectRowKeys?.length == 0" @click="onDeletedClick">
              {{ t('common.button.delete') }}
            </t-button>
            <cmp-print-button
              :template-id="printMode.printTempId"
              :show-icon="false"
              :disabled="selectRowKeys?.length == 0"
              :data="printData"
              @before-print="onPrintClick"
            >
              {{ t('common.button.rePrint') }}</cmp-print-button
            >
          </template>
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
          :hover="false"
          :fixed-height="true"
          :stripe="false"
          :header-affixed-top="true"
          :show-pagination="false"
        >
          <template #title> {{ t('delivery.tableDtlSubTilte') }} </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiWarehouse, DeliveryDtlVO, DeliveryVO } from '@/api/warehouse';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import commmon from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const { loading: loadingDeliveryDtl, setLoading: setLoadingDeliveryDtl } = useLoading();
const selectRowKeys = computed(() => {
  return tableRef.value?.getSelectedRowKeys();
});

// 获取 打印模板 下拉数据
const printMode = reactive({ printTempId: '' });
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  const res = await apiMain.printTmpl.getPrintTmplListByCategory({ category: 'DELIVERY' });
  onPrintTemplateList.list = res;
  if (res && res.length > 0) {
    printMode.printTempId = res[0].id;
  }
};

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
  };
});

const tableDeliveryColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('delivery.billNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('delivery.dateDelivery')}`, width: 140, colKey: 'dateDelivery' },
  { title: `${t('delivery.supplierCode')}`, width: 140, colKey: 'supplierCode' },
  { title: `${t('delivery.supplierName')}`, width: 240, colKey: 'supplierName' },
  { title: `${t('delivery.statusName')}`, width: 120, colKey: 'statusName' },
  { title: `${t('delivery.dateRealDelivery')}`, width: 160, colKey: 'dateRealDelivery' },
];

const tableDeliveryDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('delivery.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('delivery.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('delivery.lineSeq')}`, width: 120, colKey: 'lineSeq' },
  { title: `${t('delivery.lineSeq')}`, width: 120, colKey: 'lineSeq' },
  { title: `${t('delivery.batchLot')}`, width: 120, colKey: 'batchLot' },
  { title: `${t('delivery.qty')}`, width: 120, colKey: 'qty' },
  { title: `${t('delivery.receivedQty')}`, width: 120, colKey: 'receivedQty' },
  { title: `${t('delivery.memo')}`, width: 120, colKey: 'memo' },
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
  tableRef.value.setSelectedRowKeys([]);
  fetchTable();
};

// 加载送货单表格
const fetchTable = async () => {
  commmon.loadingPluginFullScreen(true);
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
    commmon.loadingPluginFullScreen(false);
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

// 批量删除送货单
const onDeletedClick = async () => {
  const ids = [];
  selectRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmDia = DialogPlugin({
    header: t('common.button.delete'),
    body: t('common.message.confirmDelete'),
    theme: 'warning',
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      try {
        setLoading(true);
        await apiWarehouse.delivery.deleteDelivery({
          ids,
        });
        fetchTable();
        confirmDia.hide();
        MessagePlugin.success(t('common.message.deleteSuccess'));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        confirmDia.hide();
      }
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};

// 开始送货
const onStartDeliveryClick = async () => {
  const ids = [];
  selectRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmDia = DialogPlugin({
    header: t('delivery.startDelivery'),
    body: t('delivery.isStartDelivery'),
    theme: 'warning',
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      try {
        await apiWarehouse.delivery.startDelivery({
          ids,
        });
        fetchTable();
        confirmDia.hide();
        MessagePlugin.success(t('common.message.saveSuccess'));
      } catch (e) {
        confirmDia.hide();
      }
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};

// 打印
const printData = ref([]);
const onPrintClick = async () => {
  let isSuccess = true;
  printData.value = [];
  const promiseAll = [];
  setLoading(true);
  try {
    selectRowKeys.value.forEach((element) => {
      const billInfo = tableDataDelivery.value.find((item: any) => item.id === element);
      if (billInfo) {
        const promiseQuery = getPrintBillInfo(billInfo.billNo).then((billInfoData: any) => {
          if (billInfoData) {
            const billDtls = billInfoData.deliveryDtlVOs;
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
  } catch (e) {
    console.log(e);
    isSuccess = false;
  } finally {
    setLoading(false);
  }
  return isSuccess;
};

// 获取送货单打印信息
const getPrintBillInfo = (billNo) => {
  return new Promise((resolve, reject) => {
    const billInfoData = apiWarehouse.delivery.getDeliveryInfo({
      pageNum: 1,
      pageSize: 9999,
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
  onPrintTemplateData(); // 获取 打印模板下拉数据
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
