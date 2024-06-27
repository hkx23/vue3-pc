<template>
  <div style="position: relative; height: 100%">
    <div class="fd-nav">
      <div class="fd-nav-left">
        <div class="fd-nav-back" @click="onClickBack">
          <i class="anticon anticon-left"></i>
        </div>
        <div class="fd-nav-title">{{ processData.processName }}</div>
      </div>
      <div class="fd-nav-center">
        <ul class="fd-nav-menu">
          <li :class="{ 'fd-nav-menu-item': true, active: activeTab === 1 }" @click="activeTab = 1">基础信息</li>
          <li :class="{ 'fd-nav-menu-item': true, active: activeTab === 2 }" @click="activeTab = 2">流程设计</li>
        </ul>
      </div>
      <div class="fd-nav-right">
        <t-button @click="saveSet">保 存</t-button>
      </div>
    </div>
    <div class="fd-nav-content">
      <div v-show="activeTab === 1" style="height: 100%">
        <cmp-container full>
          <cmp-card style="width: 600px; margin: 0 auto">
            <t-form :data="processData" label-width="100px" style="padding: 24px">
              <t-form-item label="流程名称" prop="processName">
                <t-input v-model="processData.processName" placeholder="请输入流程名称" />
              </t-form-item>
              <t-form-item label="流程分组" prop="processGroup">
                <t-auto-complete
                  v-model="processData.processGroup"
                  :options="props.groupList"
                  placeholder="请输入流程分组"
                  :filterable="false"
                />
              </t-form-item>
              <t-form-item label="流程说明" prop="processDesc">
                <t-textarea v-model="processData.processDesc" placeholder="请输入流程说明" />
              </t-form-item>
            </t-form>
          </cmp-card>
        </cmp-container>
      </div>
      <section v-show="activeTab === 2" class="dingflow-design">
        <div class="zoom">
          <div class="zoom-out" :class="nowVal == 50 && 'disabled'" @click="zoomSize(1)"></div>
          <span>{{ nowVal }}%</span>
          <div class="zoom-in" :class="nowVal == 300 && 'disabled'" @click="zoomSize(2)"></div>
        </div>
        <div class="box-scale" :style="`transform: scale(${nowVal / 100});`">
          <nodeWrap v-model:nodeConfig="nodeConfig" v-model:flowPermission="flowPermission" />
          <div class="end-node">
            <div class="end-node-circle"></div>
            <div class="end-node-text">流程结束</div>
          </div>
        </div>
      </section>
    </div>
    <errorDialog v-model:visible="tipVisible" :list="tipList" />
    <promoterDrawer />
    <approverDrawer :director-max-level="directorMaxLevel" />
    <copyerDrawer />
    <conditionDrawer />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CmpFlow',
};
</script>
<script setup lang="ts">
import { cloneDeep, debounce } from 'lodash';
import { onMounted, ref, watch } from 'vue';

// import { useRoute } from 'vue-router';
import { ProcessTmpl } from '@/api/main';

// import { data } from './api.js';
import approverDrawer from './drawer/approverDrawer.vue';
import conditionDrawer from './drawer/conditionDrawer.vue';
import copyerDrawer from './drawer/copyerDrawer.vue';
import promoterDrawer from './drawer/promoterDrawer.vue';
// import { getWorkFlowData, setWorkFlowData } from '@/api/index';
import errorDialog from './errorDialog.vue';
// import addNode from './addNode.vue';
import nodeWrap from './nodeWrap.vue';
// import { useStore } from '@/stores/index';

// const { setTableId, setIsTried } = useStore();

const props = defineProps<{
  templateData: ProcessTmpl;
  groupList: String[];
}>();
const processData = ref<ProcessTmpl>({ ...props.templateData });
watch(
  () => props.templateData,
  (val) => {
    activeTab.value = 1;
    processData.value = { ...val };
    setWorkFlowData();
  },
);

const defaultConfig = {
  // tableId: 1,
  workFlowDef: {
    name: '',
  },
  directorMaxLevel: 4,
  flowPermission: [],
  nodeConfig: {
    nodeName: '发起人',
    type: 0,
    priorityLevel: '',
    settype: '',
    selectMode: '',
    selectRange: '',
    directorLevel: '',
    examineMode: '',
    noHanderAction: '',
    examineEndDirectorLevel: '',
    ccSelfSelectFlag: '',
    conditionList: [],
    nodeUserList: [],
    childNode: {},
    conditionNodes: [],
  },
};
const setWorkFlowData = debounce(() => {
  if (processData.value.processTmplBody) {
    const parsedValue = JSON.parse(processData.value.processTmplBody);
    if (typeof parsedValue === 'object') {
      processConfig.value = parsedValue;
    } else {
      console.error('流程数据格式错误，使用默认配置，数据：', parsedValue);
      processConfig.value = cloneDeep(defaultConfig);
    }
  } else {
    processConfig.value = cloneDeep(defaultConfig);
  }

  nodeConfig.value = processConfig.value.nodeConfig;
  flowPermission.value = processConfig.value.flowPermission;
  directorMaxLevel.value = processConfig.value.directorMaxLevel;
  workFlowDef.value = processConfig.value.workFlowDef;
}, 300);

const activeTab = ref(1);

const tipList = ref<any[]>([]);
const tipVisible = ref(false);
const nowVal = ref(100);
const processConfig = ref({ ...defaultConfig });
const nodeConfig = ref({ ...defaultConfig.nodeConfig });
const workFlowDef = ref({ ...defaultConfig.workFlowDef });
const flowPermission = ref([...defaultConfig.flowPermission]);
const directorMaxLevel = ref(0);
onMounted(async () => {
  setWorkFlowData();
});
const reErr = ({ childNode }) => {
  if (childNode) {
    const { type, error, nodeName, conditionNodes } = childNode;
    if (type === 1 || type === 2) {
      if (error) {
        tipList.value.push({
          name: nodeName,
          type: ['', '审核人', '抄送人'][type],
        });
      }
      reErr(childNode);
    } else if (type === 3) {
      reErr(childNode);
    } else if (type === 4) {
      reErr(childNode);
      for (let i = 0; i < conditionNodes.length; i++) {
        if (conditionNodes[i].error) {
          tipList.value.push({ name: conditionNodes[i].nodeName, type: '条件' });
        }
        reErr(conditionNodes[i]);
      }
    }
  } else {
    childNode = null;
  }
};
// 发布
const saveSet = async () => {
  // setIsTried(true);
  tipList.value = [];
  reErr(nodeConfig.value);
  if (tipList.value.length !== 0) {
    tipVisible.value = true;
    return;
  }
  processConfig.value.flowPermission = flowPermission.value;
  emits('save', processConfig.value);
  // eslint-disable-next-line no-console
  // console.log(JSON.stringify(processConfig.value));
  // const res = await setWorkFlowData(processConfig.value);
  // if (res.code === 200) {
  // ElMessage.success('设置成功');
  // setTimeout(() => {
  //   window.location.href = '';
  // }, 200);
  // }
};
const zoomSize = (type) => {
  if (type === 1) {
    if (nowVal.value === 50) {
      return;
    }
    nowVal.value -= 10;
  } else {
    if (nowVal.value === 300) {
      return;
    }
    nowVal.value += 10;
  }
};
const emits = defineEmits(['back', 'save']);
const onClickBack = () => {
  emits('back');
};
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style>
@import './css/workflow.css';

.error-modal-list {
  width: 455px;
}
</style>
<style lang="less" scoped>
.fd-nav-container {
  display: inline-block;
  position: relative;
}

.fd-nav-container .ghost-bar {
  position: absolute;
  width: 150px;
  height: 100%;
  left: 0;
  background: #1583f2;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fd-nav-container .ghost-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5px 6px;
  border-color: transparent transparent #f6f6f6;
}

.fd-nav-item {
  position: relative;
  cursor: pointer;
  display: inline-block;
  line-height: 48px;
  width: 150px;
  text-align: center;
  white-space: nowrap;
}

.fd-nav-item .order-num {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-right: 6px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fd-nav-item.active .order-num {
  color: #1583f2;
  background: #fff;
}

.fd-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 997;
  width: 100%;
  height: 48px;
  font-size: 14px;
  // color: #fff;
  // background: #3296fa;
  color: var(--td-text-color-secondary);
  background: #fff;
  border-bottom: 1px solid var(--td-component-stroke);
  box-shadow: 0 0 20px 5px rgb(0 0 0 / 5%);
  display: flex;
  align-items: center;
}

.fd-nav > * {
  flex: 1;
  width: 100%;
}

.fd-nav .fd-nav-left {
  display: -webkit-box;
  display: flex;
  align-items: center;
}

.fd-nav .fd-nav-center {
  flex: none;
  width: 600px;
  text-align: center;
}

.fd-nav .fd-nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  padding-right: 24px;
}

.fd-nav .fd-nav-back {
  display: inline-block;
  width: 48px;
  height: 48px;
  font-size: 22px;
  // border-right: 1px solid #1583f2;
  text-align: center;
  cursor: pointer;
}

.fd-nav .fd-nav-back:hover {
  // background: #5af;
  color: var(--td-brand-color);
  background: var(--td-brand-color-light);
}

// .fd-nav .fd-nav-back:active {
//   background: #1583f2;
// }

.fd-nav .fd-nav-back .anticon {
  line-height: 48px;
}

.fd-nav .fd-nav-title {
  width: 0;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 15px;
}

.fd-nav-content {
  position: absolute;
  inset: 48px 0 0;
  z-index: 1;
  overflow: hidden auto;
  padding-bottom: 30px;
}

.fd-nav-menu {
  list-style: none;
  margin: 0;

  .fd-nav-menu-item {
    transition:
      border-color var(0.3s),
      background-color var(0.3s),
      color var(0.3s);
    display: inline-block;
    margin: 0;
    padding: 0 32px;
    height: 48px;
    line-height: 48px;
    // color: #fff;
    cursor: pointer;

    &:hover,
    &.active {
      // background-color: #40a9ff;
      color: var(--td-brand-color);
      background: var(--td-brand-color-light);
    }

    &.active {
      // background-color: #40a9ff;
      border-bottom: 2px solid var(--td-brand-color);
    }
  }
}
</style>
