<!-- 箱包关系报表 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :fixed-height="true"
        :table-data="anomalyTypeData.list"
        :total="anomalyTotal"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchData"
        @select-change="rehandleSelectChange"
      >
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage(); // 分页工具
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id

// 表格数据
const anomalyTypeData = reactive({ list: [] });
// 表格数据总条数
const anomalyTotal = ref(0);
// 表格列表数据

const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'incidentModuleName',
    title: '条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'incidentCode',
    title: '条码类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'incidentName',
    title: '排产单号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'state',
    title: '工单号',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'creatorName',
    title: '产品编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '产品描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '工单状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '操作人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '操作时间',
    align: 'center',
    width: '100',
  },
];

// 初始渲染
onMounted(async () => {
  await onGetAnomalyTypeData(); // 获取 表格 数据
  await onGetDropDownData(); // 获取下拉框数据
});

// 刷新按钮
const onFetchData = () => {
  onGetAnomalyTypeData();
};

// 获取 表格 数据
const onGetAnomalyTypeData = async () => {
  const res = await api.incidentType.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: '',
  });
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
};

// #query 查询参数
const opts = computed(() => {
  return {
    productCode: {
      label: '产品条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    productNo: {
      label: '产品编码',
      comp: 't-select',
      event: 't-select',
      defaultVal: '',
    },
    workOrder: {
      label: '排产单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    boxCode: {
      label: '箱条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    operationTime: {
      label: '操作时间',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
  };
});
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
