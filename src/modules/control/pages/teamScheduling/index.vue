<!-- 班组排班 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <div class="tab-container">
        <t-tabs :value="activeTab" class="left-tabs" @change="handleTabChange">
          <t-tab-panel value="first" label="班组">
            <div class="calendar-container">
              <t-space direction="vertical" class="inputs-container">
                <t-select v-model="selectedOption" class="demo-select-base">
                  <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
                </t-select>
                <t-input class="demo-select-base" placeholder="搜索班组" />
                <!-- 追加内容 -->
                <div class="additional-content">
                  <template v-if="selectedOption === 'option1'">
                    <!-- 当选择第一个选项时显示的内容 -->
                    <span>选项1的内容</span>
                    <span>已排30天</span>
                    <t-button variant="outline" @click="addTeamScheduling"> + </t-button>
                  </template>
                  <template v-else-if="selectedOption === 'option2'">
                    <!-- 当选择第二个选项时显示的内容 -->
                    <span>选项2的内容</span>
                    <span>已排28天</span>
                    <t-button variant="outline"> + </t-button>
                  </template>
                  <!-- 可以根据需要添加更多条件 -->
                </div>
              </t-space>
              <t-calendar :value="currentDate" class="right-aligned-calendar"></t-calendar>
            </div>
          </t-tab-panel>
          <!-- todo -->
          <!-- <t-tab-panel value="second" label="工作中心">
            <p>工作中心内容</p>
          </t-tab-panel> -->
        </t-tabs>
      </div>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" :header="formTitle">
    <t-form>
      <!--  <t-row :gutter="[32, 16]"> -->
      <t-form-item label="班组">
        <t-input></t-input>
      </t-form-item>
      <t-form-item label="日期">
        <t-input></t-input>
      </t-form-item>
      <t-form-item label="工作中心">
        <t-select></t-select>
      </t-form-item>
      <t-form-item label="出勤模式">
        <t-select></t-select>
      </t-form-item>
      <t-form-item label="时间段">
        <t-input></t-input>
      </t-form-item>
      <!-- </t-row>  -->
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

const formVisible = ref(false);

const currentDate = ref(new Date());
const activeTab = ref('first'); // 默认激活的选项卡
// 添加用于绑定到选择框的响应式数据
const selectedOption = ref('');
const formTitle = ref('');

// 模拟数据
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  // 更多选项...
];

onMounted(() => {
  getListData();
});

const getListData = () => {
  api.workgroup.getList({
    // pageNum: pageUI.value.page,
    // pageSize: pageUI.value.rows,
    pageNum: 1,
    pageSize: 10,
  });
};
// add
const addTeamScheduling = () => {
  formTitle.value = '班组排班';
  formVisible.value = true;
};
const handleTabChange = (newValue) => {
  activeTab.value = newValue;
};
</script>

<style lang="less" scoped>
.calendar-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .inputs-container {
    width: 300px; // 设置左侧部分的具体宽度
  }

  .right-aligned-calendar {
    // margin-left: auto;
    flex-grow: 1; // 日历填充剩余空间
    margin-left: 10px;
  }
}

.demo-select-base {
  width: 100%; // 使输入框和选择框充满 inputs-container 的宽度
  margin: 10px 0 0;
}
</style>
