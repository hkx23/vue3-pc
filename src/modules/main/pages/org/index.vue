<template>
  <div class="main-page">
    <div class="main-page-content">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="onClickAdd">
            <template #icon><add-icon /></template>
            {{ t('common.button.add') }}</t-button
          >
          <t-button theme="default" @click="onClickEdit">
            <template #icon><edit-icon /></template>
            {{ t('common.button.edit') }}</t-button
          >
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDelete">
            <t-button theme="default">
              <template #icon><remove-icon /></template>
              {{ t('common.button.delete') }}</t-button
            >
          </t-popconfirm>
        </div>
        <div class="search-input">
          <t-input v-model="filterText" :placeholder="t('common.placeholder.input')" @change="onInput">
            <template #suffix-icon>
              <search-icon size="var(--td-comp-size-xxxs)" />
            </template>
          </t-input>
        </div>
      </t-row>
    </div>
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-tree
          ref="treeRef"
          v-model:actived="treeActiveKey"
          :data="treeData"
          :keys="treeKeys"
          hover
          :expand-on-click-node="false"
          :filter="filterByText"
          activable
        />
      </div>
      <div class="list-tree-content">
        <cmp-table
          ref="tableRef"
          row-key="id"
          :loading="loading"
          :show-pagination="false"
          :table-column="columns"
          :table-data="data"
          @refresh="fetchData"
        ></cmp-table>
      </div>
    </div>

    <t-dialog
      v-model:visible="formVisible"
      :header="
        isEdit ? t('common.dialog.header.edit', [t('org.title')]) : t('common.dialog.header.add', [t('org.title')])
      "
      :on-confirm="onConfirmForm"
    >
      <org-form ref="formRef" />
    </t-dialog>
  </div>
</template>
<script setup lang="tsx">
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { AddIcon, EditIcon, RemoveIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, TreeNodeModel } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api, OrgTreeVO } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import { FormRef } from './constants';
import OrgForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();
const formVisible = ref(false);
const { loading, setLoading } = useLoading();
const filterByText = ref();
const filterText = ref();

let orgLevelObject = {};
const data = ref([]);
const currActiveData = ref<OrgTreeVO>({});

const formRef = ref<FormRef>(null);
const treeRef = ref();
const treeData = ref<OrgTreeVO[]>([]);
const treeActiveKey = ref([]);
const treeKeys = { value: 'orgCode', label: 'orgName' };
const columns = [
  {
    title: t('org.orgCode'),
    colKey: 'orgCode',
  },
  {
    title: t('org.orgName'),
    colKey: 'orgName',
  },
  {
    title: t('org.orgDesc'),
    colKey: 'orgDesc',
  },
  {
    title: t('org.levelName'),
    colKey: 'levelName',
    // @ts-ignore
    cell: (_h: any, { row }) => {
      // @ts-ignore
      return <div>{orgLevelObject[row.levelCode]}</div>;
    },
  },
  {
    title: t('org.modifier'),
    colKey: 'modifier',
  },
  {
    title: t('org.timeModified'),
    colKey: 'timeModified',
    cell: (h, { col, row }) => <div>{dayjs(row[col.colKey]).format('YYYY-MM-DD HH:mm:ss')}</div>,
  },
];

onMounted(() => {
  fetchOrgLevelDic();
  fetchData();
});

watch(treeActiveKey, () => {
  if (treeRef?.value && !isEmpty(treeActiveKey.value)) {
    const activeNode = treeRef.value.getTreeData(treeActiveKey.value[0]);
    currActiveData.value = activeNode[0] as OrgTreeVO;
    data.value = activeNode[0].children?.length > 0 ? activeNode[0].children : activeNode;
  } else {
    data.value = treeData.value;
  }
});

const fetchData = async () => {
  setLoading(true);
  treeData.value = await api.org.tree();
  data.value = treeData.value;
  setLoading(false);
  treeActiveKey.value = [];
  flatten(treeData.value);
};

const flattenOrgObj: { [key: string]: OrgTreeVO } = {};

const flatten = (tree: OrgTreeVO[]) => {
  tree?.forEach((item) => {
    flattenOrgObj[item.id] = item;

    if (item?.children && item.children.length > 0) {
      flatten(item?.children);
    }
  });
};

const parentOrgName = computed(() => {
  let name = '';
  let parentOrg = flattenOrgObj[currActiveData.value.parentOrgId];
  while (parentOrg) {
    name = `${parentOrg.orgName}/${name}`;
    parentOrg = flattenOrgObj[parentOrg.parentOrgId];
  }
  return name;
});

const parentOrgLevels = computed<string[]>(() => {
  let levels = [];
  let parentOrg = flattenOrgObj[currActiveData.value.parentOrgId];
  while (parentOrg) {
    levels = [parentOrg.levelCode, ...levels];
    parentOrg = flattenOrgObj[parentOrg.parentOrgId];
  }
  return levels;
});

const fetchOrgLevelDic = async () => {
  orgLevelObject = (await api.param.getListByGroupCode({ parmGroupCode: 'ORG_LEVEL_CODE' })).reduce((acc, item) => {
    (acc as any)[item.value] = item.label;
    return acc;
  }, {});
};

const onInput = () => {
  filterByText.value = filterText.value
    ? (node: TreeNodeModel) => {
        return node.label.indexOf(filterText.value) >= 0;
      }
    : null;
};

const isEdit = ref(false);
const onClickAdd = () => {
  const { reset } = formRef.value;
  isEdit.value = false;
  reset(
    isEdit.value,
    currActiveData.value,
    (parentOrgName.value || '') + (currActiveData.value.orgName || ''),
    isEmpty(currActiveData.value.levelCode)
      ? parentOrgLevels.value
      : [...parentOrgLevels.value, currActiveData.value.levelCode],
  );
  formVisible.value = true;
};

const onClickEdit = () => {
  const { reset } = formRef.value;
  isEdit.value = true;
  reset(isEdit.value, currActiveData.value, parentOrgName.value?.replace(/\/$/, ''), parentOrgLevels.value);
  formVisible.value = true;
};

const onClickDelete = async () => {
  console.log('onClickDelete');
  if (!currActiveData.value?.id) {
    MessagePlugin.warning(t('common.message.selectRowTryAgain'));
    return;
  }
  await api.org.delete({ id: currActiveData.value.id });
  currActiveData.value = null;
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchData();
};

const onConfirmForm = () => {
  const { submit } = formRef.value;
  submit().then(() => {
    formVisible.value = false;
    fetchData();
  });
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
  background: white;
  border-radius: 4px;
  padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-xxl);
  margin-right: 8px;
  // border-right: 8px solid var(--td-bg-color-page);
}

.list-tree-content {
  background: white;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  // border-left: 8px solid var(--td-bg-color-page);
}
</style>
