<template>
  <div class="module-tree-container">
    <t-card :bordered="false">
      <tm-query :opts="opts" :bool-enter="true" @submit="onInput"></tm-query>
      <t-row justify="space-between">
        <t-col :span="12" flex="auto">
          <tm-table
            ref="tableRef"
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="columns"
            :table-data="alertCfgData.list"
            :total="alertCfgTotal"
            :selected-row-keys="selectedRowKeys"
            @select-change="rehandleSelectChange"
          >
            <template #stateSwitch="{ row }">
              <t-switch
                :custom-value="[1, 0]"
                :value="row.state"
                :default-value="row.state"
                size="large"
                @change="(value) => onSwitchChange(row, value)"
              ></t-switch>
            </template>
            <template #actionSlot="{ row }">
              <t-button size="small" variant="text" @click="onEditRow(row)">
                <icon name="edit-1" class="black-icon" />
              </t-button>
              <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
                <t-button size="small" variant="text" @click="onDeleteRow(row)">
                  <icon name="delete-1" class="black-icon" />
                </t-button>
              </t-popconfirm>
            </template>
            <template #button>
              <t-space>
                <t-button theme="primary" @click="onAddCfgData"> 新增 </t-button>
                <t-button theme="default"> 导入 </t-button>
                <t-popconfirm theme="default" content="确认删除吗" @confirm="deleteBatches()">
                  <t-button theme="default"> 批量删除 </t-button>
                </t-popconfirm>
              </t-space>
            </template>
          </tm-table>
        </t-col>
      </t-row>
    </t-card>
    <!-- dialog 弹窗 -->
    <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle" width="70%">
      <t-form ref="formRef" :rules="rules" :data="CfgTabData.list" @submit="onAlertTypeSubmit">
        <!-- 第 1️⃣ 行数据 -->
        <t-form-item label="预警机制名称" name="alertType">
          <t-input v-model="CfgTabData.list.alertType"></t-input>
        </t-form-item>
        <!-- 第 2️⃣ 行数据 -->
        <t-form-item label="响应时长" name="sla">
          <t-input v-model="CfgTabData.list.sla"></t-input>
        </t-form-item>
        <!-- 第 3️⃣ 行数据 -->
        <t-form-item label="处理时长" name="ola">
          <t-input v-model="CfgTabData.list.ola"></t-input>
        </t-form-item>

        <!-- 第 4️⃣ 行数据 -->
        <t-form-item label="状态" name="state">
          <t-radio-group
            v-model="CfgTabData.list.state"
            name="city"
            :options="itemOptions"
            size="small"
          ></t-radio-group>
        </t-form-item>
        <t-row>
          <t-col :span="11" class="align-right">
            <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
            <t-button theme="primary" type="submit">保存</t-button>
          </t-col>
        </t-row>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref, watch } from 'vue';

import { api } from '@/api/daily';
import TmQuery from '@/components/tm-query/index.vue';
import TmTable from '@/components/tm-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const itemOptions = [
  { label: '禁用', value: 0 },
  { label: '启用', value: 1 },
];
const page = ref({ pageNum: pageUI.value.page, pageSize: pageUI.value.rows, keyword: '' });
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
    width: 46,
  },
  {
    colKey: 'alertType',
    title: '预警机制',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'sla',
    title: '响应时间',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'ola',
    title: '处理时间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'state',
    title: '状态',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// #表单验证规则
const rules: FormRules = {
  alertType: [{ required: true, message: '异常模块不能为空', trigger: 'blur' }],
  sla: [{ required: true, message: '异常类型名称不能为空', trigger: 'blur' }],
  ola: [{ required: true, message: '异常类型编码不能为空', trigger: 'blur' }],
  state: [{ required: true, message: '是否启用不能为空', trigger: 'blur' }],
};

// 初始渲染
onMounted(async () => {
  await onGetAlertCfgTypeData(); // 获取 表格 数据
});

// 获取 表格 数据
const onGetAlertCfgTypeData = async () => {
  const res = await api.alertCfg.getList(page.value);
  alertCfgData.list = res.list;
  alertCfgTotal.value = res.total;
};

watch(
  () => alertCfgData.list,
  (newVal, oldVal) => {
    console.log('🚀 ~ file: index.vue:185 ~ oldVal:', oldVal);
    console.log('alertCfgData.list 变化了:', newVal);
  },
  { deep: true },
);

// #新增 添加按钮点击事件
const onAddCfgData = () => {
  CfgTabData.list.alertType = ''; // 预警机制名称
  CfgTabData.list.sla = ''; // 响应时长
  CfgTabData.list.ola = ''; // 处理时长
  CfgTabData.list.state = null; // 是否启用
  submitFalg.value = true;
  formVisible.value = true;
  diaLogTitle.value = '新增预警机制';
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
  page.value.keyword = data.categoryName;
  pageUI.value.page = 1;
  const res = await api.alertCfg.getList(page.value);
  alertCfgData.list = res.list;
  alertCfgTotal.value = res.total;
  MessagePlugin.success('查询成功');
};

// 定义自定义搜索的样式
const opts = computed(() => {
  return {
    categoryName: { label: '预警机制查询', comp: 't-input', event: 'input', defaultval: '' },
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
  diaLogTitle.value = '编辑异常类型';
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
  if (alertCfgData.list.length <= 1 && page.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetAlertCfgTypeData(); // 渲染表格
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// // 批量删除
const deleteBatches = async () => {
  await api.alertCfg.removeAlertCfgBatch({ ids: selectedRowKeys.value });
  if (alertCfgData.list.length <= 1 && page.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetAlertCfgTypeData(); // 渲染表格
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
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
