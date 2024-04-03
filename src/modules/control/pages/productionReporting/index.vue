<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :hover="false"
        :fixed-height="true"
        :loading="loading"
        :table-column="shiftColumns"
        active-row-type="single"
        :table-data="resultList.list"
        :total="resultTotal"
        @refresh="onFetchGroupData"
      >
        <template #title>
          {{ t('productionReporting.title') }}
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData"> {{ t('productionReporting.reporting') }} </t-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #班组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle" width="806px">
    <t-form ref="formRef" :rules="rules" :data="teamFormData" label-width="110px" @submit="onAnomalyTypeSubmit">
      <t-row :gutter="[0, 16]">
        <t-col :span="6">
          <t-form-item :label="t('business.control.moScheCode')" name="moScheduleId">
            <bcmp-select-business
              v-model="teamFormData.moScheduleId"
              label=""
              type="moSchedule"
              :clearable="true"
              @change="onChange"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('business.control.productCode')" name="mitemCode">
            <t-input
              v-model="teamFormData.mitemCode"
              :readonly="true"
              :placeholder="t('productionReporting.selectMoSche')"
            ></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('business.control.productName')" name="mitemName">
            <t-input
              v-model="teamFormData.mitemName"
              :readonly="true"
              :placeholder="t('productionReporting.selectMoSche')"
            ></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('productionReporting.datetimeActual')" name="datetimePlanStart">
            <t-input
              v-model="teamFormData.datetimePlanStart"
              :readonly="true"
              :placeholder="t('productionReporting.selectMoSche')"
            ></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('productionReporting.scheQty')" name="scheQty">
            <t-input
              v-model="teamFormData.scheQty"
              :readonly="true"
              :placeholder="t('productionReporting.selectMoSche')"
            ></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('productionReporting.reportedQty')" name="pickQtyCount">
            <t-input
              v-model="teamFormData.pickQtyCount"
              :readonly="true"
              :placeholder="t('productionReporting.selectMoSche')"
            ></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('productionReporting.thisReportingQty')" name="pickQty">
            <t-input-number v-model="teamFormData.pickQty" theme="column" style="width: 100%" min="0"></t-input-number>
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">{{ t('common.button.save') }}</t-button>
    </template>
  </t-dialog>
</template>

<script lang="tsx">
export default {
  name: 'ProductionReporting',
};
</script>
<script setup lang="tsx">
import dayjs from 'dayjs';
import _ from 'lodash';
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { loading } = useLoading();
const teamFormData = ref({
  moScheduleId: '',
  mitemCode: '',
  mitemName: '',
  datetimePlanStart: '',
  scheQty: 0,
  pickQtyCount: 0,
  pickQty: 0,
});

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 班组dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
// $ 表格数据
const resultList = reactive({ list: [] });
// 表格数据总条数
const resultTotal = ref(0);

// ####班次 表头
const shiftColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'billNo',
    title: t('productionReporting.billNo'),
    width: '150',
  },
  {
    colKey: 'wcName',
    title: t('business.main.workcenter'),
    width: '120',
  },
  {
    colKey: 'scheCode',
    title: t('business.control.moScheCode'),
    width: '140',
  },
  {
    colKey: 'datetimePlanStart',
    title: t('productionReporting.datetimeActualStart'),
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: t('business.control.productCode'),
    width: '110',
  },
  {
    colKey: 'mitemName',
    title: t('business.control.productName'),
    width: '120',
  },
  {
    colKey: 'scheQty',
    title: t('productionReporting.scheQty'),
    width: '100',
  },
  {
    colKey: 'pickQtyCount',
    title: t('productionReporting.reportedQty'),
    width: '120',
  },
  {
    colKey: 'pickQty',
    title: t('productionReporting.reportingQty'),
    width: '80',
  },
  {
    colKey: 'creatorName',
    title: t('productionReporting.reportingUser'),
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: t('productionReporting.reportingTime'),
    width: '190',
  },
];

const onChange = async () => {
  if (!teamFormData.value.moScheduleId) {
    return;
  }
  const res = await api.transferDtl.getDataByMoScheId({ moScheduleId: teamFormData.value.moScheduleId });
  if (res) {
    teamFormData.value.mitemCode = res.mitemCode;
    teamFormData.value.mitemName = res.mitemName;
    teamFormData.value.datetimePlanStart = res.datetimePlanStart;
    teamFormData.value.scheQty = res.scheQty;
    teamFormData.value.pickQtyCount = res.pickQtyCount ? res.pickQtyCount : 0;
  }
};
// # 刷新按钮
const onFetchGroupData = async () => {
  await getTabData(); //
};

// 表单定义规则
function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: t('common.validation.digits'), type: 'error' };
  }
  if (Number(value) < 0) {
    return { result: false, message: t('common.validation.number'), type: 'error' };
  }
  return true;
}
const rules: FormRules = {
  moScheduleId: [{ required: true, trigger: 'change' }],
  pickQty: [
    { required: true, trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
};
// # 初始渲染
onMounted(async () => {
  await getTabData();
});

// #班组搜索
const opts = computed(() => {
  return {
    timeCreateRange: {
      label: t('productionReporting.reportingTime'),
      comp: 't-date-range-picker',
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
    },
    workcenterId: {
      label: t('business.main.workcenter'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    moScheduleId: {
      label: t('business.control.moScheCode'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    mitemId: {
      label: t('business.control.productCode'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        labelField: 'mitemCode',
        showTitle: false,
      },
    },
    userName: {
      label: t('productionReporting.reportingUser'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        valueField: 'userName',
        showTitle: false,
      },
    },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  queryConditions.value.mitemId = data.mitemId;
  queryConditions.value.workcenterId = data.workcenterId;
  queryConditions.value.userName = data.userName;
  queryConditions.value.moScheduleId = data.moScheduleId;
  const [timeCreateStart, timeCreateEnd] = data.timeCreateRange;
  queryConditions.value.timeCreateStart = timeCreateStart;
  queryConditions.value.timeCreateEnd = timeCreateEnd;
  await getTabData();
};

const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #出勤表格 参数
const queryConditions = ref({
  pageNum: 1,
  pageSize: 20,
  moScheduleId: '',
  workcenterId: '',
  timeCreateStart: '',
  timeCreateEnd: '',
  userName: '',
  mitemId: '',
});

const getTabData = async () => {
  queryConditions.value.pageNum = pageUI.value.page;
  queryConditions.value.pageSize = pageUI.value.rows;
  try {
    loading.value = true;
    const res = await api.transferDtl.productionReportingList(queryConditions.value);
    resultList.list = res.list;
    resultTotal.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const onAddSupportGroup = async () => {
  await api.transferDtl.addProductionReporting(teamFormData.value);
  await getTabData();
  formVisible.value = false;
  MessagePlugin.success(t('common.message.success'));
};

// // #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  formVisible.value = true;
  diaLogTitle.value = t('productionReporting.reporting');
};

// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    await onAddSupportGroup(); // 新增请求
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.filled-icon {
  color: var(--td-success-color);
}
</style>
