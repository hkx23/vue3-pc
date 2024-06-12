<template>
  <cmp-card :ghost="true">
    <t-space :size="8">
      <t-breadcrumb>
        <t-breadcrumbItem>广州工厂</t-breadcrumbItem>
        <t-breadcrumbItem>机加车间</t-breadcrumbItem>
        <t-breadcrumbItem>机加一线</t-breadcrumbItem>
        <t-breadcrumbItem>折弯机0001</t-breadcrumbItem>
      </t-breadcrumb>
      <t-link theme="primary" @click="formImportVisible = true">切换设备</t-link>
    </t-space>
  </cmp-card>

  <t-dialog
    v-model:visible="formImportVisible"
    :close-on-overlay-click="false"
    :cancel-btn="null"
    :confirm-btn="null"
    header="设置设备"
  >
    <t-form>
      <t-form-item label="组织">
        {{ orgName || '-' }}
      </t-form-item>
      <t-form-item label="车间">
        <bcmp-select-business
          v-model="orgInfo.workShopId"
          :parent-id="orgInfo.orgId"
          type="workshop"
          :show-title="false"
          @selection-change="workshopChange"
        ></bcmp-select-business>
      </t-form-item>

      <t-form-item label="工作中心">
        <bcmp-select-business
          v-model="orgInfo.workCenterId"
          :parent-id="orgInfo.workShopId"
          type="workcenter"
          :show-title="false"
          @selection-change="workcenterChange"
        ></bcmp-select-business>
      </t-form-item>

      <t-form-item label="工站">
        <bcmp-select-business
          v-model="orgInfo.workStationId"
          :parent-id="orgInfo.workCenterId"
          type="workstationAuth"
          :show-title="false"
          @selection-change="workstationChange"
        ></bcmp-select-business>
      </t-form-item>
    </t-form>

    <template #footer>
      <t-button theme="default" variant="base" @click="cancelSave">取消</t-button>
      <t-button theme="primary" @click="onClickSaveOrg">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="tsx" name="BcmpEquipmentInfo">
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const currUserOrgInfo = ref(userStore.currUserOrgInfo);
// 导入表单是否显示
const formImportVisible = ref(false);
const orgInfo = ref({ ...userStore.currUserOrgInfo });
onMounted(() => {
  if (!orgInfo.value.workStationId) {
    formImportVisible.value = true;
  }
});

const emit = defineEmits(['change']);
const handleChange = (orgInfo) => {
  emit('change', orgInfo);
};

const onClickSaveOrg = async () => {
  if (orgInfo.value.processId) {
    const processInfo = await api.process.getItemById(orgInfo.value.processId);
    orgInfo.value.processCode = processInfo.processCode;
    orgInfo.value.processName = processInfo.processName;
  }
  userStore.updateOrg(orgInfo.value);
  currUserOrgInfo.value = userStore.currUserOrgInfo;
  handleChange(orgInfo.value);
  formImportVisible.value = false;
};
const workshopChange = (val) => {
  orgInfo.value.workShopCode = val.orgCode;
  orgInfo.value.workShopName = val.orgName;
  orgInfo.value.workCenterId = '';
  orgInfo.value.workCenterCode = '';
  orgInfo.value.workCenterName = '';
  orgInfo.value.workStationId = '';
  orgInfo.value.workStationCode = '';
  orgInfo.value.workStationName = '';
};

const workcenterChange = (val) => {
  orgInfo.value.workCenterCode = val.wcCode;
  orgInfo.value.workCenterName = val.wcName;
};

const workstationChange = (val) => {
  orgInfo.value.processId = val.processId;
  orgInfo.value.processCode = '';
  orgInfo.value.processName = '';
  orgInfo.value.workStationCode = val.workstationCode;
  orgInfo.value.workStationName = val.workstationName;
};

const orgName = computed(() => {
  const { orgs } = userStore.userInfo;
  let name = userStore.userInfo.orgId;
  for (const item of orgs) {
    if (item.id === name) {
      name = `${item.name}`;
      break;
    }
  }
  return name;
});
// 关闭模态框事件
const cancelSave = () => {
  formImportVisible.value = false;
};
</script>

<style lang="less" scoped>
:deep(.t-form__label) {
  color: var(--td-gray-color-7);
}

:deep(.t-breadcrumb) {
  padding: 0;
}
</style>
