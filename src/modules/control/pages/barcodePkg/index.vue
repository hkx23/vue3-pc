<template>
  <div class="main-page">
    <!-- ################# 工单 表格数据 ###################### -->
    <div class="main-page-content">
      <t-tabs v-model="tagValue" @change="switchTab">
        <t-tab-panel :value="0" label="包装标签打印" :destroy-on-hide="false">
          <!-- 查询组件  -->
          <cmp-query :opts="opts" label-width="100" @submit="conditionEnter" />
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="groupColumns"
              :table-data="moDataList.list"
              :loading="loading"
              :total="moTabTotal"
              @row-click="onRowClick"
              @refresh="onRefresh"
            >
            </cmp-table>
          </t-col>
          <t-checkbox v-model="queryCondition.onlyDisplayCreated">仅显示已生成</t-checkbox>
          <div class="main-page-content">
            <t-tabs v-model="tabValue" @change="handleTabClick">
              <!-- $$$$$$$$$$$    包装页签  $$$$$$$$$$$$$$-->
              <t-tab-panel
                v-for="(tab, index) in tabList"
                :key="index"
                :value="index"
                :label="tab.label"
                :destroy-on-hide="false"
              >
              </t-tab-panel>
            </t-tabs>
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
              :loading="loading"
              :table-column="barcodeColumns"
              :table-data="moDataList.list"
              :total="barcodeTotal"
              @refresh="onRefresh"
            >
            </cmp-table>
          </div>
        </t-tab-panel>
        <t-tab-panel :value="1" label="包装标签管理" :destroy-on-hide="false">
          <!-- 查询组件  -->
          <cmp-query :opts="pkgBarcodeManageOp" label-width="100" @submit="managePageSearchClick" />
          <t-row>
            <t-button>生成</t-button>
            <t-button theme="default">打印</t-button>
            <t-button theme="default">导出</t-button>
          </t-row>
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :loading="loading"
              :table-column="pkgBarcodeManageColumns"
              :table-data="pkgManageDataList.list"
              :total="pkgManageTabTotal"
              @refresh="onRefresh"
            >
            </cmp-table>
          </t-col>
          <template #op="slotProps">
            <t-space>
              <t-link variant="text" theme="primary" name="edit" @click="openLog(slotProps)">日志</t-link>
            </t-space>
          </template>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
// $打印上 表格数据
const moDataList = reactive({ list: [] });
const moTabTotal = ref(0);
// $管理上 表格数据
const pkgManageDataList = reactive({ list: [] });
const pkgManageTabTotal = ref(0);
const barcodeTotal = ref(0);
const dataSummary = ref(null);
// 打印上方查询初始化
const queryCondition = ref({
  moId: '',
  mitemId: '',
  moStatus: '',
  datetimePlanStart: '',
  datetimePlanEnd: '',
  workshopId: '',
  workCenterId: '',
  onlyDisplayCreated: true,
  pageNum: 1,
  pageSize: 10,
});
// 管理上方查询初始化
const manageQueryCondition = ref({
  moId: '',
  mitemId: '',
  barcodeStatus: '',
  barcodeType: '',
  datetimePlanStart: '',
  timeCreatedStart: '',
  datetimePlanEnd: '',
  timeCreatedEnd: '',
  workshopId: '',
  workCenterId: '',
  pkgBarcode: '',
  printTmplId: '',
  pageNum: 1,
  pageSize: 10,
});
// 包装规则查询初始化
// tab 表格?
const tabValue = ref(0);
const tagValue = ref(0);

// # 条码规则刷新按钮
const onRefresh = async () => {
  await fetchMoTable(); // 获取 条码规则表格 数据
};
const openLog = (value: any) => {
  console.log(value);
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
];
const pkgBarcodeManageColumns: PrimaryTableCol<TableRowData>[] = [
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
    colKey: 'pkgBarcodeType',
    title: '条码类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'status',
    title: '条码状态',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'datetimePlanStart',
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
    width: '130',
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
    colKey: 'subPkgBarcodeType',
    title: '子条码类型',
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
    colKey: 'op',
    title: '日志',
    align: 'center',
    width: '130',
  },
];
// 打印界面点击查询按钮
const switchTab = (selectedTabIndex: any) => {
  if (selectedTabIndex === 1) {
    fetchBracodeManageTable();
  } else {
    fetchMoTable();
  }
};
// 打印界面点击查询按钮
const conditionEnter = (data: any) => {
  queryCondition.value = data;
  const [datetimePlanStart, datetimePlanEnd] = data.datetimePlanRange;
  queryCondition.value.datetimePlanStart = datetimePlanStart;
  queryCondition.value.datetimePlanEnd = datetimePlanEnd;
  queryCondition.value.pageNum = pageUI.value.page;
  queryCondition.value.pageSize = pageUI.value.rows;
  fetchMoTable();
};
// 管理界面点击查询按钮
const managePageSearchClick = (data: any) => {
  manageQueryCondition.value = data;
  const [datetimePlanStart, datetimePlanEnd] = data.datetimePlanRange;
  const [timeCreatedStart, timeCreatedEnd] = data.timeCreatedRange;
  manageQueryCondition.value.datetimePlanStart = datetimePlanStart;
  manageQueryCondition.value.datetimePlanEnd = datetimePlanEnd;
  manageQueryCondition.value.timeCreatedStart = timeCreatedStart;
  manageQueryCondition.value.timeCreatedEnd = timeCreatedEnd;
  manageQueryCondition.value.pageNum = pageUI.value.page;
  manageQueryCondition.value.pageSize = pageUI.value.rows;
  fetchBracodeManageTable();
};
// 加载工单数据表格
const fetchMoTable = async () => {
  setLoading(true);
  try {
    const data = (await api.barcodePkg.getMoPkgList(queryCondition.value)) as any;
    const { list } = data;
    moDataList.list = list;
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
    const data = (await api.barcodePkg.getMoPkgList(manageQueryCondition.value)) as any;
    const { list } = data;
    pkgManageDataList.list = list;
    pkgManageTabTotal.value = data.total;
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
      label: '计划生产日期',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().subtract(+3, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
    },
    moId: {
      label: '工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
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
    datetimePlanRange: {
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
    timeCreatedRange: {
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
const tabList = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' }).then((data) => {
  tabList.value = data;
  console.log(tabList);
});
// ################ 初始渲染
onMounted(async () => {
  await fetchMoTable(); // 获取 物料编码 表格数据
});

const handleTabClick = (selectedTabIndex: any) => {
  const selectedTab = tabList.value[selectedTabIndex];
  console.log(selectedTab);
};
const onRowClick = () => {
  handleTabClick(0);
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
