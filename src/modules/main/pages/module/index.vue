<template>
  <div class="module-tree-container">
    <t-card :bordered="false">
      <t-button @click="onAddFirstNode">新增</t-button>
      <header class="module-header-box">
        <t-row justify="space-between">
          <!-- 左侧盒子 -->
          <t-col :span="3" flex="auto">
            <t-tree
              ref="treeRef"
              :data="treeData"
              hover
              activable
              expand-all
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
              <template #operations="{ node }">
                <div class="tdesign-demo-block-row">
                  <t-button size="small" variant="text" @click="onAddSecondNode(node)">
                    <icon name="add" class="black-icon" />
                  </t-button>
                  <t-button size="small" variant="text" @click="onQueryTree(node)">
                    <icon name="edit-1" class="black-icon" />
                  </t-button>
                  <t-popconfirm theme="default" content="确认删除吗" @confirm="onDeleteTree">
                    <t-button size="small" variant="text">
                      <icon name="delete-1" class="black-icon" />
                    </t-button>
                  </t-popconfirm>
                </div>
              </template>
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
            <tm-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="columns"
              :table-data="moduleData"
              :total="tabTotal"
              @refresh="fetchData"
            >
              <template #pc="{ row }">
                <t-checkbox v-model="row.isPC" disabled></t-checkbox>
              </template>
              <template #mobile="{ row }">
                <t-checkbox v-model="row.isMobile" disabled></t-checkbox>
              </template>
              <template #tv="{ row }">
                <t-checkbox v-model="row.isTV" disabled></t-checkbox>
              </template>
              <template #Watches="{ row }">
                <t-checkbox v-model="row.isWatch" disabled></t-checkbox>
              </template>
              <template #wx="{ row }">
                <t-checkbox v-model="row.isWeChat" disabled></t-checkbox>
              </template>
              <template #actionSlot="{ row }">
                <t-popconfirm theme="default" content="确认禁用吗">
                  <t-button size="small" variant="text">
                    <icon name="delete" class="black-icon" />
                  </t-button>
                </t-popconfirm>
                <t-button size="small" variant="text" @click="onEditRow(row)">
                  <icon name="edit-1" class="black-icon" />
                </t-button>
                <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm">
                  <t-button size="small" variant="text" @click="onDelelist(row)">
                    <icon name="delete-1" class="black-icon" />
                  </t-button>
                </t-popconfirm>
              </template>
              <template #button>
                <t-space direction="vertical">
                  <custom-tabs v-model="selectedTabs" :tabs="tabItems" @selection-changed="handleSelectionChanged" />
                </t-space>
              </template>
            </tm-table>
          </t-col>
        </t-row>
      </header>
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      :close-on-overlay-click="false"
      :header="dialogTitle"
      :cancel-btn="null"
      :confirm-btn="null"
      width="50%"
      @close="onSecondaryReset"
    >
      <!-- #树组件添加功能 dialog -->
      <t-form v-if="showFirstNode" ref="formRef" :rules="rules" :data="formData" @submit="onWorkStationSubmit">
        <t-form-item label="模块编码" name="moduleCode">
          <t-input v-model="formData.moduleCode" :disabled="disableFlag"></t-input>
        </t-form-item>
        <t-form-item label="模块名称" name="moduleName">
          <t-input v-model="formData.moduleName" :disabled="disableFlag"></t-input>
        </t-form-item>
        <t-form-item label="模块描述" name="moduleDesc">
          <t-input v-model="formData.moduleDesc"></t-input>
        </t-form-item>
        <t-row>
          <t-col :span="12" class="align-right">
            <t-button theme="default" variant="base" @click="onSecondaryReset()">取消</t-button>
            <t-button theme="primary" type="submit">保存</t-button>
          </t-col>
        </t-row>
      </t-form>
      <!-- #树组件编辑功能 dialog -->
      <t-form v-if="showSecondNode" ref="formRef" :rules="rules" :data="formData" @submit="onWorkStationSubmit">
        <t-form-item label="菜单模块" name="menuName">
          <t-input v-model="formData.menuName" disabled></t-input>
        </t-form-item>
        <t-form-item label="子模块编码" name="moduleCode">
          <t-input v-model="formData.moduleCode" :disabled="disableFlag"></t-input>
        </t-form-item>
        <t-form-item label="子模块名称" name="moduleName">
          <t-input v-model="formData.moduleName" :disabled="disableFlag"></t-input>
        </t-form-item>
        <t-form-item label="子模块描述" name="moduleDesc">
          <t-textarea
            v-model="formData.moduleDesc"
            placeholder="请输入"
            name="description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </t-form-item>
        <t-row>
          <t-col :span="12" class="align-right">
            <t-button theme="default" variant="base" @click="onSecondaryReset()">取消</t-button>
            <t-button theme="primary" type="submit">保存</t-button>
          </t-col>
        </t-row>
      </t-form>
      <!-- #表单数据dialog -->
      <t-form v-if="showFormData" ref="formRef" :rules="rules" :data="formDataTwo" @submit="onWorkStationSubmit">
        <t-form-item label="菜单模块" name="menuName">
          <t-input v-model="parentClickTree" disabled></t-input>
        </t-form-item>
        <t-form-item label="菜单子模块" name="moduleName">
          <t-input v-model="oneselfClickTree" disabled></t-input>
        </t-form-item>
        <t-form-item label="终端类型" name="moduleName">
          <t-space direction="vertical">
            <custom-tabs v-model="dialogTabs" :tabs="dialogTabItems" @selection-changed="handleSelectionChanged" />
          </t-space>
        </t-form-item>
        <t-form-item label="模块编码" name="moduleCode">
          <t-input v-model="formDataTwo.moduleCode"></t-input>
        </t-form-item>
        <t-form-item label="菜单名称" name="moduleName">
          <t-input v-model="formDataTwo.moduleName" :disabled="disableFlag"></t-input>
        </t-form-item>
        <t-form-item label="菜单描述" name="moduleName">
          <t-textarea
            v-model="formDataTwo.moduleDesc"
            placeholder="请输入"
            name="description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </t-form-item>
        <t-form-item label="菜单地址" name="moduleName">
          <t-input v-model="formDataTwo.behaviorPath"></t-input>
        </t-form-item>
        <t-form-item v-if="tabListData !== 1" label="插件类型" name="moduleName">
          <t-select v-model="formDataTwo.moduleType" style="width: 150px; margin-right: 30px">
            <t-option key="apple" label="Apple" value="apple" />
            <t-option key="orange" label="Orange" value="orange">OrangeContentSlot</t-option>
            <t-option key="banana" label="Banana" value="banana" />
          </t-select>
          <t-upload theme="custom">
            <span>文件上传：</span>
            <t-button theme="primary">上传</t-button>
          </t-upload>
        </t-form-item>
        <t-form-item v-if="tabListData !== 1" label="插件版本" name="moduleName">
          <t-space direction="vertical">
            <t-input-number v-model="formDataTwo.moduleVersion" :default-value="200" align="center" />
          </t-space>
        </t-form-item>
        <t-form-item v-if="tabListData !== 1" label="插件包标识" name="moduleName">
          <t-input v-model="formDataTwo.modulePackageIdentify"></t-input>
        </t-form-item>
        <t-form-item label="菜单图标" name="moduleName">
          <t-select
            v-model="formDataTwo.iconPath"
            :style="{ width: '400px' }"
            :popup-props="{ overlayInnerStyle: { width: '400px' } }"
            class="overlay-fath"
          >
            <t-option v-for="item in options" :key="item.stem" :value="item.stem" class="overlay-options">
              <div>
                <t-icon :name="item.stem" />
              </div>
            </t-option>
            <template #valueDisplay
              ><t-icon :name="iconValue" :style="{ marginRight: '8px' }" />{{ iconValue }}</template
            >
          </t-select>
        </t-form-item>
        <t-row>
          <t-col :span="12" class="align-right">
            <t-button theme="default" variant="base" @click="onSecondaryReset()">取消</t-button>
            <t-button theme="primary" type="submit">保存</t-button>
          </t-col>
        </t-row>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon, manifest } from 'tdesign-icons-vue-next';
import { Data, FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, Ref, ref, watch } from 'vue';

import { api } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import CustomTabs from './CustomTabs.vue';
// 获取全部图标的列表
const options = ref(manifest);
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

interface TabItem {
  label: string;
  value: string;
}

const selectedTabs = ref<string[]>(['0']); // 选中的端
const dialogTabs = ref<string[]>(['0']); // 选中的端
const tabItems = ref<TabItem[]>([
  { label: '全部', value: '0' },
  { label: 'pc端', value: '1' },
  { label: '移动端', value: '2' },
  { label: '电视端', value: '3' },
  { label: '手表端', value: '4' },
  { label: '微信端', value: '5' },
]);
const dialogTabItems = ref<TabItem[]>([
  { label: 'pc端', value: '0' },
  { label: '移动端', value: '1' },
  { label: '电视端', value: '2' },
  { label: '手表端', value: '3' },
  { label: '微信端', value: '4' },
]);
const showFirstNode = ref(false); // 一级
const showSecondNode = ref(false); // 二级
const showFormData = ref(false); // 三级
const disableFlag = ref(false); // 编辑按钮禁用input 功能
const treeRef = ref(null); // 树组件实例
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const dialogTitle = ref(''); // 模态框标题
const formVisible = ref(false); // 控制模态框显示隐藏
const treeArr = ref<TreeLabelData | null>(null); // 组件挂载获取树组件名称数组
const treeClickData = ref({ one: '', two: '' }); // 面包屑文本
const parentClickTree = ref(''); // 编辑模块，当前点击 父节点 的名称
const oneselfClickTree = ref(''); // 编辑模块，当前点击 自身节点 的名称
const treeData = ref<TreeNode[]>([]); // 树组件数据
const tabListData = ref(1); // 多端选中数据
const clickNodeId = ref({ id: '', clientType: 1, pageNum: 1, pageSize: 10 });
const tabTotal = ref(null); // 表格数据总页数
const isEditMode = ref(false); // false 表示默认为新增模式
const isEditModeTwo = ref(false); // false 表示默认为新增模式
const isEditModeThree = ref(false); // false 表示默认为新增模式
const onDelelistID = ref(''); // 右侧删除id
const isRefreshTab = ref(true);
const moduleData = ref([]); // 表格数据
// 模态框输入框数据
const formData = ref({
  moduleCode: '', // 模块编码
  menuName: '', // 菜单模块
  moduleName: '', // 模块名称
  moduleDesc: '', // 模块描述
});

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
    colKey: 'name',
    title: '模块名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'moduleDesc',
    title: '模块描述',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'isPC',
    title: 'pc端',
    align: 'center',
    width: '100',
    cell: 'pc', // 指定插槽名称
  },
  {
    colKey: 'isMobile',
    title: '移动端',
    align: 'center',
    width: '100',
    cell: 'mobile', // 指定插槽名称
  },
  {
    colKey: 'isTV',
    title: '电视端',
    align: 'center',
    width: '100',
    cell: 'tv', // 指定插槽名称
  },
  {
    colKey: 'isWeChat',
    title: '手表端',
    align: 'center',
    width: '100',
    cell: 'Watches', // 指定插槽名称
  },
  {
    colKey: 'WeChat',
    title: '微信端',
    align: 'center',
    width: '100',
    cell: 'wx', // 指定插槽名称
  },
  {
    colKey: 'path',
    title: '模块地址',
    align: 'center',
    width: '160',
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

// 表单验证规则
const rules: FormRules<Data> = {
  moduleName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};

// 表格刷新按钮
const fetchData = () => {
  onGetTabData();
};

// 顶部多端选择事件
const handleSelectionChanged = async (num: any) => {
  // const array = num.slice(1); // 删除第一位
  tabListData.value = parseInt(num.reverse().join(''), 10); // 翻转数组，将数组变成整形数据
  if (parseInt(num.reverse().join(''), 10) === 1) {
    return;
  }
  // 如果没有打开新增或者删除
  if (isRefreshTab.value) {
    const res = await api.module.getList({
      id: clickNodeId.value.id,
      clientType: parseInt(num.reverse().join(''), 10),
      pageNum: 1,
      pageSize: 10,
    });
    pageUI.value.page = 1;
    moduleData.value = res.list;
    tabTotal.value = res.total;
  }
};

// 点击 左侧 新增按钮
const onAddFirstNode = () => {
  isEditMode.value = true;
  isEditModeTwo.value = true;
  isEditModeThree.value = true;
  showFirstNode.value = true; // 一级
  showSecondNode.value = false; // 二级
  showFormData.value = false; // 三级
  disableFlag.value = false; // 开关
  formVisible.value = true; // 模态框
  isRefreshTab.value = false; // 控制页面 tab栏切换是否可点击
  dialogTitle.value = '添加节点';
};

// 点击 左侧 新增图标
const onAddSecondNode = (node: any) => {
  if (!node[`__tdesign_tree-node__`].parent?.label) {
    isEditMode.value = true;
    isEditModeTwo.value = true;
    isEditModeThree.value = true;
    showFirstNode.value = false; // 一级
    showSecondNode.value = true; // 二级
    showFormData.value = false; // 三级
    disableFlag.value = false; // 开关
    formVisible.value = true; // 模态框
    isRefreshTab.value = false; // 控制页面 tab栏切换是否可点击
    formData.value.menuName = node[`__tdesign_tree-node__`].label;
    clickNodeId.value.id = node[`__tdesign_tree-node__`]?.data?.id; // 获取当前节点 ID
  } else {
    dialogTabs.value = ['0'];
    tabListData.value = 1;
    formDataTwo.value.moduleCode = ''; // 模块编码
    formDataTwo.value.moduleName = ''; // 菜单名称
    formDataTwo.value.moduleDesc = ''; // 菜单描述
    formDataTwo.value.behaviorPath = ''; // 菜单地址
    formDataTwo.value.moduleType = ''; // 模块类型
    formDataTwo.value.moduleVersion = null; // 模块版本号
    formDataTwo.value.modulePackageIdentify = ''; // 模块标识
    formDataTwo.value.iconPath = 'add'; // 图标地址
    isEditMode.value = true;
    isEditModeTwo.value = true;
    isEditModeThree.value = true;
    showFirstNode.value = false; // 一级
    showSecondNode.value = false; // 二级
    showFormData.value = true; // 三级
    disableFlag.value = false; // 开关
    formVisible.value = true; // 模态框
    isRefreshTab.value = false; // 控制页面 tab栏切换是否可点击
  }
  parentClickTree.value = node[`__tdesign_tree-node__`].parent.label; // 设置父组件名称
  oneselfClickTree.value = node[`__tdesign_tree-node__`].label; // 设置 自身名称
  formVisible.value = true; // 显示模态框
  dialogTitle.value = '添加节点';
};

// 点击 左侧 编辑图标
const onQueryTree = (node: any) => {
  clickNodeId.value.id = node[`__tdesign_tree-node__`]?.data?.id; // 保存当前节点 id
  formData.value.moduleCode = node[`__tdesign_tree-node__`]?.data?.moduleCode; // 模块编码回填
  formData.value.moduleDesc = node[`__tdesign_tree-node__`]?.data?.moduleDesc; // 模块描述回填
  // 判断有无父节点
  if (!node[`__tdesign_tree-node__`].parent?.label) {
    isEditMode.value = false;
    isEditModeTwo.value = false;
    isEditModeThree.value = false;
    showFirstNode.value = true; // 一级
    showSecondNode.value = false; // 二级
    showFormData.value = false; // 三级
    formVisible.value = true; // 模态框
    disableFlag.value = true; // input禁用按钮
    formData.value.moduleName = node[`__tdesign_tree-node__`].label;
  } else {
    isEditMode.value = false;
    isEditModeTwo.value = false;
    isEditModeThree.value = false;
    showFirstNode.value = false; // 一级
    showSecondNode.value = true; // 二级
    showFormData.value = false; // 三级
    formVisible.value = true; // 模态框
    disableFlag.value = true;
    formData.value.menuName = node[`__tdesign_tree-node__`].parent.label; // 父节点名称
    formData.value.moduleName = node[`__tdesign_tree-node__`].label; // 自身节点名称
  }
  formVisible.value = true; // 显示模态框
  dialogTitle.value = '编辑节点';
};

function extractValues(data: { isMobile: number; isTV: number; isWatch: number; isWeChat: number }) {
  const result = [];
  if (data.isMobile !== undefined && data.isMobile === 1) result.push('1');
  if (data.isTV !== undefined && data.isTV === 1) result.push('2');
  if (data.isWatch !== undefined && data.isWatch === 1) result.push('3');
  if (data.isWeChat !== undefined && data.isWeChat === 1) result.push('4');
  return result;
}

// 点击 右侧 表单数据编辑按钮
const onEditRow = (row: any) => {
  isRefreshTab.value = false; // 控制页面 tab栏切换是否可点击
  tabListData.value = row.clientType;
  onDelelistID.value = row.id; // 存储当前 id
  if (row.isPC === 1) {
    dialogTabs.value = ['0'];
  } else {
    const newArr = extractValues(row);
    dialogTabs.value = newArr;
  }
  parentClickTree.value = treeClickData.value.two;
  oneselfClickTree.value = treeClickData.value.one;
  formDataTwo.value.moduleCode = row.moduleCode; // 模块编码
  formDataTwo.value.moduleName = row.name; // 菜单名称
  formDataTwo.value.moduleDesc = row.moduleDesc; // 菜单描述
  formDataTwo.value.behaviorPath = row.path; // 菜单地址
  formDataTwo.value.moduleType = row.moduleType; // 模块类型
  formDataTwo.value.moduleVersion = row.moduleVersion; // 模块版本号
  formDataTwo.value.modulePackageIdentify = row.modulePackageIdentify; // 模块标识
  isEditMode.value = false;
  isEditModeTwo.value = false;
  isEditModeThree.value = false;
  showFirstNode.value = false; // 一级
  showSecondNode.value = false; // 二级
  formVisible.value = true; //
  disableFlag.value = true; //
  formVisible.value = true;
  showFormData.value = true;
  dialogTitle.value = '编辑菜单';
};

// 点击删除树节点按钮事件
const onDeleteTree = async () => {
  const res = await api.module.findChild({ id: clickNodeId.value.id });
  if (res.total > 0) {
    MessagePlugin.warning('不可删除,有子菜单');
  } else {
    await api.module.remove({ id: clickNodeId.value.id });
    await onGetTreeData();
  }
};

// 获取本行 ID
const onDelelist = (row: { id: string }) => {
  onDelelistID.value = row.id;
};

// 右侧 tab 删除 事件
const onDelConfirm = async () => {
  await api.module.remove({ id: onDelelistID.value });
  if (moduleData.value.length <= 1 && clickNodeId.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetTabData(); // 获取表格数据
  MessagePlugin.success('删除成功');
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
    moduleDesc: obj.moduleDesc, // 模块描述
    moduleCode: obj.moduleCode, // 模块编码
    id: obj.id,
    label: obj.name,
    sortIndex: obj.sortIndex,
    children: obj.children ? obj.children.map((child: any) => simplifyObject(child)) : [],
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
    clickNodeId.value.id = id; // 保存当前节点的 ID
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
  const res = await api.module.getTree({ clientType: 1 }); // 获取节点数据
  treeData.value = res.map(simplifyObject); // 转化数据保存
  const filteredLabels = filterLabels(treeData.value); // 转化数组
  treeArr.value = filteredLabels;
};

// 获取表格数据
const onGetTabData = async () => {
  clickNodeId.value.pageNum = pageUI.value.page;
  clickNodeId.value.pageSize = pageUI.value.rows;
  const res = await api.module.getList(clickNodeId.value); // 获取第二节点的数据
  moduleData.value = res.list; // 表格数据赋值
  tabTotal.value = res.total;
};

// 树节点的点击事件，获取点击节点的文本
const treeClick = async ({ node }: { node: any }) => {
  pageUI.value.page = 1;
  formDataTwo.value.parentModuleId = node[`__tdesign_tree-node__`]?.data?.id;
  clickNodeId.value.id = node[`__tdesign_tree-node__`]?.data?.id; // 保存当前点击节点的 ID
  // 如果没有父节点，就不发请求
  if (!node[`__tdesign_tree-node__`].parent) {
    return;
  }
  await onGetTabData();
  treeClickData.value.one = node['__tdesign_tree-node__'].label;
  treeClickData.value.two = node['__tdesign_tree-node__'].parent?.label;
};

// 关闭模态框事件
const onSecondaryReset = () => {
  MessagePlugin.success('取消编辑');
  isRefreshTab.value = true; // 控制页面 tab栏切换是否可点击
  disableFlag.value = false; // 控制编辑 是否禁用子模块名称
  isEditMode.value = false; // 控制一级 是新增还是编辑
  formVisible.value = false;
  formRef.value.reset({ type: 'empty' });
};

// 保存确认按钮
interface RootObject {
  validateResult: boolean;
  firstError: string;
}

// 一级菜单新增，编辑请求
const onAddOneModule = async () => {
  if (!isEditMode.value) {
    await onRedactOne(); // 编辑请求
    MessagePlugin.success('编辑成功');
  } else {
    await api.module.addModule({
      // 新增请求
      moduleLevel: 'ROOT',
      clientType: 1,
      moduleName: formData.value.moduleName,
      moduleCode: formData.value.moduleCode,
      moduleDesc: formData.value.moduleDesc,
    });
    MessagePlugin.success('新增成功');
  }
  formVisible.value = false;
};

// 二级菜单新增，编辑请求
const onAddTwoModule = async () => {
  if (!isEditModeTwo.value) {
    onRedactTwo(); // 编辑请求
    MessagePlugin.success('编辑成功');
  } else {
    // 新增请求
    await api.module.addModule({
      moduleLevel: 'BARNCH',
      clientType: 1,
      moduleName: formData.value.moduleName,
      moduleCode: formData.value.moduleCode,
      moduleDesc: formData.value.moduleDesc,
      parentModuleId: clickNodeId.value.id,
    });
    MessagePlugin.success('新增成功');
  }
  formVisible.value = false;
};

// 三级菜单新增，编辑请求
const onAddThreeModule = async () => {
  // 编辑请求
  if (!isEditModeThree.value) {
    onRedactThree();
    MessagePlugin.success('编辑成功');
  } else {
    // 新增请求
    await api.module.addModule({
      moduleLevel: formDataTwo.value.moduleLevel,
      clientType: formDataTwo.value.clientType, // 终端类型
      moduleCode: formDataTwo.value.moduleCode, // 模块编码
      moduleName: formDataTwo.value.moduleName, // 菜单名称
      moduleDesc: formDataTwo.value.moduleDesc, // 菜单描述
      behaviorPath: formDataTwo.value.behaviorPath, // 菜单地址
      iconPath: formDataTwo.value.iconPath, // 图标地址
      parentModuleId: formDataTwo.value.parentModuleId, // 父组件 ID
      moduleType: formDataTwo.value.moduleType, // 模块类型
      moduleVersion: formDataTwo.value.moduleVersion, // 模块版本号
      modulePackageIdentify: formDataTwo.value.modulePackageIdentify, // 模块标识
    });
    MessagePlugin.success('新增成功');
  }
};

// 编辑一级请求
const onRedactOne = async () => {
  await api.module.modify({
    id: clickNodeId.value.id,
    moduleLevel: 'ROOT',
    clientType: 1,
    moduleName: formData.value.moduleName,
    moduleCode: formData.value.moduleCode,
    moduleDesc: formData.value.moduleDesc,
  });
};

// 编辑二级请求
const onRedactTwo = async () => {
  await api.module.modify({
    id: clickNodeId.value.id,
    moduleLevel: 'ROOT',
    clientType: 1,
    moduleName: formData.value.moduleName,
    moduleCode: formData.value.moduleCode,
    moduleDesc: formData.value.moduleDesc,
  });
};

// 编辑三级请求
const onRedactThree = async () => {
  await api.module.modify({
    moduleLevel: formDataTwo.value.moduleLevel,
    clientType: formDataTwo.value.clientType, // 终端类型
    moduleCode: formDataTwo.value.moduleCode, // 模块编码
    moduleName: formDataTwo.value.moduleName, // 菜单名称
    moduleDesc: formDataTwo.value.moduleDesc, // 菜单描述
    behaviorPath: formDataTwo.value.behaviorPath, // 菜单地址
    iconPath: formDataTwo.value.iconPath, // 图标地址
    id: onDelelistID.value,
    moduleType: formDataTwo.value.moduleType, // 模块类型
    moduleVersion: formDataTwo.value.moduleVersion, // 模块版本号
    modulePackageIdentify: formDataTwo.value.modulePackageIdentify, // 模块标识
  });
};

// 表单的 提交 事件
const onWorkStationSubmit = async (context: RootObject) => {
  if (context.validateResult === true) {
    if (showFirstNode.value) {
      await onAddOneModule(); // 新增，编辑 第一节点
    }
    if (showSecondNode.value) {
      await onAddTwoModule(); // 新增，编辑 第二节点
    }
    if (showFormData.value) {
      await onAddThreeModule(); // 新增，编辑 第三节点
    }
  }
  await onGetTreeData(); // 更新树组件数据
  await onGetTabData(); // 获取表格数据
  isRefreshTab.value = true; // 控制页面 tab栏切换是否可点击
  formVisible.value = false;
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
