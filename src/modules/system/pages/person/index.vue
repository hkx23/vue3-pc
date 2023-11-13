<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-tree :data="dataTree" line hover expand-all @click="onTreeClick" />
      </div>
    </div>
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-row justify="space-between">
          <t-col flex="auto">
            <div class="left-operation-container">
              <t-button theme="default" variant="base" @click="onImport">导入</t-button>
              <t-button theme="default" variant="base" @click="onEdit">编辑</t-button>
              <t-button theme="default" variant="base" @click="onMultiDelete">删除</t-button>
            </div>
          </t-col>
          <t-col flex="170px">
            <div class="search-input">
              <t-input v-model="personName" placeholder="姓名" clearable>
                <template #suffix-icon>
                  <search-icon size="16px" />
                </template>
              </t-input>
            </div>
          </t-col>
          <t-col flex="170px">
            <div class="search-input">
              <t-input v-model="personCode" placeholder="员工编号" clearable>
                <template #suffix-icon>
                  <search-icon size="16px" />
                </template>
              </t-input>
            </div>
          </t-col>
        </t-row>
        <div class="table-container">
          <t-table
            :data="dataTable"
            :columns="columnsParam"
            :row-key="rowKey"
            :hover="true"
            :pagination="pagination"
            :selected-row-keys="selectedRowKeys"
            :loading="dataLoading"
            @page-change="onPageChange"
            @select-change="onSelectChange"
          >
            <template #op="slotProps">
              <t-space>
                <t-icon name="edit" @click="handleClickDetail()" />
                <t-icon name="delete" @click="handleClickDelete(slotProps)" />
              </t-space>
            </template>
          </t-table>
        </div>
        <div>
          <t-dialog
            v-model:visible="confirmVisible"
            header="确认删除"
            mode="modal"
            draggable
            :body="confirmBody"
            :on-cancel="onCancel"
            :close-on-overlay-click="false"
            @confirm="onConfirmDelete"
          />
          <t-dialog
            v-model:visible="onMultiDeleteVisible"
            header="批量删除"
            mode="modal"
            draggable
            :close-on-overlay-click="false"
            :on-cancel="onMultiDeleteCancel"
          />
          <t-dialog
            v-model:visible="onShowEditVisible"
            header="编辑"
            mode="modal"
            draggable
            :close-on-overlay-click="false"
            :on-close="onEditCancel"
            width="40%"
            @confirm="onEditConfirm"
          >
            <t-space direction="vertical" style="width: 98%">
              <t-form class="form-container" :data="formData">
                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="用户编码" required-mark name="personcode">
                      <t-input v-model="formData.personcode" placeholder="请输入内容" />
                    </t-form-item>
                  </t-col>
                  <t-col>
                    <t-form-item label="姓名" required-mark>
                      <t-input v-model="formData.personname" placeholder="请输入内容" />
                    </t-form-item>
                  </t-col>
                </t-row>

                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="性别" required-mark>
                      <t-select v-model="formData.gender" :style="{ width: '173px' }" placeholder="请选择性别">
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
                  <t-col>
                    <t-form-item label="人员类型" required-mark>
                      <t-input v-model="formData.usertype" placeholder="请输入内容" />
                    </t-form-item>
                  </t-col>
                </t-row>

                <t-row class="form-container-row">
                  <t-col>
                    <t-form-item label="手机号">
                      <t-input v-model="formData.mobilePhone" placeholder="请输入内容" type="tel" />
                    </t-form-item>
                  </t-col>
                  <t-col>
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
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// import { useSettingStore } from '@/store';

const Api = {
  getlist:
    '/person/getlist?personcode=&personname=&sortfield=personname&sorttype=desc&filterfield=&filter=测试&pagenum=1&pagesize=2',
};

// #region  页面初始化
// const store = useSettingStore();
const userGenderList = ref([
  { label: '男', value: '1' },
  { label: '女', value: '2' },
  { label: '未知', value: '3' },
]);
const formData = ref({
  personcode: '测试编码',
  personname: '测试姓名',
  usertype: '测试类型',
  gender: '女',
  email: 'geqeqw@1231.com',
  mobilePhone: '12312309981',
  state: true,
});
const personName = ref(''); // 查询
const personCode = ref(''); // 查询

// 表格
const dataTable = ref([]);
const dataTree = ref([]);

// 显示控制
const dataLoading = ref(false); // 是否显示数据加载图标
const confirmVisible = ref(false); // 是否显示对话框
const onMultiDeleteVisible = ref(false); // 是否按钮删除窗口
const onShowEditVisible = ref(false); // 是否显示编辑窗口
const onShowImportVisible = ref(false); // 是否显示导入窗口
// 表格列设置
const columnsParam: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '人员编码',
    width: 160,
    ellipsis: true,
    colKey: 'name',
    filter: {
      type: 'input',
      resetValue: '',
      confirmEvents: ['onEnter'],
      props: {
        placeholder: '输入关键词',
        // onChange: onEmailChange,
      },
      showConfirmAndReset: true, // 是否显示重置取消按钮，
    },
    sorter: true,
  },
  { title: '姓名', width: 160, ellipsis: true, colKey: '姓名', sorter: true },
  { title: '性别', width: 160, ellipsis: true, colKey: '性别', sorter: true },
  { title: '手机号', width: 160, ellipsis: true, colKey: '手机号', sorter: true },
  { title: '邮箱', width: 160, ellipsis: true, colKey: '邮箱', sorter: true },
  { title: '状态', width: 160, ellipsis: true, colKey: '状态', sorter: true },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
// 表格分页设置
const pagination = ref({ defaultPageSize: 10, total: 100, defaultCurrent: 1 });

// #endregion

// #region 按钮逻辑

// 删除按钮
const onMultiDelete = () => {
  onMultiDeleteVisible.value = true;
};
const onMultiDeleteCancel = () => {
  console.log('111');
};

// 编辑按钮
const onEdit = () => {
  onShowEditVisible.value = true;
};
const onEditCancel = () => {
  console.log('111');
};

const onEditConfirm = () => {
  MessagePlugin.info(formData.value.personname);
  MessagePlugin.success('编辑成功');
};

// 导入按钮
const onImport = () => {
  onShowImportVisible.value = true;
};
const onImportCancel = () => {
  console.log('111');
};

// #endregion

// #region 刷新表格
const fetchTable = async () => {
  dataLoading.value = true;
  try {
    const { list } = await http.get<any>(Api.getlist);
    // dataTable.value = list;
    // pagination.value = { ...pagination.value, total: list.length };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};
// #endregion

// #region 刷新树
const fetchTree = async () => {
  try {
    dataTree.value = [
      {
        value: '工厂CODE',
        label: '工厂名称',
        children: [
          {
            value: '总经办',
            label: '总经办',
          },
          {
            value: '生产部',
            label: '生产部',
            children: [
              {
                value: '产线1',
                label: '产线1',
              },
              {
                value: '产线2',
                label: '产线2',
              },
            ],
          },
        ],
      },
    ];
  } catch (e) {
    console.log(e);
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
  // console.log('分页变化', curr, pageInfo);
};

// #endregion

// #region 表格删除
const onConfirmDelete = () => {
  // 真实业务请发起请求
  dataTable.value.splice(deleteIdx.value, 1);
  pagination.value.total = dataTable.value.length;
  const selectedIdx = selectedRowKeys.value.indexOf(deleteIdx.value);
  if (selectedIdx > -1) {
    selectedRowKeys.value.splice(selectedIdx, 1);
  }
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  deleteIdx.value = -1;
};
const deleteIdx = ref(-1);
const confirmBody = () => {
  if (deleteIdx.value > -1) {
    const { name } = dataTable.value[deleteIdx.value];
    return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
  }
  return '';
};
const onCancel = () => {
  deleteIdx.value = -1;
};

// #endregion

onMounted(() => {
  fetchTable();
  fetchTree();
});

const selectedRowKeys = ref([1, 2]);

const router = useRouter();

const rowKey = 'index';

// 选中行
const onSelectChange = (val: number[]) => {
  selectedRowKeys.value = val;
};

const handleClickDetail = () => {
  router.push('/detail/base');
};

const handleClickDelete = (row: { rowIndex: any }) => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};
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
  width: 160px;
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
