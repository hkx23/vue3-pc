<template>
  <div class="tdesign-wrapper">
    <!-- <router-view /> -->
    <router-view v-if="!isRefreshing" v-slot="{ Component, route }">
      <!-- :include="aliveViews" -->
      <keep-alive>
        <component :is="Component" :key="route.meta.id" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup lang="ts">
// import isBoolean from 'lodash/isBoolean';
// import isUndefined from 'lodash/isUndefined';
// import type { ComputedRef } from 'vue';
import { computed } from 'vue';

import { useTabsRouterStore } from '@/store';

// const aliveViews = computed(() => {
//   const tabsRouterStore = useTabsRouterStore();
//   const { tabRouters } = tabsRouterStore;
//   return tabRouters
//     .filter((route) => {
//       const keepAliveConfig = route.meta?.keepAlive;
//       const isRouteKeepAlive = isUndefined(keepAliveConfig) || (isBoolean(keepAliveConfig) && keepAliveConfig); // 默认开启keepalive
//       return route.isAlive && isRouteKeepAlive;
//     })
//     .map((route) => route.name);
// }) as ComputedRef<string[]>;

const isRefreshing = computed(() => {
  const tabsRouterStore = useTabsRouterStore();
  const { refreshing } = tabsRouterStore;
  return refreshing;
});
</script>
<style lang="less" scoped>
.tdesign-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
