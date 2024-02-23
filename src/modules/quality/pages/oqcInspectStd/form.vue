<template>
  <t-form ref="formRef">
    <t-row :gutter="[32, 16]">
      <!-- 第 1️⃣ 行数据 -->
      <t-col :span="12">
        <t-form-item label="检验标准" name="mitemCode">
          <t-input v-model="formData.inspectStdName" :disabled="formData.type === '01'"></t-input>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="物料类别" name="mitemCode">
          <bcmp-select-business
            v-model="formData.mitemCategortArr"
            type="mitemCategory"
            is-multiple
            :clearable="true"
            :show-title="false"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="物料" name="mitemCode">
          <bcmp-select-business
            v-model="formData.mitemId"
            type="mitem"
            :show-title="false"
            :clearable="true"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  type: '',
  id: '',
  inspectStdCode: '',
  inspectStdName: '',
  mitemCategortArr: [],
  mitemId: '',
});
</script>
