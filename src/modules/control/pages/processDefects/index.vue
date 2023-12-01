<!-- 工序缺陷 -->
<template>
  <div class="main-page">
    <div class="main-page-content">
      <t-row justify="end">
        <t-col><t-input placeholder="请输入工序或编号"></t-input></t-col>
      </t-row>
    </div>
    <div class="main-page-content">
      <tm-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="column"
        :table-data="processData"
        :loading="loading"
        :selected-row-keys="processRorKey"
        @refresh="onFetchData"
        @select-change="processChange"
      >
        <!-- 状态 -->
        <template #state>
          <div>启用</div>
        </template>
        <template #button>
          <!-- 新增 -->
          <t-button @click="onHandelAdd">新增</t-button>
          <t-popconfirm content="确认删除吗" @confirm="onHandelDelete">
            <t-button theme="default" variant="base">删除</t-button>
          </t-popconfirm>
        </template>
        <!-- 编辑 -->
        <template #operate="{ row }">
          <icon name="edit-1" @click="onEdit(row)"></icon>
        </template>
      </tm-table>
    </div>
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
        <t-form-item :label="t('processDefects.levelCode')" name="processCode">
          <t-select v-model="formData.processCode"></t-select>
        </t-form-item>
        <t-form-item :label="t('processDefects.levelName')" name="processName">
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
        <!-- 盒子 -->
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit" @click="onSecondary">确认</t-button>
        </div>
      </t-form>
    </t-dialog>
    <t-dialog v-model:visible="deleteVisible" header="删除" :cancel-btn="null" :confirm-btn="null" width="40%">
      <div class="delete-dialog-top">当前选择{{ processRorKey.length }}条</div>
      <!-- 盒子 -->
      <div class="control-box">
        <t-button theme="default" variant="base" @click="onSecondaryDelete">取消</t-button>
        <t-button theme="primary" type="submit" @click="onDeleteConfirm">确认</t-button>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

// import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});

const { pageUI } = usePage();
const processRorKey = ref([]); // 存储多选选择数组
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
const deleteVisible = ref(false); // 删除窗口控制
const addVisible = ref(false); // 新增窗口控制
const { loading, setLoading } = useLoading();
const { t } = useLang();
// const dialogShow = ref(1);
// table定义
const column = ref([
  { colKey: 'multiple', type: 'multiple', align: 'center' },
  {
    title: t('processDefects.levelSeq'),
    colKey: 'levelSeq', // 序号
    align: 'center',
    width: 120,
  },
  {
    title: t('processDefects.levelCode'),
    colKey: 'levelCode', // 工序编码
    align: 'center',
    width: 120,
  },
  {
    title: t('processDefects.levelName'),
    colKey: 'levelName', // 工序名称
    align: 'center',
    width: 120,
  },
  { title: '缺陷代码', colKey: 'defectiveCode', align: 'center', width: 120 },
  { title: '缺陷名称', colKey: 'defectiveName', align: 'center', width: 120 },
  { title: '显示顺序', colKey: 'order', align: 'center', width: 120 },
  { title: '状态', colKey: 'state', align: 'center', width: 120 },
  { title: '操作', colKey: 'operate', align: 'left', fixed: 'right', width: 120 },
]);
// table数据
const processData = ref([
  {
    levelSeq: '1',
    levelCode: '空',
    levelName: '名称1',
    defectiveCode: 'ZXC',
    defectiveName: '新华保险',
    order: '1',
    id: 1,
  },
  {
    levelSeq: '1',
    levelCode: '空',
    levelName: '名称2',
    defectiveCode: 'ZXC',
    defectiveName: '新华保险',
    order: '1',
    id: 2,
  },
  {
    levelSeq: '1',
    levelCode: '空',
    levelName: '名称3',
    defectiveCode: 'ZXC',
    defectiveName: '新华保险',
    order: '1',
    id: 13,
  },
]);

// 进入首页发请求
const onFetchData = async () => {
  // try {
  //   await api.processDefects.geslist({
  //     pageNum: pageUI.value.page,
  //     pageSize: pageUI.value.rows,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    processData.value = _.cloneDeep(processData.value);
  }, 200);
};
// 选中
const processChange = (value) => {
  processRorKey.value = value;
  console.log('11', value, processRorKey.value);
};
// 新增
const onHandelAdd = () => {
  onEditAndAdd(-1);
};
// 编辑
const onEdit = (row) => {
  onEditAndAdd(row);
};

// 控制编辑和新增
const onEditAndAdd = (value) => {
  // 不为-1 的时候为编辑
  if (value !== -1) {
    // 编辑
    addVisible.value = true;
  } else {
    addVisible.value = true;
    // 新增
  }
};
// 删除按钮
const onHandelDelete = () => {
  console.log(1);

  deleteVisible.value = true;
};
// 删除取消弹窗
const onSecondaryDelete = () => {
  MessagePlugin.success('取消成功');
  deleteVisible.value = false;
};
// 删除确认弹窗
const onDeleteConfirm = () => {
  MessagePlugin.success('删除成功');
  deleteVisible.value = false;
};
// table取消
const onSecondaryReset = () => {
  MessagePlugin.success('取消成功');
  addVisible.value = false;
};

// table确认
const onSecondary = () => {
  MessagePlugin.success('添加成功');
  addVisible.value = false;
};

// 定义
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
// 确认按钮
const onProcessSubmit = (context: RootObject) => {
  console.log(context.validateResult === true);
};

// 校验
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

.delete-dialog-top {
  margin: 10px;
  text-align: center;
  font-weight: 900;
}
</style>
