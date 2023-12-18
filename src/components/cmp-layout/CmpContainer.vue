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
import { computed, nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  full?: boolean;
  fullSubIndex?: number[];
}>();
const classAttrs = computed(() => {
  return `cmp-container ${props.full ? 'cmp-container-full' : ''}`;
});

const container = ref(null);

watch(
  () => props.fullSubIndex,
  (val) => {
    if (!val) return;
    nextTick(setFull);
  },
);

watch(
  () => props.full,
  (val) => {
    if (!val) return;
    nextTick(setFull);
  },
);

const setFull = () => {
  const elements = container.value.$el.querySelectorAll(':scope > .t-space-item') as HTMLInputElement[];
  if (elements.length === 0) return;
  if (props.fullSubIndex) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.style.flex = props.fullSubIndex.indexOf(i) >= 0 ? '1' : 'none';
    }
  } else {
    elements[elements.length - 1].style.flex = '1';
  }
};

onMounted(() => {
  setFull();
});
</script>
<style lang="less" scoped>
.cmp-container {
  padding: 12px;
  width: 100%;
}

.cmp-container-full {
  height: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;

  :deep(> .t-space-item) {
    min-height: 0;
  }
}
</style>
