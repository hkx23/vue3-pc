<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        v-model:filters="filterList"
        v-model:sorters="sortList"
        row-key="id"
        :table-column="tableMitemColumns"
        :table-data="tableDataMitem"
        :loading="loading"
        :total="dataTotal"
        :resizable="true"
        :fixed-height="true"
        @refresh="fetchTable"
      >
        <template #title> 物料列表 </template>
        <template #op="slotProps">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRowClick(slotProps)">{{ t('common.button.edit') }}</t-link>
            <!-- <t-icon name="edit" @click="onEditRowClick(slotProps)" /> -->
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="t('common.dialog.header.edit')"
      :on-confirm="onConfirmForm"
      width="786px"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical">
        <mitem-form ref="formRef"></mitem-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import MitemForm from './form.vue';
import { useLang } from './lang';

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const keyword = ref('');
const mitemCategoryKeyword = ref('');

const selectedMitemRowKeys = ref([]);
const tableDataMitem = ref([]);
const mitemTypeOptions = ref([t('business.main.raw'), t('business.main.inProduct'), t('business.main.product')]);
const mitemTypeSelect = ref([]);
const sortList = ref({ sorters: [] });
const filterList = ref({ filters: [] });
const formVisible = ref(false);
const formRef = ref(null);

const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { title: t('business.main.mitemCode'), width: 160, colKey: 'mitemCode' },
  { title: t('business.main.mitemName'), width: 160, colKey: 'mitemName' },
  { title: t('business.main.mitemDesc'), width: 160, colKey: 'mitemDesc' },
  { title: t('business.main.mitemCategoryCode'), width: 160, colKey: 'mitemCategoryCode' },
  { title: t('business.main.mitemCategoryName'), width: 160, colKey: 'mitemCategoryName' },
  { title: t('business.main.uom'), width: 160, colKey: 'uom' },
  { title: t('business.main.product'), width: 160, colKey: 'isProductName' },
  { title: t('business.main.inProduct'), width: 160, colKey: 'isInProcessName' },
  { title: t('business.main.raw'), width: 160, colKey: 'isRawName' },
  { title: t('common.button.operation'), align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
// const onReset = () => {
//   keyword.value = '';
//   mitemCategoryKeyword.value = '';
// };

// 点击查询按钮
const conditionEnter = (data: any) => {
  keyword.value = data.keyword;
  mitemCategoryKeyword.value = data.mitemCategory;
  mitemTypeSelect.value = data.mitemType;
  pageUI.value.page = 1;
  onRefresh();
};
const opts = computed(() => {
  return {
    keyword: {
      label: t('business.main.mitemCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('business.main.mitemCode')}/${t('business.main.mitemName')}`]),
    },
    mitemCategory: {
      label: t('business.main.mitemCategoryCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [
        `${t('business.main.mitemCategoryCode')}/${t('business.main.mitemCategoryName')}`,
      ]),
    },
    mitemType: {
      // label: t('business.main.mitemTypeCode'),
      comp: 't-checkbox-group',
      defaultVal: [],
      bind: {
        options: mitemTypeOptions.value,
        lazyLoad: true,
      },
    },
  };
});

const dataTotal = ref(0);

const fetchTable = async () => {
  setLoading(true);
  try {
    selectedMitemRowKeys.value = [];
    tableDataMitem.value = [];
    const data = (await api.mitem.getList({
      keyword: keyword.value,
      mitemCategoryKeyword: mitemCategoryKeyword.value,
      isRaw: mitemTypeSelect.value.find((n) => n === t('business.main.raw')) != null ? 1 : 0,
      isInProcess: mitemTypeSelect.value.find((n) => n === t('business.main.inProduct')) != null ? 1 : 0,
      isProduct: mitemTypeSelect.value.find((n) => n === t('business.main.product')) != null ? 1 : 0,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: sortList.value.sorters,
      filters: filterList.value.filters,
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
  formRef.value.getUom();
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formVisible.value = true;
};

const onConfirmForm = async () => {
  await formRef.value.submit().then(() => {
    formVisible.value = false;
  });
  await fetchTable();
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
