<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        empty="没有符合条件的数据"
        :table-column="columns"
        :fixed-height="true"
        :table-data="businessData.list"
        :total="businessTotal"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onFetchData"
      >
        <template #actionSlot>
          <t-space :size="8">
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onDeleteRow">{{ '删除' }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="default" @click="onAddClick">新增</t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDeleteBatches()">
              <t-button theme="default">批量删除</t-button>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="businessTabData" label-width="120px" @submit="onBusinessSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="业务类型代码" name="categoryCode">
        <t-input v-model="businessTabData.categoryCode"></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="业务类型名称" name="categoryName">
        <t-input v-model="businessTabData.categoryName"></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="业务交易方向" name="businessDirection">
        <t-select v-model="businessTabData.businessDirection">
          <t-option v-for="item in transactionDropDownList" :key="item.value" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <!-- 第 4️⃣ 行数据 -->
      <t-form-item label="业务单据前缀" name="perfix">
        <t-input v-model="businessTabData.perfix"></t-input>
      </t-form-item>
      <!-- 第 5️⃣ 行数据 -->
      <t-form-item label="转出仓库的类型" name="transferOutType">
        <t-select v-model="businessTabData.transferOutType">
          <t-option v-for="item in outFlowDropDownList" :key="item.value" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <!-- 第 6️⃣ 行数据 -->
      <t-form-item label="转入仓库的类型" name="transferInType">
        <t-select v-model="businessTabData.transferInType">
          <t-option v-for="item in inFlowDropDownList" :key="item.value" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const tableRef = ref(); // 表格实例
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys = ref([]); // 删除计量单位 id

// 表格数据总条数
const businessTotal = ref(0);
// 表格数据
const businessData = reactive({ list: [] });
// dialog 弹框数据
const businessTabData = ref({
  categoryCode: '', // 业务类型代码
  categoryName: '', // 业务类型名称
  businessDirection: null, // 业务交易方向
  perfix: '', // 业务单位前缀
  transferOutType: '', // 转出仓库的类型
  transferInType: '', // 转入仓库的类型
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'categoryCode',
    title: '业务类型代码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'categoryName',
    title: '业务类型名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'businessDirectionName',
    title: '业务交易方向',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'transferOutTypeName',
    title: '转出库存的类型',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'transferInTypeName',
    title: '转入库存的类型',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'perfix',
    title: '业务单据前缀',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'createTime',
    title: '创建时间',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// 表单验证规则
const rules: FormRules = {
  categoryCode: [{ required: true, message: '异常模块不能为空', trigger: 'blur' }],
  categoryName: [{ required: true, message: '异常类型名称不能为空', trigger: 'blur' }],
  businessDirection: [{ required: true, message: '异常类型编码不能为空', trigger: 'change' }],
  perfix: [{ required: true, message: '是否启用不能为空', trigger: 'blur' }],
  transferOutType: [{ required: true, message: '是否启用不能为空', trigger: 'change' }],
  transferInType: [{ required: true, message: '是否启用不能为空', trigger: 'change' }],
};
// 初始渲染
onMounted(async () => {
  await onGetAnomalyTypeData(); // 获取 表格 数据
  await transactionDropDownData(); // 业务交易方向下拉
  await outFlowDropDownData(); // 转出库存的类型
  await inFlowDropDownData(); // 转入库存的类型
});

// 业务交易方向下拉
const transactionDropDownList = ref([]);
const transactionDropDownData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'W_BUSINESS_DIRECTION' });
  transactionDropDownList.value = res;
};
// 转出库存的类型
const outFlowDropDownList = ref([]);
const outFlowDropDownData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'W_TRANSFER_OUT_TYPE' });
  outFlowDropDownList.value = res;
};
// 转入库存的类型
const inFlowDropDownList = ref([]);
const inFlowDropDownData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'W_TRANSFER_IN_TYPE' });
  inFlowDropDownList.value = res;
};

// 刷新按钮
const onFetchData = () => {
  onGetAnomalyTypeData();
  selectedRowKeys.value = [];
};

const businessParam = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
});

// 获取 表格 数据
const onGetAnomalyTypeData = async () => {
  // tableRef.value.setSelectedRowKeys([]);
  selectedRowKeys.value = [];
  businessParam.value.pageNum = pageUI.value.page;
  businessParam.value.pageSize = pageUI.value.rows;
  const res = await api.businessCategory.getList(businessParam.value);
  businessData.list = res.list;
  businessTotal.value = res.total;
};

// 新增按钮点击事件
const onAddClick = () => {
  formRef.value.reset({ type: 'empty' });
  formVisible.value = true;
  diaLogTitle.value = '新增仓库业务类型';
};

// 新增请求
const onAddBusinessType = async () => {
  await api.businessCategory.addBusinessCategory(businessTabData.value);
  await onGetAnomalyTypeData(); // 获取 表格 数据
  MessagePlugin.success('新增成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    keyword: {
      label: '业务类型代码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  businessParam.value.keyword = data.keyword;
  await onGetAnomalyTypeData();
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 右侧表格删除按钮
const onDeleteRow = () => {
  selectedRowKeys.value = [];
};

// 右侧表格删除确认按钮
const onDelConfirm = async () => {
  await api.businessCategory.removeBatch(selectedRowKeys.value);
  if (businessData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// 批量删除
const onDeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = businessData.list.length;
  // 步骤 2: 执行删除操作
  await api.businessCategory.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === businessData.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
    await onGetAnomalyTypeData(); // 重新渲染数组
    selectedRowKeys.value = [];
    MessagePlugin.success('批量删除成功');
  }
};

// 表单提交事件
const onBusinessSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    await onAddBusinessType();
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

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
