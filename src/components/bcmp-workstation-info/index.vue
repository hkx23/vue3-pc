<template>
  <cmp-card :ghost="true">
    <t-space :size="8">
      <t-button
        shape="square"
        variant="text"
        style="height: 24px; width: 24px; float: right"
        @click="handleNav('/user/index')"
        ><t-icon size="16px" name="system-setting"
      /></t-button>
      <t-breadcrumb :max-item-width="'150'">
        <t-breadcrumbItem> {{ currUserOrgInfo.orgName }} </t-breadcrumbItem>
        <t-breadcrumbItem> {{ currUserOrgInfo.workShopName ?? '车间未设置' }} </t-breadcrumbItem>
        <t-breadcrumbItem>{{ currUserOrgInfo.workCenterName ?? '产线未设置' }}</t-breadcrumbItem>
        <t-breadcrumbItem :max-width="'160'"> {{ currUserOrgInfo.workStationName ?? '工站未设置' }} </t-breadcrumbItem>
      </t-breadcrumb>
    </t-space>
  </cmp-card>
</template>

<script setup lang="tsx" name="BcmpWorkstationInfo">
import { useRouter } from 'vue-router';

import { useUserStore } from '@/store';

const router = useRouter();
const { currUserOrgInfo } = useUserStore();
const handleNav = (url: string) => {
  router.push(url);
};
</script>

<style lang="less" scoped>
:deep(.t-form__label) {
  color: var(--td-gray-color-7);
}

:deep(.t-breadcrumb) {
  padding: 0;
}
</style>
