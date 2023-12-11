<template>
  <div class="main-page">
    <t-card :bordered="false">
      <header class="module-header-box">
        <t-row justify="space-between">
          <!-- 左侧盒子 -->
          <t-col :span="3" flex="auto">
            <t-tree
              ref="treeRef"
              :data="treeData"
              hover
              activable
              :expand-level="2"
              :height="600"
              :transition="true"
              :expand-on-click-node="false"
              :icon="true"
              :scroll="{
                rowHeight: 34,
                bufferSize: 10,
                threshold: 10,
                type: 'virtual',
              }"
              @click="treeClick"
            >
            </t-tree>
          </t-col>
          <!-- 右侧盒子 -->
          <t-col :span="9" flex="auto" style="padding-left: 20px">
            <t-breadcrumb :max-item-width="'150'" style="margin-bottom: 10px">
              <t-breadcrumbItem v-if="treeClickData?.two">{{ treeClickData.two }}</t-breadcrumbItem>
              <t-breadcrumbItem v-if="treeClickData?.one" :max-width="'160'">
                {{ treeClickData.one }}
              </t-breadcrumbItem>
            </t-breadcrumb>
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="columns"
              :table-data="moduleData"
              :total="tabTotal"
              @refresh="fetchData"
            >
              <template #stateOp="slotProps">
                <t-space>
                  {{ getstateName(slotProps.row.state) }}
                </t-space>
              </template>
              <template #actionSlot="{ row }">
                <t-button size="small" variant="text" @click="onEditRowClick(row)">
                  <icon name="edit-1" class="black-icon" />
                </t-button>
              </template>
              <template #button>
                <t-space direction="vertical"> <t-button theme="primary" @click="onAdd()">新增</t-button> </t-space>
              </template>
            </cmp-table>
          </t-col>
        </t-row>
      </header>
    </t-card>
  </div>
  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formTitle"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <profile-form ref="formRef"></profile-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import ProfileForm from './form.vue';

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
const clickNodeId = ref({ nodeId: '', clientType: 1, pageNum: 1, pageSize: 10, attribute: 0, moduleName: '' });
const tabTotal = ref(null); // 表格数据总页数
const moduleData = ref([]); // 表格数据

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
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'moduleName',
    title: '功能名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'profileName',
    title: '配置项名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'profileCategory',
    title: '配置项维度',
    align: 'center',
    width: '100',
    cell: 'pc', // 指定插槽名称
  },
  {
    colKey: 'profileCategoryValue',
    title: '维度值',
    align: 'center',
    width: '100',
    cell: 'mobile', // 指定插槽名称
  },
  {
    colKey: 'profileValue',
    title: '配置项值',
    align: 'center',
    width: '100',
    cell: 'tv', // 指定插槽名称
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
    cell: 'wx', // 指定插槽名称
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];

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
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      fetchData();
    }
  });
};
const onEditRowClick = (value: any) => {
  formTitle.value = '编辑';
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formRef.value.formData.isState = value.row.state === 1;
  formRef.value.formData.enableLocation = value.row.isEnableLocation === 1;
  formRef.value.formData.enableUpload = value.row.isEnableUpload === 1;
  formRef.value.formData.operateTpye = 'edit';
  formVisible.value = true;
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
function simplifyObject(obj) {
  // 创建一个新对象，仅包含 name 和 children 字段
  const simplified = {
    id: obj.id,
    label: obj.modelName,
    attribute: obj.attribute,
    children: obj.childList ? obj.childList.map((child: any) => simplifyObject(child)) : [],
  };
  // 检查是否存在 children 字段
  if (obj.children && Array.isArray(obj.children)) {
    // 递归处理每个子对象
    simplified.children = obj.children.map((child: any) => simplifyObject(child));
  }
  return simplified;
}

// 在组件挂载后模拟 点击 第一个节点下面的子节点
onMounted(async () => {
  await onGetTreeData();
  // 确保树的第一个节点存在，并且它有子节点
  if (treeData.value.length > 0 && treeData.value[0].children && treeData.value[0].children.length > 0) {
    const firstNode = treeData.value[0]; // 第一个节点
    const firstChildNode = treeData.value[0].children[0]; // 第一个节点的第一个子节点
    const { id } = firstChildNode; // 保存该子节点的 ID
    clickNodeId.value.nodeId = id; // 保存当前节点的 ID
    const rules = await api.module.getList({ id, clientType: 1, pageNum: 1, pageSize: 10 }); // 请求：获取第二节点的数据
    moduleData.value = rules.list; // 表格数据赋值
    tabTotal.value = rules.total;
    treeClick({ node: { '__tdesign_tree-node__': firstChildNode } }); // 模拟点击第一个节点下的第一个子节点
    treeClickData.value.two = firstNode.label; // 赋值第一个节点名称给面包屑
    treeClickData.value.one = firstChildNode.label; // 赋值第二个节点名称给面包屑
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
  const res = await api.profile.getProfileList(clickNodeId.value); // 获取第二节点的数据
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
  clickNodeId.value.moduleName = node[`__tdesign_tree-node__`]?.data?.label; // 保存当前点击节点的 说明
  console.log(node[`__tdesign_tree-node__`]?.data);
  await onGetTabData();
  treeClickData.value.one = node['__tdesign_tree-node__'].label;
  treeClickData.value.two = node['__tdesign_tree-node__'].parent?.label;
};
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
