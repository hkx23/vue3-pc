<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    :label-width="135"
  >
    <t-form-item :label="t('org.parentOrgName')" name="parentLevelId">
      {{ formData.parentOrgName }}
    </t-form-item>
    <t-form-item :label="t('org.levelName')" name="levelCode">
      <t-select v-model="formData.levelCode" clearable>
        <t-option v-for="(item, index) in orgLevelOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item :label="t('org.orgCode')" name="orgCode">
      <t-input v-model="formData.orgCode" clearable />
    </t-form-item>
    <t-form-item :label="t('org.orgName')" name="orgName">
      <t-input v-model="formData.orgName" clearable />
    </t-form-item>
    <t-form-item :label="t('org.orgDesc')" name="orgDesc">
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
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api, Org, OrgLevelTreeVO, OrgTreeVO } from '@/api/main';

import { FormRef } from './constants';
import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  levelCode: [{ required: true, message: t('common.placeholder.input', [t('org.levelName')]) }],
  orgCode: [{ required: true, message: t('common.placeholder.input', [t('org.orgCode')]) }],
  orgName: [{ required: true, message: t('common.placeholder.input', [t('org.orgName')]) }],
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

const orgLevelOptions = computed(() => {
  if (!orgLevel.value || orgLevel.value.length === 0) return [];

  let lastList = orgLevel.value;
  if (!parentLevels.value || parentLevels.value.length === 0) {
    lastList = formData.parentOrgId === '0' ? orgLevel.value : orgLevel.value[0].children;
  } else {
    const getChildByCode = (code: string, list: OrgLevelTreeVO[]) => {
      for (const item of list) {
        if (item.levelCode === code) return item.children;
      }
      return null;
    };

    for (const code of parentLevels.value) {
      const list = getChildByCode(code, lastList);

      if (list === null) {
        break;
      }
      lastList = list;
    }
  }

  return lastList.map((t) => ({
    value: t.levelCode,
    label: t.levelName,
  }));
});
let orgLevel = ref<OrgLevelTreeVO[]>([]);

onMounted(() => {
  fetchOrgLevelDic();
});

const fetchOrgLevelDic = async () => {
  orgLevel.value = await api.orgLevel.tree();
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
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      api.org.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};

let isFormEditing = false;
const parentLevels = ref<string[]>([]);
const reset = (isEdit: boolean, data?: OrgTreeVO, parentOrgName?: string, parentOrgLevels?: string[]) => {
  formRef.value.reset({ type: 'empty' });
  formData.oid = '0';
  formData.isActive = 0;
  isFormEditing = isEdit;
  parentLevels.value = parentOrgLevels || [];
  if (data) {
    if (isEdit) {
      Object.assign(formData, { parentOrgName: parentOrgName || data.orgName }, data);
    } else {
      Object.assign(formData, {
        id: '',
        parentOrgId: data.id || '0',
        parentOrgName: parentOrgName || data.orgName || 'ROOT',
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
