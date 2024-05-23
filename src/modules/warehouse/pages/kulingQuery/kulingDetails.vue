<!-- 库龄查询-条码明细详细维护 -->
<template>
  <t-dialog width="90%" :footer="false" :close-on-overlay-click="true" top="56px">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true" style="height: calc(90vh - 56px - 57px)">
      <cmp-card :ghost="true">
        <!-- <template #title> 库龄查询-条码明细 </template> -->
        <!-- row-key="props.sunData.onhandId" todo -->
        <cmp-table
          v-model:pagination="pageUI"
          row-key="barcodeNo"
          :table-column="tableWarehouseColumns"
          :table-data="tableDocumentDetails"
          :total="detailTotal"
          :loading="loading"
          :fixed-height="true"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :hover="true"
          @refresh="tabRefresh"
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

import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const detailTotal = ref(0);
const { loading } = useLoading();
//* 表格标题--单据明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 85, cell: 'indexSlot' },
  { title: '标签号', colKey: 'barcodeNo', width: 200 },
  { title: '批次号', colKey: 'batchLot', width: 200 },
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
  onhandId: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});
const tabRefresh = async () => {
  // 获取库存现有量明细
  loading.value = true;
  // const data = await api.storageAgeQuery.getList({
  //   pageNum: pageUI.value.page,
  //   pageSize: pageUI.value.rows,
  // });

  const result = await api.storageAgeQuery.getDtl({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    onhandId: props.onhandId,
    stockInDateStart: refStartDate.value,
    stockInDateEnd: refEndDate.value,
  });
  console.log('🚀 ~ fetchTable ~ data:', result);
  tableDocumentDetails.value = result.list;
  detailTotal.value = result.total;
  loading.value = false;
};
const refOnhandId = ref(props.onhandId);
// 监听 onHandId 的变化
watch(
  () => props.onhandId,
  (newVal) => {
    refOnhandId.value = newVal;
    tabRefresh();
  },
  { immediate: true },
);

const refStartDate = ref(props.startDate);
// 监听 startDate 的变化
watch(
  () => props.startDate,
  (newVal) => {
    refStartDate.value = newVal;
    tabRefresh();
  },
  { immediate: true },
);

const refEndDate = ref(props.endDate);
// 监听 endDate 的变化
watch(
  () => props.endDate,
  (newVal) => {
    refEndDate.value = newVal;
    tabRefresh();
  },
  { immediate: true },
);
</script>
