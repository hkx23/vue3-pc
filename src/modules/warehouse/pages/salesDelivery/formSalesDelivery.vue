<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('salesDelivery.formtitle')"
    width="95%"
    top="56px"
    :confirm-btn="{
      content: t('salesDelivery.submit'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
    class="add-form"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-form ref="formRef" :data="formData" :show-cancel="true" :show-error-message="false" label-width="120px">
          <t-row :gutter="[32, 16]">
            <t-col :span="4">
              <t-form-item :label="t('salesDelivery.billNo')" name="billNo" :required-mark="true">
                <t-input v-model="formData.billNo" disabled :placeholder="t('salesDelivery.placeholderBillNo')" />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('salesDelivery.customerCode')" name="customerCode" :required-mark="true">
                <bcmp-select-business
                  v-model="formData.customerCode"
                  :disabled="formData.isLock"
                  type="customer"
                  :show-title="false"
                  @selection-change="customerCodeChange"
                ></bcmp-select-business>
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('salesDelivery.customerName')" name="customerName" :required-mark="true">
                <t-input v-model="formData.customerName" disabled />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('salesDelivery.warehouseId')" name="warehouseId">
                <bcmp-select-business
                  v-model="formData.warehouseId"
                  :disabled="formData.isLock"
                  type="warehouseSalesDelivery"
                  :show-title="false"
                  @selection-change="warehouseChange"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('salesDelivery.address')" name="address" :required-mark="true">
                <t-input v-model="formData.address" />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('salesDelivery.salesTime')" name="salesTime" :required-mark="true">
                <t-date-picker v-model="formData.salesTime" enable-time-picker clearable />
              </t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item :label="t('salesDelivery.memo')" name="memo">
                <t-input v-model="formData.memo" />
              </t-form-item>
            </t-col>
          </t-row>

          <!-- table表格 -->
        </t-form>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <cmp-card :ghost="true">
          <div style="margin-bottom: 8px">
            <t-button theme="primary" :content="t('common.button.add')" @click="onShowSalesOrder" />
            <t-button theme="primary" :content="t('common.button.delete')" @click="onDeleteSalesOrder" />
          </div>
        </cmp-card>
        <cmp-card :ghost="true">
          <t-table
            ref="tableRef"
            row-key="id"
            :show-pagination="false"
            :show-setting="false"
            :loading="loadingSales"
            :columns="tableSalesDtlColumns"
            :data="tableSalesDtlData"
            :selected-row-keys="tableSalesDtlKeys"
            @select-change="onSalesDtlSelectedChange"
          >
            <template #warehouseName="{ row }">
              <bcmp-select-business
                v-model="row.warehouseId"
                label-field="warehouseName"
                type="warehouseSalesDelivery"
                :show-title="false"
                @selection-change="(value) => warehouseSubChange(value, row)"
              ></bcmp-select-business>
            </template>
            <template #reqQty="{ row }">
              <t-input-number
                v-model="row.reqQty"
                style="width: 120px"
                theme="normal"
                :placeholder="t('salesDelivery.inputOnhandQty')"
                :disabled="_.isNil(row.onhandQty) || row.onhandQty === 0"
              />
            </template>
            <template #memo="{ row }">
              <t-input v-model="row.memo" theme="normal" />
            </template>
          </t-table>
        </cmp-card>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <!-- ################# 汇总表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          row-key="id"
          :show-pagination="false"
          :show-toolbar="false"
          :table-column="tableSalesSumColumns"
          :table-data="tableSalesSumData"
          :hover="false"
          :stripe="false"
        >
        </cmp-table>
      </cmp-card>

      <t-dialog
        v-model:visible="showSalesOrdeVisible"
        width="80vw"
        :header="t('salesDelivery.salesOrde')"
        :on-confirm="onSalesOrdeConfirm"
      >
        <cmp-card>
          <t-row>
            <t-col>
              <t-input
                v-model="formData.salesOrderBillNo"
                :label="t('salesDelivery.salesOrde')"
                :placeholder="t('salesDelivery.inputSalesOrder')"
              />
            </t-col>
            <t-col flex="1">
              <t-button theme="primary" style="margin-left: 10px" @click="onSalesOrdeSearch">{{ $t('搜索') }}</t-button>
            </t-col>
          </t-row>
        </cmp-card>
        <cmp-card>
          <cmp-table
            row-key="id"
            :table-column="tableSalesOrderColumns"
            :table-data="tableSalesOrderData"
            :loading="loadingSalesOrder"
            :total="tableSalesOrderTotal"
            :hover="false"
            :stripe="false"
            :show-toolbar="false"
            :header-affixed-top="true"
            :selected-row-keys="tableSelectedSalesOrderKeys"
            @select-change="onSalesOrderSelectedChange"
            @refresh="fetchSalesOrderTable"
          ></cmp-table>
        </cmp-card>
      </t-dialog>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref } from 'vue';

import { Customer } from '@/api/main';
import { api as apiWarehouse, SaleOrderDtlVO } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { pageUI: pageSalesOrder } = usePage();
const Emit = defineEmits(['showCloseEvent']);
const { loading: loadingSales, setLoading: setLoadingSales } = useLoading();
const { loading: loadingSalesOrder, setLoading: setLoadingSalesOrder } = useLoading();

const { t } = useLang();
const formVisible = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);

const formData = reactive({
  salesOrderBillNo: '',
  billNo: '',
  salesTime: '',
  address: '',
  customerId: '',
  customerCode: '',
  customerName: '',
  warehouseId: '',
  warehouseCode: '',
  warehouseName: '',
  memo: '',
  isLock: false,
  selectRowId: '',
});

// 自动计算新增界面的汇总表格信息
const tableSalesSumData = computed(() => {
  const list = [];
  if (tableSalesDtlData.value && tableSalesDtlData.value.length > 0) {
    // eslint-disable-next-line no-lone-blocks
    {
      const groupedDatas = _.groupBy(tableSalesDtlData.value, 'sumKey') as any;
      if (groupedDatas) {
        Object.keys(groupedDatas).forEach((groupKey) => {
          const model = {} as any;
          const groupedData = groupedDatas[groupKey];
          if (groupedData && groupedData.length > 0) {
            Object.assign(model, groupedData[0]);
            model.reqQty = _.sumBy(groupedData, (o: any) => o.reqQty);
            list.push(model);
          }
        });
      }
    }
  }
  console.log(list);
  return list;
});
const tableSalesSumColumns: PrimaryTableCol<TableRowData>[] = [
  { title: t('salesDelivery.物料编码'), width: 120, colKey: 'mitemCode' },
  { title: t('salesDelivery.物料描述'), width: 120, colKey: 'mitemDesc' },
  { title: t('salesDelivery.单位'), width: 120, colKey: 'uomName' },
  { title: t('salesDelivery.仓库'), width: 120, colKey: 'warehouseName' },
  // { title: '货区', width: 120, colKey: 'districtName' },
  { title: t('salesDelivery.本次发货数'), width: 120, colKey: 'reqQty' },
  { title: t('salesDelivery.库存现有量'), width: 120, colKey: 'onhandQty' },
  { title: t('salesDelivery.库存可用量'), width: 120, colKey: 'canOnhandQty' },
];

const tableSalesDtlKeys = ref([]);
const tableSalesDtlData = ref<SaleOrderDtlVO[]>([]);
const tableSalesDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: t('salesDelivery.销售订单'), width: 150, colKey: 'billNo' },
  { title: t('salesDelivery.销售订单行'), width: 120, colKey: 'lineSeq' },
  { title: t('salesDelivery.客户名称'), width: 120, colKey: 'customerName' },
  { title: t('salesDelivery.产品编码'), width: 120, colKey: 'mitemCode' },
  { title: t('salesDelivery.总需求数量'), width: 120, colKey: 'requireQty' },
  { title: t('salesDelivery.已发货数量'), width: 120, colKey: 'deliveriedQty' },
  { title: t('salesDelivery.待发货数量'), width: 120, colKey: 'waitDeliveriedQty' },
  { title: t('salesDelivery.仓库'), width: 160, colKey: 'warehouseName' },
  // { title: '货区', width: 160, colKey: 'districtName' },
  { title: t('salesDelivery.库存现有量'), width: 120, colKey: 'onhandQty' },
  { title: t('salesDelivery.库存可用量'), width: 120, colKey: 'canOnhandQty' },
  { title: t('salesDelivery.本次发货数'), width: 140, colKey: 'reqQty' },
  { title: t('salesDelivery.单位'), width: 120, colKey: 'uomName' },
  { title: t('salesDelivery.备注'), width: 120, colKey: 'memo' },
];

const onSalesDtlSelectedChange = (keys) => {
  tableSalesDtlKeys.value = keys;
};

const tableSelectedSalesOrderKeys = ref([]);
const tableSelectedSalesOrderRows = ref<SaleOrderDtlVO[]>([]);
const showSalesOrdeVisible = ref(false);
const tableSalesOrderTotal = ref(0);
const tableSalesOrderData = ref([]);
const tableSalesOrderColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: t('salesDelivery.销售订单'), width: 150, colKey: 'billNo' },
  { title: t('salesDelivery.客户名称'), width: 120, colKey: 'customerName' },
  { title: t('salesDelivery.产品编码'), width: 120, colKey: 'mitemCode' },
  { title: t('salesDelivery.要求发货时间'), width: 120, colKey: 'datetimeDelivery' },
  { title: t('salesDelivery.要求发货数量'), width: 120, colKey: 'requireQty' },
  { title: t('salesDelivery.已发货数量'), width: 120, colKey: 'deliveriedQty' },
  { title: t('salesDelivery.备注'), width: 120, colKey: 'memo' },
];

const warehouseChange = async (val: any) => {
  formData.warehouseId = val.warehouseId;
  formData.warehouseCode = val.warehouseCode;
  formData.warehouseName = val.warehouseName;

  if (!_.isEmpty(tableSalesDtlData.value)) {
    tableSalesDtlData.value.forEach(async (item) => {
      item.warehouseId = val.warehouseId;
      item.warehouseCode = val.warehouseCode;
      item.warehouseName = val.warehouseName;
      item.districtId = '';
      item.districtCode = '';
      item.districtName = '';

      await getMitemOnhandQtyByWarehouse(item);
    });
  }
};
const customerCodeChange = (val: Customer) => {
  if (_.isEmpty(val)) {
    tableSalesDtlData.value = [];
  } else {
    formData.customerId = val.id;
    formData.customerCode = val.customerCode;
    formData.customerName = val.customerName;
    if (tableSalesDtlData.value.length > 0 && tableSalesDtlData.value[0].customerCode !== formData.customerCode) {
      tableSalesDtlData.value = [];
    }
  }
};

const onShowSalesOrder = () => {
  if (_.isEmpty(formData.customerId)) {
    MessagePlugin.error(t('salesDelivery.请选择客户'));
    return;
  }

  showSalesOrdeVisible.value = true;
  fetchSalesOrderTable();
};
const onDeleteSalesOrder = () => {
  if (tableSalesDtlKeys.value.length === 0 || tableSalesDtlKeys.value.length === 0) {
    MessagePlugin.error(t('salesDelivery.请选择需要删除的行'));
    return;
  }
  tableSalesDtlKeys.value.forEach((delItem) => {
    const index = tableSalesDtlData.value.findIndex((n) => n.id === delItem);
    if (index > -1) {
      tableSalesDtlData.value.splice(index, 1);
    }
  });
};
const onSalesOrdeSearch = () => {
  fetchSalesOrderTable();
};
const onSalesOrderSelectedChange = (keys, rows) => {
  tableSelectedSalesOrderKeys.value = keys;
  tableSelectedSalesOrderRows.value = rows.selectedRowData;
};
const onSalesOrdeConfirm = () => {
  tableSalesDtlKeys.value = [];
  tableSelectedSalesOrderRows.value.forEach((item) => {
    const index = tableSalesDtlData.value.findIndex((n) => n.id === item.id);
    if (index === -1) {
      tableSalesDtlData.value.push(item);
    }
  });
  showSalesOrdeVisible.value = false;
};

const warehouseSubChange = async (val: any, row: SaleOrderDtlVO) => {
  // debugger;
  row.warehouseId = val.warehouseId;
  row.warehouseCode = val.warehouseCode;
  row.warehouseName = val.warehouseName;
  await getMitemOnhandQtyByWarehouse(row);
};

const getMitemOnhandQtyByWarehouse = async (row: SaleOrderDtlVO) => {
  if (_.isEmpty(row)) {
    row.reqQty = 0;
  } else {
    const data = await apiWarehouse.onhandQty.getMitemOnhandQtyByWarehouse({
      warehouseId: row.warehouseId,
      mitemId: row.mitemId,
    });
    row.onhandQty = data.onhandQty;
    row.canOnhandQty = data.canOnhandQty;
    row.reqQty = _.isFinite(row.reqQty) && row.reqQty > 0 ? row.reqQty : 0; // 如果有值，保留原输入
  }
};

// 加载销售订单信息
const fetchSalesOrderTable = async () => {
  try {
    setLoadingSalesOrder(true);
    tableSalesOrderData.value = [];
    tableSalesOrderTotal.value = 0;
    tableSelectedSalesOrderKeys.value = [];
    tableSelectedSalesOrderRows.value = [];

    const data = await apiWarehouse.saleOrderDtl.getSaleOrderDtlList({
      pageNum: pageSalesOrder.value.page,
      pageSize: pageSalesOrder.value.rows,
      keyword: formData.salesOrderBillNo,
      customerId: formData.customerId,
    });
    tableSalesOrderData.value = data.list;
    tableSalesOrderTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingSalesOrder(false);
  }
};

// 销售发货制单界面提交
const onConfirmForm = async () => {
  try {
    if (!checkSubmit()) {
      return;
    }
    setLoadingSales(true);
    await apiWarehouse.saleDelivery.submitSalesDelivery({
      ...formData,
      saleOrderDtlVOList: tableSalesDtlData.value,
    });
    MessagePlugin.success(t('salesDelivery.保存成功'));
    formVisible.value = false;
    Emit('showCloseEvent', false);
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingSales(false);
  }
};

// 提交的校验
const checkSubmit = () => {
  let isSuccess = true;
  if (_.isEmpty(formData.customerId)) {
    isSuccess = false;
    MessagePlugin.error(t('salesDelivery.请选择客户'));
  }
  if (_.isEmpty(formData.address)) {
    isSuccess = false;
    MessagePlugin.error(t('salesDelivery.请输入发货地址'));
  }
  if (_.isEmpty(formData.salesTime)) {
    isSuccess = false;
    MessagePlugin.error(t('salesDelivery.请选择发货时间'));
  }
  if (tableSalesDtlData.value && tableSalesDtlData.value.length > 0) {
    tableSalesDtlData.value.forEach((item) => {
      if (!_.isNumber(item.reqQty) || item.reqQty <= 0) {
        isSuccess = false;
        MessagePlugin.error(t('salesDelivery.请输入发货数量'));
      }
      if (_.isEmpty(item.warehouseId)) {
        isSuccess = false;
        MessagePlugin.error(t('salesDelivery.请选择仓库'));
      }
    });
  } else {
    isSuccess = false;
    MessagePlugin.error(t('salesDelivery.请选择销售订单'));
  }
  if (tableSalesSumData.value && tableSalesSumData.value.length > 0) {
    tableSalesSumData.value.forEach((item) => {
      if (item.reqQty > item.canOnhandQty) {
        isSuccess = false;
        MessagePlugin.error(t('salesDelivery.本次发货数量不能大于库存现有量'));
      }
    });
  }

  return isSuccess;
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  tableSalesDtlData.value = [];
  for (const key in formData) {
    formData[key] = null;
  }
};

const showPopform = () => {
  formVisible.value = true;
};

defineExpose({
  form: formRef,
  reset,
  showPopform,
});
</script>
<style lang="less" scoped>
:deep(.t-dialog__body) {
  padding: 0 !important;
}

:deep(.t-dialog) {
  background: var(--td-bg-color-page) !important;
}
</style>
