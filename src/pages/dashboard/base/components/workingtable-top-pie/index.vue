<template>
  <div>
    <t-card style="width: 100%; height: 400px">
      <div ref="chart" style="width: 80%; height: 300px"></div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
// import { api } from '@/api/main';
// import Mock from 'mockjs';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const option = ref({});
const chart = ref(null);

// Get current date
const currentDate = dayjs();

// Get the date 7 days ago
const sevenDaysAgo = currentDate.subtract(7, 'day');

//* 开始计算时间
const currentDateString = currentDate.format('YYYY-MM-DD');
//* 结束计算时间
const sevenDaysAgoDateString = sevenDaysAgo.format('YYYY-MM-DD');

onMounted(async () => {
  const myChart = echarts.init(chart.value);
  await getPieData();
  myChart.setOption(option.value);
});

//* 接口数据
const getPieData = async () => {
  try {
    // const response = await;  //todo  使用mock 将图表渲染
    // const response = await Mock.mock('/api/getPieData', 'get', {
    //   'list|5': [
    //     {
    //       'value|100-500': 100,
    //       'name|+1': ['类别1', '类别2', '类别3', '类别4', '类别5'],
    //     },
    //   ],
    // });
    option.value = {
      title: {
        text: `过程不良TOP5 (周 ${sevenDaysAgoDateString} ~ ${currentDateString})`,
        left: 'letf',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        right: 200,
        top: 100,
        bottom: 20,
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1360, name: 'Search Engine' },
            { value: 835, name: 'Direct' },
            { value: 510, name: 'Email' },
            { value: 584, name: 'Union Adss' },
            { value: 600, name: 'Video Ads' },
            { value: 300, name: 'Video Ad' },
          ],
          // data: response.list.map((item) => ({ value: item.value, name: item.name })),
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
    console.error('Error fetching pie chart data', error);
  }
};
</script>

<style scoped>
/* 可添加组件样式 */
</style>
