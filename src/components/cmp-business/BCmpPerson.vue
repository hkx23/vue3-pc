<template>
  <cmp-business-select
    name="人员"
    type="tree"
    :fetch-data="fetchData"
    :fetch-search-data="fetchSearchData"
    :fetch-tree-node-data="fetchTreeNodeData"
  ></cmp-business-select>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';

import { AdminOrgVO, api as mainApi } from '@/api/main';

import CmpBusinessSelect from './CmpBusinessSelect.vue';
import { BusinessItem } from './constants';

const formatOrgData = (list: AdminOrgVO[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    return {
      label: t.orgName,
      value: t.id + t.orgCode,
      row: t,
      children: true,
    } as BusinessItem;
  });
};

const formatPersonData = (list: any[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.personName = t.personName || t.personCode;
    return {
      label: t.personName,
      value: t.id,
      children: false,
      row: t,
      cmp: {
        description: t.email,
        suffixTag: t.personCode,
      },
    } as BusinessItem;
  });
};

const fetchData = async () => {
  const tree = await mainApi.adminOrg.tree();
  const result = formatOrgData(tree);
  return result;
};

const fetchSearchData = async (keyword: string, _listData: any[]) => {
  const data = (await mainApi.person.getlist({
    state: -1,
    adminorgid: -1,
    pagenum: 1,
    pagesize: 20,
    personcode: keyword,
    personname: '',
    sortfield: '',
    sorttype: '',
    filterfield: '',
    filter: '',
  })) as any;

  return formatPersonData(data.list as any[]);
};

const fetchTreeNodeData = (key: string | number, children: any[]) => {
  return mainApi.person
    .getlist({
      state: -1,
      adminorgid: key as number,
      pagenum: 1,
      pagesize: 1000,
      personcode: '',
      personname: '',
      sortfield: '',
      sorttype: '',
      filterfield: '',
      filter: '',
    })
    .then((data: any) => {
      const personNodes = formatPersonData(data.list as any[]);
      const orgNodes = formatOrgData(children);
      return [...personNodes, ...orgNodes];
    });
};
</script>
<style scoped lang="less"></style>
