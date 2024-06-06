<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" @submit="onInput" />
        <cmp-card :ghost="true">
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :table-column="columns"
            :fixed-height="true"
            :table-data="locationInMitemData.list"
            :total="locationInMitemTotal"
            :selected-row-keys="selectedRowKeys"
            :loading="loading"
            @refresh="fetchTable"
            @select-change="rehandleSelectChange"
          >
            <template #title>
              {{ '货位与物料列表' }}
            </template>
            <template #actionSlot="{ row }">
              <t-space :size="8">
                <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
              </t-space>
            </template>
            <template #state="{ row }">
              <t-popconfirm
                :content="row.state == 0 ? t('locationInMitem.confirmEnable') : t('locationInMitem.confirmDisable')"
                @confirm="onRowStateChange(row)"
              >
                <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
                <!-- <t-link theme="primary">{{ row.state == 0 ? t('user.enable') : t('user.disable') }}</t-link> -->
              </t-popconfirm>
            </template>

            <template #button>
              <t-space :size="8">
                <t-button theme="primary" @click="onAddData">新增</t-button>
                <bcmp-import-auto-button theme="default" button-text="导入" type="w_location_in_mitem" />
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-card>
  </cmp-container>

  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    width="850px"
    :header="diaLogTitle"
    @close="onSecondaryReset"
  >
    <t-form>
      <t-descriptions :column="2">
        <t-descriptions-item>
          <t-form-item label="仓库" name="warehouseId" required-mark>
            <bcmp-select-business
              v-model="locationInMitemTabData.list.warehouseId"
              :show-title="false"
              type="warehouseAuth"
            />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="货区" name="districtId" required-mark>
            <bcmp-select-business
              v-model="locationInMitemTabData.list.districtId"
              :parent-id="locationInMitemTabData.list.warehouseId"
              :show-title="false"
              type="district"
            />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="货位" name="locId" required-mark>
            <bcmp-select-business
              v-model="locationInMitemTabData.list.locId"
              :parent-id="locationInMitemTabData.list.districtId"
              :show-title="false"
              type="locationByDistrict"
            />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="绑定类型" name="locId">
            <t-select v-model="locationInMitemTabData.list.itemType" :options="itemTypeOption" @change="onItemType" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item
            v-if="locationInMitemTabData.list.categoryVisible"
            label="物料分类"
            name="categoryId"
            required-mark
          >
            <bcmp-select-business
              v-model="locationInMitemTabData.list.categoryId"
              :show-title="false"
              type="mitemCategory"
            />
          </t-form-item>
          <t-form-item v-if="locationInMitemTabData.list.mitemVisible" label="物料" name="mitemId" required-mark>
            <bcmp-select-business v-model="locationInMitemTabData.list.mitemId" :show-title="false" type="mitem" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="最大容量" name="maxVolume" required-mark>
            <t-input-number v-model="locationInMitemTabData.list.maxVolume" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="最小包装数量" name="maxPackageVolume" required-mark>
            <t-input-number v-model="locationInMitemTabData.list.maxPackageVolume" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="最大外箱数量" name="maxBoxVolume" required-mark>
            <t-input-number v-model="locationInMitemTabData.list.maxBoxVolume" />
          </t-form-item>
        </t-descriptions-item>
      </t-descriptions>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiWarehouse } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();
const { pageUI } = usePage();
const formVisible = ref(false);
const diaLogTitle = ref('');
const selectedRowKeys: Ref<any[]> = ref([]);
const { loading, setLoading } = useLoading();
const formData = ref({
  itemCode: '',
  itemName: '',
  itemType: '',
  warehouseId: '',
  districtId: '',
  locId: '',
  categoryId: '',
  mitemId: '',
});

const itemTypeOption = [
  { label: '物料', value: 'MITEM' },
  { label: '物料分类', value: 'MITEM_CATEGORY' },
];
// 表格数据总条数
const locationInMitemTotal = ref(0);
// 表格数据
const locationInMitemData = reactive({ list: [] });
// dialog 弹框数据
const locationInMitemTabData = reactive({
  list: {
    id: '',
    itemType: '',
    warehouseId: '',
    districtId: '',
    locId: '',
    categoryId: '',
    categoryVisible: false,
    mitemId: '',
    mitemVisible: false,
    maxVolume: 0,
    maxPackageVolume: 0,
    maxBoxVolume: 0,
  },
});
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 46,
  // },
  {
    colKey: 'warehouseName',
    title: '仓库',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'districtName',
    title: '货区',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'locationName',
    title: '货位',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemTypeName',
    title: '项目类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'itemCode',
    title: '项目编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'itemName',
    title: '项目名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'maxVolume',
    title: '最大容量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'maxPackageVolume',
    title: '最小包装数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'maxBoxVolume',
    title: '最大外箱数量',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'state',
    title: '项目状态',
    align: 'center',
    width: '100',
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
const opts = computed(() => {
  return {
    warehouseId: {
      label: '仓库',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'warehouseAuth',
        showTitle: false,
        changeFunc: (val: any) => {
          formData.value.warehouseId = val.id;
        },
      },
    },
    districtId: {
      label: '货区',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'district',
        parentId: formData.value.warehouseId,
        showTitle: false,
        changeFunc: (val: any) => {
          formData.value.districtId = val.id;
        },
      },
    },
    locId: {
      label: '货位',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'locationByDistrict',
        parentId: formData.value.districtId,
        showTitle: false,
      },
    },
    categoryId: {
      label: '物料分类',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  formData.value = { ...data };

  fetchTable();
};
const fetchTable = async () => {
  const res = await apiWarehouse.locationInMitem.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    warehouseId: formData.value.warehouseId,
    districtId: formData.value.districtId,
    locId: formData.value.locId,
    categoryId: formData.value.categoryId,
    mitemId: formData.value.mitemId,
  });

  locationInMitemData.list = res.list;
  locationInMitemTotal.value = res.total;
  selectedRowKeys.value = [];
};
const onEditRow = (row: any) => {
  locationInMitemTabData.list = { ...row };
  if (locationInMitemTabData.list.itemType === 'MITEM') {
    locationInMitemTabData.list.mitemVisible = true;
    locationInMitemTabData.list.categoryVisible = false;
    locationInMitemTabData.list.mitemId = row.itemId;
  } else {
    locationInMitemTabData.list.mitemVisible = false;
    locationInMitemTabData.list.categoryVisible = true;
    locationInMitemTabData.list.categoryId = row.itemId;
  }
  formVisible.value = true;
  diaLogTitle.value = '编辑货区与物料';
};
const onEditRequest = async () => {
  try {
    if (_.isEmpty(locationInMitemTabData.list.warehouseId)) {
      MessagePlugin.error('请选择仓库');
      return;
    }
    if (_.isEmpty(locationInMitemTabData.list.districtId)) {
      MessagePlugin.error('请选择货区');
      return;
    }
    if (_.isEmpty(locationInMitemTabData.list.locId)) {
      MessagePlugin.error('请选择货位');
      return;
    }
    if (locationInMitemTabData.list.itemType === 'MITEM' && _.isEmpty(locationInMitemTabData.list.mitemId)) {
      MessagePlugin.error('请选择物料');
      return;
    }
    if (
      locationInMitemTabData.list.itemType === 'MITEM_CATEGORY' &&
      _.isEmpty(locationInMitemTabData.list.categoryId)
    ) {
      MessagePlugin.error('请选择物料分类');
      return;
    }
    if (locationInMitemTabData.list.maxVolume !== undefined && locationInMitemTabData.list.maxVolume < 0) {
      MessagePlugin.error('请输入最大容量');
      return;
    }
    if (
      locationInMitemTabData.list.maxPackageVolume !== undefined &&
      locationInMitemTabData.list.maxPackageVolume < 0
    ) {
      MessagePlugin.error('请输入最小包装数量');
      return;
    }
    if (locationInMitemTabData.list.maxBoxVolume !== undefined && locationInMitemTabData.list.maxBoxVolume < 0) {
      MessagePlugin.error('请输入最大外箱数量');
      return;
    }

    setLoading(true);
    await apiWarehouse.locationInMitem.update({
      ...locationInMitemTabData.list,
      itemId:
        locationInMitemTabData.list.itemType === 'MITEM'
          ? locationInMitemTabData.list.mitemId
          : locationInMitemTabData.list.categoryId,
    });
    await fetchTable();
    formVisible.value = false;
    MessagePlugin.success('编辑成功');
  } finally {
    setLoading(false);
  }
};
const onAddData = () => {
  utils.reset(locationInMitemTabData.list);
  locationInMitemTabData.list.itemType = 'MITEM';
  locationInMitemTabData.list.mitemVisible = true;

  formVisible.value = true;
  diaLogTitle.value = '新增货区与物料';
};
const onAddRequest = async () => {
  try {
    if (_.isEmpty(locationInMitemTabData.list.warehouseId)) {
      MessagePlugin.error('请选择仓库');
      return;
    }
    if (_.isEmpty(locationInMitemTabData.list.districtId)) {
      MessagePlugin.error('请选择货区');
      return;
    }
    if (_.isEmpty(locationInMitemTabData.list.locId)) {
      MessagePlugin.error('请选择货位');
      return;
    }
    if (locationInMitemTabData.list.itemType === 'MITEM' && _.isEmpty(locationInMitemTabData.list.mitemId)) {
      MessagePlugin.error('请选择物料');
      return;
    }
    if (
      locationInMitemTabData.list.itemType === 'MITEM_CATEGORY' &&
      _.isEmpty(locationInMitemTabData.list.categoryId)
    ) {
      MessagePlugin.error('请选择物料分类');
      return;
    }
    if (locationInMitemTabData.list.maxVolume !== undefined && locationInMitemTabData.list.maxVolume < 0) {
      MessagePlugin.error('请输入最大容量');
      return;
    }
    if (
      locationInMitemTabData.list.maxPackageVolume !== undefined &&
      locationInMitemTabData.list.maxPackageVolume < 0
    ) {
      MessagePlugin.error('请输入最小包装数量');
      return;
    }
    if (locationInMitemTabData.list.maxBoxVolume !== undefined && locationInMitemTabData.list.maxBoxVolume < 0) {
      MessagePlugin.error('请输入最大外箱数量');
      return;
    }

    setLoading(true);
    await apiWarehouse.locationInMitem.insert({
      ...locationInMitemTabData.list,
      itemId:
        locationInMitemTabData.list.itemType === 'MITEM'
          ? locationInMitemTabData.list.mitemId
          : locationInMitemTabData.list.categoryId,
    });
    await fetchTable();
    formVisible.value = false;
    MessagePlugin.success('新增成功');
  } finally {
    setLoading(false);
  }
};
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};
const onSecondaryReset = () => {
  utils.reset(locationInMitemTabData.list);
  formVisible.value = false;
};
const onSecondarySubmit = async () => {
  if (_.isEmpty(locationInMitemTabData.list.id)) {
    await onAddRequest();
  } else {
    await onEditRequest();
  }
};
const onRowStateChange = async (row: any) => {
  const postRow = _.cloneDeep(row);
  const idsList = [];
  idsList.push(row.id);
  if (postRow.state === 1) {
    postRow.state = 0;
    await apiWarehouse.locationInMitem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('禁用成功');
      row.state = postRow.state;
    });
  } else {
    postRow.state = 1;
    await apiWarehouse.locationInMitem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('启用成功');
      row.state = postRow.state;
    });
  }
};
const onItemType = async (value) => {
  if (value === 'MITEM') {
    locationInMitemTabData.list.mitemVisible = true;
    locationInMitemTabData.list.categoryVisible = false;
  } else {
    locationInMitemTabData.list.mitemVisible = false;
    locationInMitemTabData.list.categoryVisible = true;
  }
};
onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});
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
