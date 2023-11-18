<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <t-col>
          <div>
            <t-input v-model="keyword" label="客户信息/名称：" placeholder="请输入" clearable />
          </div>
        </t-col>
        <t-col flex="220px">
          <div class="btn-left">
            <t-button variant="base">查询</t-button>
            <t-button theme="default" variant="base">重置</t-button>
          </div>
        </t-col>
      </t-row>
      <t-table
        row-key="index"
        :columns="columns"
        :data="workData"
        lazy-load
        :pagination="workStationPagination"
        @page-change="onworkStationPageChange"
      >
        <template #operate>
          <t-link theme="primary" hover="color"> 编辑 </t-link>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref('');
const columns = ref([]);
const workData = ref([]);
const workStationPagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 20,
  total: 0,
  showJumper: true,
});
const onworkStationPageChange = (pageInfo: { current: number; pageSize: number }) => {
  workStationPagination.value.defaultCurrent = pageInfo.current;
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}
</style>
