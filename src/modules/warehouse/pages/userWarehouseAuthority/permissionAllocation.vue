<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <t-row justify="space-between" align="center">
        <t-col :span="1"><icon name="rollback" size="25px" style="cursor: pointer" @click="onClose"></icon></t-col>
        <t-col :span="8">
          <cmp-query :opts="opts" @submit="onInput">
            <template #productCode="{ param }">
              <t-select v-model="param.productCode" label="条码状态">
                <t-option key="apple" label="禁用" value="0" />
                <t-option key="orange" label="启用" value="1" />
                <t-option key="orange" label="全部" value="-1" />
              </t-select>
            </template>
            <template #boxCode="{ param }">
              <t-input v-model="param.boxCode" placeholder="请输入仓库编码/仓库名称"></t-input>
            </template>
          </cmp-query>
        </t-col>
      </t-row>
    </cmp-card>
    <cmp-row>
      <cmp-card ref="treeCard" flex="350px">
        <t-space direction="vertical" :size="8">
          <h3>用户列表</h3>
          <t-input v-model="AuthList.keyword" placeholder="admin" style="width: 250px" :on-enter="onInputSearchUser">
            <template #suffixIcon>
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
          <!-- <t-pagination-mini layout="horizontal" size="medium" /> -->
          <t-pagination
            v-model:current="AuthList.pageNum"
            v-model:pageSize="AuthList.pageSize"
            :show-page-size="true"
            :show-previous-and-next-btn="false"
            :show-page-number="true"
            :show-jumper="false"
            :total="totals"
            @page-size-change="onPaginationChange"
            @current-change="onCurrentChange"
          />
        </t-space>
      </cmp-card>
      <cmp-card flex="auto">
        <t-space direction="vertical" :size="8" style="padding: 0">
          <cmp-card :span="12" :ghost="true">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="columns"
              :loading="loading"
              :max-height="treeHeight"
              :table-data="data"
              :total="tableTotal"
              :selected-row-keys="selectedRowKeys"
              @select-change="rehandleSelectChange"
              @refresh="onGetRefresh"
            >
              <template #operate
                ><t-button :loading="saveLoading" theme="default" @click="onBtnSave">保存</t-button></template
              >
            </cmp-table>
          </cmp-card>
        </t-space>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, WorkstationAuthVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
import { api as apiWare } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const tableTotal = ref(10); // table分页总数
const selectedRowKeys = ref([]); // 选择的
const saveLoading = ref(false); // 选择的
const { loading } = useLoading(); // loading
const value = ref([]);
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
  MessagePlugin.success('操作成功');
  console.log('🚀 ~ onBtnSave ~ selectedRowKeys.value:', selectedRowKeys.value);
};

// 数控件
const { pageUI } = usePage();

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
  },
  {
    colKey: 'warehouseCode',
    title: '仓库编码',
    align: 'center',
  },
  {
    colKey: 'warehouseName',
    title: '仓库名称',
    align: 'center',
  },
];
// 获取左侧表格数据
interface WorkstationAuth extends WorkstationAuthVO {
  label?: string;
}
const dataTree = ref<WorkstationAuthVO[]>([]);
const totals = ref<number>(0); // 用户分页总数
const AuthList = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
});
const onFetchData = async () => {
  const { list, total } = await api.workstationAuth.getUserList(AuthList.value);
  dataTree.value = (list as WorkstationAuth[]).map((item) => {
    item.label = `${item.userDisplayName}[${item.userName}]`;
    return item;
  });
  totals.value = total;
};

// 获取右侧表格数据
const data = ref([]); // table 存储
const searchList = ref({
  pageNum: 1,
  pageSize: 10,
  state: -1,
  keyword: '',
});
const onGetAllPermission = async () => {
  searchList.value.pageNum = pageUI.value.page;
  searchList.value.pageSize = pageUI.value.rows;
  const res = await apiMain.warehouse.search(searchList.value);
  data.value = res.list;
  tableTotal.value = res.total;
};
// 获取选中权限数组
const onGetTickPermission = async () => {
  const res = await apiWare.userWarehouseAuthority.getUserAuthority({ userId: userId.value });
  selectedRowKeys.value = res;
};

// 表格刷新按钮事件
const onGetRefresh = async () => {
  await onGetAllPermission();
  await onGetTickPermission();
};

// 点击用户拿数据
const userId = ref('');
const onClickTree = async ({ node }) => {
  userId.value = node.data.userId;
  selectedRowKeys.value = [];
  await onGetAllPermission();
  await onGetTickPermission();
};
// 左侧表格分页 事件 1
const onPaginationChange = async () => {
  AuthList.value.pageNum = 1;
  await onFetchData();
};
// 左侧表格分页 事件 2
const onCurrentChange = async () => {
  await onFetchData();
};

// # 左侧搜索事件
const onInputSearchUser = async () => {
  AuthList.value.pageNum = 1;
  await onFetchData();
};

const treeCard = ref(null);
const treeHeight = ref('300px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  treeHeight.value = `${height - 180}px`;
  console.error('treeHeight', treeHeight.value);
});

// #query 查询参数
const opts = computed(() => {
  return {
    productCode: {
      label: '',
      defaultVal: '-1',
      slotName: 'productCode',
    },
    boxCode: {
      label: '',
      slotName: 'boxCode',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  searchList.value.state = data.productCode;
  searchList.value.keyword = data.boxCode;
  await onGetAllPermission();
};
</script>

<style lang="less" scoped>
.header-save {
  display: flex;
}

.scorllTree {
  overflow-y: auto;
}
</style>
