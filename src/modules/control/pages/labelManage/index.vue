<!-- 条码验证规则 -->
<template>
  <cmp-container :full="!!tabValue">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <t-tabs v-model="tabValue" @change="tabChange">
        <t-tab-panel :value="0" label="产品标签打印" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="false" :full-sub-index="[0, 1]">
              <cmp-card :hover-shadow="false">
                <cmp-container :full="false">
                  <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
                    <template #workState="{ param }">
                      <t-select v-model="param.workState" :clearable="true" label="排产单状态">
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
                  <!-- ################# 产品标签打印 上1️⃣上 表格数据 ###################### -->
                  <cmp-table
                    ref="tableRefTop"
                    v-model:pagination="pageUITop"
                    row-key="moScheduleId"
                    :fixed-height="true"
                    :active-row-type="'single'"
                    :hover="true"
                    :table-column="labelPrintTop"
                    :table-data="printTopTabData.list"
                    :total="totalPrintTop"
                    select-on-row-click
                    style="height: 300px"
                    @select-change="onGenerateChange"
                    @refresh="onTopRefresh"
                  >
                    <template #title>
                      {{ '产品标签打印列表' }}
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
                    <template #button>
                      <t-space :size="8">
                        <t-select
                          v-model="generateData.barcodeRuleId"
                          :clearable="true"
                          style="width: 240px"
                          label="条码规则"
                        >
                          <t-option
                            v-for="item in onPrintRulesList.list"
                            :key="item.id"
                            :label="item.ruleName"
                            :value="item.id"
                          />
                        </t-select>
                        <t-button theme="primary" :disabled="!generateData.moScheduleId" @click="onGenerate">
                          生成
                        </t-button>
                      </t-space>
                    </template>
                  </cmp-table>
                </cmp-container>
              </cmp-card>
              <cmp-card>
                <!-- ################# 产品标签打印 下2️⃣下 表格数据 ###################### -->
                <cmp-table
                  ref="tableRef"
                  v-model:pagination="pageUIDown"
                  row-key="barcodeWipId"
                  :fixed-height="true"
                  :active-row-type="'single'"
                  :hover="true"
                  :table-column="labelPrintDown"
                  :table-data="printDownTabData.list"
                  :total="totalPrintDown"
                  select-on-row-click
                  :selected-row-keys="selectedRowKeys"
                  style="height: 300px"
                  @select-change="onPrintChange"
                  @refresh="onDownRefresh"
                >
                  <template #title>
                    {{ '条码状态列表' }}
                  </template>
                  <template #button>
                    <t-radio-group v-model="radioValue" @change="onRadioChange">
                      <t-radio allow-uncheck :value="1"> 仅显示已生成</t-radio>
                    </t-radio-group>
                    <t-select v-model="printTemplate" label="打印模板" :clearable="true" style="width: 240px">
                      <t-option
                        v-for="item in onPrintTemplateList.list"
                        :key="item.id"
                        :label="item.tmplName"
                        :value="item.id"
                      />
                    </t-select>
                    <t-button theme="primary" @click="onPrint"> 打印 </t-button>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <!-- ###############    产品标签管理 3️⃣ 表格数据   ######## -->
        <t-tab-panel :value="1" label="产品标签管理" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :full-sub-index="[0, 1]">
              <cmp-card>
                <cmp-container :full="true">
                  <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
                    <template #workState="{ param }">
                      <t-select v-model="param.workState" :clearable="true" label="排产单状态">
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
                  <cmp-table
                    ref="tableRefRight"
                    v-model:pagination="pageUI"
                    row-key="barcodeWipId"
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
                      {{ '产品标签管理列表' }}
                    </template>
                    <template #actionSlot>
                      <t-link theme="primary" style="margin-right: 10px"> 编辑 </t-link>
                      <t-popconfirm theme="default" content="确认删除吗">
                        <t-link theme="primary"> 删除 </t-link>
                      </t-popconfirm>
                    </template>
                    <template #button>
                      <t-select
                        v-model="printTemplate"
                        label="打印模板"
                        :clearable="true"
                        style="width: 240px"
                        :on-popup-visible-change="onPopupVisibleChange"
                      >
                        <t-option
                          v-for="item in onPrintManagementList.list"
                          :key="item.id"
                          :label="item.tmplName"
                          :value="item.id"
                        />
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
                </cmp-container>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>

  <!-- % 补打， 作废 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :data="reprintDialog" :rules="rules" @submit="onAnomalyTypeSubmit">
      <t-row :gutter="[32, 16]">
        <t-col v-if="reprintVoidSwitch" :span="12">
          <t-form-item label="补打原因" name="reprintData">
            <t-select v-model="reprintDialog.reprintData" :clearable="true">
              <t-option
                v-for="item in reprintDataList.list"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="!reprintVoidSwitch" :span="12">
          <t-form-item label="作废" name="reprintData">
            <t-select v-model="reprintDialog.reprintData" :clearable="true">
              <t-option
                v-for="item in cancellationDataList.list"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="isReprintCancellation && reprintDialog.reprintData === '其他原因'" :span="10">
          <t-form-item label="补打原因" name="restsData">
            <t-textarea
              v-model="reprintDialog.restsData"
              placeholder="请输入补打原因"
              name="description"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
        <t-col v-if="!isReprintCancellation && reprintDialog.reprintData === '其他原因'" :span="10">
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
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">{{ buttonSwitch }}</t-button>
    </template>
  </t-dialog>
  <!---%日志 dialog 弹窗  -->
  <t-dialog v-model:visible="logInterfaceVisible" :cancel-btn="null" :confirm-btn="null" header="日志" width="60%">
    <cmp-table
      ref="DialogTableRef"
      v-model:pagination="pageUIDay"
      row-key="id"
      :table-column="logInterface"
      :table-data="dayTabData.list"
      :total="totalDay"
      @refresh="onRightFetchData"
    ></cmp-table>
  </t-dialog>
  <t-loading :loading="loading" text="加载中..." fullscreen />
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ComputedRef, onMounted, reactive, Ref, ref } from 'vue';

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
const tableRefTop = ref(); // 上表格实例
const tableRefRight = ref(); // 右表格实例
const isReprintCancellation = ref(false);
const printTemplate = ref(''); // 打印模板数据
const loading = ref(false);
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
    title: '排产单',
    align: 'center',
    width: '130',
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
    title: '排产单数量',
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

const onSecondarySubmit = () => {
  formRef.value.submit();
};

// 表单校验
const rules: ComputedRef<FormRules> = computed(() => {
  return {
    reprintData: [{ required: true, trigger: 'change' }],
    restsData: [{ required: true, trigger: 'blur' }],
  };
});

// 初始渲染
onMounted(async () => {
  await onGetPrintTopTabData(); // 产品标签打印 上 请求
  await onWorkStatus(); // 工单状态下拉数据
  await onBarCodeState(); // 获取条码状态数据
  await onReprintSelextData(); // 获取补打原因列表
  await onCancellationSelextData(); // 获取作废原因列表
});

// 上表格数据刷新
const onTopRefresh = async () => {
  await onGetPrintTopTabData();
  printDownTabData.list = [];
  topPrintID.value = null;
  totalPrintDown.value = 0;
};
// 下表格数据刷新
const onDownRefresh = async () => {
  await onGetPrintDownTabData();
};

// 右表格数据刷新
const onRightFetchData = async () => {
  await onLabelManageTabData();
  productSelectedRowKeys.value = [];
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

// 获取 打印规则 下拉数据
const generateData = ref({
  barcodeRuleId: '', // select ID
  workcenterId: null, // 工作中心 Id
  moScheduleId: null, // 行 Id
  createNum: null, // 本次生成数量
});

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
    try {
      loading.value = true;
      await api.labelManage.reprintBarcode({
        ids: productSelectedRowKeys.value,
        reason,
      });
      MessagePlugin.success('补打成功');
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  } else {
    try {
      loading.value = true;
      await api.labelManage.cancellationBarcode({
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
  }
  await onLabelManageTabData(); // 刷新表格数据
  productSelectedRowKeys.value = [];
  formVisible.value = false;
};

// #产品标签打印 上 表格数据
const topPrintID = ref(null);
const topPrintData = ref({
  pageNum: 1,
  pageSize: 10,
  planDateStart: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), // 计划生产开始日期
  planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
  moScheduleId: '', // 工单ID
  workshopId: '', // 车间 ID
  workcenterId: '', // 工作中心ID
  mitemId: '', // 物料 ID
  scheStatus: '', // 工单状态
  isFinishDisplay: true, // 是否仅显示已打印
});
const onGetPrintTopTabData = async () => {
  topPrintData.value.pageNum = pageUITop.value.page;
  topPrintData.value.pageSize = pageUITop.value.rows;
  const res = await api.labelManage.getMoScheduleList(topPrintData.value);
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
  const res = await api.labelManage.getBarcodeWipList({
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
const ManageTabData = ref({
  pageNum: 1,
  pageSize: 10,
  planDateStart: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), // 计划生产开始日期
  planDateEnd: dayjs().format('YYYY-MM-DD'), // 计划生产结束日期
  createDateStart: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), // 生产开始日期
  createDateEnd: dayjs().format('YYYY-MM-DD'), // 生产结束日期
  moScheduleId: '', // 工单ID
  workshopId: '', // 车间 ID
  workcenterId: '', // 工作中心ID
  mitemId: '', // 物料 ID
  barcodeStatus: '', // 条码状态
  barcode: '', // 条码
});
const onLabelManageTabData = async () => {
  ManageTabData.value.pageNum = pageUI.value.page;
  ManageTabData.value.pageSize = pageUI.value.rows;
  const res = await api.labelManage.getBarcodeWipManagerList(ManageTabData.value);
  manageTabData.list = res.list;
  totalManage.value = res.total;
};

// 管理界面打印模板 事件
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

// 补打 点击事件
const reprintVoidSwitch = ref(false); // 控制
const onReprint = () => {
  formRef.value.reset({ type: 'empty' });
  if (!printTemplate.value) {
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  const specificStatus = barcodeWipStatusNameArr.value.some((item) => item === '已生成' || item === '已报废');
  if (specificStatus) {
    MessagePlugin.warning('存在条码状态为已生成、已报废状态，不允许补打！');
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

// 表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    await onConfirm();
  }
};

// 日志 点击 事件
const onLogInterface = async (row: any) => {
  logInterfaceVisible.value = true; // 控制界面显示隐藏
  const res = await api.labelManage.getBarcodeWipLog({
    serialNumber: row.serialNumber,
    pageNum: pageUIDay.value.page,
    pageSize: pageUIDay.value.rows,
  });
  dayTabData.list = res.list;
  totalDay.value = res.total;
};

// 上表格 单选框 选择事件
const onGenerateChange = async (value: any, context: any) => {
  generateData.value.barcodeRuleId = '';
  printTemplate.value = '';
  const { moScheduleId } = context.currentRowData;
  numInput.value = context.currentRowData.planQty - context.currentRowData.generateQty;
  generateData.value.createNum = context.currentRowData.thisTimeQty;
  generateData.value.workcenterId = context.currentRowData.workcenterId; // 工作中心 Id
  generateData.value.moScheduleId = context.currentRowData.moScheduleId; // 行 Id
  [topPrintID.value] = value;
  await onGetPrintDownTabData();
  await onPrintRulesData(moScheduleId); // 条码规则下拉数据
  await onPrintTemplateData(moScheduleId); // 打印模板下拉数据
};

// 获取条码规则下拉数据
const onPrintRulesList = reactive({ list: [] });
const onPrintRulesData = async (moScheId) => {
  const res = await api.labelManage.getBarcodeRuleList({ moScheId });
  onPrintRulesList.list = res;
};

// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async (moScheId) => {
  const res = await api.labelManage.getPrintTmplList({ moScheId });
  onPrintTemplateList.list = res;
};

// 管理界面打印模板 下拉数据
const onPrintManagementList = reactive({ list: [] });
const onPrintManagementData = async (moScheId) => {
  const res = await api.labelManage.getPrintTmplList({ moScheId });
  onPrintManagementList.list = res;
};

// 本次生成数量change事件
const numInput = ref(null);
const inputTimeQtyChange = (value: any, row: any) => {
  generateData.value.createNum = value; // 本次生成数量
  numInput.value = row.planQty - row.generateQty;
};

// 生成点击事件
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
  // if (generateData?.value?.createNum > numInput.value) {
  //   MessagePlugin.warning(`本次生成数量不得大于 ${numInput.value}！`);
  //   return;
  // }
  if (generateData?.value?.createNum < 0) {
    MessagePlugin.warning('本次生成数量不得小于0！');
    return;
  }
  if (!generateData?.value?.createNum) {
    MessagePlugin.warning('请正确填写本次生成数量！');
    return;
  }
  if (generateData?.value?.createNum > 50000) {
    MessagePlugin.warning('本次生成数量不能大于50000！');
    return;
  }
  try {
    loading.value = true;
    await api.labelManage.generateBarcode(generateData.value); // 生成请求
    await onGetPrintTopTabData(); // 刷新数据
    await onGetPrintDownTabData();
    MessagePlugin.success('生成成功');
    // tableRefTop.value.setSelectedRowKeys([]);
    // printDownTabData.list = [];
    // totalPrintDown.value = 0;
    // generateData.value.moScheduleId = null;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}, 1000);
// 点击 打印事件
const onPrint = debounce(async () => {
  const hasNotGenerated = selectedData.value.some((item) => item !== '已生成');
  if (!selectedRowKeys.value.length) {
    MessagePlugin.warning('请选择需要打印的数据！');
    return;
  }
  if (!printTemplate.value) {
    MessagePlugin.warning('请选择打印模板！');
    return;
  }
  if (hasNotGenerated) {
    MessagePlugin.warning(`存在条码状态不为已生成状态，不允许打印！`);
    return;
  }
  try {
    loading.value = true;
    await api.labelManage.printBarcode({ ids: selectedRowKeys.value });
    await onGetPrintDownTabData(); // 刷新数据
    MessagePlugin.success('打印成功');
    selectedRowKeys.value = [];
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}, 1000);

// 打印选择 框 行 事件
const selectedData = ref([]);
const onPrintChange = (value: any, context) => {
  selectedData.value = context.selectedRowData.map((item) => item.barcodeWipStatusName);
  selectedRowKeys.value = value;
};

function removeDuplicates(array) {
  return [...new Set(array)];
}

const barcodeWipStatusNameArr = ref([]);
const moScheduleIdSole = ref([]); // 获取唯一的排产单id，用来获取 打印模板
const onProductRightFetchData = (value: any, context: any) => {
  onPrintManagementList.list = [];
  barcodeWipStatusNameArr.value = context.selectedRowData.map((item: any) => item.barcodeWipStatusName);
  const newArr = context.selectedRowData.map((item) => item.moScheduleId);
  moScheduleIdSole.value = removeDuplicates(newArr);
  productSelectedRowKeys.value = value;
};

// TAb 栏切换事件
const tabChange = async (value: number) => {
  printTemplate.value = '';
  if (!value) {
    initialDate.value = 0;
  } else {
    initialDate.value = 2;
    await onLabelManageTabData(); // 产品标签管理 表格数据
  }
};

// #query 查询参数
const initialDate = ref(0);
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
    const [planDateStart, planDateEnd] = data.scheduledProductionDate;
    topPrintData.value.planDateStart = planDateStart; // 计划生产开始日期
    topPrintData.value.planDateEnd = planDateEnd; // 计划生产结束日期
    topPrintData.value.moScheduleId = data.mo; // 工单ID
    topPrintData.value.workshopId = data.workshop; // 车间 ID
    topPrintData.value.workcenterId = data.workcenter; // 工作中心ID
    topPrintData.value.mitemId = data.mitem; // 物料 ID
    topPrintData.value.scheStatus = data.workState; // 工单状态
    topPrintData.value.isFinishDisplay = isFinishDisplay; // 是否仅显示已打印
    await onGetPrintTopTabData(); // 产品标签打印 上 请求
    printDownTabData.list = [];
    tableRefTop.value.setSelectedRowKeys([]);
  } else {
    pageUI.value.page = 1;
    const [planDateStart, planDateEnd] = data.scheduledProductionDate;
    const [createDateStart, createDateEnd] = data.datePproduced;
    ManageTabData.value.planDateStart = planDateStart; // 计划生产开始日期
    ManageTabData.value.planDateEnd = planDateEnd; // 计划生产结束日期
    ManageTabData.value.createDateStart = createDateStart; // 生产开始日期
    ManageTabData.value.createDateEnd = createDateEnd; // 生产结束日期
    ManageTabData.value.moScheduleId = data.mo; // 工单ID
    ManageTabData.value.workshopId = data.workshop; // 车间 ID
    ManageTabData.value.workcenterId = data.workcenter; // 工作中心ID
    ManageTabData.value.mitemId = data.mitem; // 物料 ID
    ManageTabData.value.barcodeStatus = data.barCodeState; // 条码状态
    ManageTabData.value.barcode = data.barCode; // 条码
    await onLabelManageTabData(); // 产品标签管理 表格数据
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
