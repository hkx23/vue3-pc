<template>
  <t-form :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="工序编码" required-mark>
      <t-input v-model="formData.processCode" :disabled="!(formData.operateTpye === 'add')" />
    </t-form-item>
    <t-form-item label="工序名称" required-mark>
      <t-input v-model="formData.processName" />
    </t-form-item>
    <t-form-item label="工序描述">
      <t-input v-model="formData.processDesc" />
    </t-form-item>
    <t-form-item label="工序别名">
      <t-input v-model="formData.processAlias" />
    </t-form-item>

    <t-form-item label="工序采集类别">
      <t-select v-model="formData.processCategory" :options="processCategoryOptions" clearable />
    </t-form-item>

    <t-form-item label="状态">
      <t-switch v-model="formData.isState" />
    </t-form-item>
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
    const processCategoryOptions = ref([]);
    const formData = ref({
      operateTpye: 'add',
      id: '',
      isState: false,
      processCode: '',
      processName: '',
      processDesc: '',
      processAlias: '',
      processCategory: '',
      state: 0,
    });

    onMounted(() => {
      getProcessCategory();
    });
    const submit = async () => {
      try {
        if (isEmpty(formData.value.processName)) {
          MessagePlugin.error('请输入工序名称');
          return false;
        }

        if (isEmpty(formData.value.processCategory)) {
          MessagePlugin.error('请选择工序采集类型');
          return false;
        }
        formData.value.state = formData.value.isState ? 1 : 0;

        if (formData.value.operateTpye === 'add') {
          await api.process.add(formData.value);
          MessagePlugin.success('新增成功');
        } else if (formData.value.operateTpye === 'edit') {
          await api.process.edit(formData.value);
          MessagePlugin.success('编辑成功');
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    };
    const getProcessCategory = async () => {
      try {
        processCategoryOptions.value = [];
        const data = await api.param.getListByGroupCode({ parmGroupCode: 'PROCESS_CATEGORY' });
        data.forEach((n) => {
          processCategoryOptions.value.push({ label: n.label, value: n.value });
        });
      } catch (e) {
        console.log(e);
      }
    };
    const init = () => {
      formData.value.operateTpye = 'add';
      formData.value.id = '';
      formData.value.processCode = '';
      formData.value.processName = '';
      formData.value.processDesc = '';
      formData.value.processAlias = '';
      formData.value.processCategory = '';
      formData.value.isState = true;
    };
    return {
      init,
      submit,
      formData,
      processCategoryOptions,
    };
  },
};
</script>
`
