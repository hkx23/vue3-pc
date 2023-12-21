<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-row justify="space-between">
        <t-space :size="8">
          <t-button @click="onClickAdd">
            <!-- <template #icon><add-icon /></template> -->
            {{ t('common.button.add') }}</t-button
          >
          <t-button theme="default" @click="onClickEdit">
            <!-- <template #icon><edit-icon /></template> -->
            {{ t('common.button.edit') }}</t-button
          >
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDelete">
            <t-button theme="default">
              <!-- <template #icon><remove-icon /></template> -->
              {{ t('common.button.delete') }}</t-button
            >
          </t-popconfirm>
        </t-space>
        <div class="search-input">
          <t-input v-model="filterText" :placeholder="t('common.placeholder.input')" clearable @change="onInput">
            <template #suffix-icon>
              <search-icon size="var(--td-comp-size-xxxs)" />
            </template>
          </t-input>
        </div>
      </cmp-row>
    </cmp-card>
    <cmp-row>
      <cmp-card :span="3"
        ><t-tree
          ref="treeRef"
          v-model:actived="treeActiveKey"
          :data="treeData"
          :keys="treeKeys"
          hover
          :expand-on-click-node="false"
          :filter="filterByText"
          activable
        />
      </cmp-card>
      <cmp-card :span="9">
        <cmp-table
          ref="tableRef"
          row-key="id"
          :loading="loading"
          :show-pagination="false"
          :table-column="columns"
          :table-data="data"
          @refresh="fetchData"
        ></cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>
  <t-dialog
    v-model:visible="formVisible"
    :header="
      isEdit ? t('common.dialog.header.edit', [t('org.title')]) : t('common.dialog.header.add', [t('org.title')])
    "
    :on-confirm="onConfirmForm"
  >
    <org-form ref="formRef" />
  </t-dialog>
</template>
<script setup lang="tsx">
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, TreeNodeModel } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api, OrgTreeVO } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { useUserStore } from '@/store';

import { FormRef } from './constants';
import OrgForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();
const userStore = useUserStore();

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

const fetchEnterprise = async () => {
  const enterprises = await api.enterprise.search({});
  if (!enterprises || !enterprises.list || enterprises.total === 0) {
    MessagePlugin.warning(t('org.enterpriseMust'));
  } else {
    const isAdmin = userStore.userInfo.code === 'administrator';
    const list: OrgTreeVO[] = [];
    for (let i = 0; i < enterprises.list.length; i++) {
      const enterprise = enterprises.list[i];
      const item = {
        eid: enterprise.id,
        orgCode: `${enterprise.id}0`,
        orgName: enterprise.epName,
      } as OrgTreeVO;

      if (isAdmin) {
        item.children = treeData.value.filter((t) => t.eid === enterprise.id);
        list.push(item);
      } else if (enterprise.id === userStore.userInfo.eid) {
        item.children = treeData.value.filter((t) => t.eid === enterprise.id);
        list.push(item);
        break;
      }
    }

    treeData.value = list;
  }
};

const fetchData = async () => {
  setLoading(true);
  treeData.value = await api.org.tree();
  data.value = treeData.value;
  setLoading(false);
  treeActiveKey.value = [];
  flatten(treeData.value);
  fetchEnterprise();
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

// 获取当前组织的工厂id，如果大于工厂层级则为0
const currOrgId = computed<string>(() => {
  if (currActiveData.value.levelCode === 'PLANT') return currActiveData.value.id;

  let parentOrg = flattenOrgObj[currActiveData.value.parentOrgId];
  while (parentOrg) {
    if (parentOrg.levelCode === 'PLANT') return parentOrg.id;
    parentOrg = flattenOrgObj[parentOrg.parentOrgId];
  }
  return '0';
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
  currActiveData.value.oid = currOrgId.value;
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
