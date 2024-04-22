<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryParams" :opts="opts" @submit="onInput">
        <template #flag="{ param }">
          <t-select v-model="param.flag" :clearable="true" label="下发标识">
            <t-option v-for="item in flagDataList.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
        <template #moStatus="{ param }">
          <t-select v-model="param.moStatus" :clearable="true" label="工单状态">
            <t-option v-for="item in moStatusDataList.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :fixed-height="true"
        :table-data="anomalyTypeData.list"
        :total="anomalyTotal"
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchData"
      >
        <template #title>
          {{ '排产下发历史查询列表' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage(); // 分页工具
const selectedRowKeys: Ref<any[]> = ref([]); // 要删除的id
const queryParams = ref();

// 初始渲染
onMounted(async () => {
  await onflag();
  await onMoStatus();
  await queryParams.value.search(); // 获取 表格 数据
});

// #获取搜索 下发标识 下拉框数据
const flagDataList = reactive({ list: [] });
const onflag = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'FP_PUBLISH_FLAG' });
  flagDataList.list = res;
};

// #获取搜索 工单状态 下拉框数据
const moStatusDataList = reactive({ list: [] });
const onMoStatus = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'C_MO_STATUS' });
  moStatusDataList.list = res;
};

// 表格数据总条数
const anomalyTotal = ref(0);
// 表格数据
const anomalyTypeData = reactive({ list: [] });
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'moReleaseVersion',
    title: '下发版本号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'moReleaseFlag',
    title: '下发标识',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'datetimeRelease',
    title: '下发时间',
    align: 'center',
    width: '170',
  },
  /*   {
    colKey: 'typeName',
    title: '错误信息',
    align: 'center',
    width: '100',
  }, */
  {
    colKey: 'orgName',
    title: '工厂',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'workshopName',
    title: '计划组',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'wcCode',
    title: '生产线编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'wcName',
    title: '生产线名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'planNo',
    title: '计划单号',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'moCode',
    title: '工单号',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'offlineQty',
    title: '数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'completedQty',
    title: '完工入库数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeActualStart',
    title: '开始时间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeActualEnd',
    title: '结束时间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'stayTime',
    title: '占用时长',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeRequire',
    title: '需求日期',
    align: 'center',
    width: '100',
  },
  /* {
    colKey: 'aa',
    title: '项目号',
    align: 'center',
    width: '100',
  }, */
  {
    colKey: 'statusName',
    title: '状态',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'moClass',
    title: '工单类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeActualStart',
    title: '最早开始时间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'uph',
    title: 'UPH',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'memo',
    title: '备注',
    align: 'center',
    width: '100',
  },
];

// 刷新按钮
const onFetchData = () => {
  queryParams.value.search();
  selectedRowKeys.value = [];
};

// #query 查询参数
const opts = computed(() => {
  return {
    servicingTime: {
      label: '下发日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',

      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      eventHandle: {},
    },
    version: {
      label: '下发版本',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    flag: {
      label: '下发标识',
      labelWidth: '60',
      bind: {
        options: flagDataList,
        lazyLoad: true,
      },
      event: 'select',
      defaultVal: '',
      slotName: 'flag',
    },
    org: {
      label: '工厂',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'plant',
        showTitle: false,
      },
    },
    workshop: {
      label: '计划组',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workcenter: {
      label: '生产线',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    planNo: {
      label: '计划单号',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    mitem: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    moCode: {
      label: '工单号',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    mo: {
      label: '工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    moStatus: {
      label: '工单状态',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'moStatus',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const { servicingTime, version, flag, org, workshop, workcenter, planNo, mitem, moCode, mo, moStatus } = data;
  const [dateStart, dateEnd] = servicingTime;
  const res = await api.moRelease.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    dateStart,
    dateEnd,
    version,
    flag,
    orgId: org,
    workshopId: workshop,
    workcenterId: workcenter,
    planNo,
    mitemId: mitem,
    moCode,
    moId: mo,
    moStatus,
  });

  anomalyTypeData.list = res.list;
  anomalyTotal.value = res.total;
  // MessagePlugin.success('查询成功');
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
