<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('supplierInUser.新增参与用户')"
    placement="top"
    top="56px"
    width="50%"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <t-form
      ref="formRef"
      :rules="FORM_RULES"
      :data="formData"
      label-width="120px"
      :show-cancel="true"
      :show-error-message="false"
    >
      <t-form-item :label="t('supplierInUser.参与用户')" name="userIds">
        <bcmp-select-business
          v-model="formData.userIds"
          :is-multiple="true"
          type="userPerson"
          :show-title="false"
        ></bcmp-select-business>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="primary" @click="confirm">{{ t('common.button.save') }}</t-button>
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormUser',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';

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
  userIds: [{ required: true, message: t('common.placeholder.select', [t('supplierInUser.参与用户')]) }],
};
const formVisible = ref(false);
const formData = reactive({
  supplierId: '',
  userIds: [],
});
const Emit = defineEmits(['parent-refresh-event']);
// 初始化新增信息
const initFormAdd = (id: string) => {
  reset();
  formData.supplierId = id;
  formVisible.value = true;
};

const confirm = () => {
  return new Promise((resolve, reject) => {
    if (!formData.userIds) {
      MessagePlugin.warning(t('common.placeholder.select', [t('supplierInUser.参与用户')]));
      reject();
      return;
    }
    if (props.isAdd) {
      formRef.value.validate().then((result) => {
        const supplierInUserUsers = [];
        formData.userIds.forEach((item) => {
          const supplierInUserUser = {} as any;
          supplierInUserUser.supplierId = formData.supplierId;
          supplierInUserUser.userId = item.value;
          supplierInUserUsers.push(supplierInUserUser);
        });
        apiMain.supplierInUser.addUser({ supplierInUserUsers, supplierId: formData.supplierId }).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          formVisible.value = false;
          Emit('parent-refresh-event', true);
          resolve(formData);
        });
      });
    }
  });
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
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

defineExpose({
  form: formRef,
  initFormAdd,
});
</script>
<style lang="less" scoped></style>
`
