<template>
  <t-form ref="formRef">
    <t-row :gutter="[32, 16]">
      <!-- 第 1️⃣ 行数据 -->
      <t-col :span="12">
        <t-form-item label="检验标准" name="mitemCode">
          <t-input></t-input>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="物料类别" name="mitemCode">
          <bcmp-select-business label="" type="mitemCategory" :clearable="true"></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="物料" name="mitemCode">
          <bcmp-select-business label="" type="mitem" :clearable="true"></bcmp-select-business>
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>
