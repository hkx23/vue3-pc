<template>
  <t-form
    ref="formRef"
    layout="inline"
    label-width="125px"
    label-align="right"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    :rules="rules"
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
          <t-form-item label="货区编码" required-mark>
            <t-input
              v-model="formData.districtCode"
              placeholder="手动输入...."
              :disabled="formData.operateTpye !== 'add'"
            />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货区名称" required-mark>
            <t-input v-model="formData.districtName" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货区描述" required-mark>
            <t-textarea v-model="formData.districtDesc" placeholder="手动输入...." />
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
// import { isEmpty } from 'lodash';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, ref } from 'vue';

import { api, District } from '@/api/warehouse';

interface DistrictForm extends District {
  operateTpye: string;
  warehouseName: string;
  warehouseDesc: string;
  warehouseCode: string;
}

const formRef = ref(null);
const formData = ref<DistrictForm>({
  id: '',
  operateTpye: 'add',
  districtCode: '',
  districtName: '',
  districtDesc: '',
  warehouseName: '',
  warehouseDesc: '',
  state: 1,
  warehouseId: '',
  warehouseCode: '',
});

const rules: ComputedRef<FormRules> = computed(() => {
  return {
    warehouseId: [{ required: true, message: '请选择仓库', trigger: 'change' }],
    districtCode: [{ required: true, message: '请输入货区编码', trigger: 'blur' }],
    districtName: [{ required: true, message: '请输入货区名称', trigger: 'blur' }],
    warehouseName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
    districtDesc: [{ required: true, message: '请输入货区描述', trigger: 'blur' }],
    state: [{ required: true, message: '请选择启用状态', trigger: 'change' }],
  };
});

//* 新增清除数据
const init = () => {
  formData.value.operateTpye = 'add';
  formData.value.id = '';
  formData.value.warehouseCode = '';
  formData.value.warehouseName = '';
  formData.value.warehouseDesc = '';
  formData.value.districtCode = '';
  formData.value.districtName = '';
  formData.value.districtDesc = '';
  formData.value.warehouseId = '';
  formData.value.state = 1;
  formData.value.timeCreate = '';
  formData.value.timeModified = '';
};

//* 关联仓库名称
const onMaterialTabData = async (event) => {
  const { warehouseName, id } = event;
  formData.value.warehouseName = warehouseName;
  formData.value.warehouseId = id;
};

const submit = async () => {
  formData.value.state = formData.value.state ? 1 : 0; //* 处理启用(必须)
  try {
    if (formData.value.operateTpye === 'add') {
      await api.district.addDistrict(formData.value);
      MessagePlugin.success('新增成功');
    } else {
      await api.district.modifyDistrict(formData.value);
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
