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
        <t-col :xs="0" :sm="3" :lg="3"> <user-icon class="user-image"></user-icon> </t-col>
        <t-col :xs="12" :sm="9" :lg="5">
          <t-form :label-width="180" label-align="left">
            <t-form-item label="用户名">
              <t-input v-if="userIsEdit" v-model="userInfo.name"></t-input>
              <div v-else>{{ userInfo.name }}</div>
            </t-form-item>
            <t-form-item label="角色">
              <t-space v-if="roles && roles.length > 0">
                <t-tooltip v-for="item in userRoles" :key="item.id" :content="item.roleDesc">
                  <t-tag>{{ item.roleName }}</t-tag>
                </t-tooltip>
              </t-space>
              <div v-else>-</div>
            </t-form-item>
            <t-form-item label="邮箱">
              <div>{{ personInfo.email || '-' }}</div>
            </t-form-item>
            <t-form-item label="手机号">
              <div>{{ personInfo.mobilePhone || '-' }}</div>
            </t-form-item>
            <t-form-item label="最后一次修改资料时间">
              <div>{{ userInfo.timeModified || '-' }}</div>
            </t-form-item>
          </t-form>
        </t-col>
        <t-col :xs="0" :sm="0" :lg="3"> </t-col>
      </t-row>
    </cmp-card>
    <cmp-card title="密码信息" header-bordered>
      <template #actions>
        <t-link theme="primary" @click="onClickShowEditPwd">修改</t-link>
      </template>
      <t-row align="middle" justify="space-around">
        <t-col :xs="0" :sm="3" :lg="3"></t-col>
        <t-col :xs="12" :sm="9" :lg="5">
          <t-form :label-width="180" label-align="left">
            <t-form-item label="最后一次修改密码时间">
              <div>{{ userInfo.timeLastPasswordChanged || '-' }}</div>
            </t-form-item>
          </t-form>
        </t-col>
        <t-col :xs="0" :sm="0" :lg="3"> </t-col>
      </t-row>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { api, Person, UserInRoleVO } from '@/api/main';
import UserIcon from '@/assets/assets-user.svg?component';
import { useSettingStore, useUserStore } from '@/store';

const settingStore = useSettingStore();

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const userIsEdit = ref(false);
const onClickSaveUser = async () => {
  const user = await api.user.getItemById(userInfo.value.id);
  user.displayName = userInfo.value.name;
  await api.user.edit(user);
  userIsEdit.value = false;
  await userStore.getUserInfo();
};

const onClickShowEditPwd = () => {
  settingStore.updateConfig({
    showPasswordPanel: true,
  });
};

const roles = ref<UserInRoleVO[]>([]);
const userRoles = computed(() => roles.value.filter((t) => t.relate && t.eid === userInfo.value.eid));
const personInfo = ref<Person>({});
onMounted(async () => {
  roles.value = await api.userInRole.getUserInRoleListByUserId({
    userId: userInfo.value.id,
  });
  if (userInfo.value.personId) {
    personInfo.value = await api.person.getItemById(userInfo.value.personId);
  }
});
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

  :deep(.t-form__item) {
    margin-bottom: 8px;
  }

  :deep(.t-tag--default) {
    background-color: #edeefb;
  }
}
</style>
