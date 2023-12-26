<template>
  <div>
    <t-card style="width: 50%; height: 400px">
      <div ref="chart" style="width: 80%; height: 300px"></div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const option = ref({});
const chart = ref({});
//* 所需数据
const responseData = [
  { value: 160, name: '外观划伤' },
  { value: 245, name: '功能不良' },
  { value: 180, name: '缺件' },
  { value: 584, name: '空焊' },
  { value: 600, name: '短路' },
  { value: 300, name: '其他' },
];

const currentDate = dayjs();
const sevenDaysAgo = currentDate.subtract(7, 'day');
const currentDateString = currentDate.format('YYYY-MM-DD');
const sevenDaysAgoDateString = sevenDaysAgo.format('YYYY-MM-DD');

onMounted(async () => {
  const myChart = echarts.init(chart.value);
  await getPieData();
  myChart.setOption(option.value);
});

// 模拟接口请求
// const getPieData = await api.xxx.ii();
const getPieData = async () => {
  try {
    option.value = {
      title: {
        text: `过程不良TOP5 (周 ${sevenDaysAgoDateString} ~ ${currentDateString})`,
        left: 'left',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        right: 35,
        top: 100,
        bottom: 10,
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: responseData,
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
</script>

<style scoped>
/* 可添加组件样式 */
</style>
