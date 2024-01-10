<template>
  <t-form :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="分类编码" required-mark>
      <t-input v-model="formData.categoryCode" disabled />
    </t-form-item>
    <t-form-item label="分类名称" required-mark>
      <t-input v-model="formData.categoryName" />
    </t-form-item>
    <t-form-item label="分类描述">
      <t-input v-model="formData.categoryDesc" />
    </t-form-item>
    <t-form-item label="小数位计算">
      <t-select
        v-model="formData.reqCalcRule"
        :options="reqCalcRuleOptions"
        placeholder="请选择小数位计算类型"
        clearable
      ></t-select>
    </t-form-item>
    <t-form-item label="投料规则">
      <t-select
        v-model="formData.onboardRuleCode"
        :options="onboardRuleCodeOptions"
        placeholder="请选择投料规则"
        clearable
      ></t-select>
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

export default {
  name: 'MitemCategoryForm',
  // components: { BcmpSelectBusiness },
  setup() {
    const onboardRuleCodeOptions = ref([
      { label: '限制工单只能使用一个生产批次', value: 'singlelotonly' },
      { label: '同时一时间可使用多个生产批次半成品', value: 'multilot' },
      { label: '限制工单同一时刻只能使用一个生产批次', value: 'singlelotreduce' },
      { label: '工单同一时间可使用多个生产批次', value: 'multilotreduce' },
    ]);
    const reqCalcRuleOptions = ref([
      { label: '不做任何处理', value: 'normal' },
      { label: '有小数进位取整', value: 'ceil' },
    ]);
    const formData = ref({
      id: '',
      categoryCode: '',
      categoryName: '',
      categoryDesc: '',
      reqCalcRule: '',
      onboardRuleCode: '',
    });

    onMounted(() => {
      // console.log('123123');
    });
    const submit = async () => {
      try {
        if (formData.value.categoryName === '') {
          MessagePlugin.error('请输入分类名称');
          return false;
        }

        await api.mitemCategory.edit(formData.value);
        MessagePlugin.success('编辑成功');
      } catch (e) {
        console.log(e);
      }
      return true;
    };

    return {
      submit,
      formData,
      reqCalcRuleOptions,
      onboardRuleCodeOptions,
    };
  },
};
</script>
`
