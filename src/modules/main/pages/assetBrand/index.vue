<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
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
          {{ '资产品牌列表' }}
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
            <bcmp-import-auto-button theme="default" button-text="导入" type="m_asset_brand"></bcmp-import-auto-button>
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
    @close="onSecondaryReset"
  >
    <t-form
      ref="formRef"
      :rules="rules"
      :data="assetBrandTabData.list"
      label-width="120px"
      @submit="onAnomalyTypeSubmit"
    >
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="资产品牌编码" name="brandCode">
        <t-input v-model="assetBrandTabData.list.brandCode"></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="资产品牌名称" name="brandName">
        <t-input v-model="assetBrandTabData.list.brandName"></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="资产品牌描述" name="brandDesc">
        <t-input v-model="assetBrandTabData.list.brandDesc"></t-input>
      </t-form-item>
      <!-- 第 4️⃣ 行数据 -->
      <t-form-item label="资产类型" name="assetType">
        <bcmp-select-business
          v-model="assetBrandTabData.list.assetTypeId"
          label=""
          type="assetType"
          clearable
        ></bcmp-select-business>
      </t-form-item>
    </t-form>
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
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 要删除的id
const submitFalg = ref(false);

// 表格数据总条数
const anomalyTotal = ref(0);
// 编辑回填 ID
const incidentID = ref('');
// 表格数据
const anomalyTypeData = reactive({ list: [] });
// dialog 弹框数据
const assetBrandTabData = reactive({
  list: {
    brandCode: '', // 资产品牌编码
    brandName: '', // 资产品牌名称
    brandDesc: '', // 资产品牌描述
    assetTypeId: '', // 资产类型
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
    colKey: 'brandName',
    title: '资产品牌名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'brandCode',
    title: '资产品牌编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'epName',
    title: '企业',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'typeName',
    title: '资产类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'brandDesc',
    title: '资产品牌描述',
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
  brandCode: [{ required: true, message: '资产品牌编码不能为空', trigger: 'blur' }],
  brandName: [{ required: true, message: '资产品牌名称不能为空', trigger: 'blur' }],
  brandDesc: [{ required: true, message: '资产品牌描述不能为空', trigger: 'blur' }],
  assetTypeId: [{ required: true, message: '资产类型不能为空', trigger: 'change' }],
};
// 初始渲染
onMounted(async () => {
  await onGetAnomalyTypeData(); // 获取 表格 数据
});

// 刷新按钮
const onFetchData = () => {
  onGetAnomalyTypeData();
  selectedRowKeys.value = [];
};

// 获取 表格 数据
const onGetAnomalyTypeData = async () => {
  const res = await api.assetBrand.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
};

// 添加按钮点击事件
const onAddTypeData = () => {
  formRef.value.reset({ type: 'empty' });
  formVisible.value = true;
  assetBrandTabData.list.brandName = ''; // 资产品牌名称
  assetBrandTabData.list.brandCode = ''; // 资产品牌编码
  assetBrandTabData.list.brandDesc = ''; // 资产品牌描述
  assetBrandTabData.list.assetTypeId = '';
  submitFalg.value = true;
  diaLogTitle.value = '新增资产品牌';
};

// 下拉框点击事件
// const onObjectCodeChange = (data: { paramCode: string }) => {
//   assetBrandTabData.list.assetType = data.paramCode;
// };

// 添加异常类型请求
const onAddTypeRequest = async () => {
  await api.assetBrand.add(assetBrandTabData.list);
  await onGetAnomalyTypeData();
  MessagePlugin.success('添加成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    soltDemo: {
      label: '品牌编码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const res = await api.assetBrand.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: data.soltDemo,
  });

  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
  // MessagePlugin.success('查询成功');
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};
// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  assetBrandTabData.list.brandName = row.brandName; // 资产品牌名称
  assetBrandTabData.list.brandCode = row.brandCode; // 资产品牌编码
  assetBrandTabData.list.brandDesc = row.brandDesc; // 资产品牌描述
  assetBrandTabData.list.assetTypeId = row.assetTypeId; // 资产类型
  incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑资产品牌';
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await api.assetBrand.modify({ ...assetBrandTabData.list, id: incidentID.value });
  await onGetAnomalyTypeData();
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
  await api.assetBrand.removeBatch(selectedRowKeys.value);
  if (anomalyTypeData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// 批量删除
const deleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = anomalyTypeData.list.length;
  // 步骤 2: 执行删除操作
  await api.assetBrand.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === anomalyTypeData.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
    await onGetAnomalyTypeData(); // 重新渲染数组
    selectedRowKeys.value = [];
    MessagePlugin.success('批量删除成功');
  }
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
  assetBrandTabData.list.assetTypeId = '';
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
