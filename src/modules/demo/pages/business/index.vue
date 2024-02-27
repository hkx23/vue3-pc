<template>
  <cmp-card title="业务组件示例">
    <p style="margin-bottom: 16px">
      <t-radio-group v-model="isMultiple" variant="default-filled">
        <t-radio-button :value="false">单选</t-radio-button>
        <t-radio-button :value="true">多选</t-radio-button>
      </t-radio-group>
    </p>

    <t-space direction="vertical" style="width: 380px">
      <BCmpPerson v-model:value="selectPersonValue" label="人员" :multiple="isMultiple"></BCmpPerson>
      <BCmpUser v-model:value="selectUserValue" label="用户" :multiple="isMultiple"></BCmpUser>
      <BCmpSupplier v-model:value="selectSupplierValue" label="供应商" :multiple="isMultiple"></BCmpSupplier>
      <BCmpCustomer v-model:value="selectCustomerValue" label="客户" :multiple="isMultiple"></BCmpCustomer>
      <BCmpMitem v-model:value="selectMitemValue" label="物料" :multiple="isMultiple"></BCmpMitem>
      <BCmpMitemCategory
        v-model:value="selectMitemCategoryValue"
        label="物料类别"
        :multiple="isMultiple"
      ></BCmpMitemCategory>
    </t-space>
  </cmp-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isMultiple = ref(true);

const selectPersonValue = ref();
const selectUserValue = ref();
const selectSupplierValue = ref();
const selectCustomerValue = ref();
const selectMitemValue = ref();
const selectMitemCategoryValue = ref();
</script>
<style lang="less" scoped></style>
