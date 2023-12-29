<template>
  <div id="top5Chart" :style="{ width: '100%', height: '100%' }" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

echarts.use([TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer]);

const store = useSettingStore();
const optionChart = ref({});

// monitorChart
let top5Chart: HTMLElement;
const countContainerParentRef = ref<HTMLElement>();
let countChart: echarts.ECharts;
const renderCountChart = async () => {
  if (!top5Chart) {
    top5Chart = document.getElementById('top5Chart');
    countContainerParentRef.value = top5Chart.parentElement;
  }
  countChart = echarts.init(top5Chart);

  await getPieData();
  countChart.setOption(optionChart.value);
};

useResizeObserver(countContainerParentRef, (entries) => {
  const entry = entries[0];
  countChart.resize({
    width: entry.contentRect.width,
    height: entry.contentRect.height,
    animation: {
      duration: 300,
      delay: 200,
    },
  });
});

onMounted(() => {
  renderCountChart();
});

onUnmounted(() => {
  [countChart].forEach((item) => {
    item.dispose();
  });
});

onDeactivated(() => {
  storeBrandThemeWatch();
});

//* 接口数据
const getPieData = async () => {
  try {
    const data = await api.wipRepair.getRepairTop5();
    if (data.length > 0) {
      const first = data[0];
      const echarData = [];

      data.forEach((n) => echarData.push({ value: n.defectCodePercent * 100, name: n.defectName }));

      optionChart.value = {
        title: {
          text: `过程不良TOP5 (周 ${dayjs(first.beginDate).format('YYYY-MM-DD')} ~ ${dayjs(first.endDate).format(
            'YYYY-MM-DD',
          )})`,
          left: 'letf',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '100%',
            label: {
              show: true,
              formatter(param) {
                return `${param.name} (${param.percent}%)`;
              },
            },
            data: echarData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    }
  } catch (error) {
    console.error('Error fetching pie chart data', error);
  }
};

const storeBrandThemeWatch = watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([countChart]);
  },
);
</script>

<style lang="less" scoped></style>
