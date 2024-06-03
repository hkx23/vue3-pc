<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" @submit="onInput" />
        <cmp-card :ghost="true">
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="columns"
            :fixed-height="true"
            :table-data="checkItemData.list"
            :total="checkItemTotal"
            :selected-row-keys="selectedRowKeys"
            @refresh="fetchTable"
            @select-change="rehandleSelectChange"
          >
            <template #title>
              {{ '点检项目列表' }}
            </template>
            <template #actionSlot="{ row }">
              <t-space :size="8">
                <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
              </t-space>
            </template>
            <template #state="{ row }">
              <t-popconfirm
                :content="row.state == 0 ? t('checkItem.confirmEnable') : t('checkItem.confirmDisable')"
                @confirm="onRowStateChange(row)"
              >
                <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
                <!-- <t-link theme="primary">{{ row.state == 0 ? t('user.enable') : t('user.disable') }}</t-link> -->
              </t-popconfirm>
            </template>

            <template #button>
              <t-space :size="8">
                <t-button theme="primary" @click="onAddTypeData">新增</t-button>
                <bcmp-import-auto-button
                  theme="default"
                  button-text="导入"
                  type="d_check_item"
                ></bcmp-import-auto-button>
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
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
      :data="checkItemTabData.list"
      label-width="120px"
      @submit="onAnomalyTypeSubmit"
    >
      <t-form-item label="点检项目编码" name="itemCode">
        <t-input v-model="checkItemTabData.list.itemCode" :disabled="isDisabled"></t-input>
      </t-form-item>
      <t-form-item label="点检项目名称" name="itemName">
        <t-input v-model="checkItemTabData.list.itemName"></t-input>
      </t-form-item>
      <t-form-item label="点检项目描述" name="itemDesc">
        <t-input v-model="checkItemTabData.list.itemDesc"></t-input>
      </t-form-item>
      <t-form-item label="项目类型" name="itemType">
        <bcmp-select-param
          v-model="checkItemTabData.list.itemType"
          placeholder="请选择项目类型"
          param-group="Q_ITEM_TYPE"
        ></bcmp-select-param>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiDaily } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const isDisabled = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const { pageUI } = usePage();
const formVisible = ref(false);
const diaLogTitle = ref('');
const selectedRowKeys: Ref<any[]> = ref([]);
const submitFalg = ref(false);

const formData = ref({
  itemCode: '',
  itemName: '',
  itemType: '',
});
// 表格数据总条数
const checkItemTotal = ref(0);

// 编辑回填 ID
const incidentID = ref('');
// 表格数据
const checkItemData = reactive({ list: [] });
// dialog 弹框数据
const checkItemTabData = reactive({
  list: {
    itemCode: '', // 点检项目编码
    itemName: '', // 点检项目名称
    itemDesc: '', // 点检项目描述
    itemType: '', // 项目类型
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
    colKey: 'itemCode',
    title: '点检项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemName',
    title: '点检项目名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemDesc',
    title: '点检项目描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'itemTypeName',
    title: '项目类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'state',
    title: '项目状态',
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
  itemCode: [{ required: true, message: '点检项目编码不能为空', trigger: 'blur' }],
  itemName: [{ required: true, message: '点检项目名称不能为空', trigger: 'blur' }],
  itemType: [{ required: true, message: '项目类型不能为空', trigger: 'change' }],
};
onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});

const onAddTypeData = () => {
  formRef.value.reset({ type: 'empty' });
  isDisabled.value = false;
  formVisible.value = true;
  checkItemTabData.list.itemName = ''; // 点检项目名称
  checkItemTabData.list.itemCode = ''; // 点检项目编码
  checkItemTabData.list.itemDesc = ''; // 点检项目描述
  checkItemTabData.list.itemType = '';
  submitFalg.value = true;
  diaLogTitle.value = '新增点检项目';
};

const onAddTypeRequest = async () => {
  await apiDaily.checkItem.insert(checkItemTabData.list);
  await fetchTable();
  MessagePlugin.success('添加成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    itemCode: {
      label: '项目编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    itemName: {
      label: '项目名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    itemType: {
      label: '项目类型',
      comp: 'bcmp-select-param',
      defaultVal: '',
      bind: {
        paramGroup: 'Q_ITEM_TYPE',
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
  const res = await apiDaily.checkItem.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    itemCode: formData.value.itemCode,
    itemName: formData.value.itemName,
    itemType: formData.value.itemType,
  });

  checkItemData.list = res.list;
  checkItemTotal.value = res.total;
  selectedRowKeys.value = [];
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};
// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  isDisabled.value = true;
  checkItemTabData.list.itemName = row.itemName; // 点检项目名称
  checkItemTabData.list.itemCode = row.itemCode; // 点检项目编码
  checkItemTabData.list.itemDesc = row.itemDesc; // 点检项目描述
  checkItemTabData.list.itemType = row.itemType; // 项目类型
  incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑点检项目';
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await apiDaily.checkItem.update({ ...checkItemTabData.list, id: incidentID.value });
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
  checkItemTabData.list.itemType = '';
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

const onRowStateChange = async (row: any) => {
  const postRow = _.cloneDeep(row);
  const idsList = [];
  idsList.push(row.id);
  if (postRow.state === 1) {
    postRow.state = 0;
    await apiDaily.checkItem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('禁用成功');
      row.state = postRow.state;
    });
  } else {
    postRow.state = 1;
    await apiDaily.checkItem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('启用成功');
      row.state = postRow.state;
    });
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
