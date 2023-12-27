<!-- 配送卡管理 -->
<template>
  <div class="main-page">
    <div class="main-page-content">
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
        <template #workState="{ param }">
          <t-select v-model="param.workState" label="工单状态">
            <t-option v-for="item in workStateDataList.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
        <template #showState="{ param }">
          <t-radio-group v-model="param.showState">
            <t-radio allow-uncheck :value="1">仅显示未打印完成</t-radio>
          </t-radio-group>
        </template>
        <template #barCodeState="{ param }">
          <t-select v-model="param.barCodeState" label="条码状态">
            <t-option v-for="item in barCodeStateList.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
      </cmp-query>
    </div>
    <div class="main-page-content">
      <t-tabs v-model="tabValue" @change="tabChange">
        <t-tab-panel :value="0" label="配送卡打印" :destroy-on-hide="false">
          <template #panel>
            <div class="main-page-content">
              <!-- ################# 配送卡打印 上1️⃣上 表格数据 ###################### -->
              <div class="main-page-content">
                <t-col :span="12" flex="auto">
                  <cmp-table
                    ref="tableRefs"
                    v-model:pagination="pageUITop"
                    empty="没有符合条件的数据"
                    row-key="moScheduleId"
                    :table-column="labelPrintTop"
                    :table-data="printTopTabData.list"
                    :total="totalPrintTop"
                    select-on-row-click
                    @select-change="onGenerateChange"
                    @refresh="onTopRefresh"
                  >
                    <template #specificationQuantity="{ row }">
                      <t-input-number v-model="row.specificationQuantity" :auto-width="true" theme="column" :min="0" />
                    </template>
                    <template #thisAmountSheets="{ row }">
                      {{
                        isNaN(+row.specificationQuantity) || +row.specificationQuantity === 0
                          ? 0
                          : Math.ceil(+row.thisTimeQty / +row.specificationQuantity)
                      }}
                    </template>
                    <template #button>
                      <t-row align="middle">
                        <t-col>条码规则： </t-col>
                        <t-col>
                          <t-select v-model="generateData.barcodeRuleId">
                            <t-option
                              v-for="item in onPrintRulesList.list"
                              :key="item.id"
                              :label="item.ruleName"
                              :value="item.id"
                            />
                          </t-select>
                        </t-col>
                      </t-row>
                    </template>
                    <template #operate>
                      <t-space>
                        <t-button theme="default" :disabled="!generateData.moScheduleId" @click="onGenerate">
                          生成
                        </t-button>
                      </t-space>
                    </template>
                  </cmp-table>
                </t-col>
              </div>
              <!-- ################# 配送卡打印 下2️⃣下 表格数据 ###################### -->
              <div class="main-page-content">
                <t-row justify="space-around">
                  <t-col :span="12" flex="auto">
                    <cmp-table
                      ref="tableRef"
                      v-model:pagination="pageUIDown"
                      empty="没有符合条件的数据"
                      row-key="deliveryCardId"
                      :table-column="labelPrintDown"
                      :table-data="printDownTabData.list"
                      :total="totalPrintDown"
                      select-on-row-click
                      :selected-row-keys="selectedRowKeys"
                      @select-change="onPrintChange"
                      @refresh="onDownRefresh"
                    >
                      <template #button>
                        <t-radio-group v-model="radioValue" style="margin-left: 20px">
                          <t-radio allow-uncheck :value="1"> 仅显示已生成</t-radio>
                        </t-radio-group>
                      </template>
                      <template #operate>
                        <t-button theme="default" @click="onPrint"> 打印 </t-button>
                        <t-row align="middle">
                          <t-col :push="1">打印模板： </t-col>
                          <t-col :push="1">
                            <t-select v-model="printTemplateName" :options="onPrintTemplateList"> </t-select>
                          </t-col>
                        </t-row>
                      </template>
                    </cmp-table>
                  </t-col>
                </t-row>
              </div>
            </div>
          </template>
        </t-tab-panel>
        <!-- ###############    配送卡管理 3️⃣ 表格数据   ######## -->
        <t-tab-panel :value="1" label="配送卡管理" :destroy-on-hide="false">
          <template #panel>
            <cmp-table
              ref="tableRefCard"
              v-model:pagination="pageUI"
              row-key="deliveryCardId"
              :table-column="labelManage"
              :table-data="manageTabData.list"
              :total="totalManage"
              select-on-row-click
              :selected-row-keys="productSelectedRowKeys"
              @select-change="onProductRightFetchData"
              @refresh="onRightFetchData"
            >
              <template #actionSlot>
                <t-link theme="primary" style="margin-right: 10px"> 编辑 </t-link>
                <t-popconfirm theme="default" content="确认删除吗">
                  <t-link theme="primary"> 删除 </t-link>
                </t-popconfirm>
              </template>
              <template #operate>
                <t-col :push="1">打印模板： </t-col>
                <t-col :push="1" style="margin-right: 20px">
                  <t-select v-model="printTemplateName" :options="onPrintTemplateList"> </t-select>
                </t-col>
                <t-button theme="default" :disabled="!productSelectedRowKeys?.length ? true : false" @click="onReprint">
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
              <template #operations="{ row }">
                <t-link theme="primary" @click.stop="onLogInterface(row)"> 日志 </t-link>
              </template>
            </cmp-table>
          </template>
        </t-tab-panel>
      </t-tabs>
    </div>
    <!-- % 补打， 作废 dialog 弹窗 -->
    <t-dialog v-model:visible="formVisible" :header="diaLogTitle" :cancel-btn="null" :confirm-btn="null">
      <t-form ref="formRef" :data="reprintDialog" :rules="rules" @submit="onSecondarySubmit">
        <!-- #1️⃣补打原因 -->
        <t-form-item v-if="reprintVoidSwitch === 1" label-width="80px" label="补打原因" name="reprintData">
          <t-select v-model="reprintDialog.reprintData">
            <t-option v-for="item in reprintDataList.list" :key="item.label" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
        <t-form-item
          v-if="isReprintCancellation && reprintDialog.reprintData === '其他原因'"
          label="补打原因"
          label-width="80px"
          name="restsData"
        >
          <t-textarea
            v-model="reprintDialog.restsData"
            placeholder="请输入补打原因"
            name="restsData"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </t-form-item>
        <!-- #2️⃣作废原因 -->
        <t-form-item v-if="reprintVoidSwitch === 2" label-width="80px" label="作废" name="reprintData">
          <t-select v-model="reprintDialog.reprintData">
            <t-option
              v-for="item in cancellationDataList.list"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </t-select>
        </t-form-item>
        <t-form-item
          v-if="!isReprintCancellation && reprintDialog.reprintData === '其他原因'"
          label="作废原因"
          label-width="80px"
          name="restsData"
        >
          <t-textarea
            v-model="reprintDialog.restsData"
            placeholder="请输入作废原因"
            name="description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </t-form-item>
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
                <t-option
                  v-for="item in resolutionList.list"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="12">
            <t-form-item v-if="reprintDialog.resolutionCause === '其他原因'" label="拆分原因" name="restsData">
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
        <t-button theme="default" variant="base">取消</t-button>
        <t-button theme="primary" @click="onSecondaryClick">{{ buttonSwitch }}</t-button>
      </template>
    </t-dialog>
    <!---%日志 dialog 弹窗  -->
    <t-dialog v-model:visible="logInterfaceVisible" :cancel-btn="null" :confirm-btn="null" header="日志">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUIDay"
        row-key="id"
        :table-column="logInterface"
        :table-data="dayTabData.list"
        :total="totalDay"
        @refresh="onRightFetchData"
      ></cmp-table>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import {
  CustomValidateResolveType,
  Data,
  FormInstanceFunctions,
  FormRules,
  Input,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const radioValue = ref(1);
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
  planDateStart: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), // 计划生产开始日期
  planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
  moId: '', // 工单ID
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
  planDateStart: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), // 计划生产开始日期
  planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
  createDateStart: dayjs().subtract(2, 'day').format('YYYY-MM-DD'), // 生产开始日期
  createDateEnd: dayjs().format('YYYY-MM-DD'), // 生产结束日期
  moId: '', // 工单ID
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
    title: '工单',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'scheStatusName',
    title: '工单状态',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'datetimeSche',
    title: '计划生产日期',
    align: 'center',
    width: '180',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'planQty',
    title: '计划数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'generateQty',
    title: '已生成数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'displayQty',
    title: '已打印数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'thisTimeQty',
    title: '本次生成数量',
    align: 'center',
    width: '100',
    edit: {
      component: Input,
      props: {
        clearable: true,
        autofocus: true,
        autoWidth: false,
      },
      rules: [
        { required: true, message: '不能为空' },
        { validator: validateNumber, trigger: 'blur' },
      ],
      keepEditMode: true,
      showEditIcon: true,
      validateTrigger: 'change',
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const num = context.newRowData.planQty - context.newRowData.generateQty;
        if (context.newRowData.thisTimeQty > num) {
          MessagePlugin.warning(`本次生成数量需要为小于等于${num}的正整数`);
          return;
        }
        printTopTabData.list[context?.rowIndex] = context?.newRowData;
        generateData.value.createNum = +printTopTabData.list[context?.rowIndex].thisTimeQty; // 变化后的数字
      },
    },
  },
  {
    colKey: 'specificationQuantity',
    title: '规格数量',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'thisAmountSheets',
    title: '本次生成张数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workshopName',
    title: '车间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workcenterName',
    align: 'center',
    width: '180',
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
    align: 'center',
    width: '110',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '条码状态',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'creatorName',
    title: '生成人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    align: 'center',
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
    align: 'center',
    width: '150',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '条码状态',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'datetimeSche',
    title: '计划生产日期',
    align: 'center',
    width: '180',
  },
  {
    colKey: 'workshopName',
    title: '车间',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '180',
  },
  {
    colKey: 'moCode',
    title: '工单',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
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
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creatorName',
    title: '生成人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    align: 'center',
    width: '180',
  },
  {
    colKey: 'operations',
    title: '操作',
    align: 'center',
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
    align: 'center',
    width: '110',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '条码状态',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'operateType',
    title: '操作类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'reason',
    title: '原因',
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
  await onPrintRulesData(); // 获取 打印规则下拉数据
  await onPrintTemplateData(); // 获取 打印模板下拉数据
  await onReprintSelectData(); // 获取补打原因列表
  await onCancellationSelectData(); // 获取作废原因列表
  await onResolutionSelectData(); // 获取拆分原因列表
  await nextTick();
  if (reprintDataList?.list?.length > 0 && reprintVoidSwitch?.value === 1) {
    reprintDialog.value.reprintData = reprintDataList.list[0].value;
  }
});
// 上表格数据刷新
const onTopRefresh = async () => {
  await onGetPrintTopTabData();
};
// 下表格数据刷新
const onDownRefresh = async () => {
  await onGetPrintDownTabData();
};

// 右表格数据刷新
const onRightFetchData = async () => {
  await onLabelManageTabData();
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

// 提条码规则下拉数据
const onPrintRulesList = reactive({ list: [] });
const onPrintRulesData = async () => {
  const res = await api.deliveryCard.getBarcodeRuleList();
  onPrintRulesList.list = res?.list;
};

// // 获取 打印模板 下拉数据
const onPrintTemplateList = ref([]);
const onPrintTemplateData = async () => {
  const res = await api.deliveryCard.getPrintTmplList();
  const transformedArray = res.list.map((item) => {
    return {
      value: item.id,
      label: item.tmplName,
    };
  });
  onPrintTemplateList.value = transformedArray;
};

// // 获取 补打原因 下拉数据
const reprintDataList = reactive({ list: [] });
const onReprintSelectData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'REPRINT_REASON' });
  reprintDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};
// 获取 作废原因 下拉数据
const cancellationDataList = reactive({ list: [] });
const onCancellationSelectData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'SCRAP_REASON' });
  cancellationDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

// 获取 拆分原因 下拉数据
const resolutionList = reactive({ list: [] });
const onResolutionSelectData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'SPLIT_REASON' });
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
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' });
  workStateDataList.list = res;
};

// // #获取搜索 条码状态 下拉框数据
const barCodeStateList = reactive({ list: [] });
const onBarCodeState = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'BARCODE_WIP_STATUS' });
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
const barcodePkgStatuNameArr = ref([]);
const pkgBarcodeName = ref([]); // 条码回 填 数组 （一个）
const onProductRightFetchData = (value: any, context: any) => {
  barcodePkgStatuNameArr.value = context.selectedRowData.map((item: any) => item.deliveryCardStatuName); // 获取条码状态
  pkgBarcodeName.value = context.selectedRowData.map((item: any) => item.deliveryCardNo); // 条码回填
  productSelectedRowKeys.value = value;
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
    MessagePlugin.warning('请选择一行数据！');
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
      await api.deliveryCard.reprintBarcode({
        ids: productSelectedRowKeys.value,
        reason,
      });
      productSelectedRowKeys.value = [];
      MessagePlugin.success('补打成功');
    } else if (reprintVoidSwitch.value === 2) {
      await api.deliveryCard.cancellationBarcode({
        ids: productSelectedRowKeys.value,
        reason,
      });
      await onLabelManageTabData(); // 刷新表格数据
      MessagePlugin.success('作废成功');
    } else {
      await api.deliveryCard.splitBarcode({
        deliveryCardId: productSelectedRowKeys.value[0],
        splitNum: reprintDialog.value.resolutionNum,
        reason: resolution,
      });
      MessagePlugin.success('拆分成功');
    }
    await onLabelManageTabData(); // 刷新表格数据
    productSelectedRowKeys.value = [];
    formVisible.value = false;
  }
};

// // 上表格 单选框 选择事件
const onGenerateChange = async (value: any, context: any) => {
  generateData.value.workcenterId = context.currentRowData.workcenterId; // 工作中心 Id
  generateData.value.moScheduleId = context.currentRowData.moScheduleId; // 行 Id
  generateData.value.mitemId = context.currentRowData.mitemId; // 物料 Id
  generateData.value.createSize = context.selectedRowData[0].specificationQuantity; // 获取规格数量
  [topPrintID.value] = value;
  await onGetPrintDownTabData();
};

// // 生成点击事件
const onGenerate = debounce(async () => {
  if (!generateData?.value?.workcenterId) {
    MessagePlugin.warning('参数有误，请联系管理员');
    return;
  }
  if (!generateData?.value?.moScheduleId) {
    MessagePlugin.warning('请选择需打印的数据');
    return;
  }
  if (!generateData?.value?.barcodeRuleId) {
    MessagePlugin.warning('请选择条码规则');
    return;
  }
  if (!generateData?.value?.createNum) {
    MessagePlugin.warning('请正确填写数量后回车');
    return;
  }
  if (!generateData?.value?.createSize) {
    MessagePlugin.warning('请正确填写规格数量');
    return;
  }
  await api.deliveryCard.generateBarcode(generateData.value); // 生成请求
  await onGetPrintTopTabData(); // 刷新数据
  await onGetPrintDownTabData(); // 下表格数据
  MessagePlugin.success('生成成功');
}, 500);

// // 点击 打印事件
const onPrint = debounce(async () => {
  console.log('🚀 ~ file: index.vue:997 ~ onPrint ~ printTemplateName.value:', printTemplateName.value);
  if (!printTemplateName.value) {
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  if (selectedRowKeys?.value?.length < 1) {
    MessagePlugin.warning('至少选择一条需要打印的记录！');
    return;
  }
  await api.deliveryCard.printBarcode({ ids: selectedRowKeys.value });
  await onGetPrintDownTabData(); // 刷新数据
  MessagePlugin.success('打印成功');
  selectedRowKeys.value = [];
}, 500);

// // 打印选择 框 行 事件
const onPrintChange = (value: any) => {
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
      label: '工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
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
      label: '工单状态',
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
      defaultVal: '',
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
    cardPrintData.value.moId = data.mo; // 工单ID
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
    const [createDateStart, createDateEnd] = data.scheduledProductionDate;
    cardManageData.value.planDateStart = planDateStart; // 计划生产开始日期
    cardManageData.value.planDateEnd = planDateEnd; // 计划生产结束日期
    cardManageData.value.createDateStart = createDateStart; // 生产开始日期
    cardManageData.value.createDateEnd = createDateEnd; // 生产结束日期
    cardManageData.value.moId = data.mo; // 工单ID
    cardManageData.value.workshopId = data.workshop; // 车间 ID
    cardManageData.value.workcenterId = data.workcenter; // 工作中心ID
    cardManageData.value.mitemId = data.mitem; // 物料 ID
    cardManageData.value.deliveryStatus = data.barCodeState; // 条码状态
    cardManageData.value.deliveryCardNo = data.barCode; // 条码
    await onLabelManageTabData();
    tableRefCard.value.setSelectedRowKeys([]);
    productSelectedRowKeys.value = [];
  }
  MessagePlugin.success('查询成功');
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
