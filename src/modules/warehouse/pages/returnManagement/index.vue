<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        row-key="billNo"
        :table-column="tableReturnManagementColumns"
        :table-data="tableReturnManagementData"
        :loading="loading"
        :total="dataTotal"
        :hover="false"
        :stripe="false"
        :header-affixed-top="true"
        title="退货管理"
        @refresh="fetchTable"
      >
        <template #button>
          <t-button theme="primary" @click="onClickAddReturnManagement">
            {{ t('common.button.add') }}
          </t-button>
          <t-button theme="default" @click="onClickEditReturnManagement">
            {{ t('common.button.edit') }}
          </t-button>
          <t-button theme="default" @click="onBatchCancelledClick">
            {{ t('returnManagement.cancel') }}
          </t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!--退货管理弹框-->
  <formreturnManagement ref="formRef" @parent-refresh-event="fetchTable"></formreturnManagement>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiWarehouse, TransferHeadVO } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formreturnManagement from './formReturnManagement.vue';
import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

// 查询组件值
const optsValue = ref({});

// 查询组件
const opts = computed(() => {
  return {
    returnBillNo: {
      label: t('returnManagement.billNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('returnManagement.billNo')}`]),
    },
    poBillNo: {
      label: t('returnManagement.poBillNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('returnManagement.poBillNo')}`]),
    },
    supplierCode: {
      label: t('returnManagement.supplierCode'),
      placeholder: t('common.placeholder.input', [`${t('returnManagement.supplierCode')}`]),
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        valueField: 'supplierCode',
        isMultiple: false,
      },
    },
    asnBillNo: {
      label: t('returnManagement.asnBillNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('returnManagement.asnBillNo')}`]),
    },
    returnType: {
      label: t('returnManagement.returnType'),
      comp: 't-select',
      defaultVal: [],
      bind: {
        class: 'check-box-conditon',
        options: returnTypeOption.value,
        lazyLoad: true,
      },
    },
    billStatus: {
      label: t('returnManagement.statusName'),
      comp: 't-select',
      defaultVal: [],
      bind: {
        class: 'check-box-conditon',
        options: billStatusOption.value,
        lazyLoad: true,
      },
    },
  };
});
// 状态下拉初始数据
const returnTypeOption = ref([
  { label: '全选', value: '', checkAll: true },
  { value: 'INSPECTION_RETURN', label: '采购验退' },
  { value: 'WAREHOUSE_RETURN', label: '采购仓退' },
]);

// 状态下拉初始数据
const billStatusOption = ref([{ label: '全选', value: '' }]);

const tableReturnManagementData = ref<TransferHeadVO[]>([]);
const tableReturnManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('returnManagement.colBillNo')}`, width: 140, colKey: 'billNo' },
  { title: `${t('returnManagement.colBillNoDesc')}`, width: 140, colKey: 'reason' },
  { title: `${t('returnManagement.colPoAndAsn')}`, width: 140, colKey: 'erpBillNo' },
  { title: `${t('returnManagement.colSupplierCode')}`, width: 140, colKey: 'supplierCode' },
  { title: `${t('returnManagement.colSupplierName')}`, width: 140, colKey: 'supplierName' },
  { title: `${t('returnManagement.colCreatorUserName')}`, width: 140, colKey: 'displayName' },
  { title: `${t('returnManagement.colTimeCreate')}`, width: 140, colKey: 'timeCreate' },
  { title: `${t('returnManagement.colStatusName')}`, width: 140, colKey: 'statusName' },
];

const formRef = ref(null); // 规则主表
const dataTotal = ref(0);
const tableRef = ref();

const selectRowKeys = computed(() => {
  return tableRef.value?.getSelectedRowKeys();
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  optsValue.value = data;
  fetchTable();
};

// 加载表格
const fetchTable = async () => {
  setLoading(true);
  try {
    const data = await apiWarehouse.returnManagement.getReturnManagementList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    });
    tableReturnManagementData.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 批量作废
const onBatchCancelledClick = async () => {
  const billNoList = [];
  selectRowKeys.value.forEach((element) => {
    billNoList.push(element);
  });

  const selectRowModels = tableReturnManagementData.value.filter((n) => selectRowKeys.value.indexOf(n.billNo) > -1);
  if (!_.isNil(selectRowModels)) {
    const tempList = selectRowModels.filter((n) => n.status !== 'DRAFT' && n.status !== 'CREATE');
    if (tempList.length > 0) {
      MessagePlugin.error(t('returnManagement.只有起草或者已创建的单据才能作废'));
      return;
    }
  }

  const confirmDia = DialogPlugin({
    header: t('returnManagement.cancel'),
    body: t('returnManagement.confirmDelete'),
    theme: 'warning',
    confirmBtn: t('common.button.confirm'),
    cancelBtn: t('common.button.cancel'),
    onConfirm: async () => {
      try {
        await apiWarehouse.returnManagement.updateBillStatusByCanceled(billNoList);
        fetchTable();
        confirmDia.hide();
        MessagePlugin.success(t('returnManagement.deleteSuccess'));
      } catch (error) {
        confirmDia.hide();
      }
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};

// 弹出新增领料制单界面
const onClickAddReturnManagement = () => {
  const { showForm } = formRef.value;
  showForm(false);
};

const onClickEditReturnManagement = () => {
  if (selectRowKeys.value.length > 1) {
    MessagePlugin.error(t('returnManagement.请选择单条数据编辑'));
    return;
  }
  if (_.isEmpty(selectRowKeys.value)) {
    MessagePlugin.error(t('returnManagement.请选择数据编辑'));
    return;
  }

  const selectRowModel = tableReturnManagementData.value.findLast((n) => n.billNo === selectRowKeys.value[0]);
  if (!_.isNil(selectRowModel)) {
    if (selectRowModel.status !== 'DRAFT' && selectRowModel.status !== 'CREATE') {
      MessagePlugin.error(t('returnManagement.只有起草或者已创建的单据才能编辑'));
      return;
    }
  }
  const { showForm } = formRef.value;
  showForm(true, selectRowKeys.value[0]);
};

const getBillStatus = () => {
  apiMain.param.getListByGroupCode({ parmGroupCode: 'W_BILL_STATUS' }).then((data) => {
    data.forEach((item) => {
      billStatusOption.value.push({ label: item.label, value: item.value });
    });
  });
};

onMounted(() => {
  getBillStatus();
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
    justify-content: flex-start;
    margin-bottom: 8px;
  }
}

:deep(t-table__affixed-header-elm) {
  width: 0 !important;
}

.add-form {
  :deep(.t-dialog__body) {
    padding: 0 !important;
  }

  :deep(.t-dialog) {
    background: var(--td-bg-color-page) !important;
  }
}
</style>
