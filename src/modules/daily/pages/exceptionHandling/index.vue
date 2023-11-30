<!-- 异常处理配置 -->
<template>
  <div>
    <t-card>
      <tm-table
        v-model:pagination="pageUI"
        row-key="OrganizationName"
        :table-data="data"
        :table-column="column"
        :total="total"
        @refresh="onFetchData"
      >
        <template #button>
          <tm-query>
            <template #querybar>
              <t-input>12</t-input>
            </template>
          </tm-query>
        </template>
        <template #oprate>
          <t-button @click="onAdd">新增</t-button>
          <t-button variant="outline">编辑</t-button>
          <t-button variant="outline">删除</t-button>
          <!-- <t-button>导入</t-button> -->
        </template>
      </tm-table>
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      header="新增(编辑)异常处理配置"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
    >
      <t-form ref="formRef" :data="formItem" :rules="rules">
        <t-form-item :label="t('exceptionHandling.OrganizationName')" name="OrganizationName">
          <t-select v-model="formItem.OrganizationName" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.abnormalModule')" name="abnormalModule">
          <t-select v-model="formItem.abnormalModule" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.treatmentGroup')" name="processOrder">
          <t-select v-model="formItem.processOrder" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.processOrder')" name="transferOrders">
          <t-input v-model="formItem.transferOrders" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.transferOrders')" name="treatmentGroup">
          <t-radio-group
            v-model="formItem.treatmentGroup"
            default-value="允许"
            name="city"
            :options="itemOptions"
            @change="onChange"
          ></t-radio-group
        ></t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit">保存</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import TmQuery from '@/components/tm-query/index.vue';
import { usePage } from '@/hooks/modules/page';

import TmTable from '../../../../components/tm-table/index.vue';
import { useLang } from './lang';

const formVisible = ref(false);
const itemOptions = ['允许', '不允许'];
const { pageUI } = usePage();
onMounted(() => {
  onFetchData();
});
const { t } = useLang();
const onChange = (checkedValues) => {
  console.log('checkedValues:', checkedValues);
};
const formRef: Ref<FormInstanceFunctions> = ref(null);
const formItem = reactive({
  OrganizationName: '', // 组织名称
  abnormalModule: '', // 异常模块
  treatmentGroup: '', // 处理组
  processOrder: '', // 处理顺序
  transferOrders: '', // 是否允许转单
});
const total = 10;
const column = ref([
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'OrganizationName',
    title: t('exceptionHandling.OrganizationName'),
    align: 'center',
  },
  {
    colKey: 'abnormalModule',
    title: t('exceptionHandling.abnormalModule'),
    align: 'center',
  },
  {
    colKey: 'treatmentGroup',
    title: t('exceptionHandling.treatmentGroup'),
    align: 'center',
  },
  {
    colKey: 'processOrder',
    title: t('exceptionHandling.processOrder'),
    align: 'center',
  },
  {
    colKey: 'transferOrders',
    title: t('exceptionHandling.transferOrders'),
    align: 'center',
  },
]);
const data = ref([
  {
    OrganizationName: '测试',
    abnormalModule: '品质隐藏',
    treatmentGroup: '天外来物',
    processOrder: '12',
    transferOrders: '是',
  },
  {
    OrganizationName: '测试2',
    abnormalModule: '品质隐藏3',
    treatmentGroup: '天外来物4',
    processOrder: '好',
    transferOrders: '现在',
  },
]);
// 进入首页请求
const onFetchData = async () => {
  data.value = _.cloneDeep(data.value);
};
const onAdd = () => {
  formVisible.value = true;
};
// 窗口取消
const onSecondaryReset = () => {
  formVisible.value = false;
};
const rules: FormRules<Data> = {
  OrganizationName: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  abnormalModule: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  treatmentGroup: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  processOrder: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  transferOrders: [
    {
      required: true,
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
