<template>
  <t-form
    ref="tformRef"
    layout="inline"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    @reset="onReset"
    @submit="submit"
  >
    <t-form-item label="供应商编码" required-mark>
      <t-input v-model="formData.supplierCode" :disabled="isEdit" />
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

<script lang="ts" setup>
import { isEmpty } from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { nextTick, ref, watch } from 'vue';

import { api } from '@/api/main';

interface FormData {
  id?: string;
  supplierCode?: string;
  supplierName?: string;
  contactPerson?: string;
  contactTel?: string;
  [key: string]: any;
}
const props = defineProps({
  editFormData: {
    type: Object,
    default: () => ({}),
  },
});
const isEdit = ref(false);

const formData = ref<FormData>({});
watch(
  () => props.editFormData,
  (newVal) => {
    formData.value = newVal;
    isEdit.value = !!newVal.id;
  },
  { deep: true },
);
const onReset = () => {
  nextTick(() => {
    formData.value = {
      id: '',
      supplierCode: '',
      supplierName: '',
      contactPerson: '',
      contactTel: '',
    };
  });
};
const submit = async () => {
  try {
    if (isEmpty(formData.value.supplierCode)) {
      MessagePlugin.error('请输入供应商编码');
      return false;
    }
    if (isEmpty(formData.value.supplierName)) {
      MessagePlugin.error('请输入供应商名称');
      return false;
    }
    if (!isEdit.value) {
      await api.supplier.add(formData.value);
      MessagePlugin.success('新增成功');
    } else {
      await api.supplier.edit(formData.value);
      MessagePlugin.success('编辑成功');
    }
    onReset();
  } catch (error) {
    return false;
  }
  return true;
};
defineExpose({
  submit,
});
</script>
