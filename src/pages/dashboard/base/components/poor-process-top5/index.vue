<template>
  <div id="top5Chart" :style="{ width: '100%', height: '100%' }" />
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

    const first = top5Data[0];
    const echarData = top5Data.map((n) => ({ value: n.defectCodePercent * 100, name: n.defectName }));

    optionChart.value = {
      title: {
        text: `过程不良TOP5 (周 ${dayjs(first.beginDate).format('YYYY-MM-DD')} ~ ${dayjs(first.endDate).format(
          'YYYY-MM-DD',
        )})`,
        left: 'center',
        textStyle: {
          fontSize: 15,
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
