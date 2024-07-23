<template>
  <t-dialog
    v-model:visible="formImportVisible"
    :close-on-overlay-click="false"
    top="56px"
    width="950px"
    :cancel-btn="null"
    :confirm-btn="null"
    header="导入配置"
  >
    <!-- 导入过程界面 -->
    <cmp-container>
      <!-- 导入过程步骤 -->
      <t-steps :current="current" readonly>
        <t-step-item title="导入基础信息" content="" />
        <t-step-item title="导入字段" content="" />
        <t-step-item title="导入校验" content="" />
        <t-step-item title="导入模板" content="" />
      </t-steps>
      <!-- #region 第一步：设置导入配置基础信息 -->
      <div v-if="current == 0" class="center-div">
        <t-form
          ref="formRef"
          :rules="FORM_RULES"
          :data="formData"
          :show-cancel="true"
          :show-error-message="true"
          :label-width="115"
        >
          <t-form-item :label="t('import.businessDomain')" name="businessDomain">
            <!-- 下拉选择框 -->
            <t-select
              v-model="formData.businessDomain"
              :clearable="true"
              filterable
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
          </t-form-item>
          <t-form-item :label="t('import.tableName')" name="tableName">
            <!-- 下拉选择框-根据业务领域选择变化 -->
            <t-select
              v-model="formData.tableName"
              :clearable="true"
              filterable
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
          </t-form-item>
          <t-form-item :label="t('import.importKeyCode')" name="importKeyCode">
            <t-input v-model="formData.importKeyCode" clearable :disabled="isEdit" />
          </t-form-item>
          <t-form-item :label="t('import.importDesc')" name="importDesc">
            <t-input v-model="formData.importDesc" clearable />
          </t-form-item>
          <t-form-item :label="t('import.batchCount')" name="importDesc">
            <t-input-number v-model="formData.batchCount" theme="column" clearable style="width: 100%" />
          </t-form-item>
        </t-form>
      </div>
      <!-- #endregion -->
      <!-- #region 第二步：根据选择表格加载列数据 -->
      <div v-if="current == 1" class="center-div">
        <cmp-card :ghost="true">
          <t-space direction="vertical" size="8px">
            <t-space align="end" style="float: right">
              <t-button @click="refreshImportColumn">刷新表字段</t-button>
              <t-button @click="addImportColumn">添加字段</t-button>
              <!-- <t-button @click="setLowerHeight">lower height</t-button> -->
              <!-- <t-button @click="setHigherHeight">higher height</t-button> -->
            </t-space>
            <t-table
              ref="tableColumnsRef"
              :columns="columns"
              :data="columnsDataWithoutDefault"
              :max-height="300"
              :editable-cell-state="editableCellState"
              bordered
              lazy-load
              row-key="seq"
              drag-sort="row-handler"
              @drag-sort="onDragSort"
            >
              <!-- <template #columnName="{ row }">
                <t-input v-if="row.tableName == 'excel模板读取'" v-model="row.columnName"></t-input>
                <span v-else>{{ row.columnName }}</span>
              </template> -->
              <!-- <template #columnDesc="{ row }">
                <t-input v-model="row.columnDesc"></t-input>
              </template> -->
              <template #columnType="{ row }">
                <t-select
                  v-if="row.tableName == 'excel模板读取'"
                  v-model="row.columnType"
                  filterable
                  :options="dataTypes"
                >
                </t-select>
                <span v-else>{{ row.columnType }}</span>
              </template>
              <template #isImport="{ row }">
                <t-checkbox v-model="row.isImport" :disabled="row.isByHand"></t-checkbox>
              </template>
              <template #isExcel="{ row }">
                <t-checkbox v-model="row.isExcel" :disabled="row.default"></t-checkbox>
              </template>
              <template #isRequire="{ row }">
                <t-checkbox v-model="row.isRequire" :disabled="row.default"></t-checkbox>
              </template>
              <template #defaultValue="{ row }">
                <t-input v-model="row.defaultValue" :disabled="row.default"></t-input>
              </template>
              <template #op="row">
                <t-space :size="8">
                  <t-link v-if="!row.row.isByHand" theme="primary" @click="onClickRelate(row)"
                    >数据转换
                    {{ row.row.datatransferJson && row.row.datatransfer.relateType !== 'none' ? '(1)' : '' }}</t-link
                  >
                  <t-link v-if="row.row.isByHand" theme="primary" @click="onClickDeleteColumn(row)">删除</t-link>
                </t-space>

                <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
              </template>
            </t-table>
          </t-space>
        </cmp-card>
      </div>
      <!-- #endregion -->
      <!-- #region 第三步：添加校验信息 -->
      <div v-if="current == 2" class="center-div">
        <cmp-card :ghost="true">
          <t-tabs v-model="activeValidateTab">
            <!-- 页签栏1 唯一校验 -->
            <t-tab-panel value="tab1" label="唯一校验" :destroy-on-hide="true">
              <t-space direction="vertical" size="8px" style="padding-top: 8px; width: 100%">
                <div class="table-box_header">
                  <div class="table-title"></div>
                  <t-space size="small" :align="'center'">
                    <t-space size="small" :align="'center'">
                      <t-button @click="addValidationData">添加唯一校验</t-button>
                    </t-space>
                  </t-space>
                </div>
                <t-table
                  ref="validateRef"
                  :columns="validationColumns"
                  :data="validationDatas"
                  :max-height="300"
                  bordered
                  lazy-load
                  row-key="index"
                >
                  <!-- <template #validateName="{ row }">
                <t-input v-model="row.validateName"></t-input>
              </template> -->
                  <template #uniqueType="{ row }">
                    <t-select
                      v-model="row.uniqueType"
                      :options="uniqueTypes"
                      filterable
                      @change="handleUniqueTypesChange(row)"
                    >
                    </t-select>
                  </template>
                  <template #uniqueColumns="{ row }">
                    <t-select
                      v-if="row.uniqueType == 'TEMPLATE'"
                      v-model="row.uniqueColumns"
                      multiple
                      :min-collapsed-num="1"
                      filterable
                      @change="handleUniqueTemplateChange(row)"
                    >
                      <t-option
                        v-for="column in columnsDataWithoutDefault.filter(
                          (item) => item.columnName && item.columnDesc && item.isExcel,
                        )"
                        :key="column.columnName"
                        :value="column.columnName"
                        :name="column.columnDesc"
                        :label="column.columnDesc + ' (' + column.columnName + ')'"
                      ></t-option>
                    </t-select>

                    <t-select
                      v-if="row.uniqueType == 'DB'"
                      v-model="row.uniqueColumns"
                      multiple
                      :min-collapsed-num="1"
                      filterable
                      @change="handleUniqueDbChange(row)"
                    >
                      <t-option
                        v-for="column in columnsData"
                        :key="column.columnName"
                        :value="column.columnName"
                        :name="column.columnDesc"
                        :label="column.columnDesc + ' (' + column.columnName + ')'"
                      ></t-option>
                    </t-select>
                  </template>
                  <template #showMsg="{ row }">
                    <t-input v-model="row.showMsg"></t-input>
                  </template>
                  <template #op="row">
                    <t-space :size="8">
                      <t-link theme="primary" @click="onClickDeleteValidation(row)">删除</t-link>
                    </t-space>

                    <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
                  </template>
                </t-table>
              </t-space>
            </t-tab-panel>
            <!-- 页签栏2 列校验 -->
            <t-tab-panel value="tab2" label="列校验" :destroy-on-hide="false">
              <t-space direction="vertical" size="8px" style="padding-top: 8px; width: 100%">
                <div class="table-box_header">
                  <div class="table-title"></div>
                  <t-space size="small" :align="'center'">
                    <t-space size="small" :align="'center'">
                      <t-button @click="addValidationData2">添加列校验</t-button>
                    </t-space>
                  </t-space>
                </div>
                <t-table
                  ref="validateColumnRef"
                  :columns="validationColumns2"
                  :data="validationDatas2"
                  :max-height="300"
                  bordered
                  lazy-load
                  row-key="index"
                >
                  <!-- <template #columnName="{ row }">
                <t-input v-if="row.tableName == 'excel模板读取'" v-model="row.columnName"></t-input>
                <span v-else>{{ row.columnName }}</span>
              </template> -->
                  <!-- <template #columnDesc="{ row }">
                <t-input v-model="row.columnDesc"></t-input>
              </template> -->
                  <template #uniqueColumns="{ row }">
                    <t-select v-model="row.uniqueColumns" filterable @change="handleUniqueColumnsChange(row)">
                      <t-option
                        v-for="column in columnsDataWithoutDefault.filter(
                          (item) => item.columnName && item.columnDesc && item.isExcel && item.columnType !== 'Boolean',
                        )"
                        :key="column.columnName"
                        :value="column.columnName"
                        :name="column.columnDesc"
                        :label="column.columnDesc + ' (' + column.columnName + ')'"
                      ></t-option>
                    </t-select>
                  </template>
                  <!-- <template #validateName="{ row }">
                    <t-input v-model="row.validateName"></t-input>
                  </template> -->
                  <template #validateType="{ row }">
                    <t-select
                      v-if="row.columnType === 'String'"
                      v-model="row.validateType"
                      filterable
                      @change="handleValidateTypeChange(row)"
                    >
                      <t-option value="LENGTH" label="字符长度限制"></t-option>
                      <t-option value="REGEX" label="正则表达式"></t-option>
                    </t-select>
                    <t-select v-else v-model="row.validateType" filterable disabled>
                      <t-option value="RANGE" label="范围限制"></t-option>
                    </t-select>
                  </template>
                  <template #validateSetting="{ row }">
                    <t-input
                      v-if="row.validateType === 'REGEX'"
                      v-model="row.regularExpression"
                      @change="setColumnValidateMsg(row)"
                    ></t-input>
                    <t-input-number
                      v-if="row.validateType === 'LENGTH'"
                      v-model="row.lengthLimit"
                      theme="column"
                      @change="setColumnValidateMsg(row)"
                    ></t-input-number>
                    <div
                      v-if="
                        row.validateType === 'RANGE' && (row.columnType === 'Date' || row.columnType === 'Datetime')
                      "
                    >
                      <t-date-range-picker
                        v-model="row.rangeDate"
                        allow-input
                        clearable
                        @change="setColumnValidateMsg(row)"
                      />
                    </div>
                    <div
                      v-if="
                        row.validateType === 'RANGE' &&
                        (row.columnType === 'Integer' || row.columnType === 'Long' || row.columnType === 'BigDecimal')
                      "
                    >
                      <t-input-number
                        v-model="row.minNumber"
                        theme="column"
                        @change="setColumnValidateMsg(row)"
                      ></t-input-number>
                      -
                      <t-input-number
                        v-model="row.maxNumber"
                        theme="column"
                        @change="setColumnValidateMsg(row)"
                      ></t-input-number>
                    </div>
                  </template>

                  <template #showMsg="{ row }">
                    <t-input v-model="row.showMsg"></t-input>
                  </template>
                  <template #op="row">
                    <t-space :size="8">
                      <t-link theme="primary" @click="onClickDeleteValidation2(row)">删除</t-link>
                    </t-space>

                    <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
                  </template>
                </t-table>
              </t-space>
            </t-tab-panel>
          </t-tabs>
        </cmp-card>
      </div>
      <!-- #endregion -->
      <!-- #region 第四步：上传导入模板 | 根据配置生成或上传模板文件 -->
      <div v-show="current == 3" class="center-div">
        <bcmp-upload-content
          upload-path="importTemplate"
          ghost
          upload-type-limit="xlsx"
          :upload-count-limit="1"
          :file-list="uploadFiles"
          @upload-success="uploadSuccess"
          @delete-success="deleteSuccess"
          @batch-delete-success="deleteSuccess"
        >
          <template #buttons>
            <t-button theme="default" @click="generateTemplate">生成导入模板</t-button>
          </template>
        </bcmp-upload-content>
      </div>
      <!-- #endregion -->
    </cmp-container>

    <template #footer>
      <div v-if="current == 0">
        <t-button theme="default" @click="formImportVisible = false">取消</t-button>
        <t-button theme="primary" @click="previewNext">下一步</t-button>
      </div>
      <div v-if="current == 1">
        <t-button theme="default" @click="current = 0">上一步</t-button>
        <t-button theme="primary" @click="previewNextTemplate">下一步</t-button>
      </div>
      <div v-if="current == 2">
        <t-button theme="default" @click="current = 1">上一步</t-button>
        <t-button theme="primary" @click="saveValidateSetting">下一步</t-button>
      </div>
      <div v-if="current == 3">
        <t-button theme="default" @click="current = 2">上一步</t-button>
        <t-button theme="primary" @click="saveImportSetting">保存导入配置</t-button>
      </div>
    </template>
  </t-dialog>

  <!-- 删除弹窗 -->
  <t-dialog
    v-model:visible="isConfirmDialogVisible"
    header="确认生成导入模板"
    title="确认生成导入模板"
    @confirm="confirmGenTemplate"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-alert v-if="uploadFiles.length > 0" theme="warning">
        <template #message>确认生成模板会替换掉原有的导入模板！</template>
      </t-alert>
      <t-form ref="templateForm" :data="templateFormData" :rules="templateFormRules" scroll-to-first-error="smooth">
        <t-form-item label="导入模板名" name="templateName">
          <t-input v-model="templateFormData.templateName"></t-input>
        </t-form-item> </t-form
    ></t-space>
  </t-dialog>
  <!-- 数据转换设置弹窗 -->
  <t-drawer
    v-model:visible="relateVisible"
    :z-index="3000"
    size="700px"
    placement="right"
    header="设置数据数据转换"
    :on-confirm="onClickConfirm"
    :close-btn="true"
  >
    <!-- 1.选择转换类型
    1.1 系统参数
    1.2 数据表
    1.3 自定义字典 -->
    <t-form>
      <t-form-item label="转换类型">
        <t-radio-group v-model="selectedType" variant="primary-filled" @change="selectedTypeChange">
          <t-radio-button v-if="currentRelateRow.columnName === 'eid'" value="currentEid"
            >导入用户的企业</t-radio-button
          >
          <t-radio-button v-if="currentRelateRow.columnName === 'oid'" value="currentOid"
            >导入用户的组织</t-radio-button
          >
          <t-radio-button value="none">无数据转换</t-radio-button>
          <t-radio-button value="systemParams">系统参数</t-radio-button>
          <t-radio-button value="customDict">自定义字典</t-radio-button>
          <t-radio-button value="dataTable">数据表</t-radio-button>
        </t-radio-group>
      </t-form-item>

      <!-- 如果选择的是系统参数 -->
      <!-- 1.选择系统参数组
        2.设置系统参数组匹配规则
          2.1 数据源列
          2.2 匹配字段
            2.2.1 PARAM_VALUE
            2.2.2 PARAM_CODE
            2.2.3 PARAM_DESC
          2.3 取值字段 -->
      <div v-if="selectedType === 'systemParams'">
        <!-- 匹配规则设置 -->

        <!-- 系统参数组的选择 -->
        <t-form-item label="系统参数组">
          <t-cascader
            v-model="selectedParamGroup"
            :options="systemParamGroups"
            placeholder="选择系统参数组"
            :show-all-levels="false"
            filterable
          />
        </t-form-item>

        <t-form-item label="数据源列">
          <t-select v-model="sourceColumn" placeholder="选择数据源列" filterable>
            <t-option
              v-for="column in columnsDataWithoutDefault.filter(
                (item) => item.columnName && item.columnDesc && item.isExcel,
              )"
              :key="column.columnName"
              :value="column.columnName"
              :name="column.columnDesc"
              :label="column.columnDesc + ' (' + column.columnName + ')'"
            ></t-option>
          </t-select>
        </t-form-item>

        <!-- 匹配字段选择 -->
        <t-form-item label="匹配字段">
          <t-select v-model="matchField" placeholder="选择匹配字段" :options="paramGroupFields" filterable> </t-select>
        </t-form-item>

        <!-- 取值字段选择 -->
        <t-form-item label="取值字段">
          <!-- 根据所选系统参数组动态获取可选取值字段 -->
          <t-select v-model="getValueField" placeholder="选择取值字段" :options="paramGroupFields" filterable>
          </t-select>
        </t-form-item>
      </div>

      <!-- 如果选择的是自定义字典 -->
      <!-- 1.选择数据源列
    2.设置数据表匹配规则
      2.1 数据源列
      2.2 匹配字典
        2.2.1 匹配值
        2.2.2 保存值 -->
      <div v-if="selectedType === 'customDict'">
        <t-form-item label="数据源列">
          <t-select v-model="sourceColumn" placeholder="选择数据源列" filterable>
            <t-option
              v-for="column in columnsDataWithoutDefault"
              :key="column.columnName"
              :value="column.columnName"
              :name="column.columnDesc"
              :label="column.columnDesc + ' (' + column.columnName + ')'"
            ></t-option>
          </t-select>
        </t-form-item>

        <!-- 字典清单 -->
        <t-form-item label="匹配字典">
          <t-space direction="vertical">
            <t-space align="center" style="float: right">
              <t-button @click="addDicData">添加项</t-button>
              <!-- <t-button @click="setLowerHeight">lower height</t-button> -->
              <!-- <t-button @click="setHigherHeight">higher height</t-button> -->
            </t-space>
            <t-table ref="tableDict" :columns="columnsDic" :data="dicData" bordered lazy-load>
              <template #matchValue="{ row }">
                <t-input v-model="row.matchValue"></t-input>
              </template>
              <template #saveValue="{ row }">
                <t-input v-model="row.saveValue"></t-input>
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
      <div v-if="selectedType === 'dataTable'">
        <t-form-item :label="t('import.businessDomain')" name="businessDomain">
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
            <t-table ref="tableContition" :columns="columnsMapTable" :data="conditionData" bordered lazy-load>
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
              <template #valueType="{ row }">
                <t-select v-model="row.valueType" filterable :options="valueTypes"> </t-select>
              </template>

              <template #value="{ row }">
                <t-input v-if="row.valueType === 'VALUE'" v-model="row.value"></t-input>
                <t-select v-if="row.valueType === 'COLUMN'" v-model="row.value" filterable>
                  <t-option
                    v-for="item in columnsDataWithoutDefault.filter(
                      (item) => item.columnName && item.columnDesc && item.isExcel,
                    )"
                    :key="item.columnName"
                    :name="item.columnDesc"
                    :value="item.columnName"
                    :label="item.columnDesc + ' (' + item.columnName + ')'"
                  ></t-option>
                </t-select>
              </template>
              <template #op="row">
                <t-space :size="8">
                  <t-link theme="primary" @click="onDeleteTableRow(row)">删除</t-link>
                </t-space>

                <!-- <t-button size="small" variant="text" @click="onEditRowClick(slotProps)">
                  <icon name="edit-1" class="black-icon" />
                </t-button> -->
              </template>
            </t-table>
          </t-space>
        </t-form-item>

        <t-form-item label="取值字段">
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
      </div>
    </t-form>
  </t-drawer>
</template>
<script setup lang="tsx">
import { forEach } from 'lodash';
import { MoveIcon } from 'tdesign-icons-vue-next';
import {
  Data,
  FormInstanceFunctions,
  FormRules,
  Input,
  MessagePlugin,
  TableProps,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, PropType, reactive, Ref, ref, watch } from 'vue';

import { api, ImportSetting, ImportSettingDTO } from '@/api/main';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import BcmpUploadContent from '@/components/bcmp-upload-content/index.vue';

import { useLang } from './lang';

const { t } = useLang();
// / 00-组件属性定义
const props = defineProps({
  visible: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
});
const emit = defineEmits(['update:visible', 'close', 'success']);

// 是否编辑
const isEdit = ref(false);

// 导入步骤
const current = ref(0);
// 导入表单是否显示
const formImportVisible = ref(props.visible);

// 监控 - 导入表单是否显示
watch(formImportVisible, (value: boolean) => {
  // if (value) {
  //   current.value = 0;
  // } else if (current.value === 3 && !processing.value) {
  //   emit('close');
  // }
  emit('update:visible', value);
});
watch(
  () => props.visible,
  (val) => {
    if (!val) {
      emit('close');
    }
    formImportVisible.value = val;
  },
  { deep: true },
);

// 初始渲染
onMounted(async () => {
  await loadBusinessDomainList(); // 业务领域 上 请求
});
// #region 第一步：设置导入配置基础信息
const dataTypes = [
  { value: 'String', label: 'String' },
  { value: 'Long', label: 'Long' },
  { value: 'Integer', label: 'Integer' },
  { value: 'Datetime', label: 'Datetime' },
  { value: 'Boolean', label: 'Boolean' },
];
const formRef: Ref<FormInstanceFunctions> = ref(null);
// #获取 业务领域 下拉框数据
const businessDomainList = ref([]);
const selectedTable: any = ref({});
const loadBusinessDomainList = async () => {
  const res = await api.importManage.businessDomain();
  businessDomainList.value = res;
  if (businessDomainList.value.length > 0) {
    formData.businessDomain = businessDomainList.value[0]?.value;
    loadTableList();
  }
};
// #业务领域变化
const changeDomain = async () => {
  formData.tableName = '';
  loadTableList();
};

// #获取 业务领域下所有表格的 下拉框数据
const tableList = ref([]);
const loadTableList = async () => {
  const params = { businessCode: formData.businessDomain };
  const res = await api.importManage.tables(params);
  tableList.value = res;
};
// #表格变化
const tableDesc = ref('');
const changeTable = (value: string, context: { option: { name: string } }) => {
  formData.importKeyCode = value;
  tableDesc.value = context.option.name;
  formData.importDesc = `导入${context.option.name}`;
  selectedTable.value = tableList.value.find((item) => item.tableName === value);
  console.log(selectedTable.value);
  let seq = 0;
  columnsData.value = selectedTable.value?.columns.map(
    (item: { default: any; columnName: string; columnDesc: any }) => ({
      ...item,
      tableName: value,
      isImport: !item.default,
      isRequire: !item.default,
      // 如果item.columnName的结尾不为id,isExcel设置成true
      isExcel: !item.default && item.columnName.slice(-2) !== 'id',
      value: item.columnName,
      label: item.columnDesc,
      canDelete: false,
      seq: seq++,
    }),
  );

  columnsDataWithoutDefault.value = columnsData.value.filter((item) => item.isImport && item.value !== 'eid');
  columnsDataWithoutDefault.value.forEach((item) => {
    const relateData = {
      relateType: 'none',
      systemParams: {
        selectedParamGroup: '',
        sourceColumn: '',
        getValueField: '',
      },
      customDict: {
        sourceColumn: '',
        dicData: [],
      },
      dataTable: {
        mapBusinessDomain: 'MAIN',
        mapTable: '',
        conditionData: [],
        tableQueryField: '',
      },
    };
    if (item.columnName === 'eid') {
      relateData.relateType = 'currentEid';
    }
    if (item.columnName === 'oid') {
      relateData.relateType = 'currentOid';
    }
    item.datatransfer = relateData;
    item.datatransferJson = JSON.stringify(relateData);
  });
  console.log(columnsData.value);
};
// 重新加载字段,少的添加到列表,多的从列表删除
const refreshImportColumn = () => {
  // columnsDataWithoutDefault 是表格使用到的数据
  // columnsData 是原表格数据
  // 需要比对columnsDataWithoutDefault列表中canDelete为false的数据与columnsData列表的是否一致
  // 如果缺少,就加入到columnsDataWithoutDefault列表,如果columnsDataWithoutDefault列表有,但是columnsData列表没有,需要删除columnsDataWithoutDefault列表中对应项
  // 创建映射对象，用于快速查找
  const withoutDefaultMap = columnsDataWithoutDefault.value
    .filter((item) => !item.canDelete)
    .reduce((acc, item) => ({ ...acc, [item.columnName]: item }), {});
  let tableName = '';
  if (columnsDataWithoutDefault.value && columnsDataWithoutDefault.value.length > 0) {
    tableName = columnsDataWithoutDefault.value[0].tableName;
  }

  const defaultMap = columnsData.value
    .filter((item) => !item.default)
    .reduce((acc, item) => ({ ...acc, [item.columnName]: item }), {});

  // 找出需要添加的项
  const itemsToAdd = Object.values(defaultMap).filter((item) => !withoutDefaultMap[item.columnName]);

  // 找出需要删除的项（这里假设不能直接修改原数组，所以创建新的数组）
  const itemsToRemove = columnsDataWithoutDefault.value.filter((item) => item.canDelete && defaultMap[item.columnName]);

  // 添加缺失的项
  itemsToAdd.forEach((item) => {
    // 确保新添加的项也有canDelete属性，这里假设默认为true
    columnsDataWithoutDefault.value.push({
      ...item,
      canDelete: false,
      tableName,
      isImport: !item.default,
      isRequire: !item.default,
      // 如果item.columnName的结尾不为id,isExcel设置成true
      isExcel: !item.default && item.columnName.slice(-2) !== 'id',
      value: item.columnName,
      label: item.columnDesc,
      seq: columnsDataWithoutDefault.value.length + 1,
    });
  });

  // 从列表中移除多余的项
  columnsDataWithoutDefault.value.splice(
    0,
    columnsDataWithoutDefault.value.length,
    ...columnsDataWithoutDefault.value.filter((item) => !itemsToRemove.includes(item)),
  );
};
const addImportColumn = () => {
  const maxSeq = columnsDataWithoutDefault.value.reduce((max, item) => {
    return item.seq > max ? item.seq : max;
  }, 0);
  columnsDataWithoutDefault.value.push({
    tableName: 'excel模板读取',
    columnName: '',
    columnDesc: '',
    columnType: 'string',
    isImport: false,
    isRequire: true,
    isExcel: true,
    value: '',
    label: '',
    canDelete: false,
    isByHand: true,
    seq: maxSeq + 1,
  });
};

const defaultImportSetting: ImportSetting = {
  batchCount: 1000,
  importKeyCode: '',
  businessDomain: '',
  tableName: '',
  importDesc: '',
  importTemplateUrl: '',
};
const formData: ImportSetting = reactive({
  ...defaultImportSetting,
});
const FORM_RULES: FormRules<Data> = {
  importKeyCode: [{ required: true, message: t('common.placeholder.input', [t('import.importKeyCode')]) }],
  importDesc: [{ required: true, message: t('common.placeholder.input', [t('import.importDesc')]) }],
  businessDomain: [{ required: true, message: t('common.placeholder.select', [t('import.businessDomain')]) }],
  tableName: [{ required: true, message: t('common.placeholder.select', [t('import.tableName')]) }],
};

// 下一步，跳转到第二步的设置页
const previewNext = () => {
  // form先校验后再跳转到到第二步
  formRef.value.validate().then((result) => {
    if (result === true) {
      if (!isEdit.value) {
        // 后端校验是否存在相同的导入Key,校验成功后再跳转到第二步
        api.importManage.checkExist(formData).then((res) => {
          if (res) {
            MessagePlugin.warning('导入Key已存在,请修改');
          } else {
            current.value = 1;
          }
        });
      } else {
        current.value = 1;
      }
    } else {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    }
  });
};

// #endregion

// #region 第二步：根据选择表格加载列数据
const tableColumnsRef = ref();
const columnsData: Ref<TableRowData[]> = ref([]);
const columnsDataWithoutDefault: Ref<TableRowData[]> = ref([]);
const onDragSort: TableProps['onDragSort'] = (params) => {
  console.log('交换行', params);
  let seq = 1;
  forEach(params.newData, (item) => {
    item.seq = seq++;
  });
  columnsDataWithoutDefault.value = params.newData;
};
const columns: any = computed(() => [
  // {
  //   title: '表名',
  //   colKey: 'tableName',
  // },
  {
    colKey: 'drag',
    // 列拖拽排序必要参数
    title: '排序',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (_h: any) => (
      <span>
        <MoveIcon />
      </span>
    ),
    width: 46,
  },
  {
    title: '列名',
    colKey: 'columnName',
    // 编辑状态相关配置，全部集中在 edit
    edit: {
      keepEditMode: true,
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autofocus: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext: any) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx: { e: { preventDefault: () => void } }) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 编辑完成，退出编辑态后触发
      onEdited: (context: { rowIndex: number; newRowData: TableRowData }) => {
        console.log(context);
        const newData = [...columnsDataWithoutDefault.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        columnsDataWithoutDefault.value = newData;
      },
      rules: [
        { required: true, message: '不可为空' },
        { max: 30, message: '字符数量不能超过 30', type: 'warning' },
      ],
      // 默认是否为编辑状态
      defaultEditable: true,
    },
  },
  {
    title: '列描述',
    colKey: 'columnDesc',
    edit: {
      keepEditMode: true,
      // 1. 支持任意组件。需保证组件包含 `value` 和 `onChange` 两个属性，且 onChange 的第一个参数值为 new value。
      // 2. 如果希望支持校验，组件还需包含 `status` 和 `tips` 属性。具体 API 含义参考 Input 组件
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext: any) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx: { e: { preventDefault: () => void } }) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 编辑完成，退出编辑态后触发
      onEdited: (context: { rowIndex: number; newRowData: TableRowData }) => {
        console.log(context);
        const newData = [...columnsDataWithoutDefault.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        columnsDataWithoutDefault.value = newData;
      },
      rules: [
        { required: true, message: '不可为空' },
        { max: 30, message: '字符数量不能超过 30', type: 'warning' },
      ],
      // 默认是否为编辑状态
      defaultEditable: true,
    },
  },
  {
    title: '数据类型',
    colKey: 'columnType',
  },
  {
    title: '导入列',
    colKey: 'isImport',
    width: '70px',
  },
  {
    title: '模板列',
    colKey: 'isExcel',
    width: '70px',
  },
  {
    title: '必填',
    colKey: 'isRequire',
    width: '70px',
  },
  {
    title: '默认值',
    colKey: 'defaultValue',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '110',
  },
]);
const editableCellState = (cellParams: { row: any; col: any }) => {
  const { row, col } = cellParams;
  return (row.tableName === 'excel模板读取' && col.colKey === 'columnName') || col.colKey === 'columnDesc';
};

// 编辑的时候，需要加载文件列表的时候取路径做处理
const getFileName = (filePath: any) => {
  // 假设你有一个完整的URL字符串
  const url = filePath;

  // 截取URL中的文件名部分
  const filenameEncoded = url.split('/').pop().split('?')[0];

  // 将URL编码解码为中文
  const filenameDecoded = decodeURIComponent(filenameEncoded);

  return filenameDecoded;
};
const relateVisible = ref(false);
const onClickConfirm = () => {
  // 先做校验
  // 如果选了系统参数
  // selectedParamGroup不可为空
  // sourceColumn 不可为空
  // matchField 不可为空
  // getValueField 不可为空
  let checkResult = true;
  if (selectedType.value === 'systemParams') {
    if (!selectedParamGroup.value) {
      MessagePlugin.warning('系统参数关联时，系统参数组不可为空');
      checkResult = false;
    }
    if (!sourceColumn.value) {
      MessagePlugin.warning('系统参数关联时，源字段不可为空');
      checkResult = false;
    }
    if (!matchField.value) {
      MessagePlugin.warning('系统参数关联时，匹配字段不可为空');
      checkResult = false;
    }
    if (!getValueField.value) {
      MessagePlugin.warning('系统参数关联时，取值字段不可为空');
      checkResult = false;
    }
  }

  // 如果选择了自定义字典
  // sourceColumn 不可为空
  // dicData至少大于一行
  // dicData的每一行行数据字段matchValue与saveValue都不可为空

  if (selectedType.value === 'customDict') {
    if (!sourceColumn.value) {
      MessagePlugin.warning('自定义字典关联时，源字段不可为空');
      checkResult = false;
    }
    if (dicData.value.length < 1) {
      MessagePlugin.warning('自定义字典关联时，字典数据不可为空');
      checkResult = false;
    }
    dicData.value.forEach((item) => {
      if (!item.matchValue) {
        MessagePlugin.warning('自定义字典关联时，字典数据匹配字段不可为空');
        checkResult = false;
      }
      if (!item.saveValue) {
        MessagePlugin.warning('自定义字典关联时，字典数据保存字段不可为空');
        checkResult = false;
      }
    });
  }

  // 如果选择了数据表匹配
  // mapTable不可为空
  // conditionData至少大于一行
  if (selectedType.value === 'dataTable') {
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
      MessagePlugin.warning('数据表匹配时，取值字段不可为空');
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
      if (!item.valueType) {
        MessagePlugin.warning('数据表匹配时，查询条件列【取值类型】不可为空');
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

  const relateData = {
    relateType: selectedType.value,
    systemParams: {
      selectedParamGroup: selectedParamGroup.value,
      sourceColumn: sourceColumn.value,
      matchField: matchField.value,
      getValueField: getValueField.value,
    },
    customDict: {
      sourceColumn: sourceColumn.value,
      dicData: dicData.value,
    },
    dataTable: {
      mapBusinessDomain: mapBusinessDomain.value,
      mapTable: mapTable.value,
      conditionData: conditionData.value,
      tableQueryField: tableQueryField.value,
    },
  };
  // 根据currentRelateRow的index 查询columnsDataWithoutDefault中匹配的行，使用find或者filter方法，将relateData赋值到对应行的datatransferJson字段
  columnsDataWithoutDefault.value[
    columnsDataWithoutDefault.value.findIndex((item) => item.seq === currentRelateRow.value.seq)
  ].datatransferJson = JSON.stringify(relateData);
  columnsDataWithoutDefault.value[
    columnsDataWithoutDefault.value.findIndex((item) => item.seq === currentRelateRow.value.seq)
  ].datatransfer = relateData;

  relateVisible.value = false;
  MessagePlugin.info('数据保存成功!');
  // const timer = setTimeout(() => {
  //   clearTimeout(timer);
  //   relateVisible.value = false;
  //   MessagePlugin.info('数据保存成功!');
  // }, 1000);
};
const currentRelateRow: any = ref({});
const onClickRelate = (row: { tableName: string; row: any }) => {
  console.log(row);
  if (row.tableName === 'excel模板读取') {
    MessagePlugin.warning('excel模板读取不可关联');
    return;
  }
  currentRelateRow.value = row.row;
  initRelatedData();
  relateVisible.value = true;
};

const selectedTypeChange = (value: string) => {
  if (value === 'dataTable') {
    mapBusinessDomain.value = 'MAIN';
    changeMapDomain();
  }
};
const IsinitRelate = ref(false);
const initRelatedData = () => {
  IsinitRelate.value = true;
  console.log(currentRelateRow.value);
  if (currentRelateRow.value.datatransferJson) {
    // 如果没设置关关联的，给设置默认值
    const relatedData = JSON.parse(currentRelateRow.value.datatransferJson);
    // 如果有设置过关联的，根据JSON读取后设置窗口里对应值
    selectedParamGroup.value = '';
    sourceColumn.value = '';
    matchField.value = '';
    getValueField.value = '';
    selectedType.value = relatedData.relateType;
    sourceColumn.value = '';
    dicData.value = [];
    mapBusinessDomain.value = 'MAIN';
    mapTable.value = '';
    conditionData.value = [];
    tableQueryField.value = '';
    switch (selectedType.value) {
      case 'systemParams':
        selectedParamGroup.value = relatedData.systemParams.selectedParamGroup;
        sourceColumn.value = relatedData.systemParams.sourceColumn;
        matchField.value = relatedData.systemParams.matchField;
        getValueField.value = relatedData.systemParams.getValueField;

        break;
      case 'customDict':
        sourceColumn.value = relatedData.customDict.sourceColumn;
        dicData.value = relatedData.customDict.dicData;
        break;
      case 'dataTable':
        mapBusinessDomain.value = relatedData.dataTable.mapBusinessDomain;
        changeMapDomain().then(() => {
          mapTable.value = relatedData.dataTable.mapTable;
          changeTableMatch(mapTable.value);
          IsinitRelate.value = false;
        });
        conditionData.value = relatedData.dataTable.conditionData;
        tableQueryField.value = relatedData.dataTable.tableQueryField;
        break;
      default:
        break;
    }
  } else {
    selectedType.value = 'none';
  }
};

const onClickDeleteColumn = (row: { rowIndex: number }) => {
  columnsDataWithoutDefault.value.splice(row.rowIndex, 1);
};
const previewNextTemplate = () => {
  // form先校验后再跳转到到第二步
  // 执行结束后触发事件 validate
  tableColumnsRef.value.validateTableData().then((params: { result: { [x: string]: any } }) => {
    const cellKeys = Object.keys(params.result);
    const firstError = params.result[cellKeys[0]];
    if (firstError) {
      MessagePlugin.warning(firstError[0].message);
    } else {
      const emptyRows = columnsDataWithoutDefault.value.filter((item) => {
        return item.columnName === '' || item.columnDesc === '';
      });
      if (emptyRows.length > 0) {
        MessagePlugin.warning('请填写完整信息');
        return;
      }

      current.value = 2;
    }
  });
};
// #endregion

// #region 设置数据数据转换
const selectedType = ref('none');
const systemParamGroups = ref([]);
const selectedParamGroup = ref(null);
const sourceColumn = ref('');
const matchField = ref('');
const getValueField = ref('');
const paramGroupFields = [
  { value: 'paramValue', label: '系统参数值 (paramValue)', name: '系统参数值' },
  { value: 'paramCode', label: '系统参数编码 (paramCode)', name: '系统参数编码' },
  { value: 'paramName', label: '系统参数名称 (paramName)', name: '系统参数名称' },
  { value: 'paramDesc', label: '系统参数描述 (paramDesc)', name: '系统参数描述' },
];
const columnsDic: any = computed(() => [
  {
    title: '匹配值',
    colKey: 'matchValue',
  },
  {
    title: '保存值',
    colKey: 'saveValue',
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
const addDicData = () => {
  dicData.value.push({
    matchValue: '',
    saveValue: '',
  });
};

const conditionData = ref([]);
const addConditionData = () => {
  conditionData.value.push({
    field: '',
    operator: 'EQ',
    valueType: 'COLUMN',
    value: '',
  });
};

const onDeleteDicRow = ({ rowIndex }) => {
  dicData.value.splice(rowIndex, 1);
};

const onDeleteTableRow = ({ rowIndex }) => {
  conditionData.value.splice(rowIndex, 1);
};

const loadParamGroup = async () => {
  api.paramGroup.getTreeList().then((data: any) => {
    systemParamGroups.value = data;
  });
};
const mapBusinessDomain = ref('');
const mapTable = ref('');
const tableQueryField = ref('');
const selectMapTable: any = ref({});
const selectMapColumns: any = ref({});
const mapTableList = ref([]);
const columnsMapTable: any = computed(() => [
  {
    title: '字段',
    colKey: 'field',
  },
  {
    title: '条件',
    colKey: 'operator',
  },
  {
    title: '取值类型',
    colKey: 'valueType',
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
const operators = [
  { value: 'EQ', label: '等于' },
  { value: 'LIKE', label: '包含' },
];
const valueTypes = [
  { value: 'VALUE', label: '固定值' },
  { value: 'COLUMN', label: '引用列' },
];

// #映射业务领域变化
const changeMapDomain = async () => {
  mapTable.value = '';
  selectMapTable.value = null;
  return loadMapTableList();
};
const loadMapTableList = async () => {
  const params = { businessCode: mapBusinessDomain.value };
  const res = await api.importManage.tables(params);
  mapTableList.value = res;
};
const changeTableMatch = (value: string) => {
  selectMapTable.value = mapTableList.value.find((item) => item.tableName === value);
  console.log(selectMapTable.value);
  selectMapColumns.value = selectMapTable.value?.columns.map((item: { columnName: any; columnDesc: any }) => ({
    ...item,
    value: item.columnName,
    label: item.columnDesc,
  }));
  if (!IsinitRelate.value) {
    conditionData.value = [];
  }
};

const initEditColumns = (value: string) => {
  loadTableList().then(() => {
    const editTable = tableList.value.find((item) => item.tableName === value);

    tableDesc.value = editTable?.tableDescription;
    columnsData.value = editTable?.columns.map((item: { columnName: any; columnDesc: any }) => ({
      ...item,
      value: item.columnName,
      label: item.columnDesc,
    }));
  });
};

onMounted(async () => {
  await loadParamGroup(); // 加载系统参数 上 请求
});
// #endregion

// #region 第三步：维护校验信息
const activeValidateTab = ref('tab1');
/**
 * @description: 生成随机字符串ID 不包含数字
 * @param {length} 长度
 * @return {String} 随机字符串
 */
const randomString = (length = 6) => {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const len = str.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += str.charAt(Math.floor(Math.random() * len));
  }
  return result;
};

// const templateColumns = computed(() => {
//   debugger;
//   return columnsDataWithoutDefault.value.filter((item) => item.isTemplate === 1);
// });
const validationColumns: any = computed(() => [
  // {
  //   title: '校验名称',
  //   colKey: 'validateName',
  //   width: '120',
  // },
  {
    title: '唯一校验类型',
    colKey: 'uniqueType',
    width: '120',
  },
  {
    title: '唯一键字段',
    colKey: 'uniqueColumns',
    width: '220',
  },
  {
    title: '校验失败提示信息',
    colKey: 'showMsg',
    width: '220',
  },
  // {
  //   title: '校验配置Json',
  //   colKey: 'datatransferJson',
  // },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '80',
  },
]);
const validationDatas = ref([]);
const onClickDeleteValidation = (row: { rowIndex: number }) => {
  validationDatas.value.splice(row.rowIndex, 1);
};
const uniqueTypes = [
  { value: 'TEMPLATE', label: '模板唯一校验' },
  { value: 'DB', label: '数据表唯一校验' },
];
// const validateTypes = [
//   { value: 'UNIQUE', label: '唯一' },
//   { value: 'REGEX', label: '正则' },
// ];
const addValidationData = () => {
  // let uniIndex = 0;
  validationDatas.value.push({
    validateName: randomString(10),
    uniqueType: 'DB',
    validateType: 'UNIQUE',
    uniqueColumns: [],
    showMsg: '',
  });
};

const validationColumns2: any = computed(() => [
  {
    title: '校验列',
    colKey: 'uniqueColumns',
    width: '150',
  },
  {
    title: '列类型',
    colKey: 'columnType',
    width: '80',
  },
  {
    title: '校验类型',
    colKey: 'validateType',
    width: '160',
  },
  {
    title: '校验设置',
    colKey: 'validateSetting',
    width: '280',
  },
  {
    title: '校验失败提示信息',
    colKey: 'showMsg',
    width: '220',
  },
  // {
  //   title: '校验配置Json',
  //   colKey: 'datatransferJson',
  // },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '80',
  },
]);
const validationDatas2 = ref([]);

const onClickDeleteValidation2 = (row: { rowIndex: number }) => {
  validationDatas2.value.splice(row.rowIndex, 1);
};
// const validateTypes2 = [
//   { value: 'UNIQUE', label: '唯一' },
//   { value: 'REGEX', label: '正则' },
// ];
const addValidationData2 = () => {
  // let uniIndex = 0;
  // uniIndex = validationDatas2.value.length + 1;
  validationDatas2.value.push({
    validateName: randomString(10),
    validateType: '',
    uniqueColumns: '',
    columnType: '',
    showMsg: '',
    lengthLimit: 80,
    regularExpression: '',
    minNumber: 0,
    maxNumber: 100,
    minDate: null,
    maxDate: null,
    rangeDate: [],
  });
};
const handleUniqueTypesChange = (row: { uniqueColumns: any[] }) => {
  row.uniqueColumns = [];
};
const findTemplateColumnDescByColumnName = (columnName: any) => {
  return columnsDataWithoutDefault.value
    .filter((item) => item.columnName && item.columnDesc && item.isExcel)
    .find((column) => column.columnName === columnName)?.columnDesc;
};
const findDbColumnDescByColumnName = (columnName: any) => {
  return columnsData.value.find((column) => column.columnName === columnName)?.columnDesc;
};

const handleUniqueTemplateChange = (row: any) => {
  const selectedColumnDescs = row.uniqueColumns
    .map((columnName: any) => findTemplateColumnDescByColumnName(columnName))
    .filter((desc: any) => desc !== undefined); // 确保移除未找到的columnDesc
  row.showMsg = `模板数据唯一校验失败：唯一校验字段为[${selectedColumnDescs.join(', ')}]`;
};

const handleUniqueDbChange = (row: any) => {
  const selectedColumnDescs = row.uniqueColumns
    .map((columnName: any) => findDbColumnDescByColumnName(columnName))
    .filter((desc: any) => desc !== undefined); // 确保移除未找到的columnDesc
  row.showMsg = `数据库唯一校验失败：唯一校验字段为[${selectedColumnDescs.join(', ')}]`;
};
const handleUniqueColumnsChange = (row: any) => {
  if (row.uniqueColumns) {
    const columnItem = columnsDataWithoutDefault.value
      .filter((item) => item.columnName && item.columnDesc && item.isExcel && item.columnType !== 'Boolean')
      .filter((item) => {
        return item.columnName === row.uniqueColumns;
      });
    if (columnItem.length > 0) {
      row.columnType = columnItem[0].columnType;
      if (columnItem[0].columnType === 'String') {
        row.validateType = 'LENGTH';
      } else {
        row.validateType = 'RANGE';
      }
    }
    setColumnValidateMsg(row);
  }
};

const handleValidateTypeChange = (row: any) => {
  setColumnValidateMsg(row);
};

const setColumnValidateMsg = (row: any) => {
  // 长度校验信息： 列【列名】长度校验失败，字符长度请在【最小长度】和【最大长度】之间
  // 区间校验信息： 列【列名】值校验失败，值必须在【最小值】和【最大值】之间
  // 正则校验信息： 列【列名】值校验失败，值必须符合正则表达式【正则表达式】
  const columnItem = columnsDataWithoutDefault.value
    .filter((item) => item.columnName && item.columnDesc && item.isExcel && item.columnType !== 'Boolean')
    .filter((item) => {
      return item.columnName === row.uniqueColumns;
    });
  if (columnItem) {
    row.columnDesc = columnItem[0].columnDesc;
  }
  row.showMsg = '';
  if (row.validateType === 'LENGTH') {
    row.showMsg = `列【${row.columnDesc}】值校验失败，值字符长度必须少于【${row.lengthLimit}】字符`;
  }
  if (row.validateType === 'REGEX') {
    row.showMsg = `列【${row.columnDesc}】值校验失败，值必须符合正则表达式【${row.regularExpression}】`;
  }
  if (row.validateType === 'RANGE' && (row.columnType === 'Date' || row.columnType === 'Datetime')) {
    row.showMsg = `列【${row.columnDesc}】值校验失败，日期范围需在【${row.rangeDate[0]}】和【${row.rangeDate[1]}】之间`;
  }
  if (
    row.validateType === 'RANGE' &&
    (row.columnType === 'Integer' || row.columnType === 'Long' || row.columnType === 'BigDecimal')
  ) {
    row.showMsg = `列【${row.columnDesc}】值校验失败，值范围需在【${row.minNumber}】和【${row.maxNumber}】之间`;
  }
};

const saveValidateSetting = () => {
  let checkResult = true;
  let uniCheckRowIndex = 1;
  const warnMsgList = [];
  validationDatas.value.forEach((item) => {
    // if (!item.validateName) {
    //   MessagePlugin.warning('校验名称不可为空');
    //   checkResult = false;
    // }
    if (item.validateType === 'UNIQUE' && (!item.uniqueColumns || item.uniqueColumns.length === 0)) {
      warnMsgList.push(`唯一校验-第${uniCheckRowIndex}行，唯一键字段不可为空;`);

      checkResult = false;
    }
    if (!item.showMsg) {
      warnMsgList.push(`唯一校验-第${uniCheckRowIndex}行，校验失败提示信息不可为空;`);
      checkResult = false;
    }
    uniCheckRowIndex++;
  });
  uniCheckRowIndex = 1;
  validationDatas2.value.forEach((item) => {
    // if (!item.validateName) {
    //   MessagePlugin.warning('校验名称不可为空');
    //   checkResult = false;
    // }
    if (!item.uniqueColumns || item.uniqueColumns.length === 0) {
      warnMsgList.push(`列校验-第${uniCheckRowIndex}行，校验列不可为空;`);

      checkResult = false;
    }
    if (!item.showMsg) {
      warnMsgList.push(`列校验-第${uniCheckRowIndex}行，校验失败提示信息不可为空;`);
      checkResult = false;
    }
    if (!item.validateType) {
      warnMsgList.push(`列校验-第${uniCheckRowIndex}行，校验类型不可为空;`);
      checkResult = false;
    }
    if (item.uniqueColumns && item.validateType) {
      switch (item.validateType) {
        case 'REGEX':
          if (!item.regularExpression) {
            warnMsgList.push(`列校验-第${uniCheckRowIndex}行，校验正则式不可为空;`);
            checkResult = false;
          }
          break;
        case 'LENGTH':
          if (!item.lengthLimit) {
            warnMsgList.push(`列校验-第${uniCheckRowIndex}行，字符长度限制不可为空;`);
            checkResult = false;
          }
          break;
        case 'RANGE':
          if (item.columnType === 'Date') {
            if (!item.rangeDate) {
              warnMsgList.push(`列校验-第${uniCheckRowIndex}行，日期范围不可为空;`);
              checkResult = false;
            }
          } else if (
            item.minNumber != null &&
            item.maxNumber != null &&
            item.minNumber !== '' &&
            item.maxNumber !== ''
          ) {
            warnMsgList.push(`列校验-第${uniCheckRowIndex}行，字段值范围不可为空;`);
            checkResult = false;
          } else if (item.minNumber > item.maxNumber) {
            warnMsgList.push(`列校验-第${uniCheckRowIndex}行，字段值最大值必须大于最小值;`);
            checkResult = false;
          }

          break;

        default:
          break;
      }
    }
  });

  if (checkResult) {
    current.value++;
  } else {
    const warnContainer = (
      <div>
        {warnMsgList.map((msg, index) => (
          <div key={index} style="display:block;width:100%">
            {msg}
          </div>
        ))}
      </div>
    );
    MessagePlugin.warning({ content: () => warnContainer });
  }
};
// #endregion
// #region 第四步：维护导入模板

const isConfirmDialogVisible = ref(false);
const templateForm = ref();
const templateFormData = ref({
  templateName: '',
});
const templateFormRules = {
  templateName: [{ required: true }],
};
const confirmGenTemplate = () => {
  // 先验证导入模板文件名是否存在
  templateForm.value.validate().then((result: boolean | { [s: string]: unknown } | ArrayLike<unknown>) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);

      return;
    }
    const insetModel: ImportSettingDTO = getInsetModel();
    insetModel.genTemplateName = templateFormData.value.templateName;
    api.importManage.generateImportTemplate(insetModel).then((data) => {
      uploadFiles.value = [];
      uploadFiles.value.push(data);
      MessagePlugin.success('生成成功');
      isConfirmDialogVisible.value = false;
    });
  });
};

const uploadFiles = ref([]);
const templatePath = ref('');
const templateFileName = ref('');
const generateTemplate = () => {
  isConfirmDialogVisible.value = true;
  if (templateFormData.value.templateName === '') {
    templateFormData.value.templateName = `导入模板_${tableDesc.value}`;
  }
};
const uploadSuccess = (file: AddFileType) => {
  uploadFiles.value = [];
  uploadFiles.value.push(file);
  templatePath.value = file.fullFileName;
  templateFileName.value = file.fileName;
};
const deleteSuccess = () => {
  uploadFiles.value = [];
  templatePath.value = '';
  templateFileName.value = '';
};

const saveImportSetting = () => {
  let checkResult = true;
  if (!(uploadFiles.value && uploadFiles.value.length > 0)) {
    MessagePlugin.warning('导入模板不可为空');
    checkResult = false;
  }
  if (checkResult) {
    // todo:保存事件
    MessagePlugin.info('数据保存中...', 1000);

    const insetModel: ImportSettingDTO = getInsetModel();

    if (!isEdit.value) {
      // 提交保存数据到接口
      api.importManage.add(insetModel).then((data) => {
        console.log(data);
        MessagePlugin.success('保存成功');
        formImportVisible.value = false;
        emit('success');
      });
    } else {
      insetModel.settingModel.id = formData.id;
      // 提交保存数据到接口
      api.importManage.edit(insetModel).then((data) => {
        console.log(data);
        MessagePlugin.success('保存成功');
        formImportVisible.value = false;
        emit('success');
      });
    }
  }
};

const getInsetModel = () => {
  const insetModel: ImportSettingDTO = {};
  if (uploadFiles.value && uploadFiles.value.length > 0) {
    templatePath.value = uploadFiles.value[0].fullFileName;
  }

  insetModel.settingModel = {
    importKeyCode: formData.importKeyCode,
    businessDomain: formData.businessDomain,
    tableName: formData.tableName,
    importDesc: formData.importDesc,
    importTemplateUrl: templatePath.value,
    batchCount: formData.batchCount,
    sourceType: 'HANDSET',
  };

  insetModel.columnList = [];
  columnsDataWithoutDefault.value.forEach((item) => {
    insetModel.columnList.push({
      columnField: item.columnName,
      columnDesc: item.columnDesc,
      columnDatetype: item.columnType,
      isRequired: item.isRequire,
      isImport: item.isImport,
      isTemplate: item.isExcel,
      defaultValue: item.defaultValue,
      datatransferJson: item.datatransferJson,
      regularExpression: '',
      seq: item.seq,
      fromTable: item.tableName,
    });
  });

  insetModel.ruleList = [];
  validationDatas.value.forEach((item) => {
    const ruleData = {
      showMsg: item.showMsg,
      uniqueType: item.uniqueType,
    };
    insetModel.ruleList.push({
      validateName: item.validateName,
      validateType: item.validateType,
      uniqueColumns: item.uniqueColumns,
      datatransferJson: JSON.stringify(ruleData),
    });
  });

  validationDatas2.value.forEach((item) => {
    const ruleData = {
      lengthLimit: item.lengthLimit,
      regularExpression: item.regularExpression,
      minNumber: item.minNumber,
      maxNumber: item.maxNumber,
      minDate: item.rangeDate.length > 0 ? item.rangeDate[0] : null,
      maxDate: item.rangeDate.length > 1 ? item.rangeDate[1] : null,
      rangeDate: item.rangeDate,
      uniqueType: item.uniqueType,
      columnType: item.columnType,
      columnDesc: item.columnDesc,
      showMsg: item.showMsg,
    };
    insetModel.ruleList.push({
      validateName: item.validateName,
      validateType: item.validateType,
      uniqueColumns: item.uniqueColumns,
      datatransferJson: JSON.stringify(ruleData),
    });
  });

  return insetModel;
};
// #endregion

// 编辑-加载编辑的数据
const initEditData = (insetModel: any) => {
  isEdit.value = true;
  templateFormData.value.templateName = '';
  current.value = 0;
  // 将settingModel属性的值赋回formData
  formData.importKeyCode = insetModel.settingModel.importKeyCode;
  formData.businessDomain = insetModel.settingModel.businessDomain;
  formData.tableName = insetModel.settingModel.tableName;
  formData.importDesc = insetModel.settingModel.importDesc;
  formData.importTemplateUrl = insetModel.settingModel.importTemplateUrl;
  formData.batchCount = insetModel.settingModel.batchCount;
  formData.sourceType = insetModel.settingModel.sourceType;
  formData.id = insetModel.settingModel.id;

  // 将columnList属性的值赋回columnsDataWithoutDefault
  const columnDataArray = [];
  let columnIndex = 0;
  insetModel.columnList.forEach(
    (item: {
      seq: any;
      fromTable: string;
      columnDesc: any;
      columnField: any;
      columnDatetype: any;
      isRequired: any;
      isImport: any;
      isTemplate: any;
      defaultValue: any;
      datatransferJson: string;
    }) => {
      const columnData = {
        seq: item.seq,
        tableName: item.fromTable,
        columnDesc: item.columnDesc,
        columnName: item.columnField,
        columnType: item.columnDatetype,
        isRequire: item.isRequired,
        isImport: item.isImport,
        isExcel: item.isTemplate,
        defaultValue: item.defaultValue,
        datatransferJson: item.datatransferJson,
        datatransfer: item.datatransferJson === 'empty' ? item.datatransferJson : JSON.parse(item.datatransferJson),
        canDelete: item.fromTable === 'excel模板读取',
        isByHand: item.fromTable === 'excel模板读取',
        // 注意：原始数据结构里可能需要 regularExpression 字段，这里假设它不存在于insetModel中
        // 若要保持一致，请确保正确处理该字段
      };
      columnDataArray.push(columnData);
    },
  );
  // 确保columnsDataWithoutDefault能被正确更新（假设它是可写的）
  columnsDataWithoutDefault.value = columnDataArray;

  // 将ruleList属性的值赋回validationDatas
  const validationDataArray = [];
  const validationDataColumnArray = [];
  columnIndex = 0;
  insetModel.ruleList.forEach(
    (item: { validateType: string; uniqueColumns: string; validateName: any; datatransferJson: string }) => {
      let uniqueColumns = null;
      if (item.validateType === 'UNIQUE') {
        uniqueColumns = JSON.parse(item.uniqueColumns);
        const validationData = {
          index: columnIndex++,
          validateType: item.validateType,
          validateName: item.validateName,
          uniqueColumns,
          // 同样，假设datatransferJson在原始数据结构中也是存在的，这里根据实际需求填充
          datatransferJson: item.datatransferJson || '',
          datatransfer: item.datatransferJson === '' ? item.datatransferJson : JSON.parse(item.datatransferJson),
        };
        Object.assign(validationData, validationData.datatransfer);
        validationDataArray.push(validationData);
        // 更新validationDatas（同样假设它是可写的）
      } else {
        uniqueColumns = item.uniqueColumns;
        const validationData = {
          index: columnIndex++,
          validateType: item.validateType,
          validateName: item.validateName,
          uniqueColumns,
          // 同样，假设datatransferJson在原始数据结构中也是存在的，这里根据实际需求填充
          datatransferJson: item.datatransferJson || '',
          datatransfer: item.datatransferJson === 'empty' ? item.datatransferJson : JSON.parse(item.datatransferJson),
        };
        Object.assign(validationData, validationData.datatransfer);
        validationDataColumnArray.push(validationData);
      }
    },
  );
  validationDatas.value = validationDataArray;
  validationDatas2.value = validationDataColumnArray;
  // 添加文件列表
  uploadFiles.value = [];
  const addFile: any = {
    id: Math.floor(Math.random() * 1999990),
    serialNumber: 1,
    fullFileName: insetModel.settingModel.importTemplateUrl,
    fileName: getFileName(insetModel.settingModel.importTemplateUrl),
    fileSize: 0,
    fileSizeShow: '-',
    timeUpload: '-',
    signedUrl: insetModel.settingModel.importTemplateUrl,
    percent: 100,
    fileType: '',
  };
  uploadFiles.value.push(addFile);
  templatePath.value = addFile.fullFileName;
  templateFileName.value = addFile.fileName;
  initEditColumns(formData.tableName);
};

// 新增-初始化新增的数据
const initAddData = () => {
  isEdit.value = false;
  templateFormData.value.templateName = '';
  current.value = 0;
  if (formRef.value) {
    formRef.value.clearValidate();
  }

  // 将settingModel属性的值赋回formData
  formData.importKeyCode = '';
  formData.businessDomain = 'MAIN';
  formData.tableName = '';
  formData.importDesc = '';
  formData.importTemplateUrl = '';
  formData.batchCount = 1000;
  formData.sourceType = 'HANDSET';

  // 将columnList属性的值赋回columnsDataWithoutDefault
  const columnDataArray = [];
  columnsDataWithoutDefault.value = columnDataArray;

  // 将ruleList属性的值赋回validationDatas
  const validationDataArray = [];
  // 更新validationDatas（同样假设它是可写的）
  validationDatas.value = validationDataArray;

  uploadFiles.value = [];
};

defineExpose({ initEditData, initAddData });
</script>

<style scoped lang="less">
/* 父容器（div）设置为Flex布局 */
.center-div {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.table-box_header {
  width: 100%;
  height: 32px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-box__table {
  flex: auto;
  // border: 1px solid #d5d8db;
}
</style>
