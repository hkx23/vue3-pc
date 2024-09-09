<template>
  <cmp-container :full="true">
    <cmp-card
      :class="{
        'not-full-tab': !tagValue,
        'full-tab': tagValue,
      }"
      :hover-shadow="false"
    >
      <t-tabs v-model="tagValue" @change="switchTab">
        <t-tab-panel :value="1" label="库存标签打印" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <t-form
                ref="stockInRef"
                :rules="rules"
                :data="stockInData"
                label-align="right"
                :label-width="110"
                @submit="onAnomalyTypeSubmit"
              >
                <t-row :gutter="[16, 16]">
                  <t-col :span="4">
                    <t-form-item label="仓库" name="warehouseId">
                      <bcmp-select-business
                        v-model="stockInData.warehouseId"
                        type="warehouse"
                        :show-title="false"
                        @selection-change="onChangeWarehouse"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="物料" name="mitemId">
                      <bcmp-select-business
                        v-model="stockInData.mitemId"
                        type="mitemOnhandQty"
                        :show-title="false"
                        :custom-conditions="mitemConditions"
                        :disabled="isEmpty(stockInData.warehouseId)"
                        @selection-change="onChangeMitem"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="供应商" name="supplierId">
                      <bcmp-select-business
                        v-model="stockInData.supplierId"
                        type="supplier"
                        :show-title="false"
                        @change="onSelectMinPkgQty"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="现有量" name="totalQty">
                      <t-input v-model="stockInData.totalQty" disabled></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="占用量" name="usedQty">
                      <t-input v-model="stockInData.usedQty" disabled></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="可用量" name="availableQty">
                      <t-input v-model="stockInData.availableQty" disabled></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="本次生成数量" name="thisNumber">
                      <t-input v-model="stockInData.thisNumber" type="number" @change="onNumberChange"></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="最小包装数" name="minPkgQty">
                      <t-input v-model="stockInData.minPkgQty" type="number" @change="onNumberChange"></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="生成张数" name="createNum">
                      <t-input
                        v-model="stockInData.createNum"
                        disabled
                        placeholder="请输入生成数量和最小包装数"
                      ></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="批次号" name="lotNo">
                      <t-input v-model="stockInData.lotNo" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="上架货位" name="locId">
                      <bcmp-select-business
                        v-model="stockInData.locId"
                        :disabled="isEmpty(stockInData.warehouseId)"
                        type="location"
                        :parent-id="stockInData.warehouseId"
                        :show-title="false"
                        @selection-change="onChangeLocation"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="条码规则" name="barcodeRuleId">
                      <t-select v-model="stockInData.barcodeRuleId" label="">
                        <t-option
                          v-for="item in onBracodeRulesList?.list"
                          :key="item.id"
                          :label="item.ruleName"
                          :value="item.id"
                        />
                      </t-select>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="条码类型" label-align="right" label-width="110px" name="barcodeType">
                      <t-radio-group v-model="stockInData.barcodeType" :disabled="true">
                        <t-radio :value="0">原材料</t-radio>
                        <t-radio :value="1">配送卡</t-radio>
                      </t-radio-group>
                    </t-form-item>
                  </t-col>
                </t-row>
                <div style="display: flex; justify-content: flex-end">
                  <t-button theme="primary" style="margin-top: 10px" @click="eidtFormSubmit">生成</t-button>
                </div>
              </t-form>
              <cmp-card ghost class="padding-top-line-16">
                <cmp-table
                  v-model:pagination="pageUIStockIn"
                  row-key="id"
                  select-on-row-click
                  :selected-row-keys="selectedStockIneRowKeys"
                  :loading="loading"
                  :table-column="stockInColumns"
                  :table-data="stockInDataList.list"
                  :total="stockInTabTotal"
                  :fixed-height="true"
                  @select-change="onSelectStockIn"
                  @refresh="onRefreshStockIn"
                >
                  <template #title> 条码列表 </template>
                  <template #button>
                    <t-radio v-model="isMySelf" allow-uncheck @change="onRefreshStockIn">仅显示本人</t-radio>
                    <t-select v-model="printMode.printTempId" style="width: 240px" label="打印模板">
                      <t-option
                        v-for="item in onPrintTemplateList.list"
                        :key="item.id"
                        :label="item.tmplName"
                        :value="item.id"
                      />
                    </t-select>
                    <cmp-print-button
                      :template-id="printMode.printTempId"
                      :disabled="printStockInButtonOp"
                      :data="printStockInData"
                      :show-icon="false"
                      @before-print="onPrintStockIn"
                      >打印</cmp-print-button
                    >
                  </template>
                </cmp-table></cmp-card
              >
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
  <t-loading :loading="pageLoading" text="加载中..." fullscreen />
</template>

<script setup lang="tsx">
import _, { isEmpty } from 'lodash';
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, ComputedRef, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiWarehouse } from '@/api/warehouse';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
// 表单定义规则
const validateNumber = (value: any): boolean | CustomValidateResolveType => {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '只能输入正整数', type: 'error' };
  }
  if (Number(value) <= 0) {
    return { result: false, message: '不得小于或等于0', type: 'error' };
  }
  return true;
};
// 生成数量必须小于等于可用量
const thisNumberValidate = (value: any): boolean | CustomValidateResolveType => {
  if (value > stockInData.availableQty) {
    return { result: false, message: '生成数量必须小于等于可用量', type: 'error' };
  }
  return true;
};
// 表单校验
const rules: ComputedRef<FormRules> = computed(() => {
  return {
    warehouseId: [{ required: true, trigger: 'change' }],
    mitemId: [{ required: true, trigger: 'change' }],
    supplierId: [{ required: isSupplierConsignment.value === 1, trigger: 'change' }],
    reprintData: [{ required: true, trigger: 'change' }],
    restsData: [{ required: true, trigger: 'blur' }],
    lotNo: [{ required: true, trigger: 'change' }],
    thisNumber: [
      { required: true, trigger: 'change' },
      { validator: validateNumber, trigger: 'change' },
      { validator: thisNumberValidate, trigger: 'change' },
    ],
    createNum: [
      { required: true, trigger: 'change' },
      { validator: validateNumber, trigger: 'change' },
    ],
    minPkgQty: [
      { required: true, trigger: 'change' },
      { validator: validateNumber, trigger: 'change' },
    ],
    locId: [{ required: stockInData.isEnableLocation === 1, trigger: 'change' }],
    barcodeRuleId: [{ required: true, trigger: 'change' }],
    barcodeType: [{ required: true, trigger: 'change' }],
  };
});
const eidtFormSubmit = () => {
  stockInRef.value.submit();
};

const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    try {
      pageLoading.value = true;
      await apiWarehouse.label.generateBarcodeInventory(stockInData);
      MessagePlugin.success('生成成功');
      onRefreshStockIn();
      getMitemQty(stockInData.mitemId);
      stockInData.thisNumber = 0;
    } catch (e) {
      console.log(e);
    } finally {
      pageLoading.value = false;
    }
  }
};
const printStockInData = ref([]);
const mitemBarcodeManageRef = ref(null);
const pageLoading = ref(false);
const isMySelf = ref(true);
const stockInRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { loading } = useLoading();
const { pageUI: pageUIBracode } = usePage(); // 分页工具
const { pageUI: pageUIStockIn } = usePage(); // 分页工具
// $打印上 表格数据
const labelBelowList = reactive({ list: [] });
const stockInDataList = reactive({ list: [] });
const stockInTabTotal = ref(0);
const barcodeTotal = ref(0);
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const printStockInButtonOp = ref(true); // 控制打印按钮禁用
// 日志界面 表格数据
const selectedRowKeys: Ref<any[]> = ref([]); // 打印数组
const selectedStockIneRowKeys: Ref<any[]> = ref([]); // 打印数组
const stockInData = reactive({
  barcodeType: 0,
  warehouseId: '',
  districtId: '',
  locId: '',
  barcodeRuleId: '',
  supplierId: '',
  minPkgQty: null,
  createNum: 0,
  thisNumber: null,
  mitemId: '',
  lotNo: '',
  totalQty: 0,
  usedQty: 0,
  availableQty: 0,
  isEnableLocation: 1,
}) as any;
const mitemConditions = ref([]);
const isSupplierConsignment = ref(0);
const onChangeWarehouse = (value: any) => {
  onChangeWarehouseReset();
  const list = [];
  list.push({ field: 'warehouseId', operator: 'EQ', value: value.id });
  mitemConditions.value = list;
  isSupplierConsignment.value = value.isSupplierConsignment;
  stockInData.isEnableLocation = value.isEnableLocation;
};

const onChangeWarehouseReset = () => {
  const temp = {
    districtId: '',
    locId: '',
    supplierId: '',
    minPkgQty: null,
    createNum: 0,
    thisNumber: null,
    mitemId: '',
    lotNo: '',
    totalQty: 0,
    usedQty: 0,
    availableQty: 0,
    isEnableLocation: 1,
  };
  Object.assign(stockInData, temp);
};

const onChangeMitem = async (value: any) => {
  await setBarcodeType(value);
  await getMitemQty(value.id);
  await onSelectMinPkgQty();
  await onBracodeRulesData();
  onPrintTemplateData();
};
// 判断条码类型
const setBarcodeType = async (mitemInfo: any) => {
  if (mitemInfo) {
    if (mitemInfo.isRaw === 1) {
      stockInData.barcodeType = 0;
    } else if (mitemInfo.isInProcess === 1) {
      stockInData.barcodeType = 1;
    } else if (mitemInfo.isProduct === 1) {
      stockInData.barcodeType = 1;
    }
  }
};
const getMitemQty = async (mitemId: any) => {
  let barcodeType = 'LABEL';
  if (stockInData.barcodeType === 1) {
    barcodeType = 'DELIVERY_CARD';
  }
  const res = await apiWarehouse.onhandQty.getOnhandQtyByMitemId({
    barcodeType,
    mitemId,
    warehouseId: stockInData.warehouseId,
  });
  stockInData.totalQty = res.totalQty;
  stockInData.usedQty = res.usedQty;
  stockInData.availableQty = res.availableQty;
};
const onChangeLocation = async (value: any) => {
  stockInData.districtId = value.districtId;
};
const onSelectMinPkgQty = async () => {
  if (!stockInData.mitemId && !stockInData.supplierId) {
    return;
  }
  const res = (await apiMain.label.getMinPkgQty(stockInData)) as any;
  if (res) {
    stockInData.minPkgQty = res.minPkgQty;
  }
};
const onNumberChange = async () => {
  const { minPkgQty, thisNumber } = stockInData;
  if (!Number(minPkgQty) || !Number(thisNumber)) {
    stockInData.createNum = 0;
    return;
  }
  if (!minPkgQty || !thisNumber) {
    stockInData.createNum = 0;
    return;
  }

  // 计算生成标签的数量
  stockInData.createNum = Math.ceil(thisNumber / minPkgQty);
};
// 点击 打印事件
const onPrintStockIn = async () => {
  try {
    // 打印模板校验
    if (!printMode.value.printTempId) {
      // 提示错误信息
      MessagePlugin.warning('请选择打印模板！');
      return false; // 返回失败标志
    }

    printStockInData.value = [];
    pageLoading.value = true;
    const printDatas = [];
    selectedStockIneRowKeys.value.forEach((id) => {
      const foundItem = stockInDataList.list.find((item) => item.id === id);
      if (foundItem.isProduct === 1 && foundItem.customerCode) {
        foundItem.mitemCode = foundItem.customerCode;
      }
      const excItem = {};
      Object.assign(excItem, foundItem);
      // fucntion 或 Object 类型传入参数 打印会显示空白,无法打印
      Object.keys(excItem).forEach((key) => {
        if (_.isFunction(excItem[key])) {
          excItem[key] = null;
        } else if (_.isObject(excItem[key])) {
          excItem[key] = null;
        }
      });
      const DataBase = {
        LABEL_NO: foundItem.labelNo,
        QTY: foundItem.balanceQty,
        LOT_NO: foundItem.lotNo,
        C_INV_STD: foundItem.mitemName,
        BATCH_NO: foundItem.batchNo,
        SUPPLIER_NAME: foundItem.supplierName,
        SUPPLIER_CODE: foundItem.supplierCode,
        MITEM_CODE: foundItem.mitemCode,
        MITEM_DESC: foundItem.mitemName,
        SUPPLIER_LOT_NO: foundItem.supplierLotNo,
        ...excItem,
      };

      printDatas.push(DataBase);
      // 多个对象则打印多页
      // printStockInData.value.push({
      //   variable: DataBase,
      //   dataSource: { DataBase },
      // });
    });

    printStockInData.value.push({
      variable: printDatas,
      dataSource: printDatas,
    });
    await apiMain.label.printBarcode({
      ids: selectedStockIneRowKeys.value,
      printTempId: printMode.value.printTempId,
      printStatus: 'STOCKIN',
    });
    MessagePlugin.success('打印成功');

    selectedStockIneRowKeys.value = [];
    onRefreshStockIn();
    formVisible.value = false;
    return true; // 打印成功时返回 true
  } catch (e) {
    console.log(e);
    return false; // 打印失败时返回 false
  } finally {
    pageLoading.value = false;
  }
};

// 打印/生成按钮模型初始化
const printMode = ref({
  barcodeRuleId: '',
  printTempId: '',
  packQty: 0,
  deliveryId: '',
  deliveryDtlId: '',
  generalQty: 0,
  planQty: 0,
  lotNo: '',
});

// 打印上方查询初始化
const queryCondition = ref({
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
  deliveryDtlId: '',
});
// 包装规则查询初始化
// tab 表格?
const tagValue = ref(1);
const onSelectStockIn = (value: any) => {
  selectedStockIneRowKeys.value = value;
  printStockInButtonOp.value = !(selectedStockIneRowKeys?.value?.length > 0);
};

// # 条码标签刷新按钮
const onRefreshBelow = async () => {
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  console.log(pageUIBracode.value);
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  apiMain.label.getLabelList(queryBelowCondition.value).then((data) => {
    labelBelowList.list = data.list;
    barcodeTotal.value = data.total;
  });
  selectedRowKeys.value = [];
};
// # 条码标签刷新按钮
const onRefreshStockIn = async () => {
  try {
    // 标签
    if (stockInData.barcodeType === 0) {
      const data = await apiMain.label.getInventoryLabelList({
        isMySelf: isMySelf.value,
        pageSize: pageUIStockIn.value.rows,
        pageNum: pageUIStockIn.value.page,
      });
      stockInDataList.list = data.list;
      stockInTabTotal.value = data.total;
      selectedStockIneRowKeys.value = [];
    } else {
      // 配送卡
      const data = await apiMain.label.getInventoryDeliveryCardList({
        isMySelf: isMySelf.value,
        pageSize: pageUIStockIn.value.rows,
        pageNum: pageUIStockIn.value.page,
      });
      stockInDataList.list = data.list;
      stockInTabTotal.value = data.total;
      selectedStockIneRowKeys.value = [];
    }
  } catch (e) {
    console.log(e);
  }
};

// 获取条码规则 下拉数据
const onBracodeRulesList = reactive({ list: [] });
const onBracodeRulesData = async () => {
  if (stockInData.barcodeType === 0) {
    // 获取 原材料条码规则 下拉数据
    const res = await apiMain.label.getLabelBarcodeRuleList();
    onBracodeRulesList.list = res;
    if (res && res.length > 0) {
      stockInData.barcodeRuleId = res[0].id;
    }
  } else {
    // 获取配送卡条码规则下拉数据
    const res = await apiMain.deliveryCard.getBarcodeRuleListByMitemId({ mitemId: stockInData.mitemId });
    onBracodeRulesList.list = res?.list;
    if (res && res?.list.length > 0) {
      stockInData.barcodeRuleId = res.list[0].id;
    }
  }
};
// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  if (stockInData.barcodeType === 0) {
    const res = await apiMain.label.getLabelPrintTmplList();
    onPrintTemplateList.list = res;
  } else {
    const res = await apiMain.deliveryCard.getDeliveryCardPrintTmplList();
    onPrintTemplateList.list = res;
  }
};

const stockInColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 30,
  },
  {
    colKey: 'labelNo',
    title: '条码',
    align: 'center',
    width: '200',
  },
  {
    colKey: 'barcodeStatusName',
    title: '条码状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'supplierCode',
    title: '供应商编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'supplierName',
    title: '供应商名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'lotNo',
    title: '生产批次',
    align: 'center',
    width: '120',
  },
  {
    colKey: 'balanceQty',
    title: '数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '90',
  },
];

const switchTab = (selectedTabIndex: any) => {
  if (selectedTabIndex === 2) {
    const { search } = mitemBarcodeManageRef.value;
    search();
  } else if (selectedTabIndex === 0) {
    onRefreshBelow();
  } else {
    onRefreshStockIn();
  }
};

const bracodeStatusOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'LABEL_STATUS' }).then((data) => {
  bracodeStatusOption.value = data;
});
// ################ 初始渲染
onMounted(async () => {
  // 获取当前日期
  const today = new Date();

  // 计算三天前的日期
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);

  // 将日期转换为字符串，格式可以根据需要进行调整
  const timeCreatedStart = threeDaysAgo.toISOString().split('T')[0];
  const timeCreatedEnd = today.toISOString().split('T')[0];
  queryCondition.value.dateStart = timeCreatedStart;
  queryCondition.value.dateEnd = timeCreatedEnd;
  await onBracodeRulesData(); // 获取 条码模板下拉数据
  await onPrintTemplateData(); // 获取 打印模板下拉数据
});
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  // margin-top: 20px;
}
</style>
