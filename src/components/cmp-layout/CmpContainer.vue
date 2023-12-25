<template>
  <t-row ref="container" :gutter="gutter" :class="classAttrs">
    <slot></slot>
  </t-row>
</template>
<script lang="ts">
export default {
  name: 'CmpContainer',
};
</script>
<script setup lang="ts">
import type { GutterObject } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  full?: boolean;
  fullSubIndex?: number[];
  gutter?: number | GutterObject | (number | GutterObject)[];
}>();

const gutter = ref(props.gutter ?? [0, 16]); // 使用默认值

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
  const elements = container.value.$el.querySelectorAll(':scope > *') as HTMLInputElement[];
  // const elements = container.value.$el.querySelectorAll(':scope > .t-space-item') as HTMLInputElement[];
  if (elements.length === 0) return;

  if (props.fullSubIndex) {
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      element.style.flex = props.fullSubIndex.lastIndexOf(i) >= 0 ? '1' : 'none';
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
  flex-flow: column;
  align-items: normal;

  :deep(.cmp-container) {
    padding: 0;
  }

  :deep(> .t-col) {
    &.t-col-1,
    &.t-col-2,
    &.t-col-3,
    &.t-col-4,
    &.t-col-5,
    &.t-col-6,
    &.t-col-7,
    &.t-col-8,
    &.t-col-9,
    &.t-col-10,
    &.t-col-11,
    &.t-col-12 {
      flex: 0 0 auto;
    }
  }
}

.cmp-container-full {
  height: 100%;
  flex: 1;
  min-height: 0;
  // overflow: hidden;

  :deep(> .t-space-item) {
    min-height: 0;
  }

  :deep(> .t-tabs) {
    display: flex;
    flex-flow: column;
    min-height: 0;

    > .t-tabs__content {
      flex: 1;
      display: flex;
      flex-flow: column;
      min-height: 0;

      > .t-tab-panel {
        > .cmp-card {
          > .t-card {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
      }
    }
  }
}
</style>
