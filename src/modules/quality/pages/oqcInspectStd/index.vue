<template>
  <materialStandardAdd v-if="pageShow" @permission-show="onPermission"></materialStandardAdd>
  <cmp-container v-show="!pageShow" :full="!!tagValue">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <t-tabs v-model="tagValue" @change="switchTab">
        <t-tab-panel :value="0" label="标准" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="false" :full-sub-index="[0, 1]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <!-- 查询组件  -->
                <cmp-query :opts="opts" label-width="100" @submit="conditionEnter"
                  ><template #querySelect="{ param }">
                    <t-select v-model="param.status" label="状态" clearable>
                      <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
                    </t-select> </template
                ></cmp-query>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16">
                <cmp-table
                  key="mainTable"
                  v-model:pagination="pageUI"
                  row-key="id"
                  :table-column="groupColumns"
                  :table-data="stdList.list"
                  :loading="loading"
                  :total="stdTableTotal"
                  :fixed-height="true"
                  style="height: 300px"
                  :hover="true"
                  :selected-row-keys="stdRowKeys"
                  @select-change="onSelectedChange"
                  @refresh="onRefresh"
                >
                  <template #title> 产品检验标准列表 </template>
                  <template #op="{ row }">
                    <t-space :size="8">
                      <t-link theme="primary" @click="onAssign(row)">{{ '分配' }}</t-link>
                      <t-link theme="primary" @click="onEdit(row)">{{ '编辑' }}</t-link>
                      <t-link theme="primary" @click="onDelData(row)">{{ '删除' }}</t-link>
                      <t-link theme="primary">{{ '复制' }}</t-link>
                    </t-space>
                  </template>
                  <template #button>
                    <t-space :size="8">
                      <t-button theme="primary" @click="onAdd">新增</t-button>
                      <t-button v-if="delButton" theme="default" @click="onDelDataBatch">删除</t-button>
                      <t-button v-if="enableButton" theme="primary" @click="onAdd">生效</t-button>
                      <t-button v-if="closeButton" theme="primary" @click="onAdd">失效</t-button>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <t-tab-panel :value="1" label="标准分配" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="mitemBarcodeManageOp" label-width="100" @submit="managePageSearchClick">
                  <template #querySelect="{ param }">
                    <t-select v-model="param.status" label="条码状态" clearable>
                      <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
                    </t-select> </template
                ></cmp-query>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16">
                <cmp-table
                  v-model:pagination="pageUIMannage"
                  row-key="id"
                  select-on-row-click
                  :selected-row-keys="selectedManageRowKeys"
                  :loading="loading"
                  :table-column="assignColumns"
                  :table-data="pkgManageDataList.list"
                  :total="pkgManageTabTotal"
                  :fixed-height="true"
                  style="height: 300px"
                  @select-change="onProductRightFetchData"
                >
                  <template #title> 条码列表 </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
  <t-loading :loading="pageLoading" text="加载中..." fullscreen />
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    :cancel-btn="null"
    :confirm-btn="null"
  >
    <materialAllotForm ref="formRef"></materialAllotForm>
  </t-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import materialAllotForm from './form.vue';
import materialStandardAdd from './materialStandardAdd.vue';

const formRef = ref(null); // 新增表单数据清除，获取表单实例
const formVisible = ref(false); // 新增表单数据清除，获取表单实例
const formTitle = ref('');
const pageLoading = ref(false);
const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIMannage } = usePage(); // 分页工具
// $打印上 表格数据
const stdList = reactive({ list: [] });
// $打印上 表格数据
const stdTableTotal = ref(0);
// $管理上 表格数据
const pkgManageDataList = reactive({ list: [] });
const pkgManageTabTotal = ref(0);
const isEnable = ref(true); // 控制打印按钮禁用
// 日志界面 表格数据
const stdRowKeys: Ref<any[]> = ref([]); //
const selectedManageRowKeys: Ref<any[]> = ref([]); // 打印数组
// 补打，作废 DiaLog 数据
const reprintDialog = ref({
  reprintData: '',
  restsData: '',
  labelNo: '',
  labelId: '',
  splitNum: '',
  qty: 0,
});
const pageShow = ref(false);
const onPermission = (value) => {
  pageShow.value = value;
  onRefresh();
};

// 标准头表查询初始化
const queryCondition = ref({
  inspectStdCode: '',
  status: '',
  creator: '',
  pageNum: 1,
  pageSize: 20,
});
// 管理上方查询初始化
const manageQueryCondition = ref({
  mitemId: '',
  supplierId: '',
  status: '',
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
const statusNameArr = ref([]);
const onProductRightFetchData = (value: any, context: any) => {
  selectedManageRowKeys.value = value;
  isEnable.value = !(selectedManageRowKeys?.value?.length > 0);
  reprintDialog.value.labelNo = context.selectedRowData[0].labelNo;
  reprintDialog.value.qty = context.selectedRowData[0].qty;
  reprintDialog.value.labelId = context.selectedRowData[0].id;
  statusNameArr.value = context.selectedRowData.map((item: any) => item.statusName);
};

// # 送货刷新按钮
const onRefresh = async () => {
  await fetchMoTable(); // 获取 条码规则表格 数据
};

const onAdd = () => {
  pageShow.value = true;
};
const enableButton = ref(false);
const closeButton = ref(false);
const delButton = ref(false);
const onSelectedChange = (value: any) => {
  stdRowKeys.value = value;
  const selectedItems = stdList.list.filter((item: any) => stdRowKeys.value.includes(item.id));
  if (selectedItems.length > 0) {
    const firstStatusName = selectedItems[0].statusName;
    const allSameStatusName = selectedItems.every((item: any) => item.statusName === firstStatusName);
    if (allSameStatusName) {
      if (firstStatusName === '已生效') {
        enableButton.value = false;
        closeButton.value = true;
      } else if (firstStatusName === '已失效') {
        enableButton.value = true;
        closeButton.value = false;
      } else if (firstStatusName === '起草中') {
        enableButton.value = false;
        closeButton.value = false;
        delButton.value = true;
      }
    } else {
      enableButton.value = false;
      closeButton.value = false;
      delButton.value = false;
    }
  } else {
    enableButton.value = false;
    closeButton.value = false;
    delButton.value = false;
  }
};
const onEdit = (row) => {
  formRef.value.dtlRowKeys = [];
  formRef.value.ids = [];
  formRef.value.formData = row;
  formRef.value.formData.operateTpye = 'edit';
  formRef.value.formData.revision = row.revisionName;
  pageShow.value = true;
  formTitle.value = '编辑产品检验标准';
  formRef.value.getDtlByStdId();
};
const onDelData = async (row) => {
  await apiQuality.oqcInspectStd.delById([row.id]);
  MessagePlugin.success('删除成功');
  onRefresh();
};
const onAssign = async (row) => {
  formRef.value.formData.type = '01';
  formRef.value.formData.id = row.id;
  formRef.value.formData.inspectStdName = row.inspectStdName;

  formVisible.value = true;
};
const onDelDataBatch = async () => {
  await apiQuality.oqcInspectStd.delById(stdRowKeys.value);
  MessagePlugin.success('删除成功');
  onRefresh();
};

const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    align: 'left',
    width: '30',
  },
  {
    colKey: 'inspectStdCode',
    title: '标准编码',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'inspectStdName',
    title: '标准名称',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'revisionName',
    title: '版本号',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'isGroupName',
    title: '是否集团标准',
    align: 'left',
    width: '150',
  },
  {
    colKey: 'statusName',
    title: '状态',
    align: 'left',
    width: '70',
  },
  {
    colKey: 'timeEffective',
    title: '生效时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'timeInvalid',
    title: '失效时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'op',
    title: '操作',
    fixed: 'right',
    align: 'left',
    width: '160',
  },
];
const assignColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    align: 'left',
    width: '30',
  },
  {
    colKey: 'inspectStdCode',
    title: '标准编码',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'inspectStdName',
    title: '标准名称',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'revision',
    title: '版本号',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'isGroupName',
    title: '是否集团标准',
    align: 'left',
    width: '150',
  },
  {
    colKey: 'statusName',
    title: '状态',
    align: 'left',
    width: '70',
  },
  {
    colKey: 'timeEffective',
    title: '生效时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'timeInvalid',
    title: '失效时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'op',
    title: '操作',
    fixed: 'right',
    align: 'left',
    width: '160',
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
const conditionEnter = (data: any) => {
  queryCondition.value.inspectStdCode = data.inspectStdCode;
  queryCondition.value.status = data.status;
  queryCondition.value.creator = data.creator;
  fetchMoTable();
};
// 管理界面点击查询按钮
const managePageSearchClick = (data: any) => {
  const [timeCreatedStart, timeCreatedEnd] = data.timeCreatedRange;
  manageQueryCondition.value.timeCreatedStart = timeCreatedStart;
  manageQueryCondition.value.timeCreatedEnd = timeCreatedEnd;
  manageQueryCondition.value.barcode = data.barcode;
  manageQueryCondition.value.status = data.status;
  manageQueryCondition.value.billNo = data.billNo;
  manageQueryCondition.value.mitemId = data.mitemId;
  manageQueryCondition.value.supplierId = data.supplierId;
  selectedManageRowKeys.value = [];
  isEnable.value = true;
};
// 加载工单数据表格
const fetchMoTable = async () => {
  setLoading(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await apiQuality.oqcInspectStd.getOqcInspectList(queryCondition.value)) as any;
    const { list } = data;
    stdList.list = list;
    stdTableTotal.value = data.total;
    if (
      data.total !== 0 &&
      stdTableTotal.value < pageUI.value.page * pageUI.value.rows &&
      data.list &&
      data.list.length === 0
    ) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 查询组件
const opts = computed(() => {
  return {
    inspectStdCode: {
      label: '标准编码/名称',
      comp: 't-input',
      defaultVal: '',
    },
    status: {
      label: '条码状态',
      event: 'input',
      defaultVal: '',
      slotName: 'querySelect',
    },
    creator: {
      label: '创建人',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
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
    status: {
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
  };
});

// 获取 作废原因 下拉数据
const cancellationDataList = reactive({ list: [] });
const onCancellationSelextData = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'SCRAP_REASON' });
  cancellationDataList.list = [...res, { label: '其他原因', value: '其他原因' }];
};

const statusOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'OQC_INSPECT_STD_STATUS' }).then((data) => {
  statusOption.value = data;
});
// ################ 初始渲染
onMounted(async () => {
  await fetchMoTable(); // 获取 物料编码 表格数据
  await onCancellationSelextData(); // 获取作废原因列表
});
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
