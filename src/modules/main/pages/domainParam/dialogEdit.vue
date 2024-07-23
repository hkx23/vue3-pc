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
    <cmp-container :full="true" class="root">
      <!-- #region 基础信息配置模块代码 -->
      <cmp-card :span="12" :ghost="true">
        <div class="title-row">
          <div class="table-title">基础信息配置</div>
          <t-space>
            <t-button v-if="formData.datasourceName" @click="refreshImportColumn">刷新表字段</t-button>
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
              <!-- #region 关联数据源配置 -->
              <t-tab-panel value="SOURCE" label="关联数据源" :destroy-on-hide="false">
                <cmp-container :full="true">
                  <cmp-card :span="12" :ghost="true">
                    <t-space direction="vertical" size="4px">
                      <div class="table-box_header">
                        <div class="table-title">关联数据源</div>
                        <t-space align="end" style="float: right">
                          <t-button @click="onAddRelateSource">添加关联数据源</t-button>
                        </t-space>
                      </div>

                      <t-table
                        ref="relateSourceRef"
                        :columns="resouceColumns"
                        :data="relateSourceData"
                        bordered
                        resizable
                        lazy-load
                        row-key="id"
                        drag-sort="row-handler"
                        @drag-sort="onSourceDragSort"
                      >
                        <template #datasourceType="{ row }">
                          <t-select v-model="row.datasourceType">
                            <t-option key="dataTable" label="数据表" value="dataTable" />
                            <!-- <t-option key="sysParam" label="系统字典" value="sysParam" /> -->
                          </t-select>
                        </template>

                        <template #datasourceName="{ row }">
                          <t-select
                            v-model="row.datasourceName"
                            :clearable="true"
                            filterable
                            :placeholder="t('common.placeholder.select', [t('domainParam.datasourceName')])"
                            @change="changeRelateTable(row)"
                          >
                            <t-option
                              v-for="item in tableList"
                              :key="item.tableName"
                              :label="item.tableDescription + ' (' + item.tableName + ')'"
                              :name="item.tableDescription"
                              :value="item.tableName"
                            />
                          </t-select>
                        </template>
                        <template #relatedType="{ row }">
                          <t-select v-model="row.relatedType">
                            <t-option key="LEFT" label="左关联" value="LEFT" />
                            <t-option key="RIGHT" label="右关联" value="RIGHT" />
                            <t-option key="INNER" label="内关联" value="INNER" />
                            <!-- <t-option key="sysParam" label="系统字典" value="sysParam" /> -->
                          </t-select>
                        </template>
                        <template #aliasName="{ row }">
                          <t-input v-model="row.aliasName"></t-input>
                        </template>

                        <template #op="row">
                          <t-space :size="4">
                            <t-link theme="primary" @click="setReleteCondition(row)"> 关联条件 </t-link>
                            <t-link theme="primary" @click="deleteRelateSourceData(row)">{{
                              t('common.button.delete')
                            }}</t-link>
                          </t-space>
                        </template>

                        <!-- <template #button>
                          <t-space direction="vertical">
                            <t-button theme="primary" @click="onAddRelateSource()">新增关联数据源</t-button>
                          </t-space>
                        </template> -->
                      </t-table>
                    </t-space>
                  </cmp-card>
                </cmp-container>
              </t-tab-panel>
              <!-- #endregion 关联数据源配置 -->

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
                        <div class="table-title">表格列配置</div>
                        <t-space align="end" style="float: right">
                          <t-button @click="addColumnData">添加列</t-button>
                        </t-space>
                      </div>

                      <t-table
                        ref="tableColumnsRef"
                        :columns="columnColumns"
                        :data="columnsData"
                        bordered
                        resizable
                        lazy-load
                        row-key="id"
                        drag-sort="row-handler"
                        @drag-sort="onDragSort"
                      >
                        <template #isDatabaseField="{ row }">
                          <t-checkbox v-model="row.isDatabaseField" :disabled="row.isDatabaseField"></t-checkbox>
                        </template>

                        <template #tableName="{ row }">
                          <t-select v-if="row.isHandAdd" v-model="row.tableName" @change="columnHandTableChange(row)">
                            <t-option
                              v-for="item in columnAliasNameList"
                              :key="item.value"
                              :name="item.label"
                              :value="item.value"
                              :label="item.label"
                            />
                          </t-select>
                          <span v-else>{{ row.tableName }}</span>
                        </template>
                        <template #columnName="{ row }">
                          <t-select
                            v-if="row.isHandAdd && row.tableName != 'noTable'"
                            v-model="row.columnName"
                            @change="columnHandColumnChange(row)"
                          >
                            <t-option
                              v-for="item in row.columnAliasColumnList"
                              :key="item.columnName"
                              :label="item.columnDesc + ' (' + item.columnName + ')'"
                              :value="item.columnName"
                              :name="item.columnDesc"
                            />
                          </t-select>
                          <t-input v-else-if="row.isHandAdd && row.tableName == 'noTable'" v-model="row.columnName" />

                          <span v-else>{{ row.columnName }}</span>
                        </template>
                        <template #columnDesc="{ row }">
                          <t-input v-model="row.columnDesc"></t-input>
                        </template>
                        <template #isVisible="{ row }">
                          <t-switch v-model="row.isVisible"></t-switch>
                        </template>
                        <template #isLeftFixed="{ row }">
                          <t-switch v-model="row.isLeftFixed"></t-switch>
                        </template>
                        <template #isRightFixed="{ row }">
                          <t-switch v-model="row.isRightFixed"></t-switch>
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

                        <template #op="row">
                          <t-link v-if="row.row.isHandAdd" theme="primary" @click="onColumnDeleteClick(row)">{{
                            t('common.button.delete')
                          }}</t-link>
                        </template>

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
                        resizable
                        lazy-load
                        row-key="id"
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
                        <template #operator="{ row }">
                          <t-select v-model="row.operator" filterable :options="operators"> </t-select>
                        </template>

                        <template #isVisible="{ row }">
                          <t-switch v-model="row.isVisible"></t-switch>
                        </template>

                        <template #op="slotProps">
                          <t-link theme="primary" @click="deleteSearchData(slotProps)">{{
                            t('common.button.delete')
                          }}</t-link>
                        </template>

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
              <t-tab-panel value="BUTTON" label="按钮定义" :destroy-on-hide="false">
                <cmp-container :full="true">
                  <cmp-row>
                    <cmp-card flex="180px" bordered>
                      <t-tabs v-model="currButtonTab" class="buttonTab" :addable="true" @add="onClickAddTab">
                        <t-tab-panel value="button" label="按钮">
                          <t-list size="small" split class="buttonList">
                            <t-list-item
                              v-for="item in buttonSourceData"
                              :key="item.buttonCode"
                              :class="currButtonName == item.buttonName ? 'activeButton' : ''"
                              @click="onClickButton(item)"
                            >
                              <div>
                                <location-icon />
                                <span style="margin-left: var(--td-comp-margin-s)">{{ item.buttonName }}</span>
                              </div>
                              <template #action>
                                <check-circle-filled-icon
                                  v-if="item.isEnabled"
                                  style="color: var(--td-success-color)"
                                />
                              </template>
                            </t-list-item>
                          </t-list>
                        </t-tab-panel>
                      </t-tabs>
                    </cmp-card>
                    <cmp-card :span="12" :ghost="true" flex="auto">
                      <cmp-container v-show="currButtonName !== 'notSelect'" :full="true">
                        <cmp-card :span="12" :ghost="true">
                          <div class="title-row">
                            <div class="table-title">按钮基础信息</div>
                          </div>
                          <t-form
                            ref="domainButtonFromRef"
                            class="card"
                            :data="currentSelectButton"
                            :rules="buttonFormRules"
                            label-width="120px"
                            layout="inline"
                          >
                            <t-form-item label="按钮编码" name="buttonCode">
                              <t-input
                                v-model="currentSelectButton.buttonCode"
                                :disabled="!currentSelectButton.isCustomButton"
                                :placeholder="t('common.placeholder.input', ['按钮编码'])"
                              ></t-input>
                            </t-form-item>
                            <t-form-item label="按钮名称" name="buttonName">
                              <t-input
                                v-model="currentSelectButton.buttonName"
                                :placeholder="t('common.placeholder.input', ['按钮名称'])"
                              ></t-input>
                            </t-form-item>
                            <t-form-item label="按钮位置" name="buttonPosition">
                              <t-select
                                v-model="currentSelectButton.buttonPosition"
                                :disabled="
                                  !currentSelectButton.isCustomButton && currentSelectButton.buttonCode !== 'delete'
                                "
                                filterable
                                :placeholder="t('common.placeholder.select', ['按钮位置'])"
                              >
                                <t-option
                                  v-if="currentSelectButton.buttonCode == 'delete'"
                                  key="both"
                                  label="表格行内与按钮区"
                                  value="both"
                                  name="表格行内与按钮区"
                                />
                                <t-option key="row" label="表格行内" value="row" name="表格行内" />
                                <t-option key="tableHeader" label="表格按钮区" value="tableHeader" name="表格按钮区" />
                              </t-select>
                            </t-form-item>
                            <t-form-item label="按钮样式" name="buttonPosition">
                              <t-select
                                v-model="currentSelectButton.buttonTheme"
                                filterable
                                :placeholder="t('common.placeholder.select', ['按钮样式'])"
                              >
                                <t-option key="primary" label="primary" value="primary" />
                                <t-option key="success" label="success" value="success" />
                                <t-option key="default" label="default" value="default" />
                                <t-option key="danger" label="danger" value="danger" />
                                <t-option key="warning" label="warning" value="warning" />
                              </t-select>
                            </t-form-item>
                            <t-form-item label="是否启用" name="isEnabled">
                              <t-switch v-model="currentSelectButton.isEnabled" />
                            </t-form-item>
                            <t-form-item label="按钮操作" name="actionType">
                              <t-select
                                v-model="currentSelectButton.actionType"
                                :disabled="!currentSelectButton.isCustomButton"
                                filterable
                                :placeholder="t('common.placeholder.select', ['按钮操作'])"
                              >
                                <t-option key="form-add" label="添加表单" value="form-add" />
                                <t-option key="form-edit" label="编辑表单" value="form-edit" />
                                <t-option key="delete" label="删除数据" value="delete" />
                                <t-option key="link" label="打开新页面" value="link" />
                                <t-option key="import" label="导入" value="import" />
                                <t-option key="form-custom" label="自定义表单-更新操作" value="form-custom" />
                              </t-select>
                            </t-form-item>
                            <t-form-item
                              v-if="currentSelectButton.actionType === 'delete'"
                              label="删除类型"
                              name="deleteType"
                            >
                              <t-select
                                v-model="currentSelectButton.deleteType"
                                filterable
                                :placeholder="t('common.placeholder.select', ['删除类型'])"
                              >
                                <t-option key="logical" label="逻辑删除" value="logical" />
                                <t-option key="physical" label="物理删除" value="physical" />
                              </t-select>
                            </t-form-item>
                          </t-form>
                        </cmp-card>
                        <cmp-card :span="12" :ghost="true">
                          <t-space direction="vertical" size="4px">
                            <div class="table-box_header">
                              <div class="table-title">表单配置</div>
                              <t-space align="end" style="float: right">
                                <t-button @click="syncButtonForm">同步表单配置</t-button>
                              </t-space>
                            </div>
                            <t-table
                              v-show="currentSelectButton.actionType.includes('form')"
                              ref="buttonTableRef"
                              :columns="buttonFormColumns"
                              :selected-row-keys="buttonFormSelectedRowKeys"
                              :data="currentSelectButton.formColumnSetting"
                              bordered
                              resizable
                              lazy-load
                              row-key="id"
                              drag-sort="row-handler"
                              @drag-sort="onButtonDragSort"
                              @select-change="onSelectButtonFormChange"
                            >
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
                                    v-for="item in systemComponents.filter(
                                      (item) => item.useType === 'both' || item.useType === 'form',
                                    )"
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
                                    row.component.indexOf('t-checkbox-group') > -1 ||
                                    row.component.indexOf('t-radio-group') > -1
                                  "
                                  theme="primary"
                                  @click="onClickButtonRelate(row)"
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
                              <template #operator="{ row }">
                                <t-select v-model="row.operator" filterable :options="operators"> </t-select>
                              </template>

                              <template #isVisible="{ row }">
                                <t-switch v-model="row.isVisible"></t-switch>
                              </template>
                              <template #isKeyField="{ row }">
                                <t-switch v-model="row.isKeyField"></t-switch>
                              </template>
                              <template #isRequired="{ row }">
                                <t-switch v-model="row.isRequired"></t-switch>
                              </template>
                              <template #isDisabled="{ row }">
                                <t-switch v-model="row.isDisabled"></t-switch>
                              </template>
                              <template #verifyExp="{ row }">
                                <t-input v-model="row.verifyExp"></t-input>
                              </template>

                              <template #op="slotProps">
                                <t-link theme="primary" @click="deleteButtonRowData(slotProps)">{{
                                  t('common.button.delete')
                                }}</t-link>
                              </template>
                            </t-table>
                          </t-space>
                        </cmp-card>
                      </cmp-container>
                    </cmp-card>
                  </cmp-row>
                </cmp-container>
              </t-tab-panel>
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
              <t-table
                ref="tableDict"
                resizable
                lazy-load
                :columns="columnsDic"
                :data="dicData"
                bordered
                row-key="value"
              >
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
                resizable
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

    <!-- #region 关联条件设置弹窗-->
    <t-drawer
      v-model:visible="relateSourceConditionVisible"
      class="component-resource-drawer"
      :z-index="3000"
      size="90%"
      placement="right"
      header="关联条件"
      :on-confirm="onRelateConditionConfirm"
      :close-btn="true"
    >
      <!-- 1.选择转换类型
    1.1 系统参数
    1.2 数据表
    1.3 自定义字典 -->
      <t-form>
        <t-space direction="vertical" :size="8">
          <t-space align="center" style="float: right">
            <t-button @click="addrelateConditionData">添加关联条件</t-button>
            <!-- <t-button @click="setLowerHeight">lower height</t-button> -->
            <!-- <t-button @click="setHigherHeight">higher height</t-button> -->
          </t-space>
          <t-table
            ref="refRelateContition"
            :columns="relateConditionColumns"
            :data="relateConditionData"
            row-key="fieldName"
            bordered
            resizable
            lazy-load
          >
            <template #fieldName="{ row }">
              <t-select v-model="row.fieldName" :clearable="true" filterable>
                <t-option
                  v-for="item in selectRelateTableColumns"
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

            <template #relateType="{ row }">
              <t-select v-model="row.relateType">
                <t-option key="field" label="数据字段" value="field" />
                <t-option key="value" label="值" value="value" />
              </t-select>
            </template>

            <template #relateValue="{ row }">
              <t-input v-if="row.relateType === 'value'" v-model="row.relateValue" />
              <span v-else>-</span>
            </template>
            <template #aliasName="{ row }">
              <t-select v-if="row.relateType === 'field'" v-model="row.aliasName" @change="getRelateAliasColumnList">
                <t-option
                  v-for="item in relateAliasNameList"
                  :key="item.value"
                  :name="item.label"
                  :value="item.value"
                  :label="item.label"
                />
              </t-select>
              <span v-else>-</span>
            </template>
            <template #relateFieldName="{ row }">
              <t-select v-if="row.relateType === 'field'" v-model="row.relateFieldName">
                <t-option
                  v-for="item in relateAliasColumnList"
                  :key="item.columnName"
                  :name="item.columnDesc"
                  :value="item.columnName"
                  :label="item.columnDesc + ' (' + item.columnName + ')'"
                />
              </t-select>
              <span v-else>-</span>
            </template>
            <template #op="row">
              <t-space :size="8">
                <t-link theme="primary" @click="deleterelateConditionData(row)">删除</t-link>
              </t-space>
            </template>
          </t-table>
        </t-space>
      </t-form>
    </t-drawer>
    <!-- #endregion 关联条件设置弹窗 -->

    <!-- #region 选择按钮-->
    <t-drawer
      v-model:visible="syncButtonSelectDrawerVisible"
      class="component-buttonForm-drawer"
      :z-index="3000"
      size="30%"
      placement="right"
      header="同步到按钮表单"
      :on-confirm="onSyncButtonFormConfirm"
      :close-btn="true"
    >
      <t-form>
        <t-space direction="vertical" :size="8">
          <t-space align="center" style="float: right">
            <t-button @click="addrelateConditionData">添加关联条件</t-button>
            <!-- <t-button @click="setLowerHeight">lower height</t-button> -->
            <!-- <t-button @click="setHigherHeight">higher height</t-button> -->
          </t-space>
        </t-space>
      </t-form>
    </t-drawer>
    <!-- #endregion 选择按钮 -->
  </t-dialog>
</template>

<script setup lang="tsx">
// #region import

import dayjs from 'dayjs';
import { cloneDeep, forEach } from 'lodash';
import { CheckCircleFilledIcon, LocationIcon, MoveIcon } from 'tdesign-icons-vue-next';
import { Data, FormRules, MessagePlugin, PrimaryTableCol, TableProps, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref, watch } from 'vue';

import { api } from '@/api/main';
import common from '@/utils/common';

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

const tableColumnsRef = ref(null);
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
    useType: 'both',
  },
  {
    label: '数字文本框',
    value: 't-input-number',
    useType: 'both',
  },
  {
    label: '开关',
    value: 't-switch',
    useType: 'both',
  },
  {
    label: '业务选择器',
    value: 'bcmp-select-business',
    useType: 'both',
  },
  {
    label: '系统字典选择器',
    value: 'bcmp-select-param',
    useType: 'both',
  },
  {
    label: '下拉框',
    value: 't-select',
    useType: 'both',
  },
  {
    label: '日期',
    value: 't-date-picker',
    useType: 'both',
  },
  {
    label: '日期时间',
    value: 't-datetime-picker',
    useType: 'both',
  },
  {
    label: '日期区间-日期',
    value: 't-date-range-picker',
    useType: 'search',
  },
  {
    label: '日期区间-日期时间',
    value: 't-date-range-picker-time',
    useType: 'search',
  },
  {
    label: '复选框',
    value: 't-checkbox-group',
    useType: 'both',
  },
  {
    label: '单选框',
    value: 't-radio-group',
    useType: 'both',
  },
]);

const sourceRelateType = ref('search');

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
    id: common.generateBigIntId().toString(),
    tableName: value,
    isDatabaseField: true,
    isAutoWidth: true,
    columnWidth: 100,
    align: 'center',
    isVisible: true,
    isLeftFixed: false,
    isRightFixed: false,
    canDelete: false,
    isHandAdd: false,
    field: item.columnName,
    label: item.columnDesc,
    component: 't-input',
    componentParam: '',
    componentSource: '',
    isMultiple: false,
    defaultValue: '',
    isKeyField: false,
    isRequired: false,
    isDisabled: false,
    verifyExp: '',
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

  // #region 设置默认按钮配置
  const currentButtonSetting = cloneDeep(defaultButtonSourceData);
  currentButtonSetting.find((item) => {
    return item.buttonCode === 'add';
  }).formColumnSetting = cloneDeep(tempColumns);

  currentButtonSetting.find((item) => {
    return item.buttonCode === 'edit';
  }).formColumnSetting = cloneDeep(tempColumns);
  buttonSourceData.value = currentButtonSetting;

  // #endregion

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

// #region 关联数据源配置相关

// #关联数据源-表格拖拽排序
const relateSourceData = ref([]);
const onSourceDragSort: TableProps['onDragSort'] = (params) => {
  console.log('表格列交换行', params);
  let seq = 1;
  const currentNewData = cloneDeep(params.newData);
  forEach(currentNewData, (item) => {
    item.seq = seq++;
  });
  relateSourceData.value = currentNewData;
};

// #表格列配置
const resouceColumns: PrimaryTableCol<TableRowData>[] = [
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
    colKey: 'datasourceType',
    title: '数据源类型',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'datasourceName',
    title: '数据源(表名/字典组)',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'relatedType',
    title: '关联类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'aliasName',
    title: '数据源别名',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    width: '100',
  },
];

// #关联数据源-数据表选择触发事件
const changeRelateTable = (row) => {
  console.log(row);
  // 更新同一行的aliasName
  row.aliasName = `${row.datasourceName}_${dayjs().format('YYYYMMDDHHmmss')}`;
};

// #关联数据源-添加行
const onAddRelateSource = () => {
  // 添加时，seq设置为已存在数据中最大seq再加1
  // 如果没有数据，则设置为1
  let seq = 1;
  if (relateSourceData.value && relateSourceData.value.length > 0) {
    seq = relateSourceData.value[relateSourceData.value.length - 1].seq + 1;
  } else {
    relateSourceData.value = [];
  }
  relateSourceData.value.push({
    id: common.generateBigIntId().toString(),
    seq,
    datasourceType: 'dataTable',
    datasourceName: '',
    relatedType: 'LEFT',
    aliasName: '',
    conditionData: [],
  });
};
// #关联数据源-删除行
const deleteRelateSourceData = ({ rowIndex }) => {
  relateSourceData.value.splice(rowIndex, 1);
};
const currentRelateSourceRow = ref(null);
// #数据源关联条件弹窗显示
const relateSourceConditionVisible = ref(false);
// #数据源关联条件-表格数据
const relateConditionData = ref([]);
// #数据源关联条件-添加关联条件
const addrelateConditionData = () => {
  relateConditionData.value.push({
    fieldName: '',
    operator: 'EQ',
    relateType: 'field',
    relateValue: '',
    aliasName: '',
    relateFieldName: '',
  });
};

// 关联数据源-关联条件表格设置
const relateConditionColumns: any = computed(() => [
  {
    title: '关联表字段',
    colKey: 'fieldName',
  },
  {
    title: '条件',
    colKey: 'operator',
  },
  {
    title: '关联类型',
    colKey: 'relateType',
  },
  {
    title: '关联值',
    colKey: 'relateValue',
  },
  {
    title: '目标数据源',
    colKey: 'aliasName',
  },
  {
    title: '目标字段',
    colKey: 'relateFieldName',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
  },
]);
// #数据源关联-条件设置-选择行
const selectRelateTableColumns = ref([]);
// #数据源关联-条件设置
const setReleteCondition = ({ row }) => {
  // console.log(row);
  currentRelateSourceRow.value = row;
  initRelateSourceCondition();
  relateSourceConditionVisible.value = true;
};
// #数据源关联-目标数据源别名列表
const relateAliasNameList = ref([]);
//  #数据源关联-加载当前行的条件配置
const initRelateSourceCondition = () => {
  console.log(currentRelateSourceRow.value);
  // 根据当前行的数据源表格，加载对应的列
  if (currentRelateSourceRow.value.datasourceType === 'dataTable') {
    const { datasourceName } = currentRelateSourceRow.value;
    selectRelateTableColumns.value = tableList.value.find((item) => item.tableName === datasourceName)?.columns;

    relateAliasNameList.value = [];
    // relateAliasNameList的列表，第一个是基础信息的数据源，
    relateAliasNameList.value.push({
      value: formData.datasourceName,
      label: formData.datasourceName,
    });
    // 其余的为当前行前面行的别名
    const headRows = relateSourceData.value.filter((item) => item.seq < currentRelateSourceRow.value.seq);

    forEach(headRows, (item) => {
      relateAliasNameList.value.push({
        value: item.aliasName,
        label: item.aliasName,
      });
    });
  }

  if (currentRelateSourceRow.value.conditionData && currentRelateSourceRow.value.conditionData.length > 0) {
    // // 如果没设置过数据源的，给设置默认值
    const { conditionData } = currentRelateSourceRow.value;
    // // 如果有设置过关联的，根据JSON读取后设置窗口里对应值
    relateConditionData.value = conditionData;

    // switch (selectedSourceType.value) {
    //   case 'customDict':
    //     dicData.value = sourceData.customDict.dicData;
    //     break;
    //   case 'dataTable':
    //     mapBusinessDomain.value = sourceData.dataTable.mapBusinessDomain;
    //     changeMapDomain().then(() => {
    //       mapTable.value = sourceData.dataTable.mapTable;
    //       changeTableMatch(mapTable.value);
    //     });
    //     conditionData.value = sourceData.dataTable.conditionData;
    //     tableQueryField.value = sourceData.dataTable.valueField;
    //     tableShowField.value = sourceData.dataTable.showField;
    //     break;
    //   default:
    //     break;
    // }
  } else {
    relateConditionData.value = [];
  }
};
const relateAliasColumnList = ref([]);
const getRelateAliasColumnList = (aliasName) => {
  // 先判断aliasName是否等于主数据的formData.datasourceName
  // 如果是，直接使用数据表列 列表
  if (aliasName === formData.datasourceName) {
    relateAliasColumnList.value = tableList.value.find((item) => item.tableName === aliasName)?.columns;
  } else {
    // 如果不是，通过aliasName查找表名，再加载列
    const tableName = relateSourceData.value.find((item) => item.aliasName === aliasName).datasourceName;
    relateAliasColumnList.value = tableList.value.find((item) => item.tableName === tableName)?.columns;
  }
};

//  #数据源关联-删除关联条件
const deleterelateConditionData = ({ rowIndex }) => {
  relateConditionData.value.splice(rowIndex, 1);
};

// # 数据源关联条件提交
const onRelateConditionConfirm = () => {
  // 先做校验
  let checkResult = true;
  // 如果选择了数据表匹配
  // mapTable不可为空
  // conditionData至少大于一行
  if (selectedSourceType.value === 'dataTable') {
    if (relateConditionData.value.length < 1) {
      MessagePlugin.warning('数据表匹配时，条件数据不可为空');
      checkResult = false;
    }
    // if (!tableQueryField.value) {
    //   MessagePlugin.warning('数据表匹配时，value字段不可为空');
    //   checkResult = false;
    // }
    // if (!tableShowField.value) {
    //   MessagePlugin.warning('数据表匹配时，label字段不可为空');
    //   checkResult = false;
    // }
    // conditionData.value.forEach((item) => {
    //   if (!item.operator) {
    //     MessagePlugin.warning('数据表匹配时，查询条件列【条件】不可为空');
    //     checkResult = false;
    //   }
    //   if (!item.field) {
    //     MessagePlugin.warning('数据表匹配时，查询条件列【字段】不可为空');
    //     checkResult = false;
    //   }
    //   if (!item.value) {
    //     MessagePlugin.warning('数据表匹配时，查询条件列【值】不可为空');
    //     checkResult = false;
    //   }
    // });
  }
  if (!checkResult) return;

  MessagePlugin.info('数据保存中...', 1000);

  // 根据currentSearchSelectRow的index 查询columnsDataWithoutDefault中匹配的行，使用find或者filter方法，将sourceData赋值到对应行的componentSource字段
  // searchData.value[
  //   searchData.value.findIndex((item) => item.seq === currentSearchSelectRow.value.seq)
  // ].componentSourceJson = JSON.stringify(sourceData);
  relateSourceData.value[
    relateSourceData.value.findIndex((item) => item.seq === currentRelateSourceRow.value.seq)
  ].conditionData = relateConditionData.value;

  relateSourceConditionVisible.value = false;
  MessagePlugin.info('数据保存成功!');
};

const handleButtonFormColumn = (tempColumns, type) => {
  let seq = 0;
  tempColumns = tempColumns.map((item) => ({
    ...item,
    tableName: formData.datasourceName,
    isDatabaseField: true,
    isAutoWidth: true,
    columnWidth: 100,
    align: 'center',
    isVisible: true,
    isLeftFixed: false,
    isRightFixed: false,
    canDelete: false,
    isHandAdd: false,
    field: item.columnName,
    label: item.columnDesc,
    component: 't-input',
    componentParam: '',
    componentSource: '',
    isMultiple: false,
    defaultValue: '',
    isKeyField: false,
    isRequired: false,
    isDisabled: false,
    verifyExp: '',
    seq: seq++,
  }));
  const buttonSetting = cloneDeep(buttonSourceData.value);
  const addButtonColumns = buttonSetting.find((item) => {
    return item.buttonCode === type;
  }).formColumnSetting;
  const withoutDefaultMap = addButtonColumns.reduce((acc, item) => ({ ...acc, [item.field]: item }), {});

  const defaultMap = tempColumns.reduce((acc, item) => ({ ...acc, [item.columnName]: item }), {});
  // 找出需要添加的项
  const itemsToAdd = Object.values(defaultMap).filter((item) => !withoutDefaultMap[item.columnName]);

  // 找出需要删除的项（这里假设不能直接修改原数组，所以创建新的数组）
  const itemsToRemove = addButtonColumns.filter((item) => !defaultMap[item.field]);

  // 添加缺失的项
  itemsToAdd.forEach((item) => {
    // 确保新添加的项也有canDelete属性，这里假设默认为true
    addButtonColumns.push(item);
  });

  // 从列表中移除多余的项
  addButtonColumns.splice(
    0,
    addButtonColumns.length,
    ...addButtonColumns.filter((item) => !itemsToRemove.includes(item)),
  );

  // 循环覆盖字段类型
  addButtonColumns.forEach((item) => {
    if (defaultMap[item.field]) {
      item.columnType = defaultMap[item.field].columnType;
    }
  });
  buttonSourceData.value.find((item) => {
    return item.buttonCode === type;
  }).formColumnSetting = cloneDeep(addButtonColumns);
};

// 重新加载字段,少的添加到列表,多的从列表删除
const refreshImportColumn = () => {
  // columnsData  是表格使用到的数据
  // tempColumns 是原表格数据
  // 需要比对columnsData列表中canDelete为false的数据与columnsData列表的是否一致
  // 如果缺少,就加入到columnsData列表,如果columnsData列表有,但是tempColumns列表没有,需要删除columnsData列表中对应项
  // 创建映射对象，用于快速查找
  currentSelectTale.value = tableList.value.find((item) => item.tableName === formData.datasourceName);
  const tempColumns = currentSelectTale.value?.columns;
  // 刷新表格配置
  handleTableColumn(tempColumns);
  // 刷新编辑表单配置
  handleButtonFormColumn(tempColumns, 'add');
  // 刷新编辑新增配置
  handleButtonFormColumn(tempColumns, 'edit');
};

const handleTableColumn = (tempColumns) => {
  const withoutDefaultMap = columnsData.value
    .filter((item) => !item.isHandAdd)
    .reduce((acc, item) => ({ ...acc, [item.columnName]: item }), {});
  const tableName = formData.datasourceName;

  const defaultMap = tempColumns.reduce((acc, item) => ({ ...acc, [item.columnName]: item }), {});
  // 找出需要添加的项
  const itemsToAdd = Object.values(defaultMap).filter((item) => !withoutDefaultMap[item.columnName]);

  // 找出需要删除的项（这里假设不能直接修改原数组，所以创建新的数组）
  const itemsToRemove = columnsData.value.filter((item) => item.isDatabaseField && !defaultMap[item.columnName]);

  // 添加缺失的项
  itemsToAdd.forEach((item) => {
    // 确保新添加的项也有canDelete属性，这里假设默认为true
    columnsData.value.push({
      ...item,
      tableName,
      isDatabaseField: true,
      isAutoWidth: true,
      columnWidth: 100,
      align: 'center',
      isVisible: true,
      isLeftFixed: false,
      isRightFixed: false,
      canDelete: false,
      isHandAdd: false,
      field: item.columnName,
      label: item.columnDesc,
      component: 't-input',
      componentParam: '',
      componentSource: '',
      isMultiple: false,
      defaultValue: '',
      isKeyField: false,
      isRequired: false,
      isDisabled: false,
      verifyExp: '',
      seq: columnsData.value.length + 1,
    });
  });

  // 从列表中移除多余的项
  columnsData.value.splice(
    0,
    columnsData.value.length,
    ...columnsData.value.filter((item) => !itemsToRemove.includes(item)),
  );

  // 循环覆盖字段类型
  columnsData.value.forEach((item) => {
    if (defaultMap[item.columnName]) {
      item.columnType = defaultMap[item.columnName].columnType;
    }
  });
};

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

  // 克隆数据以避免直接修改原数据
  const currentNewData = cloneDeep(params.newData);
  let seq = 1;
  // 使用map来保证每次迭代都有唯一且连续的序号
  forEach(currentNewData, (item) => {
    item.seq = seq++;
  });

  // 更新columnsData
  columnsData.value = currentNewData;
  // nextTick(() => {
  //   // 更新表格列配置
  //   tableColumnsRef.value.refreshTable();
  // });
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
    colKey: 'tableName',
    title: '数据源',
    align: 'center',
    width: '90',
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
  // {
  //   colKey: 'isDatabaseField',
  //   title: '是否表字段',
  //   align: 'center',
  //   width: '100',
  // },
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
    colKey: 'isLeftFixed',
    title: '是否左固定列',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isRightFixed',
    title: '是否右固定列',
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

// #表格列数据源-计算属性，根据关联数据源加载
const columnAliasNameList = computed(() => {
  // 如果没有关联数据源，则返回默认选项
  if (relateSourceData.value.length === 0) {
    return [
      {
        label: '无数据源',
        value: 'noTable',
      },
    ];
  }
  // 如果没有关联数据源，除了默认选项，还要加载关联数据源的aliasName
  return [
    {
      label: '无数据源',
      value: 'noTable',
    },
    ...relateSourceData.value.map((item) => {
      return {
        label: item.aliasName,
        value: item.aliasName,
      };
    }),
  ];
});

// 表格列配置-数据源选择变化
const columnHandTableChange = (row) => {
  // 加载当前行的数据源所对应的列的下拉列数据源
  const tableName = relateSourceData.value.find((item) => item.aliasName === row.tableName).datasourceName;

  row.columnAliasColumnList = tableList.value.find((item) => item.tableName === tableName)?.columns;
};
// #表格列配置-删除行
const onColumnDeleteClick = ({ rowIndex }) => {
  columnsData.value.splice(rowIndex, 1);
};
// 表格列配置-数据列选择变化
const columnHandColumnChange = (row) => {
  row.columnDesc = row.columnAliasColumnList.find((item) => item.columnName === row.columnName)?.columnDesc;
  row.columnType = row.columnAliasColumnList.find((item) => item.columnName === row.columnName)?.columnType;
};
// #表格列配置-添加行
const addColumnData = () => {
  // 添加时，seq设置为已存在数据中最大seq再加1
  // 如果没有数据，则设置为1
  let seq = 1;
  // 这里的seq要取最小的seq-1
  if (columnsData.value.length > 0) {
    seq = Math.min(...columnsData.value.map((item) => item.seq)) - 1;
  }
  // 这里是插入到第一个
  columnsData.value.unshift({
    id: common.generateBigIntId().toString(),
    seq,
    tableName: '',
    columnName: '',
    columnDesc: '',
    columnType: '',
    isDatabaseField: '',
    isVisible: true,
    isAutoWidth: true,
    columnWidth: 100,
    align: 'center',
    isLeftFixed: false,
    isRightFixed: false,
    isHandAdd: true,
  });
};

// #endregion

// #region 查询条件配置相关

//  #加载当前行的数据源配置-查询条件与按钮配置共用
const initSearchComponentSource = (type) => {
  IsInitComponentResource.value = true;
  console.log(currentSearchSelectRow.value);
  console.log(currentButtonSelectRow.value);
  if (
    (type === 'search' && currentSearchSelectRow.value.componentSource) ||
    (type === 'button' && currentButtonSelectRow.value.componentSource)
  ) {
    // // 如果没设置过数据源的，给设置默认值
    let sourceData = null;
    if (type === 'search') {
      sourceData = currentSearchSelectRow.value.componentSource;
    } else {
      sourceData = currentButtonSelectRow.value.componentSource;
    }

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
  if (sourceRelateType.value === 'search') {
    searchData.value[
      searchData.value.findIndex((item) => item.seq === currentSearchSelectRow.value.seq)
    ].componentSource = sourceData;
  }
  if (sourceRelateType.value === 'button') {
    currentSelectButton.value.formColumnSetting[
      currentSelectButton.value.formColumnSetting.findIndex((item) => item.seq === currentButtonSelectRow.value.seq)
    ].componentSource = sourceData;
  }
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
  {
    colKey: 'operator',
    title: '运算符',
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
// #查询条件表格-数据
const searchData = ref([]);

// #查询条件表格-排序控制
const onSearchDragSort: TableProps['onDragSort'] = (params) => {
  // console.log('交换行', params);
  let seq = 1;
  forEach(params.newData, (item) => {
    item.seq = seq++;
  });
  searchData.value = cloneDeep(params.newData);
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

// #查询条件表格-删除行
const deleteSearchData = ({ rowIndex }) => {
  searchData.value.splice(rowIndex, 1);
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

// 点击数据源按钮事件-查询条件
const onClickRelate = (row) => {
  sourceRelateType.value = 'search';
  // console.log(row);
  currentSearchSelectRow.value = row;
  initSearchComponentSource('search');
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
  const res = await api.domainParam.sqlTables(params);
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
// #查询条件表格-删除行
const deleteButtonRowData = ({ rowIndex }) => {
  currentSelectButton.value.formColumnSetting.splice(rowIndex, 1);
};
const defaultButtonSourceData = [
  {
    seq: 1,
    buttonCode: 'add',
    buttonName: '添加',
    isEnabled: true,
    isCustomButton: false,
    buttonPosition: 'tableHeader',
    buttonTheme: 'primary',
    needCheckSelectRow: false,
    actionType: 'form-add',
    formColumnSetting: [],
    deleteType: 'logical',
  },
  {
    seq: 2,
    buttonCode: 'edit',
    buttonName: '编辑',
    isEnabled: true,
    isCustomButton: false,
    buttonPosition: 'row',
    buttonTheme: 'primary',
    needCheckSelectRow: false,
    actionType: 'form-edit',
    formColumnSetting: [
      /* 省略，与编辑按钮相同或部分不同，取决于具体需求 */
    ],
    deleteType: '',
  },
  {
    seq: 3,
    buttonCode: 'delete',
    buttonName: '删除',
    isEnabled: true,
    isCustomButton: false,
    buttonPosition: 'row', // 假设同时适用于行内和表头，实际根据业务调整
    buttonTheme: 'danger',
    needCheckSelectRow: true,
    actionType: 'delete',
    formColumnSetting: [],
    deleteType: 'logical',
  },
  // :todo 导入的后续添加,导入的配置需要重新考虑下,是否继承在一起配置
  // {
  //   seq: 4,
  //   buttonCode: 'import',
  //   buttonName: '导入',
  //   isEnabled: true,
  //   isCustomButton: false,
  //   buttonPosition: 'tableHeader',
  //   buttonTheme: 'primary',
  //   needCheckSelectRow: false,
  //   actionType: 'import',
  //   formColumnSetting: [],
  //   deleteType: '',
  // },
];
// const columnTotal = ref(0);
const currButtonTab = ref('button');
// 先不加
// const enableButton = ref(false);

// #按钮表单列配置
const buttonFormSelectedRowKeys = ref([]);
const onSelectButtonFormChange = (value) => {
  buttonFormSelectedRowKeys.value = value;
};
const buttonFormColumns: PrimaryTableCol<TableRowData>[] = [
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
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'field',
    title: '字段',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'label',
    title: '标题',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'isVisible',
    title: '显示',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isDisabled',
    title: '禁用',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isKeyField',
    title: '唯一键',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isRequired',
    title: '必填',
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
    colKey: 'component',
    title: '控件',
    align: 'center',
    width: '150',
  },
  {
    colKey: 'componentParam',
    title: '控件参数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'componentSource',
    title: '数据源',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'isMultiple',
    title: '是否多选',
    align: 'center',
    width: '100',
  },

  {
    colKey: 'verifyExp',
    title: '验证正则',
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
const buttonSourceData = ref([]);

const currentButtonSelectRow: any = ref({});
// 点击数据源按钮事件-按钮事件
const onClickButtonRelate = (row) => {
  sourceRelateType.value = 'button';
  // console.log(row);
  currentButtonSelectRow.value = row;
  initSearchComponentSource('button');
  componentResourceVisible.value = true;
};
// #endregion
const currButtonName = ref('notSelect');
const currentSelectButton = ref({
  seq: 1,
  buttonCode: '',
  buttonName: '',
  isEnabled: true,
  isCustomButton: true,
  buttonPosition: 'line',
  buttonTheme: 'primary',
  actionType: 'form-custom',
  deleteType: '',
  formColumnSetting: [],
});
const onClickButton = (value: any) => {
  currButtonName.value = value.buttonName;
  currentSelectButton.value = value;
};
// #查询条件表格-排序控制
const onButtonDragSort: TableProps['onDragSort'] = (params) => {
  // console.log('交换行', params);
  let seq = 1;
  forEach(params.newData, (item) => {
    item.seq = seq++;
  });
  currentSelectButton.value.formColumnSetting = cloneDeep(params.newData);
};

// #基础信息表单验证规则
const buttonFormRules: FormRules<Data> = {
  // domainParamCode: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  // domainParamName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};

// #endregion

// #region 按钮按钮配置
const loading = ref(false);
const domainParamFromRef = ref();
const onClickAddTab = () => {
  // 添加按钮
  MessagePlugin.warning('自定义按钮功能暂未开放');
};
const syncButtonSelectDrawerVisible = ref(false);
const syncButtonForm = () => {
  // 先判断当前表格有没有选中项目
  if (buttonFormSelectedRowKeys.value.length < 1) {
    MessagePlugin.error('请先选择需要同步配置的行');
    return;
  }
  // todo: 后面添加逻辑,现版本 add复制到edit或者edit 复制到 add ,后续弹出窗口选择表单类型的按钮
  // syncButtonSelectDrawerVisible.value = true;
  const needCopyColumns = cloneDeep(
    currentSelectButton.value.formColumnSetting.filter((item) => {
      return buttonFormSelectedRowKeys.value.includes(item.id);
    }),
  );
  const waitHandleColumns = buttonSourceData.value.find((item) => {
    return item.buttonCode === (currentSelectButton.value.buttonCode === 'add' ? 'edit' : 'add');
  }).formColumnSetting;

  // 把选中的行,覆盖到add按钮表单配置中
  waitHandleColumns.forEach((item, index) => {
    const needCopyItem = needCopyColumns.find((needItem) => needItem.id === item.id);
    if (needCopyItem) {
      waitHandleColumns[index] = {
        ...item,
        ...cloneDeep(needCopyItem),
      };
    }
  });
  // 按seq重新排序
  waitHandleColumns.sort((a, b) => a.seq - b.seq);
  MessagePlugin.success('同步成功');
};

const onSyncButtonFormConfirm = () => {
  syncButtonSelectDrawerVisible.value = false;
  // 提交按钮
};
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
      datasourceSetting: relateSourceData.value,
      buttonSetting: buttonSourceData.value,
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

  // 更新relateSourceData
  relateSourceData.value = insetModel.domainParmSetting.datasourceSetting;

  // 更新buttonSourceData
  buttonSourceData.value = insetModel.domainParmSetting.buttonSetting;

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

  // 更新buttonSourceData
  buttonSourceData.value = [];
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

.buttonTab :deep(.t-tabs__content) {
  padding: 0;
}

.root {
  :deep(.t-list-item) {
    cursor: pointer;

    .t-list-item__meta-title {
      font-size: 14px;
    }

    .t-list-item__meta-description {
      font-size: 12px;
      color: var(--td-text-color-secondary);
    }

    &:not(.activeButton):hover {
      background-color: var(--td-bg-color-container-hover);
      font-weight: 700;
    }
  }
}

.buttonList {
  .activeButton {
    background-color: var(--td-brand-color-light);
    color: var(--td-brand-color);
    font-weight: 700;
  }
}
</style>
