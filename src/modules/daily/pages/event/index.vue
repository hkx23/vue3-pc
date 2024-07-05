<template>
  <cmp-container :full="true">
    <cmp-card>
      <!-- 查询组件  -->
      <cmp-query ref="queryRef" :opts="opts" :bool-enter="true" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :active-row-type="'single'"
        :selected-row-keys="selectedRowKeys"
        :table-column="columns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        select-on-row-click
        @select-change="onRowChange"
        @refresh="fetchTable"
      >
        <template #file="{ row }">
          <t-space :size="8">
            <t-link hover="color" theme="primary" @click="onFileView(row)">
              {{ t('event.viewFile') }}
            </t-link>
          </t-space>
        </template>

        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddClick"> {{ t('common.button.add') }} </t-button>
            <t-button
              theme="default"
              :disabled="
                !(
                  selectedRowKeys.length > 0 &&
                  ((currentRowStatus == 'CREATED' && userInfo.id == currentRowUserProposeId) ||
                    (currentRowStatus !== 'CREATED' && userInfo.id == currentRowuserResponsibilityId))
                )
              "
              @click="onEditClick"
            >
              {{ t('common.button.edit') }}
            </t-button>
            <t-button
              theme="default"
              :disabled="
                !(selectedRowKeys.length > 0 && currentRowStatus == 'CREATED' && userInfo.id == currentRowUserProposeId)
              "
              @click="onDeleteClick"
            >
              {{ t('common.button.delete') }}
            </t-button>
            <t-button
              theme="default"
              :disabled="
                !(
                  selectedRowKeys.length > 0 &&
                  currentRowStatus == 'CREATED' &&
                  userInfo.id == currentRowuserResponsibilityId
                )
              "
              @click="onResponseClick"
            >
              {{ t('event.response') }}
            </t-button>

            <t-button
              theme="default"
              :disabled="
                !(
                  selectedRowKeys.length > 0 &&
                  currentRowStatus == 'DEALING' &&
                  userInfo.id == currentRowuserResponsibilityId
                )
              "
              @click="onHandleClick"
            >
              {{ t('event.handle') }}
            </t-button>
            <t-button
              theme="default"
              :disabled="
                !(selectedRowKeys.length > 0 && currentRowStatus == 'DEALED' && userInfo.id == currentRowUserProposeId)
              "
              @click="onReceiveClick"
            >
              {{ t('event.receive') }}
            </t-button>
            <t-button
              theme="default"
              :disabled="
                !(selectedRowKeys.length > 0 && currentRowStatus == 'DEALED' && userInfo.id == currentRowUserProposeId)
              "
              @click="onRejectClick"
            >
              {{ t('event.reject') }}
            </t-button>
            <t-button theme="default" :disabled="true" @click="onUpgradeMeetingClick">
              {{ t('event.upgradeMeeting') }}
            </t-button>
            <!--

        
          -->
            <!-- <t-button theme="default">导入</t-button> -->
            <!-- <bcmp-import-auto-button
              theme="default"
              button-text="导入"
              type="a_incident_type"
            ></bcmp-import-auto-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="deleteBatches()">
              <t-button theme="default">批量删除</t-button>
            </t-popconfirm> -->
          </t-space>
        </template>
        <template #title> {{ t('event.title') }}</template>
        <!-- <template #detailsOp="{ row }">
          <t-button theme="primary" @click="onCheck(row)"> {{ t('event.check') }}</t-button></template
        > -->
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    top="56px"
    width="95%"
    :header="t(formAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('event.event')])"
    :on-confirm="onConfirmForm"
  >
    <event-form ref="formRef" />
  </t-dialog>
  <t-dialog
    v-model:visible="fileShowVisible"
    header="附件查看"
    top="56px"
    width="50%"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true">
      <bcmp-upload-content ref="formFilesUploadRef" :readonly="true" :file-list="currentfileList"></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/daily';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import { useUserStore } from '@/store/modules/user';

import BcmpUploadContent from './bcmp-upload-content/index.vue';
import { FormRef } from './constants';
import EventForm from './form.vue';
import { useLang } from './lang';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const { t } = useLang();

const { pageUI } = usePage();

const { loading } = useLoading();
const tableData = ref([]);
const selectedRowKeys: Ref<any[]> = ref([]); // 选中行
const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('event.billNo')}`, width: 120, colKey: 'billNo' },
  { title: `${t('event.eventSource')}`, width: 120, colKey: 'eventSourceName' },
  { title: `${t('event.datetimePropose')}`, width: 180, colKey: 'datetimePropose' },
  { title: `${t('event.datetimePlanSolve')}`, width: 180, colKey: 'datetimePlanSolve' },
  { title: `${t('event.datetimeActualSolve')}`, width: 180, colKey: 'datetimeActualSolve' },
  { title: `${t('event.deptProposeName')}`, width: 100, colKey: 'deptProposeName' },
  { title: `${t('event.userProposeName')}`, width: 100, colKey: 'userProposeName' },
  { title: `${t('event.eventDesc')}`, width: 120, colKey: 'eventDesc' },
  { title: `${t('event.file')}`, width: 120, colKey: 'file' },
  { title: `${t('event.causeAnalysis')}`, width: 120, colKey: 'causeAnalysis' },
  { title: `${t('event.improveMeasure')}`, width: 120, colKey: 'improveMeasure' },
  { title: `${t('event.moShceCode')}`, width: 150, colKey: 'moShceCode' },
  { title: `${t('event.conferenceResponsibilityName')}`, width: 100, colKey: 'conferenceResponsibilityName' },
  { title: `${t('event.deptResponsibilityName')}`, width: 100, colKey: 'deptResponsibilityName' },
  { title: `${t('event.userResponsibilityName')}`, width: 100, colKey: 'userResponsibilityName' },
  { title: `${t('event.status')}`, width: 80, colKey: 'statusName' },
  { title: `${t('event.importantDegree')}`, width: 100, colKey: 'importantDegreeName' },
  // {
  //   colKey: 'op',
  //   title: `${t('common.button.operation')}`,
  //   width: '80px',
  //   fixed: 'right',
  // },
];
const queryRef = ref();
// 初始渲染
onMounted(() => {
  queryRef.value.search();
});

// 查询条件处理数据
const filterList = ref([]) as any;

const datePlanRangeDefault = ref([
  dayjs().subtract(31, 'day').format('YYYY-MM-DD 00:00:00'),
  dayjs().subtract(-31, 'day').format('YYYY-MM-DD 23:59:59'),
]); // 初始化日期控件

const presets = ref({
  最近7天: [dayjs().subtract(6, 'day').toDate(), dayjs().toDate()],
  最近3天: [dayjs().subtract(2, 'day').toDate(), dayjs().toDate()],
  今天: [dayjs().toDate(), dayjs().toDate()],
});

// 查询组件
const opts = computed(() => {
  return {
    billNo: {
      label: t('event.billNo'),
      comp: 't-input',
      defaultVal: '',
    },
    eventType: {
      label: t('event.eventType'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择事件类型',
      bind: {
        paramGroup: 'D_EVENT_TYPE',
      },
    },
    userProposeId: {
      label: t('event.userProposeName'),
      comp: 'bcmp-select-business',
      event: 'businessUserProposeId',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
    deptResponsibilityId: {
      label: t('event.deptResponsibilityName'),
      comp: 'bcmp-select-business',
      event: 'businessDeptResponsibilityId',
      defaultVal: '',
      bind: {
        type: 'adminOrg',
        showTitle: false,
      },
    },
    userResponsibilityId: {
      label: t('event.userResponsibilityName'),
      comp: 'bcmp-select-business',
      event: 'businessUserResponsibilityId',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },
    status: {
      label: t('event.handleStatus'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择处理状态',
      bind: {
        paramGroup: 'D_EVENT_STATUS',
      },
    },
    datetimePropose: {
      label: t('event.datetimePropose'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择提出时间',
      bind: {
        enableTimePicker: true,
        presets: presets.value,
      },
    },
    datetimePlanSolve: {
      label: t('event.datetimePlanSolve'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择计划解决时间',
      bind: {
        enableTimePicker: true,
        presets: presets.value,
      },
    },
    eventDesc: {
      label: t('event.eventDesc'),
      comp: 't-input',
      defaultVal: '',
    },
    moShceId: {
      label: t('event.moShceCode'),
      comp: 't-input',
      defaultVal: '',
    },
    conferenceResponsibilityId: {
      label: t('event.conferenceResponsibilityName'),
      comp: 'bcmp-select-business',
      event: 'businessConferenceResponsibilityId',
      defaultVal: '',
      bind: {
        type: 'conference',
        showTitle: false,
      },
    },
    eventSource: {
      label: t('event.eventSource'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择事件来源',
      bind: {
        paramGroup: 'D_EVENT_SOURCE',
      },
    },
    importantDegree: {
      label: t('event.importantDegree'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: '请选择重要程度',
      bind: {
        paramGroup: 'D_IMPORTANT_DEGREE',
      },
    },
  };
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  filterList.value = [];
  for (const key in data) {
    const addFilter = {
      field: key,
      operator: 'EQ',
      value: data[key],
    };
    if (key !== 'keyWord' && addFilter.value) {
      filterList.value.push(addFilter);
    }
  }
  onRefresh();
};
const onRefresh = () => {
  fetchTable();
};
const dataTotal = ref(0);

const fetchTable = async () => {
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
    };

    const data = (await api.event.search(searchCondition)) as any;
    if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
    tableData.value = data.list;
    dataTotal.value = data.total;
    // MessagePlugin.success(t('event.querySuccess'));
    selectedRowKeys.value = [];
    selectedData.value = [];
  } catch (e) {
    console.log(e);
  }
};

const formAdd = ref(true);
const formRef = ref<FormRef>(null);
const formVisible = ref(false);

const onAddClick = () => {
  // console.log('新增');
  const { reset } = formRef.value;
  reset(false, null);
  formAdd.value = true;
  formVisible.value = true;
};
const onConfirmForm = () => {
  const { submit } = formRef.value;
  submit().then(() => {
    formVisible.value = false;
    fetchTable();
  });
};

const onEditClick = async () => {
  const { reset } = formRef.value;
  try {
    const row = (await api.event.getItemById(selectedRowKeys.value[0])) as any;
    reset(true, row);
    formAdd.value = false;
    formVisible.value = true;
  } catch (e) {
    console.log(e);
  }
};
const onDeleteClick = async () => {
  try {
    await api.event.delById(selectedRowKeys.value[0]);
    MessagePlugin.success(t('event.deleteSuccess'));
    fetchTable();
  } catch (e) {
    console.log(e);
  }
};

const onResponseClick = async () => {
  try {
    const updateModel = {
      id: selectedRowKeys.value[0],
      status: 'DEALING',
    };
    await api.event.updateStatus(updateModel);
    MessagePlugin.success(t('event.resopnseSuccess'));
    fetchTable();
  } catch (e) {
    console.log(e);
  }
};

const onHandleClick = async () => {
  try {
    const updateModel = {
      id: selectedRowKeys.value[0],
      status: 'DEALED',
    };
    await api.event.updateStatus(updateModel);
    MessagePlugin.success(t('event.handleSuccess'));
    fetchTable();
  } catch (e) {
    console.log(e);
  }
};

const onReceiveClick = async () => {
  try {
    const updateModel = {
      id: selectedRowKeys.value[0],
      status: 'CLOSED',
    };
    await api.event.updateStatus(updateModel);
    MessagePlugin.success(t('event.receiveSuccess'));
    fetchTable();
  } catch (e) {
    console.log(e);
  }
};

const onRejectClick = async () => {
  try {
    const updateModel = {
      id: selectedRowKeys.value[0],
      status: 'CANCELED',
    };
    await api.event.updateStatus(updateModel);
    MessagePlugin.success(t('event.rejectSuccess'));
    fetchTable();
  } catch (e) {
    console.log(e);
  }
};

const onUpgradeMeetingClick = async () => {
  try {
    const updateModel = {
      id: selectedRowKeys.value[0],
      status: 'RESPONSE',
    };
    await api.event.edit(updateModel);
    MessagePlugin.success(t('event.deleteSuccess'));
    fetchTable();
  } catch (e) {
    console.log(e);
  }
};

const selectedData = ref([]);
const currentRowStatus = ref('');
const currentRowUserProposeId = ref('');
const currentRowuserResponsibilityId = ref('');

const onRowChange = (value: any, context) => {
  selectedData.value = context.selectedRowData;
  selectedRowKeys.value = value;
  currentRowStatus.value = selectedData.value[0].status;
  currentRowUserProposeId.value = selectedData.value[0].userProposeId;
  currentRowuserResponsibilityId.value = selectedData.value[0].userResponsibilityId;
};

const fileShowVisible = ref(false);
const currentfileList = ref([]);

const onFileView = async (row: any) => {
  console.log('查看', row);
  const fileList = (await api.event.getFileListByItemId(row.id)) as any;
  currentfileList.value = fileList;
  fileShowVisible.value = true;
};
</script>

<style lang="less" scoped></style>
