<template>
  <cmp-table
    v-model:pagination="pageUI"
    row-key="id"
    :active-row-type="'single'"
    :hover="true"
    :loading="loading"
    :fixed-height="true"
    max-height="300px"
    :table-column="tableColumns"
    :table-data="billTabData.list"
    :total="total"
    @refresh="getList"
  >
  </cmp-table>
</template>
<script lang="ts">
export default {
  name: 'FormTable',
};
</script>
<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api } from '@/api/control';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { pageUI } = usePage();
const { loading } = useLoading();
const { t } = useLang();

const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('workCalenar.workshopCode')}`, width: 100, colKey: 'workshopCode' },
  { title: `${t('workCalenar.workshopName')}`, width: 100, colKey: 'workshopName' },
  { title: `${t('workCalenar.wcCode')}`, width: 100, colKey: 'wcCode' },
  { title: `${t('workCalenar.wcName')}`, width: 100, colKey: 'wcName' },
  { title: `${t('workCalenar.missingDateRange')}`, width: 180, colKey: 'dateRange' },
];
const billTabData = ref({ list: [] });
const total = ref(0);

const getList = async () => {
  try {
    loading.value = true;
    const res = await api.workCalenar.getMissing({
      pageSize: pageUI.value.rows,
      pageNum: pageUI.value.page,
    });
    if (res) {
      billTabData.value.list = res.list;
      total.value = res.total;
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

defineExpose({
  getList,
});
</script>
<style lang="less" scoped></style>
`
