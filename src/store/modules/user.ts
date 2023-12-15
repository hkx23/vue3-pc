import { defineStore } from 'pinia';

import { api, OrgVO } from '@/api/main';
import { getToken } from '@/api/portal';
import { usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';

interface OrgUser extends UserInfo {
  eid?: string;
  orgId?: string;
  orgs?: OrgVO[];
}
const InitUserInfo: UserInfo = {
  id: '', // 用户ID
  name: '', // 用户名，用于展示在页面右上角头像处
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
    userInfo: { ...InitUserInfo } as OrgUser,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
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
    },
    async getUserInfo() {
      const res = await api.user.currentUserInfo();
      // const mockRemoteUserInfo = async () => {
      //   return {
      //     name: '管理员',
      //     roles: ['all'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
      //   };
      // };
      // const res = await mockRemoteUserInfo();
      let orgId = fw.getOrgId();
      if (!orgId || !res.orgList.some((org) => org.id === orgId)) {
        fw.setOrgId(res.defaultOrgId);
        orgId = res.defaultOrgId;
      }

      fw.setEnterpriseId(res.eid);
      this.userInfo = {
        id: res.userName,
        name: res.displayName,
        eid: res.eid,
        orgId,
        orgs: res.orgList,
      } as OrgUser;

      return this.userInfo;
    },
    setOrgId(id: string) {
      this.userInfo.orgId = id;
      fw.setOrgId(id);
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
    paths: ['token', 'userInfo'],
  },
});
