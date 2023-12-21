import { defineStore } from 'pinia';

import { api, OrgVO } from '@/api/main';
import { getToken } from '@/api/portal';
import { usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';

interface OrgUser extends UserInfo {
  eid?: string;
  orgId?: string;
  timeModified?: string;
  timeLastPasswordChanged?: string;
  orgs?: OrgVO[];
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
      return state.userOrgInfo[state.userInfo.id];
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
        id: res.userId,
        name: res.displayName,
        code: res.userName,
        eid: res.eid,
        timeModified: res.timeModified,
        timeLastPasswordChanged: res.timeLastPasswordChanged,
        orgId,
        orgs: res.orgList,
      } as OrgUser;

      const userOrgInfo = this.currUserOrgInfo;
      if (!userOrgInfo) {
        this.updateOrg();
      }
      return this.userInfo;
    },
    updateOrg(orgInfo?: orgInfo) {
      this.userOrgInfo[this.userInfo.id] = orgInfo || {
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
