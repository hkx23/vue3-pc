<template>
  <cmp-container :full="true">
    <cmp-card>
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        @refresh="fetchTable"
      >
        <template #title> {{ t('devent.title') }}</template>
        <!-- <template #detailsOp="{ row }">
          <t-button theme="primary" @click="onCheck(row)"> {{ t('devent.check') }}</t-button></template
        > -->
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/daily';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();

const { loading } = useLoading();
const tableData = ref([]);

const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('devent.billNo')}`, width: 120, colKey: 'billNo' },
  { title: `${t('devent.eventSource')}`, width: 120, colKey: 'eventSource' },
  { title: `${t('devent.datetimePropose')}`, width: 180, colKey: 'datetimePropose' },
  { title: `${t('devent.datetimePlanSolve')}`, width: 180, colKey: 'datetimePlanSolve' },
  { title: `${t('devent.datetimeActualSolve')}`, width: 180, colKey: 'datetimeActualSolve' },
  { title: `${t('devent.deptProposeName')}`, width: 100, colKey: 'deptProposeName' },
  { title: `${t('devent.userProposeName')}`, width: 100, colKey: 'userProposeName' },
  { title: `${t('devent.eventDesc')}`, width: 120, colKey: 'eventDesc' },
  { title: `${t('devent.picture')}`, width: 120, colKey: 'picture' },
  { title: `${t('devent.causeAnalysis')}`, width: 120, colKey: 'causeAnalysis' },
  { title: `${t('devent.improveMeasure')}`, width: 120, colKey: 'improveMeasure' },
  { title: `${t('devent.moShceCode')}`, width: 150, colKey: 'moShceCode' },
  { title: `${t('devent.conferenceResponsibilityName')}`, width: 100, colKey: 'conferenceResponsibilityName' },
  { title: `${t('devent.deptResponsibilityName')}`, width: 100, colKey: 'deptResponsibilityName' },
  { title: `${t('devent.userResponsibilityName')}`, width: 100, colKey: 'userResponsibilityName' },
  { title: `${t('devent.status')}`, width: 80, colKey: 'status' },
  { title: `${t('devent.importantDegree')}`, width: 100, colKey: 'importantDegree' },
];
// 初始渲染
onMounted(async () => {
  await fetchTable();
});

// 查询条件处理数据
const filterList = ref([]) as any;

const datePlanRangeDefault = ref([
  dayjs().format('YYYY-MM-DD 00:00:00'),
  dayjs().subtract(-31, 'day').format('YYYY-MM-DD 23:59:59'),
]); // 初始化日期控件

const presets = ref({
  最近7天: [dayjs().subtract(6, 'day').toDate(), dayjs().toDate()],
  最近3天: [dayjs().subtract(2, 'day').toDate(), dayjs().toDate()],
  今天: [dayjs().toDate(), dayjs().toDate()],
});

// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('devent.billNo'),
      comp: 't-input',
      defaultVal: '',
    },
    eventType: {
      label: t('devent.eventType'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择事件类型',
      bind: {
        paramGroup: 'D_EVENT_TYPE',
      },
    },
    userProposeId: {
      label: t('devent.userProposeName'),
      comp: 'bcmp-select-business',
      event: 'businessUserProposeId',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
    deptResponsibilityId: {
      label: t('devent.deptResponsibilityName'),
      comp: 'bcmp-select-business',
      event: 'businessDeptResponsibilityId',
      defaultVal: '',
      bind: {
        type: 'adminOrg',
        showTitle: false,
      },
    },
    userResponsibilityId: {
      label: t('devent.userResponsibilityName'),
      comp: 'bcmp-select-business',
      event: 'businessUserResponsibilityId',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
    status: {
      label: t('devent.handleStatus'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择处理状态',
      bind: {
        paramGroup: 'D_EVENT_STATUS',
      },
    },
    datetimePropose: {
      label: t('devent.datetimePropose'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择提出时间',
      bind: {
        enableTimePicker: true,
        presets: presets.value,
      },
    },
    datetimePlanSolve: {
      label: t('devent.datetimePlanSolve'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择计划解决时间',
      bind: {
        enableTimePicker: true,
        presets: presets.value,
      },
    },
    eventDesc: {
      label: t('devent.eventDesc'),
      comp: 't-input',
      defaultVal: '',
    },
    moShceId: {
      label: t('devent.moShceCode'),
      comp: 't-input',
      defaultVal: '',
    },
    conferenceResponsibilityId: {
      label: t('devent.conferenceResponsibilityName'),
      comp: 'bcmp-select-business',
      event: 'businessConferenceResponsibilityId',
      defaultVal: '',
      bind: {
        type: 'conference',
        showTitle: false,
      },
    },
    eventSource: {
      label: t('devent.eventSource'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择事件来源',
      bind: {
        paramGroup: 'D_EVENT_SOURCE',
      },
    },
    importantDegree: {
      label: t('devent.importantDegree'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择重要程度',
      bind: {
        paramGroup: 'D_IMPORTANT_DEGREE',
      },
    },
  };
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  filterList.value = [];
  for (const key in data) {
    const addFilter = {
      field: key,
      operator: 'EQ',
      value: data[key],
    };
    if (key !== 'keyWord' && addFilter.value) {
      filterList.value.push(addFilter);
    }
  }
  onRefresh();
};
const onRefresh = () => {
  fetchTable();
};
const dataTotal = ref(0);

const fetchTable = async () => {
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
    };

    const data = (await api.event.search(searchCondition)) as any;
    if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
    tableData.value = data.list;
    dataTotal.value = data.total;
    MessagePlugin.success(t('devent.querySuccess'));
  } catch (e) {
    console.log(e);
  }
};
</script>

<style lang="less" scoped></style>
