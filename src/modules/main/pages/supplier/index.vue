<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableSupplierColumns"
        :table-data="tableDataSupplier"
        :loading="loading"
        :fixed-height="true"
        :total="dataTotal"
        :hover="true"
        :selected-row-keys="selectedSupplierRowKeys"
        @refresh="fetchTable"
      >
        <template #title> 供应商列表 </template>
        <!-- <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
              </t-space>
            </template> -->
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <t-dialog
    v-model:visible="formVisible"
    header="供应商编辑"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <mitem-form ref="formRef"></mitem-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

// import SupplierForm from './form.vue';

const { pageUI } = usePage();
const { loading } = useLoading();
const dataTotal = ref(0);

const keyword = ref('');
const selectedSupplierRowKeys = ref([]);
const tableDataSupplier = ref([]);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formRef = ref(null);

const tableSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '供应商代码', width: 160, colKey: 'supplierCode' },
  { title: '供应商名称', width: 160, colKey: 'supplierName' },
  { title: '供应商联系人', width: 160, colKey: 'contactPerson' },
  { title: '供应商联系电话', width: 160, colKey: 'contactTel' },
  // { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
// 查询组件
const opts = computed(() => {
  return {
    keyword: {
      label: '供应商',
      comp: 't-input',
      placeholder: '请输入供应商编码/名称',
      defaultVal: '',
    },
  };
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  keyword.value = data.keyword;
  onRefresh();
};
// 查询按钮
const onRefresh = () => {
  pageUI.value.page = 1;
  fetchTable();
};
// 重置按钮
// const onReset = () => {
//   keyword.value = '';
// };

const fetchTable = async () => {
  utils.loadingPluginFullScreen(true);
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
    utils.loadingPluginFullScreen(false);
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
