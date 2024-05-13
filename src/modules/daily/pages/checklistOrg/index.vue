<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="250px">
        <t-tree
          ref="treeRef"
          :data="treeData"
          :keys="treeKeys"
          hover
          :expand-on-click-node="false"
          :activable="true"
          @click="onTreeClick"
        />
      </cmp-card>
      <cmp-card flex="auto" :ghost="true">
        <cmp-container :full="true" :full-sub-index="[1, 0]">
          <cmp-card>
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

              <template #button>
                <t-space :size="8">
                  <t-button theme="primary" @click="onAddData">新增</t-button>
                </t-space>
              </template>

              <template #state="{ row }">
                <t-popconfirm
                  :content="row.state == 0 ? t('checklistOrg.confirmEnable') : t('checklistOrg.confirmDisable')"
                  @confirm="onRowStateChange(row)"
                >
                  <t-switch
                    :custom-value="[1, 0]"
                    :value="row.state"
                    :default-value="row.state"
                    size="large"
                  ></t-switch>
                </t-popconfirm>
              </template>
            </cmp-table>
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
              @refresh="onFetchItemData"
            >
              <template #title>
                {{ '项目列表' }}
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="onSecondaryReset"
  >
    <t-form ref="formRef" label-width="120px" :data="checklistOrgData" @submit="onSubmit">
      <t-form-item label="组织：" name="checklistName">
        <t-input v-model="checklistOrgData.orgName" disabled></t-input>
      </t-form-item>
      <t-form-item label="点检清单编码" name="checklistCode">
        <bcmp-select-business
          v-model="checklistOrgData.checklistId"
          type="checklist"
          :show-title="false"
          @selection-change="onCheckItemSelectChange"
        />
      </t-form-item>
      <t-form-item label="点检清单名称" name="checklistName">
        <t-input v-model="checklistOrgData.checklistName" disabled></t-input>
      </t-form-item>
      <t-form-item label="点检清单描述" name="checklistDesc">
        <t-input v-model="checklistOrgData.checklistDesc" disabled></t-input>
      </t-form-item>
      <t-form-item label="清单类型" name="checklistCategory">
        <bcmp-select-param
          v-model="checklistOrgData.checklistCategory"
          param-group="D_CHECKLIST_CATEGORY"
        ></bcmp-select-param>
      </t-form-item>
      <t-form-item label="出勤班次" name="shiftCode">
        <bcmp-select-param v-model="checklistOrgData.shiftCode" param-group="SHIFT_CODE"></bcmp-select-param>
      </t-form-item>
      <t-form-item label="频率" name="executeFrequenceCode">
        <bcmp-select-param
          v-model="checklistOrgData.executeFrequenceCode"
          param-group="EXECUTE_FREQUENCE"
        ></bcmp-select-param>
      </t-form-item>
      <t-form-item label="执行人" name="personId">
        <bcmp-select-business v-model="checklistOrgData.personId" type="person" :show-title="false" />
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
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiDaily } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';
import common from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: itemPage } = usePage();
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys = ref([]); // 要删除的id
const delItemRowKeys = ref([]);
const formData = ref({
  id: '',
  workcenterId: '',
  orgId: '',
  orgCode: '',
  orgName: '',
  checklistId: '',
  checklistCode: '',
  checklistName: '',
  checklistDesc: '',
  checklistCategory: '',
  shiftCode: '',
  executeFrequenceCode: '',
  executeFrequence: '',
  personId: '',
});

// dialog 弹框数据
const checklistOrgData = ref({
  id: '',
  workcenterId: '',
  orgId: '',
  orgCode: '',
  orgName: '',
  checklistId: '',
  checklistCode: '',
  checklistName: '',
  checklistDesc: '',
  checklistCategory: '',
  shiftCode: '',
  executeFrequenceCode: '',
  executeFrequence: '',
  personId: '',
});
// 表格数据总条数
const checklistTotal = ref(0);
// 表格数据
const checklistData = reactive({ list: [] });
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 46,
  // },
  {
    colKey: 'orgName',
    title: '关联组织',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workcenterName',
    title: '工作中心',
    align: 'center',
    width: '100',
  },
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
    colKey: 'personName',
    title: '执行人',
    align: 'center',
    width: '100',
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
  await fetchTreeTable();
});

const onAddData = () => {
  if (_.isEmpty(checklistOrgData.value.orgId)) {
    MessagePlugin.error('请选择左边车间或产线');
    return;
  }
  formVisible.value = true;
  diaLogTitle.value = '新增点检清单分配';
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
  const res = await apiDaily.checklistOrg.getList({
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
  MessagePlugin.success('查询成功');
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};

// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  checklistOrgData.value = { ...row }; // 点检清单名称

  // formData.value.id = row.id; // 编辑回填 ID
  formVisible.value = true;
  diaLogTitle.value = '编辑点检清单分配';
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
  formData.value.checklistCategory = '';
  formData.value.shiftCode = '';
  formData.value.executeFrequenceCode = '';

  selectedRowKeys.value = [];
  delItemRowKeys.value = [];
  formVisible.value = false;
};

// 表单提交事件
const onSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (_.isEmpty(checklistOrgData.value.id)) {
      formVisible.value = !(await onAddRequest()); // 新增请求
      common.reset(checklistOrgData.value);
    } else {
      formVisible.value = !(await onUpdateRequest()); // 编辑请求
      common.reset(checklistOrgData.value);
    }
  }
};
const onAddRequest = async () => {
  if (_.isEmpty(checklistOrgData.value.checklistCode)) {
    MessagePlugin.error('请选择点检清单');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.checklistCategory)) {
    MessagePlugin.error('请选择清单类型');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.shiftCode)) {
    MessagePlugin.error('请选择出勤班次');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.executeFrequenceCode)) {
    MessagePlugin.error('请选择频率');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.personId)) {
    MessagePlugin.error('请选择执行人');
    return false;
  }

  await apiDaily.checklistOrg.insert({
    orgId: checklistOrgData.value.orgId,
    workcenterId: checklistOrgData.value.workcenterId,
    checklistCode: checklistOrgData.value.checklistCode,
    checklistName: checklistOrgData.value.checklistName,
    checklistDesc: checklistOrgData.value.checklistDesc,
    checklistCategory: checklistOrgData.value.checklistCategory,
    shiftCode: checklistOrgData.value.shiftCode,
    executeFrequence: Number(checklistOrgData.value.executeFrequenceCode),
    personId: checklistOrgData.value.personId,
  });
  await fetchTable();
  MessagePlugin.success('添加成功');

  return true;
};
const onUpdateRequest = async () => {
  if (_.isEmpty(checklistOrgData.value.checklistCode)) {
    MessagePlugin.error('请选择点检清单');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.checklistCategory)) {
    MessagePlugin.error('请选择清单类型');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.shiftCode)) {
    MessagePlugin.error('请选择出勤班次');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.executeFrequenceCode)) {
    MessagePlugin.error('请选择频率');
    return false;
  }
  if (_.isEmpty(checklistOrgData.value.personId)) {
    MessagePlugin.error('请选择执行人');
    return false;
  }

  await apiDaily.checklistOrg.update({
    id: checklistOrgData.value.id,
    orgId: checklistOrgData.value.orgId,
    workcenterId: checklistOrgData.value.workcenterId,
    checklistCode: checklistOrgData.value.checklistCode,
    checklistName: checklistOrgData.value.checklistName,
    checklistDesc: checklistOrgData.value.checklistDesc,
    checklistCategory: checklistOrgData.value.checklistCategory,
    shiftCode: checklistOrgData.value.shiftCode,
    executeFrequence: Number(checklistOrgData.value.executeFrequenceCode),
    personId: checklistOrgData.value.personId,
  });
  await fetchTable();
  MessagePlugin.success('修改成功');
  return true;
};

const rowClick = ref(null); // 点击行ID
const onSelectChange = async ({ row }) => {
  rowClick.value = row;
  await getChecklistItemList();
};

// # 项目
const itemInCheckList = reactive({ list: [] });
const itemTotal = ref(0);
const onFetchItemData = async () => {
  await getChecklistItemList();
};
const getChecklistItemList = async () => {
  const res = await apiDaily.checklistItem.getList({
    pageNum: 1,
    pageSize: 99999,
    checklistId: rowClick.value.checklistId,
  });
  itemInCheckList.list = res.list;
  itemTotal.value = res.total;
};
const itemColumns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 46,
  // },
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
];

// # 树
const treeKeys = { value: 'orgCode', label: 'orgName', key: 'id' };
const treeRef = ref();
const treeData = ref([]);

const onTreeClick = (treenode) => {
  checklistOrgData.value.orgId = treenode.node.data.orgId;
  checklistOrgData.value.workcenterId = treenode.node.data.workcenterId;
  checklistOrgData.value.orgCode = treenode.node.data.orgCode;
  checklistOrgData.value.orgName = treenode.node.data.orgName;
};
const fetchTreeTable = async () => {
  try {
    const data = await apiDaily.checklistOrg.getWorkShopAndWorkcenterTree();
    treeData.value = data.list;
  } catch (e) {
    console.log(e);
  }
};

const onCheckItemSelectChange = async (row) => {
  checklistOrgData.value.checklistId = row.id;
  checklistOrgData.value.checklistCode = row.checklistCode;
  checklistOrgData.value.checklistName = row.checklistName;
  checklistOrgData.value.checklistDesc = row.checklistDesc;
  if (_.isEmpty(row.id)) {
    checklistOrgData.value.checklistCategory = row.checklistCategory;
    checklistOrgData.value.shiftCode = row.shiftCode;
    checklistOrgData.value.executeFrequenceCode = `${row.executeFrequence}`;
    checklistOrgData.value.personId = row.personId;
  }
};

const onRowStateChange = async (row: any) => {
  const postRow = _.cloneDeep(row);
  const idsList = [];
  idsList.push(row.id);
  if (postRow.state === 1) {
    postRow.state = 0;
    await apiDaily.checklistOrg.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('禁用成功');
      row.state = postRow.state;
    });
  } else {
    postRow.state = 1;
    await apiDaily.checklistOrg.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
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
