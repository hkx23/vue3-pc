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
        <t-tab-panel :value="1" label="库内标签打印" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <t-form
                ref="stockInRef"
                :rules="rules"
                :data="stockInData"
                label-align="left"
                @submit="onAnomalyTypeSubmit"
              >
                <t-row :gutter="[32, 16]">
                  <t-col :span="4">
                    <t-form-item label="物料名称" label-align="right" name="mitemId">
                      <bcmp-select-business
                        ref="componetRef"
                        v-model="stockInData.mitemId"
                        type="mitem"
                        :show-title="false"
                        @change="onSelectMinPkgQty"
                        @selection-change="onChangeMitem"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="物料编码" label-align="right" name="mitemCode">
                      <t-input v-model="stockInData.mitemCode" placeholder="请先选择物料" :readonly="true" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="供应商名称" label-align="right" label-width="110px" name="supplierName">
                      <bcmp-select-business
                        v-model="stockInData.supplierId"
                        type="supplier"
                        :show-title="false"
                        @change="onSelectMinPkgQty"
                      ></bcmp-select-business>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="供应商编码" label-align="right" name="supplierCode">
                      <t-input v-model="stockInData.supplierCode" :readonly="true" placeholder="请先选择供应商" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="批次号" label-align="right" name="lotNo">
                      <t-input v-model="stockInData.lotNo" />
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="本次生成数量" label-align="right" label-width="110px" name="thisNumber">
                      <t-input v-model="stockInData.thisNumber" theme="column" @change="onNumberChange"></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="最小包装数" label-align="right" name="minPkgQty">
                      <t-input v-model="stockInData.minPkgQty" theme="column" @change="onNumberChange"></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="生成张数" label-align="right" name="createNumber">
                      <t-input
                        v-model="stockInData.createNumber"
                        :disabled="true"
                        placeholder="请输入生成数量和最小包装数"
                        theme="column"
                      ></t-input>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="条码规则" label-align="right" label-width="110px" name="barcodeRuleId">
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
                      <t-radio-group v-model="barcodeType" @change="onChangeBarcodeType">
                        <t-radio :value="0">原材料</t-radio>
                        <t-radio :value="1">配送卡</t-radio>
                      </t-radio-group>
                    </t-form-item>
                  </t-col>
                  <t-col :span="4">
                    <t-form-item label="生产日期" label-align="right" name="dateTimeManufacture">
                      <t-date-picker v-model="dateTimeManufacture" style="width: 300px" allow-input clearable />
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
  <!-- % 补打， 作废 dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :confirm-btn="buttonSwitch"
    :header="diaLogTitle"
    width="auto"
    @confirm="onConfirm"
  >
    <template #footer>
      <div v-if="buttonSwitch === '补打'">
        <t-button theme="default" @click="onClose"> 关闭 </t-button>
        <cmp-print-button
          :template-id="printMode.printTempId"
          :data="printManagerData"
          :show-icon="false"
          theme="primary"
          @before-print="onPrintManager"
          >打印</cmp-print-button
        >
      </div>
    </template>
    <t-form ref="formRef" :data="reprintDialog" :rules="rules">
      <t-form-item v-if="reprintVoidSwitch === 1" label-width="80px" label="补打原因" name="reprintData">
        <t-select v-model="reprintDialog.reprintData">
          <t-option v-for="item in reprintDataList.list" :key="item.label" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <t-alert v-if="reprintVoidSwitch === 2" theme="warning">
        <template #message> 若作废则当前条码对应接收单条码将全部作废 </template>
      </t-alert>
      <t-form-item
        v-if="reprintVoidSwitch === 2"
        label-width="80px"
        style="margin-top: 15px"
        label="作废原因"
        name="reprintData"
      >
        <t-select v-model="reprintDialog.reprintData">
          <t-option
            v-for="item in cancellationDataList.list"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </t-select>
      </t-form-item>
      <t-form-item v-if="reprintVoidSwitch === 3" label-width="80px" label="标签号" name="reprintData">
        <t-input v-model="reprintDialog.labelNo" readonly :disabled="true" />
      </t-form-item>
      <t-form-item v-if="reprintVoidSwitch === 3" label-width="80px" label="拆分数量" name="reprintData">
        <t-input v-model="reprintDialog.splitNum" />
      </t-form-item>
      <t-form-item v-if="reprintVoidSwitch === 3" label-width="80px" label="拆分原因" name="reprintData">
        <t-select v-model="reprintDialog.reprintData">
          <t-option v-for="item in splitDataList.list" :key="item.label" :label="item.label" :value="item.value" />
        </t-select>
      </t-form-item>
      <t-form-item
        v-if="isReprintCancellation === 1 && reprintDialog.reprintData === '其他原因'"
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
        v-if="isReprintCancellation === 2 && reprintDialog.reprintData === '其他原因'"
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
      <t-form-item
        v-if="isReprintCancellation === 3 && reprintDialog.reprintData === '其他原因'"
        label="拆分原因"
        label-width="80px"
        name="restsData"
      >
        <t-textarea
          v-model="reprintDialog.restsData"
          placeholder="请输入拆分原因"
          name="description"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
  <t-dialog v-model:visible="logInterfaceVisible" cancel-btn="关闭" :confirm-btn="null" header="日志" width="60%">
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
  <t-loading :loading="pageLoading" text="加载中..." fullscreen />
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import _ from 'lodash';
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
function validateNumberOne(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '只能输入正整数', type: 'error' };
  }
  if (Number(value) <= 0) {
    return { result: false, message: '生成张数不得小于或等于0', type: 'error' };
  }
  return true;
}
// 表单定义规则
function validateNumberTwo(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '只能输入正整数', type: 'error' };
  }
  if (Number(value) <= 0) {
    return { result: false, message: '只能输入正整数', type: 'error' };
  }
  return true;
}
// 表单校验
const rules: ComputedRef<FormRules> = computed(() => {
  return {
    reprintData: [{ required: true, trigger: 'change' }],
    restsData: [{ required: true, trigger: 'blur' }],
    mitemId: [{ required: true, trigger: 'change' }],
    lotNo: [{ required: true, trigger: 'change' }],
    thisNumber: [
      { required: true, trigger: 'change' },
      { validator: validateNumberTwo, trigger: 'change' },
    ],
    createNumber: [
      { required: true, trigger: 'change' },
      { validator: validateNumberOne, trigger: 'change' },
    ],
    minPkgQty: [
      { required: true, trigger: 'change' },
      { validator: validateNumberTwo, trigger: 'change' },
    ],
    barcodeRuleId: [{ required: true, trigger: 'change' }],
  };
});
const eidtFormSubmit = () => {
  stockInRef.value.submit();
};

const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    try {
      pageLoading.value = true;
      if (barcodeType.value === 0) {
        // 生成原材料标签
        await apiMain.label.generateBarcodeStockIn(stockInData.value);
      } else {
        // 生成配送卡标签
        deliveryData.value.barcodeRuleId = stockInData.value.barcodeRuleId;
        deliveryData.value.createNum = stockInData.value.thisNumber;
        deliveryData.value.createSize = stockInData.value.minPkgQty;
        deliveryData.value.mitemId = stockInData.value.mitemId;
        deliveryData.value.isNormalGenerate = false;
        deliveryData.value.batchNo = stockInData.value.lotNo;
        deliveryData.value.thisNumber = stockInData.value.thisNumber;
        await apiMain.deliveryCard.generateBarcode(deliveryData.value);
      }

      MessagePlugin.success('生成成功');
      onRefreshStockIn();
    } catch (e) {
      console.log(e);
    } finally {
      pageLoading.value = false;
    }
  }
};
const printStockInData = ref([]);
const printManagerData = ref([]);
const mitemBarcodeManageRef = ref(null);
const componetRef = ref(null);
const pageLoading = ref(false);
const isMySelf = ref(true);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const stockInRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { loading, setLoading } = useLoading();
const { pageUI: pageUIBracode } = usePage(); // 分页工具
const { pageUI: pageUIMannage } = usePage(); // 分页工具
const { pageUI: pageUIDay } = usePage(); // 分页工具
const { pageUI: pageUIStockIn } = usePage(); // 分页工具

// $打印上 表格数据
const labelBelowList = reactive({ list: [] });
const stockInDataList = reactive({ list: [] });
const stockInTabTotal = ref(0);
// $管理上 表格数据
const pkgManageDataList = reactive({ list: [] });
const pkgManageTabTotal = ref(0);
const barcodeTotal = ref(0);
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const buttonSwitch = ref(''); // 确认按钮title
const logInterfaceVisible = ref(false); // 控制日志 Dialog 显示隐藏
const printStockInButtonOp = ref(true); // 控制打印按钮禁用
const isEnable = ref(true); // 控制打印按钮禁用
// 日志界面 表格数据
const dayTabData = reactive({ list: [] });
const selectedRowKeys: Ref<any[]> = ref([]); // 打印数组
const selectedManageRowKeys: Ref<any[]> = ref([]); // 打印数组
const selectedStockIneRowKeys: Ref<any[]> = ref([]); // 打印数组
const isReprintCancellation = ref(0);
const stockInData = ref({
  barcodeRuleId: '',
  supplierId: '',
  supplierCode: '',
  minPkgQty: null,
  createNumber: 0,
  thisNumber: null,
  mitemId: '',
  mitemCode: '',
  lotNo: '',
});
// 配送卡生成数据
const deliveryData = ref({
  barcodeRuleId: '', // select ID
  createNum: 0, // 变化后的数字
  createSize: 0, // 生成规格/最小包装数量
  mitemId: null, // 物料ID
  isNormalGenerate: false, // 是否正常生成 true:正常生成 false:库存生成
  batchNo: null, // 批次
  onhandId: null, // 库存ID
  thisNumber: 0, // 本次生成数量
});
const barcodeType = ref(0); // 条码类型
const dateTimeManufacture = ref(null); // 生产日期

const onChangeBarcodeType = async (value) => {
  barcodeType.value = value;
  await onBracodeRulesData();
  onPrintTemplateData();
};
const onChangeMitem = async (value: any) => {
  await setBarcodeType(value);
  await onBracodeRulesData();
  onPrintTemplateData();
};
// 判断条码类型
const setBarcodeType = async (mitemInfo: any) => {
  if (mitemInfo) {
    barcodeType.value = 0;
    if (mitemInfo.isRaw === 1) {
      barcodeType.value = 0;
    } else if (mitemInfo.isInProcess === 1) {
      barcodeType.value = 1;
    } else if (mitemInfo.isProduct === 1) {
      barcodeType.value = 1;
    }
  }
};
// 获取条码规则 下拉数据
const onBracodeRulesList = reactive({ list: [] });
const onBracodeRulesData = async () => {
  if (barcodeType.value === 0) {
    // 获取 原材料条码规则 下拉数据
    const res = await apiMain.label.getLabelBarcodeRuleList();
    onBracodeRulesList.list = res;
    if (res && res.length > 0) {
      stockInData.value.barcodeRuleId = res[0].id;
    }
  } else {
    // 获取配送卡条码规则下拉数据
    const res = await apiMain.deliveryCard.getBarcodeRuleListByMitemId({ mitemId: stockInData.value.mitemId });
    onBracodeRulesList.list = res?.list;
    if (res && res?.list.length > 0) {
      stockInData.value.barcodeRuleId = res.list[0].id;
    }
  }
};

// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  if (barcodeType.value === 0) {
    const res = await apiMain.label.getLabelPrintTmplList();
    onPrintTemplateList.list = res;
    if (res && res.length > 0) {
      printMode.value.printTempId = res[0].id;
    }
  } else {
    const res = await apiMain.deliveryCard.getDeliveryCardPrintTmplList();
    onPrintTemplateList.list = res;
    if (res && res.length > 0) {
      printMode.value.printTempId = res[0].id;
    }
  }
};

const onSelectMinPkgQty = async () => {
  if (!stockInData.value.mitemId && !stockInData.value.supplierId) {
    return;
  }
  const res = (await apiMain.label.getMinPkgQty(stockInData.value)) as any;
  if (res) {
    stockInData.value.mitemCode = res.mitemCode;
    stockInData.value.supplierCode = res.supplierCode;
    stockInData.value.minPkgQty = res.minPkgQty;
  }
};
const onNumberChange = async () => {
  const { minPkgQty } = stockInData.value;
  const { thisNumber } = stockInData.value;

  // 检查是否需要生成标签
  if (!Number(minPkgQty) || !Number(thisNumber)) {
    stockInData.value.createNumber = 0;
    return;
  }
  // 检查是否需要生成标签
  if (!minPkgQty || !thisNumber) {
    stockInData.value.createNumber = 0;
    return;
  }

  // 计算生成标签的数量
  const quotient = Math.floor(thisNumber / minPkgQty);
  const remainder = thisNumber % minPkgQty;
  stockInData.value.createNumber = remainder === 0 ? quotient : quotient + 1;
};
// 补打，作废 DiaLog 数据
const reprintDialog = ref({
  reprintData: '',
  restsData: '',
  labelNo: '',
  labelId: '',
  splitNum: '',
  qty: 0,
});

const onClose = () => {
  formVisible.value = false;
};

// 定义外部变量 isSuccess
let isSuccess = true;

// 点击 打印事件
const onPrintManager = async () => {
  try {
    if (reprintDialog.value.reprintData === '其他原因' && !reprintDialog.value.restsData) {
      MessagePlugin.warning('请补充必填信息！');
      isSuccess = false; // 设置失败标志
      return isSuccess; // 返回失败标志
    }
    let reason = '';
    if (reprintDialog.value.restsData) {
      reason = reprintDialog.value.restsData;
    } else {
      reason = reprintDialog.value.reprintData;
    }

    if (!reason) {
      MessagePlugin.warning('请补充必填信息！');
      isSuccess = false; // 设置失败标志
      return isSuccess; // 返回失败标志
    }

    printManagerData.value = [];
    pageLoading.value = true;
    const printDatas = [];
    selectedManageRowKeys.value.forEach((id) => {
      const foundItem = pkgManageDataList.list.find((item) => item.id === id);
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
        MITEM_DESC: foundItem.mitemDesc,
        ...excItem,
      };

      printDatas.push(DataBase);

      // 多个对象则打印多页
      // printManagerData.value.push({
      //   variable: DataBase,
      //   dataSource: { DataBase },
      // });
    });

    printManagerData.value.push({
      variable: printDatas,
      dataSource: printDatas,
    });

    await apiMain.label.reprintBarcode({
      ids: selectedManageRowKeys.value,
      reason,
      printTempId: printMode.value.printTempId,
    });
    MessagePlugin.success('补打成功');

    selectedManageRowKeys.value = [];
    onRefreshManage();
    formVisible.value = false;
    return true; // 打印成功时返回 true
  } catch (e) {
    console.log(e);
    isSuccess = false;
    return false; // 打印失败时返回 false
  } finally {
    pageLoading.value = false;
  }
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
      console.log('foundItem', foundItem);
      if (barcodeType.value === 0) {
        // 打印原材料条码
        const DataBase = {
          LABEL_NO: foundItem.labelNo,
          QTY: foundItem.balanceQty,
          LOT_NO: foundItem.lotNo,
          C_INV_STD: foundItem.mitemName,
          BATCH_NO: foundItem.batchNo,
          SUPPLIER_NAME: foundItem.supplierName,
          SUPPLIER_CODE: foundItem.supplierCode,
          MITEM_CODE: foundItem.mitemCode,
          MITEM_DESC: foundItem.mitemDesc,
          SUPPLIER_LOT_NO: foundItem.supplierLotNo,
          ...excItem,
        };
        printDatas.push(DataBase);
      } else {
        // 打印配送卡条码
        const DataBase = {
          DELIVERY_CARD_NO: foundItem.labelNo,
          TIME_CREATE: foundItem.timeCreate,
          PRINT_SEQ: foundItem.printSeq,
          QTY: foundItem.qty,
          MITEM_CODE: foundItem.mitemCode,
          MITEM_NAME: foundItem.mitemName,
          SCHE_CODE: foundItem.scheCode,
          WC_NAME: foundItem.workcenterName,
          DATETIME_SCHE: dateTimeManufacture.value ? dateTimeManufacture.value : dayjs().format('YYYY-MM-DD'),
          ORG_NAME: foundItem.orgName,
          BATCH_NO: foundItem.lotNo,
          ...excItem,
        };
        printDatas.push(DataBase);
      }

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
    if (barcodeType.value === 0) {
      // 打印原材料条码
      await apiMain.label.printBarcode({
        ids: selectedStockIneRowKeys.value,
        printTempId: printMode.value.printTempId,
      });
    } else {
      // 打印配送卡条码
      await apiMain.deliveryCard.printBarcode({ ids: selectedStockIneRowKeys.value });
    }

    MessagePlugin.success('打印成功');

    selectedStockIneRowKeys.value = [];
    onRefreshStockIn();
    formVisible.value = false;
    return true; // 打印成功时返回 true
  } catch (e) {
    console.log(e);
    isSuccess = false;
    return false; // 打印失败时返回 false
  } finally {
    pageLoading.value = false;
  }
};
// 补打，作废确定
const onConfirm = async () => {
  if (reprintDialog.value.reprintData === '其他原因' && !reprintDialog.value.restsData) {
    MessagePlugin.warning('请补充必填信息！');
    return false;
  }
  let reason = '';
  if (reprintDialog.value.restsData) {
    reason = reprintDialog.value.restsData;
  } else {
    reason = reprintDialog.value.reprintData;
  }

  if (!reason) {
    MessagePlugin.warning('请补充必填信息！');
    return false;
  }

  try {
    pageLoading.value = true;
    if (isReprintCancellation.value === 1) {
      await apiMain.label.reprintBarcode({
        ids: selectedManageRowKeys.value,
        reason,
        printTempId: printMode.value.printTempId,
      });
      selectedManageRowKeys.value = [];
      isEnable.value = true;
      MessagePlugin.success('补打成功');
      onRefreshManage();
    } else if (isReprintCancellation.value === 3) {
      const intValue = parseInt(reprintDialog.value.splitNum, 10);
      if (!Number.isInteger(intValue) || intValue === 0 || intValue > reprintDialog.value.qty) {
        MessagePlugin.warning(`拆分数量需为小于${reprintDialog.value.qty}的正整数`);
        return false;
      }
      await apiMain.label.splitBarcode({
        labelId: reprintDialog.value.labelId,
        splitNum: intValue,
        printTempId: printMode.value.printTempId,
        reason,
      });
      selectedManageRowKeys.value = [];
      isEnable.value = true;
      MessagePlugin.success('拆分成功');
      onRefreshManage();
    } else {
      await apiMain.label.cancellationBarcode({
        ids: selectedManageRowKeys.value,
        reason,
      });
      selectedManageRowKeys.value = [];
      isEnable.value = true;
      MessagePlugin.success('作废成功');
      onRefreshManage();
    }

    await fetchBracodeManageTable(); // 刷新表格数据
    formVisible.value = false;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    pageLoading.value = false;
  }
};

const totalDay = ref(0);
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
// 管理上方查询初始化
const manageQueryCondition = ref({
  mitemId: '',
  supplierId: '',
  lineSeq: null,
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
const tagValue = ref(1);
const onSelectStockIn = (value: any) => {
  selectedStockIneRowKeys.value = value;
  printStockInButtonOp.value = !(selectedStockIneRowKeys?.value?.length > 0);
};
// 补打 点击事件
const reprintVoidSwitch = ref(1); // 控制

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
const onRefreshManage = async () => {
  try {
    loading.value = true;
    manageQueryCondition.value.pageNum = pageUIMannage.value.page;
    manageQueryCondition.value.pageSize = pageUIMannage.value.rows;
    apiWarehouse.label.getLabelManageList(manageQueryCondition.value).then((data) => {
      pkgManageDataList.list = data.list;
      barcodeTotal.value = data.total;
    });
    selectedManageRowKeys.value = [];
    isEnable.value = true;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
// # 条码标签刷新按钮
const onRefreshStockIn = async () => {
  try {
    loading.value = true;

    // 标签
    if (barcodeType.value === 0) {
      const data = await apiMain.label.getStockInLabelList({
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
  } finally {
    loading.value = false;
  }
};
const logNodeCode = ref(null);

// 日志界面 表格数据
const logInterface: PrimaryTableCol<TableRowData>[] = [
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
    colKey: 'qty',
    title: '数量',
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
    colKey: 'creatorName',
    title: '操作人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '操作时间',
    align: 'center',
    width: '180',
  },
];

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
    fetchMoTable();
    onRefreshBelow();
  } else {
    onRefreshStockIn();
  }
};
// 右表格数据刷新
const onRightFetchData = async () => {
  const res = await apiMain.label.getLabelLog({
    labelNo: logNodeCode.value,
    pageNum: pageUIDay.value.page,
    pageSize: pageUIDay.value.rows,
  });
  dayTabData.list = res.list;
  totalDay.value = res.total;
};

// 加载工单数据表格
const fetchMoTable = async () => {};

// 加载条码管理数据表格
const fetchBracodeManageTable = async () => {
  setLoading(true);
  try {
    manageQueryCondition.value.pageNum = pageUIMannage.value.page;
    manageQueryCondition.value.pageSize = pageUIMannage.value.rows;
    const data = (await apiWarehouse.label.getLabelManageList(manageQueryCondition.value)) as any;
    const { list } = data;
    pkgManageDataList.list = list;
    pkgManageTabTotal.value = data.total;
    if (
      data.total !== 0 &&
      pkgManageTabTotal.value < pageUIMannage.value.page * pageUIMannage.value.rows &&
      data.list &&
      data.list.length === 0
    ) {
      pageUIMannage.value.page = 1;
      pageUIMannage.value.rows = 10;
      onRefreshManage();
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// moCode: '',
//   mitemCode: '',
//   moStatus: '',
//   datetimePlanStart: '',
//   workshopCode: '',
//   workCenterCode: '',
//   onlyDisplayCreated: true,

// // 查询组件
// const stockInOpts = computed(() => {
//   return {
//     supplierId: {
//       label: '供应商',
//       comp: 'bcmp-select-business',
//       event: 'business',
//       defaultVal: '',
//       bind: {
//         type: 'supplier',
//         showTitle: false,
//       },
//     },
//     mitemId: {
//       label: '物料',
//       comp: 'bcmp-select-business',
//       event: 'business',
//       defaultVal: '',
//       bind: {
//         type: 'mitem',
//         showTitle: false,
//       },
//     },
//     barcodeStatus: {
//       label: '条码状态',
//       event: 'input',
//       defaultVal: '',
//       slotName: 'querySelect',
//     },
//     barcode: {
//       label: '条码',
//       comp: 't-input',
//       defaultVal: '',
//     },
//     billNo: {
//       label: '送货单',
//       comp: 't-input',
//       defaultVal: '',
//     },
//     lineSeq: {
//       label: '送货单行号',
//       comp: 't-input',
//       defaultVal: '',
//     },
//   };
// });

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
  await fetchMoTable(); // 获取 物料编码 表格数据
  await onBracodeRulesData(); // 获取 条码模板下拉数据
  await onPrintTemplateData(); // 获取 打印模板下拉数据
  await onReprintSelextData(); // 获取补打原因列表
  await onsplitelextData(); // 获取拆分原因列表
  await onCancellationSelextData(); // 获取作废原因列表
});
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  // margin-top: 20px;
}
</style>
