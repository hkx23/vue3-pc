<template>
  <cmp-container :full="true" :full-sub-index="[1]">
    <cmp-card :span="16">
      <cmp-container :full="true" :ghost="true">
        <cmp-query ref="optsValue" :opts="opts" is-expansion @submit="conditionEnter" />
        <!-- ################# 处理组表格数据 ###################### -->
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="tableGroupColumns"
          :table-data="tableDataMain"
          :loading="loading"
          :total="dataTotal"
          :fixed-height="true"
          style="height: 280px"
          :hover="false"
          :stripe="false"
          active-row-type="single"
          @row-click="onRowClick"
          @refresh="fetchTable"
        >
          <template #title> {{ t('inspectGroup.tableSubTitle') }} </template>
          <template #op="{ row }">
            <div @click.stop>
              <t-space :size="8">
                <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDeleteGroupRowClick(row)">
                  <t-link theme="primary" :disabled="loading">{{ t('common.button.delete') }}</t-link>
                </t-popconfirm>
                <t-link theme="primary" @click="onClickEditGroup(row)">{{ t('common.button.edit') }}</t-link>
              </t-space>
            </div>
          </template>
          <template #button>
            <t-button @click="onClickAddPackRule">
              {{ t('common.button.add') }}
            </t-button>
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>

    <cmp-row>
      <!-- ################# 子数据数据 ###################### -->
      <cmp-card :span="6">
        <!-- 规则明细表格-->
        <cmp-table
          v-model:pagination="pageUIUser"
          row-key="id"
          :columns="tableUserColumns"
          :data="tableDataUserDtl"
          :loading="loadingPackDtl"
          :total="dataUserTotal"
          :selected-row-keys="userRowKeys"
          @select-change="onSelectedChange"
          @refresh="fetchUserTable"
        >
          <template #title> {{ t('inspectGroup.tableSubLeftTitle') }} </template>
          <template #button>
            <t-button v-if="selectRow.id" @click="onClickAddUser">
              {{ t('common.button.add') }}
            </t-button>
            <bcmp-import-auto-button
              v-if="selectRow.id"
              theme="default"
              :button-text="t('common.button.import')"
              :disabled="loadingPackDtl"
              type="q_inspect_group_in_user"
              @close="fetchUserTable"
            ></bcmp-import-auto-button>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDeleteUserBatchClick">
              <t-button theme="default" :disabled="userRowKeys?.length < 2">
                {{ t('common.button.batchDelete') }}</t-button
              >
            </t-popconfirm>
          </template>
          <template #op="{ row }">
            <t-space :size="8">
              <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDeleteUserRowClick(row)">
                <t-link theme="primary" :disabled="loading">{{ t('common.button.delete') }}</t-link>
              </t-popconfirm>
            </t-space>
          </template></cmp-table
        >
      </cmp-card>
      <cmp-card :span="6">
        <!-- 物料表格-->
        <cmp-table
          ref="tableMitemRef"
          v-model:pagination="pageMitem"
          row-key="id"
          :table-column="tableMitemColumns"
          :table-data="tableDataMitem"
          :loading="loadingMitem"
          :total="dataMitemTotal"
          @refresh="fetchMitemTable"
        >
          <template #title> {{ t('inspectGroup.tableSubRightTitle') }} </template>
          <template #op="{ row }">
            <t-space>
              <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDeleteMitemRowClick(row)">
                <t-link theme="primary" :disabled="loadingMitem">{{ t('common.button.delete') }}</t-link>
              </t-popconfirm>
            </t-space>
          </template>
          <template #button>
            <t-button v-if="selectRow.id" @click="onClickAddMitem">
              {{ t('common.button.add') }}
            </t-button>
            <bcmp-import-auto-button
              v-if="selectRow.id"
              :disabled="loadingMitem"
              theme="default"
              :button-text="t('common.button.import')"
              type="q_inspect_group_in_mitem"
              @close="fetchMitemTable"
            ></bcmp-import-auto-button>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onBatchDeleteMitemRowClick">
              <t-button theme="default" :disabled="selectMitemRowKeys?.length < 2">
                {{ t('common.button.batchDelete') }}</t-button
              >
            </t-popconfirm>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!--主表弹框-->
  <t-dialog
    v-model:visible="formVisible"
    :header="formHeader"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <form-group ref="formRef" :is-add="isAdd" :row="selectRow"></form-group>
  </t-dialog>

  <!--包装规则主表弹框-->
  <t-dialog
    v-model:visible="formDtlVisible"
    :header="formHeader"
    :cancel-btn="null"
    :close-on-overlay-click="false"
    top="56px"
    width="800px"
    @close="onRefreshAll"
    @confirm="onConfirmSub"
  >
    <form-user-dtl ref="formDtlRef" :is-add="isAdd" :row="selectRowDtl"></form-user-dtl>
  </t-dialog>

  <!--物料弹框-->
  <t-dialog
    v-model:visible="formMitemVisible"
    :header="formHeader"
    :cancel-btn="null"
    :close-on-overlay-click="false"
    top="56px"
    width="800px"
    @confirm="onConfirmSub"
    @close="onRefreshAll"
  >
    <form-mitem-dtl ref="formMitemRef" :is-add="isAdd"></form-mitem-dtl>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiQuality } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formGroup from './formGroup.vue';
import formMitemDtl from './formMitemDtl.vue';
import formUserDtl from './formUserDtl.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { pageUI: pageUIUser } = usePage();
const { loading, setLoading } = useLoading();
const { pageUI: pageMitem } = usePage();
const { loading: loadingMitem, setLoading: setLoadingMitem } = useLoading();
const { loading: loadingPackDtl, setLoading: setLoadingUser } = useLoading();
const isAdd = ref(true);
const userRowKeys = ref([]);

// 查询组件值
const optsValue = ref({}) as any;
// 查询组件
const opts = computed(() => {
  return {
    keyword: {
      label: t('inspectGroup.inspectGroup'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('inspectGroup.inspectGroup')}`]),
    },
    userId: {
      label: t('inspectGroup.inspectUser'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.select', [`${t('inspectGroup.inspectUser')}`]),
      event: 'business',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
    mitemCategoryId: {
      label: t('business.main.mitemCategoryCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.select', [`${t('business.main.mitemCategoryCode')}`]),
      event: 'business',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemId: {
      label: t('business.main.mitemCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.select', [`${t('business.main.mitemCode')}`]),
      event: 'business',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
const onConfirmSub = () => {
  formDtlVisible.value = false;
  formMitemVisible.value = false;
  onRefreshAll();
};

const onSelectedChange = (value: any) => {
  userRowKeys.value = value;
};
const selectMitemRowKeys = computed(() => {
  return tableMitemRef.value?.getSelectedRowKeys();
});

const tableGroupColumns: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', type: 'single', width: 40, fixed: 'left' },
  { title: `${t('business.main.code')}`, width: 120, colKey: 'inspectGroupCode' },
  { title: `${t('business.main.name')}`, width: 130, colKey: 'inspectGroupName' },
  { title: `${t('business.main.desc')}`, width: 110, colKey: 'inspectGroupDesc' },
  { title: `${t('business.main.creator')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('business.main.timeCreate')}`, width: 140, colKey: 'timeCreate' },
  { title: `${t('business.main.modifier')}`, width: 110, colKey: 'modifierName' },
  { title: `${t('business.main.timeModified')}`, width: 140, colKey: 'timeModified' },
  { title: `${t('common.button.operation')}`, align: 'left', width: 80, colKey: 'op' },
];

const tableUserColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('inspectGroup.userName')}`, width: 150, colKey: 'personCode' },
  { title: `${t('inspectGroup.name')}`, width: 150, colKey: 'personName' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];

// const tableProductPackRulePagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });
const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('inspectGroup.mitemCategoryCode')}`, width: 100, colKey: 'categoryCode' },
  { title: `${t('inspectGroup.mitemCategoryName')}`, width: 100, colKey: 'categoryName' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];

const tableDataMain = ref([]);
const tableDataUserDtl = ref([]);
const tableDataMitem = ref([]);

const formVisible = ref(false); // 显示和隐藏包装规则弹出框
const formDtlVisible = ref(false); // 显示和隐藏包装规则明细弹出框
const formMitemVisible = ref(false); // 显示和隐藏关联物料弹出框
const formRef = ref(null); // 规则主表
const formDtlRef = ref(null); // 规则明细
const formMitemRef = ref(null); // 关联物料
const dataTotal = ref(0);
const dataUserTotal = ref(0);
const dataMitemTotal = ref(0);
const tableMitemRef = ref();
const selectRow = ref({}) as any; // 选中包装规则行
const selectRowDtl = ref({}) as any; // 选中包装规则明细行
const formHeader = ref('');
// 导入按钮
// const onImport = () => {
//   console.log('导入功能待完成');
// };
// 刷新按钮
const onRefreshAll = async () => {
  fetchMitemTable();
  fetchTable();
  fetchUserTable();
};
// 点击行
const onRowClick = ({ row }) => {
  console.log(row);
  selectRow.value = row;
  fetchUserTable();
  fetchMitemTable();
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  console.log(data);
  optsValue.value = data;
  fetchTable();
};

// 加载包装规则表格
const fetchTable = async () => {
  setLoading(true);
  try {
    const data = (await apiQuality.inspectGroup.getList({
      keyword: optsValue.value.keyword,
      mitemId: optsValue.value.mitemId,
      userId: optsValue.value.userId,
      mitemCategoryId: optsValue.value.mitemCategoryId,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    tableDataMain.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 加载包装规则明细表格
const fetchUserTable = async () => {
  if (!selectRow.value.id) {
    clearUserTable();
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiQuality.inspectGroupInUser.getList({
      pageNum: pageUIUser.value.page,
      pageSize: pageUIUser.value.rows,
      inspectGroupId: selectRow.value.id,
    })) as any;
    tableDataUserDtl.value = data.list;
    dataUserTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingUser(false);
  }
};

// 加载关联物料表格
const fetchMitemTable = async () => {
  if (!selectRow.value.id) {
    clearMitemTable();
    return;
  }
  try {
    setLoadingMitem(true);
    const data = (await apiQuality.inspectGroupInMitem.getList({
      inspectGroupId: selectRow.value.id,
      pageNum: pageMitem.value.page,
      pageSize: pageMitem.value.rows,
    })) as any;
    tableDataMitem.value = data.list;
    dataMitemTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMitem(false);
  }
};
// 清除人员明细表格
const clearUserTable = async () => {
  tableDataUserDtl.value = [];
};
// 清除关联物料表格
const clearMitemTable = async () => {
  tableDataMitem.value = [];
};

// 删除检验组
const onDeleteGroupRowClick = async (row: any) => {
  await apiQuality.inspectGroup.delByIds([row.id]);
  MessagePlugin.success('删除成功');
  fetchTable();
  fetchUserTable();
  fetchMitemTable();
};

// 删除组内人员
const onDeleteUserRowClick = async (row: any) => {
  await apiQuality.inspectGroupInUser.delByIds([row.id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchUserTable();
};
// 删除组内人员
const onDeleteUserBatchClick = async () => {
  await apiQuality.inspectGroupInUser.delByIds(userRowKeys.value);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchUserTable();
};
// 删除单个关联物料
const onDeleteMitemRowClick = async (row: any) => {
  await apiQuality.inspectGroupInMitem.delByIds([row.id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchMitemTable();
};
// 批量删除关联物料
const onBatchDeleteMitemRowClick = async () => {
  const ids = [];
  selectMitemRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  await apiQuality.inspectGroupInMitem.delByIds(ids);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchMitemTable();
};

// 弹出新增包装规则界面
const onClickAddPackRule = () => {
  const { reset } = formRef.value;
  reset();
  formVisible.value = true;
  formHeader.value = t('common.button.add');
  isAdd.value = true;
};

// 弹出编辑包装规则界面
const onClickEditGroup = (row: any) => {
  const { setRow } = formRef.value;
  formVisible.value = true;
  formHeader.value = t('common.button.edit');
  isAdd.value = false;
  selectRow.value = row;
  console.log(row);
  setRow(row); // 调用子组件赋值
};

// 包装规则界面提交
const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      selectRow.value = {};
      fetchTable();
    }
  });
};

// 弹出新增组内人员明细界面
const onClickAddUser = () => {
  const { fetchUserList } = formDtlRef.value;
  const { setRow } = formDtlRef.value;
  const { reset } = formDtlRef.value;
  const { fetchUserTable } = formDtlRef.value;
  reset();
  formHeader.value = t('common.button.add');
  formDtlVisible.value = true;
  setRow(selectRow.value);
  fetchUserList();
  fetchUserTable();
};
// 弹出新增物料关系明细界面
const onClickAddMitem = () => {
  const { fetchCategoryList } = formMitemRef.value;
  const { setRow } = formMitemRef.value;
  const { reset } = formMitemRef.value;
  const { fetchMitemTable } = formMitemRef.value;
  reset();
  formHeader.value = t('common.button.add');
  formMitemVisible.value = true;
  setRow(selectRow.value);
  fetchCategoryList();
  fetchMitemTable();
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

  // .table-container {
  //   margin-top: var(--td-comp-margin-xxl);
  // }
}

.form-container-row {
  margin-top: 20px;
}

.pack-dtl-table {
  padding-top: 0;

  .pack-dtl-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
  }
}

/deep/ t-table__affixed-header-elm {
  width: 0 !important;
}
</style>
