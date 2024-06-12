<template>
  <table>
    <thead>
      <tr align="center">
        <td></td>
        <td>{{ t('console.setValue') }}</td>
        <td>{{ t('console.maxValue') }}</td>
        <td>{{ t('console.minValue') }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(card, index) in list" :key="index" align="center">
        <td>{{ card.title }}</td>
        <td><t-input v-model="card.value" placeholder="" /></td>
        <td><t-input disabled :value="card.max" placeholder="" /></td>
        <td><t-input disabled :value="card.min" placeholder="" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const props = defineProps<{
  list: {
    title: string;
    max: number;
    min: number;
    value: number;
  }[];
}>();
const { list } = toRefs(props);
</script>

<style lang="less" scoped>
table {
  width: 100%;

  td {
    padding: 0 10px;
  }
}

:deep(.t-input__wrap) {
  width: 50px;
}
</style>
