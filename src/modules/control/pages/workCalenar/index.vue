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
            @click="currProcessId = item.workcenterId"
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
          style="height: 100%; margin-top: 10px"
        >
          <template #head>
            <div style="display: flex; align-items: center">
              <span class="span_title">{{ t('workCalenar.workCalenar') }}</span>
              <t-button theme="primary" style="margin-left: auto" @click="onAdd">{{
                t('workCalenar.calendarMaintenance')
              }}</t-button>
              <t-button theme="default" style="margin-left: 10px">{{ t('workCalenar.checkOmissions') }}</t-button>
              <t-button
                theme="default"
                style="margin-left: 10px"
                @click="weekVisible = weekVisible === true ? false : true"
                >{{ weekVisible === true ? t('workCalenar.hideWeekends') : t('workCalenar.showWeekends') }}</t-button
              >
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
  >
    <form-add ref="formRef"></form-add>
  </t-dialog>
</template>

<script lang="tsx">
export default {
  name: 'WorkCalenar',
};
</script>
<script setup lang="tsx">
import _, { debounce } from 'lodash';
import { CalendarController, CalendarProps, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formAdd from './formAdd.vue';
import { useLang } from './lang';

onMounted(async () => {
  queryCompnent.value.date = new Date().toISOString().substr(0, 7);
  onFetchData();
});
const { t } = useLang();
const weekVisible = ref(false); // 周末按钮控制
const formRef = ref(null); // 周末按钮控制
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
  const res = await formRef.value.getWorkshopId();
  if (!res) {
    MessagePlugin.warning(t('workCalenar.warningLogin'));
    return;
  }
  formVisible.value = true;
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
.activeProcess {
  background-color: var(--td-brand-color);
  width: 4px;
  height: 16px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  top: 11px;
}

.t-list .is-selected {
  color: var(--td-brand-color);
  background-color: var(--td-brand-color-light); /* 替换为你希望的颜色 */
}

.t-list .t-list-item {
  border-radius: 4px;
}

.list-card-process {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}

.delete-dialog-top {
  margin: 10px;
  text-align: center;
  font-weight: 900;
}

.list-save {
  text-align: center;
  margin: 10px 0;
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 14px;
}
</style>
