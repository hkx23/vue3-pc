<!-- 配送卡管理 -->
<template>
  <cmp-container :full="!!tabValue">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <t-tabs v-model="tabValue" @change="tabChange">
        <t-tab-panel :value="0" label="配送卡打印" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="false">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
                  <template #workState="{ param }">
                    <t-select v-model="param.workState" label="排产单状态" :clearable="true">
                      <t-option
                        v-for="item in workStateDataList.list"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                      />
                    </t-select>
                  </template>
                  <template #showState="{ param }">
                    <t-checkbox v-model="param.showState">仅显示未打印完成</t-checkbox>
                  </template>
                  <template #barCodeState="{ param }">
                    <t-select v-model="param.barCodeState" :clearable="true" label="条码状态">
                      <t-option
                        v-for="item in barCodeStateList.list"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                      />
                    </t-select>
                  </template>
                </cmp-query>
              </cmp-card>
              <!-- ################# 配送卡打印 上1️⃣上 表格数据 ###################### -->
              <cmp-table
                ref="tableRefs"
                v-model:pagination="pageUITop"
                empty="没有符合条件的数据"
                row-key="moScheduleId"
                :fixed-height="true"
                :active-row-type="'single'"
                :hover="true"
                :table-column="labelPrintTop"
                :table-data="printTopTabData.list"
                :total="totalPrintTop"
                max-height="300px"
                select-on-row-click
                @select-change="onGenerateChange"
                @refresh="onTopRefresh"
              >
                <template #title>
                  {{ '配送卡列表' }}
                </template>
                <template #thisTimeQty="{ row }">
                  <t-input-number
                    v-model="row.thisTimeQty"
                    :auto-width="true"
                    theme="column"
                    :min="0"
                    @change="(value) => inputTimeQtyChange(value, row)"
                  />
                </template>
                <template #specificationQuantity="{ row }">
                  <t-input-number
                    v-model="row.specificationQuantity"
                    :auto-width="true"
                    theme="column"
                    :min="0"
                    @change="inputNumberChange"
                  />
                </template>
                <template #thisAmountSheets="{ row }">
                  {{
                    isNaN(+row.specificationQuantity) || +row.specificationQuantity === 0
                      ? 0
                      : Math.ceil(+row.thisTimeQty / +row.specificationQuantity)
                  }}
                </template>
                <template #button>
                  <t-select
                    v-model="generateData.barcodeRuleId"
                    :clearable="true"
                    label="条码规则"
                    style="width: 240px"
                  >
                    <t-option
                      v-for="item in onPrintRulesList?.list"
                      :key="item.id"
                      :label="item.ruleName"
                      :value="item.id"
                    />
                  </t-select>
                  <t-button theme="primary" :disabled="!generateData.moScheduleId" @click="onGenerate"> 生成 </t-button>
                </template>
              </cmp-table>
              <!-- ################# 配送卡打印 下2️⃣下 表格数据 ###################### -->

              <cmp-table
                ref="tableRef"
                v-model:pagination="pageUIDown"
                class="son-table"
                empty="没有符合条件的数据"
                row-key="deliveryCardId"
                :fixed-height="true"
                :active-row-type="'single'"
                :hover="true"
                :table-column="labelPrintDown"
                :table-data="printDownTabData.list"
                :total="totalPrintDown"
                max-height="300px"
                select-on-row-click
                :selected-row-keys="selectedRowKeys"
                @select-change="onPrintChange"
                @refresh="onDownRefresh"
              >
                <template #title>
                  {{ '配送卡打印状态列表' }}
                </template>
                <template #button>
                  <t-radio-group v-model="radioValue" @change="onRadioChange">
                    <t-radio allow-uncheck :value="1"> 仅显示已生成</t-radio>
                  </t-radio-group>
                  <t-select
                    v-model="printTemplateName"
                    :clearable="true"
                    style="width: 240px"
                    label="打印模板"
                    :options="onPrintTemplateList"
                  >
                  </t-select>
                  <cmp-print-button
                    :template-id="printTemplateName"
                    :data="printData"
                    :show-icon="false"
                    @before-print="onPrint"
                    >打印</cmp-print-button
                  >
                </template>
              </cmp-table>
            </cmp-container>
          </template>
        </t-tab-panel>
        <!-- ###############    配送卡管理 3️⃣ 表格数据   ######## -->
        <t-tab-panel :value="1" label="配送卡管理" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :full-sub-index="[1]">
              <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
                <template #workState="{ param }">
                  <t-select v-model="param.workState" label="排产单状态" :clearable="true">
                    <t-option
                      v-for="item in workStateDataList.list"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </t-select>
                </template>
                <template #showState="{ param }">
                  <t-radio-group v-model="param.showState">
                    <t-radio allow-uncheck :value="1">仅显示未打印完成</t-radio>
                  </t-radio-group>
                </template>
                <template #barCodeState="{ param }">
                  <t-select v-model="param.barCodeState" :clearable="true" label="条码状态">
                    <t-option
                      v-for="item in barCodeStateList.list"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </t-select>
                </template>
              </cmp-query>
              <cmp-card ghost class="padding-top-line-16">
                <cmp-table
                  ref="tableRefCard"
                  v-model:pagination="pageUI"
                  row-key="deliveryCardId"
                  :fixed-height="true"
                  :active-row-type="'single'"
                  :hover="true"
                  :table-column="labelManage"
                  :table-data="manageTabData.list"
                  :total="totalManage"
                  select-on-row-click
                  :selected-row-keys="productSelectedRowKeys"
                  @select-change="onProductRightFetchData"
                  @refresh="onRightFetchData"
                >
                  <template #title>
                    {{ '配送卡管理列表' }}
                  </template>
                  <template #actionSlot>
                    <t-link theme="primary" style="margin-right: 10px"> 编辑 </t-link>
                    <t-popconfirm theme="default" content="确认删除吗">
                      <t-link theme="primary"> 删除 </t-link>
                    </t-popconfirm>
                  </template>
                  <template #operations="{ row }">
                    <t-link theme="primary" @click.stop="onLogInterface(row)"> 日志 </t-link>
                  </template>
                  <template #button>
                    <t-select
                      v-model="printTemplateName"
                      :clearable="true"
                      style="width: 240px"
                      label="打印模板"
                      :options="onPrintManagementList"
                      :on-popup-visible-change="onPopupVisibleChange"
                    >
                    </t-select>
                    <t-button
                      theme="primary"
                      :disabled="!productSelectedRowKeys?.length ? true : false"
                      @click="onReprint"
                    >
                      补打
                    </t-button>
                    <t-button
                      theme="default"
                      :disabled="!productSelectedRowKeys?.length ? true : false"
                      @click="onResolution"
                    >
                      拆分
                    </t-button>
                    <t-button
                      theme="default"
                      :disabled="!productSelectedRowKeys?.length ? true : false"
                      @click="onCancellation"
                    >
                      作废
                    </t-button>
                    <t-button theme="default"> 导出 </t-button>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>

  <!-- % 补打， 作废 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :header="diaLogTitle" :cancel-btn="null" :confirm-btn="null">
    <t-form ref="formRef" :data="reprintDialog" :rules="rules" @submit="onSecondarySubmit">
      <t-row :gutter="[32, 16]">
        <t-col v-if="reprintVoidSwitch === 1" :span="12">
          <!-- #1️⃣补打原因 -->
          <t-form-item label="补打原因" name="reprintData">
            <t-select v-model="reprintDialog.reprintData">
              <t-option
                v-for="item in reprintDataList.list"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="isReprintCancellation && reprintDialog.reprintData === '其他原因'" :span="12">
          <t-form-item label="补打原因" name="restsData">
            <t-textarea
              v-model="reprintDialog.restsData"
              placeholder="请输入补打原因"
              name="restsData"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
        <t-col v-if="reprintVoidSwitch === 2" :span="12">
          <!-- #2️⃣作废原因 -->
          <t-form-item label="作废" name="reprintData">
            <t-select v-model="reprintDialog.reprintData">
              <t-option
                v-for="item in cancellationDataList.list"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="!isReprintCancellation && reprintDialog.reprintData === '其他原因'" :span="12">
          <t-form-item label="作废原因" name="restsData">
            <t-textarea
              v-model="reprintDialog.restsData"
              placeholder="请输入作废原因"
              name="description"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
      </t-row>
      <!-- #3️⃣拆分原因 -->
      <t-row v-if="reprintVoidSwitch === 3">
        <t-col :span="12" style="margin-bottom: 30px">
          <t-form-item label="条码" name="barCode">
            <t-input v-model="reprintDialog.barCode" disabled></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="12" style="margin-bottom: 30px">
          <t-form-item label="拆分数量" name="resolutionNum">
            <t-input-number
              v-model="reprintDialog.resolutionNum"
              style="width: 100%"
              theme="column"
              :min="0"
            ></t-input-number>
          </t-form-item>
        </t-col>
        <t-col :span="12" style="margin-bottom: 30px">
          <t-form-item label="拆分原因" name="resolutionCause">
            <t-select v-model="reprintDialog.resolutionCause">
              <t-option v-for="item in resolutionList.list" :key="item.label" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="reprintDialog.resolutionCause === '其他原因'" :span="12">
          <t-form-item label="拆分原因" name="restsData">
            <t-textarea
              v-model="reprintDialog.restsData"
              placeholder="请输入拆分原因"
              name="restsData"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <div v-if="buttonSwitch === '补打'">
        <t-button theme="default" @click="onClose"> 关闭 </t-button>
        <cmp-print-button
          :template-id="printTemplateName"
          :data="printManagerData"
          :show-icon="false"
          theme="primary"
          @before-print="onPrintManager"
          >打印</cmp-print-button
        >
      </div>
      <div v-if="buttonSwitch !== '补打'">
        <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
        <t-button theme="primary" @click="onSecondaryClick">{{ buttonSwitch }}</t-button>
      </div>
    </template>
  </t-dialog>
  <!---%日志 dialog 弹窗  -->
  <t-dialog v-model:visible="logInterfaceVisible" width="850px" :cancel-btn="null" :confirm-btn="null" header="日志">
    <cmp-table
      v-model:pagination="pageUIDay"
      row-key="id"
      :table-column="logInterface"
      :table-data="dayTabData.list"
      :total="totalDay"
      @refresh="onRightFetchData"
    >
      <template #title>
        {{ '日志列表' }}
      </template>
    </cmp-table>
  </t-dialog>
  <t-loading :loading="loading" text="加载中..." fullscreen />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import {
  CustomValidateResolveType,
  Data,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const printData = ref([]);
const printManagerData = ref([]);
const radioValue = ref(1);
const loading = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const selectedRowKeys: Ref<any[]> = ref([]); // 打印数组
const productSelectedRowKeys: Ref<any[]> = ref([]); // 补打 打印数组
const { pageUI: pageUITop } = usePage(); // 分页工具
const { pageUI: pageUIDown } = usePage(); // 分页工具
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIDay } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const logInterfaceVisible = ref(false); // 控制日志 Dialog 显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const buttonSwitch = ref(''); // 确认按钮title
const tabValue = ref(0);
const isReprintCancellation = ref(false);
const tableRefs = ref(); // 配送卡打印 上 表格 实例
const tableRefCard = ref(); // 配送卡管理 表格 实例
const onClose = () => {
  formVisible.value = false;
};
// 补打，作废，拆分 DiaLog 数据
const reprintDialog = ref({
  reprintData: '',
  restsData: '',
  barCode: '', // 条码
  resolutionNum: null, // 拆分数量
  resolutionCause: '', // 拆分原因
});
// 配送卡 上表格 数据
const cardPrintData = ref({
  pageNum: 1,
  pageSize: 10,
  isFinishDisplay: true,
  planDateStart: dayjs().format('YYYY-MM-DD'), // 计划生产开始日期
  planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
  moScheduleId: '', // 工单ID
  workshopId: '', // 车间 ID
  workcenterId: '', // 工作中心ID
  mitemId: '', // 物料 ID
  scheStatus: '', // 工单状态
});

// 配送卡管理 表格 数据
const cardManageData = ref({
  pageNum: 1,
  pageSize: 10,
  isFinishDisplay: true,
  planDateStart: dayjs().format('YYYY-MM-DD'), // 计划生产开始日期
  planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
  createDateStart: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), // 生产开始日期
  createDateEnd: dayjs().format('YYYY-MM-DD'), // 生产结束日期
  moScheduleId: '', // 工单ID
  workshopId: '', // 车间 ID
  workcenterId: '', // 工作中心ID
  mitemId: '', // 物料 ID
  deliveryStatus: '', // 条码状态
  deliveryCardNo: '', // 条码
});

// 打印模板 数据
const printTemplateName = ref('');

// !产品标签打印 上 表格数据
const printTopTabData = reactive({ list: [] });
const totalPrintTop = ref(0);

// 产品标签打印 下 表格数据
const printDownTabData = reactive({ list: [] });
const totalPrintDown = ref(0);

// 产品标签管理 表格数据
const manageTabData = reactive({ list: [] });
const totalManage = ref(0);

// 日志界面 表格数据
const dayTabData = reactive({ list: [] });
const totalDay = ref(0);

// 产品标签打印 上表格列表数据
const labelPrintTop: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    width: 46,
  },
  {
    colKey: 'scheCode',
    title: '排产单',
    width: '130',
  },
  {
    colKey: 'scheStatusName',
    title: '排产单状态',
    width: '110',
  },
  {
    colKey: 'datetimeSche',
    title: '计划生产日期',
    width: '180',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    width: '150',
  },
  {
    colKey: 'planQty',
    title: '排产单数量',
    width: '100',
  },
  {
    colKey: 'generateQty',
    title: '已生成数量',
    width: '100',
  },
  {
    colKey: 'displayQty',
    title: '已打印数量',
    width: '100',
  },
  {
    colKey: 'thisTimeQty',
    title: '本次生成数量',
    width: '150',
  },
  // {
  //   colKey: 'thisTimeQty',
  //   title: '本次生成数量',
  //
  //   width: '100',
  //   edit: {
  //     component: Input,
  //     props: {
  //       clearable: true,
  //       autofocus: true,
  //       autoWidth: false,
  //     },
  //     rules: [
  //       { required: true, message: '不能为空' },
  //       { validator: validateNumber, trigger: 'blur' },
  //     ],
  //     keepEditMode: true,
  //     showEditIcon: true,
  //     validateTrigger: 'change',
  //     abortEditOnEvent: ['onEnter'],
  //     // 编辑完成，退出编辑态后触发
  //     onEdited: (context) => {
  //       const num = context.newRowData.planQty - context.newRowData.generateQty;
  //       if (context.newRowData.thisTimeQty > num) {
  //         MessagePlugin.warning(`本次生成数量需要为小于等于${num}的正整数`);
  //         return;
  //       }
  //       printTopTabData.list[context?.rowIndex] = context?.newRowData;
  //       generateData.value.createNum = +printTopTabData.list[context?.rowIndex].thisTimeQty; // 变化后的数字
  //     },
  //   },
  // },
  {
    colKey: 'specificationQuantity',
    title: '规格数量',
    width: '150',
  },
  {
    colKey: 'thisAmountSheets',
    title: '本次生成张数',
    width: '120',
  },
  {
    colKey: 'uomName',
    title: '单位',
    width: '100',
  },
  {
    colKey: 'workshopName',
    title: '车间',
    width: '100',
  },
  {
    colKey: 'workcenterName',
    width: '120',
    title: '工作中心',
    fixed: 'right',
  },
];
// 产品标签打印 下表格列表数据
const labelPrintDown: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'deliveryCardNo',
    title: '条码',
    width: '150',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '条码状态',
    width: '100',
  },
  {
    colKey: 'qty',
    title: '数量',
    width: '80',
    cell: 'stateSwitch',
  },
  {
    colKey: 'creatorName',
    title: '生成人',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    width: '100',
  },
];
// 产品标签管理 表格列表数据
const labelManage: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'deliveryCardNo',
    title: '条码',
    width: '250',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '条码状态',
    width: '110',
  },
  {
    colKey: 'datetimeSche',
    title: '计划生产日期',
    width: '180',
  },
  {
    colKey: 'workshopName',
    title: '车间',
    width: '150',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    width: '180',
  },
  {
    colKey: 'scheCode',
    title: '排产单',
    width: '130',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    width: '130',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    width: '100',
  },
  {
    colKey: 'qty',
    title: '数量',
    width: '100',
  },
  {
    colKey: 'uomName',
    title: '单位',
    width: '100',
  },
  {
    colKey: 'creatorName',
    title: '生成人',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    width: '180',
  },
  {
    colKey: 'operations',
    title: '操作',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// 日志界面 表格数据
const logInterface: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'deliveryCardNo',
    title: '条码',
    width: '250',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '条码状态',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '数量',
    width: '60',
  },
  {
    colKey: 'operateType',
    title: '操作类型',
    width: '100',
  },
  {
    colKey: 'reason',
    title: '原因',
    width: '100',
  },
  {
    colKey: 'creatorName',
    title: '操作人',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '操作时间',
    width: '200',
  },
];

function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '请输入数字', type: 'error' };
  }
  if (Number(value) < 0) {
    return { result: false, message: '该字段不能为负数', type: 'error' };
  }
  return true;
}

// 表单校验规则
const rules: FormRules<Data> = {
  reprintData: [{ required: true, message: '原因不能为空', type: 'error', trigger: 'change' }],
  restsData: [{ required: true, message: '原因不能为空', type: 'error', trigger: 'blur' }],
  barCode: [{ required: true, message: '条码不能为空', type: 'error', trigger: 'blur' }],
  resolutionNum: [
    { required: true, message: '拆分数量不能为空', type: 'error', trigger: 'blur' },
    { number: true, message: '请输入数字', type: 'error' },
    { validator: validateNumber, trigger: 'blur' },
  ],
  resolutionCause: [{ required: true, message: '拆分原因不能为空', type: 'error', trigger: 'change' }],
};

// 初始渲染
onMounted(async () => {
  await onGetPrintTopTabData(); // 产品标签打印 上 请求
  await onWorkStatus(); // 工单状态下拉数据
  await onBarCodeState(); // 获取条码状态数据
  await onReprintSelectData(); // 获取补打原因列表
  await onCancellationSelectData(); // 获取作废原因列表
  await onResolutionSelectData(); // 获取拆分原因列表
});
// 上表格数据刷新
const onTopRefresh = async () => {
  await onGetPrintTopTabData();
  tableRefs.value.setSelectedRowKeys([]);
  printDownTabData.list = [];
  totalPrintDown.value = 0;
  topPrintID.value = null;
};
// 下表格数据刷新
const onDownRefresh = async () => {
  await onGetPrintDownTabData();
};

// 右表格数据刷新
const onRightFetchData = async () => {
  await onLabelManageTabData();
};

// 本次生成数量change事件
const numInput = ref(null);
const inputTimeQtyChange = (value: any, row: any) => {
  console.log('🚀 ~ file: index.vue:780 ~ inputTimeQtyChange ~ row:', row);
  generateData.value.createNum = value; // 本次生成数量
  numInput.value = row.planQty - row.generateQty;
};

// 规格数量change事件
const inputNumberChange = (value: any) => {
  generateData.value.createSize = value; // 获取规格数量
};

// 获取 打印规则 下拉数据
const generateData = ref({
  barcodeRuleId: '', // select ID
  workcenterId: null, // 工作中心 Id
  moScheduleId: null, // 行 Id
  createNum: null, // 变化后的数字
  createSize: 0, // 生成规格
  mitemId: null, // 物料ID
});

// // 获取 补打原因 下拉数据
const reprintDataList = reactive({ list: [] });
const onReprintSelectData = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'REPRINT_REASON' });
  reprintDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};
// 获取 作废原因 下拉数据
const cancellationDataList = reactive({ list: [] });
const onCancellationSelectData = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'SCRAP_REASON' });
  cancellationDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

// 获取 拆分原因 下拉数据
const resolutionList = reactive({ list: [] });
const onResolutionSelectData = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'SPLIT_REASON' });
  resolutionList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

// // #配送卡打印 上 表格数据
const topPrintID = ref(null);
const onGetPrintTopTabData = async () => {
  cardPrintData.value.pageNum = pageUITop.value.page;
  cardPrintData.value.pageSize = pageUITop.value.rows;
  const res = await api.deliveryCard.getMoScheduleList(cardPrintData.value);
  const newArr = res.list.map((item) => ({ ...item, specificationQuantity: 0, numberGeneration: 0 })); // 规格数量
  printTopTabData.list = newArr;
  totalPrintTop.value = res.total;
};

// // #配送卡 下 表格数据
const onGetPrintDownTabData = async () => {
  let isCreated = null;
  if (radioValue.value) {
    isCreated = true;
  } else {
    isCreated = false;
  }
  const res = await api.deliveryCard.getDeliveryCardList({
    pageNum: pageUIDown.value.page,
    pageSize: pageUIDown.value.rows,
    moScheduleId: topPrintID.value,
    isCreated,
  });
  printDownTabData.list = res.list;
  totalPrintDown.value = res.total;
};

// // #获取搜索 工单状态 下拉框数据
const workStateDataList = reactive({ list: [] });
const onWorkStatus = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' });
  workStateDataList.list = res;
};

// // #获取搜索 条码状态 下拉框数据
const barCodeStateList = reactive({ list: [] });
const onBarCodeState = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'BARCODE_WIP_STATUS' });
  barCodeStateList.list = res;
};

// #配送卡管理 表格数据
const onLabelManageTabData = async () => {
  cardManageData.value.pageNum = pageUI.value.page;
  cardManageData.value.pageSize = pageUI.value.rows;
  const res = await api.deliveryCard.getDeliveryCardManagerList(cardManageData.value);
  manageTabData.list = res.list;
  totalManage.value = res.total;
};

// 配送卡管理行点击事件
function removeDuplicates(array) {
  return [...new Set(array)];
}
const barcodePkgStatuNameArr = ref([]);
const pkgBarcodeName = ref([]); // 条码回 填 数组 （一个）
const moScheduleIdSole = ref([]); // 获取唯一的排产单id，用来获取 打印模板
const onProductRightFetchData = (value: any, context: any) => {
  onPrintManagementList.value = [];
  const newArr = context.selectedRowData.map((item) => item.moScheduleId);
  moScheduleIdSole.value = removeDuplicates(newArr);
  barcodePkgStatuNameArr.value = context.selectedRowData.map((item: any) => item.deliveryCardStatuName); // 获取条码状态
  pkgBarcodeName.value = context.selectedRowData.map((item: any) => item.deliveryCardNo); // 条码回填
  productSelectedRowKeys.value = value;
};

const onPrintManager = async () => {
  try {
    if (reprintDialog.value.reprintData === '其他原因' && !reprintDialog.value.restsData) {
      MessagePlugin.warning('请补充必填信息！');
      return false; // 返回失败标志
    }
    let reason = '';
    if (reprintDialog.value.restsData) {
      reason = reprintDialog.value.restsData;
    } else {
      reason = reprintDialog.value.reprintData;
    }

    if (!reason) {
      MessagePlugin.warning('请补充必填信息！');
      return false; // 返回失败标志
    }

    printManagerData.value = [];
    loading.value = true;

    productSelectedRowKeys.value.forEach((deliveryCardId) => {
      const foundItem = manageTabData.list.find((item) => item.deliveryCardId === deliveryCardId);
      const DataBase = {
        DELIVERY_CARD_NO: foundItem.deliveryCardNo,
        TIME_CREATE: new Date(),
        PRINT_SEQ: foundItem.printSeq,
        QTY: foundItem.qty,
        MITEM_CODE: foundItem.mitemCode,
        MITEM_NAME: foundItem.mitemName,
        SCHE_CODE: foundItem.scheCode,
        WC_NAME: foundItem.workcenterName,
        DATETIME_SCHE: foundItem.datetimeSche,
        ORG_NAME: foundItem.orgName,
      };
      printManagerData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await api.deliveryCard.reprintBarcode({
      ids: productSelectedRowKeys.value,
      reason,
    });

    MessagePlugin.success('补打成功');

    productSelectedRowKeys.value = [];
    onRightFetchData();
    formVisible.value = false;
    return true; // 打印成功时返回 true
  } catch (e) {
    console.log(e);
    return false; // 打印失败时返回 false
  } finally {
    loading.value = false;
  }
};

// // 补打 点击事件
const reprintVoidSwitch = ref(0); // 控制
const onReprint = () => {
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodePkgStatuNameArr.value.some((item) => item === '已生成' || item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已生成、已报废状态，不允许补打！');
    return;
  }
  if (!printTemplateName.value) {
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  isReprintCancellation.value = true;
  formVisible.value = true;
  reprintVoidSwitch.value = 1;
  diaLogTitle.value = '补打';
  buttonSwitch.value = '补打';
};

// // 作废 点击事件
const onCancellation = () => {
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodePkgStatuNameArr.value.every((item) => item === '已生成' || item === '已打印');
  if (!specificStatus) {
    MessagePlugin.warning('存在标签状态不为已生成、已打印状态，不允许作废！');
    return;
  }
  isReprintCancellation.value = false;
  reprintVoidSwitch.value = 2;
  diaLogTitle.value = '作废';
  buttonSwitch.value = '作废';
  formVisible.value = true;
};
// // 拆分 点击事件
const onResolution = () => {
  formRef.value.reset({ type: 'empty' });
  if (productSelectedRowKeys?.value?.length > 1) {
    MessagePlugin.warning('最多选择一条数据, 请重新选择！');
    return;
  }
  if (!printTemplateName?.value) {
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  const specificStatus = barcodePkgStatuNameArr.value.some((item) => item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已报废状态，不允许拆分！');
    return;
  }
  [reprintDialog.value.barCode] = pkgBarcodeName.value;
  reprintVoidSwitch.value = 3;
  diaLogTitle.value = '拆分';
  buttonSwitch.value = '拆分';
  formVisible.value = true;
};
// // 日志 点击 事件
const onLogInterface = async (row: any) => {
  const res = await api.deliveryCard.getDeliveryCardLog({
    deliveryCardNo: row.deliveryCardNo,
    pageNum: pageUIDay.value.page,
    pageSize: pageUIDay.value.rows,
  });
  dayTabData.list = res.list;
  totalDay.value = res.total;
  logInterfaceVisible.value = true; // 控制界面显示隐藏
};

const onSecondaryClick = () => {
  formRef.value.submit();
};

// 补打、拆分、作废按钮事件
const onSecondarySubmit = async (context: { validateResult: boolean }) => {
  let reason = '';
  let resolution = '';
  // 判断选其他还是选下拉内容
  if (reprintDialog.value.restsData) {
    reason = reprintDialog.value.restsData;
  } else {
    reason = reprintDialog.value.reprintData;
  }
  if (reprintDialog.value.resolutionCause === '其他原因') {
    resolution = reprintDialog.value.restsData;
  } else {
    resolution = reprintDialog.value.resolutionCause;
  }
  if (context.validateResult === true) {
    if (reprintVoidSwitch.value === 1) {
      try {
        loading.value = true;
        await api.deliveryCard.reprintBarcode({
          ids: productSelectedRowKeys.value,
          reason,
        });
        productSelectedRowKeys.value = [];
        MessagePlugin.success('补打成功');
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    } else if (reprintVoidSwitch.value === 2) {
      try {
        loading.value = true;
        await api.deliveryCard.cancellationBarcode({
          ids: productSelectedRowKeys.value,
          reason,
        });
        await onLabelManageTabData(); // 刷新表格数据
        MessagePlugin.success('作废成功');
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    } else {
      try {
        loading.value = true;
        await api.deliveryCard.splitBarcode({
          deliveryCardId: productSelectedRowKeys.value[0],
          splitNum: reprintDialog.value.resolutionNum,
          reason: resolution,
        });
        MessagePlugin.success('拆分成功');
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    }
    await onLabelManageTabData(); // 刷新表格数据
    productSelectedRowKeys.value = [];
    formVisible.value = false;
  }
};
// // 上表格 单选框 选择事件
const onGenerateChange = async (value: any, context: any) => {
  const { moScheduleId } = context.currentRowData;
  numInput.value = context.currentRowData.planQty - context.currentRowData.generateQty;
  generateData.value.createNum = context.currentRowData.thisTimeQty;
  generateData.value.workcenterId = context.currentRowData.workcenterId; // 工作中心 Id
  generateData.value.moScheduleId = context.currentRowData.moScheduleId; // 行 Id
  generateData.value.mitemId = context.currentRowData.mitemId; // 物料 Id
  [topPrintID.value] = value;
  await onGetPrintDownTabData();
  await onPrintRulesData(moScheduleId);
  await onPrintTemplateData(moScheduleId);
};

// 提条码规则下拉数据
const onPrintRulesList = reactive({ list: [] });
const onPrintRulesData = async (moScheId) => {
  const res = await api.deliveryCard.getBarcodeRuleList({ moScheId });
  onPrintRulesList.list = res?.list;
};

// 获取 打印模板 下拉数据
const onPrintTemplateList = ref([]);
const onPrintTemplateData = async (moScheId) => {
  const res = await api.deliveryCard.getPrintTmplList({ moScheId });
  const transformedArray = res.list.map((item) => {
    return {
      value: item.id,
      label: item.tmplName,
    };
  });
  onPrintTemplateList.value = transformedArray;
};

// 获取配送卡管理界面 打印模板
const onPrintManagementList = ref([]);
const onPrintManagementData = async (moScheId) => {
  const res = await api.deliveryCard.getPrintTmplList({ moScheId });
  const transformedArray = res.list.map((item) => {
    return {
      value: item.id,
      label: item.tmplName,
    };
  });
  onPrintManagementList.value = transformedArray;
};

// 配送卡管理界面打印模板 事件
const onPopupVisibleChange = async (visible) => {
  if (visible) {
    if (moScheduleIdSole.value.length < 1) {
      MessagePlugin.warning('请至少选择一条数据！');
      return;
    }
    if (moScheduleIdSole.value.length > 1) {
      MessagePlugin.warning('存在排产单不一致，请重新选择！');
      return;
    }
    await onPrintManagementData(moScheduleIdSole.value[0]);
  }
};

// // 生成点击事件
const onGenerate = debounce(async () => {
  if (!generateData?.value?.workcenterId) {
    MessagePlugin.warning('参数有误，请联系管理员！');
    return;
  }
  if (!generateData?.value?.moScheduleId) {
    MessagePlugin.warning('请选择需打印的数据！');
    return;
  }
  if (!generateData?.value?.barcodeRuleId) {
    MessagePlugin.warning('请选择条码规则！');
    return;
  }
  if (generateData?.value?.createNum < 0) {
    MessagePlugin.warning('本次生成数量不能为负数！');
    return;
  }
  if (!generateData?.value?.createNum) {
    MessagePlugin.warning('请正确填写本次生成数量！');
    return;
  }
  // if (generateData?.value?.createNum > numInput.value) {
  //   MessagePlugin.warning(`本次生成数量不得大于 ${numInput.value}！`);
  //   return;
  // }
  if (generateData?.value?.createSize < 0) {
    MessagePlugin.warning('规格数量不得小于0！');
    return;
  }
  if (Math.ceil(generateData.value.createNum / generateData.value.createSize) > 50000) {
    MessagePlugin.warning(`本次生成张数不得大于50000！`);
    return;
  }
  if (!generateData?.value?.createSize) {
    MessagePlugin.warning('请正确填写规格数量！');
    return;
  }
  try {
    loading.value = true;
    await api.deliveryCard.generateBarcode(generateData.value); // 生成请求
    await onGetPrintTopTabData(); // 刷新数据
    await onGetPrintDownTabData(); // 下表格数据
    MessagePlugin.success('生成成功');
    // tableRefs.value.setSelectedRowKeys([]);
    // generateData.value.moScheduleId = null;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}, 500);

// // 点击 打印事件
const onPrint = async () => {
  const hasNotGenerated = selectedData.value.some((item) => item !== '已生成');
  if (!printTemplateName.value) {
    MessagePlugin.warning('请选择打印模板！');
    return false;
  }
  if (selectedRowKeys?.value?.length < 1) {
    MessagePlugin.warning('至少选择一条需要打印的记录！');
    return false;
  }
  if (hasNotGenerated) {
    MessagePlugin.warning(`存在条码状态不为已生成状态，不允许打印！`);
    return false;
  }
  try {
    printData.value = [];
    loading.value = true;
    const moSchedule = printTopTabData.list.find((item) => item.moScheduleId === topPrintID.value);
    selectedRowKeys.value.forEach((deliveryCardId) => {
      const foundItem = printDownTabData.list.find((item) => item.deliveryCardId === deliveryCardId);
      const DataBase = {
        DELIVERY_CARD_NO: foundItem.deliveryCardNo,
        TIME_CREATE: new Date(),
        PRINT_SEQ: foundItem.printSeq,
        QTY: foundItem.qty,
        MITEM_CODE: moSchedule.mitemCode,
        MITEM_NAME: moSchedule.mitemName,
        SCHE_CODE: moSchedule.scheCode,
        WC_NAME: moSchedule.workcenterName,
        DATETIME_SCHE: moSchedule.datetimeSche,
        ORG_NAME: moSchedule.orgName,
      };
      printData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await api.deliveryCard.printBarcode({ ids: selectedRowKeys.value });
    await onGetPrintDownTabData(); // 刷新数据
    await onGetPrintTopTabData();
    MessagePlugin.success('打印成功');
    selectedRowKeys.value = [];
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    loading.value = false;
  }
};

// // 打印选择 框 行 事件
const selectedData = ref([]);
const onPrintChange = (value: any, context) => {
  selectedData.value = context.selectedRowData.map((item) => item.deliveryCardStatuName);
  selectedRowKeys.value = [];
  selectedRowKeys.value = value;
};

// // TAb 栏切换事件
const tabChange = async (value: number) => {
  printTemplateName.value = ''; // 清空打印模板缓存
  if (value) {
    await onLabelManageTabData(); // 配送卡管理 表格数据
  }
};

const onRadioChange = async (checked: any) => {
  const radioValueNum = !checked ? 1 : 0;
  if (!topPrintID.value) {
    radioValue.value = radioValueNum;
    MessagePlugin.warning('请先选择上表格数据！');
    return;
  }
  await onGetPrintDownTabData();
};

// // #query 查询参数
const opts = computed(() => {
  return {
    scheduledProductionDate: {
      label: '计划生产日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
    datePproduced: {
      isHide: !tabValue.value,
      label: '生成日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(+2, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
    mo: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    workshop: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workcenter: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    mitem: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    workState: {
      isHide: tabValue.value,
      label: '排产单状态',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'workState',
    },
    showState: {
      isHide: tabValue.value,
      label: '',
      labelWidth: '10',
      event: 'radio',
      defaultVal: 'true',
      slotName: 'showState',
    },
    barCodeState: {
      isHide: !tabValue.value,
      label: '条码状态',
      labelWidth: '10',
      event: 'select',
      defaultVal: '',
      slotName: 'barCodeState',
    },
    barCode: {
      isHide: !tabValue.value,
      label: '条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
// // #query 查询函数
const onInput = async (data: any) => {
  if (!tabValue.value) {
    let isFinishDisplay = false;
    if (!data.showState) {
      isFinishDisplay = false;
    } else {
      isFinishDisplay = true;
    }
    pageUITop.value.page = 1;
    const [planDateStart, planDateEnd] = data.scheduledProductionDate;
    cardPrintData.value.planDateStart = planDateStart; // 计划生产开始日期
    cardPrintData.value.planDateEnd = planDateEnd; // 计划生产结束日期
    cardPrintData.value.moScheduleId = data.mo; // 工单ID
    cardPrintData.value.workshopId = data.workshop; // 车间 ID
    cardPrintData.value.workcenterId = data.workcenter; // 工作中心ID
    cardPrintData.value.mitemId = data.mitem; // 物料 ID
    cardPrintData.value.scheStatus = data.workState; // 工单状态
    cardPrintData.value.isFinishDisplay = isFinishDisplay; // 是否仅显示已打印
    await onGetPrintTopTabData(); // 表格数据渲染
    topPrintID.value = null; // 置空行ID
    printDownTabData.list = [];
    tableRefs.value.setSelectedRowKeys([]);
  } else {
    pageUI.value.page = 1;
    const [planDateStart, planDateEnd] = data.scheduledProductionDate;
    const [createDateStart, createDateEnd] = data.datePproduced;
    cardManageData.value.planDateStart = planDateStart; // 计划生产开始日期
    cardManageData.value.planDateEnd = planDateEnd; // 计划生产结束日期
    cardManageData.value.createDateStart = createDateStart; // 生产开始日期
    cardManageData.value.createDateEnd = createDateEnd; // 生产结束日期
    cardManageData.value.moScheduleId = data.mo; // 工单ID
    cardManageData.value.workshopId = data.workshop; // 车间 ID
    cardManageData.value.workcenterId = data.workcenter; // 工作中心ID
    cardManageData.value.mitemId = data.mitem; // 物料 ID
    cardManageData.value.deliveryStatus = data.barCodeState; // 条码状态
    cardManageData.value.deliveryCardNo = data.barCode; // 条码
    await onLabelManageTabData();
    tableRefCard.value.setSelectedRowKeys([]);
    productSelectedRowKeys.value = [];
  }
  // MessagePlugin.success('查询成功');
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
