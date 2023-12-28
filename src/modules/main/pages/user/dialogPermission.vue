<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<template>
  <t-dialog
    v-model:visible="visible"
    mode="full-screen"
    :header="false"
    :footer="false"
    class="permission-dialog"
    @close="close"
  >
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <t-tabs v-model="tabValue">
      <t-tab-panel :value="1" label="用户权限/隶属角色" :destroy-on-hide="false">
        <!-- #region 角色选择框 -->
        <cmp-container :full="true">
          <cmp-card :span="12" :ghost="true">
            <!-- 查询组件  -->
            <cmp-query :opts="opts" label-width="100" @submit="conditionEnter" />
            <!-- 表格组件  -->
          </cmp-card>
          <cmp-card :span="12" :ghost="true">
            <cmp-table
              ref="roleTableRef"
              row-key="id"
              max-height="70vh"
              :show-toolbar="false"
              :table-column="tableColumns"
              :table-data="tableFilterData"
              :loading="tableloading"
              :show-pagination="false"
              @refresh="conditionEnter"
              @select-change="roleChange"
            >
            </cmp-table>
          </cmp-card>
        </cmp-container>
        <!-- #endregion 角色选择框结束 -->
      </t-tab-panel>
      <t-tab-panel :value="2" label="用户权限/权限配置" :destroy-on-hide="false">
        <template #panel>
          <!-- 功能类型与筛选框 -->
          <cmp-container :full="true">
            <cmp-card :ghost="true">
              <t-row>
                <t-col flex="auto">
                  <t-radio-group v-model="selectClientType" variant="primary-filled" @change="changeClientType">
                    <t-radio-button value="0">{{ t('business.main.all') }}</t-radio-button>
                    <t-radio-button
                      v-for="clientType in clientTypeOption"
                      :key="clientType.value"
                      :value="clientType.value"
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
            </cmp-card>
            <cmp-card ref="treeCard" :ghost="true">
              <t-row>
                <t-col flex="330px" class="module-area" style="margin-top: 16px; padding: 8px; margin-left: 0">
                  <t-tree
                    ref="tree"
                    :data="originPermissionTreeData"
                    hover
                    :keys="keyList"
                    activable
                    :checkable="false"
                    expand-all
                    :transition="true"
                    :expand-on-click-node="false"
                    :line="true"
                    :icon="true"
                    :height="treeHeight"
                    :actived="[treeClickActive]"
                    :scroll="{
                      rowHeight: 10,
                      bufferSize: 10,
                      threshold: 10,
                      type: 'virtual',
                    }"
                    @active="onActive"
                    @click="treeClick"
                  >
                    <template #label="{ node }">
                      <t-space :size="8"
                        ><t-icon v-if="node?.data" :name="node?.data.iconPath" /><span> {{ node.label }}</span></t-space
                      >
                    </template>
                  </t-tree>
                  <!-- <t-menu
          v-model="selectedMenu"
          v-model:expanded="expanded"
          class="menu-area"
          height="550px"
          :collapsed="collapsed"
          @change="menuChange"
        >
          <t-menu-item value="0" :title="t('business.main.all')"> {{ t('business.main.all') }} </t-menu-item>
          <t-submenu v-for="item in originPermissionData" :key="item.id" :value="item.id" :title="item.moduleName">
           
            <template #title>
              <span>{{ item.moduleName }}</span>
            </template>
            <t-menu-item v-for="brach in item.children" :key="brach.id" :value="brach.id">
              {{ brach.moduleName }}
            </t-menu-item>
          </t-submenu>

        </t-menu> -->
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
                        <t-checkbox
                          v-model="item.enabled"
                          :disabled="item.disable"
                          :value="item.permissionId"
                          @change="moduleCheckChange"
                          >{{ item.moduleName }}</t-checkbox
                        ></template
                      >
                      <template #headerRightContent>
                        <t-checkbox
                          v-model="item.refuse"
                          :disabled="item.refuseDisable"
                          :value="item.permissionId"
                          @change="moduleRefuseCheckChange"
                          >拒绝</t-checkbox
                        ></template
                      >

                      <t-space break-line size="8">
                        <div
                          v-for="buttionItem in item.buttons"
                          :key="buttionItem.id"
                          class="buttonPermissionItem"
                          :value="buttionItem.id"
                        >
                          <div>{{ buttionItem.permissionName }}</div>
                          <t-checkbox
                            v-model="buttionItem.enabled"
                            :disabled="item.disable"
                            :value="buttionItem.permissionId"
                            @change="buttonCheckChange"
                            >允许</t-checkbox
                          >
                          <t-checkbox
                            v-model="buttionItem.refuse"
                            :disabled="item.refuseDisable"
                            :value="buttionItem.permissionId"
                            @change="buttonRefuseCheckChange"
                            >拒绝</t-checkbox
                          >
                        </div>
                      </t-space>
                    </t-collapse-panel>
                  </t-collapse>
                </t-col>
              </t-row>
            </cmp-card>
          </cmp-container>
        </template>
      </t-tab-panel>
    </t-tabs>
  </t-dialog>
</template>

<script setup lang="ts">
// #region import

// import { MessagePlugin } from 'tdesign-vue-next';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, UserAuthDTO, UserRoleDTO } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';

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

const roleTableRef = ref<any>(null);

// 查询组件
const opts = computed(() => {
  return {
    roleName: {
      label: t('user.roleName'),
      comp: 't-input',
      defaultVal: '',
    },
    roleCode: {
      label: t('user.roleCode'),
      comp: 't-input',
      defaultVal: '',
    },
  };
});
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);

// 筛选表格结果数据
const tableFilterData = ref([]);

const { loading: tableloading, setLoading } = useLoading();

const tabValue = ref(1);
const filterPermissionName = ref('');
const expanded = ref([]);
const isAllCheck = ref(false);
const isAllIndeterminate = ref(false);
const originPermissionData = ref([]);
const permissionData = ref([]);
const expandedValues = ref([]);
const selectClientType = ref('0');
const loading = ref(false);

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
// 树状结构定义
const keyList = ref({ value: 'id', label: 'moduleName', children: 'children' });
// 树节点高亮 有两个参数
const treeClickActive = ref('0');
const onActive = (vals: any) => {
  [treeClickActive.value] = vals;
};
const selectedMenu = ref(null);
const treeCard = ref(null);
const treeHeight = ref('400px');
useResizeObserver(treeCard, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  treeHeight.value = `${height - 80}px`;
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 点击查询按钮
const conditionEnter = (data: any) => {
  filterList.value = [];
  for (const key in data) {
    const addFilter = {
      field: key,
      operator: 'EQ',
      value: data[key],
    };
    if (key === 'roleName') addFilter.operator = 'LIKE';
    if (addFilter.value) {
      filterList.value.push(addFilter);
    }
  }
  filterRoleTable();
};

const filterRoleTable = () => {
  // 针对以上筛选条件，对tableData数据源进行筛选，筛选结果存进 tableFilterData
  tableFilterData.value = tableData.value.filter((item: any) => {
    return filterList.value.every((filter: any) => {
      switch (filter.operator) {
        case 'EQ':
          return item[filter.field] === filter.value;
        case 'LIKE':
          return item[filter.field].includes(filter.value);
        default:
          return false;
      }
    });
  });
};
// 表格列配置
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
  },
  { title: `${t('user.roleCode')}`, colKey: 'roleCode' },
  { title: `${t('user.roleName')}`, colKey: 'roleName' },
  { title: `${t('user.eId')}`, colKey: 'enName' },
  { title: `${t('user.org')}`, colKey: 'plantName' },
  { title: `${t('user.roleDesc')}`, colKey: 'roleDesc' },
];

// 加载角色数据表格
const fetchRoleTable = async () => {
  setLoading(true);
  try {
    // 查询条件
    // const searchCondition = {
    //   pageNum: 1,
    //   pageSize: 99999,
    //   filters: filterList.value,
    // };

    const data = (await api.userInRole.getUserInRoleListByUserId({ userId: props.id })) as any;
    const list = data;
    // 如果列表项目oid等于0，plantCode与plantName都为全部
    list.forEach((element) => {
      if (element.oid === 0) {
        element.plantCode = t('business.main.all');
        element.plantName = t('business.main.all');
      }
    });
    tableData.value = list;
    dataTotal.value = data.total;
    // selectedRowKeys等于结果集中relate为true的id
    const selectKeys = list.filter((item) => item.relate).map((item) => item.id);
    roleTableRef.value.setSelectedRowKeys(selectKeys);
    filterRoleTable();
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
const roleChange = (values: any) => {
  console.log(values);
  const userDatas: UserRoleDTO = {
    userId: props.id,
    roleIds: values,
  };

  api.userInRole
    .modifyUserInRoleFromUser(userDatas)
    .then(() => {
      MessagePlugin.success(t('user.setUserRolesSuccess'));
      fetchRoleTable();
    })
    .catch((err) => {
      MessagePlugin.error(err.message);
    });
};

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
const moduleRefuseCheckChange = (checkResult: boolean, e: any) => {
  const postIds = [];
  const selectedModuleId = e.e.target.value;
  postIds.push(selectedModuleId);
  // const postRows = _.filter(moduleData.value, (item) => {
  //   return item.permissionId === selectedModuleId;
  // });
  // if (postRows.length > 0 && postRows[0].buttons.length > 0) {
  //   // 循环 postRows[0].buttons
  //   for (let i = 0; i < postRows[0].buttons.length; i++) {
  //     postIds.push(postRows[0].buttons[i].permissionId);
  //   }
  // }
  if (checkResult) {
    console.log('模块拒绝-Y');
    onRefusePermission(postIds);
  } else {
    console.log('模块取消拒绝-Y');
    onCancelRefusePermission(postIds);
  }
};

const buttonCheckChange = (checkResult: boolean, e: any) => {
  if (checkResult) {
    onAddPermission([e.e.target.value]);
  } else {
    onDeletrPermission([e.e.target.value]);
  }
};
const buttonRefuseCheckChange = (checkResult: boolean, e: any) => {
  if (checkResult) {
    console.log('拒绝-Y');
    onRefusePermission([e.e.target.value]);
  } else {
    console.log('拒绝-N');
    onCancelRefusePermission([e.e.target.value]);
    // onDeletrPermission([e.e.target.value]);
  }
};

// const menuChange = (active) => {
//   selectedMenu.value = active;
//   treeMenuChange();
// };
const searchChange = (value: string) => {
  filterPermissionName.value = value;
  treeMenuChange();
};

const onRefusePermission = async (rows: string[]) => {
  const params: UserAuthDTO = {
    userId: props.id,
    permissionIds: rows,
  };
  await api.userAuthorization.forbidden(params);
  updateOriginPermissionData(originPermissionData.value, rows, false, true);
  updateOriginPermissionData(permissionData.value, rows, false, true);
  MessagePlugin.success('拒绝成功');
};

const onCancelRefusePermission = async (rows: string[]) => {
  const params: UserAuthDTO = {
    userId: props.id,
    permissionIds: rows,
  };
  await api.userAuthorization.batchDelete(params);
  updateOriginPermissionData(originPermissionData.value, rows, true, false);
  updateOriginPermissionData(permissionData.value, rows, true, false);
  MessagePlugin.success('取消拒绝成功');
};

const onAddPermission = async (rows: string[]) => {
  const params: UserAuthDTO = {
    userId: props.id,
    permissionIds: rows,
  };
  await api.userAuthorization.batchAdd(params);
  updateOriginPermissionData(originPermissionData.value, rows, true, false);
  updateOriginPermissionData(permissionData.value, rows, true, false);
  MessagePlugin.success(t('common.message.addSuccess'));
};
const onDeletrPermission = async (rows: string[]) => {
  const params: UserAuthDTO = {
    userId: props.id,
    permissionIds: rows,
  };
  await api.userAuthorization.batchDelete(params);

  updateOriginPermissionData(originPermissionData.value, rows, false, false);
  updateOriginPermissionData(permissionData.value, rows, false, false);
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
    const data = (await api.permission.getTreePermissionsByUserId({ userId: props.id })) as any;
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
  moduleData.value
    .filter((item) => !item.disable)
    .forEach((item) => {
      item.enabled = isAllCheck.value;
    });
  if (isAllCheck.value) {
    const addPermissionIds = moduleData.value
      .filter((item) => item.enabled && !item.disable)
      .map((item) => item.permissionId);

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
    updateOriginPermissionData(originPermissionData.value, addPermissionIds, true, false);
    updateOriginPermissionData(permissionData.value, addPermissionIds, true, false);
  } else {
    const deletePermissionIds = moduleData.value
      .filter((item) => !item.enabled && !item.disable)
      .map((item) => item.permissionId);
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
    updateOriginPermissionData(originPermissionData.value, deletePermissionIds, false, false);
    updateOriginPermissionData(permissionData.value, deletePermissionIds, false, false);
  }
};
// 更新originPermissionData的方法
const updateOriginPermissionData = (data, permissionIds, enabled, refuse) => {
  data.forEach((item) => {
    if (permissionIds.indexOf(item.permissionId) > -1) {
      if (item.isFromRole === 'Y' && !refuse) {
        if (item.isForbiddenRole === '0') {
          item.enabled = true;
        } else {
          item.enabled = false;
        }
      } else {
        item.enabled = enabled;
      }

      item.refuse = refuse;
    }
    if (item.children && item.children.length > 0) {
      updateOriginPermissionData(item.children, permissionIds, enabled, refuse);
    }
    if (item.buttons && item.buttons.length > 0) {
      updateOriginPermissionData(item.buttons, permissionIds, enabled, refuse);
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
  if (selectedMenu.value.id !== '0') {
    if (selectedMenu.value.moduleLevel !== 'ROOT') {
      result = result && node.parentModuleId === selectedMenu.value.id;
    } else {
      result = result && selectedMenu.value.children.map((item) => item.id).includes(node.parentModuleId);
    }
  }
  // if (selectedMenu.value !== '0') {
  //   result = result && node.parentModuleId === selectedMenu.value;
  // }
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
function clearSecondLevelChildren(node) {
  const newNode = { ...node };
  if (node.children && Array.isArray(node.children)) {
    newNode.children = node.children.map((child) => {
      const childNode = { ...child };
      delete childNode.children;
      return childNode;
    });
  }
  return newNode;
}
// 树节点的点击事件，获取点击节点的文本
const treeClick = async ({ node }: { node: any }) => {
  console.log(node);
  selectedMenu.value = node.data;
  treeMenuChange();
};

const processTree = (treeArray) => {
  return treeArray.map((node) => clearSecondLevelChildren(node));
};
const originPermissionTreeData = computed(() => {
  const resultData = processTree(originPermissionData.value);
  // 在resultData头部插入一条全部数据
  resultData.unshift({
    id: '0',
    moduleName: '全部',
    iconPath: 'home',
  });
  return resultData;
});
watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    // 打开时候加载数据
    tabValue.value = 1;
    selectedMenu.value = { id: '0' };
    treeClickActive.value = '0';
    fetchRoleTable();
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
  height: calc(100vh - 200px);
  padding: 16px;

  :deep(.t-tree__label) {
    width: calc(100% - 20px);
    padding: 8px;
  }

  :deep(.t-is-active .t-tree__label) {
    color: var(--td-brand-color);
  }
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
