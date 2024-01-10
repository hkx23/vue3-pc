<!-- 盘点管理  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <!-- cmp-query 查询组件 -->
      <cmp-card>
        <cmp-card :ghost="true">
          <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
        </cmp-card>
      </cmp-card>
      <!-- cmp-table 表格组件  -->
      <cmp-card>
        <cmp-table
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="tableReckoningManagementColumns"
          :table-data="tableDataLocation"
          :fixed-height="false"
          :total="dataTotal"
          empty="没有符合条件的数据"
          @refresh="tabRefresh"
        >
          <!-- 状态 -->
          <!-- <template #state="{ row }">
            <span v-if="row.state == 1">已创建</span>
            <span v-if="row.state == 2">盘点中</span>
            <span v-if="row.state == 3">已完成</span>
            <span v-if="row.state == 4">已关闭</span>
            <span v-else>已作废</span>
          </template> -->
          <template #button>
            <t-button theme="primary" @click="onAdd">新增</t-button>
            <t-button theme="default">作废</t-button>
            <t-button theme="primary" @click="result">打印</t-button>
            <t-button theme="primary">导出</t-button>
          </template>
          <!-- <template #op="row">
            <t-space>
              <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(row)">编辑</t-link>
              <t-popconfirm theme="default" content="确认删除吗" @confirm="() => onStateRowClick(row)">
                <t-link theme="primary"> 删除 </t-link>
              </t-popconfirm>
            </t-space>
          </template> -->
        </cmp-table>
      </cmp-card>

      <!-- 新增弹窗组件 -->
      <newInventoryManagemment v-model:visible="eidtRoutingVisible" :form-title="formTitle" />
      <!-- 盘点单维护组件 -->
      <inventory-sheet-maintenance v-model:visible="ISMRoutingVisible" :form-title="formTitle" />
    </cmp-container>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

// import { api, LocationSearch } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
// import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import InventorySheetMaintenance from './inventory-sheet-maintenance.vue';
import newInventoryManagemment from './new-inventory-managemment.vue';
// import { useLang } from './lang';

// const { t } = useLang();
const { pageUI } = usePage();
// const { loading, setLoading } = useLoading();
// const selectedWarehouseRowKeys = ref([]);
const tableDataLocation = ref([]); //* 表格数据
const eidtRoutingVisible = ref(false); //* 弹窗默认关闭
const ISMRoutingVisible = ref(false); //* 弹窗默认关闭
const formTitle = ref('');
const dataTotal = ref(0);
// const formRef = ref(null); //* formRef defult nulls

//* 初始渲染
onMounted(async () => {
  // await fetchTable();
});

//* 组件配置  business --查询界面选择
const opts = computed(() => {
  return {
    mitemId: {
      label: '盘点单号',
      comp: 't-input',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    datetimePlanRange: {
      label: '创建时间',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYYMMDD'), dayjs().format('YYYYMMDD')], // 初始化日期控件
    },
    supplierId: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
      },
    },

    billNo: {
      label: '单据状态',
      comp: 't-select',
      defaultVal: '',
    },
  };
});

const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '盘点单号', colKey: 'inventoryNumber', width: 85 },
  { title: '仓库', width: 85, colKey: 'warehouse' },
  { title: '盘点类型', width: 85, colKey: 'countingtype' },
  { title: '状态', width: 85, colKey: 'state' },
  { title: '创建人', width: 85, colKey: 'founder' },
  {
    title: '创建时间',
    width: 85,
    colKey: 'date',
  },
  { title: '最后更新人', width: 100, colKey: 'vvd' },
  {
    title: '最后更新时间',
    width: 85,
    colKey: 'lastDate',
  },
];

//* 表格数据
// const fetchTable = async () => {
//   setLoading(false);
//   selectedWarehouseRowKeys.value = [];
//   tableDataLocation.value = [];
//   // const data = await api.xx.xx({
//   //   pageNum: pageUI.value.page,
//   //   pageSize: pageUI.value.rows,
//   // });
//   // tableDataLocation.value = data.list;
//   // dataTotal.value = data.total;
//   setLoading(false);
// };

//* 表格刷新
const tabRefresh = async () => {
  // await fetchTable();
};

//* 查询
const onInput = async (data: any) => {
  if (!data.value) {
    // const { warehouseId, districtKeyword, locationKeyword } = data;
    // pageUI.value.page = 1;
    // const result = await api.xx.xxx({
    //   pageNum: pageUI.value.page,
    //   pageSize: pageUI.value.rows,
    //   warehouseId,
    //   districtKeyword,
    //   locationKeyword,
    // } as LocationSearch);
    // tableDataLocation.value = result.list;
    // dataTotal.value = result.total;
  }
};

const onAdd = () => {
  formTitle.value = '新增盘点管理';
  eidtRoutingVisible.value = true;
};

const result = () => {
  formTitle.value = '盘点单维护';
  ISMRoutingVisible.value = true;
};
</script>

<style lang="less" scoped></style>
