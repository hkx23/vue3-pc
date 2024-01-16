<!-- 新增盘点管理 -->
<template>
  <t-dialog width="80%" :footer="true" :close-on-overlay-click="false" :on-confirm="onConfirmAnother">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-container>
        <t-card :ghost="true">
          <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput" @reset="onReset">
            <template #soltStockCheckType="{ param }">
              <t-select v-model="param.stockCheckType" label="盘点类型" clearable>
                <template #label> <span style="color: red">*</span> 盘点类型</template>
                <t-option
                  v-for="item in countingTypeDataOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                ></t-option>
              </t-select>
            </template>

            <template #soltWarehouse="{ param }">
              <t-select v-model="param.warehouseId" label="仓库" clearable @change="handleWarehouseChange">
                <template #label> <span style="color: red">*</span> 仓库</template>
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
                  :label="item.locationName"
                  :value="item.locationId"
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
            row-key="onhandId"
            :loading="loading"
            :table-column="tablenewIMColumns"
            :show-pagination="false"
            :total="dataTotal"
            :table-data="tableDataInventory"
            empty="没有符合条件的数据"
          >
            <template #button>
              <t-space v-if="selectedRowKeys.length !== 0" :size="8">
                <t-popconfirm theme="default" content="确认删除吗" @confirm="onDeleteBatches()">
                  <t-button theme="default">批量删除</t-button>
                </t-popconfirm>
              </t-space>
              <t-space :size="8">
                <t-button theme="primary" @click="onClickBatchImport">批量导入</t-button>
              </t-space>
            </template>
            <!-- 定义序号列的插槽 -->
            <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-container>
    <!-- 自定义底部按钮 -->
    <template #footer>
      <t-button :disabled="selectedRowKeys.length === 0" @click="onConfirmAnother">确认</t-button>
      <!-- <t-button @click="onClose">取消</t-button> -->
    </template>
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
const selectedRowKeys = ref([]); // 勾选条数
const countingTypeDataOptions = ref([]); // 盘点类型
const resultWarehouseData = ref([]); // 仓库
const authorizedDistrict = ref([]); // 货区
const authorizedLocation = ref([]); // 货位

// 添加所需字段
const inputParams = ref({
  stockCheckType: '',
  warehouseId: '',
  districtId: '',
  locationId: '',
  mitemId: '',
});

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
      slotName: 'soltStockCheckType',
    },

    // 有权限的仓库
    warehouseId: {
      label: '仓库',
      comp: 't-select',
      slotName: 'soltWarehouse',
    },

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
    // 有权限的仓库=>货区
    districtId: {
      label: '货区',
      comp: 't-select',
      slotName: 'soltDistrict',
    },
    // 货区=>货位
    locationId: {
      label: '货位',
      comp: 't-select',
      slotName: 'soltLocation',
    },
  };
});
// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
});

// 事件处理函数 仓库
const handleWarehouseChange = async (param) => {
  if (param) {
    // 确保ID是lang类型
    const warehouseId = param.toString();
    await getDistrictData(warehouseId); // 根据仓库ID获取货区数据
  }
};

// 事件处理函数 货区
const handleDistrictChange = async (param) => {
  if (param) {
    const districtId = param.toString();
    await getLocationtData(districtId);
  }
};

// 批量导入
const onClickBatchImport = async () => {
  return {};
};

//* 初始渲染
onMounted(async () => {
  // await fetchTable();  //需要查询之后匹配最新的数据才能添加
  await countingTypeData();
  await getWarehouseData();
});

// 自定义事件传数据给父组件
const emit = defineEmits(['update-data']);

// 确定提交
const onConfirmAnother = async () => {
  const { stockCheckType, warehouseId } = inputParams.value;
  const onHandIds = selectedRowKeys.value;
  await api.stockCheckBill.addPd({
    stockCheckType,
    warehouseId,
    onHandIds,
  });
  emit('update-data');
  MessagePlugin.success('新增成功!');
};

// 批量删除
const onDeleteBatches = () => {
  const onHandIds = selectedRowKeys.value;
  if (selectedRowKeys.value.length === 0) {
    MessagePlugin.warning('请先选择要删除的行!');
    return;
  }
  api.stockCheckBill.removeBatch({
    onHandIds,
  });
  MessagePlugin.error('批量删除成功!');
  fetchTable();
};

// 获取有权限的仓库
const getWarehouseData = async () => {
  resultWarehouseData.value = await api.stockCheckBill.getWarehouse();
};

// 获取货区
const getDistrictData = async (warehouseId) => {
  try {
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
    countingTypeDataOptions.value = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'W_STOCK_CHECK_TYPE',
    });
  } catch (e) {
    console.error(e);
  }
};

//* 重置
const onReset = () => {
  inputParams.value = {
    stockCheckType: '',
    warehouseId: '',
    districtId: '',
    locationId: '',
    mitemId: '',
  };
  // 可能还需要清除查询结果等
  tableDataInventory.value = [];
  selectedRowKeys.value = [];
  selectedRowKeys.value = []; // 重置清空选中的数据
};

// 查询
const onInput = async (data: any) => {
  // todo
  if (!data.stockCheckType) {
    MessagePlugin.error('盘点类型为必填项');
    return;
  }
  if (!data.warehouseId) {
    MessagePlugin.error('仓库为必填项');
    return;
  }
  if (!data.value) {
    // 更新 inputParams 的值
    inputParams.value = {
      stockCheckType: data.stockCheckType,
      warehouseId: data.warehouseId,
      districtId: data.districtId,
      locationId: data.locationId,
      mitemId: data.mitemId,
    };

    // const { stockCheckType, warehouseId, districtId, locationId, mitemId } = data;

    const result = await api.stockCheckBill.getOnHand({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      stockCheckType: inputParams.value.stockCheckType,
      warehouseId: inputParams.value.warehouseId,
      districtId: inputParams.value.locationId,
      locationId: inputParams.value.locationId,
      mitemId: inputParams.value.mitemId,
    });
    tableDataInventory.value = result.list;
    dataTotal.value = result.total;
    selectedRowKeys.value = []; // 重置清空选中的数据
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
</script>

<style scoped></style>
