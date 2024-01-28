<template>
  <t-dialog
    v-model:visible="visible"
    :header="t('common.button.enable')"
    :confirm-btn="{ loading }"
    width="60%"
    @confirm="save"
  >
    <t-form ref="routingFormRef" :data="formData" :rules="routingRules" label-width="100px">
      <t-row>
        <t-col :span="6">
          <t-form-item :label="t('craftRoute.craftRouteCode')" name="routingCode">
            <t-input
              v-model="formData.routingCode"
              disabled
              :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteCode')])"
            ></t-input>
          </t-form-item>
          <t-form-item :label="t('craftRoute.craftRouteType')" name="routingType">
            <t-select
              v-model="formData.routingType"
              :placeholder="t('common.placeholder.select', [t('craftRoute.craftRouteType')])"
            >
              <t-option
                v-for="(value, key) in routingTypeOption"
                :key="key"
                :label="value.label"
                :value="value.value"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item :label="t('craftRoute.enableDate')" name="enableDate">
            <t-date-picker
              v-model="formData.enableDate"
              :placeholder="t('common.placeholder.select', [t('craftRoute.enableDate')])"
            />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('craftRoute.craftRouteName')" name="routingName">
            <t-input
              v-model="formData.routingName"
              :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteName')])"
            ></t-input>
          </t-form-item>
          <t-form-item :label="t('craftRoute.version')" name="routingVersion">
            <t-input-number
              v-model="formData.routingVersion"
              :min="1"
              :decimal-places="0"
              :placeholder="t('common.placeholder.input', [t('craftRoute.version')])"
              theme="column"
            ></t-input-number>
          </t-form-item>
          <t-form-item :label="t('craftRoute.invailDate')" name="invailDate">
            <t-date-picker
              v-model="formData.invailDate"
              :placeholder="t('common.placeholder.select', [t('craftRoute.invailDate')])"
            />
          </t-form-item>
        </t-col>
        <t-col :span="12" style="margin-top: var(--td-comp-margin-xxl)">
          <t-form-item :label="t('business.main.desc')" name="desc">
            <t-textarea
              v-model="formData.routingDesc"
              :placeholder="t('common.placeholder.input', [t('business.main.desc')])"
            ></t-textarea>
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { Data, FormRules } from 'tdesign-vue-next';
import { computed, ref, toRefs } from 'vue';

import { api, RoutingVO } from '@/api/main';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const props = defineProps<{
  modelValue: boolean;
  formData: RoutingVO;
  routingTypeOption: any;
}>();
const { formData, routingTypeOption } = toRefs(props);
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
const routingFormRef = ref();
const routingRules: FormRules<Data> = {
  routingCode: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  routingName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  routingType: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  routingVersion: [
    { required: true, message: t('common.validation.required'), type: 'error' },
    { min: 1, message: t('craftRoute.versionBelowOne'), type: 'error' },
  ],
  enableDate: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};
const save = () => {
  routingFormRef.value.validate().then((result: any) => {
    if (result === true) {
      loading.value = true;
      const postData = {
        routingCode: formData.value.routingCode,
        routingName: formData.value.routingName,
        routingDesc: formData.value.routingDesc,
        routingType: formData.value.routingType,
        routingVersion: formData.value.routingVersion,
        enableDate: formData.value.enableDate,
        invailDate: formData.value.invailDate,
        state: 1,
      };
      // 启用走更新逻辑
      api.routing
        .enable(formData.value.id, postData)
        .then(() => {
          loading.value = false;
          visible.value = false;
          emit('submit');
        })
        .catch(() => {
          loading.value = false;
        });
    }
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
