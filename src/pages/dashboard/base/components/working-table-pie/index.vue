<template>
  <div>
    <t-card style="width: 100%; height: 100%">
      <div ref="chart" style="width: 500px; height: 500px"></div>
    </t-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'WorkingTablePie',
};
</script>
<script setup lang="ts">
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

import { api } from '@/api/control';

const option = ref({});
const chart = ref(null);

onMounted(async () => {
  const myChart = echarts.init(chart.value);
  await getPieData();
  myChart.setOption(option.value);
});

//* 接口数据
const getPieData = async () => {
  try {
    const data = await api.wipRepair.getRepairTop5();
    if (data.length > 0) {
      const first = data[0];
      const echarData = [];

      data.forEach((n) => echarData.push({ value: n.defectCodePercent * 100, name: n.defectName }));

      option.value = {
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
