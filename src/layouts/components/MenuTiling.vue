<template>
  <div class="menu-tiling-wrapper">
    <cmp-container :full="true">
      <t-radio-group v-model="layoutValue" size="small" default-value="1" variant="primary-filled" class="layout-icon">
        <t-radio-button value="1" shape="circle" theme="primary">
          <template #default>
            <t-icon name="view-list" size="small" />
          </template>
        </t-radio-button>
        <t-radio-button value="2">
          <template #default>
            <t-icon name="view-list" size="small" style="transform: rotate(90deg)" />
          </template>
        </t-radio-button>
      </t-radio-group>
      <cmp-card flex="auto" :class="layoutValue == '1' ? 'inline-wrapper' : 'vertical-wrapper'">
        <div v-for="item in list" :key="item.path">
          <div v-if="item.path.includes(route.path)">
            <t-list>
              <t-list-item v-for="items in item.children" :key="items['path']">
                <t-list-item-meta>
                  <template #title>
                    {{ renderMenuTitle(items.title) }}
                  </template>
                  <template #description>
                    <div v-for="link in items.children" :key="link['path']">
                      <div @click="() => $router.push(link['path'])">
                        {{ renderMenuTitle(link.title) }}
                      </div>
                    </div>
                  </template>
                </t-list-item-meta>
              </t-list-item>
            </t-list>
          </div>
        </div>
      </cmp-card>
    </cmp-container>
  </div>
</template>
<script setup lang="tsx">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { renderMenuTitle } from '@/router/locale';
import { usePermissionStore } from '@/store';
import type { MenuRoute } from '@/types/interface';

const route = useRoute();
type ListItemType = MenuRoute & { icon?: string };
const layoutValue = ref('1');
const permissionStore = usePermissionStore();
const { routers: menuRouters } = storeToRefs(permissionStore);

const list = computed(() => {
  return getMenuList(menuRouters.value as MenuRoute[]);
});

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
</script>

<style lang="less" scoped>
.vertical-wrapper {
  :deep .t-list__inner {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    height: calc(100vh - 150px);
    transform: scale(calc(100vh / var(--original-height)));
  }

  :deep .t-list-item {
    flex: 0 1 auto;
    width: 189px;
    border-right: 1px solid #eeeef0;
    justify-content: flex-start;
    align-items: flex-start;
  }

  :deep .t-list-item__meta-description {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    > div {
      width: 100%;
      // padding: 5px 0;
      height: var(--td-comp-size-m);
      line-height: var(--td-comp-size-m);
      cursor: pointer;

      :hover {
        color: var(--td-brand-color);
      }
    }
  }
}

.inline-wrapper {
  :deep .t-list-item {
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
  }

  :deep .t-list-item__meta {
    width: 100%;
  }

  :deep .t-list-item__meta-content {
    width: 100%;
  }

  :deep .t-list-item__meta-title {
    border-bottom: 1px solid #eeeef0;
    padding-bottom: 5px;
  }

  :deep .t-list-item__meta-description {
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
    justify-items: start;

    > div {
      width: 145px;
      cursor: pointer;

      :hover {
        color: var(--td-brand-color);
      }
    }
  }
}

.menu-tiling-wrapper {
  height: 100%;
  position: relative;
}

.layout-icon {
  position: absolute;
  right: 29px;
  top: 19px;
  z-index: 99;
}
</style>
