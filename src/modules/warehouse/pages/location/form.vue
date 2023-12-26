<template>
  <t-form
    ref="formRef"
    layout="inline"
    label-width="125px"
    label-align="right"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    @submit="submit"
  >
    <t-space direction="vertical">
      <t-row :gutter="[32, 16]">
        <t-col :span="6">
          <t-form-item label="选择仓库" required-mark>
            <bcmp-select-business
              v-model="formData.warehouseId"
              :is-multiple="false"
              type="warehouse"
              label-field="warehouseName"
              value-field="warehouseCode"
              :disabled="formData.operateTpye !== 'add'"
              @selection-change="onMaterialTabData"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="仓库名称" required-mark>
            <t-input v-model="formData.warehouseName" disabled placeholder="请输入仓库名称" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="选择货区" required-mark>
            <bcmp-select-business
              v-model="formData.districtId"
              :is-multiple="false"
              type="district"
              label-field="districtName"
              value-field="districtCode"
              :disabled="formData.operateTpye !== 'add'"
              @selection-change="onMaterialTabDatas"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货区名称" required-mark>
            <t-input v-model="formData.districtName" placeholder="手动输入...." disabled />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货位编码" required-mark>
            <t-input
              v-model="formData.locationCode"
              placeholder="手动输入...."
              :disabled="formData.operateTpye !== 'add'"
            />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货位名称" required-mark>
            <t-input v-model="formData.locationName" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货位描述" required-mark>
            <t-textarea v-model="formData.locationDesc" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="启用">
            <t-switch v-model="formData.state" :custom-value="[1, 0]" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-space>
  </t-form>
</template>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api, District } from '@/api/warehouse';

interface LocationForm extends District {
  operateTpye: string;
  warehouseName: string;
  warehouseDesc: string;
  warehouseCode: string;
  locationCode: string;
  locationName: string;
  districtId: string;
  locationDesc: string;
}

const formRef = ref(null);
const formData = ref<LocationForm>({
  id: '',
  operateTpye: 'add',
  districtCode: '',
  districtId: '',
  districtName: '',
  districtDesc: '',
  warehouseName: '',
  warehouseDesc: '',
  warehouseId: '',
  warehouseCode: '',
  locationCode: '',
  locationName: '',
  state: 1,
  locationDesc: '',
});

//* 新增清除数据
const init = () => {
  formData.value.operateTpye = 'add';
  formData.value.id = '';
  formData.value.warehouseCode = '';
  formData.value.warehouseName = '';
  formData.value.warehouseDesc = '';
  formData.value.districtName = '';
  formData.value.districtDesc = '';
  formData.value.warehouseId = '';
  formData.value.districtId = '';
  formData.value.districtCode = '';
  formData.value.state = 1;
  formData.value.locationCode = '';
  formData.value.locationName = '';
  formData.value.locationDesc = '';
  formData.value.timeCreate = ''; //* 清除创建时间(必须)
  formData.value.timeModified = ''; //* 清除时间模式化(必须)
};

//* 关联仓库名称
const onMaterialTabData = async (event) => {
  const { warehouseName, id } = event;
  formData.value.warehouseName = warehouseName;
  formData.value.warehouseId = id;
};
const onMaterialTabDatas = async (event) => {
  const { districtName, id } = event;
  formData.value.districtName = districtName;
  formData.value.districtId = id;
};

const submit = async () => {
  formData.value.state = formData.value.state ? 1 : 0; //* 处理启用(必须)
  console.log('🚀 ~ file: form.vue:145 ~ submit ~ formData.value:', formData.value);
  try {
    if (formData.value.operateTpye === 'add') {
      await api.location.addLocation(formData.value);
      MessagePlugin.success('新增成功');
    } else {
      await api.location.modifyLocation(formData.value);
      MessagePlugin.success('编辑成功');
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

//* 暴露 init 方法
defineExpose({
  init,
  submit,
  formRef,
  formData,
});
</script>
