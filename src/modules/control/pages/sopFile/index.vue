<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card ref="treeCard" flex="360px">
        <t-space direction="vertical" :size="8">
          <span class="span_title">产品</span>
          <div class="divider"></div>
          <div class="container">
            <t-button size="small">
              <add-rectangle-icon @click="onAddMitemCategory" />
            </t-button>
            <t-popconfirm content="继续会删除该产品相应的工艺文件，是否继续？" @confirm="onDel">
              <t-button variant="outline" size="small">
                <multiply-icon />
              </t-button>
            </t-popconfirm>
            <t-button variant="outline" size="small">
              <login-icon @click="demo1Input" />
            </t-button>
            <t-input
              v-model="treeKey"
              style="width: 190px; margin-left: 5px"
              placeholder="产品关键字搜索"
              clearable
              @change="demo1Input"
            >
              <template #suffixIcon>
                <search-icon :style="{ cursor: 'pointer' }" @click="demo1Input" />
              </template>
            </t-input>
          </div>
          <t-tree
            ref="treeRef"
            style="width: 100%"
            :data="treeData"
            hover
            line
            activable
            :filter="demo1Filter"
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
              <icon :name="node.expanded ? 'folder-open' : 'folder'" />
            </template>
            <template #label="{ node }">
              <div class="no-wrap" :title="node.label">{{ node.label }}</div>
            </template>
          </t-tree>
        </t-space>
      </cmp-card>
      <cmp-card flex="auto">
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="sopProductId"
          :table-column="columns"
          :table-data="moduleData"
          :fixed-height="true"
          :total="tabTotal"
          @row-click="onRowClick"
          @refresh="fetchData"
        >
          <template #stateOp="slotProps">
            <t-tag v-if="slotProps.row.status === 'EFFECTIVE'" theme="success" variant="outline">
              {{ slotProps.row.statusName }}
            </t-tag>
            <t-tag v-else-if="slotProps.row.status === 'EXPIRED'" theme="danger" variant="outline">
              {{ slotProps.row.statusName }}
            </t-tag>
            <t-tag v-else variant="outline">
              {{ slotProps.row.statusName }}
            </t-tag>
          </template>
          <template #title>
            <t-button theme="primary" @click="onAddFile">新增</t-button>
            <t-button theme="default" :disabled="isButtonDisabled" @click="onEditRow">编辑</t-button>
            <t-button theme="default" :disabled="isButtonDisabled" @click="onDelRow">删除</t-button>
          </template>
          <template #button>
            <t-space direction="horizontal">
              <t-select v-model="clickNodeId.status" default-value="ALL">
                <t-option key="0" label="全部状态" value="ALL" />
                <t-option key="1" label="已生效" value="EFFECTIVE" />
                <t-option key="2" label="已失效" value="EXPIRED" />
                <t-option key="3" label="未启用" value="UNENABLE" />
              </t-select>
              <t-input v-model="keyword" style="width: 250px" placeholder="输入关键字进行过滤" :on-enter="onRefresh">
                <template #suffixIcon>
                  <search-icon :style="{ cursor: 'pointer' }" @click="onRefresh" />
                </template>
              </t-input>

              <!-- <t-button theme="primary" @click="onRefresh">查询</t-button> -->
            </t-space>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <t-dialog
    v-model:visible="formVisible"
    :header="formTitle"
    :cancel-btn="null"
    :confirm-btn="null"
    width="450px"
    :close-on-overlay-click="false"
    @close="onGetTreeData"
  >
    <template #footer>
      <t-button theme="default" @click="onCancelForm">保存并继续</t-button>
      <t-button theme="primary" @click="onConfirmForm()">保存</t-button>
    </template>
    <profile-form ref="formRef"></profile-form>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleAdd"
    :header="formTitle"
    :on-confirm="onConfirmFormAdd"
    width="850px"
    :close-on-overlay-click="false"
    @close="onGetTreeData"
  >
    <formAdd ref="formRefAdd"></formAdd>
  </t-dialog>
  <!-- !上传组件 弹框 -->
  <t-dialog
    v-model:visible="formVisibleFile"
    :close-on-overlay-click="false"
    header="文件上传"
    :confirm-btn="null"
    :cancel-btn="null"
    width="50%"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        upload-path="sopFile"
        :is-hand-delete="true"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'Profile',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { AddRectangleIcon, Icon, LoginIcon, MultiplyIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import BcmpUploadContent from './bcmp-upload-content/index.vue';
import ProfileForm from './form.vue';
import formAdd from './formAdd.vue';

// 获取全部图标的列表
const iconValue = ref('add');
const { pageUI } = usePage();
// // 上传文件
const fileList = ref([]);
const queryCompnent = ref({
  pageSize: 9999,
  pageNum: 1,
});
const totals = ref<number>(0); // 用户分页总数
// 树组件节点名称 TS 类型
interface TreeLabelData {
  firstLayerLabels: string[];
  secondLayerLabels: string[];
  thirdLayerLabels: string[];
}
const onAddFile = () => {
  if (!clickNodeId.value.mitemId) {
    MessagePlugin.warning('请选择产品');
    return;
  }
  formVisibleFile.value = true;
};
const curRow = ref();
const onRowClick = ({ row }) => {
  isButtonDisabled.value = false;
  curRow.value = row;
};
const onEditRow = () => {
  formRefAdd.value.init();
  formRefAdd.value.formData = curRow.value;
  formRefAdd.value.formData.id = curRow.value.sopProductId;
  formRefAdd.value.formData.isState = curRow.value.status !== 'UNENABLE';
  formRefAdd.value.formData.mitemId = clickNodeId.value.mitemId;
  formRefAdd.value.formData.mitemCategoryId = clickNodeId.value.mitemCategoryId;
  formRefAdd.value.formData.opType = 'edit';
  formTitle.value = '编辑';
  formVisibleAdd.value = true;
};
const onDelRow = async () => {
  await api.sopProduct.delFile({ id: curRow.value.sopProductId });
  MessagePlugin.success('删除成功');
  onRefresh();
};
const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(`上传文件成功`);
  fileList.value.push(file);
  formRefAdd.value.init();
  formRefAdd.value.formData.fileName = file.fileName;
  formRefAdd.value.formData.opType = 'add';
  formRefAdd.value.formData.mitemId = clickNodeId.value.mitemId;
  formRefAdd.value.formData.mitemCategoryId = clickNodeId.value.mitemCategoryId;
  formVisibleFile.value = false;
  formTitle.value = '新增';
  formVisibleAdd.value = true;
  console.log('🚀 ~ file: materialStandardAdd.vue:149 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: materialStandardAdd.vue:150 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传文件失败`);
  console.log('uploadSuccess', file);
};

// 树状数据 TS 类型
interface TreeNode {
  id?: string;
  label: string;
  children?: TreeNode[]; // 可选属性，表示子节点数组
}
const formVisible = ref(false);
const formVisibleFile = ref(false);
const formVisibleAdd = ref(false);
const formRef = ref(null);
const formRefAdd = ref(null);
const formTitle = ref('');
const treeRef = ref(null); // 树组件实例
const treeArr = ref<TreeLabelData | null>(null); // 组件挂载获取树组件名称数组
const treeData = ref<TreeNode[]>([]); // 树组件数据
const tabListData = ref(1); // 多端选中数据
const clickNodeId = ref({
  mitemCategoryId: '',
  mitemId: '',
  pageNum: 1,
  pageSize: 10,
  status: 'ALL',
  keyword: '',
});
const tabTotal = ref(0); // 表格数据总页数
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

const onDel = async () => {
  if (!clickNodeId.value.mitemId) {
    MessagePlugin.warning('请选择产品');
    return;
  }
  await api.sopProduct.onDelBatch(clickNodeId.value);
  MessagePlugin.success('操作成功');
};

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
    colKey: 'fileName',
    title: '名称',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'sopCategoryName',
    title: '文件类型',
    align: 'center',
    width: '140',
  },
  {
    colKey: 'stateOp',
    title: '状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeEffective',
    title: '启用日期',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeInvalid',
    title: '失效日期',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'processName',
    title: '工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '100',
  },
];
// 查询按钮
const onRefresh = () => {
  pageUI.value.page = 1;
  onGetTabData();
};

// 表格刷新按钮
const fetchData = () => {
  onGetTabData();
};
// 新增
const onAddMitemCategory = () => {
  formTitle.value = '新增';
  formVisible.value = true;
};

const onConfirmForm = async () => {
  const id = formRef.value.formData.mitemCategoryId;
  const item = treeData.value.find((item) => item.id === id);
  if (item) {
    MessagePlugin.warning('产品类别已存在，请确认后继续');
    return;
  }
  formRef.value.submit().then((data: any) => {
    if (data) {
      formVisible.value = false;
      fetchData();
    }
  });
};
const onConfirmFormAdd = async () => {
  formRefAdd.value.submit().then((data: any) => {
    if (data) {
      formVisibleAdd.value = false;
      onRefresh();
    }
  });
};
const onCancelForm = async () => {
  const id = formRef.value.formData.mitemCategoryId;
  const item = treeData.value.find((item) => item.id === id);
  if (item) {
    MessagePlugin.warning('产品类别已存在，请确认后继续');
    return;
  }
  formRef.value.submit().then((data: any) => {
    if (data) {
      formRef.value.init();
    }
  });
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

function simplifyObject(obj: {
  id: any;
  categoryId: any;
  mitemId: any;
  categoryCode: any;
  categoryName: any;
  mitemCode: any;
  mitemName: any;
  list: any[];
  children: any[];
}) {
  // 创建一个新对象，仅包含 label 和 children 字段
  const simplified = {
    id: obj.id ? obj.id : obj.mitemId,
    categoryId: obj.id ? obj.id : obj.categoryId,
    label: obj.id ? `${obj.categoryCode} ${obj.categoryName}` : `${obj.mitemCode} ${obj.mitemName}`,
    children: [],
  };
  // 检查是否存在 list 字段，如果存在则处理子级对象
  if (obj.list && Array.isArray(obj.list)) {
    // 递归处理每个子对象
    simplified.children = obj.list.map((child: any) => simplifyObject(child));
  }
  // 检查是否存在 children 字段，如果存在则处理子级对象
  else if (obj.children && Array.isArray(obj.children)) {
    // 递归处理每个子对象
    simplified.children = obj.children.map((child: any) => simplifyObject(child));
  }
  return simplified;
}

// 在组件挂载后模拟 点击 第一个节点
onMounted(async () => {
  await onGetTreeData();
});

// 获取树组件数据
const onGetTreeData = async () => {
  const res = await api.sopProduct.getMitemCategoryList({ keyword: treeKey.value, ...queryCompnent.value }); // 获取节点数据
  treeData.value = res.list.map(simplifyObject); // 转化数据保存
  totals.value = res.total;
  const filteredLabels = filterLabels(treeData.value); // 转化数组
  treeArr.value = filteredLabels;
};

// 获取表格数据
const onGetTabData = async () => {
  clickNodeId.value.pageNum = pageUI.value.page;
  clickNodeId.value.pageSize = pageUI.value.rows;
  clickNodeId.value.keyword = keyword.value;
  const res = await api.sopFile.getList(clickNodeId.value); // 获取第二节点的数据
  moduleData.value = res.list; // 表格数据赋值
  tabTotal.value = res.total;
};

// 树节点的点击事件，获取点击节点的文本
const treeClick = async ({ node }: { node: any }) => {
  clickNodeId.value.mitemId = '';
  // 检查节点是否有子节点，如果有则返回不操作
  if (node.data.children && node.data.children.length > 0) {
    return;
  }

  // 执行其他操作
  pageUI.value.page = 1;
  clickNodeId.value.mitemId = node[`__tdesign_tree-node__`]?.data?.id; // 保存当前点击节点的 ID
  clickNodeId.value.mitemCategoryId = node[`__tdesign_tree-node__`]?.data?.categoryId; // 保存当前点击节点的 ID
  await onGetTabData();
};
const demo1Filter = ref(null);
const demo1Input = (state: any) => {
  console.info('demo1 input:', state);
  if (treeKey.value) {
    // 存在过滤文案，才启用过滤
    demo1Filter.value = (node: { data: { label: string; children: any[] } }) => {
      // 检查节点是否有子节点
      const hasChildren = node.data.children && node.data.children.length > 0;
      // 如果节点没有子节点，且节点的文本包含过滤文案，则返回 true，表示命中
      if (!hasChildren && node.data.label.indexOf(treeKey.value) >= 0) {
        return true;
      }
      // 如果节点有子节点，则不进行过滤
      return false;
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

.divider {
  height: 1px;
  width: 100%; /* 设置间隔宽度 */
  background-color: var(--td-gray-color-8);
}

.container {
  display: flex;
  align-items: center;
}

.no-wrap {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 14px;
}

.overlay-options {
  display: inline-block;
  font-size: 20px;
}
</style>
