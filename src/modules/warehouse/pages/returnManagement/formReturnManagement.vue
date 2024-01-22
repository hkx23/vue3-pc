<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('returnManagement.formtitle')"
    width="70%"
    top="20"
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
          <t-row :gutter="[32, 16]" style="margin-bottom: 10px">
            <t-col :span="4">
              <t-form-item :label="t('returnManagement.billNo')" name="billNo" required-mark>
                <t-input v-model="formData.billNo" disabled :placeholder="t('returnManagement.billNo_placeholder')" />
              </t-form-item>
            </t-col>
            <t-col :span="4">
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
                <bcmp-select-business v-model="formData.supplierCode" type="supplier" :show-title="false">
                </bcmp-select-business>
              </t-col>
              <t-col>
                <bcmp-select-business
                  v-model="formData.asnBillNo"
                  :parent-id="formData.supplierCode"
                  type="deliveryReceipted"
                  :show-title="false"
                >
                </bcmp-select-business>
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
                <bcmp-select-business v-model="formData.poBillNo" type="purchaseOrder" :show-title="false">
                </bcmp-select-business>
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

import { api as apiWarehouse, DeliveryDtlVO, PurchaseOrderVO } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';

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
  deliveryDtlList: [],
  purchaseOrderList: [],
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
);

// 单字段监控
watch(
  () => ({
    poBillNo: formData.poBillNo,
  }),
  (newValues) => {
    getReturnPurchaseDtl();
  },
);

const tableSelectedRowKeys = ref([]);
const tableSelectedRowData = ref<DeliveryDtlVO[]>([]);
const tableData = ref([]);
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('returnManagement.asnBillNo')}`, width: 120, colKey: 'deliveryNo' },
  { title: `${t('returnManagement.poBillNo')}`, width: 120, colKey: 'poNo' },
  { title: `${t('returnManagement.supplierName')}`, width: 120, colKey: 'supplierName' },
  { title: `${t('returnManagement.lineSeq')}`, width: 120, colKey: 'lineSeq' },
  { title: `${t('returnManagement.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('returnManagement.mitemDesc')}`, width: 120, colKey: 'mitemDesc' },
  { title: `${t('returnManagement.qty')}`, width: 140, colKey: 'receivedQty' },
];
const tableSelectedChange = (value: any[], { selectedRowData }: any) => {
  tableSelectedRowKeys.value = value;
  tableSelectedRowData.value = selectedRowData;
};

const tableTab2SelectedRowKeys = ref([]);
const tableTab2SelectedRowData = ref<PurchaseOrderVO[]>([]);
const tableTab2Data = ref([]);
const tableTab2Columns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('returnManagement.returnPoBillNo')}`, width: 120, colKey: 'purchaseOrderNo' },
  { title: `${t('returnManagement.supplierName')}`, width: 120, colKey: 'supplierName' },
  { title: `${t('returnManagement.lineSeq')}`, width: 120, colKey: 'billLineNo' },
  { title: `${t('returnManagement.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('returnManagement.mitemDesc')}`, width: 120, colKey: 'mitemDesc' },
  { title: `${t('returnManagement.qty')}`, width: 140, colKey: 'arrivaledQty' },
];
const tableTab2SelectedChange = (value: any[], { selectedRowData }: any) => {
  tableTab2SelectedRowKeys.value = value;
  tableTab2SelectedRowData.value = selectedRowData;
};

const onConfirmForm = async () => {
  try {
    if (_.isEmpty(formData.billNoDesc)) {
      MessagePlugin.error(t('returnManagement.请输入退货单描述'));
      return;
    }
    if (_.isEmpty(formData.memo)) {
      MessagePlugin.error(t('returnManagement.请输入备注'));
      return;
    }

    if (selectTabValue.value === 'tab1') {
      if (tableSelectedRowData.value.length === 0) {
        MessagePlugin.error(t('returnManagement.请选择需要退货的物料'));
        return;
      }

      LoadingPlugin(true);
      await apiWarehouse.returnManagement.submitBillNoByDelivery({
        billNo: formData.billNo,
        billNoDesc: formData.billNoDesc,
        memo: formData.memo,
        deliveryDtlList: tableSelectedRowData.value,
      });
      MessagePlugin.success(t('returnManagement.退货单创建成功'));
    } else if (selectTabValue.value === 'tab2') {
      if (tableTab2SelectedRowData.value.length === 0) {
        MessagePlugin.error(t('returnManagement.请选择需要退货的物料'));
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
    const data = await apiWarehouse.deliveryDtl.getReturnDeliveryDtl({ billNo: formData.asnBillNo });
    tableData.value = data.list;
    tableSelectedRowKeys.value = [];
    tableSelectedRowData.value = [];
  }
};
const getReturnPurchaseDtl = async () => {
  if (!_.isNil(formData.poBillNo)) {
    const data = await apiWarehouse.purchaseOrderDtl.getReturnPurchaseDtl({ billNo: formData.poBillNo });
    tableTab2Data.value = data.list;
    tableTab2SelectedRowKeys.value = [];
    tableTab2SelectedRowData.value = [];
  }
};
const showForm = async (edit, billNo) => {
  formVisible.value = true;
  reset();
  if (edit) {
    isEdit.value = edit;
    tabDisabled.value = true;

    if (billNo.substring(0, 3) === 'RMI') {
      selectTabValue.value = 'tab1';
      const data = await apiWarehouse.returnManagement.getDeliveryReturnManagementByBillNo({ billNo });
      formData.billNo = data.billNo;
      formData.billNoDesc = data.billNoDesc;
      formData.memo = data.memo;
      tableData.value = data.deliveryDtlList;
      tableSelectedRowKeys.value = [];
      tableSelectedRowData.value = [];
      const selectList = data.deliveryDtlList.filter((n) => !_.isEmpty(n.transferDtlId));
      selectList.forEach((item) => {
        tableSelectedRowKeys.value.push(item.id);
        tableSelectedRowData.value.push(item);
      });
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
