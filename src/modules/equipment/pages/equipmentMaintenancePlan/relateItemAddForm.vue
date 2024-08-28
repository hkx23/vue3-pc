<template>
  <cmp-container :full="true">
    <cmp-card flex="auto" :ghost="true">
      <t-descriptions :column="2" colon>
        <t-descriptions-item label="保养计划">{{ planItem.maintenancePlanCode }}</t-descriptions-item>
        <t-descriptions-item label="保养计划名称">{{ planItem.maintenancePlanName }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.mouldType" label="模具类型编码">{{
          planItem.mouldType
        }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.mouldTypeName" label="模具类型名称">{{
          planItem.mouldTypeName
        }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.mouldCode" label="模具编码">{{ planItem.mouldCode }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.mouldName" label="模具名称">{{ planItem.mouldName }}</t-descriptions-item>

        <t-descriptions-item v-if="planItem.assetTypeCode" label="设备类型编码">{{
          planItem.assetTypeCode
        }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.assetTypeName" label="设备类型名称">{{
          planItem.assetTypeName
        }}</t-descriptions-item>

        <t-descriptions-item v-if="planItem.assetBrandCode" label="设备品牌编码">{{
          planItem.assetBrandCode
        }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.assetBrandName" label="设备品牌名称">{{
          planItem.assetBrandName
        }}</t-descriptions-item>

        <t-descriptions-item v-if="planItem.assetModelCode" label="设备模型编码">{{
          planItem.assetModelCode
        }}</t-descriptions-item>
        <t-descriptions-item v-if="planItem.assetModelName" label="设备模型名称">{{
          planItem.assetModelName
        }}</t-descriptions-item>
      </t-descriptions>
    </cmp-card>
    <cmp-card flex="auto" :ghost="true">
      <cmp-table
        size="small"
        row-key="id"
        :table-column="itemColumn"
        :table-data="itemList"
        :fixed-height="true"
        max-height="300px"
        :show-pagination="false"
        empty="没有符合条件的数据"
        :selected-row-keys="selectItemId"
        @select-change="handleRowSelectChange"
      >
        <template #title>
          {{ '待选择保养项目' }}
        </template>
        <template #isPhoto="{ row }">
          {{ row.isPhoto == 1 ? '是' : '否' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="tsx" name="RelateItemAddForm">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/equipment';
// 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  planId: {
    type: [String],
    default: '',
  },
});
const planItem: any = ref({});

const itemColumn: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { colKey: 'maintenanceItemCode', title: '保养项目编码', width: 100, align: 'center' },
  { colKey: 'maintenanceItemName', title: '保养项目名称', width: 100, align: 'center' },
  { colKey: 'maintenancePeriod', title: '保养周期', width: 100, align: 'center' },
  { colKey: 'maintenanceItemRequire', title: '保养要求', width: 100, align: 'center' },
  { colKey: 'isPhoto', title: '是否拍照', width: 100, align: 'center' },
];
const itemList: any = ref([]);
const selectItemId = ref([]); // 待添加的保养项目
const getItemList = async () => {
  selectItemId.value = [];
  if (!props.planId) return;
  const planId = [props.planId];

  const itemListData = await api.maintenancePlanItem.getExceptPlanItems(planId);
  itemList.value = itemListData;
};
const handleRowSelectChange = (value: any) => {
  selectItemId.value = value;
};

const getPlanItem = async () => {
  if (!props.planId) return;
  const searchCondition = {
    pageNum: 1,
    pageSize: 1,
    selectedField: 'id',
    selectedValue: props.planId,
  };
  const res: any = await api.maintenancePlan.search(searchCondition);
  if (res.list && res.list.length > 0) {
    [planItem.value] = res.list;
  }
};
watch(
  () => props.planId,
  (val) => {
    if (val) {
      getPlanItem();
      getItemList();
    }
  },
);
onMounted(() => {
  getItemList();
});

const getSelectItems = () => {
  return selectItemId.value;
};

defineExpose({ getSelectItems, getItemList });
// import TSelectTable from '../select-table/index.vue';
</script>
<style lang="less" scoped>
:deep(.t-form__controls-content) {
  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 100%;
  }
}
</style>
