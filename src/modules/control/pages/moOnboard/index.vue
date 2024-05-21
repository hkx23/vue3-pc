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
        <template #title>工单投料列表 </template>
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
import utils from '@/utils/common';

// import SupplierForm from './form.vue';

const { pageUI } = usePage();
const { loading } = useLoading();
const dataTotal = ref(0);

const tableDataSupplier = ref([]);

const tableSupplierColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 64 },
  { title: '工作中心', width: 160, colKey: 'workcenterName' },
  { title: '工单号', width: 200, colKey: 'moCode' },
  { title: '产品编码', width: 160, colKey: 'pdCode' },
  { title: '物料标签', width: 160, colKey: 'mitemLabelNo' },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料描述', width: 160, colKey: 'mitemDesc' },
  { title: '投料工序', width: 160, colKey: 'processName' },
  { title: '投料工站', width: 160, colKey: 'workstationrName' },
  { title: '作业员', width: 160, colKey: 'creatorName' },
  { title: '投料时间', width: 160, colKey: 'timeCreate' },
];
// 查询组件
const opts = computed(() => {
  return {
    moId: {
      label: '工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
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
    mitemLabelNo: {
      label: '物料标签',
      comp: 't-input',
      placeholder: '请输入物料标签',
      defaultVal: '',
    },
    datetimeRange: {
      label: '投料时间',
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
  moId: '',
  mitemId: '',
  workCenterId: '',
  dateStart: '',
  dateEnd: '',
  mitemLabelNo: '',
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
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
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
  utils.loadingPluginFullScreen(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await api.moOnboard.getMoOnboardList(queryCondition.value)) as any;
    tableDataSupplier.value = data.list;
    dataTotal.value = data.total;
    if (
      data.total !== 0 &&
      dataTotal.value < pageUI.value.page * pageUI.value.rows &&
      data.list &&
      data.list.length === 0
    ) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
    // tableSupplierPagination.value = { ...tableSupplierPagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};

// const onEditRowClick = (value: any) => {
//   formRef.value.formData = JSON.parse(JSON.stringify(value.row));
//   formVisible.value = true;
// };

onMounted(() => {
  // 获取当前日期
  const today = new Date();

  // 计算三天前的日期

  // 将日期转换为字符串，格式可以根据需要进行调整
  const timeCreatedEnd = today.toISOString().split('T')[0];
  queryCondition.value.dateStart = timeCreatedEnd;
  queryCondition.value.dateEnd = timeCreatedEnd;
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
