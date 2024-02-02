<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="onHandleResetting" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="index"
        :loading="loading"
        :table-column="columns"
        :table-data="moData"
        :fixed-height="true"
        :total="dataTotal"
        @refresh="fetchTable"
      >
        <template #moCode="{ row }">
          <a
            style="color: #3f5ded; cursor: pointer"
            @click="
              {
                onHandelDetail(row);
              }
            "
          >
            {{ row.moCode }}
          </a>
        </template>
        <template #op="{ row }">
          <t-link
            v-if="row.status == 'DOWNLOAD' || row.status == 'SCHEDULED' || row.status == 'READY'"
            theme="primary"
            @click="onEditRoutingClick(row)"
          >
            编辑
          </t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 子from BOM -->
  <t-dialog
    v-model:visible="detailedShow"
    :row="currentrow"
    header="工单明细"
    :cancel-btn="null"
    :confirm-btn="null"
    top="60px"
    width="950px"
  >
    <detailed ref="detailFormRef" :row="currentrow" @added-show="onHandleBomShow"></detailed>
    <template #footer>
      <t-button theme="default" @click="onHandleCancellation">取消</t-button>
    </template>
  </t-dialog>
  <!-- 子from 工艺路线更新 -->
  <routingUpdate
    ref="routingFormRef"
    v-model="routingUpdateShow"
    :row="currentrow"
    @routing-show="onHandleRoutingShow"
    @refresh-table="onHandleTableReresh"
  ></routingUpdate>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import _ from 'lodash';
import { computed, onMounted, ref } from 'vue';

import { api as apimain } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';
import { useLang } from './lang';
import routingUpdate from './routingUpdate.vue';

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const currentrow = ref({}); // 当前行工单信息
// 控制
const keyword = ref(''); // 控制模糊搜索
// const formVisible = ref(false); // 控制弹窗显示
// const selectMoStatus = ref([]); // 选中的工单状态
const datePlanRangeDefault = ref([
  dayjs().format('YYYY-MM-DD 00:00:00'),
  dayjs().subtract(-31, 'day').format('YYYY-MM-DD 23:59:59'),
]); // 初始化日期控件
// 工单类型下拉初始数据
const moClassOption = ref([]);
// 工单状态下拉初始数据
const moStatusOption = ref([]);
// 查询初始化
const queryCondition = ref({
  moCode: '',
  moClass: '',
  mitemCategroyCode: '',
  mitemCode: '',
  status: '',
  datetimePlanStart: '',
  datetimePlanEnd: '',
  workshopCode: '',
  workCenterCode: '',
  rootingCode: '',
  datePlanRange: datePlanRangeDefault.value,
  moStatus: [],
});
const detailedShow = ref(false); // 控制工单BOM显示隐藏
const routingUpdateShow = ref(false); // 控制工单工艺路线显示隐藏
const routingFormRef = ref(null);
// 表格th数据
const columns = ref([
  {
    colKey: 'moCode',
    title: '工单号',
    width: '150',
  },
  { colKey: 'moClassName', title: '工单类型' },
  {
    colKey: 'statusName',
    title: '工单状态',
  },
  { colKey: 'mitemCode', title: '产品编码', width: '120' },
  { colKey: 'mitemDesc', title: '产品描述', width: '150' },
  { colKey: 'planQty', title: '计划数量' },
  { colKey: 'completedQty', title: '完成数量' },
  { colKey: 'uomName', title: '单位' },
  { colKey: 'workshopName', title: '车间' },
  { colKey: 'workCenterName', title: '工作中心' },
  { colKey: 'routingName', title: '工艺路线' },
  { colKey: 'datetimePlanStart', title: '计划开始时间', width: '150' },
  { colKey: 'datetimePlanEnd', title: '计划完成时间', width: '150' },
  { colKey: 'datetimeActualStart', title: '实际开始时间', width: '150' },
  { colKey: 'datetimeActualEnd', title: '实际完成时间', width: '150' },
  { colKey: 'datetimeMoClose', title: '工单关闭时间', width: '150' },
  { colKey: 'op', title: t('common.button.operation'), width: '100', fixed: 'right' },
]);
// 工单信息
const moData = ref([]);
const dataTotal = ref(0);
const detailFormRef = ref(null);
const fetchTable = async () => {
  try {
    setLoading(true);
    if (queryCondition.value.datePlanRange) {
      if (queryCondition.value.datePlanRange[0]) {
        queryCondition.value.datetimePlanStart = queryCondition.value.datePlanRange[0].toString();
      }
      if (queryCondition.value.datePlanRange[1]) {
        queryCondition.value.datetimePlanEnd = queryCondition.value.datePlanRange[1].toString();
      }
    }
    if (queryCondition.value.moStatus) {
      queryCondition.value.status = queryCondition.value.moStatus.join(',');
    }
    const res = (await apimain.mo.getmolist({
      ...queryCondition.value,
      pagenum: pageUI.value.page,
      pagesize: pageUI.value.rows,
    })) as any;
    moData.value = res.list;
    dataTotal.value = Number(res.total);
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};

// 初始化系统字典工单类型
const initMoClass = async () => {
  try {
    setLoading(true);
    const res = (await apimain.param.getListByGroupCode({
      parmGroupCode: 'C_MO_TYPE',
    })) as any;
    moClassOption.value = res;
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};

// 初始化系统字典工单状态
const initMoType = async () => {
  try {
    setLoading(true);
    const res = (await apimain.param.getListByGroupCode({
      parmGroupCode: 'C_MO_STATUS',
    })) as any;
    const checkall = { label: '全选', value: '', checkAll: true };
    moStatusOption.value = res;
    moStatusOption.value.unshift(checkall);
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};
const onHandleCancellation = () => {
  detailFormRef.value.onHandleCancellation();
};
// const onChangeMoStatus = (val) => {
//   console.log(selectMoStatus.value, val);
// };
// 点击查询按钮
const conditionEnter = (data: any) => {
  queryCondition.value = _.cloneDeep(data);
  onHandleQuery();
};
const opts = computed(() => {
  return {
    moClass: {
      label: '工单类别',
      comp: 't-select',
      defaultVal: '',
      placeholder: '请选择工单类别',
      bind: {
        options: moClassOption.value,
      },
    },
    moCode: {
      label: '工单号',
      comp: 't-input',
      defaultVal: '',
      placeholder: '请输入工单号',
    },
    mitemCategroyCode: {
      label: '产品类别',
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: '请选择产品类别',
      bind: {
        type: 'mitemCategory',
        valueField: 'categoryCode',
      },
    },
    mitemCode: {
      label: '产品编码',
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: '请选择产品编码',
      bind: {
        type: 'mitem',
        valueField: 'mitemCode',
      },
    },
    workshopCode: {
      label: '车间',
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: '请选择车间',
      bind: {
        type: 'workshop',
        valueField: 'orgCode',
      },
    },
    workCenterCode: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: '请选择工作中心',
      bind: {
        type: 'workcenter',
        valueField: 'wcCode',
      },
    },
    rootingCode: {
      label: '工艺路线',
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: '请选择工艺路线',
      bind: {
        type: 'routing',
        valueField: 'routingCode',
      },
    },
    datePlanRange: {
      label: '计划开始时间',
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: '请选择计划开始时间',
      bind: {
        enableTimePicker: true,
      },
    },
    moStatus: {
      label: '工单状态',
      comp: 't-checkbox-group',
      placeholder: '请选择工单状态',
      flex: '600px',
      defaultVal: [],
      bind: {
        class: 'check-box-conditon',
        options: moStatusOption.value,
        lazyLoad: true,
      },
    },
  };
});

// 防抖
const debounce = (func: { (): void; apply?: any }, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      func.apply(this, args);
    }, delay);
  };
};
const onHandleQuery = debounce(() => {
  fetchTable();
}, 200);

// 重置
const onHandleResetting = () => {
  keyword.value = '';
  pageUI.value.page = 1;
  fetchTable();
};

// 跳转到BOM明细界面
const onHandelDetail = (row: any) => {
  detailedShow.value = true;
  currentrow.value = row;
  console.log(row);
};

// 跳转到工艺路线明细界面
const onEditRoutingClick = (row: any) => {
  routingUpdateShow.value = true;
  currentrow.value = row;
};

// 子组件控制BOM窗口
const onHandleBomShow = (value: any) => {
  detailedShow.value = value;
};

// 子组件控制Routing窗口
const onHandleRoutingShow = (value: any) => {
  routingUpdateShow.value = value;
};

// 子组件控制刷新
const onHandleTableReresh = () => {
  fetchTable();
};

onMounted(() => {
  initMoClass();
  initMoType();
  fetchTable();
});
</script>

<style lang="less" scoped>
.save-filter {
  color: var(--brand-main);
}

.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  .t-row {
    margin-bottom: 10px;

    .check-box-conditon {
      /deep/ .t-checkbox {
        border: 1px solid var(--td-border-level-2-color) !important;
        height: 24px !important;
        padding: 6px !important;
      }
    }
  }

  :deep(.t-card__body) {
    padding: 0;
  }
}

.btn-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--td-comp-margin-xxl);
}
// 控制盒子
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
  color: red;
}
// form表单控制
.form-customer-row {
  margin: 10px 0;
}

.btn-disabled {
  cursor: pointer;
}

.range-time-query {
  padding-left: 118px !important ;
}

/deep/ .t-dialog__ctx .t-dialog__position.t-dialog--top {
  padding-top: 5vh !important;
}
</style>
