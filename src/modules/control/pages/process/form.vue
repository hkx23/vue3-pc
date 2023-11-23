<template>
  <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="工序编码" required-mark>
      <t-input v-model="formData.processCode" disabled />
    </t-form-item>
    <t-form-item label="工序名称" required-mark>
      <t-input v-model="formData.processName" />
    </t-form-item>
    <t-form-item label="工序描述">
      <t-input v-model="formData.processDesc" />
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/control';

export default {
  name: 'MitemForm',
  setup() {
    // const isBatchNoOptions = ref([
    //   { label: '是', value: 1 },
    //   { label: '否', value: 0 },
    // ]); // 是否启用批次
    const formData = ref({
      id: '',
      state: -1,
      processCode: '',
      processName: '',
      processDesc: '',
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        await api.process.getItemById('123123');
        MessagePlugin.success('编辑成功');
      } catch (e) {
        console.log(e);
      } finally {
        console.log('11111');
      }
    };

    return {
      submit,
      formData,
    };
  },
};
</script>
`
