<template>
  <div v-if="settingStore.enableEditingMode" class="panel-wrapper">
    <div class="search-input">
      <t-input v-model="filterText" placeholder="请输入" clearable>
        <template #suffix-icon>
          <search-icon size="var(--td-comp-size-xxxs)" />
        </template>
      </t-input>
    </div>
    <div v-for="item in groupedComponents" :key="item.category" class="comp-list">
      <h3>{{ item.category }}</h3>
      <t-list>
        <t-list-item
          v-for="comp in item.children"
          :key="comp.code"
          class="droppable-element"
          draggable="true"
          unselectable="on"
          @drag="onDrag(comp)"
          @dragend="onDragEnd(comp)"
        >
          <t-list-item-meta :title="comp.title" :description="comp.description" />
        </t-list-item>
      </t-list>
    </div>
  </div>
  <div ref="wrapperRef" :class="settingStore.enableEditingMode ? 'wrapper editable' : 'wrapper'">
    <div v-if="settingStore.enableEditingMode" class="btn">
      <t-button size="small" @click="onClickSaveLayout">保存</t-button>
      <t-button theme="default" size="small" @click="onClickCancelLayout">取消</t-button>
    </div>
    <grid-layout
      ref="gridLayoutRef"
      v-model:layout="layout"
      :col-num="8"
      :row-height="48"
      :margin="[12, 12]"
      :is-draggable="settingStore.enableEditingMode"
      :is-resizable="settingStore.enableEditingMode"
      vertical-compact
      use-css-transforms
    >
      <template #item="{ item }">
        <cmp-card
          v-for="comp in comps.filter((t) => t.code === item.i)"
          :key="comp.code"
          height="100%"
          :full="true"
          :ghost="comp.ghost"
          :title="comp.showTitle ? comp.title : ''"
          :subtitle="comp.showTitle ? comp.subtitle : ''"
          :is-mini="item.h <= 2"
        >
          <component :is="comp?.component" />
          <template #actions>
            <t-dropdown
              v-if="moreBtnOptions.length > 0"
              :options="moreBtnOptions"
              @click="(data) => onClickMore(data, item.i)"
            >
              <t-button shape="square" variant="text"><more-icon /></t-button>
            </t-dropdown>
          </template>
          <template v-if="!comp.ghost" #footer>
            <div style="float: right">
              <t-link v-if="comp?.redirect" size="small" @click="onClickRedirect(comp?.redirect)">
                更多
                <template #suffix-icon><t-icon name="chevron-right"></t-icon></template>
              </t-link>
            </div>
          </template>
        </cmp-card>
      </template>
    </grid-layout>
  </div>
</template>
<script setup lang="tsx">
import { GridLayout, LayoutItem } from 'grid-layout-plus';
import { MoreIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { openPage } from '@/router';
import { useSettingStore } from '@/store';

import { componentItem, components, groupedComponentItem } from './components';

const settingStore = useSettingStore();

const wrapperRef = ref<HTMLElement>();
const gridLayoutRef = ref<InstanceType<typeof GridLayout>>();
const moreBtnOptions = computed(() => {
  let result = [];
  if (settingStore.enableEditingMode) {
    result = [{ content: '删除面板', value: 'REMOVE_PANEL' }, ...result];
  }
  return result;
});
const onClickMore = (data, id) => {
  switch (data.value) {
    case 'REMOVE_PANEL':
      layout.value = layout.value.filter((item) => item.i !== id);
      break;

    default:
      break;
  }
};

const onClickRedirect = (path) => {
  openPage(path);
};

onMounted(() => {
  document.addEventListener('dragover', syncMousePosition);
  fetchCurrentUserLayout();
});

onBeforeUnmount(() => {
  document.removeEventListener('dragover', syncMousePosition);
});

const mouseAt = { x: -1, y: -1 };

const fetchCurrentUserLayout = async () => {
  const layoutInfo = await api.workbenchLayout.getByCurrentUser();
  if (layoutInfo && layoutInfo.layout) {
    layout.value = JSON.parse(layoutInfo.layout);
  }
};
const onClickSaveLayout = async () => {
  if (layout.value && layout.value.length > 0) {
    await api.workbenchLayout.saveByCurrentUser({
      layout: JSON.stringify(layout.value),
    });
    onClickCancelLayout();
  }
};

const onClickCancelLayout = () => {
  fetchCurrentUserLayout();
  settingStore.updateConfig({
    enableEditingMode: false,
  });
};

const syncMousePosition = (event: MouseEvent) => {
  mouseAt.x = event.clientX;
  mouseAt.y = event.clientY;
};

const layout = ref<LayoutItem[]>([]);
const filterText = ref('');
const comps = computed(() => {
  return filterText.value
    ? components.filter((t) => t.title.indexOf(filterText.value) >= 0 || t.description.indexOf(filterText.value) >= 0)
    : components;
});

const groupedComponents = computed<groupedComponentItem[]>(() => {
  return Object.values(
    comps.value.reduce((acc, cur) => {
      const { category } = cur;
      if (!acc[category]) {
        acc[category] = { category, children: [] };
      }
      acc[category].children.push(cur);
      return acc;
    }, {}),
  );
});

const onDrag = (dragItem: componentItem) => {
  const parentRect = wrapperRef.value?.getBoundingClientRect();

  if (!parentRect || !gridLayoutRef.value) return;

  const mouseInGrid =
    mouseAt.x > parentRect.left &&
    mouseAt.x < parentRect.right &&
    mouseAt.y > parentRect.top &&
    mouseAt.y < parentRect.bottom;

  if (mouseInGrid && !layout.value.find((item) => item.i === dragItem.code)) {
    layout.value.push({
      // ...dragItem,
      x: (layout.value.length * 2) % 8,
      y: layout.value.length + 8, // puts it at the bottom
      w: dragItem.w,
      h: dragItem.h,
      i: dragItem.code,
    });
  }

  const index = layout.value.findIndex((item) => item.i === dragItem.code);

  if (index !== -1) {
    const item = gridLayoutRef.value.getItem(dragItem.code);

    if (!item) return;

    try {
      item.wrapper.style.display = 'none';
    } catch (e) {
      /* empty */
    }

    Object.assign(item.state, {
      top: mouseAt.y - parentRect.top,
      left: mouseAt.x - parentRect.left,
    });
    const newPos = item.calcXY(mouseAt.y - parentRect.top, mouseAt.x - parentRect.left);

    if (mouseInGrid) {
      gridLayoutRef.value.dragEvent('dragstart', dragItem.code, newPos.x, newPos.y, dragItem.h, dragItem.w);
      dragItem.i = String(index);
      dragItem.x = layout.value[index].x;
      dragItem.y = layout.value[index].y;
    } else {
      gridLayoutRef.value.dragEvent('dragend', dragItem.code, newPos.x, newPos.y, dragItem.h, dragItem.w);
      layout.value = layout.value.filter((item) => item.i !== dragItem.code);
    }
  }
};

const onDragEnd = (dragItem) => {
  const parentRect = wrapperRef.value?.getBoundingClientRect();

  if (!parentRect || !gridLayoutRef.value) return;

  const mouseInGrid =
    mouseAt.x > parentRect.left &&
    mouseAt.x < parentRect.right &&
    mouseAt.y > parentRect.top &&
    mouseAt.y < parentRect.bottom;

  if (mouseInGrid) {
    gridLayoutRef.value.dragEvent('dragend', dragItem.code, dragItem.x, dragItem.y, dragItem.h, dragItem.w);
    layout.value = layout.value.filter((item) => item.i !== dragItem.code);
  } else {
    return;
  }

  layout.value.push({
    // ...dragItem,
    x: dragItem.x,
    y: dragItem.y,
    w: dragItem.w,
    h: dragItem.h,
    i: dragItem.code,
  });
  gridLayoutRef.value.dragEvent('dragend', dragItem.i, dragItem.x, dragItem.y, dragItem.h, dragItem.w);

  const item = gridLayoutRef.value.getItem(dragItem.code);

  if (!item) return;

  try {
    item.wrapper.style.display = '';
  } catch (e) {
    /* empty */
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  min-height: 100%;

  &.editable {
    .vgl-layout::before {
      position: absolute;
      width: calc(100% - 6px);
      height: calc(100% - 6px);
      margin: 6px;
      content: '';
      background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
        linear-gradient(to bottom, lightgrey 1px, transparent 1px);
      background-repeat: repeat;
      background-size: calc(calc(100% - 6px) / 8) 60px;
    }
  }

  .vgl-layout {
    min-height: 100%;
    background-color: transparent;

    :deep(> .vgl-item--placeholder) {
      background-color: rgb(69 69 69);
      opacity: 0.1;
      border-radius: var(--td-radius-medium);
    }

    :deep(.vgl-item:not(.vgl-item--placeholder)) {
      background-color: transparent;

      > .cmp-card {
        &.cmp-card-active {
          border: 4px solid var(--td-brand-color);
          border-radius: var(--td-radius-medium);
        }
      }
    }

    :deep(.vgl-item--resizing) {
      opacity: 0.9;
    }

    :deep(.vgl-item__resizer::before) {
      // border-color: transparent;
      border-color: rgb(69 69 69 / 20%);
    }

    :deep(.vgl-item--static) {
      background-color: #cce;
    }
  }

  .btn {
    position: absolute;
    right: 16px;
    top: calc(var(--td-comp-size-xxxl) + 1px);
    z-index: 5000;
  }
}

.panel-wrapper {
  position: absolute;
  top: var(--td-comp-size-xxxl);
  left: 0;
  bottom: 0;
  width: 230px;
  background: #f0f0f2;
  box-shadow: 6px 0 4px rgb(69 69 69 / 25%);
  z-index: 5000;
  overflow-y: auto;
  padding: 16px;

  :deep(h3) {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #454545;
  }

  .search-input {
    margin-bottom: 16px;
  }

  .comp-list {
    // padding: 16px;
    :deep(.t-list) {
      background: transparent;

      .t-list-item {
        margin-bottom: 16px;

        &:hover {
          transition: all 0.2s linear;
          background-color: #fff;
          border-radius: var(--td-radius-medium);
        }

        .t-list-item__meta-description {
          font-size: 12px;
          color: rgb(69 69 69 / 70%);
        }
      }
    }
  }
}
</style>
