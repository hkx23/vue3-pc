<!-- 事务交易明细 -->
<template>
  <t-dialog width="50%" :footer="false" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <template #button>
      <t-space>
        <t-button>取消</t-button>
      </t-space>
    </template>
    <cmp-container :full="true">
      <!-- 事务交易明细 -->
      <!-- <cmp-card> -->
      <!-- <template #title> {{ props.formTitle }} </template> -->
      <t-form>
        <t-row :gutter="[32, 16]">
          <t-col :span="6">
            <t-form-item label="接口分类：" name="description"> </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="接口领域分类：" name="description"> </t-form-item>
          </t-col>
        </t-row>
        <t-row :gutter="[32, 16]">
          <t-col :span="6">
            <t-form-item label="MES业务单号：" name="description"> </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="第三方凭据单号：" name="description"> </t-form-item>
          </t-col>
        </t-row>
        <t-row :gutter="[32, 16]">
          <t-col :span="6">
            <t-form-item label="交易开始时间：" name="description"> </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="交易结束时间：" name="description"> </t-form-item>
          </t-col>
        </t-row>
        <t-row :gutter="[32, 16]">
          <t-col :span="6">
            <t-form-item label="执行结果：" name="description"> </t-form-item>
          </t-col>
        </t-row>
        <t-row :gutter="[32, 16]">
          <t-col :span="24">
            <t-form-item label="错误信息：" name="description">
              <t-textarea
                placeholder="请输入文案，高度可自适应，最小3行，最大5行；autosize={minRows: 3, maxRows: 5}"
                name="description"
                :autosize="{ minRows: 3, maxRows: 5 }"
              />
            </t-form-item>
          </t-col>

          <t-col :span="24">
            <t-form-item label="请求参数：" name="description">
              <t-textarea
                placeholder="请输入文案，高度可自适应，最小3行，最大5行；autosize={minRows: 3, maxRows: 5}"
                name="description"
                :autosize="{ minRows: 3, maxRows: 5 }"
              />
            </t-form-item>
          </t-col>
        </t-row>
      </t-form>
      <div class="dialog-footer">
        <t-button theme="default" type="reset">取消</t-button>
      </div>
      <!-- </cmp-card> -->
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  formTitle: {
    type: String,
  },
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end; /* 使内容靠右对齐 */
}
</style>
