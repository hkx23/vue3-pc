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
        <template #button>
          <t-button theme="primary" @click="onAddMeasuring">{{ t('common.button.add') }}</t-button>
          <bcmp-import-auto-button theme="default" button-text="导入" type="m_supplier"></bcmp-import-auto-button>
        </template>
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
            <t-popconfirm theme="default" :content="t('common.message.confirmDelete')" @confirm="onDeleteRow(row)">
              <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <t-dialog
    v-model:visible="formVisible"
    :header="diaTitle"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <supplier-form ref="formRef" :edit-form-data="editFormData"></supplier-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import SupplierForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();
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
const diaTitle = ref('新增');
const editFormData = ref(null);

const tableSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '供应商代码', width: 160, colKey: 'supplierCode' },
  { title: '供应商名称', width: 160, colKey: 'supplierName' },
  { title: '供应商联系人', width: 160, colKey: 'contactPerson' },
  { title: '供应商联系电话', width: 160, colKey: 'contactTel' },
  { title: '操作', align: 'left', fixed: 'right', width: 100, colKey: 'op' },
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
// 点击新增逻辑
const onAddMeasuring = () => {
  diaTitle.value = '新增';
  editFormData.value = {};
  formVisible.value = true;
};
// 点击编辑逻辑
const onEditRow = (row) => {
  diaTitle.value = '编辑';
  editFormData.value = row;
  formVisible.value = true;
};
// 单个数据实现删除逻辑
const onDeleteRow = async (row) => {
  await api.supplier.removeById([row.id]);
  MessagePlugin.success('删除成功');
  onRefresh();
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
  formRef.value.submit().then((res) => {
    if (res) {
      formVisible.value = false;
      fetchTable();
    }
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
