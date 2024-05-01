<template>
  <div class="kanban-box">
    <div class="box-title-header">
      <div class="box-background-image box-left-part"></div>
      <div class="box-background-image box-middle-part"></div>
      <div class="box-background-image box-right-part"></div>
      <div class="box-title-text"><slot name="title">标题</slot></div>
    </div>
    <div class="box-content"><slot>内容</slot></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CmpKanbanBox',
};
</script>

<script setup lang="ts"></script>

<!-- 看板内容区域样式 -->
<style lang="less" scoped>
.kanban-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  max-width: 100%;
}

.box-title-header {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  opacity: 1;
}

.box-background-image {
  visibility: visible;
  background-position-x: 0%;
  background-position-y: 0%;
  background-size: 100% 100%;
  opacity: 1;
}

.box-left-part {
  width: 33px;
  height: 44px;
  background-image: url('@/components/cmp-kanban-box/images/box-title-left.png');
}

.box-middle-part {
  height: 44px;
  width: 100%;
  background-image: url('@/components/cmp-kanban-box/images/box-title-middle.png');
}

.box-right-part {
  width: 17px;
  height: 44px;
  background-image: url('@/components/cmp-kanban-box/images/box-title-right.png');
}

.box-title-text {
  position: absolute;
  padding-left: 30px;
  font-size: 18px;
  height: 32px;
  color: rgb(199 241 255);
  letter-spacing: 1px;
  text-align: center;
  font-weight: normal;
  filter: drop-shadow(rgba(48 99 195 /50%) 0 0 10px);
}

.box-content {
  min-height: 10px;
  background: rgb(48 99 195 / 20%);
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
}
</style>
