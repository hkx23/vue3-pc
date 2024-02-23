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
        <!-- 页签栏1 不良明细 -->
        <t-tab-panel value="tab1" label="不良明细" :destroy-on-hide="true">
          <!--  select-on-row-click
            :fixed-height="true"
            :hover="true" -->
          <cmp-table
            ref="tableRef"
            v-model:pagination="firstPageUI"
            row-key="_timestamp"
            :table-column="columnsProduceReport1"
            :table-data="Data1"
            :total="total1"
            @refresh="onRefresh"
          >
            <template #title>
              {{ '不良明细' }}
            </template>
            <template #completedNum="{ row }">
              <div>{{ row.completedNum }}</div>
            </template>
          </cmp-table>
        </t-tab-panel>
        <!-- 页签栏2 不良汇总 -->
        <t-tab-panel value="tab2" label="不良汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="towPageUI"
              row-key="_timestamp"
              :table-column="columnsProduceReport2"
              :table-data="Data2"
              :total="total2"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '不良汇总' }}
              </template>
              <!-- TODO -->
              <template #op="slotProps">
                <div style="width: 200px">
                  <t-progress theme="plump" :percentage="slotProps.row.dutyProportion" />
                </div>
              </template>
              <template #completedNum="{ row }">
                <div>{{ row.completedNum }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏3 缺陷原因汇总-->
        <t-tab-panel value="tab3" label="缺陷原因汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="threePageUI"
              row-key="_timestamp"
              :table-column="columnsProduceReport3"
              :table-data="Data3"
              :total="total3"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '缺陷原因汇总' }}
              </template>
              <template #proportion="slotProps">
                <div style="width: 200px">
                  <t-progress theme="plump" :percentage="slotProps.row.dutyProportion" />
                </div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏4 维修方法汇总 -->
        <t-tab-panel value="tab4" label="维修方法汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="fourPageUI"
              row-key="_timestamp"
              :table-column="columnsProduceReport4"
              :table-data="Data4"
              :total="total4"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '维修方法汇总' }}
              </template>
              <template #dutyProportion="slotProps">
                <div style="width: 200px">
                  <t-progress theme="plump" :percentage="slotProps.row.dutyProportion" />
                </div>
              </template>

              <template #completedNum="{ row }">
                <div>{{ row.completedNum }}</div>
              </template>
            </cmp-table>
          </cmp-container>
        </t-tab-panel>
        <!-- 页签栏5 责任汇总-->
        <t-tab-panel value="tab5" label="责任汇总" :destroy-on-hide="false">
          <cmp-container :full="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="fivePageUI"
              row-key="_timestamp"
              :table-column="columnsProduceReport5"
              :table-data="Data5"
              :total="total5"
              @refresh="onRefresh"
            >
              <template #title>
                {{ '责任汇总' }}
              </template>
              <template #dutyProportion2="slotProps">
                <!-- {{ slotProps.row.dutyProportion }}  text -->
                <div style="width: 200px">
                  <t-progress theme="plump" :percentage="slotProps.row.dutyProportion" />
                </div>
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
import { computed, onMounted, ref, watch } from 'vue';

import { api } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';

const { pageUI: firstPageUI } = usePage();
const { pageUI: towPageUI } = usePage();
const { pageUI: threePageUI } = usePage();
const { pageUI: fourPageUI } = usePage();
const { pageUI: fivePageUI } = usePage();
const activeTab = ref('tab1'); // 默认页签
const queryParams = ref({}); // 查询参数，默认为空

// 表格实例
const tableRef = ref(null);
// const columnsData = ref([]);
// 页面1数据
const columnsProduceReport1 = computed(() => {
  return [
    {
      colKey: 'workshopName',
      title: '车间',
      width: 110,
    },
    {
      colKey: 'mitemCode',
      title: '工作中心',
      width: 110,
    },
    {
      colKey: 'scanBarcode',
      title: '条码',
      width: 130,
    },

    {
      colKey: 'scheCode',
      title: '排产单',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '产品编码',
      width: 100,
    },

    {
      colKey: 'mitemName',
      title: '产品名称',
      width: 100,
    },
    {
      colKey: 'mitemDesc',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'defectName',
      title: '缺陷描述',
      width: 100,
    },
    {
      colKey: 'ngQty',
      title: '不合格数量',
      width: 100,
    },
    {
      colKey: 'creatorName',
      title: '录入人',
      width: 100,
    },
    {
      colKey: 'timeCreate',
      title: '录入时间',
      width: 100,
    },
    {
      colKey: 'workstationName',
      title: '工站',
      width: 100,
    },
    {
      colKey: 'methodName',
      title: '缺陷原因',
      width: 100,
    },
    {
      colKey: 'methodName',
      title: '维修方法',
      width: 100,
    },
    {
      colKey: 'defectBlame',
      title: '责任',
      width: 100,
    },
    {
      colKey: 'userRepairName',
      title: '维修人',
      width: 100,
    },
    {
      colKey: 'datetimeRepaired',
      title: '维修时间',
      width: 100,
    },
  ];
});
// 页面2数据
const columnsProduceReport2 = computed(() => {
  return [
    {
      colKey: 'datetimeSche',
      title: '计划生产日期',
      width: 120,
    },
    {
      colKey: 'workshopName',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'workcenterName',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'scheCode',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'mitemName',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'mitemDesc',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'processName',
      title: '工序',
      width: 100,
    },
    {
      colKey: 'defectName',
      title: '缺陷描述',
      width: 100,
    },
    {
      colKey: 'defectTotal',
      title: '缺陷总数',
      width: 100,
    },
    {
      colKey: 'actualOutput',
      title: '实际产量',
      width: 100,
    },
    {
      colKey: 'qualifiedQuantity',
      title: '合格数量',
      width: 100,
    },
    {
      colKey: 'op',
      title: '良率',
      width: 130,
    },
  ];
});

// 页面3数据
const columnsProduceReport3 = computed(() => {
  return [
    {
      colKey: 'datetimeSche',
      title: '计划生产日期',
      width: 120,
    },
    {
      colKey: 'workshopName',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'workcenterName',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'scheCode',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'mitemName',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'mitemDesc',
      title: '产品描述',
      width: 100,
    },

    {
      colKey: 'defectReason',
      title: '缺陷原因',
      width: 100,
    },
    {
      colKey: 'defectReasonQuantity',
      title: '缺陷原因数量',
      width: 100,
    },
    {
      colKey: 'defectReasonTotal',
      title: '缺陷原因总数量',
      width: 100,
    },
    {
      colKey: 'proportion',
      title: '占比',
      width: 100,
    },
  ];
});

// 页面4数据
const columnsProduceReport4 = computed(() => {
  return [
    {
      colKey: 'datetimeSche',
      title: '计划生产日期',
      width: 120,
    },
    {
      colKey: 'workshopName',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'workcenterName',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'scheCode',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'mitemName',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'mitemDesc',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'methodName',
      title: '维修方法',
      width: 100,
    },
    {
      colKey: 'repairQuantity',
      title: '维修数量',
      width: 100,
    },
    {
      colKey: 'repairTotal',
      title: '维修总数量',
      width: 100,
    },
    {
      colKey: 'dutyProportion',
      title: '占比',
      width: 100,
    },
  ];
});
// 页面5数据
const columnsProduceReport5 = computed(() => {
  return [
    {
      colKey: 'datetimeSche',
      title: '计划生产日期',
      width: 120,
    },
    {
      colKey: 'workshopName',
      title: '车间',
      width: 100,
    },
    {
      colKey: 'workcenterName',
      title: '工作中心',
      width: 130,
    },
    {
      colKey: 'scheCode',
      title: '工单号',
      width: 100,
    },
    {
      colKey: 'mitemCode',
      title: '产品编码',
      width: 100,
    },
    {
      colKey: 'mitemName',
      title: '产品名称',
      width: 100,
    },

    {
      colKey: 'mitemDesc',
      title: '产品描述',
      width: 100,
    },
    {
      colKey: 'defectBlame',
      title: '责任',
      width: 100,
    },
    {
      colKey: 'completedNum',
      title: '数量',
      width: 100,
    },
    {
      colKey: 'dutyTotal',
      title: '总数量',
      width: 100,
    },
    {
      colKey: 'dutyProportion2',
      title: '占比',
      width: 100,
    },
  ];
});
// 初始渲染
onMounted(async () => {
  /** TODO
   * 时间必传 初始化不调用
   */
  // await fetchTable1({});
  // await fetchTable2({});
  // await fetchTable3({});
  // await fetchTable4({});
  // await fetchTable5({});
});

// 监听 activeTab 的变化
watch(activeTab, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // 根据当前选中的页签调用相应的数据加载函数
    switch (newValue) {
      case 'tab1':
        fetchTable1(queryParams.value); // 将查询条件的参数传给 fetchTable1 接口查询数据
        break;
      case 'tab2':
        fetchTable2(queryParams.value);
        break;
      case 'tab3':
        fetchTable3(queryParams.value);
        break;
      case 'tab4':
        fetchTable4(queryParams.value);
        break;
      case 'tab5':
        fetchTable5(queryParams.value);
        break;
      // 添加其他页签的case处理
      default:
        console.warn('未知的页签');
    }
  }
});

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
  // MessagePlugin.success('重置成功');
  await fetchTable1({});
  await fetchTable2({});
  await fetchTable3({});
  await fetchTable4({});
  await fetchTable5({});
};

// #query 查询参数
const opts = computed(() => {
  return {
    workshopId: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workcenterId: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    moscheduleId: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    barcode: {
      label: '产品条码/配送卡',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    defectId: {
      label: '缺陷名称',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'defectCode',
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

// const newDateStart = ref('');
// const newDateEnd = ref('');
// 查询
const onInput = async (data) => {
  // //展开前处理时间格式 切换tabs 将查询参数 关联 watch 调用查询方法
  // newDateStart.value = data.servicingTime[0];
  // newDateEnd.value = data.servicingTime[1];
  // queryParams.value = { ...data, dateStart: newDateStart.value, dateEnd: newDateEnd.value };
  // // 提取查询参数
  // const { workshopId, workcenterId, moscheduleId, barcode, mitemId, defectId } = data;
  // const [dateStart, dateEnd] = data.servicingTime;
  // // 校验日期跨度不得超过31天
  // const startDate = dayjs(dateStart);
  // const endDate = dayjs(dateEnd);
  // const daysDifference = endDate.diff(startDate, 'day');
  // if (daysDifference > 31) {
  //   MessagePlugin.warning('日期跨度不得超过31天');
  //   return;
  // }
  const [dateStart, dateEnd] = data.servicingTime.map((date) => dayjs(date).format('YYYY-MM-DD'));

  // 更新查询参数状态
  queryParams.value = {
    ...data,
    dateStart,
    dateEnd,
  };

  // 校验日期跨度不得超过31天
  const startDate = dayjs(dateStart);
  const endDate = dayjs(dateEnd);
  const daysDifference = endDate.diff(startDate, 'day');
  if (daysDifference > 31) {
    MessagePlugin.warning('日期跨度不得超过31天');
    return;
  }

  // 根据当前选中的页签来加载相应的数据 获取查询条件的参数进行程查询
  switch (activeTab.value) {
    case 'tab1':
      await fetchTable1(queryParams.value);
      break;
    case 'tab2':
      await fetchTable2(queryParams.value);
      break;
    case 'tab3':
      await fetchTable3(queryParams.value);
      break;
    case 'tab4':
      await fetchTable4(queryParams.value);
      break;
    case 'tab5':
      await fetchTable5(queryParams.value);
      break;
    // 添加其他页签的case处理
    default:
      // 错误处理或日志
      console.warn('未知的页签');
  }
};

// 更新fetchTable1方法以接受参数
const fetchTable1 = async (params) => {
  const data = await api.productionDefectStatistics.getDefectDetail({
    pageNum: firstPageUI.value.page,
    pageSize: firstPageUI.value.rows,
    ...params,
  });
  // 响应数据在response.list中
  const dataWithTimestamps = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  Data1.value = dataWithTimestamps;
  total1.value = data.total;
};

// 更新fetchTable2方法以接受参数
const fetchTable2 = async (params) => {
  const data = await api.productionDefectStatistics.getDefectCollect({
    pageNum: towPageUI.value.page,
    pageSize: towPageUI.value.rows,
    ...params,
  });
  // 响应数据在response.list中
  const dataWithTimestamps = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  Data2.value = dataWithTimestamps;
  total2.value = data.total;
};

// 更新fetchTable3方法以接受参数
const fetchTable3 = async (params) => {
  const data = await api.productionDefectStatistics.getDefectReasonCollect({
    pageNum: threePageUI.value.page,
    pageSize: threePageUI.value.rows,
    ...params,
  });
  // 响应数据在response.list中
  const dataWithTimestamps = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  Data3.value = dataWithTimestamps;
  total3.value = data.total;
};
// 更新fetchTable4方法以接受参数
const fetchTable4 = async (params) => {
  const data = await api.productionDefectStatistics.getRepairMethodCollect({
    pageNum: fourPageUI.value.page,
    pageSize: fourPageUI.value.rows,
    ...params,
  });
  // 响应数据在response.list中
  const dataWithTimestamps = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  Data4.value = dataWithTimestamps;
  total4.value = data.total;
};
// 更新fetchTable5方法以接受参数
const fetchTable5 = async (params) => {
  const data = await api.productionDefectStatistics.getDutyCollect({
    pageNum: fivePageUI.value.page,
    pageSize: fivePageUI.value.rows,
    ...params,
  });
  // 响应数据在response.list中
  const dataWithTimestamps = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  Data5.value = dataWithTimestamps;
  total5.value = data.total;
};

// TODO
const onReset = async () => {
  // total1.value = 0;
  // MessagePlugin.success('重置成功');
};

/** 日期范围 辅助函数
 */
const dateChange = async (data: any) => {
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
    await MessagePlugin.warning('日期跨度不得超过31天');
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
