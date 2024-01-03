<template>
  <cmp-container :full="true">
    <cmp-card v-if="BasicsShow !== 0 && BasicsShow !== 1" :full="false">
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card v-if="BasicsShow === 0 || BasicsShow === 1" :full="false">
      <cmp-query :opts="optsBasics" :bool-enter="false" @submit="onInputBasics" @reset="onReset"> </cmp-query>
    </cmp-card>
    <cmp-card class="not-full-tab">
      <tabs
        ref="tabsRef"
        :on-input-data="onInputData"
        :on-input-basics-data="onInputBasicsData"
        @update-basics-num="handleUpdateBasicsNum"
      ></tabs>
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

// ############### 产品基础信息 #########
const optsBasics = computed(() => {
  return {
    serialNumber: {
      label: '基础产品条码',
      comp: 't-input',
      event: 'input',
      defaultVal: ' ',
    },
    moCode: {
      label: '基础工单号',
      comp: 't-input',
      event: 'input',
      defaultVal: ' ',
    },
    packingBoxCode: {
      label: '基础包装箱码',
      comp: 't-input',
      event: 'input',
      defaultVal: ' ',
    },
  };
});

const onInputBasicsData = ref({});
const onInputBasics = async (data: any) => {
  fillEmptyValuesWithEmptyString(data);
  onInputBasicsData.value = JSON.parse(JSON.stringify(data));
};

const onReset = async () => {
  console.log('🚀 ~ file: index.vue:103 ~ onReset ~ onReset:', 'onReset');
};

// 判断是产品基础信息还是其他
const BasicsShow = ref(0);
const handleUpdateBasicsNum = (BasicsNum: number) => {
  BasicsShow.value = BasicsNum;
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
