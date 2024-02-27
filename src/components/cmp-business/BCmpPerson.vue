<template>
  <t-select-input
    v-bind="targetAttrs"
    v-model:input-value="inputValue"
    @popup-visible-change="onPopupVisibleChange"
    @tag-change="onTagChange"
    @input-change="onInputChange"
  >
    <template #panel>
      <div class="container">
        <t-row class="body">
          <t-col flex="1" class="content left">
            <p class="header">部门</p>
            <t-list v-if="listAfterSearch" style="flex: 1; overflow-y: auto">
              <t-list-item
                v-for="item in listAfterSearch"
                :key="item?.info.id"
                class="select-item"
                @click="onClickPerson(item)"
              >
                <cmp-list-item-meta :name="item.info.personName" :description="item.info.email"></cmp-list-item-meta>
              </t-list-item>
            </t-list>
            <div v-else style="flex: 1; overflow-y: auto">
              <t-tree :data="treeData" hover expand-on-click-node :filter="filterByText" :load="load" value-mode="all">
                <template #label="{ node }">
                  <div v-if="node.data.info">
                    <cmp-list-item-meta
                      :name="node.label"
                      :description="node.data.info.email"
                      @click="onClickPerson(node.data)"
                    ></cmp-list-item-meta>
                  </div>
                  <div v-else>
                    {{ node.label }}
                  </div>
                </template>
              </t-tree>
            </div>
          </t-col>
          <t-col v-if="props.multiple" flex="1" class="content right">
            <p class="header">
              已选人员
              <t-link
                class="clear-all"
                hover="color"
                theme="primary"
                size="small"
                :disabled="isEmpty(selectValues)"
                @click="onClickCloseAll"
              >
                清空已选
              </t-link>
            </p>
            <t-list style="flex: 1; overflow-y: auto">
              <t-list-item v-for="item in selectValues" :key="item?.info.id" class="select-item">
                <cmp-list-item-meta :name="item.info.personName" :description="item.info.email"></cmp-list-item-meta>
                <template #action>
                  <t-button variant="text" shape="square" class="close-btn" @click="onClickClosePerson(item.info.id)">
                    <close-icon />
                  </t-button>
                </template>
              </t-list-item>
            </t-list>
          </t-col>
        </t-row>
        <div v-if="props.multiple" class="footer">
          <t-button theme="default" @click="popupVisible = false">取消</t-button>
          <t-button theme="primary" @click="onClickConfirm">确定</t-button>
        </div>
      </div>
    </template>
    <template #suffixIcon>
      <chevron-down-icon />
    </template>
  </t-select-input>
</template>
<script setup lang="tsx">
import { debounce, isEmpty } from 'lodash';
import { ChevronDownIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { SelectInputProps, TreeOptionData, TreeProps } from 'tdesign-vue-next';
import { computed, ref, useAttrs, watch } from 'vue';

import { AdminOrgVO, api as mainApi } from '@/api/main';

import CmpListItemMeta from './CmpListItemMeta.vue';

export interface BCmpPersonProps extends Omit<SelectInputProps, 'options'> {
  mode?: 'read' | 'edit';
  plain?: boolean;
}

const props = withDefaults(defineProps<BCmpPersonProps>(), {
  mode: 'edit',
  inputValue: '',
  popupVisible: false,
  allowInput: true,
  clearable: true,
});

const attrs: Partial<BCmpPersonProps> = useAttrs();
const targetAttrs = computed<BCmpPersonProps>(() => {
  const newProps = {} as BCmpPersonProps;
  const isRead = props.mode === 'read';
  newProps.borderless = isRead;
  newProps.readonly = isRead;
  newProps.popupVisible = popupVisible.value;

  if (!props.value && props.multiple) {
    newProps.value = [];
  }
  newProps.popupProps = {
    overlayInnerStyle: {
      width: props.multiple ? '580px' : '350px',
      padding: 0,
    },
  };

  return { ...attrs, ...props, ...newProps };
});
const emit = defineEmits(['update:value', 'update:popupVisible']);
const inputValue = ref(props.inputValue);
const popupVisible = ref(props.popupVisible);

const onPopupVisibleChange = (val: boolean) => {
  popupVisible.value = val;

  if (val) {
    onClickCloseAll();
    if (isEmpty(treeData.value)) {
      fetchTreeData();
    }
  }
};

watch(
  () => props.popupVisible,
  (newVal) => {
    popupVisible.value = newVal;
  },
);

watch(
  () => popupVisible.value,
  (newVal) => {
    emit('update:popupVisible', newVal);
  },
);

watch(
  () => props.multiple,
  (newVal) => {
    if (selectValues.value) {
      if (newVal && !Array.isArray(selectValues.value.value)) {
        selectValues.value = [];
      } else if (!newVal && Array.isArray(selectValues.value.value)) {
        selectValues.value = '';
      }
    }
  },
);

const filterByText = ref();
const treeData = ref<TreeOptionData[]>([]);
const fetchTreeData = async () => {
  const tree = await mainApi.adminOrg.tree();
  treeData.value = formatOrgData(tree);
  flatten(tree);
};
const formatOrgData = (list: AdminOrgVO[]) => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    return {
      label: t.orgName,
      value: t.id,
      // children: !isEmpty(t.children),
      children: true,
    };
  });
};
const formatPersonData = (list: any[]) => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    t.personName = t.personName || t.personCode;
    return {
      label: t.personName,
      value: t.id + t.personCode,
      children: false,
      info: t,
    };
  });
};

const flattenOrgObj: { [key: string]: AdminOrgVO } = {};
const flatten = (tree: AdminOrgVO[]) => {
  tree?.forEach((item) => {
    flattenOrgObj[item.id] = item;

    if (item?.children && item.children.length > 0) {
      flatten(item?.children);
    }
  });
};

const load: TreeProps['load'] = (node) => {
  return new Promise((resolve) => {
    mainApi.person
      .getlist({
        state: -1,
        adminorgid: node.value as number,
        pagenum: 1,
        pagesize: 1000,
        personcode: '',
        personname: '',
        sortfield: '',
        sorttype: '',
        filterfield: '',
        filter: '',
      })
      .then((data: any) => {
        const personNodes = formatPersonData(data.list as any[]);
        const orgNodes = formatOrgData(flattenOrgObj[node.value]?.children);
        const nodes: TreeOptionData[] = [...personNodes, ...orgNodes];
        resolve(nodes);
      });
  });
};

const selectValues = ref(undefined);
const onClickPerson = (item) => {
  if (props.multiple) {
    if (selectValues.value.findIndex((t) => t.info.id === item.info.id) >= 0) return;
    selectValues.value.push(item);
  } else {
    selectValues.value = item;
    onClickConfirm();
  }
};
const onClickClosePerson = (id: string) => {
  selectValues.value = selectValues.value.filter((t) => t.info.id !== id);
};
const onClickCloseAll = () => {
  selectValues.value = [];
};

const onClickConfirm = () => {
  emit('update:value', selectValues.value);
  popupVisible.value = false;
};

const onTagChange: SelectInputProps['onTagChange'] = (currentTags, context) => {
  const { trigger, index } = context;
  if (trigger === 'clear') {
    selectValues.value = [];
  }
  if (['tag-remove', 'backspace'].includes(trigger)) {
    selectValues.value.splice(index, 1);
  }
  emit('update:value', selectValues.value);
};

const listAfterSearch = ref(undefined);
const onInputChange: SelectInputProps['onInputChange'] = debounce(async (val, _context) => {
  if (isEmpty(val)) {
    listAfterSearch.value = undefined;
    return;
  }
  const data = (await mainApi.person.getlist({
    state: -1,
    adminorgid: -1,
    pagenum: 1,
    pagesize: 20,
    personcode: val,
    personname: '',
    sortfield: '',
    sorttype: '',
    filterfield: '',
    filter: '',
  })) as any;

  listAfterSearch.value = formatPersonData(data.list as any[]);
}, 500);
</script>
<style scoped lang="less">
.container {
  > .body {
    padding: 0 16px;

    > .content {
      height: 330px;
      display: flex;
      flex-direction: column;

      &.right {
        margin: 10px 0;
        padding-left: 10px !important;
        border-left: 1px solid var(--td-border-level-1-color);
      }

      &.left {
        margin-top: 10px;
        margin-right: 10px;
      }

      > .header {
        margin-top: 0;
        font-size: 12px;
        color: #36434d;
        line-height: 20px;
        padding: 5px 0;

        .clear-all {
          float: right;
        }
      }
    }
  }

  > .footer {
    text-align: right;
    padding: 10px 15px;
    border-top: 1px solid var(--td-border-level-1-color);
  }
}

.select-item {
  &:hover {
    background-color: var(--td-bg-color-container-hover);
    border-radius: var(--td-radius-default);
  }
}

.close-btn {
  color: var(--td-text-color-placeholder);

  &:hover {
    color: var(--td-text-color-primary);
  }
}
</style>
