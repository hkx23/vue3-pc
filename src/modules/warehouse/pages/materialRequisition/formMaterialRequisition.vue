<template>
  <cmp-container :full="true" :ghost="true">
    <cmp-card :span="12" :ghost="false" :bordered="true">
      <t-form
        ref="formRef"
        :data="formData"
        :show-cancel="true"
        :show-error-message="false"
        :rules="FORM_RULES"
        label-width="120px"
      >
        <t-row :gutter="[32, 16]">
          <t-col :span="4">
            <t-form-item :label="t('materialRequisition.moScheCodes')" name="moScheCodes">
              <bcmp-select-business
                v-model="formData.moScheCodes"
                type="moSchedule"
                :is-multiple="true"
                :show-title="false"
              ></bcmp-select-business></t-form-item
          ></t-col>
          <t-col :span="4">
            <t-form-item :label="t('materialRequisition.warehouseid')" name="warehouseid">
              <bcmp-select-business
                v-model="formData.warehouseid"
                type="warehouse"
                :show-title="false"
              ></bcmp-select-business
            ></t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item :label="t('materialRequisition.toWarehouseid')" name="toWarehouseid">
              <bcmp-select-business
                v-model="formData.toWarehouseid"
                type="warehouse"
                :show-title="false"
              ></bcmp-select-business
            ></t-form-item>
          </t-col>
          <t-col :span="8">
            <t-form-item label="备注" name="remark">
              <t-input v-model="formData.remark" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="">
              <t-button theme="primary" @click="onFormSubmit">
                {{ t('common.button.confirm') }}
              </t-button>
              <t-button theme="default" @click="reset">
                {{ t('common.button.reset') }}
              </t-button>
            </t-form-item>
          </t-col>
        </t-row>

        <!-- table表格 -->
      </t-form>
    </cmp-card>
    <cmp-card :span="12" :ghost="false" :bordered="true">
      <!-- ################# 汇总表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        row-key="id"
        :show-pagination="false"
        :show-toolbar="false"
        :table-column="tableMaterialSumColumns"
        :table-data="tableDataMaterialRequisition"
        :hover="false"
        :stripe="false"
        :header-affixed-top="true"
      >
      </cmp-table>
    </cmp-card>
    <cmp-card :span="12" :ghost="false" :bordered="true">
      <!-- ################# 明细表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        row-key="id"
        :show-pagination="false"
        :show-toolbar="false"
        :table-column="tableMaterialDtlColumns"
        :table-data="tableDataMaterialRequisition"
        :loading="loading"
        :hover="false"
        :stripe="false"
        :header-affixed-top="true"
      >
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'FormMaterialRequisition',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

// import { api as apiWarehouse } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';

import { useLang } from './lang';

const { loading } = useLoading();
const tableDataMaterialRequisition = ref([]);

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  moScheCodes: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.moScheCodes')]) }],
  warehouseid: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.warehouseid')]) }],
  toWarehouseid: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.toWarehouseid')]) }],
};

const formData = reactive({
  moScheCodes: [],
  warehouseid: '',
  warehouseCode: '',
  warehouseName: '',
  toWarehouseid: '',
  toWarehouseCode: '',
  toWarehouseName: '',
  remark: '',
});

const tableMaterialSumColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('materialRequisition.warehouseid')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('materialRequisition.onHandQty')}`, width: 120, colKey: 'onHandQty' },
  { title: `${t('materialRequisition.toWarehouseid')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.reqQty')}`, width: 140, colKey: 'reqQty' },
];

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('materialRequisition.moScheCode')}`, width: 150, colKey: 'scheCode' },
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('materialRequisition.uomName')}`, width: 120, colKey: 'uomName' },
  { title: `${t('materialRequisition.warehouseName')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('materialRequisition.toWarehouseName')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.moRequestQty')}`, width: 120, colKey: 'moRequestQty' },
  { title: `${t('materialRequisition.reqQty')}`, width: 140, colKey: 'reqQty' },
  { title: `${t('materialRequisition.pickQty')}`, width: 120, colKey: 'pickQty' },
];

const onFormSubmit = () => {
  formRef.value.validate().then((result) => {
    // if (result !== true) {
    //   MessagePlugin.warning(Object.values(result)[0][0].message);
    //   return;
    // }
    // apiControl.productPackRuleDtl.update(formData).then(() => {
    //   MessagePlugin.success(t('common.message.saveSuccess'));
    //   resolve(formData);
    // });
  });
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    // formRef.value.validate().then((result) => {
    //   if (result !== true) {
    //     MessagePlugin.warning(Object.values(result)[0][0].message);
    //     reject();
    //     return;
    //   }
    //   if (props.isAdd) {
    //     apiControl.productPackRule.add(formData).then(() => {
    //       MessagePlugin.success(t('common.message.addSuccess'));
    //       resolve(formData);
    //     });
    //   } else {
    //     apiControl.productPackRule.update(formData).then(() => {
    //       MessagePlugin.success(t('common.message.saveSuccess'));
    //       resolve(formData);
    //     });
    //   }
    // });
  });
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  for (const key in formData) {
    delete formData[key];
  }
};

defineExpose({
  form: formRef,
  submit,
  reset,
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
