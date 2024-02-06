<!-- 工序缺陷 -->
<template>
  <cmp-container :full="true" class="root">
    <cmp-row>
      <cmp-card ref="refProcessCard" flex="280px">
        <t-tabs v-model="currProcessTab">
          <t-tab-panel value="process" label="工序">
            <t-input v-model="filterText" style="margin: 8px 0" :placeholder="t('common.placeholder.input')">
              <template #suffix-icon>
                <search-icon size="var(--td-comp-size-xxxs)" />
              </template>
            </t-input>

            <t-list size="small" split :style="{ 'max-height': `${processHeight}` }">
              <t-list-item
                v-for="item in filterProcessList"
                :key="item.id"
                :class="{ 'is-selected': currProcessId == item.id }"
                @click="onClickProcess(item.id)"
              >
                {{ item.processName }}
                <template #action>
                  <t-icon v-if="currProcessId == item.id" name="focus" />
                  <div class="activeProcess"></div>
                </template>
              </t-list-item>
            </t-list>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card flex="auto">
        <cmp-table
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="column"
          :table-data="processData"
          :loading="loading"
          :total="total"
          :fixed-height="true"
          drag-sort="row"
          :selected-row-keys="processRorKey"
          @drag-sort="onDragSort"
          @refresh="onFetchData"
          @select-change="processChange"
        >
          <template #title>
            {{ '工序缺陷列表' }}
          </template>
          <template #stateSwitch="{ row }">
            <t-switch
              :custom-value="[1, 0]"
              :value="row.state"
              :default-value="row.state"
              @change="(value) => onSwitchChange(row, value)"
            ></t-switch>
          </template>
          <template #button>
            <cmp-query :opts="opts" :show-button="false" @submit="onInput"> </cmp-query>
            <t-button @click="onHandelAdd">新增</t-button>
            <t-popconfirm content="确认删除吗" @confirm="onHandelDelete">
              <t-button theme="default" variant="base">批量删除</t-button>
            </t-popconfirm>
          </template>
          <template #op="{ row }">
            <t-space :size="8">
              <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
                <t-link theme="primary"> 删除 </t-link>
              </t-popconfirm>
            </t-space>
          </template>
        </cmp-table>
      </cmp-card>
    </cmp-row>
  </cmp-container>

  <!-- 组织弹出窗 -->
  <dialog-defects
    :id="currProcessId"
    v-model="formDefectsVisible"
    :title="t('processDefects.defectList')"
    @submit-result="onSubmitResult"
  ></dialog-defects>

  <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onDeleteConfirm">
    <h3 class="list-save">选中{{ processRorKey.length }}条</h3>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, ProcessInDefectCodeVO } from '@/api/control';
import { api as apiMain, ProcessVO } from '@/api/main';
// import { api } from '@/api/control';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import dialogDefects from './dialogDefects.vue';
import { useLang } from './lang';

onMounted(() => {
  fetchProcess();
});
const refProcessCard = ref(null);
const processHeight = ref('300px');
useResizeObserver(refProcessCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  processHeight.value = `${height - 130}px`;
  console.error('treeHeight', processHeight.value);
});

// input框搜索
const opts = computed(() => {
  return {
    keyWord: {
      label: '缺陷',
      placeholder: '请输入缺陷名称或编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
const onInput = (data) => {
  formData.value.keyWord = data.keyWord;
  onFetchData();
};
const formDefectsVisible = ref(false);

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
  keyWord: '', // 关键字
  processName: '', // 工序名称
  process: '', // 模糊查询
  state: 1, // 状态
  id: '',
});
const currProcessTab = ref('process'); // tab选中项
const processList = ref<ProcessVO[]>([]);
const filterText = ref(); // 筛选关键字
const filterProcessList = computed(() => {
  if (_.isEmpty(filterText.value)) return processList.value;
  return processList.value.filter((t) => t.processName.includes(filterText.value));
});
const deleteVisible = ref(false); // 删除窗口控制
// const addVisible = ref(false); // 新增窗口控制
const { loading, setLoading } = useLoading();
const { t } = useLang();
// const dialogShow = ref(1);
// table定义
const column = ref([
  { colKey: 'multiple', type: 'multiple', width: 100 },
  { title: t('processDefects.displaySeq'), colKey: 'displaySeq', width: 100 },
  { title: t('processDefects.defectCode'), colKey: 'defectCode', width: 120 },
  { title: t('processDefects.defectName'), colKey: 'defectName', width: 120 },
  {
    colKey: 'state',
    title: '状态',
    width: '100',
    cell: 'stateSwitch',
  },
  { title: '操作', colKey: 'op', fixed: 'right', width: 120 },
]);
// table数据
const processData = ref([]);
// 获取工序
const fetchProcess = async () => {
  processList.value = (
    await apiMain.process.search({
      pageNum: 1,
      pageSize: 99999,
    })
  ).list;
  if (processList.value.length > 0) {
    formData.value.processId = processList.value[0].id;
    currProcessId.value = processList.value[0].id;
    onFetchData();
  }
};
const currProcessId = ref('');
// const currProcessType = ref('');
const onClickProcess = (id: string) => {
  if (id === currProcessId.value) return;
  currProcessId.value = id;
  formData.value.processId = currProcessId.value;
  onFetchData();
};

const onSubmitResult = (res) => {
  if (res) {
    onFetchData();
  }
};
// 表格拖拽
const onDragSort = async (params: any) => {
  console.log('交换行', params);
  processData.value = params.newData;
  const seqResult: ProcessInDefectCodeVO[] = [];
  seqResult.push(params.current);
  seqResult.push(params.target);
  await api.processInDefectCode.changeSeq(seqResult);
  onFetchData();
};
// 进入首页发请求
const onFetchData = async () => {
  processRorKey.value = [];
  try {
    setLoading(true);
    const res = await api.processInDefectCode.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      processId: formData.value.processId,
      keyWord: formData.value.keyWord,
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
// # Switch 状态获取
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  await api.processInDefectCode.modifyProcessInDefectCode({
    state: isValue,
    processId: row.processId,
    defectCodeId: row.defectCodeId,
    id: row.id,
    displaySeq: row.displaySeq,
  });
  await onFetchData();
  MessagePlugin.success('操作成功');
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
// const isEditAndAdd = ref(1); // 1为新增 0为编辑
// 新增
const onHandelAdd = () => {
  formDefectsVisible.value = true;
};

// 删除按钮
const onHandelDelete = async () => {
  if (processRorKey.value.length === 0) {
    MessagePlugin.error('未选择任何行');
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
</script>

<style lang="less" scoped>
.activeProcess {
  background-color: var(--td-brand-color);
  width: 4px;
  height: 16px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  top: 11px;
}

.t-list .is-selected {
  background: #366ef49c;
  color: white;
}

.t-list .t-list-item {
  border-radius: 4px;
}

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
