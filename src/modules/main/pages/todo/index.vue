<!-- 工序缺陷 -->
<template>
  <cmp-container :full="true" class="root">
    <cmp-row>
      <cmp-card ref="refTodoCard" flex="260px">
        <t-list size="small" split :style="{ 'max-height': `${todoHeight}` }">
          <div v-for="item in filterTodoList" :key="item.value">
            <t-badge :show-zero="true" :count="item.count" class="list-item" :offset="[10, 10]">
              <t-list-item :class="{ 'is-selected': currTodoId == item.value }" @click="onClickTodo(item.value)">
                {{ item.label }}
                <template #action>
                  <!-- <t-icon v-if="currTodoId == item.value" name="focus" /> -->
                  <div v-if="currTodoId == item.value" class="activeTodo"></div>
                </template>
              </t-list-item>
            </t-badge>
          </div>
        </t-list>
      </cmp-card>
      <cmp-container class="cpm-box" :full="true" :ghost="true">
        <cmp-card>
          <!-- 查询组件  -->
          <cmp-query :opts="opts" @submit="conditionEnter" />
        </cmp-card>
        <cmp-card flex="auto">
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="column"
            :table-data="todoData"
            :loading="loading"
            :total="total"
            :fixed-height="true"
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
            <template #todoUrl="{ row }">
              <a
                class="table-cell-href"
                @click="
                  {
                    onHandelUrl(row);
                  }
                "
              >
                {{ row.todoUrl }}
              </a>
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-row>
  </cmp-container>

  <!-- <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onDeleteConfirm">
    <h3 class="list-save">选中{{ todoRorKey.length }}条</h3>
  </t-dialog> -->
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import _ from 'lodash';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';
import { useRouter } from 'vue-router';

import { api as apiMain } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});
const router = useRouter();

const refTodoCard = ref(null);
const todoHeight = ref('300px');
useResizeObserver(refTodoCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  todoHeight.value = `${height - 130}px`;
  console.error('treeHeight', todoHeight.value);
});

// input框搜索
const opts = computed(() => {
  return {
    title: {
      label: t('todo.titleName'),
      placeholder: '请输入',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    datePlanRange: {
      label: t('todo.timeCreate'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择',
    },
  };
});
const conditionEnter = (data) => {
  queryCondition.value = _.cloneDeep(data);
  onFetchData();
};

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
const filterTodoList = ref([
  { label: '待处理', value: 'UNPROCESS', count: 0 },
  { label: '已处理', value: 'PROCESSED', count: 0 },
]);

// table定义
const column = ref([
  // { colKey: 'multiple', type: 'multiple', align: 'center' },
  { title: t('todo.titleName'), colKey: 'titleName', align: 'center', width: 140 },
  { title: t('todo.todoUrl'), colKey: 'todoUrl', align: 'center', width: 140 },
  {
    colKey: 'isReadName',
    title: t('todo.isReadName'),
    align: 'center',
    width: '80',
    cell: 'stateSwitch',
  },
  { title: t('todo.timeCreate'), colKey: 'timeCreate', align: 'center', width: 120 },
]);
// table数据
const todoData = ref([]);
const currTodoId = ref('UNPROCESS');
const onClickTodo = (id: string) => {
  if (id === currTodoId.value) return;
  currTodoId.value = id;
  onFetchData();
};

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
      filterTodoList.value[0].count = resListCount.unProcessedCount;
      filterTodoList.value[1].count = resListCount.processedCount;
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
    const url = `${row.todoUrl}?dataId=${row.dataId}&todoId=${row.id}`;
    router.push(url);
  }
  console.log(row);
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
  color: #4d6af9;
  cursor: pointer;
}
</style>
