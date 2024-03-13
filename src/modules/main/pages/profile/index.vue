<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card ref="treeCard" flex="300px">
        <t-space direction="vertical" :size="8">
          <t-input
            v-model="treeKey"
            style="width: 230px"
            placeholder="输入关键字进行过滤"
            clearable
            @change="demo1Input"
          >
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" @click="demo1Input" />
            </template>
          </t-input>
          <t-tree
            ref="treeRef"
            style="width: 100%"
            :data="treeData"
            hover
            line
            activable
            :filter="demo1Filter"
            :expand-level="2"
            :height="treeHeight"
            :transition="true"
            :expand-on-click-node="false"
            :icon="true"
            :scroll="{
              rowHeight: 10,
              bufferSize: 10,
              threshold: 10,
              type: 'virtual',
            }"
            @click="treeClick"
          >
            <template #icon="{ node }">
              <icon v-if="node.getChildren() && !node.expanded" name="caret-right" />
              <icon v-else-if="node.getChildren() && node.expanded && node.loading" name="loading" />
              <icon v-else-if="node.getChildren() && node.expanded" name="caret-down" />
              <icon v-else-if="node.data.attribute == 2" name="attach" />
            </template>
          </t-tree>
        </t-space>
      </cmp-card>
      <cmp-card flex="auto">
        <cmp-container :full="true" style="padding: 0">
          <cmp-card :ghost="true">
            <t-breadcrumb :max-item-width="'150'" style="padding-left: 0">
              <t-breadcrumbItem v-if="treeClickData?.two">{{ treeClickData.two }}</t-breadcrumbItem>
              <t-breadcrumbItem v-if="treeClickData?.one" :max-width="'160'">
                {{ treeClickData.one }}
              </t-breadcrumbItem>
            </t-breadcrumb>
          </cmp-card>
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="columns"
              :table-data="moduleData"
              :fixed-height="true"
              :total="tabTotal"
              @refresh="fetchData"
            >
              <template #stateOp="slotProps">
                <t-space>
                  {{ getstateName(slotProps.row.state) }}
                </t-space>
              </template>
              <template #profileCategoryOp="slotProps">
                <t-space>
                  {{ getProfileCategory(slotProps.row.profileCategory) }}
                </t-space>
              </template>
              <template #op="slotProps">
                <t-link theme="primary" @click="onEditRowClick(slotProps)">{{ t('common.button.edit') }}</t-link>
                <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
              </template>
              <template #title>
                <t-space direction="horizontal">
                  <t-input
                    v-model="keyword"
                    style="width: 250px"
                    placeholder="输入关键字进行过滤"
                    :on-enter="onRefresh"
                  >
                    <template #suffixIcon>
                      <search-icon :style="{ cursor: 'pointer' }" @click="onRefresh" />
                    </template>
                  </t-input>

                  <!-- <t-button theme="primary" @click="onRefresh">查询</t-button> -->
                </t-space>
              </template>
              <template #button>
                <t-space direction="vertical">
                  <t-button theme="primary" :disabled="isButtonDisabled" @click="onAdd()">新增</t-button>
                </t-space>
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <t-dialog
    v-model:visible="formVisible"
    :header="formTitle"
    :on-confirm="onConfirmForm"
    width="850px"
    :close-on-overlay-click="false"
  >
    <profile-form ref="formRef"></profile-form>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'Profile',
};
</script>
<script setup lang="ts">
import { Icon, SearchIcon } from 'tdesign-icons-vue-next';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import ProfileForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();
// 获取全部图标的列表
const iconValue = ref('add');
const { pageUI } = usePage();

// 树组件节点名称 TS 类型
interface TreeLabelData {
  firstLayerLabels: string[];
  secondLayerLabels: string[];
  thirdLayerLabels: string[];
}

// 树状数据 TS 类型
interface TreeNode {
  id?: string;
  label: string;
  children?: TreeNode[]; // 可选属性，表示子节点数组
}
const formVisible = ref(false);
const formRef = ref(null);
const formTitle = ref('');
const treeRef = ref(null); // 树组件实例
const treeArr = ref<TreeLabelData | null>(null); // 组件挂载获取树组件名称数组
const treeClickData = ref({ one: '', two: '' }); // 面包屑文本
const treeData = ref<TreeNode[]>([]); // 树组件数据
const tabListData = ref(1); // 多端选中数据
const clickNodeId = ref({
  nodeId: '',
  clientType: 1,
  pageNum: 1,
  pageSize: 10,
  attribute: 0,
  moduleName: '',
  key: '',
  profileDesc: '',
  parentModuleName: '',
});
const tabTotal = ref(null); // 表格数据总页数
const moduleData = ref([]); // 表格数据
const isButtonDisabled = ref(true); // 新增按钮禁用
const keyword = ref(''); // 右侧文本搜索
const treeKey = ref(''); // 左侧文本搜索

// 表格模态框数据
const formDataTwo = ref({
  moduleType: '', // 模块类型
  moduleVersion: null, // 模块版本号
  modulePackageIdentify: '', // 模块标识
  moduleLevel: 'LEAF',
  clientType: tabListData.value, // 终端类型
  moduleCode: '', // 模块编码
  moduleName: '', // 菜单名称
  moduleDesc: '', // 菜单描述
  behaviorPath: '', // 菜单地址
  iconPath: iconValue.value, // 图标地址
  parentModuleId: null, // 父组件 ID
});

// 侦听 formDataTwo.iconPath 的变化
watch(
  () => formDataTwo.value.iconPath,
  (newIconPath) => {
    iconValue.value = newIconPath;
  },
);

// 在 iconValue 改变时更新 formDataTwo.iconPath
watch(iconValue, (newValue) => {
  formDataTwo.value.iconPath = newValue;
});

// 侦听 formDataTwo.clientType 的变化
watch(
  () => formDataTwo.value.clientType,
  (newClientType) => {
    tabListData.value = newClientType;
  },
);

// 在 tabListData 改变时更新 formDataTwo.clientType
watch(tabListData, (newValue) => {
  formDataTwo.value.clientType = newValue;
});

// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'moduleName',
    title: '功能名称',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'profileName',
    title: '配置项名称',
    align: 'center',
    width: '140',
  },
  {
    colKey: 'profileCategoryOp',
    title: '配置项维度',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'profileCategoryValueName',
    title: '维度值',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'profileValue',
    title: '配置项值',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'stateOp',
    title: '是否应用',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'profileDesc',
    title: '配置项说明',
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
// 查询按钮
const onRefresh = () => {
  onGetTabData();
};

// 表格刷新按钮
const fetchData = () => {
  onGetTabData();
};

// 新增
const onAdd = () => {
  formTitle.value = '新增';
  formRef.value.init(clickNodeId);
  formVisible.value = true;
};

const onConfirmForm = async () => {
  formRef.value.submit().then((data: any) => {
    if (data) {
      formVisible.value = false;
      fetchData();
    }
  });
};
const onEditRowClick = (value: any) => {
  formTitle.value = '编辑';
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formRef.value.formData.id = value.row.id;
  formRef.value.formData.valueType = value.row.valueType;
  formRef.value.formData.isState = value.row.state === 1;
  formRef.value.formData.operateTpye = 'edit';
  formRef.value.setCategoryLabel();
  formVisible.value = true;
  onGetTabData();
};

const stateOptions = [
  { label: '是', id: 1 },
  { label: '否', id: 0 },
];
const getstateName = (id: any) => {
  for (const element of stateOptions) {
    if (id === element.id) {
      return element.label;
    }
  }
  return '';
};

const getProfileCategory = (value: any) => {
  for (const element of formRef.value.profileCategoryOption) {
    if (value === element.value) {
      return element.label;
    }
  }
  return '';
};

// 筛选树组件名称数组的函数
function filterLabels(treeData: any[]) {
  const firstLayerLabels = treeData.map((node: { label: any }) => node.label);
  const secondLayerLabels = treeData.flatMap((node: { children: any[] }) =>
    node.children ? node.children.map((child: { label: any }) => child.label) : [],
  );
  const thirdLayerLabels = treeData.flatMap((node: { children: any[] }) =>
    node.children
      ? node.children.flatMap((child: { children: any[] }) =>
          child.children ? child.children.map((grandchild: { label: any }) => grandchild.label) : [],
        )
      : [],
  );
  return { firstLayerLabels, secondLayerLabels, thirdLayerLabels };
}

// 筛选树节点递归函数
function simplifyObject(obj: {
  id: any;
  modelName: any;
  attribute: any;
  profileDesc: any;
  childList: any[];
  children: any[];
}) {
  // 创建一个新对象，仅包含 name 和 children 字段
  const simplified = {
    id: obj.id,
    label: obj.modelName,
    attribute: obj.attribute,
    profileDesc: obj.profileDesc,
    children: obj.childList ? obj.childList.map((child: any) => simplifyObject(child)) : [],
  };
  // 检查是否存在 children 字段
  if (obj.children && Array.isArray(obj.children)) {
    // 递归处理每个子对象
    simplified.children = obj.children.map((child: any) => simplifyObject(child));
  }
  return simplified;
}

// 在组件挂载后模拟 点击 第一个节点
onMounted(async () => {
  await onGetTreeData();
  // 确保树的第一个节点存在，并且它有子节点
  if (treeData.value.length > 0 && treeData.value[0].children && treeData.value[0].children.length > 0) {
    const firstNode = treeData.value[0]; // 第一个节点
    const { id } = firstNode; // 保存该子节点的 ID
    clickNodeId.value.nodeId = id; // 保存当前节点的 ID
    const rules = await api.profileValue.getProfileValueList({
      key: '',
      pageNum: 1,
      pageSize: 10,
      nodeId: id,
      attribute: 0,
    }); // 请求：获取第二节点的数据
    moduleData.value = rules.list; // 表格数据赋值
    tabTotal.value = rules.total;
    treeClick({ node: { '__tdesign_tree-node__': firstNode } }); // 模拟点击第一个节点下的第一个子节点
    treeClickData.value.one = firstNode.label; // 赋值第二个节点名称给面包屑
  }
});

// 获取树组件数据
const onGetTreeData = async () => {
  const res = await api.profile.getAllTree(); // 获取节点数据
  treeData.value = res.map(simplifyObject); // 转化数据保存
  const filteredLabels = filterLabels(treeData.value); // 转化数组
  treeArr.value = filteredLabels;
};

// 获取表格数据
const onGetTabData = async () => {
  clickNodeId.value.pageNum = pageUI.value.page;
  clickNodeId.value.pageSize = pageUI.value.rows;
  clickNodeId.value.key = keyword.value;
  const res = await api.profileValue.getProfileValueList(clickNodeId.value); // 获取第二节点的数据
  moduleData.value = res.list; // 表格数据赋值
  tabTotal.value = res.total;
};

// 树节点的点击事件，获取点击节点的文本
const treeClick = async ({ node }: { node: any }) => {
  pageUI.value.page = 1;
  formDataTwo.value.parentModuleId = node[`__tdesign_tree-node__`]?.data?.id;
  clickNodeId.value.nodeId = node[`__tdesign_tree-node__`]?.data?.id; // 保存当前点击节点的 ID
  clickNodeId.value.attribute = node[`__tdesign_tree-node__`]?.data?.attribute; // 保存当前点击节点的 属性
  clickNodeId.value.moduleName = node[`__tdesign_tree-node__`]?.data?.label; // 保存当前点击节点的 名称
  clickNodeId.value.parentModuleName = node[`__tdesign_tree-node__`]?.data?.label; // 保存当前点击节点的 说明
  clickNodeId.value.parentModuleName = node[`__tdesign_tree-node__`]?.parent?.label; // 保存当前点击节点父节点名称
  console.log(node.data);
  // 判断是否有子节点
  if (node.data.children && node.data.children.length > 0) {
    isButtonDisabled.value = true;
  } else if (clickNodeId.value.attribute === 2) {
    // 没有子节点
    isButtonDisabled.value = false;
  }

  await onGetTabData();
  treeClickData.value.one = node['__tdesign_tree-node__'].label;
  treeClickData.value.two = node['__tdesign_tree-node__'].parent?.label;
};
const demo1Filter = ref(null);
const demo1Input = (state: any) => {
  console.info('demo1 input:', state);
  if (treeKey.value) {
    // 存在过滤文案，才启用过滤
    demo1Filter.value = (node: { data: { label: string | any[] } }) => {
      const rs = node.data.label.indexOf(treeKey.value) >= 0;
      // 命中的节点会强制展示
      // 命中节点的路径节点会锁定展示
      // 未命中的节点会隐藏
      return rs;
    };
  } else {
    // 过滤文案为空，则还原 tree 为无过滤状态
    demo1Filter.value = null;
  }
};
const treeCard = ref(null);
const treeHeight = ref('400px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  treeHeight.value = `${height - 120}px`;
  console.error('treeHeight', treeHeight.value);
});
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.overlay-options {
  display: inline-block;
  font-size: 20px;
}
</style>
