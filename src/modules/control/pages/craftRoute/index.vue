<template>
  <div class="container">
    <tm-query class="card" :opts="opts" is-expansion label-width="100px" @submit="conditionEnter" />
    <t-card class="card" :header="t('craftRoute.craftRoute')" :bordered="false" header-bordered>
      <tm-table
        v-model:pagination="pageUI"
        :table-column="craftRouteColumn"
        :table-data="craftRouteData.list"
        :loading="loading"
        :total="craftRouteData.total"
        @refresh="getRouting"
      >
        <template #oprate>
          <t-button @click="addRouting">{{ t('common.button.add') }}</t-button>
        </template>
        <template #state="{ row }">
          <t-tag v-if="row.state === 1" theme="success" variant="outline">{{ t('craftRoute.effective') }}</t-tag>
          <t-tag v-else theme="danger" variant="outline">{{ t('craftRoute.invalid') }}</t-tag>
        </template>
        <template #op="{ row }">
          <t-space size="small">
            <t-link
              v-if="row.state === 1"
              theme="primary"
              size="small"
              @click="disable(row.id, row.routingVersionId)"
              >{{ t('common.button.disable') }}</t-link
            >
            <t-link v-else theme="primary" size="small" @click="enableVisible = true">{{
              t('common.button.enable')
            }}</t-link>
            <t-link theme="primary" size="small" @click="editRouting(row.id)">{{ t('common.button.edit') }}</t-link>
            <t-link theme="primary" size="small" @click="copyRouting(row.id)">{{ t('common.button.copy') }}</t-link>
          </t-space>
        </template>
      </tm-table>
    </t-card>
    <t-card class="card" :header="t('craftRoute.productRelation')" :bordered="false" header-bordered>
      <tm-table
        v-model:pagination="pageUI"
        :table-column="productRelationColumn"
        :table-data="productRelationData.list"
        :loading="loading"
        :total="productRelationData.total"
      >
        <template #button>
          <t-button>{{ t('common.button.add') }}</t-button>
          <t-button theme="default">{{ t('common.button.import') }}</t-button>
          <t-button theme="default">{{ t('common.button.batchDelete') }}</t-button>
        </template>
        <template #op>
          <t-button variant="text" theme="primary">{{ t('common.button.delete') }}</t-button>
        </template>
      </tm-table>
    </t-card>
    <edit
      :id="editId"
      v-model="eidtRoutingVisible"
      :title="
        isAdd
          ? t('common.dialog.header.add', [t('craftRoute.craftRoute')])
          : t('common.dialog.header.edit', [t('craftRoute.craftRoute')])
      "
      :is-copy="isCopy"
      @submit="eidtSubmit"
    ></edit>
    <t-dialog v-model:visible="enableVisible" :header="t('common.button.enable')" width="60%">
      <t-form :data="enableFormData" label-width="100px">
        <t-form-item :label="t('craftRoute.craftRouteCode')" name="routingCode">
          <t-input
            v-model="enableFormData.routingCode"
            disabled
            :placeholder="t('common.placeholder.input', [t('craftRoute.craftRouteCode')])"
          ></t-input>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
// #region import
import dayjs from 'dayjs';
import { find } from 'lodash';
import { DialogPlugin } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import { api as apiControl } from '@/api/control';
import { api as apiMain } from '@/api/main';
import TmQuery from '@/components/tm-query/index.vue';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import edit from './edit.vue';
import { useLang } from './lang';
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
      comp: 'tm-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workcenter',
        showTitle: false,
      },
    },
    productCategoryId: {
      label: t('craftRoute.productType'),
      comp: 'tm-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    productId: {
      label: t('craftRoute.product'),
      comp: 'tm-select-business',
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
  { colKey: 'enableDate', title: t('craftRoute.enableDate'), width: 150, align: 'center' },
  { colKey: 'invailDate', title: t('craftRoute.invalidDate'), width: 150, align: 'center' },
  { colKey: 'creator', title: t('business.main.creator'), width: 100, align: 'center' },
  { colKey: 'timeCreate', title: t('business.main.timeCreate'), width: 150, align: 'center' },
  { colKey: 'modifier', title: t('business.main.modifier'), width: 100, align: 'center' },
  { colKey: 'timeModified', title: t('business.main.timeModified'), width: 150, align: 'center' },
  { colKey: 'routingDesc', title: t('business.main.desc'), width: 150, align: 'center' },
  { colKey: 'op', title: t('common.button.operation'), width: 150, align: 'center', fixed: 'right' },
];
const craftRouteData = reactive({
  total: 0,
  list: [],
});
const getRouting = () => {
  setLoading(true);
  apiControl.routing
    // @ts-ignore
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
const eidtSubmit = () => {
  getRouting();
};
const disable = (id: string, routingRevisionId: string) => {
  // @ts-ignore
  apiControl.routing.moScheduleBindRoutingCount(routingRevisionId).then((total) => {
    let showText: string;
    if (total > 0) {
      showText = t('craftRoute.disableHasCount', [total]);
    } else {
      showText = t('craftRoute.disableNotCount');
    }
    const confirmDia = DialogPlugin.confirm({
      header: t('common.button.disable'),
      body: showText,
      confirmBtn: {
        loading: false,
      },
      onConfirm: () => {
        confirmDia.update({ confirmBtn: { loading: true } });
        // @ts-ignore
        apiControl.routing.disable(id).then(() => {
          confirmDia.update({ confirmBtn: { loading: false } });
          confirmDia.hide();
          getRouting();
        });
      },
      onClose: () => {
        confirmDia.hide();
      },
    });
  });
};
// #endregion

// #region 启用
const enableVisible = ref(false);
const enableFormData = reactive({
  routingCode: null,
  routingName: null,
  routingDesc: null,
  routingType: 'STANDARD',
  routingVersion: 1,
  enableDate: dayjs().format(),
  invailDate: null,
});
// #endregion

// #region 关联产品
const productRelationColumn = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  { colKey: 'id', title: t('craftRoute.categoryCode'), width: 120, align: 'center' },
  { colKey: 'age', title: t('craftRoute.categoryName'), width: 120, align: 'center' },
  { colKey: 'phone', title: t('craftRoute.productCode'), width: 120, align: 'center' },
  { colKey: 'phone', title: t('craftRoute.productName'), width: 120, align: 'center' },
  { colKey: 'phone', title: t('craftRoute.workcenter'), width: 120, align: 'center' },
  { colKey: 'phone', title: t('craftRoute.isDefault'), width: 120, align: 'center' },
  { colKey: 'phone', title: t('business.main.creator'), width: 120, align: 'center' },
  { colKey: 'phone', title: t('business.main.timeCreate'), width: 120, align: 'center' },
  { colKey: 'op', title: t('common.button.operation'), width: 100, align: 'center', fixed: 'right' },
];
const productRelationData = reactive({
  total: 0,
  list: [],
});
// #endregion
</script>

<style lang="less" scoped>
.container {
  margin: 20px;

  .card {
    background-color: var(--td-bg-color-container);
    border-radius: var(--td-radius-medium);
    margin-bottom: 5px;

    :deep(.t-form__controls-content) {
      width: 200px;

      .t-date-picker,
      .t-input-number,
      .t-color-picker__trigger {
        width: 200px;
      }
    }
  }
}
</style>
