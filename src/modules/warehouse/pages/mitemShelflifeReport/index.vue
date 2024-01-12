<!-- 用户仓库权限 -->
<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        empty="没有符合条件的数据"
        :table-column="columns"
        :fixed-height="true"
        :table-data="transferData.list"
        :total="transferTotal"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onFetchData"
      >
        <template #labelDetails>
          <t-link theme="primary" @click="onEditRow"> 标签明细 </t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" width="750px">
    <cmp-table
      ref="tableRef"
      v-model:pagination="pageUI"
      row-key="id"
      empty="没有符合条件的数据"
      :table-column="columnsDetail"
      :fixed-height="true"
      :table-data="transferData.list"
      :total="transferTotal"
      select-on-row-click
      @refresh="onFetchData"
    >
    </cmp-table>
  </t-dialog>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const selectedRowKeys = ref([]); // 删除计量单位 id
const pageShow = ref(false);
const formVisible = ref(false);

// 表格数据总条数
const transferTotal = ref(0);
// 表格数据
const transferData = reactive({ list: [] });
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'orgName',
    title: '仓库',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'userName',
    title: '货区',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'userDisplayName',
    title: '货位',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'warehouseCode',
    title: '物料编码',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'warehouseName',
    title: '物料名称',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'creatorName',
    title: '物料类别编码',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '物料类别名称',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '供应商名称',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '批次号',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '接收日期',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '库存量',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '保质期(天)',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '过期天数',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'createTime',
    title: '单位',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'labelDetails',
    title: '标签明细',
    align: 'center',
    width: '150',
    fixed: 'right',
  },
];
const columnsDetail: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'orgName',
    title: '条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'userName',
    title: '批次',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'userDisplayName',
    title: '数量',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'userDisplayName',
    title: '供应商编码',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'userDisplayName',
    title: '供应商名称',
    align: 'center',
    width: '120',
  },
];
// 初始渲染
onMounted(async () => {
  await onGetTransferData(); // 获取 表格 数据
});

const onEditRow = () => {
  formVisible.value = true;
};

// 刷新按钮
const onFetchData = () => {
  onGetTransferData();
  selectedRowKeys.value = [];
};

const transferParam = ref({
  pageNum: 1,
  pageSize: 10,
  warehouseId: '', // 单个仓库ID
  userIds: [], // 多个用户ID
});

const rehandleSelectChange = () => {
  console.log('🚀 ~ file: index.vue:215 ~ rehandleSelectChange ~ rehandleSelectChange:', 'rehandleSelectChange');
};

// 获取 表格 数据
const onGetTransferData = async () => {
  // tableRef.value.setSelectedRowKeys([]);
  selectedRowKeys.value = [];
  transferParam.value.pageNum = pageUI.value.page;
  transferParam.value.pageSize = pageUI.value.rows;
  const res = await api.userWarehouseAuthority.getList(transferParam.value);
  transferData.list = res.list;
  transferTotal.value = res.total;
};

// #query 查询参数
// 获取七天前的 00:00:00
const startOfSevenDaysAgo = dayjs().subtract(7, 'days').startOf('day');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');
const opts = computed(() => {
  return {
    datePproduced: {
      label: '接收日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), endOfToday.format('YYYY-MM-DD HH:mm:ss')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    warehouse: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        // valueField: 'scheCode',
        type: 'warehouse',
        showTitle: false,
      },
    },
    mitemCategory: {
      label: '物料类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: [],
      bind: {
        type: 'mitemCategory',
        showTitle: false,
        isMultiple: true,
      },
    },
    mitem: {
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
    batch: {
      label: '批次',
      comp: 't-input',
      event: 't-input',
      defaultVal: '',
    },
  };
});

const onInput = async (data) => {
  const newArr = data.user.map((item) => item.value);
  transferParam.value.userIds = newArr;
  transferParam.value.warehouseId = data.warehouse;
  pageUI.value.page = 1;
  await onGetTransferData();
};
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
