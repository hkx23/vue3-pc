<!-- 线边仓 -->
<template>
  <!-- :full-sub-index="[1, 2]" -->
  <cmp-container :full="false">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <!-- ################# 班组表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        empty="没有符合条件的数据"
        row-key="id"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="shiftColumns"
        active-row-type="single"
        :table-data="teamList.list"
        :total="teamTotal"
        :selected-row-keys="selectedRowKeys"
        @row-click="onGroupSelectChange"
        @select-change="onSelectChange"
        @refresh="onFetchGroupData"
      >
        <template #title>
          {{ '线边仓列表' }}
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ '编辑' }}</t-link>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onGroupDelect(row)">{{ '删除' }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData"> 新增 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onTeamDeleteBatches()">
              <t-button theme="default"> 批量删除 </t-button>
            </t-popconfirm>
            <bcmp-import-button theme="default" type="mitemCategory"></bcmp-import-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #班组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="teamFormData" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="仓库名称" name="warehouseId">
        <bcmp-select-business
          v-model="teamFormData.warehouseId"
          label=""
          type="warehouseAuth"
          :clearable="true"
          @selection-change="onWareHouseSelect"
        ></bcmp-select-business>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="仓库代码" name="warehouseCode">
        <t-input v-model="teamFormData.warehouseCode" disabled></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="仓库描述" name="warehouseDesc">
        <t-input v-model="teamFormData.warehouseDesc" disabled></t-input>
      </t-form-item>
      <!-- 第 4️⃣ - 1️⃣ 行数据 新增 ID-->
      <t-form-item v-if="submitFalg" label="工作中心" name="workcenterIds">
        <bcmp-select-business
          v-model="teamFormData.workcenterIds"
          label=""
          type="workcenter"
          :clearable="true"
          :is-multiple="true"
        ></bcmp-select-business>
      </t-form-item>
      <!-- 第 4️⃣ - 2️⃣ 行数据 编辑 ID -->
      <t-form-item v-if="!submitFalg" label="工作中心" name="workcenterId">
        <bcmp-select-business
          v-model="teamFormData.workcenterId"
          label=""
          type="workcenter"
          :clearable="true"
        ></bcmp-select-business>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const teamFormData = ref({
  id: '', // 行 ID
  warehouseCode: '', // 仓库code
  warehouseDesc: '', // 仓库描述
  warehouseId: '', // 仓库 ID
  workcenterId: '', // 编辑工作中心ID
  workcenterIds: [], // 新增工作中心ID
});

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 班组dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const submitFalg = ref(false);
// $班组 表格数据
const teamList = reactive({ list: [] });
// 班组表格数据总条数
const teamTotal = ref(0);
// $人员 表格数据
const supportPersonInUserList = reactive({ list: [] });
// 人员表格数据总条数
const supportPersonTotal = ref(0);
// dialog 弹框数据

// ####班次 表头
const shiftColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'warehouseCode',
    title: '仓库编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'warehouseName',
    title: '仓库名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'warehouseDesc',
    title: '仓库描述',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'orgName',
    title: '组织架构',
    align: 'center',
    width: '80',
  },
  {
    colKey: 'actionSlot',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
];

// # 班组刷新按钮
const onFetchGroupData = async () => {
  await onLinewarehouseTabData(); // 获取 班组表格 数据
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
};

// 表单定义规则
const rules: FormRules = {
  warehouseCode: [{ required: true, trigger: 'blur' }],
  warehouseDesc: [{ required: true, trigger: 'blur' }],
  warehouseId: [{ required: true, trigger: 'change' }],
  workcenterId: [{ required: true, trigger: 'change' }],
  workcenterIds: [{ required: true, trigger: 'change' }],
};
// # 初始渲染
onMounted(async () => {
  await onLinewarehouseTabData(); // 获取 班组表格 数据
});

// #班组搜索
const opts = computed(() => {
  return {
    keyword: { label: '仓库编码/名称', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  lineWarehouseParam.value.keyword = data.keyword;
  await onLinewarehouseTabData();
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
};

const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #出勤表格 参数
const lineWarehouseParam = ref({
  pageNum: 1,
  pageSize: 20,
  keyword: '', // 仓库编码/名称
});

// #获取 线边仓 数据
const onLinewarehouseTabData = async () => {
  lineWarehouseParam.value.pageNum = pageUI.value.page;
  lineWarehouseParam.value.pageSize = pageUI.value.rows;
  const res = await api.lineWarehouse.getList(lineWarehouseParam.value);
  teamList.list = res.list;
  teamTotal.value = res.total;
};

// 添加下拉数据
const onWareHouseSelect = (context) => {
  teamFormData.value.warehouseCode = context.warehouseCode;
  teamFormData.value.warehouseDesc = context.warehouseDesc;
};

// // #添加 线边仓 数据请求
const onAddSupportGroup = async () => {
  teamFormData.value.workcenterIds = teamFormData.value.workcenterIds.map((item) => item.value);
  await api.lineWarehouse.addLineWarehouse(teamFormData.value);
  await onLinewarehouseTabData(); // 获取 班组表格 数据
  formVisible.value = false;
  MessagePlugin.success('新增成功');
};

// // #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = '新增线边仓对应关系';
};

// // #编辑 点击 班组右侧表格编辑按钮
const onEditRow = (row: any) => {
  formRef.value.reset({ type: 'empty' });
  teamFormData.value.id = row.id;
  teamFormData.value.warehouseCode = row.warehouseCode;
  teamFormData.value.warehouseDesc = row.warehouseDesc;
  teamFormData.value.warehouseId = row.warehouseId;
  teamFormData.value.workcenterId = row.workcenterId;
  submitFalg.value = false; // 编辑为 false
  formVisible.value = true;
  diaLogTitle.value = '编辑班组';
};

// #编辑 班组 表格数据 请求
const onGroupRequest = async () => {
  await api.lineWarehouse.modifyLineWarehouse(teamFormData.value);
  await onLinewarehouseTabData(); // 获取 班组表格 数据
  formVisible.value = false;
  MessagePlugin.success('编辑成功');
};

// // ！删除 获取 班组 批量删除数组
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};

const rowGroupId = ref(''); // 点击行ID
const onGroupSelectChange = async ({ row }) => {
  rowGroupId.value = row.id;
};

// // ！ 删除 单项删除 班组 点击
const onGroupDelect = (row: any) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};

// ！班组表格删除确认按钮
const onDelConfirm = async () => {
  await api.lineWarehouse.removeBatch([rowGroupId.value]);
  if (teamList.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onLinewarehouseTabData(); // 获取 班组表格 数据
  MessagePlugin.success('删除成功');
  selectedRowKeys.value = []; // 置空
};

// // ！班组表格批量删除按钮
const onTeamDeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = teamList.list.length;
  // 步骤 2: 执行删除操作
  await api.lineWarehouse.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === teamList.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
  }
  MessagePlugin.success('批量删除成功');
  await onLinewarehouseTabData(); // 获取 班组表格 数据
  selectedRowKeys.value = []; // 置空
};

// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddSupportGroup(); // 新增请求
    } else {
      await onGroupRequest(); // 编辑请求
    }
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.filled-icon {
  color: var(--td-success-color);
}
</style>
