<template>
  <cmp-container>
    <cmp-card>
      <cmp-query :opts="opts" is-expansion @submit="conditionEnter" @handle-event="handleEvent" @change="change">
        <template #querybar>
          <!-- <t-button theme="default">querybar插槽</t-button> -->
        </template>
        <template #soltDemo="{ param }">
          <t-tag-input v-model="param.soltDemo" clearable @paste="onPaste" @enter="onTagInputEnter" />
        </template>
      </cmp-query>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import CmpQuery from '@/components/cmp-query/index.vue';

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
    soltDemo: [],
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
const disableTest = ref(true);

const opts = computed(() => {
  return {
    inputValue: {
      label: '1.普通Input',
      comp: 't-input',
      event: 'input',
      defaultVal: '单选测试(包含事件)',
      eventHandle: {
        focus: ($event, row) => focus($event, row),
        blur: ($event, row) => blur($event, row),
      },
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
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    dateValue: {
      labelRender: () => {
        return <label style="color:red">5.单选日期(label插槽)</label>;
      },
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
        disabled: disableTest.value,
      },
    },
    soltDemo: {
      label: '10.插槽测试',
      slotName: 'soltDemo',
      defaultVal: [],
    },
    // userName: {
    //   label: '业务组件',
    //   comp: 'bcmp-select-business',
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
    soltDemo,
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
    soltDemo,
  };
});
const change = (val) => {
  MessagePlugin.info(`值变化:val:${JSON.stringify(val)}`);
};
// 查询条件change事件
const handleEvent = (type, val) => {
  console.log(111, type, val);
  switch (type) {
    case 'input':
      console.log('获取event==input的数据', val);
      break;
    case 'single':
      console.log('获取event==single的数据', val);
      disableTest.value = val === 'F';
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

// 失去焦点
const blur = (event, row) => {
  MessagePlugin.info(`普通Input-失去焦点:${JSON.stringify(row)}`);
};
// 获得焦点
const focus = (event, row) => {
  MessagePlugin.info(`普通Input-获得焦点:${JSON.stringify(row)}`);
};
const onTagInputEnter = (val, context) => {
  console.log(val, context);
};
const onPaste = (context) => {
  console.log(context);
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data);
  state.queryData = data;
  console.log('最终参数', getQueryData.value);
  MessagePlugin.info(`最终参数:${JSON.stringify(getQueryData.value)}`);
};
</script>
