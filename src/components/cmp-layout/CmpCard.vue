<template>
  <t-col v-bind="targetAttrs" :class="classAttrs" :style="styleAttrs">
    <div v-if="props.ghost" class="cmp-card">
      <slot></slot>
    </div>
    <t-card v-else v-bind="props" class="cmp-card">
      <template v-for="(item, key) in $slots" :key="key" #[key]>
        <slot :name="key"></slot>
      </template>
    </t-card>
  </t-col>
</template>
<script lang="ts">
export default {
  name: 'CmpCard',
};
</script>
<script setup lang="ts">
import { CardProps, ColProps } from 'tdesign-vue-next';
import { computed, useAttrs } from 'vue';

export interface CmpCardProps extends Omit<ColProps, 'options'>, Omit<CardProps, 'options'> {
  height?: string;
  full?: boolean;
  ghost?: boolean;
  noFill?: boolean;
}

const props = withDefaults(defineProps<CmpCardProps>(), {
  height: '100%',
  full: true,
  ghost: false,
  bordered: false,
  noFill: false,
  hoverShadow: true,
});
const attrs: Partial<CmpCardProps> = useAttrs();
const targetAttrs = computed<CmpCardProps>(() => {
  return { ...attrs, ...props };
});
const styleAttrs = computed(() => {
  return {
    height: props.height,
  };
});

const classAttrs = computed(() => {
  return `cmp-container ${props.full ? 'cmp-card-full' : ''} ${props.ghost ? 'cmp-card-ghost' : ''} ${
    props.noFill ? 'cmp-card-no-fill' : ''
  }`;
});
</script>
<style lang="less" scoped>
.cmp-card {
  :deep(> .cmp-container-full) {
    padding: 0;
  }
}

.cmp-card-full {
  :deep(> .cmp-card) {
    height: 100%;

    > .t-card__body {
      height: 100%;
    }
  }
}

.cmp-card-ghost {
  :deep(> .cmp-card) {
    margin: 0 -8px;
  }
}

.cmp-card-no-fill {
  :deep(> .cmp-card) {
    > .t-card__body {
      padding: 0;
    }
  }
}
</style>
