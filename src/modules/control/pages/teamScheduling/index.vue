<!-- 班组排班 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <div>
        <!-- @change="handleTabChange" todo 工作中心 -->
        <t-tabs :value="activeTab" class="left-tabs">
          <t-tab-panel value="first" label="班组">
            <div class="container">
              <!-- 左侧 -->
              <div class="left-content">
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
                  <t-input v-model="workgroupKeyword" placeholder="搜索班组" />
                  <!-- table -->
                  <t-table
                    row-key="id"
                    :columns="tableColumns"
                    :data="tableData"
                    :row-class-name="getRowClassName"
                    active-row-type="single"
                    empty="请先选择车间"
                    @row-click="onRowClick"
                    >>
                    <!-- 取时间段排了多少天  
                      num === 0  代排  
                      dayDatas > 0 > num 是已排天数      
                      num === dayDatas 值就是已排满
                    -->
                    <template #num="{ row }">
                      <span v-if="row.num === 0" class="status-label">待排</span>
                      <span v-if="row.num > 0 && row.num < dayDatas" class="status-label">已排班{{ row.num }}天</span>
                      <span v-if="row.num === dayDatas" class="status-label status-full">排满</span>
                    </template>

                    <!-- + 号 solt -->
                    <template #num1="{ row }">
                      <t-space v-if="row.num !== dayDatas">
                        <t-link theme="primary" style="font-weight: 700" @click="addTeamScheduling(row)">＋</t-link>
                      </t-space>
                    </template>
                  </t-table>
                </t-space>
              </div>
              <!-- 右侧 -->
              <div class="right-content">
                <!-- 在日期选择器下方添加前一周和后一周按钮 -->
                <div class="date-picker-container">
                  <div>
                    <t-button
                      class="btn-last"
                      title="上个周期"
                      theme="default"
                      variant="outline"
                      @click="updateDateRange('last')"
                    >
                      <t-icon name="chevron-left" />
                    </t-button>
                    <!-- 日期组件 -->
                    <t-date-range-picker
                      v-model="range1"
                      allow-input
                      clearable
                      class="date-picker"
                      @change="handleDateChange"
                    />
                    <t-button
                      class="btn-next"
                      title="下个周期"
                      theme="default"
                      variant="outline"
                      @click="updateDateRange('next')"
                    >
                      <t-icon name="chevron-right" />
                    </t-button>
                    <!-- <t-tabs theme="card" :value="tabPanelValue" style="margin-left: 15px">
                      <t-tab-panel value="week" label="周"></t-tab-panel>
                      <t-tab-panel value="month" label="月"></t-tab-panel>
                    </t-tabs> -->
                    <t-button
                      theme="primary"
                      variant="outline"
                      :class="{ selected: selectedPeriod === 'week' }"
                      @click="updateDateWeek()"
                    >
                      周
                    </t-button>
                    <t-button
                      theme="primary"
                      variant="outline"
                      :class="{ selected: selectedPeriod === 'month' }"
                      @click="updateDateMoon()"
                    >
                      月
                    </t-button>
                  </div>
                </div>
                <!-- 日历组件 -->
                <div class="custom-calendar">
                  <t-calendar
                    :controller-config="false"
                    type="month"
                    :mode="calendarMode"
                    :value="currentDate"
                    :fill-with-zero="false"
                  >
                    <!-- 日历插槽 -->
                    <template #cellAppend="data">
                      <div v-for="arrange in workgroupArranges" :key="arrange.id">
                        <div v-if="isMatch(data.formattedDate, arrange.datetimeArrange)">
                          <div v-for="item in arrange.details" :key="item.id" class="tag-wrapper">
                            <t-tag :title="'点击修改'" class="custom-tag" @click="editData(item)">
                              {{ item.workgroupName }} | {{ item.shiftName }} | {{ item.wcName }}
                              <button class="tag-close-btn" @click.stop="requestDeleteItem(item)">×</button>
                            </t-tag>
                          </div>
                        </div>
                      </div>
                    </template>
                  </t-calendar>
                </div>
              </div>
            </div>
          </t-tab-panel>
          <!-- todo -->
          <!-- <t-tab-panel value="second" label="工作中心">
              <p>工作中心内容</p>
            </t-tab-panel>  -->
        </t-tabs>
      </div>
    </cmp-card>
  </cmp-container>

  <!-- 弹窗 -->
  <t-dialog v-model:visible="formVisible" :on-confirm="onConfirmForm" :header="formTitle">
    <t-form :data="teamFormData">
      <t-row :gutter="[32, 16]">
        <t-col :span="10">
          <t-form-item label="班组">
            <t-input v-model="resOrgName" disabled></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="10">
          <t-form-item v-if="formTitle !== '编辑'" label="日期">
            <t-date-range-picker
              v-model="teamFormData.attendanceExpression"
              allow-input
              clearable
              @change="handleDateChange1"
            />
          </t-form-item>

          <t-form-item v-else label="日期">
            <t-input v-model="datetimeArrange" disabled />
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
      </t-row>

      <t-row :gutter="[32, 16]" style="margin-top: 16px">
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

        <t-col :span="10">
          <t-form-item label="班次">
            <t-select v-model="selectedShift" clearable>
              <t-option
                v-for="shift in shiftData"
                :key="shift.value"
                :label="shift.label"
                :value="shift.value"
              ></t-option>
            </t-select>
          </t-form-item>
        </t-col>
      </t-row>
      <t-row
        v-for="(timeRange, index) in teamFormData.expression"
        :key="index"
        :gutter="[32, 16]"
        style="margin-top: 16px"
      >
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
      <t-row justify="center" style="margin-top: 16px">
        <t-button block variant="outline" style="width: 55%" @click="addFormSubmit">添加</t-button>
      </t-row>
      <template #footer>
        <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
      </template>
    </t-form>
  </t-dialog>
  <!-- 删除弹窗 -->
  <t-dialog v-model:visible="isConfirmDialogVisible" header="提示" title="确认删除" @confirm="confirmDelete">
    <h3>确定要删除这个排班信息吗？</h3>
  </t-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api as apiMin } from '@/api/control';
import { api } from '@/api/main';

const formVisible = ref(false);
const activeTab = ref('first'); // 默认激活的选项卡
const selectedOption = ref('');
const formTitle = ref('');
const tableData = ref([]);
const calendarMode = ref<'month'>('month'); // 默认为月视图
const currentDate = ref(new Date());
const range1 = ref([new Date(), new Date()]); // 初始日期范围
const tabPanelValue = ref('week'); // 控制 tab panel 的值
const qTimeCreate = ref(''); // 查询开始时间
const qTimeModified = ref(''); // 查询结束时间
const resValue1 = ref([]);
const resValue2 = ref([]);
const dayDatas = ref(0); // 天数
const resOrgName = ref('');
const teamId = ref('');
const itemId = ref(''); // 编辑id
const workgroupArranges = ref([]); // 日历数据
const shiftData = ref([]); // 班次
const shiftCodeData = ref(''); // 班次编码
const selectedRowId = ref(null);
const datetimeArrange = ref(''); // 编辑日期
const selectedShift = ref(''); // 绑定到 t-select 的 v-model

// 表格主位栏
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '', width: 110, colKey: 'workgroupName' },
  { title: '', width: 110, colKey: 'num' },
  { title: '', width: 0, colKey: 'num1' },
];

const eidtFormSubmit = () => {
  formVisible.value = false;
};

const selectedPeriod = ref('month'); // 默认为'month'
// 点击表格行数据
const onRowClick = (row) => {
  selectedRowId.value = row.row.id;
  console.log('点击的行数据：', row); // 打印整个行对象
  const { id } = row.row;
  getWorkgroupArrangeList(id);
};

// 确认对话框的显示状态和待删除项的状态
const isConfirmDialogVisible = ref(false);
const itemToDelete = ref(null);

// 调用此方法以显示删除确认对话框
const requestDeleteItem = (item) => {
  itemToDelete.value = item;
  isConfirmDialogVisible.value = true;
};

// 用户确认删除
const confirmDelete = async () => {
  if (itemToDelete.value) {
    try {
      await apiMin.workgroupArrange.removeWorkgroupArrange(itemToDelete.value.id);
      await getArrangeCount({});
      await getWorkgroupInfo({});
      await getWorkgroupArrangeList(selectedRowId.value);
      await MessagePlugin.success('删除成功');
      // 判断是否已经没有数据todo
      isConfirmDialogVisible.value = false; // 关闭对话框
    } catch (error) {
      console.error('删除失败：', error);
      MessagePlugin.error('删除失败');
    }
  }
};

// todo
const getRowClassName = ({ row }) => {
  return row.id === selectedRowId.value ? 'highlight-row' : '';
};

// 点击修改
const editData = (arrangeData) => {
  console.log('🚀 ~ editData ~ arrangeData:编辑数据', arrangeData);
  formVisible.value = true; // 打开对话框
  formTitle.value = '编辑';
  resOrgName.value = arrangeData.workgroupName;
  // 设置 teamFormData 的值
  teamId.value = arrangeData.workgroupId; // 编辑时再次存id
  itemId.value = arrangeData.id; // 编辑时的id
  teamFormData.value = {
    ...arrangeData,
  };
  datetimeArrange.value = arrangeData.datetimeArrange;
};

// 检查日历单元格的日期与后端数据的日期是否匹配
const isMatch = (calendarDate, arrangeDate) => {
  const formatCalendarDate = formatDate(calendarDate);
  const formatArrangeDate = formatDate(new Date(arrangeDate)); // arrangeDate 是日期字符串
  return formatCalendarDate === formatArrangeDate;
};

// 获取 数据字典 班次
const getShiftCode = async () => {
  try {
    const res = await api.param.getListByGroupCode({
      parmGroupCode: 'SHIFT_CODE',
    });
    shiftData.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

// 选择车间change事件
const SelectionChange = async (item) => {
  await getArrangeCount(item); // 在接口中处理数据
  await getWorkgroupInfo(item.id); // 入参车间id
  await getWorkgroupArrangeList(item.id);
};

// 选择出勤模式事件
const SelectionChangeAttendanceMode = async (item) => {
  const { expressionSpilt, shiftName, shiftCode } = item; // 给到时间段
  teamFormData.value.expression = expressionSpilt;
  teamFormData.value.shiftName = shiftName;
  shiftCodeData.value = shiftCode; // 传code todo
  selectedShift.value = shiftName; // 更新选中的班次名称（显示班次名称）
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
  shiftName: '', // 班次
  shiftCode: '',
});

// 挂载
onMounted(async () => {
  await initDateRange();
  await TimeStampCalculation();
  await getShiftCode();
  await getArrangeCount({}); // 需要 在 getWorkgroupInfo 之前调用
  await getWorkgroupInfo({});
  await getWorkgroupArrangeList({});
});

const updateDateRange = (direction) => {
  const amount = tabPanelValue.value === 'week' ? 7 : 1; // 一周或一个月
  const unit = tabPanelValue.value === 'week' ? 'day' : 'month';

  if (direction === 'next') {
    range1.value = [
      dayjs(range1.value[0]).add(amount, unit).toDate(),
      dayjs(range1.value[1]).add(amount, unit).toDate(),
    ];
  } else if (direction === 'last') {
    range1.value = [
      dayjs(range1.value[0]).subtract(amount, unit).toDate(),
      dayjs(range1.value[1]).subtract(amount, unit).toDate(),
    ];
  }
  handleDateChange(range1.value.map((date) => formatDate(date)));
};

// 删除数据的方法
// const deleteData = async (item) => {
//   console.log('🚀 ~ deleteData ~ item:', item);
//   try {
//     // 调用 API 接口删除数据
//     await apiMin.workgroupArrange.removeWorkgroupArrange(item.id);
//     MessagePlugin.success('删除成功');
//     getWorkgroupArrangeList(selectedRowId.value);
//     getWorkgroupInfo({});
//     getArrangeCount({});
//   } catch (error) {
//     console.error('删除失败：', error);
//     MessagePlugin.error('删除失败');
//   }
// };

// 重置表单
const resetFormData = () => {
  teamFormData.value = {
    workcenterId: '', // 工作中心
    attendanceModeId: '', // 出勤模式
    attendanceExpression: [new Date(), new Date()], // 排班日期，设置为当前日期范围
    expression: [defaultTimeRange], // 时间段
    dateStart: '',
    dateEnd: '',
    shiftName: '', // 班次
    shiftCode: '',
  };
  resOrgName.value = ''; // 清空班组名称
  selectedShift.value = ''; // 清空班次选择
};

// 提交
const onConfirmForm = async () => {
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

  // 提取起始和结束日期
  const [startDate, endDate] = teamFormData.value.attendanceExpression;
  // 将日期格式化为 YYYY-MM-DD 格式
  teamFormData.value.dateStart = formatDate(startDate);
  teamFormData.value.dateEnd = formatDate(endDate);

  if (formTitle.value === '编辑') {
    // 调用编辑接口
    await apiMin.workgroupArrange.modifyWorkgroupArrange({
      id: itemId.value, // 当前数据id
      datetimeArrange: datetimeArrange.value,
      shiftCode: teamFormData.value.shiftCode, // 班次code
      // timeCreate: teamFormData.value.dateStart,
      // timeModified: teamFormData.value.dateEnd,
      workcenterId: teamFormData.value.workcenterId,
      workgroupId: teamId.value,
      attendanceModeId: teamFormData.value.attendanceModeId,
      attendanceExpression: convert,
    });
    await MessagePlugin.success('编辑成功');
    // 调用清空表单方法
    resetFormData(); // 重置表单数据
  } else {
    // 调用新增接口
    await apiMin.workgroupArrange.addWorkgroupArrange({
      // ... 新增所需的参数 ...
      ...teamFormData.value,
      attendanceExpression: convert,
      workgroupId: teamId.value, // 选中的班组id 不拿全局
      shiftCode: shiftCodeData.value, // 班次code 出勤模式带出
    });
    await MessagePlugin.success('新增成功');
    // 调用清空表单方法
    await resetFormData(); // 重置表单数据
  }
  // 关闭弹窗
  formVisible.value = false;
  // 重新获取数据  严格按照这个步骤执行
  await getArrangeCount({});
  await getWorkgroupInfo({});
  await getWorkgroupArrangeList(selectedRowId.value); // 选中行的id
};

// 过了当天0点，后面的数组加 N
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
// 时间戳转换
const TimeStampCalculation = () => {
  const start = dayjs(qTimeCreate.value);
  // 获取时间戳
  const startTimeStamp = start.valueOf();
  const end = dayjs(qTimeModified.value);
  const endTimeStamp = end.valueOf();

  // 计算两个时间戳之间的差值，并转换为天数  todo
  const diffInDays = (endTimeStamp - startTimeStamp) / 86400000 + 1;
  console.log('🚀 ~ TimeStampCalculation ~ diffInDays:todo', diffInDays);
  dayDatas.value = diffInDays;
};

// 周维度
const updateDateWeek = () => {
  selectedPeriod.value = 'week';
  const today = dayjs();
  const startOfWeek = today.subtract(6, 'day'); // 从今天往前数6天（加上今天总共7天）

  range1.value = [startOfWeek.toDate(), today.toDate()];
  handleDateChange([startOfWeek.format('YYYY-MM-DD'), today.format('YYYY-MM-DD')]);
};

// 月维度
const updateDateMoon = () => {
  selectedPeriod.value = 'month';
  const startOfMonth = dayjs().startOf('month');
  const endOfMonth = dayjs().endOf('month');

  range1.value = [startOfMonth.toDate(), endOfMonth.toDate()];
  handleDateChange([startOfMonth.format('YYYY-MM-DD'), endOfMonth.format('YYYY-MM-DD')]);
};

// 辅助函数，将 Date 转换为 YYYY-MM-DD 格式
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

// 转换 range1.value 中的日期
const formatRange1 = () => {
  return range1.value.map((date) => formatDate(date));
};

// 在组件初始化时设置日期范围为当前月份
const initDateRange = () => {
  const now = dayjs();
  const start = now.startOf('month');
  const end = now.endOf('month');
  range1.value = [start.toDate(), end.toDate()];
  const formattedDates = formatRange1();
  handleDateChange(formattedDates); // 初始化 formattedDates 当前月的时间
};

const handleDateChange = (newRange) => {
  [qTimeCreate.value, qTimeModified.value] = newRange; // 初始化入参 使用数组解构
  if (newRange && newRange.length === 2) {
    const [start, end] = newRange;
    const daysDiff = dayjs(end).diff(dayjs(start), 'day');
    if (daysDiff > 31) {
      MessagePlugin.error('选择的日期范围不能超过31天！');
      const now = new Date();
      range1.value = [start(now), end(now)];
    }
  }
};
// 弹窗里的日期
const handleDateChange1 = (newRange) => {
  // [qTimeCreate.value, qTimeModified.value] = newRange;  // todo
  if (newRange && newRange.length === 2) {
    const [start, end] = newRange;
    const daysDiff = dayjs(end).diff(dayjs(start), 'day');
    if (daysDiff > 31) {
      MessagePlugin.error('选择的日期范围不能超过31天！');
      const now = new Date();
      range1.value = [start(now), end(now)];
    }
  }
};

// 获取班组信息 在 getWorkgroupInfo 函数中将 resValue1 添加到 tableData
const getWorkgroupInfo = async (id) => {
  let result;
  if (id) {
    // 如果提供了id，根据id获取信息
    result = await api.workgroup.getList({
      pageNum: 1,
      pageSize: 999999,
      workshopId: id,
    });
  } else {
    // 如果没有提供id，执行默认逻辑
    result = await api.workgroup.getList({
      pageNum: 1,
      pageSize: 999999,
    });
  }
  // 将班组名转换为表格所需的对象数组格式
  resValue1.value = result.list.map((item) => {
    return { workgroupName: item.workgroupName, id: item.id };
  });
  // 调用合并
  await mergeData();
  // const arrWorkgroupName = []; // 搜索数据源
  // 取到所有的 workgroupName 根据用户输入 模糊匹配 搜索班组 -- workgroupKeyword
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
  resValue2.value = result.map((item) => {
    return { num: item.num };
  });
};

// 合并数据
const mergeData = () => {
  const mergedData = resValue1.value.map((item, index) => {
    // 获取对应索引位置的 num 值
    const numValue = resValue2.value[index] ? resValue2.value[index].num : '0';
    return {
      ...item,
      num: numValue,
    };
  });
  console.log('Merged Data:todo', mergedData);
  tableData.value = mergedData;
};

// 查询班组
const getWorkgroupArrangeList = async (id) => {
  // 调用 API 获取数据
  const result = await apiMin.workgroupArrange.getList({
    dateStart: qTimeCreate.value,
    dateEnd: qTimeModified.value,
    workgroupId: id,
    workgroupKeyword: '', // todo
  });
  console.log('🚀 ~ getWorkgroupArrangeList ~ result数据源:', result);
  //  result 是一个包含排班信息的数组
  workgroupArranges.value = result.map((arrange) => ({
    ...arrange,
    details: arrange.data,
  }));
};

// add
const addTeamScheduling = (row) => {
  resetFormData(); // 重置表单数据
  resOrgName.value = row.workgroupName;
  teamId.value = row.id; // 取班组id 存
  formTitle.value = '班组排班';
  formVisible.value = true;
};

// 切换选项卡 todo 工作中心
// const handleTabChange = (newValue) => {
//   activeTab.value = newValue;
// };

// todos 更新表格数据以显示匹配的班组
async function filterOrSearchWorkgroups(keyword: string) {
  const filteredWorkgroups = resValue1.value.filter((item) => item.workgroupName.includes(keyword));
  tableData.value = filteredWorkgroups;
}

watch(range1, (newValue) => {
  if (newValue && newValue.length === 2) {
    const [start, end] = newValue;
    const daysDiff = dayjs(end).diff(dayjs(start), 'day');
    if (daysDiff > 7) {
      // 如果选中的日期范围超过7天，则切换到月视图
      tabPanelValue.value = 'month';
    } else {
      // 否则保持周视图
      tabPanelValue.value = 'week';
    }
  }
});

// 监听 range1 的变化
watch(range1, (newRange) => {
  if (newRange && newRange.length === 2) {
    // 日期范围发生变化时的处理逻辑
    // 调用接口重新获取排班数据
    const selectedWorkgroupId = selectedRowId.value; // 保存了当前选中的班组 ID
    if (selectedWorkgroupId) {
      getWorkgroupArrangeList(selectedWorkgroupId);
    }
  }
});

// 当选择的班次变化时
watch(selectedShift, (newValue) => {
  // 查找班次代码
  const selectedShiftData = shiftData.value.find((shift) => shift.value === newValue);
  if (selectedShiftData) {
    // 更新班次代码
    teamFormData.value.shiftCode = selectedShiftData.value;
  }
});

const workgroupKeyword = ref('');
// 监视用户输入，触发搜索
watch(workgroupKeyword, async (newKeyword) => {
  console.log('🚀 ~ watch ~ newKeyword:监视用户输入', newKeyword);
  await filterOrSearchWorkgroups(newKeyword); // 根据关键词过滤或搜索班组
});
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.left-content {
  flex: 1; /* 让左侧内容占据必要空间，但不超过其内容大小 */
  margin-right: 10px;
}

.right-content {
  margin-top: 20px;
  flex: 3; /* 让右侧内容占据更多空间，这里的比例可以根据需要调整 */
}

.right-content .date-picker-container {
  display: flex; /* 启用Flexbox */
  justify-content: flex-end; /* 内容靠右对齐 */
  align-items: right; /* 垂直居中 */
  margin-bottom: 15px;
}

.date-picker {
  width: 260px;
}

.date-picker-container > div {
  display: flex; /* 确保内部div也使用flex布局 */
  align-items: center; /* 内部元素垂直居中 */
}

.inputs-container {
  margin-top: 20px;
  width: 315px; /* 控制输入区域宽度 */
}

//左侧 班排样式
.status-label {
  border: 1px solid red;
  color: red;
  padding: 2px 5px;
  border-radius: 4px;
}

.status-full {
  border: 1px solid green;
  color: green;
}

/* 日历标签样式 */
.t-tag {
  height: 100%;
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文本居中 */
  white-space: normal; /* 允许文本换行 */
  overflow: hidden; /* 超出部分隐藏 */
}

/* 调整日历中标签的样式 */
.custom-tag {
  margin-bottom: 5px;
}

/* 切换周月底色 */
.selected {
  // background-color: #0000ff; /* 十六进制颜色代码 */
  // color: white; /* 选中状态的文字颜色 */
  font-weight: 700;
  font-size: 16px;
}

.tag-wrapper {
  position: relative; /* 定义相对定位，作为绝对定位子元素的参考 */
}

.tag-close-btn {
  position: absolute; /* 绝对定位 */
  top: -5px; /* 向上偏移，根据需要调整 */
  right: -5px; /* 向右偏移，根据需要调整 */
  border: none; /* 可以根据需要定制样式 */
  background-color: transparent; /* 背景透明 */
  cursor: pointer; /* 鼠标指针变为点击手势 */

  /* 进一步的样式调整 */
}

.custom-calendar {
  height: 80%; /* 根据需要调整 */
  width: 100%; /* 或者是你希望的宽度 */
}

.t-calendar {
  /* 完全填充其父容器 */
  width: 100%;

  /* 高度自适应 */
  height: auto;
}

/* 去除日历容器的内边距 */
.custom-calendar .t-calendar {
  padding: 0;
}

/* 假设日历的每个单元格（天）使用了特定的类名 */
.custom-calendar .t-calendar-cell {
  padding: 0;
}

/* 可能还需要覆盖其他内部元素的padding，如日历的头部、周末行等 */
.custom-calendar .t-calendar-header,
.custom-calendar .t-calendar-week {
  padding: 0;
}

/* 调整日历单元格的高度 */
// .custom-calendar .t-calendar-cell {
//   position: relative; /* 设置为相对定位，以便内部的伪元素可以基于它进行绝对定位 */
//   padding-top: 100%; /* 使用padding-top来基于宽度设置等比高度 */
// }

// .custom-calendar .t-calendar-cell .cell-wrapper {
//   position: absolute; /* 使内容能够完全填充单元格 */
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex; /* 使用flex布局来居中内容 */
//   justify-content: center; /* 水平居中 */
//   align-items: center; /* 垂直居中 */
// }
</style>
