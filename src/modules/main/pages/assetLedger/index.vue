<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryCompent" :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :fixed-height="true"
        :table-data="anomalyTypeData.list"
        :total="anomalyTotal"
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchData"
        @select-change="rehandleSelectChange"
      >
        <template #title>
          {{ '资产台账列表' }}
        </template>
        <template #stateSwitch="{ row }">
          <t-switch
            :custom-value="[1, 0]"
            :value="row.state"
            :default-value="row.state"
            @change="(value) => onSwitchChange(row, value)"
          ></t-switch>
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onDeleteRow(row)">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData">新增</t-button>
            <bcmp-import-auto-button
              theme="default"
              button-text="导入"
              type="a_incident_type"
            ></bcmp-import-auto-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="deleteBatches()">
              <t-button theme="default">批量删除</t-button>
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
    width="70%"
    top="50px"
    @close="onSecondaryReset"
  >
    <cmp-container :full="true">
      <t-tabs v-if="formVisible" v-model="tabValue" @change="tabChange">
        <t-tab-panel label="设备信息" value="0" :destroy-on-hide="true">
          <t-form
            ref="formRef"
            style="margin-top: 12px"
            :rules="rules"
            :colon="true"
            :data="equipmentData.list"
            label-width="120px"
            @submit="onAnomalyTypeSubmit"
          >
            <t-row :gutter="[32, 16]">
              <t-col :span="6">
                <t-form-item label="设备类型" name="assetType">
                  <bcmp-select-business
                    v-model="equipmentData.list.assetTypeId"
                    label=""
                    type="assetType"
                    :clearable="true"
                    :disabled="isDisabled"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备品牌" name="assetBrand">
                  <bcmp-select-business
                    v-model="equipmentData.list.assetBrandId"
                    label=""
                    type="assetBrand"
                    :parent="equipmentData.list.assetTypeId"
                    :clearable="true"
                    :disabled="isDisabled"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备型号" name="assetModel">
                  <bcmp-select-business
                    v-model="equipmentData.list.assetModelId"
                    label=""
                    type="assetModel"
                    :parent="equipmentData.list.assetBrandId"
                    :clearable="true"
                    :disabled="isDisabled"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备编码" name="equipmentCode">
                  <t-input v-model="equipmentData.list.equipmentCode"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备名称" name="equipmentName">
                  <t-input v-model="equipmentData.list.equipmentName"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备描述" name="equipmentDesc">
                  <t-input v-model="equipmentData.list.equipmentDesc"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备存放位置" name="position">
                  <bcmp-select-business
                    v-model="equipmentData.list.position"
                    label=""
                    :show-title="false"
                    :name="t('assetLedger.设备存放位置')"
                    :placeholder="t('common.placeholder.select')"
                    type="workcenter"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="保管部门" name="departmentOwner">
                  <bcmp-select-business
                    v-model="equipmentData.list.departmentOwner"
                    label=""
                    :show-title="false"
                    :name="t('assetLedger.保管部门')"
                    :placeholder="t('common.placeholder.select')"
                    type="adminOrg"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备资产编号" name="assetCode">
                  <t-input v-model="equipmentData.list.assetCode"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="设备供应商" name="equipmentSupplier">
                  <bcmp-select-business
                    v-model="equipmentData.list.equipmentSupplier"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supplier"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="保管人" name="userOwner">
                  <bcmp-select-business
                    v-model="equipmentData.list.userOwner"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="person"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="维保联系人" name="maintenanceOwner">
                  <t-input v-model="equipmentData.list.maintenanceOwner"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="维保人联系方式" name="maintenanceOwnerContact">
                  <t-input v-model="equipmentData.list.maintenanceOwnerContact"></t-input>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="生效日期" name="dateEffective" class="width: 100%">
                  <t-date-picker v-model="equipmentData.list.dateEffective" clearable style="width: 300px" />
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="失效日期" name="dateInvalid">
                  <t-date-picker v-model="equipmentData.list.dateInvalid" clearable style="width: 300px" />
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="进场日期" name="datetimeEntry">
                  <t-date-picker v-model="equipmentData.list.datetimeEntry" clearable style="width: 300px" />
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="状态" name="status">
                  <t-select v-model="equipmentData.list.status" :clearable="true">
                    <t-option
                      v-for="item in equipmentStatusDataList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </t-select>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="维修处理组" name="repairDeal">
                  <bcmp-select-business
                    v-model="equipmentData.list.repairDealId"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supportGroup"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="维修验收组" name="repairAccept">
                  <bcmp-select-business
                    v-model="equipmentData.list.repairAcceptId"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supportGroup"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="保养处理组" name="maintenanceDeal">
                  <bcmp-select-business
                    v-model="equipmentData.list.maintenanceDealId"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supportGroup"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="保养验收组" name="maintenanceAccept">
                  <bcmp-select-business
                    v-model="equipmentData.list.maintenanceAcceptId"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supportGroup"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="点检处理组" name="inspectDeal">
                  <bcmp-select-business
                    v-model="equipmentData.list.inspectDealId"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supportGroup"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col :span="6">
                <t-form-item label="点检验收组" name="inspectAccept">
                  <bcmp-select-business
                    v-model="equipmentData.list.inspectAcceptId"
                    label=""
                    :show-title="false"
                    :placeholder="t('common.placeholder.select')"
                    type="supportGroup"
                    :clearable="true"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
            </t-row>
          </t-form>
        </t-tab-panel>
        <t-tab-panel label="技术文件" value="1" :destroy-on-hide="true">
          <cmp-container :full="true">
            <bcmp-upload-content
              :file-list="fileList"
              upload-path="inspectStd"
              :is-hand-delete="true"
              @upload-success="uploadSuccess"
              @uploadfail="uploadfail"
              @delete-success="deleteSuccess"
              @batch-delete-success="batchDeleteSuccess"
            ></bcmp-upload-content>
          </cmp-container>
        </t-tab-panel>
        <t-tab-panel label="维保履历" value="2" :destroy-on-hide="true">
          <cmp-table
            row-key="billNo"
            :show-pagination="false"
            :show-setting="false"
            :show-toolbar="false"
            :select-on-row-click="false"
            empty="没有符合条件的数据"
            :table-column="maintenanceColumns"
            :table-data="repairMaintenanceData"
            :loading="isLoading"
            :selected-row-keys="selectedRowKeys"
          ></cmp-table>
        </t-tab-panel>
        <t-tab-panel label="拓展属性" value="3" :destroy-on-hide="true">
          <cmp-card :span="12">
            <!-- <t-button @click="getExtend"> 校验与获取数据 </t-button> -->
            <bcmp-extend ref="demoExtend" :object-id="objectId" object-code="equipment"></bcmp-extend>
          </cmp-card>
        </t-tab-panel>
      </t-tabs>
    </cmp-container>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api, EquipmentFile } from '@/api/main';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import { usePage } from '@/hooks/modules/page';

import BcmpUploadContent from './bcmp-upload-content/index.vue';
import { useLang } from './lang';

const { t } = useLang();
const isDisabled = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 要删除的id
const submitFalg = ref(false);
const queryCompent = ref(); // 查询组件对象传递
const tabValue = ref('0'); // tab的默认选中
const fileList = ref([]); // 上传文件列表
const isLoading = ref(false); // 是否用loading
const fileData = ref<EquipmentFile[]>([]);
const repairMaintenanceData = ref([]);
const demoExtend = ref<any>(); // 扩展属性组件引用传递
const objectId = ref(); // 扩展属性组件参数动态变量
const propertyDataList = ref([]); // 扩展属性表单参数

// const getExtend = () => {
//   demoExtend.value.getComponentData().then((data) => {
//     MessagePlugin.info(
//       `校验结果:${data.success}   扩展属性类别code:${data.objectCategorycode}---   值变化:${JSON.stringify(data.data)}`,
//     );
//   });
// };

// 表格数据总条数
const anomalyTotal = ref(0);
// 编辑回填 ID
const equipmentID = ref('');
// 表格数据
const anomalyTypeData = reactive({ list: [] });

// dialog 弹框数据
const equipmentData = reactive({
  list: {
    equipmentCode: '', // 设备编码
    equipmentName: '', // 设备名称
    assetTypeId: '', // 设备类型ID
    equipmentDesc: '', // 设备描述
    assetBrandId: ' ', // 设备品牌ID
    position: ' ', // 设备存放位置
    assetModelId: ' ', // 设备型号ID
    departmentOwner: ' ', // 保管部门
    assetCode: ' ', // 设备资产编号
    // assetModelId: ' ', // 管理部门
    equipmentSupplier: ' ', // 设备供应商
    userOwner: ' ', // 保管人
    maintenanceOwner: ' ', // 维保联系人
    maintenanceOwnerContact: ' ', // 维保联系方式
    dateEffective: '', // 生效时间
    dateInvalid: '', // 失效时间
    datetimeEntry: '', // 进场时间
    status: '', // 状态
    repairDealId: '', // 维修处理组
    repairAcceptId: '', // 维修验收组
    maintenanceDealId: '', // 保养处理组
    maintenanceAcceptId: '', // 保养验收组
    inspectDealId: '', // 点检处理组
    inspectAcceptId: '', // 点检验收组
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
    colKey: 'assetCode',
    title: '资产编号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'equipmentCode',
    title: '资产编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'equipmentName',
    title: '资产名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'brandName',
    title: '资产品牌',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'modelName',
    title: '资产型号',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'positionName',
    title: '存放位置',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'departmentOwnerName',
    title: '保管部门',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'maintenanceOwner',
    title: '维保人员',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'maintenanceOwnerContact',
    title: '维保人联系方式',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeEntry',
    title: '入厂时间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'statusName',
    title: '资产状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'state',
    title: '有效',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
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
// 表单验证规则
const rules: FormRules = {
  assetTypeId: [{ required: true, message: '资产类型不能为空', trigger: 'change' }],
  assetBrandId: [{ required: true, message: '资产品牌不能为空', trigger: 'change' }],
  assetModelId: [{ required: true, message: '资产型号不能为空', trigger: 'change' }],
  assetCode: [{ required: true, message: '设备资产编号不能为空', trigger: 'blur' }],
  equipmentCode: [{ required: true, message: '设备编码不能为空', trigger: 'blur' }],
  equipmentName: [{ required: true, message: '设备名称不能为空', trigger: 'blur' }],
  equipmentDesc: [{ required: true, message: '设备描述不能为空', trigger: 'blur' }],
  position: [{ required: true, message: '设备存放位置不能为空', trigger: 'change' }],
  departmentOwner: [{ required: true, message: '保管部门不能为空', trigger: 'change' }],
  equipmentSupplier: [{ required: true, message: '设备供应商不能为空', trigger: 'change' }],
  dateEffective: [{ required: true, message: '生效日期不能为空', trigger: 'change' }],
  dateInvalid: [{ required: true, message: '失效日期不能为空', trigger: 'change' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
};
// 表格列表数据
const maintenanceColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    width: 46,
  },
  {
    colKey: 'billNo',
    title: '单据编号',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'billCategoryName',
    title: '单据类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'createTime',
    title: '完成日期',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'creatorName',
    title: '处理人',
    align: 'center',
    width: '100',
  },
];
// 初始渲染
onMounted(async () => {
  await onGetAnomalyTypeData(); // 获取 表格 数据
});

// switch 开关事件
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  await api.assetLedger.modify({
    state: isValue,
    equipmentCode: row.equipmentCode,
    assetModelId: row.assetModelId,
    id: row.id,
  });
  await queryCompent.value.search();
  MessagePlugin.success('操作成功');
};

// TAb 栏切换事件
const tabChange = async (value: any) => {
  if (value === '1' && diaLogTitle.value === '编辑资产台账') {
    const filesData = await api.equipmentFile.getList({
      pageNum: 1,
      pageSize: 99999,
      equipmentId: equipmentID.value,
    });
    fileList.value = filesData.list;
  } else if (value === '2' && diaLogTitle.value === '编辑资产台账') {
    const res = await api.assetLedger.getMaintenanceList({
      pageNum: 1,
      pageSize: 99999,
      equipmentId: equipmentID.value,
    });
    repairMaintenanceData.value = res.list;
  } else if (value === '3' && diaLogTitle.value === '编辑资产台账') {
    objectId.value = equipmentID.value;
    demoExtend.value.initFormSetting({
      objectCode: 'equipment',
      propertyCode: '',
      objectId: equipmentID.value,
    });
  }
};

// 初始化 状态 下拉框数据
const equipmentStatusDataList = [
  { label: '正常', value: 'NORMAL' },
  { label: '维修中', value: 'REPAIR' },
  { label: '保养中', value: 'MAINTENANCE' },
  { label: '已报废', value: 'SCRAPED' },
];

// 刷新按钮
const onFetchData = () => {
  onGetAnomalyTypeData();
  selectedRowKeys.value = [];
};

// 获取 表格 数据
const onGetAnomalyTypeData = async () => {
  const res = await api.assetLedger.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
};

// 添加按钮点击事件
const onAddTypeData = () => {
  tabValue.value = '0'; // 当前tab的value值设0，默认加载第一个form表单
  isDisabled.value = false; // 控件开关
  formVisible.value = true; // dialog开关
  submitFalg.value = true; // 区分新增编辑的开关
  diaLogTitle.value = '新增设备台账';
  fileList.value = []; // 清空文件列表
  // 清空数据
  equipmentData.list.equipmentCode = ''; // 设备编码
  equipmentData.list.equipmentName = ''; // 设备名称
  equipmentData.list.assetTypeId = ''; // 设备类型ID
  equipmentData.list.equipmentDesc = ''; // 设备描述
  equipmentData.list.assetBrandId = ''; // 设备品牌ID
  equipmentData.list.position = ''; // 设备存放位置
  equipmentData.list.assetModelId = ''; // 设备型号ID
  equipmentData.list.departmentOwner = ''; // 保管部门
  equipmentData.list.assetCode = ''; // 设备资产编号
  // assetModelId: ' '; // 管理部门
  equipmentData.list.equipmentSupplier = ''; // 设备供应商
  equipmentData.list.userOwner = ''; // 保管人
  equipmentData.list.maintenanceOwner = ''; // 维保联系人
  equipmentData.list.maintenanceOwnerContact = ''; // 维保联系方式
  equipmentData.list.dateEffective = ''; // 生效时间
  equipmentData.list.dateInvalid = ''; // 失效时间
  equipmentData.list.datetimeEntry = ''; // 进场时间
  equipmentData.list.status = ''; // 状态
  equipmentData.list.repairDealId = ''; // 维修处理组
  equipmentData.list.repairAcceptId = ''; // 维修验收组
  equipmentData.list.maintenanceDealId = ''; // 保养处理组
  equipmentData.list.maintenanceAcceptId = ''; // 保养验收组
  equipmentData.list.inspectDealId = ''; // 点检处理组
  equipmentData.list.inspectAcceptId = ''; // 点检验收组
};

// 添加资产台账请求
const onAddTypeRequest = async () => {
  await api.assetLedger.add(equipmentData.list);
  await onGetAnomalyTypeData();
  MessagePlugin.success('添加成功');
};

// #query 查询参数
const opts = computed(() => {
  return {
    soltDemo: {
      label: '资产编码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const res = await api.assetLedger.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    keyword: data.soltDemo,
  });
  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
  // MessagePlugin.success('查询成功');
};

const onSecondarySubmit = async () => {
  if (tabValue.value === '0') {
    formRef.value.submit();
  } else if (tabValue.value === '1') {
    fileData.value = fileList.value.map((item) => {
      return { equipmentId: equipmentID.value, fileName: item.fileName, filePath: item.signedUrl };
    });
    await api.equipmentFile.modifyFileList({
      fileList: fileData.value,
      equipmentId: equipmentID.value,
    });
    formVisible.value = false;
  } else if (tabValue.value === '3') {
    demoExtend.value.getComponentData().then((data) => {
      if (data.success) {
        propertyDataList.value = Object.keys(data.data).map((key) => {
          return { propertyId: key, propertyValue: data.data[key] };
        });
      } else {
        MessagePlugin.warning('数据格式校验失败！');
      }
    });
    await api.equipmentProperty.save({
      equipmentId: equipmentID.value,
      propertyList: propertyDataList.value,
    });
    formVisible.value = false;
  }
};
// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  tabValue.value = '0'; // 当前tab的value值设0，默认加载第一个form表单
  isDisabled.value = true; // 控件的开关
  formVisible.value = true; // dialog的开关
  submitFalg.value = false; // 区分新增编辑的开关
  diaLogTitle.value = '编辑资产台账';
  // 回填数据
  equipmentData.list.equipmentCode = row.equipmentCode; // 设备编码
  equipmentData.list.equipmentName = row.equipmentName; // 设备名称
  equipmentData.list.assetTypeId = row.assetTypeId; // 设备类型ID
  equipmentData.list.equipmentDesc = row.equipmentDesc; // 设备描述
  equipmentData.list.assetBrandId = row.assetBrandId; // 设备品牌ID
  equipmentData.list.position = row.position; // 设备存放位置
  equipmentData.list.assetModelId = row.assetModelId; // 设备型号ID
  equipmentData.list.departmentOwner = row.departmentOwner; // 保管部门
  equipmentData.list.assetCode = row.assetCode; // 设备资产编号
  // assetModelId: ' '; // 管理部门
  equipmentData.list.equipmentSupplier = row.equipmentSupplier; // 设备供应商
  equipmentData.list.userOwner = row.userOwner; // 保管人
  equipmentData.list.maintenanceOwner = row.maintenanceOwner; // 维保联系人
  equipmentData.list.maintenanceOwnerContact = row.maintenanceOwnerContact; // 维保联系方式
  equipmentData.list.dateEffective = row.dateEffective; // 生效时间
  equipmentData.list.dateInvalid = row.dateInvalid; // 失效时间
  equipmentData.list.datetimeEntry = row.datetimeEntry; // 进场时间
  equipmentData.list.status = row.status; // 状态
  equipmentData.list.repairDealId = row.repairDealId; // 维修处理组
  equipmentData.list.repairAcceptId = row.repairAcceptId; // 维修验收组
  equipmentData.list.maintenanceDealId = row.maintenanceDealId; // 保养处理组
  equipmentData.list.maintenanceAcceptId = row.maintenanceAcceptId; // 保养验收组
  equipmentData.list.inspectDealId = row.inspectDealId; // 点检处理组
  equipmentData.list.inspectAcceptId = row.inspectAcceptId; // 点检验收组

  equipmentID.value = row.id; // 编辑回填 ID
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await api.assetLedger.modify({ ...equipmentData.list, id: equipmentID.value });
  await onGetAnomalyTypeData();
  MessagePlugin.success('修改成功');
};

const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(`上传文件成功`);
  fileList.value.push(file);
  console.log('🚀 ~ file: detail.vue:208 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: detail.vue:209 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传文件失败`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(`删除文件成功`);
  console.log('deleteSuccess', file);
  fileList.value = fileList.value.filter((item) => item.signedUrl !== file.signedUrl);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(`删除文件成功`);
  console.log('batchDeleteSuccess', files);
  files.forEach((item) => {
    fileList.value = fileList.value.filter((file) => file.signedUrl !== item.signedUrl);
  });
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 右侧表格删除按钮
const onDeleteRow = (row: any) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};

// 右侧表格删除确认按钮
const onDelConfirm = async () => {
  await api.assetLedger.removeBatch(selectedRowKeys.value);
  if (anomalyTypeData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('删除成功');
};

// 批量删除
const deleteBatches = async () => {
  await api.assetLedger.removeBatch(selectedRowKeys.value);
  await onGetAnomalyTypeData(); // 重新渲染数组
  selectedRowKeys.value = [];
  MessagePlugin.success('批量删除成功');
};

// 关闭模态框事件
const onSecondaryReset = () => {
  equipmentData.list.assetBrandId = '';
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
