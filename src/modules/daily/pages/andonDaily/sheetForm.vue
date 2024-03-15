<template>
  <cmp-card :hover-shadow="false" height="100%">
    <div id="achievementRate" :style="{ width: '100%', height: '100%' }"></div>
  </cmp-card>
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

onUnmounted(() => {
  countChart.dispose();
});
onMounted(() => {
  renderCountChart();
});
const echarData = ref([]);
const getBarData = async () => {
  optionChart.value = {
    dataset: [
      {
        dimensions: ['name', 'value'],
        source: echarData,
      },
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 0 },
      axisTick: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        barWidth: 30,
        encode: { x: 'name', y: 'value' },
      },
    ],
  };
};
defineExpose({
  renderCountChart,
  getBarData,
  echarData,
});
</script>

<style scoped></style>
