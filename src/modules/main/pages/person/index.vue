<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="250px">
        <t-tree
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
          </cmp-card>
          <cmp-card>
            <cmp-table
              v-model:pagination="pageUI"
              :table-data="dataTable"
              :table-column="columnsParam"
              :row-key="rowKey"
              :loading="loading"
              :total="dataTotal"
              @refresh="onRefresh"
            >
              <template #title> 员工列表 </template>
              <template #op="slotProps">
                <t-space :size="8">
                  <t-link theme="primary" @click="handleClickDetail(slotProps)">{{ t('common.button.edit') }}</t-link>
                </t-space>
              </template>
              <template #button>
                <bcmp-import-auto-button theme="primary" button-text="导入" type="m_person"></bcmp-import-auto-button>
              </template>
              <template #stateSwitch="{ row }">
                <t-switch
                  v-model="row.state"
                  :custom-value="[1, 0]"
                  size="large"
                  @change="(value) => onSwitchChange(row, value)"
                ></t-switch>
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <t-dialog
    v-model:visible="onShowEditVisible"
    header="编辑"
    mode="modal"
    draggable
    destroy-on-close
    :close-on-overlay-click="false"
    width="40%"
    @confirm="onEditConfirm"
  >
    <bcmp-extend ref="extend" :object-id="formData.id" object-code="person" default-value="customPanel">
      <template #customPanel>
        <t-tab-panel value="customPanel" label="基础属性">
          <t-form :data="formData" style="margin-top: 10px">
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
        </t-tab-panel>
      </template>
    </bcmp-extend>
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
import { isEmpty } from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const personCode = ref(''); // 查询
const personState = ref(); //
const adminOrgId = ref(''); //
const { t } = useLang();
// #region  页面初始化
const userGenderList = ref([
  { label: '男', value: 1 },
  { label: '女', value: 0 },
]);

// 编辑的form
const extend = ref();
const formData = reactive({
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
const treeData = ref([]);

const filterByText = ref();
// 显示控制
const dataLoading = ref(false); // 是否显示数据加载图标
const onShowEditVisible = ref(false); // 是否显示编辑窗口
const onShowImportVisible = ref(false); // 是否显示导入窗口
// 表格列设置
const columnsParam = computed(() => {
  const cols: PrimaryTableCol<TableRowData>[] = [
    { title: '人员编码', colKey: 'personCode' },
    { title: '姓名', colKey: 'personName' },
    { title: '性别', colKey: 'genderName' },
    { title: '手机号', colKey: 'mobilePhone' },
    { title: '邮箱', colKey: 'email' },
    {
      colKey: 'state',
      title: '状态',
      align: 'center',
      width: 100,
      cell: 'stateSwitch',
    },
  ];
  personPropertyList.value.forEach((val) => {
    cols.push({
      title: val.displayName,
      colKey: val.id,
    });
  });
  cols.push({ title: '操作', align: 'left', fixed: 'right', colKey: 'op', width: 120 });
  return cols;
});

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
  pageUI.value.page = 1;
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
    if (isEmpty(formData.personname)) {
      MessagePlugin.error('请输入姓名');
      return false;
    }
    const rlt = await extend.value.getComponentData();
    if (!rlt.success) {
      MessagePlugin.error('扩展属性校验不通过');
      return false;
    }
    const properties = [];
    for (const key in rlt.data) {
      properties.push({
        objectPropertyId: key,
        propertyValue: rlt.data[key],
      });
    }
    await api.person.edit({
      id: formData.id,
      personCode: formData.personcode,
      personName: formData.personname,
      gender: formData.gender,
      mobilePhone: formData.mobilePhone,
      email: formData.email,
      state: formData.state ? 1 : 0,
      properties,
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
  return true;
};

// 导入按钮
// const onImport = () => {
//   onShowImportVisible.value = true;
// };
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
  adminOrgId.value = '';
  fetchTable();
};

// #endregion

// #region 刷新表格

const fetchTable = async () => {
  try {
    setLoading(true);
    const data = await api.person.getList({
      keyword: personCode.value,
      state: personState.value,
      adminOrgId: adminOrgId.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    });

    dataTable.value = data.list;
    dataTotal.value = data.total;

    // 扩展属性赋值
    dataTable.value.forEach((val) => {
      val.properties.forEach((property) => {
        val[property.objectPropertyId] = property.propertyValue;
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 重置form
const formInit = () => {
  formData.id = '';
  formData.email = '';
  formData.gender = 0;
  formData.mobilePhone = '';
  formData.personcode = '';
  formData.personname = '';
  formData.state = false;
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

// #endregion

// // #region 表格删除
// const deleteIdx = ref(-1);

// const onDeleteConfirm = async (e: any) => {
//   dataLoading.value = true;
//   try {
//     const rowModel = dataTable.value[deleteIdx.value];
//     const data = await api.person.delete({
//       id: rowModel.id,
//       state: rowModel.state === 0 ? 1 : 0,
//     });

//     onShowDeleteConfirmVisible.value = false;
//     fetchTable();
//   } catch (e) {
//     // console.log(e);
//   } finally {
//     dataLoading.value = false;
//   }
// };
// const onDeleteCancel = () => {
//   deleteIdx.value = -1;
// };

// #region Switch 状态获取
const onSwitchChange = async (row: any, value: any) => {
  row.state = value;
  await api.person
    .delete({
      id: row.id,
      state: row.state,
    })
    .then(() => {
      MessagePlugin.success('操作成功');
    });
};

// #endregion
const rowKey = 'id';

// const router = useRouter();

const handleClickDetail = (value: any) => {
  // router.push('/detail/base');
  formData.id = value.row.id;
  formData.email = value.row.email;
  formData.gender = value.row.gender;
  formData.mobilePhone = value.row.mobilePhone;
  formData.personcode = value.row.personCode;
  formData.personname = value.row.personName;
  formData.state = value.row.isState;
  onShowEditVisible.value = true;
};

const personPropertyList = ref([]);
const getPersonPropertyCol = () => {
  api.objectProperty
    .getObjectPropertyList({
      objectCode: 'person',
    })
    .then((data) => {
      personPropertyList.value = data;
    });
};

onMounted(() => {
  getPersonPropertyCol();
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
