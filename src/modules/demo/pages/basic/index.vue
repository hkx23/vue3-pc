<template>
  <div class="page_container">
    <p class="font-red">样式示例</p>
    <p>多语言示例：</p>
    <div>
      <t-button @click="onClickChangeLang('zh-CN')">切换中文</t-button>
      <t-button @click="onClickChangeLang('en-US')">切换英文</t-button>
    </div>
    <div>{{ t('basic.hello') }}</div>

    <p>路由示例：</p>
    <div>
      <t-button @click="onClickGoPage1">切换页面1</t-button>
      <t-button @click="onClickGoPage2">切换页面2</t-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterView, useRouter } from 'vue-router';

import { useLang } from './lang';
// 使用多语言
const { t } = useLang();
const { locale } = useI18n();
const onClickChangeLang = (lang: string) => {
  locale.value = lang;
};

// 使用路由
const router = useRouter();
const onClickGoPage1 = () => {
  router.push({
    name: 'page1',
    params: { id: '112233' },
  });
};
const onClickGoPage2 = () => {
  router.push({
    path: '/basic/page2',
    query: { code: 'private' },
  });
};
</script>

<style lang="less" scoped>
// 页面范围类样式
p {
  margin-bottom: 30px;
  font-size: 24px;
}

.page_container {
  margin: 0 auto;
  width: 500px;
  padding: 30px;
}

.font-red {
  color: red;
}
</style>
