<template>
  <div :class="sideNavCls">
    <t-menu :class="menuCls" :theme="theme" :value="active" :collapsed="collapsed" :default-expanded="defaultExpanded">
      <template #logo>
        <span v-if="showLogo" :class="`${prefix}-side-nav-logo-wrapper`" @click="goHome">
          <component :is="getLogo()" :class="`${prefix}-side-nav-logo-${collapsed ? 't' : 'tdesign'}-logo`" />
        </span>
      </template>
      <menu-content :nav-data="menu" />
      <template #operations>
        <t-button v-if="showCollapsedButton" variant="text" shape="square" @click="onChangeCollapsed">
          <template #icon><t-icon name="view-list" /></template>
        </t-button>
        <t-dropdown :options="orgOptions" :max-column-width="250" @click="onClickOrg">
          <t-button variant="text"> {{ !collapsed ? orgName : '' }}</t-button>
        </t-dropdown>
      </template>
    </t-menu>
    <div :class="`${prefix}-side-nav-placeholder${collapsed ? '-hidden' : ''}`"></div>
  </div>
</template>

<script setup lang="ts">
import union from 'lodash/union';
import { DialogPlugin } from 'tdesign-vue-next';
import type { PropType } from 'vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import AssetLogoFull from '@/assets/assets-logo-full.svg?component';
import AssetLogo from '@/assets/assets-t-logo.svg?component';
import { prefix } from '@/config/global';
import { getActive, getRoutesExpanded } from '@/router';
import { useSettingStore, useUserStore } from '@/store';
import type { MenuRoute } from '@/types/interface';

import MenuContent from './MenuContent.vue';

const MIN_POINT = 992 - 1;

const props = defineProps({
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
  showLogo: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  isFixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  layout: {
    type: String as PropType<string>,
    default: '',
  },
  headerHeight: {
    type: String as PropType<string>,
    default: '64px',
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  isCompact: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const collapsed = computed(() => useSettingStore().isSidebarCompact);
const showCollapsedButton = computed(() => {
  const { isFixed, layout } = props;
  return layout === 'mix' && isFixed;
});

const active = computed(() => getActive());

const defaultExpanded = computed(() => {
  const path = getActive();
  const parentPath = path.substring(0, path.lastIndexOf('/'));
  const expanded = getRoutesExpanded();
  return union(expanded, parentPath === '' ? [] : [parentPath]);
});

const sideNavCls = computed(() => {
  const { isCompact } = props;
  return [
    `${prefix}-sidebar-layout`,
    {
      [`${prefix}-sidebar-compact`]: isCompact,
    },
  ];
});

const menuCls = computed(() => {
  const { showLogo, isFixed, layout } = props;
  return [
    `${prefix}-side-nav`,
    {
      [`${prefix}-side-nav-no-logo`]: !showLogo,
      [`${prefix}-side-nav-no-fixed`]: !isFixed,
      [`${prefix}-side-nav-mix-fixed`]: layout === 'mix' && isFixed,
    },
  ];
});

const router = useRouter();
const settingStore = useSettingStore();
const userStore = useUserStore();

const orgName = computed(() => {
  const { orgs } = userStore.userInfo;
  let name = userStore.userInfo.orgId;
  for (const item of orgs) {
    if (item.id === name) {
      name = `${item.name} - ${item.code}`;
      break;
    }
  }
  return name;
});

const orgOptions = computed(() => {
  const { orgs } = userStore.userInfo;
  return orgs.map((item) => ({
    content: `${item.name} - ${item.code}`,
    value: item.id,
  }));
});

const onClickOrg = (data) => {
  const alertDia = DialogPlugin({
    theme: 'warning',
    header: '警告',
    body: '切换组织将会导致页面刷新，请确认数据是否保存！',
    onConfirm: () => {
      userStore.setOrgId(data.value);
      alertDia.destroy();
      window.location.reload();
    },
  });
};

const autoCollapsed = () => {
  const isCompact = window.innerWidth <= MIN_POINT;
  settingStore.updateConfig({
    isSidebarCompact: isCompact,
  });
};

onMounted(() => {
  autoCollapsed();
  window.onresize = () => {
    autoCollapsed();
  };
});

const goHome = () => {
  router.push('/dashboard/base');
};

const getLogo = () => {
  if (collapsed.value) return AssetLogo;
  return AssetLogoFull;
};

const onChangeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !settingStore.isSidebarCompact,
  });
};
</script>

<style lang="less" scoped></style>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.@{starter-prefix}-sidebar-layout{
  .@{starter-prefix}-side-nav-mix-fixed{
    .t-default-menu__inner {
      height: calc(100vh - var(--td-comp-size-xxxl));
    }
  }
}
</style>
