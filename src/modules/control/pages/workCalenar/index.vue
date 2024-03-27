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
      <cmp-card ref="refProcessCard" flex="350px">
        <t-list
          size="small"
          split
          :async-loading="asyncLoading"
          :style="{ 'max-height': `${processHeight}` }"
          @load-more="scrollHandler"
        >
          <t-list-item
            v-for="item in processList"
            :key="item.workcenterId"
            :class="{ 'is-selected': currProcessId == item.workcenterId }"
            @click="currProcessId = item.workcenterId"
          >
            <span style="width: 30%">{{ item.wcCode }}</span>
            <span style="width: 30%">{{ item.houseCount }}(H)</span>
            <template #action>
              <t-icon v-if="currProcessId == item.id" name="focus" />
              <div class="activeProcess"></div>
            </template>
          </t-list-item>
        </t-list>
      </cmp-card>
      <cmp-card flex="auto">
        <div style="display: flex; align-items: center">
          <t-button theme="primary" style="margin-left: auto">日历维护</t-button>
          <t-button theme="default" style="margin-left: 10px">查漏补缺</t-button>
        </div>
        <t-calendar
          :controller-config="false"
          :month="dayValue"
          :year="yearValue"
          style="height: 100%; margin-top: 10px"
        >
          <template #button>
            <t-button theme="primary" style="margin-left: auto">日历维护</t-button>
            <t-button theme="default" style="margin-left: 10px">查漏补缺</t-button>
          </template>
        </t-calendar>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!-- 组织弹出窗 -->
  <dialog-defects
    :id="currProcessId"
    v-model="formDefectsVisible"
    :title="t('workCalenar.defectList')"
    @submit-result="onSubmitResult"
  ></dialog-defects>

  <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onDeleteConfirm">
    <h3 class="list-save">选中{{ processRorKey.length }}条</h3>
  </t-dialog>
</template>

<script lang="tsx">
export default {
  name: 'WorkCalenar',
};
</script>
<script setup lang="tsx">
import _, { debounce } from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const asyncLoadingRadio = ref('load-more');
const asyncLoading = computed(() => {
  if (asyncLoadingRadio.value === 'loading-custom') {
    return '没有更多数据了~';
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
const processHeight = ref('300px');
useResizeObserver(refProcessCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  processHeight.value = `${height - 150}px`;
  console.error('treeHeight', processHeight.value);
});

const onInput = (data) => {
  pageUI.value.page = 1;
  queryCompnent.value.date = data.date;
  queryCompnent.value.workshopId = data.workshopId;
  queryCompnent.value.workcenterId = data.workcenterId;
  const [year, month] = data.date.split('-');
  dayValue.value = month;
  yearValue.value = year;
  onFetchData();
};
const formDefectsVisible = ref(false);
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
const deleteVisible = ref(false); // 删除窗口控制
const { setLoading } = useLoading();
const { t } = useLang();
const currProcessId = ref('');

const onSubmitResult = (res) => {
  if (res) {
    onFetchData();
  }
};
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

// 删除确认弹窗
const onDeleteConfirm = async () => {
  try {
    await api.processInDefectCode.removeProcessInDefectCodeBatch({ ids: processRorKey.value });
    MessagePlugin.success('删除成功');
    deleteVisible.value = false;
    onFetchData();
    processRorKey.value = [];
  } catch (e) {
    console.log(e);
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
</style>
