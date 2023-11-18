<template>
  <t-form ref="formRef" :rules="FORM_RULES" :data="formData" :show-cancel="true" :show-error-message="false">
    <t-form-item label="层级" name="parentLevelId">
      {{ formData.parentLevelId ? formData.parentLevelName : 'ROOT' }}
    </t-form-item>
    <t-form-item label="组织类型" name="levelCode">
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

import { ModelingApi } from '@/api/modeling';

import { OrgLevel } from '../../api/model/orgLevelModel';
import { getOrgLevelDic } from '../../api/orgLevel';
import { FormRef } from './constants';

const api = new ModelingApi();

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = { levelCode: [{ required: true, message: '组织层级名称必选' }] };

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
const orgLevelOptions = ref([] as { value: string; label: string }[]);

onMounted(() => {
  fetchOrgLevelDic();
});

const fetchOrgLevelDic = async () => {
  const list = await getOrgLevelDic();
  orgLevelOptions.value = list;
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
      api.org.add(formData).then(() => {
        MessagePlugin.success('新增成功');
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
