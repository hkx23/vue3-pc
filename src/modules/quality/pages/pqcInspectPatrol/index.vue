<!-- 巡检查询 -->
<template>
  <detail v-if="permission" :row-data="{ bill }" @permission-show="onPermission"></detail>
  <cmp-container v-if="!permission" :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput" @reset="onReset">
        <template #inspectResult="{ param }">
          <t-select v-model="param.inspectResult" :clearable="true" label="检验结果">
            <t-option v-for="item in inspectResultDataList" :key="item.value" :label="item.label" :value="item.value" />
          </t-select>
        </template>
        <template #status="{ param }">
          <t-select v-model="param.status" :clearable="true" label="检验状态">
            <t-option v-for="item in statusDataList.list" :key="item.id" :label="item.label" :value="item.value" />
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
        <template #title> 巡检记录 </template>
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
            <t-link variant="text" theme="primary" name="edit" @click="pageSwitch(slotProps)">{{
              slotProps.row.billNo
            }}</t-link>
          </t-space>
        </template>
        <template #inspectResultName="slotProps">
          <t-space :size="8">
            <t-tag
              shape="round"
              theme="primary"
              :class="{
                OK: slotProps.row.inspectResultName === '合格',
                NG: slotProps.row.inspectResultName === '不合格',
                UNDERWAY: slotProps.row.inspectResultName === '暂无结果',
              }"
              >{{ slotProps.row.inspectResultName }}</t-tag
            >
          </t-space>
        </template>
        <template #improveNos="slotProps">
          <template v-for="(improve, index) in slotProps.row.improveNos" :key="index">
            <t-link :value="improve" variant="text" theme="primary" name="edit" @click="onEditRowClick(improve)"
              >{{ improve }}
            </t-link>
            <t-text
              v-if="index < slotProps.row.improveNos.length - 1"
              :value="index"
              variant="text"
              theme="primary"
              name="edit"
              >、
            </t-text>
          </template>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import CmpPrintButton from '@/components/cmp-print-button/index.vue';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import detail from './detail.vue';

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
const bill = ref({});
const router = useRouter();
// 渲染函数
onMounted(async () => {
  await queryRef.value.search();
  await loadStatus();
});

// 点击查询按钮
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const [dateStart, dateEnd] = data.servicingTime.map((date) => dayjs(date).format('YYYY-MM-DD'));
  // 更新查询参数状态
  queryParams.value = {
    ...data,
    dateStart,
    dateEnd,
  };
  const res = await api.pqcInspectPatrol.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    ...queryParams.value,
  });
  tableData.value = res.list; // 表格数据赋值
  total.value = res.total; // 总页数赋值
  selectedRowKeys.value = [];
  // MessagePlugin.success('查询成功');
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
    status: {
      label: '检验状态',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'status',
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
    billNo: {
      label: '检验单号',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
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
      label: '产品编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    user: {
      label: '质检人员',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
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
const pageSwitch = async (value: any) => {
  permission.value = true;
  try {
    // 更新响应式数据
    bill.value = value.row;
  } catch (error) {
    console.error('获取单据数据失败:', error);
  }
};

const onPermission = async (value) => {
  permission.value = value;
  selectedRowKeys.value = [];
  const res = await api.pqcInspectPatrol.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    ...queryParams.value,
  });
  tableData.value = res.list; // 表格数据赋值
  total.value = res.total; // 总页数赋值
};

// 跳转到单据管理
const onEditRowClick = (improve: String) => {
  const tabRouters = router.getRoutes();
  const routeInfo = tabRouters.find((item1) => item1.meta.sourcePath === `/quality#/qualityImprove`);
  if (routeInfo) {
    const url = `${routeInfo.path}?billNo=${improve}`;
    router.push(url);
  }
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
    title: t('pqcInspectPatrol.billNo'), // 检验单号
    align: 'center',
    width: 135,
  },
  {
    colKey: 'workshopName',
    title: t('pqcInspectPatrol.workshopName'), // 车间
    width: 110,
    align: 'center',
  },
  {
    colKey: 'scheCode',
    title: t('pqcInspectPatrol.scheCode'), // 排产单
    width: 136,
    align: 'center',
  },
  {
    colKey: 'wcName',
    title: t('pqcInspectPatrol.wcName'), // 工作中心
    width: 130,
    align: 'center',
  },
  {
    colKey: 'mitemCode',
    title: t('pqcInspectPatrol.mitemCode'), // 产品编码
    width: 110,
    align: 'center',
  },
  {
    colKey: 'mitemName',
    title: t('pqcInspectPatrol.mitemDesc'), // 产品描述
    width: 110,
    align: 'center',
  },
  {
    colKey: 'statusName',
    title: t('pqcInspectPatrol.statusName'), // 单据状态
    width: 80,
    align: 'center',
  },
  {
    colKey: 'inspectResultName',
    title: t('pqcInspectPatrol.inspectResult'), // 检验结果
    width: 100,
    align: 'center',
  },
  {
    colKey: 'userInspectName',
    title: t('pqcInspectPatrol.userInspectName'), // 质检人员
    width: 100,
    align: 'center',
  },
  {
    colKey: 'datetimeInspectEnd',
    title: t('pqcInspectPatrol.datetimeInspectEnd'), // 检验完成时间
    width: 162,
    align: 'center',
  },
  {
    colKey: 'timeCreate',
    title: t('pqcInspectPatrol.timeCreate'), // 创建时间
    width: 162,
    align: 'center',
  },
  {
    colKey: 'improveNos',
    title: t('pqcInspectPatrol.improveNos'), // 改善单据
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

//检验结果tag根据结果的不同适用不同的主题样式
.OK {
  background-color: green;
}

.NG {
  background-color: red;
}

.UNDERWAY {
  background-color: blueviolet;
}
</style>
