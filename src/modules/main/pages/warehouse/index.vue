<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="conditionReset" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableWarehouseColumns"
        :table-data="tableDataWarehouse"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        :resizable="true"
        @refresh="fetchTable"
      >
        <template #title> 仓库列表 </template>
        <template #button>
          <t-button theme="primary" @click="onAdd">新增</t-button>
          <t-button theme="default">导入</t-button>
        </template>
        <template #opAttribute="slotProps">
          <t-space>
            {{ getWarehouseAttributeName(slotProps.row.warehouseAttribute) }}
          </t-space>
        </template>
        <template #opCategory="slotProps">
          <t-space>
            {{ getWarehouseCategory(slotProps.row.warehouseCategory) }}
          </t-space>
        </template>
        <template #stateSwitch="{ row }">
          <t-popconfirm :content="row.state == 1 ? '是否启用仓库' : '是否禁用仓库'" @confirm="onStateRowClick(row)">
            <t-switch v-model="row.state" :custom-value="[1, 0]" :default-value="row.state" size="large"></t-switch>
          </t-popconfirm>
        </template>
        <template #op="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">编辑</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formTitle"
      :on-confirm="onConfirmForm"
      width="786px"
      :close-on-overlay-click="false"
    >
      <warehouse-form ref="formRef"></warehouse-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import WarehouseForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const keyword = ref('');
const selectedWarehouseRowKeys = ref([]);
const tableDataWarehouse = ref([]);
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
  { title: '仓库编码', colKey: 'warehouseCode', width: 85 },
  { title: '仓库名称', width: 85, colKey: 'warehouseName' },
  { title: '仓库描述', width: 85, colKey: 'warehouseDesc' },
  {
    title: '仓库属性',
    width: 85,
    colKey: 'opAttribute',
  },
  { title: '仓库类型', width: 100, colKey: 'opCategory' },
  { title: 'ERP仓库', width: 85, colKey: 'erpWarehouse' },
  { title: '启用交易上传', width: 120, colKey: 'enableUploadName' },
  { title: '启用交易上传时间', width: 170, colKey: 'datetimeUpload' },
  { title: '状态', width: 86, colKey: 'stateSwitch' },
  { title: '货位管理', width: 100, colKey: 'enableLocationName' },
  { title: '先进先出', width: 100, colKey: 'fifoName' },
  { title: '最后更新人', width: 120, colKey: 'modifier' },
  { title: '最后更新时间', width: 170, colKey: 'timeModified' },
  { title: '操作', align: 'left', fixed: 'right', width: 90, colKey: 'op' },
];

// 查询组件
const opts = computed(() => {
  return {
    keyword: {
      label: '仓库',
      comp: 't-input',
      placeholder: '请输入仓库编码/名称',
      defaultVal: '',
    },
    warehouseState: {
      label: '状态',
      comp: 't-select',
      defaultVal: -1,
      bind: {
        options: stateOptions,
        lazyLoad: true,
      },
    },
  };
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  keyword.value = data.keyword;
  warehouseState.value = data.warehouseState;
  onRefresh();
};

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const conditionReset = () => {
  keyword.value = '';
  warehouseState.value = -1;
};
const dataTotal = ref(0);

const fetchTable = async () => {
  setLoading(true);
  try {
    selectedWarehouseRowKeys.value = [];
    tableDataWarehouse.value = [];
    const data = (await api.warehouse.searchList({
      keyword: keyword.value,
      state: warehouseState.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
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
  formRef.value.formData.fifo = value.row.isFifo === 1;
  formRef.value.formData.operateTpye = 'edit';
  formVisible.value = true;
};

const getWarehouseAttributeName = (id: any) => {
  for (const element of formRef.value.warehousePropertyOption) {
    if (id === element.value) {
      return element.label;
    }
  }
  return '';
};
const getWarehouseCategory = (id: any) => {
  for (const element of formRef.value.warehouseTypeOption) {
    if (id === element.value) {
      return element.label;
    }
  }
  return '';
};
const onStateRowClick = async (value: any) => {
  await api.warehouse.stateChange(value.id);
  await fetchTable();
  MessagePlugin.success('操作成功');
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
