<script setup lang="ts">
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

// 假定的 res 数据
const res = ref([
  {
    materCode: 'administrator',
    materDocs: '1',
    safeStock: 1750522,
    economicQuantity: 444444,
    delivered: '1',
    starving: 1,
    suggestedDelivery: 666666,
    KNum: 7777777,
    MNum: 88888888,
  },
  {
    materCode: 'administrator',
    materDocs: '1',
    safeStock: 175052,
    economicQuantity: 444444,
    delivered: '1',
    starving: 1,
    suggestedDelivery: 666666,
    KNum: 777777,
    MNum: 88888888,
  },
]);

type User = {
  materCode: string;
  materDocs: string;
  safeStock: number;
  economicQuantity: number;
  delivered: string;
  starving: number;
  suggestedDelivery: number;
  KNum: number;
  MNum: number;
};

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('materCode', {
    header: '物料编码',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('materDocs', {
    header: '物料描述',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('safeStock', {
    header: '安全库存',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('economicQuantity', {
    header: '经济批量',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('delivered', {
    header: '已配送/需求',
    // 使用 cell 函数自定义渲染逻辑
  }),
  columnHelper.accessor('starving', {
    header: '缺料数',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('suggestedDelivery', {
    header: '建议配送',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('KNum', {
    header: '现有库存',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('MNum', {
    header: '最大库存',
    cell: (info) => info.getValue(),
  }),
];

const table = useVueTable({
  get data() {
    return res.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
</script>

<template>
  <div class="p-2">
    <table>
      <thead>
        <!-- 明确添加序号列的表头 -->
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th>序号</th>
          <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            {{ header.column.columnDef.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in table.getRowModel().rows" :key="row.id">
          <td>{{ rowIndex + 1 }}</td>
          <!-- 在每行的开始添加序号 -->
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            {{ cell.getValue() }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="table_page">
      <div class="pageSize">
        <div>每页0条/</div>
        <div>共0页/</div>
        <div>当前第0页</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}

.table_page {
  display: flex;
  justify-content: end;
  margin: 8px 8px 0 0;
}

.pageSize {
  display: flex;
}
</style>
