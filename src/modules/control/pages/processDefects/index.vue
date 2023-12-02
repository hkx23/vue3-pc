<!-- 工序缺陷 -->
<template>
  <div>
    <t-card class="list-card-process">
      <tm-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="column"
        :table-data="processData"
        :loading="loading"
        :total="total"
        :selected-row-keys="processRorKey"
        @refresh="onFetchData"
        @select-change="processChange"
      >
        <!-- 状态 -->
        <template #state="{ row }">
          <div>{{ row.state === 1 ? '启用' : '禁用' }}</div>
        </template>
        <template #button> <tm-query :opts="opts" @submit="onInput"> </tm-query> </template>
        <template #oprate>
          <!-- 新增 -->
          <t-button @click="onHandelAdd">新增</t-button>
          <t-popconfirm content="确认删除吗" @confirm="onHandelDelete">
            <t-button theme="default" variant="base">删除</t-button>
          </t-popconfirm>
        </template>
        <!-- 编辑 -->
        <template #operate="{ row }">
          <t-space>
            <icon name="edit-1" style="cursor: pointer" @click="onEdit(row)"></icon>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
              <icon name="delete" style="cursor: pointer"></icon>
            </t-popconfirm>
            <!-- <icon name="delete" style="cursor: pointer" @click="onDelete(row)" /> -->
          </t-space>
        </template>
      </tm-table>
      <t-dialog v-model:visible="addVisible" header="新增" :cancel-btn="null" :confirm-btn="null" width="40%">
        <t-form
          ref="formRef"
          :rules="rules"
          :data="formData"
          layout="vertical"
          scroll-to-first-error="smooth"
          label-align="right"
          @submit="onProcessSubmit"
        >
          <t-form-item :label="t('processDefects.defectCode')" name="defectCode">
            <!-- <t-select v-model="formData.defectCode"></t-select> -->
            <t-input v-model="formData.defectCode" :disabled="disabledShow.disabledDefectCode"></t-input>
          </t-form-item>
          <t-form-item :label="t('processDefects.defectName')" name="defectName">
            <t-input v-model="formData.defectName" :disabled="disabledShow.disabledDefectName"></t-input>
          </t-form-item>
          <t-form-item label="缺陷代码" name="processCode">
            <!-- <t-select v-model="formData.processCode"></t-select> -->
            <t-input v-model="formData.processCode" :disabled="disabledShow.disabledProcessCode"></t-input>
          </t-form-item>
          <t-form-item label="缺陷名称" name="defectName">
            <t-input v-model="formData.processName" :disabled="disabledShow.disabledProcessName"></t-input>
          </t-form-item>
          <t-form-item :label="`显示${t('processDefects.displaySeq')}`" name="displaySeq">
            <t-input v-model="formData.displaySeq"></t-input>
          </t-form-item>
          <t-form-item label="启用" name="showState">
            <t-switch v-model="formData.showState" size="large" @change="onChange"></t-switch>
          </t-form-item>
          <!-- 盒子 -->
          <div class="control-box">
            <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
            <t-button theme="primary" type="submit">确认</t-button>
          </div>
        </t-form>
      </t-dialog>
      <!-- <t-dialog v-model:visible="deleteVisible" header="删除" :cancel-btn="null" :confirm-btn="null" width="40%">
        <div class="delete-dialog-top">当前选择{{ processRorKey.length }}条</div>
        盒子
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit" @click="onSecondary">确认</t-button>
        </div>
      </t-dialog> -->
      <t-dialog
        v-model:visible="deleteVisible"
        :header="t('common.message.confirmDelete')"
        :on-confirm="onDeleteConfirm"
      >
        <h3 class="list-save">选中{{ processRorKey.length }}条</h3>
      </t-dialog>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/control';
// import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
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
      label: '请输入工序名称或编码:',
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
  defectCode: '', // 工序编号
  defectName: '', // 工序名称
  displaySeq: 0, // 显示顺序
  processCode: '', // 缺陷代码
  processName: '', // 缺陷名称
  process: '', // 模糊查询
  state: 1, // 状态
  id: '',
});
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
    title: t('processDefects.defectCode'),
    colKey: 'defectCode', // 工序编码
    align: 'center',
    width: 120,
  },
  {
    title: t('processDefects.defectName'),
    colKey: 'defectName', // 工序名称
    align: 'center',
    width: 120,
  },
  { title: '缺陷代码', colKey: 'processCode', align: 'center', width: 120 },
  { title: '缺陷名称', colKey: 'processName', align: 'center', width: 120 },
  { title: t('processDefects.displaySeq'), colKey: 'displaySeq', align: 'center', width: 120 },
  { title: '状态', colKey: 'state', align: 'center', width: 120 },
  { title: '操作', colKey: 'operate', align: 'left', fixed: 'right', width: 120 },
]);
// table数据
const processData = ref([]);
// 进入首页发请求
const onFetchData = async () => {
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
  formRef.value.reset({ type: 'initial' });
  formData.value.displaySeq = null;
  isEditAndAdd.value = 1;
  addVisible.value = true;
};
// 编辑
const onEdit = (row) => {
  isEditAndAdd.value = 0;
  if (row.state === 1) {
    formData.value.showState = true;
  } else {
    formData.value.showState = false;
  }
  // formData.value.state = row.state;
  // formData.value.defectCode = row.defectCode;
  // formData.value.defectName = row.defectName;
  // formData.value.displaySeq = row.displaySeq;
  // formData.value.processName = row.processName;
  // formData.value.processCode = row.processCode;
  // formData.value.id = row.id;
  Object.assign(formData.value, row);
  disabledShow.value.disabledDefectName = true; // 工序名称
  disabledShow.value.disabledDefectCode = true; // 工序编号
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
        ...formData.value,
        processId: '1729034428150992898',
        defectCodeId: '1',
      });
      addVisible.value = false;
      MessagePlugin.success('新增成功');
      onFetchData();
    } catch (e) {
      console.log(e);
    }
  } else {
    // 编辑
    try {
      await api.processInDefectCode.modifyProcessInDefectCode(formData.value);
      addVisible.value = false;
      MessagePlugin.success('编辑成功');
      onFetchData();
    } catch (e) {
      console.log(e);
    }
  }
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
  // defectCode: [
  //   {
  //     required: true,
  //     type: 'error',
  //     trigger: 'blur',
  //   },
  // ],
  defectName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  displaySeq: [
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
  processCode: [
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
