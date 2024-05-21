<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query ref="optsRef" :opts="opts" :bool-enter="true" @submit="onInput">
        <template #workcenter="{ param }">
          <bcmp-select-business
            v-model="param.workcenterId"
            :label="t('business.main.workcenter')"
            :parent-id="param.workshopId"
            type="workcenter"
            :clearable="true"
          ></bcmp-select-business>
        </template>
        <template #workshop="{ param }">
          <bcmp-select-business
            v-model="param.workshopId"
            :label="t('business.main.workshop')"
            type="workshop"
            :clearable="true"
            @change="param.workcenterId = ''"
          ></bcmp-select-business>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-row>
      <cmp-card ref="refProcessCard" flex="280px">
        <span class="span_title">{{ t('workCalenar.workcenterList') }}</span>
        <t-list size="small" split :async-loading="asyncLoading" style="margin-top: 10px" @load-more="scrollHandler">
          <t-list-item
            v-for="item in processList"
            :key="item.workcenterId"
            :class="{ 'is-selected': currProcessId == item.workcenterId }"
            @click="onClickLeft(item)"
          >
            <span style="width: 50%">{{ item.wcCode }}</span>
            <span style="width: 50%">{{ item.houseCount }} (H)</span>
          </t-list-item>
        </t-list>
      </cmp-card>
      <cmp-card flex="auto">
        <!-- <t-calendar
          :controller-config="controllerConfig"
          :month="dayValue"
          :year="yearValue"
          :week="week"
          style="width: auto"
        >
          <template #head>
            <div style="display: flex; align-items: center">
              <span class="span_title" style="width: 70px">{{ t('workCalenar.workCalenar') }}</span>
              <span class="span_text">{{ title }}</span>
              <t-button theme="primary" style="margin-left: auto" @click="onAdd">{{
                t('workCalenar.calendarMaintenance')
              }}</t-button>
              <t-button theme="default" @click="onCheckOmissions">{{ t('workCalenar.checkOmissions') }}</t-button>
              <t-button theme="default" @click="weekVisible = weekVisible === true ? false : true">{{
                weekVisible === true ? t('workCalenar.hideWeekends') : t('workCalenar.showWeekends')
              }}</t-button>
            </div>
          </template>
          <template #cell="data">
            <div class="outerWarper">
              <div class="number">
                {{ displayNum(data) }}
              </div>
              <div v-if="getShow(data)">
                <div class="slotWarper no-wrap">
                  <div v-for="item in getDisplayStr(data)" :key="item.id" class="itemClass">
                    <t-row style="align-items: center">
                      <t-checkbox
                        v-model="item.state"
                        class="custom-checkbox"
                        :disabled="getDisabled(data)"
                        style="margin-left: 1px"
                        @change="onChangeState(item)"
                      >
                        <div class="columns">
                          {{ item.shiftName + '(' + item.attendanceExpression + ')' }}
                        </div>
                      </t-checkbox>
                    </t-row>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </t-calendar> -->
        <div style="position: relative; margin-bottom: 10px">
          <div style="overflow-x: clip">
            <span class="span_title" style="width: 70px">{{ t('workCalenar.workCalenar') }}</span>
            <div style="position: absolute; top: 0; right: 0">
              <t-button theme="primary" @click="onAdd">{{ t('workCalenar.calendarMaintenance') }}</t-button>
              <t-button theme="default" @click="onCheckOmissions">{{ t('workCalenar.checkOmissions') }}</t-button>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="monthList">
            <div class="weekDay">
              <div v-for="(item, index) in week" :key="index" class="day" style="width: 300px">
                {{ item }}
              </div>
            </div>
            <div class="weekList">
              <ul>
                <li v-for="(item, ss) in monthDay" :key="ss">
                  <div class="dayTitle">
                    {{ item.day }}
                  </div>
                  <div v-if="getShow(item)">
                    <div v-for="itemCheckBox in getDisplayStr(item)" :key="itemCheckBox.id" class="itemClass no-wrap">
                      <t-checkbox
                        v-model="itemCheckBox.state"
                        class="custom-checkbox"
                        :disabled="getDisabled(item)"
                        @change="onChangeState(itemCheckBox)"
                      >
                        <div class="columns">
                          {{ itemCheckBox.shiftName + '(' + itemCheckBox.attendanceExpression + ')' }}
                        </div>
                      </t-checkbox>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!--主表弹框-->
  <t-dialog
    v-model:visible="formVisible"
    :header="t('workCalenar.calendarMaintenance')"
    :close-on-overlay-click="false"
    width="800px"
    top="60"
    :on-confirm="onConfirmAdd"
  >
    <form-add ref="formRef"></form-add>
  </t-dialog>
  <!--查漏补缺-->
  <t-dialog
    v-model:visible="formTableVisible"
    :header="t('workCalenar.checkOmissions')"
    :close-on-overlay-click="false"
    width="800px"
    :confirm-btn="null"
  >
    <form-table ref="formTableRef"></form-table>
  </t-dialog>
</template>

<script lang="tsx">
export default {
  name: 'WorkCalenar',
};
</script>
<script setup lang="tsx">
import { isSameDay, parseISO } from 'date-fns';
import _, { debounce } from 'lodash';
import { CalendarProps, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import formAdd from './formAdd.vue';
import formTable from './formTable.vue';
import { useLang } from './lang';

onMounted(async () => {
  queryCompnent.value.date = new Date().toISOString().substr(0, 7);
  onFetchData();
  init();
});
const { t } = useLang();
// const weekVisible = ref(false); // 周末按钮控制
const formTableVisible = ref(false);
const onCheckOmissions = async () => {
  formTableVisible.value = true;
  await formTableRef.value.getList();
};
const formRef = ref(null);
const formTableRef = ref(null);
const title = ref(''); // 周末按钮控制
const week: CalendarProps['week'] = [
  t('workCalenar.monday'),
  t('workCalenar.tuesday'),
  t('workCalenar.wednesday'),
  t('workCalenar.thursday'),
  t('workCalenar.friday'),
  t('workCalenar.saturday'),
  t('workCalenar.sunday'),
];
const getCurrentMonthFirst = (val) => {
  const date = val;
  date.setDate(1);
  return date;
};
const monthDay = ref([]);
const init = () => {
  // 置空日历
  monthDay.value = [];
  // 获取传入的时间戳
  const nowDate = queryCompnent.value.date;
  const itemDate = new Date(nowDate);
  // 获取传入的年
  const year = itemDate.getFullYear();
  // 获取传入的月
  const month = itemDate.getMonth();
  // 获取传入的月有多少天
  const allDays = new Date(year, month + 1, 0).getDate();
  // 获取传入的月第一天的时间戳
  const nowMonthDay = new Date(getCurrentMonthFirst(itemDate));
  // 获取传入的月第一天是周几
  let nowMonthWeek = nowMonthDay.getDay();
  const dayOffset = nowMonthWeek === 0 ? 6 : nowMonthWeek - 1; // 如果本月第一天是周日，则 dayOffset 为 6，否则为 firstDayOfMonth - 1

  // 获取上个月的最后一天
  const lastDayOfLastMonth = new Date(year, month, 0).getDate();

  // 填充上个月的最后几天到当前月份的第一周
  for (let i = dayOffset; i > 0; i--) {
    const obj = { index: 0, day: '', formattedDate: '' };
    obj.index = i;
    obj.day = (lastDayOfLastMonth - (dayOffset - i)).toString(); // 设置日期为上个月的最后几天
    obj.formattedDate = new Date(year, month - 1, Number(obj.day)).toString(); // 设置日期对象
    monthDay.value.push(obj);
  }

  // 周天是0  所以做三目判断 让礼拜天成为7
  nowMonthWeek = nowMonthWeek === 0 ? 7 : nowMonthWeek;
  // 获取当天 的 年月日
  const nowyear = new Date().getFullYear();
  const nowMonth = new Date().getMonth();
  const nowDay = new Date().getDate();

  let num = 1;
  let numIndex = 0; // 用于循环行数
  // 传入月的天数 + 传入月第一天的周几
  if (nowMonthWeek + allDays < 30) {
    numIndex = 29; // 展示4行 一行7个
  } else if (nowMonthWeek + allDays < 36) {
    numIndex = 36; // 展示5行 一行7个
  } else {
    numIndex = 42;
  }

  for (let i = 1; i < numIndex; i++) {
    const obj = { index: 0, day: '', formattedDate: '' };
    obj.index = i;
    // 当前日的格子
    if (i >= nowMonthWeek && num <= allDays) {
      obj.day = num.toString();
      num++;
      // 计算并赋值日期对象给 date 属性
      obj.formattedDate = new Date(year, month, num - 1).toString();
      monthDay.value.push(obj);
    }
  }
};
// const displayNum = (cellData) => {
//   if (cellData.mode === 'month') {
//     return cellData.date.getDate();
//   }
//   return cellData.date.getMonth() + 1;
// };
// const controllerConfig: CalendarController = reactive({
//   visible: true,
//   disabled: false,
//   // 是否禁用（全部控件）
//   // 年份选择框组件相关设置
//   year: {
//     visible: false,
//     // 是否显示
//     selectProps: {
//       // 用于透传props给该select组件
//       disabled: false,
//       size: 'small',
//     },
//   },
//   // 月份选择框组件相关设置
//   month: {
//     visible: false,
//     // 是否显示（“year”模式下本身是不显示该组件的）
//     selectProps: {
//       // 用于透传props给该select组件
//       disabled: false,
//       size: 'small',
//     },
//   },
//   // 模式切换单选组件设置
//   mode: {
//     visible: false,
//     // 是否显示
//     radioGroupProps: {
//       disabled: false,
//       size: 'small',
//     },
//   },
//   // 隐藏\显示周末按钮组件相关设置
//   weekend: {
//     visible: false,
//   },
//   // “今天\本月”按钮组件相关设置
//   current: {
//     visible: false,
//     // 是否显示
//     currentDayButtonProps: {
//       // 用于透传props给“今天”钮组件（“month”模式下有效）
//       disabled: false,
//       size: 'small',
//       theme: 'warning',
//     },
//     currentMonthButtonProps: {
//       // 用于透传props给“本月”按钮组件（“year”模式下有效）
//       disabled: false,
//       size: 'small',
//       theme: 'success',
//     },
//   },
// });
const asyncLoadingRadio = ref('load-more');
const asyncLoading = computed(() => {
  if (asyncLoadingRadio.value === 'loading-custom') {
    return t('workCalenar.noMoreData');
  }
  return asyncLoadingRadio.value;
});
const queryCompnent = ref({
  pageSize: 20,
  pageNum: 1,
  date: '',
  workshopId: '',
  workcenterId: '',
});
const totals = ref<number>(0); // 用户分页总数
// 点击加载更多
const scrollHandler = debounce(async () => {
  asyncLoadingRadio.value = 'loading';
  queryCompnent.value.pageNum++;
  // await fetchUserList();
  asyncLoadingRadio.value = 'load-more';
  if (processList.value.length >= totals.value) {
    asyncLoadingRadio.value = 'loading-custom';
  }
}, 1000);
const refProcessCard = ref(null);
const formVisible = ref(false);
const processHeight = ref('300px');
useResizeObserver(refProcessCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  processHeight.value = `${height - 150}px`;
  console.error('treeHeight', processHeight.value);
});
const onAdd = async () => {
  await formRef.value.reset();
  formVisible.value = true;
};

const getShow = (data) => {
  try {
    const { formattedDate } = data;

    // 将日期字符串解析为日期对象
    const dateToCompare = new Date(formattedDate);
    // 使用 Array.some() 方法检查数组中是否存在与给定日期相同的元素
    const hasSameDate = dataList.value.some((item) => {
      const itemDate = parseISO(item.datetimeWork);

      console.log(dateToCompare);
      console.log(itemDate);
      return isSameDay(itemDate, dateToCompare);
    });
    return hasSameDate;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const getDisplayStr = (data) => {
  const { formattedDate } = data;
  // 将日期字符串解析为日期对象
  const dateToCompare = new Date(formattedDate);

  // 使用 Array.find() 方法查找与给定日期相同的元素
  const sameDateItem = dataList.value.find((item) => {
    const itemDate = parseISO(item.datetimeWork);
    return isSameDay(itemDate, dateToCompare);
  });
  const { list } = sameDateItem;
  return list;
};
const dataList = ref([]);
const onChangeState = async (item) => {
  await api.workCalenarDtl.changeState({ id: item.id });
  MessagePlugin.success(t('common.message.success'));
  // item.workcenterId = currProcessId.value;
  // onClickLeft(item);
};
const onClickLeft = async (item) => {
  currProcessId.value = item.workcenterId;
  const res = await api.workCalenar.getList({
    workCenterId: item.workcenterId,
    date: queryCompnent.value.date,
  });
  title.value = '';
  if (res && res.length > 0) {
    const first = res[0];
    title.value = first.list.map((item) => `${item.shiftName} (${item.attendanceExpression})`).join(', ');
  }
  dataList.value = res;
  console.log(res);
};
const onConfirmAdd = async () => {
  formRef.value.submit().then((data) => {
    if (data) {
      formVisible.value = false;
      onFetchData();
    }
  });
};
const getDisabled = (data) => {
  const { formattedDate } = data;
  const currentDate = new Date(); // 获取当前系统日期

  // 将传入的日期字符串转换为日期对象
  const dateToCompare = new Date(formattedDate);
  dateToCompare.setDate(dateToCompare.getDate() + 1);
  // 比较当前日期是否大于传入的日期
  return currentDate > dateToCompare;
};
const onInput = (data) => {
  pageUI.value.page = 1;
  queryCompnent.value.date = data.date;
  queryCompnent.value.workshopId = data.workshopId;
  queryCompnent.value.workcenterId = data.workcenterId;
  if (!data.date) {
    MessagePlugin.warning(t('workCalenar.YearMonthMandatory'));
    return;
  }
  const [year, month] = data.date.split('-');
  dayValue.value = month;
  yearValue.value = year;
  init();
  onFetchData();
};
const opts = computed(() => {
  return {
    workshopId: {
      label: t('business.main.workshop'),
      slotName: 'workshop',
      defaultVal: '',
    },
    workcenterId: {
      label: t('business.main.workcenter'),
      slotName: 'workcenter',
      defaultVal: '',
    },
    date: {
      label: t('workCalenar.date'),
      comp: 't-date-picker',
      defaultVal: new Date().toISOString().substr(0, 7),
      bind: {
        mode: 'month',
      },
    },
  };
});
const total = ref(10);
const dayValue = ref();
const yearValue = ref();
const { pageUI } = usePage();
const processRorKey = ref([]); // 存储多选选择数组
const processList = ref([]);

const currProcessId = ref('');

// 进入首页发请求
const onFetchData = async () => {
  processRorKey.value = [];
  title.value = '';
  currProcessId.value = '';
  dataList.value = [];
  try {
    utils.loadingPluginFullScreen(true);
    const res = (await api.workCalenar.getWcInfo(queryCompnent.value)) as any;
    if (res) {
      total.value = res.total;
      processList.value = res.list;

      if (total.value === 0 || total.value === processList.value.length) {
        asyncLoadingRadio.value = 'loading-custom';
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
</script>

<style lang="less" scoped>
.outerWarper {
  width: 100%;
  height: 100%;
  margin-left: 3px;

  .itemClass {
    position: relative;
    align-items: center;
    color: var(--td-text-color-secondary);
    font-size: 10px;
  }

  .slotWarper {
    // position: absolute;
    // bottom: 2px;
    font-size: 10px;
    left: 5px;
  }

  .number {
    font-weight: 600;
    position: static;
    right: 50%; /* 水平居中 */
    transform: translateX(50%); /* 水平居中 */
    font-size: 14px;
    line-height: 22px;
  }
}

/* 设置日历组件单元格的最小宽度 */
.t-calendar .cell {
  min-width: 800px !important;
}

.no-wrap {
  // max-width: calc(85% - 4px);
  text-overflow: ellipsis;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
}

.columns {
  font-size: 12px;
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 14px;
}

.span_text {
  color: var(--td-gray-color-8);
  font-size: 14px;
}

.t-list .is-selected {
  color: var(--td-brand-color);
  background-color: var(--td-brand-color-light); /* 替换为你希望的颜色 */
}

.searchTop {
  border-bottom: 1px solid rgb(211 211 211);
  margin-bottom: 20px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.box {
  height: 100%;
  display: flex;

  .monthList {
    flex: 1;
    display: flex;
    flex-direction: column;

    .weekDay {
      display: flex;
      align-items: right;
      box-sizing: border-box;

      .day {
        min-width: 270px;
        height: 32px;
        display: flex;
        align-items: flex-end; /* 确保文本位于底部 */
        justify-content: flex-end; /* 文本右对齐 */
        font-size: 16px;
      }
    }

    .weekList {
      flex: 1;
      position: relative;
      margin-bottom: 20px;

      ul {
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto auto;
        display: flex;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;

        &::-webkit-scrollbar {
          /* 滚动条整体样式 */
          width: 8px; /* 高宽分别对应横竖滚动条的尺寸 */
          height: 8px;
        }

        &::-webkit-scrollbar-thumb {
          /* 滚动条里面小方块 */
          border-radius: 5px;
          background: rgb(0 0 0 / 20%); /* 设置滚动条颜色 */
        }

        li {
          list-style: none;
          min-width: 300px;
          min-height: 100px;
          border-right: 1px solid rgb(211 211 211);
          border-top: 1px solid rgb(211 211 211);
          border-bottom: 1px solid rgb(211 211 211);
          display: flex;
          flex-direction: column;
          padding: 10px;
          box-sizing: border-box;

          &:nth-child(7n + 1) {
            border-left: 1px solid rgb(211 211 211);
          }

          .dayTitle {
            font-size: 16px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
