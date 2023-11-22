<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col>
            <div>
              <t-input v-model="keyword" label="物料：" placeholder="请输入物料编码/名称" clearable />
            </div>
          </t-col>
          <t-col flex="170px">
            <div>
              <t-button @click="onRefresh">查询</t-button>
              <t-button theme="default" @click="onReset">重置</t-button>
            </div>
          </t-col>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-checkbox-group v-model="mitemTypeSelect" :options="mitemTypeOptions" />
        </t-row>
        <t-row justify="space-between">
          <t-table
            row-key="id"
            :columns="tableMitemColumns"
            :data="tableDataMitem"
            :loading="dataLoading"
            :hover="true"
            :pagination="tableMitemPagination"
            :selected-row-keys="selectedMitemRowKeys"
            @page-change="onPageChange"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
              </t-space>
            </template>
          </t-table>
        </t-row>
      </div>
    </div>
  </div>
  <div>
    <t-dialog
      v-model:visible="formVisible"
      header="物料编辑"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <mitem-form ref="formRef"></mitem-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/modeling';

import MitemForm from './form.vue';

const keyword = ref('');
const selectedMitemRowKeys = ref([]);
const tableDataMitem = ref([]);
const dataLoading = ref(false);
const mitemTypeOptions = ref(['原材料', '半成品', '成品']);
const mitemTypeSelect = ref([]);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);

const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 64 },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料名称', width: 160, colKey: 'mitemName' },
  { title: '物料描述', width: 160, colKey: 'mitemDesc' },
  { title: '物料类别', width: 160, colKey: 'mmitemCategoryCode' },
  { title: '物料类别名称', width: 160, colKey: 'mmitemCategoryName' },
  { title: '主计量单位', width: 160, colKey: 'uom' },
  { title: '是否成品', width: 160, colKey: 'isProductName' },
  { title: '是否半成品', width: 160, colKey: 'isInProcessName' },
  { title: '是否原材料', width: 160, colKey: 'isRawName' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
const tableMitemPagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  keyword.value = '';
};

const fetchTable = async () => {
  dataLoading.value = true;
  try {
    selectedMitemRowKeys.value = [];
    tableDataMitem.value = [];
    const data = (await api.mitem.getList({
      keyword: keyword.value,
      isRaw: mitemTypeSelect.value.find((n) => n === '原材料') != null ? 1 : 0,
      isInProcess: mitemTypeSelect.value.find((n) => n === '半成品') != null ? 1 : 0,
      isProduct: mitemTypeSelect.value.find((n) => n === '成品') != null ? 1 : 0,
      pageNum: tableMitemPagination.value.defaultCurrent,
      pageSize: tableMitemPagination.value.defaultPageSize,
      sorts: sortlist.value,
      filters: filterlist.value,
    })) as any;
    tableDataMitem.value = data.list;
    tableMitemPagination.value = { ...tableMitemPagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const onEditRowClick = (value: any) => {
  // const rowData = value.row;
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formVisible.value = true;
};

const onConfirmForm = async () => {
  formRef.value.submit().then(() => {
    formVisible.value = false;
    fetchTable();
  });
};

const onPageChange = (curr: any) => {
  tableMitemPagination.value.defaultCurrent = curr.current;
  tableMitemPagination.value.defaultPageSize = curr.pageSize;
  fetchTable();
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
