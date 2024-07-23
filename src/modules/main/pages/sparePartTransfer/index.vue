<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryParam" :opts="opts" @submit="onInput">
        <template #creatorId="{ param }">
          <bcmp-select-business v-model="param.creatorId" type="user" label="创建人"></bcmp-select-business>
        </template>
        <template #billCategory="{ param }">
          <t-select v-model="param.billCategory" :clearable="true" label="单据类型">
            <t-option
              v-for="item in billCategoryDataList.list"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </t-select>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUITop"
        empty="没有符合条件的数据"
        row-key="id"
        :fixed-height="true"
        :active-row-type="'single'"
        :hover="true"
        :table-column="columns"
        :table-data="anomalyTypeData.list"
        :total="totalTop"
        max-height="300px"
        select-on-row-click
        @refresh="onFetchData"
        @select-change="rehandleSelectChange"
      >
        <template #title>
          {{ '备品备件出入库列表' }}
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="transferIn">转入</t-button>
            <t-button theme="primary" @click="transferOut">转出</t-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="typeTableRef"
        v-model:pagination="pageUIDown"
        row-key="id"
        :show-toolbar="false"
        :table-column="typeColumns"
        :table-data="assetInfoData.list"
        :total="totalDown"
        :selected-row-keys="selectedRowKey"
      ></cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 转入编辑弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="closeTransferIn"
  >
    <t-form
      ref="inFormRef"
      :rules="rules"
      :colon="true"
      :data="sparePartData.list"
      label-width="100px"
      @submit="onAnomalyTypeSubmit"
    >
      <t-form-item label="单据号" name="sparePartCode">
        <t-input v-model="sparePartData.list.sparePartCode" :disabled="isDisabled"></t-input>
      </t-form-item>
      <t-form-item label="入库类型" name="sparePartName">
        <t-input v-model="sparePartData.list.sparePartName"></t-input>
      </t-form-item>
      <t-form-item label="备注" name="memo">
        <t-input v-model="sparePartData.list.memo"></t-input>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="closeTransferIn">取消</t-button>
      <t-button theme="primary" @click="transferInSubmit">保存</t-button>
    </template>
  </t-dialog>
  <!-- 转出编辑弹窗 -->
  <t-dialog
    v-model:visible="relationVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="closeTransferOut"
  >
    <t-form
      ref="outFormRef"
      :rules="rules"
      :colon="true"
      :data="sparePartData.list"
      label-width="100px"
      @submit="onAnomalyTypeSubmit"
    >
      <t-form-item label="单据号" name="sparePartCode">
        <t-input v-model="sparePartData.list.sparePartCode"></t-input>
      </t-form-item>
      <t-form-item label="出库类型" name="sparePartName">
        <t-input v-model="sparePartData.list.sparePartName"></t-input>
      </t-form-item>
      <t-form-item label="备注" name="memo">
        <t-input v-model="sparePartData.list.memo"></t-input>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="closeTransferOut">取消</t-button>
      <t-button theme="primary" @click="transferOutSubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as equipmentApi } from '@/api/equipment';
import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const isDisabled = ref(false); // 控件启用禁用开关
const inFormRef: Ref<FormInstanceFunctions> = ref(null); // 转入表单数据清除，获取表单实例
const outFormRef: Ref<FormInstanceFunctions> = ref(null); // 转出表单数据清除，获取表单实例
const { pageUI: pageUITop } = usePage(); // 分页工具
const { pageUI: pageUIDown } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 新增编辑 弹窗显示隐藏
const relationVisible = ref(false); // 控制 关联资产 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKey: Ref<any> = ref(); // 要删除的id
const submitFalg = ref(false);
const queryParam = ref(); // 搜索对象传递
const totalTop = ref(0);
const totalDown = ref(0);

// 编辑回填 ID
const incidentID = ref('');
// 上表格数据
const anomalyTypeData = reactive({ list: [] });
// 下表格数据
const assetInfoData = reactive({ list: [] });
// dialog 弹框数据
const sparePartData = reactive({
  list: {
    sparePartCode: '', // 备品备件编码
    sparePartName: '', // 备品备件名称
    supplierId: '', // 供应商ID
    sparePartModel: '', // 备品备件型号
    warehouseId: '', // 仓库ID
    districtId: '', // 货区ID
    uom: '', // 单位
    safetyStockQty: null, // 安全库存
    memo: '', // 备注
  },
});

// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'single' },
  {
    colKey: 'billCategoryName',
    title: '单据类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'billNo',
    title: '单据号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'relateBillNo',
    title: '关联单据号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'billBusinessTypeName',
    title: '成本类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'createTime',
    title: '创建时间',
    align: 'center',
    width: '170',
  },
];
const typeColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'sparePartCode', title: '备件编码', align: 'center', width: '200px' },
  { colKey: 'sparePartName', title: '备件名称', align: 'center' },
  { colKey: 'warehouseName', title: '源仓库', align: 'center' },
  { colKey: 'districtName', title: '源货区', align: 'center' },
  { colKey: 'toWarehouseName', title: '目标仓库', align: 'center' },
  { colKey: 'toDistrictName', title: '目标货区', align: 'center' },
  { colKey: 'qty', title: '数量', align: 'center' },
  { colKey: 'uomName', title: '单位', align: 'center' },
  { colKey: 'memo', title: '备注', align: 'center' },
];

// 表单验证规则
const rules: FormRules = {
  sparePartCode: [{ required: true, message: '备品备件编码不能为空', trigger: 'blur' }],
  sparePartName: [{ required: true, message: '备品备件名称不能为空', trigger: 'blur' }],
  supplierId: [{ required: true, message: '供应商不能为空', trigger: 'change' }],
  sparePartModel: [{ required: true, message: '备品备件型号不能为空', trigger: 'blur' }],
  warehouseId: [{ required: true, message: '仓库不能为空', trigger: 'change' }],
  uom: [{ required: true, message: '单位不能为空', trigger: 'change' }],
  safetyStockQty: [{ required: true, message: '安全库存不能为空', trigger: 'blur' }],
};
// 初始渲染
onMounted(async () => {
  await queryParam.value.search(); // 获取 表格 数据
  await onbillCategory();
});

// 刷新按钮
const onFetchData = () => {
  queryParam.value.search();
  selectedRowKey.value = '';
};

// 新增按钮点击事件
const transferIn = () => {
  isDisabled.value = false; // 控件启用禁用开关
  formVisible.value = true; // 控制 新增编辑 弹窗显示隐藏
  submitFalg.value = true; // 提交类型
  diaLogTitle.value = '转入';
  sparePartData.list.sparePartCode = ''; // 备品备件编码
  sparePartData.list.sparePartName = ''; // 备品备件名称
  sparePartData.list.supplierId = ''; // 供应商ID
  sparePartData.list.sparePartModel = ''; // 备品备件型号
  sparePartData.list.warehouseId = ''; // 仓库ID
  sparePartData.list.districtId = ''; // 货区ID
  sparePartData.list.uom = ''; // 单位
  sparePartData.list.safetyStockQty = ''; // 安全库存
  sparePartData.list.memo = ''; // 备注
};

// 右侧表格编辑按钮
const transferOut = (row: any) => {
  isDisabled.value = false; // 控件启用禁用开关
  formVisible.value = true; // 控制 新增编辑 弹窗显示隐藏
  submitFalg.value = false; // 提交类型
  diaLogTitle.value = '转出';
  incidentID.value = row.id; // 编辑回填 ID
  sparePartData.list.sparePartCode = row.sparePartCode; // 备品备件编码
  sparePartData.list.sparePartName = row.sparePartName; // 备品备件名称
  sparePartData.list.supplierId = row.supplierId; // 供应商ID
  sparePartData.list.sparePartModel = row.sparePartModel; // 备品备件型号
  sparePartData.list.warehouseId = row.warehouseId; // 仓库ID
  sparePartData.list.districtId = row.districtId; // 货区ID
  sparePartData.list.uom = row.uom; // 单位
  sparePartData.list.safetyStockQty = row.safetyStockQty; // 安全库存
  sparePartData.list.memo = row.memo; // 备注
};

// #获取搜索 单据类型 下拉框数据
const billCategoryDataList = reactive({ list: [] });
const onbillCategory = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'SP_DT' });
  billCategoryDataList.list = res;
};

// 添加异常类型请求
const onAddTypeRequest = async () => {
  await api.sparePart.add(sparePartData.list);
  await queryParam.value.search();
  MessagePlugin.success('添加成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    servicingTime: {
      label: '开始日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
    billNo: {
      label: '单据号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    creatorId: {
      label: '创建人',
      defaultVal: '',
      slotName: 'creatorId',
    },
    billCategory: {
      label: '单据类型',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'billCategory',
    },
  };
});

const onInput = async (data: any) => {
  pageUITop.value.page = 1;
  const { servicingTime, billNo, creatorId, billCategory } = data;
  const [dateStart, dateEnd] = servicingTime;
  const res = await equipmentApi.sparePartTransferHead.getList({
    pageNum: pageUITop.value.page,
    pageSize: pageUITop.value.rows,
    dateStart,
    dateEnd,
    billNo,
    creatorId,
    billCategory,
  });
  anomalyTypeData.list = res.list;
  totalTop.value = res.total;
  // MessagePlugin.success('查询成功');
};

const transferInSubmit = () => {
  inFormRef.value.submit();
};

const transferOutSubmit = () => {
  outFormRef.value.submit();
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await api.sparePart.modify({ ...sparePartData.list, id: incidentID.value });
  await queryParam.value.search();
  MessagePlugin.success('修改成功');
};

// 获取选中的备品备件ID
const rehandleSelectChange = async (value: any, context: any) => {
  const { id } = context.currentRowData;
  selectedRowKey.value = id;
  await getAssetInfo();
};

// 根据备品备件获得资产信息
const getAssetInfo = async () => {
  const res = await equipmentApi.sparePartTransferDtl.getList({
    pageNum: pageUIDown.value.page,
    pageSize: pageUIDown.value.rows,
    transferHeadId: selectedRowKey.value,
  });
  assetInfoData.list = res.list;
  totalDown.value = res.total;
};

// 关闭转入模态框事件
const closeTransferIn = () => {
  inFormRef.value.reset({ type: 'empty' });
  formVisible.value = false;
};
// 关闭转出模态框事件
const closeTransferOut = () => {
  outFormRef.value.reset({ type: 'empty' });
  formVisible.value = false;
};

// 表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddTypeRequest(); // 新增请求
    } else {
      await onRedactTypeRequest(); // 编辑请求
    }
    formVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
