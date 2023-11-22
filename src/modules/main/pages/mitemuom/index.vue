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
            <t-button variant="base" @click="onRefresh">查询</t-button>
            <t-button theme="default" variant="base" @click="onReset">重置</t-button>
          </div>
        </t-col>
      </t-row>
      <t-row class="mitemuom-function-button">
        <t-col>
          <t-button variant="base" @click="onAddMeasuring">新增</t-button>
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirms">
            <t-button variant="base">批量删除</t-button>
          </t-popconfirm>
          <t-button variant="base">导入</t-button>
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
            <t-button size="small" @click="onEditRow(row)">
              <icon name="edit-1" />
            </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm">
              <t-button size="small" @click="onDeleteRow(row)">
                <icon name="delete" />
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
      @confirm="onHandleConfirm"
      @cancel="onHandleCancel"
      @close="onDialogClose"
    >
      <t-form ref="formRef" :rules="FORM_RULES" :data="formData" :colon="true">
        <t-form-item label="计量单位名称" name="uom">
          <t-input v-model="formData.uom" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item label="计量单位符号" name="uomSymbol">
          <t-input v-model="formData.uomSymbol" placeholder="请输入"></t-input>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormRules, Icon, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/modeling';

const showDialog = ref(false); // 控制新增模态框开关
const tableMitemPagination = ref({ defaultPageSize: 5, total: 0, defaultCurrent: 1, showJumper: true }); // 分页参数
const formRef = ref(null); // 新增表单数据清除
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
  onGetMiteMuom();
};

// 重置按钮
const onReset = () => {
  queryData.value = '';
};

const onDialogClose = () => {
  formData.value.id = null;
  formData.value.uom = '';
  formData.value.uomSymbol = '';
};

/**
 * 获取计量单位数据
 */
const onGetMiteMuom = async () => {
  tableData.value = [];
  try {
    const res = await api.mitemUom.getlist(onMitemUomPage.value);
    tableData.value = res.list;
    tableMitemPagination.value.total = +res.total;
  } catch (e) {
    MessagePlugin.success(e);
  }
};

// 分页数据，使用计算属性来保持响应性
const onMitemUomPage = computed(() => {
  return {
    pageNum: tableMitemPagination.value.defaultCurrent,
    pageSize: tableMitemPagination.value.defaultPageSize,
    uom: queryData.value,
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

// 实现新增，编辑逻辑
const onHandleConfirm = async () => {
  if (formData.value.id) {
    onAmendMiteMuom();
  } else {
    await onAddMiteMuom(); // 新增计量单位
  }
  onGetMiteMuom(); // 重新渲染数据，貌似没用
  showDialog.value = false;
};

// 点击新增逻辑
const onAddMeasuring = () => {
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

// 可以在这里实现取消逻辑
const onHandleCancel = () => {
  if (formData.value) {
    // 如果有数据，就清除数据
    formData.value.id = null;
    formData.value.uom = '';
    formData.value.uomSymbol = '';
  }
  showDialog.value = false;
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
  selectedRowKeys.value = [];
  onGetMiteMuom();
};

// 获取复选框选中的数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
  console.log('🚀 ~ file: index.vue:235 ~ rehandleSelectChange ~ selectedRowKeys.value:', selectedRowKeys.value);
};

// 批量删除计量单位
const onDelConfirms = async () => {
  if (selectedRowKeys.value) {
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
</style>
