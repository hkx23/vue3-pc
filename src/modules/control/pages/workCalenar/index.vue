<template>
  <cmp-container :full="true" :full-sub-index="[2]">
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
        <t-list
          size="small"
          split
          :async-loading="asyncLoading"
          style="margin-top: 10px"
          :style="{ 'max-height': `${processHeight}` }"
          @load-more="scrollHandler"
        >
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
        <t-calendar
          :controller-config="controllerConfig"
          :month="dayValue"
          :year="yearValue"
          :week="week"
          :is-show-weekend-default="weekVisible"
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
          <template #cellAppend="data">
            <div class="outerWarper">
              <!-- <div class="number">
                {{ displayNum(data) }}
              </div> -->
              <div v-if="getShow(data)">
                <div class="slotWarper">
                  <div :class="{ 'two-columns': getDisplayStr(data).length >= 4 && weekVisible === false }">
                    <div v-for="item in getDisplayStr(data)" :key="item.id">
                      <t-checkbox v-model="item.state" :disabled="getDisabled(data)" @change="onChangeState(item)">
                        <div class="item no-wrap" :title="item.shiftName + '(' + item.attendanceExpression + ')'">
                          {{ item.shiftName }}
                        </div>
                      </t-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </t-calendar>
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
import { CalendarController, CalendarProps, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formAdd from './formAdd.vue';
import formTable from './formTable.vue';
import { useLang } from './lang';

onMounted(async () => {
  queryCompnent.value.date = new Date().toISOString().substr(0, 7);
  onFetchData();
});
const { t } = useLang();
const weekVisible = ref(false); // 周末按钮控制
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
const controllerConfig: CalendarController = reactive({
  visible: true,
  disabled: false,
  // 是否禁用（全部控件）
  // 年份选择框组件相关设置
  year: {
    visible: false,
    // 是否显示
    selectProps: {
      // 用于透传props给该select组件
      disabled: false,
      size: 'small',
    },
  },
  // 月份选择框组件相关设置
  month: {
    visible: false,
    // 是否显示（“year”模式下本身是不显示该组件的）
    selectProps: {
      // 用于透传props给该select组件
      disabled: false,
      size: 'small',
    },
  },
  // 模式切换单选组件设置
  mode: {
    visible: false,
    // 是否显示
    radioGroupProps: {
      disabled: false,
      size: 'small',
    },
  },
  // 隐藏\显示周末按钮组件相关设置
  weekend: {
    visible: false,
  },
  // “今天\本月”按钮组件相关设置
  current: {
    visible: false,
    // 是否显示
    currentDayButtonProps: {
      // 用于透传props给“今天”钮组件（“month”模式下有效）
      disabled: false,
      size: 'small',
      theme: 'warning',
    },
    currentMonthButtonProps: {
      // 用于透传props给“本月”按钮组件（“year”模式下有效）
      disabled: false,
      size: 'small',
      theme: 'success',
    },
  },
});
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
    const dateToCompare = parseISO(formattedDate);
    // 使用 Array.some() 方法检查数组中是否存在与给定日期相同的元素
    const hasSameDate = dataList.value.some((item) => {
      const itemDate = parseISO(item.datetimeWork);
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
  const dateToCompare = parseISO(formattedDate);

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
const { setLoading } = useLoading();

const currProcessId = ref('');

// 进入首页发请求
const onFetchData = async () => {
  processRorKey.value = [];
  title.value = '';
  currProcessId.value = '';
  dataList.value = [];
  try {
    setLoading(true);
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
    setLoading(false);
  }
};
</script>

<style lang="less" scoped>
.outerWarper {
  width: 100%;
  height: 100%;

  .number {
    font-weight: 600;
    position: absolute;
    right: 0;
    font-size: 14px;
    line-height: 22px;
  }

  .item {
    position: relative;
    align-items: center;
    color: var(--td-text-color-secondary);
    font-size: 14px;
    line-height: 22px;
  }

  .slotWarper {
    position: absolute;
    bottom: 2px;
    left: 5px;
  }
}

.no-wrap {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
}

.two-columns {
  column-count: 2; /* 设置为两列布局 */
  column-gap: 20px; /* 设置列之间的间隔 */
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
</style>
