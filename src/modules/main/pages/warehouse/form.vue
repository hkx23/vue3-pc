<template>
  <t-form
    :data="formData"
    :show-cancel="true"
    label-align="right"
    label-width="125px"
    :show-error-message="false"
    @submit="submit"
  >
    <t-row :gutter="[32, 16]">
      <t-col :span="6">
        <t-form-item label="仓库编码" required-mark>
          <t-input v-model="formData.warehouseCode" :disabled="!(formData.operateTpye === 'add')" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="仓库名称" required-mark>
          <t-input v-model="formData.warehouseName" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="仓库描述">
          <t-input v-model="formData.warehouseDesc" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="仓库属性">
          <t-select v-model="formData.warehouseAttribute">
            <t-option
              v-for="(value, key) in warehousePropertyOption"
              :key="key"
              :label="value.label"
              :value="value.value"
            ></t-option>
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="ERP仓库">
          <t-input v-model="formData.erpWarehouse" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="仓库类型">
          <t-select v-model="formData.warehouseCategory">
            <t-option
              v-for="(value, key) in warehouseTypeOption"
              :key="key"
              :label="value.label"
              :value="value.value"
            ></t-option>
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="启用交易上传">
          <t-switch v-model="formData.enableUpload" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="交易上传时间">
          <t-date-picker
            v-model="formData.datetimeUpload"
            allow-input
            enable-time-picker
            clearable
            format="YYYY-MM-DD HH:mm:ss"
          />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label-align="left">
          <t-checkbox v-model="formData.enableLocation">启用货位管理</t-checkbox>
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item label="状态">
          <t-switch v-model="formData.isState" />
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
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
      warehouseCode: '',
      warehouseName: '',
      warehouseDesc: '',
      warehouseAttribute: '',
      warehouseCategory: '',
      erpWarehouse: '',
      state: 1,
      isEnableUpload: 0,
      enableUpload: false,
      datetimeUpload: '',
      enableLocation: false,
      isEnableLocation: 0,
    });
    const warehousePropertyOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'W_WAREHOUSE_PROPERTY' }).then((data) => {
      warehousePropertyOption.value = data;
    });
    const warehouseTypeOption = ref([]);
    api.param.getListByGroupCode({ parmGroupCode: 'W_WAREHOUSE_TYPE' }).then((data) => {
      warehouseTypeOption.value = data;
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        if (isEmpty(formData.value.warehouseName)) {
          MessagePlugin.error('请输入仓库名称');
          return false;
        }
        if (isEmpty(formData.value.warehouseCode)) {
          MessagePlugin.error('请输入仓库编码');
          return false;
        }
        formData.value.isEnableLocation = formData.value.enableLocation === true ? 1 : 0;
        formData.value.isEnableUpload = formData.value.enableUpload === true ? 1 : 0;
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
    const init = () => {
      formData.value.operateTpye = 'add';
      formData.value.id = '';
      formData.value.warehouseCode = '';
      formData.value.warehouseName = '';
      formData.value.warehouseDesc = '';
      formData.value.erpWarehouse = '';
      formData.value.isState = true;
    };
    return {
      init,
      submit,
      formData,
      warehouseTypeOption,
      warehousePropertyOption,
    };
  },
};
</script>
`
