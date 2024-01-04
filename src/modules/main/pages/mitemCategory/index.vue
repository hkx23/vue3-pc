<template>
  <!-- :full-sub-index="[1, 2]" -->
  <cmp-container :full="false">
    <cmp-card>
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card>
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableMitemCategoryColumns"
        :table-data="tableDataMitemCategory"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="false"
        select-on-row-click
        @refresh="fetchTable"
        @select-change="onSelectMitemCategoryChange"
      >
        <template #title> 物料类别列表 </template>
        <template #button> <t-button theme="primary" @click="onImport">导入</t-button></template>
        <template #op="slotProps">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRowClick(slotProps)">{{ t('common.button.edit') }}</t-link>
            <t-link theme="primary" @click="onDeleteRowClick(slotProps)">{{ t('common.button.delete') }}</t-link>
            <!-- <t-icon name="edit" @click="onEditRowClick(slotProps)" />
            <t-icon name="delete" @click="onDeleteRowClick(slotProps)" /> -->
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageMitem"
        class="son-table"
        row-key="id"
        :fixed-height="false"
        :total="mitemTotal"
        :table-column="tableMitemColumns"
        :table-data="tableDataMitem"
        :loading="loadingMitem"
        @refresh="fetchMitemTable"
      >
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <div>
    <t-dialog
      v-model:visible="formVisible"
      header="分类编辑"
      :on-confirm="onConfirmForm"
      :close-on-overlay-click="false"
    >
      <mitem-category-form ref="formRef"></mitem-category-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import MitemCategoryForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();
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

// 查询组件
const opts = computed(() => {
  return {
    keyword: {
      label: t('business.main.mitemCategoryCode'),
      comp: 't-input',
      placeholder: t('common.placeholder.input', [
        `${t('business.main.mitemCategoryCode')}/${t('business.main.mitemCategoryName')}`,
      ]),
      defaultVal: '',
    },
  };
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  keyword.value = data.keyword;
  onRefresh();
};

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
// const onReset = () => {
//   keyword.value = '';
// };

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

      MessagePlugin.success('删除成功');
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
