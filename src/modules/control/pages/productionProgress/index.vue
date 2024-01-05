<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" :is-reset-query="false" @submit="conditionEnter" />
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
        <template #op="slotProps">
          <div style="width: 200px">
            <t-progress theme="plump" :percentage="slotProps.row.completionProgress" />
          </div>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api } from '@/api/main';
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
  { title: '排产单', width: 160, colKey: 'scheCode' },
  { title: '产品编码', width: 120, colKey: 'mitemCode' },
  { title: '产品名称', width: 120, colKey: 'mitemName' },
  { title: '产品描述', width: 120, colKey: 'mitemDesc' },
  { title: '计划数量', width: 80, colKey: 'planQty' },
  { title: '计划开始时间', width: 200, colKey: 'datetimePlanStart' },
  { title: '计划结束时间', width: 200, colKey: 'datetimePlanEnd' },
  { title: '投入数量', width: 80, colKey: 'scheQty' },
  { title: '下线数量', width: 80, colKey: 'offlineQty' },
  { title: '完工数量', width: 80, colKey: 'completedQty' },
  { title: '入库数量', width: 80, colKey: 'stockinQty' },
  { title: '完工进度', width: 250, colKey: 'op' },
];

// 查询组件
const opts = computed(() => {
  return {
    moScheId: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    datetimeRange: {
      label: '计划生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      eventHandle: {
        blur: dateChange,
      },
    },
  };
});
// 打印上方查询初始化
const queryCondition = ref({
  moScheId: '',
  mitemId: '',
  dateStart: '',
  dateEnd: '',
  pageNum: 1,
  pageSize: 10,
});
const dateChange = (data: any) => {
  // 获取当前选择的日期范围
  const selectedDateRange = data.value;
  // 将日期字符串转换为dayjs对象
  const startDate = dayjs(selectedDateRange[0]);
  const endDate = dayjs(selectedDateRange[1]);

  // 计算日期范围的天数差异
  const daysDifference = endDate.diff(startDate, 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
  }
};
// const getCompletionProgress = (data: any) => {
//   // Ensure row has valid values
//   const completedQty = data.completedQty || 0;
//   const planQty = data.planQty || 1; // Avoid division by zero

//   // Calculate completion progress as a percentage with 2 decimal places
//   const progress = (completedQty / planQty) * 100;
//   return Number(progress.toFixed(2)); // 返回数字而不是字符串
// };
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
    const data = (await api.moSchedule.getProductionProgress(queryCondition.value)) as any;
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
