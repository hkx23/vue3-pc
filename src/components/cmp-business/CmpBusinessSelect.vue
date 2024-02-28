<template>
  <t-select-input
    v-bind="targetAttrs"
    v-model:input-value="inputValue"
    @popup-visible-change="onPopupVisibleChange"
    @tag-change="onTagChange"
    @input-change="onInputChange"
    @clear="onClear"
  >
    <template #panel>
      <div class="container">
        <t-row class="body">
          <t-col flex="1" class="content left">
            <p class="header">{{ props.name }}列表</p>
            <t-list
              v-if="listAfterSearch"
              :async-loading="asyncLoading"
              style="flex: 1; overflow-y: auto"
              @load-more="onLoadMore"
              @scroll="onScrollList"
            >
              <t-list-item
                v-for="item in listAfterSearch"
                :key="item?.row.id"
                class="select-item"
                @click="onClickItem(item)"
              >
                <cmp-list-item-meta
                  :avatar-label="item.cmp?.avatarLabel"
                  :name="item.cmp?.name || item.label"
                  :sub-name="item.cmp?.subName"
                  :code="item.cmp?.code"
                  :description="item.cmp?.description || item.value"
                  :show-icon="item.cmp?.showIcon"
                  :suffix-tag="item.cmp?.suffixTag"
                ></cmp-list-item-meta>
              </t-list-item>
            </t-list>
            <div v-else style="flex: 1; overflow-y: auto">
              <t-tree :data="listData" hover expand-on-click-node :load="onLoadTreeNodes" value-mode="all">
                <template #label="{ node }">
                  <div v-if="node.data?.row?.children">
                    {{ node.label }}
                  </div>
                  <div v-else>
                    <cmp-list-item-meta
                      :avatar-label="node.data.cmp?.avatarLabel"
                      :name="node.data.cmp?.name || node.data.label"
                      :sub-name="node.data.cmp?.subName"
                      :code="node.data.cmp?.code"
                      :description="node.data.cmp?.description || node.data.value"
                      :show-icon="node.data.cmp?.showIcon"
                      :suffix-tag="node.data.cmp?.suffixTag"
                      @click="onClickItem(node.data)"
                    ></cmp-list-item-meta>
                  </div>
                </template>
              </t-tree>
            </div>
          </t-col>
          <t-col v-if="props.multiple" flex="1" class="content right">
            <p class="header">
              已选{{ props.name }}
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
              <t-list-item v-for="item in selectValues as BusinessItem[]" :key="item?.row.id" class="select-item">
                <cmp-list-item-meta
                  :avatar-label="item.cmp?.avatarLabel"
                  :name="item.cmp?.name || item.label"
                  :sub-name="item.cmp?.subName"
                  :code="item.cmp?.code"
                  :description="item.cmp?.description || item.value"
                  :show-icon="item.cmp?.showIcon"
                  :suffix-tag="item.cmp?.suffixTag"
                ></cmp-list-item-meta>
                <template #action>
                  <t-button variant="text" shape="square" class="close-btn" @click="onClickCloseItem(item.row.id)">
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
import { ListProps, SelectInputProps, TreeNodeModel, TreeProps } from 'tdesign-vue-next';
import { TypeTreeOptionData } from 'tdesign-vue-next/es/tree/adapt';
import { computed, ref, useAttrs, watch } from 'vue';

import CmpListItemMeta from './CmpListItemMeta.vue';
import { BusinessItem } from './constants';

export interface CmpBusinessSelectProps extends Omit<SelectInputProps, 'options'> {
  mode?: 'read' | 'edit';
  type?: 'tree' | 'list';
  plain?: boolean;
  name: string;
  fetchData: (pageIndex?: number) => Promise<BusinessItem[]>;
  fetchSearchData: (keyword: string, listData: any[]) => Promise<BusinessItem[]>;
  fetchTreeNodeData?: (
    key: string | number,
    children: BusinessItem[],
    node?: TreeNodeModel<TypeTreeOptionData>,
  ) => Promise<BusinessItem[]>;
}

const props = withDefaults(defineProps<CmpBusinessSelectProps>(), {
  mode: 'edit',
  type: 'list',
  inputValue: '',
  popupVisible: false,
  allowInput: true,
  clearable: true,
});

const attrs: Partial<CmpBusinessSelectProps> = useAttrs();
const targetAttrs = computed<CmpBusinessSelectProps>(() => {
  const newProps = {} as CmpBusinessSelectProps;
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
    if (isEmpty(listData.value)) {
      fetchListData();
    }
  }
};
const asyncLoading = ref<ListProps['asyncLoading']>('load-more');
const onLoadMore: ListProps['onLoadMore'] = () => {
  if (asyncLoading.value === '') return;
  asyncLoading.value = 'loading';
  pageIndex.value++;
  fetchListData();
};
const onScrollList: ListProps['onScroll'] = debounce((e) => {
  if (e.scrollBottom <= 1) {
    onLoadMore(null);
  }
}, 200);

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
      if (newVal && !Array.isArray(selectValues.value)) {
        selectValues.value = [];
      } else if (!newVal && Array.isArray(selectValues.value)) {
        selectValues.value = undefined;
      }
    }
  },
);

const listData = ref<BusinessItem[]>([]);
const pageIndex = ref(1);
const fetchListData = async () => {
  const result = await props.fetchData(pageIndex.value);
  if (result.length === 0) {
    asyncLoading.value = '';
  } else {
    asyncLoading.value = pageIndex.value === 1 && result.length < 10 ? '' : 'load-more';
    listData.value = [...listData.value, ...result];
  }

  if (props.type === 'list') {
    listAfterSearch.value = listData.value;
  }
};

const selectValues = ref<BusinessItem | BusinessItem[]>(undefined);
const onClickItem = (item: BusinessItem) => {
  if (props.multiple) {
    if (!Array.isArray(selectValues.value)) {
      selectValues.value = [];
    }
    if (selectValues.value.findIndex((t) => t.row.id === item.row.id) >= 0) return;
    selectValues.value.push(item);
  } else {
    selectValues.value = item;
    onClickConfirm();
  }
};
const onClickCloseItem = (id: string) => {
  if (Array.isArray(selectValues.value)) {
    selectValues.value = selectValues.value.filter((t) => t.row.id !== id);
  }
};
const onClickCloseAll = () => {
  selectValues.value = [];
};

const onClickConfirm = () => {
  emit('update:value', selectValues.value);
  popupVisible.value = false;
};

const onTagChange: SelectInputProps['onTagChange'] = (_currentTags, context) => {
  const { trigger, index } = context;
  if (trigger === 'clear') {
    selectValues.value = [];
  }
  if (['tag-remove', 'backspace'].includes(trigger) && Array.isArray(selectValues.value)) {
    selectValues.value.splice(index, 1);
  }
  emit('update:value', selectValues.value);
};

const listAfterSearch = ref<BusinessItem[]>(undefined);
const onInputChange: SelectInputProps['onInputChange'] = debounce(async (val, _context) => {
  if (isEmpty(val)) {
    listAfterSearch.value = props.type === 'list' ? listData.value : undefined;
    return;
  }

  listAfterSearch.value = await props.fetchSearchData(val, listData.value);
}, 500);

const onLoadTreeNodes: TreeProps['load'] = (node) => {
  console.log('🚀 ~ node:', node);
  return props?.fetchTreeNodeData(node.data.row?.id as string, node.data.row?.children as BusinessItem[], node);
};
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
