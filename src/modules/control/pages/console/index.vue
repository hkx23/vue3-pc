<template>
  <cmp-container :full="true">
    <bcmp-equipment-info />
    <cmp-card :full="false" class="header">
      <div class="content">
        <t-space>
          <t-tag theme="primary" size="large">当班产量:180</t-tag>
          <t-tag theme="primary" size="large">
            <span style="padding-right: var(--td-comp-paddingLR-m)">未匹配产量:{{ matchNumber }}</span>
            <t-button variant="outline" theme="primary" size="small">匹配</t-button>
          </t-tag>
          <t-button variant="outline" theme="primary" :disabled="isStart" @click="clearMatch">清除匹配数</t-button>
        </t-space>
        <t-space>
          <t-button variant="outline" theme="primary">成品下线</t-button>
          <t-button variant="outline" theme="primary">工单叫料</t-button>
        </t-space>
      </div>
    </cmp-card>
    <cmp-row height="calc(100% - 100px)">
      <cmp-card flex="auto" :ghost="true">
        <cmp-container :full="true">
          <cmp-card :full="false" style="min-height: auto; overflow: auto">
            <cmp-table
              row-key="index"
              size="small"
              :table-column="planColumn"
              :table-data="planList"
              :loading="planLoading"
              :show-pagination="false"
            >
              <template #title>
                <div>{{ t('console.todayPlan') }}</div>
              </template>
              <template #progress="{ row }">
                <div>报工:{{ row.reportCount }}/{{ row.reportTotal }}</div>
                <div>投料:{{ row.pickCount }}/{{ row.pickTotal }}</div>
              </template>
            </cmp-table>
            <t-divider align="left">当前加工产品信息</t-divider>
            <t-descriptions :column="3" colon>
              <t-descriptions-item label="排产单号">M0001</t-descriptions-item>
              <t-descriptions-item label="产品编码">HAD-531/532</t-descriptions-item>
              <t-descriptions-item label="产品名称">左右后轮罩内板本体</t-descriptions-item>
              <t-descriptions-item label="排产日期">2024-05-21 08:30</t-descriptions-item>
              <t-descriptions-item label="排产数量">250</t-descriptions-item>
              <t-descriptions-item label="完工数量">129</t-descriptions-item>
              <t-descriptions-item label="作业员工">张三</t-descriptions-item>
              <t-descriptions-item label="当前班次">晚班</t-descriptions-item>
              <t-descriptions-item label="加工机台">折弯机01</t-descriptions-item>
            </t-descriptions>
            <t-divider align="left">工艺卡</t-divider>
            <t-tabs v-model="processCardSelected">
              <t-tab-panel :value="1" label="基础信息">
                <t-space break-line>
                  <process-card v-for="(list, index) in processCardGroup" :key="index" :list="list"></process-card>
                </t-space>
              </t-tab-panel>
              <t-tab-panel :value="2" label="压力参数">
                <t-space break-line>
                  <process-card v-for="(list, index) in processCardGroup" :key="index" :list="list"></process-card>
                </t-space>
              </t-tab-panel>
            </t-tabs>
          </cmp-card>
          <cmp-card :full="false" style="min-height: auto">
            <t-space class="footer">
              <div class="btn deep_blue">
                <file-pdf-icon />
                <div class="title">ESOP</div>
              </div>
              <div class="btn blue" @click="reportVisible = true">
                <adjustment-icon />
                <div class="title">报工调整</div>
              </div>
              <div class="btn green">
                <delete-icon />
                <div class="title">工单报废</div>
              </div>
              <div class="btn blue">
                <error-triangle-icon />
                <div class="title">不良品采集</div>
              </div>
              <!-- <div class="btn green">
                <cart-icon />
                <div class="title">投料/退料</div>
              </div> -->
              <div v-if="isStart" class="btn green" @click="stop">
                <stop-circle-icon />
                <div class="title">结束</div>
              </div>
              <div v-else class="btn green" @click="start">
                <play-circle-icon />
                <div class="title">开始</div>
              </div>
              <div class="btn blue" @click="moSwitchVisible = true">
                <task-icon />
                <div class="title">切换任务</div>
              </div>
              <!-- <div class="btn blue">
                <notification-icon />
                <div class="title">Andon</div>
              </div> -->
              <div class="btn green" @click="mouldVisible = true">
                <system-code-icon />
                <div class="title">模具上下机</div>
              </div>
              <div class="btn deep_blue" @click="equipStatusVisible = true">
                <system-setting-icon />
                <div class="title">设备状态</div>
              </div>
            </t-space>
          </cmp-card>
        </cmp-container>
      </cmp-card>
      <cmp-card flex="300px" :ghost="true">
        <cmp-container :full="true">
          <cmp-card>
            <cmp-message v-model="msgList"></cmp-message>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
    <report-dialog v-model="reportVisible"></report-dialog>
    <mo-switch-dialog v-model="moSwitchVisible"></mo-switch-dialog>
    <mould-dialog v-model="mouldVisible"></mould-dialog>
    <equip-status-dialog v-model="equipStatusVisible"></equip-status-dialog>
  </cmp-container>
</template>

<script setup lang="ts">
import {
  AdjustmentIcon,
  DeleteIcon,
  ErrorTriangleIcon,
  FilePdfIcon,
  PlayCircleIcon,
  StopCircleIcon,
  SystemCodeIcon,
  SystemSettingIcon,
  TaskIcon,
} from 'tdesign-icons-vue-next';
import { onMounted, ref } from 'vue';

import BcmpEquipmentInfo from '@/components/bcmp-equipment-info/index.vue';

import equipStatusDialog from './equipStatusDialog.vue';
import { useLang } from './lang';
import moSwitchDialog from './moSwitchDialog.vue';
import mouldDialog from './mouldDialog.vue';
import ProcessCard from './processCard.vue';
import ReportDialog from './reportDialog.vue';

// 使用多语言
const { t } = useLang();

const matchNumber = ref(144);
const clearMatch = () => {
  matchNumber.value = 0;
};
const planLoading = ref(false);
const planColumn = [
  { colKey: 'serial-number', title: t('business.main.serialNumber'), width: 60, align: 'center' },
  { colKey: 'taskNumber', title: t('console.taskNumber'), width: 100, align: 'center' },
  { colKey: 'planStartTime', title: t('console.planStartTime'), width: 100, align: 'center' },
  { colKey: 'productCode', title: t('business.control.productCode'), width: 100, align: 'center' },
  { colKey: 'productDesc', title: t('business.control.productDesc'), width: 100, align: 'center' },
  { colKey: 'productModel', title: t('console.productModel'), width: 100, align: 'center' },
  { colKey: 'progress', title: t('console.progress'), width: 100, align: 'center' },
  { colKey: 'uom', title: t('console.uom'), width: 100, align: 'center' },
];
const planList = ref([]);
const getTodayPlan = () => {
  // 获取当天计划，静态数据
  planList.value.push({
    taskNumber: 'MO-GC031（任务01）',
    planStartTime: '2024-05-20 08:00:00',
    productCode: '123232345',
    productDesc: '左右后轮置',
    productModel: '江系',
    reportCount: 250,
    reportTotal: 250,
    pickCount: 250,
    pickTotal: 250,
    uom: 'PCS ',
  });
  planList.value.push({
    taskNumber: 'MO-GC031（任务02）',
    planStartTime: '2024-05-20 12:00:00',
    productCode: '123232345',
    productDesc: '江淮车架R-01',
    productModel: '江系',
    reportCount: 0,
    reportTotal: 250,
    pickCount: 0,
    pickTotal: 250,
    uom: 'PCS ',
  });
};

const processCardSelected = ref(1);
const processCardGroup = ref([]);
const getProcessCardGroup = () => {
  // 获取工艺卡列表，静态数据
  processCardGroup.value.push([
    {
      title: '折弯速度',
      max: 10,
      min: 1,
    },
    {
      title: '折弯力',
      max: 10,
      min: 1,
    },
    {
      title: '板宽',
      max: 10,
      min: 1,
    },
  ]);
  processCardGroup.value.push([
    {
      title: '保压时间',
      max: 10,
      min: 1,
    },
    {
      title: '压力',
      max: 10,
      min: 1,
    },
    {
      title: '板厚',
      max: 10,
      min: 1,
    },
  ]);
  processCardGroup.value.push([
    {
      title: '保压时间',
      max: 10,
      min: 1,
    },
    {
      title: '压力',
      max: 10,
      min: 1,
    },
  ]);
};

// 消息
const msgList = ref<
  {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[]
>([]);

// 报工&调整
const reportVisible = ref(false);
// 开始/结束
const isStart = ref(false);
const start = () => {
  isStart.value = true;
};
const stop = () => {
  isStart.value = false;
};
// 工单切换
const moSwitchVisible = ref(false);
// 模具上下机
const mouldVisible = ref(false);
// 设备状态
const equipStatusVisible = ref(false);

onMounted(() => {
  getTodayPlan();
  getProcessCardGroup();
});
</script>

<style lang="less" scoped>
.header {
  min-height: auto;

  .content {
    display: flex;
    justify-content: space-between;
  }
}

.footer {
  .btn {
    height: 67px;
    width: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    border-radius: 5px;

    svg {
      font-size: 30px;
    }

    .title {
      font-size: 12px;
    }

    &.deep_blue {
      background-color: #5b9ef9;
    }

    &.blue {
      background-color: #43baff;
    }

    &.green {
      background-color: #4dba85;
    }
  }
}
</style>
