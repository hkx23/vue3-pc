<template>
  <div ref="ganttContainer"></div>
</template>

<script setup lang="ts">
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

import dayjs from 'dayjs';
import { gantt } from 'dhtmlx-gantt';
import { defineProps, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  tasks: {
    type: Object,
    default: () => ({ data: [], links: [] }),
  },
  clearAll: Boolean,
  startDate: Date,
  endDate: Date,
});
const emit = defineEmits(['drag-end']);

let eventIDs = [];

const ganttContainer = ref();
watch(
  () => props.tasks.data,
  (data) => {
    updateGanttData(data);
  },
);
function updateGanttData(data) {
  if (props.clearAll) gantt.clearAll();
  gantt.parse({ data });
}

const renderLabel = (start, end, task) => {
  if (task.$split_subtask) {
    return `<pre class='${task.row?.completedQty ? 'in-progress' : 'wait'}'>
${task.row?.moCode}
${task.row?.completedQty}/${task.row?.planQty}</pre>`;
  }
  return `<pre>
${task.row?.workCenterCode}
${task.row?.workCenterName}</pre>`;
};
// const hourToStr = gantt.date.date_to_str('%H:%i');
// const hourRangeFormat = (step) => {
//   return (date) => {
//     const intervalEnd = gantt.date.add(date, step, 'hour');
//     const adjustedIntervalEnd = new Date(intervalEnd.getTime() - 1);
//     return `${hourToStr(date)} - ${hourToStr(adjustedIntervalEnd)}`;
//   };
// };

onMounted(() => {
  eventIDs.push(
    gantt.attachEvent('onGanttReady', () => {
      gantt.templates.tooltip_text = (start, end, task) => {
        if (task.$split_subtask) {
          return `<b>工单号：</b> ${task.row?.moCode}<br/>
<b>产品名称：</b> ${task.row?.mitemName}<br/>
<b>产品编码：</b> ${task.row?.mitemCode}<br/>
<b>生产数量：</b> ${task.row?.planQty}<br/>
<b>完工数量：</b> ${task.row?.completedQty}<br/>
<b>时间：</b> ${gantt.templates.tooltip_date_format(start)} - ${gantt.templates.tooltip_date_format(end)}<br/>
`;
        }
        return `<b>车间编码：</b> ${task.row?.workCenterCode}<br/>
<b>车间名称：</b> ${task.row?.workCenterName}<br/>
<b>时间：</b> ${gantt.templates.tooltip_date_format(start)} - ${gantt.templates.tooltip_date_format(end)}<br/>
`;
      };
    }),
    gantt.attachEvent('onAfterTaskDrag', (id, mode, _e) => {
      if (mode === 'move') {
        const task = gantt.getTask(id);
        emit('drag-end', task);
      }
    }),
    gantt.attachEvent('onAfterTaskMove', (id, parent, _tindex) => {
      const task = gantt.getTask(id);
      if (parent) emit('drag-end', task, parent);
    }),
    gantt.attachEvent('onBeforeTaskMove', (id, parent, _tindex) => {
      return !!parent;
    }),
  );

  gantt.plugins({
    tooltip: true,
    auto_scheduling: true,
    multiselect: true,
    click_drag: true,
    drag_timeline: true,
    keyboard_navigation: true,
    undo: true,
  });

  gantt.i18n.setLocale('cn');

  // gantt.config.scales = [
  //   { unit: 'day', step: 1, format: '%m/%d <b>周%D</b>' },
  //   { unit: 'hour', format: '%H' },
  // ];
  const zoomConfig = {
    minColumnWidth: 20,
    maxColumnWidth: 40,
    levels: [
      {
        name: 'day',
        scales: [
          { unit: 'month', format: '%Y年 <b>%M</b>', step: 1 },
          { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
          // { unit: 'hour', format: '%H', step: 1 },
          // { unit: 'minute', step: 15, format: '%i' },
        ],
      },
      // {
      //   name: '',
      //   scales: [
      //     { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
      //     { unit: 'hour', format: hourRangeFormat(4), step: 4 },
      //     // { unit: 'hour', format: '%H:%i', step: 4 },
      //   ],
      // },
      {
        name: 'hour',
        scales: [
          { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
          { unit: 'hour', format: '%H', step: 1 },
        ],
      },
      {
        name: 'minute',
        scales: [
          { unit: 'day', format: '%m/%d <b>周%D</b>', step: 1 },
          { unit: 'hour', format: '%H', step: 1 },
          { unit: 'minute', step: 15, format: '%i' },
        ],
      },
    ],
    startDate: props.startDate,
    endDate: props.endDate,
    // useKey: 'ctrlKey',
    trigger: 'wheel',
    element() {
      return gantt.$root.querySelector('.gantt_task');
    },
  };
  gantt.ext.zoom.init(zoomConfig);
  gantt.templates.tooltip_date_format = (date: Date): string => {
    return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
  };
  gantt.templates.task_text = renderLabel;
  gantt.config.columns = [
    {
      name: 'text',
      tree: true,
      width: 170,
      template(task) {
        if (task.$split_subtask) {
          return `<div class='column_name'><div>${task.row?.moCode}</div><div class='desc'>${task.row?.planQty}/${task.row?.completedQty}</div></div>`;
        }
        return `<div class='column_name'><div>${task.row?.workCenterCode}</div><div class='desc'>${task.row?.workCenterName}</div></div>`;
      },
    },
  ];

  gantt.config.date_format = '%Y-%m-%d %H:%i';
  gantt.config.min_column_width = 64;
  gantt.config.duration_unit = 'minute';
  gantt.config.duration_step = 60;
  gantt.config.min_duration = 30 * 60 * 1000;
  gantt.config.scale_height = 48;
  gantt.config.row_height = 48;
  gantt.config.fit_tasks = true;
  gantt.config.order_branch = true;

  gantt.config.open_split_tasks = true;
  gantt.config.auto_types = true;
  gantt.config.auto_scheduling = true;
  gantt.config.auto_scheduling_compatibility = true;

  gantt.config.show_errors = false;
  gantt.config.show_links = false;
  gantt.config.static_background = true;
  gantt.config.drag_lightbox = false;
  gantt.config.drag_resize = false;
  gantt.config.drag_project = false;
  gantt.config.drag_progress = false;
  gantt.config.multiselect = true;
  gantt.config.autoscroll = true;
  gantt.config.autoscroll_speed = 50;
  gantt.config.click_drag = {
    callback: (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows) => {
      gantt.eachSelectedTask((item) => {
        gantt.unselectTask(item.id);
      });
      tasksInRows.forEach((item) => {
        gantt.selectTask(item.id);
      });
    },
  };

  gantt.init(ganttContainer.value);
  gantt.parse(props.tasks);
});

onUnmounted(() => {
  gantt.clearAll();
  eventIDs.forEach((event) => gantt.detachEvent(event));
  eventIDs = [];

  const popups = document.querySelectorAll('.gantt-info');
  popups.forEach((el) => {
    el.remove();
  });
  const tooltips = document.querySelectorAll('.gantt_tooltip');
  tooltips.forEach((el) => {
    el.remove();
  });
});
</script>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
// @import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

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

.gantt_grid_data .gantt_row.odd:hover,
.gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
  background-color: #fff4f4;
}

.gantt_btn_set:focus,
.gantt_cell:focus,
.gantt_grid_head_cell:focus,
.gantt_popup_button:focus,
.gantt_qi_big_icon:focus,
.gantt_row:focus {
  box-shadow: inset 0 0 1px 1px #495ae9;
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

    .gantt_task_progress {
      background-color: #9df0c8 !important;
    }
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
