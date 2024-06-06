<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="conditionReset" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        active-row-type="single"
        :table-column="tableWarehouseColumns"
        :table-data="tableDataWarehouse"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        :resizable="true"
        @refresh="fetchTable"
      >
        <template #button>
          <t-button theme="primary" @click="onAdd">新增</t-button>
          <t-button theme="primary" @click="onAdd">打印</t-button>
        </template>
        <template #op="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">查看</t-link>
          </t-space>
        </template>
        <template #billNoOp="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">{{
              slotProps.row.billNo
            }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formTitle"
      :on-confirm="onConfirmForm"
      width="85%"
      :close-on-overlay-click="false"
    >
      <miscellaneous-manage-form ref="formRef"></miscellaneous-manage-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { api as apiWarehouse } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import MiscellaneousManageForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const keyword = ref('');
const tableDataWarehouse = ref([]);
const formVisible = ref(false);
const formRef = ref(null);
const formTitle = ref('');
const warehouseState = ref(-1);

const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '单据号', colKey: 'billNoOp', width: 85 },
  { title: '交易事务', width: 85, colKey: 'businessCategoryName' },
  { title: '单据状态', width: 85, colKey: 'billNoStatusName' },
  { title: '原因', width: 85, colKey: 'reason' },
  { title: '仓库', width: 85, colKey: 'warehouseName' },
  { title: '科目', width: 80, colKey: 'account' },
  { title: '费用部门', width: 80, colKey: 'costDepartment' },
  { title: '创建人', width: 74, colKey: 'creatorName' },
  { title: '创建时间', width: 80, colKey: 'timeCreate' },
  { title: '最后更新人', width: 100, colKey: 'modifierName' },
  { title: '最后更新时间', width: 110, colKey: 'timeModified' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

// 查询组件
const opts = computed(() => {
  return {
    keyword: {
      label: '单据号',
      comp: 't-input',
      placeholder: '请输入单据号',
      defaultVal: '',
    },
    reason: {
      label: '原因',
      comp: 't-select',
      bind: {
        options: reasonOption.value,
        lazyLoad: true,
      },
    },
    warehousId: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    // businessType: {
    //   label: '业务类型',
    //   comp: 't-select',
    //   bind: {
    //     options: businessTypeOption.value,
    //     lazyLoad: true,
    //   },
    // },
    userId: {
      label: '创建人',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
  };
});

const reasonOption = ref([]);
const businessTypeOption = ref([]);

// 查询初始化
const queryCondition = ref({
  billNo: '',
  creatorId: '',
  reason: '',
  warehouseId: '',
  pageNum: 1,
  pageSize: 10,
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  queryCondition.value = data;
  onRefresh();
};

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const conditionReset = () => {
  keyword.value = '';
  warehouseState.value = -1;
};
const dataTotal = ref(0);

const fetchTable = async () => {
  setLoading(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await apiWarehouse.miscellaneousManage.getMiscellaneousList(queryCondition.value)) as any;
    tableDataWarehouse.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const onEditRowClick = (value: any) => {
  formTitle.value = '查看';
  formRef.value.formData.operateTpye = 'check';
  formRef.value.formData = JSON.parse(JSON.stringify(value.row));
  formRef.value.formData.isState = value.row.state === 1;
  formRef.value.formData.enableLocation = value.row.isEnableLocation === 1;
  formRef.value.formData.enableUpload = value.row.isEnableUpload === 1;
  formRef.value.formData.fifo = value.row.isFifo === 1;
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

const onAdd = () => {
  formTitle.value = '新增';
  formRef.value.formData.operateTpye = 'add';
  formVisible.value = true;
};

onMounted(() => {
  api.param.getListByGroupCode({ parmGroupCode: 'W_TRANSFER_HEAD_REASON' }).then((data) => {
    reasonOption.value = data;
  });
  api.param.getListByGroupCode({ parmGroupCode: 'W_TRANSFER_HEAD_BUSINESS_TYPE' }).then((data) => {
    businessTypeOption.value = data;
  });
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
