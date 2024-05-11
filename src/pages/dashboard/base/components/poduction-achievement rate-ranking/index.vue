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

import { api } from '@/api/control';
import { componentCondition } from '@/modules/daily/pages/conferenceLayout/components/components';

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

// 刷新事件
const refresh = async (condition: componentCondition) => {
  console.log(`refreshCondition`, condition);
  renderCountChart();
};

defineExpose({
  refresh,
});
const getBarData = async () => {
  const data = await api.wip.getAchievingRate();
  const echarData = data.map((n) => ({ value: n.achievingRateOfToday * 100, name: n.mitemName }));

  optionChart.value = {
    dataset: [
      {
        dimensions: ['name', 'value'],
        source: echarData,
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'value', order: 'desc' },
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
        barWidth: 20,
        encode: { x: 'name', y: 'value' },
        itemStyle: {
          color() {
            return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
              Math.random() * 255,
            )}, 0.7)`;
          },
        },
      },
    ],
  };
};
</script>

<style scoped></style>
