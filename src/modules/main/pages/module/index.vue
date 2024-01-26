<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card ref="treeCard" flex="300px">
        <cmp-container :full="true" style="padding: 0" :full-sub-index="[0]">
          <t-tree
            ref="treeRef"
            :data="treeData.list"
            hover
            :keys="keyList"
            :height="treeHeight"
            :scroll="treeScroll"
            :transition="true"
            :icon="true"
            :expand-level="1"
            :activable="true"
            :expand-on-click-node="true"
            :actived="[treeClickActive]"
            @click="treeClick"
            @active="onActive"
          >
            <template #icon="{ node }">
              <icon v-if="node[`__tdesign_tree-node__`]?.data" :name="node[`__tdesign_tree-node__`]?.data.iconPath" />
            </template>
            <template #operations="{ node }">
              <div v-if="treeClickActive === node[`__tdesign_tree-node__`]?.data.id" class="tdesign-demo-block-row">
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
          <cmp-card :span="12" :ghost="true">
            <t-button theme="default" variant="dashed" @click="onAddFirstNode">新增</t-button>
          </cmp-card>
        </cmp-container>
      </cmp-card>

      <!-- 右侧盒子 -->
      <cmp-card flex="auto" style="min-width: 1px">
        <cmp-container :full="true" style="padding: 0">
          <t-breadcrumb :max-item-width="'150'" style="padding: 0">
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
            :fixed-height="true"
            drag-sort="row"
            @drag-sort="onDragSort"
            @refresh="fetchData"
          >
            <template #stateSwitch="{ row }">
              <t-switch
                :custom-value="[1, 0]"
                :value="row.state"
                :default-value="row.state"
                size="large"
                @change="(value) => onSwitchChange(row, value)"
              ></t-switch>
            </template>
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
              <t-link theme="primary" style="margin-right: 10px" @click="onEditRow(row)"> 编辑 </t-link>
              <t-popconfirm content="确认删除吗" @confirm="onDelConfirm">
                <t-link theme="primary" @click="onDelelist(row)"> 删除 </t-link>
              </t-popconfirm>
            </template>
            <template #title>
              <t-space direction="vertical">
                <custom-tabs v-model="selectedTabs" :tabs="tabItems" @selection-changed="topSelectionChanged" />
              </t-space>
            </template>
          </cmp-table>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    :header="dialogTitle"
    :cancel-btn="null"
    :confirm-btn="null"
    top="60px"
    :width="showFormData ? '850px' : '450px'"
    @close="onSecondaryReset"
  >
    <!-- #一级菜单 dialog -->
    <t-form
      v-if="showFirstNode"
      ref="formRefOne"
      :rules="oneRules"
      :data="formData"
      label-width="120px"
      @submit="onWorkStationSubmit"
    >
      <t-form-item label="模块编码" name="moduleCode">
        <t-input v-model="formData.moduleCode" :disabled="disableFlag"></t-input>
      </t-form-item>
      <t-form-item label="模块名称" name="moduleName">
        <t-input v-model="formData.moduleName" :disabled="disableFlag"></t-input>
      </t-form-item>
      <t-form-item label="模块描述" name="moduleDesc">
        <t-input v-model="formData.moduleDesc"></t-input>
      </t-form-item>
      <t-form-item label="菜单图标">
        <t-select
          v-model="formData.iconPath"
          :style="{ width: '100%' }"
          :popup-props="{ overlayInnerStyle: { width: '500px' } }"
        >
          <t-option
            v-for="item in options"
            :key="item.stem"
            :value="item.stem"
            style="display: inline-block; font-size: 20px"
          >
            <div>
              <t-icon :name="item.stem" />
            </div>
          </t-option>
          <template #valueDisplay
            ><t-icon :name="formData.iconPath" :style="{ marginRight: '8px' }" />{{ formData.iconPath }}</template
          >
        </t-select>
      </t-form-item>
    </t-form>
    <!-- #二级菜单 dialog -->
    <t-form
      v-if="showSecondNode"
      ref="formRefTwo"
      :rules="twoRules"
      :data="formDataOne"
      label-width="120px"
      @submit="onWorkStationSubmit"
    >
      <t-form-item label="菜单模块" name="menuName">
        <!-- <t-input v-if="isEditModeTwo" v-model="formDataTwo.parentClickTree" :disabled="isEditModeTwo"></t-input> -->
        <t-select v-model="formDataOne.menuName" :disabled="!disableFlag">
          <t-option v-for="item in menuSelectList" :key="item.id" :label="item.moduleName" :value="item.id" />
        </t-select>
      </t-form-item>
      <t-form-item label="子模块编码" name="moduleCode">
        <t-input v-model="formDataOne.moduleCode" :disabled="disableFlag"></t-input>
      </t-form-item>
      <t-form-item label="子模块名称" name="moduleName">
        <t-input v-model="formDataOne.moduleName"></t-input>
      </t-form-item>
      <t-form-item label="子模块描述" name="moduleDesc" class="full-form-item">
        <t-textarea
          v-model="formDataOne.moduleDesc"
          placeholder="请输入"
          name="description"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </t-form-item>
      <t-form-item label="菜单图标">
        <t-select
          v-model="formDataOne.iconPath"
          :style="{ width: '100%' }"
          :popup-props="{ overlayInnerStyle: { width: '500px' } }"
        >
          <t-option
            v-for="item in options"
            :key="item.stem"
            :value="item.stem"
            style="display: inline-block; font-size: 20px"
          >
            <div>
              <t-icon :name="item.stem" />
            </div>
          </t-option>
          <template #valueDisplay
            ><t-icon :name="formDataOne.iconPath" :style="{ marginRight: '8px' }" />{{ formDataOne.iconPath }}</template
          >
        </t-select>
      </t-form-item>
    </t-form>
    <!-- #三级菜单 dialog -->
    <t-form
      v-if="showFormData"
      ref="formRefThree"
      :rules="rules"
      :data="formDataTwo"
      label-width="120px"
      @submit="onWorkStationSubmit"
    >
      <t-row :gutter="[12, 16]">
        <t-col :span="12">
          <!-- 第 3️⃣ 行数据 -->
          <t-form-item label="终端类型" class="full-form-item">
            <t-space direction="vertical">
              <custom-tabs-two
                v-model="dialogTabs"
                :tabs="dialogTabItems"
                @selection-changed="handleSelectionChanged"
              ></custom-tabs-two>
            </t-space>
          </t-form-item>
        </t-col>
        <!-- 第 1️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item label="菜单模块" name="parentClickTree">
            <t-input v-if="isEditModeTwo" v-model="formDataTwo.parentClickTree" :disabled="isEditModeTwo"></t-input>
            <t-select v-if="!isEditModeTwo" v-model="formDataTwo.parentClickTree" @change="onMenuSonID">
              <t-option v-for="item in menuSelectList" :key="item.id" :label="item.moduleName" :value="item.id" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <!-- 第 2️⃣ 行数据 -->
          <t-form-item v-if="isEditModeTwo" label="菜单子模块" name="oneselfClickTree">
            <t-input v-model="formDataTwo.oneselfClickTree" :disabled="isEditModeTwo"></t-input>
          </t-form-item>
          <t-form-item v-if="!isEditModeTwo" label="菜单子模块" name="parentModuleId">
            <t-select v-model="formDataTwo.parentModuleId">
              <t-option v-for="item in menuSonSelectList" :key="item.id" :label="item.moduleName" :value="item.id" />
            </t-select>
          </t-form-item>
        </t-col>

        <t-col :span="6">
          <!-- 第 4️⃣ 行数据 -->
          <t-form-item label="菜单编码" name="moduleCode">
            <t-input v-model="formDataTwo.moduleCode"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <!-- 第 5️⃣ 行数据 -->
          <t-form-item label="菜单名称" name="moduleName">
            <t-input v-model="formDataTwo.moduleName"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <!-- 第 6️⃣ 行数据 -->
          <t-form-item label="菜单描述" name="moduleDesc" class="full-form-item">
            <t-textarea
              v-model="formDataTwo.moduleDesc"
              placeholder="请输入"
              name="description"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <!-- 第 5️⃣ 行数据 -->
          <t-form-item label="菜单地址" name="behaviorPath" class="full-form-item">
            <t-input v-model="formDataTwo.behaviorPath"></t-input>
          </t-form-item>
        </t-col>
        <t-col v-if="dialogListData !== 1" :span="6">
          <!-- 第 5️⃣ 行数据 -->
          <t-form-item label="插件类型" name="moduleType">
            <t-select v-model="formDataTwo.moduleType">
              <t-option label="本地插件" value="LOCAL" />
              <t-option label="远程URl" value="URL" />
            </t-select>

            <!-- <div v-if="files && files.length" style="margin-left: 10px">
            <ul style="padding: 0">
              <li v-for="(item, index) in files" :key="index" style="list-style-type: none">{{ item.name }}</li>
            </ul>
          </div> -->
          </t-form-item>
        </t-col>
        <t-col v-if="formDataTwo.moduleType === 'LOCAL' && dialogListData !== 1" :span="6">
          <t-upload
            ref="uploadRef"
            v-model="files"
            theme="file"
            :tips="tips"
            :auto-upload="false"
            :before-upload="beforeUpload"
            placeholder=""
            @fail="handleFail"
            @remove="onRemove"
          >
            <span>文件上传：</span>
            <t-button theme="primary">上传</t-button>
          </t-upload>
          <t-tag
            v-if="formDataTwo?.packageName && !files.length && formDataTwo.moduleType === 'LOCAL'"
            variant="outline"
            theme="primary"
            closable
            style="margin: 0 10px"
            @close="onDelFileClose"
          >
            {{ formDataTwo?.packageName }}</t-tag
          >
          <t-button
            v-if="formDataTwo?.packageName && !files.length && formDataTwo.moduleType === 'LOCAL'"
            @click="onUploadFile"
          >
            下载文件
          </t-button>
        </t-col>
        <t-col v-if="dialogListData !== 1" :span="6">
          <t-form-item label="插件版本" name="moduleVersion">
            <t-input-number
              v-model="formDataTwo.moduleVersion"
              theme="column"
              style="width: 100%"
              :default-value="200"
            />
          </t-form-item>
        </t-col>
        <t-col v-if="dialogListData !== 1" :span="6">
          <t-form-item label="插件包标识" name="modulePackageIdentify">
            <t-input v-model="formDataTwo.modulePackageIdentify"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="菜单图标">
            <t-select
              v-model="formDataTwo.iconPath"
              :style="{ width: '100%' }"
              :popup-props="{ overlayInnerStyle: { width: '500px' } }"
            >
              <t-option
                v-for="item in options"
                :key="item.stem"
                :value="item.stem"
                style="display: inline-block; font-size: 20px"
              >
                <div>
                  <t-icon :name="item.stem" />
                </div>
              </t-option>
              <template #valueDisplay
                ><t-icon :name="formDataTwo.iconPath" :style="{ marginRight: '8px' }" />{{
                  formDataTwo.iconPath
                }}</template
              >
            </t-select>
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset()">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit()">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { Icon, manifest } from 'tdesign-icons-vue-next';
import {
  CustomValidateResolveType,
  Data,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
  TScroll,
} from 'tdesign-vue-next';
import { nextTick, onMounted, reactive, Ref, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import CustomTabs from './CustomTabs.vue';
import CustomTabsTwo from './CustomTabsTwo.vue';
// 获取全部图标的列表
const options = ref(manifest);
const { pageUI } = usePage();

// 上传文件
const files = ref([]);
const uploadRef = ref();
const tips = '上传文件大小在 5M 以内';
// 树状结构定义
const keyList = ref({ value: 'id', label: 'name', children: 'children' });

interface TabItem {
  label: string;
  value: string;
}

const selectedTabs = ref<string[]>(['0']); // 选中的端
const dialogTabs = ref<string[]>(['0']); // 选中的端
// 表格 选项卡 数据
const tabItems = ref<TabItem[]>([
  { label: '全部', value: '0' },
  { label: 'pc端', value: '1' },
  { label: '移动端', value: '2' },
  { label: '电视端', value: '3' },
  { label: '手表端', value: '4' },
  { label: '微信端', value: '5' },
]);
// DiaLog 选项卡 数据
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
const disableFlag = ref(false); // 编辑按钮禁用 input 功能
const treeRef = ref(null); // 树组件实例
// const treeScroll = ref({
//   rowHeight: 34,
//   bufferSize: 10,
//   threshold: 10,
//   type: 'virtual',
// } as TScroll);
const formRefOne: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const formRefTwo: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const formRefThree: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例

const dialogTitle = ref(''); // 模态框标题
const formVisible = ref(false); // 控制模态框显示隐藏
const treeClickData = ref({ one: '', two: '' }); // 面包屑文本
const treeData = reactive({ list: [] }); // 树组件数据
const tabListData = ref(0); // 多端选中数据
const dialogListData = ref(1); // 模态框多端选中数据
const clickNodeId = ref({
  id: '',
  clientType: tabListData.value,
  pageNum: pageUI.value.page,
  pageSize: pageUI.value.rows,
});
const tabTotal = ref(0); // 表格数据总页数
const isEditMode = ref(false); // false 表示默认为新增模式
const isEditModeTwo = ref(false); // false 表示默认为新增模式
const isEditModeThree = ref(false); // false 表示默认为新增模式
const onDelelistID = ref(''); // 右侧删除id
const moduleData = ref([]); // 表格数据

// 一级节点 DiaLog 数据
const formData = ref({
  moduleCode: '', // 模块编码
  moduleName: '', // 模块名称
  moduleDesc: '', // 模块描述
  iconPath: '', // 图标地址
});

// 二级节点 DiaLog 数据
const formDataOne = ref({
  menuName: '', // 父级 菜单模块
  moduleCode: '', // 模块编码
  moduleName: '', // 模块名称
  moduleDesc: '', // 模块描述
  iconPath: '', // 图标地址
});

// 三级节点 DiaLog 数据
const formDataTwo = ref({
  parentClickTree: '', // 编辑模块，当前点击 父节点 的名称
  oneselfClickTree: '', // 自身节点名称，用于回填
  moduleType: 'LOCAL', // 模块类型
  moduleVersion: null, // 模块版本号
  modulePackageIdentify: '', // 模块标识
  moduleLevel: 'LEAF',
  clientType: tabListData.value, // 终端类型
  moduleCode: '', // 模块编码
  moduleName: '', // 菜单名称
  moduleDesc: '', // 菜单描述
  behaviorPath: '', // 菜单地址
  iconPath: '', // 图标地址
  parentModuleId: null, // 父组件 ID
  menuId: null,
  clientTypeData: null, // 中断类型，进制
  packageName: '', // 上传文件文件名
});

// 表格拖拽
const onDragSort = async (params: any) => {
  moduleData.value = params.newData;
  const ids = params.newData.map((obj: any) => obj.id);
  await api.module.sortThisLevelAll({ ids, pageNum: pageUI.value.page, pageSize: pageUI.value.rows });
};

// 树节点高亮 有两个参数
const treeClickActive = ref('');
const onActive = (vals: any) => {
  [treeClickActive.value] = vals;
};

// 文件上传事件
const beforeUpload = (file: any) => {
  formDataTwo.value.packageName = file?.name;
  if (file.size > 5 * 1024 * 1024) {
    MessagePlugin.warning('上传的图片不能大于5M');
    return false;
  }
  return true;
};
const onRemove = () => {
  formDataTwo.value.packageName = '';
};
// 文件上传错误提示事件
const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
// 编辑回填文件删除 点击事件
const delFileClick = ref(false);
const onDelFileClose = async () => {
  await onDelFile(); // 删除文件
  formDataTwo.value.packageName = '';
  delFileClick.value = true;
};
// 编辑回填文件删除 请求
const onDelFile = async () => {
  await api.module.deleteFile({
    packageName: formDataTwo.value.packageName,
    behaviorPath: formDataTwo.value.behaviorPath,
    id: onDelelistID.value,
  });
};

const treeCard = ref(null);
const treeHeight = ref('400px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  treeHeight.value = `${height - 80}px`;
});

const treeScroll = ref({
  rowHeight: 34,
  bufferSize: 10,
  threshold: 10,
  type: 'virtual',
} as TScroll);
// 文件下载
const onUploadFile = async () => {
  const res = await api.module.getSignedUrl({
    packageName: formDataTwo?.value?.packageName,
    behaviorPath: formDataTwo?.value?.behaviorPath,
  });
  window.open(res); // 文件下载
};
const onSecondarySubmit = () => {
  if (showFirstNode.value) {
    formRefOne.value.submit();
  } else if (showSecondNode.value) {
    formRefTwo.value.submit();
  } else if (showFormData.value) {
    formRefThree.value.submit();
  }
};

// // 侦听 formDataTwo.iconPath 的变化
// watch(
//   () => formDataTwo.value.iconPath,
//   (newIconPath) => {
//     iconValue.value = newIconPath;
//   },
// );

// watch(
//   () => formData.value.iconPath,
//   (newIconPath) => {
//     iconValue.value = newIconPath;
//   },
// );

// // 在 iconValue 改变时更新 formDataTwo.iconPath
// watch(iconValue, (newValue) => {
//   formDataTwo.value.iconPath = newValue;
//   formData.value.iconPath = newValue;
// });

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

// 在 tabListData 改变时更新 clickNodeId.value.clientType
watch(tabListData, (newValue) => {
  clickNodeId.value.clientType = newValue;
});

// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
    fixed: 'left',
  },
  {
    colKey: 'name',
    title: '模块名称',
    align: 'center',
    width: '110',
    fixed: 'left',
  },
  {
    colKey: 'moduleDesc',
    title: '模块描述',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'state',
    title: '状态',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
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

// 一级表单验证规则
const oneRules: FormRules<Data> = {
  moduleCode: [{ required: true, type: 'error', trigger: 'blur' }],
  moduleName: [{ required: true, type: 'error', trigger: 'blur' }],
};

// 二级表单验证规则
const twoRules: FormRules<Data> = {
  menuName: [{ required: true, type: 'error', trigger: 'blur' }],
  moduleCode: [{ required: true, type: 'error', trigger: 'blur' }],
  moduleName: [{ required: true, type: 'error', trigger: 'blur' }],
};

// 表单验证规则
const rules: FormRules<Data> = {
  parentClickTree: [{ required: true, type: 'error', trigger: 'blur' }],
  oneselfClickTree: [{ required: true, type: 'error', trigger: 'blur' }],
  moduleName: [{ required: true, type: 'error', trigger: 'blur' }],
  moduleCode: [{ required: true, type: 'error', trigger: 'blur' }],
  behaviorPath: [
    { required: true, type: 'error', trigger: 'blur' },
    { validator: validateBehaviorPath, trigger: 'blur' },
  ],
};

function validateBehaviorPath(value: any): boolean | CustomValidateResolveType {
  const pattern = /^(https?:\/\/.+|.+#\/[a-zA-Z]+)$/;
  if (!pattern.test(value)) {
    return {
      result: false,
      message: '菜单地址必须以 http://, https://开头, 或使用 /main#/example 格式！',
      type: 'error',
    };
  }
  return true;
}

// 表格刷新按钮
const fetchData = () => {
  onGetTabData();
};

// 获取菜单模块下拉菜单
const menuSelectList = ref([]);
const menuSelectData = async () => {
  const res = await api.module.getRootModules();
  menuSelectList.value = res.list;
};

// 菜单子模块 下拉事件
const onMenuSonID = async (data) => {
  formDataTwo.value.menuId = data;
  await menuSonSelectData();
};

// 获取菜单子模块 下拉菜单
const menuSonSelectList = ref([]);
const menuSonSelectData = async () => {
  const res = await api.module.getAllModules({ id: formDataTwo.value.menuId });
  menuSonSelectList.value = res.list;
};

// // 三级 编辑回填 获取 回填数据
// const sonID = ref(null);
// const menuSonSelectDataTwo = async () => {
//   const res = await api.module.getBackfill({ id: sonID.value });
// };

// #顶部多端选择事件
const topSelectionChanged = async (originalNum: any) => {
  const num = [...originalNum];
  num.shift();
  num.reverse();
  tabListData.value = parseInt(num.join(''), 10); // 翻转数组，将数组变成整形数据
  // 如果没有打开新增或者删除
  const res = await api.module.getList({
    id: clickNodeId.value.id,
    clientType: parseInt(num.join(''), 10),
    pageNum: 1,
    pageSize: 10,
  });
  pageUI.value.page = 1;
  moduleData.value = res.list;
  tabTotal.value = res.total;
};
// #DiaLog选项框选择事件
const handleSelectionChanged = async (originalNum: any) => {
  // const array = num.slice(1); // 删除第一位
  const num = [...originalNum];
  num.reverse();
  dialogListData.value = parseInt(num.join(''), 10); // 翻转数组，将数组变成整形数据
  formDataTwo.value.clientTypeData = dialogListData.value;
};

// 点击 左侧 新增按钮
const onAddFirstNode = async () => {
  isEditMode.value = true;
  isEditModeTwo.value = true;
  isEditModeThree.value = true;
  showFirstNode.value = true; // 一级
  showSecondNode.value = false; // 二级
  showFormData.value = false; // 三级
  disableFlag.value = false; // 开关
  formVisible.value = true; // 模态框
  formData.value.iconPath = '';
  await nextTick(); // 等待下一个DOM更新周期
  formRefOne.value.reset({ type: 'empty' });
  dialogTitle.value = '添加节点';
};

// 点击 左侧 新增图标
const onAddSecondNode = async (node: any) => {
  if (!node[`__tdesign_tree-node__`].parent?.label) {
    isEditMode.value = true;
    isEditModeTwo.value = true;
    isEditModeThree.value = true;
    showFirstNode.value = false; // 一级
    showSecondNode.value = true; // 二级
    showFormData.value = false; // 三级
    disableFlag.value = false; // 开关
    formVisible.value = true; // 模态框
    formDataOne.value.iconPath = ''; // 图标单独清除
    await nextTick(); // 等待下一个DOM更新周期
    formRefTwo.value.reset({ type: 'empty' });
    formDataOne.value.menuName = node[`__tdesign_tree-node__`].label; // 回填父节点名称
    clickNodeId.value.id = node[`__tdesign_tree-node__`]?.data?.id; // 获取当前节点 ID
  } else {
    dialogTabs.value = ['0'];
    dialogListData.value = 1;
    formDataTwo.value.moduleCode = ''; // 模块编码
    formDataTwo.value.moduleName = ''; // 菜单名称
    formDataTwo.value.moduleDesc = ''; // 菜单描述
    formDataTwo.value.behaviorPath = ''; // 菜单地址
    formDataTwo.value.moduleType = ''; // 模块类型
    formDataTwo.value.moduleVersion = null; // 模块版本号
    formDataTwo.value.modulePackageIdentify = ''; // 模块标识
    formDataTwo.value.iconPath = ''; // 图标地址
    formDataTwo.value.packageName = ''; // 文件名
    files.value = [];
    isEditMode.value = true;
    isEditModeTwo.value = true;
    isEditModeThree.value = true;
    showFirstNode.value = false; // 一级
    showSecondNode.value = false; // 二级
    showFormData.value = true; // 三级
    disableFlag.value = false; // 开关
    formVisible.value = true; // 模态框
    formDataTwo.value.parentClickTree = node[`__tdesign_tree-node__`].parent.label; // 设置父组件名称
    formDataTwo.value.oneselfClickTree = node[`__tdesign_tree-node__`].label; // 设置 自身名称
  }
  formVisible.value = true; // 显示模态框
  dialogTitle.value = '添加节点';
};

// 点击 左侧 编辑图标
const onQueryTree = (node: any) => {
  clickNodeId.value.id = node[`__tdesign_tree-node__`]?.data?.id; // 保存当前节点 id
  // 判断有无父节点
  if (!node[`__tdesign_tree-node__`].parent?.label) {
    formData.value.moduleCode = node[`__tdesign_tree-node__`]?.data?.moduleCode; // 模块编码回填
    formData.value.moduleName = node[`__tdesign_tree-node__`].label; // 模块名称回填
    formData.value.moduleDesc = node[`__tdesign_tree-node__`]?.data?.moduleDesc; // 模块描述回填
    formData.value.iconPath = node[`__tdesign_tree-node__`]?.data?.iconPath; // 图标回填
    isEditMode.value = false;
    isEditModeTwo.value = false;
    isEditModeThree.value = false;
    showFirstNode.value = true; // 一级
    showSecondNode.value = false; // 二级
    showFormData.value = false; // 三级
    formVisible.value = true; // 模态框
    disableFlag.value = true; // input禁用按钮
  } else {
    formDataOne.value.menuName = node[`__tdesign_tree-node__`].data.parentModuleId; // 父级菜单模块 回填
    formDataOne.value.moduleCode = node[`__tdesign_tree-node__`]?.data?.moduleCode; // 模块编码 回填
    formDataOne.value.moduleName = node[`__tdesign_tree-node__`].label; // 模块名称 回填
    formDataOne.value.moduleDesc = node[`__tdesign_tree-node__`]?.data?.moduleDesc; // 模块描述回填
    formDataOne.value.iconPath = node[`__tdesign_tree-node__`]?.data?.iconPath; // 图标 回填
    isEditMode.value = false;
    isEditModeTwo.value = false;
    isEditModeThree.value = false;
    showFirstNode.value = false; // 一级
    showSecondNode.value = true; // 二级
    showFormData.value = false; // 三级
    formVisible.value = true; // 模态框
    disableFlag.value = true;
  }
  formVisible.value = true; // 显示模态框
  dialogTitle.value = '编辑节点';
};

// 点击 右侧  编辑按钮
const editState = ref(null);
const onEditRow = async (row: any) => {
  editState.value = row.state; // 状态回填
  files.value = []; // 文件上传文件 清空
  formDataTwo.value.moduleType = row.moduleType;
  delFileClick.value = false;
  const decimalNumber = row.clientType; // 十进制数
  const binaryString = parseInt(decimalNumber.toString(2), 10); // 将十进制数转换为二进制字符串
  formDataTwo.value.menuId = row.grandpaId;
  // sonID.value = row.parentModuleId; // 获取父菜单 ID 方便数据回填
  // await menuSonSelectDataTwo(); // 根据获取到的父菜单 ID，获取子菜单和子菜单ID
  await menuSonSelectData();
  dialogListData.value = row.clientType;
  onDelelistID.value = row.id; // 存储当前 id
  if (row.isPC === 1) {
    dialogTabs.value = ['0'];
  } else {
    const newArr = extractValues(row);
    dialogTabs.value = newArr;
  }
  formDataTwo.value.packageName = row.packageName; // 上传文件文件名赋值
  formDataTwo.value.oneselfClickTree = treeClickData.value.one;
  formDataTwo.value.clientTypeData = binaryString;
  formDataTwo.value.parentClickTree = row.grandpaName; // 模块编码
  formDataTwo.value.parentModuleId = row.parentModuleId; // 模块编码
  formDataTwo.value.moduleCode = row.moduleCode; // 模块编码
  formDataTwo.value.moduleName = row.name; // 菜单名称
  formDataTwo.value.moduleDesc = row.moduleDesc; // 菜单描述
  formDataTwo.value.behaviorPath = row.path; // 菜单地址
  // formDataTwo.value.moduleType = row.moduleType; // 模块类型
  formDataTwo.value.moduleVersion = row.moduleVersion; // 插件版本号
  formDataTwo.value.modulePackageIdentify = row.modulePackageIdentify; // 插件包标识
  formDataTwo.value.iconPath = row.iconPath; // 图标回填
  files.value = []; // 上传文件
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

function extractValues(data: { isMobile: number; isTV: number; isWatch: number; isWeChat: number }) {
  const result = [];
  if (data.isMobile !== undefined && data.isMobile === 1) result.push('1');
  if (data.isTV !== undefined && data.isTV === 1) result.push('2');
  if (data.isWatch !== undefined && data.isWatch === 1) result.push('3');
  if (data.isWeChat !== undefined && data.isWeChat === 1) result.push('4');
  return result;
}

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
const delThreeBehaviorPath = ref('');
const onDelelist = (row: any) => {
  onDelelistID.value = row.id;
  delThreeBehaviorPath.value = row.behaviorPath;
};

// 右侧 tab 删除 事件
const onDelConfirm = async () => {
  await api.module.remove({ id: onDelelistID.value, behaviorPath: delThreeBehaviorPath.value, moduleLevel: 'LEAF' });
  if (moduleData.value.length <= 1 && clickNodeId.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetTabData(); // 获取表格数据
  MessagePlugin.success('删除成功');
};

// switch 开关事件
const onSwitchChange = async (row: any, value: any) => {
  const decimalNumber = row.clientType; // 十进制数
  const binaryString = parseInt(decimalNumber.toString(2), 10); // 将十进制数转换为二进制字符串
  const isValue = value ? 1 : 0;
  await api.module.modify({
    parentModuleId: row.parentModuleId,
    moduleLevel: row.moduleLevel,
    clientType: binaryString,
    state: isValue,
    moduleCode: row.moduleCode,
    moduleName: row.name,
    behaviorPath: row.behaviorPath,
    id: row.id,
  });
  await onGetTabData();
  MessagePlugin.success('操作成功');
};

// 在组件挂载后模拟 点击 第一个节点下面的子节点
onMounted(async () => {
  await onGetTreeData(); // 获取树组件数据
  await menuSelectData(); // 获取 菜单名称
  // 确保树的第一个节点存在，并且它有子节点
  if (treeData.list.length > 0 && treeData.list[0].children && treeData.list[0].children.length > 0) {
    const firstChildNode = treeData.list[0].children[0]; // 第一个节点的第一个子节点
    const { id } = firstChildNode; // 保存该子节点的 ID
    clickNodeId.value.id = id; // 保存当前节点的 ID
    treeClickActive.value = id; // 节点高亮 ID
    const rules = await api.module.getList({ id, clientType: 0, pageNum: 1, pageSize: 10 }); // 请求：获取第二节点的数据
    moduleData.value = rules.list; // 表格数据赋值
    tabTotal.value = rules.total; // 数据条数赋值
    treeClickData.value.two = rules.list[0].grandpaName; // 赋值第一个节点名称给面包屑
    treeClickData.value.one = rules.list[0].parentModuleName; // 赋值第二个节点名称给面包屑
  }
});

// 获取树组件数据
const onGetTreeData = async () => {
  const res = await api.module.getTree({ clientType: 1 }); // 获取节点数据
  console.log('🚀 ~ file: index.vue:1026 ~ onGetTreeData ~ res:', res);
  treeData.list = res;
};

// 获取表格数据
const onGetTabData = async () => {
  const res = await api.module.getList({
    id: clickNodeId.value.id,
    clientType: clickNodeId.value.clientType,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  }); // 获取第二节点的数据
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
  await onGetTabData(); // 获取表格数据
  treeClickData.value.one = node['__tdesign_tree-node__'].label;
  treeClickData.value.two = node['__tdesign_tree-node__'].parent?.label;
};

// 关闭模态框事件
const onSecondaryReset = () => {
  disableFlag.value = false; // 控制编辑 是否禁用子模块名称
  isEditMode.value = false; // 控制一级 是新增还是编辑
  formVisible.value = false;
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
      iconPath: formData.value.iconPath,
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
      moduleName: formDataOne.value.moduleName,
      moduleCode: formDataOne.value.moduleCode,
      moduleDesc: formDataOne.value.moduleDesc,
      parentModuleId: clickNodeId.value.id,
      iconPath: formDataOne.value.iconPath,
    });
    MessagePlugin.success('新增成功');
  }
  formVisible.value = false;
};

// 文件上传
const uploadFileData = async () => {
  await api.module.uploadFile(
    {
      path: formDataTwo.value.behaviorPath,
    },
    {
      file: files?.value[0]?.raw,
    },
  );
};

// 三级菜单新增，编辑请求
const onAddThreeModule = async () => {
  // 编辑请求
  if (!isEditModeThree.value) {
    await onRedactThree(); // 编辑请求
    if (files?.value[0]?.raw) {
      await uploadFileData();
      // const data = new FormData();
      // data.append('path', formDataTwo.value.behaviorPath);
      // data.append('file', files?.value[0]?.raw);
      // await http.upload('/api/main/module/uploadFile', data);
    }
    MessagePlugin.success('编辑成功');
  } else {
    // 新增请求
    if (files?.value[0]?.raw) {
      await uploadFileData();
      // const data = new FormData();
      // data.append('path', formDataTwo.value.behaviorPath);
      // data.append('file', files?.value[0]?.raw);
      // await http.upload('/api/main/module/uploadFile', data);
    }
    await api.module.addModule({
      moduleLevel: formDataTwo.value.moduleLevel,
      clientType: dialogListData.value, // 终端类型
      moduleCode: formDataTwo.value.moduleCode, // 模块编码
      moduleName: formDataTwo.value.moduleName, // 菜单名称
      moduleDesc: formDataTwo.value.moduleDesc, // 菜单描述
      behaviorPath: formDataTwo.value.behaviorPath, // 菜单地址
      iconPath: formDataTwo.value.iconPath, // 图标地址
      parentModuleId: formDataTwo.value.parentModuleId, // 父组件 ID
      moduleType: formDataTwo.value.moduleType, // 模块类型
      moduleVersion: formDataTwo.value.moduleVersion, // 模块版本号
      modulePackageIdentify: formDataTwo.value.modulePackageIdentify, // 模块标识
      packageName: formDataTwo.value.packageName, // 文件上传名称
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
    iconPath: formData.value.iconPath,
  });
};

// 编辑二级请求
const onRedactTwo = async () => {
  await api.module.modify({
    id: clickNodeId.value.id,
    moduleLevel: 'BARNCH',
    clientType: 1,
    moduleName: formDataOne.value.moduleName,
    moduleCode: formDataOne.value.moduleCode,
    moduleDesc: formDataOne.value.moduleDesc,
    iconPath: formDataOne.value.iconPath,
    parentModuleId: formDataOne.value.menuName,
  });
};

// 编辑三级请求
const onRedactThree = async () => {
  await api.module.modify({
    parentModuleId: formDataTwo.value.parentModuleId, // 父 ID
    moduleLevel: formDataTwo.value.moduleLevel,
    clientType: formDataTwo.value.clientTypeData, // 终端类型
    moduleCode: formDataTwo.value.moduleCode, // 模块编码
    moduleName: formDataTwo.value.moduleName, // 菜单名称
    moduleDesc: formDataTwo.value.moduleDesc, // 菜单描述
    behaviorPath: formDataTwo.value.behaviorPath, // 菜单地址
    iconPath: formDataTwo.value.iconPath, // 图标地址
    id: onDelelistID.value,
    moduleType: formDataTwo.value.moduleType, // 模块类型
    moduleVersion: formDataTwo.value.moduleVersion, // 模块版本号
    modulePackageIdentify: formDataTwo.value.modulePackageIdentify, // 模块标识
    packageName: formDataTwo.value.packageName, // 文件上传名称
    state: editState.value, // 状态回填
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
    await onGetTabData(); // 获取表格数据
    await onGetTreeData(); // 更新树组件数据
    formVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
