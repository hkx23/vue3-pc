<!-- 事务交易明细 -->
<template>
  <t-dialog width="50%" :footer="false" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ formTitle }}</span>
      </t-space>
    </template>

    <cmp-container :full="true">
      <t-descriptions>
        <t-descriptions-item label="接口分类">{{ rowData.msgCategoryName }}</t-descriptions-item>
        <t-descriptions-item label="接口领域分类">{{ rowData.msgDomainCategoryName }}</t-descriptions-item>
        <t-descriptions-item label="MES业务单号">{{ rowData.billNo }}</t-descriptions-item>
        <t-descriptions-item label="ERP凭据单号">{{ rowData.erpBillNo }}</t-descriptions-item>
        <t-descriptions-item label="交易开始时间">{{ rowData.datetimeExecuteStart }}</t-descriptions-item>
        <!-- 交易结束时间 -->
        <t-descriptions-item label="至">{{ rowData.datetimeExecuteEnd }}</t-descriptions-item>
        <t-descriptions-item label="执行结果">{{ rowData.status }}</t-descriptions-item>
        <t-descriptions-item label="错误信息" :span="3">
          <t-textarea readonly :value="rowData.failContent" />
        </t-descriptions-item>
        <t-descriptions-item label="请求参数" :span="3">
          <t-textarea readonly :value="rowData.paramIn" name="description" />
        </t-descriptions-item>
      </t-descriptions>

      <div class="dialog-footer">
        <t-button theme="default" type="reset" @click="handleCancel">取消</t-button>
      </div>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
defineProps({
  formTitle: String,
  rowData: Object,
});

const emit = defineEmits(['update-data']);

const handleCancel = () => {
  emit('update-data');
};
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end; /* 使内容靠右对齐 */
}
</style>
