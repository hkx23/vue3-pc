<template>
  <t-form ref="formRef" :rules="FORM_RULES" :show-cancel="true" :show-error-message="false">
    <t-form-item :label="t('productRule.packRuleCode')" name="packRuleCode">
      <t-input v-model="formData.packRuleCode" />
    </t-form-item>
    <t-form-item :label="t('productRule.packRuleName')" name="packRuleCode">
      <t-input v-model="formData.packRuleName" clearable />
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'FormPackRuleDtl',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api as apiControl, ProductPackRule } from '@/api/control';

import { useLang } from './lang';

const { t } = useLang();

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  packRuleCode: [{ required: true, message: t('common.placeholder.input', [t('productRule.packRuleCode')]) }],
  packRuleName: [{ required: true, message: t('common.placeholder.input', [t('productRule.packRuleName')]) }],
};

interface PackRuleForm extends ProductPackRule {
  parentLevelName: string;
}

const formData: PackRuleForm = reactive({
  parentLevelId: null,
  parentLevelName: '',
  levelCode: '',
  levelName: '',
  divisionFlag: 0,
  levelSeq: 0,
});
// onst packRuleOptions = ref([] as { value: string; label: string }[]);

onMounted(() => {
  fetchPackRuleDic();
});

const fetchPackRuleDic = async () => {
  // const list = await getPackRuleDic();
  // packRuleOptions.value = list;
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
      }
      apiControl.productPackRule.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};

const reset = (data: any) => {
  formRef.value.reset({ type: 'empty' });
};

defineExpose({
  form: formRef,
  submit,
  reset,
});
</script>
<style lang="less" scoped></style>
`
