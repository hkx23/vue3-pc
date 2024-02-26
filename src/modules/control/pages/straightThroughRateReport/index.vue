<!-- 直通率报表 -->
<template>
  <cmp-container :full="true">
    <!-- 查询 -->
    <cmp-card :span="12">
      <!-- @reset="onReset" -->
      <cmp-query
        ref="queryComponent"
        :opts="opts"
        :bool-enter="false"
        @change="change"
        @reset="onReset"
        @submit="onInput"
      >
      </cmp-query>
    </cmp-card>
    <!-- 折线图 -->
    <cmp-card :span="12">
      <div id="straightThroughRateReportChart" :style="{ width: '100%', height: '60%' }"></div>
      <!-- 表格数据 -->
      <div v-if="apiData.length > 0" class="table-container">
        <table>
          <thead>
            <tr>
              <th>产品名称</th>
              <th v-for="date in optionChart.xAxis.data" :key="date">{{ date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="series in optionChart.series" :key="series.name">
              <td>{{ series.name }}</td>
              <td v-for="(value, index) in series.data" :key="index">{{ formatPercentage(value) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  processName?: string;
  processRate?: number;
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
// const isWorkcenterDisabled = ref(false);
// const isMitemDisabled = ref(false);

/** 辅助函数 控制单选多选
 */
// const selectedProcessIds = ref([]);
// const selectedMitemIds = ref([]);

const change = (val) => {
  const { mitemIds, processIds } = val;
  if (processIds.length > 1) {
    MessagePlugin.warning('多选工序不能选择产品！');
    // selectedMitemIds.value = []; // 清空产品选择
    // isMitemDisabled.value = true;
  } else {
    isMitemDisabled.value = false;
  }
  if (mitemIds.length > 1) {
    MessagePlugin.warning('多选产品不能选择工序！');
    // selectedProcessIds.value = []; // 清空工序选择
    // isWorkcenterDisabled.value = true;
  } else {
    isWorkcenterDisabled.value = false;
  }
};

const mitemIds = ref([]); // dis1
const processIds = ref([]); // dis2

// 计算属性来确定标题
const chartTitle = computed(() => {
  if (processIds.value.length > 1) {
    console.log('🚀 ~ chartTitle ~ processIds.value.length:', processIds.value.length);
    return '工序直通率';
  }
  if (mitemIds.value.length > 1) {
    return '产品直通率';
  }
  return '直通率'; // 默认标题或其他逻辑
});

// 初始数据
const optionChart: Ref<EChartsOption> = ref({
  title: {
    text: chartTitle.value,
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
    bottom: '15%',
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
      defaultVal: [dayjs(), dayjs()],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },

    processIds: {
      label: '工序',
      comp: 'bcmp-select-business',
      event: 'business',
      // defaultVal: selectedProcessIds.value,
      bind: {
        type: 'process', // processReturn
        showTitle: false,
        isMultiple: true,
        // onChange: handleWorkcenterChange,
        disabled: isWorkcenterDisabled.value,
      },
    },
    mitemIds: {
      label: '产品',
      comp: 'bcmp-select-business',
      event: 'business',
      // defaultVal: selectedMitemIds.value,
      bind: {
        type: 'mitem',
        showTitle: false,
        isMultiple: true, // 多选
        // onChange: handleMitemChange,
        disabled: isMitemDisabled.value, // 根据响应式引用动态设置禁用状态
      },
    },
  };
});

// 从 API 获取的数据
const apiData = ref([]);

const isMitemDisabled = ref(false);
const isWorkcenterDisabled = ref(false);

// 存储日期范围，用于表格列头
const selectedDates = ref([]);

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

/** 辅助函数 格式化百分比值，保留两位小数
 */
const formatPercentage = (value: number) => {
  // return `${value.toFixed(2)}%`;
  return `${value.toFixed(0)}%`; // todo
};

/** 辅助函数 动态生成X轴数据
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

  const apiResponse = []; // API获取的数据

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
  console.log('🚀 ~ onInput ~ data:', data);
  const { servicingTime = [], mitemIds: incomingMitemIds = [], processIds: incomingProcessIds = [] } = data;

  // 检查是否选择了时间范围和产品工序--2选1
  // if (servicingTime.length === 0 || (incomingMitemIds.length === 0 && incomingProcessIds.length === 0)) {
  //   MessagePlugin.warning('请选择产品或工序!');
  //   return;
  // }

  const [startDate, endDate] = servicingTime;
  selectedDates.value = generateDateRange(servicingTime[0], servicingTime[1]);

  updateChartWithDateRange(startDate, endDate); // 辅助函数 根据选择的日期范围更新图表

  // 更新
  processIds.value = incomingProcessIds;
  mitemIds.value = incomingMitemIds;

  // 查询参数处理id []
  const resMitemIds = incomingMitemIds ? incomingMitemIds.map((e) => e.value) : [];
  const resProcessIDs = incomingProcessIds ? incomingProcessIds.map((e) => e.value) : [];

  let reset: ProcessData[] = [];

  // 根据不同条件调用不同API
  if (processIds.value.length > 1) {
    // 工序长度大于1，调用getProcesses接口
    reset = await api.straightThroughRateReport.getProcesses({
      pageNum: 1,
      pageSize: 20,
      dateStart: servicingTime[0],
      dateEnd: servicingTime[1],
      mitemIds: resMitemIds,
      processIds: resProcessIDs,
    });
  } else if (mitemIds.value.length > 1) {
    // 产品长度大于1，调用另一个接口(getProducts)
    reset = await api.straightThroughRateReport.getProducts({
      pageNum: 1,
      pageSize: 20,
      dateStart: servicingTime[0],
      dateEnd: servicingTime[1],
      mitemIds: resMitemIds,
      processIds: resProcessIDs,
    });
  } else if (processIds.value.length === 1 && mitemIds.value.length === 1) {
    // 工序和产品长度都为0，调用(getSingle)
    reset = await api.straightThroughRateReport.getSingle({
      pageNum: 1,
      pageSize: 20,
      dateStart: servicingTime[0],
      dateEnd: servicingTime[1],
      mitemIds: resMitemIds,
      processIds: resProcessIDs,
    });
  }

  // 存数据
  apiData.value = reset;

  console.log('🚀 ~ onInput ~ reset:工序数据源', reset);

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
  updateChartConfig();

  // 更新图表标题
  updateChartTitle(processIds.value, mitemIds.value);
};

//* 重置
const onReset = () => {
  apiData.value = [];
};

/* 辅助函数 直通率标题  */
function updateChartTitle(processIds, mitemIds) {
  console.log('🚀 ~ updateChartTitle ~ workcenterId111:', processIds);
  console.log('🚀 ~ updateChartTitle ~ mitemIds:222', mitemIds);
  // processIds 的值的长度 > 1 那么 title 就是 工序直通率
  // mitemIds 的值的长度 > 1 那么 title 就是 产品直通率
  // processIds 的值的长度 =  0 且  mitemIds的值的长度 = 0  那么 title 就是 工序 + 选中的第一条数据名称 + 直通率
}

//* 接口数据
const getlineData = async () => {
  // 初始化日期
  const servicingTime = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
  await api.straightThroughRateReport.getProcesses({
    pageNum: 1,
    pageSize: 20,
    dateStart: servicingTime[0],
    dateEnd: servicingTime[1],
    mitemIds: mitemIds.value,
    processIds: processIds.value,
  });
};
</script>

<style scoped>
.table-container {
  /* overflow-y: scroll; */
  overflow-y: auto; /* 改为 auto，仅在需要时显示滚动条 */
  margin: 0 auto;
  max-width: 100%; /* 如果需要，可以调整为 100% 以充分利用可用空间 */
  max-height: 40vh; /* 使用 vh 单位来基于视口高度设置最大高度 */
  display: flex; /* 启用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

table {
  /* 宽度调整为100%以填充容器 */
  width: auto; /* 根据内容自动调整宽度 */
  margin: 0 auto; /* 确保表格在容器中水平居中 */
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;

  /* 文本居中对齐 */
  text-align: center;

  /* padding: 8px; 增加内边距以改善可读性 */

  /* 垂直居中 */
  vertical-align: middle;
  font-size: 13px;
}

thead {
  background-color: #f9f9f9;
}
</style>
