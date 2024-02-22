<!-- 物料检验标准 -->
<template>
  <materialStandardAdd v-if="pageShow" @permission-show="onPermission"></materialStandardAdd>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <t-tabs v-model="tabValue" @change="tabChange">
        <!-- ###############    标准 1️⃣ 表格数据   ######## -->
        <t-tab-panel :value="0" label="标准" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :full-sub-index="[0, 1]">
              <cmp-card>
                <cmp-container :full="true">
                  <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
                    <template #creator="{ param }">
                      <t-select v-model="param.creator" label="创建人" :clearable="true">
                        <t-option key="id" label="label" value="value" />
                      </t-select>
                    </template>
                    <template #state="{ param }">
                      <t-select v-model="param.state" label="状态" :clearable="true">
                        <t-option key="id" label="label" value="value" />
                      </t-select>
                    </template>
                  </cmp-query>
                  <cmp-table
                    ref="tableRefs"
                    v-model:pagination="pageUITop"
                    empty="没有符合条件的数据"
                    row-key="moScheduleId"
                    :fixed-height="true"
                    :active-row-type="'single'"
                    :hover="true"
                    :table-column="labelPrintTop"
                    :table-data="printTopTabData.list"
                    :total="totalPrintTop"
                    select-on-row-click
                  >
                    <template #title>
                      {{ '物料检验标准列表' }}
                    </template>
                    <template #button>
                      <t-button @click="onAddClick">新增</t-button>
                      <t-button theme="default">导入</t-button>
                      <t-popconfirm content="确认删除吗">
                        <t-button theme="default" variant="base">批量删除</t-button>
                      </t-popconfirm>
                    </template>
                    <template #operation>
                      <t-link theme="primary">分配</t-link>
                      <t-link theme="primary">编辑</t-link>
                      <t-popconfirm content="继续将删除该标准对应的检验项目、物料关系、附件等，是否继续？">
                        <t-link theme="primary">删除</t-link>
                      </t-popconfirm>
                      <t-popconfirm content="失效后该标准将被禁用，同时解除物料及物料类对该标准的引用，是否继续？">
                        <t-link theme="primary">失效</t-link>
                      </t-popconfirm>
                      <t-link theme="primary">复制</t-link>
                    </template>
                  </cmp-table>
                </cmp-container>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <!-- ###############    标准分配 2️⃣ 表格数据   ######## -->
        <t-tab-panel :value="1" label="标准分配" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :full-sub-index="[0, 1]">
              <cmp-card>
                <cmp-container :full="true">
                  <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
                  <cmp-table
                    ref="tableRefCard"
                    v-model:pagination="pageUI"
                    row-key="deliveryCardId"
                    :fixed-height="true"
                    :active-row-type="'single'"
                    :hover="true"
                    :table-column="labelManage"
                    :table-data="manageTabData.list"
                    :total="totalManage"
                    select-on-row-click
                    :selected-row-keys="productSelectedRowKeys"
                  >
                    <template #title>
                      {{ '物料检验标准分配列表' }}
                    </template>
                    <template #button>
                      <t-button @click="formVisible = true">新增</t-button>
                      <t-button theme="default">导入</t-button>
                      <t-popconfirm content="确认删除吗">
                        <t-button theme="default" variant="base">批量删除</t-button>
                      </t-popconfirm>
                    </template>
                    <template #operations>
                      <t-link theme="primary"> 编辑 </t-link>
                      <t-popconfirm theme="default" content="确认删除吗">
                        <t-link theme="primary"> 删除 </t-link>
                      </t-popconfirm>
                      <t-link theme="primary"> 复制 </t-link>
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
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="新增标准分配"
    :cancel-btn="null"
    :confirm-btn="null"
  >
    <materialAllotForm></materialAllotForm>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref } from 'vue';

import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import materialAllotForm from './form.vue';
import materialStandardAdd from './materialStandardAdd.vue';

const pageShow = ref(false);
const onPermission = (value) => {
  pageShow.value = value;
};
const formVisible = ref(false);

const productSelectedRowKeys: Ref<any[]> = ref([]); // 补打 打印数组
const { pageUI: pageUITop } = usePage(); // 分页工具
const { pageUI } = usePage(); // 分页工具
const tabValue = ref(0);
const tableRefs = ref(); // 配送卡打印 上 表格 实例
const tableRefCard = ref(); // 配送卡管理 表格 实例

// !产品标签打印 上 表格数据
const printTopTabData = reactive({ list: [] });
const totalPrintTop = ref(0);

// 产品标签管理 表格数据
const manageTabData = reactive({ list: [] });
const totalManage = ref(0);

// 产品标签打印 上表格列表数据
const labelPrintTop: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'scheCode',
    title: '标准编码',
    width: '100',
  },
  {
    colKey: 'scheStatusName',
    title: '标准名称',
    width: '100',
  },
  {
    colKey: 'datetimeSche',
    title: '版本号',
    width: '100',
  },
  {
    colKey: 'mitemCode',
    title: '是否集团标准',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'mitemName',
    title: '状态',
    width: '80',
  },
  {
    colKey: 'planQty',
    title: '生效日期',
    width: '150',
  },
  {
    colKey: 'generateQty',
    title: '失效日期',
    width: '150',
  },
  {
    colKey: 'displayQty',
    title: '创建人',
    width: '100',
  },
  {
    colKey: 'thisTimeQty',
    title: '创建时间',
    width: '150',
  },
  {
    colKey: 'specificationQuantity',
    title: '最后修订人',
    width: '100',
  },
  {
    colKey: 'thisAmountSheets',
    title: '最后修订时间',
    width: '150',
  },
  {
    colKey: 'operation',
    width: '150',
    title: '操作',
    fixed: 'right',
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
    colKey: 'deliveryCardNo',
    title: '标准编码',
    width: '100',
  },
  {
    colKey: 'deliveryCardStatuName',
    title: '标准名称',
    width: '100',
  },
  {
    colKey: 'datetimeSche',
    title: '版本号',
    width: '100',
  },
  {
    colKey: 'workshopName',
    title: '物料类别编码',
    width: '100',
  },
  {
    colKey: 'workcenterName',
    title: '物料类别名称',
    width: '100',
  },
  {
    colKey: 'scheCode',
    title: '物料编码',
    width: '100',
  },
  {
    colKey: 'mitemCode',
    title: '物料名称',
    width: '100',
  },
  {
    colKey: 'mitemName',
    title: '创建人',
    width: '100',
  },
  {
    colKey: 'qty',
    title: '创建时间',
    width: '150',
  },
  {
    colKey: 'operations',
    title: '操作',
    fixed: 'right',
    width: '130',
  },
];

// #################   新增按钮点击事件  ##########################
const onAddClick = async () => {
  pageShow.value = true;
};

// // TAb 栏切换事件
const tabChange = async (value: number) => {
  console.log('🚀 ~ file: index.vue:437 ~ tabChange ~ value:', value);
};

// // #query 查询参数
const opts = computed(() => {
  return {
    nameCode: {
      label: '标准编码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    state: {
      label: '状态',
      isHide: tabValue.value,
      defaultVal: '',
      slotName: 'state',
    },
    creator: {
      label: '创建人',
      isHide: tabValue.value,
      defaultVal: '',
      slotName: 'creator',
    },
    mitemCategory: {
      label: '物料类别',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      isHide: !tabValue.value,
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitem: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      isHide: !tabValue.value,
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
// // #query 查询函数
const onInput = async (data: any) => {
  console.log('🚀 ~ file: index.vue:894 ~ onInput ~ data:', data);
  MessagePlugin.success('查询成功');
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
