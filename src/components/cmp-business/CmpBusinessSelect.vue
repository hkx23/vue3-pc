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
        <div v-if="$slots['filter']" class="filter-conditions">
          <slot name="filter"></slot>
        </div>
        <t-row v-if="props.type === 'table'" class="body">
          <t-col flex="1" class="content">
            <div class="full-list">
              <t-table
                v-bind="tableProps"
                :data="(isSearch ? listAfterSearch : listData) as TableRowData[]"
                @scroll-y="onTableScroll"
              >
              </t-table>
            </div>
          </t-col>
        </t-row>
        <t-row v-else class="body">
          <t-col flex="1" class="content left">
            <p class="header">
              {{ props.name }}列表
              <t-link
                v-show="isSearch && props.multiple"
                class="action-btn"
                hover="color"
                theme="primary"
                size="small"
                @click="onClickSelectAll"
              >
                全选
              </t-link>
            </p>
            <t-list v-if="isSearch" class="full-list">
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
                  :show-success="selectIds.indexOf(item.value) >= 0"
                ></cmp-list-item-meta>
              </t-list-item>
            </t-list>
            <t-list
              v-else-if="props.type === 'list'"
              class="full-list"
              :async-loading="asyncLoading"
              @load-more="onLoadMore"
              @scroll="onScrollList"
            >
              <t-list-item v-for="item in listData" :key="item?.row.id" class="select-item" @click="onClickItem(item)">
                <cmp-list-item-meta
                  :avatar-label="item.cmp?.avatarLabel"
                  :name="item.cmp?.name || item.label"
                  :sub-name="item.cmp?.subName"
                  :code="item.cmp?.code"
                  :description="item.cmp?.description || item.value"
                  :show-icon="item.cmp?.showIcon"
                  :suffix-tag="item.cmp?.suffixTag"
                  :show-success="selectIds.indexOf(item.value) >= 0"
                ></cmp-list-item-meta>
              </t-list-item>
            </t-list>
            <div v-else-if="props.type === 'tree'" class="full-list">
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
                      :show-success="selectIds.indexOf(node.data.value) >= 0"
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
                class="action-btn"
                hover="color"
                theme="primary"
                size="small"
                :disabled="isEmpty(selectItems)"
                @click="onClickCloseAll"
              >
                清空已选
              </t-link>
            </p>
            <t-list style="flex: 1; overflow-y: auto">
              <t-list-item v-for="item in selectItems as BusinessItem[]" :key="item?.row.id" class="select-item">
                <cmp-list-item-meta
                  :avatar-label="item.cmp?.avatarLabel"
                  :name="item.cmp?.name || item.label"
                  :sub-name="item.cmp?.subName"
                  :code="item.cmp?.code"
                  :description="item.cmp?.description || item.value"
                  :show-icon="item.cmp?.showIcon"
                  :suffix-tag="item.cmp?.suffixTag"
                  show-close-button
                  @close="onClickCloseItem(item.row.id)"
                ></cmp-list-item-meta>
              </t-list-item>
            </t-list>
          </t-col>
        </t-row>
        <div v-if="props.multiple" class="footer">
          <div class="toolbar">
            <slot name="toolbar"></slot>
          </div>
          <div class="btn-bar">
            <t-button theme="default" @click="popupVisible = false">取消</t-button>
            <t-button theme="primary" @click="onClickConfirm">确定</t-button>
          </div>
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
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { ListProps, SelectInputProps, TableProps, TableRowData, TreeNodeModel, TreeProps } from 'tdesign-vue-next';
import { TypeTreeOptionData } from 'tdesign-vue-next/es/tree/adapt';
import { computed, ref, useAttrs, watch } from 'vue';

import CmpListItemMeta from './CmpListItemMeta.vue';
import { BusinessItem } from './constants';

export interface CmpBusinessSelectProps extends Omit<SelectInputProps, 'options'> {
  mode?: 'read' | 'edit';
  type?: 'list' | 'table' | 'tree';
  plain?: boolean;
  name: string;
  popupWidth?: string;
  tableProps?: TableProps;
  fetchData: (pageIndex?: number) => Promise<BusinessItem[] | TableRowData[]>;
  fetchSearchData: (keyword: string, listData: any[]) => Promise<BusinessItem[] | TableRowData[]>;
  fetchTreeNodeData?: (
    key: string | number,
    children: any[],
    node?: TreeNodeModel<TypeTreeOptionData>,
  ) => Promise<BusinessItem[] | TableRowData[]>;
}

const defaultTableProps = {
  size: 'small',
  maxHeight: 328,
} as TableProps;

const selectedTableRowKeys = ref([]);
const fixedTableProps = computed<TableProps>(() => {
  let columns = [];
  if (props?.tableProps?.columns) {
    columns = [
      {
        colKey: 'row-select',
        type: props.multiple ? 'multiple' : 'single',
        width: 50,
      },
      ...props.tableProps.columns,
    ];
  }
  return {
    selectOnRowClick: true,
    selectedRowKeys: selectedTableRowKeys.value,
    asyncLoading: asyncLoading.value as unknown as TableProps['asyncLoading'],
    onAsyncLoadingClick: (_ctx) => {
      onLoadMore(null);
    },
    onSelectChange: (value, { selectedRowData }) => {
      selectedTableRowKeys.value = value;
      selectItems.value = selectedRowData;
      if (!props.multiple) {
        onClickConfirm();
      }
    },
    columns,
  } as TableProps;
});

const onTableScroll = debounce(({ e }: { e: WheelEvent }) => {
  const contentElement = e.target as HTMLElement;
  const { scrollTop, clientHeight, scrollHeight } = contentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    onLoadMore(null);
  }
}, 200);

const tableProps = computed<TableProps>(() => {
  return props.tableProps ? { ...defaultTableProps, ...props.tableProps, ...fixedTableProps.value } : undefined;
});

const props = withDefaults(defineProps<CmpBusinessSelectProps>(), {
  mode: 'edit',
  type: 'list',
  inputValue: '',
  popupWidth: undefined,
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
      width: props.popupWidth || (props.multiple ? '580px' : '350px'),
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
    if (selectItems.value) {
      if (newVal && !Array.isArray(selectItems.value)) {
        selectItems.value = [];
      } else if (!newVal && Array.isArray(selectItems.value)) {
        selectItems.value = undefined;
      }
    }
  },
);

const listData = ref<BusinessItem[] | TableRowData[]>([]);
const pageIndex = ref(1);
const fetchListData = async () => {
  const result = await props.fetchData(pageIndex.value);
  if (pageIndex.value === 1) {
    listData.value = [];
  }
  if (result.length === 0) {
    asyncLoading.value = '';
  } else {
    asyncLoading.value = pageIndex.value === 1 && result.length < 10 ? '' : 'load-more';
    listData.value = [...listData.value, ...result] as BusinessItem[];
  }
};

const selectIds = computed<string[]>(() => {
  if (props.multiple) {
    return (selectItems.value as BusinessItem[]).map((t) => t.value);
  }
  return [(selectItems.value as BusinessItem).value];
});
const selectItems = ref<BusinessItem | BusinessItem[] | TableRowData>(undefined);
const getIdByItem = (item: BusinessItem | TableRowData) => {
  return props.type === 'table' ? item.id : item.row.id;
};
const onClickItem = (item: BusinessItem | TableRowData, openReverse: boolean = true) => {
  if (props.multiple) {
    if (!Array.isArray(selectItems.value)) {
      selectItems.value = [];
    }
    const id = getIdByItem(item);
    if (selectItems.value.findIndex((t) => getIdByItem(t) === id) >= 0) {
      if (openReverse) {
        onClickCloseItem(id);
      }
      return;
    }
    selectItems.value.push(item);
  } else {
    selectItems.value = item;
    onClickConfirm();
  }
};
const onClickCloseItem = (id: string) => {
  if (Array.isArray(selectItems.value)) {
    selectItems.value = selectItems.value.filter((t) => getIdByItem(t) !== id);
  }
};
const onClickCloseAll = () => {
  selectItems.value = [];
};

const onClickSelectAll = () => {
  if (Array.isArray(selectItems.value) && listAfterSearch.value.length > 0) {
    listAfterSearch.value.forEach((item) => {
      onClickItem(item, false);
    });
  }
};

const onClickConfirm = () => {
  emit('update:value', selectItems.value);
  popupVisible.value = false;
};

const onTagChange: SelectInputProps['onTagChange'] = (_currentTags, context) => {
  const { trigger, index } = context;
  if (trigger === 'clear') {
    selectItems.value = [];
  }
  if (['tag-remove', 'backspace'].includes(trigger) && Array.isArray(selectItems.value)) {
    selectItems.value.splice(index, 1);
  }
  emit('update:value', selectItems.value);
};

const listAfterSearch = ref<BusinessItem[] | TableRowData[]>(undefined);
const isSearch = ref(false);
const onInputChange: SelectInputProps['onInputChange'] = debounce(async (val, _context) => {
  if (isEmpty(val)) {
    listAfterSearch.value = undefined;
    isSearch.value = false;
    return;
  }
  isSearch.value = true;
  listAfterSearch.value = await props.fetchSearchData(val, listData.value);
}, 500);

const onLoadTreeNodes: TreeProps['load'] = (node) => {
  return props?.fetchTreeNodeData(node.data.row?.id as string, node.data.row?.children as any[], node);
};

defineExpose({
  loadData: async () => {
    pageIndex.value = 1;
    await fetchListData();
  },
});
</script>
<style scoped lang="less">
.container {
  > .filter-conditions {
    padding: 10px 15px;
  }

  > .body {
    flex-flow: row nowrap;
    padding: 0 16px;

    &:has(.t-table) {
      padding: 1px;
    }

    :deep(.t-table) {
      font-size: 12px;
      border: 0;
    }

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

        .action-btn {
          float: right;
        }
      }

      > .full-list {
        flex: 1;
        overflow-y: auto;

        :deep(.t-tree__label:has(.b-item)) {
          padding: 0;
        }

        :deep(.t-tree__icon:empty) {
          width: 0;
        }
      }
    }
  }

  > .footer {
    padding: 10px 15px;
    border-top: 1px solid var(--td-border-level-1-color);

    > .toolbar {
      float: left;
      line-height: 36px;
    }

    > .btn-bar {
      float: right;
    }

    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
}

.select-item {
  padding: 0;

  &:hover {
    background-color: var(--td-bg-color-container-hover);
    border-radius: var(--td-radius-default);
  }
}
</style>
