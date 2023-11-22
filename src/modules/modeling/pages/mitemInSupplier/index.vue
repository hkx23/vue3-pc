<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col>
            <t-input v-model="mitemKeyword" label="物料：" placeholder="请输入物料编码/名称" clearable />
          </t-col>
          <t-col>
            <t-input v-model="supplierKeyword" label="供应商：" placeholder="请输入供应商编码/名称" clearable />
          </t-col>
          <t-col flex="45%" />
          <t-col flex="170px">
            <div>
              <t-button @click="onRefresh">查询</t-button>
              <t-button theme="default" @click="onReset">重置</t-button>
            </div>
          </t-col>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-button @click="onAdd">新增</t-button>
          <t-button theme="default" @click="onDelete">删除</t-button>
          <t-button theme="default">导入</t-button>
          <t-button theme="default">导出</t-button>
        </t-row>
        <t-row justify="space-between">
          <t-table
            row-key="id"
            :columns="tableMitemInSupplierColumns"
            :data="tableDataMitemInSupplier"
            :loading="dataLoading"
            :hover="true"
            :pagination="tableMitemInSupplierPagination"
            :selected-row-keys="selectedMitemInSupplierRowKeys"
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
      header="编辑"
      :on-confirm="onConfirmForm"
      width="60%"
      :close-on-overlay-click="false"
      :on-close="onCloseForm"
    >
      <t-space direction="vertical" style="width: 98%">
        <mitem-in-supplier-form ref="formRef"></mitem-in-supplier-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/modeling';

// import TmSelectBusiness from '@/components/tm-select-business/index.vue';
import MitemInSupplierForm from './form.vue';

const mitemKeyword = ref('');
const supplierKeyword = ref('');
const selectedMitemInSupplierRowKeys = ref([]);
const tableDataMitemInSupplier = ref([]);
const dataLoading = ref(false);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);

const tableMitemInSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 64 },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料名称', width: 160, colKey: 'mitemName' },
  { title: '供应商编码', width: 160, colKey: 'supplierCode' },
  { title: '供应商名称', width: 160, colKey: 'supplierName' },
  { title: '最小包装数量', width: 160, colKey: 'qty' },
  { title: '检查严格度', width: 160, colKey: 'inspectionStringency' },
  { title: '是否免检', width: 160, colKey: 'isExemptionInspection' },
  { title: '免检失效日期', width: 160, colKey: 'dateExemptionExpiredStr' },
  { title: '是否强制供方申请', width: 160, colKey: 'isForceInspection' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
const tableMitemInSupplierPagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  mitemKeyword.value = '';
  supplierKeyword.value = '';
};
const onAdd = () => {
  fetchTable();
};
const onDelete = () => {
  fetchTable();
};

const fetchTable = async () => {
  dataLoading.value = true;
  try {
    selectedMitemInSupplierRowKeys.value = [];
    tableDataMitemInSupplier.value = [];
    const data = (await api.mitemInSupplier.getMitemInSupplierList({
      mitemKeyword: mitemKeyword.value,
      supplierKeyword: supplierKeyword.value,
      pageNum: tableMitemInSupplierPagination.value.defaultCurrent,
      pageSize: tableMitemInSupplierPagination.value.defaultPageSize,
      sorts: sortlist.value,
      filters: filterlist.value,
    })) as any;
    tableDataMitemInSupplier.value = data.list;
    tableMitemInSupplierPagination.value = { ...tableMitemInSupplierPagination.value, total: data.total };
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

const onCloseForm = async () => {
  formRef.value.init();
};

const onPageChange = (curr: any) => {
  tableMitemInSupplierPagination.value.defaultCurrent = curr.current;
  tableMitemInSupplierPagination.value.defaultPageSize = curr.pageSize;
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
