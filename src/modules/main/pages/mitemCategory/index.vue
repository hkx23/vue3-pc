<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col>
            <div>
              <t-input v-model="keyword" label="物料类别：" placeholder="请输入类别编码/名称" clearable />
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
          <t-button theme="default" @click="onImport">导入</t-button>
        </t-row>
        <t-row justify="space-between">
          <tm-table
            ref="tableRef"
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="tableMitemCategoryColumns"
            :table-data="tableDataMitemCategory"
            :loading="loading"
            :total="dataTotal"
            select-on-row-click
            @refresh="fetchTable"
            @select-change="onSelectMitemCategoryChange"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
                <t-icon name="delete" @click="onDeleteRowClick(slotProps)" />
              </t-space>
            </template>
          </tm-table>
        </t-row>
        <t-row style="margin-top: 10px">
          <tm-table
            v-model:pagination="pageMitem"
            row-key="id"
            :total="mitemTotal"
            :table-column="tableMitemColumns"
            :table-data="tableDataMitem"
            :loading="loadingMitem"
            @refresh="fetchMitemTable"
          >
          </tm-table>
        </t-row>
      </div>
    </div>
  </div>

  <div>
    <t-dialog
      v-model:visible="formVisible"
      header="分类编辑"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <mitem-category-form ref="formRef"></mitem-category-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { DialogPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import MitemCategoryForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const { pageUI: pageMitem } = usePage();
const { loading: loadingMitem, setLoading: setLoadingMitem } = useLoading();

const tableMitemCategoryColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'single', width: 64, fixed: 'left' },
  { title: '分类编码', width: 160, colKey: 'categoryCode' },
  { title: '分类名称', width: 160, colKey: 'categoryName' },
  { title: '分类描述', width: 160, colKey: 'categoryDesc' },
  { title: '计算类型', width: 160, colKey: 'reqCalcRuleName' }, // normal：不作任何处理 ceil：有小数，进位取整
  { title: '投料规则', width: 200, colKey: 'onboardRuleCodeName' }, // singlelotonly multilot singlelotreduce multilotreduce
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
// const tableMitemCategoryPagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });
const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '物料编码', colKey: 'mitemCode' },
  { title: '物料名称', colKey: 'mitemName' },
  { title: '物料描述', colKey: 'mitemDesc' },
];
const tableDataMitemCategory = ref([]);
const tableDataMitem = ref([]);
const formVisible = ref(false);
const formRef = ref(null);
const dataTotal = ref(0);
const mitemTotal = ref(0);
const keyword = ref('');
const tableRef = ref();
const selectCategoryID = ref(0);

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  keyword.value = '';
};

// 导入按钮
const onImport = () => {
  console.log('导入功能待完成');
};

const onEditRowClick = (value: any) => {
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formVisible.value = true;
};

const fetchTable = async () => {
  tableRef.value.setSelectedRowKeys([]);
  setLoading(true);
  try {
    const data = (await api.mitemCategory.getlist({
      keyword: keyword.value,
      pagenum: pageUI.value.page,
      pagesize: pageUI.value.rows,
    })) as any;
    tableDataMitemCategory.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
    selectCategoryID.value = -1;
    fetchMitemTable();
  }
};

const fetchMitemTable = async () => {
  setLoadingMitem(true);
  if (selectCategoryID.value === -1) {
    tableDataMitem.value = [];
    mitemTotal.value = 0;
    setLoadingMitem(false);
    return;
  }
  try {
    const data = (await api.mitem.getListByMitemCategory({
      keyword: '',
      mitemcategoryid: selectCategoryID.value,
      pagenum: pageMitem.value.page,
      pagesize: pageMitem.value.rows,
    })) as any;
    tableDataMitem.value = data.list;
    mitemTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMitem(false);
  }
};

// 选中行
const onSelectMitemCategoryChange = (value: any) => {
  selectCategoryID.value = value;
  fetchMitemTable();
};

const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      fetchTable();
    }
  });
};

const onDeleteRowClick = async (value: any) => {
  const confirmDia = DialogPlugin({
    header: '删除',
    body: '如果是手工导入的物料类别允许删除，如果是从第三方系统同步则不允许删除。是否删除？',
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: async () => {
      await api.mitemCategory.delete(value.row);
      fetchTable();
      confirmDia.hide();
    },
    onClose: () => {
      confirmDia.hide();
    },
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
