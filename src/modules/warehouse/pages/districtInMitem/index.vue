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
            :table-data="districtInMitemData.list"
            :total="districtInMitemTotal"
            :selected-row-keys="selectedRowKeys"
            :loading="loading"
            @refresh="fetchTable"
            @select-change="rehandleSelectChange"
          >
            <template #title>
              {{ '货区与物料列表' }}
            </template>
            <template #actionSlot="{ row }">
              <t-space :size="8">
                <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>
              </t-space>
            </template>
            <template #state="{ row }">
              <t-popconfirm
                :content="row.state == 0 ? t('districtInMitem.confirmEnable') : t('districtInMitem.confirmDisable')"
                @confirm="onRowStateChange(row)"
              >
                <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
                <!-- <t-link theme="primary">{{ row.state == 0 ? t('user.enable') : t('user.disable') }}</t-link> -->
              </t-popconfirm>
            </template>

            <template #button>
              <t-space :size="8">
                <t-button theme="primary" @click="onAddData">新增</t-button>
                <bcmp-import-auto-button theme="default" button-text="导入" type="w_district_in_mitem" />
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
              v-model="districtInMitemTabData.list.warehouseId"
              :show-title="false"
              type="warehouseAuth"
            />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="货区" name="districtId" required-mark>
            <bcmp-select-business
              v-model="districtInMitemTabData.list.districtId"
              :parent-id="districtInMitemTabData.list.warehouseId"
              :show-title="false"
              type="district"
            />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item label="绑定类型" name="locId">
            <t-select v-model="districtInMitemTabData.list.itemType" :options="itemTypeOption" @change="onItemType" />
          </t-form-item>
        </t-descriptions-item>
        <t-descriptions-item>
          <t-form-item
            v-if="districtInMitemTabData.list.categoryVisible"
            label="物料分类"
            name="categoryId"
            required-mark
          >
            <bcmp-select-business
              v-model="districtInMitemTabData.list.categoryId"
              :show-title="false"
              type="mitemCategory"
            />
          </t-form-item>
          <t-form-item v-if="districtInMitemTabData.list.mitemVisible" label="物料" name="mitemId" required-mark>
            <bcmp-select-business v-model="districtInMitemTabData.list.mitemId" :show-title="false" type="mitem" />
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
const { loading, setLoading } = useLoading();
const { pageUI } = usePage();
const formVisible = ref(false);
const diaLogTitle = ref('');
const selectedRowKeys: Ref<any[]> = ref([]);
const formData = ref({
  itemCode: '',
  itemName: '',
  itemType: '',
  warehouseId: '',
  districtId: '',
  categoryId: '',
  mitemId: '',
});

const itemTypeOption = [
  { label: '物料', value: 'MITEM' },
  { label: '物料分类', value: 'MITEM_CATEGORY' },
];
// 表格数据总条数
const districtInMitemTotal = ref(0);
// 表格数据
const districtInMitemData = reactive({ list: [] });
// dialog 弹框数据
const districtInMitemTabData = reactive({
  list: {
    id: '',
    itemType: '',
    warehouseId: '',
    districtId: '',
    categoryId: '',
    categoryVisible: false,
    mitemId: '',
    mitemVisible: false,
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
  const res = await apiWarehouse.districtInMitem.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    warehouseId: formData.value.warehouseId,
    districtId: formData.value.districtId,
    categoryId: formData.value.categoryId,
    mitemId: formData.value.mitemId,
  });

  districtInMitemData.list = res.list;
  districtInMitemTotal.value = res.total;
  selectedRowKeys.value = [];
};
const onEditRow = (row: any) => {
  districtInMitemTabData.list = { ...row };
  if (districtInMitemTabData.list.itemType === 'MITEM') {
    districtInMitemTabData.list.mitemVisible = true;
    districtInMitemTabData.list.categoryVisible = false;
    districtInMitemTabData.list.mitemId = row.itemId;
  } else {
    districtInMitemTabData.list.mitemVisible = false;
    districtInMitemTabData.list.categoryVisible = true;
    districtInMitemTabData.list.categoryId = row.itemId;
  }
  formVisible.value = true;
  diaLogTitle.value = '编辑货区与物料';
};
const onEditRequest = async () => {
  try {
    if (_.isEmpty(districtInMitemTabData.list.warehouseId)) {
      MessagePlugin.error('请选择仓库');
      return;
    }
    if (_.isEmpty(districtInMitemTabData.list.districtId)) {
      MessagePlugin.error('请选择货区');
      return;
    }
    if (districtInMitemTabData.list.itemType === 'MITEM' && _.isEmpty(districtInMitemTabData.list.mitemId)) {
      MessagePlugin.error('请选择物料');
      return;
    }
    if (
      districtInMitemTabData.list.itemType === 'MITEM_CATEGORY' &&
      _.isEmpty(districtInMitemTabData.list.categoryId)
    ) {
      MessagePlugin.error('请选择物料分类');
      return;
    }

    setLoading(true);
    await apiWarehouse.districtInMitem.update({
      ...districtInMitemTabData.list,
      itemId:
        districtInMitemTabData.list.itemType === 'MITEM'
          ? districtInMitemTabData.list.mitemId
          : districtInMitemTabData.list.categoryId,
    });
    await fetchTable();
    formVisible.value = false;
    MessagePlugin.success('编辑成功');
  } finally {
    setLoading(false);
  }
};
const onAddData = () => {
  utils.reset(districtInMitemTabData.list);
  districtInMitemTabData.list.itemType = 'MITEM';
  districtInMitemTabData.list.mitemVisible = true;

  formVisible.value = true;
  diaLogTitle.value = '新增货区与物料';
};
const onAddRequest = async () => {
  try {
    if (_.isEmpty(districtInMitemTabData.list.warehouseId)) {
      MessagePlugin.error('请选择仓库');
      return;
    }
    if (_.isEmpty(districtInMitemTabData.list.districtId)) {
      MessagePlugin.error('请选择货区');
      return;
    }
    if (districtInMitemTabData.list.itemType === 'MITEM' && _.isEmpty(districtInMitemTabData.list.mitemId)) {
      MessagePlugin.error('请选择物料');
      return;
    }
    if (
      districtInMitemTabData.list.itemType === 'MITEM_CATEGORY' &&
      _.isEmpty(districtInMitemTabData.list.categoryId)
    ) {
      MessagePlugin.error('请选择物料分类');
      return;
    }

    setLoading(true);
    await apiWarehouse.districtInMitem.insert({
      ...districtInMitemTabData.list,
      itemId:
        districtInMitemTabData.list.itemType === 'MITEM'
          ? districtInMitemTabData.list.mitemId
          : districtInMitemTabData.list.categoryId,
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
  utils.reset(districtInMitemTabData.list);
  formVisible.value = false;
};
const onSecondarySubmit = async () => {
  if (_.isEmpty(districtInMitemTabData.list.id)) {
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
    await apiWarehouse.districtInMitem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('禁用成功');
      row.state = postRow.state;
    });
  } else {
    postRow.state = 1;
    await apiWarehouse.districtInMitem.batchUpdateState({ ids: idsList, state: postRow.state }).then(() => {
      MessagePlugin.success('启用成功');
      row.state = postRow.state;
    });
  }
};
const onItemType = async (value) => {
  if (value === 'MITEM') {
    districtInMitemTabData.list.mitemVisible = true;
    districtInMitemTabData.list.categoryVisible = false;
  } else {
    districtInMitemTabData.list.mitemVisible = false;
    districtInMitemTabData.list.categoryVisible = true;
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
