<template>
  <div id="andeng" :style="{ width: '100%', height: '100%' }" />
</template>

<script setup lang="ts">
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
      title: {
        text: '本月',
        left: 'left',
        top: '-3',
        textStyle: {
          fontSize: 11.5,
          fontWite: 400,
          color: '#666666',
          fontWeight: 'normal',
        },
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 150,
        bottom: 20,
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '90%',
          top: '30',
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
