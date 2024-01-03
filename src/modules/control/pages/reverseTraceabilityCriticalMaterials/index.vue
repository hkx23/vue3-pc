<template>
  <cmp-container :full="true">
    <cmp-card :full="false">
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card class="not-full-tab">
      <tabs ref="tabsRef" :on-input-data="onInputData"></tabs>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

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
function fillEmptyValuesWithEmptyString(obj: any) {
  // 判断 搜索返回的数据是不是为 null 或者  undefined
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      obj[key] = '';
    }
  });
}

const onInputData = ref({});
const onInput = async (data: any) => {
  fillEmptyValuesWithEmptyString(data);
  onInputData.value = JSON.parse(JSON.stringify(data));
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
