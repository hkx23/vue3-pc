<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <t-col>
          <div style="display: flex; align-items: center">
            <div style="width: 130px">计量单位名称：</div>
            <t-input v-model="queryData" label="" placeholder="请输入" clearable size="medium" />
          </div>
        </t-col>
        <t-col>
          <div class="btn-left">
            <t-button @click="onRefresh">查询</t-button>
            <t-button theme="default" @click="onReset">重置</t-button>
          </div>
        </t-col>
      </t-row>
      <t-row class="mitemuom-function-button">
        <t-col>
          <t-button theme="default" @click="onAddMeasuring">新增</t-button>
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirms">
            <t-button theme="default">批量删除</t-button>
          </t-popconfirm>
          <t-button theme="default">导入</t-button>
        </t-col>
      </t-row>
      <t-row>
        <t-table
          :data="tableData"
          :columns="columns"
          row-key="id"
          :pagination="tableMitemPagination"
          :selected-row-keys="selectedRowKeys"
          @select-change="rehandleSelectChange"
          @page-change="onPageChange"
        >
          <template #actionSlot="{ row }">
            <t-button size="small" variant="text" @click="onEditRow(row)">
              <icon name="edit-1" class="black-icon" />
            </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm">
              <t-button size="small" variant="text" @click="onDeleteRow(row)">
                <icon name="delete" class="black-icon" />
              </t-button>
            </t-popconfirm>
          </template>
        </t-table>
      </t-row>
    </t-card>
    <!-- 模态框/对话框 -->
    <t-dialog
      v-model:visible="showDialog"
      :header="diaTitle"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
      @close="onDialogClose"
    >
      <t-form
        ref="formRef"
        :loading="loading"
        :rules="FORM_RULES"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @submit="onSubmit"
      >
        <!-- 计量单位名称： -->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="计量单位名称" name="uom">
              <t-input v-model="formData.uom" placeholder="请输入"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 计量单位名称： -->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="计量单位符号" name="uomSymbol">
              <t-input v-model="formData.uomSymbol" placeholder="请输入"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 控制盒子 -->
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit">确认</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstanceFunctions, FormRules, Icon, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { useLoading } from '@/hooks/modules/loading';

const { loading } = useLoading();

import { api } from '@/api/main';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const showDialog = ref(false); // 控制新增模态框开关
const tableMitemPagination = ref({ defaultPageSize: 5, total: 0, defaultCurrent: 1, showJumper: true }); // 分页参数
const tableData = ref([]); // 表格渲染数据
const selectedRowKeys = ref([]); // 删除计量单位 id
const formData = ref({ uom: '', uomSymbol: '', id: null }); // 新增表单数据绑定
const queryData = ref(''); // 精确查询数据
const diaTitle = ref(''); // 模态框文字
// 渲染函数
onMounted(() => {
  onGetMiteMuom();
});

// 查询按钮
const onRefresh = () => {
  if (queryData.value) {
    tableMitemPagination.value.defaultCurrent = 1;
    onGetMiteMuom();
  }
};

// 重置按钮
const onReset = () => {
  queryData.value = '';
  onGetMiteMuom();
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
    } else {
      await onAddMiteMuom(); // 没有 ID 就发送新增请求
    }
    showDialog.value = false;
    onGetMiteMuom(); // 重新渲染数据
    formRef.value.reset({ type: 'empty' });
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
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
  tableData.value = [];
  try {
    const res = await api.mitemUom.getlist({ ...onMitemUomPage.value, uom: queryData.value });
    tableData.value = res.list; // 表格数据赋值
    tableMitemPagination.value.total = +res.total; // 总页数赋值
  } catch (e) {
    MessagePlugin.success(e);
  }
};

// 分页数据，使用计算属性来保持响应性
const onMitemUomPage = computed(() => {
  return {
    pageNum: tableMitemPagination.value.defaultCurrent,
    pageSize: tableMitemPagination.value.defaultPageSize,
  };
});

// 表格数据类型
interface TableRow {
  id: number;
  uom: string;
  uomSymbol: string;
}

// 分页换页效果
const onPageChange = (curr: any) => {
  tableMitemPagination.value.defaultCurrent = curr.current;
  tableMitemPagination.value.defaultPageSize = curr.pageSize;
  onGetMiteMuom();
};

// 列定义
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'uom',
    title: '计量单位名称',
    align: 'center',
  },
  {
    colKey: 'uomSymbol',
    title: '计量单位符号',
    align: 'center',
  },
  {
    colKey: 'action',
    title: '操作',
    width: 160,
    align: 'center',
    cell: 'actionSlot', // 引用具名插槽
  },
];

// 新增表单的验证规则
const FORM_RULES: FormRules = {
  uom: [{ required: true, message: '计量单位名称不能为空', trigger: 'blur' }],
  uomSymbol: [{ required: true, message: '计量单位符号不能为空', trigger: 'blur' }],
};

/**
 * 新增计量单位
 */
const onAddMiteMuom = async () => {
  await api.mitemUom.addItem(formData.value);
};

// 点击新增逻辑
const onAddMeasuring = () => {
  queryData.value = '';
  diaTitle.value = '计量单位新增';
  showDialog.value = true;
};

// 点击编辑逻辑
const onEditRow = (row: TableRow) => {
  diaTitle.value = '计量单位编辑';
  formData.value.uom = row.uom; // 单位名称
  formData.value.uomSymbol = row.uomSymbol; // 单位名称字符
  formData.value.id = row.id; // 当前点击的 id
  showDialog.value = true;
};

/**
 * 编辑修改请求
 */
const onAmendMiteMuom = async () => {
  await api.mitemUom.updateItemByCode(formData.value);
  formData.value.uom = ''; // 单位名称
  formData.value.uomSymbol = ''; // 单位名称字符
  formData.value.id = null; // 当前点击的 id
};

/**
 * 删除计量单位请求
 */
const onDeleteMiteMuom = async () => {
  await api.mitemUom.removeItemsById(selectedRowKeys.value);
};

// 单个数据实现删除逻辑
const onDeleteRow = async (row: TableRow) => {
  selectedRowKeys.value.push(row.id);
};

// 单个数据点击气泡框确认后，删除数据
const onDelConfirm = async () => {
  await onDeleteMiteMuom();
  // 检查当前页是否还有数据，如果没有且不在第一页，页码减一
  if (tableData.value.length === 1 && tableMitemPagination.value.defaultCurrent > 1) {
    tableMitemPagination.value.defaultCurrent--;
  }
  console.log(
    '🚀 ~ file: index.vue:277 ~ onDelConfirm ~ tableMitemPagination.value.defaultCurrent:',
    tableMitemPagination.value.defaultCurrent,
  );
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
    selectedRowKeys.value = [];
    onGetMiteMuom();
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
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
  color: red;
}
</style>
