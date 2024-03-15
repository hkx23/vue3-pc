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
        @select-change="onPrintChange"
      >
        <template #title> 首末检记录 </template>
        <template #button>
          <t-select v-model="printTemplate" label="打印模板" :clearable="true" style="width: 240px">
            <t-option v-for="item in onPrintTemplateList.list" :key="item.id" :label="item.tmplName" :value="item.id" />
          </t-select>
          <cmp-print-button :template-id="printTemplate" :data="printData" :show-icon="false" @before-print="onPrint"
            >打印</cmp-print-button
          >
        </template>
        <template #billNo="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="pageSwitch()">{{ slotProps.row.billNo }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import CmpQuery from '@/components/cmp-query/index.vue';
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
const total = ref(null); // 总页数
const tableData = ref([]); // 表格渲染数据
const printTemplate = ref(''); // 打印模板数据
const selectedRowKeys: Ref<any[]> = ref([]); // 打印ID数组
const printData = ref([]);
const permission = ref(false); // 页面控制
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
  const res = await api.pqcInspectFirst.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    ...queryParams.value,
  });
  tableData.value = res.list; // 表格数据赋值
  total.value = res.total; // 总页数赋值
  selectedRowKeys.value = [];
  MessagePlugin.success('查询成功');
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
// 初始化 检验结果 下拉框数据
const inspectResultDataList = [
  { label: '合格', value: 'OK' },
  { label: '不合格', value: 'NG' },
];
// 初始化 品质改善 下拉框数据
const isImproveDataList = [
  { label: '是', value: 'true' },
  { label: '否', value: 'false' },
];

// 打印选择 框 行 事件
const onPrintChange = async (value: any, context) => {
  printTemplate.value = '';
  const { moScheId } = context.currentRowData;
  selectedRowKeys.value = value;
  await onPrintTemplateData(moScheId); // 打印模板下拉数据
};

// 获取 打印模板 下拉数据
const onPrintTemplateList = reactive({ list: [] });
const onPrintTemplateData = async (moScheId) => {
  const res = await api.pqcInspectFirst.getPrintTmplList({ moScheId });
  onPrintTemplateList.list = res;
};

// 点击 打印事件
const onPrint = async () => {
  if (!selectedRowKeys.value.length) {
    MessagePlugin.warning('请选择需要打印的数据！');
    return false;
  }
  if (!printTemplate.value) {
    MessagePlugin.warning('请选择打印模板！');
    return false;
  }
  try {
    printData.value = [];
    loading.value = true;

    selectedRowKeys.value.forEach((id) => {
      const foundItem = tableData.value.find((item) => item.id === id);
      const DataBase = {
        SERIAL_NUMBER: foundItem.serialNumber,
        TIME_CREATE: new Date(),
        QTY: foundItem.wipNum,
        MITEM_CODE: foundItem.mitemCode,
        MITEM_NAME: foundItem.mitemName,
        SCHE_CODE: foundItem.scheCode,
        WC_NAME: foundItem.workcenterName,
        DATETIME_SCHE: foundItem.datetimeSche,
        ORG_NAME: foundItem.orgName,
      };
      printData.value.push({
        variable: DataBase,
        datasource: { DataBase },
      });
    });

    await api.pqcInspectFirst.print(selectedRowKeys.value);
    await queryRef.value.search(); // 刷新数据
    MessagePlugin.success('打印成功');
    selectedRowKeys.value = [];
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    loading.value = false;
  }
};

// 单据明细界面开关
const pageSwitch = () => {
  permission.value = true;
};

// 重置按钮
const onReset = () => {
  queryParams.value = '';
  queryRef.value.search();
};

// 表单刷新按钮
const fetchData = () => {
  queryRef.value.search();
  selectedRowKeys.value = [];
};

// 列定义f
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 35,
  },
  {
    colKey: 'billNo',
    title: t('pqcInspectFirst.billNo'), // 检验单号
    align: 'center',
    width: 135,
  },
  {
    colKey: 'inspectOpportunityName',
    title: t('pqcInspectFirst.inspectOpportunityName'), // 检验时机
    align: 'center',
  },
  {
    colKey: 'scheCode',
    title: t('pqcInspectFirst.scheCode'), // 排产单
    width: 136,
    align: 'center',
  },
  {
    colKey: 'mitemCode',
    title: t('pqcInspectFirst.mitemCode'), // 物料编码
    width: 110,
    align: 'center',
  },
  {
    colKey: 'mitemName',
    title: t('pqcInspectFirst.mitemName'), // 物料名称
    width: 110,
    align: 'center',
  },
  {
    colKey: 'statusName',
    title: t('pqcInspectFirst.statusName'), // 单据状态
    width: 80,
    align: 'center',
  },
  {
    colKey: 'inspectResult',
    title: t('pqcInspectFirst.inspectResult'), // 检验结果
    width: 80,
    align: 'center',
  },
  {
    colKey: 'workshopName',
    title: t('pqcInspectFirst.workshopName'), // 车间
    width: 110,
    align: 'center',
  },
  {
    colKey: 'wcName',
    title: t('pqcInspectFirst.wcName'), // 工作中心
    width: 130,
    align: 'center',
  },
  {
    colKey: 'userInspectName',
    title: t('pqcInspectFirst.userInspectName'), // 检验人
    width: 100,
    align: 'center',
  },
  {
    colKey: 'datetimeInspectEnd',
    title: t('pqcInspectFirst.datetimeInspectEnd'), // 检验完成时间
    width: 162,
    align: 'center',
  },
  {
    colKey: 'creatorName',
    title: t('pqcInspectFirst.creatorName'), // 创建人
    width: 100,
    align: 'center',
  },
  {
    colKey: 'timeCreate',
    title: t('pqcInspectFirst.timeCreate'), // 创建时间
    width: 162,
    align: 'center',
  },
  {
    colKey: 'improveNos',
    title: t('pqcInspectFirst.improveNos'), // 改善单据
    width: 180,
    align: 'center',
  },
];
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
