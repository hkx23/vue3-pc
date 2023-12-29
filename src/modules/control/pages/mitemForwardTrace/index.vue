<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab">
      <!-- ################# 工单 表格数据 ###################### -->
      <!-- 查询组件  -->
      <cmp-card>
        <cmp-query :opts="opts" @submit="conditionEnter" @reset="onRestCondition">
          <template #searchType="{ param }">
            <t-radio-group v-model="param.searchType" @change="onRestCondition">
              <t-radio value="mintemBatch">物料批次</t-radio>
              <t-radio value="mintemLabel">物料标签</t-radio>
            </t-radio-group>
          </template>
          <template #mitemLotNo="{ param }">
            <t-input
              v-if="param.searchType === 'mintemBatch'"
              v-model="param.mitemLotNo"
              placeholder="请输入批次信息"
            ></t-input>
            <t-input
              v-if="param.searchType === 'mintemLabel'"
              v-model="param.mitemLabelNo"
              placeholder="请输入物料标签"
            ></t-input>
          </template>
          <template #mitemId="{ param }">
            <bcmp-select-business
              v-if="param.searchType === 'mintemBatch'"
              v-model="param.mitemId"
              type="mitem"
            ></bcmp-select-business>
          </template>
        </cmp-query>
      </cmp-card>
      <!-- <t-space>
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
        </t-space> -->
      <t-row style="margin-top: 15px"></t-row>
      <t-tabs v-model="tagValue">
        <t-tab-panel :value="0" label="物料基础信息" :destroy-on-hide="false">
          <cmp-card class="padding-top-noline-16 no-h-padding-card">
            <t-row>
              <t-space style="font-weight: bold; font-size: larger; margin-left: 10px">物料信息</t-space>
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
                <t-space>{{ mitemInfo.status }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>接收时间：</t-space>
                <t-space>{{ mitemInfo.receiveTime }}</t-space>
              </t-col>
            </t-row>
            <t-row style="margin-top: 15px"></t-row>
          </cmp-card>
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
        <t-tab-panel :value="2" label="供应商信息" :destroy-on-hide="false">
          <cmp-card class="padding-top-noline-16 no-h-padding-card">
            <t-row>
              <t-space style="font-weight: bold; font-size: larger; margin-left: 10px">物料信息</t-space>
            </t-row>
            <t-row style="margin-top: 15px; margin-left: 50px">
              <t-col :span="3">
                <t-space>供应商编码：</t-space>
                <t-space>{{ supplierInfo.supplierCode }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>供应商名称：</t-space>
                <t-space>{{ supplierInfo.supplierName }}</t-space>
              </t-col>
              <t-col :span="3">
                <t-space>供应商联系人：</t-space>
                <t-space>{{ supplierInfo.contactPerson }}</t-space>
              </t-col>
            </t-row>
            <t-row style="margin-top: 15px; margin-left: 50px">
              <t-col :span="3">
                <t-space>供应商联系电话：</t-space>
                <t-space>{{ supplierInfo.contactTel }}</t-space>
              </t-col>
            </t-row>
            <t-row style="margin-top: 15px"></t-row>
          </cmp-card>
        </t-tab-panel>
        <t-tab-panel :value="3" label="物料质量信息" :destroy-on-hide="false">
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUIQualityInfo"
              row-key="id"
              :table-column="mitemQualityInfo"
              :table-data="mitemQualityInfoList.list"
              :loading="loading"
              :total="mitemQualityInfoTabTotal"
              style="margin-top: 10px"
              @refresh="onRefresh"
            >
              <template #title>品质信息</template>
            </cmp-table>
          </t-col>
        </t-tab-panel>
        <t-tab-panel :value="4" label="出入库信息" :destroy-on-hide="false">
          <t-col :span="12" flex="auto">
            <cmp-table
              v-model:pagination="pageUIIOInfo"
              row-key="id"
              :table-column="IOColumns"
              :table-data="IOInfoList.list"
              :loading="loading"
              :total="IOInfoTabTotal"
              style="margin-top: 10px"
              @refresh="onRefresh"
            >
              <template #title>物料信息</template>
            </cmp-table>
          </t-col>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import { api } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIUseInfo } = usePage(); // 分页工具
const { pageUI: pageUIQualityInfo } = usePage(); // 分页工具
const { pageUI: pageUIIOInfo } = usePage(); // 分页工具
const mitemBaseInfoList = reactive({ list: [] });
const mitemUseInfoList = reactive({ list: [] });
const IOInfoList = reactive({ list: [] });
const mitemQualityInfoList = reactive({ list: [] });
const mitemBaseInfoTabTotal = ref(0);
const IOInfoTabTotal = ref(0);
const mitemUseInfoTabTotal = ref(0);
const mitemQualityInfoTabTotal = ref(0);
const mitemInfo = ref({
  lotNo: '',
  mitemCode: '',
  mitemDesc: '',
  receiveTime: '',
  status: '',
  qty: '',
});
const supplierInfo = ref({
  supplierCode: '',
  supplierName: '',
  contactPerson: '',
  contactTel: '',
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

// const searchTypeOp = ref([
//   { value: 'mintemBatch', label: '物料批次' },
//   { value: 'mintemLabel', label: '物料标签' },
// ]);

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

// 包装规则查询初始化
// tab 表格?
const tagValue = ref(0);

// # 送货刷新按钮
const onRefresh = async () => {
  await fetchMoTable(); // 获取 条码规则表格 数据
};
// #### 条码规则 表头
const IOColumns: PrimaryTableCol<TableRowData>[] = [
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
    title: '交易时间',
    align: 'center',
    width: '130',
  },
];

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
    title: '加工时间',
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
// ####W物料品质 表头
const mitemQualityInfo: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'billNo',
    title: '检验单号',
    align: 'center',
    width: '250',
  },
  {
    colKey: 'inspectType',
    title: '检验类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'operatorName',
    title: '检验人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'inspectResult',
    title: '质检结果',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processDate',
    title: '质检时间',
    align: 'center',
    width: '130',
  },
];

// 查询组件
const opts = computed(() => {
  return {
    searchType: {
      slotName: 'searchType',
      defaultVal: 'mintemBatch',
    },
    mitemLotNo: {
      slotName: 'mitemLotNo',
      defaultVal: '',
    },

    mitemId: {
      slotName: 'mitemId',
      defaultVal: '',
    },
    mitemLabelNo: {
      slotName: 'mitemLabelNo',
      defaultVal: '',
    },
  };
});

// 打印界面点击查询按钮
const conditionEnter = (data: any) => {
  queryCondition.value = data;

  if (queryCondition.value.searchType === 'mintemBatch') {
    queryCondition.value.mitemLabelNo = '';
  } else {
    queryCondition.value.mitemLotNo = '';
    queryCondition.value.mitemId = '';
  }

  fetchMoTable();
};
// 加载工单数据表格
const fetchMoTable = async () => {
  setLoading(true);
  try {
    if (queryCondition.value.searchType === 'mintemBatch') {
      if (!queryCondition.value.mitemId) {
        MessagePlugin.warning('请选择物料');
        return;
      }
    }

    if (tagValue.value === 0) {
      queryCondition.value.pageNum = pageUI.value.page;
      queryCondition.value.pageSize = pageUI.value.rows;
      const data = (await api.mitemForwardTrace.getMitemBasicInfo(queryCondition.value)) as any;
      if (data) {
        mitemInfo.value = data;
        mitemBaseInfoList.list = data.tableData.list;
        mitemBaseInfoTabTotal.value = data.tableData.total;
      } else {
        mitemInfo.value.lotNo = '无数据';
        mitemInfo.value.mitemCode = '无数据';
        mitemInfo.value.mitemDesc = '无数据';
        mitemInfo.value.qty = '无数据';
        mitemInfo.value.status = '无数据';
        mitemInfo.value.receiveTime = '无数据';
        mitemBaseInfoList.list = [];
        mitemBaseInfoTabTotal.value = 0;
      }
    }
    if (tagValue.value === 1) {
      queryCondition.value.pageNum = pageUIUseInfo.value.page;
      queryCondition.value.pageSize = pageUIUseInfo.value.rows;
      const data = (await api.mitemForwardTrace.getMitemUseInfo(queryCondition.value)) as any;
      mitemUseInfoList.list = data.list;
      mitemUseInfoTabTotal.value = data.total;
    }
    if (tagValue.value === 2) {
      const data = (await api.mitemForwardTrace.getSupplierInfo(queryCondition.value)) as any;
      if (data) {
        supplierInfo.value = data;
      } else {
        supplierInfo.value.contactPerson = '无数据';
        supplierInfo.value.contactTel = '无数据';
        supplierInfo.value.supplierCode = '无数据';
        supplierInfo.value.supplierName = '无数据';
      }
    }
    if (tagValue.value === 3) {
      queryCondition.value.pageNum = pageUIIOInfo.value.page;
      queryCondition.value.pageSize = pageUIIOInfo.value.rows;
      const data = (await api.mitemForwardTrace.getMitemQualityInfo(queryCondition.value)) as any;
      if (data) {
        mitemQualityInfoList.list = data.list;
        mitemQualityInfoTabTotal.value = data.total;
      }
    }
    if (tagValue.value === 4) {
      queryCondition.value.pageNum = pageUIIOInfo.value.page;
      queryCondition.value.pageSize = pageUIIOInfo.value.rows;
      const data = (await api.mitemForwardTrace.getIoInfo(queryCondition.value)) as any;
      if (data) {
        IOInfoList.list = data.list;
        IOInfoTabTotal.value = data.total;
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
