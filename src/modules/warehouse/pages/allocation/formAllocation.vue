<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('allocation.formtitle')"
    width="95%"
    top="56px"
    :confirm-btn="{
      content: t('allocation.submit'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
    class="add-form"
  >
    <cmp-container class="add-form-box" :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-form
          ref="formRef"
          :data="formData"
          :show-cancel="true"
          :show-error-message="false"
          :rules="FORM_RULES"
          label-width="120px"
        >
          <t-row :gutter="[0, 12]">
            <t-col :span="4">
              <t-form-item :label="t('allocation.billType')" name="billType">
                <t-select
                  v-model="formData.billType"
                  :disabled="formData.isLock"
                  :options="billTypeOptions"
                  clearable
                  @change="onBillTypeChange"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('allocation.物料分类')" name="mitemCategoryId">
                <bcmp-select-business
                  v-model="formData.mitemCategoryId"
                  :multiple="false"
                  :disabled="formData.isLock"
                  type="mitemCategory"
                  :show-title="false"
                  @change="resetMitems"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('allocation.mitemIds')" name="mitemIds">
                <bcmp-select-business
                  v-model="formData.mitemIds"
                  :disabled="formData.isLock"
                  :table-width="1200"
                  :custom-conditions="filterConditions"
                  type="mitem"
                  :is-multiple="true"
                  :show-title="false"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('allocation.warehouseId')" name="warehouseId">
                <bcmp-select-business
                  v-model="formData.warehouseId"
                  type="warehouseAuth"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col v-show="isNeedToOrg" :span="4">
              <t-form-item :label="t('allocation.toOrgId')" name="toOrgId">
                <bcmp-select-business
                  v-model="formData.toOrgId"
                  type="userInOrg"
                  :show-title="false"
                  @change="onToOrgChange"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <!-- 跨组织仓库选择 -->
            <t-col v-if="isNeedToOrg && isNeedTowarehouse" :span="4">
              <t-form-item :label="t('allocation.toWarehouseId')" name="toWarehouseId">
                <bcmp-select-business
                  v-model="formData.toWarehouseId"
                  :disabled="!formData.toOrgId"
                  :custom-conditions="filterOtherWarehouseConditions"
                  type="warehouseByOrgId"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <!-- 同组织仓库选择 -->
            <t-col v-else-if="isNeedTowarehouse" :span="4">
              <t-form-item :label="t('allocation.toWarehouseId')" name="toWarehouseId">
                <bcmp-select-business
                  v-model="formData.toWarehouseId"
                  type="warehouseAuth"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('allocation.remark')" name="remark">
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
      <!-- ################# 明细表格数据 ###################### -->
      <cmp-table
        ref="tableDetailRef"
        row-key="id"
        :selected-row-keys="selectedRowKeys"
        :show-pagination="false"
        :show-toolbar="false"
        max-height="600px"
        :loading="loadingMaterialDtl"
        :columns="tableMaterialDtlColumns"
        :data="tableDataAllocation"
        @row-click="onRowClick"
      >
        <template #reqQty="{ row }">
          <t-input-number v-model="row.reqQty" theme="normal"></t-input-number>
        </template>
      </cmp-table>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormAllocation',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ComputedRef, reactive, Ref, ref } from 'vue';

import { AllocationDTO, api as apiWarehouse } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';

import { useLang } from './lang';

// 下拉初始数据
const billTypeOptions = [
  { label: '调拨出库', value: 'ALLOCATION_OUT' },
  { label: '跨组织调拨', value: 'ALLOCATION_ORG' },
  { label: '调拨出入库', value: 'ALLOCATION_IN_OUT' },
];
const Emit = defineEmits(['showCloseEvent']);
const { loading: loadingMaterialDtl, setLoading: setLoadingMaterialDtl } = useLoading();

const { t } = useLang();

const formVisible = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES: ComputedRef<FormRules> = computed(() => {
  return {
    billType: [
      { required: true, trigger: 'change', message: t('common.placeholder.select', [t('allocation.billType')]) },
    ],
    mitemIds: [
      { required: true, trigger: 'change', message: t('common.placeholder.select', [t('allocation.mitemIds')]) },
    ],
    warehouseId: [
      { required: true, trigger: 'change', message: t('common.placeholder.select', [t('allocation.warehouseId')]) },
    ],
    toOrgId: [
      {
        required: isNeedToOrg.value,
        trigger: 'change',
        message: t('common.placeholder.select', [t('allocation.toOrgId')]),
      },
    ],
    toWarehouseId: [
      {
        required: isNeedTowarehouse.value,
        trigger: 'change',
        message: t('common.placeholder.select', [t('allocation.toWarehouseId')]),
      },
    ],
  };
});
interface FormAllocation extends AllocationDTO {
  billType: string;
  warehouseId: string;
  toWarehouseId: string;
  mitemIds: string[];
  isLock: boolean;
  selectRowId: string;
  mitemCategoryId: string;
  toOrgId: string;
}

const formData: FormAllocation = reactive({
  billType: '',
  mitemIds: [],
  warehouseId: '',
  warehouseCode: '',
  warehouseName: '',
  toWarehouseId: '',
  remark: '',
  isLock: false,
  selectRowId: '',
  mitemCategoryId: '',
  toOrgId: '',
});

const filterConditions = computed(() => {
  const arrFilter = [];
  if (formData.mitemCategoryId) {
    arrFilter.push({
      field: 'mitemCategoryId',
      operator: 'EQ',
      value: formData.mitemCategoryId,
    });
  }
  return arrFilter;
});

const filterOtherWarehouseConditions = computed(() => {
  const arrFilter = [];
  if (formData.toOrgId) {
    arrFilter.push({
      field: 'oid',
      operator: 'EQ',
      value: formData.toOrgId,
    });
  }
  return arrFilter;
});

// 是否接收组织必须
const isNeedToOrg = computed(() => {
  if (formData.billType === 'ALLOCATION_ORG') {
    return true;
  }
  return false;
});

// 是否接收仓库必须
const isNeedTowarehouse = computed(() => {
  if (formData.billType === 'ALLOCATION_ORG' || formData.billType === 'ALLOCATION_IN_OUT') {
    return true;
  }
  return false;
});

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('allocation.mitemCode')}`, width: 120, colKey: 'mitemCode', fixed: 'left' },
  { title: `${t('allocation.mitemName')}`, width: 120, colKey: 'mitemName', fixed: 'left' },
  { title: `${t('allocation.uomName')}`, width: 120, colKey: 'uomName' },
  {
    title: `${t('allocation.warehouseName')}`,
    width: 120,
    colKey: 'warehouseName',
  },
  {
    title: `${t('allocation.onHandQty')}`,
    width: 100,
    colKey: 'handQty', // 设置单元格类名
    attrs: ({ row }) => {
      if (row.handQty > 0 && row.handQty < row.reqQty) {
        return {
          style: {
            background: '#ff000047',
          },
        };
      }
      return '';
    },
  },
  { title: `${t('allocation.toWarehouseName')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('allocation.reqQty')}`, width: 200, colKey: 'reqQty' },
];

// ----------明细表格信息----------
const tableDataAllocation = ref([]); // 所有的工单BOM调拨明细数据
const tableDetailRef = ref();
const selectedRowKeys = computed(() => {
  return tableDetailRef.value?.getSelectedRowKeys();
});
const selectRowDatas = computed(() => {
  return tableDataAllocation.value.filter((item) => selectedRowKeys.value.includes(item.id));
});

const onRowClick = ({ row }) => {
  formData.selectRowId = row.id;
};

// 重置物料信息
const resetMitems = () => {
  formData.mitemIds = [];
};

// 接收仓库修改
// const toWarehouseChange = (val: any) => {
//   if (tableDataAllocation.value && tableDataAllocation.value.length > 0) {
//     tableDataAllocation.value.forEach((item) => {
//       item.toWarehouseId = val.id;
//       item.toWarehouseCode = val.warehouseCode;
//       item.toWarehouseName = val.warehouseName;
//     });
//   }
// };

const onFormConfirm = () => {
  formRef.value.validate().then((result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
      return;
    }
    if (formData.warehouseId && formData.toWarehouseId) {
      if (formData.warehouseId === formData.toWarehouseId) {
        MessagePlugin.warning(t('allocation.sameWarehouseTip'));
        return;
      }
    }

    // 查询调拨单的明细信息
    fetchMaterialDtlTable();
  });
};

// 加载调拨制单明细表格
const fetchMaterialDtlTable = async () => {
  try {
    setLoadingMaterialDtl(true);
    const data = await apiWarehouse.allocation.getReqDtls({
      ...formData,
    });
    tableDataAllocation.value = data;
    formData.isLock = true;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMaterialDtl(false);
  }
};

// 调拨制单界面提交
const onConfirmForm = async () => {
  try {
    if (!checkSubmit()) {
      return;
    }
    setLoadingMaterialDtl(true);
    const data = await apiWarehouse.allocation.saveData({
      ...formData,
      submitList: selectRowDatas.value,
    });
    MessagePlugin.success(t('common.message.saveSuccess'));
    formVisible.value = false;
    Emit('showCloseEvent', false);
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMaterialDtl(false);
  }
};

// 提交的校验
const checkSubmit = () => {
  let isSuccess = true;
  if (selectRowDatas.value && selectRowDatas.value.length > 0) {
    let isEmptyWarehouse = false;
    let isEmptyQty = false;
    let isZeroQty = false;
    selectRowDatas.value.forEach((item) => {
      if (!item.warehouseId) {
        isEmptyWarehouse = true;
      }
      if (!item.reqQty) {
        isEmptyQty = true;
      } else if (item.reqQty < 0) {
        isZeroQty = true;
      }
    });
    if (isEmptyWarehouse) {
      isSuccess = false;
      MessagePlugin.warning(t('allocation.checkWarehouseEmpty'));
    } else if (isEmptyQty) {
      isSuccess = false;
      MessagePlugin.warning(t('allocation.checkReqQtyEmpty'));
    }
    if (isZeroQty) {
      isSuccess = false;
      MessagePlugin.warning(t('allocation.checkReqQtyZero'));
    }
  } else {
    isSuccess = false;
    MessagePlugin.warning(t('allocation.checkSubmitDtls'));
  }
  return isSuccess;
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  tableDataAllocation.value = [];
  for (const key in formData) {
    formData[key] = null;
  }
};

const showPopform = () => {
  formVisible.value = true;
};

// 修改单据类型
const onBillTypeChange = (value: any) => {
  console.log('🚀 ~ onBillTypeChange ~ value:', value);
  formData.toOrgId = '';
  formData.toWarehouseId = '';
};

const onToOrgChange = (value: any) => {
  console.log('🚀 ~ onToOrgChange ~ value:', value);
  formData.toWarehouseId = '';
};

defineExpose({
  form: formRef,
  reset,
  showPopform,
});
</script>
<style lang="less" scoped>
.add-form-box {
  padding: 0 !important;
}
</style>
`
