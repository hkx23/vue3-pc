<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query ref="queryRef" :opts="opts" is-expansion @submit="onInput" @reset="selectedRowKeys = []"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :table-data="alertCfgData.list"
        :total="alertCfgTotal"
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onFetchData"
      >
        <template #title>
          {{ '预警机制列表' }}
        </template>
        <template #stateSwitch="{ row }">
          <t-switch
            :custom-value="[1, 0]"
            :value="row.state"
            :default-value="row.state"
            @change="(value) => onSwitchChange(row, value)"
          ></t-switch>
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
            <!-- <t-button size="small" variant="text" @click="onEditRow(row)">
              <icon name="edit-1" class="black-icon" />
            </t-button> -->
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onDeleteRow(row)">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddCfgData"> 新增 </t-button>
            <bcmp-import-auto-button theme="default" button-text="导入" type="a_alert_cfg"></bcmp-import-auto-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="deleteBatches()">
              <t-button theme="default"> 批量删除 </t-button>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="CfgTabData.list" label-width="120px" @submit="onAlertTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="预警机制名称" name="alertType">
        <t-input v-model="CfgTabData.list.alertType"></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="响应时长" name="sla">
        <t-input-number v-model="CfgTabData.list.sla" theme="column" style="width: 100%" min="0"></t-input-number>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="处理时长" name="ola">
        <t-input-number v-model="CfgTabData.list.ola" theme="column" style="width: 100%" min="0"></t-input-number>
      </t-form-item>

      <!-- 第 4️⃣ 行数据 -->
      <t-form-item label="状态" name="state">
        <t-radio-group v-model="CfgTabData.list.state" name="city" :options="itemOptions" size="small"></t-radio-group>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="formSubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'AlertCfg',
};
</script>
<script setup lang="ts">
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const itemOptions = [
  { label: '禁用', value: 0 },
  { label: '启用', value: 1 },
];
const submitFalg = ref(false);

// 编辑回填 ID
const alertTypeID = ref('');

// 表格数据总条数
const alertCfgTotal = ref(null);
// 表格数据
const alertCfgData = reactive({ list: [] });
// dialog 表单 弹框数据
const CfgTabData = reactive({
  list: {
    alertType: '', // 预警机制名称
    sla: null, // 响应时长
    ola: null, // 处理时长
    state: null, // 状态
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: '50',
  },
  {
    colKey: 'alertType',
    title: '预警机制',
    width: '110',
  },
  {
    colKey: 'sla',
    title: '响应时间',
    width: '110',
  },
  {
    colKey: 'ola',
    title: '处理时间',
    width: '130',
  },
  {
    colKey: 'state',
    title: '状态',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'ope',
    title: '操作',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// #表单验证规则
const rules: FormRules = {
  alertType: [{ required: true, message: '预警机制不能为空', trigger: 'blur' }],
  sla: [
    { required: true, message: '响应时长不能为空', trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
  ola: [
    { required: true, message: '处理时长不能为空', trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
  state: [{ required: true, message: '是否启用不能为空', trigger: 'change' }],
};

function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '该字段必须是数字', type: 'error' };
  }
  if (Number(value) < 0) {
    return { result: false, message: '该字段不能为负数', type: 'error' };
  }
  return true;
}

// 初始渲染
onMounted(async () => {
  await onGetAlertCfgTypeData(); // 获取 表格 数据
});

// 刷新按钮
const onFetchData = async () => {
  await onGetAlertCfgTypeData(); // 获取 表格 数据
  selectedRowKeys.value = [];
};

// 获取 表格 数据
const onGetAlertCfgTypeData = async () => {
  const res = await api.alertCfg.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: '',
  });
  alertCfgData.list = res.list;
  alertCfgTotal.value = res.total;
};

// #新增 添加按钮点击事件
const onAddCfgData = () => {
  formRef.value.reset({ type: 'empty' });
  submitFalg.value = true;
  formVisible.value = true;
  diaLogTitle.value = '新增预警机制';
};
const formSubmit = () => {
  formRef.value.submit();
};

// 新增异常类型请求;
const onAddAlertCfgRequest = async () => {
  await api.alertCfg.addAlertCfg(CfgTabData.list);
  await onGetAlertCfgTypeData(); // 渲染表格
  MessagePlugin.success('添加成功');
};

// switch 开关事件
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  await api.alertCfg.modifyAlertCfg({
    state: isValue,
    ola: row.ola,
    sla: row.sla,
    id: row.id,
  });
  await onGetAlertCfgTypeData();
  MessagePlugin.success('操作成功');
};

// 模糊查询事件事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const res = await api.alertCfg.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: data.categoryName,
  });
  alertCfgData.list = res.list;
  alertCfgTotal.value = res.total;
  // MessagePlugin.success('查询成功');
};

// 定义自定义搜索的样式
const opts = computed(() => {
  return {
    categoryName: { label: '预警机制', comp: 't-input', event: 'input', defaultval: '', labelWidth: '100px' },
  };
});

// // 右侧表格编辑按钮
const onEditRow = (row: any) => {
  CfgTabData.list.alertType = row.alertType;
  CfgTabData.list.sla = row.sla; // 异常类型名称
  CfgTabData.list.ola = row.ola; // 异常类型编码
  CfgTabData.list.state = row.state; // 是否启用
  alertTypeID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑预警机制';
};

// 编辑表格数据 请求
const onAlertTypeRequest = async () => {
  await api.alertCfg.modifyAlertCfg({ ...CfgTabData.list, id: alertTypeID.value });
  await onGetAlertCfgTypeData(); // 渲染表格
  MessagePlugin.success('修改成功');
};

// // 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// // 右侧表格删除按钮
const onDeleteRow = (row: any) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};
// // 右侧表格删除确认按钮
const onDelConfirm = async () => {
  await api.alertCfg.removeAlertCfgBatch({ ids: selectedRowKeys.value });
  if (alertCfgData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onGetAlertCfgTypeData(); // 渲染表格
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// // 批量删除
const deleteBatches = async () => {
  if (selectedRowKeys.value.length === 0) {
    MessagePlugin.warning('请选择要删除的数据');
    return;
  }
  // 步骤 1: 检查删除前的数据总量
  const initialLength = alertCfgData.list.length;
  // 步骤 2: 执行删除操作
  await api.alertCfg.removeAlertCfgBatch({ ids: selectedRowKeys.value });

  pageUI.value.page = 1;
  await onGetAlertCfgTypeData(); // 渲染表格
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
  // 步骤 3: 检查当前页是否还有数据
};

// // 表单提交事件
const onAlertTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddAlertCfgRequest(); // 新增请求
    } else {
      await onAlertTypeRequest(); // 编辑请求
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
