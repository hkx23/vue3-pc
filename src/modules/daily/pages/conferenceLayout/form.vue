<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="formHeader"
    placement="top"
    top="56px"
    width="60%"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <t-form
      ref="formRef"
      :disabled="formData.opType === 'view'"
      :rules="FORM_RULES"
      :data="formData"
      :show-cancel="true"
      :show-error-message="true"
    >
      <t-row :gutter="[32, 16]">
        <t-col :span="6">
          <t-form-item :label="t('conferenceLayout.布局编码')" name="layoutCode">
            <t-input v-model="formData.layoutCode" :disabled="formData.opType === 'edit'" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceLayout.布局名称')" name="layoutName">
            <t-input v-model="formData.layoutName" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceLayout.布局生效')" name="isState">
            <t-switch v-model="formData.isState" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button v-if="formData.opType !== 'view'" theme="primary" @click="confirm">{{
        t('common.button.save')
      }}</t-button>
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'ConferenceLayout',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, reactive, Ref, ref } from 'vue';

import { api, ConferenceLayoutVO } from '@/api/daily';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);

interface FormInspectInfo extends ConferenceLayoutVO {
  opType: string;
  isState: boolean;
}

const formData: FormInspectInfo = reactive({
  opType: '',
  isState: true,
});

const FORM_RULES: ComputedRef<FormRules> = computed(() => {
  return {
    layoutCode: [{ required: true, message: t('common.placeholder.input', [t('conferenceLayout.布局编码')]) }],
    layoutName: [{ required: true, message: t('common.placeholder.input', [t('conferenceLayout.布局生效')]) }],
    layoutType: [{ required: true, message: t('common.placeholder.input', [t('conferenceLayout.布局类型')]) }],
  };
});
const Emit = defineEmits(['parent-refresh-event']);
// onMounted(() => {});

const confirm = () => {
  // formRef.value.submit();
  return new Promise((resolve, reject) => {
    formRef.value.validate().then(async (result) => {
      if (result !== true) {
        reject();
        return;
      }
      formData.state = formData.isState === true ? 1 : 0;
      if (formData.opType === 'add') {
        await api.conferenceLayout.add({ conferenceLayoutVO: formData }).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        await api.conferenceLayout.edit({ conferenceLayoutVO: formData }).then(() => {
          MessagePlugin.success(t('common.message.editSuccess'));
          resolve(formData);
        });
      }
      formVisible.value = false;
      Emit('parent-refresh-event', true);
    });
  });
};

const reset = () => {
  console.log('reset');
  // 清除所有对象的值
  Object.keys(formData).forEach((key) => {
    if (_.isArray(formData[key])) {
      formData[key] = [];
    } else if (_.isNumber(formData[key])) {
      formData[key] = 0;
    } else if (_.isBoolean(formData[key])) {
      formData[key] = true;
    } else {
      formData[key] = '';
    }
  });
};
const formVisible = ref(false);
// 初始化新增信息
const initFormAdd = () => {
  reset();
  formHeader.value = t('common.button.add');
  formData.opType = 'add';
  formVisible.value = true;
};
const formHeader = ref('');
// 初始化编辑信息
const initFormEdit = (row: FormInspectInfo) => {
  reset();
  formHeader.value = t('common.button.edit');
  Object.assign(formData, row);
  formData.opType = 'edit';
  formData.isState = formData.state === 1;
  formVisible.value = true;
};

// 初始化查看信息
const initFormView = (row: FormInspectInfo) => {
  reset();
  formHeader.value = t('common.button.view');
  Object.assign(formData, row);
  formData.opType = 'view';
  formData.isState = formData.state === 1;
  formVisible.value = true;
};

defineExpose({
  form: formRef,
  initFormAdd,
  initFormEdit,
  initFormView,
});
</script>
<style lang="less" scoped></style>
`
