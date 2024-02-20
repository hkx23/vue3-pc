<!-- 样本字码表 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <table>
        <thead>
          <tr>
            <th rowspan="2" style="width: 250px">批量</th>
            <th colspan="4">特殊检验水平</th>
            <th colspan="3">一般检验水平</th>
          </tr>
          <tr>
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
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #d5d8db;
  padding: 8px;
  text-align: left;
}

.red-bg {
  background-color: var(--td-bg-color-page);
}

/* thead {
  background-color: #902b2b;
} */
</style>
