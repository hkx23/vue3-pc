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
          <t-list :style="{ 'max-height': treeHeight }" :async-loading="asyncLoading" split @load-more="scrollHandler">
            <t-list-item
              v-for="(item, index) in dataTree"
              :key="item.id"
              :class="{ 'selected-background': selectedListItemIndex === index }"
              @click="onClickList(item, index)"
              >{{ item.label }}</t-list-item
            >
          </t-list>
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
                <t-input v-model="param.boxCode" placeholder="请输入仓库编码/仓库名称" :on-enter="onInputEnter">
                  <template #prefix-icon>
                    <icon name="search"></icon>
                  </template>
                </t-input>
                <t-button :loading="saveLoading" theme="primary" @click="onBtnSave">保存仓库权限</t-button>
              </template>
            </cmp-table>
          </cmp-card>
        </t-space>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, WorkstationAuthVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
import { api as apiWare } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const asyncLoadingRadio = ref('load-more');
const tableTotal = ref(10); // table分页总数
const selectedRowKeys = ref([]); // 选择的
const saveLoading = ref(false); // 选择的
const { loading } = useLoading(); // loading
const { pageUI } = usePage();
const asyncLoading = computed(() => {
  if (asyncLoadingRadio.value === 'loading-custom') {
    return '没有更多数据了~';
  }
  return asyncLoadingRadio.value;
});
onMounted(async () => {
  console.log('🚀 ~ file: permissionAllocation.vue:86 ~ onMounted ~ async:', 'async');
  await onFetchData();
  await onGetAllPermission();
  if (dataTree.value.length > 0) {
    onClickList(dataTree.value[0], 0);
  }
});
// 选择中的
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
};
// 筛选删除数组
function findElementsNotInA(a, b) {
  // 创建集合 delNewArr 包含数组 a 的所有元素
  const delNewArr = new Set(a);
  // 使用 filter 方法过滤数组 b，只保留不在集合 delNewArr 中的元素
  return b.filter((item) => !delNewArr.has(item));
}
// 筛选新增数组
function findElementsNotInB(a, b) {
  // 创建集合 addNewArr 包含数组 b 的所有元素
  const addNewArr = new Set(b);
  // 使用 filter 方法过滤数组 a，只保留不在集合 addNewArr 中的元素
  return a.filter((item) => !addNewArr.has(item));
}
// 保存
const onBtnSave = debounce(async () => {
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
  await onGetTickPermission();
  MessagePlugin.success('操作成功');
}, 1000);

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
// 搜索数据
const param = ref({
  productCode: 1,
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
  },
  {
    colKey: 'warehouseName',
    title: '仓库名称',
  },
];
// 获取左侧表格数据
interface WorkstationAuth extends WorkstationAuthVO {
  label?: string;
}
const dataTree = ref<WorkstationAuth[]>([]);
const totals = ref<number>(0); // 用户分页总数
const AuthList = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
});
const onFetchData = async () => {
  const { list, total } = await api.workstationAuth.getUserList(AuthList.value);
  const newArr = (list as WorkstationAuth[]).map((item) => {
    item.label = `${item.userDisplayName}[${item.userName}]`;
    return item;
  });
  dataTree.value = [...dataTree.value, ...newArr];
  totals.value = total;
};

// 获取右侧表格数据
const data = ref([]); // table 存储
const searchList = ref({
  pageNum: 1,
  pageSize: 10,
  state: 1,
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

// 点击加载更多
const scrollHandler = debounce(async () => {
  asyncLoadingRadio.value = 'loading';
  AuthList.value.pageNum++;
  await onFetchData();
  asyncLoadingRadio.value = 'load-more';
  if (dataTree.value.length >= totals.value) {
    asyncLoadingRadio.value = 'loading-custom';
  }
}, 1000);

// 点击用户拿数据
const userId = ref('');
const selectedListItemIndex = ref(0);
const onClickList = async (item, index) => {
  selectedListItemIndex.value = index;
  userId.value = item.userId;
  selectedRowKeys.value = [];
  await onGetAllPermission();
  await onGetTickPermission();
};
// # 左侧搜索事件
const onInputSearchUser = async () => {
  dataTree.value = [];
  AuthList.value.pageNum = 1;
  await onFetchData();
  if (dataTree.value.length > 0) {
    onClickList(dataTree.value[0], 0);
  }
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

.selected-background {
  color: var(--td-brand-color);
  background-color: var(--td-brand-color-light) !important; /* 替换为你希望的颜色 */
}
</style>
