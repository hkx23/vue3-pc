<template>
  <div class="main-page">
    <!-- ################# 工单 表格数据 ###################### -->
    <div class="main-page-content">
      <!-- 查询组件  -->
      <t-row style="margin-top: 15px">
        <t-space>
          <t-radio-group v-model="queryCondition.searchType">
            <t-radio value="mintemBatch">物料批次</t-radio>
            <t-radio value="mintemLabel">物料标签</t-radio>
          </t-radio-group>
          <t-input
            v-if="queryCondition.searchType === 'mintemBatch'"
            v-model="queryCondition.mintemBatchCode"
            placeholder="请输入批次信息"
          ></t-input>
          <t-input
            v-if="queryCondition.searchType === 'mintemLabel'"
            v-model="queryCondition.mintemLabelNo"
            placeholder="请输入物料标签"
          ></t-input>
          <t-input
            v-if="queryCondition.searchType === 'mintemBatch'"
            v-model="queryCondition.mintemCode"
            label="物料编码"
            placeholder="物料编码"
          ></t-input>
          <t-col>
            <t-button @click="conditionEnter">查询</t-button>
            <t-button theme="default" @click="onRestCondition">重置</t-button>
          </t-col>
        </t-space>
      </t-row>
      <t-row style="margin-top: 15px"></t-row>
      <t-tabs v-model="tagValue" @change="switchTab">
        <t-tab-panel :value="0" label="物料基础信息" :destroy-on-hide="false">
          <div style="background-color: #f0f0f0">
            <t-row>
              <t-space style="font-weight: bold; font-size: larger; margin-top: 15px; margin-left: 10px"
                >物料信息</t-space
              >
            </t-row>
            <t-row style="margin-top: 15px; margin-left: 20px">
              <t-col :span="3">
                <t-space>批次</t-space>
                <t-space>{{ mitemInfo.batchNo }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>物料编码</t-space>
                <t-space>{{ mitemInfo.mitemCode }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>物料描述</t-space>
                <t-space>{{ mitemInfo.mitemDesc }}</t-space>
              </t-col>
            </t-row>
            <t-row style="margin-top: 15px; margin-left: 20px">
              <t-col :span="3">
                <t-space>数量</t-space>
                <t-space>{{ mitemInfo.batchNo }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>当前状态</t-space>
                <t-space>{{ mitemInfo.mitemCode }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>接收时间</t-space>
                <t-space>{{ mitemInfo.mitemDesc }}</t-space>
              </t-col>
            </t-row>
          </div>
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="groupColumns"
              :table-data="deliveryList.list"
              :loading="loading"
              :total="moTabTotal"
              style="margin-top: 10px"
              :selected-row-keys="delivertRowKeys"
              @select-change="onSelectionChange"
              @row-click="onRowClick"
              @refresh="onRefresh"
            >
            </cmp-table>
          </t-col>
          <t-radio v-model="queryBelowCondition.isCreated" allow-uncheck>仅显示已生成</t-radio>
          <div class="main-page-content">
            <cmp-table
              v-model:pagination="pageUIBracode"
              row-key="id"
              :loading="loading"
              select-on-row-click
              :selected-row-keys="selectedRowKeys"
              :table-column="barcodeColumns"
              :table-data="labelBelowList.list"
              :total="barcodeTotal"
              @select-change="onPrintChange"
              @refresh="onRefreshBelow"
            >
            </cmp-table>
          </div>
        </t-tab-panel>
        <t-tab-panel :value="1" label="物料标签管理" :destroy-on-hide="false">
          <!-- 查询组件  -->
          <t-row style="margin-top: 15px"></t-row>
          <cmp-query :opts="mitemBarcodeManageOp" label-width="100" @submit="managePageSearchClick" />
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUIMannage"
              row-key="id"
              select-on-row-click
              :selected-row-keys="selectedManageRowKeys"
              :loading="loading"
              :table-column="pkgBarcodeManageColumns"
              :table-data="pkgManageDataList.list"
              :total="pkgManageTabTotal"
              @select-change="onProductRightFetchData"
              @refresh="onRefreshManage"
            >
              <template #operate>
                <t-space>
                  <t-row align="middle" style="margin-top: 10px">
                    <t-col>打印模板： </t-col>
                    <t-col>
                      <t-select v-model="printMode.printTempId" style="width: 90%">
                        <t-option
                          v-for="item in onPrintTemplateList.list"
                          :key="item.id"
                          :label="item.tmplName"
                          :value="item.id"
                        />
                      </t-select>
                    </t-col>
                    <t-button theme="default" :disabled="isEnable" @click="onReprint"> 补打 </t-button>
                    <t-button theme="default" :disabled="isEnable" @click="onCancellation"> 作废 </t-button>
                    <t-button theme="default" :disabled="isEnable" @click="onSplit"> 拆分 </t-button>
                    <t-button theme="default"> 导出 </t-button>
                  </t-row>
                </t-space>
              </template>
              <template #operations="{ row }">
                <t-link theme="primary" @click.stop="openLog(row)"> 日志 </t-link>
              </template>
            </cmp-table>
          </t-col>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { FormInstanceFunctions, Input, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIBracode } = usePage(); // 分页工具
const { pageUI: pageUIMannage } = usePage(); // 分页工具
const { pageUI: pageUIDay } = usePage(); // 分页工具
// $打印上 表格数据
const deliveryList = reactive({ list: [] });
// $打印上 表格数据
const labelBelowList = reactive({ list: [] });
const moTabTotal = ref(0);
// $管理上 表格数据
const pkgManageDataList = reactive({ list: [] });
const pkgManageTabTotal = ref(0);
const barcodeTotal = ref(0);
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const buttonSwitch = ref(''); // 确认按钮title
const logInterfaceVisible = ref(false); // 控制日志 Dialog 显示隐藏
const printButtonOp = ref(true); // 控制打印按钮禁用
const isEnable = ref(true); // 控制打印按钮禁用
// 日志界面 表格数据
const dayTabData = reactive({ list: [] });
const selectedRowKeys: Ref<any[]> = ref([]); // 打印数组
const delivertRowKeys: Ref<any[]> = ref([]); // 工单表数组
const selectedManageRowKeys: Ref<any[]> = ref([]); // 打印数组
const isReprintCancellation = ref(0);
// 补打，作废 DiaLog 数据
const mitemInfo = ref({
  batchNo: '',
  mitemCode: '',
  mitemDesc: '',
  labelId: '',
  splitNum: '',
  qty: 0,
});
// 点击 重置事件
const onRestCondition = async () => {
  // 重置查询条件
  queryCondition.value = {
    ...queryCondition.value, // 保留其他属性
    searchType: 'mintemBatch',
    mintemBatchCode: '',
    mintemLabelNo: '',
    mintemCode: '',
    mitemId: '',
  };
};

// 打印选择 框 行 事件
const onPrintChange = (value: any) => {
  selectedRowKeys.value = value;
  printButtonOp.value = !(selectedRowKeys.value.length > 0);
};

// 打印选择 框 行 事件
const onSelectionChange = (selectedRows) => {
  delivertRowKeys.value = selectedRows;
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  const [firstItem] = selectedRows;
  printMode.value.deliveryId = firstItem;
  queryBelowCondition.value.deliveryId = firstItem;
  api.label.getLabelList(queryBelowCondition.value).then((data) => {
    labelBelowList.list = data.list;
    barcodeTotal.value = data.total;
  });
};

const totalDay = ref(0);
// 打印/生成按钮模型初始化
const printMode = ref({
  barcodeRuleId: '',
  printTempId: '',
  packQty: 0,
  deliveryId: '',
  generalQty: 0,
  planQty: 0,
  lotNo: '',
});

// 打印上方查询初始化
const queryCondition = ref({
  searchType: 'mintemBatch',
  mintemBatchCode: '',
  mintemLabelNo: '',
  mintemCode: '',
  isFinishDisplay: true,
  mitemId: '',
  dateStart: '',
  dateEnd: '',
  billNo: '',
  supplierId: '',
  pageNum: 1,
  pageSize: 10,
});
// 打印下方查询初始化
const queryBelowCondition = ref({
  isCreated: true,
  pageNum: 1,
  pageSize: 10,
  deliveryId: '',
});
// 管理上方查询初始化
const manageQueryCondition = ref({
  mitemId: '',
  supplierId: '',
  barcodeStatus: '',
  timeCreatedStart: '',
  timeCreatedEnd: '',
  barcode: '',
  billNo: '',
  pageNum: 1,
  pageSize: 10,
});
// 包装规则查询初始化
// tab 表格?
const tagValue = ref(0);
const barcodeStatusNameArr = ref([]);
const onProductRightFetchData = (value: any, context: any) => {
  barcodeStatusNameArr.value = context.selectedRowData.map((item: any) => item.barcodeStatusName);
  selectedManageRowKeys.value = value;

  isEnable.value = !(selectedManageRowKeys.value.length > 0);
};
// 补打 点击事件
const reprintVoidSwitch = ref(1); // 控制
const onReprint = () => {
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodeStatusNameArr.value.some((item) => item === '已生成' || item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已生成、已报废状态，不允许补打');
    return;
  }
  if (!printMode.value.printTempId) {
    // 提示错误信息
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  isReprintCancellation.value = 1;
  formVisible.value = true;
  reprintVoidSwitch.value = 1;
  diaLogTitle.value = '补打';
  buttonSwitch.value = '补打';
};

// 作废 点击事件
const onCancellation = () => {
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodeStatusNameArr.value.every((item) => item === '已生成' || item === '已打印');
  if (!specificStatus) {
    MessagePlugin.warning('存在条码状态不为已生成、已打印状态，不允许作废！');
    return;
  }
  isReprintCancellation.value = 2;
  formVisible.value = true;
  reprintVoidSwitch.value = 2;
  diaLogTitle.value = '作废';
  buttonSwitch.value = '作废';
};
// 拆分 点击事件
const onSplit = () => {
  const rowStatus = selectedManageRowKeys.value.length > 1;
  if (rowStatus) {
    MessagePlugin.warning('请选择一行数据！');
    return;
  }
  if (!printMode.value.printTempId) {
    // 提示错误信息
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodeStatusNameArr.value.every((item) => item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已报废状态，不允许拆分！');
    return;
  }
  isReprintCancellation.value = 3;
  formVisible.value = true;
  reprintVoidSwitch.value = 3;
  diaLogTitle.value = '拆分';
  buttonSwitch.value = '拆分';
};

// # 送货刷新按钮
const onRefresh = async () => {
  await fetchMoTable(); // 获取 条码规则表格 数据
};
// # 条码标签刷新按钮
const onRefreshBelow = async () => {
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  console.log(pageUIBracode.value);
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  api.label.getLabelList(queryBelowCondition.value).then((data) => {
    labelBelowList.list = data.list;
    barcodeTotal.value = data.total;
  });
  selectedRowKeys.value = [];
};
// # 条码标签刷新按钮
const onRefreshManage = async () => {
  manageQueryCondition.value.pageNum = pageUIMannage.value.page;
  console.log(pageUIBracode.value);
  manageQueryCondition.value.pageSize = pageUIMannage.value.rows;
  api.label.getLabelManageList(manageQueryCondition.value).then((data) => {
    pkgManageDataList.list = data.list;
    barcodeTotal.value = data.total;
  });
  selectedManageRowKeys.value = [];
  isEnable.value = true;
};
const logNodeCode = ref(null);
// 日志 点击 事件
const openLog = async (row: any) => {
  logNodeCode.value = row.labelNo;
  console.log(row.value);
  logInterfaceVisible.value = true; // 控制界面显示隐藏
  const res = await api.label.getLabelLog({
    labelNo: row.labelNo,
    pageNum: pageUIDay.value.page,
    pageSize: pageUIDay.value.rows,
  });
  dayTabData.list = res.list;
  totalDay.value = res.total;
};
// 获取 条码规则 下拉数据
const onBracodeRulesList = reactive({ list: [] });
const onBracodeRulesData = async () => {
  const res = await api.label.getLabelBarcodeRuleList();
  onBracodeRulesList.list = res;
};
// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  const res = await api.label.getLabelPrintTmplList();
  onPrintTemplateList.list = res;
};

// #### 条码规则 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    align: 'center',
    width: '30',
  },
  {
    colKey: 'billNo',
    title: '送货单',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'supplierCode',
    title: '供应商编码',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierName',
    title: '供应商名称',
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
    colKey: 'lotNo',
    title: '批次号',
    align: 'center',
    width: '160',
    edit: {
      component: Input,
      props: {
        clearable: true,
        autofocus: true,
        autoWidth: true,
        style: {
          width: '130px', // 调整宽度的样式属性
        },
      },
      rules: [{ required: true, message: '不能为空' }],
      // keepEditMode: true,
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
        if (context.newRowData.lotNo > num) {
          MessagePlugin.warning(`本次生成数量需要为小于等于${num}的正整数`);
          return;
        }
        deliveryList.list[context?.rowIndex] = context?.newRowData;
        printMode.value.lotNo = deliveryList.list[context?.rowIndex].lotNo; // 变化后的数字
      },
    },
  },
  {
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'createdQty',
    title: '已生成数量',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'printedQty',
    title: '已打印数量',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'minPkgQty',
    title: '最小包装数',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'creatorName',
    title: '收货人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'timeCreate',
    title: '收货时间',
    align: 'center',
    width: '130',
  },
];
// ####条码 表头
const barcodeColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'labelNo',
    title: '条码',
    align: 'center',
    width: '250',
  },
  {
    colKey: 'barcodeStatusName',
    title: '条码状态',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'creatorName',
    title: '生成人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    align: 'center',
    width: '130',
  },
];
const pkgBarcodeManageColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  {
    colKey: 'labelNo',
    title: '条码',
    align: 'center',
    width: '250',
  },
  {
    colKey: 'barcodeStatusName',
    title: '条码状态',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'billNo',
    title: '送货单',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierCode',
    title: '供应商编码',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierName',
    title: '供应商名称',
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
    width: '130',
  },
  {
    colKey: 'lotNo',
    title: '生产批次',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'batchLot',
    title: '到货批次',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'warehouseName',
    title: '仓库',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'districtName',
    title: '货区',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'locationName',
    title: '货位',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'creatorName',
    title: '生成人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    align: 'center',
    width: '130',
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

const switchTab = (selectedTabIndex: any) => {
  if (selectedTabIndex === 1) {
    // 获取当前日期
    const today = new Date();

    // 计算三天前的日期
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    // 将日期转换为字符串，格式可以根据需要进行调整
    const timeCreatedStart = threeDaysAgo.toISOString().split('T')[0];
    const timeCreatedEnd = today.toISOString().split('T')[0];
    manageQueryCondition.value.timeCreatedStart = timeCreatedStart;
    manageQueryCondition.value.timeCreatedEnd = timeCreatedEnd;
    fetchBracodeManageTable();
  } else {
    fetchMoTable();
  }
};
// 打印界面点击查询按钮
const conditionEnter = (data: any) => {
  queryCondition.value.mitemId = data.mitemId;
  queryCondition.value.supplierId = data.supplierId;
  queryCondition.value.billNo = data.billNo;
  const [datetimePlanStart, datetimePlanEnd] = data.datetimePlanRange;
  queryCondition.value.dateStart = datetimePlanStart;
  queryCondition.value.dateEnd = datetimePlanEnd;
  fetchMoTable();
};
// 管理界面点击查询按钮
const managePageSearchClick = (data: any) => {
  const [timeCreatedStart, timeCreatedEnd] = data.timeCreatedRange;
  manageQueryCondition.value.timeCreatedStart = timeCreatedStart;
  manageQueryCondition.value.timeCreatedEnd = timeCreatedEnd;
  manageQueryCondition.value.barcode = data.barcode;
  manageQueryCondition.value.barcodeStatus = data.barcodeStatus;
  manageQueryCondition.value.billNo = data.billNo;
  manageQueryCondition.value.mitemId = data.mitemId;
  manageQueryCondition.value.supplierId = data.supplierId;
  selectedManageRowKeys.value = [];
  isEnable.value = true;
  fetchBracodeManageTable();
};

// 加载工单数据表格
const fetchMoTable = async () => {
  setLoading(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await api.label.getDeliveryList(queryCondition.value)) as any;
    const { list } = data;
    deliveryList.list = list;
    moTabTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 加载条码管理数据表格
const fetchBracodeManageTable = async () => {
  setLoading(true);
  try {
    manageQueryCondition.value.pageNum = pageUIMannage.value.page;
    manageQueryCondition.value.pageSize = pageUIMannage.value.rows;
    const data = (await api.label.getLabelManageList(manageQueryCondition.value)) as any;
    const { list } = data;
    pkgManageDataList.list = list;
    pkgManageTabTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 查询组件
const mitemBarcodeManageOp = computed(() => {
  return {
    timeCreatedRange: {
      label: '生成日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
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
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    barcodeStatus: {
      label: '条码状态',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: bracodeStatusOption.value,
      },
    },
    barcode: {
      label: '条码',
      comp: 't-input',
      defaultVal: '',
    },
    billNo: {
      label: '送货单',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

// 获取 补打原因 下拉数据
const reprintDataList = reactive({ list: [] });
const onReprintSelextData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'REPRINT_REASON' });
  reprintDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};
// 获取 拆分原因 下拉数据
const splitDataList = reactive({ list: [] });
const onsplitelextData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'SPLIT_REASON' });
  splitDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};
// 获取 作废原因 下拉数据
const cancellationDataList = reactive({ list: [] });
const onCancellationSelextData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'SCRAP_REASON' });
  cancellationDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

const bracodeStatusOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'W_MITEM_LABEL_STATUS' }).then((data) => {
  bracodeStatusOption.value = data;
});
// ################ 初始渲染
onMounted(async () => {
  await fetchMoTable(); // 获取 物料编码 表格数据
  await onBracodeRulesData(); // 获取 条码模板下拉数据
  await onPrintTemplateData(); // 获取 打印模板下拉数据
  await onReprintSelextData(); // 获取补打原因列表
  await onsplitelextData(); // 获取拆分原因列表
  await onCancellationSelextData(); // 获取作废原因列表
});

const onRowClick = ({ row }) => {
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  queryBelowCondition.value.deliveryId = row.id;
  delivertRowKeys.value = [];
  delivertRowKeys.value.push(row.id);
  api.label.getLabelList(queryBelowCondition.value).then((data) => {
    labelBelowList.list = data.list;
    barcodeTotal.value = data.total;
  });
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
