<template>
  <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="供应商编码" required-mark>
      <t-input v-model="formData.supplierCode" disabled />
    </t-form-item>
    <t-form-item label="供应商名称" required-mark>
      <t-input v-model="formData.supplierName" />
    </t-form-item>
    <t-form-item label="供应商联系人">
      <t-input v-model="formData.contactPerson" />
    </t-form-item>
    <t-form-item label="供应商联系电话">
      <t-input v-model="formData.contactTel" />
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

// import { api } from '@/api/main';

export default {
  name: 'SupplierForm',
  setup() {
    const formData = ref({
      id: '',
      supplierCode: '',
      supplierName: '',
      contactPerson: '',
      contactTel: '',
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        // await api.supplier.edit(formData.value);
        MessagePlugin.success('编辑成功');
      } catch (e) {
        console.log(e);
      }
    };

    return {
      submit,
      formData,
    };
  },
};
</script>
