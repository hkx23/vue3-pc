<template>
  <cmp-card title="统计数据" :subtitle="currentMonth" :bordered="false" :full="true" height="100%">
    <template #actions>
      <div class="dashboard-chart-title-container">
        <t-date-range-picker
          class="card-date-picker-container"
          theme="primary"
          mode="date"
          :default-value="LAST_7_DAYS"
          @change="onCurrencyChange"
        />
      </div>
    </template>
    <div id="monitorContainer" :style="{ width: '100%', height: '100%' }" />
  </cmp-card>
</template>

<script setup lang="ts">
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';
import { LAST_7_DAYS } from '@/utils/date';

import { getLineChartDataSet } from './index';

echarts.use([TooltipComponent, LegendComponent, GridComponent, LineChart, CanvasRenderer]);

const getThisMonth = (checkedValues?: string[]) => {
  let date: Date;
  if (!checkedValues || checkedValues.length === 0) {
    date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  date = new Date(checkedValues[0]);
  const date2 = new Date(checkedValues[1]);

  const startMonth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const endMonth = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : `0${date2.getMonth() + 1}`;
  return `${date.getFullYear()}-${startMonth}  至  ${date2.getFullYear()}-${endMonth}`;
};

const store = useSettingStore();

const chartColors = computed(() => store.chartColors);

// monitorChart
let monitorContainer: HTMLElement;
const monitorContainerParentRef = ref<HTMLElement>();
let monitorChart: echarts.ECharts;
const renderMonitorChart = () => {
  if (!monitorContainer) {
    monitorContainer = document.getElementById('monitorContainer');
    monitorContainerParentRef.value = monitorContainer.parentElement;
  }
  monitorChart = echarts.init(monitorContainer);
  monitorChart.setOption(getLineChartDataSet({ ...chartColors.value }));
};

useResizeObserver(monitorContainerParentRef, (entries) => {
  const entry = entries[0];
  monitorChart.resize({
    width: entry.contentRect.width,
    height: entry.contentRect.height,
    animation: {
      duration: 300,
      delay: 200,
    },
  });
});

onMounted(() => {
  renderMonitorChart();
});

onUnmounted(() => {
  [monitorChart].forEach((item) => {
    item.dispose();
  });
});

onDeactivated(() => {
  storeBrandThemeWatch();
});

const currentMonth = ref(getThisMonth());

const storeBrandThemeWatch = watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([monitorChart]);
  },
);

const onCurrencyChange = (checkedValues: string[]) => {
  currentMonth.value = getThisMonth(checkedValues);
  monitorChart.setOption(getLineChartDataSet({ dateTime: checkedValues, ...chartColors.value }));
};
</script>

<style lang="less" scoped></style>
