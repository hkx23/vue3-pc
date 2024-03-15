<template>
  <t-tabs v-model="tabKey" @change="tabChange">
    <!-- # 1️⃣ 产品基础信息 -->
    <t-tab-panel :value="0" label="产品基础信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true">
          <t-card :bordered="true">
            <t-descriptions
              :column="4"
              :label-style="{ width: '120px', textAlign: 'right' }"
              :content-style="{ textAlign: 'left' }"
            >
              <template #title>
                <span v-if="!productBasicInformationForm?.moCode">工单信息( )</span>
                <span
                  v-if="productBasicInformationForm?.moCode"
                  v-html="
                    `工单信息(工单号：${productBasicInformationForm?.moCode ? productBasicInformationForm?.moCode : ''} )`
                  "
                ></span>
              </template>
              <t-descriptions-item label="工序">{{ productBasicInformationForm?.curProcessName }}</t-descriptions-item>
              <t-descriptions-item label="工站">{{
                productBasicInformationForm?.curWorkstationName
              }}</t-descriptions-item>
              <t-descriptions-item label="工作中心">{{
                productBasicInformationForm?.curWorkcenterName
              }}</t-descriptions-item>
              <t-descriptions-item label="车间">{{ productBasicInformationForm?.curWorkshopName }}</t-descriptions-item>

              <t-descriptions-item label="产品编码">{{
                productBasicInformationForm?.serialNumber
              }}</t-descriptions-item>
              <t-descriptions-item label="排产单号">{{ productBasicInformationForm?.moScheCode }}</t-descriptions-item>
              <t-descriptions-item label="创建时间">{{
                productBasicInformationForm?.serialNumberTimeCreate
              }}</t-descriptions-item>
              <t-descriptions-item label="最后更新时间">{{
                productBasicInformationForm?.lastTimeModified
              }}</t-descriptions-item>
            </t-descriptions>
          </t-card>
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRefCardAD"
              v-model:pagination="pageUI"
              :fixed-height="true"
              empty="没有符合条件的数据"
              row-key="deliveryCardId"
              :table-column="productBasicInformation"
              :table-data="productBasicInformationForm?.wipLogList?.list"
              :total="productBasicInformationForm?.wipLogList?.total"
            >
              <template #dcResult="{ row }">
                {{ row.dcResult ? '是' : '否' }}
              </template>
              <template #isCompleted="{ row }">
                {{ row.isCompleted ? '是' : '否' }}
              </template>
              <template #isHold="{ row }">
                {{ row.isHold ? '是' : '否' }}
              </template>
              <template #title>
                <span v-if="!productBasicInformationForm?.serialNumber">{{ '生产历史信息( )' }}</span>
                <span v-if="productBasicInformationForm?.serialNumber">
                  {{
                    `生产历史信息( 产品：${
                      productBasicInformationForm?.serialNumber ? productBasicInformationForm?.serialNumber : ''
                    } )`
                  }}</span
                >
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 2️⃣ 工单信息 -->
    <t-tab-panel :value="1" label="工单信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true">
          <detailed :row="workOrderData.list"></detailed>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 3️⃣ 物料信息 -->
    <t-tab-panel :value="2" label="物料信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true" :full-sub-index="[0, 1]">
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRefThree"
              v-model:pagination="pageUI"
              empty="没有符合条件的数据"
              :table-column="materialkey"
              row-key="moCode"
              :fixed-height="true"
              select-on-row-click
              :table-data="WipKeypartReportVOForm"
              :total="WorkOrderTotal"
              @select-change="onMaterialWorkOrderChange"
              @refresh="onMaterialWorkOrderRefresh"
            >
              <template #title>
                {{ '产品信息-关键件信息' }}
              </template>
            </cmp-table>
          </cmp-card>
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRefThreeDown"
              v-model:pagination="pageUITwo"
              empty="没有符合条件的数据"
              :fixed-height="true"
              :table-column="materialWorkOrder"
              row-key="moCode"
              :table-data="workOrderFeedData"
              :total="workOrderFeedTotal"
              @refresh="onWorkOrderFeedRefresh"
            >
              <template #title>
                {{ '产品信息-工单投料信息' }}
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 4️⃣ 包装信息 -->
    <t-tab-panel :value="3" label="包装信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true">
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <t-enhanced-table
                ref="tableRef"
                row-key="id"
                :columns="columns"
                :data="anomalyTypeData"
                resizable
                :tree="treeConfig"
                lazy-load
                @expanded-tree-nodes-change="onExpandedTreeNodesChange"
              >
              </t-enhanced-table>
              <t-pagination
                v-model:current="commonParametersList.pageNum"
                v-model:page-size="commonParametersList.pageSize"
                style="margin-top: 8px"
                show-jumper
                :show-page-size="true"
                :total="anomalyTotal"
                @page-size-change="onPaginationChange"
                @current-change="onCurrentChange"
              />
            </div>
          </footer>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 5️⃣ 品质信息 -->
    <t-tab-panel :value="4" label="品质信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true">
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                row-key="deliveryCardId"
                :table-data="jiashuju"
                :table-column="qualityInformation"
                :total="2"
              >
                <template #title>
                  {{ '品质信息' }}
                </template>
              </cmp-table>
            </div>
          </footer>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 6️⃣ 工艺信息 -->
    <t-tab-panel :value="5" label="工艺信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true">
          <t-card>
            <t-descriptions
              title="工艺路线信息"
              :column="4"
              :label-style="{ width: '120px', textAlign: 'right' }"
              :content-style="{ textAlign: 'left' }"
            >
              <t-descriptions-item label="工艺路线名称">FMVP</t-descriptions-item>
              <t-descriptions-item label="工艺路线版本"></t-descriptions-item>
              <t-descriptions-item label="工艺路线类别"></t-descriptions-item>
              <t-descriptions-item label="启用日期"></t-descriptions-item>
            </t-descriptions>
          </t-card>

          <cmp-table
            ref="tableRefCard"
            v-model:pagination="pageUI"
            :fixed-height="true"
            row-key="deliveryCardId"
            :table-data="jiashuju"
            :table-column="processDocument"
            :total="2"
          >
            <template #title>
              {{ '工艺文件信息' }}
            </template>
          </cmp-table>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 7️⃣ 不良维修信息 -->
    <t-tab-panel :value="6" label="不良维修信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true" :full-sub-index="[0, 1]">
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRefSeven"
              v-model:pagination="pageUI"
              row-key="id"
              :fixed-height="true"
              select-on-row-click
              :table-data="badMaintenanceData.list"
              :table-column="productDefect"
              :total="badMaintenanceTotal"
              @select-change="onGenerateChange"
              @refresh="onBadMaintenanceRefresh"
            >
              <template #title>
                {{ '产品不良信息' }}
              </template>
            </cmp-table>
          </cmp-card>
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRefCard"
              v-model:pagination="pageUI"
              :fixed-height="true"
              row-key="id"
              :table-data="badMaintenanceDataTwo.list"
              :table-column="maintenanceDetail"
              :show-pagination="false"
            >
              <template #title>
                {{ '维修明细' }}
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </template>
    </t-tab-panel>
    <!-- # 8️⃣ 出入库信息 -->
    <t-tab-panel :value="7" label="出入库信息" :destroy-on-hide="false">
      <template #panel>
        <cmp-container :full="true">
          <cmp-table
            ref="tableRefba"
            v-model:pagination="pageUI"
            row-key="id"
            :fixed-height="true"
            select-on-row-click
            :table-data="inventoryInOutData.list"
            :table-column="inventoryInOut"
            :total="inventoryInOutTotal"
            @refresh="onInventoryInOut"
          >
            <template #title>
              {{ '出入库信息' }}
            </template>
          </cmp-table>
        </cmp-container>
      </template>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, defineEmits, defineProps, reactive, ref, watch } from 'vue';

import { api, MoOnboardReportVO, ProductBaseReportVO, TransferStockInOutVO, WipKeypartReportVO } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';

const { pageUI } = usePage();
const { pageUI: pageUITwo } = usePage(); // 分页工具
const tableRefCardAD = ref();
const tableRefThree = ref();
const tableRefSeven = ref();
const tableRefba = ref();

const jiashuju = ref([
  { deliveryCardStatuName: 'nihao1', timeCreate: '2000-11-11' },
  { deliveryCardStatuName: 'nihao1', timeCreate: '2000-11-11' },
]);

// 1️⃣ 产品基础信息 表格列数据
const productBasicInformation: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'curProcessName',
    title: '工序',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'curWorkstationName',
    title: '工站',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'dcResult',
    title: '合格状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isCompleted',
    title: '完工状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isHold',
    title: '是否暂挂',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creator',
    title: '员工',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workgroupName',
    title: '班次',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeModified',
    title: '加工时间',
    align: 'center',
    width: '100',
  },
];
// // 3️⃣ - 1️⃣物料信息 关键信息 表格列数据
const materialkey: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    width: 46,
  },
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'moCode',
    title: '工单号',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'keypartBarcode',
    title: '关键件条码',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'processName',
    title: '工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workstationName',
    title: '工站',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'statusName',
    title: '状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'displayName',
    title: '员工',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '班次',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '加工时间',
    align: 'center',
    width: '150',
  },
];

// // 3️⃣ - 2️⃣物料信息 工单投料信息 表格列数据
const materialWorkOrder: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workcenterCode',
    title: '工作中心',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'moCode',
    title: '工单号',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'moMitemCode',
    title: '产品编码',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'serialNumber',
    title: '物料条码',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'lotNo',
    title: '物料批次',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'supplierCode',
    title: '供应商编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemDesc',
    title: '物料描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'processName',
    title: '绑定工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workstationName',
    title: '绑定工站',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'displayName',
    title: '作业员',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeOnboard',
    title: '加工时间',
    align: 'center',
    width: '150',
    fixed: 'right',
  },
];

// // 4️⃣包装信息 表格列数据
// const packagingInformation: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '条码',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'qty',
//     title: '条码类型',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'operateType',
//     title: '排产单号',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'reason',
//     title: '工单号',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'creator',
//     title: '产品编码',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '产品描述',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '工单状态',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '操作人',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '操作时间',
//     align: 'center',
//     width: '100',
//   },
// ];

// // 5️⃣ 品质信息 表格列数据
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

// // 5️⃣ 品质信息 表格列数据
const qualityInformation: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'pkgBarcode',
    title: '检验单号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcode',
    title: '检验类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcode',
    title: '检验人',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcode',
    title: '质检结果',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcode',
    title: '质检时间',
    align: 'center',
    width: '110',
  },
];

// // 6️⃣ 工艺文件信息 表格列数据
const processDocument: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '文件名称',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '文件类型',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'operateType',
    title: '版本号',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'reason',
    title: '上传人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creator',
    title: '启用日期',
    align: 'center',
    width: '100',
  },
];

// // 7️⃣ - 1️⃣ 产品不良 表格列数据
const productDefect: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    width: 46,
  },
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'scanBarcode',
    title: '产品条码',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'moScheCode',
    title: '排产工单',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: '产品编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemName',
    title: '产品名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'fromRoutingProcessName',
    title: '来源工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'fromWorkstationName',
    title: '来源工站',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeScanBarcode',
    title: '采集时间',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'retentionTime',
    title: '滞留时间(分钟)',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'ngTimes',
    title: '不合格次数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'repairTimes',
    title: '维修次数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'repairStatusName',
    title: '返修状态',
    align: 'center',
    width: '100',
    fixed: 'right',
  },
];

// // 7️⃣ - 2️⃣ 维修明细 表格列数据
const maintenanceDetail: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'scanBarcode',
    title: '产品条码',
    align: 'center',
    width: '140',
  },
  {
    colKey: 'defectName',
    title: '缺陷现象',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'defectReason',
    title: '缺陷原因',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'userNameRepair',
    title: '维修人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeRepaired',
    title: '维修结束时间',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'creator',
    title: '返修次数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'defectDealMethodName',
    title: '处理方法',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'displayNameRepair',
    title: '责任人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '维修结果',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '回流站点',
    align: 'center',
    width: '100',
  },
];

// // 8️⃣ 出入库信息 表格列数据
const inventoryInOut: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'billNo',
    title: '业务单据号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'businessCategoryName',
    title: '交易类型',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'pickQty',
    title: '数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'warehouseName',
    title: '源仓库',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'toWarehouseName',
    title: '目标仓库',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'displayTransferName',
    title: '交易人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeTransfer',
    title: '交易日期',
    align: 'center',
    width: '100',
  },
];

const props = defineProps({
  onInputData: {
    type: Object, // 或者其他适合数据的类型
    default: () => {
      return {
        pageNum: 1,
        pageSize: 10,
        serialNumber: '', // 产品条码
        moCode: '', // 工单号
        parentPkgBarcode: '', // 包装箱码
      }; // 返回一个对象作为默认值
    },
  },
  resetData: Object,
});

// 子组件传递给父组件的事件
const emit = defineEmits(['tab-changed']);

// 监听重置事件
watch(
  () => props.resetData,
  async (newVal: any) => {
    commonParametersList.value = { ...newVal, pageNum: 1, pageSize: 10 };
    if (tabKey.value === 0) {
      productBasicInformationForm.value = {};
    }
    if (tabKey.value === 1) {
      workOrderData.list = [];
    }
    if (tabKey.value === 2) {
      await onMaterialWorkOrder();
      tableRefThree.value.setSelectedRowKeys([]);
      workOrderFeedData.value = [];
      materialCode.value = '';
      workOrderFeedTotal.value = 0;
    }
    if (tabKey.value === 3) {
      await onGetAnomalyTypeData();
    }
    if (tabKey.value === 6) {
      tableRefSeven.value.setSelectedRowKeys([]);
      await onBadMaintenance();
      badMaintenanceDataTwo.list = [];
      badMaintenanceId.value = '';
    }
    if (tabKey.value === 7) {
      await onInventoryInOut();
    }
  },
  {
    deep: true, // 由于 onInputData 是一个对象，使用深度监听
  },
);

// 监听搜索事件
watch(
  () => props.onInputData,
  async (newVal: any) => {
    // 当 onInputData 改变时，更新 productBasicInformationList 的值
    commonParametersList.value = { ...newVal, pageNum: 1, pageSize: 10 };
    if (tabKey.value === 0) {
      await onGetProductBasicInformation();
    }
    if (tabKey.value === 1) {
      await onGetWorkOrder();
    }
    if (tabKey.value === 2) {
      await onMaterialWorkOrder();
    }
    if (tabKey.value === 3) {
      await onGetAnomalyTypeData();
    }
    if (tabKey.value === 6) {
      await onBadMaintenance();
    }
    if (tabKey.value === 7) {
      await onInventoryInOut();
    }
  },
  {
    deep: true, // 由于 onInputData 是一个对象，使用深度监听
  },
);

// 🌈 tab 切换事件
const tabKey = ref(0);
const tabChange = async (context: any) => {
  pageUI.value.page = 1;
  pageUITwo.value.page = 1;
  tabKey.value = context;
  emit('tab-changed', context);
  // if (
  //   !commonParametersList.value.serialNumber &&
  //   !commonParametersList.value.moCode &&
  //   !commonParametersList.value.parentPkgBarcode
  // ) {
  //   return;
  // }
  // if (context === 0) {
  //   await onGetProductBasicInformation();
  // }
  // if (context === 1) {
  //   await onGetWorkOrder();
  // }
  // if (context === 2) {
  //   await onMaterialWorkOrder();
  // }
  // if (context === 3) {
  //   await onGetAnomalyTypeData();
  // }
  // if (context === 6) {
  //   onBadMaintenance();
  // }
  // if (context === 7) {
  //   onInventoryInOut();
  // }
};

// 🌈🌈🌈 公共参数
const commonParametersList = ref({
  pageNum: 1,
  pageSize: 10,
  serialNumber: '', // 产品条码
  moCode: '', // 工单号
  parentPkgBarcode: '', // 包装箱码
});
// @ 获取 产品基础信息 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ 数据
const productBasicInformationForm = ref<ProductBaseReportVO>({});
// 产品基础信息 请求
const onGetProductBasicInformation = async () => {
  const res = await api.reversetraceability.getProductBaseInfo(commonParametersList.value);
  productBasicInformationForm.value = _.cloneDeep(res);
};

// 获取 工单信息 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣  数据
const workOrderData = reactive({ list: [] });
const onGetWorkOrder = async () => {
  const res = (await api.reversetraceability.getMoBaseInfo(commonParametersList.value)) as any;
  [workOrderData.list] = res.list;
};
// 获取 物料信息 3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣  数据
const WipKeypartReportVOForm = ref<WipKeypartReportVO[]>([]);
const WorkOrderTotal = ref<number>(0);
// 物料信息 请求
const onMaterialWorkOrder = async () => {
  commonParametersList.value.pageNum = pageUI.value.page;
  commonParametersList.value.pageSize = pageUI.value.rows;
  const res = await api.reversetraceability.getWipKeypartInfo(commonParametersList.value);
  WipKeypartReportVOForm.value = res.list;
  WorkOrderTotal.value = res.total;
};

// 上表格点击事件
const materialCode = ref('');
const onMaterialWorkOrderChange = async (context: any) => {
  [materialCode.value] = context;
  await onWorkOrderFeed();
};

// 获取 物料下表格数据
const workOrderFeedList = computed(() => ({
  pageNum: pageUITwo.value.page,
  pageSize: pageUITwo.value.rows,
  moCode: materialCode.value,
}));
const workOrderFeedData = ref<MoOnboardReportVO[]>([]);
const workOrderFeedTotal = ref<number>(0);
const onWorkOrderFeed = async () => {
  workOrderFeedList.value.pageNum = pageUITwo.value.page;
  workOrderFeedList.value.pageSize = pageUITwo.value.rows;
  const res = await api.reversetraceability.getMoOnboardInfo(workOrderFeedList.value);
  workOrderFeedData.value = res.list;
  workOrderFeedTotal.value = res.total;
};

// 上表格刷新事件
const onMaterialWorkOrderRefresh = async () => {
  pageUI.value.page = 1;
  await onMaterialWorkOrder();
  materialCode.value = '';
  workOrderFeedData.value = [];
  workOrderFeedTotal.value = 0;
};
// 下表格刷新事件
const onWorkOrderFeedRefresh = async () => {
  if (!materialCode.value) {
    return;
  }
  await onWorkOrderFeed();
};

// 包装信息 4️⃣4️⃣4️⃣4️⃣4️⃣4️⃣ 数据
// 表格列表数据
const treeConfig = reactive({
  childrenKey: 'children',
});
// 表格实例
const tableRef = ref();
const anomalyTypeData = ref([]);
const anomalyTotal = ref<number>(0);
const onGetAnomalyTypeData = async () => {
  const res = await api.reversetraceability.getPkgRelationReportList(commonParametersList.value);
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
  anomalyTypeData.value = newData;
  anomalyTotal.value = res.total;
};

// 点击节点获取子节点数据
const onExpandedTreeNodesChange = async (expandedTreeNodes: any, options: any) => {
  expandedTreeNodes = [];
  const res = await api.reversetraceability.getPkgRelationReportList({
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
    tableRef.value[tabKey.value].appendTo(options.rowState.row.id, [...newData]);
  }
};

const onPaginationChange = async () => {
  commonParametersList.value.pageNum = 1;
  await onGetAnomalyTypeData();
};

const onCurrentChange = async () => {
  await onGetAnomalyTypeData();
};

// 获取 不良维修信息 7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣  数据
const badMaintenanceData = reactive({ list: [] });
const badMaintenanceTotal = ref(0);
const onBadMaintenance = async () => {
  commonParametersList.value.pageNum = pageUI.value.page;
  commonParametersList.value.pageSize = pageUI.value.rows;
  const res = await api.reversetraceability.getWipRepairList(commonParametersList.value);
  badMaintenanceData.list = res.list;
  badMaintenanceTotal.value = res.total;
};
// 不良维修信息 上表格点击事件
const badMaintenanceId = ref('');
const onGenerateChange = async (context: any) => {
  [badMaintenanceId.value] = context;
  await onBadMaintenanceTwo();
};
// 刷新事件
const onBadMaintenanceRefresh = async () => {
  pageUI.value.page = 1;
  await onBadMaintenance();
  badMaintenanceDataTwo.list = [];
};

// 不良维修信息 下表格数据请求
const badMaintenanceDataTwo = reactive({ list: [] });
const onBadMaintenanceTwo = async () => {
  const res = await api.reversetraceability.getListByWipRepairId({ wipRepairId: badMaintenanceId.value });
  badMaintenanceDataTwo.list = res;
};

// 获取 出入库信息 8️⃣8️⃣8️⃣8️⃣8️⃣8️⃣  数据
const inventoryInOutData = reactive({ list: [] as TransferStockInOutVO[] });
const inventoryInOutTotal = ref<number>(0);
const onInventoryInOut = async () => {
  commonParametersList.value.pageNum = pageUI.value.page;
  commonParametersList.value.pageSize = pageUI.value.rows;
  const res = await api.reversetraceability.getTransferStockInOutList(commonParametersList.value);
  inventoryInOutData.list = res.list;
  inventoryInOutTotal.value = res.total;
};
</script>

<style lang="less" scoped>
// .t-card {
//   border: 1px solid var(--td-border-level-2-color) !important;
//   margin-bottom: 24px;
// }
.t-card {
  border: 1px solid #d5d8db;
  background: #f0f0f247;
}

.detailed-box {
  // padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xl);
  .popup-mo-foot-btn {
    display: block;
    height: 30px;
    margin-top: 20px;
    text-align: right;
  }
}

.type-box {
  display: flex;
  text-align: center;
  align-items: center;

  li {
    cursor: pointer;
    width: 47px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #eee;
  }

  li:first-child {
    border-radius: 5px 0 0 5px;
  }

  li:last-child {
    border-radius: 0 5px 5px 0;
  }

  .li-cur {
    background: #0894fa;
    color: #fff;
  }
}
// 表单盒子边距
.form-item-box {
  margin: 0;
  display: flex;

  .t-form__item {
    display: flex;
    margin: 0;
    flex: 1;
  }
}

// .tag-block-light {
//  :deep .t-tag--primary {
//     background-color: #548df3;
//   }
// }

.form-checkbox {
  margin: 10px 100px;
}
</style>
