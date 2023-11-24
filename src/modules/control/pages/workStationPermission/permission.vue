<template>
  <div>
    <t-card :bordered="false">
      <t-row justify="space-between">
        <t-col><h3>权限分配</h3></t-col>
        <t-col><icon name="close" size="20px" style="cursor: pointer" @click="onClose"></icon></t-col>
      </t-row>
    </t-card>
    <t-card :bordered="false">
      <t-row>
        <t-col :span="5">
          <t-card :bordered="false">
            <div>
              <h3 style="margin: 7px 0">用户列表</h3>
              <t-input placeholder="admin">
                <template #prefix-icon>
                  <icon name="search"></icon>
                </template>
              </t-input>
              <t-tree :data="dataTree">
                <!-- <t-template #icon="{ node }"></t-template> -->
              </t-tree>
              <t-pagination
                v-model="current1"
                v-model:pageSize="pageSize1"
                :total="total1"
                @change="onChange"
                @page-size-change="onPageSizeChange"
                @current-change="onCurrentChange"
              />
            </div>
          </t-card>
        </t-col>
        <t-col :span="7">
          <t-card :bordered="false">
            <t-row justify="space-between">
              <t-col>
                <span style="font-weight: bold; margin: 0 10px">管理员[admin]工站列表</span>
                <t-button>保存</t-button></t-col
              >
              <t-col>
                <t-input placeholder="请输入工站/工作中心/工序" auto-width>
                  <template #prefix-icon>
                    <icon name="search"></icon>
                  </template>
                </t-input>
              </t-col>
            </t-row>
          </t-card>
          <tm-table
            v-model:pagination="pageUI"
            :table-column="columns"
            :table-data="data"
            :total="total"
            @refresh="onFetchData"
          ></tm-table>
        </t-col>
      </t-row>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon } from 'tdesign-vue-next';
import { ref } from 'vue';

import TmTable from '@/components/tm-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const current1 = ref(1);
const pageSize1 = ref(20);
const total = ref(10);
const total1 = ref(10);
const onPageSizeChange = (size) => {
  console.log('page-size:', size);
  // MessagePlugin.success(`pageSize变化为${size}`);
};

const onCurrentChange = (index, pageInfo) => {
  // MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};

const onChange = (pageInfo) => {
  console.log(pageInfo);
};
const dataTree = ref([
  {
    label: '管理员[admin]',
  },
  {
    label: '张三[2]',
  },
  {
    label: '李四[3]',
  },
  {
    label: '高手[4]',
  },
]);
const { pageUI } = usePage();

// 父方法
const Emit = defineEmits(['permissionShow']);
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
const data = ref([
  {
    WorkCenterNumber: '001',
    workName: '凌凌漆',
    workStationDes: '吹牛',
    workCenter: '大内',
    processes: '1',
  },
]);
const columns = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'WorkCenterNumber',
    title: '工站编码',
    align: 'center',
  },
  {
    colKey: 'workName',
    title: '工站名称',
    align: 'center',
  },
  {
    colKey: 'workStationDes',
    title: '工站描述',
    align: 'center',
  },
  {
    colKey: 'workCenter',
    title: '工站中心',
    align: 'center',
  },
  {
    colKey: 'processes',
    title: '工序',
    align: 'center',
    fix: 'left',
  },
];
const onFetchData = async () => {
  data.value = _.cloneDeep(data.value);
};
</script>

<style lang="less" scoped>
.header-save {
  display: flex;
}
</style>
