<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    :label-width="95"
  >
    <t-form-item :label="t('user.account')" name="userName">
      <t-input v-model="formData.userName" clearable :disabled="isFormEditing" />
    </t-form-item>
    <t-form-item :label="t('user.displayName')" name="displayName">
      <t-input v-model="formData.displayName" clearable />
    </t-form-item>
    <t-form-item :label="t('user.eId')" name="eid">
      <bcmp-select-business v-model="formData.eid" type="enterprise" :show-title="false"></bcmp-select-business>
    </t-form-item>
    <t-form-item :label="t('user.relatePerson')" name="personId">
      <bcmp-select-business v-model="formData.personId" type="person" :show-title="false"></bcmp-select-business>
    </t-form-item>
    <t-form-item v-if="!isFormEditing" :label="t('user.setPassword')" name="password">
      <t-input v-model="formData.password" clearable />
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'UserForm',
};
</script>
<script setup lang="ts">
import { Data, FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api, User } from '@/api/main';

// import { useUserStore } from '@/store';
import { FormRef } from './constants';
import { useLang } from './lang';

const { t } = useLang();
// const user = useUserStore();
const formData: User = reactive({
  userName: '',
  displayName: '',
  eid: '',
  password: '',
  personId: '',
  oid: '',
});
// 校验代码是否存在一样，如果一样校验失败
// 自定义校验函数，调用自定义 API 并返回校验结果
const checkSameUserName = async (val) => {
  try {
    const responseData = await api.user.getByUsername({ id: formData.id, userName: formData.userName });
    // 根据实际需求在这里进行校验，并返回 true 或 false
    if (Number(responseData) > 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false; // 如果发生错误，则返回失败
  }
};

const validatePassword: (val: string) => Promise<boolean> = (val) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$;%^&*()_+{}|:"<>?]).{8,18}$/;
      resolve(reg.test(val));
      clearTimeout(timer);
    });
  });

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES: FormRules<Data> = {
  userName: [
    { required: true, message: t('common.placeholder.input', [t('user.account')]) },
    { validator: checkSameUserName, message: t('user.checkUserName') },
  ],
  displayName: [{ required: true, message: t('common.placeholder.input', [t('user.displayName')]) }],
  eid: [{ required: true, message: t('common.placeholder.select', [t('user.eId')]) }],
  password: [
    { required: true, message: t('common.placeholder.input', [t('user.password')]) },
    {
      validator: validatePassword,
      message: '密码需要8-18位字符,且带有字母、数字、特殊字符结合',
    },
  ],
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      if (isFormEditing.value) {
        api.user.edit(formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      api.user.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};
const isFormEditing = ref(false);
const reset = (isEdit: boolean, data?: User) => {
  // isAdmin = false;
  formRef.value.reset({ type: 'empty' });
  formData.id = '';
  // formData.oid = '';
  formData.eid = '';
  formData.password = '';
  formData.personId = '';
  // 将id小写后比较

  // 新增时，默认企业ID
  if (!isEdit) {
    formData.eid = fw.getEnterpriseId();
    // formData.oid = fw.getOrgId();
  }

  isFormEditing.value = isEdit;
  if (data) {
    if (isEdit) {
      Object.assign(formData, data);
    }
  }
};

defineExpose({
  form: formRef,
  submit,
  reset,
} as FormRef);
</script>
<style lang="less" scoped></style>
`
