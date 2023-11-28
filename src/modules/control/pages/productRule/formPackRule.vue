<template>
  <t-form ref="formRef" :rules="FORM_RULES" :show-cancel="true" :show-error-message="false">
    <!-- <t-form-item :label="t('packRuleCode')" name="packRuleCode">
      <t-input v-model="formData.categoryName" />
    </t-form-item>
    <t-form-item :label="t('packRuleName')" name="packRuleCode">
      <t-select v-model="formData.levelCode" clearable @change="onChangeLevelCode">
        <t-option v-for="(item, index) in packRuleOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item> -->
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'FormPackRule',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, Ref, ref } from 'vue';

// import { api } from '@/api/control';
import { useLang } from './lang';

const { t } = useLang();

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  levelCode: [{ required: true, message: t('common.placeholder.input', [t('levelName')]) }],
};

// interface PackRuleForm extends ProductPackRule {
//   parentLevelName: string;
// }

// const formData: PackRuleForm = reactive({
//   parentLevelId: null,
//   parentLevelName: '',
//   levelCode: '',
//   levelName: '',
//   divisionFlag: 0,
//   levelSeq: 0,
// });
// onst packRuleOptions = ref([] as { value: string; label: string }[]);

onMounted(() => {
  fetchPackRuleDic();
});

const fetchPackRuleDic = async () => {
  // const list = await getPackRuleDic();
  // packRuleOptions.value = list;
};

// const onChangeLevelCode = (value: string) => {
//   // const item = packRuleOptions.value.find((item) => item.value === value);
//   // formData.levelCode = item.value;
//   // formData.levelName = item.label;
// };

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
      }
      // api.packRule.add(formData).then(() => {
      //   MessagePlugin.success(t('common.message.addSuccess'));
      //   resolve(formData);
      // });
    });
  });
};

const reset = (data: any) => {
  formRef.value.reset({ type: 'empty' });
  if (data) {
    // formData.parentLevelId = data?.id;
    // formData.parentLevelName = data?.levelName;
    // formData.levelSeq = (data?.levelSeq || 0) + 1;
  }
};

defineExpose({
  form: formRef,
  submit,
  reset,
});
</script>
<style lang="less" scoped></style>
`
