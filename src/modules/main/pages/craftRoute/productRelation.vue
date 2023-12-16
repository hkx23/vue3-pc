<template>
  <t-dialog v-model:visible="visible" :header="t('craftRoute.productRelation')">
    <t-form ref="formRef" :data="formData" :rules="routingRules" label-width="100px">
      <t-form-item :label="t('craftRoute.craftRoute')" name="routingName">
        <t-input v-model="routingName" disabled></t-input>
      </t-form-item>
      <t-form-item :label="t('craftRoute.productCategory')" name="mitemCategoryId">
        <bcmp-select-business
          v-model="formData.mitemCategoryId"
          type="mitemCategory"
          :show-title="false"
          :placeholder="t('common.placeholder.select', [t('craftRoute.productCategory')])"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item :label="t('craftRoute.product')" name="mitemId">
        <bcmp-select-business
          v-model="formData.mitemId"
          type="mitem"
          :parent-value="formData.mitemCategoryId"
          :show-title="false"
          :placeholder="t('common.placeholder.select', [t('craftRoute.product')])"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item :label="t('craftRoute.workcenter')" name="workcenterId">
        <bcmp-select-business
          v-model="formData.workcenterId"
          type="workcenter"
          :show-title="false"
          :placeholder="t('common.placeholder.select', [t('craftRoute.workcenter')])"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item :label="t('craftRoute.isDefault')" name="isDefault">
        <t-switch v-model="formData.isDefault"></t-switch>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button :loading="loading" theme="default" @click="saveContinue">保存并继续</t-button>
      <t-button :loading="loading" @click="save">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { Data, FormRules } from 'tdesign-vue-next';
import { computed, reactive, ref, toRefs } from 'vue';

import { api } from '@/api/main';
import BcmpSelectBusiness from '@/components/bcmp-select-business/index.vue';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const props = defineProps<{
  modelValue: boolean;
  routingCode: string;
  routingName: string;
}>();
const { routingName } = toRefs(props);
const emit = defineEmits(['update:modelValue', 'submit']);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
const loading = ref(false);
const formRef = ref();
const formData = reactive({
  mitemCategoryId: null,
  mitemId: null,
  workcenterId: null,
  isDefault: false,
});
const routingRules: FormRules<Data> = {
  mitemCategoryId: [
    { validator: () => validateMitemOrCategory(), message: t('craftRoute.mitemOrCategoryMustSelectOne') },
  ],
  mitemId: [{ validator: () => validateMitemOrCategory(), message: t('craftRoute.mitemOrCategoryMustSelectOne') }],
};
const validateMitemOrCategory = () => {
  if (isEmpty(formData.mitemId) && isEmpty(formData.mitemCategoryId)) {
    return false;
  }
  return true;
};
const add = async () => {
  loading.value = true;
  try {
    const result = await formRef.value.validate();
    if (result === true) {
      await api.routingMap.add({
        routingCode: props.routingCode,
        mitemCategoryId: isEmpty(formData.mitemCategoryId) ? '0' : formData.mitemCategoryId,
        mitemId: isEmpty(formData.mitemId) ? '0' : formData.mitemId,
        workcenterId: isEmpty(formData.workcenterId) ? '0' : formData.workcenterId,
        isDefault: formData.isDefault ? 1 : 0,
      });
    } else {
      throw new Error();
    }
  } finally {
    loading.value = false;
  }
};

const save = () => {
  add()
    .then(() => {
      visible.value = false;
      emit('submit');
    })
    .catch((e) => {
      console.error(e);
    });
};
const saveContinue = () => {
  add()
    .then(() => {
      formData.mitemCategoryId = null;
      formData.mitemId = null;
      formData.workcenterId = null;
      formData.isDefault = false;
      emit('submit');
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>

<style lang="less" scoped>
:deep(.t-form__controls-content) {
  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 100%;
  }
}
</style>
