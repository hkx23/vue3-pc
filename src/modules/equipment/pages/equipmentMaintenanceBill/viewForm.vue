<template>
  <cmp-container :full="true">
    <cmp-card flex="auto" :ghost="true">
      <t-descriptions :column="4" colon>
        <t-descriptions-item label="单据编号">{{ billItem.billNo }}</t-descriptions-item>
        <t-descriptions-item label="保养计划编号">{{ billItem.maintenancePlanCode }}</t-descriptions-item>
        <t-descriptions-item label="保养计划名称">{{ billItem.maintenancePlanName }}</t-descriptions-item>
        <t-descriptions-item label="设备编码">{{ billItem.equipmentCode }}</t-descriptions-item>
        <t-descriptions-item label="设备名称">{{ billItem.equipmentName }}</t-descriptions-item>
        <t-descriptions-item label="保养人">{{ billItem.userMaintenanceName }}</t-descriptions-item>
        <t-descriptions-item label="保养时间">{{ billItem.datetimeMaintenance }}</t-descriptions-item>
        <t-descriptions-item label="验收人">{{ billItem.userAcceptName }}</t-descriptions-item>
        <t-descriptions-item label="验收时间">{{ billItem.datetimeAccept }}</t-descriptions-item>
        <t-descriptions-item label="要求完成时间">{{ billItem.datetimeRequireEnd }}</t-descriptions-item>
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
      >
        <template #title>
          {{ '单据保养项目' }}
        </template>
        <template #photo="{ row }">
          <t-link theme="primary" @click="viewPhoto(row)">查看</t-link>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-card flex="auto" :ghost="true">
      <cmp-table
        size="small"
        row-key="id"
        :table-column="itemSparePartColumn"
        :table-data="itemSparePartList"
        :fixed-height="true"
        max-height="300px"
        :show-pagination="false"
        empty="没有符合条件的数据"
      >
        <template #title>
          {{ '单据更换备件' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- !上传组件 弹框 -->
  <t-dialog v-model:visible="photoVisible" :close-on-overlay-click="false" header="保养项目照片" width="50%">
    <cmp-container :full="true">
      <bcmp-upload-content :file-list="fileList" upload-path="maintenanceItem" readonly ghost></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="tsx" name="RelateItemAddForm">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/equipment';
import BcmpUploadContent from '@/components/bcmp-upload-content/index.vue';
// 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  billId: {
    type: [String],
    default: '',
  },
});
const billItem: any = ref({});
const photoVisible = ref(false);
const fileList: any = ref([]);

const itemColumn: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'maintenanceItemCode', title: '保养项目编码', width: 100, align: 'center' },
  { colKey: 'maintenanceItemName', title: '保养项目名称', width: 100, align: 'center' },
  { colKey: 'maintenancePeriodName', title: '保养周期', width: 100, align: 'center' },
  { colKey: 'maintenanceItemRequire', title: '保养要求', width: 100, align: 'center' },
  { colKey: 'photo', title: '照片', width: 100, align: 'center' },
  { colKey: 'memo', title: '备注', width: 100, align: 'center' },
];
const itemList: any = ref([]);
const selectItemId = ref([]); // 待添加的保养项目
const getItemList = async () => {
  selectItemId.value = [];
  if (!props.billId) return;
  const billId = [props.billId];

  const itemListData = await api.maintenanceBillDtl.getItemsByBillId(billId);
  itemList.value = itemListData;
};

const viewPhoto = async (row: any) => {
  fileList.value = [];
  const dtlId = [row.id];
  const fileListData = await api.maintenanceBillDtlFile.getFilesByDtlIds(dtlId);
  fileList.value = fileListData || [];
  photoVisible.value = true;
};

const getBillItem = async () => {
  if (!props.billId) return;
  const searchCondition = {
    pageNum: 1,
    pageSize: 1,
    selectedField: 'id',
    selectedValue: props.billId,
  };
  const res: any = await api.maintenanceBillHead.search(searchCondition);
  if (res.list && res.list.length > 0) {
    [billItem.value] = res.list;
  }
};

const itemSparePartColumn: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'sparePartCode', title: '备件编码', width: 100, align: 'center' },
  { colKey: 'sparePartName', title: '备件描述', width: 100, align: 'center' },
  { colKey: 'changeCount', title: '更换数量', width: 100, align: 'center' },
  { colKey: 'uom', title: '单位', width: 100, align: 'center' },
];
const itemSparePartList: any = ref([]);
const getBillItemSparePart = async () => {
  selectItemId.value = [];
  if (!props.billId) return;
  const billId = [props.billId];

  const itemListData = await api.maintenanceBillDtlSparePart.getItemsByBillId(billId);
  itemSparePartList.value = itemListData;
};
watch(
  () => props.billId,
  (val) => {
    if (val) {
      getBillItem();
      getItemList();
      getBillItemSparePart();
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
