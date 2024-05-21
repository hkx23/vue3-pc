<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        active-row-type="single"
        :table-column="columns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        :resizable="true"
        @refresh="fetchTable"
      >
        <template #title> {{ t('qualityImprove.title') }}</template>
        <template #op="{ row }">
          <t-link
            theme="primary"
            style="padding-right: 8px"
            :disabled="row.status !== 'DRAFT' && row.status !== 'INITIATED' && row.status !== 'IN_PROGRESS'"
            @click="onEdit(row)"
            >{{ t('qualityImprove.report') }}</t-link
          >
          <t-popconfirm :content="t('qualityImprove.confirmCancel')" @confirm="cancelById(row)">
            <t-link
              theme="primary"
              style="padding-right: 8px"
              :disabled="row.status !== 'DRAFT' && row.status !== 'INITIATED' && row.status !== 'IN_PROGRESS'"
              >{{ t('common.button.cancel') }}</t-link
            >
          </t-popconfirm>
        </template>
        <template #billNoOp="{ row }">
          <t-link theme="primary" @click="onCheck(row)">{{ row.billNo }}</t-link>
        </template>
        <template #relateBillNoOp="{ row }">
          <t-link theme="primary">{{ row.relateBillNo }}</t-link>
        </template>
        <template #button>
          <t-button theme="primary" @click="onAdd">{{ t('qualityImprove.add') }}</t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- <cmp-container v-show="pageShow" :full="true">
    
    <qualityImproveAdd ref="formRef" @permission-show="onPermission"></qualityImproveAdd>
  </cmp-container> -->

  <qualityImproveAdd
    ref="formRef"
    v-model:visible="pageShow"
    :title="dialogTitle"
    @permission-show="onPermission"
  ></qualityImproveAdd>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';
import qualityImproveAdd from './qualityImproveAdd.vue';

const { t } = useLang();

const { pageUI } = usePage();
const { loading } = useLoading();
const tableData = ref([]);
const formRef = ref(null);
const dialogTitle = ref('');

const pageShow = ref(false);
const onPermission = (value) => {
  pageShow.value = value;
  onRefresh();
};
const onAdd = async () => {
  await formRef.value.init();
  dialogTitle.value = t('qualityImprove.dialogTitleAdd');
  pageShow.value = true;
};
const onEdit = async (row) => {
  await formRef.value.init();
  formRef.value.formData.id = row.id;
  formRef.value.formData.operateType = 'edit';
  await formRef.value.initEdit();
  dialogTitle.value = t('qualityImprove.dialogTitleEdit');
  pageShow.value = true;
};
const onCheck = async (row) => {
  await formRef.value.init();
  formRef.value.formData.id = row.id;
  formRef.value.formData.operateType = 'check';
  await formRef.value.initEdit();
  pageShow.value = true;
};
const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('qualityImprove.billNo')}`, width: 160, colKey: 'billNoOp' },
  { title: `${t('qualityImprove.inspectionType')}`, width: 90, colKey: 'inspectTypeName' },
  { title: `${t('qualityImprove.status')}`, width: 80, colKey: 'statusName' },
  { title: `${t('qualityImprove.relateBillNoCell')}`, width: 150, colKey: 'relateBillNoOp' },
  { title: `${t('qualityImprove.improveTool')}`, width: 110, colKey: 'improveTool' },
  { title: `${t('qualityImprove.mitemCode')}`, width: 110, colKey: 'mitemCode' },
  { title: `${t('business.main.mitemDesc')}`, width: 110, colKey: 'mitemDesc' },
  { title: `${t('qualityImprove.supplierCode')}`, width: 110, colKey: 'supplierCode' },
  { title: `${t('qualityImprove.supplierName')}`, width: 110, colKey: 'supplierName' },
  { title: `${t('business.main.workshop')}`, width: 140, colKey: 'workshopName' },
  { title: `${t('qualityImprove.moScheCode')}`, width: 110, colKey: 'scheCode' },
  { title: `${t('qualityImprove.creatorName')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('qualityImprove.timeCreate')}`, width: 110, colKey: 'timeCreate' },
  { title: `${t('qualityImprove.userResponsibility')}`, width: 110, colKey: 'userResponsibilityName' },
  { title: `${t('qualityImprove.deptResponsibility')}`, width: 110, colKey: 'deptResponsibilityName' },
  { title: `${t('business.main.modifier')}`, width: 110, colKey: 'modifierName' },
  { title: `${t('business.main.timeModified')}`, width: 140, colKey: 'timeModified' },
  { title: `${t('common.button.operation')}`, align: 'left', width: 130, colKey: 'op', fixed: 'right' },
];

const queryCompment = ref({
  timeCreateStart: '',
  timeCreateEnd: '',
  inspectionType: '',
  relateBillNo: '',
  billNo: '',
  mitemId: '',
  supplierId: '',
  workshopId: '',
});

// 查询组件
const opts = computed(() => {
  return {
    timeCreateRange: {
      label: t('qualityImprove.timeCreate'),
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    status: {
      label: t('qualityImprove.status'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'param',
        showTitle: false,
        category: 'QUALITY_IMPROVEMENT_STATUS',
      },
    },
    inspectionType: {
      label: t('qualityImprove.inspectionType'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'param',
        showTitle: false,
        category: 'Q_INSPECTION_TYPE',
      },
    },
    relateBillNo: {
      label: t('qualityImprove.relateBillNo'),
      comp: 't-input',
      defaultVal: '',
    },
    billNo: {
      label: t('qualityImprove.billNo'),
      comp: 't-input',
      defaultVal: '',
    },
    mitemId: {
      label: t('business.main.mitemCode'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    supplierId: {
      label: t('qualityImprove.supplier'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
      },
    },
    workshopId: {
      label: t('business.main.workshop'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
  };
});
const cancelById = async (row) => {
  await api.improve.cancelById({ id: row.id });
  MessagePlugin.success(t('common.message.success'));
  onRefresh();
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  queryCompment.value = data;
  const [timeCreateStart, timeCreateEnd] = data.timeCreateRange;
  queryCompment.value.timeCreateStart = timeCreateStart;
  queryCompment.value.timeCreateEnd = timeCreateEnd;
  onRefresh();
};

const onRefresh = () => {
  fetchTable();
};
const dataTotal = ref(0);

const fetchTable = async () => {
  try {
    const data = (await api.improve.getList({
      ...queryCompment.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    tableData.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  // 获取当前日期
  const today = new Date();

  // 计算三天前的日期
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);

  // 将日期转换为字符串，格式可以根据需要进行调整
  const timeCreatedStart = threeDaysAgo.toISOString().split('T')[0];
  const timeCreatedEnd = today.toISOString().split('T')[0];
  queryCompment.value.timeCreateStart = timeCreatedStart;
  queryCompment.value.timeCreateEnd = timeCreatedEnd;
  fetchTable();
});
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}
</style>
