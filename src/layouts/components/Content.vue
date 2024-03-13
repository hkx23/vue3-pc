<template>
  <!-- <router-view /> -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <frame-page />
</template>

<script setup lang="ts">
// import isBoolean from 'lodash/isBoolean';
// import isUndefined from 'lodash/isUndefined';
// import type { ComputedRef } from 'vue';
// import { computed } from 'vue';
// // <suspense>标签属于实验性功能，请谨慎使用
// // 如果存在需解决/page/1=> /page/2 刷新数据问题 请修改代码 使用activeRouteFullPath 作为key
// // <suspense>
// //  <component :is="Component" :key="activeRouteFullPath" />
// // </suspense>
// import { useRouter } from 'vue-router';

// import FramePage from '@/layouts/frame/index.vue';
// import { useTabsRouterStore } from '@/store';

// const router = useRouter();

// const activeRouteIsNotIframe = computed(() => {
//   const { currentRoute } = router;
//   return !currentRoute.value.meta.frameSrc;
// });

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

// const isRefreshing = computed(() => {
//   const tabsRouterStore = useTabsRouterStore();
//   const { refreshing } = tabsRouterStore;
//   return refreshing;
// });
</script>
<style lang="less" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
