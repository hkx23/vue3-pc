<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="300px">
        <cmp-container :full="true" :full-sub-index="[1]">
          <cmp-card :ghost="true" :span="12">
            <t-input v-model="page.keyword" placeholder="请输入" :autofocus="true" @enter="onEnter">
              <template #prefixIcon>
                <icon name="search" class="black-icon" />
              </template>
            </t-input>
          </cmp-card>
          <cmp-card :ghost="true" :span="12">
            <t-list stripe :split="true" class="listOll">
              <t-list-item
                v-for="(item, index) in edabDataArr"
                :key="index"
                :class="{ 'selected-background': selectedListItemIndex === index }"
                @click="onClickList(item, index)"
              >
                {{ item.paramValue }}
                <template #action>
                  <t-button size="small" variant="text" @click="onAddProperty">
                    <icon name="add" class="black-icon" />
                  </t-button>
                </template>
              </t-list-item>
            </t-list>
          </cmp-card>
          <cmp-card :ghost="true" :span="12">
            <t-pagination
              v-model:current="page.pageNum"
              v-model:page-size="page.pageSize"
              style="margin-top: 8px"
              :show-page-size="false"
              :total="tabTotal"
              @page-size-change="onPaginationChange"
              @current-change="onCurrentChange"
            />
          </cmp-card>
        </cmp-container>
      </cmp-card>
      <cmp-card flex="auto" style="min-width: 1px" class="full-tab">
        <t-tabs v-model="tabValue" @change="tabsChange">
          <t-tab-panel :value="0" label="全部" :destroy-on-hide="false">
            <template #panel>
              <cmp-container :full="true">
                <cmp-table
                  ref="tableRef"
                  v-model:pagination="pageUI"
                  row-key="id"
                  :table-column="columns"
                  :table-data="edabTabDataArr.list"
                  :total="edabTotal"
                  @refresh="fetchData"
                >
                  <template #required="{ row }">
                    <t-checkbox v-model="row.isRequire"></t-checkbox>
                  </template>
                  <template #multiterm="{ row }">
                    <t-checkbox v-model="row.isMultiple"></t-checkbox>
                  </template>
                  <template #verify="{ row }">
                    <t-checkbox v-model="row.needValidation"></t-checkbox>
                  </template>
                  <template #disableSwitch="{ row }">
                    <t-switch
                      :custom-value="[1, 0]"
                      :default-value="row.state"
                      size="large"
                      @change="(value) => onSwitchChange(row, value)"
                    ></t-switch>
                  </template>
                  <template #actionSlot="{ row }">
                    <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
                  </template>
                </cmp-table>
              </cmp-container>
            </template>
          </t-tab-panel>
          <t-tab-panel
            v-for="(item, index) in edabTopDataArr"
            :key="item.id"
            :value="index + 1"
            :label="item.categoryName"
            :destroy-on-hide="true"
          >
            <template #panel>
              <cmp-container :full="true">
                <cmp-table
                  ref="tableRef"
                  v-model:pagination="pageUI"
                  row-key="id"
                  :table-column="columns"
                  :table-data="edabTabDataArr.list"
                  :total="edabTotal"
                >
                  <template #required="{ row }">
                    <t-checkbox v-model="row.isRequire"></t-checkbox>
                  </template>
                  <template #multiterm="{ row }">
                    <t-checkbox v-model="row.isMultiple"></t-checkbox>
                  </template>
                  <template #verify="{ row }">
                    <t-checkbox v-model="row.needValidation"></t-checkbox>
                  </template>
                  <template #actionSlot="{ row }">
                    <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
                    <!-- <t-button size="small" variant="text" @click="onEditRow(row)">
                      <icon name="edit-1" class="black-icon" />
                    </t-button> -->
                  </template>
                  <template #disableSwitch="{ row }">
                    <t-switch
                      :custom-value="[1, 0]"
                      :default-value="row.state"
                      size="large"
                      @change="(value) => onSwitchChange(row, value)"
                    ></t-switch>
                  </template>
                </cmp-table>
              </cmp-container>
            </template>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    width="750px"
    @close="onDialogClose"
  >
    <!-- 扩展属性添加表单 -->
    <t-form ref="formRef" :rules="rules" :data="dialogFormData.list" @submit="onWorkStationSubmit">
      <t-row :gutter="[32, 16]">
        <t-col :span="6">
          <t-form-item label="属性代码" name="propertyCode">
            <t-input v-model="dialogFormData.list.propertyCode"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="属性值类型" name="propertyValueType">
            <t-select v-model="dialogFormData.list.propertyValueType">
              <t-option key="INT" label="整数型" value="INT" />
              <t-option key="STRING" label="字符型" value="STRING" />
              <t-option key="DATETIME" label="事件日期" value="DATETIME" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="显示名称" name="displayName">
            <t-input v-model="dialogFormData.list.displayName"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="显示顺序" name="displaySequence">
            <t-input-number v-model="dialogFormData.list.displaySequence" theme="column" :min="0"></t-input-number>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="分类" name="classifyData">
            <t-select v-model="classifyData" @change="onObjectCodeChange">
              <t-option v-for="item in selsectData.list" :key="item.id" :label="item.categoryName" :value="item" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item
            ><t-space direction="horizontal" :size="8">
              <t-checkbox v-model="isRequireCheckbox">必填项</t-checkbox>
              <t-checkbox v-model="isMultipleCheckbox">多项</t-checkbox>
              <t-checkbox v-model="needValidationCheckbox">校验</t-checkbox></t-space
            >
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="数据来源">
            <t-select v-model="dialogFormData.list.dataSource" name="dataSource">
              <t-option key="DEFAULT" label="DEFAULT" value="DEFAULT" />
              <t-option key="PARAM" label="PARAM" value="PARAM"></t-option>
              <t-option key="SERVICE" label="SERVICE" value="SERVICE" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col
          v-if="dialogFormData.list.dataSource == 'PARAM' || dialogFormData.list.dataSource == 'SERVICE'"
          :span="6"
        >
          <t-form-item label="对话框类型">
            <t-input
              v-if="dialogFormData.list.dataSource === 'SERVICE'"
              v-model="dialogFormData.list.dataSourcePath"
            ></t-input>
            <t-select v-if="dialogFormData.list.dataSource === 'PARAM'" v-model="dataType" @change="onDialogCodeChange">
              <t-option v-for="item in selsectDataBox.list" :key="item.id" :label="item.paramGroupName" :value="item" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col
          v-if="dialogFormData.list.dataSource === 'PARAM' || dialogFormData.list.dataSource === 'SERVICE'"
          :span="6"
        >
          <t-form-item>
            <t-radio-group
              v-model="dialogFormData.list.isDataMultiple"
              name="city"
              :options="itemOptions"
              size="small"
            ></t-radio-group>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="校验表达式" name="validExpression">
            <t-input v-model="dialogFormData.list.validExpression"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="备注" name="memo">
            <t-input v-model="dialogFormData.list.memo"></t-input>
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="submitForm">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import {
  CustomValidateResolveType,
  Data,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api, ObjectProperty } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const diaLogTitle = ref('');
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const itemOptions = [
  { label: '单选', value: 0 },
  { label: '多选', value: 1 },
];
const tabValue = ref(0);
const listParamCode = ref('');
const listParamID = ref(null);

const formRef = ref(null);

const tabTotal = ref(null);
const page = ref({ pageNum: 1, pageSize: 10, keyword: '' });

const classifyData = ref('');
const dataType = ref('');

// editID 编辑行 ID
const editID = ref('');
// Dialog弹框表单数据
const dialogFormData = reactive({
  list: {
    objectCode: '', // @	分类 Code
    categoryId: '', // @ 分类 ID
    propertyCode: '', // @ 属性代码
    propertyValueType: '', // @属性值类型
    displayName: '', // @显示在界面上的名词
    displaySequence: 0, //	@属性中的显示顺序
    isRequire: 0, // @	是否必填项
    isMultiple: 0, //	@是否允许存在多个同类项
    needValidation: 0, // @	是否需要校验输入
    validExpression: '', // @校验的正则表达式
    dataSource: '', // @扩展属性数据来源
    dataSourcePath: '', // @对话框类型
    memo: '', //	@备注
    isDataMultiple: 0, // @是否数据源多选
  },
});
// Dialog弹框表单数据 副本
const dialogFormDataCopy = reactive({
  list: {
    objectCode: '', // @	分类 Code
    categoryId: '', // @ 分类 ID
    propertyCode: '', // @ 属性代码
    propertyValueType: '', // @属性值类型
    displayName: '', // @显示在界面上的名词
    displaySequence: 0, //	@属性中的显示顺序
    isRequire: 0, // @	是否必填项
    isMultiple: 0, //	@是否允许存在多个同类项
    needValidation: 0, // @	是否需要校验输入
    validExpression: '', // @校验的正则表达式
    dataSource: '', // @扩展属性数据来源
    dataSourcePath: '', // @对话框类型
    memo: '', //	@备注
    isDataMultiple: 0, // @是否数据源多选
  },
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
    colKey: 'propertyCode',
    title: '属性代码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'propertyValueType',
    title: '属性值类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'displayName',
    title: '显示名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'displaySequence',
    title: '显示顺序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isRequire',
    title: '必填项',
    align: 'center',
    width: '100',
    cell: 'required',
  },
  {
    colKey: 'isMultiple',
    title: '多项',
    align: 'center',
    width: '100',
    cell: 'multiterm',
  },
  {
    colKey: 'needValidation',
    title: '校验',
    align: 'center',
    width: '100',
    cell: 'verify',
  },
  {
    colKey: 'disableSwitch',
    title: '状态',
    align: 'center',
    width: '100',
    cell: 'disableSwitch',
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
// 左侧列表数据
const edabDataArr = ref([]);
// 右侧表格数据
const edabTabDataArr = reactive<{ list: ObjectProperty[] }>({ list: [] });
// 右侧表格总页数
const edabTotal = ref(null);
// 上侧页签数据
const edabTopDataArr = ref([]);
// 表单上面下拉框数据
const selsectData = reactive({ list: [] });
// 表单下面下拉框数据
const selsectDataBox = reactive({ list: [] });
// 获取全部tab数据 code
const paramTabCode = ref('');
const editSubmitFalg = ref(true);

// 表单校验规则
const rules: FormRules<Data> = {
  propertyCode: [{ required: true, message: '属性代码不能为空', type: 'error', trigger: 'blur' }],
  displayName: [{ required: true, message: '显示名称不能为空', type: 'error', trigger: 'blur' }],
  displaySequence: [
    { required: true, message: '显示顺序不能为空', type: 'error', trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
};

function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '该字段必须是数字', type: 'error' };
  }
  if (Number(value) < 0) {
    return { result: false, message: '该字段不能为负数', type: 'error' };
  }
  return true;
}

// 新增请求
const onAddExtendedAttributes = async () => {
  await api.objectPropertyCategory.addObjectCategory(dialogFormData.list);
  await onGetAllTabData();
  MessagePlugin.success('新增成功');
};

// 编辑请求
const onRedactExtendedAttributes = async () => {
  await api.objectPropertyCategory.editObjectCategory({ ...dialogFormData.list, id: editID.value });
  await onGetAllTabData();
  MessagePlugin.success('编辑成功');
};

const isRequireCheckbox = computed({
  get: () => dialogFormData.list.isRequire === 1,
  set: (val) => {
    dialogFormData.list.isRequire = val ? 1 : 0;
  },
});

const isMultipleCheckbox = computed({
  get: () => dialogFormData.list.isMultiple === 1,
  set: (val) => {
    dialogFormData.list.isMultiple = val ? 1 : 0;
  },
});

const needValidationCheckbox = computed({
  get: () => dialogFormData.list.needValidation === 1,
  set: (val) => {
    dialogFormData.list.needValidation = val ? 1 : 0;
  },
});

// 上侧 分类下拉框 change 事件
const onObjectCodeChange = (value: any) => {
  dialogFormData.list.objectCode = value.objectCode;
  dialogFormData.list.categoryId = value.id;
};

// 下册 对话框类型下拉框 change 事件
const onDialogCodeChange = (value: any) => {
  dialogFormData.list.dataSourcePath = value.paramGroupCode;
};

// Switch开关事件
const onSwitchChange = async (
  row: {
    objectCode: any;
    propertyValueType: any;
    propertyCode: any;
    displaySequence: any;
    categoryId: any;
    dataSource: any;
    displayName: any;
    id: any;
  },
  _value: any,
) => {
  const isValue = row ? 0 : 1;
  await api.objectPropertyCategory.editObjectCategory({
    state: isValue,
    objectCode: row.objectCode,
    propertyValueType: row.propertyValueType,
    propertyCode: row.propertyCode,
    displaySequence: row.displaySequence,
    categoryId: row.categoryId,
    dataSource: row.dataSource,
    displayName: row.displayName,
    id: row.id,
  });
  await onGetAllTabData();
  MessagePlugin.success('操作成功');
};

// 左侧列表分页事件
const onCurrentChange = async () => {
  await onGetTabList();
};

// 左侧列表分页事件
const onPaginationChange = async () => {
  await onGetTabList();
};

// 获取左侧列表 公用
const onGetTabList = async () => {
  const res = await api.objectPropertyCategory.getObjectList(page.value);
  edabDataArr.value = res.list;
  tabTotal.value = res.total; // 左侧列表总页面赋值
};

// 页面初始化，渲染
onMounted(async () => {
  await onGetTabList();
  if (edabDataArr.value.length > 0) {
    onClickList(edabDataArr.value[0], 0);
  }
});

// 获取 tab 栏全部数据
const onGetAllTabData = async () => {
  const res = await api.objectPropertyCategory.getObjectCategoryList({
    objectCode: paramTabCode.value,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  edabTabDataArr.list = res.list; // 表格数据赋值
  edabTotal.value = res.total; // 总页数赋值
};

// 左侧列表点击事件
const selectedListItemIndex = ref(0);
const onClickList = async (row: any, index?: any) => {
  console.log('🚀 ~ file: index.vue:536 ~ onClickList ~ row:', row);
  selectedListItemIndex.value = index;
  paramTabCode.value = row.objectCode; // 用于发获取全部数据请求
  const resData = await api.objectPropertyCategory.getCategory({ objectCode: row.objectCode }); // 获取表单下拉框数据
  selsectData.list = resData.list; // 上面下拉框数据赋值
  const resultData = await api.objectPropertyCategory.getParamGroup();
  selsectDataBox.list = resultData.list; // 下面下拉框数据
  await onGetAllTabData();
  tabValue.value = 0;
  listParamCode.value = row.paramCode; // 保存当前点击的 code
  listParamID.value = row.id; // 保存当前点击的 ID
  const rules = await api.objectPropertyCategory.getObjectCategory({ objectCode: row.objectCode });
  edabTopDataArr.value = rules.list; // 获取顶部列表
};

// 选项卡变化触发
const tabsChange = async (value: number) => {
  if (value === 0) {
    await onGetAllTabData();
  } else {
    const res = await api.objectPropertyCategory.getObjectCategoryList({
      objectCode: edabTopDataArr.value[value - 1].objectCode,
      id: edabTopDataArr.value[value - 1].id,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    });
    edabTabDataArr.list = res.list; // 表格数据赋值
    edabTotal.value = res.total; // 总页数赋值
  }
};

// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  if (row.dataSource === 'SERVICE') {
    dialogFormData.list.dataSourcePath = row.dataSourcePath; // @对话框类型
  }
  editSubmitFalg.value = false;
  dataType.value = row.getParamGroupName; // @对话框类型名称
  classifyData.value = row.categoryName; // @	分类 名称
  dialogFormData.list.categoryId = row.categoryId; // @ 分类 ID
  dialogFormData.list.propertyCode = row.propertyCode; // @ 属性代码
  dialogFormData.list.propertyValueType = row.propertyValueType; // @属性值类型
  dialogFormData.list.displayName = row.displayName; // @显示在界面上的名词
  dialogFormData.list.displaySequence = row.displaySequence; //	@属性中的显示顺序
  dialogFormData.list.isRequire = row.isRequire; // @	是否必填项
  dialogFormData.list.isMultiple = row.isMultiple; //	@是否允许存在多个同类项
  dialogFormData.list.needValidation = row.needValidation; // @	是否需要校验输入
  dialogFormData.list.validExpression = row.validExpression; // @校验的正则表达式
  dialogFormData.list.dataSource = row.dataSource; // @扩展属性数据来源
  dialogFormData.list.memo = row.memo; //	@备注
  dialogFormData.list.isDataMultiple = row.isDataMultiple; // @是否数据源多选
  dialogFormData.list.objectCode = row.objectCode; // @分类ID
  editID.value = row.id;
  formVisible.value = true;
  diaLogTitle.value = '编辑扩展属性';
};

// 左侧输入框回车事件
const onEnter = async () => {
  page.value.pageNum = 1;
  await onGetTabList();
};

// 左侧添加属性按钮点击事件
const onAddProperty = () => {
  editSubmitFalg.value = true;
  classifyData.value = '';
  dataType.value = '';
  dialogFormData.list = JSON.parse(JSON.stringify(dialogFormDataCopy.list));
  formVisible.value = true; // dialog 弹框显示
  diaLogTitle.value = '添加扩展属性';
};

// dialog 弹框关闭时执行的操作
const onDialogClose = () => {
  formRef.value.reset({ type: 'initial' });
  formVisible.value = false;
};

// 刷新按钮
const fetchData = () => {
  onGetAllTabData();
};
const submitForm = () => {
  formRef.value.submit();
};

// 提交事件
const onWorkStationSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (editSubmitFalg.value) {
      await onAddExtendedAttributes(); // 新增事件
    } else {
      await onRedactExtendedAttributes(); // 编辑事件
    }
    formVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.three-checkbox {
  margin-left: 25px;
}

// .selected-background {
//   background-color: var(--td-brand-color) !important; /* 替换为你希望的颜色 */
// }
.full-tab {
  :deep(.t-tabs) {
    height: 100%;
  }

  :deep(.t-tabs__content) {
    height: calc(100% - 24px);
  }

  :deep(.t-tab-panel) {
    height: 100%;
  }
}

.selected-background {
  color: #fff;
  background-color: var(--td-brand-color) !important; /* 替换为你希望的颜色 */
}

.listOll {
  .selected-background {
    background-color: var(--td-brand-color) !important; /* 替换为你希望的颜色 */
    .black-icon {
      color: #fff;
    }
  }
}
</style>
