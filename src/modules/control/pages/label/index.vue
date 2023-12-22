<!-- 条码验证规则 -->
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
        <t-tab-panel :value="0" label="产品标签打印" :destroy-on-hide="false">
          <template #panel>
            <div class="main-page-content">
              <!-- ################# 产品标签打印 上1️⃣上 表格数据 ###################### -->
              <div class="main-page-content">
                <t-col :span="12" flex="auto">
                  <cmp-table
                    ref="tableRef"
                    v-model:pagination="pageUITop"
                    row-key="moScheduleId"
                    :table-column="labelPrintTop"
                    :table-data="printTopTabData.list"
                    :total="totalPrintTop"
                    select-on-row-click
                    @select-change="onGenerateChange"
                    @refresh="onTopRefresh"
                  >
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
                        <t-col :push="1">打印摸板： </t-col>
                        <t-col :push="1">
                          <t-select>
                            <t-option
                              v-for="item in onPrintTemplateList.list"
                              :key="item.id"
                              :label="item.tmplName"
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
              <!-- ################# 产品标签打印 下2️⃣下 表格数据 ###################### -->
              <div class="main-page-content">
                <t-row justify="space-around">
                  <t-col :span="12" flex="auto">
                    <cmp-table
                      ref="tableRef"
                      v-model:pagination="pageUIDown"
                      row-key="barcodeWipId"
                      :table-column="labelPrintDown"
                      :table-data="printDownTabData.list"
                      :total="totalPrintDown"
                      select-on-row-click
                      :selected-row-keys="selectedRowKeys"
                      @select-change="onPrintChange"
                      @refresh="onDownRefresh"
                    >
                      <template #button>
                        <t-radio-group v-model="radioValue">
                          <t-radio allow-uncheck :value="1"> 仅显示已生成</t-radio>
                        </t-radio-group>
                      </template>
                      <template #operate>
                        <t-button theme="default" @click="onPrint"> 打印 </t-button>
                      </template>
                    </cmp-table>
                  </t-col>
                </t-row>
              </div>
            </div>
          </template>
        </t-tab-panel>
        <!-- ###############    产品标签管理 3️⃣ 表格数据   ######## -->
        <t-tab-panel :value="1" label="产品标签管理" :destroy-on-hide="false">
          <template #panel>
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="barcodeWipId"
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
                <t-col :push="1">打印摸板： </t-col>
                <t-col :push="1" style="margin-right: 20px">
                  <t-select>
                    <t-option
                      v-for="item in onPrintTemplateList.list"
                      :key="item.id"
                      :label="item.tmplName"
                      :value="item.id"
                    />
                  </t-select>
                </t-col>
                <t-button theme="default" :disabled="!productSelectedRowKeys.length ? true : false" @click="onReprint">
                  补打
                </t-button>
                <t-button
                  theme="default"
                  :disabled="!productSelectedRowKeys.length ? true : false"
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
    <t-dialog
      v-model:visible="formVisible"
      :confirm-btn="buttonSwitch"
      :header="diaLogTitle"
      width="40%"
      @confirm="onConfirm"
    >
      <t-form ref="formRef" :data="reprintDialog">
        <t-form-item v-if="reprintVoidSwitch" label-width="80px" label="补打原因" name="reprintData">
          <t-select v-model="reprintDialog.reprintData">
            <t-option v-for="item in reprintDataList.list" :key="item.label" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
        <t-form-item v-if="!reprintVoidSwitch" label-width="80px" label="作废" name="reprintData">
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
          v-if="isReprintCancellation && reprintDialog.reprintData === '其他原因'"
          label="补打原因"
          label-width="80px"
          name="restsData"
        >
          <t-textarea
            v-model="reprintDialog.restsData"
            placeholder="请输入补打原因"
            name="description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
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
      </t-form>
    </t-dialog>
    <!---%日志 dialog 弹窗  -->
    <t-dialog v-model:visible="logInterfaceVisible" :cancel-btn="null" :confirm-btn="null" header="日志" width="60%">
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
import { FormInstanceFunctions, Input, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';
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
// 补打，作废 DiaLog 数据
const reprintDialog = ref({
  reprintData: '',
  restsData: '',
});

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
    width: '130',
    edit: {
      component: Input,
      props: {
        clearable: true,
        autofocus: true,
        autoWidth: true,
      },
      rules: [{ required: true, message: '不能为空' }],
      keepEditMode: true,
      showEditIcon: true,
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      // on: (editContext) => ({
      //   onBlur: () => {
      //     console.log('🚀 ~ file: index.vue:291 ~ editContext:', editContext);
      //   },
      // onEnter: (ctx) => {
      //   ctx?.e?.preventDefault();
      //   console.log('🚀 ~ file: index.vue:295 ~ ctx:', ctx);
      // },
      // }),
      abortEditOnEvent: ['onEnter'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const num = context.newRowData.planQty - context.newRowData.generateQty;
        if (context.newRowData.thisTimeQty > num) {
          MessagePlugin.warning(`本次生成数量需要为小于等于${num}的正整数`);
          return;
        }
        printTopTabData.list[context?.rowIndex] = context?.newRowData;
        generateData.value.createNum = printTopTabData.list[context?.rowIndex].thisTimeQty; // 变化后的数字
      },
    },
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
    // fixed: 'right',
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
    colKey: 'serialNumber',
    title: '条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'barcodeWipStatusName',
    title: '条码状态',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'wipNum',
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
    colKey: 'serialNumber',
    title: '条码',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'barcodeWipStatusName',
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
    colKey: 'wipNum',
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
    colKey: 'serialNumber',
    title: '条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'barcodeWipStatusName',
    title: '条码状态',
    align: 'center',
    width: '130',
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

// 初始渲染
onMounted(async () => {
  await onGetPrintTopTabData(); // 产品标签打印 上 请求
  await onLabelManageTabData(); // 产品标签管理 表格数据
  await onWorkStatus(); // 工单状态下拉数据
  await onBarCodeState(); // 获取条码状态数据
  await onPrintRulesData(); // 获取 打印规则下拉数据
  await onPrintTemplateData(); // 获取 打印摸板下拉数据
  await onReprintSelextData(); // 获取补打原因列表
  await onCancellationSelextData(); // 获取作废原因列表
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
});
const onPrintRulesList = reactive({ list: [] });
const onPrintRulesData = async () => {
  const res = await api.label.getBarcodeRuleList();
  onPrintRulesList.list = res?.list;
};

// 获取 打印摸板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  const res = await api.label.getPrintTmplList();
  onPrintTemplateList.list = res?.list;
};

// 获取 补打原因 下拉数据
const reprintDataList = reactive({ list: [] });
const onReprintSelextData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'REPRINT_REASON' });
  reprintDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};
// 获取 作废原因 下拉数据
const cancellationDataList = reactive({ list: [] });
const onCancellationSelextData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'SCRAP_REASON' });
  cancellationDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

// 补打，作废确定
const onConfirm = async () => {
  let reason = '';
  if (reprintDialog.value.restsData) {
    reason = reprintDialog.value.restsData;
  } else {
    reason = reprintDialog.value.reprintData;
  }
  if (isReprintCancellation.value) {
    await api.label.reprintBarcode({
      ids: productSelectedRowKeys.value,
      reason,
    });
    productSelectedRowKeys.value = [];
    MessagePlugin.success('补打成功');
  } else {
    await api.label.cancellationBarcode({
      ids: productSelectedRowKeys.value,
      reason,
    });
    await onLabelManageTabData(); // 刷新表格数据
    MessagePlugin.success('作废成功');
  }
  await onLabelManageTabData(); // 刷新表格数据
  formVisible.value = false;
};

// #产品标签打印 上 表格数据
const topPrintID = ref(null);
const onGetPrintTopTabData = async () => {
  const res = await api.label.getMoScheduleList({
    pageNum: pageUITop.value.page,
    pageSize: pageUITop.value.rows,
    planDateStart: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), // 计划生产开始日期
    planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
    isFinishDisplay: true,
  });
  printTopTabData.list = res.list;
  totalPrintTop.value = res.total;
};

// #产品标签打印 下 表格数据
const onGetPrintDownTabData = async () => {
  let isCreated = null;
  if (radioValue.value) {
    isCreated = true;
  } else {
    isCreated = false;
  }
  const res = await api.label.getBarcodeWipList({
    pageNum: pageUIDown.value.page,
    pageSize: pageUIDown.value.rows,
    moScheduleId: topPrintID.value,
    isCreated,
  });
  printDownTabData.list = res.list;
  totalPrintDown.value = res.total;
};

// #获取搜索 工单状态 下拉框数据
const workStateDataList = reactive({ list: [] });
const onWorkStatus = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' });
  workStateDataList.list = res;
};

// #获取搜索 条码状态 下拉框数据
const barCodeStateList = reactive({ list: [] });
const onBarCodeState = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'BARCODE_WIP_STATUS' });
  barCodeStateList.list = res;
};

// #产品标签管理 表格数据
const onLabelManageTabData = async () => {
  const res = await api.label.getBarcodeWipManagerList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    planDateStart: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), // 计划生产开始日期
    planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
    createDateStart: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), // 生产开始日期
    createDateEnd: dayjs().format('YYYY-MM-DD'), // 生产结束日期
  });
  manageTabData.list = res.list;
  totalManage.value = res.total;
};

// 补打 点击事件
const reprintVoidSwitch = ref(false); // 控制
const onReprint = () => {
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodeWipStatusNameArr.value.some((item) => item === '已生成' || item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已生成、已报废状态，不允许补打');
    return;
  }
  isReprintCancellation.value = true;
  formVisible.value = true;
  reprintVoidSwitch.value = true;
  diaLogTitle.value = '补打';
  buttonSwitch.value = '补打';
};

// 作废 点击事件
const onCancellation = () => {
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodeWipStatusNameArr.value.every((item) => item === '已生成' || item === '已打印');
  if (!specificStatus) {
    MessagePlugin.warning('存在条码状态不为已生成、已打印状态，不允许作废！');
    return;
  }
  isReprintCancellation.value = false;
  formVisible.value = true;
  reprintVoidSwitch.value = false;
  diaLogTitle.value = '作废';
  buttonSwitch.value = '作废';
};

// 日志 点击 事件
const onLogInterface = async (row: any) => {
  logInterfaceVisible.value = true; // 控制界面显示隐藏
  const res = await api.label.getBarcodeWipLog({
    serialNumber: row.serialNumber,
    pageNum: pageUIDay.value.page,
    pageSize: pageUIDay.value.rows,
  });
  dayTabData.list = res.list;
  totalDay.value = res.total;
};

// 上表格 单选框 选择事件
const onGenerateChange = async (value: any, context: any) => {
  generateData.value.workcenterId = context.currentRowData.workcenterId; // 工作中心 Id
  generateData.value.moScheduleId = context.currentRowData.moScheduleId; // 行 Id
  [topPrintID.value] = value;
  await onGetPrintDownTabData();
};

// 生成点击事件
const onGenerate = async () => {
  console.log('🚀 ~ file: index.vue:761 ~ onGenerate ~ generateData:', generateData.value);
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
  await api.label.generateBarcode(generateData.value); // 生成请求
  await onGetPrintTopTabData(); // 刷新数据
  await onGetPrintDownTabData();
  MessagePlugin.success('生成成功');
};

// 点击 打印事件
const onPrint = async () => {
  await api.label.printBarcode({ ids: selectedRowKeys.value });
  await onGetPrintDownTabData(); // 刷新数据
  MessagePlugin.success('打印成功');
};

// 打印选择 框 行 事件
const onPrintChange = (value: any) => {
  selectedRowKeys.value = value;
};

const barcodeWipStatusNameArr = ref([]);
const onProductRightFetchData = (value: any, context: any) => {
  barcodeWipStatusNameArr.value = context.selectedRowData.map((item: any) => item.barcodeWipStatusName);
  productSelectedRowKeys.value = value;
};

// TAb 栏切换事件
const tabChange = async (value: number) => {
  if (!value) {
    initialDate.value = 1;
  } else {
    initialDate.value = 3;
  }
};

// #query 查询参数
const initialDate = ref(1);
const opts = computed(() => {
  return {
    scheduledProductionDate: {
      label: '计划生产日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
    datePproduced: {
      isHide: !tabValue.value,
      label: '生产日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
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
// #query 查询函数
const onInput = async (data: any) => {
  if (!tabValue.value) {
    let isFinishDisplay = false;
    if (!data.showState) {
      isFinishDisplay = false;
    } else {
      isFinishDisplay = true;
    }
    pageUITop.value.page = 1;
    const res = await api.label.getMoScheduleList({
      pageNum: pageUITop.value.page,
      pageSize: pageUITop.value.rows,
      planDateStart: data.scheduledProductionDate[0], // 计划生产开始日期
      planDateEnd: data.scheduledProductionDate[1], // 计划生产结束日期
      moId: data.mo, // 工单ID
      workshopId: data.workshop, // 车间 ID
      workcenterId: data.workcenter, // 工作中心ID
      mitemId: data.mitem, // 物料 ID
      scheStatus: data.workState, // 工单状态
      isFinishDisplay, // 是否仅显示已打印
    });
    printTopTabData.list = res.list;
    totalPrintTop.value = res.total;
  } else {
    pageUI.value.page = 1;
    const res = await api.label.getBarcodeWipManagerList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      planDateStart: data.scheduledProductionDate[0], // 计划生产开始日期
      planDateEnd: data.scheduledProductionDate[1], // 计划生产结束日期
      createDateStart: data.scheduledProductionDate[0], // 生产开始日期
      createDateEnd: data.scheduledProductionDate[1], // 生产结束日期
      moId: data.mo, // 工单ID
      workshopId: data.workshop, // 车间 ID
      workcenterId: data.workcenter, // 工作中心ID
      mitemId: data.mitem, // 物料 ID
      barcodeWipStatus: data.barCodeState, // 条码状态
      serialNumber: data.barCode, // 条码
    });
    manageTabData.list = res.list;
    totalManage.value = res.total;
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
