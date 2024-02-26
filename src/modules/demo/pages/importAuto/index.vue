<template>
  <cmp-container :full="true">
    <bcmp-import-auto-button
      v-for="item in importDatas"
      :key="item.id"
      theme="primary"
      :button-text="item.importDesc"
      :type="item.importKeyCode"
      @close="uploadSuccess"
    ></bcmp-import-auto-button>
  </cmp-container>
</template>
<script setup lang="tsx">
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

const uploadSuccess = () => {
  console.log('导入成功');
};
const importDatas = ref([]);

// 加载角色数据表格
const fetchDatas = async () => {
  try {
    // 查询条件
    const searchCondition = {
      pageNum: 1,
      pageSize: 999999,
      filters: [],
      keyWord: '',
    };

    const data = (await api.importManage.search(searchCondition)) as any;
    const { list } = data;
    importDatas.value = list;
  } catch (e) {
    console.log(e);
  }
};
onMounted(async () => {
  fetchDatas();
});
</script>
