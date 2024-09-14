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
          <template #title>{{ '模具列表' }}</template>
          <template #actionSlot="{ row }">
            <t-space :size="8">
              <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
              <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelRow(row)">
                <!-- @confirm="onItemDeleteBatches()" -->
                <!-- <t-button theme="default"> 资产批量删除 </t-button> -->
                <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
              </t-popconfirm>
            </t-space>
          </template>
          <template #button>
            <t-space :size="8">
              <t-button theme="primary" @click="onAddData">新增</t-button>
            </t-space>
          </template>
          <!-- 
          <template #state="{ row }">
            <t-popconfirm
              :content="row.state == 0 ? t('inspectItem.confirmEnable') : t('inspectItem.confirmDisable')"
              @confirm="onRowStateChange(row)"
            >
              <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
            </t-popconfirm>
          </template>
          
          <template #files="rowData">
            <t-space>
              <t-link theme="primary" @click="showUplaodImg(rowData)">{{ '查看' }}</t-link>
            </t-space>
          </template> -->
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
        <!-- <template #title>
          {{ '资产列表' }}
        </template>
        <template #mouldCode="{ row }">{{ row.mouldCode || '-' }}</template>
        <template #mouldName="{ row }">{{ row.mouldName || '-' }}</template>
        <template #mouldTypeName="{ row }">{{ row.mouldTypeName || '-' }}</template>
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
        </template> -->
        <template #title>
          {{ '点检项目列表' }}
        </template>
        <!-- <template #actionSlot="{ row }">
          <t-space :size="8"
            ><t-popconfirm theme="default" content="确认删除吗" @confirm="onDelItemConfirm(row)">
              <t-link theme="primary" @click="onDelItemRow">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
          </t-space>
        </template> -->
        <template #state="{ row }">
          {{ row.state == 0 ? '否' : '是' }}
          <!-- <t-popconfirm
            :content="row.state == 0 ? t('inspectItem.confirmEnable') : t('inspectItem.confirmDisable')"
            @confirm="onRowStateChange(row)"
          >
            <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
          </t-popconfirm> -->
        </template>
        <!-- <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddData">新增</t-button>
          </t-space>
        </template> -->
        <template #files="rowData">
          <t-space>
            <t-link theme="primary" @click="showUplaodImg(rowData)">{{ '查看' }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    width="80%"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="onSecondaryReset"
  >
    <t-form ref="formRef" :data="inspectItemTabData.list" label-width="120px" @submit="onSubmit">
      <t-descriptions :column="2">
        <t-descriptions-item>
          <t-form-item label="点检模具类型" name="mouldType" required-mark>
            <bcmp-select-param
              v-if="!isEdit"
              v-model="inspectItemTabData.list.mouldType"
              param-group="E_MOULD_TYPE"
              placeholder="请选择点检模具类型"
              :show-title="false"
              @change="(val: any) => fetchDialogTable(val, true)"
            />
            <span v-else>{{ inspectItemTabData.list.assetTypeName }}</span>
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检模具" name="inspectItemName" required-mark>
            <t-tagInput
              v-if="!isEdit"
              v-model="inspectItemTabData.list.mouldLabel"
              readonly
              placeholder="请选择点检模具"
              @click="onAddItemData"
            />
            <!-- <bcmp-select-business  v-model="inspectItemTabData.list.equipmentName" type="equipment" /> -->
            <!-- :is-multiple="true" -->
            <span v-else>{{ inspectItemTabData.list.mouldName }}</span>
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检周期" name="dayInspectPeriod" required-mark>
            <t-input-number
              v-model="inspectItemTabData.list.dayInspectPeriod"
              style="width: 300px"
              theme="column"
              :min="1"
              :max="999999"
            >
              <template #suffix><span>日</span></template>
            </t-input-number>
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="点检生效日期" name="datetimeEffect" required-mark>
            <t-date-picker v-model="inspectItemTabData.list.datetimeEffect" clearable style="width: 300px" />
            <!-- <t-input v-model="inspectItemTabData.list.inspectItemName"></t-input> -->
          </t-form-item>
        </t-descriptions-item>
      </t-descriptions>
      <cmp-card flex="auto" :ghost="true">
        <cmp-table
          :fixed-height="true"
          row-key="id"
          :loading="isLoading"
          :hover="false"
          :stripe="false"
          :show-pagination="false"
          :table-column="dialogItemColumns"
          :table-data="inspectItemTabData.list.inspectItemList"
          select-on-row-click
          active-row-type="single"
          max-height="300px"
        >
          <template #title>
            {{ '点检项目列表' }}
          </template>
          <template #actionSlot="{ rowIndex }">
            <t-space :size="8">
              <!-- <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelItemConfirm(row)"> -->
              <t-link theme="primary" @click="delDialogItem(rowIndex)">{{ t('common.button.delete') }}</t-link>
              <!-- </t-popconfirm> -->
              <!-- <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link> -->
            </t-space>
          </template>
          <template #files="rowData">
            <t-space>
              <t-link theme="primary" @click="showUplaodImg(rowData)">{{ '查看' }}</t-link>
            </t-space>
          </template>
          <template #button>
            <t-space :size="8">
              <t-button
                :disabled="_.isEmpty(inspectItemTabData.list.mouldType)"
                theme="primary"
                @click="(val) => fetchDialogTable(val, false)"
                >加载全部项目</t-button
              >
            </t-space>
          </template>
        </cmp-table>
      </cmp-card>
    </t-form>

    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">提交</t-button>
    </template>
  </t-dialog>

  <formItem ref="formItemRef" @parent-refresh-event="getEquipmentInspectItemList" @change-equipment="changeEquipment" />
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
import common from '@/utils/common';

import formItem from './formItem.vue';
import { useLang } from './lang';

const { loading, setLoading } = useLoading();

const { t } = useLang();
const isLoading = ref(false);
const isEdit = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const formItemRef = ref(null);
const { pageUI } = usePage(); // 分页工具
const { pageUI: itemPage } = usePage();
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys = ref([]); // 要删除的id
const delItemRowKeys = ref([]);
// const submitFalg = ref(false);

const formData = ref({
  equipmentCode: '',
  mouldType: '',
  positionId: '',
  departmentOwnerId: '',
  inspectDealId: '',
  // inspectItemCode: '',
  // inspectItemName: '',
  // assetTypeId: '',
  // assetBrandId: '',
  // assetModelId: '',
});
// 表格数据总条数
const inspectItemTotal = ref(0);
// const dialogInspectItemTotal = ref(0);
// 表格数据
const inspectItemData = reactive({ list: [] });
// dialog 弹框数据
const inspectItemTabData = reactive({
  list: {
    id: '',
    mouldType: '',
    mouldId: '',
    assetTypeName: '',
    mouldName: '',
    equipmentList: [],
    datetimeEffect: '',
    dayInspectPeriod: 1,
    mouldLabel: [],
    insertMouldIds: [],
    inspectItemList: [],
    planItems: [],
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'mouldType',
    title: '模具类型编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mouldTypeName',
    title: '模具类型名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mouldCode',
    title: '模具编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mouldName',
    title: '模具名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'departmentOwnerName',
    title: '所属部门',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'positionName',
    title: '模具存放位置',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectDealName',
    title: '点检执行组',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'dayInspectPeriod',
    title: '点检周期(日)',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'datetimeNextInspect',
    title: '下一次点检日期',
    align: 'center',
    width: '110',
  },
  // {
  //   title: '附件',
  //   align: 'left',
  //   fixed: 'right',
  //   width: 100,
  //   colKey: 'files',
  // },
  // {
  //   colKey: 'state',
  //   title: '状态',
  //   align: 'center',
  //   width: '100',
  // },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];

const changeEquipment = (list: any[], ids: any[]) => {
  // console.log(ids);
  inspectItemTabData.list.mouldLabel = list.map((item: { mouldName: any }) => item.mouldName);
  inspectItemTabData.list.insertMouldIds = ids;
};

onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});

const onAddData = () => {
  formRef.value.reset({ type: 'empty' }); // 清除formRef数据
  inspectItemTabData.list.mouldLabel = [];
  const { initDialog } = formItemRef.value;
  initDialog();
  // inspectItemTabData.list.isPhoto = 1;
  // inspectItemTabData.list.maxValue = 0;
  // inspectItemTabData.list.minValue = 0;
  common.reset(inspectItemTabData.list);

  // console.log('inspectItemTabData.list', inspectItemTabData.list);

  isEdit.value = false;
  formVisible.value = true;
  // isDisabled.value = false;
  // submitFalg.value = true;
  diaLogTitle.value = '新增点检计划';
};

const onAddRequest = async () => {
  try {
    if (_.isEmpty(inspectItemTabData.list.mouldType)) {
      MessagePlugin.error('请选择点检模具类型');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.insertMouldIds)) {
      MessagePlugin.error('请选择点检模具');
      return false;
    }
    if (!inspectItemTabData.list.dayInspectPeriod) {
      MessagePlugin.error('请输入点检周期');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.datetimeEffect)) {
      MessagePlugin.error('请选择点检生效日期');
      return false;
    }
    if (!inspectItemTabData.list.inspectItemList.length) {
      MessagePlugin.error('请选择点检项目');
      return false;
    }

    await apiEquimpent.inspectPlan.addItem({
      mouldType: inspectItemTabData.list.mouldType,
      insertMouldIds: inspectItemTabData.list.insertMouldIds?.join(','),
      dayInspectPeriod: inspectItemTabData.list.dayInspectPeriod,
      datetimeEffect: inspectItemTabData.list.datetimeEffect,
      relateType: 'mould',
      planItems:
        inspectItemTabData.list.inspectItemList?.map((item) => {
          return { inspectItemId: item.inspectItemId };
        }) || [],
    });
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
    mouldCode: {
      label: '模具编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      operator: 'like',
    },
    mouldType: {
      label: '模具类型',
      comp: 'bcmp-select-param',
      operator: 'eq',
      defaultVal: '',
      bind: {
        paramGroup: 'E_MOULD_TYPE',
      },
    },
    positionId: {
      label: '存放位置',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      operator: 'eq',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    departmentOwnerId: {
      label: '所属部门',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      operator: 'eq',
      bind: {
        type: 'adminOrg',
        showTitle: false,
      },
    },
    inspectDealId: {
      label: '点检执行组',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      operator: 'eq',
      bind: {
        type: 'supportGroup',
        showTitle: false,
      },
    },
  };
});
const filterList = ref([]);

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  filterList.value = [];
  formData.value = data;
  for (const key in data) {
    if (data[key] != null && data[key] !== '') {
      const addFilter = {
        // tableName: formData.value,
        field: key,
        operator: opts.value[key].operator || 'like',
        value: data[key],
      };
      filterList.value.push(addFilter);
    }
  }
  fetchTable();
};

const fetchTable = async () => {
  try {
    setLoading(true);
    const res: any = await apiEquimpent.inspectPlan.search({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      relateType: 'mould',
      filters: filterList.value,
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
const onEditRow = async (row: any) => {
  isEdit.value = true;
  const data = await apiEquimpent.inspectPlan.getMouldInspectPlanById({ id: row.id });
  Object.assign(inspectItemTabData.list, data);
  inspectItemTabData.list.inspectItemList = data.planItems;
  // console.log('inspectItemTabData.list.planItems', inspectItemTabData.list.planItems);
  // incidentID.value = row.id; // 编辑回填 ID
  // submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '编辑点检计划';
};

const onDelRow = async (row: { id: any }) => {
  const idsList = [];
  idsList.push(row.id);
  await apiEquimpent.inspectPlan.removeItemsById(
    idsList,
    // {
    // ids: idsList,
    // }
  );
  fetchTable();

  // if (data) {
  // getEquipmentInspectItemList();
  MessagePlugin.success('删除成功');
  // delItemRowKeys.value = [];
  // }
};
// 编辑表格数据 请求
const onUpdateRequest = async () => {
  try {
    if (!inspectItemTabData.list.dayInspectPeriod) {
      MessagePlugin.error('请输入点检周期');
      return false;
    }
    if (_.isEmpty(inspectItemTabData.list.datetimeEffect)) {
      MessagePlugin.error('请选择点检生效日期');
      return false;
    }
    if (!inspectItemTabData.list.inspectItemList.length) {
      MessagePlugin.error('请选择点检项目');
      return false;
    }

    await apiEquimpent.inspectPlan.updateItemByCode({
      mouldType: inspectItemTabData.list.mouldType,
      mouldId: inspectItemTabData.list.mouldId,
      dayInspectPeriod: inspectItemTabData.list.dayInspectPeriod,
      datetimeEffect: inspectItemTabData.list.datetimeEffect,
      relateType: 'mould',
      planItems:
        inspectItemTabData.list.inspectItemList?.map((item) => {
          return { inspectItemId: item.inspectItemId };
        }) || [],
      id: inspectItemTabData.list.id,
    });
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
    if (!isEdit.value) {
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

// const onRowStateChange = async (row: any) => {
//   const postRow = _.cloneDeep(row);
//   const idsList = [];
//   idsList.push(row.id);
//   if (postRow.state === 1) {
//     postRow.state = 0;
//     await apiEquimpent.inspectItem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
//       MessagePlugin.success('禁用成功');
//       row.state = postRow.state;
//     });
//   } else {
//     postRow.state = 1;
//     await apiEquimpent.inspectItem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
//       MessagePlugin.success('启用成功');
//       row.state = postRow.state;
//     });
//   }
// };

const rowClick = ref(null); // 点击行ID
const onSelectChange = async ({ row }) => {
  rowClick.value = row;
  await getEquipmentInspectItemList();
};

// # 项目
// const formItemRef = ref(null);
const itemInCheckList = reactive({ list: [] });
const itemTotal = ref(0);
const onFetchItemData = async () => {
  await getEquipmentInspectItemList();
};
const getEquipmentInspectItemList = async () => {
  const res: any = await apiEquimpent.inspectPlanItem.search({
    pageNum: 1,
    pageSize: 99999,
    filters: [
      {
        field: 'inspectPlanId',
        operator: 'EQ',
        value: rowClick.value.id,
      },
    ],
    // inspectItemId: rowClick.value.id,
    // relateType: 'equipment',
  });
  itemInCheckList.list = res.list;
  itemTotal.value = res.total;
};
// const onDelItemRow = () => {
//   delItemRowKeys.value = [];
// };
// const onDelItemConfirm = async (row: { id: any }) => {
//   const idsList = [];
//   idsList.push(row.id);
//   const data = await apiEquimpent.inspectItemInEquipment.batchDeleteItem({
//     ids: idsList,
//   });
//   if (data) {
//     getEquipmentInspectItemList();
//     MessagePlugin.success('删除成功');
//     // delItemRowKeys.value = [];
//   }
// };
const itemColumns: PrimaryTableCol<TableRowData>[] = [
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
  // {
  //   colKey: 'op',
  //   title: '操作',
  //   align: 'center',
  //   fixed: 'right',
  //   width: '130',
  //   cell: 'actionSlot', // 引用具名插槽
  // },
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 46,
  // },
  // {
  //   colKey: 'inspectItemCode',
  //   title: '点检项目编码',
  //   align: 'center',
  //   width: '110',
  // },
  // {
  //   colKey: 'inspectItemName',
  //   title: '点检项目编码',
  //   align: 'center',
  //   width: '110',
  // },
  // {
  //   colKey: 'mouldTypeName',
  //   title: '模具类型',
  //   align: 'center',
  //   width: '110',
  // },
  // {
  //   colKey: 'mouldCode',
  //   title: '模具代码',
  //   align: 'center',
  //   width: '110',
  // },
  // {
  //   colKey: 'mouldName',
  //   title: '模具名称',
  //   align: 'center',
  //   width: '110',
  // },
  // {
  //   colKey: 'op',
  //   title: '操作',
  //   align: 'center',
  //   fixed: 'right',
  //   width: '130',
  // },
];

const dialogItemColumns = [
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
  // {
  //   colKey: 'state',
  //   title: '状态',
  //   align: 'center',
  //   width: '100',
  // },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
const onAddItemData = async () => {
  // if (selectedRowKeys.value.length > 1) {
  //   MessagePlugin.warning('只能选择一个点检项目！');
  //   return;
  // }
  // if (!rowClick.value) {
  if (_.isEmpty(inspectItemTabData.list.mouldType)) {
    MessagePlugin.warning('请先选择点检模具类型！');
    return;
  }

  const { showForm } = formItemRef.value;
  await showForm(false, inspectItemTabData.list.mouldType);
};
const onItemSelectChange = async (value: any[]) => {
  delItemRowKeys.value = value;
};
// const onItemDeleteBatches = async () => {
//   if (_.isEmpty(delItemRowKeys.value)) {
//     MessagePlugin.error('请选择点检项目信息');
//     return;
//   }
//   const idsList = [];
//   idsList.push(...delItemRowKeys.value);
//   const data = await apiEquimpent.inspectItemInEquipment.batchDeleteItem({
//     ids: idsList,
//   });
//   if (data) {
//     getEquipmentInspectItemList();
//     MessagePlugin.success('删除成功');
//     delItemRowKeys.value = [];
//   }
// };

const delDialogItem = (index: number) => {
  inspectItemTabData.list.inspectItemList.splice(index, 1);
};
// const initform = async();

const fetchDialogTable = async (val: any, isBcmpSelect: boolean) => {
  // pageUI.value.page = 1;
  console.log('vallll', val, inspectItemTabData.list);
  if (isBcmpSelect) {
    inspectItemTabData.list.mouldLabel = [];
    const { initDialog } = formItemRef.value;
    initDialog();
  }
  inspectItemTabData.list.inspectItemList = [];
  if (!_.isEmpty(val)) {
    isLoading.value = true;
    const res = await apiEquimpent.inspectItemInEquipment.getList({
      pageNum: 1,
      pageSize: 99999,
      filters: [
        {
          field: 'mouldType',
          operator: 'EQ',
          value: inspectItemTabData.list.mouldType,
        },
      ],
      relateType: 'mould',
    });
    inspectItemTabData.list.inspectItemList = res.list;
    isLoading.value = false;
  }
};

// begin 文件上传

const formFilesRef = ref(null);
const selectRowId = ref('');
const showUplaodImg = async (rowData: {
  row: {
    id: string;
    inspectItemId: string;
    fileList: {
      serialNumber?: string;
      fullFileName?: string;
      fileName?: string;
      fileType?: string;
      fileSizeShow?: string;
      fileSize?: number;
      timeUpload?: string;
      signedUrl?: string;
      percent?: number;
      id?: string;
    }[];
  };
}) => {
  selectRowId.value = rowData.row.inspectItemId;
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
