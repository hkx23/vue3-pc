<template>
  <div class="container">
    <!-- <div class="right-container">
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{ selectedTask.text }}</h2>
          <span><b>ID: </b>{{ selectedTask.id }}</span
          ><br />
          <span><b>Progress: </b> {{ progressPercentage }}</span
          ><br />
          <span><b>Start Date: </b>{{ formattedStartDate }}</span
          ><br />
          <span><b>End Date: </b>{{ formattedEndDate }}</span
          ><br />
        </div>
        <div v-else class="select-task-prompt">
          <h2>Click any task</h2>
        </div>
      </div>
      <ul class="gantt-messages">
        <li v-for="(message, index) in messages" :key="index" class="gantt-message">
          {{ message }}
        </li>
      </ul>
    </div> -->
    <cmp-gantt
      class="left-container"
      :tasks="tasks"
      @task-updated="logTaskUpdate"
      @link-updated="logLinkUpdate"
      @task-selected="selectTask"
    ></cmp-gantt>
  </div>
</template>
<script>
import CmpGantt from '@/components/cmp-gantt/CmpGantt.vue';

export default {
  name: 'App',
  components: { CmpGantt },
  data() {
    return {
      tasks: {
        data: [
          {
            id: 1,
            text: 'CT001',
            start_date: '2024-03-17 08:00',
            duration: 11,
            render: 'split',
            row: {
              orgCode: 'CT001',
              orgName: '组装一线',
            },
          },
          {
            id: 1.1,
            parent: 1,
            text: 'CT001',
            start_date: '2024-03-17 08:00',
            duration: 11,
            row: {
              orgCode: 'CT001',
              orgName: '组装一线',
              planNum: 0,
              completedNum: 76,
              moCode: 'M09-11-1',
              mitemCode: '344565657751',
              mitemName: 'CSP摄像头1',
            },
          },
          {
            id: 1.2,
            parent: 1,
            text: 'CT001',
            start_date: '2024-03-17 20:00',
            duration: 11,
            row: {
              orgCode: 'CT001',
              orgName: '组装一线',
              planNum: 12,
              completedNum: 234,
              moCode: 'M09-11-2',
              mitemCode: '344565657751',
              mitemName: 'CSP摄像头1',
            },
          },
          {
            id: 2,
            text: 'CT002',
            start_date: '2024-03-18 08:00',
            duration: 11,
            render: 'split',
            row: {
              orgCode: 'CT002',
              orgName: '组装二线',
            },
          },
          {
            id: 2.1,
            parent: 2,
            text: 'CT002',
            start_date: '2024-03-18 08:00',
            duration: 4,
            row: {
              orgCode: 'CT002',
              orgName: '组装二线',
              planNum: 45,
              completedNum: 136,
              moCode: 'M09-12-1',
              mitemCode: '344565657752',
              mitemName: 'CSP摄像头2',
            },
          },
          {
            id: 2.2,
            parent: 2,
            text: 'CT002',
            start_date: '2024-03-18 13:00',
            duration: 6,
            row: {
              orgCode: 'CT002',
              orgName: '组装二线',
              planNum: 0,
              completedNum: 34,
              moCode: 'M09-12-2',
              mitemCode: '344565657752',
              mitemName: 'CSP摄像头2',
            },
          },
        ],
        links: [],
      },
      selectedTask: null,
      messages: [],
    };
  },
  computed: {
    progressPercentage() {
      const taskProgress = this.selectedTask.progress;
      if (!taskProgress) {
        return '0';
      }
      return `${Math.round(+taskProgress * 100)} %`;
    },
    formattedStartDate() {
      const taskStart = this.selectedTask.start_date;
      return `${taskStart.getFullYear()} / ${taskStart.getMonth() + 1} / ${taskStart.getDate()}`;
    },
    formattedEndDate() {
      const taskEnd = this.selectedTask.end_date;
      return `${taskEnd.getFullYear()} / ${taskEnd.getMonth() + 1} / ${taskEnd.getDate()}`;
    },
  },
  methods: {
    selectTask(task) {
      this.selectedTask = task;
    },

    addMessage(message) {
      this.messages.unshift(message);
      if (this.messages.length > 40) {
        this.messages.pop();
      }
    },

    logTaskUpdate(id, mode, task) {
      const text = task && task.text ? ` (${task.text})` : '';
      const message = `Task ${mode}: ${id} ${text}`;
      this.addMessage(message);
    },

    logLinkUpdate(id, mode, link) {
      let message = `Link ${mode}: ${id}`;
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`;
      }
      this.addMessage(message);
    },
  },
};
</script>
<style scoped lang="less">
.container {
  height: 100vh;
  width: 100%;
}

.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}

.gantt-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow: hidden auto;
  padding-left: 5px;
}

.gantt-messages > .gantt-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}

.gantt-selected-info {
  border-bottom: 1px solid #cecece;
  box-sizing: border-box;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  height: 50%;
  line-height: 28px;
  padding: 10px;
}

.gantt-selected-info h2 {
  border-bottom: 1px solid #cecece;
}

.select-task-prompt h2 {
  color: #d9d9d9;
}
</style>
