<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <t-row justify="space-between" align="center">
        <t-col><h3>用户仓库权限分配</h3></t-col>
        <t-col><icon name="close" size="20px" style="cursor: pointer" @click="onClose"></icon></t-col>
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
              <template #operate>
                <t-select v-model="param.productCode" label="状态" @change="onSelectChange">
                  <t-option key="apple" label="禁用" :value="0" />
                  <t-option key="orange" label="启用" :value="1" />
                  <t-option key="orange" label="全部" :value="-1" />
                </t-select>
                <t-input
                  v-model="param.boxCode"
                  placeholder="请输入仓库编码/仓库名称"
                  :on-enter="onInputEnter"
                ></t-input>
                <t-button :loading="saveLoading" theme="default" @click="onBtnSave">保存仓库权限</t-button>
              </template>
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
import { onMounted, ref } from 'vue';
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
const { pageUI } = usePage();
onMounted(async () => {
  await onFetchData();
  await onGetAllPermission();
});
// 选择中的
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};
// 筛选删除数组
function findElementsNotInA(a, b) {
  // 创建集合 setA 包含数组 a 的所有元素
  const setA = new Set(a);
  // 使用 filter 方法过滤数组 b，只保留不在集合 setA 中的元素
  return b.filter((item) => !setA.has(item));
}
// 筛选新增数组
function findElementsNotInB(a, b) {
  // 创建集合 setB 包含数组 b 的所有元素
  const setB = new Set(b);
  // 使用 filter 方法过滤数组 a，只保留不在集合 setB 中的元素
  return a.filter((item) => !setB.has(item));
}
// 保存
const onBtnSave = async () => {
  if (!userId.value) {
    MessagePlugin.warning('请先选择一个用户！');
    return;
  }
  const delArr = findElementsNotInA(selectedRowKeys.value, rawArray.value);
  const addArr = findElementsNotInB(selectedRowKeys.value, rawArray.value);
  await apiWare.userWarehouseAuthority.saveAuthority({
    userId: userId.value,
    inseartList: addArr,
    removeList: delArr,
  });

  MessagePlugin.success('操作成功');
};

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
// 搜索数据
const param = ref({
  productCode: -1,
  boxCode: '',
});
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
const rawArray = ref([]);
const onGetTickPermission = async () => {
  const res = await apiWare.userWarehouseAuthority.getUserAuthority({ userId: userId.value });
  selectedRowKeys.value = res;
  rawArray.value = res;
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
const onPublicQuery = async () => {
  pageUI.value.page = 1;
  searchList.value.state = param.value.productCode;
  searchList.value.keyword = param.value.boxCode;
  await onGetAllPermission();
};

const onSelectChange = async () => {
  await onPublicQuery();
};

const onInputEnter = async () => {
  await onPublicQuery();
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
