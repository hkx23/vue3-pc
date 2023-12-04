<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    :label-width="135"
  >
    <t-form-item :label="t('orgLevel.parentLevel')" name="parentLevelId">
      {{ formData.parentLevelId ? formData.parentLevelName : 'ROOT' }}
    </t-form-item>
    <t-form-item :label="t('orgLevel.levelName')" name="levelCode">
      <t-select v-model="formData.levelCode" clearable @change="onChangeLevelCode">
        <t-option v-for="(item, index) in orgLevelOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'OrgLevelForm',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api, OrgLevel } from '@/api/main';

import { FormRef } from './constants';
import { useLang } from './lang';

const { t } = useLang();

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  levelCode: [{ required: true, message: t('common.placeholder.input', [t('orgLevel.levelName')]) }],
};

interface OrgLevelForm extends OrgLevel {
  parentLevelName: string;
}

const formData: OrgLevelForm = reactive({
  parentLevelId: null,
  parentLevelName: '',
  levelCode: '',
  levelName: '',
  divisionFlag: 0,
  levelSeq: 0,
});
const orgLevelOptions = ref<{ value?: string; label?: string }[]>([]);

onMounted(() => {
  fetchOrgLevelDic();
});

const fetchOrgLevelDic = async () => {
  orgLevelOptions.value = await api.param.getListByGroupCode({ parmGroupCode: 'ORG_LEVEL_CODE' });
};

const onChangeLevelCode = (value: string) => {
  const item = orgLevelOptions.value.find((item) => item.value === value);
  formData.levelCode = item.value;
  formData.levelName = item.label;
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      api.orgLevel.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};

const reset = (data: OrgLevel) => {
  formRef.value.reset({ type: 'empty' });
  if (data) {
    formData.parentLevelId = data?.id;
    formData.parentLevelName = data?.levelName;
    formData.levelSeq = (data?.levelSeq || 0) + 1;
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
