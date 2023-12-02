<template>
  <t-dialog v-model:visible="visible" mode="full-screen" :footer="false" @close="close">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ title }}</span>
        <t-button :loading="loading" style="float: right" @click="save">{{ t('common.button.save') }}</t-button>
      </t-space>
    </template>
    <t-form
      ref="craftRouteFormRef"
      class="card"
      :data="formData"
      :rules="craftRouteRules"
      label-width="100px"
      layout="inline"
    >
      <t-form-item :label="t('craftRoute.craftRouteCode')" name="craftRouteCode">
        <t-input
          v-model="formData.craftRouteCode"
          :disabled="props.id && !props.isCopy ? true : false"
          :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteCode')])"
        ></t-input>
      </t-form-item>
      <t-form-item :label="t('craftRoute.craftRouteName')" name="craftRouteName">
        <t-input
          v-model="formData.craftRouteName"
          :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteName')])"
        ></t-input>
      </t-form-item>
      <t-form-item :label="t('craftRoute.craftRouteType')" name="craftRouteType">
        <t-select
          v-model="formData.craftRouteType"
          :placeholder="t('common.placeholder.select', [t('craftRoute.craftRouteType')])"
        >
          <t-option
            v-for="(value, key) in craftRouteTypeOption"
            :key="key"
            :label="value.label"
            :value="value.value"
          ></t-option>
        </t-select>
      </t-form-item>
      <t-form-item :label="t('craftRoute.version')" name="version">
        <t-input-number
          v-model="formData.version"
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
      <t-form-item :label="t('craftRoute.invalidDate')" name="invalidDate">
        <t-date-picker
          v-model="formData.invalidDate"
          :placeholder="t('common.placeholder.select', [t('craftRoute.invalidDate')])"
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
          <t-option value="GOOD" />
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
            <tm-select-business
              v-model="propertiesForm.processId"
              type="process"
              :show-title="false"
              :placeholder="t('common.placeholder.select', [t('craftRoute.processName')])"
              @selection-change="processChange"
            ></tm-select-business>
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
          <t-form-item :label="t('craftRoute.processBoom')" name="processBoom">
            <t-button theme="primary" variant="text" @click="showBoom">{{ t('common.button.edit') }}</t-button>
          </t-form-item>
        </t-form>
      </t-drawer>
      <t-dialog v-model:visible="boomVisible" :header="t('craftRoute.processBoom')" width="60%" @confirm="confirmBoom">
        <t-row>
          <t-col :span="3" style="padding-right: 5px">
            <t-input
              v-model="boomSearchKeyword"
              :placeholder="t('common.placeholder.search')"
              @enter="getMitemCategory"
            >
              <template #suffixIcon>
                <search-icon :style="{ cursor: 'pointer' }" @click="getMitemCategory" />
              </template>
            </t-input>
            <t-table
              row-key="id"
              :data="boomData.list"
              :columns="categoryColumn"
              :bordered="false"
              :show-header="false"
              :pagination="categoryPagination"
              hover
              size="small"
              table-layout="fixed"
            >
              <template #op="{ row }">
                <t-button variant="text" shape="square" @click="addBoom(row)"><add-icon /></t-button>
              </template>
            </t-table>
          </t-col>
          <t-col :span="9">
            <tm-table
              v-model:selected-row-keys="boomSelectKeys"
              row-key="id"
              :table-column="boomColumn"
              :table-data="boomList"
              :show-pagination="false"
            >
              <template #button>
                <t-button theme="default" @click="batchDeleteBoom">{{ t('common.button.batchDelete') }}</t-button>
              </template>
              <template #isKeyPart="{ row }">
                <t-switch :value="row.isKeyPart" @change="keyPartChange($event, row.id)" />
              </template>
              <template #op="{ row }">
                <t-button variant="text" theme="primary" @click="deleteBoom(row)">{{
                  t('common.button.delete')
                }}</t-button>
              </template>
            </tm-table>
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
import { clone, find, findIndex, remove } from 'lodash';
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

import { api as apiControl } from '@/api/control';
import { api as apiMain } from '@/api/main';
import TmSelectBusiness from '@/components/tm-select-business/index.vue';
import TmTable from '@/components/tm-table/index.vue';

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
  formData.craftRouteCode = null;
  formData.craftRouteName = null;
  formData.craftRouteType = 'STANDARD';
  formData.version = 1;
  formData.enableDate = dayjs().format();
  formData.invalidDate = null;
  formData.desc = null;
};
watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    apiControl.routing.item(props.id).then((data) => {
      // 复制不需要赋值form表单
      if (!props.isCopy) {
        formData.craftRouteCode = data.routingCode;
        formData.craftRouteName = data.routingName;
        formData.craftRouteType = data.routingType;
        formData.version = data.routingVersion;
        formData.enableDate = data.enableDate;
        formData.invalidDate = data.invailDate;
        formData.desc = data.routingDesc;
      }
      if (data.routingGraph) {
        console.log(JSON.parse(data.routingGraph));
        lf.renderRawData(JSON.parse(data.routingGraph));
      }
    });
  }
});
// Form表单
const craftRouteTypeOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_TYPE' }).then((data) => {
  craftRouteTypeOption.value = data;
});
const craftRouteFormRef = ref();
const craftRouteRules: FormRules<Data> = {
  craftRouteCode: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  craftRouteName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  craftRouteType: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  version: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  enableDate: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};
const formData = reactive({
  craftRouteCode: null,
  craftRouteName: null,
  craftRouteType: 'STANDARD',
  version: 1,
  enableDate: dayjs().format(),
  invalidDate: null,
  desc: null,
});
const save = () => {
  console.log(props.id);
  craftRouteFormRef.value.validate().then((result: any) => {
    if (result === true) {
      const rawData = lf.getGraphRawData();
      // 判断是否有开始节点
      if (findIndex(rawData.nodes, (o) => o.type === 'start') === -1) {
        MessagePlugin.error(t('craftRoute.notStartNode'));
        return;
      }
      // 判断是否有结束节点
      if (findIndex(rawData.nodes, (o) => o.type === 'end') === -1) {
        MessagePlugin.error(t('craftRoute.notEndNode'));
        return;
      }
      // 判断是否有工序
      if (findIndex(rawData.nodes, (o) => o.type === 'process') === -1) {
        MessagePlugin.error(t('craftRoute.notProcessNode'));
        return;
      }
      loading.value = true;
      const postData = {
        routingCode: formData.craftRouteCode,
        routingName: formData.craftRouteName,
        routingDesc: formData.desc,
        routingType: formData.craftRouteType,
        routingVersion: formData.version,
        enableDate: formData.enableDate,
        invailDate: formData.invalidDate,
        routingGraph: JSON.stringify(rawData),
      };
      // 复制走新增逻辑
      if (props.id && !props.isCopy) {
        apiControl.routing
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
        apiControl.routing
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
      propertiesForm = reactive(data.properties);
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
  let properties = {};
  if (type === 'process') {
    properties = {
      processStep: globalProcessStep,
      processId: null,
      processName: text,
      processType: 'P',
      backgroundColor: '#ffffff',
      boomList: [],
    };
    globalProcessStep += 20;
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
  processId: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};
let propertiesForm = reactive({
  processStep: 0,
  processId: null,
  processName: null,
  processType: 'P',
  backgroundColor: '#ffffff',
  boomList: [],
});
const isStepNotRepeat = (val: any) => {
  const { nodes } = lf.getGraphRawData();
  const steps = [];
  nodes.forEach((val) => {
    if (val.id !== selectedProcess.id) {
      steps.push(val.properties.processStep);
    }
  });
  return steps.indexOf(val) === -1;
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
// #region 工序boom
const boomVisible = ref(false);
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
});
const boomColumn = [
  { colKey: 'row-select', type: 'multiple' },
  { colKey: 'categoryCode', title: t('craftRoute.categoryCode'), align: 'center' },
  { colKey: 'categoryName', title: t('craftRoute.categoryName'), align: 'center' },
  { colKey: 'isKeyPart', title: t('craftRoute.isKeyPart'), align: 'center', width: 140 },
  { colKey: 'op', title: t('common.button.operation'), align: 'center' },
];
const boomSearchKeyword = ref();
const boomData = reactive({
  list: [],
  total: 0,
});
const boomList = ref([]);
const getMitemCategory = () => {
  apiMain.mitemCategory
    .search({
      pageNum: categoryPagination.current,
      pageSize: categoryPagination.pageSize,
      keyword: boomSearchKeyword.value,
    })
    .then((data) => {
      boomData.list = data.list;
      boomData.total = data.total;
    });
};
const boomSelectKeys = ref([]);
const showBoom = () => {
  getMitemCategory();
  // 要用clone，直接复制会把对象路径赋值过去
  boomList.value = clone(propertiesForm.boomList);
  boomVisible.value = true;
};
const addBoom = (row: any) => {
  const index = findIndex(boomList.value, ['id', row.id]);
  if (index > -1) {
    MessagePlugin.error(t('craftRoute.typeNotRepeat'));
  } else {
    row.isKeyPart = true;
    boomList.value.push(row);
  }
};
const deleteBoom = (row: any) => {
  remove(boomList.value, (o) => o.id === row.id);
};
const batchDeleteBoom = () => {
  remove(boomList.value, (o) => boomSelectKeys.value.indexOf(o.id) > -1);
  boomSelectKeys.value = [];
};
// 数组是动态获取的，直接v-model不会改变源数据，需要用change的方法处理源数据
const keyPartChange = ($event: any, id: any) => {
  const row = find(boomList.value, (o) => o.id === id);
  if (row) {
    row.isKeyPart = $event;
  }
};
const confirmBoom = () => {
  propertiesForm.boomList = clone(boomList.value);
  boomVisible.value = false;
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
  row-gap: var(--td-comp-margin-xxl);
}
</style>
