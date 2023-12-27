<template>
  <t-button v-bind="targetAttrs">
    <template v-for="(item, key) in $slots" :key="key" #[key]>
      <slot :name="key"></slot>
    </template>
  </t-button>
</template>
<script lang="ts">
export default {
  name: 'CmpButton',
};
</script>
<script setup lang="ts">
import { debounce } from 'lodash';
import { ButtonProps } from 'tdesign-vue-next';
import { computed, useAttrs } from 'vue';

export interface CmpButtonProps extends Omit<ButtonProps, 'options'> {
  /**
   * 点击防抖
   *
   * 单位: 毫秒
   */
  debounceDelay?: number;
}

const props = withDefaults(defineProps<CmpButtonProps>(), {
  debounceDelay: 600,
});
const attrs: Partial<CmpButtonProps> = useAttrs();
const targetAttrs = computed<CmpButtonProps>(() => {
  let customProps = {};
  if (props.debounceDelay && props.onClick) {
    customProps = {
      onClick: debounce(props.onClick, props.debounceDelay),
    };
  }
  return { ...attrs, ...props, ...customProps };
});
</script>
<style lang="less" scoped></style>
