<!-- 工序缺陷 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="column"
        :table-data="processData"
        :loading="loading"
        :total="total"
        :hover="false"
        :stripe="false"
        :selected-row-keys="processRorKey"
        @refresh="onFetchData"
        @select-change="processChange"
      >
        <!-- 状态 -->
        <template #state="{ row }">
          <div>{{ row.state === 1 ? '启用' : '禁用' }}</div>
        </template>
        <template #button>
          <t-button @click="onHandelAdd">新增</t-button>
          <t-popconfirm content="确认删除吗" @confirm="onHandelDelete">
            <t-button theme="default" variant="base">删除</t-button>
          </t-popconfirm>
        </template>
        <!-- 编辑 -->
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEdit(row)"> 编辑 </t-link>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
              <t-link theme="primary"> 删除 </t-link>
            </t-popconfirm>
            <!-- <icon name="delete" style="cursor: pointer" @click="onDelete(row)" /> -->
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="addVisible" header="新增" :cancel-btn="null" :confirm-btn="null">
    <t-form
      ref="formRef"
      :rules="rules"
      :data="formData"
      layout="vertical"
      label-width="120px"
      scroll-to-first-error="smooth"
      label-align="right"
      @submit="onProcessSubmit"
    >
      <t-form-item :label="t('processDefects.defectCode')" name="processId">
        <bcmp-select-business
          v-model="formData.processId"
          label=""
          label-field="processCode"
          type="process"
          :disabled="disabledShow.disabledDefectCode"
          @selection-change="defectCodeChange"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item :label="t('processDefects.defectName')" name="defectName">
        <t-input v-model="formData.defectName" :disabled="disabledShow.disabledDefectName"></t-input>
      </t-form-item>
      <t-form-item label="缺陷代码" name="defectCodeId">
        <bcmp-select-business
          v-model="formData.defectCodeId"
          label=""
          type="defectCode"
          label-field="defectCode"
          :disabled="disabledShow.disabledProcessCode"
          @selection-change="processCodeChange"
        ></bcmp-select-business>
      </t-form-item>
      <t-form-item label="缺陷名称" name="defectName">
        <t-input v-model="formData.processName" :disabled="disabledShow.disabledProcessName"></t-input>
      </t-form-item>
      <t-form-item :label="`${t('processDefects.displaySeq')}`" name="displaySeq">
        <t-input-number
          v-model="formData.displaySeq"
          style="width: 100%"
          :auto-width="false"
          theme="column"
        ></t-input-number>
      </t-form-item>
      <t-form-item label="启用" name="showState">
        <t-switch v-model="formData.showState" size="large" @change="onChange"></t-switch>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">确认</t-button>
    </template>
  </t-dialog>
  <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onDeleteConfirm">
    <h3 class="list-save">选中{{ processRorKey.length }}条</h3>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/control';
// import { api } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});

const formRef: Ref<FormInstanceFunctions> = ref(null);
// input框搜索
const opts = computed(() => {
  return {
    process: {
      labelWidth: '160px',
      label: '工序',
      placeholder: '请输入工序名称或编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
const onInput = (data) => {
  formData.value.process = data.process;
  onFetchData();
};
const total = ref(10);
const { pageUI } = usePage();
const processRorKey = ref([]); // 存储多选选择数组
// form表单数据
const formData = ref({
  showState: true, // 默认为启用
  defectCodeId: '', // 缺陷代码
  defectName: '', // 缺陷名称
  displaySeq: 0, // 显示顺序
  processId: '', // 工序编号
  processName: '', // 工序名称
  process: '', // 模糊查询
  state: 1, // 状态
  id: '',
});
// 禁用
const disabledShow = ref({
  disabledDefectName: false, // 工序名称
  disabledDefectCode: false, // 工序编号
  disabledProcessCode: false, // 缺陷代码
  disabledProcessName: false, // 缺陷名称
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
const deleteVisible = ref(false); // 删除窗口控制
const addVisible = ref(false); // 新增窗口控制
const { loading, setLoading } = useLoading();
const { t } = useLang();
// const dialogShow = ref(1);
// table定义
const column = ref([
  { colKey: 'multiple', type: 'multiple', align: 'center' },
  {
    title: t('processDefects.defectName'),
    colKey: 'processCode', // 工序编码
    align: 'center',
    width: 120,
  },
  {
    title: t('processDefects.defectCode'),
    colKey: 'processName', // 工序名称
    align: 'center',
    width: 120,
  },
  { title: '缺陷代码', colKey: 'defectCode', align: 'center', width: 120 },
  { title: '缺陷名称', colKey: 'defectName', align: 'center', width: 120 },
  { title: t('processDefects.displaySeq'), colKey: 'displaySeq', align: 'center', width: 120 },
  { title: '状态', colKey: 'state', align: 'center', width: 120 },
  { title: '操作', colKey: 'op', align: 'center', fixed: 'right', width: 120 },
]);
// 工序编码Change事件
const defectCodeChange = (data) => {
  formData.value.defectName = data.processName;
};
// 缺陷代码Change事件
const processCodeChange = (data) => {
  formData.value.processName = data.defectName;
};
// table数据
const processData = ref([]);
// 进入首页发请求
const onFetchData = async () => {
  processRorKey.value = [];
  try {
    setLoading(true);
    const res = await api.processInDefectCode.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      process: formData.value.process,
    });
    processData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 选中checkbox
const processChange = (value) => {
  processRorKey.value = value;
  console.log('11', value, processRorKey.value);
};

// 单独删除
const onDelete = async (row) => {
  try {
    await api.processInDefectCode.removeProcessInDefectCode({ id: row.id });
    MessagePlugin.success('删除成功');
    onFetchData();
  } catch (e) {
    console.log(e);
  }
  console.log(row);
};
const isEditAndAdd = ref(1); // 1为新增 0为编辑
// 新增
const onHandelAdd = () => {
  formRef.value.reset({ type: 'empty' });
  disabledShow.value.disabledDefectCode = false; // 工序编号
  disabledShow.value.disabledDefectName = true; // 工序名称
  disabledShow.value.disabledProcessCode = false; // 缺陷代码
  disabledShow.value.disabledProcessName = true; // 缺陷名称
  isEditAndAdd.value = 1;
  addVisible.value = true;
};
// 编辑
const onEdit = (row: any) => {
  console.log('🚀 ~ file: index.vue:258 ~ onEdit ~ row:', row);
  isEditAndAdd.value = 0;
  if (row.state === 1) {
    formData.value.showState = true;
  } else {
    formData.value.showState = false;
  }
  formData.value.state = row.state;
  formData.value.defectCodeId = row.defectCodeId;
  formData.value.defectName = row.defectName;
  formData.value.displaySeq = row.displaySeq;
  formData.value.processName = row.processName;
  formData.value.processId = row.processId;
  formData.value.id = row.id;
  // Object.assign(formData.value, row);
  disabledShow.value.disabledDefectCode = true; // 工序编号
  disabledShow.value.disabledDefectName = true; // 工序名称
  disabledShow.value.disabledProcessCode = true; // 缺陷代码
  disabledShow.value.disabledProcessName = true; // 缺陷名称
  addVisible.value = true;
};

// 控制编辑和新增
const onEditAndAdd = async () => {
  // 不为-1 的时候为编辑
  if (isEditAndAdd.value === 1) {
    // 新增
    try {
      await api.processInDefectCode.addProcessInDefectCode({
        processId: formData.value.processId,
        defectCodeId: formData.value.defectCodeId,
        displaySeq: formData.value.displaySeq,
        state: formData.value.state,
      });
      onFetchData();
      MessagePlugin.success('新增成功');
      addVisible.value = false;
    } catch (e) {
      console.log(e);
    }
  } else {
    // 编辑
    try {
      await api.processInDefectCode.modifyProcessInDefectCode({
        processId: formData.value.processId,
        defectCodeId: formData.value.defectCodeId,
        id: formData.value.id,
        displaySeq: formData.value.displaySeq,
        state: formData.value.state,
      });
      addVisible.value = false;
      MessagePlugin.success('编辑成功');
      onFetchData();
    } catch (e) {
      console.log(e);
    }
  }
};
const onSecondarySubmit = () => {
  formRef.value.submit();
};
// 删除按钮
const onHandelDelete = async () => {
  if (processRorKey.value.length === 0) {
    MessagePlugin.error('未选择');
    return;
  }
  deleteVisible.value = true;
};
// 删除确认弹窗
const onDeleteConfirm = async () => {
  try {
    await api.processInDefectCode.removeProcessInDefectCodeBatch({ ids: processRorKey.value });
    MessagePlugin.success('删除成功');
    deleteVisible.value = false;
    onFetchData();
    processRorKey.value = [];
  } catch (e) {
    console.log(e);
  }
};
// form取消
const onSecondaryReset = () => {
  MessagePlugin.success('取消成功');
  addVisible.value = false;
};

// 定义
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
// form确认
const onProcessSubmit = (context: RootObject) => {
  if (context.validateResult === true) {
    onEditAndAdd();
  }
};

// 校验
const rules: FormRules<Data> = {
  defectCodeId: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  displaySeq: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  processId: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
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

.delete-dialog-top {
  margin: 10px;
  text-align: center;
  font-weight: 900;
}

.list-save {
  text-align: center;
  margin: 10px 0;
}
</style>
