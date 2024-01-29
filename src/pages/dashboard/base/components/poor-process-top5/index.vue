<template>
  <cmp-card title="过程不良TOP5" :subtitle="currentMonth" :bordered="false" :full="true" height="100%">
    <div id="top5Chart" :style="{ width: '100%', height: '100%' }" />
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

import { api } from '@/api/control';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

echarts.use([TooltipComponent, LegendComponent, GridComponent, PieChart, CanvasRenderer, TitleComponent]);

const store = useSettingStore();
const optionChart = ref({});
const currentMonth = ref('');
// 监听图表
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

  // 获取当前时间
  const currentDate = new Date();

  // 获取 7 天前的时间
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0); // 设置为 0 点

  // 获取今天的时间
  const today = new Date();
  today.setHours(23, 59, 59, 999); // 设置为 23:59:59.999

  currentMonth.value = `${dayjs(sevenDaysAgo).format('YYYY-MM-DD')} ~ ${dayjs(today).format('YYYY-MM-DD')}`;
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
    const data = await api.wipRepair.getRepairTop5();

    // 过滤前5条数据
    const top5Data = data.slice(0, 5);

    if (top5Data.length === 0) {
      return;
    }
    // const echarData = top5Data.map((n) => ({ value: n.defectCodePercent * 100, name: n.defectName }));
    const echarData = top5Data.map(({ defectCodePercent, defectName }) => ({
      value: defectCodePercent * 100,
      name: defectName,
    }));

    optionChart.value = {
      legend: {
        orient: 'horizontal',
        bottom: 35,
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
            formatter: (param) => `${param.name} ${param.value} (${param.percent}%)`,
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
