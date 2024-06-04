<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card ref="treeCard" flex="350px">
        <!-- <t-input
            v-model="treeKey"
            style="width: 230px"
            placeholder="输入关键字进行过滤"
            clearable
            @change="treeInput"
          >
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" @click="treeInput" />
            </template>
          </t-input> -->
        <t-tree
          style="width: 100%"
          :data="treeData"
          hover
          expand-all
          expand-on-click-node
          :activable="true"
          @active="onActive"
        >
          <template #icon="{ node }">
            <icon v-if="!node.expanded && node.data.type !== 'param'" name="folder" />
            <icon v-else-if="node.getChildren() && node.expanded && node.loading" name="loading" />
            <icon v-else-if="node.expanded && node.data.type !== 'param'" name="folder-open" />
            <icon v-else name="system-components" />
          </template>
          <template #operations="{ node }">
            <div v-if="node.actived && node.data.type !== 'param'" class="tdesign-demo-block-row">
              <t-button size="small" variant="base" @click="appendGroup(node)">添加子分组</t-button>
              <t-popconfirm theme="default" content="确认删除吗" @confirm="removeGroup(node)">
                <t-button size="small" variant="base" theme="danger">删除分组</t-button>
              </t-popconfirm>
            </div>
          </template>
        </t-tree>
      </cmp-card>
      <cmp-card flex="auto">
        <cmp-container :full="true" style="padding: 0">
          <cmp-card :ghost="true">
            <div class="group-title">当前分组:{{ currentNodeData.label }}</div>
          </cmp-card>
          <cmp-card :ghost="true">
            <cmp-query
              ref="queryComponent"
              :opts="opts"
              is-expansion
              :bool-enter="true"
              @submit="onConditionEnter"
              @change="onConditionEnter"
            >
            </cmp-query>
          </cmp-card>

          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="mainColumns"
              :table-data="moduleData"
              :fixed-height="true"
              :total="tabTotal"
              @refresh="fetchData"
            >
              <template #title> 功能列表 </template>
              <template #op="slotProps">
                <t-link theme="primary" @click="onEditRowClick(slotProps)">{{ t('common.button.edit') }}</t-link>
                <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
              </template>

              <template #button>
                <t-space direction="vertical">
                  <t-button theme="primary" @click="onAdd()">新增</t-button>
                </t-space>
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!-- 新增/编辑分组弹出窗 -->
  <t-dialog
    v-model:visible="groupFormVisible"
    :header="t(groupFormAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('domainParam.paramGroup')])"
    :on-confirm="onGroupConfirmForm"
  >
    <group-form ref="formGroupRef" />
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'DomainParam',
};
</script>
<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { MessagePlugin, PrimaryTableCol, TableRowData, TreeProps } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/main';
import { usePage } from '@/hooks/modules/page';

import { FormGroupRef, TreeNode } from './constants';
import GroupForm from './formGroup.vue';
import { useLang } from './lang';

const { pageUI } = usePage();
const { t } = useLang();
const treeData = ref<TreeProps['data']>([]);
const formGroupRef = ref<FormGroupRef>(null);
const currentNodeData = ref<TreeNode>({
  label: '全部',
  value: '0',
  id: '',
  nodeCode: '',
  nodeName: '',
  parentNodeId: '',
  type: 'root',
});

// #全局加载-页面初始化后加载树数据
onMounted(async () => {
  await onGetTreeData();
});

// #分组区域-监控树组件高度
const treeCard = ref(null);
const treeHeight = ref('400px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  treeHeight.value = `${height - 120}px`;
});
// #分组区域-获取树组件数据
const onGetTreeData = async () => {
  const res = await api.domainParam.getAllTree(); // 获取节点数据
  if (res) {
    treeData.value = res;
  }
};
// #分组区域-分组窗口参数定义
const groupFormVisible = ref(false);
const groupFormAdd = ref(true);
// #分组区域-分组数据维护确认事件
const onGroupConfirmForm = () => {
  const { submit } = formGroupRef.value;
  submit().then(() => {
    groupFormVisible.value = false;
    onGetTreeData();
  });
};
// #分组区域-添加分组按钮事件
const appendGroup = (node: any) => {
  // 弹窗,填写分组编码,分组名称
  const { reset } = formGroupRef.value;
  reset(false, node.data);
  groupFormAdd.value = true;
  groupFormVisible.value = true;
};
// #分组区域-删除分组按钮事件
const removeGroup = async (node: any) => {
  // 判断是否包含子节点,包含子节点不可删
  if (node.data.children.length > 0) {
    MessagePlugin.error('当前选择分组下还有子集合,不可删除');
    return;
  }
  // 不包含子节点情况下,弹出确认框,确认删除
  await api.domainParamGroup.removeItemsById([node.data.id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  onGetTreeData();
};
// #分组区域-分组树节点选中事件
const onActive = (value, context) => {
  console.info('onActive', value, context);
  const { node } = context;
  console.info(node.value, 'actived:', node.actived);
  if (node.data.type === 'param') {
    currentNodeData.value = findNodeById(treeData.value, node.data.parentNodeId);
  } else {
    currentNodeData.value = node.data;
  }

  fetchData();
};

const findNodeById = (treeNodes: any, targetId: string | number) => {
  for (const node of treeNodes) {
    if (node.id === targetId) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const foundNode = findNodeById(node.children, targetId);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return undefined; // 如果没有找到，则返回undefined
};

// #查询区域-查询条件定义
const queryComponent = ref();
const opts = computed(() => {
  return {
    domainParamCode: { label: '功能编码', comp: 't-input', defaultval: '' },
    domainParamName: { label: '功能名称', comp: 't-input', defaultval: '' },
    domainParamTemplateId: {
      label: '功能类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'domainParamTemplate',
        showTitle: false,
      },
    },
  };
});

// #查询区域-查询动作触发
const onConditionEnter = async (data: any) => {
  pageUI.value.page = 1;
  // enterpriseParam.value.keyword = data.keyword;
  await fetchData();
  // selectedRowKeys.value = [];
  // supportPersonInUserList.list = [];
  // supportPersonTotal.value = 0;
};

// #表格区域-表格基础数据定义
const tabTotal = ref(0); // 表格数据总页数
const moduleData = ref([]); // 表格数据
// 表格列表数据
const mainColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'domainParamCode',
    title: '功能编码',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'domainParamName',
    title: '功能描述',
    align: 'center',
    width: '140',
  },
  {
    colKey: 'templateName',
    title: '功能模板',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'groupName',
    title: '功能分组',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'domainCategory',
    title: '数据领域',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datasourceCategory',
    title: '数据源分类',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datasourceName',
    title: '数据源名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
];

// #表格区域-刷新表格数据
const fetchData = () => {
  onGetTabData();
};

// #表格区域-获取表格数据
const queryData = ref({});
const onGetTabData = async () => {
  const finalFilterList = [];
  // 条件一: 当前树选择的分组节点-全部或分组或功能,功能取对应功能的分组
  if (currentNodeData.value.type === 'param') {
    finalFilterList.push({
      field: 'domainParamGroupId',
      value: currentNodeData.value.parentNodeId,
      operator: 'EQ',
    });
  } else if (currentNodeData.value.type === 'group') {
    finalFilterList.push({
      field: 'domainParamGroupId',
      value: currentNodeData.value.id,
      operator: 'EQ',
    });
  }
  // 条件二: 查询组件对应的查询条件
  if (queryComponent.value) {
    queryData.value = queryComponent.value.getFromData();
  }
  if (queryData.value && Object.keys(queryData.value).length > 0) {
    for (const key in queryData.value) {
      if (queryData.value[key] !== null && queryData.value[key] !== '') {
        finalFilterList.push({
          field: key,
          value: queryData.value[key],
          operator: 'EQ',
        });
      }
    }
  }
  // 条件三: 分页属性
  const searchCondition = {
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    filters: finalFilterList,
  };

  const res = await api.domainParam.search(searchCondition); // 获取第二节点的数据
  moduleData.value = res.list; // 表格数据赋值
  tabTotal.value = res.total;
};

// #表格区域-新增表格数据-新增功能
const onAdd = () => {
  // formTitle.value = '新增';
  // formRef.value.init(clickNodeId);
  // formVisible.value = true;
};

// #表格区域-编辑表格数据-编辑功能
const onEditRowClick = (value: any) => {
  // formTitle.value = '编辑';
  // formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  // formRef.value.formData.id = value.row.id;
  // formRef.value.formData.valueType = value.row.valueType;
  // formRef.value.formData.isState = value.row.state === 1;
  // formRef.value.formData.operateTpye = 'edit';
  // formRef.value.setCategoryLabel();
  // formVisible.value = true;
  onGetTabData();
};
</script>

<style lang="less" scoped>
.tdesign-demo-block-row {
  display: flex;
  column-gap: 2px;
  align-items: center;
}

.group-title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}
</style>
