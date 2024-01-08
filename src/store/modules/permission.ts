import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

import { RouteItem } from '@/api/model/permissionModel';
import { getMenuList } from '@/api/portal';
import router, { homepageRouterList } from '@/router';
// import router from '@/router';
import { store } from '@/store';
import { transformObjectToRoute } from '@/utils/route';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login', '/components/businessexample'],
    routers: [] as RouteItem[],
    removeRoutes: [],
    asyncRoutes: [] as RouteItem[],
  }),
  actions: {
    async initRoutes() {
      const accessedRouters = this.asyncRoutes;
      // 在菜单展示全部路由
      // this.routers = [...homepageRouterList, ...accessedRouters, ...fixedRouterList];
      // 在菜单只展示动态路由和首页
      this.routers = [...homepageRouterList, ...accessedRouters];
      // 在菜单只展示动态路由
      // this.routers = [...accessedRouters];
    },
    // eslint-disable-next-line consistent-return
    async buildAsyncRoutes() {
      const asyncRoutes: Array<RouteItem> = await getMenuList();
      // 发起菜单权限请求 获取菜单列表
      this.asyncRoutes = await transformObjectToRoute(asyncRoutes);
      await this.initRoutes();
      return this.asyncRoutes;
    },
    async restoreRoutes() {
      // 不需要在此额外调用initRoutes更新侧边导肮内容，在登录后asyncRoutes为空会调用
      this.asyncRoutes.forEach((item: RouteRecordRaw) => {
        if (item.name) {
          router.removeRoute(item.name);
        }
      });
      this.asyncRoutes = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
