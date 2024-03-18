<template>
  <cmp-container :full="true">
    <t-row>
      <cmp-card :hover-shadow="false" style="width: 50%" height="100%">
        <div id="andonDailyChartOutTime" class="chart-item" />
      </cmp-card>
      <cmp-card :hover-shadow="false" style="width: 50%" height="100%">
        <div id="andonDailyChartCloseBill" class="chart-item" />
      </cmp-card>
    </t-row>
  </cmp-container>
</template>

<script setup lang="ts">
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash';
import { onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

echarts.use([TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer, TitleComponent]);

const store = useSettingStore();
const optionChart = ref({});
const optionCloseChart = ref({});
// 监听图表
let andonDailyChartOutTime: HTMLElement;
let andonDailyChartCloseBill: HTMLElement;
const chartOutTimeRef = ref<HTMLElement>();
const chartCloseBillRef = ref<HTMLElement>();
let countChart: echarts.ECharts;
let countCloseChart: echarts.ECharts;
const renderCountChart = async () => {
  if (!andonDailyChartOutTime) {
    andonDailyChartOutTime = document.getElementById('andonDailyChartOutTime');
    chartOutTimeRef.value = andonDailyChartOutTime.parentElement;
  }
  if (!andonDailyChartCloseBill) {
    andonDailyChartCloseBill = document.getElementById('andonDailyChartCloseBill');
    chartCloseBillRef.value = andonDailyChartCloseBill.parentElement;
  }
  countChart = echarts.init(andonDailyChartOutTime);
  countCloseChart = echarts.init(andonDailyChartCloseBill);
  await getPieData();
  countChart.setOption(optionChart.value);
  countCloseChart.setOption(optionCloseChart.value);
};

useResizeObserver(
  chartOutTimeRef,
  debounce((entries) => {
    const entry = entries[0];
    if (countChart) {
      countChart.resize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        animation: { duration: 300 },
      });
    }
  }, 600),
);

useResizeObserver(
  chartCloseBillRef,
  debounce((entries) => {
    const entry = entries[0];
    if (countCloseChart) {
      countCloseChart.resize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        animation: { duration: 300 },
      });
    }
  }, 600),
);

onUnmounted(() => {
  [countChart, countCloseChart].forEach((chart) => {
    if (chart) chart.dispose();
  });
});
onMounted(() => {
  renderCountChart();
});

onDeactivated(() => {
  storeBrandThemeWatch();
});

const echarData = ref([]);
const echarCloseData = ref([]);
const echarSheetData = ref([]);

//* 接口数据
const getPieData = async () => {
  try {
    optionChart.value = {
      legend: {
        // show: false, // 将图例隐藏
        orient: 'horizontal',
        bottom: 40,
      },
      // tooltip: {
      //   trigger: 'item',
      // },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '35%'],
          label: {
            show: true,
            formatter: (param) => `${param.name} ${param.value}`,
          },
          data: echarData.value,
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
    optionCloseChart.value = {
      legend: {
        // show: false, // 将图例隐藏
        orient: 'horizontal',
        bottom: 40,
      },
      // tooltip: {
      //   trigger: 'item',
      // },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '35%'],
          label: {
            show: true,
            formatter: (param) => `${param.name} ${param.value}`,
          },
          data: echarCloseData.value,
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
  } catch (error) {
    console.error('获取饼图数据时出错', error);
  }
};

const storeBrandThemeWatch = watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([countChart!, countCloseChart!]);
  },
);
defineExpose({
  getPieData,
  renderCountChart,
  echarData,
  echarCloseData,
  echarSheetData,
});
</script>

<style lang="less" scoped>
.charts-container {
  display: flex;
}

.chart-item {
  flex: 1;
  width: 50%;
  height: 100%;
}
</style>
