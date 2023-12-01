<template>
  <t-form ref="formRef" :data="formData" :rules="FORM_RULES">
    <t-form-item label="用户名" name="username">
      {{ formData.username }}
    </t-form-item>
    <t-form-item label="旧密码" name="oldPassword">
      <t-input v-model="formData.oldPassword"></t-input>
    </t-form-item>
    <t-form-item label="新密码" name="newPassword">
      <t-input v-model="formData.newPassword"></t-input>
    </t-form-item>
    <t-form-item label="重复新密码" name="newPassword">
      <t-input v-model="formData.newPassword"></t-input>
    </t-form-item>
  </t-form>
</template>
<script setup lang="ts">
import { FormInstanceFunctions, FormRule, MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { changePassword } from '@/api/portal';

const FORM_RULES: Record<string, FormRule[]> = {
  oldPassword: [{ required: true, message: '旧密码不能为空', type: 'error' }],
  newPassword: [{ required: true, message: '新密码不能为空', type: 'error' }],
  Password: [{ required: true, message: '重复密码不能为空', type: 'error' }],
};

const formRef = ref<FormInstanceFunctions>();
const formData = ref({
  username: '',
  oldPassword: '',
  newPassword: '',
  password: '',
});

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }

      changePassword({
        oldPassword: formData.value.oldPassword,
        newPassword: formData.value.newPassword,
      }).then(() => {
        MessagePlugin.success('保存成功');
        resolve(formData);
      });
    });
  });
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
};

defineExpose({
  form: formRef,
  submit,
  reset,
});
</script>
<style lang="less" scoped></style>
