<template>
  <div
    id="chartTop5Container"
    :style="{ width: `${resizeWidth * resizeMin}px`, height: `${resizeHeight * resizeMin}px`, margin: '0 auto' }"
  ></div>
</template>
<script lang="ts">
export default {
  name: 'WorkingTablePie',
};
</script>
<script setup lang="ts">
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { nextTick, onMounted, ref } from 'vue';

import { api } from '@/api/control';

const optionChart = ref({});
const resizeWidth = ref(1);
const resizeHeight = ref(1);
const resizeMin = ref(200);

let chartTop5Container: HTMLElement;
let chartTop5Chart: echarts.ECharts;

onMounted(async () => {
  if (!chartTop5Container) {
    chartTop5Container = document.getElementById('chartTop5Container');
  }

  chartTop5Chart = echarts.init(chartTop5Container);
  await getPieData();
  chartTop5Chart.setOption(optionChart.value);

  nextTick(() => {
    updateContainer();
  });
  window.addEventListener('resize', updateContainer, false);
});

const updateContainer = () => {
  resizeWidth.value = Number(
    ((chartTop5Container.parentElement.clientWidth - 50) / chartTop5Container.clientWidth).toFixed(2),
  );
  resizeHeight.value = Number(
    ((chartTop5Container.parentElement.clientHeight - 30) / chartTop5Container.clientHeight).toFixed(2),
  );
  chartTop5Chart.resize({
    width: Math.min(resizeWidth.value, resizeHeight.value) * resizeMin.value,
    height: Math.min(resizeWidth.value, resizeHeight.value) * resizeMin.value,
  });
};

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
            radius: '50%',
            label: {
              show: true,
              width: 200,
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
</script>

<style scoped>
/* 可添加组件样式 */
</style>
