<!-- 直通率报表 -->
<template>
  <cmp-container :full="true">
    <!-- 查询 -->
    <cmp-card :span="12">
      <!-- @reset="onReset" -->
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
    </cmp-card>
    <!-- 折线图 -->
    <cmp-card :span="12">
      <cmp-container :full="true">
        <div id="straightThroughRateReportChart" :style="{ width: '100%', height: '100%' }" />
        <!-- 表格数据 -->
      </cmp-container>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { LineChart } from 'echarts/charts';
// 按需导入图表组件
import { GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([CanvasRenderer]);
import dayjs from 'dayjs';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/control';

/** 定义接口  ECharts 配置的类型
 */
interface EChartsOption {
  title?: {
    text: string;
    left: string;
  };
  tooltip?: {
    trigger: string;
    formatter?: (params: any) => string;
  };
  legend?: {
    data: string[];
    bottom: string;
    left: string;
  };
  grid?: {
    left: string;
    right: string;
    bottom: string;
    top: string;
    containLabel: boolean;
  };
  toolbox?: {
    feature: {
      // saveAsImage: {}; // 保存图片功能
    };
  };
  xAxis?: {
    type: string;
    boundaryGap: boolean;
    data: string[];
    axisTick?: {
      show: boolean;
    };
    axisLine?: {
      show: boolean;
    };
  };
  yAxis?: {
    type: string;
    axisLabel?: {
      formatter: string;
    };
    axisTick?: {
      show: boolean;
    };
    axisLine?: {
      show: boolean;
    };
    max?: number;
    min?: number;
    interval?: number;
  };
  series?: Array<{
    name: string;
    type: string;
    data: number[];
  }>;
}

interface ProcessData {
  // processId?: string;
  processName?: string;
  // mitemIds?: string;
  // mitemName?: string;
  // passQuantity?: number;
  // putTotal?: number;
  // timeCreate?: string;
  // dayStart?: string;
  // days?: number;
  // dcResult?: number;
  processRate?: number;
  // mitemRate?: number;
  dayFinish?: string; // 添加了缺失的属性
}

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
    await MessagePlugin.warning('日期跨度不能超过31天');
  }
};

// 定义响应式引用来跟踪禁用状态
const isWorkcenterDisabled = ref(false);
const isMitemDisabled = ref(false);

/** 辅助函数 控制单选多选
 */
// 处理工序选择变化的函数
function handleWorkcenterChange(selectedOptions) {
  // 如果选择了多于一个的工序，则禁用产品选择器
  // isMitemDisabled.value = selected.length > 1; //TODO
  processIds.value = selectedOptions.map((option) => option.value);
}

// 处理产品选择变化的函数
function handleMitemChange(selectedOptions) {
  // 如果选择了多于一个的产品，则禁用工序选择器
  // isWorkcenterDisabled.value = selected.length > 1; //TODO
  mitemIds.value = selectedOptions.map((option) => option.value);
}
// 初始数据
const optionChart: Ref<EChartsOption> = ref({
  title: {
    text: '工序直通率',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    formatter: (params) => params.map((param) => `${param.marker}${param.seriesName}: ${param.value}`).join('<br/>'),
  },
  legend: {
    data: [], // 初始为空，将在获取数据后更新
    bottom: '20',
    left: 'center',
  },
  grid: {
    top: '40',
    left: '5%',
    right: '5%',
    bottom: '10%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      // saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [], // 初始为空，将在获取数据后更新
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} %',
    },
  },
  series: [], // 初始为空，将在获取数据后填充
});
// 注册所有使用的组件
echarts.use([
  LegendComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
]);

const opts = computed(() => {
  return {
    servicingTime: {
      label: '时间范围',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      blur: dateChange,
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      bind: {
        enableTimePicker: false,
      },
    },

    processIds: {
      label: '工序',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'process', // processReturn
        showTitle: false,
        isMultiple: true,
        onChange: handleWorkcenterChange,
        disabled: isWorkcenterDisabled.value, // 根据响应式引用动态设置禁用状态
      },
    },
    mitemIds: {
      label: '产品',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
        isMultiple: true, // 多选
        onChange: handleMitemChange,
        disabled: isMitemDisabled.value, // 同上
      },
    },

    // mitemIds: {
    //   label: '产品',
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: '',
    //   bind: {
    //     type: 'mitem',
    //     showTitle: false,
    //     isMultiple: true,
    //     onChange: handleMitemChange,
    //     disabled: isMitemDisabled.value, // 同上
    //   },
    // },
  };
});

const mitemIds = ref([]); // dis1
const processIds = ref([]); // dis2

let straightThroughRateReportChart: HTMLElement;
const countContainerParentRef = ref<HTMLElement>();
let countChart: echarts.ECharts;

// 初始渲染图表
const straightThroughRateReportChartFn = async () => {
  if (!straightThroughRateReportChart) {
    straightThroughRateReportChart = document.getElementById('straightThroughRateReportChart');
    countContainerParentRef.value = straightThroughRateReportChart.parentElement;
  }
  countChart = echarts.init(straightThroughRateReportChart);

  await getlineData(); // 必须调用才能渲染
  countChart.setOption(optionChart.value as any, true);
};

onMounted(() => {
  straightThroughRateReportChartFn();
  getlineData(); // todo
});

/** 辅助函数 动态生成X轴数据
 *
 */
const generateDateRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const dateRange = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end, 'day')) {
    dateRange.push(current.date()); // 改为使用.date()获取日期号
    current = current.add(1, 'day');
  }
  return dateRange;
};

/** 辅助函数 根据选择的日期范围更新图表
 */
const updateChartWithDateRange = (startDate, endDate) => {
  const xAxisData = generateDateRange(startDate, endDate);
  optionChart.value.xAxis.data = xAxisData.map((date) => dayjs(date).format('D')); // 格式化为 M-D 的形式

  // 接口返回的数据结构如下：[{date: '2023-03-03', value: 10}, {...}]
  const apiResponse = []; // 这里是调用API获取的数据

  // 初始化一个与xAxisData等长的数组，所有元素初值为0（或其他代表无数据的值）
  const seriesData = new Array(xAxisData.length).fill(0);

  // 遍历接口返回的数据，更新对应日期的数据值
  apiResponse.forEach((item) => {
    const index = xAxisData.indexOf(item.date);
    if (index !== -1) {
      seriesData[index] = item.value;
    }
  });
  // 更新图表的series数据
  if (countChart) {
    countChart.setOption(optionChart.value as any, true);
  }
};

// 查询
const onInput = async (data: any) => {
  // const { servicingTime = [], processIds, mitemIds } = data;
  // if (servicingTime.length < 2) return;

  // const [startDate, endDate] = servicingTime;
  // updateChartWithDateRange(startDate, endDate); //辅助函数 根据选择的日期范围更新图表
  // // const { mitemIds, processIds } = data; //解构数据

  // //存储数据
  // mitemIds.value = mitemIds;
  // processIds.value = processIds;
  console.log('🚀 ~ onInput ~ data:', data);
  const { servicingTime = [], mitemIds: incomingMitemIds = [], processIds: incomingProcessIds = [] } = data;
  // const { servicingTime = [], mitemIds,processIds } = data;

  const [startDate, endDate] = servicingTime;
  updateChartWithDateRange(startDate, endDate); // 辅助函数 根据选择的日期范围更新图表
  // 在设置之前，确保 refs 不为 null 且传入数据符合预期

  // 更新 refs
  mitemIds.value = incomingMitemIds;
  processIds.value = incomingProcessIds;

  const reset: ProcessData[] = await api.straightThroughRateReport.getProcesses({
    pageNum: 1,
    pageSize: 20,
    dateStart: servicingTime[0],
    dateEnd: servicingTime[1],
    mitemIds: incomingMitemIds,
    processIds: incomingProcessIds,
  });
  console.log('🚀 ~ onInput ~ reset:工序数据源', reset);
  // TODO....

  // 根据选择更新图表标题
  // 选择工序多条 就叫 工序直通率
  // 选择产品多条 就叫 产品直通率
  // 选择工序单条 且 产品单条 就叫工序名称 加 直通率

  updateChartTitle(mitemIds, processIds); // TODO

  // 处理数据：按日期和工序组织数据
  const processedData = reset.reduce(
    (acc, cur) => {
      const date = cur.dayFinish.split(' ')[0]; // 获取日期部分
      if (!acc.dates.includes(date)) acc.dates.push(date);
      if (!acc.processNames.includes(cur.processName)) acc.processNames.push(cur.processName);
      if (!acc.data[cur.processName]) acc.data[cur.processName] = {};
      acc.data[cur.processName][date] = cur.processRate * 100;
      return acc;
    },
    { dates: [], processNames: [], data: {} },
  );
  // 生成ECharts配置
  const updateChartConfig = () => {
    const { processNames, data } = processedData;

    // 更新legend.data以包含所有的processNames
    optionChart.value.legend.data = processNames;

    // 生成的日期范围现在是日期号的数组
    optionChart.value.xAxis.data = generateDateRange(servicingTime[0], servicingTime[1]);

    // 更新系列数据以确保数据能够根据日期号正确对应
    optionChart.value.series = processNames.map((name) => {
      return {
        name,
        type: 'line',
        data: optionChart.value.xAxis.data.map((dateNumber) => {
          // 确保dateNumber是数字类型
          // 查找与当前日期号对应的完整日期
          const fullDate = Object.keys(data[name]).find((key) => {
            return dayjs(key).date() === (dateNumber as unknown as Number);
          });
          return fullDate ? data[name][fullDate] : 0;
        }),
      };
    });

    if (countChart) {
      countChart.setOption(optionChart.value as any, true);
    }
  };
  // 更新图表标题

  updateChartConfig();
};

/* 辅助函数 直通率标题  */
function updateChartTitle(mitemIds, processIds) {
  console.log('🚀 ~ updateChartTitle ~ workcenterId222:', processIds);
  console.log('🚀 ~ updateChartTitle ~ mitemIds:111', mitemIds);
}

//* 接口数据
const getlineData = async () => {
  // 初始化日期
  const servicingTime = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
  const reset = await api.straightThroughRateReport.getProcesses({
    pageNum: 1,
    pageSize: 20,
    dateStart: servicingTime[0],
    dateEnd: servicingTime[1],
    mitemIds: mitemIds.value,
    processIds: processIds.value,
  });
  console.log('🚀 ~ getlineData ~ reset:', reset);
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

table,
th,
td {
  border: 1px solid black;
}
</style>
