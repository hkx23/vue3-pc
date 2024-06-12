<template>
  <cmp-kanban-default title="能耗设备监控看板">
    <div class="outer_box">
      <div class="flex flex-row flex-wrap">
        <div v-for="(item, index) in defaultData" :key="index" class="w-[200px] text-center m-2">
          <div class="border border-solid border-blue-800 p-2">
            <img src="./img/091430.jpg" class="w-[60%]" />
            <div class="mb-1">{{ item.line }}</div>
            <div class="mb-1">{{ item.equipment }}</div>
            <div class="mb-1 text-green-400">{{ item.min }}</div>
            <div class="mb-1 text-green-400">{{ item.max }}</div>
          </div>
        </div>
      </div>
      <div class="table_page">
        <div class="pageSize">
          <!-- <div>{{ `每页${pageUI.rows}条/` }}</div>
          <div>{{ `共${Math.ceil(total / pageUI.rows)}页/` }}</div>
          <div>{{ `当前第${pageUI.page}页` }}</div> -->
        </div>
      </div>
    </div>
  </cmp-kanban-default>
</template>

<script setup lang="tsx">
import { useIntervalFn } from '@vueuse/core';
import { onActivated, onDeactivated, onMounted, ref } from 'vue';

import { usePage } from '@/hooks/modules/page';

const defaultData = ref();

const { pageUI } = usePage(); // 分页工具

onMounted(async () => {
  await fetchTable();
});

const getRandomDecimal = (): number => {
  // 生成0到99900之间的随机整数
  const randomInt = Math.floor(Math.random() * 9990);
  // 转换为2位小数的大数（比如生成123 -> 1.23）
  const randomDecimal = randomInt / 100;
  return randomDecimal;
};

const total = ref(0);
const fetchTable = async () => {
  const res = {
    list: [
      { equipment: 'A3T201', src: '', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A3T202', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A3T203', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A3T204', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A3T301', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A3T302', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A3T303', line: 'A3线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A4T401', line: 'A4线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A4T401', line: 'A4线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T501', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T502', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T503', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T504', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T505', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T506', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T507', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T508', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
      { equipment: 'A5T509', line: 'A5线', min: getRandomDecimal(), max: getRandomDecimal() },
    ],
    total: 2,
  };
  defaultData.value = res.list;
  total.value = res.total;
};

const { pause, resume } = useIntervalFn(() => {
  pageUI.value.page++;
  if (pageUI.value.page > Math.ceil(total.value / pageUI.value.rows)) {
    pageUI.value.page = 1;
  }
  fetchTable();
}, 5000);

onActivated(() => {
  resume();
});

onDeactivated(() => {
  pause();
});
</script>

<style scoped>
.outer_box {
  flex: 1;
  display: flex;
  flex-direction: column; /* 使得子元素垂直排列 */
  justify-content: space-between;
}

.table_page {
  display: flex;
  justify-content: end;
  margin: 8px 8px 0 0;
}

.pageSize {
  display: flex;
}
</style>
