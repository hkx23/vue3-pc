<template>
  <div class="main-page">
    <div class="main-page-content">
      <t-row justify="space-between">
        <t-col>
          <div>
            <t-input v-model="keyword" label="仓库编码/名称/描述：" placeholder="请输入" clearable />
          </div>
        </t-col>
        <t-col flex="10px" />
        <t-col>
          <div>
            <t-select v-model="warehouseState" label="状态" :options="stateOptions" clearable />
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
      <tm-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableWarehouseColumns"
        :table-data="tableDataWarehouse"
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
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">修改</t-link>
            <t-link variant="text" theme="primary" @click="onStateRowClick(slotProps)">{{
              slotProps.row.state == 1 ? '失效' : '生效'
            }}</t-link>
          </t-space>
        </template>
      </tm-table>
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
        <warehouse-form ref="formRef"></warehouse-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import WarehouseForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const keyword = ref('');
const selectedWarehouseRowKeys = ref([]);
const tableDataWarehouse = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);
const formTitle = ref('');
const warehouseState = ref(-1);

// 下拉初始数据
const stateOptions = [
  { label: '全部', value: -1 },
  { label: '已生效', value: 1 },
  { label: '已失效', value: 0 },
];

const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '仓库编码', colKey: 'warehouseCode', width: 80 },
  { title: '仓库名称', width: 80, colKey: 'warehouseName' },
  { title: '仓库描述', width: 80, colKey: 'warehouseDesc' },
  { title: '仓库属性', width: 80, colKey: 'warehouseAttribute' },
  { title: '仓库类型', width: 80, colKey: 'warehouseCategory' },
  { title: 'ERP仓库', width: 80, colKey: 'erpWarehouse' },
  { title: '启用交易上传', width: 100, colKey: 'enableUploadName' },
  { title: '启用交易上传时间', width: 150, colKey: 'datetimeUpload' },
  { title: '状态', width: 74, colKey: 'stateName' },
  { title: '货位管理', width: 100, colKey: 'enableLocationName' },
  { title: '最后更新人', width: 110, colKey: 'modifier' },
  { title: '最后更新时间', width: 150, colKey: 'timeModified' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  keyword.value = '';
  warehouseState.value = -1;
};
const dataTotal = ref(0);

const fetchTable = async () => {
  setLoading(true);
  try {
    selectedWarehouseRowKeys.value = [];
    tableDataWarehouse.value = [];
    const data = (await api.warehouse.search({
      keyword: keyword.value,
      state: warehouseState.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterlist.value,
    })) as any;
    tableDataWarehouse.value = data.list;
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
  formRef.value.formData.isState = value.row.state === 1;
  formRef.value.formData.enableLocation = value.row.isEnableLocation === 1;
  formRef.value.formData.enableUpload = value.row.isEnableUpload === 1;
  formRef.value.formData.operateTpye = 'edit';
  formVisible.value = true;
};

const onStateRowClick = async (value: any) => {
  await api.warehouse.stateChange(value.row.id);
  MessagePlugin.success('修改成功');
  fetchTable();
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
