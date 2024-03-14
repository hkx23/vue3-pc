<!-- 首末检查询 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput" @reset="onReset">
        <template #inspectOpportunity="{ param }">
          <t-select v-model="param.inspectOpportunity" :clearable="true" label="检验时机">
            <t-option
              v-for="item in inspectOpportunityDataList.list"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </t-select>
        </template>
        <template #inspectResult="{ param }">
          <t-select v-model="param.inspectResult" :clearable="true" label="检验结果">
            <t-option v-for="item in inspectResultDataList" :key="item.value" :label="item.label" :value="item.value" />
          </t-select>
        </template>
        <template #status="{ param }">
          <t-select v-model="param.status" :clearable="true" label="单据状态">
            <t-option v-for="item in statusDataList.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
        <template #isImprove="{ param }">
          <t-select v-model="param.isImprove" :clearable="true" label="品质改善">
            <t-option v-for="item in isImproveDataList" :key="item.value" :label="item.label" :value="item.value" />
          </t-select>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        :table-data="tableData"
        :table-column="columns"
        row-key="id"
        :fixed-height="true"
        :total="total"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @refresh="fetchData"
        @select-change="rehandleSelectChange"
      >
        <template #title> 首末检记录 </template>
        <template #button>
          <!-- <t-select v-model="printTemplate" label="打印模板" :clearable="true" style="width: 240px">
            <t-option v-for="item in onPrintTemplateList.list" :key="item.id" :label="item.tmplName" :value="item.id" />
          </t-select>
          <cmp-print-button :template-id="printTemplate" :data="printData" :show-icon="false" @before-print="onPrint"
            >打印</cmp-print-button
          > -->
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- 模态框/对话框 -->
  <t-dialog
    v-model:visible="showDialog"
    :header="diaTitle"
    @close="onDialogClose"
    @cancel="onSecondaryReset"
    @confirm="submitForm"
  >
    <t-form
      ref="formRef"
      :loading="loading"
      :rules="FORM_RULES"
      :data="formData"
      scroll-to-first-error="smooth"
      label-align="right"
      label-width="130px"
      label-placement="left"
      @submit="onSubmit"
    >
      <!-- 计量单位名称： -->
      <t-form-item :label="t('mitemuom.unitName')" name="uomName">
        <t-input v-model="formData.uomName" :placeholder="t('common.placeholder.input')"></t-input>
      </t-form-item>
      <t-form-item :label="t('mitemuom.unitSymbol')" name="uom">
        <t-input v-model="formData.uom" :placeholder="t('common.placeholder.input')" :disabled="isdisables"></t-input>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();

const { loading } = useLoading();

import { api as mainApi } from '@/api/main';
import { api } from '@/api/quality';

import { useLang } from './lang';

const { t } = useLang();

const queryRef = ref();
const queryParams = ref({}); // 查询参数，默认为空
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const showDialog = ref(false); // 控制新增模态框开关
const total = ref(null); // 总页数
const tableData = ref([]); // 表格渲染数据
const formData = ref({ uomName: '', uom: '', id: null }); // 新增表单数据绑定
const queryData = ref(''); // 精确查询数据
const diaTitle = ref(''); // 模态框文字
const isdisables = ref(false);
const selectedRowKeys = ref([]); // 删除计量单位 id
// 渲染函数
onMounted(async () => {
  await queryRef.value.search();
  await loadInspectOpportunity();
  await loadStatus();
});

// 点击查询按钮
const onInput = async (data: any) => {
  const [dateStart, dateEnd] = data.servicingTime.map((date) => dayjs(date).format('YYYY-MM-DD'));
  // 更新查询参数状态
  queryParams.value = {
    ...data,
    dateStart,
    dateEnd,
  };
  try {
    const res = await api.pqcInspectFirst.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryParams.value,
    });
    tableData.value = res.list; // 表格数据赋值
    total.value = res.total; // 总页数赋值
  } catch (e) {
    MessagePlugin.success(t('common.message.selectRowTryAgain')); // 请选择行之后再尝试操作
  }
  selectedRowKeys.value = [];
};
const opts = computed(() => {
  return {
    servicingTime: {
      label: '创建日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',

      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      eventHandle: {
        blur: dateChange,
      },
    },
    billNo: {
      label: '检验单号',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    inspectOpportunity: {
      label: '检验时机',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'inspectOpportunity',
    },
    moScheId: {
      label: '排产单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    workshopId: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workcenterId: {
      label: '工作中心',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    inspectResult: {
      label: '检验结果',
      labelWidth: '60',
      bind: {
        options: inspectResultDataList,
        lazyLoad: true,
      },
      event: 'select',
      defaultVal: '',
      slotName: 'inspectResult',
    },
    status: {
      label: '单据状态',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'status',
    },
    isImprove: {
      label: '品质改善',
      labelWidth: '60',
      bind: {
        options: isImproveDataList,
        lazyLoad: true,
      },
      event: 'select',
      defaultVal: '',
      slotName: 'isImprove',
    },
  };
});

/** 日期范围 辅助函数
 */
const dateChange = async (data: any) => {
  // 获取当前选择的日期范围
  const selectedDateRange = data.value;
  // 将日期字符串转换为dayjs对象
  const startDate = dayjs(selectedDateRange[0]);
  const endDate = dayjs(selectedDateRange[1]);
  // 计算日期范围的天数差异
  const daysDifference = endDate.diff(startDate, 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    await MessagePlugin.warning('日期跨度不得超过31天');
  }
};

// #获取搜索 检验时机 下拉框数据
const inspectOpportunityDataList = reactive({ list: [] });
const loadInspectOpportunity = async () => {
  const res = await mainApi.param.getListByGroupCode({ parmGroupCode: 'INSPECTION_OPPORTUNITY' });
  inspectOpportunityDataList.list = res;
};
// #获取搜索 单据状态 下拉框数据
const statusDataList = reactive({ list: [] });
const loadStatus = async () => {
  const res = await mainApi.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_STATUS' });
  statusDataList.list = res;
};

const inspectResultDataList = [
  { label: '合格', value: 'OK' },
  { label: '不合格', value: 'NG' },
];
const isImproveDataList = [
  { label: '是', value: 'true' },
  { label: '否', value: 'false' },
];

// 重置按钮
const onReset = () => {
  queryData.value = '';
  queryRef.value.search();
};

// 表单刷新按钮
const fetchData = () => {
  queryRef.value.search();
  selectedRowKeys.value = [];
};

// 表单清除
const onDialogClose = () => {
  formRef.value.reset({ type: 'empty' });
};

// 点击提交按钮，触发提交事件
const onSubmit = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    if (formData.value.id) {
      await onAmendMiteMuom(); // 有 ID 就发送编辑修改请求
      MessagePlugin.success(t('common.message.success'));
    } else {
      await onAddMiteMuom(); // 没有 ID 就发送新增请求
      MessagePlugin.success(t('common.message.addSuccess'));
    }
    showDialog.value = false;
    queryRef.value.search(); // 重新渲染数据
    formRef.value.reset({ type: 'empty' });
  } else {
    MessagePlugin.warning(firstError);
  }
};

// 取消按钮
const onSecondaryReset = () => {
  MessagePlugin.success('取消编辑');
  showDialog.value = false;
  formRef.value.reset({ type: 'empty' });
};

// 列定义f
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'billNo',
    title: t('pqcInspectFirst.billNo'), // 检验单号
    align: 'center',
  },
  {
    colKey: 'inspectOpportunityName',
    title: t('pqcInspectFirst.inspectOpportunityName'), // 检验时机
    align: 'center',
  },
  {
    colKey: 'scheCode',
    title: t('pqcInspectFirst.scheCode'), // 排产单
    width: 180,
    align: 'center',
  },
  {
    colKey: 'mitemCode',
    title: t('pqcInspectFirst.mitemCode'), // 物料编码
    width: 180,
    align: 'center',
  },
  {
    colKey: 'mitemName',
    title: t('pqcInspectFirst.mitemName'), // 物料名称
    width: 180,
    align: 'center',
  },
  {
    colKey: 'statusName',
    title: t('pqcInspectFirst.statusName'), // 单据状态
    width: 180,
    align: 'center',
  },
  {
    colKey: 'inspectResult',
    title: t('pqcInspectFirst.inspectResult'), // 检验结果
    width: 180,
    align: 'center',
  },
  {
    colKey: 'workshopName',
    title: t('pqcInspectFirst.workshopName'), // 车间
    width: 180,
    align: 'center',
  },
  {
    colKey: 'wcName',
    title: t('pqcInspectFirst.wcName'), // 工作中心
    width: 180,
    align: 'center',
  },
  {
    colKey: 'userInspectName',
    title: t('pqcInspectFirst.userInspectName'), // 检验人
    width: 180,
    align: 'center',
  },
  {
    colKey: 'datetimeInspectEnd',
    title: t('pqcInspectFirst.datetimeInspectEnd'), // 检验完成时间
    width: 180,
    align: 'center',
  },
  {
    colKey: 'creatorName',
    title: t('pqcInspectFirst.creatorName'), // 创建人
    width: 180,
    align: 'center',
  },
  {
    colKey: 'timeCreate',
    title: t('pqcInspectFirst.timeCreate'), // 创建时间
    width: 180,
    align: 'center',
  },
  {
    colKey: 'improveNos',
    title: t('pqcInspectFirst.improveNos'), // 改善单据
    width: 180,
    align: 'center',
  },
];

// 自定义计量单位 名称 新增校验规则
function checkUomUnique(value: any): boolean | CustomValidateResolveType {
  const currentEditingId = formData.value.id; // 获取当前正在编辑的条目的 ID
  const isDuplicate = tableData.value.some((item) => {
    return item.uomName === value && item.id !== currentEditingId; // 检查是否有重复的名称且不是当前编辑的条目
  });
  if (isDuplicate) {
    return { result: false, message: '计量单位名称已存在', type: 'error' };
  }
  return true;
}

// 自定义计量单位 符号 新增校验规则
function checkUomSymbolUnique(value: any): boolean | CustomValidateResolveType {
  // 如果当前是编辑操作并且正在编辑的数据有id，则不进行计量单位符号的验证
  if (formData.value.id) {
    return true;
  }
  const isDuplicate = tableData.value.some((item) => item.uom === value);
  if (isDuplicate) {
    return { result: false, message: '计量单位符号已存在', type: 'error' };
  }
  return true;
}

// 新增表单的验证规则
const FORM_RULES: FormRules = {
  uomName: [
    { required: true, message: '计量单位名称不能为空', trigger: 'blur' },
    { validator: checkUomUnique, trigger: 'blur', message: '计量单位名称已存在' },
  ],
  uom: [
    { required: true, message: '计量单位符号不能为空', trigger: 'blur' },
    { validator: checkUomSymbolUnique, trigger: 'blur', message: '计量单位符号已存在' },
  ],
};
/**
 * 新增计量单位
 */
const onAddMiteMuom = async () => {
  // await api.mitemUom.addItem(formData.value);
};

/**
 * 编辑修改请求
 */
const onAmendMiteMuom = async () => {
  // await api.mitemUom.updateItemByCode(formData.value);
  formData.value.uomName = ''; // 单位名称
  formData.value.uom = ''; // 单位名称字符
  formData.value.id = null; // 当前点击的 id
};

const submitForm = () => {
  formRef.value.submit();
};

// 获取复选框选中的数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.mitemuom-function-button {
  margin: 20px 0;
}

.black-icon {
  color: #181818;
}

.control-box {
  display: flex;
  justify-content: flex-end; /* 这会使按钮靠右对齐 */
}
</style>
