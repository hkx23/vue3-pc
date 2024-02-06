<script setup lang="tsx">
import { createColumnHelper, FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

import ProgressBar from './progress.vue';

type Person = {
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

const defaultData: Person[] = [
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
    economicQuantity: 4446576444,
    delivered: '1',
    starving: 1,
    suggestedDelivery: 666666,
    KNum: 777777,
    MNum: 88888888,
  },
];

const columnHelper = createColumnHelper<Person>();
const currentProgress = ref(100);
const maxProgress = ref(420);

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
    cell: () => {
      return <ProgressBar currentValue={currentProgress.value} maxValue={maxProgress.value} />;
    },
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

const data = ref(defaultData);

// const rerender = () => {
//   data.value = defaultData;
// };

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="outer_box">
    <table>
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <flex-render
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <flex-render :render="cell.column.columnDef.cell" :props="cell.getContext()" />
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
