<template>
  <div id="countContainer" :style="{ width: '100%', height: '100%' }" />
</template>

<script setup lang="ts">
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash';
import { computed, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

import { getPieChartDataSet } from './index';

echarts.use([TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer]);

const store = useSettingStore();

const chartColors = computed(() => store.chartColors);

// monitorChart
let countContainer: HTMLElement;
const countContainerParentRef = ref<HTMLElement>();
let countChart: echarts.ECharts;
const renderCountChart = () => {
  if (!countContainer) {
    countContainer = document.getElementById('countContainer');
    countContainerParentRef.value = countContainer.parentElement;
  }
  countChart = echarts.init(countContainer);
  countChart.setOption(getPieChartDataSet(chartColors.value));
};

useResizeObserver(
  countContainerParentRef,
  debounce((entries) => {
    const entry = entries[0];
    countChart.resize({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
      animation: {
        duration: 300,
      },
    });
  }, 600),
);

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

const storeBrandThemeWatch = watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([countChart]);
  },
);
</script>

<style lang="less" scoped></style>
