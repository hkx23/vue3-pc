<template>
  <div>
    <!-- 子from -->
    <detailed v-if="detailedShow" @added-show="onHandleSave"></detailed>
    <!-- 头部 -->
    <t-card v-if="!detailedShow" class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <div class="work-center-box">
          <t-col>
            <t-button variant="base" @click="onHandelAdded">新增</t-button>
            <t-divider layout="vertical" />
            <t-button theme="default" variant="base">导出...</t-button></t-col
          >
          <t-col>
            <div class="select-work">
              <t-select
                v-model="value1"
                style="width: 200px; margin: 0 10px"
                :options="options1"
                placeholder="工作中心编号或者名称"
                clearable
                @focus="onFocus"
                @blur="onBlur"
              ></t-select>
              <t-select
                v-model="value2"
                style="width: 100px; margin: 0 10px"
                :options="options2"
                placeholder="所有车间"
                clearable
                @focus="onFocus"
                @blur="onBlur"
              ></t-select>
            </div>
          </t-col>
        </div>
      </t-row>
      <!-- 表格 -->
      <t-table
        row-key="name"
        vertical-align="middle"
        :columns="columns"
        :data="workData"
        :selected-row-keys="selectedRowKeys"
        lazy-load
        :pagination="workStationPagination"
        @page-change="onWorkStationPageChange"
        @select-change="rehandleSelectChange"
      >
        <template #Work-center-number="{ row }">
          <div>
            <t-icon name="chevron-right"></t-icon>
            <t-link theme="primary" underline @click="onHandelNumber(row.WorkCenterNumber)"
              >{{ row.WorkCenterNumber }}
            </t-link>
          </div>
        </template>
        <template #parentWorkCenter>
          <div>11</div>
        </template>
        <template #edit>
          <!-- 编辑 -->
          <icon name="edit-1"></icon>
        </template>
      </t-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { Icon, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

import detailed from './detailed.vue';

const detailedShow = ref(false); // 控制子工作中心显示隐藏
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'Work-center-number',
    title: '工作中心编号',
    align: 'center',
  },
  {
    colKey: 'name',
    title: '名称',
    align: 'center',
  },
  {
    colKey: 'types',
    title: '类型',
    align: 'center',
  },
  {
    colKey: 'Workshop',
    title: '所属车间',
    align: 'center',
  },
  {
    colKey: 'location',
    title: '地点',
    align: 'center',
  },
  {
    colKey: 'parentWorkCenter',
    title: '父工作中心',
    align: 'center',
  },
  {
    colKey: 'head',
    title: '负责人',
    align: 'center',
  },
  {
    colKey: 'edit',
    title: '',
    align: 'center',
  },
];
const selectedRowKeys = ref([]); // 用于存储选中行的数组
const workData = ref([
  {
    WorkCenterNumber: '0752-A01-WCO1',
    name: ['你好'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    parentWorkCenter: '-',
    head: '李四',
  },
  {
    WorkCenterNumber: '0752-A01-WCO2',
    name: ['你好'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    parentWorkCenter: '-',
    head: '李四',
  },
  {
    WorkCenterNumber: '0752-A01-WCO3',
    name: ['你好'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    parentWorkCenter: '-',
    head: '李四',
  },
]);
const value1 = ref('');
const value2 = ref('');
const options1 = [
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
];
const options2 = [
  { label: '架构云', value: '1', title: '架构云选项' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
];
// 工作中心跳转到form
const onHandelNumber = (value) => {
  detailedShow.value = true;
  console.log(value);
};
const onFocus = (ctx: any) => {
  console.log('focus:', ctx);
};

const onBlur = (ctx: any) => {
  console.log('blur:', ctx);
};

// 分页
const workStationPagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 20,
  total: 0,
  showJumper: true,
});
const onWorkStationPageChange = (pageInfo: { current: number; pageSize: number }) => {
  workStationPagination.value.defaultCurrent = pageInfo.current;
};
// 新增按钮
const onHandelAdded = () => {
  detailedShow.value = true;
};
// 子组件控制
const onHandleSave = (value: any) => {
  detailedShow.value = value;
};
// checked事件
const rehandleSelectChange = (value: any, ctx: any) => {
  selectedRowKeys.value = value;
  console.log('value:', value, '1', ctx);
};
</script>

<style lang="less" scoped>
.work-center-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--td-comp-margin-xxl);
}

.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

:deep(.t-divider) {
  height: var(--td-comp-size-s);
}

.select-work {
  display: flex;
  width: 100%;
}
</style>
