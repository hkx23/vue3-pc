<!-- 库龄查询-条码明细详细维护 -->
<template>
  <t-dialog width="80%" :footer="false" :close-on-overlay-click="true">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-card>
        <!-- <template #title> 库龄查询-条码明细 </template> -->
        <!-- row-key="props.sunData.onhandId" todo -->
        <cmp-table
          row-key="labelNo"
          :table-column="tableWarehouseColumns"
          :show-pagination="false"
          :loading="loading"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :table-data="tableDocumentDetails"
        >
          <!-- <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template> -->
        </cmp-table>
      </cmp-card>
    </cmp-container>
    <!-- 自定义底部按钮 -->
    <template #footer>
      <t-button>取消</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import { useLoading } from '@/hooks/modules/loading';
// import { usePage } from '@/hooks/modules/page';

// const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
//* 表格标题--单据明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 85, cell: 'indexSlot' },
  { title: '条码号', colKey: 'barcodeNo', width: 200 },
  { title: '物料编码', width: 120, colKey: 'mitemCode' },
  { title: '物料描述', width: 120, colKey: 'mitemDesc' },
  { title: '仓库编码', width: 85, colKey: 'warehouseCode' },
  { title: '仓库名称', width: 120, colKey: 'warehouseName' },
  { title: '货区编码', width: 100, colKey: 'districtCode' },
  { title: '货区名称', width: 100, colKey: 'districtName' },
  { title: '货位编码', width: 100, colKey: 'locationCode' },
  { title: '货位名称', width: 100, colKey: 'locationName' },
  { title: '单位', width: 100, colKey: 'uomName' },
  { title: '数量', width: 100, colKey: 'balanceQty' },
  { title: '入库日期', width: 200, colKey: 'datetimeReceipted' },
  { title: '库龄（天）', width: 100, colKey: 'expiredDays' },
];

const tableDocumentDetails = ref([]);

// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
  sunData: Array,
});

// 监听 sunData 的变化
watch(
  () => props.sunData,
  (newVal) => {
    setLoading(true);
    tableDocumentDetails.value = newVal;
    setLoading(false);
  },
  { immediate: true },
);
</script>
