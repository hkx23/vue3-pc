login: administrator password: 123456 货区 district 仓库编码： 货区编码/名称 districtCode/Name
货区编码：货区表货区字段； 货区名称：货区表货区名称字段； 货区描述：货区表货区描述字段； 仓库编码：货区表仓库编码字段；
仓库名称：货区表仓库名称字段； 状态：货区表状态字段； 修改人：记录最后一次更新操作的用户名；
修改时间：记录最后一次更新操作的时间； 操作：操作列两个编辑和删除按钮，针对当前行进行编辑或者删除操作。
cmp-containercmp-card 布局， cmp-query 做查询， cmp-table 做表格 ---响应 creator： datetimeUpload： eid： erpWarehouse：
id： isEnableLocation: isEnableUpload: modifier: oid: state: timeCreate: timeModified: warehouseAttribute:
warehouseCategory: warehouseCode: 仓库编码 warehouseDesc：仓库描述 warehouseName：仓库名称 null locationDesc 货位
creator districtCode 货区编码 districtId 货区id districtName 货区名称 eid eid id id locationCode 货位编码 locationDesc
货位描述 locationName 货位名称 modifier 修改人 modifierName oid state 状态 timeCreate timeModified warehouseCode
warehouseId warehouseName option = { title: { text: '过程不良TOP5 （周 当天-7~当天）', left: 'letf' }, tooltip: {
trigger: 'item' }, // legend: { // orient: 'vertical', // left: 'left' // }, legend: { orient: 'vertical', right: 100,
top: 250, bottom: 20, }, series: [ { name: 'Access From', type: 'pie', radius: '50%', data: [ { value: 1048, name:
'Search Engine' }, { value: 735, name: 'Direct' }, { value: 580, name: 'Email' }, { value: 484, name: 'Union Adss' }, {
value: 300, name: 'Video Ads' }, { value: 300, name: 'Video Ad' } ], emphasis: { itemStyle: { shadowBlur: 10,
shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } } } ] };

<template>
  <div>
    <t-card style="width: 100%; height: 400px">
      <div ref="chart" style="width: 80%; height: 300px"></div>
    </t-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'WorkingTablePie',
};
</script>
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
