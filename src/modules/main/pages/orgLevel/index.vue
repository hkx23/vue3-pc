<template>
  <cmp-container :full="true">
    <cmp-card>
      <t-space style="text-align: end; width: 100%; margin-bottom: 8px">
        <div class="table-title">组织层级列表</div>
        <t-space size="small" :align="'end'">
          <t-button @click="onClickAdd">
            {{ t('common.button.add') }}
          </t-button>
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDelete">
            <t-button theme="default"> {{ t('common.button.delete') }}</t-button>
          </t-popconfirm>
        </t-space>
      </t-space>

      <t-enhanced-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :data="data"
        :tree="treeConfig"
        active-row-type="single"
        @row-click="onRowClick"
      >
      </t-enhanced-table>
    </cmp-card>
  </cmp-container>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('common.dialog.header.add', [t('orgLevel.levelName')])"
    :on-confirm="onConfirmForm"
  >
    <org-level-form ref="formRef"></org-level-form>
  </t-dialog>
</template>

<script lang="ts">
export default {
  name: 'OrgLevel',
};
</script>
<script setup lang="ts">
import { EnhancedTableInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { nextTick, onMounted, reactive, ref } from 'vue';

import { api, OrgLevel } from '@/api/main';

import { FormRef } from './constants';
import OrgLevelForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();

const columns = [
  {
    title: t('orgLevel.levelName'),
    colKey: 'levelName',
  },
  {
    title: t('orgLevel.levelCode'),
    colKey: 'levelCode',
  },
  {
    title: t('orgLevel.levelSeq'),
    colKey: 'levelSeq',
  },
];
const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
});
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
  data.value = await api.orgLevel.tree();
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
    MessagePlugin.warning(t('common.message.selectRowTryAgain'));
    return;
  }
  await api.orgLevel.delete({ id: selectedRow.id });
  selectedRow = null;
  MessagePlugin.success(t('common.message.deleteSuccess'));
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
