<template>
  <t-form ref="formRef" :rules="rules" :show-error-message="false">
    <!-- 第 1️⃣ 行数据 -->
    <t-form-item label="产品类别" name="mitemCategoryId">
      <bcmp-select-business
        ref="selectformRef"
        v-model="formData.mitemCategoryId"
        type="mitemCategory"
        :show-title="false"
        @change="onChange"
      ></bcmp-select-business>
    </t-form-item>
    <t-form-item label="类别描述" name="description">
      <t-textarea
        v-model="formData.description"
        name="description"
        :readonly="true"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api } from '@/api/control';

export default {
  name: 'MitemForm',
  setup() {
    const selectformRef = ref(null);
    const formData = ref({
      description: '',
      mitemCategoryId: '',
    });
    // #表单定义规则
    const rules: FormRules = {
      mitemCategoryId: [{ required: true, message: '不能为空', trigger: 'change' }],
    };

    const onChange = (context) => {
      console.log(context);
      formData.value.description = context[0].categoryDesc;
    };

    const submit = async () => {
      if (!formData.value.mitemCategoryId) {
        MessagePlugin.warning('产品类别必填');
        return false;
      }

      await api.sopProduct.addMitemCategory({
        mitemCategoryId: formData.value.mitemCategoryId,
      });

      MessagePlugin.success('操作成功');
      return true;
    };
    const init = () => {
      formData.value = {
        description: '',
        mitemCategoryId: '',
      };
    };

    return {
      init,
      submit,
      selectformRef,
      onChange,
      rules,
      formData,
      isEmpty,
    };
  },
};
</script>
