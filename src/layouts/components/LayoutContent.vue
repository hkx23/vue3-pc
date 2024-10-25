<template>
  <t-layout :class="`${prefix}-layout`">
    <t-tabs
      v-if="settingStore.isUseTabsRouter"
      drag-sort
      :class="`${prefix}-layout-tabs-nav`"
      :value="$route.path"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
      @change="(value) => handleChangeCurrentTab(value as string)"
      @remove="handleRemove"
      @drag-sort="handleDragend"
    >
      <t-tab-panel
        v-for="(routeItem, index) in tabRouters"
        :key="`${routeItem.path}_${index}`"
        :value="routeItem.path"
        :removable="!routeItem.isHome"
        :draggable="!routeItem.isHome"
      >
        <template #label>
          <div @contextmenu.prevent="(e) => handleContextMenu(routeItem, index, e)">
            <template v-if="!routeItem.isHome">
              {{ renderMenuTitle(routeItem.title) }}
            </template>
            <home-icon v-else></home-icon>
          </div>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <l-breadcrumb v-if="settingStore.showBreadcrumb" />
      <l-content />
    </t-content>
    <t-footer v-if="settingStore.showFooter" :class="`${prefix}-footer-layout`">
      <l-footer />
    </t-footer>
  </t-layout>
</template>

<script setup lang="tsx">
import ContextMenu from '@imengyu/vue3-context-menu';
import { some } from 'lodash';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseCircleIcon,
  HomeIcon,
  StarFilledIcon,
  StarIcon,
} from 'tdesign-icons-vue-next';
// import type { PopupVisibleChangeContext } from 'tdesign-vue-next';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { api, Favorite } from '@/api/main';
import { prefix } from '@/config/global';
import { t } from '@/locales';
import { renderMenuTitle } from '@/router/locale';
import { useSettingStore, useTabsRouterStore, useUserStore } from '@/store';
import type { TRouterInfo, TTabRemoveOptions } from '@/types/interface';

import LBreadcrumb from './Breadcrumb.vue';
import LContent from './Content.vue';
import LFooter from './Footer.vue';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const settingStore = useSettingStore();
const tabsRouterStore = useTabsRouterStore();
const tabRouters = computed(() => tabsRouterStore.tabRouters.filter((route) => route.isAlive || route.isHome));
const activeTabPath = ref('');

const handleChangeCurrentTab = (path: string) => {
  const { tabRouters } = tabsRouterStore;
  const route = tabRouters.find((i) => i.path === path);
  router.push({ path, query: route?.query });
};

const handleRemove = (options: TTabRemoveOptions) => {
  const { tabRouters } = tabsRouterStore;
  const nextRouter = tabRouters[options.index + 1] || tabRouters[options.index - 1];

  tabsRouterStore.subtractCurrentTabRouter({ path: options.value as string, routeIdx: options.index });
  if ((options.value as string) === route.path) router.push({ path: nextRouter.path, query: nextRouter.query });
};

// const handleRefresh = (route: TRouterInfo, routeIdx: number) => {
//   tabsRouterStore.toggleTabRouterAlive(routeIdx);
//   nextTick(() => {
//     tabsRouterStore.toggleTabRouterAlive(routeIdx);
//     router.replace({ path: route.path, query: route.query });
//   });
//   activeTabPath.value = null;
// };
const handleCloseAhead = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterAhead({ path, routeIdx });

  handleOperationEffect('ahead', routeIdx);
};
const handleCloseBehind = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterBehind({ path, routeIdx });

  handleOperationEffect('behind', routeIdx);
};
const handleCloseOther = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterOther({ path, routeIdx });

  handleOperationEffect('other', routeIdx);
};

// 收藏菜单
const handleAddfavorite = async (routeItem: TRouterInfo, routeIdx: number) => {
  activeTabPath.value = null;
  console.log(routeItem, routeIdx);
  if (routeItem.meta && routeItem.meta.id && userStore.userInfo.id) {
    await api.favorite.add({
      userId: userStore.userInfo.id,
      moduleId: routeItem.meta.id,
    });
    const resfavorites = await api.favorite.list();
    userStore.setFavorites(resfavorites);
  }
};

// 取消收藏菜单
const handleRemovefavorite = async (routeItem: TRouterInfo, routeIdx: number) => {
  console.log(routeItem, routeIdx);
  activeTabPath.value = null;
  await api.favorite.delete({
    userId: userStore.userInfo.id,
    moduleId: routeItem.meta.id,
  });
  const resfavorites = await api.favorite.list();
  userStore.setFavorites(resfavorites);
};

// 校验是否菜单已收藏
const isMenuFavorite = (routeItem: TRouterInfo) => {
  const { favorites } = userStore.userInfo;
  let hasValue = false;
  if (routeItem.meta && routeItem.meta.id) {
    hasValue = some(favorites, (item: Favorite) => item.moduleId === routeItem.meta.id);
  }
  return hasValue;
};

// 处理非当前路由操作的副作用
const handleOperationEffect = (type: 'other' | 'ahead' | 'behind', routeIndex: number) => {
  const currentPath = router.currentRoute.value.path;
  const { tabRouters } = tabsRouterStore;

  const currentIdx = tabRouters.findIndex((i) => i.path === currentPath);
  // 存在三种情况需要刷新当前路由
  // 点击非当前路由的关闭其他、点击非当前路由的关闭左侧且当前路由小于触发路由、点击非当前路由的关闭右侧且当前路由大于触发路由
  const needRefreshRouter =
    (type === 'other' && currentIdx !== routeIndex) ||
    (type === 'ahead' && currentIdx < routeIndex) ||
    (type === 'behind' && currentIdx === -1);
  if (needRefreshRouter) {
    const nextRouteIdx = type === 'behind' ? tabRouters.length - 1 : 1;
    const nextRouter = tabRouters[nextRouteIdx];
    router.push({ path: nextRouter.path, query: nextRouter.query });
  }

  activeTabPath.value = null;
};

const handleDragend = (options: { currentIndex: number; targetIndex: number }) => {
  const { tabRouters } = tabsRouterStore;

  [tabRouters[options.currentIndex], tabRouters[options.targetIndex]] = [
    tabRouters[options.targetIndex],
    tabRouters[options.currentIndex],
  ];
};

const handleContextMenu = (routeItem, index, e: MouseEvent) => {
  activeTabPath.value = routeItem.path;
  ContextMenu.showContextMenu({
    theme: 'mac',
    x: e.x,
    y: e.y,
    items: [
      ...(index > 1
        ? [
            {
              label: t('layout.tagTabs.closeLeft'),
              icon: <ArrowLeftIcon />,
              onClick: () => {
                handleCloseAhead(routeItem.path, index);
              },
            },
          ]
        : []),
      ...(index < tabRouters.value.length - 1
        ? [
            {
              label: t('layout.tagTabs.closeRight'),
              icon: <ArrowRightIcon />,
              onClick: () => {
                handleCloseBehind(routeItem.path, index);
              },
            },
          ]
        : []),
      ...(tabRouters.value.length > 2
        ? [
            {
              label: t('layout.tagTabs.closeOther'),
              icon: <CloseCircleIcon />,
              onClick: () => {
                handleCloseOther(routeItem.path, index);
              },
            },
          ]
        : []),
      ...(isMenuFavorite(routeItem)
        ? [
            {
              label: t('layout.tagTabs.remveFavority'),
              icon: <StarFilledIcon style={{ color: '#FF0000' }} />,
              onClick: () => {
                handleRemovefavorite(routeItem, index);
              },
            },
          ]
        : [
            {
              label: t('layout.tagTabs.addFavority'),
              icon: <StarIcon />,
              onClick: () => {
                handleAddfavorite(routeItem, index);
              },
            },
          ]),
    ],
  });
};
</script>
<style lang="less" scoped>
:deep(.@{starter-prefix}-layout-tabs-nav) {
  .t-tabs__bar {
    &.t-is-top {
      display: none;
    }
  }

  .t-tabs__nav-item {
    cursor: default;
    height: 30px;
    line-height: 30px;
    margin-top: 2px;

    &:not(.t-is-disabled, .t-is-active) {
      &:hover {
        .t-tabs__nav-item-wrapper {
          background-color: transparent;
        }
      }

      .t-tabs__nav-item-text-wrapper:hover {
        color: var(--td-brand-color);
      }
    }

    &.t-is-active {
      background-color: var(--td-bg-color-page);
      color: var(--td-text-color-secondary);
      border-radius: var(--td-radius-default) var(--td-radius-default) 0 0;
    }

    > .remove-btn {
      margin-left: 0;
      margin-right: var(--td-comp-margin-s);

      &:hover {
        color: var(--td-brand-color);
        cursor: pointer;
        background-color: var(--td-bg-color-page);
        border-radius: var(--td-radius-default);
      }
    }
  }
}
</style>
