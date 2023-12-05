<template>
  <t-form ref="formRef" :data="formData" :show-cancel="true" :show-error-message="false" :label-width="135">
    <t-form-item :label="t('business.main.mitemCode')" name="mitemId">
      <tm-select-business
        v-model="formData.mitemId"
        :is-multiple="false"
        :show-title="false"
        type="mitem"
      ></tm-select-business>
    </t-form-item>
    <t-form-item :label="t('business.main.mitemCategoryCode')" name="mitemCategoryId">
      <tm-select-business
        v-model="formData.mitemCategoryId"
        :show-title="false"
        type="mitemCategory"
      ></tm-select-business>
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'TemplateMapForm',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api, PrintTmplMapDTO } from '@/api/main';

import { TemplateMapFormRef } from './constants';
import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);

const formData = reactive<PrintTmplMapDTO>({
  printTmplId: '',
  mitemId: '',
  mitemCode: '',
  mitemName: '',
  mitemCategoryId: '',
  mitemCategoryCode: '',
  mitemCategoryName: '',
});

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then(async (result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }

      if (isFormEditing) {
        api.printTmplMap.update(formData.id, formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      api.printTmplMap.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};

let isFormEditing = false;
const reset = (isEdit: boolean, data?: PrintTmplMapDTO) => {
  formRef.value.reset({ type: 'empty' });
  isFormEditing = isEdit;
  if (data) {
    if (isEdit) {
      Object.assign(formData, data);
    } else {
      Object.assign(formData, {
        id: '',
        printTmplId: data.printTmplId,
      });
    }
  }
};

defineExpose({
  form: formRef,
  submit,
  reset,
} as TemplateMapFormRef);
</script>
<style lang="less" scoped></style>
`
