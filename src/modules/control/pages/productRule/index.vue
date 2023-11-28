<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <tm-query :opts="opts" label-width="100" is-expansion @submit="conditionEnter" />
        <!-- <t-row style="margin-top: 10px">
          <t-button theme="default" @click="onImport">导入</t-button>
        </t-row> -->
        <t-row justify="space-between">
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
            @select-change="onEditPackRowClick"
          >
            <template #op="{ row }">
              <t-space>
                <t-icon name="edit" />
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
                <t-button shape="square" variant="outline">
                  <template #icon>
                    <t-icon name="add" />
                  </template>
                </t-button>
              </t-space>
              <t-enhanced-table
                ref="tableRef"
                row-key="id"
                :columns="tablePackDtlColumns"
                :data="tableDataProductPackDtl"
                :tree="treeConfig"
                active-row-type="single"
                :loading="loadingPackDtl"
                :header-affixed-top="true"
                :bordered="true"
                :resizable="true"
              >
                <template #op="{ row }">
                  <t-space>
                    <t-icon name="edit" @click="onRowPackRuleDtlClick(row)" />
                    <t-icon name="delete" :disabled="loadingPackDtl" @click="onDeletePackDtlRowClick(row)" />
                  </t-space> </template
              ></t-enhanced-table>
            </div>
          </t-col>
          <t-col :span="6" :offset="1">
            <tm-table
              v-model:pagination="pageMitem"
              row-key="id"
              :total="mitemTotal"
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
                <t-button shape="square" variant="outline" :disabled="loadingMitem">
                  <t-icon name="add" />
                </t-button>
              </template> </tm-table
          ></t-col>
        </t-row>
      </div>
    </div>
  </div>

  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formHeader"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <t-space direction="vertical" style="width: 98%">
        <form-pack-rule ref="formRef"></form-pack-rule>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';

import { api as apiControl } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formPackRule from './formPackRule.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const { pageUI: pageMitem } = usePage();
const { loading: loadingMitem, setLoading: setLoadingMitem } = useLoading();
const { loading: loadingPackDtl, setLoading: setLoadingPackDtl } = useLoading();
// 查询组件值
const optsValue = ref({}) as any;
// 查询组件
const opts = computed(() => {
  return {
    packRule: {
      label: t('packRule'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('packRule')}}`]),
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
const tableProductPackRuleColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'single', width: 40, fixed: 'left' },
  { title: `${t('packRuleCode')}`, width: 120, colKey: 'packRuleCode' },
  { title: `${t('packRuleName')}`, width: 130, colKey: 'packRuleName' },
  { title: `${t('business.main.creator')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('business.main.timeCreate')}`, width: 140, colKey: 'timeCreate' },
  { title: `${t('business.main.modifier')}`, width: 110, colKey: 'modifierName' },
  { title: `${t('business.main.timeModified')}`, width: 140, colKey: 'timeModified' },
  { title: `${t('common.button.operation')}`, align: 'left', width: 80, colKey: 'op' },
];

const tablePackDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('packType')}`, width: 150, colKey: 'packTypeName' },
  { title: `${t('packQty')}`, width: 50, colKey: 'packQty' },
  { title: `${t('uom')}`, width: 50, colKey: 'uom' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];

// const tableProductPackRulePagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });
const tableMitemColumns: PrimaryTableCol<TableRowData>[] = [
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
const formVisible = ref(false);
const formRef = ref(null);
const dataTotal = ref(0);
const mitemTotal = ref(0);
const tableRef = ref();
const selectPackRuleRow = ref({}) as any; // 选中包装规则行
const selectPackRuleDtlRow = ref({}) as any; // 选中包装规则明细行
const formHeader = ref('');
// 导入按钮
// const onImport = () => {
//   console.log('导入功能待完成');
// };

// 点击包装规则行
const onEditPackRowClick = (id: string) => {
  console.log(`包装规则表格点击:${{ id }}`);
  selectPackRuleRow.value = id;
  fetchPackDtlTable();
  fetchMitemTable();
};
// 点击包装规则明细行
const onRowPackRuleDtlClick = ({ row }: { row: any }) => {
  selectPackRuleDtlRow.value = row;
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
  console.log(`加载包装规则明细表格:${selectPackRuleRow.value}`);
  if (!selectPackRuleRow.value) {
    clearPackDtlTable();
    return;
  }
  try {
    setLoadingPackDtl(true);
    const data = (await apiControl.productPackRuleDtl.tree({
      productPackRuleId: selectPackRuleRow.value,
    })) as any;
    tableDataProductPackDtl.value = data;
    nextTick(() => {
      tableRef.value?.expandAll();
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingPackDtl(false);
  }
};

// 加载关联物料表格
const fetchMitemTable = async () => {
  if (!selectPackRuleRow.value) {
    clearMitemTable();
    return;
  }
  try {
    setLoadingMitem(true);
    const data = (await apiControl.productPackRuleMap.list({
      packRuleId: selectPackRuleRow.value,
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
// 删除关联物料
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

// 弹出新增包装规则界面
const onClickAddPackRule = () => {
  formVisible.value = true;
};

// 包装规则界面提交
const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
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
