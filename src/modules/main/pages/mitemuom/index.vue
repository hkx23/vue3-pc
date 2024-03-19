<!-- 计量单位 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="onReset" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        :table-data="tableData"
        :table-column="columns"
        row-key="id"
        :fixed-height="true"
        :total="total"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @refresh="fetchData"
        @select-change="rehandleSelectChange"
      >
        <template #title> 计量单位列表 </template>
        <template #button>
          <t-button theme="primary" @click="onAddMeasuring">{{ t('common.button.add') }}</t-button>
          <bcmp-import-auto-button theme="default" button-text="导入" type="m_mitem_uom"></bcmp-import-auto-button>
          <t-popconfirm theme="default" :content="t('common.message.confirmDelete')" @confirm="onDelConfirms">
            <t-button theme="default">{{ t('common.button.batchDelete') }}</t-button>
          </t-popconfirm>
        </template>
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
            <t-popconfirm theme="default" :content="t('common.message.confirmDelete')" @confirm="onDelConfirm">
              <t-link theme="primary" @click="onDeleteRow">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- 模态框/对话框 -->
  <t-dialog
    v-model:visible="showDialog"
    :header="diaTitle"
    width="424px"
    @close="onDialogClose"
    @cancel="onSecondaryReset"
    @confirm="submitForm"
  >
    <t-form
      ref="formRef"
      :loading="loading"
      :rules="FORM_RULES"
      :data="formData"
      scroll-to-first-error="smooth"
      label-align="right"
      label-width="120px"
      label-placement="left"
      @submit="onSubmit"
    >
      <!-- 计量单位名称： -->
      <t-form-item :label="t('mitemuom.unitName')" name="uomName">
        <t-input v-model="formData.uomName" :placeholder="t('common.placeholder.input')"></t-input>
      </t-form-item>
      <t-form-item :label="t('mitemuom.unitSymbol')" name="uom">
        <t-input v-model="formData.uom" :placeholder="t('common.placeholder.input')" :disabled="isdisables"></t-input>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();

const { loading } = useLoading();

import { api } from '@/api/main';

import { useLang } from './lang';

const { t } = useLang();

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const showDialog = ref(false); // 控制新增模态框开关
const total = ref(null); // 总页数
const tableData = ref([]); // 表格渲染数据
const formData = ref({ uomName: '', uom: '', id: null }); // 新增表单数据绑定
const queryData = ref(''); // 精确查询数据
const diaTitle = ref(''); // 模态框文字
const isPage = ref({ pageNum: null, pageSize: null });
const isdisables = ref(false);
const selectedRowKeys = ref([]); // 删除计量单位 id
// 渲染函数
onMounted(() => {
  onGetMiteMuom();
});

// 查询按钮
const onRefresh = async () => {
  if (queryData.value) {
    pageUI.value.page = 1;
    await onGetMiteMuom();
  }
};

// 点击查询按钮
const conditionEnter = async (data: any) => {
  queryData.value = data.queryData;
  await onRefresh();
  selectedRowKeys.value = [];
};
const opts = computed(() => {
  return {
    queryData: {
      label: t('mitemuom.unitName'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input'),
    },
  };
});

// 重置按钮
const onReset = () => {
  queryData.value = '';
  onGetMiteMuom();
};

// 表单刷新按钮
const fetchData = () => {
  onGetMiteMuom();
  selectedRowKeys.value = [];
};

// 表单清除
const onDialogClose = () => {
  formRef.value.reset({ type: 'empty' });
};

// 点击提交按钮，触发提交事件
const onSubmit = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    if (formData.value.id) {
      await onAmendMiteMuom(); // 有 ID 就发送编辑修改请求
      MessagePlugin.success(t('common.message.success'));
    } else {
      await onAddMiteMuom(); // 没有 ID 就发送新增请求
      MessagePlugin.success(t('common.message.addSuccess'));
    }
    showDialog.value = false;
    onGetMiteMuom(); // 重新渲染数据
    formRef.value.reset({ type: 'empty' });
  } else {
    MessagePlugin.warning(firstError);
  }
};

// 取消按钮
const onSecondaryReset = () => {
  MessagePlugin.success('取消编辑');
  showDialog.value = false;
  formRef.value.reset({ type: 'empty' });
};

/**
 * 获取计量单位数据
 */
const onGetMiteMuom = async () => {
  isPage.value.pageNum = pageUI.value.page;
  isPage.value.pageSize = pageUI.value.rows;
  tableData.value = [];
  try {
    const res = await api.mitemUom.getlist({ ...isPage.value, uomName: queryData.value });
    tableData.value = res.list; // 表格数据赋值
    total.value = res.total; // 总页数赋值
  } catch (e) {
    MessagePlugin.success(t('common.message.selectRowTryAgain')); // 请选择行之后再尝试操作
  }
};

// 表格数据类型
interface TableRow {
  id: number;
  uomName: string;
  uom: string;
}

// 列定义f
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'uomName',
    title: t('mitemuom.unitName'), // 计量单位名称
    align: 'center',
  },
  {
    colKey: 'uom',
    title: t('mitemuom.unitSymbol'), // 计量单位符号
    align: 'center',
  },
  {
    colKey: 'op',
    title: t('mitemuom.operation'), // 操作
    width: 180,
    align: 'center',
  },
];

// 自定义计量单位 名称 新增校验规则
function checkUomUnique(value: any): boolean | CustomValidateResolveType {
  const currentEditingId = formData.value.id; // 获取当前正在编辑的条目的 ID
  const isDuplicate = tableData.value.some((item) => {
    return item.uomName === value && item.id !== currentEditingId; // 检查是否有重复的名称且不是当前编辑的条目
  });
  if (isDuplicate) {
    return { result: false, message: '计量单位名称已存在', type: 'error' };
  }
  return true;
}

// 自定义计量单位 符号 新增校验规则
function checkUomSymbolUnique(value: any): boolean | CustomValidateResolveType {
  // 如果当前是编辑操作并且正在编辑的数据有id，则不进行计量单位符号的验证
  if (formData.value.id) {
    return true;
  }
  const isDuplicate = tableData.value.some((item) => item.uom === value);
  if (isDuplicate) {
    return { result: false, message: '计量单位符号已存在', type: 'error' };
  }
  return true;
}

// 新增表单的验证规则
const FORM_RULES: FormRules = {
  uomName: [
    { required: true, message: '计量单位名称不能为空', trigger: 'blur' },
    { validator: checkUomUnique, trigger: 'blur', message: '计量单位名称已存在' },
  ],
  uom: [
    { required: true, message: '计量单位符号不能为空', trigger: 'blur' },
    { validator: checkUomSymbolUnique, trigger: 'blur', message: '计量单位符号已存在' },
  ],
};
/**
 * 新增计量单位
 */
const onAddMiteMuom = async () => {
  await api.mitemUom.addItem(formData.value);
};

// 点击新增逻辑
const onAddMeasuring = () => {
  isdisables.value = false;
  queryData.value = '';
  diaTitle.value = '计量单位新增';
  showDialog.value = true;
};

// 点击编辑逻辑
const onEditRow = (row: TableRow) => {
  diaTitle.value = '计量单位编辑';
  isdisables.value = true;
  formData.value.uomName = row.uomName; // 单位名称
  formData.value.uom = row.uom; // 单位名称字符
  formData.value.id = row.id; // 当前点击的 id
  showDialog.value = true;
};

/**
 * 编辑修改请求
 */
const onAmendMiteMuom = async () => {
  await api.mitemUom.updateItemByCode(formData.value);
  formData.value.uomName = ''; // 单位名称
  formData.value.uom = ''; // 单位名称字符
  formData.value.id = null; // 当前点击的 id
};

/**
 * 删除计量单位请求
 */
const onDeleteMiteMuom = async () => {
  await api.mitemUom.removeItemsById(selectedRowKeys.value);
};

// 单个数据实现删除逻辑
const onDeleteRow = async () => {
  selectedRowKeys.value = [];
};
const submitForm = () => {
  formRef.value.submit();
};

// 单个数据点击气泡框确认后，删除数据
const onDelConfirm = async () => {
  await onDeleteMiteMuom();
  // 检查当前页是否还有数据，如果没有且不在第一页，页码减一
  if (tableData.value.length <= 1 && isPage.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetMiteMuom(); // 重新渲染
  selectedRowKeys.value = [];
};

// 获取复选框选中的数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 批量删除计量单位
const onDelConfirms = async () => {
  if (selectedRowKeys.value.length >= 1) {
    await onDeleteMiteMuom();
    if (selectedRowKeys.value.length >= tableData.value.length && isPage.value.pageNum > 1) {
      pageUI.value.page--;
    }
    await onGetMiteMuom();
    selectedRowKeys.value = [];
  }
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.mitemuom-function-button {
  margin: 20px 0;
}

.black-icon {
  color: #181818;
}

.control-box {
  display: flex;
  justify-content: flex-end; /* 这会使按钮靠右对齐 */
}
</style>
