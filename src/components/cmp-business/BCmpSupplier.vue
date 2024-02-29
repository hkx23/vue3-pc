<template>
  <cmp-business-select name="供应商" :fetch-data="fetchData" :fetch-search-data="fetchSearchData"></cmp-business-select>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';

import { api as mainApi, Supplier } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';
import { BusinessItem } from './constants';

const formatListData = (list: Supplier[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.supplierName = t.supplierName || t.supplierCode;
    return {
      label: t.supplierName,
      value: t.supplierCode,
      row: t,
    };
  });
};

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.supplier.search({
    pageNum: pageIndex || 1,
    pageSize: 20,
    filters: [],
  });
  return formatListData(data.list);
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.supplier.search({
    pageNum: 1,
    pageSize: 50,
    keyword,
  });
  return formatListData(data.list);
};
</script>
<style scoped lang="less"></style>
