<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    :label-width="135"
  >
    <t-form-item :label="t('role.roleCode')" name="roleCode">
      <t-input v-model="formData.roleCode" clearable :disabled="isFormEditing" />
    </t-form-item>

    <t-form-item :label="t('role.roleName')" name="roleName">
      <t-input v-model="formData.roleName" clearable />
    </t-form-item>
    <t-form-item :label="t('role.eId')" name="eid">
      <tm-select-business
        v-model="formData.eid"
        type="enterprise"
        :disabled="!isAdmin"
        :show-title="false"
      ></tm-select-business>
    </t-form-item>
    <t-form-item :label="t('role.org')" name="oid">
      <tm-select-business
        v-model="formData.oid"
        type="plant"
        :parent-id="formData.eid"
        :disabled="!isAdmin"
        :show-title="false"
      ></tm-select-business>
    </t-form-item>
    <t-form-item :label="t('role.roleDesc')" name="roleDesc">
      <t-textarea v-model="formData.roleDesc" clearable />
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'RoleForm',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api, Role } from '@/api/main';
import { useUserStore } from '@/store';

import { FormRef } from './constants';
import { useLang } from './lang';

const { t } = useLang();
const user = useUserStore();
const formData: Role = reactive({
  roleCode: '',
  roleName: '',
  roleDesc: '',
  oid: '',
  eid: '',
});
// 校验代码是否存在一样，如果一样校验失败
// 自定义校验函数，调用自定义 API 并返回校验结果
const checkSameCode = async (val) => {
  try {
    const responseData = await api.role.getItemByCode({ id: formData.id, roleCode: formData.roleCode });
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

const checkSameName = async (val) => {
  try {
    const responseData = await api.role.getItemByName({ id: formData.id, roleName: formData.roleName });
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

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  roleCode: [
    { required: true, message: t('common.placeholder.input', [t('role.roleCode')]) },
    { validator: checkSameCode, message: t('role.checkCode') },
  ],
  roleName: [
    { required: true, message: t('common.placeholder.input', [t('role.roleName')]) },
    { validator: checkSameName, message: t('role.checkName') },
  ],
  eid: [{ required: true, message: t('common.placeholder.select', [t('role.eId')]) }],
  oid: [{ required: true, message: t('common.placeholder.select', [t('role.org')]) }],
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      if (isFormEditing) {
        api.role.edit(formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      api.role.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};
let isAdmin = false;
let isFormEditing = false;
const reset = (isEdit: boolean, data?: Role) => {
  isAdmin = false;
  formRef.value.reset({ type: 'empty' });
  formData.id = '';
  formData.oid = '';
  formData.eid = '';
  // 将id小写后比较

  if (user.userInfo.id.toLowerCase() === 'administrator') {
    isAdmin = true;
  } else if (!isEdit) {
    formData.eid = fw.getEnterpriseId();
    formData.oid = fw.getOrgId();
  }

  isFormEditing = isEdit;
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
