<!-- 库龄查询-条码明细详细维护 -->
<template>
  <t-dialog width="80%" :footer="false" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-card>
        <template #title> 库龄查询-条码明细 </template>
        <cmp-table
          row-key="id"
          :table-column="tableWarehouseColumns"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :table-data="tableDocumentDetails"
        >
          <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
// import { api } from '@/api/warehouse';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
//* 表格标题--单据明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 85, cell: 'indexSlot' },
  { title: '条码号', colKey: 'mitemCode', width: 85 },
  { title: '物料编码', width: 85, colKey: 'mitemDesc' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  { title: '仓库编码', width: 85, colKey: 'uomName' },
  { title: '仓库名称', width: 85, colKey: 'uomName2' },
  { title: '货区编码', width: 100, colKey: 'locationName' },
  { title: '货区名称', width: 100, colKey: 'toWarehouseName' },
  { title: '货位编码', width: 100, colKey: 'toLocationName' },
  { title: '货位名称', width: 100, colKey: 'toLocationName2' },
  { title: '单位', width: 100, colKey: 'pickQty' },
  { title: '数量', width: 100, colKey: 'reqQty' },
  { title: '入库日期', width: 100, colKey: 'reqQty2' },
  { title: '库龄（天）', width: 100, colKey: 'reqQty3' },
];

const tableDocumentDetails = ref([]);
const tableLabelDetail = ref([]);

// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
  someData1: Object,
  someData2: Array,
  someData3: Array,
});

watch(
  () => props.someData2,
  (newVal) => {
    tableDocumentDetails.value = newVal || [];
  },
  { immediate: true },
);
watch(
  () => props.someData3,
  (newVal) => {
    tableLabelDetail.value = newVal || [];
  },
  { immediate: true },
);
</script>

<style scoped>
.buttonSty {
  display: flex;
  justify-content: flex-start;
}
</style>
