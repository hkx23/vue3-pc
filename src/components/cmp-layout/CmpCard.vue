<template>
  <t-col v-bind="targetAttrs" :class="classAttrs" :style="styleAttrs">
    <div v-if="props.ghost" class="cmp-card">
      <div class="cmp-card-actions">
        <slot name="actions"></slot>
      </div>
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
  isMini?: boolean;
  noFill?: boolean;
}

const props = withDefaults(defineProps<CmpCardProps>(), {
  // height: '100%',
  full: true,
  ghost: false,
  isMini: false,
  bordered: false,
  noFill: false,
  hoverShadow: true,
});
const attrs: Partial<CmpCardProps> = useAttrs();
const targetAttrs = computed<CmpCardProps>(() => {
  return { ...attrs, ...props, title: undefined };
});
const styleAttrs = computed(() => {
  return {
    height: props.height,
  };
});

const classAttrs = computed(() => {
  return `cmp-card${props.full ? ' cmp-card-full' : ''}${props.ghost ? ' cmp-card-ghost' : ''}${
    props.noFill ? ' cmp-card-no-fill' : ''
  }${props.isMini ? ' cmp-card-mini' : ''}`;
});
</script>
<style lang="less" scoped>
.cmp-card {
  min-width: 1px;

  :deep(> .cmp-container-full) {
    padding: 0;
  }
}

.cmp-card-mini {
  :deep(.t-card__header) {
    padding: 0;

    .t-card__title {
      display: none;
    }

    .t-card__actions {
      position: absolute;
      right: 16px;
      top: 8px;
      z-index: 100;
    }
  }

  :deep(.t-card__body) {
    padding: 0 var(--td-comp-paddingLR-xl);
  }
}

.cmp-card-full {
  :deep(> .cmp-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;

    > .t-card__body {
      flex: 1;
      overflow: auto;
    }
  }
}

.cmp-card-ghost {
  :deep(> .cmp-card) {
    // margin: 0 -6px;
    .cmp-card-actions {
      position: absolute;
      right: 16px;
      top: 8px;
      z-index: 100;
    }
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
