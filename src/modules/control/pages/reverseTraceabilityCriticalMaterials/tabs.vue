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
                row-key="deliveryCardId"
                :table-column="productBasicInformation"
                :table-data="productBasicInformationForm.wipLogList"
                :total="2"
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
                  {{ `工单信息( 工单号：${productBasicInformationForm.moCode} )` }}
                </template>
              </cmp-table>
            </div>
          </footer>
        </cmp-container>
        <!-- # 2️⃣ 工单信息 -->
        <cmp-container v-if="tabKey === 1" :full="true">
          <detailed :row="workOrderData.list"></detailed>
        </cmp-container>
        <!-- # 3️⃣ 工单信息 -->
        <cmp-container v-if="tabKey === 2" :full="true">
          <footer class="detailed-work-center">
            <div class="table-work-header">
              <cmp-table
                ref="tableRefCard"
                v-model:pagination="pageUI"
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
        <!-- # 4️⃣ 工单信息 -->
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
        <!-- # 5️⃣ 产品基础信息 -->
        <cmp-container v-if="tabKey === 4" :full="true">
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
        <!-- # 6️⃣ 工单信息 -->
        <cmp-container v-if="tabKey === 5" :full="true">
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
        <!-- # 7️⃣ 工单信息 -->
        <cmp-container v-if="tabKey === 6" :full="true">
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
        <!-- # 8️⃣ 工单信息 -->
        <cmp-container v-if="tabKey === 7" :full="true">
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
      </template>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { defineProps, onMounted, reactive, ref, watch } from 'vue';

import { api, MoOnboardReportVO, ProductBaseReportVO, WipKeypartReportVO } from '@/api/control';
import { api as apimain } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';

const { pageUI, pageUI: pageUIOne, pageUI: pageUIThree } = usePage();

const tabPanel = [
  '产品基础信息',
  '工单信息',
  '物料信息',
  '报装信息',
  '品质信息',
  '工艺信息',
  '不良维修信息',
  '出入库信息',
];

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
    colKey: 'shiftDay',
    title: 'timeModified',
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
// const qualityInformation: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'serial-number',
//     title: '序号',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '检验单号',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'qty',
//     title: '检验类型',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'operateType',
//     title: '检验人',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'reason',
//     title: '质检结果',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'creator',
//     title: '质检时间',
//     align: 'center',
//     width: '100',
//   },
// ];

// // 6️⃣ 工艺文件信息 表格列数据
// const processDocument: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'serial-number',
//     title: '序号',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '文件名称',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'qty',
//     title: '文件类型',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'operateType',
//     title: '版本号',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'reason',
//     title: '上传人',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'creator',
//     title: '启用日期',
//     align: 'center',
//     width: '100',
//   },
// ];

// // 其7️⃣ - 1️⃣ 产品不良 表格列数据
// const productDefect: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'serial-number',
//     title: '序号',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '产品条码',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'qty',
//     title: '排产工单',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'operateType',
//     title: '产品编码',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'reason',
//     title: '产品名称',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'creator',
//     title: '来源工序',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '来源工站',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '采集时间',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '滞留时间(分钟)',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '不合格次数',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '维修次数',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '返修状态',
//     align: 'center',
//     width: '100',
//   },
// ];

// // 其7️⃣ - 2️⃣ 维修明细 表格列数据
// const maintenanceDetail: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '产品条码',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '缺陷现象',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'qty',
//     title: '缺陷原因',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'operateType',
//     title: '维修人',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'reason',
//     title: '维修结束事件',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'creator',
//     title: '返修次数',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '处理方法',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '责任人',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '维修结果',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '回流站点',
//     align: 'center',
//     width: '100',
//   },
// ];

// // 其8️⃣ 出入库信息 表格列数据
// const inventoryInOut: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'serial-number',
//     title: '序号',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'deliveryCardStatuName',
//     title: '业务单据号',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'qty',
//     title: '交易类型',
//     align: 'center',
//     width: '60',
//   },
//   {
//     colKey: 'operateType',
//     title: '数量',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'reason',
//     title: '源仓库',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'creator',
//     title: '目标仓库',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '交易人',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '交易日期',
//     align: 'center',
//     width: '100',
//   },
// ];

const props = defineProps({
  onInputData: {
    type: Object, // 或者其他适合您数据的类型
    default: () => {
      return {
        pagenum: 1,
        pagesize: 10,
        serialNumber: 'SN202312270027', // 产品条码
        moCode: '', // 工单号
        parentPkgBarcode: '', // 包装箱码
      }; // 返回一个对象作为默认值
    },
  },
});

watch(
  () => props.onInputData,
  async (newVal: any) => {
    // 当 onInputData 改变时，更新 productBasicInformationList 的值
    productBasicInformationList.value = { ...newVal };
    if (tabKey.value === 0) {
      pageUIOne.value.page = 1;
      await onGetProductBasicInformation();
    }
    if (tabKey.value === 2) {
      pageUIThree.value.page = 1;
      await onMaterialWorkOrder();
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
const tabChange = (context: number) => {
  tabKey.value = context;
  if (context === 1) {
    onGetWorkOrder();
  }
  if (context === 2) {
    onMaterialWorkOrder();
  }
};
// @ 获取 产品基础信息 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ 数据
const productBasicInformationForm = ref<ProductBaseReportVO>({});
const productBasicInformationList = ref({
  pagenum: 1,
  pagesize: 10,
  serialNumber: 'SN202312270027', // 产品条码
  moCode: '', // 工单号
  parentPkgBarcode: '', // 包装箱码
});
// 产品基础信息 请求
const onGetProductBasicInformation = async () => {
  productBasicInformationList.value.pagenum = pageUIOne.value.page;
  productBasicInformationList.value.pagesize = pageUIOne.value.rows;
  const res = await api.reversetraceability.getProductBaseInfo(productBasicInformationList.value);
  productBasicInformationForm.value = res;
};

// 获取 工单信息 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣  数据
const workOrderData = reactive({ list: [] });
const onGetWorkOrder = async () => {
  const res = (await apimain.mo.getmolist({
    moCode: 'ben0002',
    pagenum: pageUI.value.page,
    pagesize: pageUI.value.rows,
  })) as any;
  [workOrderData.list] = res.list;
};
// 获取 物料信息 3️⃣3️⃣3️⃣3️⃣3️⃣3️⃣  数据
const WipKeypartReportVOForm = ref<WipKeypartReportVO[]>([]);
const MoOnboardReportVOForm = ref<MoOnboardReportVO[]>([]);
const materialWorkOrderList = ref({
  pagenum: 1,
  pagesize: 10,
  serialNumber: '', // 产品条码
  moCode: '', // 工单号
  parentPkgBarcode: '', // 包装箱码
});
// 物料信息 请求
const onMaterialWorkOrder = async () => {
  materialWorkOrderList.value.pagenum = pageUIThree.value.page;
  materialWorkOrderList.value.pagesize = pageUIThree.value.rows;
  const res = await api.reversetraceability.getMitemBaseInfo(materialWorkOrderList.value);
  MoOnboardReportVOForm.value = res.moOnboardReportList;
  WipKeypartReportVOForm.value = res.wipKeypartReportList;
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
