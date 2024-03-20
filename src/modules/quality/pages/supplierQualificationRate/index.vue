<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card>
      <!-- 查询组件  -->
      <cmp-query :opts="opts" :is-reset-query="false" @submit="conditionEnter" @reset="onRest"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="supplierId"
        active-row-type="single"
        :table-column="columns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        :resizable="true"
        @refresh="fetchTable"
      >
        <template #title> {{ t('supplierQualificationRate.title') }}</template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { pageUI } = usePage();
const { loading } = useLoading();
const tableData = ref([]);

const pageShow = ref(false);

const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('supplierQualificationRate.supplierName')}`, width: 90, colKey: 'supplierName' },
  { title: `${t('supplierQualificationRate.supplierCode')}`, width: 90, colKey: 'supplierCode' },
  { title: `${t('supplierQualificationRate.totalInspection')}`, width: 80, colKey: 'totalCheckBatch' },
  { title: `${t('supplierQualificationRate.batchQualificationRate')}`, width: 110, colKey: 'qualificationRate' },
  { title: `${t('supplierQualificationRate.qualifiedBatch')}`, width: 80, colKey: 'qualifiedBatch' },
  { title: `${t('supplierQualificationRate.ngBatch')}`, width: 80, colKey: 'unQualifiedBatch' },
];

const queryCompment = ref({
  timeCreateStart: '',
  timeCreateEnd: '',
  mitemId: '',
  supplierIds: [],
});

// 查询组件
const opts = computed(() => {
  return {
    supplierIds: {
      label: t('supplierQualificationRate.supplierName'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        isMultiple: true,
        showTitle: false,
      },
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
    timeCreateRange: {
      label: t('supplierQualificationRate.inspectionTime'),
      comp: 't-date-range-picker',
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
    },
  };
});

const onRest = () => {
  tableData.value = [];
  dataTotal.value = 0;
};

// 点击查询按钮
const conditionEnter = (data: any) => {
  if (!data.mitemId || !data.timeCreateRange) {
    MessagePlugin.warning(t('supplierQualificationRate.selectMitemAndTime'));
    return;
  }
  if (data.supplierIds && !isEmpty(data.supplierIds)) {
    data.supplierIds = data.supplierIds.split(',');
  } else {
    data.supplierIds = '';
  }
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
    loading.value = true;
    const data = (await api.iqcInspect.getSupplierQualified({
      ...queryCompment.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    tableData.value = data.list;
    dataTotal.value = data.total;
    MessagePlugin.success(t('supplierQualificationRate.querySuccess'));
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
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
