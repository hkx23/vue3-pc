<!-- 盘点单维护 -->
<template>
  <t-dialog mode="full-screen" :footer="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-card>
        <div class="buttonSty">
          <t-button>刷新</t-button>
          <t-button>导出</t-button>
          <t-button>打印</t-button>
          <t-button>保存</t-button>
          <t-button>盘点完成</t-button>
          <t-button>调整差异</t-button>
          <t-button>关闭单据</t-button>
        </div>
      </cmp-card>
      <!-- 盘点单相关详细信息 -->
      <cmp-card>
        <template #title> 盘点单xxx相关详细信息 </template>
        <t-form>
          <t-row>
            <t-form-item label="盘点单号" name="description">
              <t-text>:xxx</t-text>
            </t-form-item>
            <t-form-item label="盘点类型" name="description">
              <t-text>:日盘</t-text>
            </t-form-item>
            <t-form-item label="状态" name="description">
              <t-text>:盘点中</t-text>
            </t-form-item>
          </t-row>
        </t-form>
      </cmp-card>
      <!-- table 物料明细 -->
      <cmp-card>
        <template #title> 物料明细 </template>
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

//* 表格标题--物料明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 85 },
  { title: '物料编码', colKey: 'districtCode', width: 85 },
  { title: '物料描述', width: 85, colKey: 'districtName' },
  { title: '单位', width: 85, colKey: 'districtDesc' },
  {
    title: '仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '货区', width: 100, colKey: 'warehouseName' },
  { title: '货位', width: 100, colKey: 'warehouseName1' },
  { title: '最小包装', width: 100, colKey: 'warehouseName2' },
  { title: '账面数', width: 100, colKey: 'warehouseName3' },
  { title: '实盘数', width: 100, colKey: 'warehouseName4' },
  { title: '差异数', width: 100, colKey: 'warehouseName5' },
  { title: '差异原因', width: 100, colKey: 'warehouseName6' },
  { title: '差异调整原因', width: 100, colKey: 'warehouseName7' },
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
    title: '发出仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '货区', width: 100, colKey: 'warehouseName' },
  { title: '发出货位', width: 100, colKey: 'warehouseName1' },
  { title: '单位', width: 100, colKey: 'warehouseName2' },
  { title: '盘点数量', width: 100, colKey: 'warehouseName3' },
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
