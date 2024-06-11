<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="250px">
        <t-tabs v-model="tagValue" @change="switchTab">
          <t-tab-panel :value="0" label="电" :destroy-on-hide="false">
            <template #panel>
              <t-tree
                ref="treeTab0Ref"
                :data="treeTab0Data"
                :keys="treeTab0Keys"
                hover
                :expand-on-click-node="false"
                :activable="true"
                :expand-all="true"
              />
            </template>
          </t-tab-panel>
          <t-tab-panel :value="1" label="天然气" :destroy-on-hide="false">
            <template #panel>
              <t-tree
                ref="treeTab1Ref"
                :data="treeTab1Data"
                :keys="treeTab1Keys"
                hover
                :expand-on-click-node="false"
                :activable="true"
                :expand-all="true"
              />
            </template>
          </t-tab-panel>
          <t-tab-panel :value="2" label="水" :destroy-on-hide="false">
            <template #panel>
              <t-tree
                ref="treeTab2Ref"
                :data="treeTab2Data"
                :keys="treeTab2Keys"
                hover
                :expand-on-click-node="false"
                :activable="true"
                :expand-all="true"
              />
            </template>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card flex="auto" :ghost="true">
        <cmp-container :full="true" :full-sub-index="[1, 0]">
          <cmp-card :title="currentTitle" :bordered="false" :full="true" height="100%">
            <div id="achievementRate" :style="{ width: '100%', height: '100%' }" />
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>
<script setup lang="ts">
import { BarChart, PieChart } from 'echarts/charts';
import { DatasetComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import _, { debounce } from 'lodash';
import { onMounted, onUnmounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

const tagValue = ref(0);
const currentTitle = ref('');
const switchTab = async (selectedTabIndex: any) => {
  if (selectedTabIndex === 0) {
    currentTitle.value = '用电量信息';
    await fetchTreeTableTab0();
  } else if (selectedTabIndex === 1) {
    currentTitle.value = '用天然气量信息';
    await fetchTreeTableTab1();
  } else if (selectedTabIndex === 2) {
    currentTitle.value = '用水量信息';
    await fetchTreeTableTab2();
  }
  renderCountChart();
};

onMounted(async () => {
  currentTitle.value = '用电量信息';
  await fetchTreeTableTab0();
  await renderCountChart();
});

// # 树
const treeTab0Ref = ref();
const treeTab0Keys = { value: 'orgCode', label: 'orgName', key: 'id' };
const treeTab0Data = ref([]);

const treeTab1Ref = ref();
const treeTab1Keys = { value: 'orgCode', label: 'orgName', key: 'id' };
const treeTab1Data = ref([]);

const treeTab2Ref = ref();
const treeTab2Keys = { value: 'orgCode', label: 'orgName', key: 'id' };
const treeTab2Data = ref([]);

const fetchTreeTableTab0 = async () => {
  try {
    // const data = await apiDaily.checklistOrg.getWorkShopAndWorkcenterTree();
    const data = {
      list: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  creator: null,
                  eid: null,
                  id: '001001001001',
                  isActive: null,
                  levelCode: 'LINE',
                  modifier: null,
                  oid: null,
                  orgCode: '研发楼-001001001001',
                  orgDesc: null,
                  orgId: '1734874731502395394',
                  orgName: '研发楼',
                  orgPath: null,
                  parentOrgId: null,
                  state: null,
                  timeCreate: null,
                  timeModified: null,
                  workcenterId: '1732285084557381634',
                },
              ],
              creator: null,
              eid: null,
              id: '001001001',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '研发楼-001001001',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '研发楼',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001002',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '设备-001001002',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '设备',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001003',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '动力-001001003',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '动力',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001004',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: 'CUB-001001004',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: 'CUB',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
          ],
          creator: null,
          eid: null,
          id: '001001',
          isActive: null,
          levelCode: 'LINE',
          modifier: null,
          oid: null,
          orgCode: 't2长区总用电-001001',
          orgDesc: null,
          orgId: '1734874731502395394',
          orgName: 't2长区总用电',
          orgPath: null,
          parentOrgId: null,
          state: null,
          timeCreate: null,
          timeModified: null,
          workcenterId: '1739886725355900930',
        },
      ],
      total: 9,
    };

    treeTab0Data.value = data.list;
  } catch (e) {
    console.log(e);
  }
};
const fetchTreeTableTab1 = async () => {
  try {
    // const data = await apiDaily.checklistOrg.getWorkShopAndWorkcenterTree();
    const data = {
      list: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  creator: null,
                  eid: null,
                  id: '001001001001',
                  isActive: null,
                  levelCode: 'LINE',
                  modifier: null,
                  oid: null,
                  orgCode: '研发楼-001001001001',
                  orgDesc: null,
                  orgId: '1734874731502395394',
                  orgName: '研发楼',
                  orgPath: null,
                  parentOrgId: null,
                  state: null,
                  timeCreate: null,
                  timeModified: null,
                  workcenterId: '1732285084557381634',
                },
              ],
              creator: null,
              eid: null,
              id: '001001001',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '研发楼-001001001',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '研发楼',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001002',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '设备-001001002',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '设备',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001003',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '动力-001001003',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '动力',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001004',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: 'CUB-001001004',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: 'CUB',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
          ],
          creator: null,
          eid: null,
          id: '001001',
          isActive: null,
          levelCode: 'LINE',
          modifier: null,
          oid: null,
          orgCode: 't2长区总天然气-001001',
          orgDesc: null,
          orgId: '1734874731502395394',
          orgName: 't2长区总天然气',
          orgPath: null,
          parentOrgId: null,
          state: null,
          timeCreate: null,
          timeModified: null,
          workcenterId: '1739886725355900930',
        },
      ],
      total: 9,
    };

    treeTab1Data.value = data.list;
  } catch (e) {
    console.log(e);
  }
};
const fetchTreeTableTab2 = async () => {
  try {
    // const data = await apiDaily.checklistOrg.getWorkShopAndWorkcenterTree();
    const data = {
      list: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  creator: null,
                  eid: null,
                  id: '001001001001',
                  isActive: null,
                  levelCode: 'LINE',
                  modifier: null,
                  oid: null,
                  orgCode: '研发楼-001001001001',
                  orgDesc: null,
                  orgId: '1734874731502395394',
                  orgName: '研发楼',
                  orgPath: null,
                  parentOrgId: null,
                  state: null,
                  timeCreate: null,
                  timeModified: null,
                  workcenterId: '1732285084557381634',
                },
              ],
              creator: null,
              eid: null,
              id: '001001001',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '研发楼-001001001',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '研发楼',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001002',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '设备-001001002',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '设备',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001003',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: '动力-001001003',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: '动力',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
            {
              children: [],
              creator: null,
              eid: null,
              id: '001001004',
              isActive: null,
              levelCode: 'LINE',
              modifier: null,
              oid: null,
              orgCode: 'CUB-001001004',
              orgDesc: null,
              orgId: '1734874731502395394',
              orgName: 'CUB',
              orgPath: null,
              parentOrgId: null,
              state: null,
              timeCreate: null,
              timeModified: null,
              workcenterId: '1732285084557381634',
            },
          ],
          creator: null,
          eid: null,
          id: '001001',
          isActive: null,
          levelCode: 'LINE',
          modifier: null,
          oid: null,
          orgCode: 't2长区总天然气-001001',
          orgDesc: null,
          orgId: '1734874731502395394',
          orgName: 't2长区总天然气',
          orgPath: null,
          parentOrgId: null,
          state: null,
          timeCreate: null,
          timeModified: null,
          workcenterId: '1739886725355900930',
        },
      ],
      total: 9,
    };

    treeTab2Data.value = data.list;
  } catch (e) {
    console.log(e);
  }
};
// 图表
echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  BarChart,
  CanvasRenderer,
  TitleComponent,
  DatasetComponent,
]);

const optionChart = ref({});

let achievementRate: HTMLElement | null;
const countContainerParentRef = ref<HTMLElement | null>(null); // 将 countContainerParentRef 初始化为 null
let countChart: echarts.ECharts;

const renderCountChart = async () => {
  if (!achievementRate) {
    achievementRate = document.getElementById('achievementRate');
    if (achievementRate) {
      countContainerParentRef.value = achievementRate.parentElement;
    } else {
      console.error("找不到id为'achievementRate'的元素");
      return;
    }
  }

  if (!countContainerParentRef.value || countContainerParentRef.value.clientHeight === 0) {
    // 等待下一帧再尝试初始化，确保 DOM 已经渲染完成并具有有效的宽度和高度
    requestAnimationFrame(() => renderCountChart());
    return;
  }

  countChart = echarts.init(achievementRate as HTMLElement);

  if (tagValue.value === 0) {
    await getDataTab0();
  } else if (tagValue.value === 1) {
    await getDataTab1();
  } else if (tagValue.value === 2) {
    await getDataTab2();
  }
  countChart.setOption(optionChart.value);
};

useResizeObserver(
  countContainerParentRef,
  debounce((entries) => {
    const entry = entries[0];
    if (entry.contentRect.width !== 0 && entry.contentRect.height !== 0) {
      countChart.resize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        animation: {
          duration: 300,
        },
      });
    }
  }, 600),
);

onUnmounted(() => {
  countChart.dispose();
});

const getDataTab0 = async () => {
  // const data = await api.wip.getAchievingRate();
  // const echarData = data.map((n) => ({ value: n.achievingRateOfToday * 100, name: n.mitemName }));
  // optionChart.value = {
  //   dataset: [
  //     {
  //       dimensions: ['name', 'value'],
  //       source: echarData,
  //     },
  //     {
  //       transform: {
  //         type: 'sort',
  //         config: { dimension: 'value', order: 'desc' },
  //       },
  //     },
  //   ],
  //   xAxis: {
  //     type: 'category',
  //     axisLabel: { interval: 0, rotate: 30 },
  //     axisTick: {
  //       show: false,
  //     },
  //   },
  //   yAxis: {
  //     type: 'value',
  //     axisLabel: {
  //       formatter: '{value}%',
  //     },
  //   },
  //   series: [
  //     {
  //       type: 'bar',
  //       barWidth: 20,
  //       encode: { x: 'name', y: 'value' },
  //       itemStyle: {
  //         color() {
  //           return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
  //             Math.random() * 255,
  //           )}, 0.7)`;
  //         },
  //       },
  //     },
  //   ],
  // };
  const lineValue = [11824841, 3863625, 3681968, 283556, 201779, 0];
  optionChart.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['设备', '研发楼', 'CUB', 'T2废水站', 'RD线', '动力'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: 'kWh(千瓦时)',
        type: 'value',
        axisLabel: {
          formatter: (value) => `${value / 1000 / 10000} 千万`,
        },
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: lineValue,
      },
    ],
  };
};
const getDataTab1 = async () => {
  const lineValue = [203, 409, 137, 234, 22, 0];
  optionChart.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['设备', '研发楼', 'CUB', 'T2废水站', 'RD线', '动力'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: 'm³(立方米)',
        type: 'value',
        axisLabel: {
          formatter: (value) => `${value}`,
        },
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: lineValue,
      },
    ],
  };
};
const getDataTab2 = async () => {
  const lineValue = [80, 90, 137, 23, 289, 0];
  optionChart.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['设备', '研发楼', 'CUB', 'T2废水站', 'RD线', '动力'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        name: 't(吨)',
        type: 'value',
        axisLabel: {
          formatter: (value) => `${value}`,
        },
      },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: lineValue,
      },
    ],
  };
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
