<!-- 盘点单维护 -->
<template>
  <t-dialog mode="full-screen" :footer="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <!-- 盘点单相关详细信息 -->
      <cmp-card>
        <template #title> 单据号xxx相关详细信息 </template>
        <t-form>
          <t-row>
            <t-col>
              <t-form-item label="单据号" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="源仓库" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="源货位" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="目标仓库" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
            </t-col>

            <t-col>
              <t-form-item label="关联单号" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="需求数量" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="备注" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="供应商" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
            </t-col>

            <t-col>
              <t-form-item label="物料标签" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="创建人" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="创建时间" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
              <t-form-item label="事物类型" name="description">
                <t-text>:xxx</t-text>
              </t-form-item>
            </t-col>
          </t-row>
        </t-form>
      </cmp-card>
      <!-- table 物料明细 -->
      <cmp-card>
        <template #title> 单据明细 </template>
        <cmp-table
          row-key="id"
          :table-column="tableWarehouseColumns"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
        >
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
        >
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

//* 表格标题--单据明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 85 },
  { title: '物料代码', colKey: 'districtCode', width: 85 },
  { title: '物料描述', width: 85, colKey: 'districtName' },
  { title: '单位', width: 85, colKey: 'districtDesc' },
  {
    title: '源仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '源货位', width: 100, colKey: 'warehouseName' },
  { title: '目标仓库', width: 100, colKey: 'warehouseName1' },
  { title: '目标货位', width: 100, colKey: 'warehouseName2' },
  { title: '交易数量', width: 100, colKey: 'warehouseName3' },
  { title: '仓库数量合计', width: 100, colKey: 'warehouseName3' },
  { title: '责任部门', width: 100, colKey: 'warehouseName3' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];
//* 表格标题--标签明细
const tableWarehouseColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 85 },
  { title: '标签条码', colKey: 'districtCode', width: 85 },
  { title: '物料编码', width: 85, colKey: 'districtName' },
  { title: '物料描述', width: 85, colKey: 'districtDesc' },
  {
    title: '出发仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '出发货位', width: 100, colKey: 'warehouseName' },
  { title: '目标仓库', width: 100, colKey: 'warehouseName1' },
  { title: '目标货位', width: 100, colKey: 'warehouseName2' },
  { title: '单位', width: 100, colKey: 'warehouseName3' },
  { title: '交易数量', width: 100, colKey: 'warehouseName4' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
});
</script>

<style scoped>
.buttonSty {
  display: flex;
  justify-content: flex-start;
}
</style>
