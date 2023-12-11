<template>
  <div :class="prefixCls">
    <t-loading :loading="loading" size="large">
      <iframe ref="frameRef" :src="frameSrc" :class="`${prefixCls}__main`" @load="hideLoading"></iframe>
    </t-loading>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { prefix } from '@/config/global';

defineProps({
  frameSrc: String,
});

const loading = ref(true);

const frameRef = ref<HTMLFrameElement>();
const prefixCls = computed(() => [`${prefix}-iframe-page`]);

function hideLoading() {
  loading.value = false;
}
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{starter-prefix}-iframe-page';

.@{prefix-cls} {
  flex: 1;
  display: flex;
  flex-direction: column;

  > .t-loading__parent {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--td-bg-color-page);
    border: 0;
    box-sizing: border-box;
  }
}
</style>
