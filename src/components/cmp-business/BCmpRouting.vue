<template>
  <cmp-business-select
    name="工艺路线"
    type="table"
    popup-width="600px"
    :table-props="tableProps"
    :fetch-data="fetchData"
    :fetch-search-data="fetchSearchData"
  ></cmp-business-select>
</template>
<script setup lang="tsx">
import { TableProps } from 'tdesign-vue-next';
import { computed } from 'vue';

import { api as mainApi } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';

const tableProps = computed<TableProps>(() => {
  return {
    rowKey: 'id',
    columns: [
      { colKey: 'routingCode', title: '编码', ellipsis: true },
      { colKey: 'routingName', title: '名称', ellipsis: true },
      { colKey: 'routingVersion', title: '版本', align: 'right', ellipsis: true },
      { colKey: 'routingName', title: '类别', ellipsis: true },
      { colKey: 'enableDate', title: '有效期', width: '140px', ellipsis: true },
    ],
  };
});

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.routing.mainPage({
    pageNum: pageIndex || 1,
    pageSize: 20,
  });
  return data.list;
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.routing.mainPage({
    pageNum: 1,
    pageSize: 50,
    keyword,
  });
  return data.list;
};
</script>
<style scoped lang="less"></style>
