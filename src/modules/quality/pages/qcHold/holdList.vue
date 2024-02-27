<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="optsHold" :is-reset-query="false" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12"
      ><cmp-table
        ref="tableHoldRef"
        v-model:pagination="pageUI"
        active-row-type="single"
        row-key="id"
        :table-column="HoldColumns"
        :table-data="holdInfoList.list"
        :loading="loading"
        :total="holdInfoList.total"
        @refresh="onRefresh"
      >
        <template #title>{{ t('qcHold.holdListTitle') }}</template>
        <template #op="{ row }">
          <t-link
            v-if="formData.viewType === ViewType.UNLOCK && row.status == 'LOCK'"
            theme="primary"
            @click="onHandelUnLock(row, row.holdCategory)"
          >
            {{ t('qcHold.unLock') }}
          </t-link>
          <t-link
            v-if="formData.viewType === ViewType.VIEW"
            theme="primary"
            @click="onHandelLog(row, row.holdCategory)"
          >
            {{ t('qcHold.holdListViewDetail') }}
          </t-link>
        </template>
      </cmp-table></cmp-card
    >
  </cmp-container>
  <!-- 子from  -->
  <detailed ref="detailFormRef" @show-close-event="onHandleLockShow"></detailed>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apimain } from '@/api/main';
import { api as apiQuality, QcHoldVO } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';
import { useLang } from './lang';

const { t } = useLang();
const curOperatorType = ref('');
enum OperatorType {
  MO = 'MO', // 工单
  PRODUCT = 'PRODUCT', // 产品
  WORKSTATION = 'WORKSTATION', // 工站
  MITEM = 'MITEM', // 物料
}

enum ViewType {
  LOCK = 'LOCK', // 冻结模式
  UNLOCK = 'UNLOCK', // 解冻模式
  VIEW = 'VIEW', // 查看模式
}

interface FormQcHold {
  viewType: ViewType;
}

const formData: FormQcHold = reactive({
  viewType: ViewType.VIEW,
});

const detailedShow = ref(false); // 控制执行界面显示隐藏
const detailFormRef = ref(null);
const tableHoldRef = ref();
const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const holdInfoList = reactive({ list: [], total: 0 });
// 原因类别下拉初始数据
const reasonCategoryOption = ref([]);
// 查询组件值
const datePlanRangeDefault = ref([
  dayjs().format('YYYY-MM-DD 00:00:00'),
  dayjs().subtract(-31, 'day').format('YYYY-MM-DD 23:59:59'),
]); // 初始化日期控件
const optsHoldValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
// 查询组件-工单
const optsHold = computed(() => {
  return {
    datePlanRange: {
      label: t('qcHold.holdListTime'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('common.placeholder.input', [`${t('qcHold.holdListTime')}`]),
      bind: {
        enableTimePicker: true,
      },
    },
    // 此字段显示不需要，后续会有用到
    // workCenterCode: {
    //   label: t('qcHold.workCenterCode'),
    //   comp: 'bcmp-select-business',
    //   defaultVal: '',
    //   placeholder: t('common.placeholder.input', [`${t('qcHold.workCenterCode')}`]),
    //   bind: {
    //     type: 'workcenter',
    //     valueField: 'wcCode',
    //   },
    // },
    reasonCategory: {
      label: t('qcHold.reasonCategory'),
      comp: 't-select',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.reasonCategory')}`]),
      bind: {
        options: reasonCategoryOption.value,
        lazyLoad: true,
      },
    },
    creator: {
      label: t('qcHold.creator'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.creator')}`]),
      bind: {
        type: 'user',
        valueField: 'userName',
      },
    },
    personResponsibilityId: {
      label: t('qcHold.personResponsibilityId'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.personResponsibilityId')}`]),
      bind: {
        type: 'person',
      },
    },
    personHandleId: {
      isHide: formData.viewType === ViewType.UNLOCK,
      label: t('qcHold.personHandleId'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.personHandleId')}`]),
      bind: {
        type: 'person',
      },
    },
    personFollowUpId: {
      isHide: formData.viewType === ViewType.UNLOCK,
      label: t('qcHold.personFollowUpId'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.personFollowUpId')}`]),
      bind: {
        type: 'person',
      },
    },
  };
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  optsHoldValue.value = data;
  fetchTable();
};

// # 刷新按钮
const onRefresh = async () => {
  await fetchTable();
};
// #### Hold单据列表 表头
const HoldColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'billNo',
    title: `${t('qcHold.billNo')}`,
    align: 'center',
    width: '150',
  },
  {
    colKey: 'datetimeLock',
    title: `${t('qcHold.datetimeLock')}`,
    align: 'center',
    width: '180',
  },
  {
    colKey: 'holdCategoryName',
    title: `${t('qcHold.holdCategoryName')}`,
    align: 'center',
    width: '150',
  },
  {
    colKey: 'customerName',
    title: `${t('qcHold.customerId')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'reasonCategoryName',
    title: `${t('qcHold.reasonCategory')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'memo',
    title: `${t('qcHold.memo')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'creatorName',
    title: `${t('qcHold.creatorName')}`,
    align: 'center',
    width: '110',
  },
  {
    colKey: 'personResponsibilityName',
    title: `${t('qcHold.personResponsibilityId')}`,
    align: 'center',
    width: '110',
  },
  {
    // isHide: formData.viewType === ViewType.UNLOCK,
    colKey: 'personHandleName',
    title: `${t('qcHold.personHandleId')}`,
    align: 'center',
    width: '110',
  },
  {
    // isHide: formData.viewType === ViewType.UNLOCK,
    colKey: 'personFollowUpName',
    title: `${t('qcHold.personFollowUpId')}`,
    align: 'center',
    width: '110',
  },
  {
    colKey: 'statusName',
    title: `${t('qcHold.statusName')}`,
    align: 'center',
    width: '110',
  },
  {
    // isHide: formData.viewType === ViewType.UNLOCK,
    colKey: 'datetimeUnlock',
    title: `${t('qcHold.datetimeUnlock')}`,
    align: 'center',
    width: '180',
  },
  { colKey: 'op', title: t('common.button.operation'), width: '100', fixed: 'right' },
];

// 加载数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    getHoldList();
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 获取old列表数据
const getHoldList = async () => {
  if (optsHoldValue.value.datePlanRange) {
    if (optsHoldValue.value.datePlanRange[0]) {
      optsHoldValue.value.datetimeLockStart = optsHoldValue.value.datePlanRange[0].toString();
    }
    if (optsHoldValue.value.datePlanRange[1]) {
      optsHoldValue.value.datetimeLockEnd = optsHoldValue.value.datePlanRange[1].toString();
    }
  }

  const res = (await apiQuality.hold.getQcHoldList({
    ...optsHoldValue.value,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  })) as any;
  holdInfoList.list = res.list;
  holdInfoList.total = Number(res.total);
};

// 解锁
const onHandelUnLock = async (row: QcHoldVO, operatorType: OperatorType) => {
  console.log('operatorType:', operatorType, 'row:', row);
  detailedShow.value = true;
  curOperatorType.value = operatorType.toString();
  let keys = [];
  const search = {
    holdId: row.id,
  };
  const list = await apiQuality.hold.getQcHoldDtlList(search);
  switch (operatorType) {
    case OperatorType.MO: // 工单
      keys = list.map((item) => item.moScheId);
      break;
    case OperatorType.PRODUCT: // 产品
      keys = list.map((item) => item.serialNumber);
      break;
    case OperatorType.WORKSTATION: // 机台工站
      keys = list.map((item) => item.workstationId);
      break;
    case OperatorType.MITEM: // 物料
      keys = list.map((item) => item.labelNo);
      break;
    default:
      break;
  }
  const { initUnLockDetailForm, showPopform, reset } = detailFormRef.value;
  reset();
  showPopform();
  initUnLockDetailForm(row, keys, curOperatorType.value);
};

// 日志
const onHandelLog = async (row: QcHoldVO, operatorType: OperatorType) => {
  console.log('operatorType:', operatorType, 'row:', row);
  detailedShow.value = true;
  curOperatorType.value = operatorType.toString();
  let keys = [];
  const search = {
    holdId: row.id,
  };
  const list = await apiQuality.hold.getQcHoldDtlList(search);

  switch (operatorType) {
    case OperatorType.MO: // 工单
      keys = list.map((item) => item.moScheId);
      break;
    case OperatorType.PRODUCT: // 产品
      keys = list.map((item) => item.serialNumber);
      break;
    case OperatorType.WORKSTATION: // 机台工站
      keys = list.map((item) => item.workstationId);
      break;
    case OperatorType.MITEM: // 物料
      keys = list.map((item) => item.labelNo);
      break;
    default:
      break;
  }
  const { initViewkDetailForm, showPopform, reset } = detailFormRef.value;
  reset();
  showPopform();
  initViewkDetailForm(row, keys, curOperatorType.value);
};

// 子组件控制执行窗口
const onHandleLockShow = (value: any) => {
  detailedShow.value = value;
  reset();
  fetchTable();
};

const reset = () => {
  // 清空选择的信息
  tableHoldRef.value?.setSelectedRowKeys([]);
};

// 初始化系统字典
const initOptions = async () => {
  const res = (await apimain.param.getListByGroupCode({
    parmGroupCode: 'Q_HOLD_CATEGORY',
  })) as any;
  reasonCategoryOption.value = res;
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

const initHoldList = () => {
  const type = getQueryString('viewType');
  if (type) {
    formData.viewType = type === 'VIEW' ? ViewType.VIEW : ViewType.UNLOCK;
  } else {
    formData.viewType = ViewType.VIEW;
  }
};

onMounted(() => {
  initOptions();
  initHoldList();
  fetchTable();
});
</script>

<style lang="less" scoped></style>
