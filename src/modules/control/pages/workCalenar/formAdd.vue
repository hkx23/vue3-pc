<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    label-width="120px"
    :show-cancel="true"
    :show-error-message="false"
  >
    <t-row :gutter="[32, 16]">
      <t-col :span="8">
        <t-form-item :label="t('workCalenar.selectCalenarRange')" name="calenarRange">
          <t-date-range-picker v-model="formData.calenarRange" style="width: 400px" allow-input clearable />
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item :label="t('workCalenar.selectWeekRange')" name="weekRange">
          <t-row>
            <t-checkbox-group
              v-model="formData.weekRangeInt"
              :options="weekRangeOp"
              style="width: 600px"
            ></t-checkbox-group>
          </t-row>
        </t-form-item>
      </t-col>
      <t-col :span="5">
        <t-form-item :label="t('business.main.workshop')" name="workshopId">
          <bcmp-select-business
            v-model="formData.workshopId"
            label=""
            type="workshop"
            :clearable="true"
            style="width: 250px"
            :multiple="true"
            @change="formData.workcenterId = ''"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.workcenter')" name="workcenterId">
          <bcmp-select-business
            v-model="formData.workcenterId"
            :parent-id="formData.workshopId"
            label=""
            type="workcenter"
            style="width: 250px"
            :clearable="true"
            :multiple="true"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item :label="t('workCalenar.attendanceMode')" name="attendanceMode">
          <bcmp-select-business
            v-model="formData.attendanceModeIdsStr"
            label=""
            type="attendanceModeTable"
            style="width: 582px"
            :clearable="true"
            :is-multiple="true"
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
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  calenarRange: [{ required: true, message: t('common.placeholder.input', [t('workCalenar.calenarRange')]) }],
  weekRange: [{ required: true, message: t('common.placeholder.input', [t('workCalenar.weekRange')]) }],
  workcenterId: [{ required: true, message: t('common.placeholder.input', [t('workCalenar.weekRange')]) }],
  attendanceMode: [{ required: true, message: t('common.placeholder.input', [t('workCalenar.weekRange')]) }],
};
const weekRangeOp = [
  {
    label: t('workCalenar.monday'),
    value: 1,
  },
  {
    label: t('workCalenar.tuesday'),
    value: 2,
  },
  {
    label: t('workCalenar.wednesday'),
    value: 3,
  },
  {
    label: t('workCalenar.thursday'),
    value: 4,
  },
  {
    label: t('workCalenar.friday'),
    value: 5,
  },
  {
    label: t('workCalenar.saturday'),
    value: 6,
  },
  {
    label: t('workCalenar.sunday'),
    value: 7,
  },
];
const formData = ref({
  id: '',
  workshopId: '',
  workcenterId: '',
  calenarRange: [],
  attendanceModeIdsStr: [],
  weekRangeInt: [1, 2, 3, 4, 5],
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
      api.workCalenar.addWorkCalenar(formData.value).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};
const getWorkshopId = async () => {
  const ids = await apiMain.org.getWorkShopIdByLoginUser();
  if (ids.length > 0) {
    formData.value.workshopId = ids.join(',');
    return true;
  }
  return false;
};
const reset = () => {
  formData.value = {
    id: '',
    workshopId: '',
    workcenterId: '',
    calenarRange: [],
    attendanceModeIdsStr: [],
    weekRangeInt: [1, 2, 3, 4, 5],
  };
};

defineExpose({
  form: formRef,
  submit,
  reset,
  formData,
  getWorkshopId,
});
</script>
<style lang="less" scoped></style>
`
