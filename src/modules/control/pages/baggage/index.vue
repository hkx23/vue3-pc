<!-- 箱包关系报表 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <t-enhanced-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :data="anomalyTypeData.list"
        resizable
        :tree="treeConfig"
        lazy-load
        class="enhanced-table-baggage"
        @expanded-tree-nodes-change="onExpandedTreeNodesChange"
      >
      </t-enhanced-table>
      <t-pagination
        v-model:current="bagsSuitcasesData.pageNum"
        v-model:page-size="bagsSuitcasesData.pageSize"
        style="margin-top: 8px"
        show-jumper
        :show-page-size="true"
        :total="anomalyTotal"
        @page-size-change="onPaginationChange"
        @current-change="onCurrentChange"
      />
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';

// 表格实例
const tableRef = ref(null);

// 表格数据
const anomalyTypeData = reactive({ list: [] });
// 表格数据总条数
const anomalyTotal = ref(0);
// 表格列表数据
const treeConfig = reactive({
  childrenKey: 'children',
});

const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'pkgBarcode',
    title: '条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcodeType',
    title: '条码类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'scheCode',
    title: '排产单号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemCode',
    title: '产品编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemDesc',
    title: '产品描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'moStatusName',
    title: '工单状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creator',
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
});

// 表格数据 字段
const bagsSuitcasesData = ref({
  pageNum: 1,
  pageSize: 10,
  barcode: '', // 每条数据的code
  mitemCode: '', // 产品编码 物料接口
  moScheCode: '', // 排产单号
  pkgBarcode: '', // 箱条码
  beginDate: dayjs().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'), // 开始日期
  endDate: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'), // 结束日期
  parentPkgBarcode: '', // 获取子节点数据的 CODE
});

// 获取 表格 数据
const onGetAnomalyTypeData = async () => {
  const res = await api.pkgRelation.getPkgRelationReportList(bagsSuitcasesData.value);
  console.log('🚀 ~ file: index.vue:126 ~ onGetAnomalyTypeData ~ res:', res);
  const newData = res.list.map((item) => {
    if (item.existPkgRelationReportcChildren) {
      if (item.children && item.children.length === 0) {
        return {
          ...item,
          children: true, // 在 children 中添加一个新对象，包含一个唯一ID
        };
      }
    }
    return item;
  });
  anomalyTypeData.list = newData;
  anomalyTotal.value = res.total;
};

// 分页事件 1
const onPaginationChange = async () => {
  bagsSuitcasesData.value.pageNum = 1;
  await onGetAnomalyTypeData();
};
// 分页事件 2
const onCurrentChange = async () => {
  await onGetAnomalyTypeData();
};

// 点击节点获取子节点数据
const onExpandedTreeNodesChange = async (expandedTreeNodes: any, options: any) => {
  expandedTreeNodes = [];
  const res = await api.pkgRelation.getPkgRelationReportList({
    parentPkgBarcode: options.row.pkgBarcode,
    pageNum: 1,
    pageSize: 9999,
  });
  const newData = res.list.map((item) => {
    if (item.existPkgRelationReportcChildren) {
      if (item.children && item.children.length === 0) {
        return {
          ...item,
          children: true, // 在 children 中添加一个新对象，包含一个唯一ID
        };
      }
    }
    return item;
  });
  if (options.row.children === true) {
    tableRef.value.appendTo(options.rowState.row.id, [...newData]);
  }
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
    boxCode: {
      label: '箱条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    workOrder: {
      label: '排产单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        valueField: 'scheCode',
        type: 'moSchedule',
        showTitle: false,
      },
    },
    productNo: {
      label: '产品编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        valueField: 'mitemCode',
        type: 'mitem',
        showTitle: false,
      },
    },
    operationTime: {
      label: '操作时间',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [startOfToday.format('YYYY-MM-DD HH:mm:ss'), endOfToday.format('YYYY-MM-DD HH:mm:ss')], // 初始化日期控件
      bind: {
        enableTimePicker: true,
        // format: 'YYYY-MM-DD',
      },
    },
  };
});

// 获取当前日期的 00:00:00
const startOfToday = dayjs().subtract(7, 'days').startOf('day');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');

const onInput = async (context) => {
  bagsSuitcasesData.value.pageNum = 1;
  const [beginDate, endDate] = context.operationTime;
  if (!beginDate || !endDate) {
    MessagePlugin.warning('请正确输入日期！');
    return;
  }
  bagsSuitcasesData.value.barcode = context?.productCode ? context?.productCode : ''; // 每条数据的code
  bagsSuitcasesData.value.mitemCode = context?.productNo ? context?.productNo : ''; // 产品编码 物料接口
  bagsSuitcasesData.value.moScheCode = context?.workOrder ? context?.workOrder : ''; // 排产单号
  bagsSuitcasesData.value.pkgBarcode = context?.boxCode ? context?.boxCode : ''; // 箱条码
  bagsSuitcasesData.value.beginDate = beginDate; // 开始日期
  bagsSuitcasesData.value.endDate = endDate; // 结束日期
  await onGetAnomalyTypeData();
};
</script>

<style lang="less" scoped>
.enhanced-table-baggage {
  height: 100%;
}
</style>
