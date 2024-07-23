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
          :table-data="inspectItemData.list"
          :total="inspectItemTotal"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          @refresh="fetchTable"
          @row-click="onSelectChange"
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
              :content="row.state == 0 ? t('inspectItem.confirmEnable') : t('inspectItem.confirmDisable')"
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
          <template #files="rowData">
            <t-space>
              <t-link theme="primary" @click="showUplaodImg(rowData)">{{ '查看' }}</t-link>
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
          {{ '资产列表' }}
        </template>
        <template #op="{ row }">
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelItemConfirm(row)">
            <t-link theme="primary" @click="onDelItemRow">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddItemData"> 新增资产 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onItemDeleteBatches()">
              <t-button theme="default"> 资产批量删除 </t-button>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    width="50%"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="onSecondaryReset"
  >
    <t-form ref="formRef" :data="inspectItemTabData.list" label-width="120px" @submit="onSubmit">
      <t-descriptions :column="2">
        <t-descriptions-item>
          <t-form-item label="点检项目编码" name="inspectItemCode" required-mark>
            <t-input v-model="inspectItemTabData.list.inspectItemCode" :disabled="isDisabled"></t-input>
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检项目名称" name="inspectItemName" required-mark>
            <t-input v-model="inspectItemTabData.list.inspectItemName"></t-input>
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检方式" name="inspectMethod" required-mark>
            <bcmp-select-param v-model="inspectItemTabData.list.inspectMethod" param-group="E_INSPECT_METHOD" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检类型" name="inspectItemType" required-mark>
            <bcmp-select-param v-model="inspectItemTabData.list.inspectItemType" param-group="Q_INSPECT_ITEM_TYPE" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检标准" name="inspectItemStandard" required-mark>
            <t-input v-model="inspectItemTabData.list.inspectItemStandard"></t-input>
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="计量单位" name="uom">
            <bcmp-select-business
              v-model="inspectItemTabData.list.uom"
              type="uom"
              :show-title="false"
              value-field="uom"
            />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="参数上限" name="maxValue">
            <t-input-number v-model="inspectItemTabData.list.maxValue" style="width: 100%" min="0" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="参数下限" name="minValue">
            <t-input-number v-model="inspectItemTabData.list.minValue" style="width: 100%" min="0" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="是否拍照" name="isPhoto" required-mark>
            <t-radio-group
              v-model="inspectItemTabData.list.isPhoto"
              style="width: 100%"
              :options="inspectItemTabData.list.isPhotoOptions"
            />
          </t-form-item>
        </t-descriptions-item>
      </t-descriptions>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>

  <formItem ref="formItemRef" @parent-refresh-event="getEquipmentInspectItemList" />
  <cmp-files-upload
    ref="formFilesRef"
    upload-path="InspectItem"
    @upload-success="uploadSuccess"
    @delete-success="deleteSuccess"
    @batch-delete-success="batchDeleteSuccess"
  />
</template>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiEquimpent } from '@/api/equipment';
// import { api as apiMain } from '@/api/main';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import formItem from './formItem.vue';
import { useLang } from './lang';

const { loading, setLoading } = useLoading();

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
  inspectItemCode: '',
  inspectItemName: '',
  assetTypeId: '',
  assetBrandId: '',
  assetModelId: '',
});
// 表格数据总条数
const inspectItemTotal = ref(0);
// 表格数据
const inspectItemData = reactive({ list: [] });
// dialog 弹框数据
const inspectItemTabData = reactive({
  list: {
    id: '',
    inspectItemCode: '', // 点检项目编码
    inspectItemName: '', // 点检项目名称
    inspectItemStandard: '',
    inspectMethod: '',
    maxValue: 0,
    minValue: 0,
    inspectItemType: '',
    uom: '',
    isPhoto: 1,
    isPhotoOptions: [
      { label: '是', value: 1 },
      { label: '否', value: 0 },
    ],
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'inspectItemCode',
    title: '点检项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemName',
    title: '点检项目名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemStandard',
    title: '点检标准',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectMethodName',
    title: '点检方式',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemTypeName',
    title: '点检类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'maxValue',
    title: '最大值',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'minValue',
    title: '最小值',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '110',
  },
  {
    title: '附件',
    align: 'left',
    fixed: 'right',
    width: 100,
    colKey: 'files',
  },
  {
    colKey: 'state',
    title: '状态',
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

onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});

const onAddData = () => {
  formRef.value.reset({ type: 'empty' }); // 清除formRef数据
  inspectItemTabData.list.isPhoto = 1;
  inspectItemTabData.list.maxValue = 0;
  inspectItemTabData.list.minValue = 0;

  formVisible.value = true;
  isDisabled.value = false;
  submitFalg.value = true;
  diaLogTitle.value = '新增点检项目';
};

const onAddRequest = async () => {
  try {
    if (_.isEmpty(inspectItemTabData.list.inspectItemCode)) {
      MessagePlugin.error('请输入点检项目编码');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectItemName)) {
      MessagePlugin.error('请输入点检项目名称');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectMethod)) {
      MessagePlugin.error('请选择点检方式');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectItemType)) {
      MessagePlugin.error('请选择点检类型');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectItemStandard)) {
      MessagePlugin.error('请输入点检标准');
      return false;
    }

    await apiEquimpent.inspectItem.insert(inspectItemTabData.list);
    await fetchTable();
    MessagePlugin.success('添加成功');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// #query 查询参数
const opts = computed(() => {
  return {
    inspectItemName: {
      label: '项目名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    assetTypeId: {
      label: '资产类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'assetType',
        showTitle: false,
      },
    },
    assetBrandId: {
      label: '资产品牌',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'assetBrand',
        showTitle: false,
      },
    },
    assetModelId: {
      label: '资产型号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'assetModel',
        showTitle: false,
        // parentId: 'formData.assetTypeId',
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
    setLoading(true);
    const res = await apiEquimpent.inspectItem.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      inspectItemName: formData.value.inspectItemName,
      assetTypeId: formData.value.assetTypeId,
      assetBrandId: formData.value.assetBrandId,
      assetModelId: formData.value.assetModelId,
    });

    inspectItemData.list = res.list;
    inspectItemTotal.value = res.total;
    selectedRowKeys.value = [];
    delItemRowKeys.value = [];

    itemInCheckList.list = [];
    itemTotal.value = 0;
  } finally {
    setLoading(false);
  }
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};

// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  isDisabled.value = true;

  Object.assign(inspectItemTabData.list, row);

  // incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑点检项目';
};

// 编辑表格数据 请求
const onUpdateRequest = async () => {
  try {
    if (_.isEmpty(inspectItemTabData.list.inspectItemCode)) {
      MessagePlugin.error('请输入点检项目编码');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectItemName)) {
      MessagePlugin.error('请输入点检项目名称');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectMethod)) {
      MessagePlugin.error('请选择点检方式');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectItemType)) {
      MessagePlugin.error('请选择点检类型');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.inspectItemStandard)) {
      MessagePlugin.error('请输入点检标准');
      return false;
    }

    await apiEquimpent.inspectItem.update({ ...inspectItemTabData.list, id: inspectItemTabData.list.id });
    await fetchTable();
    MessagePlugin.success('修改成功');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
  // inspectItemTabData.list.inspectItemCategory = '';
  // inspectItemTabData.list.shiftCode = '';
  // inspectItemTabData.list.executeFrequenceCode = '';

  selectedRowKeys.value = [];
  delItemRowKeys.value = [];
  formVisible.value = false;
};

// 表单提交事件
const onSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      const isOk = await onAddRequest();
      if (isOk) {
        formVisible.value = false;
      }
    } else {
      const isOk = await onUpdateRequest();
      if (isOk) {
        formVisible.value = false;
      }
    }
  }
};

const onRowStateChange = async (row: any) => {
  const postRow = _.cloneDeep(row);
  const idsList = [];
  idsList.push(row.id);
  if (postRow.state === 1) {
    postRow.state = 0;
    await apiEquimpent.inspectItem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('禁用成功');
      row.state = postRow.state;
    });
  } else {
    postRow.state = 1;
    await apiEquimpent.inspectItem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('启用成功');
      row.state = postRow.state;
    });
  }
};

const rowClick = ref(null); // 点击行ID
const onSelectChange = async ({ row }) => {
  rowClick.value = row;
  await getEquipmentInspectItemList();
};

// # 项目
const formItemRef = ref(null);
const itemInCheckList = reactive({ list: [] });
const itemTotal = ref(0);
const onFetchItemData = async () => {
  await getEquipmentInspectItemList();
};
const getEquipmentInspectItemList = async () => {
  const res = await apiEquimpent.inspectItemInEquipment.getList({
    pageNum: 1,
    pageSize: 99999,
    inspectItemId: rowClick.value.id,
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
  const data = await apiEquimpent.inspectItemInEquipment.batchDeleteItem({
    ids: idsList,
  });
  if (data) {
    getEquipmentInspectItemList();
    MessagePlugin.success('删除成功');
    delItemRowKeys.value = [];
  }
};
const itemColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'inspectItemCode',
    title: '点检项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemName',
    title: '点检项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'assetTypeName',
    title: '资产类型编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'assetBrandName',
    title: '资产品牌编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'assetModelName',
    title: '资产型号编码',
    align: 'center',
    width: '110',
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
    MessagePlugin.warning('只能选择一个点检项目！');
    return;
  }
  if (!rowClick.value) {
    MessagePlugin.warning('请选择一个点检项目！');
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
    MessagePlugin.error('请选择点检项目信息');
    return;
  }
  const idsList = [];
  idsList.push(...delItemRowKeys.value);
  const data = await apiEquimpent.inspectItemInEquipment.batchDeleteItem({
    ids: idsList,
  });
  if (data) {
    getEquipmentInspectItemList();
    MessagePlugin.success('删除成功');
    delItemRowKeys.value = [];
  }
};

// begin 文件上传

const formFilesRef = ref(null);
const selectRowId = ref('');
const showUplaodImg = async (rowData) => {
  selectRowId.value = rowData.row.id;
  try {
    if (!_.isEmpty(selectRowId.value)) {
      const list = await apiEquimpent.inspectItemFile.getInspectItemFileList(selectRowId.value);
      rowData.row.fileList = list;
    }
    const { showForm } = formFilesRef.value;
    await showForm(false, rowData.row.fileList);
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      await apiEquimpent.inspectItemFile.addInspectItemFile({
        inspectItemId: selectRowId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success('文件上传成功');
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      await apiEquimpent.inspectItemFile.deleteInspectItemFile({
        inspectItemId: selectRowId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success(t('mitemIncomingInspection.文件删除成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      const deleteList = [];
      files.forEach((n) => deleteList.push({ inspectItemId: selectRowId.value, fileName: n.fileName }));

      await apiEquimpent.inspectItemFile.deleteBatchInspectItemFile(deleteList);
      MessagePlugin.success('文件删除成功');
    }
  } catch (e) {
    console.log(e);
  }
};

// end 文件上传
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
