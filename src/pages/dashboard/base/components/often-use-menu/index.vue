<template>
  <cmp-card v-model:pagination="pageUI" :full="true" height="100%" :title="t('often-use-menu.title')">
    <div class="recommend">
      <div v-for="(item, index) in favList" :key="index" class="recommend-item" @click="onModuleClick(item)">
        <div :class="randomNumber()">
          <t-icon :name="item.meta && item.meta.iconName" />
        </div>
        <div class="recomend-text">
          <div>{{ renderMenuTitle(item.meta.title) }}</div>
        </div>
      </div>
    </div>
    <t-divider></t-divider>
    <div class="recommend-history">
      <span class="recommend-history-title">{{ t('often-use-menu.subTitle') }}</span>
      <div
        v-for="(item, index) in historyList"
        :key="index"
        class="recommend-history-item"
        @click="onModuleClick(item)"
      >
        <div class="recomend-history-text">
          <div>{{ renderMenuTitle(item.meta.title) }} <t-icon name="add-circle" /></div>
        </div>
      </div>
    </div>
  </cmp-card>
</template>

<script setup lang="ts">
import {} from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { usePage } from '@/hooks/modules/page';
import { componentCondition } from '@/modules/daily/pages/conferenceLayout/components/components';
import { renderMenuTitle } from '@/router/locale';
import { getUserTabsHistoryStore, useUserStore } from '@/store';
import type { TRouterInfo } from '@/types/interface';

import { useLang } from './lang';

const { t } = useLang();
const { pageUI } = usePage();
const userStore = useUserStore();
const router = useRouter();
const recommendList = ref<TRouterInfo[]>([]);
const userTabsHistoryStore = getUserTabsHistoryStore();

const favList = computed(() => {
  return getFavList();
});

const historyList = computed(() => {
  return getHistoryList();
});

const getHistoryList = () => {
  recommendList.value = userTabsHistoryStore.userTabsHistory;
  // 排除为空路径的菜单
  if (recommendList.value && recommendList.value.length > 0) {
    recommendList.value = recommendList.value.filter((item) => item.path !== '');
  }
  return recommendList.value;
};

const getFavList = () => {
  // 查询已收藏菜单的信息
  const router = useRouter();
  const totalList = [] as TRouterInfo[];
  const tabRouters = router.getRoutes();
  if (tabRouters) {
    userStore.userInfo.favorites.forEach((item2) => {
      const routeInfo = tabRouters.find((item1) => item1.meta.id === item2.moduleId);
      if (routeInfo) {
        totalList.push(routeInfo);
      }
    });
  }
  return totalList;
};

const randomNumber = () => {
  const color = Math.floor(Math.random() * 3) + 1;
  return `recommend-icon recommend-icon-color${color}`;
};

const onModuleClick = (item: TRouterInfo) => {
  router.push(item.path);
};

// 刷新事件
const refresh = async (condition: componentCondition) => {
  console.log(`refreshCondition`, condition);
};

defineExpose({
  refresh,
});
</script>

<style lang="less" scoped>
/* 可添加组件样式 */
.recommend {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 65px;

  .t-icon {
    height: 1.5em;
  }
}

.recommend-history {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 40px;

  .t-icon {
    height: 1.5em;
  }
}

:deep(.t-card__body) {
  overflow: hidden !important;
  padding: 0 var(--td-comp-paddingLR-xl) !important;
}

:deep(.t-divider) {
  margin: 5px 0;
}

.recommend-item {
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;
  color: #161c24;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  padding: 8px 20px;
}

.recommend-item:hover {
  background-color: var(--td-bg-color-page);
  border-radius: 4px;
}

.recomend-text {
  margin-top: 4px;

  /** 文本1 */
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 17.38px;
  text-align: center;
  vertical-align: middle;

  :deep(.t-button) {
    height: 24px;
  }
}

.recommend-history-title {
  width: fit-content;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
}

.recommend-history-item {
  background-color: var(--td-bg-color-page);
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;
  color: #161c24;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  padding: 4px 8px;
  margin: 8px;
}

.recommend-history-item:hover {
  background: linear-gradient(180deg, rgb(70 92 229 / 100%) 0%, rgb(85 167 250 / 100%) 100%);
  border-radius: 4px;
  color: white;
}

.recomend-history-text {
  /** 文本1 */
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 17.38px;
  text-align: center;
  vertical-align: middle;

  :deep(.t-button) {
    height: 24px;
  }
}

.recomend-text:hover {
  background-color: var(--td-bg-color-page);
  border-radius: 4px;
}

.recommend-icon {
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  opacity: 1;
  border-radius: 4px;
  margin-right: 2px;
  padding-left: 6px;
  color: white;
  font-size: 11px;
}

.recommend-icon-color1 {
  background: linear-gradient(180deg, rgb(70 92 229 / 100%) 0%, rgb(85 167 250 / 100%) 100%);
}

.recommend-icon-color2 {
  background: linear-gradient(180deg, rgb(73 191 110 / 100%) 0%, rgb(142 224 103 / 100%) 100%);
}

.recommend-icon-color3 {
  background: linear-gradient(180deg, rgb(240 146 54 / 100%) 0%, rgb(240 193 53 / 100%) 100%);
}
</style>
