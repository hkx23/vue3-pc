<template>
  <t-drawer
    v-model:visible="visible"
    header="审批人设置"
    size="550px"
    class="set_promoter"
    :close-btn="true"
    :footer="false"
    @close="saveApprover"
  >
    <div class="demo-drawer__content">
      <div class="drawer_content">
        <div class="approver_content">
          <t-radio-group v-model="approverConfig.settype" class="clear" :options="setTypes" @change="changeType">
            <!-- <t-radio v-for="{ value, label } in setTypes" :key="value" :value="value">{{ label }}</t-radio> -->
          </t-radio-group>
          <div>
            <bcmp-select-business
              v-if="approverConfig.settype == 1"
              v-model="defaultApprover"
              is-multiple
              type="person"
              title="添加/修改人员"
              @selection-change="sureApprover"
            ></bcmp-select-business>
          </div>
        </div>
        <div v-if="approverConfig.settype == 2" class="approver_manager">
          <p>
            <span>发起人的：</span>
            <select v-model="approverConfig.directorLevel">
              <option v-for="item in props.directorMaxLevel" :key="item" :value="item">
                {{ item == 1 ? '直接' : '第' + item + '级' }}主管
              </option>
            </select>
          </p>
          <p class="tip">找不到主管时，由上级主管代审批</p>
        </div>
        <div v-if="approverConfig.settype == 5" class="approver_self">
          <p>该审批节点设置“发起人自己”后，审批人默认为发起人</p>
        </div>
        <div v-show="approverConfig.settype == 4" class="approver_self_select">
          <t-radio-group v-model="approverConfig.selectMode" style="width: 100%">
            <t-radio v-for="{ value, label } in selectModes" :key="value" :value="value">{{ label }}</t-radio>
          </t-radio-group>
          <h3>选择范围</h3>
          <t-radio-group v-model="approverConfig.selectRange" style="width: 100%" @change="changeRange">
            <t-radio v-for="{ value, label } in selectRanges" :key="value" :value="value">{{ label }}</t-radio>
          </t-radio-group>
          <template v-if="approverConfig.selectRange == 2 || approverConfig.selectRange == 3">
            <bcmp-select-business
              v-if="approverConfig.selectRange == 2"
              v-model="defaultApprover"
              is-multiple
              type="person"
              title="添加/修改人员"
              @selection-change="sureApprover"
            ></bcmp-select-business>
            <bcmp-select-business
              v-else
              v-model="defaultApproverRole"
              is-multiple
              type="role"
              title="添加/修改角色"
              @selection-change="sureRoleApprover"
            ></bcmp-select-business>
          </template>
        </div>
        <div v-if="approverConfig.settype == 7" class="approver_manager">
          <p>审批终点</p>
          <p style="padding-bottom: 20px">
            <span>发起人的：</span>
            <select v-model="approverConfig.examineEndDirectorLevel">
              <option v-for="item in directorMaxLevel" :key="item" :value="item">
                {{ item == 1 ? '最高' : '第' + item }}层级主管
              </option>
            </select>
          </p>
        </div>
        <div
          v-if="
            (approverConfig.settype == 1 && approverConfig.nodeUserList.length > 1) ||
            approverConfig.settype == 2 ||
            (approverConfig.settype == 4 && approverConfig.selectMode == 2)
          "
          class="approver_some"
        >
          <p>多人审批时采用的审批方式</p>
          <t-radio-group v-model="approverConfig.examineMode" class="clear">
            <t-radio :value="1">依次审批</t-radio>
            <br />
            <t-radio v-if="approverConfig.settype != 2" :value="2">会签(须所有审批人同意)</t-radio>
          </t-radio-group>
        </div>
        <div v-if="approverConfig.settype == 2 || approverConfig.settype == 7" class="approver_some">
          <p>审批人为空时</p>
          <t-radio-group v-model="approverConfig.noHanderAction" class="clear">
            <t-radio :value="1">自动审批通过/不允许发起</t-radio>
            <br />
            <t-radio :value="2">转交给审核管理员</t-radio>
          </t-radio-group>
        </div>
      </div>
    </div>
  </t-drawer>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useStore } from '../store';
import { selectModes, selectRanges, setTypes } from '../utils/const';
import $func from '../utils/index';

const props = defineProps({
  directorMaxLevel: {
    type: Number,
    default: 0,
  },
});

const defaultApprover = ref('');
const defaultApproverRole = ref('');

const approverConfig = ref<any>({});
const store = useStore();
const { setApproverConfig, setApprover } = store;
const approverConfig1 = computed(() => store.approverConfig1);
const approverDrawer = computed(() => store.approverDrawer);
const visible = computed({
  get() {
    return approverDrawer.value;
  },
  set() {
    closeDrawer();
  },
});
watch(approverConfig1, (val) => {
  approverConfig.value = val.value;
});
const changeRange = () => {
  approverConfig.value.nodeUserList = [];
};
const changeType = (val) => {
  approverConfig.value.nodeUserList = [];
  approverConfig.value.examineMode = 1;
  approverConfig.value.noHanderAction = 2;
  if (val === 2) {
    approverConfig.value.directorLevel = 1;
  } else if (val === 4) {
    approverConfig.value.selectMode = 1;
    approverConfig.value.selectRange = 1;
  } else if (val === 7) {
    approverConfig.value.examineEndDirectorLevel = 1;
  }
};
const sureApprover = (data) => {
  approverConfig.value.nodeUserList = data.map((t) => ({
    label: t.personName,
    value: t.id,
  }));
};
const sureRoleApprover = (data) => {
  approverConfig.value.nodeUserList = data;
};
const saveApprover = () => {
  approverConfig.value.error = !$func.setApproverStr(approverConfig.value);
  setApproverConfig({
    value: approverConfig.value,
    flag: true,
    id: approverConfig1.value.id,
  });
  closeDrawer();
};
const closeDrawer = () => {
  setApprover(false);
};
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.set_promoter {
  .approver_content {
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
  }

  .approver_self_select,
  .approver_content {
    .t-button {
      margin-bottom: 20px;
    }
  }

  .approver_content,
  .approver_some,
  .approver_self_select {
    .t-radio-group {
      display: unset;
    }

    .t-radio {
      width: 45%;
      margin-bottom: 20px;
      height: 16px;
    }
  }

  .approver_manager p {
    line-height: 32px;
  }

  .approver_manager select {
    width: 420px;
    height: 32px;
    background: rgb(255 255 255 / 100%);
    border-radius: 4px;
    border: 1px solid rgb(217 217 217 / 100%);
  }

  .approver_manager p.tip {
    margin: 10px 0 22px;
    font-size: 12px;
    line-height: 16px;
    color: #f8642d;
  }

  .approver_self {
    padding: 28px 20px;
  }

  .approver_self_select,
  .approver_manager,
  .approver_content,
  .approver_some {
    padding: 20px 20px 0;
  }

  .approver_manager p:first-of-type,
  .approver_some p {
    line-height: 19px;
    font-size: 14px;
    margin-bottom: 14px;
  }

  .approver_self_select h3 {
    margin: 5px 0 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
  }
}
</style>
