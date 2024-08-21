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
        <t-tab-panel :value="0" label="来料标签打印" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="false" :full-sub-index="[0, 1]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <!-- 查询组件  -->
                <cmp-query :opts="opts" label-width="100" @submit="conditionEnter"></cmp-query>
              </cmp-card>
              <cmp-card :ghost="true">
                <cmp-table
                  key="mainTable"
                  v-model:pagination="pageUI"
                  row-key="deliveryDtlId"
                  :table-column="groupColumns"
                  :table-data="deliveryList.list"
                  :loading="loading"
                  :total="moTabTotal"
                  :fixed-height="true"
                  max-height="300px"
                  :hover="true"
                  :selected-row-keys="delivertRowKeys"
                  @select-change="onSelectionChange"
                  @row-click="onRowClick"
                  @refresh="onRefresh"
                >
                  <template #title> 送货单列表 </template>
                  <template #lotNoOp="slotProps">
                    <t-input
                      v-if="slotProps.row.deliveryDtlId === printMode.deliveryDtlId"
                      v-model="printMode.lotNo"
                      :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
                    ></t-input>
                  </template>
                  <template #button>
                    <t-radio v-model="queryCondition.isFinishDisplay" allow-uncheck @change="fetchMoTable"
                      >仅显示未打印完成</t-radio
                    >
                    <t-select v-model="printMode.barcodeRuleId" label="条码规则" style="width: 240px">
                      <t-option
                        v-for="item in onBracodeRulesList?.list"
                        :key="item.id"
                        :label="item.ruleName"
                        :value="item.id"
                      />
                    </t-select>
                    <t-button theme="primary" @click="generateBracode"> 生成 </t-button>
                  </template>
                </cmp-table>
              </cmp-card>

              <cmp-card :ghost="true">
                <cmp-table
                  v-model:pagination="pageUIBracode"
                  row-key="id"
                  :loading="loading"
                  class="son-table"
                  select-on-row-click
                  :selected-row-keys="selectedRowKeys"
                  :table-column="barcodeColumns"
                  :table-data="labelBelowList.list"
                  :total="barcodeTotal"
                  :fixed-height="true"
                  max-height="300px"
                  @select-change="onPrintChange"
                  @refresh="onRefreshBelow"
                >
                  <template #title> 条码列表 </template>
                  <template #button>
                    <t-radio v-model="queryBelowCondition.isCreated" allow-uncheck @change="onRefreshBelow"
                      >仅显示已生成</t-radio
                    >
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
                      :disabled="printButtonOp"
                      :data="printData"
                      :show-icon="false"
                      @before-print="onPrint"
                      >打印</cmp-print-button
                    >
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
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
        <t-tab-panel :value="2" label="物料标签管理" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <cmp-query
                ref="mitemBarcodeManageRef"
                :opts="mitemBarcodeManageOp"
                label-width="100"
                @submit="managePageSearchClick"
              >
                <template #querySelect="{ param }">
                  <t-select v-model="param.barcodeStatus" label="条码状态" clearable>
                    <t-option
                      v-for="item in bracodeStatusOption"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </t-select> </template
              ></cmp-query>
              <cmp-card ghost class="padding-top-line-16">
                <cmp-table
                  v-model:pagination="pageUIMannage"
                  row-key="id"
                  select-on-row-click
                  :selected-row-keys="selectedManageRowKeys"
                  :loading="loading"
                  :table-column="pkgBarcodeManageColumns"
                  :table-data="pkgManageDataList.list"
                  :total="pkgManageTabTotal"
                  :fixed-height="true"
                  @select-change="onProductRightFetchData"
                  @refresh="onRefreshManage"
                >
                  <template #title> 条码列表 </template>
                  <template #button>
                    <t-select v-model="printMode.printTempId" style="width: 240px" label="打印模板">
                      <t-option
                        v-for="item in onPrintTemplateList.list"
                        :key="item.id"
                        :label="item.tmplName"
                        :value="item.id"
                      />
                    </t-select>
                    <t-button theme="primary" :disabled="isEnable" @click="onReprint"> 补打 </t-button>
                    <t-button theme="default" :disabled="isEnable" @click="onCancellation"> 作废 </t-button>
                    <t-button theme="default" :disabled="isEnable" @click="onSplit"> 拆分 </t-button>
                  </template>
                  <template #operations="{ row }">
                    <t-link theme="primary" @click.stop="openLog(row)"> 日志 </t-link>
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
import CmpTable from '@/components/cmp-table/index.vue';
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
      await apiMain.label.generateBarcodeStockIn(stockInData.value);
      MessagePlugin.success('生成成功');
      onRefreshStockIn();
    } catch (e) {
      console.log(e);
    } finally {
      pageLoading.value = false;
    }
  }
};
const printData = ref([]);
const printStockInData = ref([]);
const printManagerData = ref([]);
const mitemBarcodeManageRef = ref(null);
const componetRef = ref(null);
const pageLoading = ref(false);
const isMySelf = ref(true);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const stockInRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIBracode } = usePage(); // 分页工具
const { pageUI: pageUIMannage } = usePage(); // 分页工具
const { pageUI: pageUIDay } = usePage(); // 分页工具
const { pageUI: pageUIStockIn } = usePage(); // 分页工具
// $打印上 表格数据
const deliveryList = reactive({ list: [] });
// $打印上 表格数据
const labelBelowList = reactive({ list: [] });
const stockInDataList = reactive({ list: [] });
const moTabTotal = ref(0);
const stockInTabTotal = ref(0);
// $管理上 表格数据
const pkgManageDataList = reactive({ list: [] });
const pkgManageTabTotal = ref(0);
const barcodeTotal = ref(0);
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const buttonSwitch = ref(''); // 确认按钮title
const logInterfaceVisible = ref(false); // 控制日志 Dialog 显示隐藏
const printButtonOp = ref(true); // 控制打印按钮禁用
const printStockInButtonOp = ref(true); // 控制打印按钮禁用
const isEnable = ref(true); // 控制打印按钮禁用
// 日志界面 表格数据
const dayTabData = reactive({ list: [] });
const selectedRowKeys: Ref<any[]> = ref([]); // 打印数组
const delivertRowKeys: Ref<any[]> = ref([]); // 工单表数组
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
const onPrint = async () => {
  try {
    // 打印模板校验
    if (!printMode.value.printTempId) {
      // 提示错误信息
      MessagePlugin.warning('请选择打印模板！');
      isSuccess = false; // 设置失败标志
      return isSuccess; // 返回失败标志
    }

    printData.value = [];
    pageLoading.value = true;

    const delivery = deliveryList.list.find((item) => item.deliveryDtlId === printMode.value.deliveryDtlId);
    selectedRowKeys.value.forEach((id) => {
      const foundItem = labelBelowList.list.find((item) => item.id === id);
      const DataBase = {
        LABEL_NO: foundItem.labelNo,
        QTY: foundItem.balanceQty,
        LOT_NO: foundItem.lotNo,
        C_INV_STD: delivery.mitemName,
        BATCH_NO: foundItem.batchNo,
        SUPPLIER_NAME: delivery.supplierName,
        SUPPLIER_CODE: delivery.supplierCode,
        MITEM_CODE: delivery.mitemCode,
        MITEM_DESC: delivery.mitemDesc,
      };
      printData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await apiMain.label.printBarcode({ ids: selectedRowKeys.value, printTempId: printMode.value.printTempId });

    onRefreshBelow();
    onRefresh();
    MessagePlugin.success('打印成功');
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

    selectedManageRowKeys.value.forEach((id) => {
      const foundItem = pkgManageDataList.list.find((item) => item.id === id);
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
      };
      printManagerData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
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

    selectedStockIneRowKeys.value.forEach((id) => {
      const foundItem = stockInDataList.list.find((item) => item.id === id);
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
      };
      printStockInData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await apiMain.label.printBarcode({
      ids: selectedStockIneRowKeys.value,
      printTempId: printMode.value.printTempId,
    });
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

// 打印选择 框 行 事件
const onPrintChange = (value: any, context: any) => {
  console.log(value);
  selectedRowKeys.value = value;
  barcodeStatusNameArr.value = context.selectedRowData.map((item: any) => item.barcodeStatusName);
  const specificStatus = barcodeStatusNameArr.value.some((item) => item !== '已生成');
  if (specificStatus) {
    printButtonOp.value = true;
    return;
  }
  printButtonOp.value = !(selectedRowKeys?.value?.length > 0);
};

// 打印选择 框 行 事件
const onSelectionChange = (selectedRows) => {
  delivertRowKeys.value = selectedRows;
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  const [firstItem] = selectedRows;
  printMode.value.deliveryDtlId = firstItem;
  queryBelowCondition.value.deliveryDtlId = firstItem;
  apiMain.label.getLabelList(queryBelowCondition.value).then((data) => {
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
  deliveryDtlId: '',
  generalQty: 0,
  planQty: 0,
  lotNo: '',
});

// 生成按钮模型初始化
const generateBracode = async () => {
  if (!printMode.value.deliveryDtlId) {
    // 提示错误信息
    MessagePlugin.warning('请选择送货单！');
    return;
  }
  // 校验是否已经选择条码规则
  if (!printMode.value.lotNo) {
    // 提示错误信息
    MessagePlugin.warning('请输入批次号');
    return;
  }
  // 校验是否已经选择条码规则
  if (!printMode.value.barcodeRuleId) {
    // 提示错误信息
    MessagePlugin.warning('请选择条码规则！');
    return;
  }
  try {
    pageLoading.value = true;
    await apiWarehouse.label.generateBarcode(printMode.value);
    MessagePlugin.success('生成成功');
    // 延时几百毫秒后执行刷新操作
    onRefreshBelow();
    onRefresh();
  } catch (e) {
    console.log(e);
  } finally {
    pageLoading.value = false;
  }
};

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
const tagValue = ref(0);
const barcodeStatusNameArr = ref([]);
const onProductRightFetchData = (value: any, context: any) => {
  selectedManageRowKeys.value = value;
  isEnable.value = !(selectedManageRowKeys?.value?.length > 0);
  reprintDialog.value.labelNo = context.selectedRowData[0].labelNo;
  reprintDialog.value.qty = context.selectedRowData[0].qty;
  reprintDialog.value.labelId = context.selectedRowData[0].id;
  barcodeStatusNameArr.value = context.selectedRowData.map((item: any) => item.barcodeStatusName);
};
const onSelectStockIn = (value: any) => {
  selectedStockIneRowKeys.value = value;
  printStockInButtonOp.value = !(selectedStockIneRowKeys?.value?.length > 0);
};
// 补打 点击事件
const reprintVoidSwitch = ref(1); // 控制
const onReprint = () => {
  console.log('1111111111');
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
  const rowStatus = selectedManageRowKeys?.value?.length > 1;
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
    await apiMain.label
      .getStockInLabelList({
        isMySelf: isMySelf.value,
        pageSize: pageUIStockIn.value.rows,
        pageNum: pageUIStockIn.value.page,
      })
      .then((data) => {
        stockInDataList.list = data.list;
        stockInTabTotal.value = data.total;
      });
    selectedStockIneRowKeys.value = [];
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
const logNodeCode = ref(null);
// 日志 点击 事件
const openLog = async (row: any) => {
  logNodeCode.value = row.labelNo;
  console.log(row.value);
  logInterfaceVisible.value = true; // 控制界面显示隐藏
  const res = await apiMain.label.getLabelLog({
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
  const res = await apiMain.label.getLabelBarcodeRuleList();
  onBracodeRulesList.list = res;
};
// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  const res = await apiMain.label.getLabelPrintTmplList();
  onPrintTemplateList.list = res;
};
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

// #### 条码规则 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'single',
  //   align: 'center',
  //   width: '30',
  // },
  {
    colKey: 'billNo',
    title: '送货单',
    align: 'center',
    width: '200',
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
    colKey: 'lineSeq',
    title: '行号',
    align: 'center',
    width: '60',
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
    colKey: 'lotNoOp',
    title: '批次号',
    align: 'center',
    width: '160',
    // edit: {
    //   component: Input,
    //   props: {
    //     clearable: true,
    //     autofocus: true,
    //
    //     style: {
    //       width: '130px', // 调整宽度的样式属性
    //     },
    //   },
    //   rules: [{ required: true, message: '不能为空' }],
    //   // keepEditMode: true,
    //   showEditIcon: true,
    //   validateTrigger: 'change',
    //   abortEditOnEvent: ['onBlur'],
    //   // 编辑完成，退出编辑态后触发
    //   onEdited: (context) => {
    //     deliveryList.list[context?.rowIndex] = context?.newRowData;
    //     printMode.value.lotNo = deliveryList.list[context?.rowIndex].lotNo; // 变化后的数字
    //   },
    // },
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
    colKey: 'dataDelivery',
    title: '送货日期',
    align: 'center',
    width: '180',
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
    colKey: 'creatorName',
    title: '生成人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'timeCreate',
    title: '生成时间',
    align: 'center',
    width: '180',
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
    title: '初始数量',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'balanceQty',
    title: '结余数量',
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
// 打印界面点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
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
  if (data.lineSeq && !Number(data.lineSeq)) {
    MessagePlugin.warning('送货单行号须为正整数');
    return;
  }
  pageUI.value.page = 1;
  const [timeCreatedStart, timeCreatedEnd] = data.timeCreatedRange;
  manageQueryCondition.value.timeCreatedStart = timeCreatedStart;
  manageQueryCondition.value.timeCreatedEnd = timeCreatedEnd;
  manageQueryCondition.value.barcode = data.barcode;
  manageQueryCondition.value.lineSeq = data.lineSeq;
  manageQueryCondition.value.barcodeStatus = data.barcodeStatus;
  manageQueryCondition.value.billNo = data.billNo;
  manageQueryCondition.value.mitemId = data.mitemId;
  manageQueryCondition.value.supplierId = data.supplierId;
  selectedManageRowKeys.value = [];
  isEnable.value = true;
  fetchBracodeManageTable();
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
const fetchMoTable = async () => {
  setLoading(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await apiWarehouse.label.getDeliveryList(queryCondition.value)) as any;
    const { list } = data;
    deliveryList.list = list;
    moTabTotal.value = data.total;
    if (
      data.total !== 0 &&
      moTabTotal.value < pageUI.value.page * pageUI.value.rows &&
      data.list &&
      data.list.length === 0
    ) {
      pageUI.value.page = 1;
      pageUI.value.rows = 10;
      onRefresh();
    }
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

// 查询组件
const opts = computed(() => {
  return {
    datetimePlanRange: {
      label: '送货日期',
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
    billNo: {
      label: '送货单',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

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
      event: 'input',
      defaultVal: '',
      slotName: 'querySelect',
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
    lineSeq: {
      label: '送货单行号',
      comp: 't-input',
      defaultVal: '',
    },
  };
});
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

const onRowClick = ({ row }) => {
  if (row.deliveryDtlId !== printMode.value.deliveryDtlId) {
    printMode.value.lotNo = '';
  }
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  queryBelowCondition.value.deliveryDtlId = row.deliveryDtlId;
  printMode.value.deliveryDtlId = row.deliveryDtlId;
  delivertRowKeys.value = [];
  delivertRowKeys.value.push(row.deliveryDtlId);
  apiMain.label.getLabelList(queryBelowCondition.value).then((data) => {
    labelBelowList.list = data.list;
    barcodeTotal.value = data.total;
  });
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  // margin-top: 20px;
}
</style>
