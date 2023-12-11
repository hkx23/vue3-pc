<template>
  <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="工序编码" required-mark>
      <t-input v-model="formData.processCode" :disabled="!(formData.operateTpye === 'add')" />
    </t-form-item>
    <t-form-item label="工序名称" required-mark>
      <t-input v-model="formData.processName" />
    </t-form-item>
    <t-form-item label="工序描述">
      <t-input v-model="formData.processDesc" />
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
    const formData = ref({
      operateTpye: 'add',
      id: '',
      isState: false,
      processCode: '',
      processName: '',
      processDesc: '',
      state: 0,
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        if (isEmpty(formData.value.processName)) {
          MessagePlugin.error('请输入工序名称');
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
    const init = () => {
      formData.value.operateTpye = 'add';
      formData.value.id = '';
      formData.value.processCode = '';
      formData.value.processName = '';
      formData.value.processDesc = '';
      formData.value.isState = true;
    };
    return {
      init,
      submit,
      formData,
    };
  },
};
</script>
`
