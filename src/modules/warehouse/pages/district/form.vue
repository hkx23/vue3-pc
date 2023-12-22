<template>
  <t-form
    ref="formRef"
    layout="inline"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    :rules="rules"
    @submit="submit"
  >
    <t-space direction="vertical">
      <t-row>
        <t-col v-if="props.formTitle === '编辑'" :span="6">
          <t-form-item label="选择仓库" required-mark>
            <div>
              <t-input v-model="formData.warehouseId" disabled />
            </div>
          </t-form-item>
        </t-col>
        <t-col v-else :span="6">
          <t-form-item label="选择仓库" required-mark>
            <div>
              <bcmp-select-business
                v-model="formData.warehouseId"
                :is-multiple="false"
                type="warehouse"
                label-field="warehouseName"
                value-field="warehouseCode"
                @selection-change="onMaterialTabData"
              ></bcmp-select-business>
            </div>
          </t-form-item>
        </t-col>

        <t-col :span="6">
          <t-form-item label="仓库名称" required-mark>
            <t-input
              v-model="formData.warehouseName"
              :disabled="props.formTitle !== '编辑'"
              placeholder="请输入仓库名称"
            />
          </t-form-item>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="6">
          <t-form-item label="货区编码" required-mark>
            <t-input v-model="formData.districtCode" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="货区名称" style="width: 250px" required-mark>
            <t-input v-model="formData.districtName" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
      </t-row>
      <t-row>
        <t-col :span="6">
          <t-form-item label="货区描述">
            <t-textarea v-model="formData.districtDesc" placeholder="手动输入...." />
          </t-form-item>
        </t-col>
      </t-row>

      <t-row>
        <t-col :span="6">
          <t-form-item label="启用" :label-width="130" style="width: 250px">
            <t-switch v-model="formData.state" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-space>
  </t-form>
</template>
<script setup lang="ts">
// import { isEmpty } from 'lodash';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, defineProps, ref } from 'vue';

import { api } from '@/api/warehouse';

//* 获取title
const props = defineProps({
  formTitle: {
    type: String,
    default: '',
  },
});
const formRef = ref(null);
const formData = ref({
  id: '',
  operateTpye: 'add',
  districtCode: '', // 货区编码
  districtName: '',
  districtDesc: '',
  warehouseName: '',
  warehouseDesc: '',
  state: true,
  warehouseId: '',
  warehouseCode: '',
});

const rules: ComputedRef<FormRules> = computed(() => {
  return {
    warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
    warehouseName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
    districtCode: [{ required: true, message: '请输入货区编码', trigger: 'blur' }],
    districtName: [{ required: true, message: '请输入货区名称', trigger: 'blur' }],
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
  formData.value.state = true;
};

//* 关联仓库名称
const onMaterialTabData = async (event) => {
  const { warehouseName, id } = event;
  formData.value.warehouseName = warehouseName;
  formData.value.warehouseId = id;
};

const submit = async () => {
  // formData.value.state = formData.value.state ? 1 : 0; //* 处理启用
  try {
    if (props.formTitle === '新增') {
      await api.district.addDistrict(formData.value);
      MessagePlugin.success('新增成功');
    } else if (props.formTitle === '编辑') {
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
