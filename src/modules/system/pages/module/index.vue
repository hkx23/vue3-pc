<template>
  <div class="module-tree-container">
    <t-card :bordered="false"> <t-button>新增</t-button></t-card>
    <t-card :bordered="false">
      <header class="module-header-box">
        <t-row justify="space-between">
          <t-col :span="4" flex="auto">1</t-col>
          <t-col :span="8" flex="auto">2</t-col>
        </t-row>
        <!-- <div>1</div> -->
        <!-- <div>2</div> -->
      </header></t-card
    >
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-header-box {
  // display: flex;
  // justify-content: space-between;
}
</style>
