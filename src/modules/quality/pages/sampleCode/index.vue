<!-- 样本字码表 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <div class="table-container">
        <table>
          <thead>
            <tr class="red-bg">
              <th rowspan="2" style="width: 250px">批量</th>
              <th colspan="4">特殊检验水平</th>
              <th colspan="3">一般检验水平</th>
            </tr>
            <tr class="red-bg">
              <th>S-1</th>
              <th>S-2</th>
              <th>S-3</th>
              <th>S-4</th>
              <th>I</th>
              <th>II</th>
              <th>III</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in ruleTabData" :key="row.batch">
              <td class="red-bg">{{ row.batch }}</td>
              <td>{{ row.s1 }}</td>
              <td>{{ row.s2 }}</td>
              <td>{{ row.s3 }}</td>
              <td>{{ row.s4 }}</td>
              <td>{{ row.I }}</td>
              <td>{{ row.II }}</td>
              <td>{{ row.III }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </cmp-card>
  </cmp-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { api } from '@/api/quality';

onMounted(async () => {
  await onGetRuleData();
});
const ruleTabData = ref([]);
const onGetRuleData = async () => {
  const res = await api.sampleCode.getList();
  const updatedData = res.map((item) => {
    const { batchStart, batchEnd, ...rest } = item;
    return {
      ...rest,
      batch: `${batchStart}-${batchEnd}`,
    };
  });
  ruleTabData.value = updatedData;
};
</script>
<style scoped>
.table-container {
  max-height: 500px;
  overflow-y: scroll; /* 确保滚动条仅在需要时显示 */
}

table {
  width: 100%;
  border-collapse: separate; /* 尝试使用 separate 来避免边框合并 */
  border-spacing: 0;
}

th,
td {
  border: 1px solid #d5d8db;
  padding: 8px;
  text-align: left;
}

thead {
  position: sticky;
  top: 0;
  z-index: 10;

  /* background-color: var(--td-bg-color-page); 为thead设置背景色，这里使用白色作为示例 */

  /* border-bottom: 1px solid #d5d8db; 给sticky header添加边框 */
}

/* 其他样式保持不变 */

.red-bg {
  background-color: var(--td-bg-color-page); /* 确保这是一个有效的CSS变量或颜色值 */
}
</style>
