<template>
  <div class="list-card-process">
    <t-card :bordered="false">
      <t-row justify="end">
        <t-col><t-input placeholder="请输入工序或编号"></t-input></t-col>
      </t-row>
    </t-card>
    <tm-table :table-column="column" :table-data="processData" :loading="loading" @refresh="onFetchData">
      <template #state>
        <div>启用</div>
      </template>
      <template #button>
        <t-button variant="outline" @click="onHandelAdd">
          <template #icon><icon name="plus" /></template>新增</t-button
        >
        <t-button variant="outline">
          <template #icon><icon name="delete" /></template>删除</t-button
        >
      </template>
    </tm-table>
    <t-dialog v-model:visible="deleteVisible" header="新增" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form
        ref="formRef"
        :rules="rules"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @submit="onProcessSubmit"
      >
        <t-form-item :label="t('levelCode')" name="processCode">
          <t-select v-model="formData.processCode"></t-select>
        </t-form-item>
        <t-form-item :label="t('levelName')" name="processName">
          <t-input v-model="formData.processName"></t-input>
        </t-form-item>
        <t-form-item label="缺陷代码" name="processDefect">
          <t-select v-model="formData.processDefect"></t-select>
        </t-form-item>
        <t-form-item label="缺陷名称" name="defectName">
          <t-input v-model="formData.defectName"></t-input>
        </t-form-item>
        <t-form-item :label="`显示${t('levelSeq')}`" name="processOrder">
          <t-input v-model="formData.processOrder"></t-input>
        </t-form-item>
        <t-form-item label="启用" name="showState">
          <t-switch v-model="formData.showState" size="large" @change="onChange"></t-switch>
        </t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit" @click="onSecondary">确认</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});
// form表单数据
const formData = ref({
  showState: true, // 默认为启用
  processCode: '', // 工序编号
  processName: '', // 工序名称
  processOrder: '', // 显示顺序
  processDefect: '', // 缺陷代码
  defectName: '', // 缺陷名称
  state: 1, // 转态
});
// 控制启动
const onChange = (value) => {
  console.log(value);
  if (value) {
    formData.value.state = 1;
  } else {
    formData.value.state = 0;
  }
};
const deleteVisible = ref(false);
const { loading, setLoading } = useLoading();
const { t } = useLang();
// table定义
const column = ref([
  {
    colKey: 'multiple',
    type: 'multiple',
    align: 'center',
  },
  {
    title: t('levelSeq'),
    colKey: 'levelSeq', // 序号
    align: 'center',
  },
  {
    title: t('levelCode'),
    colKey: 'levelCode', // 工序编码
    align: 'center',
  },
  {
    title: t('levelName'),
    colKey: 'levelName', // 工序名称
    align: 'center',
  },
  {
    title: '缺陷代码',
    colKey: 'defectiveCode',
    align: 'center',
  },
  {
    title: '缺陷名称',
    colKey: 'defectiveName',
    align: 'center',
  },
  {
    title: '显示顺序',
    colKey: 'order',
    align: 'center',
  },
  {
    title: '状态',
    colKey: 'state',
    align: 'center',
  },
]);
// table数据
const processData = ref([
  {
    levelSeq: '1',
    levelCode: '空',
    levelName: '名称',
    defectiveCode: 'ZXC',
    defectiveName: '新华保险',
    order: '1',
  },
]);

// 进入首页发请求
const onFetchData = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    processData.value = _.cloneDeep(processData.value);
  }, 200);
};
// 新增
const onHandelAdd = () => {
  deleteVisible.value = true;
};
// 取消
const onSecondaryReset = () => {
  MessagePlugin.success('取消成功');
  deleteVisible.value = false;
};
// 确认
const onSecondary = () => {
  MessagePlugin.success('添加成功');
  deleteVisible.value = false;
};
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
const onProcessSubmit = (context: RootObject) => {
  console.log(context.validateResult === true);
};

// showState: true, // 默认为启用
//   processCode: '', // 工序编号
//   processName: '', // 工序名称
//   processOrder: '', // 显示顺序
//   processDefect: '', // 缺陷代码
//   defectName: '', // 缺陷名称
//   state: 1, // 转态
const rules: FormRules<Data> = {
  processCode: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  processName: [
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
  processDefect: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  defectName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.list-card-process {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}

// 启动按钮样式更改
:deep(.t-switch.t-is-checked:hover) {
  background: var(--td-success-color-4);
}

:deep(.t-switch.t-is-checked) {
  background: var(--td-success-color-4);
}
</style>
