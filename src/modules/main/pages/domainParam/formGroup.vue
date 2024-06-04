<template>
  <t-form
    ref="formGroupRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    :label-width="135"
  >
    <t-form-item :label="t('domainParam.paramGroupCode')" name="paramGroupCode">
      <t-input v-model="formData.paramGroupCode" clearable :disabled="isFormEditing" />
    </t-form-item>

    <t-form-item :label="t('domainParam.paramGroupName')" name="paramGroupName">
      <t-input v-model="formData.paramGroupName" clearable />
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'DomainParamEdit',
};
</script>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { reactive, ref } from 'vue';

import { api, DomainParamGroup } from '@/api/main';

// import { api, DomainParamGroup } from '@/api/main';
import { FormGroupRef } from './constants';
import { useLang } from './lang';

const { t } = useLang();

const formGroupRef = ref(null);
const formData: DomainParamGroup = reactive({
  paramGroupCode: '',
  paramGroupName: '',
  parentId: '0',
});

const FORM_RULES = {
  paramGroupCode: [{ required: true, message: t('common.placeholder.input', [t('domainParam.paramGroupCode')]) }],
  paramGroupName: [{ required: true, message: t('common.placeholder.input', [t('domainParam.paramGroupName')]) }],
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formGroupRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      if (isFormEditing) {
        api.domainParamGroup.updateItemByCode(formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      api.domainParamGroup.addItem(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};
let isFormEditing = false;
const reset = (isEdit: boolean, data?: DomainParamGroup) => {
  formGroupRef.value.reset({ type: 'empty' });
  formData.id = '';
  // 将id小写后比较
  isFormEditing = isEdit;
  if (data) {
    if (isEdit) {
      Object.assign(formData, data);
    } else {
      Object.assign(formData, { parentId: data.id });
    }
  }
};

defineExpose({
  form: formGroupRef,
  submit,
  reset,
} as unknown as FormGroupRef);
</script>
<style lang="less" scoped></style>
`
