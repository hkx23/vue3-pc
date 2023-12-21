<template>
  <cmp-container class="user-form">
    <cmp-card title="用户信息" header-bordered>
      <template #actions>
        <t-space v-if="userIsEdit">
          <t-link theme="primary" @click="onClickSaveUser">保存</t-link>
          <t-link @click="userIsEdit = false">取消</t-link>
        </t-space>
        <t-link v-else theme="primary" @click="userIsEdit = true">修改</t-link>
      </template>
      <t-row align="middle" justify="space-around">
        <t-col :span="3"> <user-icon class="user-image"></user-icon> </t-col>
        <t-col :span="9">
          <t-form :label-width="180" label-align="left">
            <t-form-item label="用户名">
              <t-input v-if="userIsEdit" v-model="userInfo.name"></t-input>
              <div v-else>{{ userInfo.name }}</div>
            </t-form-item>
            <t-form-item label="角色">
              <t-space>
                <t-tooltip v-for="item in roles" :key="item.id" :content="item.roleDesc">
                  <t-tag>{{ item.roleName }}</t-tag>
                </t-tooltip>
              </t-space>
            </t-form-item>
            <t-form-item label="手机号"></t-form-item>
            <t-form-item label="邮箱"></t-form-item>
            <t-form-item label="最后一次修改资料时间">
              <div>{{ userInfo.timeModified }}</div>
            </t-form-item>
          </t-form>
        </t-col>
      </t-row>
    </cmp-card>
    <cmp-card title="密码信息" header-bordered>
      <template #actions>
        <t-link theme="primary" @click="onClickShowEditPwd">修改</t-link>
      </template>
      <t-row>
        <t-col :span="3"></t-col>
        <t-col :span="9">
          <t-form :label-width="180" label-align="left">
            <t-form-item label="最后一次修改密码时间">
              <div>{{ userInfo.timeLastPasswordChanged }}</div>
            </t-form-item>
          </t-form>
        </t-col>
      </t-row>
    </cmp-card>
    <cmp-card title="组织信息" header-bordered>
      <template #actions>
        <t-space v-if="orgIsEdit">
          <t-link theme="primary" @click="onClickSaveOrg">保存</t-link>
          <t-link @click="onClickCancelOrg">取消</t-link>
        </t-space>
        <t-link v-else theme="primary" @click="orgIsEdit = true">修改</t-link>
      </template>
      <t-row>
        <t-col :span="3"> </t-col>
        <t-col :span="9">
          <t-form :label-width="180" label-align="left">
            <t-form-item label="组织">
              <bcmp-select-business
                v-if="orgIsEdit"
                v-model="orgInfo.orgId"
                component-type="list"
                type="plant"
                :show-title="false"
                @selection-change="
                  (val) => {
                    orgInfo.orgCode = val.orgCode;
                    orgInfo.orgName = val.orgName;
                  }
                "
              ></bcmp-select-business>
              <div v-else>{{ orgInfo.orgName }}</div>
            </t-form-item>
            <t-form-item label="车间"
              ><bcmp-select-business
                v-if="orgIsEdit"
                v-model="orgInfo.workShopId"
                :parent-id="orgInfo.orgId"
                type="workshop"
                :show-title="false"
                @selection-change="
                  (val) => {
                    orgInfo.workShopCode = val.orgCode;
                    orgInfo.workShopName = val.orgName;
                  }
                "
              ></bcmp-select-business>
              <div v-else>{{ orgInfo.workShopName }}</div>
            </t-form-item>
            <t-form-item label="工作中心"
              ><bcmp-select-business
                v-if="orgIsEdit"
                v-model="orgInfo.workCenterId"
                :parent-id="orgInfo.workShopId"
                type="workcenter"
                :show-title="false"
                @selection-change="
                  (val) => {
                    orgInfo.workCenterCode = val.wcCode;
                    orgInfo.workCenterName = val.wcName;
                  }
                "
              ></bcmp-select-business>
              <div v-else>{{ orgInfo.workCenterName }}</div>
            </t-form-item>
            <t-form-item label="工站"
              ><bcmp-select-business
                v-if="orgIsEdit"
                v-model="orgInfo.workStationId"
                :parent-id="orgInfo.workCenterId"
                type="workstation"
                :show-title="false"
                @selection-change="
                  (val) => {
                    orgInfo.workStationCode = val.workstationCode;
                    orgInfo.workStationName = val.workstationName;
                  }
                "
              ></bcmp-select-business>
              <div v-else>{{ orgInfo.workStationName }}</div>
            </t-form-item>
          </t-form>
        </t-col>
      </t-row>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { api, UserInRoleVO } from '@/api/main';
import UserIcon from '@/assets/assets-user.svg?component';
import { useSettingStore, useUserStore } from '@/store';

const settingStore = useSettingStore();

const userStore = useUserStore();
const userInfo = ref(userStore.userInfo);
const userIsEdit = ref(false);
const onClickSaveUser = async () => {
  const user = await api.user.getItemById(userInfo.value.id);
  user.displayName = userInfo.value.name;
  await api.user.edit(user);
  userIsEdit.value = false;
  userInfo.value = await userStore.getUserInfo();
};

const onClickShowEditPwd = () => {
  settingStore.updateConfig({
    showPasswordPanel: true,
  });
};

const roles = ref<UserInRoleVO[]>([]);
onMounted(async () => {
  roles.value = await api.userInRole.getUserInRoleListByUserId({
    userId: userInfo.value.id,
  });
});

const orgInfo = ref({ ...userStore.currUserOrgInfo });
const orgIsEdit = ref(false);
const onClickSaveOrg = async () => {
  userStore.updateOrg(orgInfo.value);
  orgIsEdit.value = false;
};
const onClickCancelOrg = async () => {
  orgInfo.value = { ...userStore.currUserOrgInfo };
  orgIsEdit.value = false;
};
</script>
<style lang="less" scoped>
.user-image {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 68px;
  top: calc(50% - 50px);
}

.edit-btn {
  position: absolute;
  right: 30px;
  top: calc(50% - 16px);
}

.user-form {
  :deep(.t-form__label) {
    label {
      color: var(--td-text-color-secondary);
    }
  }
}
</style>
