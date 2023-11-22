<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="onClickAdd">
            <template #icon><add-icon /></template>
            新增</t-button
          >
          <t-popconfirm content="确认删除吗" @confirm="onClickDelete">
            <t-button theme="default">
              <template #icon><remove-icon /></template>
              删除</t-button
            >
          </t-popconfirm>
        </div>
      </t-row>
      <t-enhanced-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :data="data"
        :tree="treeConfig"
        active-row-type="single"
        @row-click="onRowClick"
      ></t-enhanced-table>
    </t-card>
    <t-dialog v-model:visible="formVisible" header="新增组织层级" :on-confirm="onConfirmForm">
      <org-level-form ref="formRef"></org-level-form>
    </t-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OrgLevel',
};
</script>
<script setup lang="ts">
import { AddIcon, RemoveIcon } from 'tdesign-icons-vue-next';
import { EnhancedTableInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { nextTick, onMounted, reactive, ref } from 'vue';

import { api, OrgLevel } from '@/api/main';

import { FormRef } from './constants';
import OrgLevelForm from './form.vue';

const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
});
const columns = [
  {
    title: '组织层级',
    colKey: 'levelName',
  },
  {
    title: '层级代码',
    colKey: 'levelCode',
  },
  {
    title: '层级序列',
    colKey: 'levelSeq',
  },
];
const formRef = ref<FormRef>(null);
const tableRef = ref<EnhancedTableInstanceFunctions>(null);
const formVisible = ref(false);
const data = ref([]);
let selectedRow: OrgLevel = null;

onMounted(() => {
  fetchData();
});

const onRowClick = ({ row }: { row: any }) => {
  selectedRow = row as OrgLevel;
};

const fetchData = async () => {
  const list = await api.orgLevel.tree();
  data.value = list;
  nextTick(() => {
    tableRef.value?.expandAll();
  });
};

const onConfirmForm = async () => {
  const { submit } = formRef.value;
  submit().then(() => {
    formVisible.value = false;
    fetchData();
  });
};

const onClickAdd = () => {
  const { reset } = formRef.value;
  reset(selectedRow);
  formVisible.value = true;
};

const onClickDelete = async () => {
  if (!selectedRow?.id) {
    MessagePlugin.warning('请选择行之后再尝试操作');
    return;
  }
  await api.orgLevel.delete({ id: selectedRow.id });
  selectedRow = null;
  MessagePlugin.success('删除成功');
  fetchData();
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
