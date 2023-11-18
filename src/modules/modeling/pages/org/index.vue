<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="onClickAdd">
            <template #icon><add-icon /></template>
            新增</t-button
          >
          <t-button theme="default" @click="onClickEdit">
            <template #icon><edit-icon /></template>
            编辑</t-button
          >
          <t-popconfirm content="确认删除吗" @confirm="onClickDelete">
            <t-button theme="default">
              <template #icon><remove-icon /></template>
              删除</t-button
            >
          </t-popconfirm>
        </div>
        <div class="search-input">
          <t-input v-model="filterText" :placeholder="$t('pages.listTree.placeholder')" @change="onInput">
            <template #suffix-icon>
              <search-icon size="var(--td-comp-size-xxxs)" />
            </template>
          </t-input>
        </div>
      </t-row>
    </t-card>
    <div class="table-tree-container">
      <div class="list-tree-wrapper">
        <div class="list-tree-operator">
          <t-tree :data="TREE_DATA" hover expand-on-click-node :filter="filterByText" />
        </div>
        <div class="list-tree-content">
          <t-table ref="tableRef" row-key="id" :columns="columns" :data="data"></t-table>
        </div>
      </div>
    </div>
    <t-dialog v-model:visible="formVisible" header="新增生产组织架构" :on-confirm="onConfirmForm"> </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { AddIcon, EditIcon, RemoveIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { TreeNodeModel } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { TREE_DATA } from './constants';

const formVisible = ref(false);

const filterByText = ref();
const filterText = ref();

const data = ref([]);
const columns = [
  {
    title: '组织编码',
    colKey: 'orgCode',
  },
  {
    title: '组织名称',
    colKey: 'orgName',
  },
  {
    title: '组织备注',
    colKey: 'orgDesc',
  },
  {
    title: '组织类型',
    colKey: 'levelName',
  },
  {
    title: '更新人',
    colKey: 'modifier',
  },
  {
    title: '更新时间',
    colKey: 'timeModified',
  },
];

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  console.log('fetchData');
};

const onInput = () => {
  filterByText.value = filterText.value
    ? (node: TreeNodeModel) => {
        return node.label.indexOf(filterText.value) >= 0;
      }
    : null;
};

const onClickAdd = () => {
  formVisible.value = true;
  console.log('onClickAdd');
};

const onClickEdit = () => {
  formVisible.value = true;
  console.log('onClickEdit');
};

const onClickDelete = () => {
  console.log('onClickDelete');
};

const onConfirmForm = () => {
  console.log('onConfirmForm');
};
</script>
<style scoped lang="less">
.list-card-container {
  padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.left-operation-container {
  display: flex;
  align-items: center;
  // margin-bottom: var(--td-comp-margin-xxl);

  .selected-count {
    display: inline-block;
    margin-left: var(--td-comp-margin-l);
    color: var(--td-text-color-secondary);
  }
}

.search-input {
  width: 250px;
}

.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
  border-top: 1px solid var(--td-border-level-1-color);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxs) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}
</style>
