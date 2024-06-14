<template>
  <cmp-container :full="false">
    <cmp-card :span="12">
      <cmp-container :full="true" :ghost="true">
        <cmp-query :opts="opts" is-expansion @submit="conditionEnter" />
        <cmp-table
          v-model:pagination="pageUI"
          active-row-type="single"
          :table-column="paramColumn"
          :table-data="paramData.list"
          :loading="loading"
          :total="paramData.total"
          @refresh="getParamData"
          @row-click="selectParam"
        >
          <template #title>
            <div>工艺卡列表</div>
          </template>
          <template #button>
            <t-button @click="addParam">{{ t('common.button.add') }}</t-button>
          </template>
          <template #state="{ row }">
            <t-popconfirm v-if="row.state === 1" content="请确认是否更新状态" @confirm="disable(row.id)">
              <t-switch :custom-value="[1, 0]" :value="row.state" />
            </t-popconfirm>
            <t-switch v-else :custom-value="[1, 0]" :value="row.state" @change="statusChange($event, row)" />
          </template>
          <template #op="{ row }">
            <t-space size="small">
              <t-link v-if="row.state === 1" theme="primary" size="small" @click="disable(row.id)">{{
                t('common.button.disable')
              }}</t-link>
              <t-link v-else theme="primary" size="small" @click="enableClick(row)">{{
                t('common.button.enable')
              }}</t-link>
              <t-link theme="primary" size="small" @click="editParam(row.id)">{{ t('common.button.edit') }}</t-link>
              <t-link theme="primary" size="small" @click="deleteParam(row.id)">删除</t-link>
              <t-link theme="primary" size="small">复制</t-link>
            </t-space>
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-card :span="12" header="工艺参数卡关联" header-bordered>
      <cmp-table
        v-model:selected-row-keys="ParamMapKeys"
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
            placeholder="请输入设备编码"
            label="设备编码"
            @enter="getProductRelation"
          />
        </template>
        <template #button>
          <t-button :disabled="!isSelectParam" @click="productVisible = true">关联工艺卡</t-button>
          <!-- <t-button :disabled="!isSelectParam" theme="default">{{ t('common.button.import') }}</t-button> -->
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="deleteProductRelationBatch">
            <t-button :disabled="!isSelectParam || ParamMapKeys.length === 0" theme="default">{{
              t('common.button.batchDelete')
            }}</t-button>
          </t-popconfirm>
        </template>
        <template #isDefault="{ row }">
          <t-switch :value="row.isDefault === 1" @change="setProductRelationDefault($event, row.id)"></t-switch>
        </template>
        <template #op="{ row }">
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="deleteProductRelation(row.id)">
            <t-link theme="primary" size="small">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <edit
    :id="editId"
    v-model="eidtParamVisible"
    :title="
      isAdd
        ? t('common.dialog.header.add', [t('processParam.param')])
        : t('common.dialog.header.edit', [t('processParam.param')])
    "
    :is-copy="isCopy"
    @submit="getParamData"
  ></edit>
  <!-- <enable
    v-model="enableVisible"
    :form-data="enableFormData"
    :Param-type-option="paramTypeOption"
    @submit="getParamData"
  ></enable>
  <product-relation
    v-model="productVisible"
    :Param-code="selectedParamCode"
    :Param-name="selectedParamName"
    @submit="getProductRelation"
  ></product-relation> -->
</template>

<script setup lang="ts">
// #region import
import dayjs from 'dayjs';
import { computed, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

// import edit from './edit.vue';
// import enable from './enable.vue';
import { useLang } from './lang';
// import productRelation from './productRelation.vue';
// #endregion

// 使用多语言
const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// #region 查询框
const opts = computed(() => {
  return {
    paramCode: {
      label: '工艺卡名称',
      comp: 't-input',
      event: 'paramCode',
      defaultVal: '',
    },
    equipmentCode: {
      label: '设备编码/名称',
      comp: 't-input',
      event: 'equipmentCode',
      defaultVal: '',
    },

    equipmentType: {
      label: '设备类型编码/名称',
      comp: 't-input',
      event: 'equipmentCode',
      defaultVal: '',
    },

    userCraete: {
      label: '创建人',
      comp: 't-input',
      event: 'userCraete',
      defaultVal: '',
    },
    state: {
      comp: 't-checkbox-group',
      event: 'checkboxgroup',
      defaultVal: [1],
      bind: {
        options: [{ label: '只显示有效状态', value: 1 }],
      },
    },
  };
});
const paramTypeOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'C_MO_TYPE' }).then((data) => {
  paramTypeOption.value = data;
});
const optsValue = ref({
  state: 1,
});
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  optsValue.value = data;
  getParamData();
};
// #endregion

// #region 工艺路线
const eidtParamVisible = ref(false);
const isAdd = ref(true);
const editId = ref();
const isCopy = ref(false);
const paramColumn = [
  {
    colKey: 'paramName',
    title: '工艺卡名称',
    width: 120,
    align: 'center',
  },
  {
    colKey: 'paramCode',
    title: '工艺卡编码',
    width: 120,
    align: 'center',
  },
  {
    colKey: 'paramDesc',
    title: '工艺卡描述',
    width: 120,
    align: 'center',
  },
  {
    colKey: 'paramType',
    title: '参数类型',
    width: 120,
    align: 'center',
  },

  {
    colKey: 'state',
    title: '状态',
    width: 120,
    align: 'center',
  },
  {
    colKey: 'userCreate',
    title: '创建人',
    width: 120,
    align: 'center',
  },
  {
    colKey: 'datetimeCreate',
    title: '创建时间',
    width: 120,
    align: 'center',
    cell: (h: any, { row }: any) => {
      const obj = dayjs(row.datetimeCreate);
      return obj.isValid() ? obj.format('YYYY-MM-DD') : null;
    },
  },
  {
    colKey: 'userModified',
    title: '修改人',
    width: 120,
    align: 'center',
  },
  {
    colKey: 'datetimeModified',
    title: '修改时间',
    width: 120,
    align: 'center',
    cell: (h: any, { row }: any) => {
      const obj = dayjs(row.datetimeModified);
      return obj.isValid() ? obj.format('YYYY-MM-DD') : null;
    },
  },
  { colKey: 'op', title: t('common.button.operation'), width: 150, align: 'center', fixed: 'right' },
];
const paramData = reactive({
  total: 0,
  list: [],
});
// 模拟数据
const mainTableData = [
  {
    id: 1,
    paramName: '折弯机ST',
    paramCode: 'ZHEWAN011',
    paramDesc: '折弯机ST',
    paramType: '工艺卡',
    state: 1,
    userCreate: `张三`,
    datetimeCreate: '2024-01-07',
    userModified: `张三`,
    datetimeModified: '2024-01-08',
  },
  {
    id: 2,
    paramName: '冲压机ST',
    paramCode: 'CHONGYA001',
    paramDesc: '冲压机ST',
    paramType: '属性页',
    state: 1,
    userCreate: `李四`,
    datetimeCreate: '2024-01-07',
    userModified: `李四`,
    datetimeModified: '2024-01-08',
  },
  {
    id: 3,
    paramName: '焊接机',
    paramCode: 'HANJIE001',
    paramDesc: '焊接机',
    paramType: '参数',
    state: 1,
    userCreate: `王五`,
    datetimeCreate: '2024-01-07',
    userModified: `王五`,
    datetimeModified: '2024-01-08',
  },
];
// const mainTableData = Array.from({ length: 10 }, (_, index) => ({
//   id: index + 1,
//   paramName: `参数名称${index + 1}`,
//   paramCode: `PCODE${index + 1}`,
//   paramDesc: `这是参数${index + 1}的描述`,
//   paramType: `类型${Math.floor(Math.random() * 3) + 1}`,
//   isLink: [1, 0][Math.floor(Math.random() * 2)], // 随机选择状态
//   state: [1, 0][Math.floor(Math.random() * 2)], // 随机选择状态
//   isEquipmentParam: [1, 0][Math.floor(Math.random() * 2)], // 随机选择状态
//   isParamAndon: [1, 0][Math.floor(Math.random() * 2)], // 随机选择状态
//   userCreate: `创建者${Math.floor(Math.random() * 5) + 1}`,
//   datetimeCreate: new Date().toLocaleDateString(),
//   userModified: `修改者${Math.floor(Math.random() * 5) + 1}`,
//   datetimeModified: new Date().toLocaleDateString(),
// }));
const detailTableData = [
  {
    id: 1,
    paramName: '焊接机',
    paramCode: 'HANJIE001',
    paramDesc: '焊接机',
    equipmentName: `焊接机`,
    equipmentCode: 'HANJIE001',
    equipmentTypeCode: 'CONTROL',
    equipmentTypeName: `生产设备`,
    userCreate: `张三`,
    timeCreate: '2024-01-08',
  },
];
// const detailTableData = Array.from({ length: 10 }, (_, index) => ({
//   id: index + 1,
//   paramName: ['温度', '湿度','速率'][Math.floor(Math.random() * 3)],
//   paramCode: mainTableData[Math.floor(Math.random() * mainTableData.length)].paramCode,
//   paramDesc: `这是工艺卡参数${index + 1}的描述`,
//   equipmentName: `设备${Math.floor(Math.random() * 10) + 1}`,
//   equipmentCode: `EQUIPMENT${Math.floor(Math.random() * 10) + 1}`,
//   equipmentTypeCode: `ETYPE${Math.floor(Math.random() * 5) + 1}`,
//   equipmentTypeName: `设备类型${Math.floor(Math.random() * 5) + 1}`,
//   userCreate: `创建人${Math.floor(Math.random() * 5) + 1}`,
//   timeCreate: new Date().toLocaleDateString(),
// }));

const getParamData = () => {
  setLoading(true);
  // 使用模拟数据代替API调用
  setTimeout(() => {
    paramData.list = mainTableData;
    paramData.total = mainTableData.length;
    setLoading(false);
  }, 500); // 模拟异步延迟，可调整或移除以符合实际需求
};
getParamData();
const addParam = () => {
  isAdd.value = true;
  editId.value = null;
  isCopy.value = false;
  eidtParamVisible.value = true;
};
const editParam = (id: string) => {
  editId.value = id;
  isAdd.value = false;
  isCopy.value = false;
  eidtParamVisible.value = true;
};
const deleteParam = (id: string) => {
  console.log('删除', id);
  // editId.value = id;
  // isAdd.value = false;
  // isCopy.value = true;
  // eidtParamVisible.value = true;
};
const statusChange = ($event: any, raw: any) => {
  if ($event === 1) {
    enableClick(raw);
  } else {
    disable(raw.id);
  }
};
const disable = (id: string) => {
  console.log(id);
  // apiMain.Param.disable(id).then(() => {
  //   getParamData();
  // });
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
const selectedParamCode = ref();
const selectedParamName = ref();
const isSelectParam = ref(false);
const productVisible = ref(false);
const productRelationKeyword = ref();
const ParamMapKeys = ref([]);
const productPage = ref({
  page: 1,
  rows: 10,
});
const productLoading = ref(false);
const productRelationColumn = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  { colKey: 'paramName', title: '工艺卡参数名称', width: 100, align: 'center' },
  { colKey: 'paramCode', title: '工艺卡参数编码', width: 100, align: 'center' },
  { colKey: 'paramDesc', title: '工艺卡参数描述', width: 100, align: 'center' },
  { colKey: 'equipmentName', title: '设备名称', width: 100, align: 'center' },
  { colKey: 'equipmentCode', title: '设备编码', width: 120, align: 'center' },
  { colKey: 'equipmentTypeCode', title: '设备类型编码', width: 100, align: 'center' },
  { colKey: 'equipmentTypeName', title: '设备类型名称', width: 100, align: 'center' },
  { colKey: 'userCreate', title: '创建人', width: 150, align: 'center' },
  { colKey: 'timeCreate', title: '创建时间', width: 150, align: 'center' },
  { colKey: 'op', title: t('common.button.operation'), width: 100, align: 'center', fixed: 'right' },
];
const productRelationData = reactive({
  total: 0,
  list: [],
});
const selectParam = ({ row }) => {
  selectedParamCode.value = row.paramCode;
  selectedParamName.value = row.pagearamName;
  isSelectParam.value = true;
  getProductRelation();
};
const getProductRelation = () => {
  productLoading.value = true;
  setTimeout(() => {
    productRelationData.list = detailTableData.filter((item) => item.paramCode === selectedParamCode.value);
    productRelationData.total = productRelationData.list.length;
    productLoading.value = false;
  }, 500); // 模拟异步延迟，可调整或移除以符合实际需求
  // apiMain.ParamMap.listByParamCode({
  //   pageNum: productPage.value.page,
  //   pageSize: productPage.value.rows,
  //   ParamCode: selectedParamCode.value,
  //   keyword: productRelationKeyword.value,
  // })
  //   .then((data) => {
  //     productRelationData.list = data.list;
  //     productRelationData.total = data.total;
  //     productLoading.value = false;
  //   })
  //   .catch(() => {
  //     productLoading.value = false;
  //   });
};
const deleteProductRelation = (id: string) => {
  console.log(id);
  // apiMain.ParamMap.deleteBatch([id]).then(() => {
  //   getProductRelation();
  // });
};
const deleteProductRelationBatch = () => {
  // apiMain.ParamMap.deleteBatch(ParamMapKeys.value).then(() => {
  //   getProductRelation();
  //   ParamMapKeys.value = [];
  // });
};
const setProductRelationDefault = ($event: any, id: string) => {
  console.log(id, $event);
  // apiMain.ParamMap.setDefault(id, {
  //   isDefault: $event ? 1 : 0,
  // }).then(() => getProductRelation());
};
// #endregion
</script>
