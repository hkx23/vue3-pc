<template>
  <t-dialog
    v-model:visible="formCardVisible"
    :header="t('deliveryCommand.formtitle')"
    width="95%"
    top="56px"
    :confirm-btn="{
      content: t('deliveryCommand.submit'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
    class="add-form"
  >
    <cmp-container class="add-form-box" :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-form
          ref="formCardRef"
          :data="formData"
          :show-cancel="true"
          :show-error-message="false"
          :rules="FORM_RULES"
          label-width="80px"
        >
          <t-row :gutter="[0, 12]">
            <t-col :span="3">
              <t-form-item :label="t('deliveryCommand.warehouseId')" name="warehouseId">
                <bcmp-select-business
                  v-model="formData.warehouseId"
                  :disabled="formData.isLock"
                  type="warehouseAuth"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item :label="t('deliveryCommand.toWarehouseId')" name="toWarehouseId">
                <bcmp-select-business
                  v-model="formData.toWarehouseId"
                  :disabled="true"
                  type="warehouseAuth"
                  :show-title="false"
                  @selection-change="toWarehouseChange"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item :label="t('deliveryCommand.remark')" name="remark">
                <t-input v-model="formData.remark" />
              </t-form-item>
            </t-col>
            <t-col :span="3">
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
      >
      </cmp-table>
      <!-- ################# 明细表格数据 ###################### -->
      <t-table
        ref="tableRef"
        row-key="id"
        :show-pagination="false"
        :show-toolbar="false"
        :loading="loadingMaterialDtl"
        :columns="tableMaterialDtlColumns"
        :data="tableDataMaterialRequisition"
        @row-click="onRowClick"
      >
        <template #warehouseName="{ row }">
          <bcmp-select-business
            v-model="row.warehouseId"
            type="warehouseAuth"
            :show-title="false"
            @selection-change="(value) => warehouseSubChange(value, row)"
          ></bcmp-select-business>
          <!--   v-if="row.id === formData.selectRowId"  <span v-else>{{ row.toWarehouseName }}</span> -->
        </template>
        <template #reqQty="{ row }">
          <t-input-number v-model="row.reqQty" theme="normal"></t-input-number>
        </template>
      </t-table>
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
import { computed, defineProps, reactive, Ref, ref, watch } from 'vue';

import {
  api as apiWarehouse,
  GetMaterialsDtlDTO,
  MaterialRequisitionDtlVO,
  MaterialRequisitionDTO,
  OnHandVO,
} from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';

import { useLang } from './lang';

const { t } = useLang();
const Emit = defineEmits(['showCloseEvent']);
const { loading: loadingMaterialDtl, setLoading: setLoadingMaterialDtl } = useLoading();

const formCardVisible = ref(false);
const formCardRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  moScheCodes: [{ required: true, message: t('common.placeholder.input', [t('deliveryCommand.moScheCodes')]) }],
  warehouseId: [{ required: true, message: t('common.placeholder.input', [t('deliveryCommand.warehouseId')]) }],
  toWarehouseId: [{ required: true, message: t('common.placeholder.input', [t('deliveryCommand.toWarehouseId')]) }],
};

interface formMaterialRequisitionProps {
  idCollection?: {
    warehouseId: string;
    list: GetMaterialsDtlDTO[];
  };
}

// 接收父组件传过来的 ID 集合
const props = withDefaults(defineProps<formMaterialRequisitionProps>(), {});

interface FormMaterialRequisition extends MaterialRequisitionDTO {
  warehouseId: string;
  toWarehouseId: string;
  moScheCodes: string[];
  isLock: boolean;
  selectRowId: string;
}

watch(
  () => props.idCollection,
  (newVal) => {
    if (newVal && newVal?.list.length > 0) {
      [formData.toWarehouseId] = newVal.warehouseId;
    }
  },
  { deep: true },
);

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
  { title: `${t('deliveryCommand.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('deliveryCommand.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('deliveryCommand.warehouseId')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('deliveryCommand.onHandQty')}`, width: 120, colKey: 'handQty' },
  { title: `${t('deliveryCommand.toWarehouseId')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('deliveryCommand.reqQty')}`, width: 100, colKey: 'reqQty' },
];

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('deliveryCommand.moScheCode')}`, width: 150, colKey: 'scheCode' },
  { title: `${t('deliveryCommand.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('deliveryCommand.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('deliveryCommand.uomName')}`, width: 120, colKey: 'uomName' },
  {
    title: `${t('deliveryCommand.warehouseName')}`,
    width: 120,
    colKey: 'warehouseName',
  },
  { title: `${t('deliveryCommand.onHandQty')}`, width: 120, colKey: 'handQty' },
  { title: `${t('deliveryCommand.toWarehouseName')}`, width: 120, colKey: 'toWarehouseName' },
  {
    title: `${t('deliveryCommand.moRequestQty')}`,
    width: 120,
    colKey: 'moRequestQty',
  },
  { title: `${t('deliveryCommand.pickQty')}`, width: 120, colKey: 'alreadyPickQty' },
  { title: `${t('deliveryCommand.reqQty')}`, width: 200, colKey: 'reqQty' },
  { title: `${t('deliveryCommand.handQty')}`, width: 120, colKey: 'handQty' },
];

const onRowClick = ({ row }) => {
  formData.selectRowId = row.id;
};
// 表单明细-仓库修改
const warehouseSubChange = (val: any, row: MaterialRequisitionDtlVO) => {
  row.warehouseCode = val.warehouseCode;
  row.warehouseName = val.warehouseName;
  row.sumKey = `${row.mitemId}-${row.warehouseId}`;
  getWarehouseHandInfo(val, row).then((handInfo) => {
    if (handInfo) {
      row.handQty = handInfo.qty;
    } else {
      row.handQty = 0;
    }
  });
};

// 表单明细-仓库修改-获取库存信息
const getWarehouseHandInfo = async (val: any, row: MaterialRequisitionDtlVO) => {
  const data = await apiWarehouse.materialRequisition.getOnHandList({
    warehouseId: val.id,
    mitemId: row.mitemId,
  });
  let handInfo: OnHandVO = null;
  if (data && data.length > 0) {
    handInfo = data[0] as OnHandVO;
  }
  return handInfo;
};

// 接收仓库修改
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
          const reqQtySum = _.sumBy(groupedData, (o: any) => o.reqQty);
          model.reqQty = reqQtySum;
          list.push(model);
        }
      });
    }
  }
  console.log(list);
  return list;
});

// 新增领料制单 搜索确认
const onFormConfirm = () => {
  formCardRef.value.validate().then((result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
      return;
    }
    if (formData.warehouseId === formData.toWarehouseId) {
      MessagePlugin.warning(t('deliveryCommand.sameWarehouseTip'));
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
    const data = await apiWarehouse.materialRequisition.getCommandReqDtls({
      ...formData,
      materialList: props.idCollection?.list,
      // mitemIds: props.idCollection.mitemId,
      // moScheCodeList: props.idCollection.moScheId,
    });
    tableDataMaterialRequisition.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMaterialDtl(false);
  }
};

// 领料制单界面提交
const onConfirmForm = async () => {
  try {
    if (!checkSubmit()) {
      return;
    }
    setLoadingMaterialDtl(true);
    const data = await apiWarehouse.materialRequisition.saveData({
      ...formData,
      submitList: tableDataMaterialRequisition.value,
    });
    MessagePlugin.success(t('common.message.saveSuccess'));
    formCardVisible.value = false;
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
  if (tableDataMaterialRequisition.value && tableDataMaterialRequisition.value.length > 0) {
    let isEmptyWarehouse = false;
    let isEmptyQty = false;
    tableDataMaterialRequisition.value.forEach((item) => {
      if (!item.warehouseId) {
        isEmptyWarehouse = true;
      }
      if (!item.reqQty) {
        isEmptyQty = true;
      }
    });
    if (isEmptyWarehouse) {
      isSuccess = false;
      MessagePlugin.warning(t('deliveryCommand.checkSubmitDtls'));
    } else if (isEmptyQty) {
      isSuccess = false;
      MessagePlugin.warning(t('deliveryCommand.checkReqQtyEmpty'));
    }
  } else {
    isSuccess = false;
    MessagePlugin.warning(t('deliveryCommand.checkSubmitDtls'));
  }
  return isSuccess;
};

const reset = () => {
  formCardRef.value.reset({ type: 'empty' });
  tableDataMaterialRequisition.value = [];
  for (const key in formData) {
    if (key !== 'toWarehouseId') {
      formData[key] = null;
    }
  }
  [formData.toWarehouseId] = props.idCollection.warehouseId;
};

const showPopform = () => {
  formCardVisible.value = true;
};

defineExpose({
  form: formCardRef,
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
