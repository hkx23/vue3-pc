<template>
  <t-drawer
    v-model:visible="visible"
    header="条件设置"
    size="550px"
    class="condition_copyer"
    :close-btn="true"
    :footer="false"
    @close="saveCondition"
  >
    <template #header="{ titleId, titleClass }">
      <h3 :id="titleId" :class="titleClass">条件设置</h3>
      <select v-model="conditionConfig.priorityLevel" class="priority_level">
        <option v-for="item in conditionsConfig.conditionNodes.length" :key="item" :value="item">
          优先级{{ item }}
        </option>
      </select>
    </template>
    <t-space direction="vertical" style="width: 100%">
      <t-alert theme="info" message="当审批单同时满足以下条件时进入此流程"></t-alert>
    </t-space>
    <!-- <div class="demo-drawer__content">
      <div class="condition_content drawer_content">
        <p class="tip">当审批单同时满足以下条件时进入此流程</p>
        <ul>
          <li v-for="(item, index) in conditionConfig.conditionList" :key="index">
            <span class="ellipsis">{{ item.type == 1 ? '发起人' : item.showName }}：</span>
            <div v-if="item.type == 1">
              <p
                :class="conditionConfig.nodeUserList.length > 0 ? 'selected_list' : ''"
                style="cursor: text"
                @click.self="addConditionRole"
              >
                <span v-for="(item1, index1) in conditionConfig.nodeUserList" :key="index1">
                  {{ item1.name
                  }}<img
                    src="../images/add-close1.png"
                    @click="$func.removeEle(conditionConfig.nodeUserList, item1, 'targetId')"
                  />
                </span>
                <input
                  v-if="conditionConfig.nodeUserList.length == 0"
                  type="text"
                  placeholder="请选择具体人员/角色/部门"
                  @click="addConditionRole"
                />
              </p>
            </div>
            <div v-else-if="item.columnType == 'String' && item.showType == 3">
              <p class="check_box">
                <a
                  v-for="(item1, index1) in JSON.parse(item.fixedDownBoxValue)"
                  :key="index1"
                  :class="$func.toggleStrClass(item, item1.key) && 'active'"
                  @click="toStrChecked(item, item1.key)"
                  >{{ item1.value }}</a
                >
              </p>
            </div>
            <div v-else>
              <p>
                <select
                  v-model="item.optType"
                  :style="'width:' + (item.optType == 6 ? 370 : 100) + 'px'"
                  @change="changeOptType(item)"
                >
                  <option v-for="{ value, label } in optTypes" :key="value" :value="value">{{ label }}</option>
                </select>
                <input
                  v-if="item.optType != 6"
                  v-model="item.zdy1"
                  v-enter-number="2"
                  type="text"
                  :placeholder="'请输入' + item.showName"
                />
              </p>
              <p v-if="item.optType == 6">
                <input v-model="item.zdy1" v-enter-number="2" type="text" style="width: 75px" class="mr_10" />
                <select v-model="item.opt1" style="width: 60px">
                  <option v-for="{ value, label } in opt1s" :key="value" :value="value">{{ label }}</option>
                </select>
                <span class="ellipsis" style="display: inline-block; width: 60px; vertical-align: text-bottom">{{
                  item.showName
                }}</span>
                <select v-model="item.opt2" style="width: 60px" class="ml_10">
                  <option v-for="{ value, label } in opt1s" :key="value" :value="value">{{ label }}</option>
                </select>
                <input v-model="item.zdy2" v-enter-number="2" type="text" style="width: 75px" />
              </p>
            </div>
            <a
              v-if="item.type == 1"
              @click="
                conditionConfig.nodeUserList = [];
                $func.removeEle(conditionConfig.conditionList, item, 'columnId');
              "
              >删除</a
            >
            <a v-if="item.type == 2" @click="$func.removeEle(conditionConfig.conditionList, item, 'columnId')">删除</a>
          </li>
        </ul>
        <el-button theme="primary" @click="addCondition">添加条件</el-button>
        <el-dialog v-model="conditionVisible" title="选择条件" :width="480" append-to-body class="condition_list">
          <p>请选择用来区分审批流程的条件字段</p>
          <p class="check_box">
            <a
              :class="$func.toggleClass(conditionList, { columnId: 0 }, 'columnId') && 'active'"
              @click="$func.toChecked(conditionList, { columnId: 0 }, 'columnId')"
              >发起人</a
            >
            <a
              v-for="(item, index) in conditions"
              :key="index"
              :class="$func.toggleClass(conditionList, item, 'columnId') && 'active'"
              @click="$func.toChecked(conditionList, item, 'columnId')"
              >{{ item.showName }}</a
            >
          </p>
          <template #footer>
            <el-button @click="conditionVisible = false">取 消</el-button>
            <el-button theme="primary" @click="sureCondition">确 定</el-button>
          </template>
        </el-dialog>
      </div>
      <employees-role-dialog
        v-model:visible="conditionRoleVisible"
        :data="checkedList"
        :is-department="true"
        @change="sureConditionRole"
      />
      <div class="demo-drawer__footer clear">
        <el-button theme="primary" @click="saveCondition">确 定</el-button>
        <el-button @click="closeDrawer">取 消</el-button>
      </div>
    </div> -->
  </t-drawer>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

// import { conditionData } from '../api';
// import employeesRoleDialog from '../dialog/employeesRoleDialog.vue';
import { useStore } from '../store';
// import { opt1s, optTypes } from '../utils/const';
import $func from '../utils/index';

// const conditionVisible = ref(false);
const conditionsConfig = ref({
  conditionNodes: [],
});
const conditionConfig = ref<any>({});
const PriorityLevel = ref(0);
// const conditions = ref([]);
// const conditionList = ref([]);
// const checkedList = ref([]);
// const conditionRoleVisible = ref(false);

const store = useStore();
const { setCondition, setConditionsConfig } = store;
// const tableId = computed(() => store.tableId);
const conditionsConfig1 = computed(() => store.conditionsConfig1);
const conditionDrawer = computed(() => store.conditionDrawer);
const visible = computed({
  get() {
    return conditionDrawer.value;
  },
  set() {
    closeDrawer();
  },
});
watch(conditionsConfig1, (val) => {
  conditionsConfig.value = val.value;
  PriorityLevel.value = val.priorityLevel;
  conditionConfig.value = val.priorityLevel
    ? conditionsConfig.value.conditionNodes[val.priorityLevel - 1]
    : { nodeUserList: [], conditionList: [] };
});

// const changeOptType = (item) => {
//   if (item.optType == 1) {
//     item.zdy1 = 2;
//   } else {
//     item.zdy1 = 1;
//     item.zdy2 = 2;
//   }
// };
// const toStrChecked = (item, key) => {
//   const a = item.zdy1 ? item.zdy1.split(',') : [];
//   const isIncludes = $func.toggleStrClass(item, key);
//   if (!isIncludes) {
//     a.push(key);
//     item.zdy1 = a.toString();
//   } else {
//     removeStrEle(item, key);
//   }
// };
// const removeStrEle = (item, key) => {
//   const a = item.zdy1 ? item.zdy1.split(',') : [];
//   let includesIndex;
//   a.map((item, index) => {
//     if (item == key) {
//       includesIndex = index;
//     }
//   });
//   a.splice(includesIndex, 1);
//   item.zdy1 = a.toString();
// };
// const addCondition = async () => {
//   conditionList.value = [];
//   conditionVisible.value = true;
//   //   const { data } = await getConditions({ tableId: tableId.value });
//   conditions.value = conditionData;
//   if (conditionConfig.value.conditionList) {
//     for (let i = 0; i < conditionConfig.value.conditionList.length; i++) {
//       var { columnId } = conditionConfig.value.conditionList[i];
//       if (columnId == 0) {
//         conditionList.value.push({ columnId: 0 });
//       } else {
//         conditionList.value.push(
//           conditions.value.filter((item) => {
//             return item.columnId == columnId;
//           })[0],
//         );
//       }
//     }
//   }
// };
// const sureCondition = () => {
//   // 1.弹窗有，外面无+
//   // 2.弹窗有，外面有不变
//   for (let i = 0; i < conditionList.value.length; i++) {
//     const { columnId, showName, columnName, showType, columnType, fixedDownBoxValue } = conditionList.value[i];
//     if ($func.toggleClass(conditionConfig.value.conditionList, conditionList.value[i], 'columnId')) {
//       continue;
//     }
//     if (columnId == 0) {
//       conditionConfig.value.nodeUserList = [];
//       conditionConfig.value.conditionList.push({
//         type: 1,
//         columnId,
//         showName: '发起人',
//       });
//     } else if (columnType == 'Double') {
//       conditionConfig.value.conditionList.push({
//         showType,
//         columnId,
//         type: 2,
//         showName,
//         optType: '1',
//         zdy1: '2',
//         opt1: '<',
//         zdy2: '',
//         opt2: '<',
//         columnDbname: columnName,
//         columnType,
//       });
//     } else if (columnType == 'String' && showType == '3') {
//       conditionConfig.value.conditionList.push({
//         showType,
//         columnId,
//         type: 2,
//         showName,
//         zdy1: '',
//         columnDbname: columnName,
//         columnType,
//         fixedDownBoxValue,
//       });
//     }
//   }
//   // 3.弹窗无，外面有-
//   for (let i = conditionConfig.value.conditionList.length - 1; i >= 0; i--) {
//     if (!$func.toggleClass(conditionList.value, conditionConfig.value.conditionList[i], 'columnId')) {
//       conditionConfig.value.conditionList.splice(i, 1);
//     }
//   }
//   conditionConfig.value.conditionList.sort(function (a, b) {
//     return a.columnId - b.columnId;
//   });
//   conditionVisible.value = false;
// };
const saveCondition = () => {
  closeDrawer();
  const a = conditionsConfig.value.conditionNodes.splice(PriorityLevel.value - 1, 1); // 截取旧下标
  conditionsConfig.value.conditionNodes.splice(conditionConfig.value.priorityLevel - 1, 0, a[0]); // 填充新下标
  conditionsConfig.value.conditionNodes.map((item, index) => {
    item.priorityLevel = index + 1;
    return item;
  });
  for (let i = 0; i < conditionsConfig.value.conditionNodes.length; i++) {
    conditionsConfig.value.conditionNodes[i].error =
      $func.conditionStr(conditionsConfig.value, i) === '请设置条件' &&
      i !== conditionsConfig.value.conditionNodes.length - 1;
  }
  setConditionsConfig({
    value: conditionsConfig.value,
    flag: true,
    id: conditionsConfig1.value.id,
  });
};
// const addConditionRole = () => {
//   conditionRoleVisible.value = true;
//   checkedList.value = conditionConfig.value.nodeUserList;
// };
// const sureConditionRole = (data) => {
//   conditionConfig.value.nodeUserList = data;
//   conditionRoleVisible.value = false;
// };
const closeDrawer = () => {
  setCondition(false);
};
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.condition_copyer {
  .priority_level {
    position: absolute;
    top: 11px;
    right: 60px;
    width: 100px;
    height: 32px;
    background: rgb(255 255 255 / 100%);
    border-radius: 4px;
    border: 1px solid rgb(217 217 217 / 100%);
    font-size: 12px;
  }

  .condition_content {
    padding: 20px 20px 0;

    p.tip {
      margin: 20px 0;
      width: 510px;
      text-indent: 17px;
      line-height: 45px;
      background: rgb(241 249 255 / 100%);
      border: 1px solid rgb(64 163 247 / 100%);
      color: #46a6fe;
      font-size: 14px;
    }

    ul {
      max-height: 500px;
      overflow-y: scroll;
      margin-bottom: 20px;

      li {
        & > span {
          float: left;
          margin-right: 8px;
          width: 70px;
          line-height: 32px;
          text-align: right;
        }

        & > div {
          display: inline-block;
          width: 370px;

          & > p:not(:last-child) {
            margin-bottom: 10px;
          }
        }

        &:not(:last-child) > div > p {
          margin-bottom: 20px;
        }

        & > a {
          float: right;
          margin-right: 10px;
          margin-top: 7px;
        }

        select,
        input {
          width: 100%;
          height: 32px;
          background: rgb(255 255 255 / 100%);
          border-radius: 4px;
          border: 1px solid rgb(217 217 217 / 100%);
        }

        select + input {
          width: 260px;
        }

        select {
          margin-right: 10px;
          width: 100px;
        }

        p.selected_list {
          padding-left: 10px;
          border-radius: 4px;
          min-height: 32px;
          border: 1px solid rgb(217 217 217 / 100%);
          word-break: break-word;
        }

        p.check_box {
          line-height: 32px;
        }
      }
    }

    .el-button {
      margin-bottom: 20px;
    }
  }
}

.condition_list {
  .el-dialog__body {
    padding: 16px 26px;
  }

  p {
    color: #666;
    margin-bottom: 10px;

    & > .check_box {
      margin-bottom: 0;
      line-height: 36px;
    }
  }
}
</style>
