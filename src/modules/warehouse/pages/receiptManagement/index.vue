<!-- 单据管理  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <cmp-card>
        <cmp-card :ghost="true">
          <cmp-query ref="queryComponent" :opts="optsReceipt" :bool-enter="false" @submit="onInput"> </cmp-query>
        </cmp-card>
      </cmp-card>
      <!-- cmp-table 表格组件  -->
      <cmp-card>
        <cmp-table
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
            <t-button theme="primary">打印</t-button>
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

      <!-- 单据详情组件 -->
      <!-- <RDS v-model:visible="ISMRoutingVisible" :is-copy="isCopy" :form-title="formTitle" @submit="getRouting" /> -->
    </cmp-container>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';
// import RDS from './receiptDetails.vue';

const tableDataLocation = ref([]); //* 表格数据
const eidtRoutingVisible = ref(false); //* 弹窗默认关闭
const formTitle = ref('');
const dataTotal = ref(0);
// const formRef = ref(null); //* formRef defult nulls

//* 初始渲染

//* 组件配置  --查询界面选择
const optsReceipt = computed(() => {
  return {
    mitemId: {
      label: '事物类型',
      comp: 't-input',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    datetimePlanRange: {
      label: '物料编码',
      comp: 't-select',
      defaultVal: '',
    },
    supplierId: {
      label: '供应商',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
      },
    },
    billNo: {
      label: '单据号',
      comp: 't-select',
      defaultVal: '',
    },
    datetimePlanRange1: {
      label: '创建时间',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYYMMDD'), dayjs().format('YYYYMMDD')], // 初始化日期控件
    },
  };
});

const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'inventoryNumber', width: 85 },
  { title: '事物类型', colKey: 'inventoryNumber', width: 85 },
  { title: '单据号', width: 85, colKey: 'warehouse' },
  { title: '关联单号', width: 85, colKey: 'countingtype' },
  { title: '物料编码', width: 85, colKey: 'state' },
  { title: '物料描述', width: 85, colKey: 'state' },
  { title: '需求数量', width: 85, colKey: 'state' },
  { title: '交易数量', width: 85, colKey: 'state' },
  { title: '单位', width: 85, colKey: 'state' },
  { title: 'ERP行号', width: 85, colKey: 'state' },
  { title: '上传状态', width: 85, colKey: 'state' },
  { title: '备注', width: 85, colKey: 'state' },
  { title: '供应商', width: 85, colKey: 'state' },
  { title: '源仓库', width: 85, colKey: 'state' },
  { title: '源货区', width: 85, colKey: 'state' },
  { title: '源货位', width: 85, colKey: 'state' },
  { title: '目标仓库', width: 85, colKey: 'state' },
  { title: '目标货区', width: 85, colKey: 'state' },
  { title: '目标货位', width: 85, colKey: 'state' },
  { title: '单据状态', width: 85, colKey: 'state' },
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

// const onEditRowClick = async (value: any) => {
//   formTitle.value = '编辑';
//   // await api.location.getItemById(value.row.id);
//   // await api.xxx.xxx(value.row.id);
//   // const editedData = {
//   //   ...value.row,
//   //   state: value.row.state ? 1 : 0,
//   // };
//   formRef.value.formData = JSON.parse(JSON.stringify(editedData));
//   // formRef.value.formData = clone2(editedData);
//   eidtRoutingVisible.value = true;
// };

//* 删除
// const onStateRowClick = async (row: { row: any }) => {
//   // await api.location.removeLocation({ id: row.row.id });
//   // await api.xxx.xxx({ id: row.row.id });
//   if (tableDataLocation.value.length <= 1 && pageUI.value.page > 1) {
//     pageUI.value.page--;
//   }
//   await fetchTable(); // *获取数据
//   MessagePlugin.success('删除成功');
// };

const onAdd = () => {
  formTitle.value = '单据号详情';
  eidtRoutingVisible.value = true;
};
</script>

<style lang="less" scoped></style>
