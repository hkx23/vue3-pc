<template>
  <cmp-kanban-default>
    <cmp-kanban-box>
      <template #title> 标题测试 </template>
      内容测试
    </cmp-kanban-box>
  </cmp-kanban-default>
</template>
<script setup lang="ts"></script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
