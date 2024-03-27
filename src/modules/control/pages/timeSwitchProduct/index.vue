<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput">
        <template #valueCategory="{ param }">
          <t-select
            v-model="param.valueCategory"
            :label="t('timeSwitchProduct.valueCategory')"
            :clearable="true"
            @change="
              param.preValueId = '';
              param.backValueId = '';
            "
          >
            <t-option key="0" :label="t('business.main.mitemCode')" value="mitem" />
            <t-option key="1" :label="t('business.main.mitemTypeCode')" value="mitem_category" />
          </t-select>
        </template>
        <template #preValue="{ param }">
          <bcmp-select-business
            v-if="param.valueCategory === 'mitem'"
            v-model="param.preValueId"
            :label="t('timeSwitchProduct.preValue')"
            :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.preValue')"
            type="mitem"
            :clearable="true"
          ></bcmp-select-business>
          <bcmp-select-business
            v-if="param.valueCategory === 'mitem_category'"
            v-model="param.preValueId"
            :label="t('timeSwitchProduct.preValue')"
            :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.preValue')"
            type="mitemCategory"
            :clearable="true"
          ></bcmp-select-business>
        </template>
        <template #backValue="{ param }">
          <bcmp-select-business
            v-if="param.valueCategory === 'mitem'"
            v-model="param.backValueId"
            :label="t('timeSwitchProduct.backValue')"
            :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.backValue')"
            type="mitem"
            :clearable="true"
          ></bcmp-select-business>
          <bcmp-select-business
            v-if="param.valueCategory === 'mitem_category'"
            v-model="param.backValueId"
            :label="t('timeSwitchProduct.backValue')"
            :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.backValue')"
            type="mitemCategory"
            :clearable="true"
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
          {{ t('timeSwitchProduct.title') }}
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
              type="f_time_switch_product"
              :button-text="t('common.button.import')"
              @close="onFetchGroupData"
            ></bcmp-import-button>
            <!-- <t-button theme="default" @click="formVisibleImport = true"> {{ t('common.button.import') }} </t-button> -->
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #班组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="teamFormData" label-width="120px" @submit="onAnomalyTypeSubmit">
      <t-row :gutter="[32, 16]">
        <!-- 第 1️⃣ 行数据 -->
        <t-col :span="12">
          <t-form-item :label="t('timeSwitchProduct.valueCategory')" name="valueCategory">
            <t-select
              v-model="teamFormData.valueCategory"
              :disabled="!submitFalg"
              label=""
              :clearable="true"
              @change="onChange"
            >
              <t-option key="0" :label="t('business.main.mitemCode')" value="mitem" />
              <t-option key="1" :label="t('business.main.mitemTypeCode')" value="mitem_category" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="teamFormData.valueCategory === 'mitem_category'" :span="12">
          <t-form-item :label="t('timeSwitchProduct.preValue')" name="preValueId">
            <bcmp-select-business
              v-model="teamFormData.preValueId"
              :disabled="!teamFormData.valueCategory || !submitFalg"
              label=""
              :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.preValue')"
              type="mitemCategory"
              :clearable="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col v-if="teamFormData.valueCategory === 'mitem_category'" :span="12">
          <t-form-item :label="t('timeSwitchProduct.backValue')" name="backValueId">
            <bcmp-select-business
              v-model="teamFormData.backValueId"
              :disabled="!teamFormData.valueCategory || !submitFalg"
              label=""
              :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.backValue')"
              type="mitemCategory"
              :clearable="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col v-if="teamFormData.valueCategory !== 'mitem_category'" :span="12">
          <t-form-item :label="t('timeSwitchProduct.preValue')" name="preValueId">
            <bcmp-select-business
              v-model="teamFormData.preValueId"
              :disabled="!teamFormData.valueCategory || !submitFalg"
              label=""
              :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.preValue')"
              type="mitem"
              :clearable="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col v-if="teamFormData.valueCategory !== 'mitem_category'" :span="12">
          <t-form-item :label="t('timeSwitchProduct.backValue')" name="backValueId">
            <bcmp-select-business
              v-model="teamFormData.backValueId"
              :disabled="!teamFormData.valueCategory || !submitFalg"
              label=""
              :placeholder="t('common.placeholder.select') + t('timeSwitchProduct.backValue')"
              type="mitem"
              :clearable="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 3️⃣ 行数据 -->
        <t-col :span="12">
          <t-form-item :label="t('timeSwitchProduct.switchDurationNumber')" name="switchDuration">
            <t-input-number
              v-model="teamFormData.switchDuration"
              theme="column"
              style="width: 100%"
              min="0"
            ></t-input-number>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('timeSwitchProduct.state')">
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
  name: 'TimeSwitchProduct',
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
  valueCategory: '',
  preValueId: '',
  backValueId: '',
  state: 0, //  物料 编码
  switchDuration: null, //  物料 编码
  isState: false, //  物料 编码
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
    title: t('timeSwitchProduct.orgCode'),
    width: '100',
  },
  {
    colKey: 'valueCategoryName',
    title: t('timeSwitchProduct.valueCategory'),
    width: '120',
  },
  {
    colKey: 'perCode',
    title: t('timeSwitchProduct.preValue'),
    width: '120',
  },
  {
    colKey: 'perName',
    title: t('timeSwitchProduct.preValueName'),
    width: '120',
  },
  {
    colKey: 'backCode',
    title: t('timeSwitchProduct.backValue'),
    width: '120',
  },
  {
    colKey: 'backName',
    title: t('timeSwitchProduct.backValueName'),
    width: '120',
  },
  {
    colKey: 'switchDuration',
    title: t('timeSwitchProduct.switchDurationNumber'),
    width: '130',
  },
  {
    colKey: 'stateName',
    title: t('timeSwitchProduct.status'),
    width: '110',
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
    teamFormData.value.preValueId = '';
    teamFormData.value.backValueId = '';
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
  valueCategory: [{ required: true, trigger: 'change' }],
  backValueId: [{ required: true, trigger: 'change' }],
  preValueId: [{ required: true, trigger: 'change' }],
  switchDuration: [
    { required: true, trigger: 'blur' },
    { validator: validateNumber, trigger: 'change' },
  ],
};
// # 初始渲染
onMounted(async () => {
  await getTabData();
});

// #班组搜索
const opts = computed(() => {
  return {
    valueCategory: {
      label: t('timeSwitchProduct.valueCategory'),
      slotName: 'valueCategory',
      defaultVal: '',
    },
    preValueId: {
      label: t('timeSwitchProduct.preValue'),
      slotName: 'preValue',
      defaultVal: '',
    },
    backValueId: {
      label: t('timeSwitchProduct.backValue'),
      slotName: 'backValue',
      defaultVal: '',
    },
  };
});

// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  queryConditions.value.valueCategory = data.valueCategory;
  queryConditions.value.preValueId = data.preValueId;
  queryConditions.value.backValueId = data.backValueId;
  await getTabData();
};

const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #出勤表格 参数
const queryConditions = ref({
  pageNum: 1,
  pageSize: 20,
  valueCategory: '',
  backValueId: '',
  preValueId: '',
});

const getTabData = async () => {
  queryConditions.value.pageNum = pageUI.value.page;
  queryConditions.value.pageSize = pageUI.value.rows;
  try {
    loading.value = true;
    const res = await api.timeSwitchProduct.getList(queryConditions.value);
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
  await api.timeSwitchProduct.add(teamFormData.value);
  await getTabData();
  formVisible.value = false;
  MessagePlugin.success(t('common.message.success'));
};

// // #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  teamFormData.value.isState = false;
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = t('common.button.add');
};

// // #编辑 点击
const onEditRow = (row: any) => {
  formRef.value.reset({ type: 'empty' });
  submitFalg.value = false; // 编辑为 false
  teamFormData.value.valueCategory = row.valueCategory;
  teamFormData.value.id = row.id;
  teamFormData.value.preValueId = row.preValueId;
  teamFormData.value.backValueId = row.backValueId;
  teamFormData.value.isState = row.state === 1;
  teamFormData.value.switchDuration = row.switchDuration;
  formVisible.value = true;
  console.log(teamFormData.value);
  diaLogTitle.value = t('common.button.edit');
};

// #编辑  请求
const onGroupRequest = async () => {
  teamFormData.value.state = teamFormData.value.isState === true ? 1 : 0;
  await api.timeSwitchProduct.edit(teamFormData.value);
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
