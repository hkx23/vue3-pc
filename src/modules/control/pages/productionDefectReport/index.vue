<!-- 生产缺陷不良统计报表 -->
<template>
  <cmp-container :full="true">
    <!-- 查询 -->
    <cmp-card :span="12">
      <cmp-query :opts="opts" :is-reset-query="false" @reset="onReset" @submit="onInput"> </cmp-query>
    </cmp-card>
    <!-- 页签栏 -->
    <cmp-card :span="12">
      <t-tabs v-model="activeTab">
        <!-- 页签栏1 -->
        <t-tab-panel value="tab1" label="不良明细" :destroy-on-hide="true">
          <cmp-table
            ref="tableRef"
            v-model:pagination="pageUI"
            row-key="moId"
            :table-column="columnsProduceReport1"
            :table-data="Data1"
            :total="total1"
            @refresh="onRefresh"
          >
            <template #title>
              {{ '不良明细' }}
            </template>
            <!-- TODO -->
            <template #op="slotProps">
              <div style="width: 200px">
                <t-progress theme="plump" :percentage="slotProps.row.completionProgress" />
              </div>
            </template>
            <template #completedNum="{ row }">
              <div>{{ row.completedNum }}</div>
            </template>
          </cmp-table>
        </t-tab-panel>
        <!-- 页签栏2 -->
        <t-tab-panel value="tab2" label="不良汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="moId"
              :table-column="columnsProduceReport2"
              :table-data="Data2"
              :total="total2"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '不良汇总' }}
              </template>
              <template #completedNum="{ row }">
                <div>{{ row.completedNum }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏3 -->
        <t-tab-panel value="tab3" label="缺陷原因汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="moId"
              :table-column="columnsProduceReport3"
              :table-data="Data3"
              :total="total3"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '缺陷原因汇总' }}
              </template>
              <template #completedNum="{ row }">
                <div>{{ row.completedNum }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏4 -->
        <t-tab-panel value="tab4" label="维修方法汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="moId"
              :table-column="columnsProduceReport4"
              :table-data="Data4"
              :total="total4"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '维修方法汇总' }}
              </template>
              <template #completedNum="{ row }">
                <div>{{ row.completedNum }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏5 -->
        <t-tab-panel value="tab5" label="责任汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="moId"
              :table-column="columnsProduceReport5"
              :table-data="Data5"
              :total="total5"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '责任汇总' }}
              </template>
              <template #completedNum="{ row }">
                <div>{{ row.completedNum }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="tsx">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

// import { api } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
// const { pageUI: workPageUI } = usePage();
// const { pageUI: productPageUI } = usePage();
const activeTab = ref('tab1');

// 表格实例
const tableRef = ref(null);
const columnsData = ref([]);
// 页面1数据
const columnsProduceReport1 = computed(() => {
  return [
    {
      colKey: 'moCode',
      title: '车间',
      width: 110,
    },
    {
      colKey: 'mitemCode',
      title: '产线',
      width: 110,
    },
    {
      colKey: 'moClass',
      title: '产品条码',
      width: 130,
    },

    {
      colKey: 'planQty',
      title: '排产单',
      width: 100,
    },
    {
      colKey: 'SUMWip',
      title: '产品编码',
      width: 100,
    },

    {
      colKey: 'completedNum',
      title: '产品名称',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷描述',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '不合格数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '录入人',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '录入时间',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '工站',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷原因',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '维修方法',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '责任',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '维修人',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '维修时间',
      width: 100,
    },
  ];
});
// 页面2数据
const columnsProduceReport2 = computed(() => {
  return [
    {
      colKey: 'moCode',
      title: '时间',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'moClass',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'workshopName',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'planQty',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'SUMWip',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'completedNum',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '工序',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷描述',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷总数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '实际产量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '合格数量',
      width: 100,
    },
    {
      colKey: 'op',
      title: '良率',
      width: 100,
    },
  ];
});

// 页面3数据
const columnsProduceReport3 = computed(() => {
  return [
    {
      colKey: 'moCode',
      title: '时间',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'moClass',
      title: '产线',
      width: 130,
    },
    {
      colKey: 'workshopName',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'planQty',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'SUMWip',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'completedNum',
      title: '产品描述',
      width: 100,
    },

    {
      colKey: 'completedNum',
      title: '缺陷原因',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷总数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷原因数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '缺陷原因总数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '占比',
      width: 100,
    },
  ];
});

// 页面4数据
const columnsProduceReport4 = computed(() => {
  return [
    {
      colKey: 'moCode',
      title: '时间',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'moClass',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'workshopName',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'planQty',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'SUMWip',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'completedNum',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '维修方法',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '维修数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '维修总数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '占比',
      width: 100,
    },
  ];
});
// 页面5数据
const columnsProduceReport5 = computed(() => {
  return [
    {
      colKey: 'moCode',
      title: '时间',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'moClass',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'workshopName',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'planQty',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'SUMWip',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'completedNum',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '责任',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '总数量',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '占比',
      width: 100,
    },
  ];
});
// 初始渲染
// onMounted(async () => {
// });

// 表格1-5数据 字段
const Data1 = ref([]);
const Data2 = ref([]);
const Data3 = ref([]);
const Data4 = ref([]);
const Data5 = ref([]);

const total1 = ref(0);
const total2 = ref(0);
const total3 = ref(0);
const total4 = ref(0);
const total5 = ref(0);
// const Data = ref({
//   pageNum: 1,
//   pageSize: 10,
//   mitemId: '', // 产品编码
//   workshopId: '', // 车间
//   moId: '', // 工单
//   processingDateStart: '', // 开始时间
//   processingDateEnd: '', // 结束时间
// });

const onRefresh = async () => {
  MessagePlugin.success('重置成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    workshop: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    productCode: {
      label: '产线',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'line',
        showTitle: false,
      },
    },
    workOrder: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    workOrderOM: {
      label: '产品条码/OM',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    workOrderwl: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    workOrderqx: {
      label: '缺陷名称',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    servicingTime: {
      label: '计划生产日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',

      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      eventHandle: {
        blur: dateChange,
      },
    },
  };
});
// 查询
const onInput = async () => {
  pageUI.value.page = 1;
};

const onReset = async () => {
  columnsData.value = [];
  total1.value = 0;
  MessagePlugin.success('重置成功');
};
/** 日期范围 辅助函数
 */
const dateChange = (data: any) => {
  // 获取当前选择的日期范围
  const selectedDateRange = data.value;
  // 将日期字符串转换为dayjs对象
  const startDate = dayjs(selectedDateRange[0]);
  const endDate = dayjs(selectedDateRange[1]);
  // 计算日期范围的天数差异
  const daysDifference = endDate.diff(startDate, 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
  }
};
</script>

<style lang="less" scoped>
.t-card {
  border: 1px solid var(--td-border-level-2-color) !important;
  margin-bottom: 24px;
}

// 表单盒子边距
.form-item-box {
  margin: 0;
  display: flex;

  .t-form__item {
    display: flex;
    margin: 0;
    flex: 1;
  }
}
</style>
