<template>
  <div ref="el" v-bind="targetAttrs" class="cmp-wrapper" :style="styleAttrs">
    <div class="titlebar">
      <div class="current-time">{{ currentTime }}</div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CmpWrapper',
};
</script>
<script setup lang="ts">
import { useDateFormat, useNow, useResizeObserver } from '@vueuse/core';
import { debounce } from 'lodash';
import { computed, onMounted, ref, useAttrs } from 'vue';

export interface CmpWrapperProps {
  designWidth: number;
  designHeight: number;
  title: string;
  theme: string;
}

const props = withDefaults(defineProps<CmpWrapperProps>(), {
  designWidth: 1920,
  designHeight: 1080,
  title: '默认车间生产看板',
  theme: 'default',
});
const attrs: Partial<CmpWrapperProps> = useAttrs();
const targetAttrs = computed<CmpWrapperProps>(() => {
  return { ...attrs, ...props, title: undefined };
});
const styleAttrs = computed(() => {
  let bgStyle = {};
  if (props.theme) {
    bgStyle = {
      'background-image': `url('/images/kanban/${props.theme}/bg.gif')`,
    };
  }
  return {
    'max-width': `${props.designWidth}px`,
    'max-height': `${props.designHeight}px`,
    'min-width': `${props.designWidth}px`,
    'min-height': `${props.designHeight}px`,
    transform: `scale(${scaleInfo.value.x}, ${scaleInfo.value.y})`,
    'transform-origin': '0 0',
    ...bgStyle,
  };
});

const el = ref<HTMLElement>();

const scaleInfo = ref({
  y: 1,
  x: 1,
});
const updateScale = (width, height) => {
  scaleInfo.value = {
    x: width / props.designWidth,
    y: height / props.designHeight,
  };
};

onMounted(() => {
  el.value.parentElement.style.overflow = 'hidden';
  useResizeObserver(
    el.value.parentElement,
    debounce((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      updateScale(width, height);
    }, 300),
  );
});

const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
</script>
<style lang="less" scoped>
.cmp-wrapper {
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
  color: #fff;

  > .titlebar {
    > .title {
      line-height: 64px;
      font-size: 36px;
      font-weight: 700;
      text-align: center;
    }

    > .current-time {
      position: absolute;
      left: 64px;
      top: 30px;
      font-size: 22px;
    }
  }

  > .body {
    padding: 16px;
    font-size: 20px;
    display: flex;
    flex: 1;
  }
}
</style>
