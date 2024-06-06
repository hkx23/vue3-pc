<template>
  <t-dialog v-model:visible="visible" class="paramDomainDialog" mode="full-screen" :footer="false" @close="close">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ title }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-card :span="12" :ghost="true">
        <div class="title-row">
          <div class="table-title">基础信息配置</div>
          <t-space>
            <t-button :loading="loading" style="float: right" @click="save">{{
              t('common.button.save')
            }}</t-button></t-space
          >
        </div>
        <t-form
          ref="domainParamFromRef"
          class="card"
          :data="formData"
          :rules="domainParamRules"
          label-width="120px"
          layout="inline"
        >
          <t-form-item :label="t('domainParam.domainParamCode')" name="domainParamCode">
            <t-input
              v-model="formData.domainParamCode"
              :disabled="props.id && !props.isCopy ? true : false"
              :placeholder="t('common.placeholder.input', [t('domainParam.domainParamCode')])"
            ></t-input>
          </t-form-item>
          <t-form-item :label="t('domainParam.domainParamName')" name="domainParamName">
            <t-input
              v-model="formData.domainParamName"
              :placeholder="t('common.placeholder.input', [t('domainParam.domainParamName')])"
            ></t-input>
          </t-form-item>
          <t-form-item :label="t('domainParam.domainParamTemplate')" name="domainParamTemplateId">
            <bcmp-select-business
              v-model="formData.domainParamTemplateId"
              :show-title="false"
              type="domainParamTemplate"
              :placeholder="t('common.placeholder.select', [t('domainParam.domainParamTemplate')])"
            ></bcmp-select-business>
          </t-form-item>
          <t-form-item :label="t('domainParam.domainCategory')" name="domainCategory">
            <t-select
              v-model="formData.domainCategory"
              :clearable="true"
              filterable
              :placeholder="t('common.placeholder.select', [t('domainParam.domainCategory')])"
              :disabled="isEdit"
              @change="changeDomain"
            >
              <t-option
                v-for="item in businessDomainList"
                :key="item.value"
                :label="item.label + ' (' + item.value + ')'"
                :value="item.value"
                :name="item.label"
              />
            </t-select>
            <!-- <t-input
          v-model="formData.domainCategory"
       
        ></t-input> -->
          </t-form-item>
          <t-form-item :label="t('domainParam.datasourceCategory')" name="datasourceCategory">
            <t-select
              v-model="formData.datasourceCategory"
              filterable
              :disabled="isEdit"
              @change="changeDatasourceCategory"
            >
              <t-option v-for="item in dataSourceList" :key="item.value" :label="item.label" :value="item.value" />
            </t-select>
            <!-- <t-input
          v-model="formData.datasourceCategory"
          :placeholder="t('common.placeholder.input', [t('domainParam.datasourceCategory')])"
        ></t-input> -->
          </t-form-item>
          <t-form-item :label="t('domainParam.datasourceName')" name="datasourceName">
            <t-select
              v-model="formData.datasourceName"
              :clearable="true"
              filterable
              :placeholder="t('common.placeholder.select', [t('domainParam.datasourceName')])"
              :disabled="isEdit"
              @change="changeTable"
            >
              <t-option
                v-for="item in tableList"
                :key="item.tableName"
                :label="item.tableDescription + ' (' + item.tableName + ')'"
                :name="item.tableDescription"
                :value="item.tableName"
              />
            </t-select>
            <!-- <t-input
          v-model="formData.datasourceName"
          :placeholder="t('common.placeholder.input', [t('domainParam.datasourceName')])"
        ></t-input> -->
          </t-form-item>
        </t-form>
      </cmp-card>
      <cmp-card :span="12" :ghost="true">
        <!-- <div class="title-row">
          <div class="table-title">功能配置</div>
          <t-space> </t-space>
        </div> -->
        <cmp-container :full="true">
          <cmp-card ref="refSettingCard" :ghost="true" class="full-tab">
            <t-tabs v-model="currSettingTab">
              <t-tab-panel value="TABLE" label="表格">
                <cmp-container :full="true">
                  <cmp-card :span="12" :ghost="true">
                    <div class="title-row">
                      <div class="table-title">表格基础配置</div>
                      <t-space> </t-space>
                    </div>
                    <t-form
                      ref="domainParamTableFromRef"
                      class="card"
                      :data="tableFormData"
                      :rules="domainParamTableRules"
                      label-width="120px"
                      layout="inline"
                    >
                      <t-form-item :label="t('domainParam.tableTitle')" name="tableTitle">
                        <t-input
                          v-model="tableFormData.tableTitle"
                          :placeholder="t('common.placeholder.input', [t('domainParam.tableTitle')])"
                        ></t-input>
                      </t-form-item>
                      <t-form-item :label="t('domainParam.isPaging')" name="isPaging">
                        <t-switch v-model="tableFormData.usePage"></t-switch>
                      </t-form-item>
                      <t-form-item :label="t('domainParam.sortField')" name="sortField">
                        <t-select
                          v-model="tableFormData.sortField"
                          :clearable="true"
                          filterable
                          :placeholder="t('common.placeholder.select', [t('domainParam.sortField')])"
                        >
                          <t-option
                            v-for="item in selectedColumnList"
                            :key="item.value"
                            :label="item.label + ' (' + item.value + ')'"
                            :value="item.value"
                            :name="item.label"
                          />
                        </t-select>
                      </t-form-item>
                      <t-form-item :label="t('domainParam.sortDirection')" name="sortDirection">
                        <t-select v-model="tableFormData.sortType" filterable :disabled="isEdit">
                          <t-option key="asc" label="升序" value="asc" />
                          <t-option key="desc" label="降序" value="desc" />
                        </t-select>
                      </t-form-item>
                    </t-form>
                  </cmp-card>
                  <cmp-card :span="12" :ghost="true">
                    <cmp-table
                      ref="columnTableRef"
                      :show-pagination="false"
                      row-key="columnName"
                      :table-column="columnColumns"
                      :table-data="columnsData"
                      :fixed-height="true"
                      :total="columnTotal"
                      @refresh="fetchColumnData"
                    >
                      <template #title> 表格列配置 </template>

                      <template #isDatabaseField="{ row }">
                        <t-checkbox v-model="row.isDatabaseField" :disabled="row.isDatabaseField"></t-checkbox>
                      </template>
                      <template #isVisible="{ row }">
                        <t-switch v-model="row.isVisible"></t-switch>
                      </template>
                      <template #isFixed="{ row }">
                        <t-switch v-model="row.isFixed"></t-switch>
                      </template>
                      <template #columnWidth="{ row }">
                        <t-input-number v-model="row.columnWidth" theme="column"></t-input-number>
                      </template>

                      <template #align="{ row }">
                        <t-select v-model="row.align">
                          <t-option key="left" label="左对齐" value="left" />
                          <t-option key="center" label="居中" value="center" />
                          <t-option key="right" label="右对齐" value="right" />
                        </t-select>
                      </template>

                      <template #op="slotProps">
                        <t-link theme="primary" @click="onColumnEditRowClick(slotProps)">{{
                          t('common.button.edit')
                        }}</t-link>
                      </template>

                      <template #button>
                        <!-- <t-space direction="vertical">
                        <t-button theme="primary" @click="onAdd()">新增</t-button>
                      </t-space> -->
                      </template>
                    </cmp-table>
                  </cmp-card>
                </cmp-container>
              </t-tab-panel>
              <t-tab-panel value="SEARCH" label="查询条件">
                <cmp-container :full="true">
                  <cmp-card :span="12" :ghost="true">
                    <cmp-table
                      ref="searchTableRef"
                      :show-pagination="false"
                      row-key="id"
                      :table-column="columnColumns"
                      :table-data="columnsData"
                      :fixed-height="true"
                      :total="columnTotal"
                      @refresh="fetchColumnData"
                    >
                      <template #title> 查询条件配置 </template>
                      <template #op="slotProps">
                        <t-link theme="primary" @click="onColumnEditRowClick(slotProps)">{{
                          t('common.button.edit')
                        }}</t-link>
                      </template>

                      <template #button>
                        <!-- <t-space direction="vertical">
                        <t-button theme="primary" @click="onAdd()">新增</t-button>
                      </t-space> -->
                      </template>
                    </cmp-table>
                  </cmp-card>
                </cmp-container>
              </t-tab-panel>
              <t-tab-panel v-if="enableButton" value="BUTTON" label="按钮定义">
                <cmp-container :full="true">
                  <cmp-row>
                    <cmp-card flex="280px">
                      <t-tabs v-model="currButtonTab">
                        <t-tab-panel value="button" label="按钮">
                          <t-list size="small" split>
                            <t-list-item
                              v-for="item in buttonList"
                              :key="item.name"
                              :class="currButtonName == item.name ? 'activeButton' : ''"
                              @click="onClickBotton(item.name)"
                            >
                              <div>
                                <location-icon />
                                <span style="margin-left: var(--td-comp-margin-s)">{{ item.processName }}</span>
                              </div>
                              <template #action> </template>
                            </t-list-item>
                          </t-list>
                        </t-tab-panel>
                      </t-tabs>
                    </cmp-card>
                    <cmp-card :span="12" :ghost="true" flex="auto">
                      <cmp-table
                        ref="buttonTableRef"
                        :show-pagination="false"
                        row-key="columnName"
                        :table-column="columnColumns"
                        :table-data="columnsData"
                        :fixed-height="true"
                        :total="columnTotal"
                        @refresh="fetchColumnData"
                      >
                        <template #title> 按钮定义配置 </template>
                        <template #op="slotProps">
                          <t-link theme="primary" @click="onColumnEditRowClick(slotProps)">{{
                            t('common.button.edit')
                          }}</t-link>
                        </template>

                        <template #button> </template>
                      </cmp-table>
                    </cmp-card>
                  </cmp-row>
                </cmp-container>
              </t-tab-panel>
            </t-tabs>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
// #region import

// import dayjs from 'dayjs';
import { Data, FormRules, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/main';

import { useLang } from './lang';
// #endregion

// 使用多语言
const { t } = useLang();
const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  isCopy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'submit']);
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
const isEdit = ref(false);
// 初始渲染
onMounted(async () => {
  await loadBusinessDomainList(); // 业务领域 上 请求
});
// #获取 业务领域 下拉框数据
const businessDomainList = ref([]);
const loadBusinessDomainList = async () => {
  const res = await api.importManage.businessDomain();
  businessDomainList.value = res;
  if (businessDomainList.value.length > 0) {
    formData.domainCategory = businessDomainList.value[0]?.value;
    loadTableList();
  }
};
// #业务领域变化
const changeDomain = async () => {
  formData.datasourceName = '';
  loadTableList();
};
const dataSourceList = ref([
  { value: 'TABLE', label: '数据表' },
  { value: 'VIEW', label: '数据视图' },
  { value: 'SQL', label: 'SQL' },
]);
const changeDatasourceCategory = (value, context) => {
  console.log(value, context);
};

// #获取 业务领域下所有表格的 下拉框数据
const tableList = ref([]);
const loadTableList = async () => {
  const params = { businessCode: formData.domainCategory };
  const res = await api.domainParam.sqlTables(params);
  tableList.value = res;
};

const currentSelectTale = ref(null);
// #表格变化
// const tableDesc = ref('');
const changeTable = (value) => {
  currentSelectTale.value = tableList.value.find((item) => item.tableName === value);
  let seq = 0;
  columnsData.value = currentSelectTale.value?.columns.map((item) => ({
    ...item,
    tableName: value,
    isDatabaseField: true,
    columnWidth: 100,
    align: 'center',
    isVisible: true,
    isFixed: false,
    canDelete: false,
    seq: seq++,
  }));

  // formData.importKeyCode = value;
  // tableDesc.value = context.option.name;
  // formData.importDesc = `导入${context.option.name}`;
  // selectedTable.value = tableList.value.find((item) => item.tableName === value);
  // console.log(selectedTable.value);
  // let seq = 0;
  // columnsData.value = selectedTable.value?.columns.map((item) => ({
  //   ...item,
  //   tableName: value,
  //   isImport: !item.default,
  //   isRequire: !item.default,
  //   // 如果item.columnName的结尾不为id,isExcel设置成true
  //   isExcel: !item.default && item.columnName.slice(-2) !== 'id',
  //   value: item.columnName,
  //   label: item.columnDesc,
  //   canDelete: false,
  //   seq: seq++,
  // }));
  // columnsDataWithoutDefault.value = columnsData.value.filter((item) => item.isImport && item.value !== 'eid');
  // columnsDataWithoutDefault.value.forEach((item) => {
  //   const relateData = {
  //     relateType: 'none',
  //     systemParams: {
  //       selectedParamGroup: '',
  //       sourceColumn: '',
  //       getValueField: '',
  //     },
  //     customDict: {
  //       sourceColumn: '',
  //       dicData: [],
  //     },
  //     dataTable: {
  //       mapBusinessDomain: 'MAIN',
  //       mapTable: '',
  //       conditionData: [],
  //       tableQueryField: '',
  //     },
  //   };
  //   if (item.columnName === 'eid') {
  //     relateData.relateType = 'currentEid';
  //   }
  //   if (item.columnName === 'oid') {
  //     relateData.relateType = 'currentOid';
  //   }
  //   item.datatransfer = relateData;
  //   item.datatransferJson = JSON.stringify(relateData);
  // });
  // console.log(columnsData.value);
};

const loading = ref(false);

const domainParamRules: FormRules<Data> = {
  domainParamCode: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainParamName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainParamTemplateId: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainCategory: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  datasourceCategory: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};

const close = () => {
  // lf.clearData();
  // formData.routingCode = null;
  // formData.routingName = null;
  // formData.routingType = 'STANDARD';
  // formData.version = 1;
  // formData.enableDate = dayjs().format();
  // formData.invailDate = null;
  // formData.desc = null;
};
// Form表单
const formData = reactive({
  domainParamCode: null,
  domainParamName: null,
  domainParamTemplateId: '',
  domainCategory: null,
  datasourceCategory: 'TABLE',
  datasourceName: null,
});

const currSettingTab = ref('TABLE');

const domainParamTableRules: FormRules<Data> = {};
const tableFormData = reactive({
  tableTitle: null,
  usePage: true,
  pageSize: 20,
  sortField: '',
  sortType: 'desc',
});

const selectedColumnList = ref([]);

// 表格列表数据
const columnColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'columnName',
    title: '列字段',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'columnDesc',
    title: '列描述',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'columnType',
    title: '列类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isDatabaseField',
    title: '是否表字段',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isAutoWidth',
    title: '是否自动列宽',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'columnWidth',
    title: '列宽',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'align',
    title: '对齐方式',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isVisible',
    title: '是否显示',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isFixed',
    title: '是否固定列',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
];

const onColumnEditRowClick = (value: any) => {
  console.log(value);
};
// 表格列数据
const columnsData = ref([]);

const columnTotal = ref(0);
const fetchColumnData = () => {};
const currButtonTab = ref('button');
const enableButton = ref(false);
const buttonList = ref([]);
const currButtonName = ref('button');
const onClickBotton = (value: any) => {
  console.log(value);
};
</script>

<style lang="less" scoped>
.title-row {
  width: 100%;
  height: 32px;
  padding: 0;
  margin-bottom: 12px;
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gainsboro;
}

:deep(.t-form__controls-content) {
  width: 200px !important;

  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 200px;
  }
}
</style>
