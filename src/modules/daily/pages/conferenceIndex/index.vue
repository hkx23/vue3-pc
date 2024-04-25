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
            :table-data="conferenceIndexData"
            :loading="loading"
            :total="total"
            :fixed-height="true"
            @select-change="onSelectChange"
            @refresh="onFetchData"
          >
            <template #title> {{ t('conferenceIndex.会议指标列表') }}</template>
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
  await apiDaily.conferenceIndex.deleteList({ ids: selectedRowKeys.value });
  MessagePlugin.success(t('common.message.deleteSuccess'));
  onFetchData();
};

const onCancle = async ($event: any, row: any) => {
  const state = $event === true ? 1 : 0;
  await apiDaily.conferenceIndex.cancel({ conferenceIndexVO: { id: row.id, state } });
  MessagePlugin.success(t('common.message.saveSuccess'));
  onFetchData();
};

// input框搜索
const opts = computed(() => {
  return {
    datePlanRange: {
      label: t('conferenceIndex.timeCreate'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择',
    },
    indexDimension: {
      label: t('conferenceIndex.指标维度'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'state',
        showTitle: false,
        category: 'CONFERNCE_INDEX_DIMENSION',
      },
    },
    indexType: {
      label: t('conferenceIndex.指标类型'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'state',
        showTitle: false,
        category: 'CONFERNCE_INDEX_TYPE',
      },
    },
    indexCode: {
      label: t('conferenceIndex.指标'),
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
  { title: t('conferenceIndex.指标编码'), colKey: 'indexCode', align: 'center', width: 120 },
  { title: t('conferenceIndex.指标名称'), colKey: 'indexName', align: 'center', width: 150 },
  {
    colKey: 'indexDesc',
    title: t('conferenceIndex.指标说明'),
    align: 'center',
    width: 200,
  },
  { title: t('conferenceIndex.有效'), colKey: 'isState', align: 'center', width: 120 },
  { title: t('conferenceIndex.指标类型'), colKey: 'indexTypeName', align: 'center', width: 120 },
  { title: t('conferenceIndex.指标维度'), colKey: 'indexDimensionName', align: 'center', width: 120 },
  { title: t('conferenceIndex.创建人'), colKey: 'creatorName', align: 'center', width: 120 },
  { title: t('conferenceIndex.创建时间'), colKey: 'timeCreate', align: 'center', width: 180 },
  { title: t('conferenceIndex.修改人'), colKey: 'modifierName', align: 'center', width: 120 },
  { title: t('conferenceIndex.修改时间'), colKey: 'timeModified', align: 'center', width: 180 },
  { title: t('conferenceIndex.操作'), colKey: 'op', align: 'center', width: 120 },
]);
// table数据
const conferenceIndexData = ref([]);
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
    const res = await apiDaily.conferenceIndex.list({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryCondition.value,
    });
    conferenceIndexData.value = res.list;
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

<style lang="less" scoped>
.activeconferenceIndex {
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

.list-card-conferenceIndex {
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
