<template>
  <div>
    <template v-for="item in list" :key="item.path">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item v-if="getHref(item)" :name="item.path" :value="getPath(item)" @click="openHref(getHref(item)[0])">
          <template #icon>
            <component :is="menuIcon(item)" v-if="item.icon" class="t-icon"></component>
            <template v-else>
              <div v-if="showAutoIcon" class="menu-title-icon">
                <t-avatar size="small" shape="round">{{ renderMenuTitle(item.title) }}</t-avatar>
              </div>
            </template>
          </template>
          {{ renderMenuTitle(item.title) }}
        </t-menu-item>
        <t-menu-item v-else :name="item.path" :value="getPath(item)" :to="item.path">
          <template #icon>
            <component :is="menuIcon(item)" v-if="item.icon" class="t-icon"></component>
          </template>
          {{ renderMenuTitle(item.title) }}
        </t-menu-item>
      </template>
      <t-submenu v-else :name="item.path" :value="item.path" :title="renderMenuTitle(item.title)">
        <template #icon>
          <component :is="menuIcon(item)" v-if="item.icon" class="t-icon"></component>
          <template v-else>
            <div v-if="showAutoIcon" class="menu-title-icon">
              <t-avatar size="small" shape="round">{{ renderMenuTitle(item.title) }}</t-avatar>
            </div>
          </template>
        </template>
        <menu-content v-if="item.children" :nav-data="item.children" />
      </t-submenu>
    </template>
  </div>
</template>
<script setup lang="tsx">
import { isEmpty } from 'lodash';
import type { PropType } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { getActive } from '@/router';
import { renderMenuTitle } from '@/router/locale';
import { useSettingStore } from '@/store';
import type { MenuRoute } from '@/types/interface';

const route = useRoute();

const showAutoIcon = computed(() => {
  const setting = useSettingStore();
  return setting.isSidebarCompact && setting.splitMenu && setting.layout === 'mix';
});

type ListItemType = MenuRoute & { icon?: string };

const props = defineProps({
  navData: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
});

const active = computed(() => getActive(route));

const list = computed(() => {
  const { navData } = props;
  return getMenuList(navData);
});

const menuIcon = (item: ListItemType) => {
  if (typeof item.icon === 'string' && !isEmpty(item.icon)) return <t-icon name={item.icon} />;
  const RenderIcon = item.icon;
  return RenderIcon;
};

const getMenuList = (list: MenuRoute[], basePath?: string): ListItemType[] => {
  if (!list || list.length === 0) {
    return [];
  }
  // 如果meta中有orderNo则按照从小到大排序
  list.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
  });
  return list
    .map((item) => {
      const path = basePath && !item.path.includes(basePath) ? `${basePath}/${item.path}` : item.path;

      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon,
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
      };
    })
    .filter((item) => item.meta && item.meta.hidden !== true);
};

const getHref = (item: MenuRoute) => {
  const { frameSrc, frameBlank } = item.meta;
  if (frameSrc && frameBlank) {
    return frameSrc.match(/(http|https):\/\/([\w.]+\/?)\S*/);
  }
  return null;
};

const getPath = (item: ListItemType) => {
  const activeLevel = active.value.split('/').length;
  const pathLevel = item.path.split('/').length;
  if (activeLevel > pathLevel && active.value.startsWith(item.path)) {
    return active.value;
  }

  if (active.value === item.path) {
    return active.value;
  }

  return item.meta?.single ? item.redirect : item.path;
};

const openHref = (url: string) => {
  window.open(url);
};
</script>

<style lang="less" scoped>
.menu-title-icon {
  position: absolute;
  width: 100%;
  height: 100%;

  :deep(.t-avatar) {
    width: 100%;
    height: 100%;
    color: var(--td-text-color-secondary);
    background: transparent;

    span {
      display: block !important;
    }
  }
}

// .t-menu__item {
//   color: white;
// }
// :deep(.header-menu) {
//   .t-menu__item.t-is-active {
//     background-color: var(--td-brand-color-7) !important;
//     color: white !important;
//   }
// }
:deep(.t-menu__item.t-is-active) {
  color: var(--td-brand-color);
  background-color: var(--td-brand-color-light);
}

.t-default-menu .t-menu__item .t-icon {
  color: var(--td-text-color-secondary);
}
// .t-default-menu .t-menu__item.t-is-opened:hover .t-icon {
//   color: var(--td-text-color-primary);
// }
// .t-default-menu .t-menu__item.t-is-active .t-icon {
//   color: white;
// }

// .t-menu__item:hover:not(.t-is-active, .t-is-opened, .t-is-disabled) {
//   background-color: var(--td-brand-color-3);;
// }
.t-menu__item:hover:not(.t-is-active, .t-is-opened, .t-is-disabled) {
  background-color: var(--td-brand-color-3);
}
</style>
