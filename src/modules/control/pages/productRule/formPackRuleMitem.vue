<template>
  <t-form ref="formRef" :data="formData" :show-cancel="true" :show-error-message="false">
    <t-form-item :label="t('productRule.packRuleName')" name="packRuleName">
      <t-input v-model="formData.packRuleName" :disabled="true" />
    </t-form-item>
    <t-form-item :label="t('productRule.packRelationType')" required-mark>
      <t-radio-group v-model="formData.packRelationType" :options="radioOptions" clearable />
    </t-form-item>
    <t-form-item
      v-if="formData.packRelationType == 'mitemCategory'"
      :label="t('productRule.mitemCategory')"
      name="mitemCategory"
    >
      <bcmp-select-business
        v-model="formData.mitemCategoryId"
        type="mitemCategory"
        :show-title="false"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item v-if="formData.packRelationType == 'mitem'" :label="t('productRule.mitem')" name="mitem">
      <bcmp-select-business v-model="formData.mitemId" type="mitem" :show-title="false"></bcmp-select-business>
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'FormPackRuleMitem',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api as apiControl, ProductPackRuleMapDTO } from '@/api/control';

import BcmpSelectBusiness from '../../../../components/bcmp-select-business/index.vue';
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
// const FORM_RULES = {
//   packRuleCode: [{ required: true, message: t('common.placeholder.input', [t('productRule.packRuleCode')]) }],
//   packRuleName: [{ required: true, message: t('common.placeholder.input', [t('productRule.packRuleName')]) }],
// };
const radioOptions = ref([
  { label: t('productRule.mitem'), value: 'mitem', defaultChecked: true },
  { label: t('productRule.mitemCategory'), value: 'mitemCategory' },
]);
interface PackRuleMapForm extends ProductPackRuleMapDTO {
  packRuleCode: string;
  packRuleName: string;
  packRuleId: string;
  packRelationType: string;
}

const formData: PackRuleMapForm = reactive({
  packRuleCode: '',
  packRuleName: '',
  packRuleId: '',
  packRelationType: 'mitem',
});

// onMounted(() => {});

const submit = async () => {
  return new Promise((resolve, reject) => {
    if (formData.packRelationType === 'mitem' && !formData.mitemId) {
      MessagePlugin.warning(t('productRule.checkPackMitemSave'));
      reject();
      return;
    }
    if (formData.packRelationType === 'mitemCategory' && !formData.mitemCategoryId) {
      MessagePlugin.warning(t('productRule.checkPackMitemCategorySave'));
      reject();
      return;
    }
    if (props.isAdd) {
      apiControl.productPackRuleMap.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    }
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
  formData.packRuleId = row.id;
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
