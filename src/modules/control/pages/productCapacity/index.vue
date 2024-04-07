<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput">
        <template #workcenter="{ param }">
          <bcmp-select-business
            v-model="param.workcenterId"
            :label="t('business.main.workcenter')"
            :parent-id="param.workshopId"
            type="workcenter"
            :clearable="true"
          ></bcmp-select-business>
        </template>
        <template #workshop="{ param }">
          <bcmp-select-business
            v-model="param.workshopId"
            :label="t('business.main.workshop')"
            type="workshop"
            :clearable="true"
            @change="param.workcenterId = ''"
          ></bcmp-select-business>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :hover="false"
        :fixed-height="true"
        :loading="loading"
        :table-column="shiftColumns"
        active-row-type="single"
        :table-data="resultList.list"
        :total="resultTotal"
        @refresh="onFetchGroupData"
      >
        <template #title>
          {{ t('productCapacity.title') }}
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData"> {{ t('common.button.add') }} </t-button>
            <bcmp-import-button
              theme="primary"
              type="f_product_capacity"
              :button-text="t('common.button.import')"
              @close="onFetchGroupData"
            ></bcmp-import-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #班组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle" width="850px">
    <t-form ref="formRef" :rules="rules" :data="teamFormData" @submit="onAnomalyTypeSubmit">
      <t-row :gutter="[32, 16]">
        <!-- 第 1️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('business.main.workshop')" name="workshopId">
            <bcmp-select-business
              v-model="teamFormData.workshopId"
              label=""
              type="workshop"
              :clearable="true"
              :disabled="!submitFalg"
              @change="onChange"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('business.main.workcenter')" name="workcenterId">
            <bcmp-select-business
              v-model="teamFormData.workcenterId"
              label=""
              :parent-id="teamFormData.workshopId"
              type="workcenter"
              :clearable="true"
              :disabled="!teamFormData.workshopId || !submitFalg"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('business.main.mitemCode')" name="mitemId">
            <bcmp-select-business
              v-model="teamFormData.mitemId"
              label=""
              type="mitem"
              :clearable="true"
              :disabled="!submitFalg"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 3️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item :label="t('productCapacity.speedRate')" name="speedRate">
            <t-input-number
              v-model="teamFormData.speedRate"
              theme="column"
              style="width: 100%"
              min="0"
            ></t-input-number>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('productCapacity.status')">
            <t-switch v-model="teamFormData.isState" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">{{ t('common.button.save') }}</t-button>
    </template>
  </t-dialog>
</template>

<script lang="tsx">
export default {
  name: 'ProductCapacity',
};
</script>
<script setup lang="tsx">
import _ from 'lodash';
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

const { loading } = useLoading();
const teamFormData = ref({
  id: '', // 行 ID
  workshopId: '', // 仓库ID
  workcenterId: '', // 仓库ID
  mitemId: '', //  物料 ID
  state: 1, //  物料 编码
  isState: true, //  物料 编码
  speedRate: 0, // 安全库存
});

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 班组dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const submitFalg = ref(false);
// $ 表格数据
const resultList = reactive({ list: [] });
// 表格数据总条数
const resultTotal = ref(0);

// ####班次 表头
const shiftColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'orgCode',
    title: t('productCapacity.orgCode'),
    width: '100',
  },
  {
    colKey: 'mitemCode',
    title: t('productCapacity.mitemCode'),
    width: '120',
  },
  {
    colKey: 'mitemDesc',
    title: t('business.main.mitemDesc'),
    width: '100',
  },
  {
    colKey: 'workshopName',
    title: t('business.main.workshop'),
    width: '110',
  },
  {
    colKey: 'workcenterName',
    title: t('business.main.workcenter'),
    width: '120',
  },
  {
    colKey: 'wcCode',
    title: t('productCapacity.wcCode'),
    width: '120',
  },
  {
    colKey: 'speedRate',
    title: t('productCapacity.speedRate'),
    width: '100',
  },
  {
    colKey: 'stateName',
    title: t('productCapacity.status'),
    width: '80',
  },
  {
    colKey: 'creatorName',
    title: t('business.main.creator'),
    width: '80',
  },
  {
    colKey: 'timeCreate',
    title: t('business.main.timeCreate'),
    width: '170',
  },
  {
    colKey: 'modifierName',
    title: t('business.main.modifier'),
    width: '80',
  },
  {
    colKey: 'timeModified',
    title: t('business.main.timeModified'),
    width: '170',
  },
  {
    colKey: 'actionSlot',
    title: t('common.button.operation'),
    fixed: 'right',
    width: '80',
  },
];

const onChange = () => {
  if (submitFalg.value) {
    teamFormData.value.workcenterId = '';
  }
};
// # 刷新按钮
const onFetchGroupData = async () => {
  await getTabData(); //
};

// 表单定义规则
function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: t('common.validation.digits'), type: 'error' };
  }
  if (Number(value) < 0) {
    return { result: false, message: t('common.validation.number'), type: 'error' };
  }
  return true;
}
const rules: FormRules = {
  workshopId: [{ required: true, trigger: 'change' }],
  mitemId: [{ required: true, trigger: 'change' }],
  workcenterId: [{ required: true, trigger: 'change' }],
  speedRate: [
    { required: true, trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
};
// # 初始渲染
onMounted(async () => {
  await getTabData();
});

// #班组搜索
const opts = computed(() => {
  return {
    workshopId: {
      label: t('business.main.workshop'),
      slotName: 'workshop',
      defaultVal: '',
    },
    workcenterId: {
      label: t('business.main.workcenter'),
      slotName: 'workcenter',
      defaultVal: '',
    },
    mitemId: {
      label: t('productCapacity.mitemCode'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  queryConditions.value.mitemId = data.mitemId;
  queryConditions.value.workcenterId = data.workcenterId;
  queryConditions.value.workshopId = data.workshopId;
  await getTabData();
};

const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #出勤表格 参数
const queryConditions = ref({
  pageNum: 1,
  pageSize: 20,
  workshopId: '',
  workcenterId: '',
  mitemId: '',
});

const getTabData = async () => {
  queryConditions.value.pageNum = pageUI.value.page;
  queryConditions.value.pageSize = pageUI.value.rows;
  try {
    loading.value = true;
    const res = await api.productCapacity.getList(queryConditions.value);
    resultList.list = res.list;
    resultTotal.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const onAddSupportGroup = async () => {
  teamFormData.value.state = teamFormData.value.isState === true ? 1 : 0;
  await api.productCapacity.add(teamFormData.value);
  await getTabData();
  formVisible.value = false;
  MessagePlugin.success(t('common.message.success'));
};

// // #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  teamFormData.value.isState = true;
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = t('common.button.add');
};

// // #编辑 点击
const onEditRow = (row: any) => {
  formRef.value.reset({ type: 'empty' });
  submitFalg.value = false; // 编辑为 false
  teamFormData.value.id = row.id;
  teamFormData.value.mitemId = row.mitemId;
  teamFormData.value.speedRate = row.speedRate;
  teamFormData.value.isState = row.state === 1;
  teamFormData.value.workcenterId = row.workcenterId;
  teamFormData.value.workshopId = row.workshopId;
  formVisible.value = true;
  diaLogTitle.value = t('common.button.edit');
};

// #编辑  请求
const onGroupRequest = async () => {
  teamFormData.value.state = teamFormData.value.isState === true ? 1 : 0;
  await api.productCapacity.edit(teamFormData.value);
  await getTabData(); // 获取 班组表格 数据
  formVisible.value = false;
  MessagePlugin.success(t('common.message.success'));
};

// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddSupportGroup(); // 新增请求
    } else {
      await onGroupRequest(); // 编辑请求
    }
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.filled-icon {
  color: var(--td-success-color);
}
</style>
