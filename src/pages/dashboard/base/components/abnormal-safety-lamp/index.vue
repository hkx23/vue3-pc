<!-- 安灯异常模块分布 -->
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
    // 获取饼图数据
    const data = await api.incidentDeal.getIncidentModuleProportion();
    console.log('🚀 ~ getPieData ~ data:', data);

    // 转换数据格式
    const echarData = data.map(({ incidentModuleNum, incidentModuleName }) => ({
      value: incidentModuleNum * 100,
      name: incidentModuleName,
    }));

    // 更新图表选项
    // optionChart.value = {
    //   legend: {
    //     orient: 'horizontal',
    //     bottom: 35,
    //   },
    //   tooltip: {
    //     trigger: 'item',
    //   },
    //   series: [
    //     {
    //       type: 'pie',
    //       radius: '50%',
    //       center: ['50%', '35%'],
    //       label: {
    //         show: true,
    //         formatter: (param) => `${param.name} (${param.percent}%)`,
    //       },
    //       data: echarData,
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)',
    //         },
    //       },
    //     },
    //   ],
    // };
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
            formatter: (param) => {
              const quantityText = `${param.value / 100}`;
              // (${param.percent}%) 百分百
              const labelContent = `${param.name} ${quantityText}`;
              return `${labelContent}`;
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
  } catch (error) {
    // 处理错误
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
