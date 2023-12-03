<template>
  <div class="module-tree-container">
    <t-card :bordered="false">
      <t-row justify="space-between">
        <t-col :span="12" flex="auto">
          <tm-table
            ref="tableRef"
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="columns"
            :table-data="anomalyTypeData.list"
            :total="anomalyTotal"
            :selected-row-keys="selectedRowKeys"
            @refresh="onFetchData"
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
            <template #required="{ row }">
              <t-checkbox v-model="row.required"></t-checkbox>
            </template>
            <template #multiterm="{ row }">
              <t-checkbox v-model="row.multiterm"></t-checkbox>
            </template>
            <template #verify="{ row }">
              <t-checkbox v-model="row.verify"></t-checkbox>
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
                <t-button theme="primary" @click="onAddTypeData"> 新建 </t-button>
                <t-button theme="default"> 导入 </t-button>
                <t-popconfirm theme="default" content="确认删除吗" @confirm="deleteBatches()">
                  <t-button theme="default"> 批量删除 </t-button>
                </t-popconfirm>
              </t-space>
              <t-form>
                <t-form-item
                  label-width="200px"
                  label="异常类型编码/名称:"
                  name="displayName"
                  style="display: inline-block"
                >
                  <t-input v-model="searchData.inputData"></t-input>
                </t-form-item>
                <t-form-item label="异常模块" name="propertyValueType" style="display: inline-block">
                  <t-select v-model="searchData.selectData" @change="onSearchSelect">
                    <t-option v-for="item in DropDownData.list" :key="item.id" :label="item.paramValue" :value="item" />
                  </t-select>
                </t-form-item>
              </t-form>
              <t-space>
                <t-button theme="primary" @click="searchButton"> 查询 </t-button>
                <t-button theme="default" @click="resetButton"> 重置 </t-button>
              </t-space>
            </template>
          </tm-table>
        </t-col>
      </t-row>
    </t-card>
    <!-- dialog 弹窗 -->
    <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle" width="70%">
      <t-form ref="formRef" :rules="rules" :data="anomalyTypeTabData.list" @submit="onAnomalyTypeSubmit">
        <!-- 第 1️⃣ 行数据 -->
        <t-form-item label="异常模块" name="propertyValueType">
          <t-select v-model="incidentMdName" @change="onObjectCodeChange">
            <t-option v-for="item in DropDownData.list" :key="item.id" :label="item.paramValue" :value="item" />
          </t-select>
        </t-form-item>
        <!-- 第 2️⃣ 行数据 -->
        <t-form-item label="异常类型名称" name="incidentName">
          <t-input v-model="anomalyTypeTabData.list.incidentName"></t-input>
        </t-form-item>
        <!-- 第 3️⃣ 行数据 -->
        <t-form-item label="异常类型编码" name="incidentCode">
          <t-input v-model="anomalyTypeTabData.list.incidentCode"></t-input>
        </t-form-item>

        <!-- 第 4️⃣ 行数据 -->
        <t-form-item label="是否启用" name="state">
          <t-radio-group
            v-model="anomalyTypeTabData.list.state"
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
import { onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/daily';
import TmTable from '@/components/tm-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const searchData = ref({
  inputData: '',
  selectData: '',
  selectCode: '',
});
const DropDownData = reactive({ list: [] });
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

// 表格数据总条数
const anomalyTotal = ref(null);
// 编辑回填 ID
const incidentID = ref('');
// 表格数据
const anomalyTypeData = reactive({ list: [] });
// dialog 弹框数据
const incidentMdName = ref('');
const anomalyTypeTabData = reactive({
  list: {
    incidentName: '', // 异常类型名称
    incidentModule: '', // 异常模块
    incidentCode: '', // 异常类型编码
    state: null, // 是否启用
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
    colKey: 'incidentModule',
    title: '异常模块',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'incidentCode',
    title: '异常类型编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'incidentName',
    title: '异常类型名称',
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
    colKey: 'creatorName',
    title: '创建人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    align: 'center',
    width: '100',
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

const rules: FormRules = {
  propertyValueType: [{ required: false, message: '异常模块不能为空', trigger: 'change' }],
  incidentName: [{ required: true, message: '异常类型名称不能为空', trigger: 'blur' }],
  incidentCode: [{ required: true, message: '异常类型编码不能为空', trigger: 'blur' }],
  state: [{ required: true, message: '是否启用不能为空', trigger: 'blur' }],
};
// 初始渲染
onMounted(async () => {
  await onGetAnomalyTypeData(); // 获取 表格 数据
  await onGetDropDownData(); // 获取下拉框数据
});

const onFetchData = () => {
  onGetAnomalyTypeData();
};

// 获取 表格 数据
const onGetAnomalyTypeData = async () => {
  const res = await api.incidentType.getList(page.value);
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
};

// 获取下拉框数据
const onGetDropDownData = async () => {
  const res = await api.incidentType.getIncidentType();
  DropDownData.list = res.list;
};

// 添加按钮点击事件
const onAddTypeData = () => {
  anomalyTypeTabData.list.incidentModule = '';
  anomalyTypeTabData.list.incidentName = ''; // 异常类型名称
  incidentMdName.value = ''; // 异常模块
  anomalyTypeTabData.list.incidentCode = ''; // 异常类型编码
  anomalyTypeTabData.list.state = null; // 是否启用
  submitFalg.value = true;
  formVisible.value = true;
  diaLogTitle.value = '添加异常类型';
};

// 搜索下拉框事件
const onSearchSelect = (data) => {
  console.log('🚀 ~ file: index.vue:232 ~ onSearchSelect ~ data:', data);
  searchData.value.selectCode = data.paramCode;
};

// 下拉框点击事件
const onObjectCodeChange = (data: { paramCode: string }) => {
  anomalyTypeTabData.list.incidentModule = data.paramCode;
};

// 添加异常类型请求
const onAddTypeRequest = async () => {
  await api.incidentType.addIncidentType(anomalyTypeTabData.list);
  await onGetAnomalyTypeData();
  MessagePlugin.success('添加成功');
};

// switch 开关事件
const onSwitchChange = async (row: { incidentName: any; id: any }, value: any) => {
  const isValue = value ? 1 : 0;
  await api.incidentType.modifyIncidentType({
    state: isValue,
    incidentName: row.incidentName,
    id: row.id,
  });
  await onGetAnomalyTypeData();
  MessagePlugin.success('操作成功');
};
// 查询事件
const searchButton = async () => {
  pageUI.value.page = 1;
  const res = await api.incidentType.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: searchData.value.inputData,
    selectKeyword: searchData.value.selectCode,
  });
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
  MessagePlugin.success('查询成功');
};
// 重置事件
const resetButton = () => {
  searchData.value.inputData = '';
  searchData.value.selectCode = '';
  searchData.value.selectData = '';
};

/** **
 * // 勿删
 * // 定义自定义搜索的样式
// const opts = computed(() => {
//   return {
//     categoryName: { label: '异常类型编码/名称:', comp: 't-input', event: 'input', defaultval: '' },
//     methodCodeName: { label: '异常模块', comp: 't-input', event: 'input', defaultval: '' },
//   };
// });
// 上侧搜索提交事件
// const onInput = async (data: any) => {
//   pageUI.value.page = 1;
//   await api.incidentType.getList({ pageNum: pageUI.value.page, pageSize: pageUI.value.rows });
// };
 * 
 */

// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  incidentMdName.value = row.incidentModuleName;
  anomalyTypeTabData.list.incidentModule = row.incidentModule;
  anomalyTypeTabData.list.incidentName = row.incidentName; // 异常类型名称
  anomalyTypeTabData.list.incidentCode = row.incidentCode; // 异常类型编码
  anomalyTypeTabData.list.state = row.state; // 是否启用
  incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑异常类型';
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await api.incidentType.modifyIncidentType({ ...anomalyTypeTabData.list, id: incidentID.value });
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
  await api.incidentType.removeIncidentTypeBatch({ ids: selectedRowKeys.value });
  if (anomalyTypeData.list.length <= 1 && page.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// 批量删除
const deleteBatches = async () => {
  await api.incidentType.removeIncidentTypeBatch({ ids: selectedRowKeys.value });
  if (anomalyTypeData.list.length <= 1 && page.value.pageNum > 1) {
    pageUI.value.page--;
  }
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
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
