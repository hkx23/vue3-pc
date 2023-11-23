<template>
  <tm-query :opts="opts" @submit="conditionEnter" @handle-event="handleEvent" />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

import TmQuery from '@/components/tm-query/index.vue';

const state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
      },
    ],
  },
});
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 't-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 't-input',
    },
    workshopNum: {
      label: '手机号码',
      comp: 't-input',
    },
    date: {
      label: '手机号码',
      comp: 't-input',
    },
    date2: {
      label: '手机号码',
      comp: 't-input',
    },
  };
});
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData;
  console.log(444, userName, phonenumber, date1);
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  };
});
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val);
      break;
    default:
      break;
  }
};
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data);
  state.queryData = data;
  console.log('最终参数', getQueryData.value);
};
</script>
