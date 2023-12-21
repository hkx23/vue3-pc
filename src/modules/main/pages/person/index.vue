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
          :filter="filterByText"
          :activable="true"
          @click="onTreeClick"
        />
      </cmp-card>
      <cmp-card flex="auto" :ghost="true">
        <cmp-container :full="true">
          <cmp-card>
            <!-- 查询组件  -->
            <cmp-query :opts="opts" @submit="conditionEnter" @reset="onReset" />
            <!-- <t-row justify="space-between">
              <t-col flex="170px">
                <div>
                  <t-input v-model="personCode" label="员工" placeholder="请输入员工编号或姓名" clearable />
                </div>
              </t-col>
              <t-col flex="20px"></t-col>
              <t-col flex="170px">
                <div>
                  <t-select v-model="personState" label="状态" :options="stateOptions" clearable />
                </div>
              </t-col>
              <t-col flex="auto"></t-col>
              <t-col flex="170px">
                <div>
                  <t-button @click="onRefresh">查询</t-button>
                  <t-button theme="default" @click="onReset">重置</t-button>
                </div>
              </t-col>
            </t-row> -->
          </cmp-card>
          <cmp-card>
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              :table-data="dataTable"
              :table-column="columnsParam"
              :row-key="rowKey"
              :loading="loading"
              :total="dataTotal"
              @refresh="onRefresh"
            >
              <template #op="slotProps">
                <t-space>
                  <t-link theme="primary" @click="handleClickDetail(slotProps)">{{ t('common.button.edit') }}</t-link>
                  <t-link theme="primary" @click="handleClickDelete(slotProps)">{{
                    slotProps.row.state === 1 ? t('common.button.disable') : t('common.button.enable')
                  }}</t-link>
                  <!-- <t-icon name="edit" @click="handleClickDetail(slotProps)" />
                  <t-icon name="delete" @click="handleClickDelete(slotProps)" /> -->
                </t-space>
              </template>
              <template #button>
                <t-button theme="primary" @click="onImport">导入</t-button>
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <t-dialog
    v-model:visible="onShowDeleteConfirmVisible"
    header="确认"
    mode="modal"
    draggable
    :body="onDeleteConfirmBody"
    :on-cancel="onDeleteCancel"
    :close-on-overlay-click="false"
    @confirm="onDeleteConfirm"
  >
  </t-dialog>
  <t-dialog
    v-model:visible="onShowEditVisible"
    header="编辑"
    mode="modal"
    draggable
    :close-on-overlay-click="false"
    width="40%"
    @confirm="onEditConfirm"
  >
    <t-space direction="vertical" style="width: 98%">
      <t-form :data="formData">
        <t-form-item label="员工编码" required-mark>
          <t-input v-model="formData.personcode" disabled />
        </t-form-item>
        <t-form-item label="姓名" required-mark>
          <t-input v-model="formData.personname" placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="性别" required-mark>
          <t-select v-model="formData.gender" placeholder="请选择性别">
            <t-option v-for="(item, index) in userGenderList" :key="index" :value="item.value" :label="item.label">
              {{ item.label }}
            </t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="手机号">
          <t-input v-model="formData.mobilePhone" placeholder="请输入内容" type="tel" />
        </t-form-item>
        <t-form-item label="邮箱">
          <t-input v-model="formData.email" placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="启用">
          <t-switch v-model="formData.state" />
        </t-form-item>
      </t-form>
    </t-space>
  </t-dialog>
  <t-dialog
    v-model:visible="onShowImportVisible"
    header="导入用户"
    :on-close="onImportCancel"
    :close-on-overlay-click="false"
    width="40%"
  >
    <t-space direction="vertical" style="width: 100%">
      <div>
        <p>这是导入窗口</p>
        <p>This is Dialog Content</p>
      </div>
    </t-space>
  </t-dialog>
</template>

<script lang="ts">
export default {
  name: 'Person',
};
</script>

<script setup lang="ts">
// import { isEmpty } from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const personCode = ref(''); // 查询
const personState = ref(-1); //
const adminOrgId = ref(-1); //
const { t } = useLang();
// #region  页面初始化
const userGenderList = ref([
  { label: '男', value: 1 },
  { label: '女', value: 0 },
]);

// 编辑的form
const formData = ref({
  id: '',
  personcode: '',
  personname: '',
  gender: 0,
  email: '',
  mobilePhone: '',
  state: false,
});

// 表格
const dataTable = ref([]);
const dataTotal = ref(0);
const treeKeys = { value: 'orgCode', label: 'orgName', key: 'id' };
const treeRef = ref();
const treeData = ref([]);

const filterByText = ref();
// 显示控制
const dataLoading = ref(false); // 是否显示数据加载图标
const onShowDeleteConfirmVisible = ref(false); // 是否显示对话框
const onShowEditVisible = ref(false); // 是否显示编辑窗口
const onShowImportVisible = ref(false); // 是否显示导入窗口
// 表格列设置
const columnsParam: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 64 },
  { title: '人员编码', colKey: 'personCode' },
  { title: '姓名', colKey: 'personName' },
  { title: '性别', colKey: 'genderName' },
  { title: '手机号', colKey: 'mobilePhone' },
  { title: '邮箱', colKey: 'email' },
  { title: '状态', colKey: 'stateName' },
  { title: '操作', align: 'left', fixed: 'right', colKey: 'op' },
];

// 下拉初始数据
const stateOptions = [
  { label: '全部', value: -1 },
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];
// 查询组件
const opts = computed(() => {
  return {
    personCode: {
      label: '员工',
      comp: 't-input',
      placeholder: '请输入员工编号或姓名',
      defaultVal: '',
    },
    personState: {
      label: '状态',
      comp: 't-select',
      placeholder: '请选择状态',
      defaultVal: -1,
      bind: {
        options: stateOptions,
      },
    },
  };
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  personCode.value = data.personCode;
  personState.value = data.personState;
  onRefresh();
};
// 表格分页设置
// const pagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });

// #endregion

// #region 按钮逻辑

// 编辑按钮
const onEditConfirm = async () => {
  dataLoading.value = true;
  try {
    const data = await api.person.edit({
      id: formData.value.id.toString(),
      personCode: formData.value.personcode,
      personName: formData.value.personname,
      gender: formData.value.gender,
      mobilePhone: formData.value.mobilePhone,
      email: formData.value.email,
      state: formData.value.state ? 1 : 0,
    });
    MessagePlugin.success('编辑成功');

    onShowEditVisible.value = false;
    formInit();
    fetchTable();
  } catch (e) {
    // console.log(e);
    // MessagePlugin.error(e);
  } finally {
    dataLoading.value = false;
  }
};

// 导入按钮
const onImport = () => {
  onShowImportVisible.value = true;
};
const onImportCancel = () => {
  console.log('111');
};
const onTreeClick = (treenode) => {
  adminOrgId.value = treenode.node.data.id;
  fetchTable();
};
// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  personCode.value = '';
  personState.value = -1;
  adminOrgId.value = -1;
  fetchTable();
};

// #endregion

// #region 刷新表格

const fetchTable = async () => {
  setLoading(true);
  try {
    const data = (await api.person.getlist({
      personcode: personCode.value,
      personname: '',
      state: personState.value == null ? -1 : personState.value,
      adminorgid: adminOrgId.value,
      sortfield: '',
      sorttype: '',
      filterfield: '',
      filter: '',
      pagenum: pageUI.value.page,
      pagesize: pageUI.value.rows,
    })) as any;

    dataTable.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 重置form
const formInit = () => {
  formData.value.id = '';
  formData.value.email = '';
  formData.value.gender = 0;
  formData.value.mobilePhone = '';
  formData.value.personcode = '';
  formData.value.personname = '';
  formData.value.state = false;
};
// #endregion

// #region 刷新树
const fetchTree = async () => {
  dataLoading.value = true;
  try {
    const listTree = (await api.adminOrg.tree()) as any;
    treeData.value = listTree;
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

// watch(treeActiveKey, () => {
//   debugger;
//   if (treeRef?.value && !isEmpty(treeActiveKey.value)) {
//     const activeNode = treeRef.value.getTreeData(treeActiveKey.value[0]);
//     treeActiveNode.value = activeNode[0].children?.length > 0 ? activeNode[0].children : activeNode;
//   } else {
//     treeActiveNode.value = treeData.value;
//   }
// });

// #endregion

// #region 表格删除
const deleteIdx = ref(-1);

const onDeleteConfirm = async (e: any) => {
  dataLoading.value = true;
  try {
    const rowModel = dataTable.value[deleteIdx.value];
    const data = await api.person.delete({
      id: rowModel.id,
      state: rowModel.state === 0 ? 1 : 0,
    });

    onShowDeleteConfirmVisible.value = false;
    fetchTable();
  } catch (e) {
    // console.log(e);
  } finally {
    dataLoading.value = false;
  }
};
const onDeleteConfirmBody = () => {
  if (deleteIdx.value > -1) {
    const { personName, state } = dataTable.value[deleteIdx.value];
    if (state === 0) {
      return `是否启用当前行的员工【${personName}】的信息？`;
    }
    return `是否禁用当前行的员工【${personName}】的信息？`;
  }
  return '';
};
const onDeleteCancel = () => {
  deleteIdx.value = -1;
};

// #endregion
const rowKey = 'id';

// const router = useRouter();

const handleClickDetail = (value: any) => {
  // router.push('/detail/base');
  formData.value.id = value.row.id;
  formData.value.email = value.row.email;
  formData.value.gender = value.row.gender;
  formData.value.mobilePhone = value.row.mobilePhone;
  formData.value.personcode = value.row.personCode;
  formData.value.personname = value.row.personName;
  formData.value.state = value.row.isState;
  onShowEditVisible.value = true;
};

const handleClickDelete = (value: any) => {
  deleteIdx.value = value.rowIndex;
  onShowDeleteConfirmVisible.value = true;
};
onMounted(() => {
  fetchTable();
  fetchTree();
});
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
  margin-right: 8px;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: 16px 24px;
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}
</style>
