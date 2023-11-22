<template>
  <t-form ref="formRef" :rules="FORM_RULES" :data="formData" :show-cancel="true" :show-error-message="false">
    <t-form-item label="层级" name="parentLevelId">
      {{ formData.parentOrgName }}
    </t-form-item>
    <t-form-item label="组织类型" name="levelCode">
      <t-select v-model="formData.levelCode" clearable>
        <t-option v-for="(item, index) in orgLevelOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item label="组织编码" name="orgCode">
      <t-input v-model="formData.orgCode" clearable />
    </t-form-item>
    <t-form-item label="组织名称" name="orgName">
      <t-input v-model="formData.orgName" clearable />
    </t-form-item>
    <t-form-item label="组织备注" name="orgDesc">
      <t-textarea v-model="formData.orgDesc" clearable />
    </t-form-item>
    <t-divider>扩展属性</t-divider>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'OrgForm',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api, Org, OrgTreeVO } from '@/api/main';

import { getOrgLevelDic } from '../../api/orgLevel';
import { FormRef } from './constants';

const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  levelCode: [{ required: true, message: '组织类型必选' }],
  orgCode: [{ required: true, message: '组织编码必选' }],
  orgName: [{ required: true, message: '组织名称必选' }],
};

interface OrgForm extends Org {
  parentOrgName: string;
}

const formData: OrgForm = reactive({
  parentOrgId: '',
  parentOrgName: '',
  levelCode: '',
  orgCode: '',
  orgName: '',
  orgDesc: '',
});
const orgLevelOptions = ref([] as { value: string; label: string }[]);

onMounted(() => {
  fetchOrgLevelDic();
});

const fetchOrgLevelDic = async () => {
  const list = await getOrgLevelDic();
  orgLevelOptions.value = list;
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
        api.org.update(formData).then(() => {
          MessagePlugin.success('修改成功');
          resolve(formData);
        });
        return;
      }
      api.org.add(formData).then(() => {
        MessagePlugin.success('新增成功');
        resolve(formData);
      });
    });
  });
};

let isFormEditing = false;
const reset = (isEdit: boolean, data?: OrgTreeVO) => {
  formRef.value.reset({ type: 'empty' });
  formData.oid = '0';
  formData.isActive = 0;
  isFormEditing = isEdit;
  if (data) {
    if (isEdit) {
      Object.assign(formData, { parentOrgName: data.orgName }, data);
    } else {
      Object.assign(formData, {
        parentOrgId: data.id,
        parentOrgName: data.orgName,
        levelCode: data.children?.length > 0 ? data.children[0]?.levelCode : '',
      });
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
