<template>
  <div v-if="layout === 'side'" class="header-menu-search">
    <t-input
      :class="['header-search', { 'hover-active': isSearchFocus }]"
      :placeholder="$t('layout.searchPlaceholder')"
      @blur="changeSearchFocus(false)"
      @focus="changeSearchFocus(true)"
    >
      <template #prefix-icon>
        <t-icon class="icon" name="search" size="16" />
      </template>
    </t-input>
  </div>

  <div v-else class="header-menu-search-left">
    <t-button
      :class="{ 'search-icon-hide': isSearchFocus }"
      theme="default"
      shape="square"
      variant="text"
      @click="changeSearchFocus(true)"
    >
      <t-icon name="search" />
    </t-button>
    <t-auto-complete
      v-model="searchData"
      :options="flattenRouters"
      :class="['header-search', { 'width-zero': !isSearchFocus }]"
      placeholder="输入要搜索内容"
      :autofocus="isSearchFocus"
      @blur="changeSearchFocus(false)"
    >
      <template #prefix-icon>
        <t-icon name="search" size="16" />
      </template>

      <template #option="{ option }">
        <div @click="onClickMenu(option)">
          {{ option.text }}
        </div>
      </template>
    </t-auto-complete>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { RouteItem } from '@/api/model/permissionModel';
import { renderMenuTitle } from '@/router/locale';
import { usePermissionStore } from '@/store';

defineProps({
  layout: String,
});

const permissionStore = usePermissionStore();
const { routers } = storeToRefs(permissionStore);

interface menuItem {
  label: string;
  text: string;
}
const flattenRouters = ref<menuItem[]>([]);
const flattenRouterObj: { [key: string]: RouteItem } = {};

const flatten = (routers: RouteItem[]) => {
  routers?.forEach((router) => {
    if (router?.children && router.children.length > 0) {
      flatten(router?.children);
    } else {
      flattenRouters.value.push({
        label: router.path,
        text: renderMenuTitle(router.meta?.title || router.name || router.path),
      });
      flattenRouterObj[router.path] = router;
    }
  });
};

flatten(routers.value);

const isSearchFocus = ref(false);
const searchData = ref('');
const changeSearchFocus = (value: boolean) => {
  if (!value) {
    searchData.value = '';
  }
  isSearchFocus.value = value;
};
const router = useRouter();

const onClickMenu = (option: menuItem) => {
  const route = flattenRouterObj[option.label];
  router.push(route);
};
</script>
<style lang="less" scoped>
.header-menu-search {
  display: flex;
  margin-left: 16px;

  .hover-active {
    background: var(--td-bg-color-secondarycontainer);
  }

  .t-icon {
    color: var(--td-text-color-primary) !important;
  }

  .header-search {
    :deep(.t-input) {
      border: none;
      outline: none;
      box-shadow: none;
      transition: background @anim-duration-base linear;

      .t-input__inner {
        transition: background @anim-duration-base linear;
        background: none;
      }

      &:hover {
        background: var(--td-bg-color-secondarycontainer);

        .t-input__inner {
          background: var(--td-bg-color-secondarycontainer);
        }
      }
    }
  }
}

.t-button {
  margin: 0 8px;
  transition: opacity @anim-duration-base @anim-time-fn-easing;

  .t-icon {
    font-size: 20px;

    &.general {
      margin-right: 16px;
    }
  }
}

.search-icon-hide {
  opacity: 0;
}

.header-menu-search-left {
  display: flex;
  align-items: center;

  .header-search {
    width: 200px;
    transition: width @anim-duration-base @anim-time-fn-easing;

    :deep(.t-input) {
      border: 0;

      &:focus {
        box-shadow: none;
      }
    }

    &.width-zero {
      width: 0;
      opacity: 0;
    }
  }
}
</style>
