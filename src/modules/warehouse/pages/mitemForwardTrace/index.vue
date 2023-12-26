<template>
  <div class="main-page">
    <!-- ################# 工单 表格数据 ###################### -->
    <div class="main-page-content">
      <!-- 查询组件  -->
      <t-row style="margin-top: 15px">
        <t-space>
          <t-radio-group v-model="queryCondition.searchType" @change="onRestCondition">
            <t-radio value="mintemBatch">物料批次</t-radio>
            <t-radio value="mintemLabel">物料标签</t-radio>
          </t-radio-group>
          <t-input
            v-if="queryCondition.searchType === 'mintemBatch'"
            v-model="queryCondition.mitemLotNo"
            placeholder="请输入批次信息"
          ></t-input>
          <t-input
            v-if="queryCondition.searchType === 'mintemLabel'"
            v-model="queryCondition.mitemLabelNo"
            placeholder="请输入物料标签"
          ></t-input>
          <bcmp-select-business
            v-if="queryCondition.searchType === 'mintemBatch'"
            v-model="queryCondition.mitemId"
            type="mitem"
          ></bcmp-select-business>
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
            <t-row style="margin-top: 15px; margin-left: 50px">
              <t-col :span="3">
                <t-space>批次：</t-space>
                <t-space>{{ mitemInfo.lotNo }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>物料编码：</t-space>
                <t-space>{{ mitemInfo.mitemCode }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>物料描述：</t-space>
                <t-space>{{ mitemInfo.mitemDesc }}</t-space>
              </t-col>
            </t-row>
            <t-row style="margin-top: 15px; margin-left: 50px">
              <t-col :span="3">
                <t-space>数量：</t-space>
                <t-space>{{ mitemInfo.qty }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>当前状态：</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>接收时间：</t-space>
                <t-space>{{ mitemInfo.receiveTime }}</t-space>
              </t-col>
            </t-row>
            <t-row style="margin-top: 15px"></t-row>
          </div>
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="groupColumns"
              :table-data="mitemBaseInfoList.list"
              :loading="loading"
              :total="mitemBaseInfoTabTotal"
              style="margin-top: 10px"
              @refresh="onRefresh"
            >
              <template #title>批次标签信息</template>
            </cmp-table>
          </t-col>
        </t-tab-panel>
        <t-tab-panel :value="1" label="物料使用信息" :destroy-on-hide="false">
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUIUseInfo"
              row-key="id"
              :table-column="mitemUseInfo"
              :table-data="mitemUseInfoList.list"
              :loading="loading"
              :total="mitemUseInfoTabTotal"
              style="margin-top: 10px"
              @refresh="onRefresh"
            >
              <template #title>物料信息</template>
            </cmp-table>
          </t-col>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, reactive, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIUseInfo } = usePage(); // 分页工具
const mitemBaseInfoList = reactive({ list: [] });
const mitemUseInfoList = reactive({ list: [] });
const mitemBaseInfoTabTotal = ref(0);
const mitemUseInfoTabTotal = ref(0);
// $管理上 表格数据
// 日志界面 表格数据
// 补打，作废 DiaLog 数据
const mitemInfo = ref({
  lotNo: '',
  mitemCode: '',
  mitemDesc: '',
  receiveTime: '',
  qty: '',
});
// 点击 重置事件
const onRestCondition = async () => {
  // 重置查询条件
  queryCondition.value = {
    ...queryCondition.value, // 保留其他属性
    mitemLotNo: '',
    mitemLabelNo: '',
    mitemId: '',
  };
};

// 打印上方查询初始化
const queryCondition = ref({
  searchType: 'mintemBatch',
  mitemLotNo: '',
  mitemLabelNo: '',
  mitemId: '',
  dateStart: '',
  dateEnd: '',
  billNo: '',
  supplierId: '',
  pageNum: 1,
  pageSize: 10,
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

// # 送货刷新按钮
const onRefresh = async () => {
  await fetchMoTable(); // 获取 条码规则表格 数据
};

// #### 条码规则 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'mitemLabelNo',
    title: '物料标签',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'lotNo',
    title: '批次编号',
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
    colKey: 'qty',
    title: '数量',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'operatorName',
    title: '操作员',
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
    colKey: 'operateType',
    title: '交易类型',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processDate',
    title: '收货时间',
    align: 'center',
    width: '130',
  },
];
// ####条码 表头
const mitemUseInfo: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '250',
  },
  {
    colKey: 'moCode',
    title: '工单号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pdCode',
    title: '产品编码',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemLabelNo',
    title: '物料标签编码',
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
    colKey: 'mitemDesc',
    title: '物料描述',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processName',
    title: '绑定工序',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'operatorName',
    title: '作业员',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processDate',
    title: '加工时间',
    align: 'center',
    width: '130',
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
  } else {
    fetchMoTable();
  }
};
// 打印界面点击查询按钮
const conditionEnter = () => {
  fetchMoTable();
};
// 加载工单数据表格
const fetchMoTable = async () => {
  setLoading(true);
  try {
    if (tagValue.value === 0) {
      queryCondition.value.pageNum = pageUI.value.page;
      queryCondition.value.pageSize = pageUI.value.rows;
      const data = (await api.mitemForwardTrace.getMitemBasicInfo(queryCondition.value)) as any;
      mitemInfo.value = data;
      mitemBaseInfoList.list = data.tableData.list;
      mitemBaseInfoTabTotal.value = data.tableData.total;
    }
    if (tagValue.value === 1) {
      queryCondition.value.pageNum = pageUIUseInfo.value.page;
      queryCondition.value.pageSize = pageUIUseInfo.value.rows;
      const data = (await api.mitemForwardTrace.getMitemUseInfo(queryCondition.value)) as any;
      mitemUseInfoList.list = data.list;
      mitemUseInfoTabTotal.value = data.total;
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// ################ 初始渲染
onMounted(async () => {
  await fetchMoTable(); // 获取 物料编码 表格数据
});
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
