<template>
  <cmp-business-select
    name="物料类别"
    :fetch-data="fetchData"
    :fetch-search-data="fetchSearchData"
  ></cmp-business-select>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';

import { api as mainApi, MitemCategory } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';
import { BusinessItem } from './constants';

const formatListData = (list: MitemCategory[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.categoryName = t.categoryName || t.categoryCode;
    return {
      label: t.categoryName,
      value: t.categoryCode,
      row: t,
      cmp: {
        avatarLabel: t.categoryCode.slice(0, 2),
        name: t.categoryCode,
        code: t.categoryName,
        description: t.categoryDesc || t.categoryName,
        showIcon: false,
      },
    };
  });
};

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.mitemCategory.search({
    pageNum: pageIndex || 1,
    pageSize: 1000,
    filters: [],
  });
  return formatListData(data.list);
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.mitemCategory.search({
    pageNum: 1,
    pageSize: 20,
    keyword,
  });
  return formatListData(data.list);
};
</script>
<style scoped lang="less"></style>
