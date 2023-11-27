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
              <t-input v-model="permission.user" placeholder="admin" :on-enter="onInputSearchUser">
                <template #prefix-icon>
                  <icon name="search"></icon>
                </template>
              </t-input>
              <t-tree :data="dataTree" :value="value" :expand-parent="false" :transition="false" @click="onClickTree">
              </t-tree>
              <t-pagination v-model="current" v-model:pageSize="pageSize" :total="total" />
            </div>
          </t-card>
        </t-col>
        <t-col :span="7">
          <t-card :bordered="false">
            <t-row justify="space-between">
              <t-col>
                <span style="font-weight: bold; margin: 0 10px">{{ permission.label }}工站列表</span>
                <t-button @click="onBtnSave">保存</t-button></t-col
              >
              <t-col>
                <t-input v-model="permission.work" placeholder="请输入工站/工作中心/工序" :on-enter="onInputSearchWork">
                  <template #prefix-icon>
                    <icon name="search"></icon>
                  </template>
                </t-input>
              </t-col>
            </t-row>
          </t-card>
          <tm-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="columns"
            :loading="loading"
            :table-data="data"
            :total="tableTotal"
            :selected-row-keys="selectedRowKeys"
            :show-pagination="false"
            @select-change="rehandleSelectChange"
            @refresh="onFetchData"
          ></tm-table>
        </t-col>
      </t-row>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const current = ref(1); // 用户当前页
const pageSize = ref(20); // 用户请求数
const total = ref(10); // 用户分页总数
const tableTotal = ref(10); // table分页总数
const selectedRowKeys = ref([]); // 选择的
const { loading, setLoading } = useLoading();
const value = ref([]);
const permission = ref({
  user: '',
  work: '',
  userId: '',
  label: '',
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
  console.log('保存', permission.value.userId);

  await api.workstationAuth.save({ userId: permission.value.userId, ids: selectedRowKeys.value });
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
    try {
      const useList = await api.workstationAuth.getUserList({
        pageNum: current.value,
        pageSize: pageSize.value,
        keyword: permission.value.user,
      });
      dataTree.value = useList.list;
      dataTree.value.forEach((item) => {
        item.label = `${item.personName}[${item.userName}]`;
        item.value = item.userId;
        value.value.push(item.value);
      });
      total.value = useList.total;
    } catch (e) {
      console.log(e);
    }
  }

  // 左边列表
  if (permissionName.value === 0 || permissionName.value === 2) {
    setLoading(true);
    try {
      const list = await api.workstation.getlist({
        pageNum: 1,
        pageSize: 9999,
        workcenter: permission.value.work,
        workstaion: permission.value.work,
        process: permission.value.work,
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
</script>

<style lang="less" scoped>
.header-save {
  display: flex;
}
</style>
