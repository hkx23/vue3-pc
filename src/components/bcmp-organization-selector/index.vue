<!--
  FileName: bcmp-orgainization-selector
  组织选择器
-->
<template>
  <t-space direction="vertical">
    <t-select
      v-model="selectedValue"
      placeholder="Please choice an enterprise"
      filterable
      :popup-props="{ overlayClassName: 'cmp-selector' }"
    >
      <t-option v-for="item in datas" :key="item.code" :value="item.id" :label="item.name">
        <div class="item-title">
          <img :src="item.image" />
          <div class="enterprise_code">{{ item.code }}</div>
          <div class="enterprise_name">{{ item.name }}</div>
        </div>
        <div class="enterprise_desc">{{ item.description }}</div>
      </t-option>
    </t-select>
  </t-space>
</template>

<!-- Component Scripts -->

<script setup lang="tsx">
// import image_enterprise from 'src/assets/assets-enterprise.svg';
// import image_factory from 'src/assets/assets-factory.svg';
// import image_productionline from 'src/assets/assets-productionline.svg';
// import image_workshop from 'src/assets/assets-workshop.svg';
import { ref } from 'vue';

const datas = [
  {
    code: '3901305',
    name: '惠州比亚迪电池制造有限公司',
    id: '1',
    description: '比亚迪电池工厂，座落于惠州市惠阳区大亚湾，这个美丽的城市。',
    image: './assets-enterprise.svg',
  },
  {
    code: '2500137',
    name: '惠州光华机电有限公司',
    id: '2',
    description: '光华机电是一家机械厂，位于惠州西湖风景区右侧。',
    image: './assets-factory.svg',
  },
  {
    code: '3800123',
    name: '深圳远大地产有限公司',
    id: '3',
    description: '主营房地产业务。',
    image: './assets-productionline.svg',
  },
];

const selectedValue = ref('');
</script>

<!-- 
    Component Style
    .com-selector       面板的自定义样式
    .data-item-panel    数据项面板样式

-->
<style scoped>
.cmp-selector {
  width: 400px;
}

.cmp-selector .t-select-option {
  height: 100%;
  padding: 6px;
}

.item-title {
  display: flex;
  align-items: center;
  height: 32px;
}

.item-title > img {
  max-width: 16px;
  max-height: 16px;
  margin-right: 5px;
}

.enterprise_code {
  font-size: 14px;
  text-decoration: underline;
  color: rgb(70 70 70 / 94%);
  margin-right: 5px;
}

.enterprise_name {
  font-size: 14px;
  font-weight: bold;
}

.enterprise_desc {
  font-size: 12px;
  white-space: normal;
  color: var(--td-text-color-secondary);
}
</style>
