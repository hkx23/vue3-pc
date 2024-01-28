<!-- 班组排班 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <div class="tab-container">
        <t-tabs :value="activeTab" class="left-tabs" @change="handleTabChange">
          <t-tab-panel value="first" label="班组">
            <div class="calendar-container">
              <t-space direction="vertical" class="inputs-container">
                <bcmp-select-business
                  v-model="selectedOption"
                  class="demo-select-base"
                  :is-multiple="false"
                  :show-title="false"
                  type="workshop"
                  label-field="orgName"
                  @selection-change="SelectionChange"
                >
                </bcmp-select-business>
                <t-input v-memo="workgroupKeyword" class="demo-select-base" placeholder="搜索班组" />
                <!-- table -->
                <t-table row-key="id" :columns="tableColumns" :data="tableData" empty="请先选择车间">
                  <!-- 取时间段排了多少天  差值 或者  不等于0 就是已排天数      num等于差值就是已排满 -->
                  <template #num="{ row }">
                    <span v-if="row.num == '0'" class="status-label">待排</span>
                    <!-- num < 0 && < dayDatas -->
                    <span v-if="row.num > 0 && row.num > dayDatas" class="status-label">已排班{{ dayDatas }}</span>
                    <span v-if="row.num == dayDatas" class="status-label status-full">排满</span>
                  </template>

                  <!-- + 号 solt -->
                  <template #num1="{ row }">
                    <t-space v-if="row.num !== dayDatas">
                      <t-link theme="primary" style="font-weight: 700" @click="addTeamScheduling(row)"> ＋ </t-link>
                    </t-space>
                  </template>
                </t-table>
              </t-space>

              <div class="right-aligned-calendar">
                <!-- 在日期选择器下方添加前一周和后一周按钮 -->
                <div class="date-picker-container">
                  <!--  week 日期选择 -->
                  <!-- <t-date-range-picker mode="week" clearable allow-input /> -->
                  <t-date-range-picker v-model="range1" allow-input clearable @change="handleDateChange" />
                  <t-tabs theme="card" :value="tabPanelValue">
                    <t-tab-panel value="week" label="周"></t-tab-panel>
                    <t-tab-panel value="month" label="月"></t-tab-panel>
                  </t-tabs>
                </div>
                <t-calendar :controller-config="false" type="month" :mode="calendarMode" :value="currentDate">
                  <template #cellAppend="{ data }">
                    <div v-if="getShow(data)" class="cell-append-demo-outer">
                      <t-tag theme="success" variant="light" size="small" class="activeTag" style="width: 100%">
                        {{ data.mode == 'month' ? '我们的纪念日' : '我们的纪念月' }}
                      </t-tag>
                    </div>
                  </template>
                </t-calendar>
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
  <t-dialog v-model:visible="formVisible" :on-confirm="onConfirmForm" :header="formTitle">
    <t-form ref="formRef" :data="teamFormData">
      <t-row :gutter="[32, 16]">
        <t-col :span="10">
          <!--  <t-row :gutter="[32, 16]"> -->
          <t-form-item label="班组">
            <t-input v-model="resOrgName" disabled></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="10">
          <t-form-item label="日期">
            <t-date-range-picker
              v-model="teamFormData.attendanceExpression"
              allow-input
              clearable
              @change="handleDateChange1"
            />
          </t-form-item>
        </t-col>
        <t-col :span="10">
          <t-form-item label="工作中心">
            <bcmp-select-business
              v-model="teamFormData.workcenterId"
              class="demo-select-base"
              :is-multiple="false"
              :show-title="false"
              type="workcenter"
              label-field="wcName"
            >
            </bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- <t-col :span="10">
          <t-form-item label="出勤模式">
            <t-select></t-select>
          </t-form-item>
        </t-col> -->
        <t-col :span="10">
          <t-form-item label="出勤模式" name="modeName">
            <bcmp-select-business
              v-model="teamFormData.attendanceModeId"
              class="demo-select-base"
              :is-multiple="false"
              :show-title="false"
              type="attendanceMode"
              label-field="modeName"
              @selection-change="SelectionChangeAttendanceMode"
            >
            </bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-row v-for="(timeRange, index) in teamFormData.expression" :key="index" :gutter="[32, 16]">
          <t-col>
            <t-form-item :label="'时间段' + (index + 1)" :name="'expression' + index">
              <t-time-range-picker
                v-model="teamFormData.expression[index]"
                class="demos"
                clearable
                format="HH:mm"
                allow-input
              />
            </t-form-item>
          </t-col>
        </t-row>
      </t-row>
      <t-row justify="center" style="margin-top: 16px">
        <t-button block variant="outline" style="width: 90%" @click="addFormSubmit">添加</t-button>
      </t-row>
      <template #footer>
        <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
      </template>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { differenceInCalendarDays, differenceInDays, endOfMonth, startOfMonth } from 'date-fns';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api as apiMin } from '@/api/control';
import { api } from '@/api/main';
// import dayjs from 'dayjs';

const formVisible = ref(false);
const activeTab = ref('first'); // 默认激活的选项卡
const selectedOption = ref('');
const formTitle = ref('');
const tableData = ref([]);
const workgroupKeyword = ref('');
const calendarMode = ref<'month'>('month'); // 默认为月视图
const currentDate = ref(new Date());
const range1 = ref([new Date(), new Date()]); // 初始日期范围
const tabPanelValue = ref('week'); // 控制 tab panel 的值
const qTimeCreate = ref(''); // 查询开始时间
const qTimeModified = ref(''); // 查询结束时间
// const qnewRange = ref([]); //查询结束时间
const resValue1 = ref([]);
const resValue2 = ref([]);
const dayDatas = ref(0); // 天数
const resOrgName = ref('');
const teamId = ref('');
const workgroupArranges = ref([]); // 日历数据

// 表格主位栏
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '', width: 120, colKey: 'workgroupName' },
  { title: '', width: 80, colKey: 'num' },
  { title: '', width: 0, colKey: 'num1' },
];

const eidtFormSubmit = () => {
  formVisible.value = false;
};

// 选择车间change事件
const SelectionChange = async (item) => {
  await getWorkgroupInfo(item.id); // 入参车间id
  await getArrangeCount(item); // 在接口中处理数据
  await getWorkgroupArrangeList(item.id);
};

// 选择出勤模式事件
const SelectionChangeAttendanceMode = async (item) => {
  const { expressionSpilt, shiftCode } = item; // 给到时间段
  teamFormData.value.expression = expressionSpilt;
  teamFormData.value.shiftCode = shiftCode;
};

const defaultTimeRange = ['', '']; // 默认时间范围
// 提交的数据
const teamFormData = ref({
  workcenterId: '', // 工作中心
  attendanceModeId: '', // 出勤模式
  attendanceExpression: [], // 排班日期
  expression: [defaultTimeRange], // 初始时包含一个默认时间范围
  dateStart: '',
  dateEnd: '',
  shiftCode: '',
});

// 挂载
onMounted(async () => {
  await initDateRange();
  await TimeStampCalculation();
});

const onConfirmForm = async () => {
  // console.log('submitData===', submitData);
  const flattenedConvertedIntervals = convertAndFlattenTimeIntervals(teamFormData.value.expression);
  const isValid = flattenedConvertedIntervals.every((element) => !Number.isNaN(element));
  if (!isValid) {
    MessagePlugin.warning('时间段不能为空！');
    return;
  }
  const flag = checkArray(flattenedConvertedIntervals);
  if (!flag) {
    MessagePlugin.warning('时间间隔不能超过24小时，请重新输入！');
    return;
  }

  // 设置 expression 字段为 convert 的值
  delete teamFormData.value.expression;
  // delete teamFormData.value.attendanceExpression; //日期分化 删除
  const newArr = appendNFromFirstDecrease(flattenedConvertedIntervals);
  const convert = convertToTimeRange(newArr).join(';');
  // 提交数据到后端
  const reslut = apiMin.workgroupArrange.addWorkgroupArrange({
    ...teamFormData.value,
    attendanceExpression: convert,
    workgroupId: teamId.value, // 选中的班组id  todo 不拿全局
  });
  console.log('🚀 ~ onConfirmForm ~ reslut:', reslut);
  // 关闭弹窗
  formVisible.value = false;
  getWorkgroupInfo({});
  getArrangeCount({});
  getWorkgroupArrangeList({});
};

// 过了午夜，后面的数组加 N
function appendNFromFirstDecrease(arr) {
  // 查找第一个递减的位置
  let decreaseIndex = -1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      decreaseIndex = i;
      break;
    }
  }
  // 如果找到了递减的位置，从那个位置开始修改数组
  if (decreaseIndex !== -1) {
    for (let i = decreaseIndex; i < arr.length; i++) {
      arr[i] = `${arr[i]}N`;
    }
  }
  return arr;
}

// 拼接成后端需要的格式 函数
function convertToTimeRange(arr) {
  // 将分钟数转换为24小时制时间格式，例如 90 => '01:30'
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
  const timeRanges = [];
  for (let i = 0; i < arr.length; i += 2) {
    // 检查数组长度是否为偶数
    if (i + 1 >= arr.length) {
      throw new Error('Array length must be even');
    }
    // 处理带'N'的情况
    let start = arr[i].toString();
    let end = arr[i + 1].toString();
    const startN = start.includes('N');
    const endN = end.includes('N');
    // 转换为时间格式
    start = minutesToTime(parseInt(start, 10)); // 指定基数为10
    end = minutesToTime(parseInt(end, 10)); // 指定基数为10
    // 拼接结果
    timeRanges.push(`${start + (startN ? 'N' : '')}-${end}${endN ? 'N' : ''}`);
  }
  return timeRanges;
}

// 添加时间组件
const addFormSubmit = () => {
  const flattenedConvertedIntervals = convertAndFlattenTimeIntervals(teamFormData.value.expression);
  const isValid = flattenedConvertedIntervals.every((element) => !Number.isNaN(element));
  if (!isValid) {
    MessagePlugin.warning('时间段不能为空！');
    return;
  }
  const flag = checkArray(flattenedConvertedIntervals);
  if (!flag) {
    MessagePlugin.warning('时间间隔不能超过24小时，请重新输入！');
    return;
  }
  const isFirst = isFirstEqualToLast(flattenedConvertedIntervals);
  if (!isFirst) {
    MessagePlugin.warning('时间段已经累计了24小时，不能继续添加时间段！');
    return;
  }
  teamFormData.value.expression.push([...defaultTimeRange]); // 添加新的时间范围
};

// 得到 一个分钟 组成的数组
function convertAndFlattenTimeIntervals(timeIntervals) {
  return timeIntervals.flatMap((interval) => interval.map(timeToMinutes));
}

// 转化成分钟
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// 判断最后一个时间是否等于第一个时间段
function isFirstEqualToLast(arr) {
  return arr[0] !== arr[arr.length - 1];
}

// 判断时间是否超过了24小时
function checkArray(arr) {
  let decreaseCount = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      decreaseCount++;
      // 如果出现两次及以上递减，直接返回false
      if (decreaseCount >= 2) {
        return false;
      }
      // 检查从第一次递减点到数组结束，是否有值大于数组的第一个值
      for (let j = i; j < arr.length; j++) {
        if (arr[j] > arr[0]) {
          return false;
        }
      }
    }
  }
  // 如果数组没有递减的部分，返回true
  return true;
}

// 时间戳计算
const TimeStampCalculation = () => {
  const newGetTimeCreate = new Date(qTimeCreate.value).getTime();
  const newGetTimeModified = new Date(qTimeModified.value).getTime(); // 结束时间
  //  一天的毫秒数 86,400,000
  // 日期转时间戳，相减，除以一天的毫秒数，就可以的到天数
  const result = (newGetTimeModified - newGetTimeCreate) / 86400000;
  dayDatas.value = result; // 存天数
};

// 辅助函数，将 Date 转换为 YYYY-MM-DD 格式
const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`; // 月份从0开始，因此加1
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  // 确保月份和日期始终是两位数
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${year}-${month}-${day}`;
};

// 转换 range1.value 中的日期
const formatRange1 = () => {
  return range1.value.map((date) => formatDate(date));
};

// 在组件初始化时设置日期范围为当前月份
const initDateRange = () => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  range1.value = [start, end];
  // 使用格式化函数并打印结果
  const formattedDates = formatRange1();
  handleDateChange(formattedDates); // 初始化 formattedDates 当前月的时间
};

// 使用数组解构
const handleDateChange = (newRange) => {
  [qTimeCreate.value, qTimeModified.value] = newRange; // 初始化入参
  if (newRange && newRange.length === 2) {
    const [start, end] = newRange;
    const daysDiff = differenceInCalendarDays(end, start);
    if (daysDiff > 31) {
      MessagePlugin.error('选择的日期范围不能超过31天！');
      const now = new Date();
      range1.value = [startOfMonth(now), endOfMonth(now)];
    }
  }
};
// 弹窗里的日期
const handleDateChange1 = (newRange) => {
  [qTimeCreate.value, qTimeModified.value] = newRange;
  if (newRange && newRange.length === 2) {
    const [start, end] = newRange;
    const daysDiff = differenceInCalendarDays(end, start);
    if (daysDiff > 31) {
      MessagePlugin.error('选择的日期范围不能超过31天！');
      const now = new Date();
      range1.value = [startOfMonth(now), endOfMonth(now)];
    }
  }
};

// 将 resValue1 和 resValue2 中的数据合并到 tableData
const mergeData = () => {
  const mergedData = [];
  for (let i = 0; i < resValue1.value.length; i++) {
    const rowData = {
      id: resValue1.value[i].id,
      workgroupName: resValue1.value[i].workgroupName,
      num: resValue2.value[i].num,
    };
    mergedData.push(rowData);
  }
  tableData.value = mergedData;
};

// 获取班组信息 在 getWorkgroupInfo 函数中将 resValue1 添加到 tableData
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
    // 将班组名转换为表格所需的对象数组格式
    const formattedData1 = result.list.map((item) => {
      return { workgroupName: item.workgroupName, id: item.id };
    });
    resValue1.value = formattedData1;
    teamId.value = id;
    // 合并数据
    mergeData();
  } catch (error) {
    console.error('获取班组信息失败:', error);
    tableData.value = []; // 出错时重置表格数据
  }
};

// 获取已排天数 在 getArrangeCount 函数中将 resValue2 添加到 tableData
const getArrangeCount = async (data) => {
  // getArrangeCount 所需参数
  const { id } = data;
  const result = await apiMin.workgroupArrange.getArrangeCount({
    workshopId: id,
    workgroupKeyword: workgroupKeyword.value, // 模糊关键字
    dateStart: qTimeCreate.value, // 查询开始时间
    dateEnd: qTimeModified.value, // 查询结束时间
  });
  console.log('🚀 ~ getArrangeCount ~ result:', result);
  const formattedData2 = result.map((item) => {
    return { num: item.num };
  });
  resValue2.value = formattedData2;
  // 合并数据
  mergeData();
};

// 查询班组
const getWorkgroupArrangeList = async (id) => {
  const reslut = await apiMin.workgroupArrange.getList({
    dateStart: qTimeCreate.value,
    dateEnd: qTimeModified.value,
    workgroupId: id,
  });
  console.log('🚀 ~ getWorkgroupArrangeList ~ reslut:', reslut);
  // 存数据
  workgroupArranges.value = reslut;
};

// const getShow = (data) => {
//   return workgroupArranges.value.some((arrange) => {
//     const arrangeDate = new Date(arrange.datetimeArrange).toISOString().split('T')[0];
//     console.log('🚀 ~ returnworkgroupArranges.value.some ~ arrangeDate:', arrangeDate);
//     return arrangeDate === data.formattedDate;
//   });
// };

const getShow = (data) => {
  if (!data || !data.formattedDate) {
    return false;
  }

  // 将接口返回的日期格式转换为 'YYYY-MM-DD' 格式
  const arrangedDates = workgroupArranges.value.map((arrange) => {
    const arrangeDate = new Date(arrange.datetimeArrange);
    return `${arrangeDate.getFullYear()}-${(arrangeDate.getMonth() + 1).toString().padStart(2, '0')}-${arrangeDate.getDate().toString().padStart(2, '0')}`;
  });

  // 检查日历中的日期是否在 arrangedDates 数组中
  return arrangedDates.includes(data.formattedDate);
};

// add
const addTeamScheduling = (row) => {
  console.log('🚀 ~ addTeamScheduling ~ row:', row);
  resOrgName.value = row.workgroupName;
  formTitle.value = '班组排班';
  formVisible.value = true;
};

// 切换选项卡
const handleTabChange = (newValue) => {
  activeTab.value = newValue;
};

// 监听 range1 的变化
watch(range1, (newValue) => {
  if (newValue && newValue.length === 2) {
    const [start, end] = newValue;
    const daysDiff = differenceInDays(end, start);
    if (daysDiff > 7) {
      // 如果选中的日期范围超过7天，则切换到月视图
      tabPanelValue.value = 'month';
    } else {
      // 否则保持周视图
      tabPanelValue.value = 'week';
    }
  }
});
</script>
<style lang="less" scoped>
.date-picker-container {
  display: flex;
  flex-direction: row; /* 子元素水平排列 */
  justify-content: flex-end; /* 子元素靠右对齐 */
  align-items: flex-start;
}

.calendar-container {
  display: flex;
  flex-direction: row; /* 改为行布局 */
  align-items: flex-start;
  justify-content: space-between; /* 确保元素之间有空间 */
}

.inputs-container {
  margin-top: 20px;
  width: 450px; /* 控制输入区域宽度 */
}

.right-aligned-calendar {
  flex-grow: 1; /* 使日历填充剩余空间 */
  width: auto; /* 或指定一个宽度 */
  margin-left: 20px; /* 增加左边距 */
}

.status-label {
  border: 1px solid red; /* Add a red border */
  color: red; /* Change text color to red */
  padding: 2px 5px; /* Optional: Add padding for better appearance */
  border-radius: 4px; /* Optional: Add border radius for rounded corners */
}

.status-full {
  border: 1px solid green;
  color: green;
}
</style>
