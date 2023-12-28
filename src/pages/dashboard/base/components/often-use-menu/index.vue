<template>
  <div v-show="cRecommendList && cRecommendList.length > 0">
    <t-card class="recommend">
      <div v-for="(item, index) in cRecommendList" :key="index" class="recommend-item" @click="onModuleClick(item)">
        <div :class="randomNumber()">
          <t-icon :name="item.meta && item.meta.iconName" />
        </div>
        <div class="recomend-text">
          <t-button class="recomend-btn" variant="text">{{ renderMenuTitle(item.meta.title) }}</t-button>
          <!-- <span>{{ renderMenuTitle(item.meta.title) }}</span> -->
        </div>
      </div>
      <!-- <template #footer>
        <div class="recommend-more">
          <t-icon name="chevron-right" />
        </div>
      </template> -->
    </t-card>
  </div>
</template>

<script setup lang="ts">
import {} from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { renderMenuTitle } from '@/router/locale';
import { getUserTabsHistoryStore, useUserStore } from '@/store';
import type { TRouterInfo } from '@/types/interface';

const userStore = useUserStore();
const router = useRouter();
const recommendList = ref<TRouterInfo[]>([]);
const userTabsHistoryStore = getUserTabsHistoryStore();

const cRecommendList = computed(() => {
  return Init();
});

const Init = () => {
  recommendList.value = userTabsHistoryStore.userTabsHistory;
  // 排除为空路径的菜单
  if (recommendList.value && recommendList.value.length > 0) {
    recommendList.value = recommendList.value.filter((item) => item.path !== '');
  }

  // 查询已收藏菜单的信息
  const router = useRouter();
  let totalList = [] as TRouterInfo[];
  totalList = recommendList.value;
  const tabRouters = router.getRoutes();
  if (tabRouters) {
    userStore.userInfo.favorites.forEach((item2) => {
      const routeInfo = tabRouters.find((item1) => item1.meta.id === item2.moduleId);
      if (routeInfo) {
        totalList.push(routeInfo);
      }
    });
    if (totalList) {
      totalList = recommendList.value.concat(...totalList);
    }
  }

  // 历史菜单与收藏菜单去重
  recommendList.value = totalList.reduce((acc, cur) => {
    const index = acc.findIndex((item) => item.meta.id === cur.meta.id);
    if (index === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);

  return recommendList.value;
};

const randomNumber = () => {
  const color = Math.floor(Math.random() * 3) + 1;
  return `recommend-icon recommend-icon-color${color}`;
};

const onModuleClick = (item: TRouterInfo) => {
  router.push(item.path);
};
</script>

<style lang="less" scoped>
/* 可添加组件样式 */
.recommend {
  width: 100%;
  height: 48px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  .t-icon {
    height: 1.5em;
  }
}

.recommend-item {
  width: fit-content;
  border-radius: 4px;
  cursor: pointer;
  color: #161c24;
  display: inline-flex;
  margin-right: 16px;
  margin-bottom: 10px;
}

/deep/ .t-card__body {
  flex: 1;
}

/deep/ .t-card__footer {
  cursor: pointer;
  flex: 0;
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

.recomend-text:hover {
  background-color: var(--td-bg-color-page);
  border-radius: 4px;

  /deep/ .t-button {
    height: 24px;
  }
}

.recomend-btn {
  height: 24px;
}
</style>
