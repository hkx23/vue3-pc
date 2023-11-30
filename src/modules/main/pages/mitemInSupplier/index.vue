<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col>
            <t-input v-model="mitemKeyword" label="物料：" placeholder="请输入物料编码/名称" clearable />
          </t-col>
          <t-col>
            <t-input v-model="supplierKeyword" label="供应商：" placeholder="请输入供应商编码/名称" clearable />
          </t-col>
          <t-col flex="45%" />
          <t-col flex="170px">
            <div>
              <t-button @click="onRefresh">查询</t-button>
              <t-button theme="default" @click="onReset">重置</t-button>
            </div>
          </t-col>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-button theme="default" @click="onAdd">新增</t-button>
          <t-button theme="default">导入</t-button>
          <t-button theme="default">导出</t-button>
        </t-row>
        <t-row justify="space-between">
          <tm-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="tableMitemInSupplierColumns"
            :table-data="tableDataMitemInSupplier"
            :total="dataTotal"
            :loading="loading"
            :hover="true"
            :selected-row-keys="selectedMitemInSupplierRowKeys"
            @refresh="fetchTable"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
                <t-icon name="delete" @click="onDeleteRowClick(slotProps)" />
              </t-space>
            </template>
          </tm-table>
        </t-row>
      </div>
    </div>
  </div>
  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formTitle"
      :on-confirm="onConfirmForm"
      width="60%"
      :close-on-overlay-click="false"
      :on-close="onCloseForm"
    >
      <t-space direction="vertical" style="width: 98%">
        <mitem-in-supplier-form ref="formRef"></mitem-in-supplier-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { DialogPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
// 表格相关
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

// import TmSelectBusiness from '@/components/tm-select-business/index.vue';
import MitemInSupplierForm from './form.vue';

// 分页相关
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const dataTotal = ref(0);

const mitemKeyword = ref('');
const supplierKeyword = ref('');
const selectedMitemInSupplierRowKeys = ref([]);
const tableDataMitemInSupplier = ref([]);
const sortlist = ref([]);
const filterlist = ref([]);
const formVisible = ref(false);
const formTitle = ref('');
const formRef = ref(null);

const tableMitemInSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 64 },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料名称', width: 160, colKey: 'mitemName' },
  { title: '供应商编码', width: 160, colKey: 'supplierCode' },
  { title: '供应商名称', width: 160, colKey: 'supplierName' },
  { title: '最小包装数量', width: 160, colKey: 'qty' },
  { title: '检查严格度', width: 160, colKey: 'inspectionStringency' },
  { title: '是否免检', width: 160, colKey: 'isExemptionInspectionName' },
  { title: '免检失效日期', width: 160, colKey: 'dateExemptionExpiredStr' },
  { title: '是否强制供方申请', width: 160, colKey: 'isForceInspectionName' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  mitemKeyword.value = '';
  supplierKeyword.value = '';
};
const onAdd = () => {
  formTitle.value = '新增';
  formRef.value.init();
  formVisible.value = true;
};
const fetchTable = async () => {
  setLoading(true);
  try {
    selectedMitemInSupplierRowKeys.value = [];
    tableDataMitemInSupplier.value = [];
    const data = (await api.mitemInSupplier.getMitemInSupplierList({
      mitemKeyword: mitemKeyword.value,
      supplierKeyword: supplierKeyword.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: sortlist.value,
      filters: filterlist.value,
    })) as any;
    tableDataMitemInSupplier.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const onEditRowClick = (value: any) => {
  // const rowData = value.row;
  formTitle.value = '编辑';
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formRef.value.formData.operateTpye = 'edit';
  formVisible.value = true;
};

const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      fetchTable();
    }
  });
};

const onCloseForm = async () => {
  formRef.value.init();
};

const onDeleteRowClick = async (value: any) => {
  const confirmDia = DialogPlugin({
    header: '删除',
    body: '是否要删除物料与供应商关系？',
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: async () => {
      await api.mitemInSupplier.delete(value.row).then(() => {
        fetchTable();
        confirmDia.hide();
      });
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
