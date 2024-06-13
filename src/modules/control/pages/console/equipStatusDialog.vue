<template>
  <t-dialog v-model:visible="visible" header="设备状态" width="60%" :footer="false" prevent-scroll-through>
    <t-descriptions :column="2" colon>
      <t-descriptions-item label="机台编码">BU1-ZW-1001</t-descriptions-item>
      <t-descriptions-item label="机台描述">亚威数控折弯机01</t-descriptions-item>
    </t-descriptions>
    <t-divider>设备OEE</t-divider>
    <t-row>
      <t-col :flex="1">
        <div id="oee" class="chart"></div>
      </t-col>
      <t-col :flex="1">
        <div id="timeRate" class="chart"></div>
      </t-col>
      <t-col :flex="1">
        <div id="performanceRate" class="chart"></div>
      </t-col>
      <t-col :flex="1">
        <div id="passRate" class="chart"></div>
      </t-col>
    </t-row>
    <div class="status">
      <t-space align="center">
        <div>设备运行状态：</div>
        <t-tag size="large" variant="light-outline"><system-code-icon />正常运行</t-tag>
        <t-tag size="large" variant="light-outline" theme="primary"><system-setting-icon />维修保养</t-tag>
        <t-tag size="large" variant="light-outline"><system-blocked-icon />停机闲置</t-tag>
      </t-space>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import { GaugeChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { SystemBlockedIcon, SystemCodeIcon, SystemSettingIcon } from 'tdesign-icons-vue-next';
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';

echarts.use([TitleComponent, GaugeChart, CanvasRenderer]);

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
watch(visible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      oeeChart?.resize();
      timeRateChart?.resize();
      performanceRateChart?.resize();
      passRateChart?.resize();
    });
  }
});

let oeeChart: echarts.ECharts;
let timeRateChart: echarts.ECharts;
let performanceRateChart: echarts.ECharts;
let passRateChart: echarts.ECharts;
const initOee = () => {
  oeeChart = echarts.init(document.getElementById('oee'));
  oeeChart.setOption({
    title: {
      text: '设备综合效率OEE',
      textStyle: {
        fontSize: 15,
      },
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#a7e4a2',
              },
              {
                offset: 1,
                color: '#0482e5',
              },
            ],
          },
          shadowColor: 'rgba(4,130,229,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          width: 15,
        },
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, 0],
          formatter: '{value}%',
        },
        data: [
          {
            value: 82.5,
          },
        ],
      },
    ],
  });
};
const initTimeRate = () => {
  timeRateChart = echarts.init(document.getElementById('timeRate'));
  timeRateChart.setOption({
    title: {
      text: '时间开动率',
      textStyle: {
        fontSize: 15,
      },
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        itemStyle: {
          color: '#0482e5',
          shadowColor: 'rgba(4,130,229,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          width: 15,
        },
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, 0],
          formatter: '{value}%',
        },
        data: [
          {
            value: 95,
          },
        ],
      },
    ],
  });
};
const initPerformanceRate = () => {
  performanceRateChart = echarts.init(document.getElementById('performanceRate'));
  performanceRateChart.setOption({
    title: {
      text: '性能开动率',
      textStyle: {
        fontSize: 15,
      },
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        itemStyle: {
          color: '#0482e5',
          shadowColor: 'rgba(4,130,229,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          width: 15,
        },
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, 0],
          formatter: '{value}%',
        },
        data: [
          {
            value: 90,
          },
        ],
      },
    ],
  });
};
const initPassRateChart = () => {
  passRateChart = echarts.init(document.getElementById('passRate'));
  passRateChart.setOption({
    title: {
      text: '合格率',
      textStyle: {
        fontSize: 15,
      },
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#a7e4a2',
              },
              {
                offset: 1,
                color: '#0482e5',
              },
            ],
          },
          shadowColor: 'rgba(4,130,229,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          width: 15,
        },
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, 0],
          formatter: '{value}%',
        },
        data: [
          {
            value: 97.2,
          },
        ],
      },
    ],
  });
};

onMounted(() => {
  initOee();
  initTimeRate();
  initPerformanceRate();
  initPassRateChart();
});
onUnmounted(() => {
  oeeChart.dispose();
  timeRateChart.dispose();
  performanceRateChart.dispose();
  passRateChart.dispose();
});
</script>

<style lang="less" scoped>
.chart {
  height: 200px;
}

.status {
  text-align: center;
}
</style>
