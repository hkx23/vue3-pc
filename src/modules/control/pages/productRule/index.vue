<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <tm-query :opts="opts" label-width="100" is-expansion @submit="conditionEnter" />
        <!-- <t-row style="margin-top: 10px">
          <t-button theme="default" @click="onImport">导入</t-button>
        </t-row> -->
        <t-row justify="space-between">
          <!-- 包装规则表格-->
          <tm-table
            ref="tableRef"
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="tableProductPackRuleColumns"
            :table-data="tableDataProductPackRule"
            :loading="loading"
            :total="dataTotal"
            select-on-row-click
            :header-affixed-top="true"
            @refresh="fetchTable"
            @cell-click="onEditPackRowClick"
          >
            <template #op="{ row }">
              <t-space>
                <t-icon name="edit" @click="onClickEditPackRule(row)" />
                <t-icon name="delete" :disabled="loading" @click="onDeletePackRowClick(row)" />
              </t-space>
            </template>
            <template #oprate>
              <t-button shape="square" variant="outline" @click="onClickAddPackRule">
                <t-icon name="add" />
              </t-button>
            </template>
          </tm-table>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-col :span="5">
            <div class="pack-dtl-table">
              <t-space size="small" :align="'center'" class="pack-dtl-button">
                <t-button
                  :disabled="!isShowPackRuleDtlAddBtn"
                  shape="square"
                  variant="outline"
                  @click="onClickAddPackRuleDtl"
                >
                  <template #icon>
                    <t-icon name="add" />
                  </template>
                </t-button>
              </t-space>
              <!-- 规则明细表格-->
              <t-enhanced-table
                ref="tableDtlRef"
                row-key="id"
                :columns="tablePackDtlColumns"
                :data="tableDataProductPackDtl"
                :tree="treeConfig"
                active-row-type="single"
                :loading="loadingPackDtl"
                :header-affixed-top="true"
                :bordered="true"
                :resizable="true"
                @cell-click="onRowPackRuleDtlClick"
              >
                <template #op="{ row }">
                  <t-space>
                    <t-icon name="edit" @click="onClickEditPackRuleDtl(row)" />
                    <t-icon name="delete" :disabled="loadingPackDtl" @click="onDeletePackDtlRowClick(row)" />
                  </t-space> </template
              ></t-enhanced-table>
            </div>
          </t-col>
          <t-col :span="6" :offset="1">
            <!-- 物料表格-->
            <tm-table
              ref="tableMitemRef"
              v-model:pagination="pageMitem"
              row-key="id"
              :table-column="tableMitemColumns"
              :table-data="tableDataMitem"
              :loading="loadingMitem"
              :show-pagination="false"
              :header-affixed-top="true"
              @refresh="fetchMitemTable"
            >
              <template #op="{ row }">
                <t-space>
                  <t-icon name="delete" :disabled="loadingMitem" @click="onDeleteMitemRowClick(row)" />
                </t-space>
              </template>
              <template #oprate>
                <t-button
                  v-if="selectPackRuleRow.id"
                  shape="square"
                  variant="outline"
                  :disabled="loadingMitem"
                  @click="onClickAddPackRuleMitem"
                >
                  <t-icon name="add" />
                </t-button>
                <t-button
                  :disabled="selectMitemRowKeys?.length == 0"
                  theme="default"
                  variant="outline"
                  @click="onBatchDeleteMitemRowClick"
                >
                  <t-icon name="delete" />{{ t('common.button.batchDelete') }}
                </t-button>
              </template>
            </tm-table></t-col
          >
        </t-row>
      </div>
    </div>
  </div>

  <!--包装规则主表弹框-->
  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formHeader"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <form-pack-rule ref="formRef" :is-add="isAdd" :row="selectPackRuleRow"></form-pack-rule>
      </t-space>
    </t-dialog>
  </div>

  <!--包装规则主表弹框-->
  <div>
    <t-dialog
      v-model:visible="formDtlVisible"
      :header="formHeader"
      :on-confirm="onConfirmFormRuleDtl"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <form-pack-rule-dtl ref="formDtlRef" :is-add="isAdd" :row="selectPackRuleRowDtl"></form-pack-rule-dtl>
      </t-space>
    </t-dialog>
  </div>

  <!--物料弹框-->
  <div>
    <t-dialog
      v-model:visible="formMitemVisible"
      :header="formHeader"
      :on-confirm="onConfirmFormMitem"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <form-pack-rule-mitem ref="formMitemRef" :is-add="isAdd"></form-pack-rule-mitem>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';

import { api as apiControl, ProductPackRuleMapDTO } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formPackRule from './formPackRule.vue';
import formPackRuleDtl from './formPackRuleDtl.vue';
import formPackRuleMitem from './formPackRuleMitem.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const { pageUI: pageMitem } = usePage();
const { loading: loadingMitem, setLoading: setLoadingMitem } = useLoading();
const { loading: loadingPackDtl, setLoading: setLoadingPackDtl } = useLoading();
const isAdd = ref(true);
// 查询组件值
const optsValue = ref({}) as any;
// 查询组件
const opts = computed(() => {
  return {
    packRule: {
      label: t('productRule.packRule'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('productRule.packRule')}}`]),
    },
    mitemCategory: {
      label: t('business.main.mitemCategoryCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [
        `${t('business.main.mitemCategoryCode')}/${t('business.main.mitemCategoryName')}`,
      ]),
    },
    mitem: {
      label: t('business.main.mitemCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('business.main.mitemCode')}/${t('business.main.mitemName')}`]),
    },
  };
});

const selectMitemRowKeys = computed(() => {
  return tableMitemRef.value?.getSelectedRowKeys();
});

const isShowPackRuleDtlAddBtn = computed(() => {
  let isShow = false;
  // 必须是先选中主表的行
  if (selectPackRuleRow.value && selectPackRuleRow.value.id) {
    // 如果明细表有数据，必须选中明细行数据，才允许新增
    if (tableDataProductPackDtl.value.length > 0) {
      if (selectPackRuleRowDtl.value.id) {
        isShow = true;
      }
    } else {
      isShow = true;
    }
  }
  return isShow;
});

const tableProductPackRuleColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'single', width: 40, fixed: 'left' },
  { title: `${t('productRule.packRuleCode')}`, width: 120, colKey: 'packRuleCode' },
  { title: `${t('productRule.packRuleName')}`, width: 130, colKey: 'packRuleName' },
  { title: `${t('business.main.creator')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('business.main.timeCreate')}`, width: 140, colKey: 'timeCreate' },
  { title: `${t('business.main.modifier')}`, width: 110, colKey: 'modifierName' },
  { title: `${t('business.main.timeModified')}`, width: 140, colKey: 'timeModified' },
  { title: `${t('common.button.operation')}`, align: 'left', width: 80, colKey: 'op' },
];

const tablePackDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('productRule.packType')}`, width: 150, colKey: 'packTypeName' },
  { title: `${t('productRule.packQty')}`, width: 50, colKey: 'packQty' },
  { title: `${t('productRule.uom')}`, width: 50, colKey: 'uomName' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];

// const tableProductPackRulePagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });
const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('business.main.mitemCode')}`, colKey: 'mitemCode' },
  { title: `${t('business.main.mitemName')}`, width: 100, colKey: 'mitemName' },
  { title: `${t('business.main.mitemCategoryCode')}`, width: 100, colKey: 'mitemCategoryCode' },
  { title: `${t('business.main.mitemCategoryName')}`, width: 120, colKey: 'mitemCategoryName' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];

const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
});
const tableDataProductPackRule = ref([]);
const tableDataProductPackDtl = ref([]);
const tableDataMitem = ref([]);

const formVisible = ref(false); // 显示和隐藏包装规则弹出框
const formDtlVisible = ref(false); // 显示和隐藏包装规则明细弹出框
const formMitemVisible = ref(false); // 显示和隐藏关联物料弹出框
const formRef = ref(null); // 规则主表
const formDtlRef = ref(null); // 规则明细
const formMitemRef = ref(null); // 关联物料
const dataTotal = ref(0);
const tableRef = ref();
const tableDtlRef = ref();
const tableMitemRef = ref();
const selectPackRuleRow = ref({}) as any; // 选中包装规则行
const selectPackRuleRowDtl = ref({}) as any; // 选中包装规则明细行
const formHeader = ref('');
// 导入按钮
// const onImport = () => {
//   console.log('导入功能待完成');
// };

// 点击包装规则行
const onEditPackRowClick = (rowObject: any) => {
  console.log(`包装规则表格点击:${{ rowObject }}`);
  selectPackRuleRow.value = rowObject.row;
  selectPackRuleRowDtl.value = {};
  fetchPackDtlTable();
  fetchMitemTable();
};
// 点击包装规则明细行
const onRowPackRuleDtlClick = ({ row }: { row: any }) => {
  selectPackRuleRowDtl.value = row;
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  optsValue.value = data;
  fetchTable();
};

// 加载包装规则表格
const fetchTable = async () => {
  setLoading(true);
  try {
    const data = (await apiControl.productPackRule.list({
      packRuleCode: optsValue.value.packRule,
      mitemCode: optsValue.value.mitemCode,
      mitemCategory: optsValue.value.mitemCategory,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    tableDataProductPackRule.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
    fetchPackDtlTable();
  }
};
// 加载包装规则明细表格
const fetchPackDtlTable = async () => {
  console.log(`加载包装规则明细表格:${selectPackRuleRow.value.id}`);
  if (!selectPackRuleRow.value.id) {
    clearPackDtlTable();
    return;
  }
  try {
    setLoadingPackDtl(true);
    const data = (await apiControl.productPackRuleDtl.tree({
      productPackRuleId: selectPackRuleRow.value.id,
    })) as any;
    tableDataProductPackDtl.value = data;
    nextTick(() => {
      tableDtlRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingPackDtl(false);
  }
};

// 加载关联物料表格
const fetchMitemTable = async () => {
  if (!selectPackRuleRow.value.id) {
    clearMitemTable();
    return;
  }
  try {
    setLoadingMitem(true);
    const data = (await apiControl.productPackRuleMap.list({
      packRuleId: selectPackRuleRow.value.id,
    })) as any;
    tableDataMitem.value = data.list;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingMitem(false);
  }
};
// 清除包装规则明细表格
const clearPackDtlTable = async () => {
  tableDataProductPackDtl.value = [];
};
// 清除关联物料表格
const clearMitemTable = async () => {
  tableDataMitem.value = [];
};

// 删除包装规则
const onDeletePackRowClick = async (row: any) => {
  console.log(row);
  const confirmDia = DialogPlugin({
    header: t('common.button.delete'),
    body: t('common.message.confirmDelete'),
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      await apiControl.productPackRule.delete({ id: row.id });
      fetchTable();
      confirmDia.hide();
      MessagePlugin.success(t('common.message.deleteSuccess'));
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};

// 删除包装规则明细
const onDeletePackDtlRowClick = async (row: any) => {
  const confirmDia = DialogPlugin({
    header: t('common.button.delete'),
    body: t('common.message.confirmDelete'),
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      await apiControl.productPackRuleDtl.delete({ id: row.id });
      fetchPackDtlTable();
      confirmDia.hide();
      MessagePlugin.success(t('common.message.deleteSuccess'));
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
// 删除单个关联物料
const onDeleteMitemRowClick = async (row: any) => {
  const confirmDia = DialogPlugin({
    header: t('common.button.delete'),
    body: t('common.message.confirmDelete'),
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      console.log(row);
      await apiControl.productPackRuleMap.delete({ id: row.id });
      fetchMitemTable();
      confirmDia.hide();
      MessagePlugin.success(t('common.message.deleteSuccess'));
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
// 批量删除关联物料
const onBatchDeleteMitemRowClick = async (row: any) => {
  const ids = [];
  selectMitemRowKeys.value.forEach((element) => {
    ids.push(element);
  });
  const confirmDia = DialogPlugin({
    header: t('common.button.delete'),
    body: t('common.message.confirmDelete'),
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      console.log(row);
      const deleteModel: ProductPackRuleMapDTO = {
        ids,
      };
      await apiControl.productPackRuleMap.batchDelete(deleteModel);
      fetchMitemTable();
      confirmDia.hide();
      MessagePlugin.success(t('common.message.deleteSuccess'));
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
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
const onClickEditPackRule = (row: any) => {
  const { reset } = formRef.value;
  const { setRow } = formRef.value;
  reset();
  formVisible.value = true;
  formHeader.value = t('common.button.edit');
  isAdd.value = false;
  selectPackRuleRow.value = row;
  setRow(row); // 调用子组件赋值
};

// 包装规则界面提交
const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      selectPackRuleRow.value = {};
      fetchTable();
    }
  });
};

// 弹出新增包装规则明细界面
const onClickAddPackRuleDtl = () => {
  const { reset } = formDtlRef.value;
  const { setRow } = formDtlRef.value;
  reset();
  formDtlVisible.value = true;
  formHeader.value = t('common.button.add');
  isAdd.value = true;
  const isFirst = !(tableDataProductPackDtl.value.length > 0);

  setRow(selectPackRuleRowDtl.value, selectPackRuleRow.value, isFirst, isAdd.value); // 调用子组件赋值
};

// 弹出编辑包装规则明细界面
const onClickEditPackRuleDtl = (row: any) => {
  const { reset } = formDtlRef.value;
  const { setRow } = formDtlRef.value;
  reset();
  formDtlVisible.value = true;
  formHeader.value = t('common.button.edit');
  isAdd.value = false;
  selectPackRuleRowDtl.value = row;
  let isFirst = !(tableDataProductPackDtl.value.length > 0);
  if (row.parentPackId.toString() === '0') {
    // 顶层节点的ID为0
    isFirst = true;
  }
  setRow(row, selectPackRuleRow.value, isFirst, isAdd.value); // 调用子组件赋值
};

// 包装明细规则界面提交
const onConfirmFormRuleDtl = async () => {
  formDtlRef.value.submit().then((data) => {
    if (data) {
      formDtlVisible.value = false;
      selectPackRuleRowDtl.value = {};
      fetchPackDtlTable();
    }
  });
};

// 弹出新增关联物料界面
const onClickAddPackRuleMitem = () => {
  const { reset } = formMitemRef.value;
  const { setRow } = formMitemRef.value;
  reset();
  formMitemVisible.value = true;
  formHeader.value = t('common.button.add');
  isAdd.value = true;
  setRow(selectPackRuleRow.value); // 调用子组件赋值
};

// 包装关联物料界面提交
const onConfirmFormMitem = async () => {
  formMitemRef.value.submit().then((data) => {
    if (data) {
      formMitemVisible.value = false;
      fetchMitemTable();
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

  // .table-container {
  //   margin-top: var(--td-comp-margin-xxl);
  // }
}

.form-container-row {
  margin-top: 20px;
}

.pack-dtl-table {
  padding-top: 8px;

  .pack-dtl-button {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 6px;
  }
}

/deep/ t-table__affixed-header-elm {
  width: 0 !important;
}
</style>
