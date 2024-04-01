<template>
  <cmp-business-select
    ref="selectRef"
    name="工单"
    type="table"
    popup-width="720px"
    :table-props="tableProps"
    :fetch-data="fetchData"
    :fetch-search-data="fetchSearchData"
  >
    <template #filter>
      <t-radio-group v-model="timeType" variant="default-filled">
        <t-radio-button value="0">全部</t-radio-button>
        <t-radio-button value="1">近一天</t-radio-button>
        <t-radio-button value="2">近三天</t-radio-button>
        <t-radio-button value="3">近一周</t-radio-button>
      </t-radio-group>
    </template>
    <template #toolbar>
      <t-checkbox v-model="showIncompleteMo">显示未完成工单</t-checkbox>
    </template>
  </cmp-business-select>
</template>
<script setup lang="tsx">
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { TableProps } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { api as mainApi } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';

const selectRef = ref();
const timeType = ref('2');
const showIncompleteMo = ref(false);
const filterData = computed(() => {
  let datetimePlanStart = dayjs().format('YYYY-MM-DD 23:59:59');
  let datetimePlanEnd = '';
  switch (timeType.value) {
    case '1':
      datetimePlanEnd = dayjs().subtract(-1, 'day').format('YYYY-MM-DD 00:00:00');
      break;
    case '2':
      datetimePlanEnd = dayjs().subtract(-3, 'day').format('YYYY-MM-DD 00:00:00');
      break;
    case '3':
      datetimePlanEnd = dayjs().subtract(-7, 'day').format('YYYY-MM-DD 00:00:00');
      break;
    default:
      datetimePlanStart = '';
      break;
  }
  return {
    datetimePlanStart,
    datetimePlanEnd,
    status: showIncompleteMo.value ? 'DOWNLOAD,SCHEDULED,READY,RUNNING' : '',
  };
});

watch(
  filterData,
  debounce(() => {
    selectRef.value.loadData();
  }, 100),
  {
    deep: true,
  },
);

const tableProps = computed<TableProps>(() => {
  return {
    rowKey: 'id',
    columns: [
      { colKey: 'moCode', title: '工单代码', width: '130px', ellipsis: true },
      { colKey: 'planQty', title: '数量', width: '60px', align: 'right', ellipsis: true },
      { colKey: 'mitemDesc', title: '产品', ellipsis: true },
      { colKey: 'statusName', title: '状态', width: '60px', align: 'center', ellipsis: true },
      { colKey: 'routingName', title: '工艺路线', ellipsis: true },
      { colKey: 'moClassName', title: '工单类型', width: '70px', align: 'center', ellipsis: true },
      { colKey: 'datetimePlanStart', title: '计划开始时间', width: '140px', ellipsis: true },
      { colKey: 'datetimePlanEnd', title: '计划完成时间', width: '140px', ellipsis: true },
    ],
  };
});

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.mo.getmolist({
    pageNum: pageIndex || 1,
    pageSize: 20,
    ...filterData.value,
  });
  return (data as any).list;
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.mo.getmolist({
    pageNum: 1,
    pageSize: 50,
    moCode: keyword,
    ...filterData.value,
  });
  return (data as any).list;
};
</script>
<style scoped lang="less"></style>
