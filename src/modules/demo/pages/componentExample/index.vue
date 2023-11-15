<template>
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-input v-model="mitemValue" />
    </div>
    <div class="search-input">
      <t-select-business v-model="mitemValue" type="mitem"></t-select-business>
    </div>
  </t-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import TSelectBusiness from '../../../../components/select-business/index.vue';

const mitemValue = ref('');

onMounted(() => {
  mitemValue.value = 'ABC123dddd1';
});
</script>

<style scoped></style>
