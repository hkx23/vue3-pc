<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-if="nodeConfig.type < 3" class="node-wrap">
    <div
      class="node-wrap-box"
      :class="(nodeConfig.type == 0 ? 'start-node ' : '') + (isTried && nodeConfig.error ? 'active error' : '')"
    >
      <div class="title" :style="`background: rgb(${bgColors[nodeConfig.type]});`">
        <span v-if="nodeConfig.type == 0">{{ nodeConfig.nodeName }}</span>
        <template v-else>
          <span class="iconfont">{{ nodeConfig.type == 1 ? '' : '' }}</span>
          <input
            v-if="isInput"
            v-model="nodeConfig.nodeName"
            type="text"
            class="ant-input editable-title-input"
            :placeholder="defaultText"
            @blur="blurEvent()"
            @focus="($event.currentTarget as HTMLInputElement).select()"
          />
          <span v-else class="editable-title" @click="clickEvent()">{{ nodeConfig.nodeName }}</span>
          <i class="anticon anticon-close close" @click="delNode"></i>
        </template>
      </div>
      <div class="content" @click="setPerson">
        <div class="text">
          <span v-if="!showText" class="placeholder">请选择{{ defaultText }}</span>
          {{ showText }}
        </div>
        <i class="anticon anticon-right arrow"></i>
      </div>
      <div v-if="isTried && nodeConfig.error" class="error_tip">
        <i class="anticon anticon-exclamation-circle"></i>
      </div>
    </div>
    <addNode v-model:childNodeP="nodeConfig.childNode" />
  </div>
  <div v-if="nodeConfig.type == 4" class="branch-wrap">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch" @click="addTerm">添加条件</button>
        <div v-for="(item, index) in nodeConfig.conditionNodes" :key="index" class="col-box">
          <div class="condition-node">
            <div class="condition-node-box">
              <div class="auto-judge" :class="isTried && item.error ? 'error active' : ''">
                <div v-if="index != 0" class="sort-left" @click="arrTransfer(index, -1)">&lt;</div>
                <div class="title-wrapper">
                  <input
                    v-if="isInputList[index]"
                    v-model="item.nodeName"
                    type="text"
                    class="ant-input editable-title-input"
                    @blur="blurEvent(index)"
                    @focus="($event.currentTarget as HTMLInputElement).select()"
                  />
                  <span v-else class="editable-title" @click="clickEvent(index)">{{ item.nodeName }}</span>
                  <span class="priority-title" @click="setPerson(item.priorityLevel)"
                    >优先级{{ item.priorityLevel }}</span
                  >
                  <i class="anticon anticon-close close" @click="delTerm(index)"></i>
                </div>
                <div
                  v-if="index != nodeConfig.conditionNodes.length - 1"
                  class="sort-right"
                  @click="arrTransfer(index)"
                >
                  &gt;
                </div>
                <div class="content" @click="setPerson(item.priorityLevel)">
                  {{ $func.conditionStr(nodeConfig, index) }}
                </div>
                <div v-if="isTried && item.error" class="error_tip">
                  <i class="anticon anticon-exclamation-circle"></i>
                </div>
              </div>
              <addNode v-model:childNodeP="item.childNode" />
            </div>
          </div>
          <nodeWrap v-if="item.childNode" v-model:nodeConfig="item.childNode" />
          <template v-if="index == 0">
            <div class="top-left-cover-line"></div>
            <div class="bottom-left-cover-line"></div>
          </template>
          <template v-if="index == nodeConfig.conditionNodes.length - 1">
            <div class="top-right-cover-line"></div>
            <div class="bottom-right-cover-line"></div>
          </template>
        </div>
      </div>
      <addNode v-model:childNodeP="nodeConfig.childNode" />
    </div>
  </div>
  <nodeWrap v-if="nodeConfig.childNode" v-model:nodeConfig="nodeConfig.childNode" />
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';

import addNode from './addNode.vue';
import { useStore } from './store';
import { bgColors, placeholderList } from './utils/const';
import $func from './utils/index';

const { uid } = getCurrentInstance();

const props = defineProps({
  nodeConfig: {
    type: Object,
    default: () => ({}),
  },
  flowPermission: {
    type: [Object, Array],
    default: () => [],
  },
});
// const nodeConfig = reactive(props.nodeConfig);
// watch(
//   () => props.nodeConfig,
//   (newVal) => {
//     nodeConfig.value = newVal;
//   },
//   {
//     deep: true,
//   },
// );

const defaultText = computed(() => {
  return placeholderList[props.nodeConfig.type];
});
const showText = computed(() => {
  if (props.nodeConfig.type === 0) return $func.arrToStr(props.flowPermission) || '所有人';
  if (props.nodeConfig.type === 1) return $func.setApproverStr(props.nodeConfig);
  return $func.copyerStr(props.nodeConfig);
});

const isInputList = ref([]);
const isInput = ref(false);
const resetConditionNodesErr = () => {
  for (let i = 0; i < props.nodeConfig.conditionNodes.length; i++) {
    // eslint-disable-next-line vue/no-mutating-props
    props.nodeConfig.conditionNodes[i].error =
      $func.conditionStr(props.nodeConfig, i) === '请设置条件' && i !== props.nodeConfig.conditionNodes.length - 1;
  }
};
onMounted(() => {
  if (props.nodeConfig.type === 1) {
    // eslint-disable-next-line vue/no-mutating-props
    props.nodeConfig.error = !$func.setApproverStr(props.nodeConfig);
  } else if (props.nodeConfig.type === 2) {
    // eslint-disable-next-line vue/no-mutating-props
    props.nodeConfig.error = !$func.copyerStr(props.nodeConfig);
  } else if (props.nodeConfig.type === 4) {
    resetConditionNodesErr();
  }
});
const emits = defineEmits(['update:flowPermission', 'update:nodeConfig']);
const store = useStore();
const {
  setPromoter,
  setApprover,
  setCopyer,
  setCondition,
  setFlowPermission,
  setApproverConfig,
  setCopyerConfig,
  setConditionsConfig,
} = store;
const isTried = computed(() => store.isTried);
const flowPermission1 = computed(() => store.flowPermission1);
const approverConfig1 = computed(() => store.approverConfig1);
const copyerConfig1 = computed(() => store.copyerConfig1);
const conditionsConfig1 = computed(() => store.conditionsConfig1);
watch(flowPermission1, (flow) => {
  if (flow.flag && flow.id === uid) {
    emits('update:flowPermission', flow.value);
  }
});
watch(approverConfig1, (approver) => {
  if (approver.flag && approver.id === uid) {
    emits('update:nodeConfig', approver.value);
  }
});
watch(copyerConfig1, (copyer) => {
  if (copyer.flag && copyer.id === uid) {
    emits('update:nodeConfig', copyer.value);
  }
});
watch(conditionsConfig1, (condition) => {
  if (condition.flag && condition.id === uid) {
    emits('update:nodeConfig', condition.value);
  }
});

const clickEvent = (index?: number) => {
  if (index || index === 0) {
    isInputList.value[index] = true;
  } else {
    isInput.value = true;
  }
};
const blurEvent = (index?: number) => {
  if (index || index === 0) {
    isInputList.value[index] = false;
    // eslint-disable-next-line vue/no-mutating-props
    props.nodeConfig.conditionNodes[index].nodeName = props.nodeConfig.conditionNodes[index].nodeName || '条件';
  } else {
    isInput.value = false;
    // eslint-disable-next-line vue/no-mutating-props
    props.nodeConfig.nodeName = props.nodeConfig.nodeName || defaultText;
  }
};
const delNode = () => {
  emits('update:nodeConfig', props.nodeConfig.childNode);
};
const addTerm = () => {
  const len = props.nodeConfig.conditionNodes.length + 1;
  // eslint-disable-next-line vue/no-mutating-props
  props.nodeConfig.conditionNodes.push({
    nodeName: `条件${len}`,
    type: 3,
    priorityLevel: len,
    conditionList: [],
    nodeUserList: [],
    childNode: null,
  });
  resetConditionNodesErr();
  emits('update:nodeConfig', props.nodeConfig);
};
const delTerm = (index) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.nodeConfig.conditionNodes.splice(index, 1);
  props.nodeConfig.conditionNodes.map((item, index) => {
    item.priorityLevel = index + 1;
    item.nodeName = `条件${index + 1}`;
    return item;
  });
  resetConditionNodesErr();
  emits('update:nodeConfig', props.nodeConfig);
  if (props.nodeConfig.conditionNodes.length === 1) {
    if (props.nodeConfig.childNode) {
      if (props.nodeConfig.conditionNodes[0].childNode) {
        reData(props.nodeConfig.conditionNodes[0].childNode, props.nodeConfig.childNode);
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        props.nodeConfig.conditionNodes[0].childNode = props.nodeConfig.childNode;
      }
    }
    emits('update:nodeConfig', props.nodeConfig.conditionNodes[0].childNode);
  }
};
const reData = (data, addData) => {
  if (!data.childNode) {
    data.childNode = addData;
  } else {
    reData(data.childNode, addData);
  }
};
const setPerson = (priorityLevel) => {
  const { type } = props.nodeConfig;
  if (type === 0) {
    setPromoter(true);
    setFlowPermission({
      value: props.flowPermission,
      flag: false,
      id: uid,
    });
  } else if (type === 1) {
    setApprover(true);
    setApproverConfig({
      value: {
        ...JSON.parse(JSON.stringify(props.nodeConfig)),
        ...{ settype: props.nodeConfig.settype ? props.nodeConfig.settype : 1 },
      },
      flag: false,
      id: uid,
    });
  } else if (type === 2) {
    setCopyer(true);
    setCopyerConfig({
      value: JSON.parse(JSON.stringify(props.nodeConfig)),
      flag: false,
      id: uid,
    });
  } else {
    setCondition(true);
    setConditionsConfig({
      value: JSON.parse(JSON.stringify(props.nodeConfig)),
      priorityLevel,
      flag: false,
      id: uid,
    });
  }
};
const arrTransfer = (index, type = 1) => {
  // 向左-1,向右1
  // nodeConfig.conditionNodes[index] = nodeConfig.conditionNodes.splice(
  //   index + type,
  //   1,
  //   nodeConfig.conditionNodes[index],
  // )[0];
  [props.nodeConfig.conditionNodes[index], props.nodeConfig.conditionNodes[index + type]] = [
    props.nodeConfig.conditionNodes[index + type],
    props.nodeConfig.conditionNodes[index],
  ];
  props.nodeConfig.conditionNodes.map((item, index) => {
    item.priorityLevel = index + 1;
    return item;
  });
  resetConditionNodesErr();
  emits('update:nodeConfig', props.nodeConfig);
};
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style>
.error_tip {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(150%, 0);
  font-size: 24px;
}

.promoter_person .el-dialog__body {
  padding: 10px 20px 14px;
}

.selected_list {
  margin-bottom: 20px;
  line-height: 30px;
}

.selected_list span {
  margin-right: 10px;
  padding: 3px 6px 3px 9px;
  line-height: 12px;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid rgb(220 220 220 / 100%);
}

.selected_list img {
  margin-left: 5px;
  width: 7px;
  height: 7px;
  cursor: pointer;
}
</style>
