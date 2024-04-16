<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryParam" :opts="opts" @submit="onInput">
        <template #userId="{ param }">
          <bcmp-select-business v-model="param.userId" type="user" label="创建人"></bcmp-select-business>
        </template>
        <template #districtId="{ param }">
          <bcmp-select-business
            v-model="param.districtId"
            type="district"
            :parent-id="param.warehouseId"
          ></bcmp-select-business>
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
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>

            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onDeleteRow(row)">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData">转入</t-button>
            <t-button :disabled="selectedRowKey != ''" heme="primary" @click="onAddSpareRelation">转出</t-button>
            <!-- <bcmp-import-button
              theme="primary"
              type="m_spare_part"
              button-text="导入"
              @close="onFetchGroupData"
            ></bcmp-import-button> -->
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
  <!-- 新增编辑弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="onSecondaryReset"
  >
    <t-form
      ref="formRef"
      :rules="rules"
      :colon="true"
      layout="inline"
      :data="sparePartData.list"
      label-width="100px"
      @submit="onAnomalyTypeSubmit"
    >
      <t-form-item label="备件编码" name="sparePartCode">
        <t-input v-model="sparePartData.list.sparePartCode" :disabled="isDisabled"></t-input>
      </t-form-item>
      <t-form-item label="备件名称" name="sparePartName">
        <t-input v-model="sparePartData.list.sparePartName"></t-input>
      </t-form-item>
      <t-form-item label="供应商" name="supplierId">
        <bcmp-select-business
          v-model="sparePartData.list.supplierId"
          label=""
          type="supplier"
          :clearable="true"
          :disabled="isDisabled"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="备件型号" name="sparePartModel">
        <t-input v-model="sparePartData.list.sparePartModel"></t-input>
      </t-form-item>
      <t-form-item label="仓库" name="warehouseId">
        <bcmp-select-business
          v-model="sparePartData.list.warehouseId"
          type="warehouseAuth"
          label=""
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="货区" name="districtId">
        <bcmp-select-business
          v-model="sparePartData.list.districtId"
          label=""
          type="district"
          :parent-id="sparePartData.list.warehouseId"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="单位" name="uom">
        <bcmp-select-business
          v-model="sparePartData.list.uom"
          label=""
          type="uom"
          :clearable="true"
          :disabled="isDisabled"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="安全库存" name="safetyStockQty">
        <t-input v-model="sparePartData.list.safetyStockQty"></t-input>
      </t-form-item>
      <t-form-item label="备注" name="memo">
        <t-input v-model="sparePartData.list.memo"></t-input>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
  <!-- 关联资产弹出框 -->
  <t-dialog v-model:visible="relationVisible" header="新增关联资产" :on-confirm="onConfirm">
    <t-form :data="formData">
      <t-form-item label="资产类型" name="assetTypeId">
        <bcmp-select-business
          v-model="formData.assetTypeId"
          :show-title="false"
          type="assetType"
          :disabled="!isEmpty(formData.assetBrandId) || !isEmpty(formData.assetModelId)"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="资产品牌" name="assetBrandId">
        <bcmp-select-business
          v-model="formData.assetBrandId"
          :is-multiple="false"
          :show-title="false"
          type="assetBrand"
          :disabled="!isEmpty(formData.assetTypeId) || !isEmpty(formData.assetModelId)"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="资产型号" name="assetModelId">
        <bcmp-select-business
          v-model="formData.assetModelId"
          :is-multiple="false"
          :show-title="false"
          type="assetModel"
          :disabled="!isEmpty(formData.assetTypeId) || !isEmpty(formData.assetBrandId)"
        ></bcmp-select-business>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const isDisabled = ref(false); // 控件启用禁用开关
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI: pageUITop } = usePage(); // 分页工具
const { pageUI: pageUIDown } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 新增编辑 弹窗显示隐藏
const relationVisible = ref(false); // 控制 关联资产 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKey: Ref<any> = ref(); // 要删除的id
const submitFalg = ref(false);
const queryParam = ref(); // 搜索对象传递
const tabValue = ref('type'); // 主界面tab的默认选中
const totalTop = ref(0);
const totalDown = ref(0);

// 关联资产确认按钮
const onConfirm = async () => {
  const { assetTypeId, assetBrandId, assetModelId } = formData.value;
  formData.value.sparePartId = selectedRowKey.value;
  // 检查是否所有的属性都不为空;
  if (!assetTypeId && !assetBrandId && !assetModelId) {
    MessagePlugin.error('资产类型、资产品牌、资产型号至少选择一个！');
    return;
  }
  await api.equipmentInSparePart.add(formData.value);
  await getAssetInfo(); // 获取 资产数据
  MessagePlugin.success('关联成功');
  relationVisible.value = false;
};

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
// 关联资产弹框数据
const formData = ref({
  sparePartId: '', // 上表格ID
  assetTypeId: '', // 资产类型ID
  assetBrandId: '', // 资产品牌ID
  assetModelId: '', // 资产型号ID
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'single' },
  {
    colKey: 'sparePartCode',
    title: '单据类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'sparePartName',
    title: '单据号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'supplierName',
    title: '关联单据号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'sparePartModel',
    title: '成本类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'warehouseName',
    title: '创建人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'districtName',
    title: '创建时间',
    align: 'center',
    width: '100',
  },
];
const typeColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'typeCode', title: '备件编码', align: 'center', width: '200px' },
  { colKey: 'typeName', title: '备件名称', align: 'center' },
  { colKey: 'typeDesc', title: '仓库', align: 'center' },
  { colKey: 'typeDesc', title: '货区', align: 'center' },
  { colKey: 'typeDesc', title: '数量', align: 'center' },
  { colKey: 'typeDesc', title: '单位', align: 'center' },
  { colKey: 'typeDesc', title: '价格', align: 'center' },
  { colKey: 'typeDesc', title: '备注', align: 'center' },
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
});

// // # 刷新按钮
// const onFetchGroupData = async () => {
//   await queryParam.value.search();
// };

// 刷新按钮
const onFetchData = () => {
  queryParam.value.search();
  selectedRowKey.value = '';
};

// 新增按钮点击事件
const onAddTypeData = () => {
  isDisabled.value = false; // 控件启用禁用开关
  formVisible.value = true; // 控制 新增编辑 弹窗显示隐藏
  submitFalg.value = true; // 提交类型
  diaLogTitle.value = '新增备品备件';
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
const onEditRow = (row: any) => {
  isDisabled.value = true; // 控件启用禁用开关
  formVisible.value = true; // 控制 新增编辑 弹窗显示隐藏
  submitFalg.value = false; // 提交类型
  diaLogTitle.value = '编辑资产品牌';
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

// 关联资产按钮点击事件
const onAddSpareRelation = () => {
  relationVisible.value = true; // 控制 关联资产 弹窗显示隐藏
  formData.value.sparePartId = '';
  formData.value.assetTypeId = '';
  formData.value.assetBrandId = '';
  formData.value.assetModelId = '';
  submitFalg.value = true; // 提交类型
  diaLogTitle.value = '备品备件关联资产';
};
// 下拉框点击事件
// const onObjectCodeChange = (data: { paramCode: string }) => {
//   sparePartData.list.assetType = data.paramCode;
// };

// 添加异常类型请求
const onAddTypeRequest = async () => {
  await api.sparePart.add(sparePartData.list);
  await queryParam.value.search();
  MessagePlugin.success('添加成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    scheduledProductionDate: {
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
    userId: {
      label: '创建人',
      defaultVal: '',
      slotName: 'userId',
    },
    districtId: {
      label: '单据类型',
      defaultVal: '',
      slotName: 'districtId',
    },
  };
});

const onInput = async (data: any) => {
  pageUITop.value.page = 1;
  const res = await api.sparePart.getList({
    pageNum: pageUITop.value.page,
    pageSize: pageUITop.value.rows,
    keyword: data.billNo,
    warehouseId: data.warehouseId,
    districtId: data.districtId,
    isBelowSafelyStock: data.isBelowSafelyStock,
  });
  anomalyTypeData.list = res.list;
  totalTop.value = res.total;
  MessagePlugin.success('查询成功');
};

const onSecondarySubmit = () => {
  formRef.value.submit();
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
  const res = await api.sparePart.getAssetInfoBySpare({
    pageNum: pageUIDown.value.page,
    pageSize: pageUIDown.value.rows,
    sparePartId: selectedRowKey.value,
    category: tabValue.value,
  });
  assetInfoData.list = res.list;
  totalDown.value = res.total;
};

// 右侧表格删除按钮
const onDeleteRow = (row: any) => {
  selectedRowKey.value = '';
  selectedRowKey.value = row.id;
};

// 右侧表格删除确认按钮
const onDelConfirm = async () => {
  await api.sparePart.removeSpare(selectedRowKey.value);
  if (anomalyTypeData.list.length <= 1 && pageUITop.value.page > 1) {
    pageUITop.value.page--;
  }
  await queryParam.value.search(); // 重新渲染数组
  selectedRowKey.value = '';
  MessagePlugin.success('删除成功');
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
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
