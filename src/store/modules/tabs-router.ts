import { defineStore } from 'pinia';

import { store } from '@/store';
import type { TRouterInfo, TTabRouterType } from '@/types/interface';

import { useUserStore } from './user';

const homeRoute: Array<TRouterInfo> = [
  {
    path: '/dashboard/base',
    routeIdx: 0,
    title: '仪表盘',
    name: 'DashboardBase',
    isHome: true,
  },
];

const stateData = {
  // tabRouterList: homeRoute,
  userTabRouterList: {} as {
    [key: string]: Array<TRouterInfo>;
  },
  currentRouterPath: 'default',
  isRefreshing: false,
};

// 不需要做多标签tabs页缓存的列表 值为每个页面对应的name 如 DashboardDetail
// const ignoreCacheRoutes = ['DashboardDetail'];
const ignoreCacheRoutes = ['login'];

export const useTabsRouterStore = defineStore('tabsRouter', {
  state: () => {
    const userStore = useUserStore();
    stateData.userTabRouterList = {
      [userStore.userInfo.id]: homeRoute,
    };
    return stateData;
  },
  getters: {
    tabRouters: (state: TTabRouterType) => {
      const userStore = useUserStore();
      let result = state.userTabRouterList[userStore.userInfo.id];
      if (!result || result.length === 0) {
        state.userTabRouterList[userStore.userInfo.id] = homeRoute;
        result = homeRoute;
      }
      return result;
    },
    refreshing: (state: TTabRouterType) => state.isRefreshing,
  },
  actions: {
    updateCurrUserTab(list: Array<TRouterInfo>) {
      const userStore = useUserStore();
      this.userTabRouterList[userStore.userInfo.id] = list;
    },
    // 处理刷新
    toggleTabRouterAlive(routeIdx: number) {
      this.isRefreshing = !this.isRefreshing;
      this.tabRouters[routeIdx].isAlive = !this.tabRouters[routeIdx].isAlive;
    },
    // 处理新增
    appendTabRouterList(newRoute: TRouterInfo) {
      // 不要将判断条件newRoute.meta.keepAlive !== false修改为newRoute.meta.keepAlive，starter默认开启保活，所以meta.keepAlive未定义时也需要进行保活，只有显式说明false才禁用保活。
      const needAlive = !ignoreCacheRoutes.includes(newRoute.name as string) && newRoute.meta?.keepAlive !== false;
      if (!this.tabRouters.find((route: TRouterInfo) => route.path === newRoute.path)) {
        // eslint-disable-next-line no-param-reassign
        this.updateCurrUserTab(this.tabRouters.concat({ ...newRoute, isAlive: needAlive }));
      }
    },
    // 处理关闭当前
    subtractCurrentTabRouter(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.updateCurrUserTab(this.tabRouters.slice(0, routeIdx).concat(this.tabRouters.slice(routeIdx + 1)));
    },
    // 处理关闭右侧
    subtractTabRouterBehind(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      const homeIdx: number = this.tabRouters.findIndex((route: TRouterInfo) => route.isHome);
      let tabRouterList: Array<TRouterInfo> = this.tabRouters.slice(0, routeIdx + 1);
      if (routeIdx < homeIdx) {
        tabRouterList = tabRouterList.concat(homeRoute);
      }
      this.updateCurrUserTab(tabRouterList);
    },
    // 处理关闭左侧
    subtractTabRouterAhead(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      const homeIdx: number = this.tabRouters.findIndex((route: TRouterInfo) => route.isHome);
      let tabRouterList: Array<TRouterInfo> = this.tabRouters.slice(routeIdx);
      if (routeIdx > homeIdx) {
        tabRouterList = homeRoute.concat(tabRouterList);
      }
      this.updateCurrUserTab(tabRouterList);
    },
    // 处理关闭其他
    subtractTabRouterOther(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      const homeIdx: number = this.tabRouters.findIndex((route: TRouterInfo) => route.isHome);
      this.updateCurrUserTab(routeIdx === homeIdx ? homeRoute : homeRoute.concat([this.tabRouters?.[routeIdx]]));
    },
    removeTabRouterList() {
      this.updateCurrUserTab([]);
    },
    initTabRouterList(newRoutes: TRouterInfo[]) {
      newRoutes?.forEach((route: TRouterInfo) => this.appendTabRouterList(route));
    },
    setCurrentRouterPath(path: string) {
      this.currentRouterPath = path;
    },
  },
  persist: true,
});

export function getTabsRouterStore() {
  return useTabsRouterStore(store);
}
