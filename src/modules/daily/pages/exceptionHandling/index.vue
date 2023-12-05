<!-- 异常处理配置 -->
<template>
  <div>
    <t-card>
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-data="exceptionDataList.list"
        :table-column="column"
        :total="exceptionTotal"
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
      >
        <template #isAllowTransfer="{ row }">
          {{ row.isAllowTransfer ? '是' : '否' }}
        </template>
        <template #button>
          <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
        </template>
        <template #operate>
          <t-button @click="onAdd">新增</t-button>
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="ondeleteBatches">
            <t-button variant="outline">批量删除</t-button>
          </t-popconfirm>
        </template>
        <template #op="{ row }">
          <t-space>
            <!-- 编辑 -->
            <icon name="edit-1" style="cursor: pointer" @click="onEdit(row)"></icon>
            <!-- 删除 -->
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete">
              <icon name="delete" style="cursor: pointer" @click="onSingleDeletion(row)"></icon>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      header="新增(编辑)异常处理配置"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
    >
      <t-form ref="formRef" :rules="rules" :data="formItem" @submit="onAnomalyTypeSubmit">
        <t-form-item :label="t('exceptionHandling.OrganizationName')" name="OrganizationName">
          <t-select v-model="formItem.list.OrganizationName" @change="onOrgIdChange">
            <t-option v-for="item in organizationNameData.list" :key="item.id" :label="item.orgName" :value="item" />
          </t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.abnormalModule')" name="abnormalModule">
          <t-select v-model="formItem.list.abnormalModule" @change="onIncidentModuleChange">
            <t-option v-for="item in exceptionModuleData.list" :key="item.id" :label="item.paramValue" :value="item" />
          </t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.treatmentGroup')" name="processOrder">
          <t-select v-model="formItem.list.processOrder" @change="onsupportGroupIdChange">
            <t-option
              v-for="item in treatmentGroupData.list"
              :key="item.id"
              :label="item.supportGroupName"
              :value="item"
            />
          </t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.processOrder')" name="levelSeq">
          <t-input v-model="formItem.list.levelSeq" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.transferOrders')" name="isAllowTransfer">
          <t-radio-group
            v-model="formItem.list.isAllowTransfer"
            name="city"
            :options="itemOptions"
            size="small"
          ></t-radio-group
        ></t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
          <t-button theme="primary" type="submit">保存</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';

import CmpTable from '../../../../components/cmp-table/index.vue';
import { useLang } from './lang';

const formVisible = ref(false);

// 编辑需要的 ID
const redactID = ref(null);
// 表格数据
const exceptionDataList = reactive({ list: [] });
// 表格总页数
const exceptionTotal = ref(null);
// 组件分页
const { pageUI } = usePage();
// 搜索组件配置
const opts = computed(() => {
  return {
    keyWord: {
      label: '处理组或异常类型查询',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
// form实例
const formRef: Ref<FormInstanceFunctions> = ref(null);
// 新增为true，编辑为false
const submitFalg = ref(false);
// 页面翻页
const page = ref({ pageNum: pageUI.value.page, pageSize: pageUI.value.rows, keyword: '' });
// 多选框删除数据数组
const selectedRowKeys: Ref<any[]> = ref([]);
// 单选框组件
const itemOptions = [
  { label: '允许', value: 1 },
  { label: '不允许', value: 0 },
];
// 多语言
const { t } = useLang();

// 多选的值事件触发
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};
// 表单 值
const formItem = reactive({
  list: {
    orgId: null, // 组织名称的 ID
    incidentModule: '', // 异常模块 Code
    supportGroupId: '', // 处理组 ID
    OrganizationName: '', // 组织名称
    abnormalModule: '', // 异常模块
    processOrder: '', // 处理组
    levelSeq: null, // 处理顺序
    isAllowTransfer: null, // 是否允许传值
  },
});
// table 列列列列列列列 数据定义
const column = ref([
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'orgName',
    title: t('exceptionHandling.OrganizationName'),
    align: 'center',
  },
  {
    colKey: 'incidentModuleName',
    title: t('exceptionHandling.abnormalModule'),
    align: 'center',
  },
  {
    colKey: 'supportGroupName',
    title: t('exceptionHandling.treatmentGroup'),
    align: 'center',
  },
  {
    colKey: 'levelSeq',
    title: t('exceptionHandling.processOrder'),
    align: 'center',
  },
  {
    colKey: 'isAllowTransfer',
    title: t('exceptionHandling.transferOrders'),
    align: 'center',
    cell: 'isAllowTransfer',
  },
  {
    colKey: 'op',
    title: t('exceptionHandling.operate'),
    align: 'center',
    fixed: 'right',
  },
]);

// #初始化请求
onMounted(async () => {
  await onFetchData(); // 渲染表格
  await onGetOrganizationNameData();
  await onGetExceptionModuleData();
  await onGetTreatmentGroupData();
});

// #表格数据 获取
const onFetchData = async () => {
  const res = await api.incidentCfg.getList(page.value);
  exceptionDataList.list = res.list;
  exceptionTotal.value = res.total;
};

// #搜索触发事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  page.value.keyword = data.keyWord;
  await onFetchData();
};

// dialog下拉框数据
const organizationNameData = reactive({ list: [] }); // 组织名称数据
const exceptionModuleData = reactive({ list: [] }); // 异常模块数据
const treatmentGroupData = reactive({ list: [] }); // 处理组数据

// 获取组织名称数据
const onGetOrganizationNameData = async () => {
  const res = await api.incidentCfg.getOrg();
  organizationNameData.list = res.list;
};
// 获取异常模块数据
const onGetExceptionModuleData = async () => {
  const res = await api.incidentCfg.getIncidentModule();
  exceptionModuleData.list = res.list;
};
// 获取处理组数据
const onGetTreatmentGroupData = async () => {
  const res = await api.incidentCfg.getSupportGroup();
  treatmentGroupData.list = res.list;
};
const onOrgIdChange = (value: { id: any }) => {
  formItem.list.orgId = value.id;
};
const onIncidentModuleChange = (value: { paramCode: string }) => {
  formItem.list.incidentModule = value.paramCode;
};
const onsupportGroupIdChange = (value: { id: string }) => {
  formItem.list.supportGroupId = value.id;
};
// 新增 点击 按钮事件
const onAdd = async () => {
  formItem.list.orgId = null;
  formItem.list.incidentModule = '';
  formItem.list.supportGroupId = '';
  formItem.list.OrganizationName = ''; // 组织明称
  formItem.list.abnormalModule = ''; // 异常模块名称
  formItem.list.processOrder = ''; // 处理组名称
  formItem.list.levelSeq = null; // 处理顺序
  formItem.list.isAllowTransfer = null; // 是否允许转单
  submitFalg.value = true; // true为新增
  formVisible.value = true; // 添加窗口控制
};

// 新增请求
const addAanEdit = async () => {
  const dataToSend = { ...formItem.list };
  // 删除不需要的属性
  delete dataToSend.OrganizationName;
  delete dataToSend.abnormalModule;
  delete dataToSend.processOrder;
  await api.incidentCfg.addIncidentCfg(dataToSend);
  await onFetchData();
  MessagePlugin.success('新增成功');
};

// 编辑 点击按钮事件
const onEdit = (row: any) => {
  console.log('🚀 ~ file: index.vue:262 ~ onEdit ~ row:', row);
  redactID.value = row.id;
  formItem.list.orgId = row.orgId;
  formItem.list.incidentModule = row.incidentModule;
  formItem.list.supportGroupId = row.supportGroupId;
  formItem.list.OrganizationName = row.orgName; // 组织明称
  formItem.list.abnormalModule = row.incidentModuleName; // 异常模块名称
  formItem.list.processOrder = row.supportGroupName; // 处理组名称
  formItem.list.levelSeq = row.levelSeq; // 处理顺序
  formItem.list.isAllowTransfer = row.isAllowTransfer; // 是否允许转单
  submitFalg.value = false; // false为编辑
  formVisible.value = true; // 添加窗口控制
};

// 编辑请求
const onRedactRequest = async () => {
  const dataToSend = { ...formItem.list };
  // 删除不需要的属性
  delete dataToSend.OrganizationName;
  delete dataToSend.abnormalModule;
  delete dataToSend.processOrder;
  await api.incidentCfg.modifyIncidentType({ ...dataToSend, id: redactID.value });
  await onFetchData();
  MessagePlugin.success('编辑成功');
};

// 点击删除按钮
const onSingleDeletion = (row: { id: any }) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};

// 删除
const onDelete = async () => {
  await api.incidentCfg.removeIncidentCfgBatch({ ids: selectedRowKeys.value });
  if (exceptionDataList.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onFetchData();
  MessagePlugin.success('删除成功');
  selectedRowKeys.value = [];
};

// 批量删除
const ondeleteBatches = async () => {
  await api.incidentCfg.removeIncidentCfgBatch({ ids: selectedRowKeys.value });
  if (exceptionDataList.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onFetchData();
  MessagePlugin.success('批量删除成功');
  selectedRowKeys.value = [];
};

// 表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await addAanEdit(); // 新增请求
    } else {
      await onRedactRequest(); // 编辑请求
    }
    formVisible.value = false;
  }
};

// form效验
const rules: FormRules<Data> = {
  OrganizationName: [
    {
      required: false,
      type: 'error',
      trigger: 'change',
    },
  ],
  abnormalModule: [
    {
      required: false,
      type: 'error',
      trigger: 'change',
    },
  ],
  processOrder: [
    {
      required: false,
      type: 'error',
      trigger: 'blur',
    },
  ],
  levelSeq: [
    {
      required: false,
      type: 'error',
      trigger: 'blur',
    },
  ],
  isAllowTransfer: [
    {
      required: false,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}
</style>
