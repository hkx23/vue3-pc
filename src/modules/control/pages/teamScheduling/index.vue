<!-- 班组排班 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <div class="tab-container">
        <t-tabs :value="activeTab" class="left-tabs" @change="handleTabChange">
          <t-tab-panel value="first" label="班组">
            <div class="calendar-container">
              <t-space direction="vertical" class="inputs-container">
                <!-- <t-select v-model="selectedOption" placeholder="选择车间" class="demo-select-base">
                    <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
                  </t-select> -->
                <!--  @selection-change="SelectionChange" -->
                <bcmp-select-business
                  v-model="selectedOption"
                  class="demo-select-base"
                  :is-multiple="false"
                  :show-title="false"
                  type="workshop"
                  label-field="orgName"
                  @selection-change="SelectionChange"
                >
                  <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
                </bcmp-select-business>
                <t-input v-memo="workgroupKeyword" class="demo-select-base" placeholder="搜索班组" />
                <!-- table -->
                <t-table row-key="id" :columns="tableColumns" :data="tableData" empty="请先选择车间"></t-table>
              </t-space>
              <!-- <t-calendar :value="currentDate" class="right-aligned-calendar"></t-calendar> -->
              <!-- <div class="right-aligned-calendar">

                <t-date-range-picker enable-time-picker allow-input clearable @pick="onPick" @change="onChange" />
                <t-select v-model="calendarMode" class="mode-selector">
                  <t-option value="week" label="周视图"></t-option>
                  <t-option value="month" label="月视图"></t-option>
                </t-select>
                
                <t-calendar :mode="calendarMode" :value="currentDate"></t-calendar>
              </div> -->

              <div class="right-aligned-calendar">
                <div class="date-picker-container">
                  <t-date-range-picker class="mode-selector" allow-input clearable @pick="onPick" @change="onChange" />
                  <t-select v-model="calendarMode" class="mode-selector">
                    <t-option value="week" label="周视图"></t-option>
                    <t-option value="month" label="月视图"></t-option>
                  </t-select>
                </div>
                <t-calendar :mode="calendarMode" :value="currentDate"></t-calendar>
              </div>
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

  <!-- 弹窗 -->
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
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api as apiMin } from '@/api/control';
import { api } from '@/api/main';

const formVisible = ref(false);
const currentDate = ref(new Date());
const activeTab = ref('first'); // 默认激活的选项卡
const selectedOption = ref('');
const formTitle = ref('');
const tableData = ref([]);
const workgroupKeyword = ref('');
const calendarMode = ref<'month' | 'year'>('month'); // 默认为月视图

// 表格主位栏
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '1', width: 85, colKey: 'workgroupName' },
  { title: '2', width: 85, colKey: 'num' },
  { title: '3', width: 85, colKey: 'num3' },
];

// 模拟数据
const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
];

const SelectionChange = async (item) => {
  console.log('🚀 ~ SelectionChange ~ item:', item);
  // getArrangeCount 所需参数

  await getWorkgroupInfo(item.id); // 入参车间id

  await getArrangeCount(item); // 在接口中处理数据
};

// ?
const onChange = (value, context) => {
  console.log('onChange:', value, context);
  console.log(
    'timestamp:',
    context.dayjsValue.map((d) => d.valueOf()),
  );
  console.log(
    'YYYYMMDD:',
    context.dayjsValue.map((d) => d.format('YYYYMMDD')),
  );
};

// ?
const onPick = (value, context) => {
  console.log('onPick:', value, context);
};

// 获取班组信息
const getWorkgroupInfo = async (id) => {
  if (!id) {
    tableData.value = []; // 如果 id 为空，清空表格数据
    return;
  }
  try {
    const result = await api.workgroup.getList({
      pageNum: 1,
      pageSize: 999999,
      workshopId: id,
    });
    // console.log('🚀 ~ getWorkgroupInfo ~ result:', result);
    // 将班组名转换为表格所需的对象数组格式
    const formattedData1 = result.list.map((item) => {
      return { workgroupName: item.workgroupName };
    });
    tableData.value = formattedData1; // 设置表格数据
  } catch (error) {
    console.error('获取班组信息失败:', error);
    tableData.value = []; // 出错时重置表格数据
  }
};

// 获取已排天数
const getArrangeCount = async (data) => {
  const { timeCreate, timeModified, id } = data;
  console.log('🚀 ~ getArrangeCount ~ timeCreate, timeModified, id:', timeCreate, timeModified, id);

  const result = await apiMin.workgroupArrange.getArrangeCount({
    workshopId: id,
    workgroupKeyword: workgroupKeyword.value, // 模糊关键字
    dateStart: timeCreate,
    dateEnd: timeModified,
  });
  console.log('🚀 ~ getArrangeCount ~ reslut:', result);

  const formattedData2 = result.map((item) => {
    return { num: item.num };
  });
  tableData.value = formattedData2; // 设置表格数据

  /**
   * 0 未排班
   *
   *
   */
};

// add
// const addTeamScheduling = () => {
//   formTitle.value = '班组排班';
//   formVisible.value = true;
// };
const handleTabChange = (newValue) => {
  activeTab.value = newValue;
};
</script>

<style lang="less" scoped>
.date-picker-container {
  display: flex; /* 应用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
  margin-bottom: 10px; /* 添加一些底部外边距 */
}

.date-picker-container > * {
  flex: 1; /* 使子元素平均分配空间 */
  margin-right: 10px; /* 添加右边距 */
}

.calendar-container {
  display: flex;
  flex-direction: row; /* 改为行布局 */
  align-items: flex-start;
  justify-content: space-between; /* 确保元素之间有空间 */
}

.inputs-container {
  margin-top: 20px;
  width: 300px; /* 控制输入区域宽度 */
}

.right-aligned-calendar {
  flex-grow: 1; /* 使日历填充剩余空间 */
  width: auto; /* 或指定一个宽度 */
  margin-left: 20px; /* 增加左边距 */
}

.mode-selector {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
