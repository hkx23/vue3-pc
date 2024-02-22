<!-- 直通率报表 -->
<template>
  <cmp-container :full="true">
    <!-- 查询 -->
    <cmp-card :span="12">
      <!-- @reset="onReset" -->
      <cmp-query :opts="opts" :is-reset-query="false" @submit="onInput"> </cmp-query>
    </cmp-card>
    <!-- 折线图 -->
    <cmp-card :span="12">
      <cmp-container :full="true">
        <div id="straightThroughRateReportChart" :style="{ width: '100%', height: '100%' }" />
        <!-- 表格数据 -->
        <table>
          <tr>
            <th>产品名称</th>
            <!-- TODO 动态加载日期 -->
            <th>10</th>
            <th>11</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
          </tr>
          <tr>
            <!-- TODO 动态加载所选产品-->
            <td>产品A1</td>
            <!-- TODO 动态加载百分比-->
            <td>99%</td>
            <td>99%</td>
            <td>99%</td>
            <td>99%</td>
            <td>99%</td>
          </tr>
          <tr>
            <td>产品A2</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
          <tr>
            <td>产品A3</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
          </tr>
        </table>
      </cmp-container>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { LineChart } from 'echarts/charts';
// 按需导入图表组件
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent, // 添加这一行导入ToolboxComponent
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([CanvasRenderer]);
// import { debounce } from 'lodash';
// import { useResizeObserver } from 'vue-hooks-plus';
import dayjs from 'dayjs';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

const optionChart = ref({});
// 注册所有使用的组件
echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  TitleComponent,
  ToolboxComponent, // 确保添加这一行来注册ToolboxComponent
]);

onMounted(() => {
  straightThroughRateReportChartFn();
});

const opts = computed(() => {
  return {
    servicingTime: {
      label: '时间范围',
      comp: 't-date-range-picker',
      event: 'daterangetime',

      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      eventHandle: {
        blur: dateChange,
      },
    },
    workcenterId: {
      label: '工序',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'processReturn', // todo
        showTitle: false,
        isMultiple: true, // 多选
      },
    },

    mitemId: {
      label: '产品',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
        isMultiple: true, // 多选
      },
    },
  };
});

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
const onInput = async (data) => {
  console.log('🚀 ~ data:', data);
};

let straightThroughRateReportChart: HTMLElement;
const countContainerParentRef = ref<HTMLElement>();
let countChart: echarts.ECharts;

const straightThroughRateReportChartFn = async () => {
  if (!straightThroughRateReportChart) {
    straightThroughRateReportChart = document.getElementById('straightThroughRateReportChart');
    countContainerParentRef.value = straightThroughRateReportChart.parentElement;
  }
  countChart = echarts.init(straightThroughRateReportChart);
  await getlineData();
  await countChart.setOption(optionChart.value);

  // 获取当前时间
  // const currentDate = new Date();
  // // 获取 7 天前的时间
  // const sevenDaysAgo = new Date();
  // sevenDaysAgo.setDate(currentDate.getDate() - 6);
  // sevenDaysAgo.setHours(0, 0, 0, 0); // 设置为 0 点
  // // 获取今天的时间
  // const today = new Date();
  // today.setHours(23, 59, 59, 999); // 设置为 23:59:59.999
  // currentMonth.value = `${dayjs(sevenDaysAgo).format('YYYY-MM-DD')} ~ ${dayjs(today).format('YYYY-MM-DD')}`;
};

//* 接口数据
const getlineData = async () => {
  // const data = await api.control.getxxxxx(); //TODO 处理数据后 渲染到图表中

  optionChart.value = {
    title: {
      text: '产品直通率',
      left: 'center', // 标题居中
    },
    tooltip: {
      trigger: 'axis',
      // 格式化提示框为百分比显示
      formatter: (params) => {
        return params.map((param) => `${param.seriesName}: ${param.value}%`).join('<br/>');
      },
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
      bottom: '3%', // 图例位置调整至底部留出空间
      left: 'center', // 图例居中显示
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '20%', // 调整底部空间以去掉底部的刻度线或留出图例空间
      top: '15%', // 调整顶部空间以居中显示图表内容
      containLabel: false,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [23, 24, 25, 26, 27, 28, 29],
      axisTick: {
        show: false, // 不显示x轴刻度线
      },
      axisLine: {
        show: false, // 不显示x轴线
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
      },
      axisTick: {
        show: false, // 不显示y轴刻度线
      },
      axisLine: {
        show: false, // 不显示y轴线
      },
      // 设置y轴最大值、最小值和间隔
      max: 100,
      min: 0,
      interval: 10,
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        data: [50, 73, 84, 98, 60],
      },
      {
        name: 'Union Ads',
        type: 'line',
        data: [35, 56, 99, 52],
      },
      {
        name: 'Video Ads',
        type: 'line',
        data: [66, 79, 89, 100],
      },
    ],
  };
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
