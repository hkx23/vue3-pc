<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" @submit="onInput" />
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="columns"
          :fixed-height="true"
          :table-data="employeePieceRateWageData.list"
          :total="employeePieceRateWageTotal"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          @refresh="fetchTable"
          @row-click="onSelectChange"
          @select-change="rehandleSelectChange"
        >
          <template #title>
            {{ '员工计件列表' }}
          </template>
          <template #actionSlot="{ row }">
            <t-space :size="8">
              <t-link theme="primary" @click="onEditRow(row)">详情</t-link>
            </t-space>
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
  </cmp-container>

  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    width="80%"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    @close="onSecondaryReset"
  >
    <t-descriptions :column="4">
      <t-descriptions-item label="排班单"> DA0120230001 </t-descriptions-item>
      <t-descriptions-item label="核算状态"> 已归集 </t-descriptions-item>
      <t-descriptions-item label="班组"> DIP_A线1班 </t-descriptions-item>
      <t-descriptions-item label="排班日期"> 2023-01-02 </t-descriptions-item>
      <t-descriptions-item label="出勤模式"> DIP白班(07:00-07:00)</t-descriptions-item>
      <t-descriptions-item label="产线"> DIP_A线 </t-descriptions-item>
      <t-descriptions-item label="产出工序" span="2"> FCT </t-descriptions-item>
      <t-descriptions-item label="归集时间"> 2023-01-02 08:00:00 </t-descriptions-item>
      <t-descriptions-item label="至"> 2023-01-03 08:00:00 </t-descriptions-item>
    </t-descriptions>

    <cmp-table ref="itemRef" row-key="id" :table-column="itemColumns" :table-data="itemData.list" :total="itemTotal">
      <template #title>
        {{ '归集工单明细' }}
      </template>
    </cmp-table>

    <template #footer>
      <!-- <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button> -->
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();

const isDisabled = ref(false);
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys = ref([]); // 要删除的id
const delItemRowKeys = ref([]);
const submitFalg = ref(false);

const formData = ref({
  employeePieceRateWageCode: '',
  employeePieceRateWageName: '',
  assetTypeId: '',
  assetBrandId: '',
  assetModelId: '',
});
// 表格数据总条数
const employeePieceRateWageTotal = ref(0);
// 表格数据
const employeePieceRateWageData = reactive({ list: [] });
// dialog 弹框数据
const employeePieceRateWageTabData = reactive({
  list: {
    id: '',
    employeePieceRateWageCode: '', // 员工计件编码
    employeePieceRateWageName: '', // 员工计件名称
    employeePieceRateWageStandard: '',
    inspectMethod: '',
    maxValue: 0,
    minValue: 0,
    employeePieceRateWageType: '',
    uom: '',
    isPhoto: 1,
    isPhotoOptions: [
      { label: '是', value: 1 },
      { label: '否', value: 0 },
    ],
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: '工号',
    title: '工号',
    align: 'center',
    width: '110',
  },
  {
    colKey: '姓名',
    title: '姓名',
    align: 'center',
    width: '110',
  },
  {
    colKey: '类型',
    title: '类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: '出勤状态',
    title: '出勤状态',
    align: 'center',
    width: '110',
  },
  {
    colKey: '计件工时',
    title: '计件工时',
    align: 'center',
    width: '110',
  },
  {
    colKey: '计时工时',
    title: '计时工时',
    align: 'center',
    width: '110',
  },
  {
    colKey: '总工时',
    title: '总工时',
    align: 'center',
    width: '110',
  },
  {
    colKey: '人员系数',
    title: '人员系数',
    align: 'center',
    width: '110',
  },
  {
    colKey: '个人工资',
    title: '个人工资',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];

onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});

// #query 查询参数
const opts = computed(() => {
  return {
    班组计件工资: {
      label: '班组计件工资',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    班组计时工资: {
      label: '班组计时工资',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    调出成员工资: {
      label: '调出成员工资',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    调入成员工资: {
      label: '调入成员工资',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    班组总工时: {
      label: '班组总工时',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    平均小时工资: {
      label: '平均小时工资',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  formData.value = { ...data };
  fetchTable();
  // MessagePlugin.success('查询成功。');
};

const fetchTable = async () => {
  try {
    setLoading(true);
    // const res = await apiMain.employeePieceRateWage.getList({
    //   pageNum: pageUI.value.page,
    //   pageSize: pageUI.value.rows,
    //   employeePieceRateWageName: formData.value.employeePieceRateWageName,
    //   assetTypeId: formData.value.assetTypeId,
    //   assetBrandId: formData.value.assetBrandId,
    //   assetModelId: formData.value.assetModelId,
    // });

    const res = {
      list: [
        {
          id: '1',
          工号: '00001',
          姓名: '李四',
          类型: '计件',
          出勤状态: '正常',
          计件工时: '23.23',
          计时工时: '0',
          总工时: '23.23',
          人员系数: '1',
          个人工资: '242.16',
        },
        {
          id: '2',
          工号: 'Paul',
          姓名: 'Paul',
          类型: '计件',
          出勤状态: '正常',
          计件工时: '23.23',
          计时工时: '0',
          总工时: '23.23',
          人员系数: '1',
          个人工资: '242.16',
        },
        {
          id: '3',
          工号: 'Moss',
          姓名: 'Moss',
          类型: '计件',
          出勤状态: '正常',
          计件工时: '23.23',
          计时工时: '0',
          总工时: '23.23',
          人员系数: '1',
          个人工资: '242.16',
        },
      ],
      total: 3,
    };
    employeePieceRateWageData.list = res.list;
    employeePieceRateWageTotal.value = res.total;
    selectedRowKeys.value = [];
    delItemRowKeys.value = [];

    itemInCheckList.list = [];
    itemTotal.value = 0;
  } finally {
    setLoading(false);
  }
};

// 右侧表格编辑按钮
const onEditRow = async (row: any) => {
  isDisabled.value = true;

  Object.assign(employeePieceRateWageTabData.list, row);

  submitFalg.value = false;
  formVisible.value = true;
  diaLogTitle.value = '员工计件详情';
  await fetchItemTable();
};

// 获取批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};

// 关闭模态框事件
const onSecondaryReset = () => {
  // employeePieceRateWageTabData.list.employeePieceRateWageCategory = '';
  // employeePieceRateWageTabData.list.shiftCode = '';
  // employeePieceRateWageTabData.list.executeFrequenceCode = '';

  selectedRowKeys.value = [];
  delItemRowKeys.value = [];
  formVisible.value = false;
};
const rowClick = ref(null); // 点击行ID
const onSelectChange = async ({ row }) => {
  rowClick.value = row;
  await getEquipmentInspectItemList();
};

// 明细表数据
const itemInCheckList = reactive({ list: [] });
const itemTotal = ref(0);
const itemData = reactive({ list: [] });
const itemColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: '生产工单',
    title: '生产工单',
    align: 'center',
    width: '110',
  },
  {
    colKey: '产品编码',
    title: '产品编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: '产品规格',
    title: '产品规格',
    align: 'center',
    width: '110',
  },
  {
    colKey: '类型',
    title: '类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: '产线',
    title: '产线',
    align: 'center',
    width: '110',
  },
  {
    colKey: '产出工序',
    title: '产出工序',
    align: 'center',
    width: '110',
  },
  {
    colKey: '产出工站',
    title: '产出工站',
    align: 'center',
    width: '110',
  },
  {
    colKey: '最早采集时间',
    title: '最早采集时间',
    align: 'center',
    width: '110',
  },
  {
    colKey: '最晚采集时间',
    title: '最晚采集时间',
    align: 'center',
    width: '110',
  },
  {
    colKey: '工单工时',
    title: '工单工时',
    align: 'center',
    width: '110',
  },
];
const fetchItemTable = async () => {
  try {
    setLoading(true);

    const res = {
      list: [
        {
          id: '1',
          生产工单: 'DA0120230001',
          产品编码: '0201020301',
          产品规格: '螺栓M10×1.51',
          类型: '计件',
          产线: 'DIP_A线',
          产出工序: 'FCT',
          产出工站: 'DIP_A线_FCT',
          最早采集时间: '2023-01-02 16:40:53',
          最晚采集时间: '2023-01-02 17:25:56',
          工单工时: '0.75',
        },
        {
          id: '2',
          生产工单: 'DA0120230002',
          产品编码: '0201020301',
          产品规格: '螺栓M10×1.51',
          类型: '计件',
          产线: 'DIP_A线',
          产出工序: 'FCT',
          产出工站: 'DIP_A线_FCT',
          最早采集时间: '2023-01-02 08:00:04',
          最晚采集时间: '2023-01-02 16:29:27',
          工单工时: '8.49',
        },
        {
          id: '3',
          生产工单: 'DA0120240001',
          产品编码: '0201020301',
          产品规格: '螺栓M10×1.51',
          类型: '计件',
          产线: 'DIP_A线',
          产出工序: 'FCT',
          产出工站: 'DIP_A线_FCT',
          最早采集时间: '2023-01-02 17:58:39',
          最晚采集时间: '2023-01-03 07:59:47',
          工单工时: '14.02',
        },
      ],
      total: 3,
    };
    itemData.list = res.list;
    itemTotal.value = res.total;
  } finally {
    setLoading(false);
  }
};

const getEquipmentInspectItemList = async () => {
  // const res = await apiMain.employeePieceRateWageInEquipment.getList({
  //   pageNum: 1,
  //   pageSize: 99999,
  //   employeePieceRateWageId: rowClick.value.id,
  // });

  const res = { list: [], total: 0 };
  itemInCheckList.list = res.list;
  itemTotal.value = res.total;
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
