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
              :is-multiple="formData.opType === 'add'"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="工作中心" name="workcenterId">
            <bcmp-select-business
              v-model="formData.workcenterId"
              type="workcenter"
              :show-title="false"
              :is-multiple="formData.opType === 'add'"
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
          <t-form-item label="文件类型" name="processId" :required-mark="true">
            <bcmp-select-business
              v-model="formData.sopCategory"
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
      id: '',
      opType: '',
      fileDesc: '',
      fileName: '',
      mitemCategoryId: '',
      timeEffective: new Date().toISOString().substr(0, 10),
      timeInvalid: '',
      status: '',
      mitemId: '',
      sopCategory: '',
      processId: '',
      processIds: [],
      workcenterId: '',
      workcenterIds: [],
      isState: true,
    });
    // #表单定义规则
    const rules: FormRules = {
      mitemCategoryId: [{ required: true, message: '不能为空', trigger: 'change' }],
    };

    const submit = async () => {
      if (!formData.value.sopCategory) {
        MessagePlugin.warning('文件类型必填');
        return false;
      }
      if (!isEmpty(formData.value.processId)) {
        formData.value.processIds = formData.value.processId.split(',');
      }
      if (!isEmpty(formData.value.workcenterId)) {
        formData.value.workcenterIds = formData.value.workcenterId.split(',');
      }

      formData.value.status = formData.value.isState ? 'EFFECTIVE' : 'UNENABLE';

      if (formData.value.opType === 'add') {
        await api.sopProduct.addFile(formData.value);
      } else {
        await api.sopProduct.editFile(formData.value);
      }

      MessagePlugin.success('操作成功');
      return true;
    };
    const init = () => {
      formData.value = {
        id: '',
        opType: '',
        fileDesc: '',
        processIds: [],
        workcenterIds: [],
        sopCategory: '',
        status: '',
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
