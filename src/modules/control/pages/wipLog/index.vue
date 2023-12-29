<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableSupplierColumns"
        :table-data="tableDataSupplier"
        :loading="loading"
        :fixed-height="true"
        :total="dataTotal"
        :hover="true"
        @refresh="onRefresh"
      >
        <!-- <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="onEditRowClick(slotProps)" />
              </t-space>
            </template> -->
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

// import SupplierForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const dataTotal = ref(0);

const tableDataSupplier = ref([]);

const tableSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 64 },
  { title: '产品条码', width: 160, colKey: 'serialNumber' },
  { title: '排产单号', width: 160, colKey: 'moScheCode' },
  { title: '工单号', width: 200, colKey: 'moCode' },
  { title: '产品编码', width: 160, colKey: 'pdCode' },
  { title: '产品描述', width: 160, colKey: 'pdDesc' },
  { title: '车间', width: 160, colKey: 'workshopName' },
  { title: '工作中心', width: 160, colKey: 'workcenterName' },
  { title: '工作中心描述', width: 160, colKey: 'workcenterDesc' },
  { title: '当前工站', width: 160, colKey: 'curWorkstationrName' },
  { title: '上一工站', width: 160, colKey: 'preWorkstationrName' },
  { title: '过站人', width: 160, colKey: 'creatorName' },
  { title: '过站时间', width: 160, colKey: 'timeCreate' },
];
// 查询组件
const opts = computed(() => {
  return {
    serialNumber: {
      label: '产品条码',
      comp: 't-input',
      placeholder: '请输入产品条码',
      defaultVal: '',
    },
    mitemId: {
      label: '产品编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    moId: {
      label: '工单号/排产单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    workshopId: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workCenterId: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    workstationId: {
      label: '工站',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workstation',
        showTitle: false,
      },
    },
    datetimeRange: {
      label: '过站时间',
      comp: 't-date-range-picker',
      defaultVal: [],
    },
  };
});
// 打印上方查询初始化
const queryCondition = ref({
  moId: '',
  mitemId: '',
  workCenterId: '',
  workshopId: '',
  workstationId: '',
  dateStart: '',
  dateEnd: '',
  serialNumber: '',
  pageNum: 1,
  pageSize: 10,
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  queryCondition.value = data;
  const [dateStart, dateEnd] = data.datetimeRange;
  // 计算日期范围的天数差异
  const startDate = dayjs(dateStart);
  const endDate = dayjs(dateEnd);
  const daysDifference = endDate.diff(startDate, 'day');
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
    return;
  }
  queryCondition.value.dateStart = dateStart;
  queryCondition.value.dateEnd = dateEnd;
  console.log(queryCondition);
  fetchTable();
};
// 查询按钮
const onRefresh = () => {
  queryCondition.value.pageNum = pageUI.value.page;
  queryCondition.value.pageSize = pageUI.value.rows;
  fetchTable();
};
// 重置按钮
// const onReset = () => {
//   keyword.value = '';
// };

const fetchTable = async () => {
  setLoading(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await api.wipLog.search(queryCondition.value)) as any;
    tableDataSupplier.value = data.list;
    dataTotal.value = data.total;
    // tableSupplierPagination.value = { ...tableSupplierPagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// const onEditRowClick = (value: any) => {
//   formRef.value.formData = JSON.parse(JSON.stringify(value.row));
//   formVisible.value = true;
// };

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
