<template>
  <t-tabs v-model="tagValue" class="sub-tab" @change="switchTab">
    <t-tab-panel :value="0" :label="t('qcHold.tableSubTilte1')" :destroy-on-hide="false"> </t-tab-panel>
    <t-tab-panel :value="1" :label="t('qcHold.tableSubTilte2')" :destroy-on-hide="false"> </t-tab-panel>
    <t-tab-panel :value="2" :label="t('qcHold.tableSubTilte3')" :destroy-on-hide="false"> </t-tab-panel>
    <t-tab-panel :value="3" :label="t('qcHold.tableSubTilte4')" :destroy-on-hide="false"> </t-tab-panel>
  </t-tabs>
  <cmp-container v-show="tagValue == 0" :full="true" :ghost="true">
    <cmp-card :full="false">
      <cmp-query :opts="optsMo" :is-reset-query="false" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card :full="true"
      ><cmp-table
        ref="tableMoRef"
        v-model:pagination="pageUI"
        :fixed-height="true"
        row-key="id"
        :table-column="MoColumns"
        :table-data="moInfoList.list"
        :loading="loading"
        :total="moInfoList.total"
        @refresh="onRefresh"
      >
        <template #title>{{ t('qcHold.tableSubName1') }}</template>
        <template #button>
          <t-button :disabled="selectMoRowKeys?.length == 0" @click="onHandelLock(OperatorType.MO)">
            {{ t('qcHold.btnLock') }}
          </t-button>
          <t-button theme="default" @click="onHandelUnLock(OperatorType.MO)">
            {{ t('qcHold.btnUnlock') }}
          </t-button>
          <t-button theme="default" @click="onHandelLog(OperatorType.MO)">
            {{ t('qcHold.btnLog') }}
          </t-button>
        </template>
      </cmp-table></cmp-card
    >
  </cmp-container>
  <cmp-container v-show="tagValue == 1" :full="true" :ghost="true">
    <cmp-card :full="false">
      <cmp-query :opts="optsProduct" :is-reset-query="false" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card :full="true"
      ><cmp-table
        ref="tableProductRef"
        v-model:pagination="pageUIProduct"
        :fixed-height="true"
        row-key="serialNumber"
        :table-column="productColumns"
        :table-data="productInfoList.list"
        :loading="loading"
        :total="productInfoList.total"
        @refresh="onRefresh"
      >
        <template #title>{{ t('qcHold.tableSubName2') }}</template>
        <template #button>
          <t-button :disabled="selectProductRowKeys?.length == 0" @click="onHandelLock(OperatorType.PRODUCT)">
            {{ t('qcHold.btnLock') }}
          </t-button>
          <t-button theme="default" @click="onHandelUnLock(OperatorType.PRODUCT)">
            {{ t('qcHold.btnUnlock') }}
          </t-button>
          <t-button theme="default" @click="onHandelLog(OperatorType.PRODUCT)">
            {{ t('qcHold.btnLog') }}
          </t-button>
        </template>
      </cmp-table></cmp-card
    >
  </cmp-container>
  <cmp-container v-show="tagValue == 2" :full="true" :ghost="true">
    <cmp-card :full="false">
      <cmp-query :opts="optsWorkStation" :is-reset-query="false" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card :full="true"
      ><cmp-table
        ref="tableWorkstationRef"
        v-model:pagination="pageUIWorkStation"
        :fixed-height="true"
        row-key="id"
        :table-column="workStationColumns"
        :table-data="workStationInfoList.list"
        :loading="loading"
        :total="workStationInfoList.total"
        @refresh="onRefresh"
      >
        <template #title>{{ t('qcHold.tableSubName3') }}</template>
        <template #button>
          <t-button :disabled="selectWorkstationRowKeys?.length == 0" @click="onHandelLock(OperatorType.WORKSTATION)">
            {{ t('qcHold.btnLock') }}
          </t-button>
          <t-button theme="default" @click="onHandelUnLock(OperatorType.WORKSTATION)">
            {{ t('qcHold.btnUnlock') }}
          </t-button>
          <t-button theme="default" @click="onHandelLog(OperatorType.WORKSTATION)">
            {{ t('qcHold.btnLog') }}
          </t-button>
        </template>
      </cmp-table></cmp-card
    >
  </cmp-container>
  <cmp-container v-show="tagValue == 3" :full="true" :ghost="true">
    <cmp-card :full="false">
      <cmp-query :opts="optsMitem" :is-reset-query="false" @submit="conditionEnter"> </cmp-query>
    </cmp-card>
    <cmp-card :full="true"
      ><cmp-table
        ref="tableMitemRef"
        v-model:pagination="pageUIMitem"
        :fixed-height="true"
        row-key="labelNo"
        :table-column="mitemColumns"
        :table-data="mitemInfoList.list"
        :loading="loading"
        :total="mitemInfoList.total"
        @refresh="onRefresh"
      >
        <template #title>{{ t('qcHold.tableSubName4') }}</template>
        <template #button>
          <t-button :disabled="selectMitemRowKeys?.length == 0" @click="onHandelLock(OperatorType.MITEM)">
            {{ t('qcHold.btnLock') }}
          </t-button>
          <t-button theme="default" @click="onHandelUnLock(OperatorType.MITEM)">
            {{ t('qcHold.btnUnlock') }}
          </t-button>
          <t-button theme="default" @click="onHandelLog(OperatorType.MITEM)">
            {{ t('qcHold.btnLog') }}
          </t-button>
        </template>
      </cmp-table></cmp-card
    >
  </cmp-container>
  <!-- 子from  -->
  <detailed ref="detailFormRef" @show-close-event="onHandleLockShow"></detailed>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { api as apiControl } from '@/api/control';
import { api as apimain } from '@/api/main';
import { api as apiWarehouse } from '@/api/warehouse';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';
import { useLang } from './lang';

const router = useRouter();
const selectRows = ref([]);
const curOperatorType = ref('');
enum OperatorType {
  MO = 'MO', // 工单
  PRODUCT = 'PRODUCT', // 产品
  WORKSTATION = 'WORKSTATION', // 工站
  MITEM = 'MITEM', // 物料
}
const { t } = useLang();
// 工单类型下拉初始数据
const moClassOption = ref([]);
// 初始化系统字典工单类型
const initMoClass = async () => {
  try {
    setLoading(true);
    const res = (await apimain.param.getListByGroupCode({
      parmGroupCode: 'C_MO_TYPE',
    })) as any;
    moClassOption.value = res;
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};
const detailedShow = ref(false); // 控制执行界面显示隐藏
const detailFormRef = ref(null);
const tableMoRef = ref();
const tableProductRef = ref();
const tableWorkstationRef = ref();
const tableMitemRef = ref();
const selectMoRowKeys = computed(() => {
  return tableMoRef.value?.getSelectedRowKeys();
});
const selectProductRowKeys = computed(() => {
  return tableProductRef.value?.getSelectedRowKeys();
});
const selectWorkstationRowKeys = computed(() => {
  return tableWorkstationRef.value?.getSelectedRowKeys();
});
const selectMitemRowKeys = computed(() => {
  return tableMitemRef.value?.getSelectedRowKeys();
});

const { loading, setLoading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIProduct } = usePage(); // 分页工具
const { pageUI: pageUIWorkStation } = usePage(); // 分页工具
const { pageUI: pageUIMitem } = usePage(); // 分页工具
const moInfoList = reactive({ list: [], total: 0 });
const productInfoList = reactive({ list: [], total: 0 });
const workStationInfoList = reactive({ list: [], total: 0 });
const mitemInfoList = reactive({ list: [], total: 0 });

// tab 表格
const tagValue = ref(0);
// 查询组件值
const datePlanRangeDefault = ref([
  dayjs().format('YYYY-MM-DD 00:00:00'),
  dayjs().subtract(-31, 'day').format('YYYY-MM-DD 23:59:59'),
]); // 初始化日期控件
const optsMoValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
const optsProductValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
const optsWorkStationValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
const optsMitemValue = ref({ datePlanRange: datePlanRangeDefault.value }) as any;
// 查询组件-工单
const optsMo = computed(() => {
  return {
    datePlanRange: {
      label: t('qcHold.datePlanRange'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('common.placeholder.input', [`${t('qcHold.datePlanRange')}`]),
      bind: {
        enableTimePicker: true,
      },
    },
    moClass: {
      label: t('qcHold.moClass'),
      comp: 't-select',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.moClass')}`]),
      bind: {
        options: moClassOption.value,
      },
    },
    moCode: {
      label: t('qcHold.moCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.moCode')}`]),
    },

    categoryCode: {
      label: t('qcHold.mitemCategroyCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.mitemCategroyCode')}`]),
      bind: {
        type: 'mitemCategory',
        valueField: 'categoryCode',
      },
    },
    mitemCode: {
      label: t('qcHold.mitemCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.mitemCode')}`]),
      bind: {
        type: 'mitem',
        valueField: 'mitemCode',
      },
    },
    workshopCode: {
      label: t('qcHold.workshopCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workshopCode')}`]),
      bind: {
        type: 'workshop',
        valueField: 'orgCode',
      },
    },
    workCenterCode: {
      label: t('qcHold.workCenterCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workCenterCode')}`]),
      bind: {
        type: 'workcenter',
        valueField: 'wcCode',
      },
    },
  };
});

// 查询组件-产品
const optsProduct = computed(() => {
  return {
    datePlanRange: {
      label: t('qcHold.processTime'),
      comp: 't-date-range-picker',
      defaultVal: datePlanRangeDefault.value,
      placeholder: t('common.placeholder.input', [`${t('qcHold.processTime')}`]),
      bind: {
        enableTimePicker: true,
      },
    },
    moCode: {
      label: t('qcHold.moCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.moCode')}`]),
    },
    mitemCategroyId: {
      label: t('qcHold.mitemCategroyCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.mitemCategroyCode')}`]),
      bind: {
        type: 'mitemCategory',
        valueField: 'categoryCode',
      },
    },

    mitemId: {
      label: t('qcHold.mitemCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.mitemCode')}`]),
      bind: {
        type: 'mitem',
      },
    },
    workshopId: {
      label: t('qcHold.workshopCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workshopCode')}`]),
      bind: {
        type: 'workshop',
      },
    },
    workCenterId: {
      label: t('qcHold.workCenterCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workCenterCode')}`]),
      bind: {
        type: 'workcenter',
      },
    },
    processId: {
      label: t('qcHold.processName'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.processName')}`]),
      bind: {
        type: 'process',
      },
    },
    workstationId: {
      label: t('qcHold.workstationName'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workstationName')}`]),
      bind: {
        type: 'workstation',
      },
    },
    barcode: {
      label: t('qcHold.barcode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.barcode')}`]),
    },
    // label: {
    //   label: t('qcHold.label'),
    //   comp: 't-input',
    //   defaultVal: '',
    //   placeholder: t('common.placeholder.input', [`${t('qcHold.label')}`]),
    // },
    keyPart: {
      label: t('qcHold.keyPart'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.keyPart')}`]),
    },
  };
});

// 查询组件-机台
const optsWorkStation = computed(() => {
  return {
    workshopId: {
      label: t('qcHold.workshopCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workshopCode')}`]),
      bind: {
        type: 'workshop',
      },
    },
    workCenterId: {
      label: t('qcHold.workCenterCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workCenterCode')}`]),
      bind: {
        type: 'workcenter',
      },
    },
    processId: {
      label: t('qcHold.processName'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.processName')}`]),
      bind: {
        type: 'process',
      },
    },
    workstationId: {
      label: t('qcHold.workstationName'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workstationName')}`]),
      bind: {
        type: 'workstation',
      },
    },
    equipmentId: {
      label: t('qcHold.equipmentCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.equipmentCode')}`]),
      bind: {
        type: 'equipment',
      },
    },
  };
});

// 查询组件-物料
const optsMitem = computed(() => {
  return {
    mitemId: {
      label: t('qcHold.mitemCodeLabel'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.mitemCodeLabel')}`]),
      bind: {
        type: 'mitem',
      },
    },

    supplierId: {
      label: t('qcHold.supplierCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.supplierCode')}`]),
      bind: {
        type: 'supplier',
      },
    },
    workCenterId: {
      label: t('qcHold.workCenterCode'),
      comp: 'bcmp-select-business',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.workCenterCode')}`]),
      bind: {
        type: 'workcenter',
      },
    },
    moCode: {
      label: t('qcHold.moCode'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.moCode')}`]),
    },
    batchNo: {
      label: t('qcHold.batchNo'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.batchNo')}`]),
    },
    label: {
      label: t('qcHold.label'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('qcHold.label')}`]),
    },
  };
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  switch (tagValue.value) {
    case 0: // 工单
      optsMoValue.value = data;
      break;
    case 1: // 产品
      optsProductValue.value = data;
      break;
    case 2: // 机台工站
      optsWorkStationValue.value = data;
      break;
    case 3: // 物料
      optsMitemValue.value = data;
      break;
    default:
      break;
  }

  fetchTable();
};

// # 送货刷新按钮
const onRefresh = async () => {
  await fetchTable();
};
// #### 工单 表头
const MoColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'scheCode',
    title: `${t('qcHold.moCode')}`,
    align: 'center',
    width: '150',
  },
  {
    colKey: 'moClassName',
    title: `${t('qcHold.moClass')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'statusName',
    title: `${t('qcHold.moStatusName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemCode',
    title: `${t('qcHold.mitemCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDesc',
    title: `${t('qcHold.mitemDesc')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'planQty',
    title: `${t('qcHold.planQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'completedQty',
    title: `${t('qcHold.completedQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: `${t('qcHold.uomName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'routingName',
    title: `${t('qcHold.routingName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'datetimePlanStart',
    title: `${t('qcHold.datetimePlanStart')}`,
    align: 'center',
    width: '180',
  },
  {
    colKey: 'datetimePlanEnd',
    title: `${t('qcHold.datetimePlanEnd')}`,
    align: 'center',
    width: '180',
  },
];

// #### 产品 表头
const productColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'barcode',
    title: `${t('qcHold.barcode')}`,
    align: 'center',
    width: '160',
  },
  {
    colKey: 'barcodeStatusName',
    title: `${t('qcHold.barcodeStatus')}`,
    align: 'center',
    width: '110',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workCenterName',
    title: `${t('qcHold.workCenterName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'scheCode',
    title: `${t('qcHold.moCode')}`,
    align: 'center',
    width: '160',
  },
  {
    colKey: 'mitemCode',
    title: `${t('qcHold.mitemCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDesc',
    title: `${t('qcHold.mitemDesc')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: `${t('qcHold.uomName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'curProcessName',
    title: `${t('qcHold.curProcessName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'curWorkStationName',
    title: `${t('qcHold.curWorkStationName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'productStatus',
    title: `${t('qcHold.productStatus')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processTime',
    title: `${t('qcHold.processTime')}`,
    align: 'center',
    width: '190',
  },
  {
    colKey: 'datetimePlanEnd',
    title: `${t('qcHold.datetimePlanEnd')}`,
    align: 'center',
    width: '180',
  },
];
// ####机台工站 表头
const workStationColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workstationCode',
    title: `${t('qcHold.workstationCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workstationName',
    title: `${t('qcHold.workstationName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workstationDesc',
    title: `${t('qcHold.workstationDesc')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workCenterName',
    title: `${t('qcHold.workCenterCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processName',
    title: `${t('qcHold.processName')}`,
    align: 'center',
    width: '130',
  },
  // {
  //   colKey: 'state',
  //   title: `${t('qcHold.state')}`,
  //   align: 'center',
  //   width: '130',
  // },
];
// ####W物料 表头
const mitemColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workCenterName',
    title: `${t('qcHold.workCenterCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'scheCode',
    title: `${t('qcHold.moCode')}`,
    align: 'center',
    width: '160',
  },
  {
    colKey: 'mitemCode',
    title: `${t('qcHold.mitemCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemName',
    title: `${t('qcHold.mitemName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'labelNo',
    title: `${t('qcHold.labelNo')}`,
    align: 'center',
    width: '200',
  },
  {
    colKey: 'mitemCodeLabel',
    title: `${t('qcHold.mitemCodeLabel')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDescLabel',
    title: `${t('qcHold.mitemDescLabel')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'labelStatus',
    title: `${t('qcHold.labelStatus')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: `${t('qcHold.labelQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'balanceQty',
    title: `${t('qcHold.balanceQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: `${t('qcHold.uomName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierCode',
    title: `${t('qcHold.supplierCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierName',
    title: `${t('qcHold.supplierName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'lotNo',
    title: `${t('qcHold.batchNo')}`,
    align: 'center',
    width: '130',
  },
];

// 界面点击查询按钮
const switchTab = () => {
  fetchTable();
};
// 加载数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    switch (tagValue.value) {
      case 0: // 工单
        getMoList();
        break;
      case 1: // 产品
        getProductList();
        break;
      case 2: // 机台工站
        getWorkStationList();
        break;
      case 3: // 物料
        getMitemList();
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 获取工单数据
const getMoList = async () => {
  if (optsMoValue.value.datePlanRange) {
    if (optsMoValue.value.datePlanRange[0]) {
      optsMoValue.value.datetimePlanStart = optsMoValue.value.datePlanRange[0].toString();
    }
    if (optsMoValue.value.datePlanRange[1]) {
      optsMoValue.value.datetimePlanEnd = optsMoValue.value.datePlanRange[1].toString();
    }
  }

  const res = (await apimain.moSchedule.getMoScheduleList({
    ...optsMoValue.value,
    isHold: 0,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  })) as any;
  moInfoList.list = res.list;
  moInfoList.total = Number(res.total);
};

// 获取产品数据
const getProductList = async () => {
  if (optsProductValue.value.datePlanRange) {
    if (optsProductValue.value.datePlanRange[0]) {
      optsProductValue.value.datetimeStart = optsProductValue.value.datePlanRange[0].toString();
    }
    if (optsProductValue.value.datePlanRange[1]) {
      optsProductValue.value.datetimeEnd = optsProductValue.value.datePlanRange[1].toString();
    }
  }
  const search = {
    ...optsProductValue.value,
    isHold: 0,
    pageNum: pageUIProduct.value.page,
    pageSize: pageUIProduct.value.rows,
  };
  const res = (await apiControl.wip.getQcHoldWipList(search)) as any;
  productInfoList.list = res.list;
  productInfoList.total = Number(res.total);
};

// 获取机台工站数据
const getWorkStationList = async () => {
  if (optsWorkStationValue.value.datePlanRange) {
    if (optsWorkStationValue.value.datePlanRange[0]) {
      optsWorkStationValue.value.datetimeStart = optsWorkStationValue.value.datePlanRange[0].toString();
    }
    if (optsWorkStationValue.value.datePlanRange[1]) {
      optsWorkStationValue.value.datetimeEnd = optsWorkStationValue.value.datePlanRange[1].toString();
    }
  }
  const search = {
    ...optsWorkStationValue.value,
    isHold: 0,
    pageNum: pageUIWorkStation.value.page,
    pageSize: pageUIWorkStation.value.rows,
  };
  const res = (await apimain.workstation.getQcHoldWorkStationList(search)) as any;
  workStationInfoList.list = res.list;
  workStationInfoList.total = Number(res.total);
};

// 获取物料数据
const getMitemList = async () => {
  if (optsMitemValue.value.datePlanRange) {
    if (optsMitemValue.value.datePlanRange[0]) {
      optsMitemValue.value.datetimeStart = optsMitemValue.value.datePlanRange[0].toString();
    }
    if (optsMitemValue.value.datePlanRange[1]) {
      optsMitemValue.value.datetimeEnd = optsMitemValue.value.datePlanRange[1].toString();
    }
  }
  const search = {
    ...optsMitemValue.value,
    isHold: 0,
    pageNum: pageUIMitem.value.page,
    pageSize: pageUIMitem.value.rows,
  };
  const res = (await apiWarehouse.transferDtlBarcode.getQcHoldLabelList(search)) as any;
  mitemInfoList.list = res.list;
  mitemInfoList.total = Number(res.total);
};

// 执行
const onHandelLock = (operatorType: OperatorType) => {
  detailedShow.value = true;
  curOperatorType.value = operatorType.toString();
  let keys = [];
  switch (tagValue.value) {
    case 0: // 工单
      if (selectMoRowKeys.value) {
        selectRows.value = moInfoList.list.filter((item) => selectMoRowKeys.value.includes(item.id));
        keys = selectMoRowKeys.value;
      }
      break;
    case 1: // 产品
      if (selectProductRowKeys.value) {
        selectRows.value = productInfoList.list.filter((item) =>
          selectProductRowKeys.value.includes(item.serialNumber),
        );
        keys = selectProductRowKeys.value;
      }
      break;
    case 2: // 机台工站
      if (selectWorkstationRowKeys.value) {
        selectRows.value = workStationInfoList.list.filter((item) => selectWorkstationRowKeys.value.includes(item.id));
        keys = selectWorkstationRowKeys.value;
      }
      break;
    case 3: // 物料
      if (selectMitemRowKeys.value) {
        keys = selectMitemRowKeys.value;
        selectRows.value = mitemInfoList.list.filter((item) => selectMitemRowKeys.value.includes(item.labelNo));
      }
      break;
    default:
      break;
  }

  const { initLockDetailForm, showPopform, reset } = detailFormRef.value;
  reset();
  showPopform();
  initLockDetailForm(selectRows.value, keys, curOperatorType.value);
};

// 解锁
const onHandelUnLock = (operatorType: OperatorType) => {
  console.log(operatorType);
  const tabRouters = router.getRoutes();
  const routeInfo = tabRouters.find((item1) => item1.meta.sourcePath === '/quality#/holdList/UNLOCK');
  router.push(routeInfo);
};

// 日志
const onHandelLog = (operatorType: OperatorType) => {
  console.log(operatorType);
  const tabRouters = router.getRoutes();
  const routeInfo = tabRouters.find((item1) => item1.meta.sourcePath === '/quality#/holdListView/VIEW');
  router.push(routeInfo);
};

// 子组件控制执行窗口
const onHandleLockShow = (value: any) => {
  detailedShow.value = value;
  reset();
  fetchTable();
};

const reset = () => {
  // 清空选择的信息
  switch (tagValue.value) {
    case 0: // 工单
      tableMoRef.value?.setSelectedRowKeys([]);
      break;
    case 1: // 产品
      tableProductRef.value?.setSelectedRowKeys([]);
      break;
    case 2: // 机台工站
      tableWorkstationRef.value?.setSelectedRowKeys([]);
      break;
    case 3: // 物料
      tableMitemRef.value?.setSelectedRowKeys([]);
      break;
    default:
      break;
  }
};

onMounted(() => {
  initMoClass();
});
</script>

<style lang="less" scoped>
.full {
  height: 100%;
}

.sub-tab {
  padding: 8px 8px 0 12px;
  background-color: var(--td-bg-color-page);
}

.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
