<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('returnManagement.formtitle')"
    width="70%"
    top="56px"
    :confirm-btn="{
      content: t('returnManagement.submit'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
    class="add-form"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-form ref="formRef" :data="formData" :show-cancel="true" :show-error-message="false" label-width="120px">
          <t-row style="margin-bottom: 10px">
            <t-col :span="5">
              <t-form-item :label="t('returnManagement.billNo')" name="billNo" required-mark>
                <t-input v-model="formData.billNo" disabled :placeholder="t('returnManagement.billNo_placeholder')" />
              </t-form-item>
            </t-col>
            <t-col :span="5">
              <t-form-item :label="t('returnManagement.billNoDesc')" name="billNoDesc" required-mark>
                <t-input v-model="formData.billNoDesc" />
              </t-form-item>
            </t-col>
          </t-row>
          <t-row :gutter="[32, 16]">
            <t-col :span="12">
              <t-form-item :label="t('returnManagement.memo')" name="memo" required-mark>
                <t-textarea v-model="formData.memo" />
              </t-form-item>
            </t-col>
          </t-row>
        </t-form>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-tabs :model-value="selectTabValue" :disabled="tabDisabled" @change="tabsChange">
          <t-tab-panel value="tab1" :label="t('returnManagement.tabName1')" :destroy-on-hide="false">
            <t-row style="margin-top: 10px; margin-bottom: 10px">
              <t-col style="margin-right: 10px">
                <bcmp-select-business
                  v-model="formData.supplierCode"
                  type="supplier"
                  :show-title="false"
                  @selection-change="onChangeSupplier"
                />
              </t-col>
              <t-col>
                <bcmp-select-business
                  v-model="formData.asnBillNo"
                  :parent-id="formData.supplierCode"
                  type="iqcBillInfo"
                  :show-title="false"
                  :custom-conditions="formData.iqcBillInfoConditions"
                />
              </t-col>
            </t-row>
            <t-row>
              <cmp-table
                ref="tableRef"
                row-key="id"
                :show-pagination="false"
                :show-toolbar="false"
                :hover="false"
                :stripe="false"
                :table-column="tableColumns"
                :table-data="tableData"
                :height="200"
                :selected-row-keys="tableSelectedRowKeys"
                @select-change="tableSelectedChange"
              >
              </cmp-table>
            </t-row>
          </t-tab-panel>
          <t-tab-panel value="tab2" :label="t('returnManagement.tabName2')" :destroy-on-hide="false">
            <t-row style="margin-top: 10px; margin-bottom: 10px">
              <t-col style="margin-right: 10px">
                <bcmp-select-business
                  v-model="formData.poBillNo"
                  type="purchaseOrder"
                  :show-title="false"
                  @selection-change="onChangePo"
                />
              </t-col>
              <t-col style="margin-right: 10px">
                <bcmp-select-business
                  v-model="formData.warehouseId"
                  type="warehousePurchaseOrder"
                  :custom-conditions="formData.warehouseConditions"
                  :show-title="false"
                  @selection-change="onChangeWarehouse"
                />
              </t-col>
              <t-col style="margin-right: 10px">
                <bcmp-select-business
                  v-model="formData.mitemId"
                  type="mitemPurchaseOrder"
                  :custom-conditions="formData.mitemConditions"
                  :show-title="false"
                />
              </t-col>
            </t-row>
            <t-row>
              <cmp-table
                ref="tableRef"
                row-key="id"
                :show-pagination="false"
                :show-toolbar="false"
                :hover="false"
                :stripe="false"
                :table-column="tableTab2Columns"
                :table-data="tableTab2Data"
                :selected-row-keys="tableTab2SelectedRowKeys"
                :height="200"
                @select-change="tableTab2SelectedChange"
              >
                <template #curReturnQty="{ row }">
                  <t-input-number
                    v-model="row.curReturnQty"
                    style="width: 120px"
                    theme="normal"
                    :placeholder="t('returnManagement.placeholderCurReturnQty')"
                    :disabled="_.isNil(row.stockInQty) || row.stockInQty === 0"
                  />
                </template>
              </cmp-table>
            </t-row>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true"> </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormReturnManagement',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, LoadingPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { reactive, Ref, ref, watch } from 'vue';

import { api as apiQuality } from '@/api/quality';
import { api as apiWarehouse } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';

import BcmpSelectBusiness from '../../../../components/bcmp-select-business/index.vue';
import { useLang } from './lang';

const Emit = defineEmits(['parent-refresh-event']);

const { t } = useLang();
const isEdit = ref(false);
const tabDisabled = ref(false);
const formVisible = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);

const selectTabValue = ref('tab1');

const formData = reactive({
  billNo: '',
  billNoDesc: '',
  memo: '',
  supplierCode: '',
  supplierName: '',
  asnBillNo: '',
  poBillNo: '',
  warehouseId: '',
  warehouseName: '',
  warehouseCode: '',
  warehouseConditions: [],
  mitemId: '',
  mitemName: '',
  mitemCode: '',
  mitemConditions: [],
  deliveryDtlList: [],
  purchaseOrderList: [],
  iqcBillInfoConditions: [],
});

// 多字段监控
watch(
  () => ({
    supplierCode: formData.supplierCode,
    asnBillNo: formData.asnBillNo,
  }),
  (newValues) => {
    getReturnDeliveryDtl();
  },
  { deep: true },
);

watch(
  () => ({
    poBillNo: formData.poBillNo,
    warehouseId: formData.warehouseId,
    mitemId: formData.mitemId,
  }),
  (newValues) => {
    if (_.isEmpty(formData.poBillNo)) {
      formData.warehouseId = '';
      formData.mitemId = '';
    } else if (_.isEmpty(formData.warehouseId)) {
      formData.mitemId = '';
    } else if (_.isEmpty(formData.mitemId)) {
      formData.mitemId = '';
    }
    getReturnPurchaseDtl();
  },
  { deep: true },
);

const tableSelectedRowKeys = ref([]);
const tableSelectedRowData = ref([]);
const tableData = ref([]);
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: '检验单据号', width: 120, colKey: 'billNo' },
  { title: '供应商', width: 120, colKey: 'supplierName' },
  { title: '物料编码', width: 120, colKey: 'mitemCode' },
  { title: '物料描述', width: 120, colKey: 'mitemName' },
  { title: '不合格数量', width: 120, colKey: 'sumNgQty' },
  { title: '可退数量', width: 120, colKey: 'curReturnQty' },
  { title: '关联单据号', width: 140, colKey: 'deliveryNo' },
];

const tableSelectedChange = (value: any[], { selectedRowData }: any) => {
  tableSelectedRowKeys.value = value;
  tableSelectedRowData.value = tableData.value.filter((n) => value.includes(n.id));
};

const tableTab2SelectedRowKeys = ref([]);
const tableTab2SelectedRowData = ref([]);
const tableTab2Data = ref([]);
const tableTab2Columns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('returnManagement.returnPoBillNo')}`, width: 140, colKey: 'purchaseOrderNo' },
  { title: `${t('returnManagement.supplierName')}`, width: 140, colKey: 'supplierName' },
  { title: `${t('returnManagement.lineSeq')}`, width: 120, colKey: 'billLineNo' },
  { title: `${t('returnManagement.warehouseName')}`, width: 140, colKey: 'warehouseName' },
  { title: `${t('returnManagement.batchLot')}`, width: 140, colKey: 'batchLot' },
  { title: `${t('returnManagement.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('returnManagement.mitemDesc')}`, width: 120, colKey: 'mitemDesc' },
  { title: `${t('returnManagement.stockInQty')}`, width: 100, colKey: 'stockInQty' },
  { title: `${t('returnManagement.curReturnQty')}`, width: 140, colKey: 'curReturnQty' },
];
const tableTab2SelectedChange = (value: any[], { selectedRowData }: any) => {
  tableTab2SelectedRowKeys.value = value;
  tableTab2SelectedRowData.value = selectedRowData;
};

const onConfirmForm = async () => {
  try {
    let isSuccess = true;
    if (_.isEmpty(formData.billNoDesc)) {
      isSuccess = false;
      MessagePlugin.error(t('returnManagement.请输入退货单描述'));
      return;
    }
    if (_.isEmpty(formData.memo)) {
      isSuccess = false;
      MessagePlugin.error(t('returnManagement.请输入备注'));
      return;
    }

    if (selectTabValue.value === 'tab1') {
      if (tableSelectedRowData.value.length === 0) {
        isSuccess = false;
        MessagePlugin.error(t('returnManagement.请选择需要退货的物料'));
        return;
      }

      LoadingPlugin(true);
      await apiWarehouse.returnManagement.submitBillNoByIqc({
        billNo: formData.billNo,
        billNoDesc: formData.billNoDesc,
        memo: formData.memo,
        iqcInspectList: tableSelectedRowData.value,
      });
      MessagePlugin.success(t('returnManagement.退货单创建成功'));
    } else if (selectTabValue.value === 'tab2') {
      if (tableTab2SelectedRowData.value.length === 0) {
        isSuccess = false;
        MessagePlugin.error(t('returnManagement.请选择需要退货的物料'));
        return;
      }

      tableTab2SelectedRowData.value.forEach((item) => {
        if (item.curReturnQty > item.stockInQty) {
          isSuccess = false;
          MessagePlugin.error(t('returnManagement.本次退货数量不能大于可退数量'));
        }
      });

      if (!isSuccess) {
        return;
      }

      LoadingPlugin(true);
      await apiWarehouse.returnManagement.submitBillNoByPurchaseOrder({
        billNo: formData.billNo,
        billNoDesc: formData.billNoDesc,
        memo: formData.memo,
        purchaseOrderDtlList: tableTab2SelectedRowData.value,
      });
      MessagePlugin.success(t('returnManagement.退货单创建成功'));
    }
    // Emit('showCloseEvent', false);
    Emit('parent-refresh-event');
    formVisible.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
};
const tabsChange = async (tabValue) => {
  selectTabValue.value = tabValue;
};
const reset = () => {
  tableData.value = [];
  tableSelectedRowKeys.value = [];
  tableSelectedRowData.value = [];

  tableTab2Data.value = [];
  tableTab2SelectedRowKeys.value = [];
  tableTab2SelectedRowData.value = [];

  tabDisabled.value = false;

  formRef.value.reset({ type: 'empty' });
  for (const key in formData) {
    formData[key] = null;
  }
};
const getReturnDeliveryDtl = async () => {
  if (!_.isNil(formData.supplierCode) && !_.isNil(formData.asnBillNo)) {
    tableData.value = [];

    const data = await apiQuality.iqcInspect.getIqcBillInfo({ iqcBillNo: formData.asnBillNo });
    if (data != null) {
      // 校验：一个检验单只可以有一张非取消状态的退货单，若已经存在，则选择单据时直接过滤掉
      const res = await apiWarehouse.returnManagement.getReturnManagementList({
        pageNum: 1,
        pageSize: 99999,
        asnBillNo: formData.asnBillNo, // 'IQC202403020032'
      });
      if (res && res.list.length > 0) {
        const list = res.list.filter((n) => n.status !== 'CANCELED');
        if (list.length > 0) {
          MessagePlugin.error(t('returnManagement.采购订单已有退货单，请检查'));
          return;
        }
      }
    }

    tableData.value.push({ ...data });
    tableSelectedRowKeys.value = [];
    tableSelectedRowData.value = [];
  }
};
const getReturnPurchaseDtl = async () => {
  tableTab2Data.value = [];

  if (!_.isNil(formData.poBillNo)) {
    const data = await apiWarehouse.purchaseOrderDtl.getReturnPurchaseDtlByTransfer({
      billNo: formData.poBillNo,
      warehouseId: formData.warehouseId,
      mitemId: formData.mitemId,
    });
    tableTab2Data.value = data.list;
    tableTab2SelectedRowKeys.value = [];
    tableTab2SelectedRowData.value = [];
  }
};

const onChangeWarehouse = async (value) => {
  const list = [];
  list.push({ field: 'poBillNo', operator: 'EQ', value: formData.poBillNo });
  list.push({ field: 'warehouseId', operator: 'EQ', value: value.id });
  formData.mitemConditions = list;
  formData.warehouseId = value.id;
};
const onChangePo = async (value) => {
  const list = [];
  list.push({ field: 'poBillNo', operator: 'EQ', value: value.billNo });
  formData.warehouseConditions = list;
  formData.poBillNo = value.billNo;
};
const onChangeSupplier = async (value) => {
  const list = [];
  list.push(
    { field: 'inspectResult', operator: 'EQ', value: 'NG' },
    { field: 'status', operator: 'EQ', value: 'COMPLETED' },
  );
  formData.iqcBillInfoConditions = list;
};

const showForm = async (edit, billNo) => {
  formVisible.value = true;
  reset();
  if (edit) {
    isEdit.value = edit;
    tabDisabled.value = true;

    if (billNo.substring(0, 3) === 'RMI') {
      selectTabValue.value = 'tab1';
      const data = await apiWarehouse.returnManagement.getIqcReturnManagementByBillNo({ billNo });
      formData.billNo = data.billNo;
      formData.billNoDesc = data.billNoDesc;
      formData.memo = data.memo;
      tableData.value = data.iqcInspectList;

      tableSelectedRowKeys.value = [];
      tableSelectedRowData.value = [];
      tableSelectedRowKeys.value.push(data.iqcInspectList[0].id);
      tableSelectedRowData.value.push(data.iqcInspectList[0]);
    } else if (billNo.substring(0, 3) === 'RMW') {
      selectTabValue.value = 'tab2';
      const data = await apiWarehouse.returnManagement.getPurchaseOrderReturnManagementByBillNo({ billNo });
      formData.billNo = data.billNo;
      formData.billNoDesc = data.billNoDesc;
      formData.memo = data.memo;
      tableTab2Data.value = data.purchaseOrderDtlList;
      tableTab2SelectedRowKeys.value = [];
      tableTab2SelectedRowData.value = [];
      const selectList = data.purchaseOrderDtlList.filter((n) => !_.isEmpty(n.transferDtlId));
      selectList.forEach((item) => {
        tableTab2SelectedRowKeys.value.push(item.id);
        tableTab2SelectedRowData.value.push(item);
      });
    }
  }
};

defineExpose({
  form: formRef,
  reset,
  showForm,
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
`
