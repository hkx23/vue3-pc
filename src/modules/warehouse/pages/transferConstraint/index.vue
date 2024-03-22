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
        :table-data="transferData.list"
        :total="transferTotal"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onFetchData"
      >
        <template #title>
          {{ '仓库转移规则列表' }}
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ '编辑' }}</t-link>
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
            <t-button theme="default">导入</t-button>
            <t-button theme="default">导出</t-button>
          </t-space>
        </template>
        <template #oidOrgName="{ row }">
          {{ `${row.oidOrgName} — ${row.oidWarehouseName}` }}
        </template>
        <template #businessDirection="{ row }">
          {{ `${row.toOrgName} — ${row.toWarehouseName}` }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle" width="850">
    <t-form ref="formRef" :rules="rules" :data="businessTabData" @submit="onBusinessSubmit">
      <t-row :gutter="[32, 16]">
        <!-- 第 1️⃣ 行数据 -->
        <t-col :span="12">
          <t-form-item label="业务类型" name="businessCategoryId">
            <bcmp-select-business
              v-model="businessTabData.businessCategoryId"
              :is-multiple="false"
              type="businessCategory"
              label=""
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item label="源组织" name="sourceTissueId">
            <t-select v-model="businessTabData.sourceTissueId" @popup-visible-change="onSourceTissueChange">
              <t-option
                v-for="item in onSourceTissueDropDownList"
                :key="item.id"
                :label="item.orgName"
                :value="item.id"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="源仓库" name="warehouseId">
            <bcmp-select-business
              v-model="businessTabData.warehouseId"
              :parent-id="businessTabData.sourceTissueId"
              type="warehouseAuthByOrg"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 3️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item label="目标组织" name="toOid">
            <t-select v-model="businessTabData.toOid" @popup-visible-change="onTargetOrgChange">
              <t-option
                v-for="item in onSourceTissueDropDownList"
                :key="item.id"
                :label="item.orgName"
                :value="item.id"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="目标仓库" name="toWWarehouseId">
            <bcmp-select-business
              v-model="businessTabData.toWWarehouseId"
              :parent-id="businessTabData.toOid"
              type="warehouseAuthByOrg"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
      </t-row>
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
const transferTotal = ref(0);
// 表格数据
const transferData = reactive({ list: [] });
// dialog 弹框数据
const businessTabData = ref({
  sourceTissueId: '', // 源组织
  businessCategoryId: '', // 业务类型
  warehouseId: '', // 源仓库id
  toOid: '', // 目标组织
  toWWarehouseId: '', // 目标仓库id
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'categoryName',
    title: '业务类型',
    width: '110',
  },
  {
    colKey: 'oidOrgName',
    title: '源组织与仓库',
    width: '250',
  },
  {
    colKey: 'businessDirection',
    title: '目标组织与仓库',
    width: '250',
  },
  {
    colKey: 'creator',
    title: '创建人',
    width: '120',
  },
  {
    colKey: 'timeCreate',
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
  businessCategoryId: [{ required: true, trigger: 'change' }],
  sourceTissueId: [{ required: false, trigger: 'change' }],
  warehouseId: [{ required: false, trigger: 'change' }],
  toOid: [{ required: true, trigger: 'change' }],
  toWWarehouseId: [{ required: true, trigger: 'change' }],
};
// 初始渲染
onMounted(async () => {
  await onGetTransferData(); // 获取 表格 数据
  await transactionDropDownData(); // 业务交易方向下拉
  await inFlowDropDownData(); // 转入库存的类型
});

// 业务交易方向下拉
const transactionDropDownList = ref([]);
const transactionDropDownData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'W_BUSINESS_DIRECTION' });
  transactionDropDownList.value = res;
};

// 转入库存的类型
const inFlowDropDownList = ref([]);
const inFlowDropDownData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'W_TRANSFER_IN_TYPE' });
  inFlowDropDownList.value = res;
};

// 组织数据获取
const onSourceTissueDropDownList = ref([]);
const onSourceTissue = async () => {
  const res = await api.transferConstraint.getOrgs();
  onSourceTissueDropDownList.value = res;
};

// 源组织下拉事件
const onSourceTissueChange = async (visible: boolean) => {
  if (visible) {
    businessTabData.value.warehouseId = '';
  }
};

// 目标组织下拉
const onTargetOrgChange = async (visible: boolean) => {
  if (visible) {
    businessTabData.value.toWWarehouseId = '';
  }
};

// 刷新按钮
const onFetchData = () => {
  onGetTransferData();
  selectedRowKeys.value = [];
};

const transferParam = ref({
  pageNum: 1,
  pageSize: 10,
  warehouseKeyword: '', // 仓库
  businessCategoryId: '', // 仓库类型
});

// 获取 表格 数据
const onGetTransferData = async () => {
  // tableRef.value.setSelectedRowKeys([]);
  selectedRowKeys.value = [];
  transferParam.value.pageNum = pageUI.value.page;
  transferParam.value.pageSize = pageUI.value.rows;
  const res = await api.transferConstraint.getList(transferParam.value);
  transferData.list = res.list;
  transferTotal.value = res.total;
};

// 新增按钮点击事件
const submitFlag = ref(true); // 控制新增编辑
const onAddClick = async () => {
  formRef.value.reset({ type: 'empty' });
  await onSourceTissue();

  businessTabData.value.sourceTissueId = ''; // 源组织
  businessTabData.value.businessCategoryId = ''; // 业务类型
  businessTabData.value.warehouseId = ''; // 源仓库id
  businessTabData.value.toOid = ''; // 目标组织
  businessTabData.value.toWWarehouseId = ''; // 目标仓库id

  formVisible.value = true;
  submitFlag.value = true;
  diaLogTitle.value = '仓库转移规则新增';
};

// 新增请求
const onAddBusinessType = async () => {
  await api.transferConstraint.addTransferConstraint(businessTabData.value);
  await onGetTransferData(); // 获取 表格 数据
  MessagePlugin.success('新增成功');
};

// 编辑按钮点击
const rowId = ref('');
const onEditRow = async (row: any) => {
  selectedRowKeys.value = [];
  rowId.value = row.id;
  businessTabData.value.sourceTissueId = row.oid;
  businessTabData.value.businessCategoryId = row.businessCategoryId;
  businessTabData.value.warehouseId = row.warehouseId;
  businessTabData.value.toOid = row.toOid;
  businessTabData.value.toWWarehouseId = row.toWWarehouseId;
  await onSourceTissue();
  formVisible.value = true;
  submitFlag.value = false;
  diaLogTitle.value = '仓库转移规则编辑';
};

// 编辑请求
const onEadit = async () => {
  await api.transferConstraint.modifyTransferConstraint({ ...businessTabData.value, id: rowId.value });
  await onGetTransferData(); // 获取 表格 数据
  MessagePlugin.success('编辑成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    warehouseKeyword: {
      label: '仓库',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    businessCategoryId: {
      label: '业务类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        // valueField: 'scheCode',
        type: 'businessCategory',
        showTitle: false,
      },
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  transferParam.value.warehouseKeyword = data.warehouseKeyword;
  transferParam.value.businessCategoryId = data.businessCategoryId;
  await onGetTransferData();
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
  await api.transferConstraint.removeBatch(selectedRowKeys.value);
  if (transferData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onGetTransferData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// 批量删除
const onDeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = transferData.list.length;
  // 步骤 2: 执行删除操作
  await api.transferConstraint.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === transferData.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
  }
  await onGetTransferData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
};

// 表单提交事件
const onBusinessSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFlag.value) {
      await onAddBusinessType();
    } else {
      await onEadit();
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
