<template>
  <t-dialog
    v-model:visible="visible"
    :header="t('user.resetPassword')"
    width="40%"
    :confirm-on-enter="true"
    :on-confirm="onConfirmAnother"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-form
        ref="formRef"
        :rules="FORM_RULES"
        :data="formData"
        :show-cancel="true"
        :show-error-message="true"
        :label-width="95"
      >
        <t-form-item :label="t('user.resetPassword')" name="password">
          <t-input v-model="formData.password" clearable />
        </t-form-item>
        <div style="height: 5px"></div>
      </t-form>
    </t-space>
  </t-dialog>
  <!-- <t-dialog
      v-model:visible="formVisible"
      :header="t(formAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('user.user')])"
      :on-confirm="onConfirmForm"
    >
  </t-dialog> -->
</template>

<script setup lang="ts">
import { Data, FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref } from 'vue';

import { api, User } from '@/api/main';

import { useLang } from './lang';

const { t } = useLang();

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const formRef: Ref<FormInstanceFunctions> = ref(null);
const formData: User = reactive({
  id: '',
  userName: '',
  displayName: '',
  eid: '',
  password: '',
  personId: '',
  oid: '',
});
const validatePassword: (val: string) => Promise<boolean> = (val) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+{}|:"<>?]).{8,18}$/;
      resolve(reg.test(val));
      clearTimeout(timer);
    });
  });
const FORM_RULES: FormRules<Data> = {
  password: [
    { required: true, message: t('common.placeholder.input', [t('user.password')]) },
    {
      validator: validatePassword,
      message: t('user.passwordRequire'),
    },
  ],
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      formData.id = props.id;
      api.user
        .resetPassword(formData)
        .then(() => {
          MessagePlugin.success(t('user.resetPasswordSuccess'));
          resolve(formData);
        })
        .catch((err) => {
          MessagePlugin.error(err.message);
          reject();
        });
    });
  });
};

const onConfirmAnother = (context) => {
  console.log('点击了确认按钮', context);
  submit().then((data) => {
    console.log('提交成功', data);
    visible.value = false;
  });
  //
};
const emit = defineEmits(['update:modelValue', 'submit']);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    formData.password = '';
    formRef.value.reset();
    emit('update:modelValue', val);
  },
});
</script>

<style lang="less" scoped></style>
