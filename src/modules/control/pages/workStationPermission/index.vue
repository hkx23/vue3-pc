<template>
  <workPermission v-if="permission" @permission-show="onPermission"></workPermission>

  <cmp-container v-if="!permission" :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="onResetting" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        :loading="loading"
        row-key="id"
        :total="total"
        :table-column="column"
        :fixed-height="true"
        :active-row-type="'single'"
        :hover="true"
        :table-data="permissionData"
        :selected-row-keys="selectedRowKeys"
        @refresh="onfetchData"
        @select-change="rehandleSelectChange"
      >
        <template #title> 工站权限列表 </template>
        <template #button>
          <t-button @click="onHandelPermission">权限分配</t-button>
          <t-popconfirm content="确认删除吗" @confirm="onDeleteAll">
            <t-button theme="default" variant="base">批量删除</t-button>
          </t-popconfirm>
        </template>
        <template #op="{ row }">
          <t-popconfirm content="确认删除吗" @confirm="onDelete(row.id)">
            <t-link theme="primary">删除</t-link>
          </t-popconfirm>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import workPermission from './permission.vue';

const { loading, setLoading } = useLoading();
const selectedRowKeys = ref([]); // 全选控制存入字段
const { pageUI } = usePage(); // 分页
const total = ref(10); // 分页总数
const permission = ref(false); // 权限页面控制
// 全选
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};
const onPermission = (value) => {
  permission.value = value;
  onfetchData();
};
onMounted(() => {
  onfetchData();
});
// 搜索控制初始数据
const inputValue = ref({
  workstationWord: '', // 工站代码/名称
  userWord: '', // 用户
  workcenterWord: '', // 工作中心
  processWord: '', // 工序
  pageNum: pageUI.value.page, // 当前页
  pageSize: pageUI.value.rows, // 请求数
  ids: [], // 多选数
  id: '', // 单个晒
  sorts: [],
  /** 筛选字段 */
  filters: [],
});
// 数据字段
const column = ref([
  {
    colKey: 'checked',
    width: '90px',
    type: 'multiple',
  },
  {
    colKey: 'userName',
    title: '用户',
    width: '160px',
  },
  {
    colKey: 'userDisplayName',
    title: '姓名',
    width: '160px',
  },
  {
    colKey: 'workstationCode',
    title: '工站代码',
    width: '160px',
  },
  {
    colKey: 'workstationName',
    title: '工站名称',
    width: '160px',
  },
  {
    colKey: 'workstationDesc',
    title: '工站描述',
    width: '160px',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    width: '160px',
  },
  {
    colKey: 'processName',
    title: '工序',
    width: '160px',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    width: '160px',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    width: '160px',
  },
  {
    colKey: 'op',
    title: '操作',
    width: '90px',
    fixed: 'right',
  },
]);
// 表格数据
const permissionData = ref([]);

// 点击查询按钮
const conditionEnter = (data: any) => {
  inputValue.value.workstationWord = data.workstationWord;
  inputValue.value.userWord = data.userWord;
  inputValue.value.workcenterWord = data.workcenterWord;
  inputValue.value.processWord = data.processWord;
  onSearch();
};
const opts = computed(() => {
  return {
    workstationWord: {
      label: '工站',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工站代码/名称',
    },
    userWord: {
      label: '用户',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入用户',
    },
    workcenterWord: {
      label: '工作中心',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工作中心/名称',
    },
    processWord: {
      label: '工序',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工序',
    },
  };
});
// 请求
const onfetchData = async () => {
  try {
    setLoading(true);
    const list = await api.workstationAuth.getlist({
      workcenterWord: inputValue.value.workcenterWord,
      userWord: inputValue.value.userWord,
      workstationWord: inputValue.value.workstationWord,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ids: inputValue.value.ids,
      id: inputValue.value.id,
    });
    console.log(list);
    permissionData.value = list.list;
    total.value = list.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
  // permissionData.value = _.cloneDeep(permissionData.value);
};
// 批量删除
const onDeleteAll = async () => {
  if (selectedRowKeys.value.length < 1) {
    MessagePlugin.error('请选择要删除的');
    return;
  }
  try {
    await api.workstationAuth.removeBatch({ ids: selectedRowKeys.value });
    MessagePlugin.success('删除成功');
  } catch (e) {
    console.log(e);
    MessagePlugin.error('删除失败');
  }
  onfetchData();
};
// 单独删除
const onDelete = async (id) => {
  try {
    await api.workstationAuth.remove({ id });
    MessagePlugin.success('删除成功');
  } catch (e) {
    MessagePlugin.error('删除失败');
  }
  onfetchData();
};

// 权限点击
const onHandelPermission = () => {
  permission.value = true;
};
// 查询
const onSearch = async () => {
  pageUI.value.page = 1;
  const res = await api.workstationAuth.getlist({
    workcenterWord: inputValue.value.workcenterWord,
    userWord: inputValue.value.userWord,
    workstationWord: inputValue.value.workstationWord,
    processWord: inputValue.value.processWord,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  permissionData.value = res.list;
  total.value = res.total;
};
// 重置
const onResetting = () => {
  onFormCls();
  onfetchData();
};
// 清空初始数据
const onFormCls = () => {
  inputValue.value.workcenterWord = '';
  inputValue.value.workstationWord = '';
  inputValue.value.processWord = '';
  inputValue.value.userWord = '';
  inputValue.value.ids = []; // 多选数
  inputValue.value.id = ''; // 单个晒
  inputValue.value.sorts = [];
  /** 筛选字段 */
  inputValue.value.filters = [];
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
