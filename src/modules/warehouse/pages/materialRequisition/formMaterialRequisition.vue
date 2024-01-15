<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('materialRequisition.formtitle')"
    width="95%"
    top="20"
    :confirm-btn="{
      content: t('materialRequisition.submit'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
    class="add-form"
  >
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
                  :disabled="formData.isLock"
                  type="moSchedule"
                  :is-multiple="true"
                  :show-title="false"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.warehouseId')" name="warehouseId">
                <bcmp-select-business
                  v-model="formData.warehouseId"
                  :disabled="formData.isLock"
                  type="warehouseAuth"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.toWarehouseId')" name="toWarehouseId">
                <bcmp-select-business
                  v-model="formData.toWarehouseId"
                  type="warehouseAuth"
                  :show-title="false"
                  @selection-change="toWarehouseChange"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="8">
              <t-form-item :label="t('materialRequisition.remark')" name="remark">
                <t-input v-model="formData.remark" />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="">
                <t-button theme="primary" @click="onFormConfirm">
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
          :table-data="tableDataMaterialSum"
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
          :loading="loadingMaterialDtl"
          :table-column="tableMaterialDtlColumns"
          :table-data="tableDataMaterialRequisition"
          :header-affixed-top="true"
          @row-click="onRowClick"
        >
          <template #warehouseName="slotProps">
            <bcmp-select-business
              v-if="slotProps.row.id === formData.selectRowId"
              v-model="slotProps.warehouseId"
              type="warehouseAuth"
              :show-title="false"
            ></bcmp-select-business
          ></template>
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormMaterialRequisition',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref } from 'vue';

import { api as apiWarehouse, MaterialRequisitionDTO } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';

import { useLang } from './lang';

const { loading: loadingMaterialDtl, setLoading: setLoadingMaterialDtl } = useLoading();

const { t } = useLang();
const formVisible = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  moScheCodes: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.moScheCodes')]) }],
  warehouseId: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.warehouseId')]) }],
  toWarehouseId: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.toWarehouseId')]) }],
};

interface FormMaterialRequisition extends MaterialRequisitionDTO {
  warehouseId: string;
  toWarehouseId: string;
  moScheCodes: string[];
  isLock: boolean;
  selectRowId: string;
}

const formData: FormMaterialRequisition = reactive({
  moScheCodes: [],
  moScheCodeList: [],
  warehouseId: '',
  warehouseCode: '',
  warehouseName: '',
  toWarehouseId: '',
  toWarehouseCode: '',
  toWarehouseName: '',
  remark: '',
  isLock: false,
  selectRowId: '',
});

const tableMaterialSumColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('materialRequisition.warehouseId')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('materialRequisition.onHandQty')}`, width: 120, colKey: 'handQty' },
  { title: `${t('materialRequisition.toWarehouseId')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.reqQty')}`, width: 140, colKey: 'alreadyPickQty' },
];

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('materialRequisition.moScheCode')}`, width: 150, colKey: 'scheCode' },
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('materialRequisition.uomName')}`, width: 120, colKey: 'uomName' },
  { title: `${t('materialRequisition.warehouseName')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('materialRequisition.onHandQty')}`, width: 120, colKey: 'handQty' },
  { title: `${t('materialRequisition.toWarehouseName')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.moRequestQty')}`, width: 120, colKey: 'moRequestQty' },
  { title: `${t('materialRequisition.reqQty')}`, width: 140, colKey: 'reqQty' },
  { title: `${t('materialRequisition.pickQty')}`, width: 120, colKey: 'alreadyPickQty' },
];

const onRowClick = ({ row }) => {
  formData.selectRowId = row.id;
};

const toWarehouseChange = (val: any) => {
  if (tableDataMaterialRequisition.value && tableDataMaterialRequisition.value.length > 0) {
    tableDataMaterialRequisition.value.forEach((item) => {
      item.toWarehouseId = val.id;
      item.toWarehouseCode = val.warehouseCode;
      item.toWarehouseName = val.warehouseName;
    });
  }
};
const tableDataMaterialRequisition = ref([]);
// 自动计算新增界面的汇总表格信息
const tableDataMaterialSum = computed(() => {
  const list = [];
  if (tableDataMaterialRequisition.value && tableDataMaterialRequisition.value.length > 0) {
    const groupedDatas = _.groupBy(tableDataMaterialRequisition.value, 'sumKey') as any;
    if (groupedDatas) {
      Object.keys(groupedDatas).forEach((groupKey) => {
        const model = {} as any;
        const groupedData = groupedDatas[groupKey];
        if (groupedData && groupedData.length > 0) {
          Object.assign(model, groupedData[0]);
          const alreadyPickQtySum = _.sumBy(groupedData, (o: any) => o.alreadyPickQty);
          model.alreadyPickQty = alreadyPickQtySum;
          list.push(model);
        }
      });
    }
  }
  console.log(list);
  return list;
});

const onFormConfirm = () => {
  formRef.value.validate().then((result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
      return;
    }
    if (formData.warehouseId === formData.toWarehouseId) {
      MessagePlugin.warning(t('materialRequisition.sameWarehouseTip'));
      return;
    }
    formData.isLock = true;
    // 查询领料单的明细信息
    fetchMaterialDtlTable();
  });
};

// 加载领料制单明细表格
const fetchMaterialDtlTable = async () => {
  try {
    if (formData.moScheCodes) {
      formData.moScheCodeList = formData.moScheCodes.map((item: any) => item.value);
    }
    setLoadingMaterialDtl(true);
    const data = await apiWarehouse.materialRequisition.getReqDtls({
      ...formData,
    });
    tableDataMaterialRequisition.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMaterialDtl(false);
  }
};

// 领料制单界面提交
const onConfirmForm = () => {
  formRef.value.reset({ type: 'empty' });
  tableDataMaterialRequisition.value = [];
  for (const key in formData) {
    formData[key] = null;
  }
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  tableDataMaterialRequisition.value = [];
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
`
