<!-- 样本字码表 -->
<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <cmp-table
        ref="tableRefTop"
        row-key="batch"
        :fixed-height="true"
        :active-row-type="'single'"
        :hover="true"
        :table-column="logInterface"
        :table-data="ruleTabData"
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
import { onMounted, ref } from 'vue';

import { api } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';

onMounted(async () => {
  await onGetRuleData();
});
const ruleTabData = ref([]);
const onGetRuleData = async () => {
  const res = await api.sampleCode.getList();
  const updatedData = res.map((item) => {
    const { batchStart, batchEnd, ...rest } = item;
    return {
      ...rest,
      batch: `${batchStart}-${batchEnd}`,
    };
  });
  ruleTabData.value = updatedData;
};
const logInterface: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'batch',
    title: '批量',
    width: '100',
  },
  {
    title: '特殊检验水平',
    align: 'center',
    children: [
      {
        colKey: 's1',
        title: 'S-1',
        width: 90,
      },
      {
        colKey: 's2',
        title: 'S-2',
        width: 90,
      },
      {
        colKey: 's3',
        title: 'S-3',
        width: 90,
      },
      {
        colKey: 's4',
        title: 'S-4',
        width: 90,
      },
    ],
  },
  {
    title: '一般检验水品',
    align: 'center',
    children: [
      {
        colKey: 'I',
        title: 'Ⅰ',
        width: 90,
      },
      {
        colKey: 'II',
        title: 'Ⅱ',
        width: 90,
      },
      {
        colKey: 'III',
        title: 'Ⅲ',
        width: 90,
      },
    ],
  },
];
</script>
