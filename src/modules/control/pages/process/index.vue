<template>
  <div class="main-page">
    <div class="main-page-content">
      <t-row justify="space-between">
        <t-col>
          <div>
            <t-input v-model="keyword" label="工序：" placeholder="请输入工序编码/名称" clearable />
          </div>
        </t-col>
        <t-col flex="10px" />
        <t-col>
          <div>
            <t-select v-model="processState" label="状态" :options="stateOptions" clearable />
          </div>
        </t-col>
        <t-col flex="auto" />
        <t-col flex="170px">
          <div>
            <t-button @click="onRefresh">查询</t-button>
            <t-button theme="default" @click="onReset">重置</t-button>
          </div>
        </t-col>
      </t-row>
    </div>
    <div class="main-page-content">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableProcessColumns"
        :table-data="tableDataProcess"
        :loading="loading"
        :total="dataTotal"
        :resizable="true"
        @refresh="fetchTable"
      >
        <template #button>
          <t-button theme="primary" @click="onAdd">新增</t-button>
          <t-button theme="default">导入</t-button>
          <t-button theme="default">导出</t-button>
        </template>
        <template #op="slotProps">
          <t-space>
            <t-icon name="edit" @click="onEditRowClick(slotProps)" />
          </t-space>
        </template>
      </cmp-table>
    </div>
  </div>
  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formTitle"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <process-form ref="formRef"></process-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import ProcessForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const keyword = ref('');
const selectedProcessRowKeys = ref([]);
const tableDataProcess = ref([]);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);
const formTitle = ref('');
const processState = ref(-1);

// 下拉初始数据
const stateOptions = [
  { label: '全部', value: -1 },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const tableProcessColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 74 },
  { title: '工序代码', width: 160, colKey: 'processCode' },
  { title: '工序名称', width: 160, colKey: 'processName' },
  { title: '工序描述', width: 160, colKey: 'processDesc' },
  { title: '状态', width: 160, colKey: 'stateName' },
  { title: '创建人', width: 160, colKey: 'creatorName' },
  { title: '创建时间', width: 160, colKey: 'timeCreate' },
  { title: '更新人', width: 160, colKey: 'modifierName' },
  { title: '更新时间', width: 160, colKey: 'timeModified' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  keyword.value = '';
  processState.value = -1;
};
const dataTotal = ref(0);

const fetchTable = async () => {
  setLoading(true);
  try {
    selectedProcessRowKeys.value = [];
    tableDataProcess.value = [];
    const data = (await api.process.search({
      keyword: keyword.value,
      state: processState.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: sortlist.value,
      filters: filterlist.value,
    })) as any;
    tableDataProcess.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const onEditRowClick = (value: any) => {
  formTitle.value = '编辑';
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formRef.value.formData.operateTpye = 'edit';
  formVisible.value = true;
};

const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      fetchTable();
    }
  });
};

const onAdd = () => {
  formTitle.value = '新增';
  formRef.value.init();
  formVisible.value = true;
};

onMounted(() => {
  fetchTable();
});
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}
</style>
