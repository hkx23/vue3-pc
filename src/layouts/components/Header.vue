<template>
  <div :class="layoutCls">
    <t-head-menu :class="menuCls" :theme="menuTheme" expand-type="popup" :value="active">
      <template #logo>
        <span v-if="showLogo" class="header-logo-container" @click="handleNav('/dashboard/base')">
          <logo-full class="t-logo" />
        </span>
        <div v-else class="header-operate-left">
          <t-button theme="default" shape="square" variant="text" @click="changeCollapsed">
            <t-icon class="collapsed-icon" name="view-list" />
          </t-button>
          <search :layout="layout" />
        </div>
      </template>
      <template v-if="layout !== 'side'" #default>
        <menu-content class="header-menu" :nav-data="menu" />
      </template>
      <template #operations>
        <div class="operations-container">
          <!-- 搜索框 -->
          <search v-if="layout !== 'side'" :layout="layout" />

          <!-- 全局通知 -->
          <notice />

          <t-button theme="default" shape="square" variant="text" @click="onClickFullScreen">
            <fullscreen2-icon size="16" />
          </t-button>

          <t-dropdown trigger="click">
            <t-button theme="default" shape="square" variant="text">
              <translate-icon />
            </t-button>
            <t-dropdown-menu>
              <t-dropdown-item v-for="(lang, index) in langList" :key="index" :value="lang.value" @click="changeLang">{{
                lang.content
              }}</t-dropdown-item></t-dropdown-menu
            >
          </t-dropdown>
          <t-dropdown :min-column-width="140" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleNav('/user/index')">
                  <user-circle-icon />{{ $t('layout.header.user') }}
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="onChangePassword">
                  <user-password-icon />{{ $t('layout.header.changePassword') }}
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="onClickConfigurationWorkbench">
                  <edit2-icon />{{ $t('layout.header.configurationWorkbench') }}
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="onClickToggleSettingPanel">
                  <setting-icon />{{ $t('layout.header.themeSettings') }}
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleLogout">
                  <poweroff-icon />{{ $t('layout.header.signOut') }}
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text">
              <template #icon>
                <t-icon class="header-user-avatar" name="user-circle" />
              </template>
              <div class="header-user-account">{{ user.userInfo.name }}</div>
              <template #suffix><chevron-down-icon /></template>
            </t-button>
          </t-dropdown>
        </div>
      </template>
    </t-head-menu>
  </div>
  <t-dialog v-model:visible="settingStore.showPasswordPanel" header="修改密码" :on-confirm="onConfirmForm">
    <change-password-form ref="formRef" />
  </t-dialog>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  Edit2Icon,
  Fullscreen2Icon,
  PoweroffIcon,
  SettingIcon,
  TranslateIcon,
  UserCircleIcon,
  UserPasswordIcon,
} from 'tdesign-icons-vue-next';
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';
import { useFullscreen } from 'vue-hooks-plus';
import { useRouter } from 'vue-router';

import LogoFull from '@/assets/assets-logo-full.svg?component';
import { prefix } from '@/config/global';
import { langList } from '@/locales/index';
import { useLocale } from '@/locales/useLocale';
import ChangePasswordForm from '@/pages/login/components/ChangePasswordForm.vue';
import { getActive } from '@/router';
import { useSettingStore, useUserStore } from '@/store';
import type { MenuRoute } from '@/types/interface';

import MenuContent from './MenuContent.vue';
import Notice from './Notice.vue';
import Search from './Search.vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
  layout: {
    type: String,
    default: 'top',
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
  isFixed: {
    type: Boolean,
    default: false,
  },
  isCompact: {
    type: Boolean,
    default: false,
  },
  maxLevel: {
    type: Number,
    default: 3,
  },
});

const router = useRouter();
const settingStore = useSettingStore();
const user = useUserStore();

const onClickToggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true,
  });
};

const onClickConfigurationWorkbench = () => {
  if (!settingStore.enableEditingMode) {
    router.push({
      path: '/dashboard',
    });
  }

  settingStore.updateConfig({
    enableEditingMode: !settingStore.enableEditingMode,
  });
};

const active = computed(() => getActive());

const layoutCls = computed(() => [`${prefix}-header-layout`]);

const menuCls = computed(() => {
  const { isFixed, layout, isCompact } = props;
  return [
    {
      [`${prefix}-header-menu`]: !isFixed,
      [`${prefix}-header-menu-fixed`]: isFixed,
      [`${prefix}-header-menu-fixed-side`]: layout === 'side' && isFixed,
      [`${prefix}-header-menu-fixed-side-compact`]: layout === 'side' && isFixed && isCompact,
    },
  ];
});
const menuTheme = computed(() => props.theme as 'light' | 'dark');
// const menuTheme = 'dark';

// 切换语言
const { changeLocale } = useLocale();
const changeLang = ({ value: lang }: { value: string }) => {
  changeLocale(lang);
};

const changeCollapsed = () => {
  settingStore.updateConfig({
    isSidebarCompact: !settingStore.isSidebarCompact,
  });
};

const handleNav = (url: string) => {
  router.push(url);
};

const handleLogout = () => {
  router.push({
    path: '/login',
    query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) },
  });
};

const [, { enterFullscreen }] = useFullscreen(() => document.querySelector('main.t-layout__content'));
const onClickFullScreen = () => {
  enterFullscreen();
};

const formRef = ref(null);
watch(
  () => settingStore.showPasswordPanel,
  (val) => {
    if (val) {
      const { reset } = formRef.value;
      reset();
    }
  },
);
const onChangePassword = () => {
  // const { reset } = formRef.value;
  // reset();
  settingStore.updateConfig({
    showPasswordPanel: true,
  });
};
const onConfirmForm = () => {
  const { submit } = formRef.value;
  submit().then(() => {
    settingStore.updateConfig({
      showPasswordPanel: false,
    });
    // formVisible.value = false;
  });
};
</script>
<style lang="less" scoped>
.@{starter-prefix}-header {
  &-menu-fixed {
    position: fixed;
    top: 0;
    z-index: 1001;

    :deep(.t-head-menu__inner) {
      padding-right: var(--td-comp-margin-xl);
      // height: var(--td-comp-size-xl);
    }

    &-side {
      left: 232px;
      right: 0;
      z-index: 10;
      width: auto;
      transition: all 0.3s;

      &-compact {
        left: 64px;
      }
    }
  }

  &-logo-container {
    cursor: pointer;
    display: inline-flex;
  }
}

.header-menu {
  flex: 1 1 1;
  display: inline-flex;

  :deep(.t-menu__item) {
    min-width: unset;
    color: white;

    &.t-is-active {
      background-color: var(--td-brand-color-7) !important;
    }
  }

  font-size: 15px; // add by Neo
  font-weight: bold; // add by Neo
}

.operations-container {
  display: flex;
  align-items: center;

  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-button {
    margin-left: var(--td-comp-margin-l);
    color: white;
  }

  .t-button--variant-text {
    color: white;
  }

  :deep(.t-button--shape-square) {
    color: white;
  }
}

.header-operate-left {
  display: flex;
  align-items: normal;
  line-height: 0;
  padding-left: var(--td-comp-margin-s);
  color: white;
}

.header-logo-container {
  width: 184px;
  height: 32px;
  display: flex;
  margin-left: 24px;
  color: var(--td-text-color-primary);

  .t-logo {
    width: 100%;
    height: 100%;
    fill: white;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.header-user-account {
  display: inline-flex;
  align-items: center;
  // color: var(--td-text-color-primary);
  color: white;
}

:deep(.t-head-menu__inner) {
  border-bottom: 1px solid var(--td-component-stroke);
}

.t-menu--light {
  .header-user-account {
    color: white;
    // color: var(--td-text-color-primary);
  }
}

.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
  }

  .header-user-account {
    color: rgb(255 255 255 / 55%);
  }
}

.operations-dropdown-container-item {
  width: 100%;
  display: flex;
  align-items: center;

  :deep(.t-dropdown__item-text) {
    display: flex;
    align-items: center;
  }

  .t-icon {
    font-size: var(--td-comp-size-xxxs);
    margin-right: var(--td-comp-margin-s);
  }

  :deep(.t-dropdown__item) {
    width: 100%;
    margin-bottom: 0;
  }

  &:last-child {
    :deep(.t-dropdown__item) {
      margin-bottom: 8px;
    }
  }
}

.t-button--variant-text .t-button--variant-text {
  color: white;
}

:deep(
    .operations-container .t-button--variant-text:hover,
    .operations-container .t-button--variant-text:focus-visible
  ) {
  background-color: var(--td-brand-color-3);
}

:deep(.header-menu .t-menu__item:hover:not(.t-is-active, .t-is-opened, .t-is-disabled)) {
  background-color: var(--td-brand-color-3);
}

.t-button--variant-text:hover,
.t-button--variant-text:focus-visible {
  background-color: var(--td-brand-color-7);
}

.t-menu__item.t-is-active {
  // color: var(--td-brand-color);
  background-color: #2a36cf;
  color: white;
}
</style>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.operations-dropdown-container-item {
  .t-dropdown__item-text {
    display: flex;
    align-items: center;
  }
}
</style>
