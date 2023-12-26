<template>
  <t-form
    :rules="rules"
    :data="formData"
    :show-cancel="true"
    :show-error-message="true"
    label-width="120px"
    @submit="onAnomalyTypeSubmit"
  >
    <t-row :gutter="[32, 16]">
      <t-col :span="6">
        <t-form-item label="功能名称" required-mark>
          <t-input v-model="formData.moduleName" :disabled="true" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="配置项名称" required-mark>
          <t-input v-model="formData.profileName" :disabled="true" />
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="配置项说明" name="profileDesc">
          <t-textarea v-model="formData.profileDesc" :disabled="true" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="配置项维度" name="profileCategory">
          <t-select v-model="formData.profileCategory" @change="onCatChange">
            <t-option
              v-for="(value, key) in profileCategoryOption"
              :key="key"
              :label="value.label"
              :value="value.value"
            ></t-option>
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item name="profileCategoryValue" :label="profileCategoryValueLabel">
          <template v-if="formData.profileCategory === 'plant'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              type="plant"
              :show-title="false"
            ></bcmp-select-business>
          </template>
          <template v-if="formData.profileCategory === 'workshop'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              :show-title="false"
              type="workshop"
            ></bcmp-select-business>
          </template>
          <template v-if="formData.profileCategory === 'workcenter'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              type="workcenter"
              :show-title="false"
            ></bcmp-select-business>
          </template>
          <template v-if="formData.profileCategory === 'process'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              type="process"
              :show-title="false"
            ></bcmp-select-business>
          </template>
          <template v-if="formData.profileCategory === 'workstation'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              type="workstation"
              :show-title="false"
            ></bcmp-select-business>
          </template>
          <template v-if="formData.profileCategory === 'role'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              type="role"
              :show-title="false"
            ></bcmp-select-business>
          </template>
          <template v-if="formData.profileCategory === 'user'">
            <bcmp-select-business
              v-model="formData.profileCategoryValue"
              type="user"
              :show-title="false"
            ></bcmp-select-business>
          </template>
        </t-form-item>
      </t-col>
      <t-col :span="6">
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
      <t-col :span="6">
        <t-form-item label="启用">
          <t-switch v-model="formData.isState" />
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>

<script lang="ts">
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

export default {
  name: 'MitemForm',
  setup() {
    const profileCategoryValueLabel = ref('');

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
    // 表单提交事件
    const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
      if (context.validateResult === true) {
        submit();
      }
    };
    const onCatChange = (value: string) => {
      formData.value.profileCategory = value;
      setCategoryLabel();
    };
    const setCategoryLabel = () => {
      let result = '';
      switch (formData.value.profileCategory) {
        case 'plant':
          result = '组织';
          break;
        case 'workshop':
          result = '车间';
          break;
        case 'workcenter':
          result = '工作中心';
          break;
        case 'process':
          result = '工序';
          break;
        case 'workstation':
          result = '工站';
          break;
        case 'role':
          result = '角色';
          break;
        case 'user':
          result = '用户';
          break;

        default:
          break;
      }

      profileCategoryValueLabel.value = result;
    };
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
      formData.value.profileCategory = '';
      formData.value.profileCategoryValue = '';
      formData.value.profileValue = '';
      formData.value.isState = true;
      setCategoryLabel();
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
      onAnomalyTypeSubmit,
      formData,
      profileValueOption,
      profileCategoryOption,
      rules,
      profileCategoryValueLabel,
      onCatChange,
      setCategoryLabel,
    };
  },
};
</script>
`
