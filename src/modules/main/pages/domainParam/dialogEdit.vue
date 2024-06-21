<template>
  <t-dialog
    v-model:visible="formParamVisible"
    class="paramDomainDialog"
    mode="full-screen"
    :footer="false"
    @close="close"
  >
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ title }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <!-- #region 基础信息配置模块代码 -->
      <cmp-card :span="12" :ghost="true">
        <div class="title-row">
          <div class="table-title">基础信息配置</div>
          <t-space>
            <t-button :loading="loading" style="float: right" @click="save">{{ t('common.button.save') }}</t-button>
          </t-space>
        </div>
        <t-form
          ref="domainParamFromRef"
          class="card"
          :data="formData"
          :rules="domainParamRules"
          label-width="120px"
          layout="inline"
        >
          <t-form-item label="领域参数分组" name="domainParamGroupId">
            <bcmp-select-business
              v-model="formData.domainParamGroupId"
              :show-title="false"
              type="domainParamGroup"
              :placeholder="t('common.placeholder.select', [t('domainParam.paramGroup')])"
            ></bcmp-select-business>
          </t-form-item>
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
            <t-select v-model="formData.datasourceCategory" filterable @change="changeDatasourceCategory">
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
      <!-- #endregion 基础信息配置模块代码 -->

      <!-- #region 表格&查询条件&按钮配置 -->
      <cmp-card :span="12" :ghost="true">
        <!-- <div class="title-row">
          <div class="table-title">功能配置</div>
          <t-space> </t-space>
        </div> -->
        <cmp-container :full="true">
          <cmp-card ref="refSettingCard" :ghost="true" class="full-tab">
            <t-tabs v-model="currSettingTab" class="padding-tab">
              <!-- #region 查询表格配置 -->
              <t-tab-panel value="TABLE" label="表格" :destroy-on-hide="false">
                <cmp-container :full="true">
                  <cmp-card :span="12" :ghost="true">
                    <div class="title-row">
                      <div class="table-title">表格基础配置</div>
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
                            v-for="item in columnsData"
                            :key="item.columnName"
                            :label="item.columnDesc + ' (' + item.columnName + ')'"
                            :value="item.columnName"
                            :name="item.columnDesc"
                          />
                        </t-select>
                      </t-form-item>
                      <t-form-item :label="t('domainParam.sortDirection')" name="sortDirection">
                        <t-select v-model="tableFormData.sortType" filterable>
                          <t-option key="asc" label="升序" value="asc" />
                          <t-option key="desc" label="降序" value="desc" />
                        </t-select>
                      </t-form-item>
                    </t-form>
                  </cmp-card>
                  <cmp-card :span="12" :ghost="true">
                    <!-- <cmp-table
                      ref="columnTableRef"
                      :show-pagination="false"
                      row-key="columnName"
                      :table-column="columnColumns"
                      :table-data="columnsData"
                      :fixed-height="true"
                      :total="columnTotal"
                      @refresh="fetchColumnData"
                    > -->
                    <t-space direction="vertical" size="4px">
                      <div class="table-box_header">
                        <div class="table-title">
                          表格列配置
                          <slot name="title"></slot>
                        </div>
                      </div>
                      <t-table
                        ref="tableColumnsRef"
                        :columns="columnColumns"
                        :data="columnsData"
                        bordered
                        lazy-load
                        row-key="seq"
                        drag-sort="row-handler"
                        @drag-sort="onDragSort"
                      >
                        <template #isDatabaseField="{ row }">
                          <t-checkbox v-model="row.isDatabaseField" :disabled="row.isDatabaseField"></t-checkbox>
                        </template>

                        <template #columnDesc="{ row }">
                          <t-input v-model="row.columnDesc"></t-input>
                        </template>
                        <template #isVisible="{ row }">
                          <t-switch v-model="row.isVisible"></t-switch>
                        </template>
                        <template #isFixed="{ row }">
                          <t-switch v-model="row.isFixed"></t-switch>
                        </template>
                        <template #isAutoWidth="{ row }">
                          <t-switch v-model="row.isAutoWidth"></t-switch>
                        </template>
                        <template #columnWidth="{ row }">
                          <span v-if="row.isAutoWidth"> auto </span>
                          <t-input-number
                            v-if="!row.isAutoWidth"
                            v-model="row.columnWidth"
                            theme="column"
                          ></t-input-number>
                        </template>

                        <template #align="{ row }">
                          <t-select v-model="row.align">
                            <t-option key="left" label="左对齐" value="left" />
                            <t-option key="center" label="居中" value="center" />
                            <t-option key="right" label="右对齐" value="right" />
                          </t-select>
                        </template>

                        <!-- <template #op="slotProps">
                          <t-link theme="primary" @click="onColumnEditRowClick(slotProps)">{{
                            t('common.button.edit')
                          }}</t-link>
                        </template> -->

                        <template #button>
                          <!-- <t-space direction="vertical">
                        <t-button theme="primary" @click="onAdd()">新增</t-button>
                      </t-space> -->
                        </template>
                      </t-table>
                    </t-space>
                  </cmp-card>
                </cmp-container>
              </t-tab-panel>
              <!-- #endregion 查询表格配置 -->
              <!-- #region 查询条件配置 -->
              <t-tab-panel value="SEARCH" label="查询条件" :destroy-on-hide="false">
                <cmp-container :full="true">
                  <cmp-card :span="12" :ghost="true">
                    <!-- <cmp-table
                      ref="columnTableRef"
                      :show-pagination="false"
                      row-key="columnName"
                      :table-column="columnColumns"
                      :table-data="columnsData"
                      :fixed-height="true"
                      :total="columnTotal"
                      @refresh="fetchColumnData"
                    > -->
                    <t-space direction="vertical" size="4px">
                      <div class="table-box_header">
                        <div class="table-title">查询条件配置</div>
                        <t-space align="end" style="float: right">
                          <t-button @click="addSearchData">添加查询条件</t-button>
                        </t-space>
                      </div>

                      <t-table
                        ref="tableSearchRef"
                        :columns="searchColumns"
                        :data="searchData"
                        bordered
                        lazy-load
                        row-key="seq"
                        drag-sort="row-handler"
                        @drag-sort="onSearchDragSort"
                      >
                        <template #field="{ row }">
                          <t-select
                            v-model="row.field"
                            :clearable="true"
                            filterable
                            :placeholder="t('common.placeholder.select', [t('domainParam.field')])"
                            @change="onSearchFieldChange(row)"
                          >
                            <t-option
                              v-for="item in columnsData"
                              :key="item.columnName"
                              :label="item.columnDesc + ' (' + item.columnName + ')'"
                              :value="item.columnName"
                              :name="item.columnDesc"
                            />
                          </t-select>
                        </template>

                        <template #label="{ row }">
                          <t-input v-model="row.label" />
                        </template>

                        <template #component="{ row }">
                          <t-select
                            v-model="row.component"
                            :clearable="true"
                            filterable
                            :placeholder="t('common.placeholder.select', [t('domainParam.controlType')])"
                          >
                            <t-option
                              v-for="item in systemComponents"
                              :key="item.value"
                              :label="item.label + ' (' + item.value + ')'"
                              :value="item.value"
                              :name="item.label"
                            />
                          </t-select>
                        </template>

                        <template #componentParam="{ row }">
                          <!-- 如果选择的是业务参数，把业务参数列表列出，下拉选择 -->
                          <t-select
                            v-if="row.component.indexOf('bcmp-select-business') > -1"
                            v-model="row.componentParam"
                            placeholder="选择业务参数"
                            filterable
                          >
                            <t-option
                              v-for="item in businessTypes"
                              :key="item.value"
                              :label="item.name + ' (' + item.value + ')'"
                              :value="item.value"
                              :name="item.name"
                            />
                          </t-select>

                          <!-- 如果选择的是数据字典控件，把数据字典列表列出，下拉选择 -->

                          <t-cascader
                            v-else-if="row.component.indexOf('bcmp-select-param') > -1"
                            v-model="row.componentParam"
                            :options="systemParamGroups"
                            placeholder="选择系统参数组"
                            :show-all-levels="false"
                            filterable
                          />
                          <!-- 如果是其他，则显示-，不需要设置 -->
                          <span v-else>-</span>
                        </template>

                        <template #componentSource="{ row }">
                          <t-link
                            v-if="
                              row.component.indexOf('t-select') > -1 ||
                              row.component.indexOf('t-checkbox') > -1 ||
                              row.component.indexOf('t-radio') > -1
                            "
                            theme="primary"
                            @click="onClickRelate(row)"
                            >数据源配置</t-link
                          >
                          <span v-else>-</span>
                        </template>
                        <template #isMultiple="{ row }">
                          <t-switch
                            v-if="
                              row.component.indexOf('t-select') > -1 ||
                              row.component.indexOf('bcmp-select-business') > -1
                            "
                            v-model="row.isMultiple"
                          ></t-switch>

                          <span v-else>-</span>
                        </template>

                        <template #defaultValue="{ row }">
                          <t-input v-model="row.defaultValue" />
                        </template>

                        <template #isVisible="{ row }">
                          <t-switch v-model="row.isVisible"></t-switch>
                        </template>

                        <!-- <template #op="slotProps">
                          <t-link theme="primary" @click="onColumnEditRowClick(slotProps)">{{
                            t('common.button.edit')
                          }}</t-link>
                        </template> -->

                        <template #button>
                          <!-- <t-space direction="vertical">
                        <t-button theme="primary" @click="onAdd()">新增</t-button>
                      </t-space> -->
                        </template>
                      </t-table>
                    </t-space>
                  </cmp-card>
                </cmp-container>
              </t-tab-panel>
              <!-- #endregion 查询条件配置 -->
              <!-- #region 按钮&表单配置 -->
              <!-- <t-tab-panel v-if="enableButton" value="BUTTON" label="按钮定义" :destroy-on-hide="false">
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
                        <template #button> </template>
                      </cmp-table>
                    </cmp-card>
                  </cmp-row>
                </cmp-container>
              </t-tab-panel> -->
              <!-- #endregion 按钮&表单配置 -->
            </t-tabs>
          </cmp-card>
        </cmp-container>
      </cmp-card>
      <!-- #endregion 表格&查询条件&按钮配置 -->
    </cmp-container>

    <!-- #region 数据转换设置弹窗-->
    <t-drawer
      v-model:visible="componentResourceVisible"
      class="component-resource-drawer"
      :z-index="3000"
      size="450px"
      placement="right"
      header="设置控件数据源"
      :on-confirm="onCompontSourceConfirm"
      :close-btn="true"
    >
      <!-- 1.选择转换类型
    1.1 系统参数
    1.2 数据表
    1.3 自定义字典 -->
      <t-form>
        <t-form-item label="数据源类型">
          <t-radio-group v-model="selectedSourceType" variant="primary-filled" @change="selectedSourceTypeChange">
            <t-radio-button value="customDict">自定义列表</t-radio-button>
            <t-radio-button value="dataTable">数据表</t-radio-button>
          </t-radio-group>
        </t-form-item>

        <!-- 如果选择的是自定义字典 -->
        <!-- 1.选择数据源列
    2.设置数据表匹配规则
      2.1 数据源列
      2.2 匹配字典
        2.2.1 匹配值
        2.2.2 保存值 -->
        <div v-if="selectedSourceType === 'customDict'">
          <!-- 字典清单 -->
          <t-form-item label="自定义列表">
            <t-space direction="vertical">
              <t-space align="center" style="float: right">
                <t-button @click="addDicData">添加项</t-button>
                <!-- <t-button @click="setLowerHeight">lower height</t-button> -->
                <!-- <t-button @click="setHigherHeight">higher height</t-button> -->
              </t-space>
              <t-table ref="tableDict" :columns="columnsDic" :data="dicData" bordered lazy-load row-key="value">
                <template #value="{ row }">
                  <t-input v-model="row.value"></t-input>
                </template>
                <template #label="{ row }">
                  <t-input v-model="row.label"></t-input>
                </template>
                <template #op="row">
                  <t-space :size="8">
                    <t-link theme="primary" @click="onDeleteDicRow(row)">删除</t-link>
                  </t-space>

                  <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
                </template>
              </t-table>
            </t-space>
          </t-form-item>
        </div>
        <!-- 如果选择的是数据表 -->
        <!--         
    1.选择查询表
    2.添加查询条件（多个）
      2.1 查询字段
      2.2 查询条件
        2.2.1 默认等于
      2.3 数据转换字段/固定值
    3.取值字段 -->
        <div v-if="selectedSourceType === 'dataTable'">
          <t-form-item label="业务领域" name="businessDomain">
            <!-- 下拉选择框 -->
            <t-select v-model="mapBusinessDomain" :clearable="true" filterable @change="changeMapDomain">
              <t-option
                v-for="item in businessDomainList"
                :key="item.value"
                :label="item.label + ' (' + item.value + ')'"
                :value="item.value"
                :name="item.label"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="数据表">
            <t-select v-model="mapTable" :clearable="true" filterable @change="changeTableMatch">
              <t-option
                v-for="item in mapTableList"
                :key="item.tableName"
                :label="item.tableDescription + ' (' + item.tableName + ')'"
                :name="item.tableDescription"
                :value="item.tableName"
              />
            </t-select>
          </t-form-item>

          <!-- 查询条件清单 -->
          <t-form-item label="查询条件">
            <t-space direction="vertical" :size="8">
              <t-space align="center" style="float: right">
                <t-button @click="addConditionData">添加查询条件</t-button>
                <!-- <t-button @click="setLowerHeight">lower height</t-button> -->
                <!-- <t-button @click="setHigherHeight">higher height</t-button> -->
              </t-space>
              <t-table
                ref="tableContition"
                :columns="tableDatasourceTableColumns"
                :data="conditionData"
                bordered
                lazy-load
              >
                <template #field="{ row }">
                  <t-select v-model="row.field" :clearable="true" filterable>
                    <t-option
                      v-for="item in selectMapColumns"
                      :key="item.columnName"
                      :name="item.columnDesc"
                      :value="item.columnName"
                      :label="item.columnDesc + ' (' + item.columnName + ')'"
                    />
                  </t-select>
                </template>
                <template #operator="{ row }">
                  <t-select v-model="row.operator" filterable :options="operators"> </t-select>
                </template>

                <template #value="{ row }">
                  <t-input v-model="row.value"></t-input>
                </template>
                <template #op="row">
                  <t-space :size="8">
                    <t-link theme="primary" @click="deleteConditionData(row)">删除</t-link>
                  </t-space>
                </template>
              </t-table>
            </t-space>
          </t-form-item>

          <t-form-item label="value字段">
            <t-select v-model="tableQueryField" :clearable="true" filterable>
              <t-option
                v-for="item in selectMapColumns"
                :key="item.columnName"
                :name="item.columnDesc"
                :value="item.columnName"
                :label="item.columnDesc + ' (' + item.columnName + ')'"
              />
            </t-select>
          </t-form-item>
          <t-form-item label="label字段">
            <t-select v-model="tableShowField" :clearable="true" filterable>
              <t-option
                v-for="item in selectMapColumns"
                :key="item.columnName"
                :name="item.columnDesc"
                :value="item.columnName"
                :label="item.columnDesc + ' (' + item.columnName + ')'"
              />
            </t-select>
          </t-form-item>
        </div>
      </t-form>
    </t-drawer>
    <!-- #endregion 数据转换设置弹窗 -->
  </t-dialog>
</template>

<script setup lang="tsx">
// #region import

// import dayjs from 'dayjs';
import { forEach } from 'lodash';
import { MoveIcon } from 'tdesign-icons-vue-next';
import { Data, FormRules, MessagePlugin, PrimaryTableCol, TableProps, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref, watch } from 'vue';

import { api } from '@/api/main';

import { useLang } from './lang';
// #endregion

// #region 公共配置参数,事件与数据加载
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
const emit = defineEmits(['update:modelValue', 'close', 'success']);
// 领域参数配置表单是否显示
const formParamVisible = ref(props.modelValue);

// 监控 - 域参数配置表单是否显示
watch(formParamVisible, (value: boolean) => {
  emit('update:modelValue', value);
});
watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      emit('close');
    }
    formParamVisible.value = val;
  },
  { deep: true },
);

const isEdit = ref(false);
// 初始渲染
onMounted(async () => {
  await loadBusinessDomainList(); // 业务领域 上 请求
  loadParamGroup(); // 加载系统参数,用于系统参数组下拉框
  loadTypeSetting(); // 加载业务组件列表,用于业务组件选择框
});

// #region 系统参数组数据初始化与加载
const systemParamGroups = ref([]);
const loadParamGroup = async () => {
  api.paramGroup.getTreeList().then((data: any) => {
    systemParamGroups.value = data;
  });
};
// #endregion

// #region 加载业务组件列表,用于业务组件选择框
const businessTypes = ref([]);
const loadTypeSetting = () => {
  // 加载业务类型配置
  const jsonPath = `/business/types/index.json`;
  fetch(jsonPath)
    .then((res) => res.json())
    .then((res) => {
      // 成功数据
      businessTypes.value = res;
    })
    .catch((err) => {
      // 请求失败数据
      console.log(err);
    });
};
// #endregion

// 数据源为数据表时-对应数据表列数据
const columnsData = ref([]);
// #控件列表-查询条件与表单配置会使用到
const systemComponents = ref([
  {
    label: '文本框',
    value: 't-input',
  },
  {
    label: '业务选择器',
    value: 'bcmp-select-business',
  },
  {
    label: '系统字典选择器',
    value: 'bcmp-select-param',
  },
  {
    label: '下拉框',
    value: 't-select',
  },
  {
    label: '日期',
    value: 't-date-picker',
  },
  {
    label: '日期区间-日期',
    value: 't-date-range-picker',
  },
  {
    label: '日期区间-日期时间',
    value: 't-date-range-picker-time',
  },
  {
    label: '复选框',
    value: 't-checkbox-group',
  },
  {
    label: '单选框',
    value: 't-radio-group',
  },
]);

// #关闭窗口钩子
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
// #endregion

// #region 基础信息配置相关逻辑

// #基础信息表单初始值
const formData = reactive({
  id: null,
  domainParamCode: null,
  domainParamGroupId: '',
  domainParamName: null,
  domainParamTemplateId: '',
  domainCategory: null,
  datasourceCategory: 'TABLE',
  datasourceName: null,
  sqlContent: '',
});
// #基础信息表单验证规则
const domainParamRules: FormRules<Data> = {
  domainParamCode: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainParamName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainParamTemplateId: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainParamGroupId: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  domainCategory: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  datasourceCategory: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};

// #region 获取 业务领域 下拉框数据
const businessDomainList = ref([]);
const loadBusinessDomainList = async () => {
  const res = await api.importManage.businessDomain();
  businessDomainList.value = res;
  if (businessDomainList.value.length > 0) {
    formData.domainCategory = businessDomainList.value[0]?.value;
    loadTableList();
  }
};
// #endregion

// #业务领域变化
const changeDomain = async () => {
  formData.datasourceName = '';
  loadTableList();
};

// #数据源类型列表
const dataSourceList = ref([
  { value: 'TABLE', label: '数据表' },
  // { value: 'VIEW', label: '数据视图' },
  // { value: 'SQL', label: 'SQL' },
]);

// #数据源类型变化触发事件
const changeDatasourceCategory = (value, context) => {
  //  todo: 待完善,数据源类型变化后续处理
  // 1.表格,数据源为数据表,加载表格列表
  // 2.视图,数据源为数据视图,加载视图列表
  // 3.sql,数据源为sql,显示sql输入框
  console.log(value, context);
};

// #获取 业务领域下所有表格的 下拉框数据
const tableList = ref([]);
const loadTableList = async () => {
  const params = { businessCode: formData.domainCategory };
  const res = await api.domainParam.sqlTables(params);
  tableList.value = res;
};

// #数据源为数据表-选择数据表变化
const currentSelectTale = ref(null);
const changeTable = (value) => {
  // #region 初始化数据源
  currentSelectTale.value = tableList.value.find((item) => item.tableName === value);
  let seq = 0;
  let tempColumns = currentSelectTale.value?.columns;

  tempColumns = tempColumns.map((item) => ({
    ...item,
    tableName: value,
    isDatabaseField: true,
    isAutoWidth: true,
    columnWidth: 100,
    align: 'center',
    isVisible: true,
    isFixed: false,
    canDelete: false,
    seq: seq++,
  }));
  // 识别字段是否默认字段，是否存在于defaultFields，如果匹配，则设置字段为isDataDefault 为 true

  tempColumns.forEach((item) => {
    if (defaultFields.includes(item.columnName)) {
      item.isDataDefault = true;
      item.isVisible = false;
    } else {
      item.isDataDefault = false;
      item.isVisible = true;
    }
  });

  // 再根据isDataDefault字段排序，isDataDefault为false排前面
  tempColumns.sort((a, b) => {
    if (a.isDataDefault === b.isDataDefault) {
      return a.seq - b.seq;
    }
    return a.isDataDefault ? 1 : -1; // 注意这里调整了比较逻辑，确保非默认字段在前
  });
  // 重新分配 seq 值
  seq = 0;
  tempColumns.forEach((item, index) => {
    item.seq = index; // 或者使用 seq++ 来从1开始计数，根据你的需求选择
  });

  columnsData.value = tempColumns;
  // #endregion 初始化数据源

  // #region 设置默认值
  // 1.如果参数编码与参数名称为空，设置成表名与表描述
  if (!formData.domainParamCode) {
    formData.domainParamCode = currentSelectTale.value.tableName;
  }
  if (!formData.domainParamName) {
    formData.domainParamName = currentSelectTale.value.tableDescription;
  }
  // 2.如果列包含time_create，默认排序字段设置成time_create
  if (currentSelectTale.value.columns.some((item) => item.columnName === 'time_create')) {
    tableFormData.sortField = 'time_create';
  }
  // 3.如果表格标题未设置且表名描述不为空，设置值
  if (!tableFormData.tableTitle) {
    tableFormData.tableTitle = currentSelectTale.value.tableDescription;
  }
  // #endregion
};
// #endregion

// #region tab相关配置
const currSettingTab = ref('TABLE');
// #endregion

// #region 表格配置相关
// #系统默认字段列表
const defaultFields = ['id', 'time_create', 'creator', 'time_modified', 'modifier', 'state', 'eid', 'oid'];

// #表格基础信息配置初始化值
const tableFormData = reactive({
  tableTitle: null,
  usePage: true,
  pageSize: 20,
  sortField: '',
  sortType: 'desc',
});
// #表格基础信息配置-验证规则
// :todo 待补充
const domainParamTableRules: FormRules<Data> = {};

// #表格拖拽排序
const onDragSort: TableProps['onDragSort'] = (params) => {
  console.log('表格列交换行', params);
  let seq = 1;
  forEach(params.newData, (item) => {
    item.seq = seq++;
  });
  columnsData.value = params.newData;
};

// #表格列配置
const columnColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'drag',
    // 列拖拽排序必要参数
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (_h) => (
      <span>
        <MoveIcon />
      </span>
    ),
    width: 46,
  },
  {
    colKey: 'columnName',
    title: '列字段',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'columnDesc',
    title: '列标题',
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
    colKey: 'isVisible',
    title: '是否显示',
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
    width: '110',
  },
  {
    colKey: 'align',
    title: '对齐方式',
    align: 'center',
    width: '100',
  },

  {
    colKey: 'isFixed',
    title: '是否固定列',
    align: 'center',
    width: '100',
  },
  // {
  //   colKey: 'op',
  //   title: '操作',
  //   align: 'center',
  //   fixed: 'right',
  //   width: '130',
  // },
];
// #endregion

// #region 查询条件配置相关

//  #加载当前行的数据源配置
const initSearchComponentSource = () => {
  IsInitComponentResource.value = true;
  console.log(currentSearchSelectRow.value);
  if (currentSearchSelectRow.value.componentSource) {
    // // 如果没设置过数据源的，给设置默认值
    const sourceData = currentSearchSelectRow.value.componentSource;
    // // 如果有设置过关联的，根据JSON读取后设置窗口里对应值

    selectedSourceType.value = sourceData.sourceType;
    // 自定义列表默认空
    dicData.value = [];
    // 表格数据源-领域默认MAIN
    mapBusinessDomain.value = 'MAIN';
    mapTable.value = '';
    conditionData.value = [];
    tableQueryField.value = '';
    tableShowField.value = '';
    switch (selectedSourceType.value) {
      case 'customDict':
        dicData.value = sourceData.customDict.dicData;
        break;
      case 'dataTable':
        mapBusinessDomain.value = sourceData.dataTable.mapBusinessDomain;
        changeMapDomain().then(() => {
          mapTable.value = sourceData.dataTable.mapTable;
          changeTableMatch(mapTable.value);
          IsInitComponentResource.value = false;
        });
        conditionData.value = sourceData.dataTable.conditionData;
        tableQueryField.value = sourceData.dataTable.valueField;
        tableShowField.value = sourceData.dataTable.showField;
        break;
      default:
        break;
    }
  } else {
    selectedSourceType.value = 'customDict';
  }
};

// # 控件数据源配置提交
const onCompontSourceConfirm = () => {
  // 先做校验
  let checkResult = true;
  // 如果选择了自定义字典
  // dicData至少大于一行
  // dicData的每一行行数据字段matchValue与saveValue都不可为空

  if (selectedSourceType.value === 'customDict') {
    if (dicData.value.length < 1) {
      MessagePlugin.warning('自定义字典关联时，字典数据不可为空');
      checkResult = false;
    }
    dicData.value.forEach((item) => {
      if (!item.value) {
        MessagePlugin.warning('自定义字典关联时，字典数据值字段不可为空');
        checkResult = false;
      }
      if (!item.label) {
        MessagePlugin.warning('自定义字典关联时，字典数据显示字段不可为空');
        checkResult = false;
      }
    });
  }

  // 如果选择了数据表匹配
  // mapTable不可为空
  // conditionData至少大于一行
  if (selectedSourceType.value === 'dataTable') {
    if (!mapBusinessDomain.value) {
      MessagePlugin.warning('数据表匹配时，业务领域不可为空');
      checkResult = false;
    }
    if (!mapTable.value) {
      MessagePlugin.warning('数据表匹配时，数据表不可为空');
      checkResult = false;
    }
    if (conditionData.value.length < 1) {
      MessagePlugin.warning('数据表匹配时，条件数据不可为空');
      checkResult = false;
    }
    if (!tableQueryField.value) {
      MessagePlugin.warning('数据表匹配时，value字段不可为空');
      checkResult = false;
    }
    if (!tableShowField.value) {
      MessagePlugin.warning('数据表匹配时，label字段不可为空');
      checkResult = false;
    }
    conditionData.value.forEach((item) => {
      if (!item.operator) {
        MessagePlugin.warning('数据表匹配时，查询条件列【条件】不可为空');
        checkResult = false;
      }
      if (!item.field) {
        MessagePlugin.warning('数据表匹配时，查询条件列【字段】不可为空');
        checkResult = false;
      }
      if (!item.value) {
        MessagePlugin.warning('数据表匹配时，查询条件列【值】不可为空');
        checkResult = false;
      }
    });
  }
  if (!checkResult) return;

  MessagePlugin.info('数据保存中...', 1000);

  const sourceData = {
    sourceType: selectedSourceType.value,
    customDict: {
      dicData: dicData.value,
    },
    dataTable: {
      mapBusinessDomain: mapBusinessDomain.value,
      mapTable: mapTable.value,
      conditionData: conditionData.value,
      valueField: tableQueryField.value,
      showField: tableShowField.value,
    },
  };
  // 根据currentSearchSelectRow的index 查询columnsDataWithoutDefault中匹配的行，使用find或者filter方法，将sourceData赋值到对应行的componentSource字段
  // searchData.value[
  //   searchData.value.findIndex((item) => item.seq === currentSearchSelectRow.value.seq)
  // ].componentSourceJson = JSON.stringify(sourceData);
  searchData.value[
    searchData.value.findIndex((item) => item.seq === currentSearchSelectRow.value.seq)
  ].componentSource = sourceData;

  componentResourceVisible.value = false;
  MessagePlugin.info('数据保存成功!');
};

// #查询条件-条件列表
const operators = [
  { value: 'EQ', label: '等于' },
  { value: 'LIKE', label: '包含' },
];

// #查询条件表格-列配置数据
const searchColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'drag',
    // 列拖拽排序必要参数
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (_h) => (
      <span>
        <MoveIcon />
      </span>
    ),
    width: 46,
  },
  {
    colKey: 'field',
    title: '字段',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'label',
    title: '标题',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'component',
    title: '控件',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'componentParam',
    title: '控件关键参数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'componentSource',
    title: '控件数据源',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isMultiple',
    title: '是否多选（下拉相关控件）',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'defaultValue',
    title: '默认值',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isVisible',
    title: '是否显示(隐藏用于设置固定查询条件)',
    align: 'center',
    width: '100',
  },
  // {
  //   colKey: 'op',
  //   title: '操作',
  //   align: 'center',
  //   fixed: 'right',
  //   width: '130',
  // },
];
// #查询条件表格-数据
const searchData = ref([]);

// #查询条件表格-排序控制
const onSearchDragSort: TableProps['onDragSort'] = (params) => {
  // console.log('交换行', params);
  let seq = 1;
  forEach(params.newData, (item) => {
    item.seq = seq++;
  });
  searchData.value = params.newData;
};

// #查询条件表格-添加行
const addSearchData = () => {
  // 添加时，seq设置为已存在数据中最大seq再加1
  // 如果没有数据，则设置为1
  let seq = 1;
  if (searchData.value.length > 0) {
    seq = searchData.value[searchData.value.length - 1].seq + 1;
  }
  searchData.value.push({
    seq,
    field: '',
    label: '',
    component: 't-input',
    componentParam: '',
    defaultValue: '',
    isVisible: true,
  });
};

// #查询条件表格-列-列选择事件-根据选择字段执行一些自动操作
const onSearchFieldChange = (row: any) => {
  const selectItem = columnsData.value.find((item: any) => {
    return item.columnName === row.field;
  });
  // 如果当前行标题还没有设置，则把表描述赋值
  if (!row.label) {
    row.label = selectItem.columnDesc;
  }
  // 如果选择的是日期类型，则默认选择日期控件
  if (selectItem.columnType.indexOf('date') > -1) {
    row.fieldType = 'datetime';
    row.component = 't-date-picker';
  }
};

// 点击数据源按钮事件
const onClickRelate = (row) => {
  // console.log(row);
  currentSearchSelectRow.value = row;
  initSearchComponentSource();
  componentResourceVisible.value = true;
};
// #endregion

// #region 部分选择控件数据源配置
// #当前选中行-用于配置下拉数据源
const currentSearchSelectRow: any = ref({});
// 控件数据源弹窗显示
const componentResourceVisible = ref(false);
// 数据源类型-默认自定义列表
const selectedSourceType = ref('customDict');

// 控件数据源-切换类型时动作
const selectedSourceTypeChange = (value) => {
  // 如果切换成数据表格时，默认设置领域为MAIN，且触发变化事件，重新加载数据表
  if (value === 'dataTable') {
    mapBusinessDomain.value = 'MAIN';
    changeMapDomain();
  }
};

// 是否初始化控件数据源
const IsInitComponentResource = ref(false);

// #region 数据源为自定义列表相关设置
const columnsDic: any = computed(() => [
  {
    title: '值',
    colKey: 'value',
  },
  {
    title: '显示',
    colKey: 'label',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
]);
const dicData = ref([]);
// #添加字典项
const addDicData = () => {
  dicData.value.push({
    value: '',
    label: '',
  });
};
// #删除字典项
const onDeleteDicRow = ({ rowIndex }) => {
  dicData.value.splice(rowIndex, 1);
};
// #endregion

// #region 数据源为表格相关设置

// 选中领域值
const mapBusinessDomain = ref('');
// 选中表格值
const mapTable = ref('');
// 选中表格对象
const selectMapTable: any = ref({});
// 选中列对象
const selectMapColumns: any = ref({});
// 映射表格列表
const mapTableList = ref([]);
// 查询条件列表-数据源为表格时的多个查询条件
const conditionData = ref([]);
// 获取表格的哪个字段作为前端控件的value值
const tableQueryField = ref('');
// 获取表格的哪个字段作为前端控件的label值
const tableShowField = ref('');
// 数据源为表格-查询条件列表表格对应列设置
const tableDatasourceTableColumns: any = computed(() => [
  {
    title: '字段',
    colKey: 'field',
  },
  {
    title: '条件',
    colKey: 'operator',
  },
  {
    title: '值',
    colKey: 'value',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
  },
]);

// #业务领域变化
const changeMapDomain = async () => {
  mapTable.value = '';
  selectMapTable.value = null;
  return loadMapTableList();
};
// #加载对应领域的表格列表
const loadMapTableList = async () => {
  const params = { businessCode: mapBusinessDomain.value };
  const res = await api.importManage.tables(params);
  mapTableList.value = res;
};
// #选中表格变化
const changeTableMatch = (value) => {
  selectMapTable.value = mapTableList.value.find((item) => item.tableName === value);
  console.log(selectMapTable.value);
  selectMapColumns.value = selectMapTable.value?.columns.map((item) => ({
    ...item,
    value: item.columnName,
    label: item.columnDesc,
  }));
  // if (!IsinitRelate.value) {
  //   conditionData.value = [];
  // }
};

// #添加查询条件
const addConditionData = () => {
  conditionData.value.push({
    field: '',
    operator: 'EQ',
    value: '',
  });
};

// #删除查询条件
const deleteConditionData = ({ rowIndex }) => {
  conditionData.value.splice(rowIndex, 1);
};

// #endregion

// #endregion

// #region 按钮按钮配置
// :todo 后续补充按钮配置
// const columnTotal = ref(0);
// const currButtonTab = ref('button');
// const enableButton = ref(false);
// const buttonList = ref([]);
// const currButtonName = ref('button');
// const onClickBotton = (value: any) => {
//   console.log(value);
// };
// #endregion

// #region 按钮按钮配置
const loading = ref(false);
const domainParamFromRef = ref();
const save = () => {
  loading.value = true;
  // 先校验再提交
  return new Promise((resolve, reject) => {
    domainParamFromRef.value.validate().then(async (result) => {
      if (result !== true) {
        reject();
        loading.value = false;
        return;
      }
      // 第二轮校验
      // :todo 需要添加一系列校验逻辑

      // 表格列校验，表格数据必须大于1行
      if (columnsData.value.length < 1) {
        MessagePlugin.error('表格列配置必须大于1行');
        reject();
        loading.value = false;
        return;
      }

      // todo:保存事件
      MessagePlugin.info('数据保存中...', 1000);

      const insetModel = getInsetModel();
      console.log(insetModel);
      if (!isEdit.value) {
        // 提交保存数据到接口
        api.domainParam.add(insetModel).then((data) => {
          console.log(data);
          MessagePlugin.success('保存成功');
          formParamVisible.value = false;
          loading.value = false;
          emit('success');
        });
      } else {
        insetModel.id = formData.id;
        // 提交保存数据到接口
        api.domainParam.edit(insetModel).then((data) => {
          console.log(data);
          MessagePlugin.success('保存成功');
          formParamVisible.value = false;
          loading.value = false;
          emit('success');
        });
      }
    });
  });
};

const getInsetModel = () => {
  const insetModel = {
    id: formData.id,
    domainParamCode: formData.domainParamCode,
    domainParamName: formData.domainParamName,
    domainParamTemplateId: formData.domainParamTemplateId,
    domainParamGroupId: formData.domainParamGroupId,
    domainCategory: formData.domainCategory,
    datasourceCategory: formData.datasourceCategory,
    datasourceName: formData.datasourceName,
    sqlContent: formData.sqlContent,
    domainParmSetting: {
      tableSetting: {
        tableTitle: tableFormData.tableTitle,
        usePage: tableFormData.usePage,
        sortField: tableFormData.sortField,
        sortType: tableFormData.sortType,
        columnSetting: columnsData.value,
      },
      searchSetting: searchData.value,
    },
  };
  console.log(JSON.stringify(insetModel));
  console.log(insetModel);
  return insetModel;
};
// const save = () => {
//   console.log('save');
//   let checkResult = true;

//   // :todo 需要添加一系列校验逻辑
//   if (checkResult) {
//     // todo:保存事件
//     MessagePlugin.info('数据保存中...', 1000);

//     const insetModel: ImportSettingDTO = getInsetModel();

//     if (!isEdit.value) {
//       // 提交保存数据到接口
//       api.importManage.add(insetModel).then((data) => {
//         console.log(data);
//         MessagePlugin.success('保存成功');
//         formParamVisible.value = false;
//         emit('success');
//       });
//     } else {
//       insetModel.settingModel.id = formData.id;
//       // 提交保存数据到接口
//       api.importManage.edit(insetModel).then((data) => {
//         console.log(data);
//         MessagePlugin.success('保存成功');
//         formParamVisible.value = false;
//         emit('success');
//       });
//     }
//   }
// };
// // #endregion

// 编辑-加载编辑的数据
const initEditData = (insetModel) => {
  isEdit.value = true;
  // 更新formData的属性
  formData.id = insetModel.id;
  formData.domainParamCode = insetModel.domainParamCode;
  formData.domainParamName = insetModel.domainParamName;
  formData.domainParamTemplateId = insetModel.domainParamTemplateId;
  formData.domainParamGroupId = insetModel.domainParamGroupId;
  formData.domainCategory = insetModel.domainCategory;
  formData.datasourceCategory = insetModel.datasourceCategory;
  formData.datasourceName = insetModel.datasourceName;
  formData.sqlContent = insetModel.sqlContent;

  // 更新tableFormData的属性
  tableFormData.tableTitle = insetModel.domainParmSetting.tableSetting.tableTitle;
  tableFormData.usePage = insetModel.domainParmSetting.tableSetting.usePage;
  tableFormData.pageSize = insetModel.domainParmSetting.tableSetting.pageSize;
  tableFormData.sortField = insetModel.domainParmSetting.tableSetting.sortField;
  tableFormData.sortType = insetModel.domainParmSetting.tableSetting.sortType;

  // 假设columnsData.value是一个可直接赋值的引用或可修改的数组
  columnsData.value = insetModel.domainParmSetting.tableSetting.columnSetting;

  // 更新searchData
  searchData.value = insetModel.domainParmSetting.searchSetting;

  domainParamFromRef.value.clearValidate();
  // 根据需要，可以添加对columnsData和searchData更细致的处理，
  // 特别是如果它们包含复杂结构或者需要深拷贝的情况。
};

// 新增-初始化新增的数据
const initAddData = (paramGroupId: string) => {
  isEdit.value = false;
  // 更新formData的属性
  formData.id = '';
  formData.domainParamCode = '';
  formData.domainParamName = '';
  formData.domainParamTemplateId = '';
  formData.domainParamGroupId = paramGroupId;
  formData.domainCategory = 'MAIN';
  formData.datasourceCategory = 'TABLE';
  formData.datasourceName = '';
  formData.sqlContent = '';

  // 更新tableFormData的属性
  tableFormData.tableTitle = null;
  tableFormData.usePage = true;
  tableFormData.pageSize = 20;
  tableFormData.sortField = '';
  tableFormData.sortType = 'desc';

  // 假设columnsData.value是一个可直接赋值的引用或可修改的数组
  columnsData.value = [];

  // 更新searchData
  searchData.value = [];
  domainParamFromRef.value.clearValidate();
};

defineExpose({ initEditData, initAddData });
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

.table-box_header {
  width: 100%;
  height: 32px;
  padding: 0;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.padding-tab :deep(.t-tabs__content) {
  padding: 12px;
}
</style>
