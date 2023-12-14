<!-- 条码验证规则 -->
<template>
  <div class="main-page">
    <div class="main-page-content">
      <cmp-query :opts="opts" @submit="onInput">
        <template #workState>
          <t-select v-model="workStateData">
            <t-option v-for="item in workStateDataList.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
        <template #showState>
          <t-radio-group>
            <t-radio allow-uncheck :value="1">仅显示已生成</t-radio>
          </t-radio-group>
        </template>
        <template #barCodeState>
          <t-select v-model="workStateData">
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
                    row-key="id"
                    :table-column="labelPrintTop"
                    :table-data="printTopTabData.list"
                    :total="totalPrintTop"
                    @row-click="onTopRowClick"
                    @refresh="onTopRefresh"
                  >
                    <template #button>
                      <t-row align="middle">
                        <t-col>条码规则： </t-col>
                        <t-col>
                          <t-select>
                            <t-option
                              v-for="item in onPrintRulesList.list"
                              :key="item.id"
                              :label="item.ruleName"
                              :value="item.ruleName"
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
                              :value="item.tmplName"
                            />
                          </t-select>
                        </t-col>
                      </t-row>
                    </template>
                    <template #operate>
                      <t-space>
                        <t-button theme="default"> 生成 </t-button>
                        <t-button theme="default"> 打印 </t-button>
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
                      row-key="id"
                      :table-column="labelPrintDown"
                      :table-data="printDownTabData.list"
                      :total="totalPrintDown"
                      @refresh="onDownRefresh"
                    >
                      <template #button>
                        <t-radio-group>
                          <t-radio allow-uncheck :value="1"> 仅显示已生成</t-radio>
                        </t-radio-group>
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
              row-key="id"
              :table-column="labelManage"
              :table-data="manageTabData.list"
              :total="totalManage"
              @refresh="onRightFetchData"
            >
              <template #actionSlot>
                <t-link theme="primary" style="margin-right: 10px"> 编辑 </t-link>
                <t-popconfirm theme="default" content="确认删除吗">
                  <t-link theme="primary"> 删除 </t-link>
                </t-popconfirm>
              </template>
              <template #operate>
                <t-space>
                  <t-button theme="default" @click="onReprint"> 补打 </t-button>
                  <t-button theme="default" @click="onCancellation"> 作废 </t-button>
                  <t-button theme="default"> 导出 </t-button>
                </t-space>
              </template>
              <template #operations>
                <t-link theme="primary"> 编辑 </t-link>
              </template>
            </cmp-table>
          </template>
        </t-tab-panel>
      </t-tabs>
    </div>
    <!-- dialog 弹窗 -->
    <t-dialog v-model:visible="formVisible" :confirm-btn="buttonSwitch" :header="diaLogTitle" width="40%">
      <t-form>
        <t-form-item v-if="reprintVoidSwitch" label-width="50px" label="补打原因" name="incidentName">
          <t-select>
            <t-option
              v-for="item in barCodeStateList.list"
              :key="item.id"
              :label="item.paramValue"
              :value="item.paramCode"
            />
          </t-select>
        </t-form-item>
        <t-form-item v-if="!reprintVoidSwitch" label-width="50px" label="作废" name="incidentName">
          <t-select>
            <t-option
              v-for="item in barCodeStateList.list"
              :key="item.id"
              :label="item.paramValue"
              :value="item.paramCode"
            />
          </t-select>
        </t-form-item>
      </t-form>
    </t-dialog>

    <t-dialog v-model:visible="formVisible" :confirm-btn="buttonSwitch" :header="diaLogTitle" width="40%">
      <t-form>
        <t-form-item v-if="reprintVoidSwitch" label-width="50px" label="补打原因" name="incidentName">
          <t-select>
            <t-option
              v-for="item in barCodeStateList.list"
              :key="item.id"
              :label="item.paramValue"
              :value="item.paramCode"
            />
          </t-select>
        </t-form-item>
        <t-form-item v-if="!reprintVoidSwitch" label-width="50px" label="作废" name="incidentName">
          <t-select>
            <t-option
              v-for="item in barCodeStateList.list"
              :key="item.id"
              :label="item.paramValue"
              :value="item.paramCode"
            />
          </t-select>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

// const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI: pageUITop } = usePage(); // 分页工具
const { pageUI: pageUIDown } = usePage(); // 分页工具
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const buttonSwitch = ref(''); // 确认按钮title
const tabValue = ref(0);
// const submitFalg = ref(false);
// // 条码示例
// const sampleBarcode = ref('');
// const barcodeData = ref({});
// // 控制 单选框
// const radioValue = ref(0);

// !产品标签打印 上 表格数据
const printTopTabData = reactive({ list: [] });
const totalPrintTop = ref(0);

// 产品标签打印 下 表格数据
const printDownTabData = reactive({ list: [] });
const totalPrintDown = ref(0);

// 产品标签管理 表格数据
const manageTabData = reactive({ list: [] });
const totalManage = ref(0);

// 产品标签打印 上表格列表数据
const labelPrintTop: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'scheCode',
    title: '工单',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'moStatus',
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
  },
  {
    colKey: 'uom',
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
    colKey: 'barcodeStatus',
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
    width: '110',
  },
  {
    colKey: 'barcodeStatus',
    title: '条码状态',
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
    colKey: 'workshopName',
    title: '车间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'moCode',
    title: '工单',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '100',
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
    width: '100',
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
// const logInterface: PrimaryTableCol<TableRowData>[] = [
//   {
//     colKey: 'serialNumber',
//     title: '条码',
//     align: 'center',
//     width: '110',
//   },
//   {
//     colKey: 'barcodeStatus',
//     title: '条码状态',
//     align: 'center',
//     width: '130',
//   },
//   {
//     colKey: 'wipNum',
//     title: '数量',
//     align: 'center',
//     width: '100',
//     cell: 'stateSwitch',
//   },
//   {
//     colKey: 'creatorName',
//     title: '操作类型',
//     align: 'center',
//     width: '100',
//   },
//   {
//     colKey: 'timeCreate',
//     title: '原因',
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

// 初始渲染
onMounted(async () => {
  await onGetPrintTopTabData(); // 产品标签打印 上 请求
  await onLabelManageTabData(); // 产品标签管理 表格数据
  await onWorkStatus(); // 工单状态下拉数据
  await onBarCodeState(); // 获取条码状态数据
  await onPrintRulesData(); // 获取 打印规则下拉数据
  await onPrintTemplateData(); // 获取 打印摸板下拉数据
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
const onPrintRulesList = reactive({ list: [] });
const onPrintRulesData = async () => {
  const res = await api.label.getBarcodeRuleList();
  onPrintRulesList.list = res.list;
};

// 获取 打印摸板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async () => {
  const res = await api.label.getPrintTmplList();
  onPrintTemplateList.list = res.list;
};

// #产品标签打印 上 表格数据
const topPrintID = ref(null);
const onGetPrintTopTabData = async () => {
  const res = await api.label.getMoScheduleList({
    pageNum: pageUITop.value.page,
    pageSize: pageUITop.value.rows,
    isFinishDisplay: true,
  });
  printTopTabData.list = res.list;
  totalPrintTop.value = res.total;
};

// #产品标签打印 上 表格行点击事件
const onTopRowClick = async ({ row }) => {
  topPrintID.value = row.id;
  await onGetPrintDownTabData();
};

// #产品标签打印 下 表格数据
const onGetPrintDownTabData = async () => {
  const res = await api.label.getBarcodeWipList({
    pageNum: pageUIDown.value.page,
    pageSize: pageUIDown.value.rows,
    moScheduleId: topPrintID.value,
    isCreated: true,
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
  });
  manageTabData.list = res.list;
  totalManage.value = res.total;
};

// 补打 点击事件
const reprintVoidSwitch = ref(false); // 控制
const onReprint = () => {
  formVisible.value = true;
  reprintVoidSwitch.value = true;
  diaLogTitle.value = '补打';
  buttonSwitch.value = '补打';
};

// 作废 点击事件
const onCancellation = () => {
  formVisible.value = true;
  reprintVoidSwitch.value = false;
  diaLogTitle.value = '作废';
  buttonSwitch.value = '作废';
};

// TAb 栏切换事件
const tabChange = (value: number) => {
  if (!value) {
    initialDate.value = 1;
  } else {
    initialDate.value = 3;
  }
};

// #query 查询参数
const workStateData = ref('');
const initialDate = ref(1);
const opts = computed(() => {
  console.log('🚀 ~ file: index.vue:562 ~ opts ~ value:', initialDate.value);
  console.log('🚀 ~ file: index.vue:562 ~ opts ~ value:', [dayjs().subtract(initialDate.value, 'day'), dayjs()]);
  return {
    scheduledProductionDate: {
      label: '计划生产日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(initialDate.value, 'day'), dayjs()],
      bind: {
        // enableTimePicker: false,
        // value: [dayjs().subtract(initialDate.value, 'day'), dayjs()],
        format: 'YYYY-MM-DD',
      },
    },
    datePproduced: {
      isHide: !tabValue.value,
      label: '生产日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(3, 'day'), dayjs()],
      bind: {
        enableTimePicker: true,
        // format: 'YYYY-MM-DD',
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
// #query 查询函数
const onInput = async (data: any) => {
  console.log('🚀 ~ file: index.vue:613 ~ onInput ~ data:', data);
};

// 关闭模态框事件
// const onSecondaryReset = () => {
//   formRef.value.reset({ type: 'empty' });
//   formVisible.value = false;
// };

// 表单提交事件
// const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
//   if (context.validateResult === true) {
//     if (submitFalg.value) {
//       await onAddRuleCode(); // 新增请求
//     } else {
//       await onEditRuleCode(); // 编辑请求
//     }
//     if (barcodeData.value.barcodeValidateGroup === 'SCANEXT') {
//       await onGetTextDataList(); // 获取 文本 数据
//     } else {
//       await onGetKeyDataList(); // 获取 关键件 数据
//     }
//     // if (!tabValue.value) {
//     //   await onGetValidationGroups(); // 获取验证分组 下列 数组
//     // } else {
//     //   await onGetBarcodeType(); // 获取条码类型 下列 数组
//     // }
//     formVisible.value = false;
//   }
// };
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
