<template>
  <cmp-business-select name="用户" :fetch-data="fetchData" :fetch-search-data="fetchSearchData"></cmp-business-select>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';

import { api as mainApi, UserVO } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';
import { BusinessItem } from './constants';

const formatListData = (list: UserVO[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.displayName = t.displayName || t.userName;
    return {
      label: t.displayName,
      value: t.userName,
      row: t,
    };
  });
};

const fetchData = async (pageIndex?: number) => {
  const data = await mainApi.user.search({
    pageNum: pageIndex || 1,
    pageSize: 1000,
    filters: [],
  });
  return formatListData(data.list);
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = (await mainApi.user.search({
    pageNum: 1,
    pageSize: 20,
    filters: [
      {
        field: 'displayName',
        operator: 'LIKE',
        value: keyword,
      },
    ],
  })) as any;
  return formatListData(data.list);
};
</script>
<style scoped lang="less"></style>
