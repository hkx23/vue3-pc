<template>
  <t-space ref="container" direction="vertical" :class="classAttrs" :size="12">
    <slot></slot>
  </t-space>
</template>
<script lang="ts">
export default {
  name: 'CmpContainer',
};
</script>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  full?: boolean;
  flexIndex?: number;
}>();
const classAttrs = computed(() => {
  return `cmp-container ${props.full ? 'cmp-container-full' : ''}`;
});

const container = ref(null);
onMounted(() => {
  const elements = container.value.$el.querySelectorAll(':scope > .t-space-item') as HTMLInputElement[];
  if (elements.length > 0) {
    elements[props.flexIndex || elements.length - 1].style.flex = '1';
  }
});
</script>
<style lang="less" scoped>
.cmp-container {
  padding: 16px;
  width: 100%;
}

.cmp-container-full {
  height: 100%;
  flex: 1;
  overflow: hidden;

  // :deep(> .t-space-item) {
  //   height: 100%;
  // }
}
</style>
