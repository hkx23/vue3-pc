<template>
  <div class="container">
    <cmp-gantt class="left-container" :tasks="tasks"></cmp-gantt>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import CmpGantt from '@/components/cmp-gantt/CmpGantt.vue';

const tasks = ref({
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
});
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
</style>
