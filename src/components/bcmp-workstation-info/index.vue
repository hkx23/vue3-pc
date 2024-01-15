<template>
  <cmp-card :ghost="true">
    <t-space :size="8">
      <!-- <t-button
        shape="square"
        variant="text"
        style="height: 24px; width: 24px; float: right"
        @click="formImportVisible = true"
        ><t-icon size="16px" name="system-setting"
      /></t-button> -->
      <t-breadcrumb :max-item-width="'150'">
        <t-breadcrumbItem> {{ orgName || '-' }} </t-breadcrumbItem>
        <t-breadcrumbItem> {{ currUserOrgInfo.workShopName ?? '车间未设置' }} </t-breadcrumbItem>
        <t-breadcrumbItem>{{ currUserOrgInfo.workCenterName ?? '产线未设置' }}</t-breadcrumbItem>
        <t-breadcrumbItem :max-width="'160'"> {{ currUserOrgInfo.workStationName ?? '工站未设置' }} </t-breadcrumbItem>
      </t-breadcrumb>
      <t-link theme="primary" @click="formImportVisible = true">切换工站</t-link>
    </t-space>
  </cmp-card>

  <t-dialog
    v-model:visible="formImportVisible"
    :close-on-overlay-click="false"
    :cancel-btn="null"
    :confirm-btn="null"
    header="设置工站"
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
          @selection-change="
            (val) => {
              orgInfo.workShopCode = val.orgCode;
              orgInfo.workShopName = val.orgName;
            }
          "
        ></bcmp-select-business>
      </t-form-item>

      <t-form-item label="工作中心">
        <bcmp-select-business
          v-model="orgInfo.workCenterId"
          :parent-id="orgInfo.workShopId"
          type="workcenter"
          :show-title="false"
          @selection-change="
            (val) => {
              orgInfo.workCenterCode = val.wcCode;
              orgInfo.workCenterName = val.wcName;
            }
          "
        ></bcmp-select-business>
      </t-form-item>

      <t-form-item label="工站">
        <bcmp-select-business
          v-model="orgInfo.workStationId"
          :parent-id="orgInfo.workCenterId"
          type="workstationAuth"
          :show-title="false"
          @selection-change="
            (val) => {
              orgInfo.processId = val.processId;
              orgInfo.processCode = '';
              orgInfo.processName = '';
              orgInfo.workStationCode = val.workstationCode;
              orgInfo.workStationName = val.workstationName;
            }
          "
        ></bcmp-select-business>
      </t-form-item>
    </t-form>

    <template #footer>
      <t-button theme="default" variant="base" @click="cancelSave">取消</t-button>
      <t-button theme="primary" @click="onClickSaveOrg">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="tsx" name="BcmpWorkstationInfo">
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
