<template>
  <div ref="ganttContainer"></div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { gantt } from 'dhtmlx-gantt';
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps({
  tasks: {
    type: Object,
    default: () => ({ data: [], links: [] }),
  },
});

const emits = defineEmits(['task-selected', 'task-updated', 'link-updated']);

const ganttContainer = ref(null);

const initGanttEvents = () => {
  if (!gantt.$_eventsInitialized) {
    gantt.attachEvent('onGanttReady', () => {
      // const { tooltips } = gantt.ext;
      // tooltips.tooltip.setViewport(gantt.$task_data);

      gantt.templates.tooltip_text = (start, end, task) => {
        if (task.$split_subtask) {
          return `<b>工单号：</b> ${task.row?.moCode}<br/>
<b>产品名称：</b> ${task.row?.mitemName}<br/>
<b>产品编码：</b> ${task.row?.mitemCode}<br/>
<b>生产数量：</b> ${task.row?.planNum}<br/>
<b>完工数量：</b> ${task.row?.completedNum}<br/>
<b>时间：</b> ${gantt.templates.tooltip_date_format(start)} - ${gantt.templates.tooltip_date_format(end)}<br/>
`;
        }
        return `<b>车间编码：</b> ${task.row?.orgCode}<br/>
<b>车间名称：</b> ${task.row?.orgName}<br/>
<b>时间：</b> ${gantt.templates.tooltip_date_format(start)} - ${gantt.templates.tooltip_date_format(end)}<br/>
`;
      };
    });

    gantt.attachEvent('onTaskSelected', (id) => {
      const task = gantt.getTask(id);
      emits('task-selected', task);
    });

    gantt.attachEvent('onTaskIdChange', (id, newId) => {
      if (gantt.getSelectedId() === newId) {
        const task = gantt.getTask(newId);
        emits('task-selected', task);
      }
    });

    gantt.$_eventsInitialized = true;
  }
};

const initDataProcessor = () => {
  if (!gantt.$_dataProcessorInitialized) {
    gantt.createDataProcessor((entity, action, data, id) => {
      if (entity === 'task') {
        if (action === 'update') {
          emits('task-updated', id, data);
        }
      } else if (entity === 'link') {
        if (action === 'update') {
          emits('link-updated', id, data);
        }
      }
    });

    gantt.$_dataProcessorInitialized = true;
  }
};

const hourToStr = gantt.date.date_to_str('%H:%i');
const hourRangeFormat = (step) => {
  return (date) => {
    const intervalEnd = gantt.date.add(date, step, 'hour');
    const adjustedIntervalEnd = new Date(intervalEnd.getTime() - 1);
    return `${hourToStr(date)} - ${hourToStr(adjustedIntervalEnd)}`;
  };
};
const renderLabel = (start, end, task) => {
  if (task.$split_subtask) {
    return `<pre class='${task.row?.planNum ? 'in-progress' : 'wait'}'>
${task.row?.moCode}
${task.row?.planNum}/${task.row?.completedNum}</pre>`;
  }
  return `<pre>
${task.row?.orgCode}
${task.row?.orgName}</pre>`;
};
onMounted(() => {
  initGanttEvents();
  gantt.i18n.setLocale('cn');
  gantt.plugins({
    tooltip: true,
    auto_scheduling: true,
  });

  gantt.templates.tooltip_date_format = (date: Date): string => {
    return dayjs(date).format('YYYY/MM/DD HH:mm');
  };
  gantt.templates.task_text = renderLabel;
  gantt.config.columns = [
    {
      name: 'text',
      tree: true,
      width: 170,
      resize: true,
      template(task) {
        if (task.$split_subtask) {
          return `<div class='column_name'><div>${task.row?.moCode}</div><div class='desc'>${task.row?.planNum}/${task.row?.completedNum}</div></div>`;
        }
        return `<div class='column_name'><div>${task.row?.orgCode}</div><div class='desc'>${task.row?.orgName}</div></div>`;
      },
    },
  ];
  // gantt.config.scales = [
  //   { unit: 'day', step: 1, format: '%m/%d <b>周%D</b>' },
  //   { unit: 'hour', format: '%G' },
  // ];
  const zoomConfig = {
    minColumnWidth: 80,
    maxColumnWidth: 150,
    levels: [
      {
        name: '',
        scales: [
          { unit: 'month', format: '%Y年 <b>%M</b>', step: 1 },
          { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
        ],
      },
      {
        name: '',
        scales: [
          { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
          { unit: 'hour', format: hourRangeFormat(4), step: 4 },
        ],
      },
      {
        name: '',
        scales: [
          { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
          { unit: 'hour', format: '%H:%i', step: 1 },
        ],
      },
    ],
    useKey: 'ctrlKey',
    trigger: 'wheel',
    element() {
      return gantt.$root.querySelector('.gantt_task');
    },
  };

  gantt.ext.zoom.init(zoomConfig);

  gantt.config.date_format = '%Y-%m-%d %H:%i';
  gantt.config.min_column_width = 20;
  gantt.config.duration_unit = 'hour';
  gantt.config.duration_step = 1;
  gantt.config.scale_height = 48;
  gantt.config.row_height = 48;
  gantt.config.show_links = false;
  gantt.config.static_background = true;

  gantt.config.drag_lightbox = false;
  gantt.config.drag_move = false;
  gantt.config.drag_resize = false;
  gantt.config.drag_project = false;
  gantt.config.drag_links = false;
  gantt.config.drag_progress = false;

  gantt.config.open_split_tasks = true;
  gantt.config.auto_types = true;
  gantt.config.auto_scheduling = true;
  gantt.config.auto_scheduling_compatibility = true;

  gantt.init(ganttContainer.value);
  gantt.parse(props.tasks);
  initDataProcessor();
});

watch(
  () => props.tasks,
  (newTasks) => {
    gantt.clearAll();
    gantt.parse(newTasks);
  },
  { deep: true },
);
</script>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
@import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

.gantt_tree_content,
.gantt_grid_scale .gantt_grid_head_cell,
.gantt_task .gantt_task_scale .gantt_scale_cell {
  color: #787878;
}

.gantt_grid_scale,
.gantt_task_scale,
.gantt_task_vscroll {
  background-color: #f0f0f2 !important;
}

.gantt_grid_data,
.gantt_grid_data .gantt_row {
  background-color: #fafafa;
}

.gantt_task .gantt_task_scale .gantt_scale_cell {
  border-right: 1px solid #d6d9dd;
}

.gantt_tree_icon.gantt_folder_closed,
.gantt_tree_icon.gantt_folder_open,
.gantt_tree_icon.gantt_file {
  display: none;
}

.gantt_task_line {
  // border: 1px solid #cecece !important;
  background-color: #2ba471 !important;

  &:has(pre.wait),
  &:has(pre.in-progress) {
    border-width: 0 !important;
    border-left: 3px solid #495ae9 !important;

    .gantt_task_content {
      color: #4d4f5c;
    }
  }

  &:has(pre.wait) {
    background-color: #dadefa !important;
  }

  &:has(pre.in-progress) {
    background-color: #d3f4e4 !important;
  }

  &.gantt_split_parent,
  &.gantt_split_subproject {
    opacity: 0;
  }

  .gantt_task_content {
    color: #fff;

    > pre {
      line-height: 16px;
      padding: 0;
      margin: 5px;
    }
  }
}

.gantt_tree_content {
  .column_name {
    line-height: 16px;
    margin: 8px;
    font-size: 12px;

    > .desc {
      font-weight: 700;
    }
  }
}

.gantt_layout {
  > .grid_cell {
    .gantt_grid_head_text {
      display: none;
    }
  }
}
</style>
