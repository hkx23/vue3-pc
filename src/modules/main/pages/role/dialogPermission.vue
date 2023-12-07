<template>
  <t-dialog v-model:visible="visible" mode="full-screen" :footer="false" @close="close">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ title }}</span>
        <!-- <t-button :loading="loading" style="float: right" @click="save">{{ t('common.button.save') }}</t-button> -->
      </t-space>
    </template>
    <!-- 功能类型与筛选框 -->
    <t-row>
      <t-col flex="auto">
        <t-radio-group variant="primary-filled" default-value="1">
          <t-radio-button value="1">全部</t-radio-button>
          <t-radio-button value="2">PC端</t-radio-button>
          <t-radio-button value="3">移动端</t-radio-button>
          <t-radio-button value="4">电视端</t-radio-button>
          <t-radio-button value="5">手表端</t-radio-button>
          <t-radio-button value="6">微信端</t-radio-button>
        </t-radio-group>
      </t-col>
      <t-col flex="250px">
        <t-input v-model="searchKey" placeholder="请输入关键词搜索" clearable>
          <template #suffixIcon>
            <t-icon name="search" :style="{ cursor: 'pointer' }" />
          </template>
        </t-input>
      </t-col>
    </t-row>

    <t-row>
      <t-col flex="230px" style="margin-top: 16px">
        <t-menu v-model:expanded="expanded" class="menu-area" default-value="2-1" height="550px" :collapsed="collapsed">
          <t-submenu v-for="item in permissionData" :key="item.id" :value="item.id" :title="item.moduleName">
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
        <t-checkbox v-model="isAllCheck" :indeterminate="isAllIndeterminate" @change="checkAll()">全选</t-checkbox>
        <t-collapse
          :borderless="true"
          :default-value="['ojbk2']"
          expand-icon-placement="right"
          :expand-on-row-click="false"
        >
          <!-- 如果没有按钮权限，图标不显示 -->
          <t-collapse-panel v-for="item in moduleData" :key="item.id" :value="item.id" :expand-icon="false">
            <template #header>
              <t-checkbox v-model="item.enabled" lazy-load @change="moduleCheckChange">{{
                item.moduleName
              }}</t-checkbox></template
            >
          </t-collapse-panel>
          <!-- 如果有按钮权限，图标显示，可以展开显示按钮权限列表 -->
          <!-- <t-collapse-panel value="ojbk2">
            <template #header> <t-checkbox>过站扫描2</t-checkbox></template>
            <t-space break-line size="8">
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
            </t-space>
          </t-collapse-panel>
          <t-collapse-panel value="ojbk4">
            <template #header> <t-checkbox>过站扫描2</t-checkbox></template>
            <t-space break-line size="8">
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
            </t-space>
          </t-collapse-panel>
          <t-collapse-panel value="ojbk3">
            <template #header> <t-checkbox>过站扫描2</t-checkbox></template>
            <t-space break-line size="8">
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
              <div class="buttonPermissionItem">
                <div>按钮权限</div>
                <t-checkbox>允许</t-checkbox>
              </div>
            </t-space>
          </t-collapse-panel> -->
        </t-collapse>
      </t-col>
    </t-row>
  </t-dialog>
</template>

<script setup lang="ts">
// #region import

// import { MessagePlugin } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { api } from '@/api/main';

// import { useLang } from './lang';
// #endregion

// 使用多语言
// const { t } = useLang();
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
const searchKey = ref('');
const collapsed = ref(false);
const expanded = ref(['2', '3']);
const isAllCheck = ref(false);
const isAllIndeterminate = ref(false);
const permissionData = ref([]);
const checkAll = () => {
  console.log(isAllCheck.value);
};
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
const moduleCheckChange = (ckecked: boolean, context: { e: Event }) => {
  console.log(ckecked);
  console.log(context);
};
const close = () => {
  console.log('关闭窗口');
};
// 加载角色数据表格
const fetchPermissionData = async () => {
  // setLoading(true);
  try {
    const data = (await api.permission.getTreePermissionsByRoleId({ roleId: Number(props.id) })) as any;
    permissionData.value = data;
    const result = [];
    for (const rootNode of permissionData.value) {
      getThirdLevelNodes(rootNode, 1, result);
    }

    moduleData.value = result;
  } catch (e) {
    console.log(e);
  } finally {
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

watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    // 打开时候加载数据
    fetchPermissionData();
  }
});
// watch(permissionData, (value: any) => {
//   const result = [];
//   getThirdLevelNodes(value, 1, result);
//   moduleData.value = result;
// });
</script>

<style lang="less" scoped>
.menu-area {
  box-shadow: 4px 4px 6px 4px rgb(0 0 0 / 20%);
}

.module-area {
  box-shadow: 4px 4px 6px 4px rgb(0 0 0 / 20%);
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
