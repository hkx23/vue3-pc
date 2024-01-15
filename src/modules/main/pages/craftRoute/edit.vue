<template>
  <t-dialog v-model:visible="visible" mode="full-screen" :footer="false" @close="close">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ title }}</span>
        <t-button :loading="loading" style="float: right" @click="save">{{ t('common.button.save') }}</t-button>
      </t-space>
    </template>
    <t-form
      ref="routingFormRef"
      class="card"
      :data="formData"
      :rules="routingRules"
      label-width="120px"
      layout="inline"
    >
      <t-form-item :label="t('craftRoute.craftRouteCode')" name="routingCode">
        <t-input
          v-model="formData.routingCode"
          :disabled="props.id && !props.isCopy ? true : false"
          :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteCode')])"
        ></t-input>
      </t-form-item>
      <t-form-item :label="t('craftRoute.craftRouteName')" name="routingName">
        <t-input
          v-model="formData.routingName"
          :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteName')])"
        ></t-input>
      </t-form-item>
      <t-form-item :label="t('craftRoute.craftRouteType')" name="routingType">
        <t-select
          v-model="formData.routingType"
          :placeholder="t('common.placeholder.select', [t('craftRoute.craftRouteType')])"
        >
          <t-option
            v-for="(value, key) in routingTypeOption"
            :key="key"
            :label="value.label"
            :value="value.value"
          ></t-option>
        </t-select>
      </t-form-item>
      <t-form-item :label="t('craftRoute.version')" name="version">
        <t-input-number
          v-model="formData.version"
          :min="1"
          :decimal-places="0"
          :placeholder="t('common.placeholder.input', [t('craftRoute.version')])"
          theme="column"
        ></t-input-number>
      </t-form-item>
      <t-form-item :label="t('craftRoute.enableDate')" name="enableDate">
        <t-date-picker
          v-model="formData.enableDate"
          :placeholder="t('common.placeholder.select', [t('craftRoute.enableDate')])"
        />
      </t-form-item>
      <t-form-item :label="t('craftRoute.invailDate')" name="invailDate">
        <t-date-picker
          v-model="formData.invailDate"
          :placeholder="t('common.placeholder.select', [t('craftRoute.invailDate')])"
        />
      </t-form-item>
      <t-form-item :label="t('business.main.desc')" name="desc">
        <t-input
          v-model="formData.desc"
          :placeholder="t('common.placeholder.input', [t('business.main.desc')])"
        ></t-input>
      </t-form-item>
    </t-form>
    <div class="card">
      <div class="toolbar">
        <t-button theme="default" @click="toolAction('zoomIn')">
          <zoom-in-icon />
        </t-button>
        <t-button theme="default" @click="toolAction('zoomOut')">
          <zoom-out-icon />
        </t-button>
        <t-button theme="default" @click="toolAction('undo')">
          <rollback-icon />
        </t-button>
        <t-button theme="default" @click="toolAction('redo')">
          <rollfront-icon />
        </t-button>
      </div>
      <div class="sidebar">
        <div class="sidebar-item" @mousedown="dragInNode('start', t('craftRoute.start'))">
          <play-circle-icon size="large" />
          <span>{{ t('craftRoute.start') }}</span>
        </div>
        <div class="sidebar-item" @mousedown="dragInNode('process', t('craftRoute.process'))">
          <setting1-icon size="large" />
          <span>{{ t('craftRoute.process') }}</span>
        </div>
        <div class="sidebar-item" @mousedown="dragInNode('end', t('craftRoute.end'))">
          <stop-circle-icon size="large" />
          <span>{{ t('craftRoute.end') }}</span>
        </div>
      </div>
      <div ref="flowRef" class="flow"></div>
      <t-dialog v-model:visible="edgeVisible" :header="false" :footer="false" destroy-on-close>
        <t-select v-model="edgeText" @change="resultChange">
          <t-option value="OK" />
          <t-option value="NG" />
        </t-select>
      </t-dialog>
      <t-drawer
        v-model:visible="propertiesVisible"
        :header="t('craftRoute.processProperties')"
        destroy-on-close
        @confirm="processConfirm"
      >
        <t-form ref="propertiesFormRef" :data="propertiesForm" :rules="propertiesRules" label-width="80px">
          <t-form-item :label="t('craftRoute.processStep')" name="processStep">
            <t-input-number
              v-model="propertiesForm.processStep"
              theme="column"
              :placeholder="t('common.placeholder.input', [t('craftRoute.processStep')])"
            ></t-input-number>
          </t-form-item>
          <t-form-item :label="t('craftRoute.processName')" name="processId">
            <bcmp-select-business
              v-model="propertiesForm.processId"
              type="process"
              :show-title="false"
              :placeholder="t('common.placeholder.select', [t('craftRoute.processName')])"
              @selection-change="processChange"
            ></bcmp-select-business>
          </t-form-item>
          <t-form-item :label="t('craftRoute.processType')" name="processType">
            <t-select
              v-model="propertiesForm.processType"
              :placeholder="t('common.placeholder.select', [t('craftRoute.processType')])"
            >
              <t-option :label="t('craftRoute.requiredProcess')" value="P" />
              <t-option :label="t('craftRoute.optionalProcess')" value="O" />
            </t-select>
          </t-form-item>
          <t-form-item :label="t('craftRoute.backgroundColor')" name="backgroundColor">
            <t-color-picker
              v-model="propertiesForm.backgroundColor"
              format="HEX"
              :color-modes="['monochrome']"
              :input-props="{ autoWidth: false, readonly: true }"
            />
          </t-form-item>
          <t-form-item :label="t('craftRoute.processBom')" name="processBom">
            <t-button theme="primary" variant="text" @click="showBom">{{ t('common.button.edit') }}</t-button>
          </t-form-item>
        </t-form>
      </t-drawer>
      <t-dialog v-model:visible="bomVisible" :header="t('craftRoute.processBom')" width="60%" @confirm="confirmBom">
        <t-row>
          <t-col :span="3" style="padding-right: 5px">
            <t-input v-model="bomSearchKeyword" :placeholder="t('common.placeholder.search')" @enter="getMitemCategory">
              <template #suffixIcon>
                <search-icon :style="{ cursor: 'pointer' }" @click="getMitemCategory" />
              </template>
            </t-input>
            <t-table
              row-key="id"
              :data="bomData.list"
              :columns="categoryColumn"
              :bordered="false"
              :show-header="false"
              :pagination="categoryPagination"
              hover
              size="small"
              table-layout="fixed"
            >
              <template #op="{ row }">
                <t-button variant="text" shape="square" @click="addBom(row)"><add-icon /></t-button>
              </template>
            </t-table>
          </t-col>
          <t-col :span="9">
            <cmp-table
              v-model:selected-row-keys="bomSelectKeys"
              row-key="id"
              :table-column="bomColumn"
              :table-data="bomList"
              :show-pagination="false"
            >
              <template #button>
                <t-button theme="default" @click="batchDeleteBom">{{ t('common.button.batchDelete') }}</t-button>
              </template>
              <template #isKeyPart="{ row }">
                <t-switch :value="row.isKeyPart" @change="keyPartChange($event, row.id)" />
              </template>
              <template #op="{ row }">
                <t-button variant="text" theme="primary" @click="deleteBom(row)">{{
                  t('common.button.delete')
                }}</t-button>
              </template>
            </cmp-table>
          </t-col>
        </t-row>
      </t-dialog>
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
// #region import
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

import LogicFlow from '@logicflow/core';
import { Menu } from '@logicflow/extension';
import dayjs from 'dayjs';
import { clone, filter, find, findIndex, remove } from 'lodash';
import {
  AddIcon,
  PlayCircleIcon,
  RollbackIcon,
  RollfrontIcon,
  SearchIcon,
  Setting1Icon,
  StopCircleIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'tdesign-icons-vue-next';
import { Data, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref, watch } from 'vue';

import { api as apiMain } from '@/api/main';
import BcmpSelectBusiness from '@/components/bcmp-select-business/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';

import { useLang } from './lang';
import { registerCustomElement } from './node';
// #endregion

// 使用多语言
const { t } = useLang();
const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  isCopy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'submit']);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
const loading = ref(false);
const close = () => {
  lf.clearData();
  formData.routingCode = null;
  formData.routingName = null;
  formData.routingType = 'STANDARD';
  formData.version = 1;
  formData.enableDate = dayjs().format();
  formData.invailDate = null;
  formData.desc = null;
};
watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    apiMain.routing.item(props.id).then((data) => {
      // 复制不需要赋值form表单
      if (!props.isCopy) {
        formData.routingCode = data.routingCode;
        formData.routingName = data.routingName;
        formData.routingType = data.routingType;
        formData.version = data.routingVersion;
        formData.enableDate = data.enableDate;
        formData.invailDate = data.invailDate;
        formData.desc = data.routingDesc;
      }
      if (data.routingGraphStr) {
        lf.renderRawData(JSON.parse(data.routingGraphStr));
      }
    });
  }
});
// Form表单
const routingTypeOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_TYPE' }).then((data) => {
  routingTypeOption.value = data;
});
const routingFormRef = ref();
const routingRules: FormRules<Data> = {
  routingCode: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  routingName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  routingType: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  version: [
    { required: true, message: t('common.validation.required'), type: 'error' },
    { min: 1, message: t('craftRoute.versionBelowOne'), type: 'error' },
  ],
  enableDate: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};
const formData = reactive({
  routingCode: null,
  routingName: null,
  routingType: 'STANDARD',
  version: 1,
  enableDate: dayjs().format(),
  invailDate: null,
  desc: null,
});
const save = () => {
  routingFormRef.value.validate().then((result: any) => {
    if (result === true) {
      const rawData = lf.getGraphRawData();
      console.log(rawData);
      const allStartNodes = filter(rawData.nodes, ['type', 'start']);
      // 判断是否有开始节点
      if (allStartNodes.length === 0) {
        MessagePlugin.error(t('craftRoute.notStartNode'));
        return;
      }
      // 判断是否有多个开始节点
      if (allStartNodes.length > 1) {
        MessagePlugin.error(t('craftRoute.notMoreStartNode'));
        return;
      }
      // 判断开始节点是否有连线
      if (findIndex(rawData.edges, ['sourceNodeId', allStartNodes[0].id]) === -1) {
        MessagePlugin.error(t('craftRoute.startNodeNotEdge'));
        return;
      }
      const allEndNodes = filter(rawData.nodes, ['type', 'end']);
      // 判断是否有结束节点
      if (allEndNodes.length === 0) {
        MessagePlugin.error(t('craftRoute.notEndNode'));
        return;
      }
      // 判断是否有多个结束节点
      if (allEndNodes.length > 1) {
        MessagePlugin.error(t('craftRoute.notMoreEndNode'));
        return;
      }
      // 判断结束节点是否有连线
      if (findIndex(rawData.edges, ['targetNodeId', allEndNodes[0].id]) === -1) {
        MessagePlugin.error(t('craftRoute.endNodeNotEdge'));
        return;
      }
      const allProcessNodes = filter(rawData.nodes, ['type', 'process']);
      // 判断是否有工序
      if (allProcessNodes.length === 0) {
        MessagePlugin.error(t('craftRoute.notProcessNode'));
        return;
      }
      // 判断所有工序节点都有下一个节点
      for (let i = 0; i < allProcessNodes.length; i++) {
        const process = allProcessNodes[i];
        // 判断工序节点是否有选择工序
        if (process.properties.processId === null) {
          MessagePlugin.error(t('craftRoute.processNodeNotSelect'));
          return;
        }
        // 判断是否有上一个节点，同时不能是自链接
        if (findIndex(rawData.edges, (o) => o.targetNodeId === process.id && o.sourceNodeId !== process.id) === -1) {
          MessagePlugin.error(t('craftRoute.processNodeNotPre', [process.properties.processName]));
          return;
        }
        // 判断是否有下一个节点，同时不能是自链接
        if (findIndex(rawData.edges, (o) => o.sourceNodeId === process.id && o.targetNodeId !== process.id) === -1) {
          MessagePlugin.error(t('craftRoute.processNodeNotNext', [process.properties.processName]));
          return;
        }
        // 判断是否有重复工序
        if (
          findIndex(
            allProcessNodes,
            (o) => o.id !== process.id && o.properties.processId === process.properties.processId,
          ) > -1
        ) {
          MessagePlugin.error(t('craftRoute.repeatProcess', [process.properties.processName]));
          return;
        }
      }
      loading.value = true;
      const postData = {
        routingCode: formData.routingCode,
        routingName: formData.routingName,
        routingDesc: formData.desc,
        routingType: formData.routingType,
        routingVersion: formData.version,
        enableDate: formData.enableDate,
        invailDate: formData.invailDate,
        routingGraph: rawData,
      };
      // 复制走新增逻辑
      if (props.id && !props.isCopy) {
        apiMain.routing
          // @ts-ignore
          .update(props.id, postData)
          .then(() => {
            loading.value = false;
            visible.value = false;
            emit('submit');
          })
          .catch(() => {
            loading.value = false;
          });
      } else {
        apiMain.routing
          // @ts-ignore
          .add(postData)
          .then(() => {
            loading.value = false;
            visible.value = false;
            emit('submit');
          })
          .catch(() => {
            loading.value = false;
          });
      }
    }
  });
};
// #region 流程图
const flowRef = ref();
const propertiesVisible = ref(false);
let globalProcessStep = 10;
let lf: LogicFlow;
onMounted(() => {
  lf = new LogicFlow({
    container: flowRef.value,
    grid: true,
    nodeTextEdit: false,
    edgeTextEdit: false,
    plugins: [Menu],
  });
  registerCustomElement(lf);
  // 设置默认边类型为自定义类型
  lf.setDefaultEdgeType('sequence');
  lf.extension.menu.setMenuConfig({
    nodeMenu: [
      {
        text: '删除',
        callback(node: any) {
          lf.deleteNode(node.id);
        },
      },
    ], // 覆盖默认的节点右键菜单
    edgeMenu: [
      {
        text: '删除',
        callback(edge: any) {
          lf.deleteEdge(edge.id);
        },
      },
    ], // 删除默认的边右键菜单
    graphMenu: [], // 覆盖默认的边右键菜单，与false表现一样
  });
  lf.on('node:click', ({ data }) => {
    if (data.type === 'process') {
      selectedProcess = data;
      propertiesForm.processStep = data.properties.processStep;
      propertiesForm.processId = data.properties.processId;
      propertiesForm.processName = data.properties.processName;
      propertiesForm.processType = data.properties.processType;
      propertiesForm.backgroundColor = data.properties.backgroundColor;
      propertiesForm.bomList = data.properties.bomList ? data.properties.bomList : [];
      propertiesVisible.value = true;
    }
  });
  lf.on('edge:click', ({ data }) => {
    selectedEdage = data;
    edgeText.value = data.text.value;
    edgeVisible.value = true;
  });
  lf.render();
});
const toolAction = (type: string) => {
  if (type === 'zoomIn') {
    lf.zoom(true);
  } else if (type === 'zoomOut') {
    lf.zoom(false);
  } else if (type === 'undo') {
    lf.undo();
  } else if (type === 'redo') {
    lf.redo();
  }
};
const dragInNode = (type: string, text: string) => {
  const properties = {
    id: null,
    processStep: 0,
    processId: null,
    processName: text,
    processType: 'P',
    backgroundColor: '#ffffff',
    bomList: [],
  };
  if (type === 'process') {
    properties.processStep = globalProcessStep;
    globalProcessStep += 20;
  } else if (type === 'start') {
    properties.processType = 'S';
  } else if (type === 'end') {
    properties.processType = 'E';
  }
  lf.dnd.startDrag({
    type,
    text,
    properties,
  });
};
// #endregion
// #region 边属性
const edgeVisible = ref(false);
const edgeText = ref();
let selectedEdage = null;
const resultChange = (val: any) => {
  lf.updateText(selectedEdage.id, val);
  edgeVisible.value = false;
};
// #endregion
// #region 工序属性
let selectedProcess = null;
const propertiesFormRef = ref();
const propertiesRules: FormRules<Data> = {
  processStep: [
    { required: true, message: t('common.validation.required'), type: 'error' },
    { validator: (val: any) => isStepNotRepeat(val), message: t('craftRoute.stepNotRepeat') },
  ],
  processId: [
    { required: true, message: t('common.validation.required'), type: 'error' },
    { validator: (val: any) => isProcessNotRepeat(val), message: t('craftRoute.processNotRepeat') },
  ],
};
const propertiesForm = reactive({
  processStep: 0,
  processId: null,
  processName: null,
  processType: 'P',
  backgroundColor: '#ffffff',
  bomList: [],
});
const isStepNotRepeat = (val: any) => {
  const { nodes } = lf.getGraphRawData();
  const steps = [];
  nodes.forEach((value) => {
    if (value.id !== selectedProcess.id) {
      steps.push(value.properties.processStep);
    }
  });
  return steps.indexOf(val) === -1;
};
const isProcessNotRepeat = (val: any) => {
  const { nodes } = lf.getGraphRawData();
  const processIds = [];
  nodes.forEach((value) => {
    if (value.id !== selectedProcess.id) {
      processIds.push(value.properties.processId);
    }
  });
  return processIds.indexOf(val) === -1;
};
const processChange = (val: any) => {
  propertiesForm.processId = val.id;
  propertiesForm.processName = val.processName;
};
const processConfirm = () => {
  propertiesFormRef.value.validate().then((result: any) => {
    if (result === true) {
      lf.setProperties(selectedProcess.id, propertiesForm);
      lf.updateText(selectedProcess.id, propertiesForm.processName);
      propertiesVisible.value = false;
    }
  });
};
// #endregion
// #region 工序bom
const bomVisible = ref(false);
const categoryColumn: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'categoryCode', align: 'left', width: 40 },
  { colKey: 'categoryName', align: 'left', width: 40 },
  { colKey: 'op', align: 'right', width: 30 },
];
const categoryPagination = reactive({
  size: 'small',
  current: 1,
  pageSize: 10,
  showPageNumber: false,
  showPageSize: false,
  total: 0,
  onChange({ current }) {
    categoryPagination.current = current;
    getMitemCategory();
  },
});
const bomColumn = [
  { colKey: 'row-select', type: 'multiple' },
  { colKey: 'categoryCode', title: t('craftRoute.categoryCode'), align: 'center' },
  { colKey: 'categoryName', title: t('craftRoute.categoryName'), align: 'center' },
  { colKey: 'isKeyPart', title: t('craftRoute.isKeyPart'), align: 'center', width: 140 },
  { colKey: 'op', title: t('common.button.operation'), align: 'center' },
];
const bomSearchKeyword = ref();
const bomData = reactive({
  list: [],
  total: 0,
});
const bomList = ref([]);
const getMitemCategory = () => {
  apiMain.mitemCategory
    .search({
      pageNum: categoryPagination.current,
      pageSize: categoryPagination.pageSize,
      keyword: bomSearchKeyword.value,
    })
    .then((data) => {
      bomData.list = data.list;
      bomData.total = data.total;
      categoryPagination.total = data.total;
    });
};
const bomSelectKeys = ref([]);
const showBom = () => {
  getMitemCategory();
  // 要用clone，直接复制会把对象路径赋值过去
  bomList.value = clone(propertiesForm.bomList);
  bomVisible.value = true;
};
const addBom = (row: any) => {
  const index = findIndex(bomList.value, ['id', row.id]);
  if (index > -1) {
    MessagePlugin.error(t('craftRoute.typeNotRepeat'));
  } else {
    row.isKeyPart = true;
    bomList.value.push(row);
  }
};
const deleteBom = (row: any) => {
  remove(bomList.value, (o) => o.id === row.id);
};
const batchDeleteBom = () => {
  remove(bomList.value, (o) => bomSelectKeys.value.indexOf(o.id) > -1);
  bomSelectKeys.value = [];
};
// 数组是动态获取的，直接v-model不会改变源数据，需要用change的方法处理源数据
const keyPartChange = ($event: any, id: any) => {
  const row = find(bomList.value, (o) => o.id === id);
  if (row) {
    row.isKeyPart = $event;
  }
};
const confirmBom = () => {
  propertiesForm.bomList = clone(bomList.value);
  bomVisible.value = false;
};
// #endregion
</script>

<style lang="less" scoped>
.card {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
  margin-bottom: var(--td-comp-margin-xxl);
  position: relative;

  :deep(.t-form__controls-content) {
    width: 200px;

    .t-date-picker,
    .t-input-number,
    .t-color-picker__trigger {
      width: 200px;
    }
  }

  .toolbar {
    position: absolute;
    top: 10px;
    right: 50px;
    z-index: 2;
  }

  .sidebar {
    user-select: none;
    position: absolute;
    width: 50px;
    background-color: white;
    top: 10px;
    left: 20px;
    z-index: 2;

    .sidebar-item {
      color: var(--td-brand-color-active);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 5px;
      margin-bottom: 5px;
    }
  }

  .flow {
    height: 500px;
  }
}

.t-form-inline {
  row-gap: var(--td-comp-margin-m);
}
</style>
