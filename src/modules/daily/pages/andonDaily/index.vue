<template>
  <cmp-container :full="true">
    <cmp-card>
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <t-row style="margin-bottom: 10px">
        <t-switch v-show="pageShow" v-model="pageShow" style="top: 10px; right: 10px; left: 95%" @change="onChange" />
      </t-row>
      <formCard v-show="pageShow" ref="formRef" style="height: 45%" @permission-show="onPermission" />
      <sheetForm v-show="pageShow" ref="formRefSheet" style="height: 45%"></sheetForm>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="index"
        :bordered="true"
        :hover="false"
        :show-pagination="false"
        :rowspan-and-colspan="rowspanAndColspan"
        :table-column="columns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        @refresh="fetchTable"
      >
        <template #title> {{ t('andonDaily.title') }}</template>
        <template #button>
          <t-checkbox v-model="queryCompment.isDateSummary" :label="t('andonDaily.dateTotal')" @change="fetchTable">
          </t-checkbox
        ></template>
        <template #dateOp="slotProps">
          <t-link theme="primary" @click="onCheck(slotProps)"> {{ slotProps.row.date }}</t-link></template
        >
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-loading :loading="pageLoading" text="加载中..." fullscreen />
</template>

<script lang="tsx">
export default {
  name: 'AndonDaily',
};
</script>
<script setup lang="tsx">
import { MessagePlugin, TableProps } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api } from '@/api/daily';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formCard from './form.vue';
import { useLang } from './lang';
import sheetForm from './sheetForm.vue';

const { t } = useLang();

const pageLoading = ref(false);
const formRef = ref(null);
const formRefSheet = ref(null);
const { pageUI } = usePage();
const { loading } = useLoading();
const tableData = ref([]);
const pageShow = ref(false);
const onPermission = (value) => {
  pageShow.value = value;
  fetchTable();
};

const columns: TableProps['columns'] = [
  { title: `${t('andonDaily.date')}`, width: 200, colKey: 'dateOp' },
  { title: `${t('andonDaily.incidentType')}`, width: 150, colKey: 'incidentTypeNameArr' },
  {
    title: `${t('andonDaily.reportingObstacles')}`,
    width: 150,
    align: 'center',
    children: [
      {
        align: 'center',
        colKey: 'reportingObstaclesNumArr',
        title: `${t('andonDaily.reportingObstaclesNum')}`,
        width: 150,
      },
      {
        align: 'center',
        colKey: 'reportingObstaclesTotal',
        title: `${t('andonDaily.reportingObstaclesTotal')}`,
        width: 150,
      },
    ],
  },
  { title: `${t('andonDaily.processingTimeout')}`, width: 150, colKey: 'processingTimeoutName' },
  {
    title: `${t('andonDaily.closeBill')}`,
    width: 150,
    align: 'center',
    children: [
      {
        align: 'center',
        colKey: 'closeBillNumArr',
        title: `${t('andonDaily.closeBillNum')}`,
        width: 150,
      },
      {
        align: 'center',
        colKey: 'closeBillTotal',
        title: `${t('andonDaily.closeBillTotal')}`,
        width: 150,
      },
    ],
  },
  { title: `${t('andonDaily.closeBillRate')}`, width: 100, colKey: 'closeBillRateName' },
];
const rowspanAndColspan = ({ col, rowIndex, colIndex }) => {
  if (tableData.value) {
    const item = tableData.value[rowIndex];
    if (col.colKey === 'dateOp') {
      return {
        rowspan: item.num,
      };
    }
    if (col.colKey === 'reportingObstaclesTotal') {
      return {
        rowspan: item.num,
      };
    }
    if (col.colKey === 'closeBillTotal') {
      return {
        rowspan: item.num,
      };
    }
    if (col.colKey === 'processingTimeoutName') {
      return {
        rowspan: item.num,
      };
    }
    if (col.colKey === 'closeBillRateName') {
      return {
        rowspan: item.num,
      };
    }
  }
  return {
    rowspan: 1,
  };
};
const onChange = () => {
  if (!pageShow.value) {
    fetchTable();
  }
};
const expandData = (data) => {
  const expandedData = [];
  data.forEach((item) => {
    if (Array.isArray(item.incidentTypeNameArr)) {
      const len = item.incidentTypeNameArr.length;
      item.num = len;
      for (let i = 0; i < len; i++) {
        let newItem;
        if (i === 0) {
          newItem = { ...item }; // Copy original item
        } else {
          newItem = {
            incidentTypeNameArr: item.incidentTypeNameArr,
            reportingObstaclesNumArr: item.reportingObstaclesNumArr,
            closeBillNumArr: item.closeBillNumArr,
          };
        }
        newItem.incidentTypeNameArr = item.incidentTypeNameArr[i].toString(); // Convert array to string
        newItem.reportingObstaclesNumArr = item.reportingObstaclesNumArr[i];
        newItem.closeBillNumArr = item.closeBillNumArr[i];
        expandedData.push(newItem);
      }
    } else {
      expandedData.push(item);
    }
  });
  expandedData.forEach((item, index) => {
    item.index = index;
  });

  return expandedData;
};

const onCheck = async (slotProps) => {
  const echarData = [
    {
      name: t('andonDaily.timedout'),
      total: slotProps.row.reportingObstaclesTotal,
      value: slotProps.row.processingTimeout,
    },
    {
      name: t('andonDaily.notTimedout'),
      total: slotProps.row.reportingObstaclesTotal,
      value: slotProps.row.reportingObstaclesTotal - slotProps.row.processingTimeout,
    },
  ];
  const echarCloseData = [
    {
      name: t('andonDaily.closed'),
      total: slotProps.row.reportingObstaclesTotal,
      value: slotProps.row.closeBillTotal,
    },
    {
      name: t('andonDaily.notClose'),
      total: slotProps.row.reportingObstaclesTotal,
      value: slotProps.row.reportingObstaclesTotal - slotProps.row.closeBillTotal,
    },
  ];
  tableData.value = tableData.value.splice(slotProps.rowIndex, slotProps.row.num);
  const echarSheetData = tableData.value.map(({ incidentTypeNameArr, reportingObstaclesNumArr }) => ({
    name: incidentTypeNameArr,
    value: reportingObstaclesNumArr,
  }));
  echarSheetData.sort((a, b) => b.value - a.value);
  formRefSheet.value.echarData = echarSheetData;
  formRef.value.echarData = echarData;
  formRef.value.echarCloseData = echarCloseData;
  pageShow.value = true;
  await formRef.value.renderCountChart();
  await formRefSheet.value.renderCountChart();
};

const queryCompment = ref({
  timeCreateStart: '',
  timeCreateEnd: '',
  isDateSummary: false,
});

// 查询组件
const opts = computed(() => {
  return {
    timeCreateStart: {
      label: t('andonDaily.timeCreateStart'),
      comp: 't-date-picker',
      defaultVal: '',
    },
    timeCreateEnd: {
      label: t('andonDaily.timeCreateEnd'),
      comp: 't-date-picker',
      defaultVal: '',
    },
  };
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  if (!data.timeCreateStart || !data.timeCreateEnd) {
    MessagePlugin.warning(t('andonDaily.queryWarning'));
    return;
  }
  queryCompment.value.timeCreateStart = data.timeCreateStart;
  queryCompment.value.timeCreateEnd = data.timeCreateEnd;
  onRefresh();
};
const onRefresh = () => {
  fetchTable();
};
const dataTotal = ref(0);

const fetchTable = async () => {
  try {
    pageLoading.value = true;
    pageShow.value = false;
    const data = (await api.incidentDeal.getAndonDailyList({
      ...queryCompment.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
    if (data) {
      const res = expandData(data);
      tableData.value = res;
      MessagePlugin.success(t('andonDaily.querySuccess'));
    }
  } catch (e) {
    console.log(e);
  } finally {
    pageLoading.value = false;
  }
};
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
