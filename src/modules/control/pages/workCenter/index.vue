<template>
  <div>
    <!-- 子from -->
    <detailed v-if="detailedShow" @added-show="onHandleSave"></detailed>
    <!-- 头部 -->
    <t-card v-if="!detailedShow" class="list-card-container" :bordered="false">
      <t-head-menu v-model="valueItem" theme="light">
        <t-menu-item v-for="item in allType" :key="item.id" :value="item.value"> {{ item.name }} </t-menu-item>
      </t-head-menu>
      <t-row justify="space-between">
        <div class="work-center-box">
          <t-col>
            <t-button variant="base" @click="onHandelAdded">新增</t-button>
            <t-divider layout="vertical" />
            <t-button theme="default" variant="base">导出...</t-button>
          </t-col>
          <t-col>
            <div class="select-work">
              <span style="margin: 0 20px">
                <tm-select-business v-model="workState.workcenter" type="workcenter"></tm-select-business
              ></span>
              <tm-select-business v-model="workState.shop" type="workshop"></tm-select-business>
            </div>
          </t-col>
        </div>
      </t-row>
      <!-- 表格 -->
      <tm-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="name"
        :table-column="columns"
        :table-data="workData"
        :total="page.total"
        :loading="loading"
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="fetchData"
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
      </tm-table>
      <!-- </t-table> -->
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon } from 'tdesign-vue-next';
import { ref } from 'vue';

import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
import detailed from './detailed.vue';

const valueItem = ref('item1');
const tableRef = ref();
const allType = ref([
  {
    name: '所有类型',
    id: 0,
    opId: [1, 2, 3, 4],
    value: 'item1',
  },
  {
    name: '工作区',
    id: 1,
    opId: [1],
    value: 'item2',
  },
  {
    name: '生产线',
    id: 2,
    opId: [2],
    value: 'item3',
  },
  {
    name: '工段',
    id: 3,
    opId: [3],
    value: 'item4',
  },
  {
    name: '设备',
    id: 4,
    opId: [4],
    value: 'item5',
  },
]);
// 刷新
const fetchData = async () => {
  setLoading(true);
  setTimeout(() => {
    workData.value = _.cloneDeep(workData.value);
    setLoading(false);
  }, 600);
};

const detailedShow = ref(false); // 控制子工作中心显示隐藏
// 初始数据
const columns = [
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
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
setLoading(false);
const page = ref({
  pageNum: 1,
  pageSize: 5,
  total: 10,
});
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
// 通用下拉初始数据
const workState = ref({
  shop: '',
  workcenter: '',
});
// 工作中心跳转到form
const onHandelNumber = (value) => {
  detailedShow.value = true;
  console.log(value);
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
