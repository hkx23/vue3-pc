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
          <tm-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="tableMitemColumns"
            :table-data="tableDataMitem"
            :loading="loading"
            :total="dataTotal"
            @refresh="fetchTable"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
              </t-space>
            </template>
          </tm-table>
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

import { api } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import MitemForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const keyword = ref('');
const selectedMitemRowKeys = ref([]);
const tableDataMitem = ref([]);
const mitemTypeOptions = ref(['原材料', '半成品', '成品']);
const mitemTypeSelect = ref([]);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);

const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 74 },
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
// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  keyword.value = '';
};
const dataTotal = ref(0);

const fetchTable = async () => {
  setLoading(true);
  try {
    selectedMitemRowKeys.value = [];
    tableDataMitem.value = [];
    const data = (await api.mitem.getList({
      keyword: keyword.value,
      isRaw: mitemTypeSelect.value.find((n) => n === '原材料') != null ? 1 : 0,
      isInProcess: mitemTypeSelect.value.find((n) => n === '半成品') != null ? 1 : 0,
      isProduct: mitemTypeSelect.value.find((n) => n === '成品') != null ? 1 : 0,
      pageNum: pageUI.value.pageIndex,
      pageSize: pageUI.value.pageIndex,
      sorts: sortlist.value,
      filters: filterlist.value,
    })) as any;
    tableDataMitem.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
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
