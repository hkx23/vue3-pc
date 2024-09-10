<template>
  <cmp-container :full="true">
    <cmp-card flex="auto" :ghost="true">
      <t-descriptions :column="4" colon>
        <t-descriptions-item label="单据编号">{{ billItem.billNo }}</t-descriptions-item>
        <t-descriptions-item label="模具编码">{{ billItem.mouldCode }}</t-descriptions-item>
        <t-descriptions-item label="模具名称">{{ billItem.mouldName }}</t-descriptions-item>
        <t-descriptions-item label="报障位置">{{ billItem.positionPath }}</t-descriptions-item>
        <t-descriptions-item label="报障人">{{ billItem.userCreatorName }}</t-descriptions-item>
        <t-descriptions-item label="报障时间">{{ billItem.timeCreate }}</t-descriptions-item>
        <t-descriptions-item label="维修处理组">{{ billItem.repairDealGroupName }}</t-descriptions-item>
        <t-descriptions-item label="维修验收组">{{ billItem.repairAcceptGroupName }}</t-descriptions-item>
        <t-descriptions-item label="故障照片">
          <t-link
            v-if="billItem.billHeadFiles && billItem.billHeadFiles.length"
            theme="primary"
            @click="viewPhoto(billItem.billHeadFiles, '故障照片')"
            >查看</t-link
          >
        </t-descriptions-item>
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
          {{ '单据维修项目' }}
        </template>
        <template #photo="{ row }">
          <t-link theme="primary" @click="viewPhoto(row.billDtlFiles, '维修照片')">查看</t-link>
        </template>
      </cmp-table>
    </cmp-card>
    <!-- <cmp-card flex="auto" :ghost="true">
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
    </cmp-card> -->
  </cmp-container>
  <!-- !上传组件 弹框 -->
  <t-dialog
    v-model:visible="photoVisible"
    :close-on-overlay-click="false"
    :confirm-btn="null"
    :header="imageHeader"
    width="50%"
  >
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
const imageHeader = ref('');
const billItem: any = ref({});
const photoVisible = ref(false);
const fileList: any = ref([]);

const itemColumn: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'repairItemCode', title: '维修项目编码', width: 100, align: 'center' },
  { colKey: 'repairItemDesc', title: '维修项目描述', width: 100, align: 'center' },
  { colKey: 'repairItemMethod', title: '维修方法', width: 100, align: 'center' },
  { colKey: 'solveItemMethod', title: '解决方法', width: 100, align: 'center' },
  { colKey: 'photo', title: '维修照片', width: 100, align: 'center' },
  { colKey: 'memo', title: '备注', width: 100, align: 'center' },
];
const itemList: any = ref([]);
const selectItemId = ref([]); // 待添加的维修项目
// const getItemList = async () => {
//   selectItemId.value = [];
//   if (!props.billId) return;
//   const billId = [props.billId];

//   const itemListData = await api.maintenanceBillDtl.getItemsByBillId(billId);
//   itemList.value = itemListData;
// };

const viewPhoto = async (file: any, headerName: string) => {
  imageHeader.value = headerName;
  fileList.value = [];
  // const dtlId = [row.id];
  // const fileListData = await api.maintenanceBillDtlFile.getFilesByDtlIds(dtlId);
  fileList.value = file || [];
  photoVisible.value = true;
};

const getBillItem = async () => {
  if (!props.billId) return;
  const searchCondition = {
    // pageNum: 1,
    // pageSize: 1,
    // selectedField: 'id',
    // selectedValue: props.billId,
    // relateType: 'equipment',
    id: props.billId,
  };
  // const res: any = await api.repairBillHead.search(searchCondition);
  // if (res.list && res.list.length > 0) {
  //   [billItem.value] = res.list;
  // }

  const res: any = await api.repairBillHead.getMouldBillInfoById(searchCondition);
  billItem.value = res;
  if (res.billDetails && res.billDetails.length) {
    itemList.value = res.billDetails;
    // itemSparePartList.value = res.billDetails[0].billDtlSpareParts || [];
  }
};

// const itemSparePartColumn: PrimaryTableCol<TableRowData>[] = [
//   { colKey: 'sparePartCode', title: '备件编码', width: 100, align: 'center' },
//   { colKey: 'sparePartName', title: '备件描述', width: 100, align: 'center' },
//   { colKey: 'changeCount', title: '更换数量', width: 100, align: 'center' },
//   { colKey: 'uom', title: '单位', width: 100, align: 'center' },
// ];
// const itemSparePartList: any = ref([]);
// const getBillItemSparePart = async () => {
//   selectItemId.value = [];
//   if (!props.billId) return;
//   const billId = [props.billId];

//   const itemListData = await api.maintenanceBillDtlSparePart.getItemsByBillId(billId);
//   itemSparePartList.value = itemListData;
// };
watch(
  () => props.billId,
  (val) => {
    if (val) {
      getBillItem();
      // getItemList();
      // getBillItemSparePart();
    }
  },
);
onMounted(() => {
  getBillItem();
  // getItemList();
});

const getSelectItems = () => {
  return selectItemId.value;
};

// defineExpose({ getSelectItems, getItemList });
defineExpose({ getSelectItems });
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
