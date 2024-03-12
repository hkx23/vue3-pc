<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    label-width="120px"
    :show-cancel="true"
    :show-error-message="false"
  >
    <t-form-item :label="t('inspectGroup.groupCode')" name="inspectGroupCode">
      <t-input v-model="formData.inspectGroupCode" :disabled="!isAdd" />
    </t-form-item>
    <t-form-item :label="t('inspectGroup.groupName')" name="inspectGroupName">
      <t-input v-model="formData.inspectGroupName" clearable />
    </t-form-item>
    <t-form-item :label="t('business.main.desc')" name="desc">
      <t-textarea
        v-model="formData.inspectGroupDesc"
        :placeholder="t('inspectGroup.placeholderDesc')"
        name="description"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
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
import { Ref, ref } from 'vue';

import { api } from '@/api/quality';

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
  inspectGroupCode: [{ required: true, message: t('common.placeholder.input', [t('inspectGroup.groupCode')]) }],
  inspectGroupName: [{ required: true, message: t('common.placeholder.input', [t('inspectGroup.groupName')]) }],
};

const formData = ref({
  id: '',
  inspectGroupCode: '',
  inspectGroupName: '',
  inspectGroupDesc: '',
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
        api.inspectGroup.add(formData.value).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        api.inspectGroup.change(formData.value).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
      }
    });
  });
};

const reset = () => {
  formData.value = {
    id: '',
    inspectGroupCode: '',
    inspectGroupName: '',
    inspectGroupDesc: '',
  };
};

const setRow = (row: any) => {
  console.log(formData.value);
  formData.value.id = row.id;
  formData.value.inspectGroupCode = row.inspectGroupCode;
  formData.value.inspectGroupName = row.inspectGroupName;
  formData.value.inspectGroupDesc = row.inspectGroupDesc;
};

defineExpose({
  form: formRef,
  submit,
  reset,
  setRow,
  formData,
});
</script>
<style lang="less" scoped></style>
`
