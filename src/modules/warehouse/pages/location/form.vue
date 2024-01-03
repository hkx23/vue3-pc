<template>
  <t-form
    ref="formRef"
    layout="inline"
    label-width="125px"
    label-align="right"
    :rules="rules"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    @submit="submit"
  >
    <t-space direction="vertical">
      <t-row :gutter="[32, 20]">
        <t-col :span="6">
          <t-form-item v-if="formData.operateTpye === 'add'" label="选择仓库" name="warehouseId">
            <bcmp-select-business
              v-model="formData.warehouseId"
              :is-multiple="false"
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
          <t-form-item v-if="formData.operateTpye === 'add'" label="选择货区" name="districtId">
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
          <t-form-item v-else label="选择货区" required-mark>
            <t-input v-model="formData.districtId" disabled></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货区名称" required-mark>
            <t-input v-model="formData.districtName" placeholder="手动输入...." disabled />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货位编码" name="locationCode">
            <t-input
              v-model="formData.locationCode"
              placeholder="手动输入...."
              :disabled="formData.operateTpye !== 'add'"
            />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货位名称" name="locationName">
            <t-input v-model="formData.locationName" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货位描述" name="locationDesc">
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
import { isEmpty } from 'lodash';
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
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
  try {
    const fieldsToValidate = [
      { field: formData.value.warehouseId, message: '请选择仓库' },
      { field: formData.value.districtId, message: '请选择货区' },
      { field: formData.value.locationCode, message: '请输入货位编码' },
      { field: formData.value.locationName, message: '请输入货位名称' },
      { field: formData.value.locationDesc, message: '请输入货位描述' },
    ];

    for (const field of fieldsToValidate) {
      if (isEmpty(field.field)) {
        MessagePlugin.error(field.message);
        return false;
      }
    }

    formData.value.state = formData.value.state ? 1 : 0; //* 处理启用(必须)
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

// 校验规则
const rules: FormRules<Data> = {
  warehouseId: [
    {
      required: true,
      message: '请选择仓库',
      trigger: 'change',
    },
  ],
  districtId: [
    {
      required: true,
      message: '请选择货区',
      trigger: 'change',
    },
  ],
  locationCode: [
    {
      required: true,
      message: '请输入货位编码',
      trigger: 'blur',
    },
  ],
  locationName: [
    {
      required: true,
      message: '请输入货位名称',
      trigger: 'blur',
    },
  ],
  locationDesc: [
    {
      required: true,
      message: '请输入货位描述',
      trigger: 'blur',
    },
  ],
};

//* 暴露 init 方法
defineExpose({
  init,
  submit,
  formRef,
  formData,
});
</script>

<style scoped>
/* 添加样式设置输入框宽度 */
.t-input,
.bcmp-select-business,
.t-textarea {
  width: 100%;
}
</style>
