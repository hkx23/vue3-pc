<template>
  <t-row v-bind="targetAttrs" :gutter="12" :style="styleAttrs">
    <slot></slot>
  </t-row>
</template>
<script lang="ts">
export default {
  name: 'CmpRow',
};
</script>
<script setup lang="ts">
import { RowProps } from 'tdesign-vue-next';
import { computed, useAttrs } from 'vue';

export interface CmpRowProps extends Omit<RowProps, 'options'> {
  height?: string;
}

const props = withDefaults(defineProps<CmpRowProps>(), {
  height: '100%',
});
const attrs: Partial<CmpRowProps> = useAttrs();
const targetAttrs = computed<CmpRowProps>(() => {
  return { ...attrs, ...props };
});
const styleAttrs = computed(() => {
  return {
    height: props.height,
  };
});
</script>
<style lang="less" scoped></style>
