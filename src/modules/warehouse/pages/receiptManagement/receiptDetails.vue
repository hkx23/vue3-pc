<!-- 单据详细维护 -->
<template>
  <t-dialog width="80%" :footer="false" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <!-- 单据相关详细信息 -->
      <cmp-card v-if="safeSomeData && safeSomeData.billNo">
        <template #title> 单据号{{ safeSomeData.billNo }}相关详细信息 </template>
        <t-descriptions>
          <t-descriptions-item label="单据号：" name="billNo">{{ safeSomeData.billNo }}</t-descriptions-item>
          <t-descriptions-item label="关联单号：" name="relatedBillNo">{{
            safeSomeData.relatedBillNo
          }}</t-descriptions-item>
          <t-descriptions-item label="供应商：" name="supplierName">{{
            safeSomeData.supplierName
          }}</t-descriptions-item>

          <t-descriptions-item label="创建人：" name="creator">{{ safeSomeData.creator }}</t-descriptions-item>
          <t-descriptions-item label="事物类型：" name="categoryName">{{
            safeSomeData.categoryName
          }}</t-descriptions-item>
          <t-descriptions-item label="费用部门：" name="costDepartment">{{
            safeSomeData.costDepartment
          }}</t-descriptions-item>
          <t-descriptions-item label="原因：" name="reason">{{ safeSomeData.reason }}</t-descriptions-item>
          <t-descriptions-item label="科目：" name="account">{{ safeSomeData.account }}</t-descriptions-item>
          <t-descriptions-item label="创建时间：" name="timeCreate">{{ safeSomeData.timeCreate }}</t-descriptions-item>
        </t-descriptions>

        <!-- <t-form ref="formRef1" label-width="200px">
          <t-row :gutter="[32, 16]">
            <t-col :span="3">
              <t-form-item label="单据号：" name="billNo">
                <span>{{  }}</span>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="关联单号：" name="关联单号：">
                <span>{{ safeSomeData.relatedBillNo }}</span>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="供应商：" name="supplierName">
                <span>{{ safeSomeData.supplierName }}</span>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="创建人：" name="creator">
                <span>{{ safeSomeData.creator }}</span>
              </t-form-item>
            </t-col>
          </t-row>
          <t-row :gutter="[32, 16]">
            <t-col :span="3">
              <t-form-item label="事物类型：" name="categoryName">
                <span>{{ safeSomeData.categoryName }}</span>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="费用部门：" name="costDepartment">
                <span>{{ safeSomeData.costDepartment }}</span>
              </t-form-item>
            </t-col>

            <t-col :span="3">
              <t-form-item label="原因：" name="reason">
                <span>{{ safeSomeData.reason }}</span>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="科目：" name="account">
                <span>{{ safeSomeData.account }}</span>
              </t-form-item>
            </t-col>
          </t-row>
          <t-row :gutter="[32, 16]">
            <t-col :span="6">
              <t-form-item label="创建时间：" name="timeCreate">
                <span>{{ safeSomeData.timeCreate }}</span>
              </t-form-item>
            </t-col>
          </t-row>
        </t-form> -->

        <!-- <t-descriptions>
        <t-descriptions-item label="接口领域分类">{{ rowData.msgDomainCategoryName }}</t-descriptions-item>
        <t-descriptions-item label="MES业务单号">{{ rowData.billNo }}</t-descriptions-item>
        <t-descriptions-item label="ERP凭据单号">{{ rowData.erpbillNo }}</t-descriptions-item>
        <t-descriptions-item label="交易开始时间">{{ rowData.datetimeExecuteStart }}</t-descriptions-item>
        <t-descriptions-item label="至">{{ rowData.datetimeExecuteEnd }}</t-descriptions-item>
        <t-descriptions-item label="执行结果">{{ rowData.status }}</t-descriptions-item>
        <t-descriptions-item label="错误信息" :span="3">
        </t-descriptions-item>
        <t-descriptions-item label="请求参数" :span="3">
        </t-descriptions-item>
      </t-descriptions> -->

        <!-- <div class="dialog-footer">
            <t-button theme="default" type="reset" @click="handleCancel">取消</t-button>
          </div> -->
      </cmp-card>
      <!-- table 单据明细 -->
      <cmp-card>
        <template #title> 单据明细 </template>
        <cmp-table
          row-key="id"
          :table-column="tableWarehouseColumns"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :table-data="tableDocumentDetails"
        >
          <!-- <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template> -->
        </cmp-table>
      </cmp-card>
      <!-- table 标签明细 -->
      <cmp-card>
        <template #title> 标签明细 </template>
        <cmp-table
          row-key="id"
          :table-column="tableWarehouseColumns1"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :table-data="tableLabelDetail"
        >
          <!-- 定义序号列的插槽 -->
          <!-- <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template> -->
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
// import { api } from '@/api/warehouse';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

// import { usePage } from '@/hooks/modules/page';

// const { pageUI } = usePage();
//* 表格标题--单据明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 85, cell: 'indexSlot' },
  { title: '物料编码', colKey: 'mitemCode', width: 85 },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  { title: '单位', width: 85, colKey: 'uomName' },
  {
    title: '源仓库',
    width: 85,
    colKey: 'warehouseName',
  },
  { title: '源货位', width: 100, colKey: 'locationName' },
  { title: '目标仓库', width: 100, colKey: 'toWarehouseName' },
  { title: '目标货位', width: 100, colKey: 'toLocationName' },
  { title: '交易数量', width: 100, colKey: 'pickQty' },
  { title: '需求数量', width: 100, colKey: 'reqQty' },
];
//* 表格标题--标签明细
const tableWarehouseColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 85, cell: 'indexSlot' },
  { title: '标签条码', colKey: 'scanBarcode', width: 85 },
  { title: '物料编码', width: 85, colKey: 'mitemCode' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  {
    title: '发出仓库',
    width: 85,
    colKey: 'warehouseName',
  },
  { title: '发出货位', width: 100, colKey: 'locationName' },
  { title: '目标仓库', width: 100, colKey: 'toWarehouseName' },
  { title: '目标货位', width: 100, colKey: 'toDistrictName' },
  { title: '单位', width: 100, colKey: 'uomName' },
  { title: '需求数量', width: 100, colKey: 'reqQty' },
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

const safeSomeData = computed(() => {
  return props.someData1 && props.someData1.length > 0 ? props.someData1[0] : {};
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
