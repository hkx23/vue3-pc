<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <t-row justify="space-between">
        <t-col><h2>权限分配</h2></t-col>
        <t-col><icon name="close" size="20px" style="cursor: pointer" @click="onClose"></icon></t-col>
      </t-row>
    </cmp-card>
    <cmp-row>
      <cmp-card ref="treeCard" flex="350px">
        <t-space direction="vertical" :size="8">
          <h3 style="margin: 10px 0">用户列表</h3>
          <t-input v-model="permission.user" placeholder="admin" :on-enter="onInputSearchUser">
            <template #prefix-icon>
              <icon name="search"></icon>
            </template>
          </t-input>
          <t-tree
            class="scorllTree"
            :data="dataTree"
            :value="value"
            :height="treeHeight"
            :expand-parent="false"
            :transition="false"
            :activable="true"
            @click="onClickTree"
          >
          </t-tree>
          <t-pagination v-model="current" v-model:pageSize="pageSize" :total="total" />
        </t-space>
      </cmp-card>
      <cmp-card flex="auto">
        <cmp-container :full="true" style="padding: 0">
          <cmp-card :span="12" :ghost="true">
            <t-row justify="space-between">
              <t-col style="margin: 3px 0"> <t-button :loading="saveLoading" @click="onBtnSave">保存</t-button></t-col>
              <t-col style="display: flex">
                <t-select
                  v-model="selectValue"
                  :options="options1"
                  placeholder="请选择云解决方案"
                  @change="onchange1"
                ></t-select>
                <t-input
                  v-model="permission.work"
                  placeholder="请输入工站/工作中心/工序"
                  :on-enter="onInputSearchWork"
                  style="margin-left: 10px"
                >
                  <template #prefix-icon>
                    <icon name="search"></icon>
                  </template>
                </t-input>
              </t-col> </t-row
          ></cmp-card>
          <cmp-card :span="12" :ghost="true">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="columns"
              :loading="loading"
              :table-data="data"
              :total="tableTotal"
              :selected-row-keys="selectedRowKeys"
              @select-change="rehandleSelectChange"
              @refresh="onFetchData"
            >
              <template #button>
                <span style="font-weight: bold; margin: 0 10px">{{ permission.label }} 工站列表</span>
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
  <!-- <div>
    <t-card :bordered="false" style="margin-bottom: 10px">
    
    </t-card>
    <t-card :bordered="false">
      <t-row>
        <t-col :span="4">
          <t-card :bordered="false">
            <div>
            
            </div>
          </t-card>
        </t-col>
        <t-col :span="8">
          <t-card :bordered="false">
           
          </t-card>
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="columns"
            :loading="loading"
            :table-data="data"
            :total="tableTotal"
            :selected-row-keys="selectedRowKeys"
            @select-change="rehandleSelectChange"
            @refresh="onFetchData"
          ></cmp-table>
        </t-col>
      </t-row>
    </t-card>
  </div> -->
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const current = ref(1); // 用户当前页
const pageSize = ref(20); // 用户请求数
const total = ref(10); // 用户分页总数
const tableTotal = ref(10); // table分页总数
const selectedRowKeys = ref([]); // 选择的
const saveLoading = ref(false); // 选择的
const { loading, setLoading } = useLoading(); // loading
const selectValue = ref(1);
const options1 = ref([
  { label: '生效', value: 1 },
  { label: '未生效', value: 0 },
]);
const value = ref([]);
const permission = ref({
  user: '', // 用户
  work: '',
  userId: '', // 用户id
  label: '',
  state: [],
});
const permissionName = ref(0);
onMounted(() => {
  onFetchData();
});
// 选择中的
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};
// 保存
const onBtnSave = async () => {
  // Emit('permissionShow', false);
  if (permission.value.userId === '') {
    MessagePlugin.error('请选择用户');
    return;
  }
  saveLoading.value = true;
  // console.log('保存', permission.value.userId);
  await api.workstationAuth.save({ userId: permission.value.userId, ids: selectedRowKeys.value });
  saveLoading.value = false;
  MessagePlugin.success('保存成功');
};

// 数控件
const dataTree = ref([]);
const { pageUI } = usePage();

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
const data = ref([]); // table 存储
const columns = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'workstationCode',
    title: '工站编码',
    align: 'center',
  },
  {
    colKey: 'workstationName',
    title: '工站名称',
    align: 'center',
  },
  {
    colKey: 'workstationDesc',
    title: '工站描述',
    align: 'center',
  },
  {
    colKey: 'workcenterName',
    title: '工站中心',
    align: 'center',
  },
  {
    colKey: 'processName',
    title: '工序',
    align: 'center',
    fix: 'left',
  },
];
// 首次请求
const onFetchData = async () => {
  // 用户为0 则全部渲染  1代表用户   2代表列表
  if (permissionName.value === 0 || permissionName.value === 1) {
    // 左侧
    try {
      const useList = await api.workstationAuth.getUserList({
        pageNum: current.value,
        pageSize: pageSize.value,
        keyword: permission.value.user,
      });
      dataTree.value = useList.list;
      dataTree.value.forEach((item) => {
        item.label = `${item.userDisplayName}[${item.userName}]`;
        item.value = item.userId;
        item.show = false;
        value.value.push(item.value);
      });
      total.value = useList.total;
    } catch (e) {
      console.log(e);
    }
  }

  // 右边列表
  if (permissionName.value === 0 || permissionName.value === 2) {
    console.log(selectValue.value);

    setLoading(true);
    try {
      const list = await apiMain.workstation.getlist({
        pageNum: pageUI.value.page,
        pageSize: pageUI.value.rows,
        keyword: permission.value.work.trim(),
        state: permission.value.state,
      });
      data.value = list.list;
      tableTotal.value = list.total;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  // 初始化
  permissionName.value = 0;
  // permission.value.label = '';
};
const onchange1 = () => {
  if (selectValue.value === 1) {
    permission.value.state = [1];
  } else {
    permission.value.state = [0];
  }
  onFetchData();
};
// 点击用户拿数据
const onClickTree = async (e: any) => {
  selectedRowKeys.value = [];
  permission.value.userId = e.node.value;
  permission.value.label = e.node.label;
  const res = await api.workstationAuth.getUserAuth({
    pageNum: current.value,
    pageSize: pageSize.value,
    userId: e.node.value,
  });
  // console.log(res);
  console.log(res.list);

  res.list.forEach((item) => {
    selectedRowKeys.value.push(item);
  });
  // selectedRowKeys.value.push(res.list);
  console.log(selectedRowKeys.value);
  // data.value = res.list;
  // tableTotal.value = res.total;
};
// 用户
const onInputSearchUser = () => {
  permissionName.value = 1;
  onFetchData();
};
// 列表
const onInputSearchWork = () => {
  permissionName.value = 2;
  onFetchData();
};

const treeCard = ref(null);
const treeHeight = ref('300px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];

  const { height } = entry.contentRect;
  treeHeight.value = `${height - 160}px`;
  console.error('treeHeight', treeHeight.value);
});
</script>

<style lang="less" scoped>
.header-save {
  display: flex;
}

.scorllTree {
  overflow-y: auto;
}
</style>
