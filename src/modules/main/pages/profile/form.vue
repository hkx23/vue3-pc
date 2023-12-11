<template>
  <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-space direction="vertical">
      <t-form-item label="功能名称" required-mark>
        <t-input v-model="formData.moduleName" :disabled="true" />
      </t-form-item>
      <t-form-item label="配置项名称" required-mark>
        <t-input v-model="formData.profileName" :disabled="true" />
      </t-form-item>
      <t-form-item label="配置项说明" label-width="113px">
        <t-textarea v-model="formData.profileDesc" />
      </t-form-item>
      <t-row>
        <t-form-item label="配置项维度" label-width="113px">
          <t-select v-model="formData.profileCategory">
            <t-option
              v-for="(value, key) in profileCategoryOption"
              :key="key"
              :label="value.label"
              :value="value.value"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label-align="left" label-width="20px">
          <t-select v-model="formData.profileCategoryValue">
            <t-option
              v-for="(value, key) in profileValueOption"
              :key="key"
              :label="value.label"
              :value="value.value"
            ></t-option>
          </t-select>
        </t-form-item>
      </t-row>
      <t-form-item label="配置项值" style="width: 250px">
        <t-select v-model="formData.profileValue">
          <t-option
            v-for="(value, key) in profileValueOption"
            :key="key"
            :label="value.label"
            :value="value.value"
          ></t-option>
        </t-select>
      </t-form-item>
      <t-form-item label="启用">
        <t-switch v-model="formData.isState" />
      </t-form-item>
    </t-space>
  </t-form>
</template>

<script lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

export default {
  name: 'MitemForm',
  setup() {
    const formData = ref({
      operateTpye: 'add',
      id: '',
      isState: false,
      moduleName: '',
      profileName: '',
      profileDesc: '',
      valueType: '',
      valueRange: '',
      erpWarehouse: '',
      profileCategory: '',
      profileCategoryValue: '',
      profileValue: '',
      state: 1,
    });
    const profileCategoryOption = ref([
      { label: '组织', value: 1 },
      { label: '车间', value: 2 },
      { label: '工作中心', value: 3 },
      { label: '站点', value: 4 },
      { label: '工站', value: 5 },
      { label: '角色', value: 6 },
      { label: '用户', value: 7 },
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
          await api.warehouse.addWareHouse(formData.value);
          MessagePlugin.success('新增成功');
        } else if (formData.value.operateTpye === 'edit') {
          await api.warehouse.modifyWareHouse(formData.value);
          MessagePlugin.success('编辑成功');
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    };
    const init = (value: any) => {
      formData.value.operateTpye = 'add';
      formData.value.id = '';
      formData.value.moduleName = value.value.moduleName;
      formData.value.isState = true;
    };
    return {
      init,
      submit,
      formData,
      profileValueOption,
      profileCategoryOption,
    };
  },
};
</script>
`
