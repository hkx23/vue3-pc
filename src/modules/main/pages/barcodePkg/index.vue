<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab">
      <!-- ################# 工单 表格数据 ###################### -->

      <t-tabs v-model="tagValue" @change="switchTab">
        <t-tab-panel :value="0" label="包装标签打印" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <!-- 查询组件  -->
                <cmp-query :opts="opts" label-width="100" @submit="conditionEnter" />
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16 padding-bottom-line-16">
                <cmp-table
                  v-model:pagination="pageUI"
                  row-key="moScheduleId"
                  :table-column="groupColumns"
                  :table-data="moDataList.list"
                  :loading="loading"
                  :total="moTabTotal"
                  :selected-row-keys="moscheRowKeys"
                  :fixed-height="true"
                  max-height="300"
                  @select-change="onSelectionChange"
                  @row-click="onRowClick"
                  @refresh="onRefresh"
                >
                  <template #title> 工单列表 </template>
                </cmp-table>
              </cmp-card>

              <cmp-card :ghost="true" class="padding-top-noline-16 left-tab">
                <!-- $$$$$$$$$$$    包装页签  $$$$$$$$$$$$$$-->
                <t-tabs v-model="tabValue" placement="left" @change="handleTabClick">
                  <t-tab-panel
                    v-for="(tab, index) in tabList.list"
                    :key="index"
                    :value="tab.packLevel"
                    :label="tab.packTypeTagName"
                    :destroy-on-hide="false"
                    style="padding-top: 0"
                  >
                    <t-row>
                      <t-col :span="6">
                        <t-space>
                          <span>计划打印数 / 已生成数 / 打印数：</span>
                          <span>{{ dataSummary }}</span>
                        </t-space>
                      </t-col>
                      <t-col :span="6">
                        <t-space>
                          <span>包装规格：</span>
                          <span>{{ printMode.packQtyShow }}</span>
                        </t-space>
                      </t-col>
                    </t-row>
                    <t-row style="margin-top: 8px">
                      <t-col :span="12">
                        <t-row class="item-row" :gutter="[8, 8]" style="width: 100%">
                          <t-col flex="250px">
                            <t-select v-model="printMode.barcodeRuleId" label="条码规则">
                              <t-option
                                v-for="item in onPrintRulesList.list"
                                :key="item.id"
                                :label="item.ruleName"
                                :value="item.id"
                              />
                            </t-select>
                          </t-col>
                          <t-col flex="250px">
                            <t-input-number
                              v-model="printMode.createPDNum"
                              theme="column"
                              style="width: 100%"
                              label="本次生成数(产品数)"
                              @change="onCreateChange"
                            />
                          </t-col>
                          <t-col flex="250px">
                            <t-input-number
                              v-model="printMode.createNum"
                              theme="column"
                              style="width: 100%"
                              label="本次生成数(张数)"
                              placeholder=""
                              :disabled="true"
                            />
                          </t-col>
                        </t-row>
                        <t-row class="item-row" :gutter="[8, 8]" style="width: 100%; margin-top: 8px">
                          <t-col flex="0 1 230px" style="text-align: start">
                            <t-button :disabled="generateButtonOp" @click="generateBracode">生成</t-button>
                          </t-col>
                        </t-row>
                      </t-col>
                    </t-row>
                  </t-tab-panel>
                </t-tabs>
                <cmp-card header="" header-bordered class="padding-top-noline-16 no-h-padding-card">
                  <cmp-table
                    v-model:pagination="pageUIBracode"
                    row-key="barcodePkgId"
                    :loading="loading"
                    select-on-row-click
                    class="son-table"
                    :selected-row-keys="selectedRowKeys"
                    :table-column="barcodeColumns"
                    :table-data="moBelowList.list"
                    :total="barcodeTotal"
                    :fixed-height="true"
                    max-height="300"
                    @select-change="onPrintChange"
                    @refresh="onRefreshBelow"
                  >
                    <template #title> 条码列表 </template>
                    <template #button>
                      <t-space :size="8">
                        <t-radio
                          v-model="queryBelowCondition.isCreated"
                          style="line-height: 32px"
                          allow-uncheck
                          @change="onRefreshBelow"
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
                      </t-space>
                    </template>
                  </cmp-table>
                </cmp-card>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <t-tab-panel :value="1" label="包装标签管理" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <!-- 查询组件  -->
                <cmp-query :opts="pkgBarcodeManageOp" label-width="100" @submit="managePageSearchClick" />
              </cmp-card>

              <cmp-table
                v-model:pagination="pageUIMannage"
                class="padding-top-noline-16"
                row-key="barcodePkgId"
                :selected-row-keys="selectedManageRowKeys"
                :loading="loading"
                :table-column="pkgBarcodeManageColumns"
                :table-data="pkgManageDataList.list"
                :total="pkgManageTabTotal"
                select-on-row-click
                :fixed-height="true"
                @select-change="onProductRightFetchData"
                @refresh="onRefresh"
              >
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
                  <t-button theme="default"> 导出 </t-button>
                </template>
                <template #operations="{ row }">
                  <t-link theme="primary" @click.stop="openLog(row)"> 日志 </t-link>
                </template>
              </cmp-table>
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
        <t-button theme="default" @click="formVisible = false"> 关闭 </t-button>
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
  <t-loading :loading="pageLoading" text="加载中..." fullscreen />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ComputedRef, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { loading, setLoading } = useLoading();
const pageLoading = ref(false);
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIBracode } = usePage(); // 分页工具
const { pageUI: pageUIMannage } = usePage(); // 分页工具
const { pageUI: pageUIDay } = usePage(); // 分页工具
const printData = ref([]);
const printManagerData = ref([]);
// $打印上 表格数据
const moDataList = reactive({ list: [] });
// $打印上 表格数据
const moBelowList = reactive({ list: [] });
const moTabTotal = ref(0);
const offsetButton = ref(0);
// $管理上 表格数据
const pkgManageDataList = reactive({ list: [] });
const pkgManageTabTotal = ref(0);
const barcodeTotal = ref(0);
const dataSummary = ref('0/0/0');
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const buttonSwitch = ref(''); // 确认按钮title
const logInterfaceVisible = ref(false); // 控制日志 Dialog 显示隐藏
const printButtonOp = ref(true); // 控制打印按钮禁用
const generateButtonOp = ref(true); // 控制打印按钮禁用
const isEnable = ref(true); // 控制打印按钮禁用
// 日志界面 表格数据
const dayTabData = reactive({ list: [] });
const selectedRowKeys: Ref<any[]> = ref([]); // 打印数组
const moscheRowKeys: Ref<any[]> = ref([]); // 工单表数组
const selectedManageRowKeys: Ref<any[]> = ref([]); // 打印数组
const isReprintCancellation = ref(false);
// 表单校验
const rules: ComputedRef<FormRules> = computed(() => {
  return {
    reprintData: [{ required: true, trigger: 'change' }],
    restsData: [{ required: true, trigger: 'blur' }],
  };
});
// 补打，作废 DiaLog 数据
const reprintDialog = ref({
  reprintData: '',
  restsData: '',
});
// 点击 打印事件
const onPrint = async () => {
  // 校验是否已经选择条码规则
  if (!printMode.value.printTempId) {
    // 提示错误信息
    MessagePlugin.warning('请选择打印模板！');
    return false;
  }
  try {
    pageLoading.value = true;
    printData.value = [];
    selectedRowKeys.value.forEach((barcodePkgId) => {
      const foundItem = moBelowList.list.find((item) => item.barcodePkgId === barcodePkgId);
      const DataBase = {
        PKG_BARCODE: foundItem.pkgBarcode,
        QTY: foundItem.qty,
        MITEM_CODE: curRow.value.mitemCode,
        MITEM_NAME: curRow.value.mitemName,
      };
      printData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await api.barcodePkg.printBarcode({ ids: selectedRowKeys.value });
    MessagePlugin.success('打印成功');
    onRefreshTag();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    pageLoading.value = false;
  }
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
    pageLoading.value = true;

    selectedManageRowKeys.value.forEach((barcodePkgId) => {
      const foundItem = pkgManageDataList.list.find((item) => item.barcodePkgId === barcodePkgId);
      const DataBase = {
        PKG_BARCODE: foundItem.pkgBarcode,
        QTY: foundItem.qty,
        MITEM_CODE: foundItem.mitemCode,
        MITEM_NAME: foundItem.mitemName,
      };
      printManagerData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await api.barcodePkg.reprintBarcode({
      ids: selectedManageRowKeys.value,
      reason,
    });
    MessagePlugin.success('补打成功');

    selectedManageRowKeys.value = [];
    onRefresh();
    formVisible.value = false;
    return true; // 打印成功时返回 true
  } catch (e) {
    console.log(e);
    return false; // 打印失败时返回 false
  } finally {
    pageLoading.value = false;
  }
};
// 补打，作废确定
const onConfirm = async () => {
  if (reprintDialog.value.reprintData === '其他原因' && !reprintDialog.value.restsData) {
    MessagePlugin.warning('请补充必填信息！');
    return;
  }
  let reason = '';
  if (reprintDialog.value.restsData) {
    reason = reprintDialog.value.restsData;
  } else {
    reason = reprintDialog.value.reprintData;
  }
  if (!reason) {
    MessagePlugin.warning('请补充必填信息！');
    return;
  }
  try {
    pageLoading.value = true;
    if (isReprintCancellation.value) {
      await api.barcodePkg.reprintBarcode({
        ids: selectedManageRowKeys.value,
        reason,
      });
      selectedManageRowKeys.value = [];
      MessagePlugin.success('补打成功');
    } else {
      await api.barcodePkg.cancellationBarcode({
        ids: selectedManageRowKeys.value,
        reason,
      });
      await fetchBracodeManageTable(); // 刷新表格数据
      MessagePlugin.success('作废成功');
    }
  } catch (e) {
    console.log(e);
  } finally {
    pageLoading.value = false;
  }

  await fetchBracodeManageTable(); // 刷新表格数据
  formVisible.value = false;
};
// // 本次生成产品数求生成张数
// const onComplementation = (value: any) => {
//   selectedRowKeys.value = value;
//   printButtonOp.value = !(selectedRowKeys.value.length > 0);
// };

// 打印选择 框 行 事件
const onPrintChange = (value: any) => {
  selectedRowKeys.value = value;
  printButtonOp.value = !(selectedRowKeys.value.length > 0);
};

const onCreateChange = () => {
  const { createPDNum } = printMode.value;
  const { packQty } = printMode.value;
  printMode.value.createNum = Math.ceil(createPDNum / packQty);
};
// 打印选择 框 行 事件
const onSelectionChange = (selectedRows) => {
  moscheRowKeys.value = selectedRows;
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  const [firstItem] = selectedRows;
  curRow.value = moDataList.list.find((item) => item.moScheduleId === firstItem);
  printMode.value.moScheduleId = firstItem;
  queryBelowCondition.value.moScheduleId = firstItem;
  api.barcodePkg.getTagList(queryBelowCondition.value).then((data) => {
    tabList.list = data.list;
    console.log(tabList.list);
    handleTabClick(1);
    tabValue.value = 1;
  });
};

const totalDay = ref(0);
// 打印按钮模型初始化
const printMode = ref({
  barcodeRuleId: '',
  printTempId: '',
  createNum: 0,
  packQty: 0,
  createPDNum: 0,
  maxCreate: 0,
  packQtyShow: '',
  packType: '',
  moScheduleId: '',
  generateQty: 0,
  planQty: 0,
});

// 生成按钮模型初始化
const generateBracode = async () => {
  const residueQty = printMode.value.planQty - printMode.value.generateQty;
  console.log(residueQty);
  if (printMode.value.maxCreate <= 0) {
    MessagePlugin.warning('剩余生成数量为0');
    return;
  }

  if (!Number.isInteger(printMode.value.createPDNum) || printMode.value.createPDNum > residueQty) {
    // 提示错误信息
    MessagePlugin.warning(`本次生成数量需要为小于剩余生成数${residueQty}的正整数`);
    return;
  }

  // 校验规格数量是否为正整数
  if (printMode.value.createPDNum <= 0) {
    // 提示错误信息
    MessagePlugin.warning(`本次生成数量需为正整数`);
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
    await api.barcodePkg.generateBarcode({
      ...printMode.value,
      createNum: printMode.value.createNum,
    });
    MessagePlugin.success('生成成功');
    onRefreshTag();
  } catch (e) {
    console.log(e);
  } finally {
    pageLoading.value = false;
  }
};

// 打印上方查询初始化
const queryCondition = ref({
  moId: '',
  mitemId: '',
  scheStatus: '',
  planDateStart: '',
  planDateEnd: '',
  workshopId: '',
  workCenterId: '',
  pageNum: 1,
  pageSize: 10,
  moScheduleId: '',
});
// 打印下方查询初始化
const queryBelowCondition = ref({
  isCreated: true,
  pageNum: 1,
  packType: '',
  pageSize: 10,
  moScheduleId: '',
});
// 管理上方查询初始化
const manageQueryCondition = ref({
  moId: '',
  mitemId: '',
  barcodePkgStatus: '',
  barcodeType: '',
  planDateStart: '',
  createDateStart: '',
  planDateEnd: '',
  createDateEnd: '',
  workshopId: '',
  workcenterId: '',
  pkgBarcode: '',
  printTmplId: '',
  pageNum: 1,
  pageSize: 10,
});
// 包装规则查询初始化
// tab 表格?
const tabValue = ref(0);
const tagValue = ref(0);
const barcodeWipStatusNameArr = ref([]);
const moScheduleIdArr = ref([]);
const pkgBarcodeTypeArr = ref([]);
const onProductRightFetchData = (value: any, context: any) => {
  if (context.selectedRowData[0]) {
    printRuCondition.value.packType = context.selectedRowData[0].pkgBarcodeType;
    printRuCondition.value.moScheId = context.selectedRowData[0].moScheduleId;
  }
  if (context.selectedRowData) {
    const allPackTypesAreSame = context.selectedRowData.every((row, index, array) => {
      // 检查当前元素的 packType 是否与第一个元素的 packType 相同
      return row.pkgBarcodeType === array[0].pkgBarcodeType;
    });

    if (!allPackTypesAreSame) {
      printMode.value.printTempId = '';
    }
  }
  onPrintTemplateData();
  barcodeWipStatusNameArr.value = context.selectedRowData.map((item: any) => item.pkgBarcodeStatusName);
  moScheduleIdArr.value = context.selectedRowData.map((item: any) => item.moScheduleId);
  pkgBarcodeTypeArr.value = context.selectedRowData.map((item: any) => item.pkgBarcodeType);
  selectedManageRowKeys.value = value;
  isEnable.value = !(selectedManageRowKeys.value.length > 0);
};
const areAllElementsSame = (arr) => {
  // 使用 every 方法检查数组中的每个元素是否与第一个元素相同
  return arr.every((element, index, array) => element === array[0]);
};
// 补打 点击事件
const reprintVoidSwitch = ref(false); // 控制
const onReprint = () => {
  if (!printMode.value.printTempId) {
    // 提示错误信息
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  formRef.value.reset({ type: 'empty' });
  const specificStatus = barcodeWipStatusNameArr.value.some((item) => item === '已生成' || item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已生成、已报废状态，不允许补打');
    return;
  }
  // 调用 areAllElementsSame 函数检查数组中的所有元素是否相同
  const isAllElementsSameId = areAllElementsSame(moScheduleIdArr.value);
  const isAllElementsSameType = areAllElementsSame(pkgBarcodeTypeArr.value);

  if (!isAllElementsSameId) {
    MessagePlugin.warning('已选中的条码排产单不一致，不允许补打');
    return;
  }

  if (!isAllElementsSameType) {
    MessagePlugin.warning('已选中的条码包装类型不一致，不允许补打');
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
// 按钮偏移量
const calculateButtonOffset = () => {
  offsetButton.value = Math.max(0, dataSummary.value.length - 20);
};

// # 条码规则刷新按钮
const onRefresh = async () => {
  await fetchMoTable(); // 获取 条码规则表格 数据
  await fetchBracodeManageTable(); // 获取 条码管理 数据
};
const logNodeCode = ref(null);
// 日志 点击 事件
const openLog = async (row: any) => {
  logNodeCode.value = row.pkgBarcode;
  console.log(row.value);
  logInterfaceVisible.value = true; // 控制界面显示隐藏
  const res = await api.barcodePkg.getBarcodePkgLog({
    pkgBarcode: row.pkgBarcode,
    pageNum: pageUIDay.value.page,
    pageSize: pageUIDay.value.rows,
  });
  dayTabData.list = res.list;
  totalDay.value = res.total;
};
// 获取 打印规则 下拉数据
const onPrintRulesList = reactive({ list: [] });
// 打印规则查询条件
const printRuCondition = ref({
  packType: '',
  moScheId: '',
});
const onPrintRulesData = async () => {
  const res = await api.barcodePkg.getBarcodeRuleList(printRuCondition.value);
  onPrintRulesList.list = res.list;
};
// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  const res = await api.barcodePkg.getPrintTmplList(printRuCondition.value);
  onPrintTemplateList.list = res.list;
};
// 日志界面 表格数据
const logInterface: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'pkgBarcode',
    title: '条码',
    align: 'center',
    width: '180',
  },
  {
    colKey: 'pkgBarcodeStatusName',
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
    colKey: 'creatorName',
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

// #### 条码规则 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'single',
  //   align: 'center',
  //   width: '30',
  // },
  {
    colKey: 'scheCode',
    title: '排产单',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'scheStatusName',
    title: '排产单状态',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'datetimeSche',
    title: '计划生产日期',
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
    colKey: 'planQty',
    title: '计划数量',
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
    colKey: 'workshopName',
    title: '车间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
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
    colKey: 'pkgBarcode',
    title: '条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcodeStatusName',
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
    colKey: 'pkgBarcode',
    title: '条码',
    align: 'center',
    width: '180',
  },
  {
    colKey: 'pkgBarcodeTypeName',
    title: '条码类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pkgBarcodeStatusName',
    title: '条码状态',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'datetimeSche',
    title: '计划生产日期',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workshopName',
    title: '车间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'scheCode',
    title: '排产单',
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
    colKey: 'subPkgBarcodeTypeName',
    title: '子条码类型',
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
    fetchBracodeManageTable();
  } else {
    tabList.list = [];
    fetchMoTable();
  }
};
// 打印界面点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  queryCondition.value = data;
  queryCondition.value.moScheduleId = data.moScheduleId;
  queryCondition.value.scheStatus = data.scheStatus;
  const [planDateStart, planDateEnd] = data.datetimePlanRange;
  queryCondition.value.planDateStart = planDateStart;
  queryCondition.value.planDateEnd = planDateEnd;
  fetchMoTable();
};
// 管理界面点击查询按钮
const managePageSearchClick = (data: any) => {
  pageUIMannage.value.page = 1;
  manageQueryCondition.value = data;
  const [planDateStart, planDateEnd] = data.datetimePlanRange;
  const [timeCreatedStart, timeCreatedEnd] = data.timeCreatedRange;
  manageQueryCondition.value.planDateStart = planDateStart;
  manageQueryCondition.value.planDateEnd = planDateEnd;
  manageQueryCondition.value.createDateStart = timeCreatedStart;
  manageQueryCondition.value.createDateEnd = timeCreatedEnd;
  fetchBracodeManageTable();
};
// 右表格数据刷新
const onRightFetchData = async () => {
  const res = await api.barcodePkg.getBarcodePkgLog({
    pkgBarcode: logNodeCode.value,
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
    const data = (await api.barcodePkg.getMoScheduleList(queryCondition.value)) as any;
    const { list } = data;
    moDataList.list = list;
    moTabTotal.value = data.total;
    moscheRowKeys.value = [];
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
    printMode.value.printTempId = '';
    manageQueryCondition.value.pageNum = pageUIMannage.value.page;
    manageQueryCondition.value.pageSize = pageUIMannage.value.rows;
    const data = (await api.barcodePkg.getBarcodePkgManagerList(manageQueryCondition.value)) as any;
    if (data.total !== 0 && data.total < pageUI.value.page * pageUI.value.rows && data.list && data.list.length === 0) {
      pageUIMannage.value.page = 1;
      pageUIMannage.value.rows = 10;
      onRefresh();
    }
    const { list } = data;
    pkgManageDataList.list = list;
    pkgManageTabTotal.value = data.total;
    selectedManageRowKeys.value = [];
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// moCode: '',
//   mitemCode: '',
//   moStatus: '',
//   planDateStart: '',
//   workshopCode: '',
//   workCenterCode: '',
//   onlyDisplayCreated: true,

// 查询组件
const opts = computed(() => {
  return {
    datetimePlanRange: {
      label: '计划生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    moScheduleId: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    workshopId: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workCenterId: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
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
    scheStatus: {
      label: '排产单状态',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
  };
});

// 查询组件
const pkgBarcodeManageOp = computed(() => {
  return {
    datetimePlanRange: {
      label: '计划生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    workshopId: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workcenterId: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
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
    timeCreatedRange: {
      label: '生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    moScheduleId: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    barcodeType: {
      label: '条码类型',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: bracodeTypeOption.value,
      },
    },
    barcodePkgStatus: {
      label: '条码状态',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: bracodeStatusOption.value,
      },
    },
    pkgBarcode: {
      label: '条码',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

// 获取 补打原因 下拉数据
const reprintDataList = reactive({ list: [] });
const onReprintSelextData = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'REPRINT_REASON' });
  reprintDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};
// 获取 作废原因 下拉数据
const cancellationDataList = reactive({ list: [] });
const onCancellationSelextData = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'SCRAP_REASON' });
  cancellationDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

const moStatusOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' }).then((data) => {
  moStatusOption.value = data;
});
const bracodeTypeOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'PKG_BARCODE_TYPE' }).then((data) => {
  bracodeTypeOption.value = data;
});
const bracodeStatusOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'BARCODE_PKG_STATUS' }).then((data) => {
  bracodeStatusOption.value = data;
});
const tabList = reactive({ list: [] });
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
  manageQueryCondition.value.createDateStart = timeCreatedStart;
  manageQueryCondition.value.planDateStart = timeCreatedStart;
  manageQueryCondition.value.createDateEnd = timeCreatedEnd;
  manageQueryCondition.value.planDateEnd = timeCreatedEnd;
  queryCondition.value.planDateStart = timeCreatedStart;
  queryCondition.value.planDateEnd = timeCreatedEnd;
  await fetchMoTable(); // 获取 物料编码 表格数据
  await onPrintTemplateData(); // 获取 打印模板下拉数据
  await onReprintSelextData(); // 获取补打原因列表
  await onCancellationSelextData(); // 获取作废原因列表
});

const handleTabClick = (selectedTabIndex: any) => {
  // 清空 条件模板 和 打印模板
  printMode.value.barcodeRuleId = '';
  printMode.value.printTempId = '';
  selectedRowKeys.value = [];
  if (tabList.list.length > selectedTabIndex - 1 && selectedTabIndex > 0) {
    const selectedTab = tabList.list[selectedTabIndex - 1];
    generateButtonOp.value = selectedTab.planSheet <= 0;
    printRuCondition.value.packType = selectedTab.packType;
    queryBelowCondition.value.moScheduleId = queryCondition.value.moScheduleId
      ? queryCondition.value.moScheduleId
      : queryBelowCondition.value.moScheduleId;

    queryBelowCondition.value.packType = selectedTab.packType;
    printMode.value.packType = selectedTab.packType;
    printMode.value.generateQty = selectedTab.generateQty;
    printMode.value.planQty = selectedTab.planQty;
    printMode.value.packQty = selectedTab.packQty;
    calculateButtonOffset();
    printMode.value.maxCreate = selectedTab.planQty - selectedTab.generateQty;
    generateButtonOp.value = printMode.value.maxCreate <= 0;
    printMode.value.createPDNum = printMode.value.maxCreate > 0 ? printMode.value.maxCreate : 0;
    printMode.value.packQtyShow = selectedTab.packQtyShow;
    pageUIBracode.value.page = 1;
    pageUIBracode.value.rows = 10;
    queryBelowCondition.value.pageNum = pageUIBracode.value.page;
    queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
    dataSummary.value = `${selectedTab.planQty} (${selectedTab.planSheet}) / ${selectedTab.generateQty} (${selectedTab.generateSheet}) / ${selectedTab.displayQty} (${selectedTab.displaySheet}) `;
    api.barcodePkg.getBarcodePkgList(queryBelowCondition.value).then((data) => {
      moBelowList.list = data.list;
      barcodeTotal.value = data.total;
    });
    onCreateChange();
    onPrintRulesData();
    onPrintTemplateData();
  }
};
const onRefreshBelow = () => {
  queryBelowCondition.value.pageNum = pageUIBracode.value.page;
  queryBelowCondition.value.pageSize = pageUIBracode.value.rows;
  api.barcodePkg.getBarcodePkgList(queryBelowCondition.value).then((data) => {
    moBelowList.list = data.list;
    barcodeTotal.value = data.total;
  });
};
const onRefreshTag = async () => {
  await api.barcodePkg.getTagList(queryCondition.value).then((data) => {
    tabList.list = data.list;
  });
  handleTabClick(tabValue.value); // 刷新数据
};
const curRow = ref();
const onRowClick = ({ row }) => {
  tabValue.value = 1;
  curRow.value = row;
  queryCondition.value.moScheduleId = row.moScheduleId;
  printRuCondition.value.moScheId = row.moScheduleId;
  printMode.value.moScheduleId = row.moScheduleId;
  moscheRowKeys.value = [];
  moscheRowKeys.value.push(row.moScheduleId);
  queryCondition.value.pageNum = pageUIBracode.value.page;
  queryCondition.value.pageSize = pageUIBracode.value.rows;
  api.barcodePkg.getTagList(queryCondition.value).then((data) => {
    tabList.list = data.list;
    console.log(tabList.list);
    handleTabClick(1);
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
