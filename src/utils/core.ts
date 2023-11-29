import '@/assets/libs/web-core';

import { useI18n } from 'vue-i18n';
import { RouteRecordRaw } from 'vue-router';

// import router from '@/router';
import { useTabsRouterStore } from '@/store';
import { TRouterInfo } from '@/types/interface';

// 所有页面设置请求基础路径
fw.config.baseUrl = import.meta.env.VITE_API_URL;
if (typeof window !== 'undefined' && window.top !== window) {
  fw.ipc.addTarget('portal', window.top);

  const name = window.location.pathname.replace('/', '');
  window.top.fw?.ipc.addTarget(name, window);
}

export const useCore = () => {
  // portal 页面
  if (window.top === window) {
    // 添加路由事件
    fw.ipc.on('appendTabRouterList', async (newRoute: TRouterInfo) => {
      const tabsRouterStore = useTabsRouterStore();

      tabsRouterStore.appendTabRouterList(newRoute);
    });

    // 关闭路由事件
    fw.ipc.on('subtractCurrentTabRouter', (path: string) => {
      const tabsRouterStore = useTabsRouterStore();

      const { tabRouters } = tabsRouterStore;
      const route = tabRouters.find((i) => i.path === path);

      tabsRouterStore.subtractCurrentTabRouter(route);
    });
  } else {
    // module 页面

    fw.ipc.on('change-language', (lang) => {
      const { locale } = useI18n({ useScope: 'global' });
      locale.value = lang;
    });
  }
};

/**
 * 打开新页面
 * @param newRoute
 */
export const openPage = (newRoute: TRouterInfo) => {
  fw.ipc.send('appendTabRouterList', newRoute);
};

/**
 * 关闭当前页面
 * @param path
 */
export const closePage = (path?: string) => {
  fw.ipc.send('subtractCurrentTabRouter', path || window.location.pathname);
};
