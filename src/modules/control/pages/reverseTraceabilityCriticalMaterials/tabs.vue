<template>
  <t-tabs v-model="tabKey" @change="tabChange">
    <t-tab-panel v-for="(item, index) in tabPanel" :key="item" :value="index" :label="item" :destroy-on-hide="false">
      <template #panel>
        <!-- # 1️⃣ 产品基础信息 -->
        <cmp-container v-if="tabKey === 0" :full="true">
          <t-card :bordered="false">
            <div class="form-item-box">
              <t-form-item label="工序">{{ productBasicInformationForm?.curProcessName }}</t-form-item>
              <t-form-item label="工站"> {{ productBasicInformationForm?.curWorkstationName }}</t-form-item>
              <t-form-item label="工作中心"> {{ productBasicInformationForm?.curWorkcenterName }}</t-form-item>
              <t-form-item label="车间"> {{ productBasicInformationForm?.curWorkshopName }}</t-form-item>
            </div>
            <div class="form-item-box">
              <t-form-item label="产品编码">{{ productBasicInformationForm?.serialNumber }}</t-form-item>
              <t-form-item label="排产单号"> {{ productBasicInformationForm?.moScheCode }}</t-form-item>
              <t-form-item label="创建时间"> {{ productBasicInformationForm?.serialNumberTimeCreate }}</t-form-item>
              <t-form-item label="最后更新时间"> {{ productBasicInformationForm?.lastTimeModified }}</t-form-item>
            </div>
          </t-card>
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUIOne"
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
                  {{
                    `工单信息( 工单号：${
                      productBasicInformationForm.moCode ? productBasicInformationForm.moCode : ''
                    } )`
                  }}
                </template>
              </cmp-table>
            </div>
          </footer>
        </cmp-container>
        <!-- # 2️⃣ 工单信息 -->
        <cmp-container v-if="tabKey === 1" :full="true">
          <detailed :row="workOrderData.list"></detailed>
        </cmp-container>
        <!-- # 3️⃣ 物料信息 -->
        <cmp-container v-if="tabKey === 2" :full="true">
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                empty="没有符合条件的数据"
                :table-column="materialkey"
                row-key="deliveryCardId"
                :table-data="jiashuju"
                :total="2"
              >
                <template #title>
                  {{ '产品信息-关键件信息' }}
                </template>
              </cmp-table>
            </div>
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                empty="没有符合条件的数据"
                :table-column="materialWorkOrder"
                row-key="deliveryCardId"
                :table-data="jiashuju"
                :total="2"
              >
                <template #title>
                  {{ '产品信息-工单投料信息' }}
                </template>
              </cmp-table>
            </div>
          </footer>
        </cmp-container>
        <!-- # 4️⃣ 包装信息 -->
        <cmp-container v-if="tabKey === 3" :full="true">
          <cmp-card :full="false">
            <t-form>
              <t-row>
                <t-col :span="3"
                  ><t-form-item label="工序">{{ 'FMVP' }}</t-form-item></t-col
                >
                <t-col :span="3"><t-form-item label="工站"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="工作中心"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="车间"> </t-form-item></t-col>
              </t-row>
              <t-row>
                <t-col :span="3"><t-form-item label="产品编码"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="排产单号"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="创建时间"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="最后更新时间"> </t-form-item></t-col>
              </t-row>
            </t-form>
          </cmp-card>
          <cmp-card :full="false">
            <cmp-table
              ref="tableRefCard"
              v-model:pagination="pageUI"
              row-key="deliveryCardId"
              :table-data="jiashuju"
              :total="2"
            >
            </cmp-table>
          </cmp-card>
        </cmp-container>
        <!-- # 5️⃣ 品质信息 -->
        <cmp-container v-if="tabKey === 4" :full="true">
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
        <!-- # 6️⃣ 工艺信息 -->
        <cmp-container v-if="tabKey === 5" :full="true">
          <cmp-card :full="false">
            <t-form>
              <t-row>
                <t-col :span="3"
                  ><t-form-item label="工艺路线名称">{{ 'FMVP' }}</t-form-item></t-col
                >
                <t-col :span="3"><t-form-item label="工艺路线版本"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="工艺路线类别"> </t-form-item></t-col>
                <t-col :span="3"><t-form-item label="启用日期"> </t-form-item></t-col>
              </t-row>
            </t-form>
          </cmp-card>
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                row-key="deliveryCardId"
                :table-data="jiashuju"
                :table-column="processDocument"
                :total="2"
              >
                <template #title>
                  {{ '工艺文件信息' }}
                </template>
              </cmp-table>
            </div>
          </footer>
        </cmp-container>
        <!-- # 7️⃣ 不良维修信息 -->
        <cmp-container v-if="tabKey === 6" :full="true">
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                row-key="id"
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
            </div>
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                row-key="id"
                :table-data="badMaintenanceDataTwo.list"
                :table-column="maintenanceDetail"
                :show-pagination="false"
              >
                <template #title>
                  {{ '维修明细' }}
                </template>
              </cmp-table>
            </div>
          </footer>
        </cmp-container>
        <!-- # 8️⃣ 出入库信息 -->
        <cmp-container v-if="tabKey === 7" :full="true">
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
                row-key="id"
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
            </div>
          </footer>
        </cmp-container>
      </template>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { defineEmits, defineProps, onMounted, reactive, ref, watch } from 'vue';

import { api, ProductBaseReportVO, TransferHeadVO } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';

const { pageUI, pageUI: pageUIOne, pageUI: pageUIThree } = usePage();

const tabPanel = [
  '产品基础信息',
  '工单信息',
  '物料信息',
  '包装信息',
  '品质信息',
  '工艺信息',
  '不良维修信息',
  '出入库信息',
];

const Emit = defineEmits(['updateBasicsNum']);

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
    colKey: 'preProcessName',
    title: '工序',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'preWorkstationName',
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
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '工单号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '关键件条码',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'operateType',
    title: '工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'reason',
    title: '工站',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creator',
    title: '状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
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
    width: '100',
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
    colKey: 'deliveryCardStatuName',
    title: '工作中心',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '工单号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'operateType',
    title: '产品编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'reason',
    title: '物料条码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creator',
    title: '物料编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '物料批次',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '供应商编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '物料描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '绑定工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '绑定工站',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '作业员',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '加工时间',
    align: 'center',
    width: '100',
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
const qualityInformation: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '检验单号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '检验类型',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'operateType',
    title: '检验人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'reason',
    title: '质检结果',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creator',
    title: '质检时间',
    align: 'center',
    width: '100',
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

// 其7️⃣ - 1️⃣ 产品不良 表格列数据
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
    width: '130',
  },
  {
    colKey: 'moScheCode',
    title: '排产工单',
    align: 'center',
    width: '60',
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
    width: '100',
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
  },
];

// // 其7️⃣ - 2️⃣ 维修明细 表格列数据
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
    width: '60',
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
    width: '100',
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

// // 其8️⃣ 出入库信息 表格列数据
const inventoryInOut: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'businessCategoryCode',
    title: '业务单据号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '交易类型',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'qty',
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
    colKey: 'timeCreate',
    title: '交易人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
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
  onInputBasicsData: {
    type: Object, // 或者其他适合数据的类型
    default: () => {
      return {
        pageNum: 1,
        pageSize: 10,
        serialNumber: ' ', // 产品条码
        moCode: ' ', // 工单号
        parentPkgBarcode: ' ', // 包装箱码
      }; // 返回一个对象作为默认值
    },
  },
});

watch(
  () => props.onInputBasicsData,
  async (newVal: any) => {
    ProductBasicInformationList.value = { ...newVal, pageNum: 1, pageSize: 10 };
    if (tabKey.value === 0) {
      await onGetProductBasicInformation();
    }
    if (tabKey.value === 1) {
      await onGetWorkOrder();
    }
  },
  {
    deep: true, // 由于 onInputData 是一个对象，使用深度监听
  },
);

watch(
  () => props.onInputData,
  async (newVal: any) => {
    // 当 onInputData 改变时，更新 productBasicInformationList 的值
    commonParametersList.value = { ...newVal, pageNum: 1, pageSize: 10 };
    if (tabKey.value === 2) {
      pageUIThree.value.page = 1;
      await onMaterialWorkOrder();
    }
    if (tabKey.value === 7) {
      pageUIThree.value.page = 1;
      await onInventoryInOut();
    }
  },
  {
    deep: true, // 由于 onInputData 是一个对象，使用深度监听
  },
);

// 🌈 页面初始化
onMounted(async () => {
  await onGetProductBasicInformation(); // 产品基础信息 数据获取
});

// 🌈 tab 切换事件
const tabKey = ref(0);
const tabChange = (context: any) => {
  pageUI.value.page = 1;
  tabKey.value = context;
  if (context === 0) {
    Emit('updateBasicsNum', 0);
    onGetProductBasicInformation();
  }
  if (context === 1) {
    Emit('updateBasicsNum', 1);
    onGetWorkOrder();
  }
  if (context === 2) {
    Emit('updateBasicsNum', 2);
  }
  if (context === 3) {
    Emit('updateBasicsNum', 3);
  }
  if (context === 4) {
    Emit('updateBasicsNum', 4);
  }
  if (context === 5) {
    Emit('updateBasicsNum', 5);
  }
  if (context === 6) {
    Emit('updateBasicsNum', 6);
    onBadMaintenance();
  }
  if (context === 7) {
    Emit('updateBasicsNum', 7);
    onInventoryInOut();
  }
};

// 产品基础信息 专用参数
const ProductBasicInformationList = ref({
  pageNum: 1,
  pageSize: 10,
  serialNumber: ' ', // 产品条码
  moCode: '11', // 工单号
  parentPkgBarcode: ' ', // 包装箱码
});

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
  const res = await api.reversetraceability.getProductBaseInfo(ProductBasicInformationList.value);
  productBasicInformationForm.value = res;
};

// 获取 工单信息 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣  数据
const workOrderData = reactive({ list: [] });
const onGetWorkOrder = async () => {
  ProductBasicInformationList.value.pageNum = pageUIThree.value.page;
  ProductBasicInformationList.value.pageSize = pageUIThree.value.rows;
  const res = (await api.reversetraceability.getMoBaseInfo(ProductBasicInformationList.value)) as any;
  [workOrderData.list] = res.list;
};
// 获取 物料信息 3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣  数据
// const WipKeypartReportVOForm = ref<PagingDataWipKeypartReportVO[]>([]);
// const MoOnboardReportVOForm = ref<PagingDataMoOnboardReportVO[]>([]);
// 物料信息 请求
const onMaterialWorkOrder = async () => {
  commonParametersList.value.pageNum = pageUIThree.value.page;
  commonParametersList.value.pageSize = pageUIThree.value.rows;
  // const res = await api.reversetraceability.getMitemBaseInfo(commonParametersList.value);
  // MoOnboardReportVOForm.value = res.wipKeypartReportList;
  // WipKeypartReportVOForm.value = res.moOnboardReportList;
};

// 获取 不良维修信息 7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣  数据
const badMaintenanceData = reactive({ list: [] });
const badMaintenanceTotal = ref(0);
const onBadMaintenance = async () => {
  commonParametersList.value.pageNum = pageUIThree.value.page;
  commonParametersList.value.pageSize = pageUIThree.value.rows;
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

const onBadMaintenanceRefresh = async () => {
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
const inventoryInOutData = reactive({ list: [] as TransferHeadVO[] });
const inventoryInOutTotal = ref<number>(0);
const onInventoryInOut = async () => {
  commonParametersList.value.pageNum = pageUI.value.page;
  commonParametersList.value.pageSize = pageUI.value.rows;
  const res = await api.reversetraceability.getTransferHeadList(commonParametersList.value);
  inventoryInOutData.list = res.list;
  inventoryInOutTotal.value = res.total;
};
</script>

<style lang="less" scoped>
.t-card {
  border: 1px solid var(--td-border-level-2-color) !important;
  margin-bottom: 24px;
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
//   /deep/ .t-tag--primary {
//     background-color: #548df3;
//   }
// }

.form-checkbox {
  margin: 10px 100px;
}
</style>
