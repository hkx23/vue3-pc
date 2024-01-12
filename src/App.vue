<template>
  <t-config-provider :global-config="globalConfig">
    <custom-error-message />
    <router-view :key="locale" :class="[mode]"
  /></t-config-provider>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import CustomErrorMessage from '@/components/custom-error-message/index.vue';
import { useLocale } from '@/locales/useLocale';
import { useSettingStore } from '@/store';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});

const { getComponentsLocale, locale } = useLocale();

const globalConfig = computed(() => {
  return {
    dialog: {
      closeOnOverlayClick: false,
    },
    ...getComponentsLocale,
  };
});
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
