<template>
  <cmp-business-select name="物料" :fetch-data="fetchData" :fetch-search-data="fetchSearchData"></cmp-business-select>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';

import { api as mainApi, MitemVO } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';
import { BusinessItem } from './constants';

const formatListData = (list: MitemVO[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.mitemName = t.mitemName || t.mitemCode;
    return {
      label: t.mitemName,
      value: t.mitemCode,
      row: t,
      cmp: {
        // avatarLabel: t.mitemCategoryCode.slice(0, 2),
        name: t.mitemCode,
        subName: t.mitemName,
        description: t.mitemDesc || t.mitemName,
        suffixTag: t.mitemCategoryName,
        showIcon: false,
      },
    };
  });
};

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.mitem.search({
    pageNum: pageIndex || 1,
    pageSize: 20,
    filters: [],
  });
  return formatListData(data.list);
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = await mainApi.mitem.search({
    pageNum: 1,
    pageSize: 50,
    keyword,
  });
  return formatListData(data.list);
};
</script>
<style scoped lang="less"></style>
