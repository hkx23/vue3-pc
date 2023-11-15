<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-tree :data="dataTree" line hover expand-all activable @click="onTreeClick" />
      </div>
    </div>
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col>
            <div>
              <t-input v-model="personCode" label="员工：" placeholder="请输入员工编号或姓名" clearable />
            </div>
          </t-col>
          <t-col flex="170px">
            <div>
              <t-button theme="default" variant="base" @click="onRefresh">查询</t-button>
              <t-button theme="default" variant="base" @click="onReset">重置</t-button>
            </div>
          </t-col>
        </t-row>
        <t-row style="margin-top: 10px">
          <t-button theme="default" variant="base" @click="onImport">导入</t-button>
        </t-row>
        <div class="table-container">
          <t-table
            v-model="selectedTableRows"
            :data="dataTable"
            :columns="columnsParam"
            :row-key="rowKey"
            :hover="true"
            :pagination="pagination"
            :loading="dataLoading"
            :selected-row-keys="selectedRowKeys"
            @page-change="onPageChange"
            @select-change="onSelectChange"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="handleClickDetail(slotProps)" />
                <t-icon name="delete" @click="handleClickDelete(slotProps)" />
              </t-space>
            </template>
          </t-table>
        </div>
        <div>
          <t-dialog
            v-model:visible="onShowDeleteConfirmVisible"
            header="确认删除"
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
              <t-form class="form-container" :data="formData">
                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="员工编码" required-mark>
                      <t-input v-model="formData.personcode" disabled />
                    </t-form-item>
                    <t-form-item label="姓名" required-mark>
                      <t-input v-model="formData.personname" placeholder="请输入内容" />
                    </t-form-item>
                  </t-col>
                </t-row>

                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="性别" required-mark>
                      <t-select v-model="formData.gender" :style="{ width: '155px' }" placeholder="请选择性别">
                        <t-option
                          v-for="(item, index) in userGenderList"
                          :key="index"
                          :value="item.value"
                          :label="item.label"
                        >
                          {{ item.label }}
                        </t-option>
                      </t-select>
                    </t-form-item>
                  </t-col>
                </t-row>

                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="手机号">
                      <t-input v-model="formData.mobilePhone" placeholder="请输入内容" type="tel" />
                    </t-form-item>
                    <t-form-item label="邮箱">
                      <t-input v-model="formData.email" placeholder="请输入内容" />
                    </t-form-item>
                  </t-col>
                </t-row>

                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="启用">
                      <t-switch v-model="formData.state" />
                    </t-form-item>
                  </t-col>
                </t-row>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Person',
};
</script>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { getAdminOrgList } from '../../api/adminOrg';
import { getList, postDelete, postEdit } from '../../api/person';

// import { useRouter } from 'vue-router';

// import { useSettingStore } from '@/store';
// const store = useSettingStore();

const personCode = ref(''); // 查询

// #region  页面初始化
const userGenderList = ref([
  { label: '男', value: 1 },
  { label: '女', value: 0 },
  { label: '未知', value: -1 },
]);

// 编辑的form
const formData = ref({
  id: -1,
  personcode: '',
  personname: '',
  gender: '',
  email: '',
  mobilePhone: '',
  state: false,
});

// 表格
const dataTable = ref([]);
const dataTree = ref([]);
const selectedTableRows = ref([]); // 用于存储选中行的数组

// 显示控制
const dataLoading = ref(false); // 是否显示数据加载图标
const onShowDeleteConfirmVisible = ref(false); // 是否显示对话框
const onShowEditVisible = ref(false); // 是否显示编辑窗口
const onShowImportVisible = ref(false); // 是否显示导入窗口
// 表格列设置
const columnsParam: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'id', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '人员编码',
    width: 160,
    ellipsis: true,
    colKey: 'personCode',
  },
  { title: '姓名', width: 160, ellipsis: true, colKey: 'personName' },
  { title: '性别', width: 160, ellipsis: true, colKey: 'genderName' },
  { title: '手机号', width: 160, ellipsis: true, colKey: 'mobilePhone' },
  { title: '邮箱', width: 160, ellipsis: true, colKey: 'email' },
  { title: '状态', width: 160, ellipsis: true, colKey: 'stateName' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

// 表格分页设置
const pagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });

// #endregion

// #region 按钮逻辑

// 编辑按钮
const onEditConfirm = async () => {
  dataLoading.value = true;
  try {
    const data = await postEdit({
      id: formData.value.id.toString(),
      personcode: formData.value.personcode,
      personname: formData.value.personname,
      gender: formData.value.gender,
      mobilephone: formData.value.mobilePhone,
      email: formData.value.email,
      state: formData.value.state.toString(),
    });
    MessagePlugin.success('编辑成功');

    onShowEditVisible.value = false;
    formInit();
    fetchTable();
  } catch (e) {
    // debugger;
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

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const onReset = () => {
  personCode.value = '';
};

// #endregion

// #region 刷新表格

const fetchTable = async () => {
  dataLoading.value = true;
  try {
    const data = await getList({
      personcode: personCode.value,
      personname: '',
      sortfield: '',
      sorttype: '',
      filterfield: '',
      filter: '',
      pagenum: pagination.value.defaultCurrent,
      pagesize: pagination.value.defaultPageSize,
    });
    dataTable.value = data.list;
    pagination.value = { ...pagination.value, total: data.total };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

// 重置form
const formInit = () => {
  formData.value.id = -1;
  formData.value.email = '';
  formData.value.gender = '';
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
    const data = await getAdminOrgList({ parent_org_id: -1 });

    dataTree.value = data.list.map((item) => ({
      value: item.orgCode,
      label: item.orgName,
      actived: false,
    }));
    dataTree.value[0].actived = true;
  } catch (e) {
    // console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const onTreeClick = (context: any) => {
  console.info('onClick', context);
  const { node } = context;
  console.info(node.value, 'actived:', node.actived);
};
// #endregion

// #region 表格分页

const onPageChange = (curr: any, pageInfo: any) => {
  pagination.value.defaultCurrent = curr.current;
  fetchTable();
};

// #endregion

// #region 表格删除
const deleteIdx = ref(-1);

const onDeleteConfirm = async (e: any) => {
  dataLoading.value = true;
  try {
    const rowModel = dataTable.value[deleteIdx.value];
    const data = await postDelete({
      id: rowModel.id,
    });

    onShowDeleteConfirmVisible.value = false;
    fetchTable();
    MessagePlugin.success('删除成功');
  } catch (e) {
    // console.log(e);
  } finally {
    dataLoading.value = false;
  }
};
const onDeleteConfirmBody = () => {
  if (deleteIdx.value > -1) {
    const { personName } = dataTable.value[deleteIdx.value];
    return `是否删除当前行的员工【${personName}】的信息？`;
  }
  return '';
};
const onDeleteCancel = () => {
  deleteIdx.value = -1;
};

// #endregion
const selectedRowKeys = ref([]);
const rowKey = 'id';

// const router = useRouter();

// 选中行
const onSelectChange = (value: any, options: any) => {
  selectedRowKeys.value = value;
  // console.log(value, selectedRowData);
};

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
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}
</style>
