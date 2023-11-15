<template>
  <t-row justify="space-between">
    <!-- 物料 -->
    <div class="left-operation-container">
      <t-select-business v-model="mitemValue" type="mitem"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="mitemValue" label="物料值" />
    </div>
  </t-row>
  <!-- 物料分类 -->
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-select-business v-model="mitemCategoryValue" type="mitemCategory"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="mitemCategoryValue" label="物料分类值" />
    </div>
  </t-row>
  <!-- 供应商 -->
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-select-business v-model="supplierValue" type="supplier"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="supplierValue" label="供应商值" />
    </div>
  </t-row>
  <!-- 客户  -->
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-select-business v-model="customerValue" type="customer"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="customerValue" label="客户值" />
    </div>
  </t-row>
  <!-- 人员 -->
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-select-business v-model="personValue" type="person"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="personValue" label="人员值" />
    </div>
  </t-row>
  <!-- 岗位 -->
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-select-business v-model="postValue" type="post"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="postValue" label="岗位值" />
    </div>
  </t-row>
  <!-- 用户 -->
  <t-row justify="space-between">
    <div class="left-operation-container">
      <t-select-business v-model="userValue" type="user"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="userValue" label="用户值" />
    </div>
  </t-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import TSelectBusiness from '../../../../components/select-business/index.vue';

const mitemValue = ref('');
const mitemCategoryValue = ref('');
const personValue = ref('');
const customerValue = ref('');
const supplierValue = ref('');
const postValue = ref('');
const userValue = ref('');

onMounted(() => {
  mitemValue.value = 'ABC123dddd1';
  mitemCategoryValue.value = '';
  personValue.value = '';
  customerValue.value = '';
  supplierValue.value = '';
  postValue.value = '';
  userValue.value = '';
});
</script>

<style scoped></style>
