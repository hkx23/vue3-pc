<!-- 我的通告 -->
<template>
  <cmp-container :full="true" class="root">
    <cmp-row>
      <cmp-container class="cpm-box" :full="true" :ghost="true">
        <cmp-card>
          <!-- 查询组件  -->
          <cmp-query :opts="opts" @submit="conditionEnter" />
        </cmp-card>
        <cmp-card flex="auto">
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="column"
            :selected-row-keys="selectedRowKeys"
            :table-data="noticeData"
            :loading="loading"
            :total="total"
            :fixed-height="true"
            @select-change="onSelectChange"
            @refresh="onFetchData"
          >
            <template #title> {{ t('notice.noticeList') }}</template>
            <template #button>
              <t-button @click="onPublish">
                {{ t('notice.public') }}
              </t-button>
              <t-button @click="onAdd">
                {{ t('common.button.add') }}
              </t-button>
            </template>
            <template #op="{ row }">
              <t-space :size="8">
                <t-link theme="primary" :disabled="loading" @click="onEidt(row)">{{ t('common.button.edit') }}</t-link>
                <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDel">
                  <t-link theme="primary" :disabled="loading">{{ t('common.button.delete') }}</t-link>
                </t-popconfirm>
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-row>
  </cmp-container>
  <!--主表弹框-->
  <t-dialog
    v-model:visible="formVisible"
    :header="formTitle"
    :close-on-overlay-click="false"
    width="850px"
    top="60"
    :on-confirm="onConfirm"
  >
    <formAdd ref="formRef"></formAdd>
  </t-dialog>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import _ from 'lodash';
import MessagePlugin from 'tdesign-vue-next/es/message/plugin';
import { computed, onMounted, Ref, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api as apiMain } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import formAdd from './form.vue';
import { useLang } from './lang';

onMounted(() => {
  const id = getQueryString('id');
  if (id) {
    queryCondition.value.id = id;
  }
  onFetchData();
});

const selectedRowKeys: Ref<any[]> = ref([]);
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};
const onPublish = async () => {
  if (selectedRowKeys.value.length < 0) {
    return;
  }
  await apiMain.notice.publishNotice(selectedRowKeys.value);
  MessagePlugin.success(t('common.message.success'));
  onFetchData();
};
const formRef = ref(null);
const formVisible = ref(false);
const formTitle = ref('');
const refNoticeCard = ref(null);
const noticeHeight = ref('300px');
useResizeObserver(refNoticeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  noticeHeight.value = `${height - 130}px`;
  console.error('treeHeight', noticeHeight.value);
});
const onAdd = () => {
  formTitle.value = t('common.button.add');
  formRef.value.formData.opType = 'add';
  formVisible.value = true;
};
const onEidt = (row) => {
  console.log(row);
  formTitle.value = t('common.button.edit');
  formRef.value.formData = row;
  formRef.value.formData.opType = 'edit';
  formVisible.value = true;
};

const onDel = async (row) => {
  await apiMain.notice.delById(row.id);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  onFetchData();
};

// input框搜索
const opts = computed(() => {
  return {
    title: {
      label: t('notice.titleName'),
      placeholder: '请输入',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    datePlanRange: {
      label: t('notice.timeCreate'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择',
    },
    status: {
      label: t('notice.publicStatus'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'param',
        showTitle: false,
        category: 'Q_INSPECTION_STD_STATUS',
      },
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
const { t } = useLang();
// table定义
const column = ref([
  // { colKey: 'multiple', type: 'multiple', align: 'center' },
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  { title: t('notice.titleName'), colKey: 'titleName', align: 'center', width: 200 },
  { title: t('notice.noticeContent'), colKey: 'noticeContent', align: 'center', width: 300 },
  {
    colKey: 'sourceOrgCode',
    title: t('notice.sourceOrgCode'),
    align: 'center',
    width: 120,
  },
  { title: t('notice.sourceOrgName'), colKey: 'sourceOrgName', align: 'center', width: 120 },
  { title: t('notice.receiveOrgCode'), colKey: 'receiveOrgCode', align: 'center', width: 120 },
  { title: t('notice.receiveOrgName'), colKey: 'receiveOrgName', align: 'center', width: 120 },
  { title: t('notice.noticeTypeName'), colKey: 'noticeTypeName', align: 'center', width: 120 },
  { title: t('notice.noticePurposeName'), colKey: 'noticePurposeName', align: 'center', width: 120 },

  { title: t('notice.noticeEffective'), colKey: 'noticeEffective', align: 'center', width: 120 },
  { title: t('notice.dateInvalid'), colKey: 'dateInvalid', align: 'center', width: 120 },
  { title: t('notice.timeCreate'), colKey: 'timeCreate', align: 'center', width: 120 },
  { title: t('notice.creatorName'), colKey: 'creatorName', align: 'center', width: 120 },
  { title: t('notice.publicStatus'), colKey: 'statusName', align: 'center', width: 120 },
  { title: t('notice.publicStatus'), colKey: 'op', align: 'center', width: 120 },
]);
// table数据
const noticeData = ref([]);
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
    const res = (await apiMain.notice.list({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryCondition.value,
    })) as any;
    noticeData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
const onConfirm = async () => {
  await formRef.value.confirm();
  formVisible.value = false;
  onFetchData();
};
const getQueryString = (paramName: string) => {
  const queryString = window.location.href.split('?')[1];
  if (queryString) {
    const paramsArray = queryString.split('&');
    const paramsNameList = [{ name: '', value: '' }];
    paramsArray.forEach((item: string) => {
      const obj = { name: '', value: '' };
      obj.name = item.split('=')[0].toString();
      obj.value = item.split('=')[1].toString();
      paramsNameList.push(obj);
    });
    const objInfo = _.find(paramsNameList, (item: any) => {
      return item.name === paramName;
    }) as any;
    return objInfo?.value;
  }
  return '';
};
</script>

<style lang="less" scoped>
.activeNotice {
  background-color: var(--td-brand-color);
  width: 4px;
  height: 16px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  top: 11px;
}

.t-list .is-selected {
  background: #366ef49c;
  color: white;
}

.t-list .t-list-item {
  border-radius: 4px;
}

.list-card-notice {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}

.delete-dialog-top {
  margin: 10px;
  text-align: center;
  font-weight: 900;
}

.list-save {
  text-align: center;
  margin: 10px 0;
}

.list-item {
  width: 100%;
  // margin-top: 10px;
}

.cpm-box {
  padding-left: 6px !important;
  padding-right: 6px !important;
}

.table-cell-href {
  color: rgb(63 93 237 / 100%);
  cursor: pointer;
}

.gray-icon {
  color: rgb(179 179 195);
}

.green-icon {
  color: rgb(2 158 85 / 100%);
}
</style>
