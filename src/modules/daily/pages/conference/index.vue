<!-- 会议会议 -->
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
          :table-data="conferenceData"
          max-height="300px"
          :loading="loading"
          :total="total"
          @select-change="onSelectChange"
          @refresh="onFetchData"
          @cell-click="onEditPackRowClick"
        >
          <template #title> {{ t('conference.会议列表') }}</template>
          <template #button>
            <t-button @click="onAdd">
              {{ t('common.button.add') }}
            </t-button>

            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDel">
              <t-button :disabled="!(selectedRowKeys && selectedRowKeys.length > 0)" theme="default">{{
                t('common.button.delete')
              }}</t-button>
            </t-popconfirm>
          </template>
          <template #op="{ row }">
            <t-space :size="8">
              <t-link theme="primary" :disabled="loading" @click="onEidt(row)">{{ t('common.button.edit') }}</t-link>
              <t-link theme="primary" :disabled="loading" @click="onView(row)">{{ t('common.button.view') }}</t-link>
            </t-space>
          </template>
          <template #isState="{ row }">
            <t-switch v-model="row.isState" @change="onCancle($event, row)" />
          </template>
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
          :fixed-height="true"
          class="son-table"
          @select-change="onSelectUserChange"
          @refresh="fetchUserTable"
        >
          <template #title> {{ t('conference.参会用户列表') }} </template>
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

import { api as apiDaily } from '@/api/daily';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import formAdd from './form.vue';
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
const onAdd = () => {
  formRef.value.initFormAdd();
};
const onEidt = (row) => {
  formRef.value.initFormEdit(row);
};
const onView = (row) => {
  formRef.value.initFormView(row);
};

const onDel = async () => {
  if (selectedRowKeys.value.length < 0) {
    return;
  }
  await apiDaily.conference.deleteList({ ids: selectedRowKeys.value });
  MessagePlugin.success(t('common.message.deleteSuccess'));
  onFetchData();
};

const onCancle = async ($event: any, row: any) => {
  const state = $event === true ? 1 : 0;
  await apiDaily.conference.cancel({ conferenceVO: { id: row.id, state } });
  MessagePlugin.success(t('common.message.saveSuccess'));
  onFetchData();
};
const { loading: loadingUser, setLoading: setLoadingUser } = useLoading();
const { pageUI: pageUser } = usePage();
const tableDataUser = ref([]);
const tableUserColumns = ref([
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  { title: t('conference.用户编码'), colKey: 'userName', align: 'center', width: 120 },
  { title: t('conference.工号'), colKey: 'personCode', align: 'center', width: 150 },
  { title: t('conference.用户名称'), colKey: 'displayName', align: 'center', width: 150 },
  { title: t('conference.用户邮箱'), colKey: 'email', align: 'center', width: 120 },
]);
// 加载关联用户表格
const fetchUserTable = async () => {
  if (!selectMainRow.value.id) {
    clearUserTable();
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiDaily.conference.listUser({
      conferenceId: selectMainRow.value.id,
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
    datePlanRange: {
      label: t('conference.创建时间'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择',
    },
    conferenceCode: {
      label: t('conference.会议'),
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
const datePlanRangeDefault = ref([]); // 初始化日期控件
// const datePlanRangeDefault = ref([dayjs().subtract(31, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]); // 初始化日期控件
// 查询初始化
const queryCondition = ref({
  id: '',
  title: '',
  datetimeStart: '',
  datetimeEnd: '',
  status: '',
  datePlanRange: datePlanRangeDefault.value,
});

const { loading } = useLoading();

// table定义
const column = ref([
  // { colKey: 'multiple', type: 'multiple', align: 'center' },
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  { title: t('conference.会议编码'), colKey: 'conferenceCode', align: 'center', width: 120 },
  { title: t('conference.会议名称'), colKey: 'conferenceName', align: 'center', width: 150 },
  {
    colKey: 'templateDimensionNames',
    title: t('conference.会议维度'),
    align: 'center',
    width: 120,
  },
  { title: t('conference.有效'), colKey: 'isState', align: 'center', width: 120 },
  { title: t('conference.创建人'), colKey: 'creatorName', align: 'center', width: 120 },
  { title: t('conference.创建时间'), colKey: 'timeCreate', align: 'center', width: 180 },
  { title: t('conference.修改人'), colKey: 'modifierName', align: 'center', width: 120 },
  { title: t('conference.修改时间'), colKey: 'timeModified', align: 'center', width: 180 },
  { title: t('conference.操作'), colKey: 'op', align: 'center', width: 150, fixed: 'right' },
]);
// table数据
const conferenceData = ref([]);
// 获取通告列表和通告总数信息
const onFetchData = async () => {
  try {
    utils.loadingPluginFullScreen(true);
    if (queryCondition.value.datePlanRange) {
      if (queryCondition.value.datePlanRange[0]) {
        queryCondition.value.datetimeStart = queryCondition.value.datePlanRange[0].toString();
      }
      if (queryCondition.value.datePlanRange[1]) {
        queryCondition.value.datetimeEnd = queryCondition.value.datePlanRange[1].toString();
      }
    }

    // 获取通告列表信息
    const res = await apiDaily.conference.list({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryCondition.value,
    });
    conferenceData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
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
  await apiDaily.conference.deleteUser({ ids: selectUserRowKeys.value });
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
