<template>
  <t-form
    :rules="rules"
    layout="inline"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    @submit="submit"
  >
    <t-space direction="vertical">
      <t-form-item label="功能名称" required-mark>
        <t-input v-model="formData.moduleName" :disabled="true" />
      </t-form-item>
      <t-form-item label="配置项名称" required-mark>
        <t-input v-model="formData.profileName" :disabled="true" />
      </t-form-item>
      <t-col :span="7">
        <t-form-item label="配置项说明" name="profileDesc">
          <t-textarea v-model="formData.profileDesc" :disabled="true" />
        </t-form-item>
      </t-col>
      <t-row>
        <t-col :span="7">
          <t-form-item label="配置项维度" name="profileCategory">
            <t-select v-model="formData.profileCategory">
              <t-option
                v-for="(value, key) in profileCategoryOption"
                :key="key"
                :label="value.label"
                :value="value.value"
              ></t-option>
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="2">
          <t-form-item label-align="left" name="profileCategoryValue" label-width="20px">
            <template v-if="formData.profileCategory === 'plant'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="plant"></bcmp-select-business>
            </template>
            <template v-if="formData.profileCategory === 'workshop'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="workshop"></bcmp-select-business>
            </template>
            <template v-if="formData.profileCategory === 'workcenter'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="workcenter"></bcmp-select-business>
            </template>
            <template v-if="formData.profileCategory === 'process'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="process"></bcmp-select-business>
            </template>
            <template v-if="formData.profileCategory === 'workstation'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="workstation"></bcmp-select-business>
            </template>
            <template v-if="formData.profileCategory === 'role'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="role"></bcmp-select-business>
            </template>
            <template v-if="formData.profileCategory === 'user'">
              <bcmp-select-business v-model="formData.profileCategoryValue" type="user"></bcmp-select-business>
            </template>
          </t-form-item>
        </t-col>
      </t-row>
      <t-col :span="7">
        <t-form-item label="配置项值" name="profileValue">
          <template v-if="formData.valueType === 'DROPLIST'">
            <t-select v-model="formData.profileValue" label-width="113px">
              <t-option
                v-for="(option, index) in profileValueOption"
                :key="index"
                :label="option.label"
                :value="option.value"
              ></t-option>
            </t-select>
          </template>
          <template v-else>
            <t-textarea v-model="formData.profileValue" />
          </template>
        </t-form-item>
      </t-col>
      <t-form-item label="启用">
        <t-switch v-model="formData.isState" />
      </t-form-item>
    </t-space>
  </t-form>
</template>

<script lang="ts">
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

export default {
  name: 'MitemForm',
  setup() {
    const formData = ref({
      operateTpye: 'add',
      id: '',
      isState: false,
      profileId: '',
      moduleName: '',
      profileName: '',
      profileDesc: '',
      valueType: '',
      valueRange: '',
      erpWarehouse: '',
      profileCategory: '',
      profileCategoryValue: '',
      profileValue: '',
      currentComponent: '',
      state: 1,
    });
    const profileCategoryOption = ref([
      { label: '组织', value: 'plant' },
      { label: '车间', value: 'workshop' },
      { label: '工作中心', value: 'workcenter' },
      { label: '工序', value: 'process' },
      { label: '工站', value: 'workstation' },
      { label: '角色', value: 'role' },
      { label: '用户', value: 'user' },
    ]);
    const profileValueOption = ref([
      { label: 'Y', value: 1 },
      { label: 'N', value: 0 },
    ]);

    const warehouseTypeOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'W_WAREHOUSE_TYPE' }).then((data) => {
      warehouseTypeOption.value = data;
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        formData.value.state = formData.value.isState === true ? 1 : 0;

        if (formData.value.operateTpye === 'add') {
          formData.value.id = '';
          await api.profileValue.addProfileValue(formData.value);
          MessagePlugin.success('新增成功');
        } else if (formData.value.operateTpye === 'edit') {
          await api.profileValue.changeProfileValue(formData.value);
          MessagePlugin.success('编辑成功');
        }
        formData.value.profileCategory = '';
        formData.value.profileCategoryValue = '';
        formData.value.profileValue = '';
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    };
    // 表单定义规则
    const rules: FormRules<Data> = {
      profileCategory: [
        {
          required: true,
          type: 'error',
          trigger: 'change',
        },
      ],
      profileValue: [
        {
          required: true,
          type: 'error',
          trigger: 'change',
        },
      ],
      profileCategoryValue: [
        {
          required: true,
          type: 'error',
          message: '配置项维度值必填',
        },
      ],
    };
    const init = (value: any) => {
      formData.value.operateTpye = 'add';
      formData.value.profileId = value.value.nodeId;
      formData.value.moduleName = value.value.attribute === 2 ? value.value.parentModuleName : value.value.moduleName;
      formData.value.isState = true;
      onGetProfileData();
    };
    // 获取表单数据
    const onGetProfileData = async () => {
      const res = await api.profile.selectById(Number(formData.value.profileId)); // 获取当前配置项的数据
      formData.value.profileName = res.profileName;
      formData.value.profileDesc = res.profileDesc;
      formData.value.valueRange = res.valueRange;
      formData.value.valueType = res.valueType;
    };
    return {
      init,
      submit,
      formData,
      profileValueOption,
      profileCategoryOption,
      rules,
    };
  },
};
</script>
`
