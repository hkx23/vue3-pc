<template>
  <cmp-kanban-default title="事件管理综合看板">
    <div class="top">
      <div class="top-left box-content">
        <div class="card">
          <div class="card-title">问题总数</div>
          <div class="card-content">
            <div class="card-content-value">{{ sumItem?.totalCount }}</div>
            <div class="card-content-uom">/</div>
            <div class="card-content-uom">件</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">未开始</div>
          <div class="card-content">
            <div class="card-content-value">{{ sumItem?.totalCount }}</div>
            <div class="card-content-uom">/</div>
            <div class="card-content-uom">件</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">进行中</div>
          <div class="card-content">
            <div class="card-content-value">{{ sumItem?.handlingCount }}</div>
            <div class="card-content-uom">/</div>
            <div class="card-content-uom">件</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">待关闭</div>
          <div class="card-content">
            <div class="card-content-value">{{ sumItem?.handledCount }}</div>
            <div class="card-content-uom">/</div>
            <div class="card-content-uom">件</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">逾期</div>
          <div class="card-content">
            <div class="card-content-value warning-value">{{ sumItem?.overdueCount }}</div>
            <div class="card-content-uom warning-uom">/</div>
            <div class="card-content-uom warning-uom">件</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">逾期率</div>
          <div class="card-content">
            <div class="card-content-value warning-value">{{ sumItem?.overdueRate }}</div>

            <div class="card-content-uom warning-uom">%</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">已完成</div>
          <div class="card-content">
            <div class="card-content-value complete-value">{{ sumItem?.closeCount }}</div>
            <div class="card-content-uom complete-uom">/</div>
            <div class="card-content-uom complete-uom">件</div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">关闭率</div>
          <div class="card-content">
            <div class="card-content-value complete-value">{{ sumItem?.closeRate }}</div>
            <div class="card-content-uom complete-uom">%</div>
          </div>
        </div>
      </div>
      <div class="top-right box-content">
        <div class="flex-col">
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <bcmp-select-business
                v-model="formData.deptResponsibilityId"
                borderless
                label="责任部门"
                type="adminOrg"
                :show-title="false"
                @change="fetchTable"
              ></bcmp-select-business>
            </div>
          </div>
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <bcmp-select-business
                v-model="formData.conferenceResponsibilityId"
                borderless
                label="责任会议"
                type="conference"
                :show-title="false"
                @change="fetchTable"
              ></bcmp-select-business>
            </div>
          </div>
        </div>
        <div class="flex-col">
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <t-select
                v-model="formData.month"
                borderless
                label="月份"
                placeholder="请选择"
                style="width: 100%"
                @change="fetchTable"
              >
                <t-option v-for="month in 12" :key="month" :label="`${month}月`" :value="month"> </t-option>
              </t-select>
            </div>
          </div>
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <t-select
                v-model="formData.range"
                borderless
                label="当前组织"
                placeholder="请选择"
                style="width: 100%"
                @change="fetchTable"
              >
                <t-option key="current" label="当前组织" value="current" />
                <t-option key="currentAnd" label="当前及以下组织" value="currentAnd"></t-option>
              </t-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center grid-container">
      <cmp-kanban-box class="grid-item first">
        <template #title> 各部门问题统计表 </template>
        <cmp-table
          v-model:pagination="pageUI"
          :show-toolbar="false"
          :table-column="columns"
          :table-data="deptEventRateList"
          :loading="loading"
          :total="dataTotal"
          :fixed-height="true"
          @refresh="fetchTable"
        >
        </cmp-table>
      </cmp-kanban-box>

      <cmp-kanban-box class="grid-item">
        <template #title> 改善进行中 </template>
        <div class="event-area">
          <div v-for="(workItem, index) in workingList" :key="index" class="event-card">
            <div class="event-card-item">事件部门:{{ workItem.deptResponsibilityName }}</div>
            <div class="event-card-item">事件描述:{{ workItem.eventDesc }}</div>
          </div>
          <!-- <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div> -->
        </div>
      </cmp-kanban-box>

      <cmp-kanban-box class="grid-item">
        <template #title> 逾期 </template>
        <div class="event-area">
          <div v-for="(overdueItem, index) in overdueList" :key="index" class="event-card">
            <div class="event-card-item">事件部门:{{ overdueItem.deptResponsibilityName }}</div>
            <div class="event-card-item">事件描述:{{ overdueItem.eventDesc }}</div>
          </div>
        </div>
      </cmp-kanban-box>

      <cmp-kanban-box class="grid-item">
        <template #title> 已完成 </template>
        <div class="event-area">
          <div v-for="(completeItem, index) in completeList" :key="index" class="event-card">
            <div class="event-card-item">事件部门:{{ completeItem.deptResponsibilityName }}</div>
            <div class="event-card-item">事件描述:{{ completeItem.eventDesc }}</div>
          </div>

          <!-- <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div>
          <div class="event-card">
            <div class="event-card-item">事件部门:</div>
            <div class="event-card-item">事件描述:</div>
          </div> -->
        </div>
      </cmp-kanban-box>
    </div>
    <div class="event-kanban-bottom" style="gap: 24px">
      <div class="flex-row">
        <div class="dept-title">责任部门</div>
        <div class="deptList flex-row">
          <div v-for="(deptItem, index) in deptList" :key="index" class="deptButton">{{ deptItem }}</div>
          <!-- <div class="deptButton">设备</div>
          <div class="deptButton">品质</div>
          <div class="deptButton">工程</div>
          <div class="deptButton">生产</div>
          <div class="deptButton">安全</div> -->
        </div>
      </div>
    </div>
  </cmp-kanban-default>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, reactive, ref } from 'vue';

import { api, EventDTO } from '@/api/daily';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { loading } = useLoading();
const { t } = useLang();
const { pageUI } = usePage();
const tableData = ref([]);
const dataTotal = ref(0);
// 查询条件处理数据
const filterList = ref([]) as any;
const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('eventKanban.deptResponsibilityName')}`, width: 100, colKey: 'deptResponsibilityName' },
  { title: `${t('eventKanban.createCount')}`, width: 80, colKey: 'createCount' },
  { title: `${t('eventKanban.handlingCount')}`, width: 80, colKey: 'handlingCount' },
  { title: `${t('eventKanban.handledCount')}`, width: 80, colKey: 'handledCount' },
  { title: `${t('eventKanban.overdueCount')}`, width: 80, colKey: 'overdueCount' },
  { title: `${t('eventKanban.overdueRate')}`, width: 80, colKey: 'overdueRate' },
  { title: `${t('eventKanban.closeCount')}`, width: 80, colKey: 'closeCount' },
  { title: `${t('eventKanban.totalCount')}`, width: 80, colKey: 'totalCount' },
  { title: `${t('eventKanban.closeRate')}`, width: 80, colKey: 'closeRate' },
  // {
  //   colKey: 'op',
  //   title: `${t('common.button.operation')}`,
  //   width: '80px',
  //   fixed: 'right',
  // },
];
const formData: EventDTO = reactive({
  deptResponsibilityId: '',
  conferenceResponsibilityId: '',
  month: dayjs().month() + 1,
  range: 'currentAnd',
});

const onRefresh = () => {
  fetchTable();
};
const sumItem = ref();
const deptEventRateList = ref<any[]>([]);
const completeList = ref<any[]>([]);
const deptList = ref<any[]>([]);
const eventList = ref<any[]>([]);
const overdueList = ref<any[]>([]);
const workingList = ref<any[]>([]);

const fetchTable = async () => {
  try {
    if (formData.deptResponsibilityId === '' && formData.conferenceResponsibilityId === '') {
      MessagePlugin.warning(t('eventKanban.plsSelectNeed'));
      return;
    }
    filterList.value = [];
    for (const key in formData) {
      const addFilter = {
        field: key,
        operator: 'EQ',
        value: formData[key],
      };
      if (key !== 'keyWord' && addFilter.value) {
        filterList.value.push(addFilter);
      }
    }

    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
    };

    const data = (await api.eventKanban.getKanban(searchCondition)) as any;
    if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
    tableData.value = data.list;
    dataTotal.value = data.total;

    [sumItem.value] = data.sumEventRateList;
    deptEventRateList.value = data.deptEventRateList;
    completeList.value = data.completeList;
    deptList.value = data.deptList;
    eventList.value = data.eventList;
    overdueList.value = data.overdueList;
    workingList.value = data.workingList;

    MessagePlugin.success(t('eventKanban.querySuccess'));
  } catch (e) {
    console.log(e);
  }
};
// 初始渲染
onMounted(() => {
  onRefresh();
});
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.top {
  height: 132px;
  display: flex;
  flex-direction: row;
  gap: 12px;

  .card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .card-title {
      font-size: 14px;
      color: rgb(199 241 255);
      letter-spacing: 0;
      line-height: 2;
      font-weight: normal;
      font-style: normal;
      transform: translate(0, 0);
      word-break: keep-all;
    }

    .card-content {
      display: flex;
      flex: 1;
      gap: 4px;

      .card-content-value {
        display: inline-flex;
        align-items: center;
        color: rgb(230 247 255);
        font-size: 26px;
        font-weight: bold;
        font-style: normal;
        text-shadow: none;
      }

      .card-content-uom {
        display: inline-flex;
        align-items: center;
        color: rgb(230 247 255 / 50%);
        font-size: 18px;
        letter-spacing: 0;
        font-weight: normal;
        font-style: normal;
        transform: translate(2px, 1px);
      }

      .warning-value {
        color: rgb(255 178 106);
      }

      .warning-uom {
        color: rgb(255 178 106 / 50%);
      }

      .complete-value {
        color: rgb(0 255 254);
      }

      .complete-uom {
        color: rgb(0 255 254 / 30%);
      }

      .t-input__prefix {
        color: aliceblue;
      }

      .t-input__inner {
        color: white;
      }

      .t-input--focused .t-input__prefix,
      .t-input--focused .t-input__inner {
        color: black;
      }

      .t-input:hover .t-input__prefix,
      .t-input:hover .t-input__inner {
        color: black;
      }
    }
  }

  .top-left {
    flex-grow: 2;
    display: flex;
    flex-direction: row;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .top-right {
    flex-grow: 1;
    margin-top: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
}

.center {
  flex: 1;
}

.event-kanban-bottom {
  height: 82px;
  display: flex;
  flex: 1;
  margin-top: 12px;
  background: rgb(48 99 195 / 20%);
  flex-direction: row;
  border-radius: 8px;
  padding: 12px;
}

.flex-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.box-content {
  min-height: 10px;
  background: rgb(48 99 195 / 20%);
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 根据需求调整列数和比例 */
  grid-gap: 10px; /* 可选，设置间隔 */
  grid-auto-rows: 1fr; /* 设置所有行的高度为自动填充剩余空间 */
  height: 100%; /* 如果外部有父容器，需要设置高度为100%以填充父容器高度 */
  flex: 1 1 auto;
}

.grid-item {
  overflow-y: auto; /* 如果内容超过单行高度，允许内容出现垂直滚动条 */
}

.grid-item.first {
  grid-column: span 3; /* 第一个盒子占据3列 */
}

.event-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-card {
  background: #d0a76b61;
  padding: 12px;
  border-radius: 8px;
}

.deptList {
  gap: 24px;
}

.dept-title {
  align-self: center;
  font-size: 18px;
}

.deptButton {
  padding: 8px 12px;
  background: #d0a76b61;
  align-items: center;
  align-self: center;
  border-radius: 4px;
}
</style>
