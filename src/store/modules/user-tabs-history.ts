import { defineStore } from 'pinia';

import { store } from '@/store';
import type { TRouterInfo, TTabRouterType } from '@/types/interface';

import { useUserStore } from './user';

const homeRoute: Array<TRouterInfo> = [
  {
    path: '',
    routeIdx: 0,
    title: '',
    name: '',
    isHome: true,
  },
];

const limitCount = 10;

const stateData = {
  userTabRouterList: {} as {
    [key: string]: Array<TRouterInfo>;
  },
  isRefreshing: false,
};

// 不需要做多标签tabs页缓存的列表 值为每个页面对应的name 如 DashboardDetail
// const ignoreCacheRoutes = ['DashboardDetail'];
const ignoreCacheRoutes = ['login'];

export const userTabsHistoryStore = defineStore('userTabsHistory', {
  state: () => {
    const userStore = useUserStore();
    stateData.userTabRouterList = {
      [userStore.userInfo.id]: homeRoute,
    };
    return stateData;
  },
  getters: {
    userTabsHistory: (state: TTabRouterType) => {
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
      if (list && list.length > limitCount) {
        list.pop();
      }
      this.userTabRouterList[userStore.userInfo.id] = list;
    },
    // 处理刷新
    toggleTabHistoryAlive(routeIdx: number) {
      this.isRefreshing = !this.isRefreshing;
      this.userTabsHistory[routeIdx].isAlive = !this.userTabsHistory[routeIdx].isAlive;
    },
    // 处理新增
    appendTabHistoryList(newRoute: TRouterInfo) {
      if (newRoute.name.toString().indexOf('login') > -1 || newRoute.name.toString().indexOf('DashboardBase') > -1) {
        return;
      }
      // 不要将判断条件newRoute.meta.keepAlive !== false修改为newRoute.meta.keepAlive，starter默认开启保活，所以meta.keepAlive未定义时也需要进行保活，只有显式说明false才禁用保活。
      const needAlive = !ignoreCacheRoutes.includes(newRoute.name as string) && newRoute.meta?.keepAlive !== false;
      if (!this.userTabsHistory.find((route: TRouterInfo) => route.path === newRoute.path)) {
        // eslint-disable-next-line no-param-reassign
        this.userTabsHistory.unshift({ ...newRoute, isAlive: needAlive });
        this.updateCurrUserTab(this.userTabsHistory);
      }
    },
    // 处理关闭当前
    subtractCurrentTabHistory(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.updateCurrUserTab(this.userTabsHistory.slice(0, routeIdx).concat(this.userTabsHistory.slice(routeIdx + 1)));
    },
    removeTabHistoryList() {
      this.updateCurrUserTab([]);
    },
    initTabHistoryList(newRoutes: TRouterInfo[]) {
      newRoutes?.forEach((route: TRouterInfo) => this.appendTabHistoryList(route));
    },
  },
  persist: true,
});

export function getUserTabsHistoryStore() {
  return userTabsHistoryStore(store);
}
