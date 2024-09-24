<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('materialRequisition.formtitle')"
    width="95%"
    top="56px"
    :confirm-btn="{
      content: t('materialRequisition.submit'),
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
              <t-form-item :label="t('materialRequisition.计划开始时间')" name="datetimePlanStart">
                <t-date-range-picker
                  v-model="range1"
                  :disabled="formData.isLock"
                  class="card-date-picker-container"
                  theme="primary"
                  mode="date"
                  style="width: 248px"
                  @change="onDateChange" /></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.车间')" name="workshopId">
                <bcmp-select-business
                  v-model="formData.workshopId"
                  :disabled="formData.isLock"
                  type="workshop"
                  :show-title="false"
                  @change="resetMocodes"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.地点')" name="wcLocation">
                <bcmp-select-param
                  v-model="formData.wcLocation"
                  :multiple="true"
                  :disabled="formData.isLock"
                  placeholder="请选择地点"
                  :min-collapsed-num="3"
                  param-group="P_WORKCENTER_LOCATION"
                  @selection-change="resetMocodes"
                ></bcmp-select-param></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.工作中心')" name="workCenterId">
                <bcmp-select-business
                  v-model="formData.workCenterId"
                  :multiple="true"
                  :disabled="formData.isLock"
                  type="workcenter"
                  :show-title="false"
                  @change="resetMocodes"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.物料分类')" name="mitemCategoryId">
                <bcmp-select-business
                  v-model="formData.mitemCategoryId"
                  :multiple="false"
                  :disabled="formData.isLock"
                  type="mitemCategory"
                  :show-title="false"
                  @change="resetMocodes"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.moScheCodes')" name="moScheCodes">
                <bcmp-select-business
                  v-model="formData.moScheCodes"
                  :disabled="formData.isLock || !isEnableSelcetMo"
                  :table-width="1200"
                  :custom-conditions="filterConditions"
                  type="moScheduleAuth"
                  :is-multiple="true"
                  :show-title="false"
                  @selection-change="moScheCodeChange"
                ></bcmp-select-business></t-form-item
            ></t-col>
            <t-col :span="4">
              <t-form-item :label="t('materialRequisition.warehouseId')" name="warehouseId">
                <bcmp-select-business
                  v-model="formData.warehouseId"
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
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="4">
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
      <!-- ################# 汇总表格数据 ###################### -->
      <cmp-table
        ref="tableMitemRef"
        row-key="sumKey"
        :selected-row-keys="selectedMitemRowKeys"
        :show-pagination="false"
        :show-toolbar="false"
        max-height="300px"
        :table-column="tableMaterialSumColumns"
        :table-data="tableDataMaterialSum"
        :hover="false"
        :stripe="false"
        @select-change="onSelectMitemSumChange"
      >
      </cmp-table>
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
      </cmp-table>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormMaterialRequisition',
};
</script>
<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref } from 'vue';

import {
  api as apiWarehouse,
  MaterialRequisitionDtlVO,
  MaterialRequisitionDTO,
  MaterialWarehouseVO,
  OnHandVO,
} from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';

import { useLang } from './lang';

const Emit = defineEmits(['showCloseEvent']);
const { loading: loadingMaterialDtl, setLoading: setLoadingMaterialDtl } = useLoading();
const isEnableSelcetMo = ref(true);
const range1 = ref([dayjs().add(1, 'day').format('YYYY-MM-DD'), dayjs().add(1, 'day').format('YYYY-MM-DD')]);
const filterConditions = computed(() => {
  const arrFilter = [];
  arrFilter.push({ field: 'isComplete', operator: 'EQ', value: true });
  if (formData.workshopId) {
    arrFilter.push({
      field: 'workshopId',
      operator: 'EQ',
      value: formData.workshopId,
    });
  }

  if (formData.workCenterId) {
    arrFilter.push({
      field: 'workcenterId',
      operator: 'EQ',
      value: formData.workCenterId,
    });
  }
  const datetimePlanStart = range1.value[0];
  const datetimePlanEnd = range1.value[1];
  if (datetimePlanStart) {
    arrFilter.push({
      field: 'datetimePlanStart',
      operator: 'GTE',
      value: datetimePlanStart,
    });
    arrFilter.push({
      field: 'datetimePlanStart',
      operator: 'LTE',
      value: datetimePlanEnd,
    });
  }
  if (formData.wcLocation && formData.wcLocation.length > 0) {
    arrFilter.push({
      field: 'wcLocation',
      operator: 'IN',
      value: formData.wcLocation,
    });
  }

  if (formData.mitemCategoryId) {
    arrFilter.push({
      field: 'mitemCategoryId',
      operator: 'EQ',
      value: formData.mitemCategoryId,
    });
  }

  return arrFilter;
});

const { t } = useLang();
const formVisible = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  workCenterId: [{ required: false, message: t('common.placeholder.input', [t('materialRequisition.工作中心')]) }],
  moScheCodes: [{ required: true, message: t('common.placeholder.input', [t('materialRequisition.moScheCodes')]) }],
  warehouseId: [{ required: false, message: t('common.placeholder.input', [t('materialRequisition.warehouseId')]) }],
  toWarehouseId: [
    { required: false, message: t('common.placeholder.input', [t('materialRequisition.toWarehouseId')]) },
  ],
};

interface FormMaterialRequisition extends MaterialRequisitionDTO {
  warehouseId: string;
  toWarehouseId: string;
  workshopId: string;
  workCenterId: string;
  moScheCodes: string[];
  isLock: boolean;
  selectRowId: string;
  datetimePlanStart: string;
  datetimePlanEnd: string;
  wcLocation: string[];
  mitemCategoryId: string;
}

const formData: FormMaterialRequisition = reactive({
  workshopId: '',
  workCenterId: '',
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
  datetimePlanStart: '',
  datetimePlanEnd: '',
  wcLocation: [],
  mitemCategoryId: '',
});

const tableMaterialSumColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName' },
  { title: `${t('materialRequisition.warehouseId')}`, width: 120, colKey: 'warehouseName' },
  { title: `${t('materialRequisition.onHandQty')}`, width: 120, colKey: 'handQty' },
  { title: `${t('materialRequisition.toWarehouseId')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.reqQty')}`, width: 100, colKey: 'reqQty' },
];

const tableMaterialDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('materialRequisition.moScheCode')}`, width: 150, colKey: 'scheCode', fixed: 'left' },
  { title: `${t('materialRequisition.mitemCode')}`, width: 120, colKey: 'mitemCode', fixed: 'left' },
  { title: `${t('materialRequisition.mitemName')}`, width: 120, colKey: 'mitemName', fixed: 'left' },
  { title: `${t('materialRequisition.uomName')}`, width: 120, colKey: 'uomName' },
  {
    title: `${t('materialRequisition.warehouseName')}`,
    width: 120,
    colKey: 'warehouseName',
  },
  {
    title: `${t('materialRequisition.onHandQty')}`,
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
  { title: `${t('materialRequisition.toWarehouseName')}`, width: 120, colKey: 'toWarehouseName' },
  { title: `${t('materialRequisition.lineHandQty')}`, width: 100, colKey: 'lineHandQty' },
  {
    title: `${t('materialRequisition.originMoRequestQty')}`,
    width: 100,
    colKey: 'originMoRequestQty',
  },
  {
    title: `${t('materialRequisition.moRequestQty')}`,
    width: 100,
    colKey: 'moRequestQty',
  },
  { title: `${t('materialRequisition.reqSumQty')}`, width: 120, colKey: 'reqSumQty' },
  { title: `${t('materialRequisition.reqQty')}`, width: 200, colKey: 'reqQty' },
  { title: `${t('materialRequisition.minPackagingQty')}`, width: 120, colKey: 'minPackagingQty' },
  { title: `${t('materialRequisition.applyingQty')}`, width: 100, colKey: 'applyingQty' },
  { title: `${t('materialRequisition.pickQty')}`, width: 100, colKey: 'alreadyPickQty' },
  { title: `${t('materialRequisition.centerMoUsingQty')}`, width: 120, colKey: 'centerMoUsingQty' },
];

// ---------- 物料汇总表格信息----------
const tableMitemRef = ref();
const selectedMitemRowKeys = computed(() => {
  return tableMitemRef.value?.getSelectedRowKeys();
});

// 物料汇总选中行
const onSelectMitemSumChange = (value: any, row: any) => {
  console.log('🚀 ~ onSelectMitemSumChange ~ value: any, row: any:', value, row);
  // 若汇总物料选中之后, 明细表的所有物料默认自动选择
  const selectDtlDatas = [];
  let bomMitems = [];
  // 全选框
  if (row.currentRowKey === 'CHECK_ALL_BOX') {
    if (row.type === 'check') {
      const mergedRowKeys = tableDataMaterialRequisition.value.map((item) => item.id);
      tableDetailRef.value.setSelectedRowKeys(mergedRowKeys);
    } else if (row.type === 'uncheck') {
      tableDetailRef.value.setSelectedRowKeys([]);
    }
  } else {
    // 单选
    bomMitems = tableDataMaterialRequisition.value.filter((itemDtl) => itemDtl.sumKey === row.currentRowData.sumKey);
    selectDtlDatas.push(...bomMitems);
    // 查询 selectDtlDatas 的ID字段集合信息
    if (selectDtlDatas && selectDtlDatas.length > 0) {
      const selectDtlIds = selectDtlDatas.map((item) => item.id);
      if (row.type === 'check') {
        const mergedRowKeys = [...selectedRowKeys.value, ...selectDtlIds];
        tableDetailRef.value.setSelectedRowKeys(mergedRowKeys);
      } else if (row.type === 'uncheck') {
        const mergedRowKeys = selectedRowKeys.value.filter((item) => !selectDtlIds.includes(item));
        tableDetailRef.value.setSelectedRowKeys(mergedRowKeys);
      }
    }
  }
};

// ----------明细表格信息----------
const tableDataMaterialRequisition = ref([]); // 所有的工单BOM领料明细数据
const tableDetailRef = ref();
const selectedRowKeys = computed(() => {
  return tableDetailRef.value?.getSelectedRowKeys();
});
const selectRowDatas = computed(() => {
  return tableDataMaterialRequisition.value.filter((item) => selectedRowKeys.value.includes(item.id));
});

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

// 重置排产单信息
const resetMocodes = () => {
  formData.moScheCodes = [];
};

// 排产单修改, 获取仓库信息
const moScheCodeChange = async (val: any) => {
  // 获取仓库信息
  getWarehouseInfoByScheId();
};

// 获取仓库信息
const getWarehouseInfoByScheId = async () => {
  if (formData.moScheCodes && formData.moScheCodes.length > 0) {
    const moScheCodeList = formData.moScheCodes.map((item: any) => item.value);
    const data = (await apiWarehouse.materialRequisition.getWarehouseInfoByScheId({
      moScheCodeList,
    })) as MaterialWarehouseVO;
    if (data && data.toWarehouseVO) {
      formData.toWarehouseId = data.toWarehouseVO.id;
    }
  }
};

// 接收仓库修改
// const toWarehouseChange = (val: any) => {
//   if (tableDataMaterialRequisition.value && tableDataMaterialRequisition.value.length > 0) {
//     tableDataMaterialRequisition.value.forEach((item) => {
//       item.toWarehouseId = val.id;
//       item.toWarehouseCode = val.warehouseCode;
//       item.toWarehouseName = val.warehouseName;
//     });
//   }
// };

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
          // 明细行勾选的才统计本次需领料数量--  统计按勾选的明细进行统计
          Object.assign(model, groupedData[0]);
          let reqSumQty = 0;
          const selectedDtlDatas = groupedData.filter((item) => selectedRowKeys.value.includes(item.id));
          if (selectedDtlDatas && selectedDtlDatas.length > 0) {
            const reqQtySum = _.sumBy(selectedDtlDatas, (o: any) => o.reqQty);
            model.reqQty = reqQtySum;
            reqSumQty = reqQtySum;
          } else {
            model.reqQty = 0;
            reqSumQty = model.reqQty;
          }
          // 统计后的结果 需要在明细表格的所有物料都必须赋值 需求汇总数量
          groupedData.forEach((item) => {
            item.reqSumQty = model.reqQty;
          });
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
    if (formData.warehouseId && formData.toWarehouseId) {
      if (formData.warehouseId === formData.toWarehouseId) {
        MessagePlugin.warning(t('materialRequisition.sameWarehouseTip'));
        return;
      }
    }

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

    if (data && data.length > 0) {
      data.forEach((item) => {
        item.reqQty = item.moRequestQty - item.alreadyPickQty - item.applyingQty;
        if (item.reqQty < 0) {
          item.reqQty = 0;
        }
      });
    }
    tableDataMaterialRequisition.value = data;
    formData.isLock = true;
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
      MessagePlugin.warning(t('materialRequisition.checkWarehouseEmpty'));
    } else if (isEmptyQty) {
      isSuccess = false;
      MessagePlugin.warning(t('materialRequisition.checkReqQtyEmpty'));
    }
    if (isZeroQty) {
      isSuccess = false;
      MessagePlugin.warning(t('materialRequisition.checkReqQtyZero'));
    }
  } else {
    isSuccess = false;
    MessagePlugin.warning(t('materialRequisition.checkSubmitDtls'));
  }
  return isSuccess;
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

// 修改计划开始日期
const onDateChange = (value: any) => {
  resetMocodes();
  isEnableSelcetMo.value = false;
  // 获取当前选择的日期范围
  const selectedDateRange = value;
  // 将日期字符串转换为dayjs对象
  const startDate = dayjs(selectedDateRange[0]);
  const endDate = dayjs(selectedDateRange[1]);

  // 计算日期范围的天数差异
  const daysDifference = endDate.diff(startDate, 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 7) {
    // 将结束日期调整为开始日期的后7天
    MessagePlugin.warning('日期跨度不得超过7天');
    return;
  }
  isEnableSelcetMo.value = true;
  // startDate 日期类型转字符串
  const startDateStr = startDate.format('YYYY-MM-DD');
  const endDateStr = endDate.format('YYYY-MM-DD');
  formData.datetimePlanStart = startDateStr;
  formData.datetimePlanEnd = endDateStr;
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
