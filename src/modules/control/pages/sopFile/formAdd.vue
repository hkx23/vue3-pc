<template>
  <cmp-container :full="true">
    <t-form ref="formRef" :rules="rules" :show-error-message="false" label-align="right" label-width="100px">
      <t-row :gutter="[32, 16]">
        <t-col :span="12">
          <t-form-item label="文件名称" required-mark>
            <t-input v-model="formData.fileName" :disabled="true" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="工序" name="processId">
            <bcmp-select-business
              v-model="formData.processId"
              type="process"
              :show-title="false"
              :is-multiple="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="工作中心" name="workcenterId">
            <bcmp-select-business
              v-model="formData.workcenterId"
              type="workcenter"
              :show-title="false"
              :is-multiple="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="启用日期" name="timeEffective">
            <t-date-picker v-model="formData.timeEffective" style="width: 300px" allow-input clearable />
          </t-form-item>
        </t-col>
        <t-col :span="4">
          <t-form-item label="失效日期" name="timeInvalid">
            <t-date-picker v-model="formData.timeInvalid" style="width: 300px" allow-input clearable />
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="描述" name="description">
            <t-textarea
              v-model="formData.fileDesc"
              name="description"
              :readonly="true"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="文件类型" name="processId">
            <bcmp-select-business
              v-model="formData.processId"
              type="fileType"
              category="P_FILE_TYPE"
              :show-title="false"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="启用">
            <t-switch v-model="formData.isState" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
  </cmp-container>
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
      fileDesc: '',
      fileName: '',
      mitemCategoryId: '',
      timeEffective: '',
      timeInvalid: '',
      mitemId: '',
      processId: '',
      workcenterId: '',
      isState: true,
    });
    // #表单定义规则
    const rules: FormRules = {
      mitemCategoryId: [{ required: true, message: '不能为空', trigger: 'change' }],
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
        fileDesc: '',
        fileName: '',
        mitemCategoryId: '',
        timeEffective: '',
        timeInvalid: '',
        mitemId: '',
        processId: '',
        workcenterId: '',
        isState: true,
      };
    };

    return {
      init,
      submit,
      selectformRef,
      rules,
      formData,
      isEmpty,
    };
  },
};
</script>
