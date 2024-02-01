<!-- 配送指令 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query ref="queryRef" :opts="opts" is-expansion @submit="onInput" @reset="selectedRowKeys = []"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :empty="t('common.table.noMatchingData')"
        :table-column="columns"
        :fixed-height="true"
        :table-data="deliveryData"
        :total="deliveryTotal"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchData"
        @select-change="onSelectChange"
      >
        <template #title>
          {{ t('materialRequisition.deliveryCardCommandList') }}
        </template>
        <template #operation="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
          </t-space>
        </template>
        <template #button>
          <t-button theme="primary" @click="onAddClick">{{ t('common.button.add') }}</t-button>
          <t-popconfirm theme="default" content="t('common.message.confirmDelete')" @confirm="onDeleteBatches()">
            <t-button theme="default" :disabled="selectedRowKeys.length < 1">{{
              t('common.button.cancellation')
            }}</t-button>
          </t-popconfirm>
          <t-button theme="default" :disabled="selectedRowKeys.length < 1" @click="onClickAddMaterialRule">
            {{ t('materialRequisition.deliveryOrderCreation') }}
          </t-button>
          <t-button theme="default">{{ t('common.button.export') }}</t-button>
          <t-button theme="default">{{ t('common.button.print') }}</t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- # 表单 dialog弹框 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" width="850px">
    <t-form ref="formRef" :rules="rules" :data="deliveryFormParam" @submit="onAnomalyTypeSubmit">
      <t-row :gutter="[32, 16]">
        <!-- 第 1️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.lineSideWarehouseCode')" name="warehouseId">
            <bcmp-select-business
              v-model="deliveryFormParam.warehouseId"
              label=""
              type="lineWarehouse"
              :clearable="true"
              :disabled="!isSubmit"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.moScheCodes')" name="moScheId">
            <bcmp-select-business
              v-model="deliveryFormParam.moScheId"
              label=""
              type="moSchedule"
              :clearable="true"
              :disabled="!isSubmit"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.mitemCode')" name="mitemId">
            <bcmp-select-business
              v-model="deliveryFormParam.mitemId"
              label=""
              type="mitem"
              :clearable="true"
              :disabled="!isSubmit"
              @selection-change="onMitemIdSelect"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.mitemDesc')" name="miteDecs">
            <t-input v-model="deliveryFormParam.miteDecs" disabled></t-input>
          </t-form-item>
        </t-col>
        <!-- 第 3️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.uom')" name="uom">
            <t-input v-model="deliveryFormParam.uom" disabled></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.deliveryQuantity')" name="deliveryQty">
            <t-input-number
              v-model="deliveryFormParam.deliveryQty"
              theme="column"
              style="width: 100%"
              min="0"
            ></t-input-number>
          </t-form-item>
        </t-col>
        <!-- 第 4️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('materialRequisition.remark')" name="memo">
            <t-textarea v-model="deliveryFormParam.memo" name="description" :autosize="{ minRows: 3, maxRows: 5 }" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">{{ t('common.button.save') }}</t-button>
    </template>
  </t-dialog>
  <!--领料制单主表弹框-->
  <formMaterialRequisition
    ref="formCardRef"
    :is-add="isAdd"
    :row="selectMaterialRow"
    :id-collection="idCollection"
    @show-close-event="onHandleShowClose"
  ></formMaterialRequisition>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import formMaterialRequisition from './formMaterialRequisition.vue';
import { useLang } from './lang';

const { t } = useLang();

const selectedRowKeys: Ref<any[]> = ref([]); // table选中 id
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const formCardRef = ref(null);
const queryRef = ref();
const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false);
const isSubmit = ref(true); // 新增 or 编辑
const selectMaterialRow = ref({}) as any; // 选中领料制单行
const state = reactive({
  checkOptions: [
    { label: t('common.button.selectAll'), value: '', checkAll: true },
    { value: 'DELIVERED', label: t('materialRequisition.delivered') },
    { value: 'CREATED', label: t('materialRequisition.generated') },
    { value: 'REQUIRED', label: t('materialRequisition.orderCreated') },
    { value: 'CANCEL', label: t('materialRequisition.expired') },
  ],
});

// 表格数据总条数
const deliveryTotal = ref(0);
// 表格数据
const deliveryData = ref([]);
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'warehouseCode',
    title: t('materialRequisition.lineSideWarehouseCode'),
    width: '110',
  },
  {
    colKey: 'warehouseName',
    title: t('materialRequisition.lineSideWarehouseName'),
    width: '150',
  },
  {
    colKey: 'scheCode',
    title: t('materialRequisition.productionOrder'),
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: t('materialRequisition.mitemCode'),
    width: '150',
  },
  {
    colKey: 'mitemDesc',
    title: t('materialRequisition.mitemDesc'),
    width: '150',
  },
  {
    colKey: 'deliveryQty',
    title: t('materialRequisition.deliveryQuantity'),
    width: '100',
  },
  {
    colKey: 'uomName',
    title: t('materialRequisition.uom'),
    width: '100',
  },
  {
    colKey: 'deliveryBillNo',
    title: t('materialRequisition.deliveryDocumentNumber'),
    width: '10',
  },
  {
    colKey: 'statusName',
    title: t('materialRequisition.commandStatus'),
    width: '100',
  },
  {
    colKey: 'modifierName',
    title: t('materialRequisition.lastUpdatedBy'),
    width: '100',
  },
  {
    colKey: 'timeModified',
    title: t('materialRequisition.lastUpdateTime'),
    width: '150',
  },
  {
    colKey: 'operation',
    title: t('common.button.operation'),
    fixed: 'right',
    width: '100',
  },
];
// 表单定义规则
function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: t('common.validation.digits'), type: 'error' };
  }
  if (Number(value) < 0) {
    return { result: false, message: t('common.validation.number'), type: 'error' };
  }
  return true;
}
const rules: FormRules = {
  warehouseId: [{ required: true, trigger: 'change' }],
  moScheId: [{ required: true, trigger: 'change' }],
  mitemId: [{ required: true, trigger: 'change' }],
  miteDecs: [{ required: false, trigger: 'blur' }],
  uom: [{ required: false, trigger: 'blur' }],
  deliveryQty: [
    { required: true, trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
  memo: [{ required: false, trigger: 'blur' }],
};
const eidtFormSubmit = () => {
  formRef.value.submit();
};
// 初始渲染
onMounted(async () => {
  await onGetDeliveryData(); // 获取 表格 数据
});

// 刷新按钮
const onFetchData = async () => {
  await onGetDeliveryData();
  selectedRowKeys.value = [];
};

// 表单 数据 新增
const deliveryFormParam = ref({
  warehouseId: '', // 线边仓编码
  moScheId: '', // 排产单号
  mitemId: '', // 物料编码
  miteDecs: '', // 物料描述
  uom: '', // 单位
  deliveryQty: null, // 配送数量
  memo: '', // 备注
});

// 物料描述，单位回填
const onMitemIdSelect = (context) => {
  deliveryFormParam.value.miteDecs = context.mitemDesc;
  deliveryFormParam.value.uom = context.uom;
};

// 主界面数据
// 获取本月一号 00:00:00
const startOfSevenDaysAgo = dayjs().startOf('month');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');
const deliveryParam = ref({
  pageNum: 1,
  pageSize: 10,
  warehouseId: '', // 线边仓
  mitemId: '', // 物料
  deliveryBillNo: '', // 配送单号
  status: [], // 状态
  dateStart: startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), // 开始时间
  dateEnd: endOfToday.format('YYYY-MM-DD HH:mm:ss'), // 结束时间
});

// 获取 主表格 数据
const onGetDeliveryData = async () => {
  deliveryParam.value.pageNum = pageUI.value.page;
  deliveryParam.value.pageSize = pageUI.value.rows;
  const res = await api.deliveryCommand.getList(deliveryParam.value);
  deliveryData.value = res.list;
  deliveryTotal.value = res.total;
};

// 新增点击事件
const onAddClick = () => {
  formVisible.value = true;
  formRef.value.reset({ type: 'empty' });
  // formRef.value.clearValidate();
  isSubmit.value = true;
};
// 新增事件
const onAddDeliveryData = async () => {
  await api.deliveryCommand.add(deliveryFormParam.value);
  await onGetDeliveryData(); // 获取 数据
  formVisible.value = false;
  MessagePlugin.success(t('common.message.addSuccess'));
};

// 编辑点击事件
const onEditRowID = ref('');
const onEditRow = (row: any) => {
  Object.keys(row).forEach((key) => {
    if (key in deliveryFormParam.value) {
      deliveryFormParam.value[key] = row[key];
    }
  });
  onEditRowID.value = row.id;
  formVisible.value = true;
  isSubmit.value = false;
};

// 编辑事件
const onEditDeliveryData = async () => {
  await api.deliveryCommand.modify({ ...deliveryFormParam.value, id: onEditRowID.value });
  await onGetDeliveryData(); // 获取 数据
  formVisible.value = false;
  MessagePlugin.success(t('common.message.editSuccess'));
};
const selectData = ref([]);
const warehouseNameArr = ref([]); // 筛选的 仓库名称 数组
const onSelectChange = (value, context) => {
  // 清除 dialog 表单
  const { reset } = formCardRef.value;
  reset();
  selectData.value = context.selectedRowData;
  warehouseNameArr.value = context.selectedRowData.map((item) => item.warehouseName);
  // 筛选出一个ID 合集 id'不重复
  selectedRowKeys.value = value;
};

// 作废点击事件
const onDeleteBatches = async () => {
  await api.deliveryCommand.removeBatch(selectedRowKeys.value);
  await onGetDeliveryData(); // 获取 表格 数据
  MessagePlugin.success(t('common.message.invalidationSuccess'));
};

// #query 查询参数
const opts = computed(() => {
  return {
    warehouseId: {
      label: t('materialRequisition.lineSideWarehouse'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    mitemId: {
      label: t('materialRequisition.material'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    deliveryBillNo: {
      label: t('materialRequisition.deliveryOrderNumber'),
      comp: 't-input',
      event: 'business',
      defaultVal: '',
    },
    receiveDate: {
      label: t('materialRequisition.creationTime'),
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), endOfToday.format('YYYY-MM-DD HH:mm:ss')], // 初始化日期控件
      bind: {
        enableTimePicker: true,
        // format: 'YYYY-MM-DD',
      },
    },
    status: {
      label: t('materialRequisition.status'),
      comp: 't-checkbox-group',
      event: 'checkboxgroup',
      flex: '600px',
      defaultVal: [],
      bind: {
        options: state.checkOptions,
      },
    },
  };
});

// 搜索提交事件
const onInput = async (data: any) => {
  const [dateStart, dateEnd] = data.receiveDate;
  pageUI.value.page = 1;
  Object.keys(data).forEach((key) => {
    if (key in deliveryParam.value) {
      deliveryParam.value[key] = data[key];
    }
  });
  deliveryParam.value.dateStart = dateStart;
  deliveryParam.value.dateEnd = dateEnd;
  await onGetDeliveryData();
};

// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (isSubmit.value) {
      await onAddDeliveryData(); // 新增请求
    } else {
      await onEditDeliveryData(); // 编辑请求
    }
  }
};

// 弹出新增领料制单界面
const idCollection = ref({
  warehouseId: [], // 线边仓编码
  moScheId: [], // 排产单号
  mitemId: [], // 物料编码
});
const formCardVisible = ref(false); // 显示和隐藏领料制单弹出框
const isAdd = ref(true);
const onClickAddMaterialRule = () => {
  const flag = warehouseNameArr.value.every((e) => e === warehouseNameArr.value[0]);
  if (!flag) {
    MessagePlugin.warning(t('materialRequisition.pleaseSelectTheSameLineSideWarehouse'));
    return;
  }
  idCollection.value.warehouseId = Array.from(new Set(selectData.value.map((item) => item.warehouseId)));
  idCollection.value.moScheId = Array.from(new Set(selectData.value.map((item) => item.moScheId)));
  idCollection.value.mitemId = Array.from(new Set(selectData.value.map((item) => item.mitemId)));
  const { showPopform } = formCardRef.value;
  showPopform();
  formCardVisible.value = true;
  isAdd.value = true;
};

// 新增界面-提交后调用
const onHandleShowClose = async () => {
  await onGetDeliveryData(); // 获取 表格 数据
  selectedRowKeys.value = [];
};
</script>

<style lang="less" scoped></style>
