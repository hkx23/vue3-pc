<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="onClickAdd">新增</t-button>
          <t-popconfirm content="确认删除吗">
            <t-button theme="default" @click="onClickDelete">删除</t-button>
          </t-popconfirm>
        </div>
      </t-row>
      <t-enhanced-table :columns="columns" :data="data"></t-enhanced-table>
    </t-card>
    <t-dialog v-model:visible="formVisible" header="新增组织层级">
      <org-level-form></org-level-form>
    </t-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OrgLevel',
};
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getOrgLevelTree } from '../../api/orgLevel';
import OrgLevelForm from './form.vue';

const columns = [
  {
    title: '组织层级',
    key: 'levelName',
  },
  {
    title: '层级代码',
    key: 'levelCode',
  },
  {
    title: '层级序列',
    key: 'levelSeq',
  },
];
const formVisible = ref(false);
const data = ref([]);

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  const list = await getOrgLevelTree();
  data.value = list;
};

const onClickAdd = () => {
  formVisible.value = true;
};

const onClickDelete = () => {
  console.log(data);
  const { length } = data.value;
  return length;
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.left-operation-container {
  display: flex;
  align-items: center;
  margin-bottom: var(--td-comp-margin-xxl);

  .selected-count {
    display: inline-block;
    margin-left: var(--td-comp-margin-l);
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 360px;
}
</style>
