<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    @submit="onAnomalyTypeSubmit"
  >
    <t-row :gutter="[32, 16]">
      <t-col :span="6">
        <t-form-item :label="t('notice.titleName')" name="titleName">
          <t-input v-model="formData.titleName" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('notice.noticeContent')" name="noticeContent">
          <t-input v-model="formData.noticeContent" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('notice.noticePurposeName')" name="noticePurpose">
          <bcmp-select-business
            v-model="formData.noticePurpose"
            label=""
            :show-title="false"
            :name="t('notice.noticePurposeName')"
            :placeholder="t('common.placeholder.select')"
            type="state"
            category="NOTICE_PURPOSE"
            :clearable="true"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('notice.noticeTypeName')" name="noticeType">
          <bcmp-select-business
            v-model="formData.noticeType"
            label=""
            :show-title="false"
            :name="t('notice.noticeTypeName')"
            :placeholder="t('common.placeholder.select')"
            type="state"
            category="SOP_NOTICE_TYPE"
            :clearable="true"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('notice.noticeEffectiveName')" name="noticeEffective">
          <t-date-picker v-model="formData.noticeEffective" allow-input clearable style="width: 400px" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('notice.dateInvalidName')" name="dateInvalid">
          <t-date-picker v-model="formData.dateInvalid" allow-input clearable style="width: 400px" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('notice.receiveOrg')" name="receiveId">
          <bcmp-select-business
            v-model="formData.receiveId"
            label=""
            type="plant"
            :clearable="true"
            :multiple="true"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'FormPackRule',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, Ref, ref } from 'vue';

import { api } from '@/api/main';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);

const FORM_RULES: ComputedRef<FormRules> = computed(() => {
  return {
    titleName: [{ required: true, message: t('common.placeholder.input', [t('notice.titleName')]) }],
    noticeContent: [{ required: true, message: t('common.placeholder.input', [t('notice.noticeContent')]) }],
    noticePurpose: [{ required: true, message: t('common.placeholder.input', [t('notice.noticePurposeName')]) }],
    noticeType: [{ required: true, message: t('common.placeholder.input', [t('notice.noticeTypeName')]) }],
    dateInvalid: [{ required: true, message: t('common.placeholder.input', [t('notice.noticeEffectiveName')]) }],
    noticeEffective: [{ required: true, message: t('common.placeholder.input', [t('notice.dateInvalidName')]) }],
    receiveId: [{ required: true, message: t('common.placeholder.input', [t('notice.receiveOrg')]) }],
  };
});

const formData = ref({
  id: '',
  opType: '',
  titleName: '',
  noticeContent: '',
  noticePurpose: '',
  noticeType: '',
  dateInvalid: '',
  noticeEffective: new Date().toISOString().substr(0, 10),
  receiveId: '',
  receiveIds: [],
});

// onMounted(() => {});

// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    await submit();
  }
};
const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }

      formData.value.receiveIds = formData.value.receiveId.split(',');
      api.notice.add(formData.value).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};
const confirm = () => {
  formRef.value.submit();
};

const reset = () => {
  formData.value = {
    id: '',
    titleName: '',
    opType: '',
    noticeContent: '',
    noticePurpose: '',
    noticeType: '',
    dateInvalid: '',
    noticeEffective: new Date().toISOString().substr(0, 10),
    receiveId: '',
    receiveIds: [],
  };
};

defineExpose({
  form: formRef,
  confirm,
  reset,
  formData,
});
</script>
<style lang="less" scoped></style>
`
