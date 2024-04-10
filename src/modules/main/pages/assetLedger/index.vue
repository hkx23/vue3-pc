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
        <template #fileActionSlot="{ row }">
          <t-space :size="8">
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onDeleteRow(row)">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData">新增</t-button>
            <!-- <t-button theme="default">导入</t-button> -->
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
    width="48%"
    top="90px"
    @close="onSecondaryReset"
  >
    <cmp-container :full="true" style="height: calc(90vh - 140px - 140px)">
      <t-tabs v-model="tabDefaultValue" @change="tabChange">
        <t-tab-panel label="设备信息" value="0" :destroy-on-hide="true">
          <t-form
            v-if="tabCurrentValue == '0'"
            ref="formRef"
            :rules="rules"
            :colon="true"
            layout="inline"
            :data="equipmentData.list"
            label-width="120px"
            @submit="onAnomalyTypeSubmit"
          >
            <t-form-item label="设备类型" name="assetType">
              <bcmp-select-business
                v-model="equipmentData.list.assetTypeId"
                label=""
                type="assetType"
                :clearable="true"
                :disabled="isDisabled"
              ></bcmp-select-business>
            </t-form-item>
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
            <t-form-item label="设备编码" name="equipmentCode">
              <t-input v-model="equipmentData.list.equipmentCode"></t-input>
            </t-form-item>
            <t-form-item label="设备名称" name="equipmentName">
              <t-input v-model="equipmentData.list.equipmentName"></t-input>
            </t-form-item>
            <t-form-item label="设备描述" name="equipmentDesc">
              <t-input v-model="equipmentData.list.equipmentDesc"></t-input>
            </t-form-item>
            <t-form-item label="设备存放位置" name="position">
              <t-input v-model="equipmentData.list.position"></t-input>
            </t-form-item>
            <t-form-item label="保管部门" name="departmentOwner">
              <t-input v-model="equipmentData.list.departmentOwner"></t-input>
            </t-form-item>
            <t-form-item label="设备资产编号" name="assetCode">
              <t-input v-model="equipmentData.list.assetCode"></t-input>
            </t-form-item>
            <t-form-item label="管理部门" name="departmentOwner">
              <t-input v-model="equipmentData.list.departmentOwner" disabled></t-input>
            </t-form-item>
            <t-form-item label="设备供应商" name="equipmentSupplier">
              <t-input v-model="equipmentData.list.equipmentSupplier"></t-input>
            </t-form-item>
            <t-form-item label="保管人" name="userOwner">
              <t-input v-model="equipmentData.list.userOwner"></t-input>
            </t-form-item>
            <t-form-item label="维保联系人" name="maintenanceOwner">
              <t-input v-model="equipmentData.list.maintenanceOwner"></t-input>
            </t-form-item>
            <t-form-item label="维保人联系方式" name="maintenanceOwnerContact">
              <t-input v-model="equipmentData.list.maintenanceOwnerContact"></t-input>
            </t-form-item>
            <t-form-item label="生效日期" name="dateEffective" class="width: 100%">
              <t-date-picker v-model="equipmentData.list.dateEffective" clearable style="width: 300px" />
            </t-form-item>
            <t-form-item label="失效日期" name="dateInvalid">
              <t-date-picker v-model="equipmentData.list.dateInvalid" clearable style="width: 300px" />
            </t-form-item>
            <t-form-item label="进场日期" name="datetimeEntry">
              <t-date-picker v-model="equipmentData.list.datetimeEntry" clearable style="width: 300px" />
            </t-form-item>
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
            <t-form-item label="维修处理组" name="repairDeal">
              <t-input v-model="equipmentData.list.repairDealId"></t-input>
            </t-form-item>
            <t-form-item label="维修验收组" name="repairAccept">
              <t-input v-model="equipmentData.list.repairAcceptId"></t-input>
            </t-form-item>
            <t-form-item label="保养处理组" name="maintenanceDeal">
              <t-input v-model="equipmentData.list.maintenanceDealId"></t-input>
            </t-form-item>
            <t-form-item label="保养验收组" name="maintenanceAccept">
              <t-input v-model="equipmentData.list.maintenanceAcceptId"></t-input>
            </t-form-item>
            <t-form-item label="点检处理组" name="inspectDeal">
              <t-input v-model="equipmentData.list.inspectDealId"></t-input>
            </t-form-item>
            <t-form-item label="点检验收组" name="inspectAccept">
              <t-input v-model="equipmentData.list.inspectAcceptId"></t-input>
            </t-form-item>
          </t-form>
        </t-tab-panel>
        <t-tab-panel label="技术文件" value="1" :destroy-on-hide="true">
          <cmp-table
            ref="tableRef"
            row-key="id"
            :show-toolbar="false"
            :show-pagination="false"
            :hover="true"
            :fixed-height="false"
            empty="没有符合条件的数据"
            :table-data="anomalyTypeData.list"
            :table-column="fileColumns"
            :total="anomalyTotal"
          ></cmp-table>
        </t-tab-panel>
        <t-tab-panel label="维保履历" value="2" :destroy-on-hide="true"></t-tab-panel>
        <t-tab-panel label="拓展属性" value="3" :destroy-on-hide="true"></t-tab-panel>
      </t-tabs>
      <template #footer>
        <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
        <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
      </template>
    </cmp-container>
  </t-dialog>
</template>
<script setup lang="ts">
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

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
const tabDefaultValue = ref('0'); // tab的默认选中
const tabCurrentValue = ref(); // 当前tab的value值

// 表格数据总条数
const anomalyTotal = ref(0);
// 编辑回填 ID
const incidentID = ref('');
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
    colKey: 'position',
    title: '存放位置',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'departmentOwner',
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
    title: '管理状态',
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
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
};
// 表格列表数据
const fileColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    width: 46,
  },
  {
    colKey: 'fileName',
    title: '文件名',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'fileActionSlot', // 引用具名插槽
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
  tabCurrentValue.value = value;
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
  tabCurrentValue.value = '0'; // 当前tab的value值设0，默认加载第一个form表单
  isDisabled.value = false; // 控件开关
  formVisible.value = true; // dialog开关
  submitFalg.value = true; // 区分新增编辑的开关
  diaLogTitle.value = '新增设备台账';
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
  MessagePlugin.success('查询成功');
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};
// 右侧表格编辑按钮
const onEditRow = (row: any) => {
  tabCurrentValue.value = '0'; // 当前tab的value值设0，默认加载第一个form表单
  isDisabled.value = true; // 控件的开关
  formVisible.value = true; // dialog的开关
  submitFalg.value = false; // 区分新增编辑的开关
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

  incidentID.value = row.id; // 编辑回填 ID
  diaLogTitle.value = '编辑资产台账';
};

// 编辑表格数据 请求
const onRedactTypeRequest = async () => {
  await api.assetLedger.modify({ ...equipmentData.list, id: incidentID.value });
  await onGetAnomalyTypeData();
  MessagePlugin.success('修改成功');
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
  // 步骤 1: 检查删除前的数据总量
  const initialLength = anomalyTypeData.list.length;
  // 步骤 2: 执行删除操作
  await api.assetLedger.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === anomalyTypeData.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
    await onGetAnomalyTypeData(); // 重新渲染数组
    selectedRowKeys.value = [];
    MessagePlugin.success('批量删除成功');
  }
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
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
