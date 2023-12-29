<template>
  <cmp-container :full="true">
    <cmp-card :full="false">
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card class="not-full-tab">
      <tabs ref="tabsRef"></tabs>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import CmpQuery from '@/components/cmp-query/index.vue';

import tabs from './tabs.vue';

// // #query 查询参数
const opts = computed(() => {
  return {
    productBarcode: {
      label: '产品条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    workOrderNumber: {
      label: '工单号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    packingBoxCode: {
      label: '包装箱码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
// // #query 查询函数
const onInput = async (data: any) => {
  console.log('🚀 ~ file: index.vue:162 ~ onInput ~ data:', data);
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
