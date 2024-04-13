<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryParam" :opts="opts" @submit="onInput">
        <template #warehouseId="{ param }">
          <bcmp-select-business v-model="param.warehouseId" type="warehouseAuth"></bcmp-select-business>
        </template>
        <template #districtId="{ param }">
          <bcmp-select-business
            v-model="param.districtId"
            type="district"
            :parent-id="param.warehouseId"
          ></bcmp-select-business>
        </template>
        <template #isBelowSafelyStock="{ param }">
          <t-checkbox v-model="param.isBelowSafelyStock">低于安全库存</t-checkbox>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :fixed-height="true"
        :table-data="anomalyTypeData.list"
        :total="anomalyTotal"
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchData"
        @select-change="rehandleSelectChange"
      >
        <template #title>
          {{ '备品备件台账列表' }}
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
            <t-button theme="primary" @click="onAddTypeData">新增</t-button>
            <!-- <t-button theme="default">导入</t-button> -->
            <bcmp-import-button
              theme="primary"
              type="m_spare_part"
              button-text="批量导入"
              @close="onFetchGroupData"
            ></bcmp-import-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="deleteBatches()">
              <t-button theme="default">批量删除</t-button>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    width="55%"
    top="250px"
    @close="onSecondaryReset"
  >
    <cmp-container :full="true" style="height: calc(90vh - 250px - 250px)">
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
    </cmp-container>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const isDisabled = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 要删除的id
const submitFalg = ref(false);
const queryParam = ref(); // 搜索对象传递

// 表格数据总条数
const anomalyTotal = ref(0);
// 编辑回填 ID
const incidentID = ref('');
// 表格数据
const anomalyTypeData = reactive({ list: [] });
// dialog 弹框数据
const sparePartData = reactive({
  list: {
    sparePartCode: '', // 备品备件编码
    sparePartName: '', // 备品备件名称
    supplierId: '', // 供应商ID
    sparePartModel: '', // 备品备件型号
    uom: '', // 单位
    safetyStockQty: null, // 安全库存
    memo: '', // 备注
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'sparePartCode',
    title: '备件编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'sparePartName',
    title: '备件名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'supplierName',
    title: '供应商',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'sparePartModel',
    title: '备件型号',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'warehouseName',
    title: '仓库',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'districtName',
    title: '货区',
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
    colKey: 'qty',
    title: '现有量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'safetyStockQty',
    title: '安全库存',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'memo',
    title: '备注',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// 表单验证规则
const rules: FormRules = {
  sparePartCode: [{ required: true, message: '备品备件编码不能为空', trigger: 'blur' }],
  sparePartName: [{ required: true, message: '备品备件名称不能为空', trigger: 'blur' }],
  supplierId: [{ required: true, message: '供应商不能为空', trigger: 'change' }],
  sparePartModel: [{ required: true, message: '备品备件型号不能为空', trigger: 'blur' }],
  uom: [{ required: true, message: '单位不能为空', trigger: 'change' }],
  safetyStockQty: [{ required: true, message: '安全库存不能为空', trigger: 'blur' }],
};
// 初始渲染
onMounted(async () => {
  await queryParam.value.search(); // 获取 表格 数据
});

// # 刷新按钮
const onFetchGroupData = async () => {
  await queryParam.value.search();
};

// 刷新按钮
const onFetchData = () => {
  queryParam.value.search();
  selectedRowKeys.value = [];
};

// 添加按钮点击事件
const onAddTypeData = () => {
  formRef.value.reset({ type: 'empty' });
  isDisabled.value = false;
  formVisible.value = true;
  submitFalg.value = true;
  diaLogTitle.value = '新增资产品牌';
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
    soltDemo: {
      label: '备件编码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    warehouseId: {
      label: '仓库',
      defaultVal: '',
      slotName: 'warehouseId',
    },
    districtId: {
      label: '货区',
      defaultVal: '',
      slotName: 'districtId',
    },
    isBelowSafelyStock: {
      label: '低于安全库存',
      defaultVal: true,
      slotName: 'isBelowSafelyStock',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const res = await api.sparePart.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: data.soltDemo,
    warehouseId: data.warehouseId,
    districtId: data.districtId,
    isBelowSafelyStock: data.isBelowSafelyStock,
  });
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
  MessagePlugin.success('查询成功');
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};
// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  isDisabled.value = true;
  incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑资产品牌';
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await api.sparePart.modify({ ...sparePartData.list, id: incidentID.value });
  await queryParam.value.search();
  MessagePlugin.success('修改成功');
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 右侧表格删除按钮
const onDeleteRow = (row: any) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};

// 右侧表格删除确认按钮
const onDelConfirm = async () => {
  await api.sparePart.removeBatch(selectedRowKeys.value);
  if (anomalyTypeData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await queryParam.value.search(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// 批量删除
const deleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = anomalyTypeData.list.length;
  // 步骤 2: 执行删除操作
  await api.sparePart.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === anomalyTypeData.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
    await queryParam.value.search(); // 重新渲染数组
    selectedRowKeys.value = [];
    MessagePlugin.success('批量删除成功');
  }
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
