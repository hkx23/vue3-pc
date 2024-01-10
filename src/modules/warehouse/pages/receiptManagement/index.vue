<!-- 单据管理  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <!-- query -->
      <t-card :ghost="true">
        <!-- <cmp-query ref="queryComponent" :opts="optsReceipt" :bool-enter="false" @submit="onInput"> </cmp-query> -->
        <t-form ref="formRef" label-width="80px" @submit="onInput">
          <t-row :gutter="[32, 16]">
            <t-col :span="3">
              <t-form-item label="事物类型">
                <t-select v-model="resSelect" placeholder="请选择事物类型" multiple clearable>
                  <t-option
                    v-for="item in formData.transactionType"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></t-option>
                  ></t-select
                >
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="物料编码">
                <!-- 选择框 -->
                <t-select v-model="formData.materialCode">
                  <!-- <icon name="browse" slot="prefixIcon" style="margin-right: 8px" /> -->
                </t-select>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="供应商">
                <t-select v-model="formData.supplier" placeholder="请选择供应商"></t-select>
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item>
                <t-space size="10px">
                  <t-button theme="primary" type="submit">查询</t-button>
                  <t-button theme="default" variant="base" type="reset">重置</t-button>
                  <t-button theme="default" variant="base" @click="handleToggleExpand">
                    <div>
                      展开
                      <ChevronDownIcon />
                    </div>
                    <div>
                      收起
                      <ChevronUpIcon />
                    </div>
                  </t-button>
                </t-space>
              </t-form-item>
            </t-col>

            <t-col v-show="isExpanded" :span="3" class="expandable-content">
              <t-form-item label="单据号">
                <t-input v-model="formData.documentNumber" placeholder="请输入单据号"></t-input>
              </t-form-item>
            </t-col>

            <t-col v-show="isExpanded" :span="3" class="expandable-content">
              <t-form-item label="创建时间">
                <t-date-range-picker v-model="formData.creationTime"></t-date-range-picker>
              </t-form-item>
            </t-col>
          </t-row>
        </t-form>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-card>
        <cmp-table
          row-key="id"
          :table-column="tableReckoningManagementColumns"
          :table-data="tableDataLocation"
          :fixed-height="false"
          :total="dataTotal"
          empty="没有符合条件的数据"
          :show-toolbar="false"
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
      <receipt-details v-model:visible="RPDRoutingVisible" :form-title="formTitle" />
    </cmp-container>
  </cmp-container>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

import ReceiptDetails from './receiptDetails.vue';
// import { Icon } from 'tdesign-icons-vue';

const isExpanded = ref(false); // 用来控制展开和收起

const resSelect = ref([]);
// 表单数据模型
const formData = ref({
  transactionType: [
    { label: '云服务器', value: '1' },
    { label: '云数据库', value: '2' },
    { label: '域名注册', value: '3' },
    { label: '网站备案', value: '4' },
    { label: '对象存储', value: '5' },
    { label: '低代码平台', value: '6' },
  ], // 事物类型
  materialCode: '', // 物料编码
  supplier: null, // 供应商
  documentNumber: '', // 单据号
  creationTime: [], // 创建时间
});

const formRef = ref(null);
const tableDataLocation = ref([]); //* 表格数据
const formTitle = ref('');
const dataTotal = ref(0);
const RPDRoutingVisible = ref(false); //* 弹窗默认关闭

//* 组件配置  --查询界面选择
// const optsReceipt = computed(() => {
//   return {
//     mitemId: {
//       label: '事物类型',
//       comp: 't-select',
//       event: 'business',
//       defaultVal: '',
//       multiple: true,
//       bind: {
//         type: 'mitem',
//         showTitle: false,
//       },
//     },
//     datetimePlanRange: {
//       label: '物料编码',
//       comp: 't-select',
//       defaultVal: '',
//     },
//     supplierId: {
//       label: '供应商',
//       comp: 'bcmp-select-business',
//       event: 'business',
//       defaultVal: '',
//       bind: {
//         type: 'supplier',
//         showTitle: false,
//       },
//    ,
//       default   },
//     datetimePlanRange1: {
//       label: '创建时间',
//       comp: 't-date-range-picker',
//       defaultVal: [dayjs().subtract(+3, 'day').format('YYYYMMDD'), dayjs().format('YYYYMMDD')], // 初始化日期控件
//     },
//   };
// });
//

const handleToggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
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
</script>

<style lang="less" scoped>
.expandable-content-enter-active,
.expandable-content-leave-active {
  transition: opacity 0.5s;
}

.expandable-content-enter,
.expandable-content-leave-to {
  opacity: 0;
}

.search-input-container {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
