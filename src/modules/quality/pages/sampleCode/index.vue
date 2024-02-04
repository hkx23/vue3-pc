<!-- 样本字码表 -->
<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <cmp-table
        ref="tableRefTop"
        row-key="moScheduleId"
        :fixed-height="true"
        :active-row-type="'single'"
        :hover="true"
        :table-column="logInterface"
        :table-data="printTopTabData"
        :total="0"
        select-on-row-click
        :show-pagination="false"
        :search-visible="false"
        :show-setting="false"
      >
        <template #title>
          {{ '样本字码列表' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
// import { onMounted, Ref, ref } from 'vue';
import { ref } from 'vue';

// import { api } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';

const printTopTabData = ref([]);

const logInterface: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'deliveryCardNo',
    title: '批量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '特殊检验水平',
    align: 'center',
    children: [
      {
        colKey: 'channel',
        title: 'S-1',
        width: 90,
      },
      {
        colKey: 'time',
        title: 'S-2',
        width: 90,
      },
      {
        colKey: 'time',
        title: 'S-3',
        width: 90,
      },
      {
        colKey: 'time',
        title: 'S-4',
        width: 90,
      },
    ],
  },
  {
    colKey: 'qty',
    title: '一般检验水品',
    align: 'center',
    children: [
      {
        colKey: 'channel',
        title: 'Ⅰ',
        width: 90,
      },
      {
        colKey: 'time',
        title: 'Ⅱ',
        width: 90,
      },
      {
        colKey: 'time',
        title: 'Ⅲ',
        width: 90,
      },
    ],
  },
];
</script>
