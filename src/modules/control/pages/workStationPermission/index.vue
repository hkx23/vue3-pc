<template>
  <header>
    <div>
      <workPermission v-if="permission" @permission-show="onPermission"></workPermission>
    </div>
    <div v-if="!permission" class="list-card-container">
      <t-card :bordered="false" gutter>
        <t-row justify="space-between">
          <t-col :span="2"
            ><t-input
              v-model="inputValue.workstaion"
              label="工站代码/名称："
              placeholder="请输入工序代码/名称"
            ></t-input>
          </t-col>
          <t-col :span="2">
            <t-input v-model="inputValue.user" label="用户：" placeholder="请输入用户"></t-input>
          </t-col>
          <t-col :span="2"
            ><t-input v-model="inputValue.workcenter" label="工作中心：" placeholder="请输入工作中心/名称"></t-input>
          </t-col>
          <t-col :span="2"
            ><t-input v-model="inputValue.processes" label="工序：" placeholder="请输入工序"> </t-input>
          </t-col> </t-row
      ></t-card>
      <t-card :bordered="false" style="margin: 10px 0">
        <t-row justify="space-between">
          <t-col :span="2">
            <t-button @click="onHandelPermission">权限分配</t-button>
            <t-button theme="default" variant="base">批量删除</t-button></t-col
          >
          <t-col :span="2" style="display: flex; justify-content: flex-end">
            <t-button>查询</t-button> <t-button theme="default" variant="base">重置</t-button></t-col
          >
        </t-row>
      </t-card>
      <tm-table
        v-model:pagination="pageUI"
        row-key="name"
        :total="total"
        :table-column="column"
        :table-data="permissionData"
        :selected-row-keys="selectedRowKeys"
        @refresh="onfetchData"
        @select-change="rehandleSelectChange"
      >
        <template #operate>
          <icon name="delete"></icon>
        </template>
        <!-- <template #button>
        <div style="width: 100%">
          <t-button>批量删除</t-button>
          <t-button>批量删除</t-button>
        </div>
      </template> -->
      </tm-table>
    </div>
  </header>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon } from 'tdesign-vue-next';
import { ref } from 'vue';

import TmTable from '@/components/tm-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import workPermission from './permission.vue';

const selectedRowKeys = ref([]); // 全选控制存入字段
const { pageUI } = usePage(); // 分页
const total = ref(10); // 分页总数
const permission = ref(false); // 权限页面控制
const rehandleSelectChange = (value: any, ctx: AudioNode) => {
  selectedRowKeys.value = value;
  console.log(value, ctx);
};
const onPermission = (value) => {
  permission.value = value;
};
// 搜索控制初始数据
const inputValue = ref({
  workstaion: '',
  user: '',
  workcenter: '',
  processes: '',
});
// 数据字段
const column = ref([
  {
    colKey: 'checked',
    width: '90px',
    type: 'multiple',
    align: 'center',
  },
  {
    colKey: 'user',
    title: '用户',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'name',
    title: '姓名',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'stationCode',
    title: '工站代码',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'workstationName',
    title: '工站名称',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'workstationDes',
    title: '工站描述',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'workCenter',
    title: '工站名称',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'Process',
    title: '工序',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'founder',
    title: '创建人',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'createTimer',
    title: '创建时间',
    width: '90px',
    align: 'center',
  },
  {
    colKey: 'operate',
    title: '操作',
    width: '90px',
    align: 'center',
  },
]);
// 表格数据
const permissionData = ref([
  {
    user: '101团',
    name: '张花',
    stationCode: 'GZ004',
    workstationName: '201-Dan',
    workstationDes: '描述1',
    workCenter: '全栈',
    Process: '1号_(´ཀ`」∠)_',
    founder: '张嘉丽',
    createTimer: '2023-11-23 15-20-39',
  },
  {
    user: '101团',
    name: '罗',
    stationCode: 'GZ004',
    workstationName: '201-Dan',
    workstationDes: '描述1',
    workCenter: '全栈',
    Process: '1号_(´ཀ`」∠)_',
    founder: '罗刘敬',
    createTimer: '2023-11-23 15-20-39',
  },
]);
// 请求
const onfetchData = async () => {
  permissionData.value = _.cloneDeep(permissionData.value);
};
// 权限点击
const onHandelPermission = () => {
  // console.log(1);
  console.log(1);

  permission.value = true;
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}
</style>
