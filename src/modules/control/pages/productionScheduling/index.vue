<!-- 排产平台 -->
<template>
  <cmp-container v-loading="loading" :full="true">
    <!-- 查询 -->
    <cmp-card :span="12">
      <cmp-query ref="queryRef" :opts="opts" :is-reset-query="false" @submit="onInput"> </cmp-query>
    </cmp-card>
    <!-- 页签栏 -->
    <cmp-card :span="12" class="full-tab">
      <t-tabs v-model="activeTab">
        <!-- 页签栏1 排产单甘特图 -->
        <t-tab-panel value="tab1" label="排产单甘特图" :destroy-on-hide="true">
          <cmp-container :full="true">
            <div class="tool-bar">
              <div class="title">甘特图展示</div>
              <div class="btn-bar">
                <t-button :disabled="!isUpdatedGanttData" @click="onRefresh">排产刷新</t-button>
                <t-button :disabled="isUpdatedGanttData" theme="default" @click="onRelease">确认下发</t-button>
                <t-button theme="default" @click="onHistory">下发历史</t-button>
              </div>
            </div>
            <scheduling-gantt
              v-show="showGantt"
              :tasks="tasks"
              :clear-all="clearAllTask"
              :start-date="(queryParams as any).datetimePlanStart"
              :end-date="(queryParams as any).datetimePlanEnd"
              @drag-end="onDragEnd"
            ></scheduling-gantt>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏2 排产单列表 -->
        <t-tab-panel value="tab2" label="排产单列表" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="tablePageUI"
              :fixed-height="true"
              row-key="_timestamp"
              :table-column="columnsData"
              :table-data="tableData"
              :total="tableTotal"
              @refresh="onTableRefresh"
            >
              <template #title>
                {{ '列表展示' }}
              </template>
              <!-- TODO -->
              <template #passRate="slotProps">
                <div>
                  <t-progress theme="plump" :percentage="Math.ceil(slotProps.row.passRate * 1000) / 10" />
                </div>
              </template>
              <template #completedQty="{ row }">
                <div>{{ row.completedQty }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="tsx">
import dayjs from 'dayjs';
import _, { isEmpty, maxBy, minBy } from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { api, MoVO } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';
import { openPage } from '@/router';

import SchedulingGantt from './SchedulingGantt.vue';

const { pageUI: tablePageUI } = usePage();
const activeTab = ref('tab1'); // 默认页签
const queryParams = ref({}); // 查询参数，默认为空
const queryRef = ref();

const tasks = ref({
  data: [],
  links: [],
});

// 表格实例
const tableRef = ref(null);
const columnsData = computed(() => {
  return [
    {
      colKey: 'workshopName',
      title: '车间',
      width: 110,
    },
    {
      colKey: 'workCenterCode',
      title: '工作中心编码',
      width: 120,
    },
    {
      colKey: 'workCenterName',
      title: '工作中心名称',
      width: 120,
    },
    {
      colKey: 'planNo',
      title: '计划单号',
      width: 140,
    },
    {
      colKey: 'moCode',
      title: '工单号',
      width: 140,
    },
    {
      colKey: 'mitemCode',
      title: '物料编码',
      width: 110,
    },
    {
      colKey: 'mitemName',
      title: '物料名称',
      width: 110,
    },
    {
      colKey: 'planQty',
      title: '计划数量',
      width: 95,
    },
    {
      colKey: 'completedQty',
      title: '完工入库数量',
      width: 120,
    },
    {
      colKey: 'datetimePlanStart',
      title: '开始时间',
      width: 170,
    },
    {
      colKey: 'datetimePlanEnd',
      title: '结束时间',
      width: 170,
    },
    {
      colKey: 'datetimeRequire',
      title: '需求日期',
      width: 170,
    },
    {
      colKey: 'statusName',
      title: '工单状态',
    },
    // 工单类型
    {
      colKey: 'moClassName',
      title: '是否非标工单',
      width: 120,
    },
    // 展示工单对应的物料在工作中心的产能型谱速率，如果是标准工单 STANDARD，展示产能型谱的UPH；如果是非标工单，展示工单表里 生产速率 栏位值
    {
      colKey: 'moRate',
      title: 'UPH',
    },
    {
      colKey: 'memo',
      title: '备注',
    },
  ];
});

// 初始渲染
onMounted(async () => {
  queryRef.value.search();
});

// 监听 activeTab 的变化
watch(activeTab, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (newValue === 'tab1' && ganttDataList.length > 0) {
      return;
    }
    queryRef.value.search();
  }
});

// 表格数据 字段
const tableData = ref([]);
const tableTotal = ref(0);

const onTableRefresh = async () => {
  await fetchTable({});
};

// #query 查询参数
const opts = computed(() => {
  return {
    workshopIds: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        isMultiple: true,
        showTitle: false,
      },
    },
    workCenterIds: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        isMultiple: true,
        showTitle: false,
      },
    },
    datetimePlanStart: {
      label: '工单开始时间',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().format('YYYY-MM-DD 08:00:00'), dayjs().add(7, 'day').format('YYYY-MM-DD 08:00:00')],
      bind: {
        enableTimePicker: true,
      },
      eventHandle: {
        blur: dateChange,
      },
    },
  };
});

// 查询
const onInput = async (data) => {
  tablePageUI.value.page = 1;
  const [datetimePlanStart, datetimePlanEnd] = data.datetimePlanStart.map((date) =>
    dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
  );
  if (isEmpty(data.datetimePlanStart)) {
    MessagePlugin.warning('请选择时间段');
    return;
  }
  if (isEmpty(data.workCenterIds)) {
    MessagePlugin.warning('请选择工作中心');
    return;
  }

  // 更新查询参数状态
  queryParams.value = {
    ...data,
    datetimePlanStart,
    datetimePlanEnd,
  };

  // 校验日期跨度不得超过31天
  const startDate = dayjs(datetimePlanStart);
  const endDate = dayjs(datetimePlanEnd);
  const daysDifference = endDate.diff(startDate, 'day');
  if (daysDifference > 31) {
    MessagePlugin.warning('日期跨度不得超过31天');
    return;
  }

  // 根据当前选中的页签来加载相应的数据 获取查询条件的参数进行程查询
  switch (activeTab.value) {
    case 'tab1':
      await fetchGanttData(queryParams.value);
      break;
    case 'tab2':
      await fetchTable(queryParams.value);
      break;
    default:
      // 错误处理或日志
      console.warn('未知的页签');
  }
};

const showGantt = ref(false);
const clearAllTask = ref(false);
const onDragEnd = (task, parent) => {
  if (!parent) {
    const item = ganttDataList.find((t) => t.id === task.id);
    const startDate = dayjs(task.start_date);
    if (item.workCenterId !== parent) {
      item.workCenterId = parent;
    }
    item.datetimePlanStart = startDate.format('YYYY-MM-DD HH:mm:ss');
    item.datetimePlanEnd = startDate.add(item?.duration, 'minute').format('YYYY-MM-DD HH:mm:ss');
    clearAllTask.value = false;
    pushUpdateData(item);
    formatGanttData(ganttDataList, item.id);
  }
};

interface MoItem extends MoVO {
  duration?: number;
}

const loading = ref(false);
const isUpdatedGanttData = ref(false);
const updateListMap = new Map<string, MoItem>();
const allUpdateListMap = new Map<string, MoItem>();
const pushUpdateData = (item: MoItem) => {
  if (!updateListMap.has(item.id)) {
    updateListMap.set(item.id, item);
    allUpdateListMap.set(item.id, item);
    isUpdatedGanttData.value = true;
  }
};
const onRefresh = async () => {
  loading.value = true;
  await api.moSchedule.refresh({
    moList: Array.from(updateListMap.values()),
    ...queryParams.value,
  });
  await fetchGanttData(queryParams.value);
  loading.value = false;
};

const onHistory = async () => {
  openPage('/main#/moRelease');
};

const onRelease = async () => {
  loading.value = true;
  await api.moSchedule.confirmSend({
    moList: Array.from(allUpdateListMap.values()),
    ...queryParams.value,
  });
  MessagePlugin.success('排产下发成功');
  loading.value = false;
  await fetchGanttData(queryParams.value);
  allUpdateListMap.clear();
};

let ganttDataList: MoItem[] = [];
const groupData = {};
const formatGanttData = (data, watchId = '') => {
  let taskData = [];
  // tasks.value.data = [];

  if (data && data.length > 0) {
    taskData = _(data)
      .groupBy('workcenterId')
      .map((group, key) => {
        groupData[key] = {
          minStartDate: minBy(group, 'datetimePlanStart').datetimePlanStart,
          maxEndDate: maxBy(group, 'datetimePlanEnd').datetimePlanEnd,
          data: group,
        };

        return {
          id: key,
          text: group[0].workCenterCode,
          render: 'split',
          row: {
            workCenterCode: group[0].workCenterCode,
            workCenterName: group[0].workCenterName,
          },
        };
      })
      .value();

    for (const key in groupData) {
      if (Object.prototype.hasOwnProperty.call(groupData, key)) {
        const item = groupData[key];
        const arr = item.data as MoItem[];
        arr.sort((a, b) => {
          const aStartDate = dayjs(a.datetimePlanStart);
          const bStartDate = dayjs(b.datetimePlanStart);

          if (aStartDate.isSame(bStartDate)) {
            const aEndDate = dayjs(a.datetimePlanEnd);
            const bEndDate = dayjs(b.datetimePlanEnd);
            return aEndDate.diff(bEndDate);
          }

          return aStartDate.diff(bStartDate);
        });

        const previousItem = null;
        let previousEndDate = dayjs(arr[0].datetimePlanEnd);

        for (let i = 1; i < arr.length; i++) {
          const item = arr[i];
          let startDate = dayjs(item.datetimePlanStart);
          let endDate = dayjs(item.datetimePlanEnd);
          const duration = endDate.diff(startDate, 'minute');
          item.duration = duration;
          let watchBool = false;
          if (watchId && (watchId === item.id || watchId === previousItem?.id)) {
            watchBool = previousEndDate.diff(startDate, 'minute') !== 0;
          }

          if (startDate.isBefore(previousEndDate) || watchBool) {
            startDate = previousEndDate;
            endDate = previousEndDate.add(duration, 'minute');
            item.datetimePlanStart = startDate.format('YYYY-MM-DD HH:mm:ss');
            item.datetimePlanEnd = endDate.format('YYYY-MM-DD HH:mm:ss');
            pushUpdateData(item);
          }

          previousEndDate = dayjs(endDate);

          const task = {
            id: item.id,
            parent: item.workcenterId,
            text: item.moCode,
            start_date: item.datetimePlanStart,
            end_date: item.datetimePlanEnd,
            // duration: duration / 60,
            progress: item?.completedQty > 0 ? item.completedQty / item.planQty : 0,
            row: item,
          } as any;
          taskData.push(task);
        }
      }
    }
  }

  nextTick(() => {
    tasks.value.data = taskData;
  });
};

const fetchGanttData = async (params) => {
  showGantt.value = false;
  nextTick(() => {
    showGantt.value = true;
  });
  const data = await api.moSchedule.getMoScheduleGantt({
    ...params,
  });
  clearAllTask.value = true;
  isUpdatedGanttData.value = false;
  updateListMap.clear();
  ganttDataList = data;
  if (!(data && data.length > 0)) {
    MessagePlugin.warning('没有待排产的工单');
  }
  formatGanttData(data);
};

const fetchTable = async (params) => {
  const data = await api.moSchedule.getMoScheduleList({
    pageNum: tablePageUI.value.page,
    pageSize: tablePageUI.value.rows,
    ...params,
  });
  // 响应数据在response.list中
  const dataWithTimestamps = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  tableData.value = dataWithTimestamps;
  tableTotal.value = data.total;
};

/** 日期范围 辅助函数
 */
const dateChange = async (data: any) => {
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
    await MessagePlugin.warning('日期跨度不得超过31天');
  }
};
</script>

<style lang="less" scoped>
.t-card {
  border: 1px solid var(--td-border-level-2-color) !important;
  margin-bottom: 24px;
}

.tool-bar {
  > .title {
    float: left;
    font-weight: bold;
    color: var(--td-gray-color-8);
    font-size: 16px;
    line-height: 32px;
  }

  > .btn-bar {
    float: right;
  }
}
</style>
