<!-- 供应商供应商 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <!-- 查询组件  -->
        <cmp-query :opts="opts" @submit="conditionEnter" />
        <cmp-table
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="column"
          :selected-row-keys="selectedRowKeys"
          :table-data="supplierInUserData"
          :loading="loading"
          :total="total"
          @select-change="onSelectChange"
          @refresh="onFetchData"
          @cell-click="onEditPackRowClick"
        >
          <template #title> {{ t('supplierInUser.供应商列表') }}</template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-row>
      <cmp-card :span="12">
        <!-- 用户信息-->
        <cmp-table
          ref="tableUserRef"
          v-model:pagination="pageUser"
          row-key="id"
          :table-column="tableUserColumns"
          :table-data="tableDataUser"
          :loading="loadingUser"
          :selected-row-keys="selectUserRowKeys"
          :show-pagination="false"
          :header-affixed-top="true"
          class="son-table"
          @select-change="onSelectUserChange"
          @refresh="fetchUserTable"
        >
          <template #title> {{ t('supplierInUser.关联用户列表') }} </template>
          <template #button>
            <t-button v-if="selectMainRow.id" :disabled="loadingUser" @click="onUserAdd">
              {{ t('common.button.add') }}
            </t-button>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelUser">
              <t-button theme="default" :disabled="selectUserRowKeys?.length == 0">
                {{ t('common.button.delete') }}</t-button
              >
            </t-popconfirm>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>
  <!--主表弹框-->
  <formAdd ref="formRef" @parent-refresh-event="parentCloseEvent"></formAdd>
  <!--用户弹框-->
  <formUser ref="formUserRef" @parent-refresh-event="parentCloseUserEvent"></formUser>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import _ from 'lodash';
import MessagePlugin from 'tdesign-vue-next/es/message/plugin';
import { computed, onMounted, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formUser from './formUser.vue';
import { useLang } from './lang';

const { t } = useLang();
onMounted(() => {
  onFetchData();
});
const selectedRowKeys: Ref<any[]> = ref([]);
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};
const selectUserRowKeys: Ref<any[]> = ref([]);
const onSelectUserChange = (value) => {
  selectUserRowKeys.value = value;
};

const formRef = ref(null);

const { loading: loadingUser, setLoading: setLoadingUser } = useLoading();
const { pageUI: pageUser } = usePage();
const tableDataUser = ref([]);
const tableUserColumns = ref([
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  { title: t('supplierInUser.用户编码'), colKey: 'userName', align: 'center', width: 120 },
  { title: t('supplierInUser.工号'), colKey: 'personCode', align: 'center', width: 150 },
  { title: t('supplierInUser.用户名称'), colKey: 'displayName', align: 'center', width: 150 },
  { title: t('supplierInUser.用户邮箱'), colKey: 'email', align: 'center', width: 120 },
]);
// 加载关联用户表格
const fetchUserTable = async () => {
  if (!selectMainRow.value.id) {
    clearUserTable();
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiMain.supplierInUser.listUser({
      supplierId: selectMainRow.value.id,
    })) as any;
    tableDataUser.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingUser(false);
  }
};
// 清除关联表格
const clearUserTable = async () => {
  tableDataUser.value = [];
};

const selectMainRow = ref({}) as any; // 选中行
// 点击行
const onEditPackRowClick = (rowObject: any) => {
  console.log(`表格点击:${{ rowObject }}`);
  selectMainRow.value = rowObject.row;
  fetchUserTable();
};

// input框搜索
const opts = computed(() => {
  return {
    keyword: {
      label: t('supplierInUser.供应商'),
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
const conditionEnter = (data) => {
  pageUI.value.page = 1;
  queryCondition.value = _.cloneDeep(data);
  onFetchData();
};

const total = ref(10);
const { pageUI } = usePage();

// 查询初始化
const queryCondition = ref({
  id: '',
  keyword: '',
});

const { loading, setLoading } = useLoading();

// table定义
const column = ref([
  // { colKey: 'multiple', type: 'multiple', align: 'center' },

  { title: t('supplierInUser.供应商编码'), colKey: 'supplierCode', align: 'center', width: 120 },
  { title: t('supplierInUser.供应商名称'), colKey: 'supplierName', align: 'center', width: 150 },
]);
// table数据
const supplierInUserData = ref([]);
const onFetchData = async () => {
  try {
    setLoading(true);
    const res = await apiMain.supplier.search({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryCondition.value,
    });
    supplierInUserData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
const parentCloseEvent = async (isRefresh: boolean) => {
  if (isRefresh) {
    onFetchData();
  }
};

// 用户信息
const formUserRef = ref(null);
const onUserAdd = () => {
  formUserRef.value.initFormAdd(selectMainRow.value.id);
};
const onDelUser = async () => {
  if (selectUserRowKeys.value.length < 0) {
    return;
  }
  await apiMain.supplierInUser.deleteUser({ ids: selectUserRowKeys.value });
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchUserTable();
};
const parentCloseUserEvent = async (isRefresh: boolean) => {
  if (isRefresh) {
    fetchUserTable();
  }
};
</script>

<style lang="less" scoped></style>
