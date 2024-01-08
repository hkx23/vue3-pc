<!-- 我的待办-我的工作台 -->
<template>
  <cmp-card v-model:pagination="pageUI" :full="true" height="100%">
    <cmp-table
      class="component-table"
      row-key="id"
      :table-column="column"
      :table-data="todoData"
      :loading="loading"
      :total="total"
      :fixed-height="false"
      :show-toolbar="false"
      :show-pagination="false"
      @refresh="onFetchData"
    >
      <template #titleName="{ row }">
        <a
          class="table-cell-href"
          @click="
            {
              onHandelUrl(row);
            }
          "
        >
          {{ row.titleName }}
        </a>
      </template>
      <template #isReadName="{ row }">
        <div v-if="row.isRead == 1" class="green-icon">
          <t-icon name="check-circle" />
        </div>
        <div v-if="row.isRead == 0" class="gray-icon">
          <t-icon name="circle" />
        </div>
      </template>
    </cmp-table>

    <!-- <div class="recommend-more" @click="onHandelTodoMenu">
      <span>{{ t('common.button.more') }}</span>

      <t-icon name="chevron-right"></t-icon>
    </div> -->

    <template #title>
      <t-badge :show-zero="true" :count="unProcessCount" class="list-item" :offset="[-10, 11]">
        <div class="t-card__title">{{ t('todo.title') }}</div>
      </t-badge>
    </template>

    <template #footer>
      <div style="float: right">
        <t-link theme="primary" size="small" @click="onHandelTodoMenu">
          {{ t('common.button.more') }}
          <template #suffix-icon>
            <t-icon name="chevron-right"></t-icon>
          </template>
        </t-link>
      </div>
    </template>
  </cmp-card>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import _ from 'lodash';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { api as apiMain } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import { openPage } from '@/router';

import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});
const router = useRouter();
const total = ref(10);
const { pageUI } = usePage();
const datePlanRangeDefault = ref([]); // 初始化日期控件
// const datePlanRangeDefault = ref([dayjs().subtract(31, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]); // 初始化日期控件
// 查询初始化
const queryCondition = ref({
  status: 'UNPROCESS',
  title: '',
  datetimeStart: '',
  datetimeEnd: '',
  datePlanRange: datePlanRangeDefault.value,
});

const { loading, setLoading } = useLoading();
const { t } = useLang();
const unProcessCount = ref(0);

// table定义
const column = ref([
  // { colKey: 'multiple', type: 'multiple', align: 'center' },
  { title: t('todo.titleName'), colKey: 'titleName', align: 'center', width: 140 },
  {
    colKey: 'isReadName',
    title: t('todo.isReadName'),
    align: 'center',
    width: '70',
    cell: 'stateSwitch',
  },
  { title: t('todo.timeCreate'), colKey: 'timeCreate', align: 'center', width: 140 },
]);
// table数据
const todoData = ref([]);
const currTodoId = ref('UNPROCESS');

// 获取待办列表和待办总数信息
const onFetchData = async () => {
  try {
    setLoading(true);
    if (queryCondition.value.datePlanRange) {
      if (queryCondition.value.datePlanRange[0]) {
        queryCondition.value.datetimeStart = queryCondition.value.datePlanRange[0].toString();
      }
      if (queryCondition.value.datePlanRange[1]) {
        queryCondition.value.datetimeEnd = queryCondition.value.datePlanRange[1].toString();
      }
    }
    queryCondition.value.status = currTodoId.value;

    // 获取待办列表信息
    pageUI.value.page = 1;
    pageUI.value.rows = 5;
    const res = (await apiMain.workbenchTodo.list({
      pagenum: pageUI.value.page,
      pagesize: pageUI.value.rows,
      ...queryCondition.value,
    })) as any;
    todoData.value = res.list;
    total.value = res.total;

    // 获取待办总数信息
    const resListCount = (await apiMain.workbenchTodo.listCount()) as any;
    if (resListCount) {
      unProcessCount.value = resListCount.unProcessedCount;
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 跳转到URL
const onHandelUrl = async (row: any) => {
  await apiMain.workbenchTodo.updateIsRead({
    todoId: row.todoId,
    isRead: 1,
  });

  if (row && row.todoUrl) {
    const tabRouters = router.getRoutes();
    const routeInfo = tabRouters.find((item1) => item1.meta.sourcePath === row.todoUrl);
    if (routeInfo) {
      const url = `${routeInfo.path}?dataId=${row.dataId}&todoId=${row.id}`;
      router.push(url);
    }
  }
  console.log(row);
};

// 跳转到我的待办
const onHandelTodoMenu = async () => {
  const toDoUrl = '/main#/todo';
  openPage(toDoUrl);
};
</script>

<style lang="less" scoped>
.activeTodo {
  background-color: var(--td-brand-color);
  width: 4px;
  height: 16px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  top: 11px;
}

.t-list .is-selected {
  background: #366ef49c;
  color: white;
}

.t-list .t-list-item {
  border-radius: 4px;
}

.list-card-todo {
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

.list-item {
  width: 100%;
  // margin-top: 10px;
}

.cpm-box {
  padding-left: 6px !important;
  padding-right: 6px !important;
}

.table-cell-href {
  color: rgb(63 93 237 / 100%);
  cursor: pointer;
}

:deep(.t-table) {
  border: none !important;
}

:deep(.t-table--layout-fixed) {
  border: 1px solid #d5d8db !important;
}

.recommend-more {
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 17.38px;
  color: #454545;
  position: absolute;
  bottom: 20px;
  right: 24px;
}

.component-table {
  height: auto !important;
}

.gray-icon {
  color: rgb(179 179 195);
}

.green-icon {
  color: rgb(2 158 85 / 100%);
}
</style>
