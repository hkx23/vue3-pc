<template>
  <div class="main-page">
    <!-- ################# 工单 表格数据 ###################### -->
    <div class="main-page-content">
      <t-tabs v-model="tagValue">
        <t-tab-panel :value="0" label="包装标签打印" :destroy-on-hide="false">
          <!-- 查询组件  -->
          <cmp-query :opts="opts" label-width="100" @submit="conditionEnter" />
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="groupColumns"
              :table-data="moDataList.list"
              :total="ruleTabTotal"
              @row-click="onRowClick"
              @refresh="onRefresh"
            >
              <template #stateSwitch="{ row }">
                <t-switch
                  :custom-value="[1, 0]"
                  :value="row.state"
                  :default-value="row.state"
                  size="large"
                  @change="(value) => onSwitchChange(row, value)"
                ></t-switch>
              </template>
            </cmp-table>
          </t-col>
          <t-checkbox v-model="queryCondition.onlyDisplayCreated">仅显示已生成</t-checkbox>
          <!-- ################# 条码分类 表格数据 ###################### -->
          <div class="main-page-content">
            <t-tabs v-model="tabValue" @change="tabChange">
              <!-- $$$$$$$$$$$    栈分组  $$$$$$$$$$$$$$-->
              <t-tab-panel :value="0" :label="labelOp" :destroy-on-hide="false">
                <template #panel>
                  <t-row style="margin-top: 10px">
                    <t-space>
                      <span>计划打印数/已生成数/已打印数</span>
                      <span>{{ dataSummary }}</span>
                    </t-space>
                    <t-button>生成</t-button>
                    <t-button theme="default">打印</t-button>
                  </t-row>
                  <!-- 查询组件  -->
                  <cmp-query :opts="barcodeOpts" label-width="100" @submit="conditionEnter" />
                  <cmp-table
                    v-model:pagination="pageUI"
                    row-key="id"
                    :table-column="barcodeColumns"
                    :table-data="tableData.list"
                    :total="totalText"
                    @refresh="onLeftFetchData"
                  >
                  </cmp-table>
                </template>
              </t-tab-panel>
            </t-tabs>
          </div>
        </t-tab-panel>
        <t-tab-panel :value="1" label="包装标签管理" :destroy-on-hide="false">
          <!-- 查询组件  -->
          <cmp-query :opts="pkgBarcodeManageOp" label-width="100" @submit="conditionEnter" />
          <t-row>
            <t-button>生成</t-button>
            <t-button theme="default">打印</t-button>
            <t-button theme="default">导出</t-button>
          </t-row>
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="groupColumns"
              :table-data="moDataList.list"
              :total="ruleTabTotal"
              @row-click="onRowClick"
              @refresh="onRefresh"
            >
              <template #stateSwitch="{ row }">
                <t-switch
                  :custom-value="[1, 0]"
                  :value="row.state"
                  :default-value="row.state"
                  size="large"
                  @change="(value) => onSwitchChange(row, value)"
                ></t-switch>
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
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: materialPage } = usePage();
const formVisible = ref(false); // 控制 处理组dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const groupDisabled = ref(false); // 处理组表单禁用开关
const submitFalg = ref(false);
// $处理组 表格数据
const moDataList = reactive({ list: [] });
const ruleTabTotal = ref(null);
const dataSummary = ref(null);
// $人员 表格数据
const materialTabDataList = reactive({ list: [] });
const materialTotal = ref(null);
const tableData = reactive({ list: [] });
// 计划开始时间初始化
// 上方查询初始化
const queryCondition = ref({
  moCode: '',
  mitemCode: '',
  moStatus: '',
  datetimePlanStart: '',
  workshopCode: '',
  workCenterCode: '',
  onlyDisplayCreated: true,
});
// 上下方查询初始化
const pkgQueryCondition = ref({
  barcodeRule: '',
  mitemCode: '',
  moStatus: '',
  datetimePlanStart: '',
  workshopCode: '',
  workCenterCode: '',
  onlyDisplayCreated: true,
});
// tab 表格?
const tabValue = ref(0);
const tagValue = ref(0);

// dialog 弹框数据
const ruleTabData = ref({
  ruleCode: '', // 规则编码
  ruleName: '', // 规则名称
  barcodeType: '', // 条码类型
  ruleDesc: '', //  规则描述
  ruleExpression: '', // 条码规则表达式
  state: 1, // 启用禁用
});
// 关联物料数据
const relatedMaterials = ref({
  barcodeRuleId: '', // 上表格ID
  mitemId: '', // 物料 ID
  mitemCategoryId: '', // 物料分类 ID
});
// # 条码规则刷新按钮
const onRefresh = async () => {
  await onBarcodeRuleTabData(); // 获取 条码规则表格 数据
};

// #### 条码规则 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'moCode',
    title: '工单',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'moClass',
    title: '工单状态',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'datetimePlanStart',
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
    colKey: 'uom',
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
    colKey: 'workcenter',
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
    colKey: 'status',
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
    colKey: 'uom',
    title: '单位',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'creator',
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
    colKey: 'creator',
    title: '打印人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'timeCreate',
    title: '打印时间',
    align: 'center',
    width: '130',
  },
];
// 查询条件处理数据
const filterList = ref([]) as any;
// 点击查询按钮
const conditionEnter = (data: any) => {
  filterList.value = [];
  for (const key in data) {
    const addFilter = {
      field: key,
      operator: 'EQ',
      value: data[key],
    };
    if (key === 'roleName') addFilter.operator = 'LIKE';
    if (addFilter.value) {
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 加载角色数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
    };

    const data = (await api.role.search(searchCondition)) as any;
    const { list } = data;
    tableData.value = list;
    dataTotal.value = data.total;
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
    datetimePlanStart: {
      label: '计划生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    moCode: {
      label: '工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    workshopCode: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workCenterCode: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    mitemCode: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    moStatus: {
      label: '工单状态',
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
const barcodeOpts = computed(() => {
  return {
    braCode: {
      label: '条码规则',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
    tmplCode: {
      label: '打印模板',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
    qty: {
      label: '本次生成数',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
    packRuleId: {
      label: '包装规格',
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
    datetimePlanStart: {
      label: '计划生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    workshopCode: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workCenterCode: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    mitemCode: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    datetimePStart: {
      label: '生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    moCode: {
      label: '工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    tmplCode: {
      label: '打印模板',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
    bracodeType: {
      label: '条码类型',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
    bracodeState: {
      label: '条码状态',
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: moStatusOption.value,
      },
    },
    bracodeCode: {
      label: '条码',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

const moStatusOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' }).then((data) => {
  moStatusOption.value = data;
});
// ################ 初始渲染
onMounted(async () => {
  await onBarcodeRuleTabData(); // 获取 条码规则表格 数据
  await onMaterialTabData(); // 获取 物料编码 表格数据
  await ongetRuleTreeSegment(); // 获取树状数据
  await onGetDialogSelect(); // 获取dia下拉框数据
});

// #获取 条码规则 表格数据
const onBarcodeRuleTabData = async () => {
  const res = await api.barcodeRuleInMitem.getBarcodeRuleList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  moDataList.list = res.list;
  ruleTabTotal.value = res.total;
};

// # 获取 物料分类 表格数据
const onMaterialTabData = async () => {
  const res = await api.barcodeRuleInMitem.getMitemList({
    pageNum: materialPage.value.page,
    pageSize: materialPage.value.rows,
    ruleId: personID.value,
  });
  materialTabDataList.list = res.list;
  materialTotal.value = res.total;
};

// # Switch 状态获取
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  await api.barcodeRuleInMitem.modifyBarcodeRule({
    state: isValue,
    ruleName: row.ruleName,
    barcodeType: row.barcodeType,
    ruleExpression: row.ruleExpression,
    id: row.id,
  });
  await onBarcodeRuleTabData();
  MessagePlugin.success('操作成功');
};

// #条码规则 表格 行点击事件
const personID = ref(null); // 点击表格行 获取人员id
const onRowClick = async ({ row }) => {
  personID.value = null; // 点击前先清空
  personID.value = row.id;
  relatedMaterials.value.barcodeRuleId = row.id;
  await onMaterialTabData(); // 获取 物料分类 数据
};

// #添加按钮点击事件
const onAddRuleData = () => {
  formRef.value.reset({ type: 'empty' });
  ruleTabData.value.state = 1;
  groupDisabled.value = false; // 关闭表单禁用
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = '条码规则配置新增';
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
