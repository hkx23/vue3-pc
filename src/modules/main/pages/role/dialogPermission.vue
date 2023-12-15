<template>
  <t-dialog v-model:visible="visible" mode="full-screen" :footer="false" @close="close">
    <t-loading :loading="loading" :text="t('common.message.loading')" fullscreen />
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ title }}</span>
        <!-- <t-button :loading="loading" style="float: right" @click="save">{{ t('common.button.save') }}</t-button> -->
      </t-space>
    </template>
    <!-- 功能类型与筛选框 -->
    <t-row>
      <t-col flex="auto">
        <t-radio-group v-model="selectClientType" variant="primary-filled" @change="changeClientType">
          <t-radio-button value="0">{{ t('business.main.all') }}</t-radio-button>
          <t-radio-button v-for="clientType in clientTypeOption" :key="clientType.value" :value="clientType.value"
            >{{ clientType.label }}
          </t-radio-button>
        </t-radio-group>
      </t-col>
      <t-col flex="250px">
        <t-input
          v-model="filterPermissionName"
          :placeholder="t('common.placeholder.plsenterkeyword')"
          clearable
          @change="searchChange"
        >
          <template #suffixIcon>
            <t-icon name="search" :style="{ cursor: 'pointer' }" />
          </template>
        </t-input>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="230px" style="margin-top: 16px">
        <t-menu
          v-model="selectedMenu"
          v-model:expanded="expanded"
          class="menu-area"
          height="550px"
          :collapsed="collapsed"
          @change="menuChange"
        >
          <t-menu-item value="0" :title="t('business.main.all')"> {{ t('business.main.all') }} </t-menu-item>
          <t-submenu v-for="item in originPermissionData" :key="item.id" :value="item.id" :title="item.moduleName">
            <!-- <template #icon>
              <t-icon name="control-platform" />
            </template> -->
            <template #title>
              <span>{{ item.moduleName }}</span>
            </template>
            <t-menu-item v-for="brach in item.children" :key="brach.id" :value="brach.id">
              {{ brach.moduleName }}
            </t-menu-item>
          </t-submenu>

          <!-- <template #operations>
            <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
              <template #icon><t-icon name="view-list" /></template>
            </t-button>
          </template> -->
        </t-menu>
      </t-col>
      <t-col flex="1" class="module-area" style="padding: 8px">
        <t-checkbox v-model="isAllCheck" :indeterminate="isAllIndeterminate" @change="checkAll()">{{
          t('common.button.selectAll')
        }}</t-checkbox>
        <t-collapse
          v-model="expandedValues"
          :borderless="true"
          expand-icon-placement="right"
          :expand-on-row-click="false"
        >
          <!-- 如果没有按钮权限，图标不显示 -->
          <t-collapse-panel
            v-for="item in moduleData"
            :key="item.id"
            :value="item.id"
            :expand-icon="item.buttons.length > 0"
          >
            <template #header>
              <t-checkbox v-model="item.enabled" :value="item.permissionId" @change="moduleCheckChange">{{
                item.moduleName
              }}</t-checkbox></template
            >
            <t-space break-line size="8">
              <div
                v-for="buttionItem in item.buttons"
                :key="buttionItem.id"
                class="buttonPermissionItem"
                :value="buttionItem.id"
              >
                <div>{{ buttionItem.permissionName }}</div>
                <t-checkbox v-model="buttionItem.enabled" :value="buttionItem.permissionId" @change="buttonCheckChange"
                  >允许</t-checkbox
                >
              </div>
            </t-space>
          </t-collapse-panel>
        </t-collapse>
      </t-col>
    </t-row>
  </t-dialog>
</template>

<script setup lang="ts">
// #region import

// import { MessagePlugin } from 'tdesign-vue-next';
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { api, RoleAuthDTO } from '@/api/main';

import { useLang } from './lang';
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
});
const filterPermissionName = ref('');
const collapsed = ref(false);
const expanded = ref([]);
const isAllCheck = ref(false);
const isAllIndeterminate = ref(false);
const originPermissionData = ref([]);

const selectedMenu = ref('');
const selectClientType = ref('0');
const loading = ref(false);
const permissionData = ref([]);
const expandedValues = ref([]);

const moduleData = ref([]);
const emit = defineEmits(['update:modelValue', 'submit']);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
// const changeCollapsed = () => {
//   collapsed.value = !collapsed.value;
// };
const moduleCheckChange = (checkResult: boolean, e: any) => {
  const postIds = [];
  const selectedModuleId = e.e.target.value;
  postIds.push(selectedModuleId);
  const postRows = _.filter(moduleData.value, (item) => {
    return item.permissionId === selectedModuleId;
  });
  if (postRows.length > 0 && postRows[0].buttons.length > 0) {
    // 循环 postRows[0].buttons
    for (let i = 0; i < postRows[0].buttons.length; i++) {
      postIds.push(postRows[0].buttons[i].permissionId);
    }
  }
  if (checkResult) {
    onAddPermission(postIds);
  } else {
    onDeletrPermission(postIds);
  }
};
const buttonCheckChange = (checkResult: boolean, e: any) => {
  if (checkResult) {
    onAddPermission([e.e.target.value]);
  } else {
    onDeletrPermission([e.e.target.value]);
  }
};

const menuChange = (active) => {
  selectedMenu.value = active;
  treeMenuChange();
};
const searchChange = (value: string) => {
  filterPermissionName.value = value;
  treeMenuChange();
};
const onAddPermission = async (rows: string[]) => {
  const params: RoleAuthDTO = {
    roleId: props.id,
    permissionIds: rows,
  };
  await api.roleAuthorization.add(params);
  updateOriginPermissionData(originPermissionData.value, rows, true);
  updateOriginPermissionData(permissionData.value, rows, true);
  MessagePlugin.success(t('common.message.addSuccess'));
};
const onDeletrPermission = async (rows: string[]) => {
  const params: RoleAuthDTO = {
    roleId: props.id,
    permissionIds: rows,
  };
  await api.roleAuthorization.delete(params);

  updateOriginPermissionData(originPermissionData.value, rows, false);
  updateOriginPermissionData(permissionData.value, rows, false);
  MessagePlugin.success(t('common.message.deleteSuccess'));
};

const changeClientType = () => {
  treeMenuChange();
};
const close = () => {
  console.log('关闭窗口');
};
const clientTypeOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'S_CLIENT_TYPE' }).then((data) => {
  clientTypeOption.value = data;
});
// 加载角色数据表格
const fetchPermissionData = async () => {
  loading.value = true;
  // setLoading(true);
  try {
    const data = (await api.permission.getTreePermissionsByRoleId({ roleId: Number(props.id) })) as any;
    originPermissionData.value = data;
    expanded.value = originPermissionData.value.map((item) => item.id);

    treeMenuChange();
    // moduleData.value = result;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
    // setLoading(false);
  }
};

const getThirdLevelNodes = (node, level, result) => {
  if (level === 3) {
    // 判断是否为第三层节点
    result.push(node);
    return;
  }

  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      getThirdLevelNodes(child, level + 1, result); // 递归调用，进入下一层节点
    }
  }
};
const checkAll = () => {
  moduleData.value.forEach((item) => {
    item.enabled = isAllCheck.value;
  });
  if (isAllCheck.value) {
    const addPermissionIds = moduleData.value.filter((item) => item.enabled).map((item) => item.permissionId);

    moduleData.value.forEach((item) => {
      item.buttons.forEach((button) => {
        addPermissionIds.push(button.permissionId);
      });
    });

    if (addPermissionIds.length > 0) {
      onAddPermission(addPermissionIds);
    }
    // 根据addPermissionIds去筛选originPermissionData的所有数据，包括所有children的数据，符合item.permissionId in addPermissionIds的数据项，设置enabled为true
    // originPermissionData可能为无限级
    updateOriginPermissionData(originPermissionData.value, addPermissionIds, true);
    updateOriginPermissionData(permissionData.value, addPermissionIds, true);
  } else {
    const deletePermissionIds = moduleData.value.filter((item) => !item.enabled).map((item) => item.permissionId);
    moduleData.value.forEach((item) => {
      item.buttons.forEach((button) => {
        deletePermissionIds.push(button.permissionId);
      });
    });
    if (deletePermissionIds.length > 0) {
      onDeletrPermission(deletePermissionIds);
    }
    // 根据addPermissionIds去筛选originPermissionData的所有数据，包括所有children的数据，符合item.permissionId in addPermissionIds的数据项，设置enabled为false
    // originPermissionData可能为无限级
    updateOriginPermissionData(originPermissionData.value, deletePermissionIds, false);
    updateOriginPermissionData(permissionData.value, deletePermissionIds, false);
  }
};
// 更新originPermissionData的方法
const updateOriginPermissionData = (data, permissionIds, enabled) => {
  data.forEach((item) => {
    if (permissionIds.indexOf(item.permissionId) > -1) {
      item.enabled = enabled;
    }
    if (item.children && item.children.length > 0) {
      updateOriginPermissionData(item.children, permissionIds, enabled);
    }
    if (item.buttons && item.buttons.length > 0) {
      updateOriginPermissionData(item.buttons, permissionIds, enabled);
    }
  });
};
const fnFilter = (node) => {
  let result = true;
  const filterName = _.toString(filterPermissionName.value).trim().toLowerCase();

  if (filterName) {
    result = result && _.toString(node.permissionName).toLowerCase().indexOf(filterName) > -1;
  }
  if (selectClientType.value !== '0') {
    const selectClientTypeNum = Number(selectClientType.value);
    const nodeClientType = Number(node.clientType);
    // eslint-disable-next-line no-bitwise
    const nodeClientTypeResult = (nodeClientType & selectClientTypeNum) !== 0;
    result = result && nodeClientTypeResult;
  }
  if (selectedMenu.value !== '0') {
    result = result && node.parentModuleId === selectedMenu.value;
  }
  // if (self.isRoleOwn) {
  //   result =
  //     result &&
  //     (node.IS_ENABLED ||
  //       (node.IS_FROM_ROLE == "Y" && node.IS_FORBIDDEN_ROLE == "N"));
  // }
  return result;
};
const treeFilter = (tree, func) => {
  // 使用map复制一下节点，避免修改到原树
  return tree
    .map((node) => ({ ...node }))
    .filter((node) => {
      node.children = node.children && treeFilter(node.children, func);
      return func(node) || (node.children && node.children.length);
    });
};
const treeMenuChange = () => {
  permissionData.value = treeFilter(originPermissionData.value, fnFilter);
};

watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    // 打开时候加载数据
    selectedMenu.value = '0';
    fetchPermissionData();
  }
});
watch(
  permissionData,
  (value: any) => {
    const result = [];
    for (const rootNode of value) {
      getThirdLevelNodes(rootNode, 1, result);
    }
    moduleData.value = result;
    expandedValues.value = result.filter((item) => item.buttons && item.buttons.length > 0).map((item) => item.id);
    // moduleData筛选出enabled为true的节点
    // 如果全部为true,则isAllCheck设置为true,否则设置成false
    // 如果有部分为true,则isAllIndeterminate设置为true
    const enabled = moduleData.value.filter((item) => item.enabled);
    isAllCheck.value = enabled.length === moduleData.value.length;
    isAllIndeterminate.value = enabled.length > 0 && enabled.length < moduleData.value.length;
  },
  { deep: true },
);
</script>

<style lang="less" scoped>
.menu-area {
  box-shadow: var(--td-shadow-1);
}

.module-area {
  box-shadow: var(--td-shadow-1);
  overflow: auto;
  margin-top: 16px;
  margin-left: 16px;
  max-height: calc(100vh - 200px);
  padding: 8px;
}

.buttonPermissionItem {
  display: block;
  line-height: 2;
  padding: 4px 8px;
  border: 1px solid rgb(128 128 128 / 30%);
  border-radius: 4px;
  margin: 4px;
  width: 150px;
}
</style>
