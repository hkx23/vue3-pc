<template>
  <tm-query :opts="opts" is-expansion label-width="100px" @submit="conditionEnter" @handle-event="handleEvent" />
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, reactive } from 'vue';

import TmQuery from '@/components/tm-query/index.vue';

const state = reactive({
  queryData: {
    inputValue: null,
    businessValue: null,
    selectValue: null,
    selectMulValue: null,
    dateValue: null,
    dateTimeValue: null,
    dateRangeValue: null,
    dateTimeRangeValue: null,
    checkedValue: null,
  },
  sexList: [
    {
      label: '男',
      value: 'M',
    },
    {
      label: '女',
      value: 'F',
    },
  ],
  multipleList: [
    { label: '全选', checkAll: true },
    {
      label: '前纺一车间',
      value: 'W1',
    },
    {
      label: '前纺二车间',
      value: 'W2',
    },
    {
      label: '前纺三车间',
      value: 'W3',
    },
    {
      label: '前纺四车间',
      value: 'W4',
    },
  ],
  checkOptions: [
    { label: '全选', checkAll: true },
    { value: '选项一', label: '选项一', title: '选项一' },
    { value: '选项二', label: () => <div>选项二</div> },
    { value: '选项三', label: '选项三' },
  ],
});

const opts = computed(() => {
  return {
    inputValue: {
      label: '1.普通Input',
      comp: 't-input',
      event: 'input',
      defaultVal: '单选测试',
    },
    selectValue: {
      label: '2.单选使用',
      comp: 't-select',
      event: 'single',
      defaultVal: 'M',
      bind: {
        options: state.sexList,
      },
    },
    selectMulValue: {
      label: '3.多选使用',
      comp: 't-select',
      event: 'mulselect',
      defaultVal: ['W1'],
      bind: {
        multiple: true,
        options: state.multipleList,
      },
    },
    businessValue: {
      label: '4.业务组件',
      comp: 'tm-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
      },
    },
    dateValue: {
      label: '5.单选日期',
      comp: 't-date-picker',
      event: 'date',
      defaultVal: dayjs(),
      bind: {
        mode: 'date',
        format: 'YYYY-MM-DD',
      },
    },
    dateTimeValue: {
      label: '6.单选日期时间',
      comp: 't-date-picker',
      event: 'datetime',
      defaultVal: dayjs(),
      bind: {
        enableTimePicker: true,
      },
    },
    dateRangeValue: {
      label: '7.日期区间',
      comp: 't-date-range-picker',
      event: 'daterange',
      defaultVal: [dayjs(), dayjs()],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },
    dateTimeRangeValue: {
      label: '8.日期时间区间',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs(), dayjs()],
      bind: {
        enableTimePicker: true,
        // format: 'YYYY-MM-DD',
      },
    },
    checkedValue: {
      label: '9.多选勾选框',
      comp: 't-checkbox-group',
      event: 'checkboxgroup',
      defaultVal: [],
      bind: {
        options: state.checkOptions,
        lazyLoad: true,
      },
    },
    // userName: {
    //   label: '业务组件',
    //   comp: 'tm-select-business',
    //   bind: {
    //     type: 'mitemCategory',
    //   },
    // },

    // workshopNum2: {
    //   label: 't-select多选使用',
    //   comp: 't-select',
    //   bind: {
    //     defaultValue: null,
    //     multiple: true,
    //     options: state.multipleList,
    //   },
    // },
  };
});

// 最终参数获取
const getQueryData = computed(() => {
  const {
    inputValue,
    businessValue,
    dateValue,
    dateTimeValue,
    selectValue,
    dateRangeValue,
    dateTimeRangeValue,
    selectMulValue,
    checkedValue,
  } = state.queryData;
  return {
    inputValue,
    businessValue,
    dateValue,
    dateTimeValue,
    selectValue,
    dateRangeValue,
    dateTimeRangeValue,
    selectMulValue,
    checkedValue,
  };
});
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'input':
      console.log('获取event==input的数据', val);
      break;
    case 'single':
      console.log('获取event==single的数据', val);
      break;
    case 'mulselect':
      console.log('获取event==mulselect的数据', val);
      break;
    case 'business':
      console.log('获取event==business的数据', val);
      break;
    case 'date':
      console.log('获取event==date的数据', val);
      break;
    case 'datetime':
      console.log('获取event==datetime的数据', val);
      break;
    case 'daterange':
      console.log('获取event==daterange的数据', val);
      break;
    case 'daterangetime':
      console.log('获取event==daterangetime的数据', val);
      break;
    case 'checkboxgroup':
      console.log('获取event==checkboxgroup的数据', val);
      break;
    default:
      break;
  }
  MessagePlugin.info(`值变化:type:${type},val:${val}`);
};
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data);
  state.queryData = data;
  console.log('最终参数', getQueryData.value);
  MessagePlugin.info(`最终参数:${JSON.stringify(getQueryData.value)}`);
};
</script>
