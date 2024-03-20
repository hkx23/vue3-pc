<!-- 出勤模式 -->
<template>
  <!-- :full-sub-index="[1, 2]" -->
  <cmp-container :full="false">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput">
        <template #shiftCode="{ param }">
          <t-select v-model="param.shiftCode" :clearable="true" label="班次">
            <t-option v-for="item in shiftDataList" :key="item.value" :label="item.label" :value="item.value" />
          </t-select>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card>
      <!-- ################# 出勤模式表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        empty="没有符合条件的数据"
        row-key="id"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="shiftColumns"
        active-row-type="single"
        :table-data="teamList.list"
        :total="teamTotal"
        :selected-row-keys="selectedRowKeys"
        @row-click="onGroupSelectChange"
        @select-change="onSelectChange"
        @refresh="onFetchGroupData"
      >
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ '编辑' }}</t-link>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onGroupDelect(row)">{{ '删除' }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData"> 新增 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onTeamDeleteBatches()">
              <t-button theme="default"> 批量删除 </t-button>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #出勤模式 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="teamFormData" label-width="120px" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-row :gutter="[32, 16]">
        <t-col :span="12">
          <t-form-item label="出勤模式编码" name="modeCode">
            <t-input v-model="teamFormData.modeCode"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="出勤模式名称" name="modeName">
            <t-input v-model="teamFormData.modeName"></t-input>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col :span="12">
          <t-form-item label="出勤模式描述" name="modeDesc">
            <t-input v-model="teamFormData.modeDesc"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="12">
          <t-form-item label="班次" name="shiftCode">
            <t-select v-model="teamFormData.shiftCode" :clearable="true">
              <t-option v-for="item in shiftDataList" :key="item.value" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <!-- 第 3️⃣ 行数据 -->
        <t-col :span="12">
          <t-row
            v-for="(timeRange, index) in teamFormData.expression"
            :key="index"
            justify="space-between"
            align="center"
            style="margin-bottom: 16px"
          >
            <t-col :span="10">
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
            <t-col :span="2" style="text-align: center">
              <icon
                v-if="teamFormData.expression.length > 1"
                name="minus-circle"
                size="1.5em"
                @click="() => delFormSubmit(index)"
              />
            </t-col>
          </t-row>
        </t-col>
      </t-row>
      <!--# 🌈添加按钮 -->
      <t-col :span="12">
        <t-form-item label="">
          <t-button block variant="outline" @click="addFormSubmit">添加</t-button>
        </t-form-item>
      </t-col>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const defaultTimeRange = ['', '']; // 默认时间范围
const teamFormData = ref({
  modeCode: '', // 出勤模式编码
  modeName: '', // 出勤模式名称
  modeDesc: '', // 出勤模式描述
  shiftCode: '', // 班次
  expression: [defaultTimeRange], // 初始时包含一个默认时间范围
});

// 转化成分钟
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// 得到 一个分钟 组成的数组
function convertAndFlattenTimeIntervals(timeIntervals) {
  return timeIntervals.flatMap((interval) => interval.map(timeToMinutes));
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
// 判断最后一个时间是否等于第一个时间段
function isFirstEqualToLast(arr) {
  return arr[0] !== arr[arr.length - 1];
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

// 删除时间组件
const delFormSubmit = (index: number) => {
  teamFormData.value.expression.splice(index, 1);
};

// const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 出勤模式dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const submitFalg = ref(false);
// $出勤模式 表格数据
const teamList = reactive({ list: [] });
// 出勤模式表格数据总条数
const teamTotal = ref(0);
// $人员 表格数据
const supportPersonInUserList = reactive({ list: [] });
// 人员表格数据总条数
const supportPersonTotal = ref(0);
// dialog 弹框数据
// 初始渲染
onMounted(async () => {
  await onShiftTabData(); // 获取 出勤模式表格 数据
  await onShiftSelectData(); // 班次下拉数据获取
});

// 班次下拉数据获取
const shiftDataList = ref([]);
const onShiftSelectData = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'SHIFT_CODE' });
  shiftDataList.value = res;
};

// ####班次 表头
const shiftColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'modeCode',
    title: '出勤模式编码',
    width: '100',
  },
  {
    colKey: 'modeName',
    title: '出勤模式名称',
    width: '100',
  },
  {
    colKey: 'modeDesc',
    title: '出勤模式描述',
    width: '130',
  },
  {
    colKey: 'shiftName',
    title: '班次',
    width: '80',
  },
  {
    colKey: 'expression',
    title: '工作时间',
    width: '150',
  },
  {
    colKey: 'actionSlot',
    title: '操作',
    fixed: 'right',
    width: '130',
  },
];

// # 出勤模式刷新按钮
const onFetchGroupData = async () => {
  pageUI.value.page = 1;
  await onShiftTabData(); // 获取 出勤模式表格 数据
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
  rowGroupId.value = '';
};

// 表单定义规则
const rules: FormRules = {
  modeCode: [{ required: true, trigger: 'blur' }],
  modeName: [{ required: true, trigger: 'blur' }],
  shiftCode: [{ required: true, trigger: 'change' }],
};

// #出勤模式搜索
const opts = computed(() => {
  return {
    keyword: { label: '出勤模式名称', comp: 't-input', event: 'input', defaultval: '' },
    shiftCode: { label: '班次', defaultVal: '', slotName: 'shiftCode' },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  teamParam.value.keyword = data.keyword;
  teamParam.value.shiftCode = data.shiftCode;
  await onShiftTabData();
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
  rowGroupId.value = '';
};

const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #出勤表格 参数
const teamParam = ref({
  pageNum: 1,
  pageSize: 20,
  keyword: '', // 出勤模式名称
  shiftCode: '', // 班次
});

// #获取 出勤表格 数据
const onShiftTabData = async () => {
  teamParam.value.pageNum = pageUI.value.page;
  teamParam.value.pageSize = pageUI.value.rows;
  const res = await api.attendanceMode.getList(teamParam.value);
  teamList.list = res.list;
  teamTotal.value = res.total;
};

// #添加 出勤模式 数据请求
const onAddSupportGroup = async () => {
  try {
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
    const newArr = appendNFromFirstDecrease(flattenedConvertedIntervals);
    const convert = convertToTimeRange(newArr).join(';');
    const teamFormDataCloneDeep = _.cloneDeep(teamFormData.value);
    delete teamFormDataCloneDeep.expression;
    await api.attendanceMode.addAttendanceMode({ ...teamFormDataCloneDeep, expression: convert });
    await onShiftTabData(); // 获取 出勤模式表格 数据
    formVisible.value = false;
    MessagePlugin.success('新增成功');
  } catch (error) {
    teamFormData.value.expression = [defaultTimeRange];
  }
};

// #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  teamFormData.value.expression = [['', '']];
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = '出勤模式新增';
};

// #编辑 点击 出勤模式右侧表格编辑按钮
const workGroupRowId = ref('');
const onEditRow = (row: any) => {
  teamFormData.value.modeCode = row.modeCode; // 出勤模式代码
  teamFormData.value.modeName = row.modeName; // 出勤模式名称
  teamFormData.value.modeDesc = row.modeDesc; // 出勤模式描述
  teamFormData.value.shiftCode = row.shiftCode; // 车间 ID
  teamFormData.value.expression = _.cloneDeep(row.expressionSpilt); // 车间 ID
  workGroupRowId.value = row.id;
  submitFalg.value = false; // 编辑为 false
  formVisible.value = true;
  diaLogTitle.value = '编辑出勤模式';
};

// #编辑 出勤模式 表格数据 请求
const onGroupRequest = async () => {
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
  const newArr = appendNFromFirstDecrease(flattenedConvertedIntervals);
  const convert = convertToTimeRange(newArr).join(';');
  delete teamFormData.value.expression;
  await api.attendanceMode.modifyAttendanceMode({
    ...teamFormData.value,
    expression: convert,
    id: workGroupRowId.value,
  });
  await onShiftTabData(); // 获取 出勤模式表格 数据
  formVisible.value = false;
  MessagePlugin.success('编辑成功');
};

// ！删除 获取 出勤模式 批量删除数组
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};

const rowGroupId = ref(''); // 点击行ID
const onGroupSelectChange = async ({ row }) => {
  rowGroupId.value = row.id;
};

// ！ 删除 单项删除 出勤模式 点击
const onGroupDelect = (row: any) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};

// ！出勤模式表格删除确认按钮
const onDelConfirm = async () => {
  await api.attendanceMode.removeBatch([rowGroupId.value]);
  if (teamList.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onShiftTabData(); // 获取 出勤模式表格 数据
  MessagePlugin.success('删除成功');
  selectedRowKeys.value = []; // 置空
};

// ！出勤模式表格批量删除按钮
const onTeamDeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = teamList.list.length;
  // 步骤 2: 执行删除操作
  await api.attendanceMode.removeBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === teamList.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
  }
  MessagePlugin.success('批量删除成功');
  await onShiftTabData(); // 获取 出勤模式表格 数据
  selectedRowKeys.value = []; // 置空
};

// @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddSupportGroup(); // 新增请求
    } else {
      await onGroupRequest(); // 编辑请求
    }
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.filled-icon {
  color: var(--td-success-color);
}
</style>
