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
        <template #title>
          {{ '仓库业务类型列表' }}
        </template>
        <template #op="item">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(item)">{{ '编辑' }}</t-link>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onDeleteRow">{{ '删除' }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddClick">新增</t-button>
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
        <t-input v-model="businessTabData.categoryCode" :disabled="isEdit"></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="业务类型名称" name="categoryName">
        <t-input v-model="businessTabData.categoryName" :disabled="isEdit"></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="业务交易方向" name="businessDirection">
        <t-select v-model="businessTabData.businessDirection" :disabled="isEdit">
          <t-option v-for="item in transactionDropDownList" :key="item.value" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <!-- 第 4️⃣ 行数据 -->
      <t-form-item label="业务单据前缀" name="perfix">
        <t-input v-model="businessTabData.perfix" :disabled="isEdit"></t-input>
      </t-form-item>
      <!-- 第 5️⃣ 行数据 -->
      <t-form-item label="转出仓库的类型" name="transferOutType">
        <t-select v-model="businessTabData.transferOutType" :disabled="isEdit">
          <t-option v-for="item in outFlowDropDownList" :key="item.value" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <!-- 第 6️⃣ 行数据 -->
      <t-form-item label="转入仓库的类型" name="transferInType">
        <t-select v-model="businessTabData.transferInType" :disabled="isEdit">
          <t-option v-for="item in inFlowDropDownList" :key="item.value" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <t-form-item label="启用交易上传" name="isEnableUploadConvert">
        <t-switch v-model="businessTabData.isEnableUploadConvert" />
      </t-form-item>
      <t-form-item label="ERP事务代码" name="erpCategoryCode">
        <t-input v-model="businessTabData.erpCategoryCode"></t-input>
      </t-form-item>
      <t-form-item label="上传顺序" name="ulSeq">
        <t-input v-model="businessTabData.ulSeq"></t-input>
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
import common from '@/utils/common';

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
  id: '',
  categoryCode: '', // 业务类型代码
  categoryName: '', // 业务类型名称
  businessDirection: null, // 业务交易方向
  perfix: '', // 业务单位前缀
  transferOutType: '', // 转出仓库的类型
  transferInType: '', // 转入仓库的类型
  isEnableUpload: 0, // 启用交易上传
  isEnableUploadConvert: false, // 启用交易上传转换类型
  erpCategoryCode: '', // 对应ERP业务类型代码
  ulSeq: 0,
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
    width: '110',
  },
  {
    colKey: 'categoryName',
    title: '业务类型名称',
    width: '110',
  },
  {
    colKey: 'businessDirectionName',
    title: '业务交易方向',
    width: '130',
  },
  {
    colKey: 'transferOutTypeName',
    title: '转出库存的类型',
    width: '150',
  },
  {
    colKey: 'transferInTypeName',
    title: '转入库存的类型',
    width: '150',
  },
  {
    colKey: 'perfix',
    title: '业务单据前缀',
    width: '120',
  },
  {
    colKey: 'isEnableTradeUploadName',
    title: '是否启用交易上传',
    width: '120',
  },
  {
    colKey: 'erpCategoryCode',
    title: 'ERP事务代码',
    width: '120',
  },
  {
    colKey: 'ulSeq',
    title: '上传顺序',
    width: '100',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    width: '100',
  },
  {
    colKey: 'createTime',
    title: '创建时间',
    width: '150',
  },
  {
    colKey: 'op',
    title: '操作',
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
  reset();
  formRef.value.reset({ type: 'empty' });
  common.reset(businessTabData.value);
  businessTabData.value.isEnableUpload = 0;
  formVisible.value = true;
  diaLogTitle.value = '新增仓库业务类型';
};

const isEdit = ref(false);
const onEditRow = (item: any) => {
  reset();
  formVisible.value = true;
  diaLogTitle.value = '编辑仓库业务类型';
  isEdit.value = true;
  Object.assign(businessTabData.value, item.row);
  businessTabData.value.isEnableUploadConvert = businessTabData.value.isEnableUpload === 1;
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  common.reset(businessTabData.value);
  isEdit.value = false;
};

// 新增请求
const onAddBusinessType = async () => {
  businessTabData.value.isEnableUpload = businessTabData.value.isEnableUploadConvert === true ? 1 : 0;
  await api.businessCategory.addBusinessCategory(businessTabData.value);
  await onGetAnomalyTypeData(); // 获取 表格 数据
  MessagePlugin.success('新增成功');
};

// 新增请求
const onEditBusinessType = async () => {
  businessTabData.value.isEnableUpload = businessTabData.value.isEnableUploadConvert === true ? 1 : 0;
  await api.businessCategory.updateBusinessCategory(businessTabData.value);
  await onGetAnomalyTypeData(); // 获取 表格 数据
  MessagePlugin.success('修改成功');
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
  }
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
};

// 表单提交事件
const onBusinessSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (isEdit.value) {
      await onEditBusinessType();
    } else {
      await onAddBusinessType();
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
