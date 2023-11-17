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
              <t-button theme="default" variant="base" @click="onRefresh">查询</t-button>
              <t-button theme="default" variant="base" @click="onReset">重置</t-button>
            </div>
          </t-col>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-button theme="default" variant="base" @click="onImport">导入</t-button>
        </t-row>
        <t-row justify="space-between">
          <t-table
            row-key="id"
            :columns="tableMitemCategoryColumns"
            :data="tableDataMitemCategory"
            :loading="dataLoading"
            :hover="true"
            select-on-row-click
            :pagination="tableMitemCategoryPagination"
            :selected-row-keys="selectedMitemCategoryRowKeys"
            @select-change="onSelectMitemCategoryChange"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onRowClick(slotProps)" />
                <t-icon name="delete" @click="onRowDelete(slotProps)" />
              </t-space>
            </template>
          </t-table>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-table
            row-key="id"
            :columns="tableMitemColumns"
            :data="tableDataMitem"
            :loading="dataLoading"
            :hover="true"
            :pagination="tableMitemPagination"
            :selected-row-keys="selectedMitemRowKeys"
          ></t-table>
        </t-row>
      </div>
    </div>
  </div>
  <div>
    <t-dialog v-model:visible="formVisible" header="编辑物料分类" :on-confirm="onConfirmForm">
      <t-form ref="formRef" :data="formData" :show-cancel="true" :show-error-message="false"> </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { getList, getMitemList } from '../../api/mitemCategory';

const tableMitemCategoryColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'single', width: 64, fixed: 'left' },
  { title: '物料编码', width: 160, colKey: 'categoryCode' },
  { title: '物料名称', width: 160, colKey: 'categoryName' },
  { title: '物料描述', width: 160, colKey: 'categoryDesc' },
  { title: '物料类别', width: 160, colKey: 'onboardRuleCode' },
  { title: '物料类别', width: 160, colKey: '' },
  { title: '物料类别名称', width: 160, colKey: '' },
  { title: '主计量单位', width: 160, colKey: '' },
  { title: '是否成品', width: 160, colKey: '' },
  { title: '是否半成品', width: 160, colKey: '' },
  { title: '是否原材料', width: 160, colKey: '' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

const tableMitemCategoryPagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });

const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'id', width: 64, fixed: 'left' },
  { title: '物料编码', colKey: 'mitemCode' },
  { title: '物料名称', colKey: 'mitemName' },
  { title: '物料描述', colKey: 'mitemDesc' },
];
const tableMitemPagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });

const selectedMitemCategoryRowKeys = ref([]);
const selectedMitemRowKeys = ref([]);
const tableDataMitemCategory = ref([]);
const tableDataMitem = ref([]);
const dataLoading = ref(false);
const formVisible = ref(false);

const keyword = ref('');
const formData = ref('');
// const formData: OrgLevelForm = reactive({
//   parentLevelId: null,
//   parentLevelName: '',
//   levelCode: '',
//   levelName: '',
//   divisionFlag: 0,
//   levelSeq: 0,
// });

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
  console.log('11111');
};

const fetchTable = async () => {
  dataLoading.value = true;
  try {
    selectedMitemCategoryRowKeys.value = [];
    tableDataMitem.value = [];
    const data = await getList({
      keyword: keyword.value,
      pagenum: tableMitemCategoryPagination.value.defaultCurrent,
      pagesize: tableMitemCategoryPagination.value.defaultPageSize,
    });
    tableDataMitemCategory.value = data.list;
    tableMitemCategoryPagination.value = { ...tableMitemCategoryPagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const fetchMitemTable = async (categoryid: any) => {
  dataLoading.value = true;
  try {
    const data = await getMitemList({
      keyword: '',
      mitemcategoryid: categoryid,
      pagenum: tableMitemPagination.value.defaultCurrent,
      pagesize: tableMitemPagination.value.defaultPageSize,
    });
    tableDataMitem.value = data.list;
    tableMitemPagination.value = { ...tableMitemPagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

// 选中行
const onSelectMitemCategoryChange = (value: any, options: any) => {
  selectedMitemCategoryRowKeys.value = value;
  fetchMitemTable(options.currentRowData.id);
};

const onConfirmForm = async () => {
  console.log('123123');
  // const { submit } = formRef.value;
  // submit().then(() => {
  //   formVisible.value = false;
  //   fetchData();
  // });
};

const onRowClick = (value: any) => {
  console.log(value);
};

const onRowDelete = (value: any) => {
  console.log(value);
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
