<template>
  <cmp-container :full="false">
    <cmp-card :span="12">
      <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12" :header="t('craftRoute.craftRoute')" header-bordered>
      <cmp-table
        v-model:pagination="pageUI"
        :table-column="craftRouteColumn"
        :table-data="craftRouteData.list"
        :loading="loading"
        :total="craftRouteData.total"
        @refresh="getRouting"
        @row-click="selectRouting"
      >
        <template #button>
          <t-button @click="addRouting">{{ t('common.button.add') }}</t-button>
        </template>
        <template #state="{ row }">
          <t-tag v-if="row.state === 1" theme="success" variant="outline">{{ t('craftRoute.effective') }}</t-tag>
          <t-tag v-else theme="danger" variant="outline">{{ t('craftRoute.invalid') }}</t-tag>
        </template>
        <template #op="{ row }">
          <t-space size="small">
            <t-link v-if="row.state === 1" theme="primary" size="small" @click="disable(row.id)">{{
              t('common.button.disable')
            }}</t-link>
            <t-link v-else theme="primary" size="small" @click="enableClick(row)">{{
              t('common.button.enable')
            }}</t-link>
            <t-link theme="primary" size="small" @click="editRouting(row.id)">{{ t('common.button.edit') }}</t-link>
            <t-link theme="primary" size="small" @click="copyRouting(row.id)">{{ t('common.button.copy') }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-card :span="12" :header="t('craftRoute.productRelation')" header-bordered>
      <cmp-table
        v-model:selected-row-keys="routingMapKeys"
        v-model:pagination="productPage"
        class="son-table"
        row-key="id"
        :table-column="productRelationColumn"
        :table-data="productRelationData.list"
        :loading="productLoading"
        :total="productRelationData.total"
      >
        <template #title>
          <t-input
            v-model="productRelationKeyword"
            :placeholder="t('craftRoute.productRelationKeyword')"
            @enter="getProductRelation"
          />
        </template>
        <template #button>
          <t-button :disabled="!isSelectRouting" @click="productVisible = true">{{ t('common.button.add') }}</t-button>
          <t-button :disabled="!isSelectRouting" theme="default">{{ t('common.button.import') }}</t-button>
          <t-button
            :disabled="!isSelectRouting || routingMapKeys.length === 0"
            theme="default"
            @click="deleteProductRelationBatch"
            >{{ t('common.button.batchDelete') }}</t-button
          >
        </template>
        <template #isDefault="{ row }">
          <t-switch :value="row.isDefault === 1" @change="setProductRelationDefault($event, row.id)"></t-switch>
        </template>
        <template #op="{ row }">
          <t-link theme="primary" size="small" @click="deleteProductRelation(row.id)">{{
            t('common.button.delete')
          }}</t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <edit
    :id="editId"
    v-model="eidtRoutingVisible"
    :title="
      isAdd
        ? t('common.dialog.header.add', [t('craftRoute.craftRoute')])
        : t('common.dialog.header.edit', [t('craftRoute.craftRoute')])
    "
    :is-copy="isCopy"
    @submit="getRouting"
  ></edit>
  <enable
    v-model="enableVisible"
    :form-data="enableFormData"
    :routing-type-option="craftRouteTypeOption"
    @submit="getRouting"
  ></enable>
  <product-relation
    v-model="productVisible"
    :routing-code="selectedRoutingCode"
    :routing-name="selectedRoutingName"
    @submit="getProductRelation"
  ></product-relation>
</template>

<script setup lang="ts">
// #region import
import dayjs from 'dayjs';
import { find } from 'lodash';
import { DialogPlugin } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import edit from './edit.vue';
import enable from './enable.vue';
import { useLang } from './lang';
import productRelation from './productRelation.vue';
// #endregion

// 使用多语言
const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// #region 查询框
const opts = computed(() => {
  return {
    routingType: {
      label: t('craftRoute.craftRouteType'),
      comp: 't-select',
      event: 'single',
      defaultVal: '',
      bind: {
        options: craftRouteTypeOption.value,
      },
    },
    keyword: {
      label: t('craftRoute.craftRoute'),
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    workcenterId: {
      label: t('craftRoute.workcenter'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    productCategoryId: {
      label: t('craftRoute.productType'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    productId: {
      label: t('craftRoute.product'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    state: {
      comp: 't-checkbox-group',
      event: 'checkboxgroup',
      defaultVal: [1],
      bind: {
        options: [{ label: t('craftRoute.onlyShowValid'), value: 1 }],
      },
    },
  };
});
const craftRouteTypeOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_TYPE' }).then((data) => {
  craftRouteTypeOption.value = data;
});
const optsValue = ref({
  state: 1,
});
const conditionEnter = (data: any) => {
  optsValue.value = data;
  getRouting();
};
// #endregion

// #region 工艺路线
const eidtRoutingVisible = ref(false);
const isAdd = ref(true);
const editId = ref();
const isCopy = ref(false);
const craftRouteColumn = [
  {
    colKey: 'routingType',
    title: t('craftRoute.category'),
    width: 120,
    align: 'center',
    cell: (h: any, { row }: any) => {
      return getRoutingType(row.routingType);
    },
  },
  { colKey: 'routingCode', title: t('business.main.code'), width: 100, align: 'center' },
  { colKey: 'routingName', title: t('business.main.name'), width: 100, align: 'center' },
  { colKey: 'routingVersion', title: t('craftRoute.version'), width: 100, align: 'center' },
  { colKey: 'state', title: t('craftRoute.status'), width: 100, align: 'center' },
  {
    colKey: 'enableDate',
    title: t('craftRoute.enableDate'),
    width: 120,
    align: 'center',
    cell: (h: any, { row }: any) => {
      const obj = dayjs(row.enableDate);
      return obj.isValid() ? obj.format('YYYY-MM-DD') : null;
    },
  },
  {
    colKey: 'invailDate',
    title: t('craftRoute.invailDate'),
    width: 120,
    align: 'center',
    cell: (h: any, { row }: any) => {
      const obj = dayjs(row.invailDate);
      return obj.isValid() ? obj.format('YYYY-MM-DD') : null;
    },
  },
  { colKey: 'creator', title: t('business.main.creator'), width: 100, align: 'center' },
  { colKey: 'timeCreate', title: t('business.main.timeCreate'), width: 170, align: 'center' },
  { colKey: 'modifier', title: t('business.main.modifier'), width: 100, align: 'center' },
  { colKey: 'timeModified', title: t('business.main.timeModified'), width: 170, align: 'center' },
  { colKey: 'routingDesc', title: t('business.main.desc'), width: 150, align: 'center' },
  { colKey: 'op', title: t('common.button.operation'), width: 150, align: 'center', fixed: 'right' },
];
const craftRouteData = reactive({
  total: 0,
  list: [],
});
const getRouting = () => {
  setLoading(true);
  apiMain.routing
    .mainPage({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...optsValue.value,
    })
    .then((data) => {
      craftRouteData.list = data.list;
      craftRouteData.total = data.total;
      setLoading(false);
    })
    .then(() => {
      setLoading(false);
    });
};
const getRoutingType = (type: string) => {
  const option = find(craftRouteTypeOption.value, (o) => o.value === type);
  return option ? option.label : type;
};
getRouting();
const addRouting = () => {
  isAdd.value = true;
  editId.value = null;
  isCopy.value = false;
  eidtRoutingVisible.value = true;
};
const editRouting = (id: string) => {
  editId.value = id;
  isAdd.value = false;
  isCopy.value = false;
  eidtRoutingVisible.value = true;
};
const copyRouting = (id: string) => {
  editId.value = id;
  isAdd.value = false;
  isCopy.value = true;
  eidtRoutingVisible.value = true;
};
const disable = (id: string) => {
  const confirmDia = DialogPlugin.confirm({
    header: t('common.button.disable'),
    body: t('craftRoute.disableNotCount'),
    confirmBtn: {
      loading: false,
    },
    onConfirm: () => {
      confirmDia.update({ confirmBtn: { loading: true } });
      apiMain.routing.disable(id).then(() => {
        confirmDia.update({ confirmBtn: { loading: false } });
        confirmDia.hide();
        getRouting();
      });
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
const enableClick = (row: any) => {
  enableFormData.value = row;
  enableVisible.value = true;
};
// #endregion

// #region 启用
const enableVisible = ref(false);
const enableFormData = ref({});
// #endregion

// #region 关联产品
const selectedRoutingCode = ref();
const selectedRoutingName = ref();
const isSelectRouting = ref(false);
const productVisible = ref(false);
const productRelationKeyword = ref();
const routingMapKeys = ref([]);
const productPage = ref({
  page: 1,
  rows: 10,
});
const productLoading = ref(false);
const productRelationColumn = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  { colKey: 'mitemCategoryCode', title: t('craftRoute.categoryCode'), width: 100, align: 'center' },
  { colKey: 'mitemCategoryName', title: t('craftRoute.categoryName'), width: 100, align: 'center' },
  { colKey: 'mitemCode', title: t('craftRoute.productCode'), width: 100, align: 'center' },
  { colKey: 'mitemName', title: t('craftRoute.productName'), width: 100, align: 'center' },
  { colKey: 'workcenter', title: t('craftRoute.workcenter'), width: 120, align: 'center' },
  { colKey: 'isDefault', title: t('craftRoute.isDefault'), width: 100, align: 'center' },
  { colKey: 'creator', title: t('business.main.creator'), width: 100, align: 'center' },
  { colKey: 'timeCreate', title: t('business.main.timeCreate'), width: 150, align: 'center' },
  { colKey: 'op', title: t('common.button.operation'), width: 100, align: 'center', fixed: 'right' },
];
const productRelationData = reactive({
  total: 0,
  list: [],
});
const selectRouting = ({ row }) => {
  selectedRoutingCode.value = row.routingCode;
  selectedRoutingName.value = row.routingName;
  isSelectRouting.value = true;
  getProductRelation();
};
const getProductRelation = () => {
  productLoading.value = true;
  apiMain.routingMap
    .listByRoutingCode({
      pageNum: productPage.value.page,
      pageSize: productPage.value.rows,
      routingCode: selectedRoutingCode.value,
      keyword: productRelationKeyword.value,
    })
    .then((data) => {
      productRelationData.list = data.list;
      productRelationData.total = data.total;
      productLoading.value = false;
    })
    .catch(() => {
      productLoading.value = false;
    });
};
const deleteProductRelation = (id: string) => {
  const confirmDia = DialogPlugin.confirm({
    header: t('common.dialog.header.tip'),
    body: t('common.message.confirmDelete'),
    confirmBtn: {
      loading: false,
    },
    onConfirm: () => {
      confirmDia.update({ confirmBtn: { loading: true } });
      apiMain.routingMap.deleteBatch([id]).then(() => {
        confirmDia.update({ confirmBtn: { loading: false } });
        confirmDia.hide();
        getProductRelation();
      });
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
const deleteProductRelationBatch = () => {
  const confirmDia = DialogPlugin.confirm({
    header: t('common.dialog.header.tip'),
    body: t('common.message.confirmDelete'),
    confirmBtn: {
      loading: false,
    },
    onConfirm: () => {
      confirmDia.update({ confirmBtn: { loading: true } });
      apiMain.routingMap.deleteBatch(routingMapKeys.value).then(() => {
        confirmDia.update({ confirmBtn: { loading: false } });
        confirmDia.hide();
        getProductRelation();
        routingMapKeys.value = [];
      });
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
const setProductRelationDefault = ($event: any, id: string) => {
  apiMain.routingMap
    .setDefault(id, {
      isDefault: $event ? 1 : 0,
    })
    .then(() => getProductRelation());
};
// #endregion
</script>

<style lang="less" scoped>
// .container {
//   margin: 20px;

//   .card {
//     background-color: var(--td-bg-color-container);
//     border-radius: var(--td-radius-medium);
//     margin-bottom: 5px;

//     :deep(.t-form__controls-content) {
//       width: 200px;

//       .t-date-picker,
//       .t-input-number,
//       .t-color-picker__trigger {
//         width: 200px;
//       }
//     }
//   }
// }
</style>
