<template>
  <div id="achievementRate" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script setup lang="ts">
import { BarChart, PieChart } from 'echarts/charts';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash';
import { onMounted, onUnmounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  BarChart,
  CanvasRenderer,
  TitleComponent,
  DatasetComponent,
]);

const optionChart = ref({});

let achievementRate: HTMLElement | null;
const countContainerParentRef = ref<HTMLElement | null>(null); // 将 countContainerParentRef 初始化为 null
let countChart: echarts.ECharts;

const renderCountChart = async () => {
  if (!achievementRate) {
    achievementRate = document.getElementById('achievementRate');

    if (achievementRate) {
      countContainerParentRef.value = achievementRate.parentElement;
    } else {
      console.error("找不到id为'achievementRate'的元素");
      return;
    }
  }

  if (!countContainerParentRef.value || countContainerParentRef.value.clientHeight === 0) {
    // 等待下一帧再尝试初始化，确保 DOM 已经渲染完成并具有有效的宽度和高度
    requestAnimationFrame(() => renderCountChart());
    return;
  }

  countChart = echarts.init(achievementRate as HTMLElement);

  await getBarData();
  countChart.setOption(optionChart.value);
};

useResizeObserver(
  countContainerParentRef,
  debounce((entries) => {
    const entry = entries[0];
    if (entry.contentRect.width !== 0 && entry.contentRect.height !== 0) {
      countChart.resize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        animation: {
          duration: 300,
        },
      });
    }
  }, 600),
);

onMounted(() => {
  renderCountChart();
});

onUnmounted(() => {
  countChart.dispose();
});

const getBarData = async () => {
  // 模拟 API 数据
  const echarData = [
    ['Hannah Krause', 48, 'Engineer', 94, '2011-02-12'],
    ['Zhao Qian', 20, 'Teacher', 68, '2011-03-01'],
    ['Jasmin Krause ', 52, 'Musician', 87, '2011-02-14'],
    ['Li Lei', 37, 'Teacher', 65, '2011-02-18'],
    ['Karle Neumann', 25, 'Engineer', 77, '2011-04-02'],
    ['Adrian Groß', 19, 'Teacher', 69, '2011-01-16'],
    ['Mia Neumann', 71, 'Engineer', 65, '2011-03-19'],
    ['Böhm Fuchs', 36, 'Musician', 88, '2011-02-24'],
    ['Han Meimei', 67, 'Engineer', 66, '2011-03-12'],
  ];

  optionChart.value = {
    title: {
      text: '当天生产达成率排行',
      left: 'center',
      textStyle: {
        fontSize: 15,
      },
    },
    dataset: [
      {
        dimensions: ['name', 'age', 'profession', 'score', 'date'],
        source: echarData,
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' },
        },
      },
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: [
      {
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        itemStyle: {
          color: '#92d050',
        },
      },
    ],
  };
};
</script>

<style scoped></style>
