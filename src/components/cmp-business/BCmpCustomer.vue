<template>
  <cmp-business-select name="客户" :fetch-data="fetchData" :fetch-search-data="fetchSearchData"></cmp-business-select>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';

import { api as mainApi, Customer } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';
import { BusinessItem } from './constants';

const formatListData = (list: Customer[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.customerName = t.customerName || t.customerCode;
    return {
      label: t.customerName,
      value: t.customerCode,
      row: t,
      cmp: {
        name: t.shortName,
        code: t.customerCode,
        description: t.customerName,
      },
    };
  });
};

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.customer.search({
    pageNum: pageIndex || 1,
    pageSize: 20,
    filters: [],
  });
  return formatListData(data.list);
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.customer.search({
    pageNum: 1,
    pageSize: 50,
    keyword,
  });
  return formatListData(data.list);
};
</script>
<style scoped lang="less"></style>
