<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" @submit="onInput" />
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="columns"
          :fixed-height="true"
          :table-data="checklistData.list"
          :total="checklistTotal"
          :selected-row-keys="selectedRowKeys"
          @refresh="fetchTable"
          @row-click="onSelectChange"
          @select-change="rehandleSelectChange"
        >
          <template #title>
            {{ '点检清单列表' }}
          </template>
          <template #actionSlot="{ row }">
            <t-space :size="8">
              <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
            </t-space>
          </template>
          <template #state="{ row }">
            <t-popconfirm
              :content="row.state == 0 ? t('checklist.confirmEnable') : t('checklist.confirmDisable')"
              @confirm="onRowStateChange(row)"
            >
              <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
            </t-popconfirm>
          </template>

          <template #button>
            <t-space :size="8">
              <t-button theme="primary" @click="onAddData">新增</t-button>
            </t-space>
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-card>
      <!-- ################# 子表格数据 ###################### -->
      <cmp-table
        v-model:pagination="itemPage"
        :fixed-height="true"
        row-key="id"
        :hover="false"
        :stripe="false"
        :table-column="itemColumns"
        :table-data="itemInCheckList.list"
        :total="itemTotal"
        select-on-row-click
        active-row-type="single"
        :selected-row-keys="delItemRowKeys"
        @select-change="onItemSelectChange"
        @refresh="onFetchItemData"
      >
        <template #title>
          {{ '项目列表' }}
        </template>
        <template #op="{ row }">
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelItemConfirm(row)">
            <t-link theme="primary" @click="onDelItemRow">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddItemData"> 新增项目 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onItemDeleteBatches()">
              <t-button theme="default"> 项目批量删除 </t-button>
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
    <t-form ref="formRef" :rules="rules" :data="checklistTabData.list" label-width="120px" @submit="onSubmit">
      <t-form-item label="点检清单编码" name="checklistCode">
        <t-input v-model="checklistTabData.list.checklistCode" :disabled="isDisabled"></t-input>
      </t-form-item>
      <t-form-item label="点检清单名称" name="checklistName">
        <t-input v-model="checklistTabData.list.checklistName"></t-input>
      </t-form-item>
      <t-form-item label="点检清单描述" name="checklistDesc">
        <t-input v-model="checklistTabData.list.checklistDesc"></t-input>
      </t-form-item>
      <t-form-item label="清单类型" name="checklistCategory">
        <bcmp-select-param
          v-model="checklistTabData.list.checklistCategory"
          param-group="D_CHECKLIST_CATEGORY"
        ></bcmp-select-param>
      </t-form-item>
      <t-form-item label="出勤班次" name="shiftCode">
        <bcmp-select-param v-model="checklistTabData.list.shiftCode" param-group="SHIFT_CODE"></bcmp-select-param>
      </t-form-item>
      <t-form-item label="频率" name="executeFrequenceCode">
        <bcmp-select-param
          v-model="checklistTabData.list.executeFrequenceCode"
          param-group="EXECUTE_FREQUENCE"
        ></bcmp-select-param>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>

  <formItem ref="formItemRef" @parent-refresh-event="getChecklistItemList" />
</template>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiDaily } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import formItem from './formItem.vue';
import { useLang } from './lang';

const { t } = useLang();
const isDisabled = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: itemPage } = usePage();
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys = ref([]); // 要删除的id
const delItemRowKeys = ref([]);
const submitFalg = ref(false);

const formData = ref({
  checklistCode: '',
  checklistName: '',
  checklistCategory: '',
  shiftCode: '',
  executeFrequenceCode: '',
});
// 表格数据总条数
const checklistTotal = ref(0);
// 编辑回填 ID
const incidentID = ref('');
// 表格数据
const checklistData = reactive({ list: [] });
// dialog 弹框数据
const checklistTabData = reactive({
  list: {
    checklistCode: '', // 点检清单编码
    checklistName: '', // 点检清单名称
    checklistDesc: '', // 点检清单描述
    checklistCategory: '', // 清单类型
    shiftCode: '',
    executeFrequenceCode: '',
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 46,
  // },
  {
    colKey: 'checklistCode',
    title: '点检清单编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'checklistName',
    title: '点检清单名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'checklistDesc',
    title: '点检清单描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'checklistCategoryName',
    title: '清单类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'shiftCodeName',
    title: '出勤模式',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'executeFrequenceName',
    title: '频率',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'state',
    title: '清单状态',
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

const rules: FormRules = {
  checklistCode: [{ required: true, message: '点检清单编码不能为空', trigger: 'blur' }],
  checklistName: [{ required: true, message: '点检清单名称不能为空', trigger: 'blur' }],
  checklistCategory: [{ required: true, message: '清单类型不能为空', trigger: 'change' }],
  shiftCode: [{ required: true, message: '出勤班次不能为空', trigger: 'change' }],
  executeFrequenceCode: [{ required: true, message: '频率不能为空', trigger: 'change' }],
};

onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});

const onAddData = () => {
  formRef.value.reset({ type: 'empty' }); // 清除formRef数据
  isDisabled.value = false;
  formVisible.value = true;
  checklistTabData.list.checklistName = ''; // 点检清单名称
  checklistTabData.list.checklistCode = ''; // 点检清单编码
  checklistTabData.list.checklistDesc = ''; // 点检清单描述
  checklistTabData.list.checklistCategory = '';
  checklistTabData.list.shiftCode = '';
  checklistTabData.list.executeFrequenceCode = '';
  submitFalg.value = true;
  diaLogTitle.value = '新增点检清单';
};

const onAddRequest = async () => {
  await apiDaily.checklist.insert(checklistTabData.list);
  await fetchTable();
  MessagePlugin.success('添加成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    checklistCode: {
      label: '清单编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    checklistName: {
      label: '清单名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    checklistCategory: {
      label: '清单类型',
      comp: 'bcmp-select-param',
      defaultVal: '',
      bind: {
        paramGroup: 'D_CHECKLIST_CATEGORY',
      },
    },
    executeFrequenceCode: {
      label: '频率',
      comp: 'bcmp-select-param',
      defaultVal: '',
      bind: {
        paramGroup: 'EXECUTE_FREQUENCE',
      },
    },
    shiftCode: {
      label: '出勤班次',
      comp: 'bcmp-select-param',
      defaultVal: '',
      bind: {
        paramGroup: 'SHIFT_CODE',
      },
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  formData.value = { ...data };
  fetchTable();
};

const fetchTable = async () => {
  try {
    const res = await apiDaily.checklist.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      checklistCode: formData.value.checklistCode,
      checklistName: formData.value.checklistName,
      checklistCategory: formData.value.checklistCategory,
      shiftCode: formData.value.shiftCode,
      executeFrequenceCode: formData.value.executeFrequenceCode,
    });

    checklistData.list = res.list;
    checklistTotal.value = res.total;
    selectedRowKeys.value = [];
    delItemRowKeys.value = [];
  } finally {
    console.log('');
  }
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};

// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  isDisabled.value = true;
  checklistTabData.list.checklistName = row.checklistName; // 点检清单名称
  checklistTabData.list.checklistCode = row.checklistCode; // 点检清单编码
  checklistTabData.list.checklistDesc = row.checklistDesc; // 点检清单描述
  checklistTabData.list.checklistCategory = row.checklistCategory;
  checklistTabData.list.shiftCode = row.shiftCode;
  checklistTabData.list.executeFrequenceCode = row.executeFrequenceCode;

  incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑点检清单';
};

// 编辑表格数据 请求
const onUpdateRequest = async () => {
  await apiDaily.checklist.update({ ...checklistTabData.list, id: incidentID.value });
  await fetchTable();
  MessagePlugin.success('修改成功');
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
  checklistTabData.list.checklistCategory = '';
  checklistTabData.list.shiftCode = '';
  checklistTabData.list.executeFrequenceCode = '';

  selectedRowKeys.value = [];
  delItemRowKeys.value = [];
  formVisible.value = false;
};

// 表单提交事件
const onSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddRequest(); // 新增请求
    } else {
      await onUpdateRequest(); // 编辑请求
    }
    formVisible.value = false;
  }
};

const onRowStateChange = async (row: any) => {
  const postRow = _.cloneDeep(row);
  const idsList = [];
  idsList.push(row.id);
  if (postRow.state === 1) {
    postRow.state = 0;
    await apiDaily.checklist.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('禁用成功');
      row.state = postRow.state;
    });
  } else {
    postRow.state = 1;
    await apiDaily.checklist.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('启用成功');
      row.state = postRow.state;
    });
  }
};

const rowClick = ref(null); // 点击行ID
const onSelectChange = async ({ row }) => {
  rowClick.value = row;
  await getChecklistItemList();
};

// # 项目
const formItemRef = ref(null);
const itemInCheckList = reactive({ list: [] });
const itemTotal = ref(0);
const onFetchItemData = async () => {
  await getChecklistItemList();
};
const getChecklistItemList = async () => {
  const res = await apiDaily.checklistItem.getList({
    pageNum: 1,
    pageSize: 99999,
    checklistId: rowClick.value.id,
  });
  itemInCheckList.list = res.list;
  itemTotal.value = res.total;
};
const onDelItemRow = () => {
  delItemRowKeys.value = [];
};
const onDelItemConfirm = async (row) => {
  const idsList = [];
  idsList.push(row.id);

  const data = await apiDaily.checklistItem.batchDeleteItem({
    ids: idsList,
  });
  if (data) {
    getChecklistItemList();
    MessagePlugin.success('删除成功');
  }
};
const itemColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'itemCode',
    title: '项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemName',
    title: '项目名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemTypeName',
    title: '项目类型',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'executeBeginTime',
    title: '执行开始时间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'executeEndTime',
    title: '执行结束时间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
];
const onAddItemData = async () => {
  if (selectedRowKeys.value.length > 1) {
    MessagePlugin.warning('只能选择一个点检清单！');
    return;
  }
  if (!rowClick.value) {
    MessagePlugin.warning('请选择一个点检清单！');
    return;
  }

  const { showForm } = formItemRef.value;
  await showForm(false, rowClick.value);
};
const onItemSelectChange = async (value: any[]) => {
  delItemRowKeys.value = value;
};
const onItemDeleteBatches = async () => {
  if (_.isEmpty(delItemRowKeys.value)) {
    MessagePlugin.error('请选择项目信息');
    return;
  }
  const idsList = [];
  idsList.push(...delItemRowKeys.value);

  const data = await apiDaily.checklistItem.batchDeleteItem({
    ids: idsList,
  });
  if (data) {
    getChecklistItemList();
    MessagePlugin.success('删除成功');
    delItemRowKeys.value = [];
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
