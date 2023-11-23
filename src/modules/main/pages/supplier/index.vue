<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col>
            <div>
              <t-input v-model="keyword" label="供应商：" placeholder="请输入供应商编码/名称" clearable />
            </div>
          </t-col>
          <t-col flex="170px">
            <div>
              <t-button @click="onRefresh">查询</t-button>
              <t-button theme="default" @click="onReset">重置</t-button>
            </div>
          </t-col>
        </t-row>
        <t-row justify="space-between">
          <tm-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="tableSupplierColumns"
            :table-data="tableDataSupplier"
            :loading="loading"
            :total="dataTotal"
            :hover="true"
            :selected-row-keys="selectedSupplierRowKeys"
            @refresh="fetchTable"
          >
            <!-- <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
              </t-space>
            </template> -->
          </tm-table>
        </t-row>
      </div>
    </div>
  </div>
  <div>
    <t-dialog
      v-model:visible="formVisible"
      header="供应商编辑"
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

// import SupplierForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const dataTotal = ref(0);

const keyword = ref('');
const selectedSupplierRowKeys = ref([]);
const tableDataSupplier = ref([]);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);

const tableSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 64 },
  { title: '供应商代码', width: 160, colKey: 'supplierCode' },
  { title: '供应商名称', width: 160, colKey: 'supplierName' },
  { title: '供应商联系人', width: 160, colKey: 'contactPerson' },
  { title: '供应商联系电话', width: 160, colKey: 'contactTel' },
  // { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

// 查询按钮
const onRefresh = () => {
  pageUI.value.page = 1;
  fetchTable();
};
// 重置按钮
const onReset = () => {
  keyword.value = '';
};

const fetchTable = async () => {
  setLoading(true);
  try {
    selectedSupplierRowKeys.value = [];
    tableDataSupplier.value = [];
    const data = (await api.supplier.search({
      keyword: keyword.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: sortlist.value,
      filters: filterlist.value,
    })) as any;
    tableDataSupplier.value = data.list;
    dataTotal.value = data.total;
    // tableSupplierPagination.value = { ...tableSupplierPagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// const onEditRowClick = (value: any) => {
//   formRef.value.formData = JSON.parse(JSON.stringify(value.row));
//   formVisible.value = true;
// };

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
