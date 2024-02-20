<script setup lang="tsx">
import { createColumnHelper, FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { onMounted, ref } from 'vue';

import { api, DeliveryCommandJobDTO } from '@/api/warehouse';
import { usePage } from '@/hooks/modules/page';

import ProgressBar from './progress.vue';

// type Person = {
//   mitemCode?: string; // 物料编码
//   mitemDesc?: string; // 物料描述
//   safeStockVolume?: number; // 安全库存量
//   lotQty?: number; // 经济批量
//   show?: Array<T>; // 已配送/需求数量
//   deliveryQty?: number; // 缺料数
//   suggest?: number; // 建议配送
//   qty?: number; // 现有库存
// };

const defaultData = ref<DeliveryCommandJobDTO[]>([]);

const columnHelper = createColumnHelper<DeliveryCommandJobDTO>();
const { pageUI } = usePage(); // 分页工具

const columns = [
  columnHelper.accessor('mitemCode', {
    header: '物料编码',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('mitemDesc', {
    header: '物料描述',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('safeStockVolume', {
    header: '安全库存',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lotQty', {
    header: '经济批量',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('show', {
    header: '已配送/需求',
    // cell: (info) => info.getValue(),
    // return <ProgressBar currentValue={currentProgress.value} maxValue={maxProgress.value} />;
    cell: (info) => {
      return <ProgressBar currentValue={info.getValue()[0]} maxValue={info.getValue()[1]} />;
    },
    // 使用 cell 函数自定义渲染逻辑
  }),
  columnHelper.accessor('deliveryQty', {
    header: '缺料数',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('suggest', {
    header: '建议配送',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('qty', {
    header: '现有库存',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('qty', {
    header: '最大库存',
    cell: (info) => info.getValue(),
  }),
];

onMounted(async () => {
  await onDeleteBatches();
});

const lineParam = ref({
  pageNum: 1,
  pageSize: 20,
});

const total = ref(0);
const onDeleteBatches = async () => {
  lineParam.value.pageNum = pageUI.value.page;
  pageUI.value.rows = 1;
  lineParam.value.pageSize = pageUI.value.rows;
  const res = await api.deliveryCommand.watchBoard(lineParam.value);
  defaultData.value = res.list;
  total.value = res.total;
};

const data = ref(defaultData);

// 定时器
setInterval(async () => {
  pageUI.value.page++;
  if (pageUI.value.page > Math.ceil(total.value / pageUI.value.rows)) {
    pageUI.value.page = 1;
  }
  await onDeleteBatches();
}, 3000); // 延迟时间是5000毫秒，即5秒

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
  <cmp-wrapper>
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
          <div>{{ `每页${pageUI.rows}条/` }}</div>
          <div>{{ `共${Math.ceil(total / pageUI.rows)}页/` }}</div>
          <div>{{ `当前第${pageUI.page}页` }}</div>
        </div>
      </div>
    </div>
  </cmp-wrapper>
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

/* thead {
  background-color: #e01e1e;
} */

.outer_box {
  height: 100vh;
  display: flex;
  flex-direction: column; /* 使得子元素垂直排列 */
  justify-content: space-between;
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
