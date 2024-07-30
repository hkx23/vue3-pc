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
    width="60%"
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
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="许可证">
        <t-space direction="vertical" size="small" align="center">
          <t-table
            ref="licenseTableRef"
            row-key="key"
            class="editable_table"
            :data="licenseData"
            :columns="licenseCols"
            :show-header="false"
            :editable-row-keys="editableLicense"
            @row-edit="onLicenseRowEdit"
          >
            <template #attach="{ row }">
              <t-space v-if="row.files.length === 0">
                <t-upload
                  v-model="row.files"
                  theme="custom"
                  :before-upload="beforeUpload"
                  :request-method="requestMethod"
                >
                  <t-button shape="square" variant="text">
                    <template #icon>
                      <upload-icon />
                    </template>
                  </t-button>
                </t-upload>
              </t-space>
              <t-space v-else>
                <t-button shape="square" variant="text" :href="row.files[0].url">
                  <template #icon>
                    <attach-icon />
                  </template>
                </t-button>
              </t-space>
            </template>
            <template #op="{ row }">
              <t-space v-if="editableLicense.includes(row.key)">
                <t-link theme="primary" @click="onLicenseSave(row.key)">保存</t-link>
              </t-space>
              <t-space v-else>
                <t-link theme="primary" @click="onLicenseEdit(row.key)">编辑</t-link>
                <t-link theme="primary" @click="onLicenseDel(row.key)">删除</t-link>
              </t-space>
            </template>
          </t-table>
          <t-button variant="outline" @click="addLicense">添加许可证</t-button>
        </t-space>
      </t-tab-panel>
      <t-tab-panel :value="2" label="可操作设备">
        <t-space direction="vertical" size="small" align="center">
          <t-table
            ref="deviceTableRef"
            row-key="key"
            class="editable_table"
            :data="deviceRelationData"
            :columns="deviceCols"
            :show-header="false"
            :editable-row-keys="editableDevice"
            @row-edit="onDeviceRelationRowEdit"
          >
            <template #op="{ row }">
              <t-space v-if="editableDevice.includes(row.key)">
                <t-link theme="primary" @click="onDeviceRelationSave(row.key)">保存</t-link>
              </t-space>
              <t-space v-else>
                <t-link theme="primary" @click="onDeviceRelationEdit(row.key)">编辑</t-link>
                <t-link theme="primary" @click="onDeviceRelationDel(row.key)">删除</t-link>
              </t-space>
            </template>
          </t-table>
          <t-button variant="outline" @click="addDeviceRelation">关联设备</t-button>
        </t-space>
      </t-tab-panel>
    </t-tabs>
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
import dayjs from 'dayjs';
import { find, isEmpty } from 'lodash';
import { AttachIcon, UploadIcon } from 'tdesign-icons-vue-next';
import {
  DatePicker,
  Input,
  MessagePlugin,
  PrimaryTableCol,
  RequestMethodResponse,
  Select,
  TableRowData,
  UploadFile,
} from 'tdesign-vue-next';
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
  { label: '全部', value: null },
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
      defaultVal: null,
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
    const certificates = [];
    licenseData.value.forEach((val) => {
      let attach = null;
      if (val.attach) {
        attach = val.attach;
      } else if (val.files.length > 0) {
        attach = `Certificate/${val.files[0].name}`;
      }
      certificates.push({
        certificateParam: val.certificateParam,
        certificateCode: val.certificateCode,
        certificateLevel: val.certificateLevel,
        certificateValidity: val.certificateValidity,
        attach,
      });
    });
    await api.person.edit({
      id: formData.id,
      personCode: formData.personcode,
      personName: formData.personname,
      gender: formData.gender,
      mobilePhone: formData.mobilePhone,
      email: formData.email,
      state: formData.state ? 1 : 0,
      properties,
      certificates,
      devices: deviceRelationData.value,
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
  personState.value = null;
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
  licenseData.value = [];
  deviceRelationData.value = [];
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
  getPersonDetail(value.row.id);
  onShowEditVisible.value = true;
};

const getPersonDetail = (id: any) => {
  licenseData.value = [];
  deviceRelationData.value = [];
  api.person.getById(id).then((data) => {
    data.certificates.forEach((val: any, index) => {
      val.key = index;
      val.certificateValidity = dayjs(val.certificateValidity).format('YYYY-MM-DD');
      if (val.attachUrl) {
        val.files = [
          {
            url: val.attachUrl,
          },
        ];
      } else {
        val.files = [];
      }
      licenseData.value.push(val);
    });
    data.devices.forEach((val: any, index) => {
      val.key = index;
      deviceRelationData.value.push(val);
    });
  });
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

// 获取资格证 下拉框 数组
const certificates = ref([]);
const getCertificates = () => {
  api.param.getListByGroupCode({ parmGroupCode: 'PERSON_CERTIFICATE' }).then((data) => {
    certificates.value = data;
  });
};
// 获取设备类型 下拉框 数组
const assetTypes = ref([]);
const getAssetTypes = () => {
  assetTypes.value = [];
  api.assetType.search({}).then((data) => {
    data.list.forEach((val) => {
      assetTypes.value.push({
        label: val.typeName,
        value: val.id,
      });
    });
  });
};

const licenseTableRef = ref();
const editableLicense = ref([]);
const licenseCols = computed(() => {
  return [
    {
      title: '许可证名称',
      colKey: 'certificateParam',
      cell: (_h: any, { row }) => certificates.value.find((t) => t.value === row.certificateParam)?.label,
      edit: {
        component: Select,
        props: {
          placeholder: '许可证名称',
          options: certificates.value,
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false,
      },
    },
    {
      title: '许可证编号',
      colKey: 'certificateCode',
      edit: {
        component: Input,
        props: {
          placeholder: '许可证编号',
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false,
      },
    },
    {
      title: '许可证级别',
      colKey: 'certificateLevel',
      edit: {
        component: Input,
        props: {
          placeholder: '许可证级别',
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false,
      },
    },
    {
      title: '许可证有效期',
      colKey: 'certificateValidity',
      edit: {
        component: DatePicker,
        props: {
          allowInput: true,
          placeholder: '许可证有效期',
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false,
      },
    },
    { title: '附件', colKey: 'attach', width: 50 },
    { title: '操作', colKey: 'op', width: 100 },
  ];
});
const licenseData = ref([]);
const addLicense = () => {
  const row = {
    key: licenseData.value.length,
    certificateParam: '',
    certificateCode: '',
    certificateLevel: '',
    certificateValidity: '',
    files: [],
  };
  licenseData.value.push(row);
  editableLicense.value.push(row.key);
};
const editLicenseMap = reactive({});
const onLicenseRowEdit = (params: any) => {
  const { row, col, value } = params;
  const oldRowData = editLicenseMap[row.key]?.editedRow || row;
  const editedRow = { ...oldRowData, [col.colKey]: value };
  editLicenseMap[row.key] = {
    ...params,
    editedRow,
  };
};
const onLicenseSave = (key: any) => {
  // 触发内部校验，而后也可在 onRowValidate 中接收异步校验结果
  licenseTableRef.value.validateRowData(key).then((params: any) => {
    if (params.result.length) {
      const r = params.result[0];
      MessagePlugin.error(`${r.col.title} ${r.errorList[0].message}`);
      return;
    }
    // 如果是 table 的父组件主动触发校验
    if (params.trigger === 'parent' && !params.result.length) {
      const current = editLicenseMap[key];
      if (current) {
        // 获取附件
        const row = find(licenseData.value, ['key', key]);
        if (row) {
          current.editedRow.files = row.files;
        }
        licenseData.value.splice(current.rowIndex, 1, current.editedRow);
      }
      const index = editableLicense.value.findIndex((t: any) => t === key);
      editableLicense.value.splice(index, 1);
    }
  });
};
const onLicenseEdit = (key: any) => {
  if (!editableLicense.value.includes(key)) {
    editableLicense.value.push(key);
  }
};
const onLicenseDel = (key: any) => {
  const index = licenseData.value.findIndex((t: any) => t.key === key);
  if (index > -1) {
    licenseData.value.splice(index, 1);
  }
};
// 上传前校验
const beforeUpload = (file: UploadFile) => {
  if (file.size / 1024 / 1024 > 20) {
    MessagePlugin.error('只能上传小于20M的文件');
    return false;
  }
  return true;
};
// 上传文件处理
type RequestMethod = (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
const requestMethod: RequestMethod = async (file: UploadFile) => {
  try {
    const res = await api.file.uploadFile(
      {
        path: 'Certificate',
      },
      {
        file: file.raw,
      },
    );
    return { status: 'success', response: { url: res } };
  } catch (error) {
    MessagePlugin.error(error.message);
    // 在这里可以根据错误类型返回失败状态
    return { status: 'fail', response: {} };
  }
};
const deviceTableRef = ref();
const editableDevice = ref([]);
const deviceCols = computed(() => {
  return [
    {
      title: '许可证名称',
      colKey: 'certificateParam',
      cell: (_h: any, { row }) => certificates.value.find((t) => t.value === row.certificateParam)?.label,
      edit: {
        component: Select,
        props: {
          placeholder: '许可证名称',
          options: certificates.value,
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false,
      },
    },
    {
      title: '设备类型',
      colKey: 'deviceTypeId',
      cell: (_h: any, { row }) => assetTypes.value.find((t) => t.value === row.deviceTypeId)?.label,
      edit: {
        component: Select,
        props: {
          placeholder: '设备类型',
          options: assetTypes.value,
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false,
      },
    },
    { title: '操作', colKey: 'op', width: 100 },
  ];
});
const deviceRelationData = ref([]);
const addDeviceRelation = () => {
  const row = {
    key: deviceRelationData.value.length,
    certificateParam: '',
    deviceTypeId: '',
  };
  deviceRelationData.value.push(row);
  editableDevice.value.push(row.key);
};
const editDeviceRelationMap = reactive({});
const onDeviceRelationRowEdit = (params: any) => {
  const { row, col, value } = params;
  const oldRowData = editDeviceRelationMap[row.key]?.editedRow || row;
  const editedRow = { ...oldRowData, [col.colKey]: value };
  editDeviceRelationMap[row.key] = {
    ...params,
    editedRow,
  };
};
const onDeviceRelationSave = (key: any) => {
  // 触发内部校验，而后也可在 onRowValidate 中接收异步校验结果
  deviceTableRef.value.validateRowData(key).then((params: any) => {
    if (params.result.length) {
      const r = params.result[0];
      MessagePlugin.error(`${r.col.title} ${r.errorList[0].message}`);
      return;
    }
    // 如果是 table 的父组件主动触发校验
    if (params.trigger === 'parent' && !params.result.length) {
      const current = editDeviceRelationMap[key];
      if (current) {
        deviceRelationData.value.splice(current.rowIndex, 1, current.editedRow);
      }
      const index = editableDevice.value.findIndex((t: any) => t === key);
      editableDevice.value.splice(index, 1);
    }
  });
};
const onDeviceRelationEdit = (key: any) => {
  if (!editableDevice.value.includes(key)) {
    editableDevice.value.push(key);
  }
};
const onDeviceRelationDel = (key: any) => {
  const index = deviceRelationData.value.findIndex((t: any) => t.key === key);
  if (index > -1) {
    deviceRelationData.value.splice(index, 1);
  }
};

onMounted(() => {
  getCertificates();
  getAssetTypes();
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

.editable_table {
  :deep(.t-date-picker) {
    width: 120px;
  }
}
</style>
