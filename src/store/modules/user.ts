import { defineStore } from 'pinia';

import { api, Favorite, OrgVO } from '@/api/main';
import { getToken } from '@/api/portal';
import { getTabsRouterStore, usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';

interface OrgUser extends UserInfo {
  eid?: string;
  orgId?: string;
  personId?: string;
  adminOrgId?: string;
  timeModified?: string;
  timeLastPasswordChanged?: string;
  orgs?: OrgVO[];
  favorites?: Favorite[];
}
const InitUserInfo: UserInfo = {
  id: '', // 用户ID
  name: '', // 用户名，用于展示在页面右上角头像处
  code: '', // 用户编码
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

interface orgInfo {
  orgId: string;
  orgCode: string;
  orgName: string;
  workShopId: string;
  workShopCode: string;
  workShopName: string;
  workCenterId: string;
  workCenterCode: string;
  workCenterName: string;
  processId: string;
  processCode: string;
  processName: string;
  workStationId: string;
  workStationCode: string;
  workStationName: string;
}

interface userOrg {
  [key: string]: orgInfo;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
    userInfo: { ...InitUserInfo } as OrgUser,
    userOrgInfo: {} as userOrg,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
    currUserOrgInfo: (state) => {
      const userOrg = state.userOrgInfo[state.userInfo.id]?.[state.userInfo.orgId];
      if (!userOrg) {
        return {};
      }
      const useTabsRouterStore = getTabsRouterStore();

      return userOrg[useTabsRouterStore.currentRouterPath] || {};
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const res = await getToken({
        username: userInfo.account as string,
        password: userInfo.password as string,
      });
      this.token = res.access_token;
      fw.setToken(res.access_token);
      this.getUserInfo();
    },
    async getUserInfo() {
      const res = await api.user.currentUserInfo();
      const resFavorites = await api.favorite.list();
      // const mockRemoteUserInfo = async () => {
      //   return {
      //     name: '管理员',
      //     roles: ['all'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
      //   };
      // };
      // const res = await mockRemoteUserInfo();
      let orgId = fw.getOrgId();
      if (!orgId || !res.orgList?.some((org) => org.id === orgId)) {
        fw.setOrgId(res.defaultOrgId);
        orgId = res.defaultOrgId;
      }

      fw.setEnterpriseId(res.eid);
      this.userInfo = {
        id: res.userId,
        name: res.displayName,
        code: res.userName,
        eid: res.eid,
        personId: res.personId,
        adminOrgId: res.adminOrgId,
        timeModified: res.timeModified,
        timeLastPasswordChanged: res.timeLastPasswordChanged,
        orgId,
        orgs: res.orgList || [],
        favorites: resFavorites,
      } as OrgUser;

      const userOrgInfo = this.currUserOrgInfo;
      if (!userOrgInfo) {
        this.updateOrg();
      }
      return this.userInfo;
    },
    updateOrg(orgInfo?: orgInfo) {
      if (!this.userOrgInfo[this.userInfo.id]) this.userOrgInfo[this.userInfo.id] = {};
      if (!this.userOrgInfo[this.userInfo.id][this.userInfo.orgId])
        this.userOrgInfo[this.userInfo.id][this.userInfo.orgId] = {};
      const useTabsRouterStore = getTabsRouterStore();
      this.userOrgInfo[this.userInfo.id][this.userInfo.orgId][useTabsRouterStore.currentRouterPath] = orgInfo || {
        orgId: '',
        orgCode: '',
        orgName: '',
        workShopId: '',
        workShopCode: '',
        workShopName: '',
        workCenterId: '',
        workCenterCode: '',
        workCenterName: '',
        workStationId: '',
        workStationCode: '',
        workStationName: '',
      };
    },
    setOrgId(id: string) {
      this.userInfo.orgId = id;
      fw.setOrgId(id);
    },
    setFavorites(favorites: Favorite[]) {
      this.userInfo.favorites = favorites;
    },
    async logout() {
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
    key: 'user',
    paths: ['token', 'userInfo', 'userOrgInfo'],
  },
});
