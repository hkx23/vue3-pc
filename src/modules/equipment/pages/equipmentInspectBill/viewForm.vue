<template>
  <cmp-container :full="true">
    <cmp-card flex="auto" :ghost="true">
      <t-descriptions :column="4" colon>
        <t-descriptions-item label="单据编号">{{ billItem.billNo }}</t-descriptions-item>
        <t-descriptions-item label="点检计划编号">{{ billItem.inspectPlanCode }}</t-descriptions-item>
        <t-descriptions-item label="点检计划名称">{{ billItem.inspectPlanName }}</t-descriptions-item>
        <t-descriptions-item label="设备编码">{{ billItem.equipmentCode }}</t-descriptions-item>
        <t-descriptions-item label="设备名称">{{ billItem.equipmentName }}</t-descriptions-item>
        <t-descriptions-item label="点检人">{{ billItem.userInspectName }}</t-descriptions-item>
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
          {{ '单据点检项目' }}
        </template>
        <template #files="rowData">
          <t-space>
            <t-link theme="primary" @click="showUplaodImg(rowData)">{{ '查看' }}</t-link>
          </t-space>
        </template>
        <template #photo="{ row }">
          <t-link theme="primary" @click="viewPhoto(row)">查看</t-link>
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
  <t-dialog v-model:visible="photoVisible" :close-on-overlay-click="false" header="点检项目照片" width="50%">
    <cmp-container :full="true">
      <bcmp-upload-content :file-list="fileList" upload-path="inspectItem" readonly ghost></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <cmp-files-upload
    ref="formFilesRef"
    upload-path="InspectItem"
    @upload-success="uploadSuccess"
    @delete-success="deleteSuccess"
    @batch-delete-success="batchDeleteSuccess"
  />
</template>

<script setup lang="tsx" name="RelateItemAddForm">
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/equipment';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import BcmpUploadContent from '@/components/bcmp-upload-content/index.vue';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';
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
  { colKey: 'inspectItemCode', title: '点检项目编码', width: 100, align: 'center' },
  { colKey: 'inspectItemName', title: '点检项目名称', width: 100, align: 'center' },
  { colKey: 'inspectItemStandard', title: '点检标准', width: 100, align: 'center' },
  { colKey: 'inspectMethodName', title: '点检方式', width: 100, align: 'center' },
  { colKey: 'inspectItemTypeName', title: '点检类型', width: 100, align: 'center' },
  { colKey: 'inspectItemResult', title: '点检结果', width: 100, align: 'center' },
  { colKey: 'files', title: '标准图片', width: 100, align: 'center' },
  { colKey: 'photo', title: '点检图片', width: 100, align: 'center' },
  // { colKey: 'memo', title: '备注', width: 100, align: 'center' },
];
const itemList: any = ref([]);
const selectItemId = ref([]); // 待添加的点检项目
// const getItemList = async () => {
//   selectItemId.value = [];
//   if (!props.billId) return;
//   // const billId = [props.billId];
//   const { billId } = props;

//   const itemListData = await api.inspectBillHead.getEquipmentInspectById({ id: billId });
//   itemList.value = itemListData;
// };

const viewPhoto = async (row: any) => {
  fileList.value = [];
  // const dtlId = [row.id];
  // const fileListData = await api.inspectBillDtlFile.getFilesByDtlIds(dtlId);
  // fileList.value = fileListData || [];
  fileList.value = row.billDtlFiles || [];
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
  // const res: any = await api.maintenanceBillHead.search(searchCondition);
  // if (res.list && res.list.length > 0) {
  //   [billItem.value] = res.list;
  // }
  const res: any = await api.inspectBillHead.getEquipmentInspectById(searchCondition);
  billItem.value = res;
  if (res.billDetails && res.billDetails.length) {
    itemList.value = res.billDetails;
    itemSparePartList.value = res.billDetails[0].billDtlSpareParts || [];
  }
};

// const itemSparePartColumn: PrimaryTableCol<TableRowData>[] = [
//   { colKey: 'sparePartCode', title: '备件编码', width: 100, align: 'center' },
//   { colKey: 'sparePartName', title: '备件描述', width: 100, align: 'center' },
//   { colKey: 'changeCount', title: '更换数量', width: 100, align: 'center' },
//   { colKey: 'uom', title: '单位', width: 100, align: 'center' },
// ];
const itemSparePartList: any = ref([]);
// const getBillItemSparePart = async () => {
//   selectItemId.value = [];
//   if (!props.billId) return;
//   const billId = [props.billId];

//   const itemListData = await api.maintenanceBillDtlSparePart.getItemsByBillId(billId);
//   itemSparePartList.value = itemListData;
// };

// 标准图片 begin 文件上传

const formFilesRef = ref(null);
const selectRowId = ref('');
const showUplaodImg = async (rowData) => {
  selectRowId.value = rowData.row.inspectItemId;
  try {
    if (!_.isEmpty(selectRowId.value)) {
      const list = await api.inspectItemFile.getInspectItemFileList(selectRowId.value);
      rowData.row.fileList = list;
    }
    const { showForm } = formFilesRef.value;
    await showForm(false, rowData.row.fileList);
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      await api.inspectItemFile.addInspectItemFile({
        inspectItemId: selectRowId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success('文件上传成功');
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      await api.inspectItemFile.deleteInspectItemFile({
        inspectItemId: selectRowId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success('文件删除成功');
    }
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      const deleteList = [];
      files.forEach((n) => deleteList.push({ inspectItemId: selectRowId.value, fileName: n.fileName }));

      await api.inspectItemFile.deleteBatchInspectItemFile(deleteList);
      MessagePlugin.success('文件删除成功');
    }
  } catch (e) {
    console.log(e);
  }
};
// end 文件上传
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
