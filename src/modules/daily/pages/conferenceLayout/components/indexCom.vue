<template>
  <!-- <div v-if="props.optionType === 'addLayout'" class="layout-com-btn">
    <t-button theme="default" @click="addLayoutCom">新增布局内容</t-button>
  </div> -->
  <div ref="el" class="layout-com" :style="styleAttrs">
    <div v-if="props.optionType === ViewType.addLayout && !props.readonly" class="panel-wrapper">
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
            @drag="onHandDragLayout(comp)"
            @dragend="onHandDragLayoutEnd(comp)"
          >
            <t-list-item-meta :title="comp.title" :description="comp.description" />
          </t-list-item>
        </t-list>
      </div>
    </div>
    <div ref="wrapperRef" :class="enableEditingMode ? 'wrapper editable' : 'wrapper'">
      <grid-layout
        ref="gridLayoutRef"
        v-model:layout="layout"
        :col-num="props.colNum"
        :row-height="48"
        :margin="[12, 12]"
        :is-draggable="props.optionType === ViewType.addLayout"
        :is-resizable="props.optionType === ViewType.addLayout"
        vertical-compact
        :auto-size="true"
        :min-w="1"
        :min-h="1"
        use-css-transforms
        prevent-collision
      >
        <template #item="{ item }">
          <!--新增模式与编辑-->
          <div
            v-if="props.optionType === ViewType.addLayout || props.optionType === ViewType.editConferenceIndex"
            :class="cmpCardClass"
          >
            <cmp-card :key="item.i" height="100%" :full="true" :ghost="true" :is-mini="item.h <= 1">
              <template #actions>
                <t-dropdown
                  v-if="moreBtnOptions.length > 0"
                  :options="moreBtnOptions"
                  @click="(data) => onClickMore(data, item.i)"
                >
                  <t-button shape="square" variant="text"><more-icon /></t-button>
                </t-dropdown>
              </template>
            </cmp-card>
          </div>
          <!--查看模式-->
          <div v-else :class="cmpCardClass">
            <cmp-card
              v-for="comp in comps.filter((t) => t.code === item.i)"
              :key="comp.code"
              :class="cmpCardClass"
              height="100%"
              :full="true"
              :ghost="comp.ghost"
              :title="comp.showTitle ? comp.title : ''"
              :subtitle="comp.showTitle ? comp.subtitle : ''"
              :is-mini="item.h <= 1"
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
            </cmp-card>
          </div>
        </template>
      </grid-layout>
    </div>
  </div>
  <relation-conference ref="relationConferenceRef" @parent-refresh-event="parentCloseEvent" />
</template>
<script lang="tsx">
export default {
  name: 'ConferenceLayoutCom',
};
</script>
<script setup lang="tsx">
import { useResizeObserver } from '@vueuse/core';
import { GridLayout, LayoutItem } from 'grid-layout-plus';
import _, { debounce, throttle } from 'lodash';
import { MoreIcon } from 'tdesign-icons-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

// import { api } from '@/api/main';
// import { openPage } from '@/router';
import { componentItem, components, groupedComponentItem } from './components';
import RelationConference from './relationConference.vue';

const props = defineProps({
  // 面板列数
  colNum: {
    type: Number,
    default: 12,
  },
  // 面板宽度
  designWidth: {
    type: Number,
    default: 1920,
  },
  // 面板高度
  designHeight: {
    type: Number,
    default: 1080,
  },
  // 是否自动自适应计算
  isAutoSize: {
    type: Boolean,
    default: false,
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // addLayout: 新增(占位符布局信息),editConferenceIndex:编辑(配置关联指标),viewKanban:查看模式
  optionType: {
    type: String,
    default: 'addLayout',
  },
});

enum ViewType {
  addLayout = 'addLayout', // addLayout: 新增(占位符布局信息)
  editConferenceIndex = 'editConferenceIndex', // editConferenceIndex:编辑(配置关联指标)
  viewKanban = 'viewKanban', // viewKanban:查看模式(看板模式)
}

const defaultComponent = [
  {
    code: 'default-Layout-com1',
    title: '默认布局项(1*1)',
    showTitle: true,
    ghost: true,
    description: '拖拽布局项至面板',
    category: '系统',
    component: null,
    w: 1,
    h: 1,
    i: '',
  },
  {
    code: 'default-Layout-com2',
    title: '布局项尺寸(2*2)',
    showTitle: true,
    ghost: true,
    description: '拖拽布局项至面板',
    category: '系统',
    component: null,
    w: 2,
    h: 2,
    i: '',
  },
  {
    code: 'default-Layout-com3',
    title: '布局项尺寸(3*3)',
    showTitle: true,
    ghost: true,
    description: '拖拽布局项至面板',
    category: '系统',
    component: null,
    w: 3,
    h: 3,
    i: '',
  },
  {
    code: 'default-Layout-com4',
    title: '布局项尺寸(4*4)',
    showTitle: true,
    ghost: true,
    description: '拖拽布局项至面板',
    category: '系统',
    component: null,
    w: 4,
    h: 4,
    i: '',
  },
  {
    code: 'default-Layout-com5',
    title: '布局项尺寸(5*5)',
    showTitle: true,
    ghost: true,
    description: '拖拽布局项至面板',
    category: '系统',
    component: null,
    w: 5,
    h: 5,
    i: '',
  },
  {
    code: 'default-Layout-com6',
    title: '布局项尺寸(6*6)',
    showTitle: true,
    ghost: true,
    description: '拖拽布局项至面板',
    category: '系统',
    component: null,
    w: 6,
    h: 6,
    i: '',
  },
] as componentItem[];
const wrapperRef = ref<HTMLElement>();
const gridLayoutRef = ref<InstanceType<typeof GridLayout>>();
const moreBtnOptions = computed(() => {
  let result = [];
  if (enableEditingMode.value) {
    if (props.optionType === ViewType.addLayout) {
      result = [{ content: '删除面板', value: 'REMOVE_PANEL' }, ...result];
    }
    if (props.optionType === ViewType.editConferenceIndex) {
      result = [{ content: '关联指标', value: 'RELATION_CONFERENCE_INDEX' }, ...result];
    }
  }
  return result;
});

// 更多
const onClickMore = (data, id) => {
  switch (data.value) {
    // 删除面板
    case 'REMOVE_PANEL':
      layout.value = layout.value.filter((item) => item.i !== id);
      break;
    // 关联指标
    case 'RELATION_CONFERENCE_INDEX':
      onRelationConference();
      break;
    default:
      break;
  }
};

// 显示关联指标界面
const relationConferenceRef = ref(null);
const onRelationConference = () => {
  relationConferenceRef.value.initGrid();
};

const parentCloseEvent = async (isRefresh: boolean) => {};
// const onClickRedirect = (path) => {
//   openPage(path);
// };

onBeforeUnmount(() => {
  document.removeEventListener('dragover', syncMousePosition);
});

const mouseAt = { x: -1, y: -1 };
const syncMousePosition = (event: MouseEvent) => {
  mouseAt.x = event.clientX;
  mouseAt.y = event.clientY;
};

const layout = ref<LayoutItem[]>([]);
const filterText = ref('');
const comps = computed(() => {
  if (props.optionType === ViewType.addLayout) {
    return filterText.value
      ? defaultComponent.filter(
          (t) => t.title.indexOf(filterText.value) >= 0 || t.description.indexOf(filterText.value) >= 0,
        )
      : defaultComponent;
  }
  return filterText.value
    ? components.filter((t) => t.title.indexOf(filterText.value) >= 0 || t.description.indexOf(filterText.value) >= 0)
    : components;
});

// 是否为允许编辑模式
const enableEditingMode = computed<boolean>(() => {
  let enableEditing = false;
  if (props.optionType === 'addLayout' || props.optionType === 'editConferenceIndex') {
    enableEditing = true;
  }
  if (props.readonly) {
    enableEditing = false;
  }
  return enableEditing;
});

// 样式动态判断
const cmpCardClass = computed<String>(() => {
  let cardClass = 'cmp-layout-card-color-none';
  if (props.optionType === 'addLayout' || props.optionType === 'editConferenceIndex') {
    cardClass = 'cmp-layout-card-color';
  }
  return cardClass;
});

const dropId = 'drop';
const onHandDragLayout = throttle((dragItem: componentItem) => {
  // 如果是查看模式则不允许拖拽
  if (props.optionType === ViewType.viewKanban) {
    return;
  }

  const parentRect = wrapperRef.value?.getBoundingClientRect();

  if (!parentRect || !gridLayoutRef.value) return;

  const mouseInGrid =
    mouseAt.x > parentRect.left &&
    mouseAt.x < parentRect.right &&
    mouseAt.y > parentRect.top &&
    mouseAt.y < parentRect.bottom;

  if (mouseInGrid && !layout.value.find((item) => item.i === dropId)) {
    layout.value.push({
      x: (layout.value.length * 2) % 12,
      y: layout.value.length + 12, // puts it at the bottom
      w: 2,
      h: 2,
      i: dropId,
    });
  }

  const index = layout.value.findIndex((item) => item.i === dropId);

  if (index !== -1) {
    const item = gridLayoutRef.value.getItem(dropId);

    if (!item) return;

    try {
      item.wrapper.style.display = 'none';
    } catch (e) {
      console.log(e);
    }

    Object.assign(item.state, {
      top: mouseAt.y - parentRect.top,
      left: mouseAt.x - parentRect.left,
    });
    const newPos = item.calcXY(mouseAt.y - parentRect.top, mouseAt.x - parentRect.left);

    if (mouseInGrid) {
      gridLayoutRef.value.dragEvent('dragstart', dropId, newPos.x, newPos.y, dragItem.h, dragItem.w);
      dragItem.i = String(index);
      dragItem.x = layout.value[index].x;
      dragItem.y = layout.value[index].y;
    } else {
      gridLayoutRef.value.dragEvent('dragend', dropId, newPos.x, newPos.y, dragItem.h, dragItem.w);
      layout.value = layout.value.filter((item) => item.i !== dropId);
    }
  }
});

const onHandDragLayoutEnd = (dragItem: componentItem) => {
  // 如果是查看模式则不允许拖拽
  if (props.optionType === ViewType.viewKanban) {
    return;
  }
  const parentRect = wrapperRef.value?.getBoundingClientRect();

  if (!parentRect || !gridLayoutRef.value) return;

  const mouseInGrid =
    mouseAt.x > parentRect.left &&
    mouseAt.x < parentRect.right &&
    mouseAt.y > parentRect.top &&
    mouseAt.y < parentRect.bottom;

  if (mouseInGrid) {
    gridLayoutRef.value.dragEvent('dragend', dropId, dragItem.x, dragItem.y, dragItem.h, dragItem.w);
    layout.value = layout.value.filter((item) => item.i !== dropId);
  } else {
    return;
  }

  layout.value.push({
    x: dragItem.x,
    y: dragItem.y,
    w: dragItem.w,
    h: dragItem.h,
    i: dragItem.i,
  });
  gridLayoutRef.value.dragEvent('dragend', dragItem.i, dragItem.x, dragItem.y, dragItem.h, dragItem.w);

  const item = gridLayoutRef.value.getItem(dropId);

  if (!item) return;

  try {
    item.wrapper.style.display = '';
  } catch (e) {
    console.log(e);
  }
};

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

// 获取布局组件的数据
const getLayoutComData = () => {
  return layout.value;
};

// 设置布局组件的数据
const setLayoutComData = (data: componentItem[]) => {
  layout.value = data;
};

const reset = () => {
  console.log('reset');
  layout.value = [];
};

// 自适应自动计算
const scaleInfo = ref({
  y: 1,
  x: 1,
});
const updateScale = (width, height) => {
  scaleInfo.value = {
    x: width / props.designWidth,
    y: height / props.designHeight,
  };
};
const styleAttrs = computed(() => {
  let attrs = {
    height: `${props.designHeight}px`,
  } as any;

  if (props.isAutoSize) {
    attrs = {
      'min-width': `${props.designWidth}px`,
      'min-height': `${props.designHeight}px`,
      transform: `scale(${scaleInfo.value.x}, ${scaleInfo.value.y})`,
      'transform-origin': '0 0',
    };
  }
  return attrs;
});

const el = ref<HTMLElement>();
onMounted(() => {
  document.addEventListener('dragover', syncMousePosition);
  el.value.parentElement.style.overflow = 'hidden';
  useResizeObserver(
    el.value.parentElement,
    debounce((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      updateScale(width, height);
    }, 100),
  );
});

defineExpose({
  getLayoutComData,
  setLayoutComData,
  reset,
});
</script>
<style lang="less" scoped>
.layout-com {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  width: 100%;
  height: 100%;
}

.layout-com-btn {
  float: right;
}

.panel-wrapper {
  display: flex;
  flex-direction: column;
  width: 230px;
  background: #f0f0f2;
  box-shadow: 6px 0 4px rgb(69 69 69 / 25%);
  z-index: 5000;
  overflow-y: auto;
  padding: 16px;
  margin-top: 14px;

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

.wrapper {
  min-height: 100%;
  flex: 1;
  padding: 8px;

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
      background-size: calc(calc(100% - 6px) / 12) 60px;
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

:deep(.t-card__footer) {
  padding: 8px var(--td-comp-paddingLR-xl) !important;
}

.cmp-card-actions {
  right: 0 !important;
  top: 0 !important;
}

.cmp-layout-card-color {
  background: #f0f0f2;
  height: 100%;
}

.cmp-layout-card-color-none {
  background: none;
  height: 100%;
}
</style>
