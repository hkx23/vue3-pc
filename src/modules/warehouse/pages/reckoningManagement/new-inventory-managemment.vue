<!-- 新增盘点管理 -->
<template>
  <t-dialog width="80%" :footer="true" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-container>
        <t-card :ghost="true">
          <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
            <template #soltWarehouse="{ param }">
              <t-select v-model="param.warehouseId" label="仓库" clearable @change="handleWarehouseChange">
                <t-option
                  v-for="item in resultWarehouseData"
                  :key="item.id"
                  :label="item.warehouseName"
                  :value="item.id"
                ></t-option>
              </t-select>
            </template>

            <template #soltDistrict="{ param }">
              <t-select v-model="param.districtId" label="货区" clearable @change="handleDistrictChange">
                <t-option v-for="item in authorizedDistrict" :key="item.id" :label="item.districtName" :value="item.id">
                </t-option>
              </t-select>
            </template>

            <template #soltLocation="{ param }">
              <t-select v-model="param.locationId" label="货位" clearable>
                <t-option
                  v-for="item in authorizedLocation"
                  :key="item.id"
                  :label="item.locationtName"
                  :value="item.locationtCode"
                ></t-option>
              </t-select>
            </template>
          </cmp-query>
        </t-card>
        <!-- table 盘点管理 -->
        <cmp-card>
          <cmp-table
            v-model:pagination="pageUI"
            v-model:selected-row-keys="selectedRowKeys"
            row-key="id"
            :loading="loading"
            :table-column="tablenewIMColumns"
            :show-pagination="false"
            :total="dataTotal"
            :table-data="tableDataInventory"
            empty="没有符合条件的数据"
          >
            <template #button>
              <t-space :size="8">
                <t-popconfirm theme="default" content="确认删除吗" @confirm="onDeleteBatches()">
                  <t-button theme="default">批量删除</t-button>
                </t-popconfirm>
              </t-space>
              <t-space :size="8">
                <t-button theme="primary" @click="onClickBatchImport">批量导入</t-button>
              </t-space>
              <!-- todo -->
              <!-- <t-space :size="8">
                <t-button theme="primary" @click="onClickBatchImport">确定</t-button> 
              </t-space> -->
            </template>
            <!-- 定义序号列的插槽 -->
            <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();
const newInventoryManagement = ref([]);
const tableDataInventory = ref([]);
const { pageUI } = usePage();
const dataTotal = ref(0);
const selectedRowKeys = ref([]); // 删除
const countingTypeDataOptions = ref([]);
const resultWarehouseData = ref([]); // 仓库
const authorizedDistrict = ref([]); // 货区
const authorizedLocation = ref([]); // 货位

//* 表格标题
const tablenewIMColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 30, cell: 'indexSlot' },
  { title: '仓库', colKey: 'warehouseName', width: 85 },
  { title: '货区', width: 85, colKey: 'districtName' },
  { title: '货位', width: 85, colKey: 'locationName' },
  {
    title: '物料编码',
    width: 85,
    colKey: 'mitemCode',
  },
  { title: '物料描述', width: 85, colKey: 'mitemdesc' },
];
//* 组件配置--查询界面选择
const opts = computed(() => {
  return {
    stockCheckType: {
      label: '盘点类型',
      comp: 't-select',
      event: 'business',
      defaultVal: '',
      required: true, // 设置为必填
      bind: {
        type: 'mitem',
        options: countingTypeDataOptions.value,
        showTitle: false,
      },
      eventHandle: {
        // focus: ($event, row) => focus($event, row),
        blur: (row) => blur(row),
      },
    },
    // 有权限的仓库
    warehouseId: {
      label: '仓库',
      comp: 't-select',
      slotName: 'soltWarehouse',
    },
    // warehouse: {
    //   label: '仓库',
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: '',
    //   required: true,
    //   bind: {
    //     type: 'warehouse',
    //     showTitle: false,
    //   },
    //   eventHandle: {
    //     blur: (row) => blur(row),
    //   },
    // },
    mitemId: {
      label: '物料编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    // 有权限的仓库下的货区
    districtId: {
      label: '货区',
      comp: 't-select',
      slotName: 'soltDistrict',
    },
    // 货区 下的 货位
    locationId: {
      label: '货位',
      comp: 't-select',
      slotName: 'soltLocation',
    },

    // district: {
    //   label: '货区',
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: '',
    //   bind: {
    //     type: 'district',
    //     showTitle: false,
    //   },
    // },
    // location: {
    //   label: '货位',
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: '',
    //   bind: {
    //     type: 'location',
    //     showTitle: false,
    //   },
    // },
  };
});
// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
});

// 事件处理函数
const handleWarehouseChange = async (param) => {
  if (param) {
    // 确保ID是lang类型
    const warehouseId = param.toString();
    await getDistrictData(warehouseId); // 根据仓库ID获取货区数据
  }
};
const handleDistrictChange = async (param) => {
  if (param) {
    const districtId = param.toString();
    await getLocationtData(districtId);
  }
};

// 批量删除
const onDeleteBatches = async () => {
  if (selectedRowKeys.value.length === 0) {
    // 没有选中任何行时的处理
    MessagePlugin.warning('请先选择要删除的行');
  }
  // 删除成功后的处理   todo
  // MessagePlugin.success('批量删除成功');
  // 重新加载或更新表格数据
  // fetchTable();
};

// 批量导入
const onClickBatchImport = async () => {
  return {};
};

//* 初始渲染
onMounted(async () => {
  await fetchTable();
  await countingTypeData();
  await getWarehouseData();
});

// 获取有权限的仓库
const getWarehouseData = async () => {
  resultWarehouseData.value = await api.stockCheckBill.getWarehouse();
};

// 获取货区
const getDistrictData = async (warehouseId) => {
  try {
    // const result = await api.stockCheckBill.getDistrict({ warehouseId });
    // authorizedDistrict.value = result.map((item) => ({
    //   label: item.districtName,
    //   value: item.districtCode,
    // }));
    authorizedDistrict.value = await api.stockCheckBill.getDistrict({ warehouseId });
  } catch (e) {
    console.error('获取货区数据失败:', e);
  }
};

// 获取货位
const getLocationtData = async (districtId) => {
  try {
    authorizedLocation.value = await api.stockCheckBill.getLocation({ districtId });
  } catch (e) {
    console.error('获取货区数据失败:', e);
  }
};

// 初始化系统字典盘点类型
const countingTypeData = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'W_STOCK_CHECK_TYPE',
    });
    countingTypeDataOptions.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};
const onInput = async (data: any) => {
  if (!data.value) {
    const { stockCheckType, warehouseId, districtId, locationId, mitemId } = data;
    const result = await api.stockCheckBill.getOnHand({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      stockCheckType,
      warehouseId,
      districtId,
      locationId,
      mitemId,
    });
    tableDataInventory.value = result.list;
    dataTotal.value = result.total;
  }
};
//* 表格数据
const fetchTable = async () => {
  setLoading(false);
  newInventoryManagement.value = [];
  tableDataInventory.value = [];
  const data = await api.stockCheckBill.getOnHand({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });

  tableDataInventory.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};

// 失去焦点
const blur = ({ value }) => {
  if (!value) {
    MessagePlugin.error('请选择必填项');
  }
};
</script>

<style scoped></style>
