<template>
  <div class="progress-container">
    <div class="progress-bar" :style="progressStyle">
      <span class="progress-text">{{ currentValue }} / {{ maxValue }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

// 使用 defineProps 定义组件的 props
const props = defineProps({
  currentValue: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: true,
  },
});

// 使用计算属性计算进度条宽度
const progressStyle = computed(() => {
  const width = (props.currentValue / props.maxValue) * 100;
  return {
    width: `${width}%`,
  };
});
</script>

<style scoped>
.progress-container {
  width: 100%;
  background-color: #c42d2d;
  border-radius: 8px;
  overflow: hidden;
  position: relative; /* 为了绝对定位的子元素 */
}

.progress-bar {
  height: 15px;
  background-color: #574caf;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
  width: 0;
  transition: width 0.5s ease;
}

.progress-text {
  color: rgb(39 245 24);
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使用 transform 来精确居中 */
  font-size: 12px;
  white-space: nowrap; /* 防止文本换行 */
}
</style>
