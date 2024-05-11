<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<template>
  <div ref="el" v-bind="targetAttrs" class="cmp-wrapper" :style="styleAttrs">
    <div class="ccp-page">
      <div class="ccp-header">
        <div class="ccp-header-left">
          <div class="ccp-logo">
            <img src="./images/logo/clientLogo.png" style="height: 88px" />
          </div>

          <div class="ccp-header-left-bottom"></div>
        </div>
        <div class="ccp-title">
          <span class="ccp-title-text">
            {{ title }}
          </span>
        </div>
        <div class="ccp-header-right">
          <div class="current-time">{{ currentTime }}</div>
        </div>
      </div>
      <div :class="gridAttrs">
        <slot></slot>
      </div>

      <div class="ccp-footer">
        <img
          src="./images/bottom.png"
          style="
            border-radius: unset;
            cursor: pointer;
            pointer-events: auto;
            -webkit-user-drag: none;
            filter: none;
            width: 50%;
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CmpKanbanDefault',
};
</script>

<script setup lang="ts">
import { useDateFormat, useNow, useResizeObserver } from '@vueuse/core';
import { debounce } from 'lodash';
import { computed, onMounted, ref, useAttrs } from 'vue';

export interface CmpKanbanProps {
  designWidth: number;
  designHeight: number;
  title: string;
  theme: string;
  gridSize: string;
}
const props = withDefaults(defineProps<CmpKanbanProps>(), {
  designWidth: 1920,
  designHeight: 1080,
  title: '默认车间生产看板',
  theme: 'default',
  gridSize: 'default',
});
const attrs: Partial<CmpKanbanProps> = useAttrs();
const targetAttrs = computed<CmpKanbanProps>(() => {
  return { ...attrs, ...props, title: undefined };
});
const styleAttrs = computed(() => {
  let bgStyle = {};
  if (props.theme) {
    bgStyle = {
      'background-image': `url('/images/kanban/theme/default/backgroud.jpg')`,
    };
  }
  return {
    'min-width': `${props.designWidth}px`,
    'min-height': `${props.designHeight}px`,
    transform: `scale(${scaleInfo.value.x}, ${scaleInfo.value.y})`,
    'transform-origin': '0 0',
    ...bgStyle,
  };
});

const gridAttrs = computed(() => {
  let bgStyleName = 'ccp-grid';
  if (props.gridSize === 'small') {
    bgStyleName = 'ccp-grid-small';
  }
  return bgStyleName;
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

<!-- 看板模板整体样式 -->
<style lang="less" scoped>
.cmp-wrapper {
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
  color: #fff;
  flex: 1;

  .ccp-page {
    display: flex;
    flex-direction: column;
    flex: 1;

    .ccp-header {
      width: 100%;
      height: 158px;
      display: flex;
      flex-direction: row;
      background-image: url('@/components/cmp-kanban-default/images/background-header.png');
      background-size: 100% 100%;

      .ccp-header-left {
        flex: 1;
      }

      .ccp-title {
        flex: 1;
        font-size: 38px;
        word-break: break-all;
        white-space: normal;
        font-weight: normal;
        letter-spacing: 2px;
        line-height: 78px;
        text-shadow: #7ac5ed 0 4px 5px;
        -webkit-box-reflect: below -4px linear-gradient(transparent, rgb(0 0 0 / 0%));
        height: 108px;
        text-align: center;
        padding: 0;
      }

      .ccp-header-right {
        flex: 1;

        .current-time {
          position: absolute;
          right: 64px;
          top: 30px;
          font-size: 22px;
        }
      }
    }

    .ccp-grid {
      flex: 1;
      margin-top: -85px;
      margin-bottom: -30px;
      padding: 18px;
      display: flex;
      flex-direction: column;
    }

    .ccp-grid-small {
      flex: 1;
      margin-top: -85px;
      margin-bottom: -30px;
      padding: 18px 3px 12px;
      display: flex;
      flex-direction: column;
    }

    .ccp-footer {
      width: 100%;
      height: 72px;
      text-align: center;
    }
  }
}
</style>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.cmp-wrapper {
  .t-input__prefix {
    color: aliceblue;
  }

  .t-input__inner {
    color: white;
  }

  .t-input--focused .t-input__prefix,
  .t-input--focused .t-input__inner {
    color: black;
  }

  .t-input:hover .t-input__prefix,
  .t-input:hover .t-input__inner {
    color: black;
  }
}
</style>
