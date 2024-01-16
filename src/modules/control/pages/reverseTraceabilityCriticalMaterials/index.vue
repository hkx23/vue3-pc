<template>
  <cmp-container :full="true">
    <cmp-card :full="false">
      <cmp-query
        ref="queryComponent"
        :opts="opts"
        :bool-enter="false"
        :is-reset-query="false"
        @submit="onInput"
        @reset="onReset"
      >
      </cmp-query>
    </cmp-card>
    <cmp-card class="not-full-tab">
      <tabs ref="tabsRef" :on-input-data="onInputData" :reset-data="resetData" @tab-changed="handleTabChange"></tabs>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import CmpQuery from '@/components/cmp-query/index.vue';

import tabs from './tabs.vue';

const queryComponent = ref();
// // #query 查询参数
const opts = computed(() => {
  return {
    serialNumber: {
      label: '产品条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      bind: {
        disablel: true,
      },
    },
    moCode: {
      label: '工单号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    parentPkgBarcode: {
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
    if (obj[key] === null || obj[key] === undefined || obj[key] === '' || obj[key] === ' ') {
      obj[key] = '';
    }
  });
}

const onInputData = ref({});
const onInput = async (data: any) => {
  fillEmptyValuesWithEmptyString(data);
  onInputData.value = JSON.parse(JSON.stringify(data));
};

const resetData = ref({});
const onReset = async () => {
  resetData.value = {
    pageNum: 1,
    pageSize: 10,
    serialNumber: '', // 产品条码
    moCode: '', // 工单号
    parentPkgBarcode: '', // 包装箱码,
  };
};

const handleTabChange = async () => {
  if (
    !queryComponent.value.state.form.serialNumber &&
    !queryComponent.value.state.form.moCode &&
    !queryComponent.value.state.form.parentPkgBarcode
  ) {
    return;
  }
  onInput(queryComponent.value.state.form);
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
