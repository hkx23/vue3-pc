<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    label-width="120px"
    :show-cancel="true"
    :show-error-message="false"
  >
    <t-form-item :label="t('productRule.packRuleCode')" name="packRuleCode">
      <t-input v-model="formData.packRuleCode" :disabled="!isAdd" />
    </t-form-item>
    <t-form-item :label="t('productRule.packRuleName')" name="packRuleName">
      <t-input v-model="formData.packRuleName" clearable />
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'FormPackRule',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api as apiControl, ProductPackRule } from '@/api/control';

import { useLang } from './lang';

// 子修改传值
const props = defineProps({
  // 组件展示类型
  row: {
    type: Object,
    default: null,
  },
  isAdd: {
    type: Boolean,
    default: true,
  },
});
const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  packRuleCode: [{ required: true, message: t('common.placeholder.input', [t('productRule.packRuleCode')]) }],
  packRuleName: [{ required: true, message: t('common.placeholder.input', [t('productRule.packRuleName')]) }],
};

type PackRuleForm = ProductPackRule;

const formData: PackRuleForm = reactive({
  packRuleCode: '',
  packRuleName: '',
});

// onMounted(() => {});

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      if (props.isAdd) {
        apiControl.productPackRule.add(formData).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        apiControl.productPackRule.update(formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
      }
    });
  });
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  for (const key in formData) {
    delete formData[key];
  }
};

const setRow = (row: any) => {
  reset();
  formData.id = row.id;
  formData.packRuleCode = row.packRuleCode;
  formData.packRuleName = row.packRuleName;
};

defineExpose({
  form: formRef,
  submit,
  reset,
  setRow,
});
</script>
<style lang="less" scoped></style>
`
