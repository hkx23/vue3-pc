<!-- 收发存报表 -->
<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput">
        <template #isDistrict="{ param }">
          <t-checkbox v-model="param.isDistrict">按货位汇总</t-checkbox>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        empty="没有符合条件的数据"
        :table-column="columns"
        :fixed-height="true"
        :table-data="handQtyData.list"
        :total="handQtyTotal"
        @refresh="onFetchData"
      >
        <template #title>
          {{ '收发存列表' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const queryRef = ref();
const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const pageShow = ref(false);

// 表格数据总条数
const handQtyTotal = ref(0);
// 表格数据
const handQtyData = reactive({ list: [] });
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'warehouseName',
    title: '仓库',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'districtName',
    title: '货区',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'locationName',
    title: '货位',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'categoryCode',
    title: '物料类别编码',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'categoryName',
    title: '物料类别名称',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'primaryNum',
    title: '期初库存',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'searchOut',
    title: '入库',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'searchIn',
    title: '出库',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'lastNum',
    title: '期末出库',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '150',
    fixed: 'right',
  },
];
// 初始渲染
onMounted(async () => {
  await onGetHandQtyData(); // 获取 表格 数据
});

// 刷新按钮
const onFetchData = () => {
  onGetHandQtyData();
};

// 主界面数据
// 获取本月一号 00:00:00
const startOfSevenDaysAgo = dayjs().startOf('month');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');
const handQtyParam = ref({
  pageNum: 1,
  pageSize: 10,
  warehouseId: '', // 仓库
  mitemCategoryId: '', // 物料类型
  mitemIds: [], // 物料
  isDistrict: true, // 货位汇总
  receiveDateStart: startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), // 开始时间
  receiveDateEnd: endOfToday.format('YYYY-MM-DD HH:mm:ss'), // 结束时间
});

// 获取 表格 数据
const onGetHandQtyData = async () => {
  // selectedRowKeys.value = [];
  handQtyParam.value.pageNum = pageUI.value.page;
  handQtyParam.value.pageSize = pageUI.value.rows;
  const res = await api.acceptSendSaveReport.getList(handQtyParam.value);
  handQtyData.list = res.list;
  handQtyTotal.value = res.total;
};

// #query 查询参数

const opts = computed(() => {
  return {
    receiveDate: {
      label: '时间',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), endOfToday.format('YYYY-MM-DD HH:mm:ss')], // 初始化日期控件
      bind: {
        enableTimePicker: true,
        // format: 'YYYY-MM-DD',
      },
    },
    warehouseId: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    mitemCategoryId: {
      label: '物料类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemIds: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: [],
      bind: {
        type: 'mitem',
        showTitle: false,
        isMultiple: true,
      },
    },
    isDistrict: {
      label: '',
      labelWidth: '10',
      event: 'radio',
      defaultVal: 'true',
      slotName: 'isDistrict',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  handQtyParam.value.isDistrict = data.isDistrict;
  handQtyParam.value.mitemCategoryId = data.mitemCategoryId;
  handQtyParam.value.warehouseId = data.warehouseId;
  handQtyParam.value.mitemIds = data.mitemIds.map((item) => item.value);
  const [receiveDateStart, receiveDateEnd] = data.receiveDate;
  handQtyParam.value.receiveDateStart = receiveDateStart;
  handQtyParam.value.receiveDateEnd = receiveDateEnd;
  await onGetHandQtyData();
};
</script>

<style lang="less" scoped></style>
