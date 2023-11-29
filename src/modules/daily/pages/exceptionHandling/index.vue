<template>
  <div>
    <t-card>
      <tm-table :table-data="data" :table-column="column"> </tm-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import TmTable from '../../../../components/tm-table/index.vue';
import { useLang } from './lang';

const { t } = useLang();
const data = ref([]);
const column = ref([
  {
    colKey: 'OrganizationName',
    title: t('exceptionHandling.OrganizationName'),
  },
]);
</script>

<style lang="less" scoped></style>
