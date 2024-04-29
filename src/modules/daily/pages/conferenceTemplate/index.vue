<!-- 会议模板 -->
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
            :table-data="conferenceTemplateData"
            :loading="loading"
            :total="total"
            :fixed-height="true"
            @select-change="onSelectChange"
            @refresh="onFetchData"
          >
            <template #title> {{ t('conferenceTemplate.会议模板列表') }}</template>
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
        </cmp-card>
      </cmp-container>
    </cmp-row>
  </cmp-container>
  <!--主表弹框-->
  <formAdd ref="formRef" @parent-refresh-event="parentCloseEvent"></formAdd>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import _ from 'lodash';
import MessagePlugin from 'tdesign-vue-next/es/message/plugin';
import { computed, onMounted, Ref, ref } from 'vue';

import { api as apiDaily } from '@/api/daily';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formAdd from './form.vue';
import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});

const selectedRowKeys: Ref<any[]> = ref([]);
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
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
  await apiDaily.conferenceTemplate.deleteList({ ids: selectedRowKeys.value });
  MessagePlugin.success(t('common.message.deleteSuccess'));
  onFetchData();
};

const onCancle = async ($event: any, row: any) => {
  const state = $event === true ? 1 : 0;
  await apiDaily.conferenceTemplate.cancel({ conferenceTemplateVO: { id: row.id, state } });
  MessagePlugin.success(t('common.message.saveSuccess'));
  onFetchData();
};

// input框搜索
const opts = computed(() => {
  return {
    datePlanRange: {
      label: t('conferenceTemplate.创建时间'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择',
    },
    templateCode: {
      label: t('conferenceTemplate.模板'),
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

const { loading, setLoading } = useLoading();
const { t } = useLang();
// table定义
const column = ref([
  // { colKey: 'multiple', type: 'multiple', align: 'center' },
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  { title: t('conferenceTemplate.模板编码'), colKey: 'templateCode', align: 'center', width: 120 },
  { title: t('conferenceTemplate.模板名称'), colKey: 'templateName', align: 'center', width: 150 },
  { title: t('conferenceTemplate.模板描述'), colKey: 'templateDesc', align: 'center', width: 150 },
  {
    colKey: 'templateDimensionNames',
    title: t('conferenceTemplate.模板维度'),
    align: 'center',
    width: 120,
  },
  { title: t('conferenceTemplate.有效'), colKey: 'isState', align: 'center', width: 120 },
  { title: t('conferenceTemplate.创建人'), colKey: 'creatorName', align: 'center', width: 120 },
  { title: t('conferenceTemplate.创建时间'), colKey: 'timeCreate', align: 'center', width: 180 },
  { title: t('conferenceTemplate.修改人'), colKey: 'modifierName', align: 'center', width: 120 },
  { title: t('conferenceTemplate.修改时间'), colKey: 'timeModified', align: 'center', width: 180 },
  { title: t('conferenceTemplate.操作'), colKey: 'op', align: 'center', width: 120, fixed: 'right' },
]);
// table数据
const conferenceTemplateData = ref([]);
// 获取通告列表和通告总数信息
const onFetchData = async () => {
  try {
    setLoading(true);
    if (queryCondition.value.datePlanRange) {
      if (queryCondition.value.datePlanRange[0]) {
        queryCondition.value.datetimeStart = queryCondition.value.datePlanRange[0].toString();
      }
      if (queryCondition.value.datePlanRange[1]) {
        queryCondition.value.datetimeEnd = queryCondition.value.datePlanRange[1].toString();
      }
    }

    // 获取通告列表信息
    const res = await apiDaily.conferenceTemplate.list({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryCondition.value,
    });
    conferenceTemplateData.value = res.list;
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
</script>

<style lang="less" scoped></style>
