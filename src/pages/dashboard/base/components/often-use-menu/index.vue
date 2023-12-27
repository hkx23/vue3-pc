<template>
  <div v-show="recommendList && recommendList.length > 0">
    <t-card class="recommend">
      <div v-for="(item, index) in recommendList" :key="index" class="recommend-item" @click="onModuleClick(item)">
        <div class="recommend-icon">
          <t-icon :name="item.meta && item.meta.iconName" />
        </div>
        <span>{{ renderMenuTitle(item.meta.title) }}</span>
      </div>
      <template #footer>
        <div class="recommend-more">
          <t-icon name="chevron-right" />
        </div>
      </template>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import {} from 'tdesign-icons-vue-next';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { renderMenuTitle } from '@/router/locale';
import { getUserTabsHistoryStore } from '@/store';
import type { TRouterInfo } from '@/types/interface';

const router = useRouter();
const recommendList = ref<TRouterInfo[]>([]);

const userTabsHistoryStore = getUserTabsHistoryStore();
const curLanguage = ref('zh-CN');
const Init = async () => {
  curLanguage.value = fw.getLanguage();
  recommendList.value = userTabsHistoryStore.userTabsHistory;
  if (recommendList.value && recommendList.value.length > 0) {
    recommendList.value = recommendList.value.filter((item) => item.path !== '');
  }
};

const onModuleClick = (item: TRouterInfo) => {
  router.push(item.path);
};

onMounted(async () => {
  Init();
});
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
</style>
