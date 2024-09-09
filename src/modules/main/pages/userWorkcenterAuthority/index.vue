<!-- 用户工作中心权限 -->
<template>
  <permissionAllocation v-if="pageShow" @permission-show="onPermission"></permissionAllocation>
  <cmp-container v-show="!pageShow" :full="true">
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
          {{ '用户工作中心权限列表' }}
        </template>
        <template #actionSlot>
          <t-space :size="8">
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
            <!-- <t-button theme="default">导入</t-button>
            <t-button theme="default">导出</t-button> -->
          </t-space>
        </template>
        <template #oidOrgName="{ row }">
          {{ `${row.oidOrgName} — ${row.oidWorkcenterName}` }}
        </template>
        <template #businessDirection="{ row }">
          {{ `${row.toOrgName} — ${row.toWorkcenterName}` }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/main';
import { usePage } from '@/hooks/modules/page';

import permissionAllocation from './permissionAllocation.vue';

const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const selectedRowKeys = ref([]); // 删除计量单位 id
const pageShow = ref(false);

// 表格数据总条数
const transferTotal = ref(0);
// 表格数据
const transferData = reactive({ list: [] });
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'orgName',
    title: '库存组织',
    width: '110',
  },
  {
    colKey: 'userName',
    title: '用户编号',
    width: '150',
  },
  {
    colKey: 'userDisplayName',
    title: '用户姓名',
    width: '120',
  },
  {
    colKey: 'workcenterCode',
    title: '工作中心编码',
    width: '120',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心名称',
    width: '150',
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
    width: '100',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// 初始渲染
onMounted(async () => {
  await onGetTransferData(); // 获取 表格 数据
});

// 刷新按钮
const onFetchData = () => {
  onGetTransferData();
  selectedRowKeys.value = [];
};

const transferParam = ref({
  pageNum: 1,
  pageSize: 10,
  workcenterId: '', // 单个工作中心ID
  userIds: [], // 多个用户ID
});

// 获取 表格 数据
const onGetTransferData = async () => {
  // tableRef.value.setSelectedRowKeys([]);
  selectedRowKeys.value = [];
  transferParam.value.pageNum = pageUI.value.page;
  transferParam.value.pageSize = pageUI.value.rows;
  const res = await api.userWorkcenterAuthority.getList(transferParam.value);
  transferData.list = res.list;
  transferTotal.value = res.total;
};

// 新增按钮点击事件
const onAddClick = async () => {
  pageShow.value = true;
};

const onPermission = (value) => {
  pageShow.value = value;
  onGetTransferData();
};

// #query 查询参数
const opts = computed(() => {
  return {
    workcenter: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        // valueField: 'scheCode',
        type: 'workcenter',
        showTitle: false,
      },
    },
    user: {
      label: '用户',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
        isMultiple: true,
      },
    },
  };
});

const onInput = async (data) => {
  const { workcenter, user } = data;
  const newArr = user === '' || user === null ? [] : user.split(',').map((item) => item.trim());
  transferParam.value.userIds = newArr;
  transferParam.value.workcenterId = workcenter;
  pageUI.value.page = 1;
  await onGetTransferData();
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
  await api.userWorkcenterAuthority.removeBatch(selectedRowKeys.value);
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
  await api.userWorkcenterAuthority.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === transferData.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
  }
  await onGetTransferData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
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
