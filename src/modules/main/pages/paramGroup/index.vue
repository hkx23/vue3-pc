<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-row>
        <t-col flex="auto">
          <t-tabs v-model="selectModule" @change="onChangeTab">
            <t-tab-panel
              v-for="(item, index) in tabModuleList"
              :key="index"
              :value="item.moduleCode"
              :label="item.moduleName"
            >
            </t-tab-panel>
          </t-tabs>
        </t-col>
        <t-col style="text-align: end; line-height: 32px" flex="340px"
          >{{ SelectNode.label }}:{{ SelectNode.paramGroupDesc }}</t-col
        >
      </cmp-row>
    </cmp-card>
    <cmp-row>
      <cmp-card flex="300px">
        <t-space direction="vertical" :size="8">
          <t-space>
            <t-input-adornment prepend="过滤:">
              <t-input v-model="filterText" @change="onTreeQueryChange" />
            </t-input-adornment>
          </t-space>
          <t-tree :data="dataTree" :filter="filterByText" line hover expand-all activable @click="onTreeClick" />
        </t-space>
      </cmp-card>
      <cmp-card flex="auto">
        <t-space direction="vertical" :size="8" style="width: 100%">
          <t-row justify="space-between">
            <t-col>
              <div>
                <t-input
                  v-model="keyword"
                  label="参数编码："
                  placeholder="请输入参数编号或参数值"
                  clearable
                  @change="onChangeKeyword"
                />
              </div>
            </t-col>
          </t-row>
          <div class="table-container">
            <t-row justify="space-between">
              <t-col :span="0.5">
                <div>全局</div>
              </t-col>
              <t-col :span="2">
                <div>参数编码</div>
              </t-col>
              <t-col :span="2">
                <div>参数名称</div>
              </t-col>
              <t-col :span="2">
                <div>参数值</div>
              </t-col>
              <t-col :span="2">
                <div>描述</div>
              </t-col>
              <t-col :span="1">
                <div>顺序</div>
              </t-col>
              <t-col :span="1">
                <div></div>
              </t-col>
            </t-row>
            <vue-draggable
              ref="el"
              v-model="dataTable"
              :handle="'.table-row'"
              :disabled="false"
              @start="ondragStart"
              @end="ondragEnd"
            >
              <t-row v-for="(item, index) in dataTable" :key="index" class="table-row" justify="space-between">
                <t-col :span="0.5" class="table-row-checkbox">
                  <t-checkbox v-model="item.isGlobal" :disabled="SelectNode.isSys == '1'"> </t-checkbox>
                </t-col>
                <t-col :span="2">
                  <t-input v-model="item.paramCode" :disabled="SelectNode.isSys == '1'" />
                </t-col>
                <t-col :span="2">
                  <t-input v-model="item.paramName" />
                </t-col>
                <t-col :span="2">
                  <t-input
                    v-if="SelectNode.paramDataType == 'VARCHAR'"
                    v-model="item.paramValue"
                    placeholder="请输入内容"
                  />

                  <t-input-number
                    v-else-if="SelectNode.paramDataType == 'INT'"
                    v-model="item.paramValue"
                    theme="column"
                    :decimal-places="0"
                    placeholder="请输入整数"
                  />

                  <t-input-number
                    v-else-if="SelectNode.paramDataType == 'NUMBER'"
                    v-model="item.paramValue"
                    theme="normal"
                    :decimal-places="6"
                    placeholder="请输入数字"
                  />

                  <t-select
                    v-else-if="SelectNode.paramDataType == 'BOOL'"
                    v-model="item.paramValue"
                    placeholder="请选择"
                  >
                    <t-option v-for="(bool, i) in boolList" :key="i" :value="bool.value" :label="bool.label">
                      {{ bool.label }}
                    </t-option>
                  </t-select>

                  <t-input v-else v-model="item.paramValue" placeholder="请输入内容" />
                </t-col>
                <t-col :span="2">
                  <t-input v-model="item.paramDesc" placeholder="请输入内容" />
                </t-col>
                <t-col :span="1" class="param-input-seq">
                  <t-input-number v-model="item.seq" :decimal-places="0" theme="normal" placeholder="请输入" />
                </t-col>
                <t-col :span="1">
                  <div>
                    <t-space>
                      <t-icon v-if="SelectNode.isSys == '0'" name="add" @click="onAddParam(item)" />
                      <t-icon v-if="SelectNode.isSys == '0'" name="delete" @click="handleClickDelete(item, index)" />
                    </t-space>
                  </div>
                </t-col>
              </t-row>
            </vue-draggable>
          </div>
          <t-row v-show="totaldataTable && totaldataTable.length > 0" class="button-save" justify="space-between">
            <t-button theme="primary" @click="onSave">保存</t-button>
          </t-row></t-space
        >
      </cmp-card>
    </cmp-row>
  </cmp-container>
  <t-dialog
    v-model:visible="onShowDeleteConfirmVisible"
    header="确认删除"
    mode="modal"
    draggable
    :body="onDeleteConfirmBody"
    :on-cancel="onDeleteCancel"
    :close-on-overlay-click="false"
    @confirm="onDeleteConfirm"
  >
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

import { api, Param, ParamInfoDTO } from '@/api/main';

// 页签
const tabModuleList = ref([]);

// 树
const selectModule = ref('');
const dataTree = ref([]);
const SelectNode = ref({ value: '', label: '', paramGroupDesc: '', id: '', isSys: '', paramDataType: '' }); // 选中的树节点
const filterText = ref('');
const filterByText = ref(null);

// 表格
const totaldataTable = ref<Param[]>();
const dataTable = ref<[]>() as any;
const deleteIdx = ref(-1);

// 表格分页设置
const pagination = ref({ defaultPageSize: 20, total: 0, defaultCurrent: 1, showJumper: true });
const dataLoading = ref(false);
const keyword = ref('');
// const selectedRowKeys = ref([]);

const onShowDeleteConfirmVisible = ref(false); // 是否显示对话框
const boolList = ref([
  { label: '是', value: 'true' },
  { label: '否', value: 'false' },
]);

// 查询业务领域
const fetchDomain = () => {
  return new Promise((resolve, reject) => {
    try {
      api.paramGroup.getdomainlist().then((data: any) => {
        tabModuleList.value = data.list.map((item) => ({
          moduleCode: item.paramDomain,
          moduleName: item.paramDomain,
        }));
        setFirstSelcectTab(tabModuleList.value);
        resolve(data);
      });
    } catch (e) {
      console.log(e);
      reject();
    } finally {
      dataLoading.value = false;
    }
  });
};

// 切换模块
const onChangeTab = () => {
  clearTable();
  fetchTree();
};

// #region 刷新树
const fetchTree = async () => {
  if (selectModule.value) {
    dataLoading.value = true;
    try {
      const data = (await api.paramGroup.getlist({
        keyword: '',
        pagenum: 1,
        pagesize: 999999,
        paramDomain: selectModule.value.toString(),
      })) as any;
      dataTree.value = data.list.map((item) => ({
        value: item.id,
        label: item.paramGroupName,
        id: item.id,
        isSys: item.isSys,
        paramDataType: item.paramDataType,
        paramGroupDesc: item.paramGroupDesc,
        paramGroupName: item.paramGroupName,
        actived: false,
      }));
      if (dataTree.value) {
        setFirstSelcectNode(dataTree.value);
        fetchTable();
        dataTree.value[0].actived = true;
      }
    } catch (e) {
      console.log(e);
    } finally {
      dataLoading.value = false;
    }
  }
};
const onTreeClick = (context: any) => {
  console.info('onClick', context);
  const { node } = context;
  clearTable();
  const filterData = dataTree.value.filter((item: { [x: string]: string | any[] }) => {
    if (item.id === node.value) {
      return true;
    }
    return false;
  });
  // 根据选中节点存储起来
  setFirstSelcectNode(filterData);
  fetchTable();
};

// 设置默认页签第一个节点赋值
const setFirstSelcectTab = (moduleData: any) => {
  if (moduleData) {
    selectModule.value = moduleData[0].moduleCode;
  }
};

// 设置默认树第一个节点赋值
const setFirstSelcectNode = (treeData: any) => {
  if (treeData) {
    SelectNode.value.value = treeData[0].id;
    SelectNode.value.label = treeData[0].paramGroupName;
    SelectNode.value.isSys = treeData[0].isSys.toString();
    SelectNode.value.id = treeData[0].id;
    SelectNode.value.paramDataType = treeData[0].paramDataType;
    SelectNode.value.paramGroupDesc = treeData[0].paramGroupDesc;
  }
};

// 系统字典组查询
const onTreeQueryChange = (state) => {
  console.info('on input:', state);
  if (filterText.value) {
    filterByText.value = (node) => {
      const label = node?.data?.label || '';
      const rs = label.indexOf(filterText.value) >= 0;
      return rs;
    };
  } else {
    filterByText.value = null;
  }
};

// 表格方法
const fetchTable = async () => {
  dataLoading.value = true;
  if (SelectNode.value.value) {
    try {
      const data = (await api.param.getlist({
        keyword: keyword.value,
        pagenum: 1,
        pagesize: 999999,
        parmGroupId: SelectNode.value.value.toString(),
      })) as any;
      if (data.list && data.list.length > 0) {
        dataTable.value = data.list;
      } else if (SelectNode.value.isSys === '0') {
        onAddParam(null);
      }
      sortTable();
      pagination.value = { ...pagination.value, total: data.total };
    } catch (e) {
      console.log(e);
    } finally {
      dataLoading.value = false;
    }
  }
};

const onDeleteConfirm = async () => {
  dataLoading.value = true;
  try {
    dataTable.value.splice(deleteIdx.value, 1);
    sortTable();
    onShowDeleteConfirmVisible.value = false;
  } catch (e) {
    // console.log(e);
  } finally {
    dataLoading.value = false;
  }
};
const onDeleteConfirmBody = () => {
  if (deleteIdx.value > -1) {
    return `是否删除当前行信息？`;
  }
  return '';
};
const onDeleteCancel = () => {
  deleteIdx.value = -1;
};

// 新增按钮
const onAddParam = (item) => {
  const obj = ref<Param>({
    id: '',
    paramGroupId: SelectNode.value.id,
    paramCode: '',
    paramName: '',
    paramValue: '',
    paramDesc: '',
  });
  if (item) {
    dataTable.value.splice(item.seq, 0, obj.value);
  } else {
    dataTable.value = [];
    dataTable.value.push(obj.value);
  }
  sortTable();
};

// 删除按钮
const handleClickDelete = (value: any, index: any) => {
  deleteIdx.value = index;
  onShowDeleteConfirmVisible.value = true;
};

const ondragStart = () => {
  console.log(`开始拖拽`);
};

const ondragEnd = () => {
  console.log(`拖拽结束`);
  sortTable();
};

const sortTable = () => {
  const rowIndex = ref(1);
  if (dataTable.value) {
    dataTable.value.forEach((element) => {
      // element.seq = rowIndex.value; 暂时采用手动输入顺序的方式，因此代码先注释
      element.oid = element.isGlobal === true ? '0' : ''; // 0表示全局
      rowIndex.value++;
    });
  }
  totaldataTable.value = dataTable.value;
};

// 查询参数编码
const onChangeKeyword = () => {
  if (keyword.value) {
    const queryKey = ref(keyword.value.toString());
    if (SelectNode.value.paramDataType === 'BOOL') {
      if (queryKey.value === '是') {
        queryKey.value = 'true';
      } else if (queryKey.value === '否') {
        queryKey.value = 'false';
      }
    }
    dataTable.value = totaldataTable.value.filter((row) => {
      if (row.paramCode) {
        if (row.paramCode.indexOf(queryKey.value.toString()) >= 0) {
          return row;
        }
      }
      if (row.paramName) {
        if (row.paramName.indexOf(queryKey.value.toString()) >= 0) {
          return row;
        }
      }
      if (row.paramValue) {
        if (row.paramValue.indexOf(queryKey.value.toString()) >= 0) {
          return row;
        }
      }
      return null;
    });
  } else {
    dataTable.value = totaldataTable.value;
  }
};

// 清空表格
const clearTable = () => {
  dataTable.value = null;
  totaldataTable.value = null;
  sortTable();
};

// 保存
const onSave = async () => {
  const isEmpty = ref(false);
  if (totaldataTable.value.length === 0) {
    MessagePlugin.error('无数据可保存，请检查');
  } else {
    totaldataTable.value.forEach((item) => {
      if (item.paramCode === '' || item.paramCode === null) {
        isEmpty.value = true;
      }
      if (item.paramName === '' || item.paramName === null) {
        isEmpty.value = true;
      }
      if (item.paramValue === '' || item.paramValue === null) {
        isEmpty.value = true;
      }
    });
    if (isEmpty.value) {
      MessagePlugin.error('存在参数编码或参数名称或参数值为空的数据，请检查');
    } else {
      sortTable();
      dataLoading.value = true;
      let postData: ParamInfoDTO = {};
      postData = {
        details: totaldataTable.value,
        paramGroupId: SelectNode.value.id,
      };
      (await api.param.save(postData)) as any;
      MessagePlugin.success('保存成功');
      fetchTable();
      dataLoading.value = false;
    }
  }
};

onMounted(() => {
  fetchDomain().then(() => {
    fetchTree();
  });
});
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
  width: 100%;

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
}

.list-tree-operator {
  width: 280px;
  float: left;
  // padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-common-table-right {
  margin-left: 20px;
}

.form-container-row {
  margin-top: 20px;
}

.table-row {
  margin: 8px;
  align-items: flex-end;

  .t-col {
    margin: 1px;
  }
}

.param-group-header-desc {
  margin-top: 10px;
}

.button-save {
  margin-top: 0;
}

.param-input-seq {
  /deep/ .t-input-number {
    width: 54px !important;
  }
}

.table-row-checkbox {
  padding-bottom: 2px;
}
</style>
