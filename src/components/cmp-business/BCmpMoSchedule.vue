<template>
  <cmp-business-select
    ref="selectRef"
    name="排产单"
    type="table"
    popup-width="600px"
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
      <t-checkbox v-model="showIncompleteMo">显示未完成排产单</t-checkbox>
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
  const arrFilter = [];
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

  if (datetimePlanStart) {
    arrFilter.push({
      field: 'datetimePlanStart',
      operator: 'GTE',
      value: datetimePlanStart,
    });
    arrFilter.push({
      field: 'datetimePlanStart',
      operator: 'LTE',
      value: datetimePlanEnd,
    });
  }

  if (showIncompleteMo.value) {
    arrFilter.push({
      field: 'status',
      operator: 'IN',
      value: showIncompleteMo.value ? 'DOWNLOAD,SCHEDULED,READY,RUNNING' : '',
    });
  }
  return arrFilter;
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
      { colKey: 'scheCode', title: '排产单', width: '135px', ellipsis: true },
      { colKey: 'planQty', title: '计划数量', width: '70px', align: 'right', ellipsis: true },
      { colKey: 'scheQty', title: '排产数量', width: '70px', align: 'right', ellipsis: true },
      { colKey: 'datetimePlanStart', title: '计划开始时间', width: '140px', ellipsis: true },
      { colKey: 'datetimePlanEnd', title: '计划完成时间', width: '140px', ellipsis: true },
      { colKey: 'routingCode', title: '工艺路线编码', ellipsis: true },
      { colKey: 'routingName', title: '工艺路线名称', ellipsis: true },
    ],
  };
});

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.moSchedule.search({
    pageNum: pageIndex || 1,
    pageSize: 20,
    filters: filterData.value,
  });
  return data.list;
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.moSchedule.search({
    pageNum: 1,
    pageSize: 50,
    keyword,
    filters: filterData.value,
  });
  return data.list;
};
</script>
<style scoped lang="less"></style>
