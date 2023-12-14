<template>
  <t-space direction="vertical" :class="classAttrs" :size="12">
    <slot></slot>
  </t-space>
</template>
<script lang="ts">
export default {
  name: 'CmpContainer',
};
</script>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  full?: boolean;
}>();
const classAttrs = computed(() => {
  return `cmp-container ${props.full ? 'cmp-container-full' : ''}`;
});
</script>
<style lang="less" scoped>
.cmp-container {
  padding: 16px;
  width: 100%;
}

.cmp-container-full {
  height: 100%;
  overflow: hidden;

  :deep(> .t-space-item) {
    height: 100%;
  }
}
</style>
