<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" @reset="onRestCondition" />
        <!-- ################# 采购订单明细行表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          active-row-type="single"
          :table-column="tablePurchaseOrderDtlColumns"
          :table-data="tableDataPurchaseOrderDtl"
          :loading="loading"
          :total="dataTotal"
          max-height="300px"
          :hover="false"
          :stripe="false"
          :header-affixed-top="true"
          @refresh="fetchTable"
        >
          <template #title> {{ t('deliveryCreate.采购订单明细') }} </template>

          <template #button>
            <t-button theme="primary" :disabled="tableDataDelivery.length > 0" @click="onHandleGenernateDelivery">
              {{ t('deliveryCreate.生成') }}
            </t-button>
          </template>
          <template #curQty="{ row }">
            <t-input-number v-model="row.curQty" width="140" theme="normal"></t-input-number>
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-row>
      <!-- ################# 子数据数据 ###################### -->
      <cmp-card :span="12">
        <cmp-table
          ref="tableDtlRef"
          row-key="lineSeq"
          active-row-type="single"
          :table-column="tableDeliveryColumns"
          :table-data="tableDataDelivery"
          :loading="loadingDelivery"
          :total="dataTotal"
          :hover="false"
          :stripe="false"
          :fixed-height="true"
          :header-affixed-top="true"
          :show-pagination="false"
          @refresh="fetchTable"
        >
          <template #title>
            <span>
              {{ t('deliveryCreate.送货单信息') + ' ' + formData.billNo }}
            </span>
            <span v-if="formData.billNo" class="table-title-info">
              {{ t('deliveryCreate.送货日期') }}
            </span>
            <span v-if="formData.billNo">
              <t-date-picker v-model="formData.dateDelivery" allow-input clearable />
            </span>
          </template>
          <template #button>
            <t-select v-model="printMode.printTempId" style="width: 240px" label="打印模板">
              <t-option
                v-for="item in onPrintTemplateList.list"
                :key="item.id"
                :label="item.tmplName"
                :value="item.id"
              />
            </t-select>
            <t-button theme="default" :disabled="selectSubRowKeys?.length == 0" @click="onHandleRemove">
              {{ t('deliveryCreate.移除') }}
            </t-button>
            <t-button v-if="formData.billNo && isCanPrint === false" theme="primary" @click="onHandleSumbit">
              {{ t('deliveryCreate.提交') }}
            </t-button>
            <cmp-print-button
              :template-id="printMode.printTempId"
              :show-icon="false"
              :disabled="!isCanPrint"
              :data="printData"
              @before-print="onPrintClick"
            >
              {{ t('common.button.print') }}</cmp-print-button
            >
          </template>
          <template #batchLot="{ row }">
            <t-input v-model="row.batchLot" width="140" theme="normal"></t-input>
          </template>
          <template #batchLotQty="{ row }">
            <t-input-number v-model="row.batchLotQty" width="140" theme="normal"></t-input-number>
          </template>
          <template #qualityCharacteristics="{ row }">
            <t-input v-model="row.qualityCharacteristics" width="140" theme="normal"></t-input>
          </template>
          <template #memo="{ row }">
            <t-input v-model="row.memo" width="140"></t-input>
          </template>
          <template #op="{ row }">
            <t-link v-if="!isCanPrint" theme="primary" @click="onHandleDismantling(row)">
              {{ t('deliveryCreate.拆批次') }}
            </t-link>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiWarehouse, DeliveryDtlVO, DeliveryVO, PurchaseOrderDtlVO } from '@/api/warehouse';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const { loading: loadingDelivery } = useLoading();

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
const datePlanRangeDefault = ref([dayjs().add(0, 'day').format('YYYY-MM-DD')]);

const formData = reactive<DeliveryVO>({
  billNo: '',
  dateDelivery: datePlanRangeDefault.value[0],
});
// 选择主表数据
const selectRowKeys = computed(() => {
  return tableRef.value?.getSelectedRowKeys();
});
// 选择明细表数据
const selectSubRowKeys = computed(() => {
  return tableDtlRef.value?.getSelectedRowKeys();
});
// 查询组件值
const optsValue = ref({}) as any;

// 查询组件
const opts = computed(() => {
  return {
    purchaseOrderNo: {
      label: t('deliveryCreate.采购订单'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('deliveryCreate.采购订单')}`]),
    },
    supplierId: {
      label: t('deliveryCreate.供应商'),
      placeholder: t('common.placeholder.input', [`${t('deliveryCreate.供应商')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'supplierAuth',
      },
    },
    mitemId: {
      label: t('deliveryCreate.物料编码'),
      placeholder: t('common.placeholder.input', [`${t('deliveryCreate.物料编码')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'mitem',
      },
    },
  };
});

const tablePurchaseOrderDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('deliveryCreate.采购订单')}`, width: 140, colKey: 'purchaseOrderNo' },
  { title: `${t('deliveryCreate.行号')}`, width: 80, colKey: 'billLineNo' },
  { title: `${t('deliveryCreate.供应商编码')}`, width: 140, colKey: 'supplierCode' },
  { title: `${t('deliveryCreate.供应商名称')}`, width: 140, colKey: 'supplierName' },
  { title: `${t('deliveryCreate.物料编码')}`, width: 140, colKey: 'mitemCode' },
  { title: `${t('deliveryCreate.物料名称')}`, width: 140, colKey: 'mitemName' },
  { title: `${t('deliveryCreate.物料描述')}`, width: 140, colKey: 'mitemDesc' },
  { title: `${t('deliveryCreate.仓库')}`, width: 140, colKey: 'warehouseName' },
  { title: `${t('deliveryCreate.需求数量')}`, width: 90, colKey: 'qty' },
  { title: `${t('deliveryCreate.已生成数量')}`, width: 100, colKey: 'generateQty' },
  { title: `${t('deliveryCreate.已接收数量')}`, width: 100, colKey: 'arrivaledQty' },
  { title: `${t('deliveryCreate.已入库数量')}`, width: 100, colKey: 'stockInQty' },
  { title: `${t('deliveryCreate.退货数量')}`, width: 100, colKey: 'returnQty' },
  { title: `${t('deliveryCreate.剩余数量')}`, width: 100, colKey: 'remainQty' },
  { title: `${t('deliveryCreate.要求到货时间')}`, width: 170, colKey: 'datetimeArrive' },
  { title: `${t('deliveryCreate.本次生成数量')}`, width: 200, colKey: 'curQty', fixed: 'right' },
];

const tableDeliveryColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('deliveryCreate.采购订单')}`, width: 120, colKey: 'poNo' },
  { title: `${t('deliveryCreate.行号')}`, width: 80, colKey: 'poLineNo' },
  { title: `${t('deliveryCreate.供应商名称')}`, width: 120, colKey: 'supplierName' },
  { title: `${t('deliveryCreate.物料编码')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('deliveryCreate.物料名称')}`, width: 140, colKey: 'mitemName' },
  { title: `${t('deliveryCreate.本次生成数量')}`, width: 120, colKey: 'curQty' },
  { title: `${t('deliveryCreate.批次号')}`, width: 180, colKey: 'batchLot' },
  { title: `${t('deliveryCreate.批次数量')}`, width: 180, colKey: 'batchLotQty' },
  { title: `${t('deliveryCreate.质量特性')}`, width: 180, colKey: 'qualityCharacteristics' },
  { title: `${t('deliveryCreate.备注')}`, width: 200, colKey: 'memo' },
  { colKey: 'op', title: t('common.button.operation'), width: '100', fixed: 'right' },
];

const tableDataPurchaseOrderDtl = ref<PurchaseOrderDtlVO[]>([]);
const tableDataDelivery = ref<DeliveryDtlVO[]>([]);

const dataTotal = ref(0);
const tableRef = ref();
const tableDtlRef = ref();
const selectPurchaseOrderDtlRow = ref<PurchaseOrderDtlVO>({}); // 选中行

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  optsValue.value = data;
  selectPurchaseOrderDtlRow.value.id = '';
  tableRef.value.setSelectedRowKeys([]);
  fetchTable();
};

// 点击 重置事件
const onRestCondition = async () => {
  // 重置查询条件
  reset();
};

// 加载采购明细单表格
const fetchTable = async () => {
  setLoading(true);
  try {
    const data = await apiWarehouse.delivery.getPurchaseOrderDtl({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    });
    if (data.list && data.list.length > 0) {
      data.list.forEach((element: PurchaseOrderDtlVO) => {
        element.curQty = element.remainQty;
      });
    }
    tableDataPurchaseOrderDtl.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 生成送货单信息
const onHandleGenernateDelivery = async () => {
  if (selectRowKeys.value && selectRowKeys.value.length === 0) {
    MessagePlugin.error(t('deliveryCreate.请先勾选行'));
    return;
  }
  const selectRowModels = tableDataPurchaseOrderDtl.value.filter((n) => selectRowKeys.value.indexOf(n.id) > -1);
  if (!_.isNil(selectRowModels)) {
    const tempList = selectRowModels.filter((n) => !(n.curQty > 0));
    if (tempList.length > 0) {
      MessagePlugin.error(t('deliveryCreate.请先填写勾选行的本次生成数量'));
      return;
    }
    const checkList = selectRowModels.filter((n) => n.curQty > n.remainQty);
    if (checkList.length > 0) {
      MessagePlugin.error(t('deliveryCreate.本次生成数量不能大于剩余数量'));
      return;
    }
  }
  // 如果送货单号已生成, 则无需重复生成
  if (!formData.billNo) {
    const billNo = await apiWarehouse.billSeq.getBillNo({ prefix: 'SHD' });
    if (billNo) {
      formData.billNo = billNo;
    }
  }
  tableDataDelivery.value = [];
  if (selectRowModels) {
    let index = 1;
    const keys = [];
    selectRowModels.forEach((element: PurchaseOrderDtlVO) => {
      const deliveryDtlInfo = {} as DeliveryDtlVO;
      Object.assign(deliveryDtlInfo, element);
      deliveryDtlInfo.purchaseDtlId = element.id;
      deliveryDtlInfo.lineSeq = index;
      deliveryDtlInfo.mitemId = element.mitemId;
      deliveryDtlInfo.qty = element.curQty;
      deliveryDtlInfo.poNo = element.purchaseOrderNo;
      deliveryDtlInfo.poLineNo = element.billLineNo;
      deliveryDtlInfo.datePo = element.datetimeArrive;
      deliveryDtlInfo.batchLotQty = element.curQty;
      deliveryDtlInfo.batchLot = '';
      deliveryDtlInfo.supplierId = element.supplierId;
      keys.push(deliveryDtlInfo.lineSeq);
      tableDataDelivery.value.push(deliveryDtlInfo);
      index++;
    });
    // 生成勾选全部
    tableDtlRef.value?.setSelectedRowKeys(keys);
  }
};
// 打印, 目前只支持单笔打印
const isCanPrint = ref(false);
const printData = ref([]);
const onPrintClick = async () => {
  let isSuccess = true;
  printData.value = [];
  const promiseAll = [];
  setLoading(true);
  try {
    const promiseQuery = getPrintBillInfo(formData.billNo).then((billInfoData: any) => {
      if (billInfoData) {
        const billDtls = billInfoData.deliveryDtlVOs;
        printData.value.push({
          variable: billInfoData,
          dataSource: { BillInfoList: billInfoData, BillDetailInfoList: billDtls },
        });
      }
    });
    promiseAll.push(promiseQuery);
    await Promise.all(promiseAll);
    MessagePlugin.success(t('deliveryCreate.打印成功'));
    reset();
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

// 拆批次
const onHandleDismantling = async (row: DeliveryDtlVO) => {
  const deliveryDtlInfo = {} as DeliveryDtlVO;
  Object.assign(deliveryDtlInfo, row);
  deliveryDtlInfo.batchLot = '';
  deliveryDtlInfo.batchLotQty = 0;
  tableDataDelivery.value.splice(row.lineSeq, 0, deliveryDtlInfo);
  sortTable();
};

// 移除
const onHandleRemove = async () => {
  tableDataDelivery.value = tableDataDelivery.value.filter((n) => !(selectSubRowKeys.value.indexOf(n.lineSeq) > -1));
  sortTable();
};

// 送货单行号赋值排序
const sortTable = () => {
  const rowIndex = ref(1);
  if (tableDataDelivery.value) {
    tableDataDelivery.value.forEach((element) => {
      element.lineSeq = rowIndex.value; // 自动生成排序'
      rowIndex.value++;
    });
  }
};

// 提交
const onHandleSumbit = async () => {
  await apiWarehouse.delivery.createDelivery({
    deliveryVO: formData,
    deliveryDtlVOList: tableDataDelivery.value,
  });
  isCanPrint.value = true;
  fetchTable();
  MessagePlugin.success(t('deliveryCreate.提交成功请打印'));
};

const reset = () => {
  clearDeliveryTable();
  isCanPrint.value = false;
  formData.billNo = '';
  formData.dateDelivery = datePlanRangeDefault.value[0].toString();
  tableRef.value?.setSelectedRowKeys([]);
  tableDtlRef.value?.setSelectedRowKeys([]);
};

// 清除送货单明细表格
const clearDeliveryTable = async () => {
  tableDataDelivery.value.splice(0, tableDataDelivery.value.length);
};

onMounted(() => {
  onPrintTemplateData(); // 获取 打印模板下拉数据
  fetchTable();
});
</script>

<style lang="less" scoped>
.table-title-info {
  margin-left: 36px;
}
</style>
