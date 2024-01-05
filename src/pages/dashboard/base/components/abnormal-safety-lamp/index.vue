<template>
  <cmp-card title="安灯异常模块分布" :subtitle="currentMonth" :bordered="false" :full="true" height="100%">
    <div id="andeng" :style="{ width: '100%', height: '100%' }" />
  </cmp-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash';
import { onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/daily';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

echarts.use([TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer, TitleComponent]);

const currentMonth = ref('');

const store = useSettingStore();
const optionChart = ref({});

// 监听图表
let andeng: HTMLElement;
const countContainerParentRef = ref<HTMLElement>();
let countChart: echarts.ECharts;
const renderCountChart = async () => {
  if (!andeng) {
    andeng = document.getElementById('andeng');
    countContainerParentRef.value = andeng.parentElement;
  }
  countChart = echarts.init(andeng);

  await getPieData();
  countChart.setOption(optionChart.value);

  // 获取当前日期
  const currentDate = dayjs();

  // 获取当前月的1日时间
  const firstDayOfMonth = currentDate.startOf('month');

  currentMonth.value = `${dayjs(firstDayOfMonth).format('YYYY-MM-DD')} ~ ${dayjs(currentDate).format('YYYY-MM-DD')}`;
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

//* 接口数据
const getPieData = async () => {
  try {
    const data = await api.incidentDeal.getIncidentModuleProportion();
    const echarData = data.map((n) => ({ value: n.incidentModuleProportion * 100, name: n.incidentModuleName }));

    optionChart.value = {
      legend: {
        orient: 'horizontal',
        bottom: -6,
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          label: {
            show: true,
            formatter: (param) => `${param.name} (${param.percent}%)`,
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
  } catch (error) {
    console.error('获取饼图数据时出错', error);
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
