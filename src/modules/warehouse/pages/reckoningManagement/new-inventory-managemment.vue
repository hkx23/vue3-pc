<!-- 新增盘点管理 -->
<template>
  <t-dialog width="78%" top="56px" :footer="true" :close-on-overlay-click="false" :on-confirm="onConfirmAnother">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <t-card :ghost="true">
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput" @reset="onReset">
        <template #soltStockCheckType="{ param }">
          <t-select v-model="param.stockCheckType" clearable>
            <template #label> <span style="color: red">*</span> {{ t('reckoningManagement.stockCheckType') }}</template>
            <t-option
              v-for="item in countingTypeDataOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></t-option>
          </t-select>
        </template>
        <template #soltWarehouse="{ param }">
          <bcmp-select-business v-model="param.warehouseId" type="warehouseAuth"></bcmp-select-business>
        </template>
        <template #soltDistrict="{ param }">
          <bcmp-select-business
            v-model="param.districtId"
            type="district"
            :parent-id="param.warehouseId"
          ></bcmp-select-business>
        </template>
        <template #soltLocation="{ param }">
          <bcmp-select-business
            v-model="param.locationId"
            type="locationByDistrict"
            :parent-id="param.districtId"
          ></bcmp-select-business>
        </template>
      </cmp-query>
    </t-card>
    <!-- table 盘点管理 -->
    <cmp-container :full="true" style="height: calc(90vh - 56px - 215px)">
      <cmp-card>
        <cmp-table
          v-model:pagination="pageUI"
          v-model:selected-row-keys="selectedRowKeys"
          :table-column="tablenewIMColumns"
          :table-data="tableDataInventory"
          :fixed-height="true"
          select-on-row-click
          row-key="onhandId"
          :loading="loading"
          :show-pagination="false"
          :total="dataTotal"
          :empty="t('reckoningManagement.table-empty')"
        >
          <template #button>
            <!-- <t-space v-if="selectedRowKeys.length !== 0" :size="8">
                <t-popconfirm theme="default" content="确认删除吗" @confirm="onDeleteBatches()">
                  <t-button theme="default">批量删除</t-button>
                </t-popconfirm>
              </t-space> -->
            <t-space :size="8">
              <bcmp-import-button
                theme="primary"
                type="w_stockcheck"
                button-text="批量导入"
                @close="onFetchGroupData"
              ></bcmp-import-button>
            </t-space>
          </template>
          <!-- 定义序号列的插槽 -->
          <!-- <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template> -->
        </cmp-table>
      </cmp-card>
    </cmp-container>
    <!-- 自定义底部按钮 -->
    <template #footer>
      <t-button :disabled="selectedRowKeys.length === 0" @click="onConfirmAnother">确认</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const { loading } = useLoading();
const tableDataInventory = ref([]);
const { pageUI } = usePage();
const dataTotal = ref(0);
const selectedRowKeys = ref([]); // 勾选条数
const countingTypeDataOptions = ref([]); // 盘点类型
// 添加所需字段
const newstockCheckType = ref('');
const newWarehouseId = ref('');

const queryComponent = ref();

// # 刷新按钮
const onFetchGroupData = async (returnData: any) => {
  console.log(returnData);
  tableDataInventory.value = returnData;
  if (returnData && returnData.length > 0) {
    queryComponent.value.setFromValue('warehouseId', returnData[0].warehouseId);
  }
};

//* 表格标题
const tablenewIMColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 30, cell: 'indexSlot' },
  { title: '仓库', colKey: 'warehouseName', width: 85 },
  { title: '货区', width: 85, colKey: 'districtName' },
  { title: '货位', width: 85, colKey: 'locationName' },
  {
    title: '物料编码',
    width: 85,
    colKey: 'mitemCode',
  },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' }, // todo
];
//* 组件配置--查询界面选择
const opts = computed(() => {
  return {
    stockCheckType: {
      comp: 't-select',
      slotName: 'soltStockCheckType',
    },

    // 有权限的仓库
    warehouseId: {
      comp: 't-select',
      slotName: 'soltWarehouse',
    },

    mitemId: {
      label: t('reckoningManagement.mitemCode'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem', // mitemCategory 变更 mitem
        showTitle: false,
      },
    },

    // 有权限的仓库=>货区
    districtId: {
      comp: 't-select',
      defaultVal: '',
      slotName: 'soltDistrict',
    },
    // 货区=>货位
    locationId: {
      comp: 't-select',
      defaultVal: '',
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

//* 初始渲染
onMounted(async () => {
  // await fetchTable({})
  await countingTypeData();
});

// 自定义事件传数据给父组件
const emit = defineEmits(['update-data']);

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

const isResetting = ref(false);
//* 重置
const onReset = () => {
  selectedRowKeys.value = []; // 重置清空选中的数据
  isResetting.value = true;
  // 重置完成后，将isResetting标记回false
  nextTick(() => {
    isResetting.value = false;
    tableDataInventory.value = []; // 清空数据
  });
};

// 查询
const onInput = async (data: any) => {
  // 如果是在执行重置操作，直接返回不执行校验
  if (isResetting.value) {
    return;
  }

  if (!data.stockCheckType) {
    MessagePlugin.error('盘点类型为必填项');
    return;
  }
  if (!data.warehouseId) {
    MessagePlugin.error('仓库为必填项');
    return;
  }
  pageUI.value.page = 1;
  if (!data.value) {
    utils.loadingPluginFullScreen(true);
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
    // selectedRowKeys.value = []; // 重置清空选中的数据
    // 全选逻辑：提取所有记录的onhandId作为selectedRowKeys的值
    selectedRowKeys.value = result.list.map((item) => item.onhandId);
    // 存添加需要的数据
    newstockCheckType.value = stockCheckType;
    newWarehouseId.value = warehouseId;
  }
  utils.loadingPluginFullScreen(false);
};

// 确定提交
const onConfirmAnother = async () => {
  newstockCheckType.value = queryComponent.value.getFromValue('stockCheckType');
  newWarehouseId.value = queryComponent.value.getFromValue('warehouseId');
  const onHandIds = selectedRowKeys.value;
  const stockCheckType = newstockCheckType.value; // 盘点类型
  const warehouseId = newWarehouseId.value; // 仓库ID
  await api.stockCheckBill.addPd({
    stockCheckType,
    warehouseId,
    onHandIds,
  });
  emit('update-data');
  MessagePlugin.success('新增成功!');
  // 清空表格数据和分页信息
  tableDataInventory.value = [];
  dataTotal.value = 0;
  pageUI.value.page = 1;
  pageUI.value.rows = 10;
  selectedRowKeys.value = []; // 清空选中行
  // newstockCheckType.value = ''; //todo
};

// 批量删除
// const onDeleteBatches = async () => {
//   const onHandIds = selectedRowKeys.value;
//   try {
//     // 等待删除操作完成
//     await api.stockCheckBill.removeBatch({ onHandIds });
//     // 删除操作成功，现在调用 fetchTable
//     await fetchTable({});
//     MessagePlugin.success('批量删除成功!');
//   } catch (error) {
//     console.error('删除失败:', error);
//   }
// };

//* 表格数据
// const fetchTable = async (data: any) => {
//   const { districtId, locationId, mitemId } = data;
//   try {
//     utils.loadingPluginFullScreen(true);
//     // 使用存储在组件状态中的默认参数
//     const data = await api.stockCheckBill.getOnHand({
//       pageNum: pageUI.value.page,
//       pageSize: pageUI.value.rows,
//       stockCheckType: newstockCheckType.value,
//       warehouseId: newWarehouseId.value,
//       districtId,
//       locationId,
//       mitemId,
//     });
//     // 更新表格数据
//     tableDataInventory.value = data.list;
//     dataTotal.value = data.total;
//     utils.loadingPluginFullScreen(false);
//   } catch (error) {
//     console.error('获取数据失败:', error);
//   }
// };
</script>

<style scoped></style>
