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
          <tm-table
            ref="tableRef"
            row-key="id"
            :loading="loading"
            :show-pagination="false"
            :table-column="columns"
            :table-data="data"
          ></tm-table>
        </div>
      </div>
    </div>
    <t-dialog v-model:visible="formVisible" header="新增生产组织架构" :on-confirm="onConfirmForm">
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
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import { FormRef } from './constants';
import OrgForm from './form.vue';

const formVisible = ref(false);
const { loading, setLoading } = useLoading();
const filterByText = ref();
const filterText = ref();

let orgLevelObject = {};
const data = ref([]);
let currActiveData: OrgTreeVO = null;

const formRef = ref<FormRef>(null);
const treeRef = ref();
const treeData = ref<OrgTreeVO[]>([]);
const treeActiveKey = ref([]);
const treeKeys = { value: 'orgCode', label: 'orgName' };
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
    // @ts-ignore
    cell: (_h: any, { row }) => {
      // @ts-ignore
      return <div>{orgLevelObject[row.levelCode]}</div>;
    },
  },
  {
    title: '更新人',
    colKey: 'modifier',
  },
  {
    title: '更新时间',
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
    currActiveData = activeNode[0] as OrgTreeVO;
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
  let parentOrg = flattenOrgObj[currActiveData.parentOrgId];
  while (parentOrg) {
    name = `${parentOrg.orgName}/${name}`;
    parentOrg = flattenOrgObj[parentOrg.parentOrgId];
  }
  return name;
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

const onClickAdd = () => {
  const { reset } = formRef.value;
  reset(false, currActiveData, parentOrgName.value + currActiveData.orgName);
  formVisible.value = true;
};

const onClickEdit = () => {
  const { reset } = formRef.value;

  reset(true, currActiveData, parentOrgName.value.replace(/\/$/, ''));
  formVisible.value = true;
};

const onClickDelete = async () => {
  console.log('onClickDelete');
  if (!currActiveData?.id) {
    MessagePlugin.warning('请选择行之后再尝试操作');
    return;
  }
  await api.org.delete({ id: currActiveData.id });
  currActiveData = null;
  MessagePlugin.success('删除成功');
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
  padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-xxl);
  border-right: 1px solid var(--td-border-level-1-color);
}

.list-tree-content {
  overflow: auto;
  padding: 8px;
}
</style>
