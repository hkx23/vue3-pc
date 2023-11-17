<template>
  <div>
    <t-row justify="space-between">
      <t-col>
        <div>
          <t-input v-model="keyword" label="客户信息/名称：" placeholder="请输入" clearable />
        </div>
      </t-col>
      <t-col flex="250px">
        <div>
          <t-button theme="default" variant="base">查询</t-button>
          <t-button theme="default" variant="base">重置</t-button>
          <span class="save-filter">保存筛选</span>
          <span>展开</span><t-icon name="chevron-up"></t-icon>
        </div>
      </t-col>
    </t-row>
    <t-row> <t-table row-key="index" :columns="columns" :data="data" drag-sort="row" lazy-load></t-table></t-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref('');
const columns = ref([]);
const data = ref();
</script>

<style lang="less" scoped>
.save-filter {
  color: #3b96ff;
}
</style>
