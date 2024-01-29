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
          <h3>用户列表</h3>
          <t-input v-model="permission.user" placeholder="admin" style="width: 250px" :on-enter="onInputSearchUser">
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
              @refresh="onTable"
            >
              <template #operate>
                <t-input v-model="permission.work" placeholder="请输入工站/工作中心/工序" :on-enter="onInputSearchWork">
                  <template #prefix-icon>
                    <icon name="search"></icon>
                  </template>
                </t-input>
                <t-button :loading="saveLoading" @click="onBtnSave">保存</t-button>
              </template>
              <template #title> {{ permission.label }} 工站列表 </template>
            </cmp-table>
          </cmp-card>
        </t-space>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import _, { debounce } from 'lodash';
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, WorkstationAuthVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const asyncLoadingRadio = ref('load-more');
const asyncLoading = computed(() => {
  if (asyncLoadingRadio.value === 'loading-custom') {
    return '没有更多数据了~';
  }
  return asyncLoadingRadio.value;
});
const current = ref(1); // 用户当前页
const pageSize = ref(5); // 用户请求数
const total = ref(10); // 用户分页总数
const tableTotal = ref(10); // table分页总数
const selectedRowKeys = ref([]); // 选择的
const saveLoading = ref(false); // 选择的
const { loading, setLoading } = useLoading(); // loading
const permission = ref({
  user: '', // 用户
  work: '',
  userId: '', // 用户id
  label: '',
  state: [1],
});
onMounted(async () => {
  await onFetchData();
  if (dataTree.value.length > 0) {
    onClickList(dataTree.value[0], 0);
  }
});
// 选择中的
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
};

// 点击加载更多
const scrollHandler = debounce(async () => {
  asyncLoadingRadio.value = 'loading';
  current.value++;
  await onFetchData();
  asyncLoadingRadio.value = 'load-more';
  if (dataTree.value.length >= total.value) {
    asyncLoadingRadio.value = 'loading-custom';
  }
});

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
  // Emit('permissionShow', false);
  if (permission.value.userId === '') {
    MessagePlugin.error('请选择用户');
    return;
  }
  const delArr = findElementsNotInA(selectedRowKeys.value, rawArray.value);
  const addArr = findElementsNotInB(selectedRowKeys.value, rawArray.value);
  saveLoading.value = true;
  // console.log('保存', permission.value.userId);
  await api.workstationAuth.save({ userId: permission.value.userId, inseartList: addArr, removeList: delArr });
  await onCheckArr();
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
// 获取左侧表格数据
interface WorkstationAuth extends WorkstationAuthVO {
  label?: string;
}
const onFetchData = async () => {
  // 左侧
  try {
    const useList = await api.workstationAuth.getUserList({
      pageNum: current.value,
      pageSize: pageSize.value,
      keyword: permission.value.user,
    });
    const newArr = (useList.list as WorkstationAuth[]).map((item) => {
      item.label = `${item.userDisplayName}[${item.userName}]`;
      return item;
    });
    dataTree.value = [...dataTree.value, ...newArr];
    total.value = useList.total;
  } catch (e) {
    console.log(e);
  }
};

const onTable = async () => {
  // 右边列表
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
};

// 获取选中的数组
const rawArray = ref([]);
const userId = ref(''); // id
const onCheckArr = async () => {
  const res = await api.workstationAuth.getUserAuth({
    userId: userId.value,
  });
  selectedRowKeys.value = res.list;
  rawArray.value = res.list;
};

// 点击用户拿数据
const selectedListItemIndex = ref(0);
const onClickList = async (item, index) => {
  selectedRowKeys.value = [];
  permission.value.userId = item.userId;
  permission.value.label = item.label;
  selectedListItemIndex.value = index;
  userId.value = item.userId;
  await onTable();
  await onCheckArr();
};
// 用户
const onInputSearchUser = async () => {
  dataTree.value = [];
  await onFetchData();
  if (dataTree.value.length > 0) {
    onClickList(dataTree.value[0], 0);
  }
};
// 列表
const onInputSearchWork = () => {
  onTable();
};

const treeCard = ref(null);
const treeHeight = ref('300px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  treeHeight.value = `${height - 180}px`;
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

.selected-background {
  color: var(--td-brand-color);
  background-color: var(--td-brand-color-light) !important; /* 替换为你希望的颜色 */
}
</style>
