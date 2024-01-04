<template>
  <t-form
    ref="formRef"
    :data="formData"
    :show-cancel="true"
    label-width="110px"
    :show-error-message="false"
    :rules="rules"
    @submit="submit"
  >
    <t-row :gutter="[32, 16]">
      <t-col :span="6">
        <t-form-item v-if="formData.operateTpye === 'add'" label="选择仓库" name="warehouseId">
          <bcmp-select-business
            v-model="formData.warehouseId"
            :is-multiple="false"
            :show-title="false"
            type="warehouse"
            label-field="warehouseName"
            value-field="warehouseCode"
            @selection-change="onMaterialTabData"
          ></bcmp-select-business>
        </t-form-item>
        <t-form-item v-else label="选择仓库" required-mark>
          <t-input v-model="formData.warehouseId" disabled></t-input>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="仓库名称" required-mark>
          <t-input v-model="formData.warehouseName" disabled placeholder="请输入仓库名称" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="货区编码" name="districtCode">
          <t-input
            v-model="formData.districtCode"
            placeholder="手动输入...."
            :disabled="formData.operateTpye !== 'add'"
          />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="货区名称" name="districtName">
          <t-input v-model="formData.districtName" placeholder="手动输入...." />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="货区描述" name="districtDesc">
          <t-textarea v-model="formData.districtDesc" placeholder="手动输入...." />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="启用">
          <t-switch v-model="formData.state" :custom-value="[1, 0]" />
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>
<script setup lang="ts">
import { isEmpty } from 'lodash';
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

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
// 校验规则
const rules: FormRules<Data> = {
  warehouseId: [
    {
      required: true,
      message: '请选择仓库',
      trigger: 'change',
    },
  ],
  districtCode: [
    {
      required: true,
      message: '请输入货区编码',
      trigger: 'blur',
    },
  ],
  districtName: [
    {
      required: true,
      message: '请输入货区名称',
      trigger: 'blur',
    },
  ],
  districtDesc: [
    {
      required: true,
      message: '请输入货区描述',
      trigger: 'blur',
    },
  ],
};
//*
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
  // // // 在提交之前验证表单数据
  // const formValidation = await validateForm();
  // // 检查是否有验证错误
  // if (!formValidation) {
  //   return;
  // }
  try {
    const fieldsToValidate = [
      { field: formData.value.warehouseId, message: '请选择仓库' },
      { field: formData.value.districtCode, message: '请输入货区编码' },
      { field: formData.value.districtName, message: '请输入货区名称' },
      { field: formData.value.districtDesc, message: '请输入货区描述' },
    ];
    // if (isEmpty(formData.value.warehouseId)) {
    //   MessagePlugin.error('请选择仓库');
    //   return false;
    // }

    // if (isEmpty(formData.value.districtCode)) {
    //   MessagePlugin.error('请输入货区编码');
    //   return false;
    // }
    // if (isEmpty(formData.value.districtName)) {
    //   MessagePlugin.error('请输入货区名称');
    //   return false;
    // }
    // if (isEmpty(formData.value.districtDesc)) {
    //   MessagePlugin.error('请输入货区描述');
    //   return false;
    // }

    for (const field of fieldsToValidate) {
      if (isEmpty(field.field)) {
        MessagePlugin.error(field.message);
        return false;
      }
    }

    formData.value.state = formData.value.state ? 1 : 0; //* 处理启用(必须)
    if (formData.value.operateTpye === 'add') {
      await api.district.addDistrict(formData.value);
      MessagePlugin.success('新增成功');
      return true;
    }
    await api.district.modifyDistrict(formData.value);
    MessagePlugin.success('编辑成功');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// const validateForm = async () => {
//   // 在提交之前验证表单数据
//   const formValidation = await formRef.value.validate();
//   // 返回验证结果
//   return formValidation;
// };

//* 暴露 init 方法
defineExpose({
  init,
  submit,
  formRef,
  formData,
});
</script>
