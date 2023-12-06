<template>
  <div class="main-page">
    <!-- ################# 条码规则 表格数据 ###################### -->
    <div class="main-page-content">
      <cmp-query :opts="opts" :bool-enter="true" label-width="110px" @submit="onSelsectInput">
        <template #querySelect>
          <t-select v-model="ruleTabData.barcodeType">
            <t-option v-for="item in diaSelsect.list" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </template>
      </cmp-query>
      <t-col :span="12" flex="auto">
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="groupColumns"
          :table-data="ruleTabDataList.list"
          :total="ruleTabTotal"
          @row-click="onRowClick"
          @refresh="onRefresh"
        >
          <template #stateSwitch="{ row }">
            <t-switch
              :custom-value="[1, 0]"
              :value="row.state"
              :default-value="row.state"
              size="large"
              @change="(value) => onSwitchChange(row, value)"
            ></t-switch>
          </template>
          <template #operate>
            <t-space>
              <t-button theme="default" @click="onAddRuleData"> 新增 </t-button>
              <t-button theme="default"> 导入关联物料 </t-button>
            </t-space>
          </template>
          <template #op="{ row }">
            <t-link theme="primary" @click="onEditRow(row)"> 编辑 </t-link>
          </template>
        </cmp-table>
      </t-col>
    </div>
    <!-- ################# 物料分类 表格数据 ###################### -->
    <div class="main-page-content">
      <t-row justify="space-around">
        <t-col :span="12" flex="auto">
          <cmp-table
            ref="tableRef"
            v-model:pagination="materialPage"
            row-key="id"
            :table-column="personColumns"
            :table-data="materialTabDataList.list"
            :total="materialTotal"
            :selected-row-keys="selectedRowKeys"
            @select-change="rehandleSelectChange"
            @refresh="onTwoRefresh"
          >
            <template #button>
              <div class="left-operation-container">
                <bcmp-select-business
                  v-model="relatedMaterials.mitemCategoryId"
                  :is-multiple="false"
                  type="mitemCategory"
                ></bcmp-select-business>
              </div>
              <div class="left-operation-container">
                <bcmp-select-business
                  v-model="relatedMaterials.mitemId"
                  :is-multiple="false"
                  type="mitem"
                ></bcmp-select-business>
              </div>
              <div><t-button theme="default" @click="onRelatedMaterials"> 关联物料 </t-button></div>
              <div>
                <t-popconfirm theme="default" content="确认删除吗" @confirm="onDeleteBatches">
                  <t-button theme="default"> 删除 </t-button>
                </t-popconfirm>
              </div>
            </template>
          </cmp-table>
        </t-col>
      </t-row>
    </div>
  </div>
  <!-- #处理组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle" width="70%">
    <t-form ref="formRef" :data="ruleTabData" :rules="rules" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-row justify="space-between">
        <t-col :span="5">
          <t-form-item label="规则编码" name="ruleCode">
            <t-input v-model="ruleTabData.ruleCode" :disabled="groupDisabled"></t-input>
          </t-form-item>
        </t-col>
        <!-- 第 2️⃣ 行数据 -->
        <t-col :span="5">
          <t-form-item label="规则名称" name="ruleName">
            <t-input v-model="ruleTabData.ruleName"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="2"></t-col>
      </t-row>
      <!-- 第 3️⃣ 行数据 -->
      <t-row justify="space-between" style="margin-top: 30px">
        <t-col :span="5">
          <t-form-item label="规则类型" name="barcodeType">
            <t-select v-model="ruleTabData.barcodeType">
              <t-option v-for="item in diaSelsect.list" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <!-- 第 4️⃣ 行数据 -->
        <t-col :span="5">
          <t-form-item label="规则描述" name="ruleDesc">
            <t-input v-model="ruleTabData.ruleDesc"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="2">
          <t-radio v-model="computedState" allow-uncheck> 启用 </t-radio>
        </t-col>
      </t-row>
      <!-- 第 5️⃣ 行数据 -->
      <t-card title="条码规则" :bordered="true" hover-shadow :style="{ width: '100%' }">
        <t-row justify="space-around">
          <t-col :span="5">
            <t-space>
              <t-space>
                <t-input-adornment prepend="搜索:">
                  <t-input v-model="filterText" style="width: 300px" @change="onInput" />
                </t-input-adornment>
              </t-space>
            </t-space>
            <!-- <t-tree
              ref="treeRef"
              :keys="keyList"
              :data="ruleTreeDataList.list"
              hover
              activable
              expand-all
              :height="300"
              :transition="true"
              expand-on-click-node
              :icon="true"
              :filter="treeDim.demo1Filter"
              :scroll="{
                rowHeight: 34,
                bufferSize: 10,
                threshold: 10,
                type: 'virtual',
              }"
              @click="treeClick"
            ></t-tree> -->
            <t-tree
              ref="treeRef"
              v-model:actived="treeActiveKey"
              :keys="keyList"
              :data="ruleTreeDataList.list"
              hover
              :expand-on-click-node="false"
              :filter="filterByText"
              activable
              :scroll="{
                rowHeight: 34,
                bufferSize: 10,
                threshold: 10,
                type: 'virtual',
              }"
              @click="treeClick"
            />
          </t-col>
          <t-col :span="5">
            <h3>编码规则</h3>
            <t-form-item name="ruleExpression" label-width="10px">
              <t-textarea
                v-model="ruleTabData.ruleExpression"
                placeholder="请添加规则"
                name="description"
                :autosize="{ minRows: 3, maxRows: 5 }"
              />
            </t-form-item>
            <t-row justify="space-between">
              <t-col :span="5"><t-button>条码规则预览</t-button></t-col>
              <t-col :span="7"><t-input placeholder=""></t-input></t-col>
            </t-row>
          </t-col>
        </t-row>
      </t-card>
      <t-col :span="11" class="align-right">
        <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
        <t-button theme="primary" type="submit">保存</t-button>
      </t-col>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref, watch } from 'vue';

import { api } from '@/api/control';
import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const diaSelsect = reactive({ list: [] }); // 下拉框数据
const { pageUI } = usePage(); // 分页工具
const { pageUI: materialPage } = usePage();
const formVisible = ref(false); // 控制 处理组dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const groupDisabled = ref(false); // 处理组表单禁用开关
const submitFalg = ref(false);
// $$$$ 树组件数据
const keyList = ref({ label: 'segmentName', children: 'rules' }); // 树状结构定义
const filterByText = ref(); // 树组件绑定的搜索文本
const filterText = ref(); // 树组件搜索框绑定的文本
const treeRef = ref(); // 树组件实例
const treeActiveKey = ref([]); // 树组件点击变化数组
const currActiveData = ref({}); // ????
// 编辑回填 ID
const incidentID = ref('');
// $处理组 表格数据
const ruleTabDataList = reactive({ list: [] });
const ruleTabTotal = ref(null);
// $人员 表格数据
const materialTabDataList = reactive({ list: [] });
const materialTotal = ref(null);
// dialog 弹框数据
const ruleTabData = ref({
  ruleCode: '', // 规则编码
  ruleName: '', // 规则名称
  barcodeType: '', // 条码类型
  ruleDesc: '', //  规则描述
  ruleExpression: '', // 条码规则表达式
  state: 1, // 启用禁用
});
// 关联物料数据
const relatedMaterials = ref({
  barcodeRuleId: '', // 上表格ID
  mitemId: '', // 物料 ID
  mitemCategoryId: '', // 物料分类 ID
});
// # 条码规则刷新按钮
const onRefresh = async () => {
  await onBarcodeRuleTabData(); // 获取 条码规则表格 数据
};
// # 物料编码刷新按钮
const onTwoRefresh = async () => {
  await onMaterialTabData(); // 获取 物料编码 表格数据
};
// ！批量删除数组
const rehandleSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
};
// ！批量删除
const onDeleteBatches = async () => {
  await api.barcodeRuleInMitem.removeMitemBatch({
    ids: selectedRowKeys.value,
    ruleId: personID.value,
  });
  if (materialTabDataList.list.length <= 1 && materialPage.value.page > 0) {
    materialPage.value.page--;
  }
  await onMaterialTabData();
  MessagePlugin.success('批量删除成功');
};
// #监听禁用启用
const computedState = computed({
  get: () => ruleTabData.value.state === 1,
  set: (newValue) => {
    ruleTabData.value.state = newValue ? 1 : 0;
  },
});
// # 树组件模糊事件
const onInput = () => {
  filterByText.value = filterText.value
    ? (node: { label: string | any[] }) => {
        return node.label.indexOf(filterText.value) >= 0;
      }
    : null;
};
// #监听树组件点击事件
watch(treeActiveKey, () => {
  if (treeRef?.value && !isEmpty(treeActiveKey.value)) {
    const activeNode = treeRef.value.getTreeData(treeActiveKey.value[0]);
    // 使用数组解构来获取数组的第一个元素
    const [firstNode] = activeNode;
    currActiveData.value = firstNode;
    // data.value = activeNode[0].children?.length > 0 ? activeNode[0].children : activeNode;
  }
});
// #  获取 树状结构 数据
const ongetRuleTreeSegment = async () => {
  const res = await api.barcodeRuleInMitem.getRuleSegment();
  ruleTreeDataList.list = res.list;
  console.log('🚀 ~ file: index.vue:375 ~ ongetRuleTreeSegment ~ res:', res);
};
// #树节点 点击事件
const treeClick = ({ node }) => {
  if (node['__tdesign_tree-node__'].parent) {
    // 获取要拼接的字符串
    const { segmentFormat } = node['__tdesign_tree-node__'].data;
    // 将其拼接到 ruleTabData.value.ruleExpression 中
    ruleTabData.value.ruleExpression += segmentFormat;
  }
};
// 树组件数
const ruleTreeDataList = reactive({ list: [] });
// #### 条码规则 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '90',
  },
  {
    colKey: 'ruleCode',
    title: '规则编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'ruleName',
    title: '规则名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'ruleDesc',
    title: '规则描述',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'barcodeTypeName',
    title: '条码类型',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'state',
    title: '状态',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
];
// ####物料分类 表头
const personColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'categoryCode',
    title: '分类编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'categoryName',
    title: '分类名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDesc',
    title: '物料描述',
    align: 'center',
    width: '130',
  },
];
// #表单定义规则
const rules: FormRules = {
  ruleCode: [{ required: true, message: '规则编码不能为空', trigger: 'blur' }],
  ruleName: [{ required: true, message: '规则名称不能为空', trigger: 'blur' }],
  barcodeType: [{ required: true, message: '规则类型不能为空', trigger: 'change' }],
  ruleExpression: [{ required: true, message: '编码规则不能为空', trigger: 'change' }],
};
// #dialog下拉框数据
const onGetDialogSelect = async () => {
  const res = await apiMain.param.getListByGroupCode({ parmGroupCode: 'BARCODE_TYPE' });
  diaSelsect.list = res;
};
// ################ 初始渲染
onMounted(async () => {
  await onBarcodeRuleTabData(); // 获取 条码规则表格 数据
  await onMaterialTabData(); // 获取 物料编码 表格数据
  await ongetRuleTreeSegment(); // 获取树状数据
  await onGetDialogSelect(); // 获取dia下拉框数据
});

// #搜索
const opts = computed(() => {
  return {
    ruleNameCode: { label: '规则名称/编码', comp: 't-input', event: 'input', defaultval: '' },
    materialNameCode: { label: '物料名称/编码', comp: 't-input', event: 'input', defaultval: '' },
    barCodeType: { label: '条码类型', event: 'input', defaultval: '', slotName: 'querySelect' },
  };
});
// #上侧搜索提交事件
const onSelsectInput = async (data: any) => {
  pageUI.value.page = 1;
  const res = await api.barcodeRuleInMitem.getBarcodeRuleList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    ruleKeyword: data.ruleNameCode, // 规则模糊查询关键词
    mitemKeyword: data.materialNameCode, // 规则模糊查询关键词
    selectKeyword: data.barCodeType, // 下拉模糊查询关键词
  });
  ruleTabDataList.list = res.list;
  ruleTabTotal.value = res.total;
};

// #获取 条码规则 表格数据
const onBarcodeRuleTabData = async () => {
  const res = await api.barcodeRuleInMitem.getBarcodeRuleList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  ruleTabDataList.list = res.list;
  ruleTabTotal.value = res.total;
};

// # 获取 物料分类 表格数据
const onMaterialTabData = async () => {
  const res = await api.barcodeRuleInMitem.getMitemList({
    pageNum: materialPage.value.page,
    pageSize: materialPage.value.rows,
    ruleId: personID.value,
  });
  materialTabDataList.list = res.list;
  materialTotal.value = res.total;
};

// # Switch 状态获取
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  await api.barcodeRuleInMitem.modifyBarcodeRule({
    state: isValue,
    ruleName: row.ruleName,
    barcodeType: row.barcodeType,
    ruleExpression: row.ruleExpression,
    id: row.id,
  });
  await onBarcodeRuleTabData();
  MessagePlugin.success('操作成功');
};

// #条码规则 表格 行点击事件
const personID = ref(null); // 点击表格行 获取人员id
const onRowClick = async ({ row }) => {
  personID.value = null; // 点击前先清空
  personID.value = row.id;
  relatedMaterials.value.barcodeRuleId = row.id;
  await onMaterialTabData(); // 获取 物料分类 数据
};

// #添加按钮点击事件
const onAddRuleData = () => {
  formRef.value.reset({ type: 'empty' });
  ruleTabData.value.state = 1;
  groupDisabled.value = false; // 关闭表单禁用
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = '条码规则配置新增';
};

// #  新增 条码规则
const onAddrule = async () => {
  await api.barcodeRuleInMitem.addBarcodeRule(ruleTabData.value);
  await onBarcodeRuleTabData();
  MessagePlugin.success('新增成功');
};

// #编码规则 编辑 按钮点击
const onEditRow = (row: any) => {
  console.log('🚀 ~ file: index.vue:436 ~ onEditRow ~ row:', row);
  ruleTabData.value.ruleCode = row.ruleCode;
  ruleTabData.value.ruleName = row.ruleName;
  ruleTabData.value.barcodeType = row.barcodeType;
  ruleTabData.value.ruleDesc = row.ruleDesc;
  ruleTabData.value.ruleExpression = row.ruleExpression;
  ruleTabData.value.state = row.state;
  incidentID.value = row.id; // 编辑回填 ID
  groupDisabled.value = true; // 启用表单禁用
  submitFalg.value = false; // 编辑为 false
  formVisible.value = true;
  diaLogTitle.value = '条码规则配置编辑';
};

// # 编码规则 编辑 请求
const onEditrule = async () => {
  await api.barcodeRuleInMitem.modifyBarcodeRule({ ...ruleTabData.value, id: incidentID.value });
  await onBarcodeRuleTabData();
  MessagePlugin.success('编辑成功');
};

// #关联物料
const onRelatedMaterials = async () => {
  const { barcodeRuleId, mitemId, mitemCategoryId } = relatedMaterials.value;

  // 检查是否所有的属性都不为空
  if (!mitemId || !mitemCategoryId) {
    MessagePlugin.error('参数不能为空');
  } else if (!barcodeRuleId) {
    MessagePlugin.error('请点击规则条码后再尝试');
  } else {
    await api.barcodeRuleInMitem.addBarcodeRuleMitem(relatedMaterials.value);
    await onMaterialTabData(); // 获取 物料编码 表格数据
    MessagePlugin.success('关联成功');
  }
};
// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddrule(); // 新增请求
    } else {
      await onEditrule(); // 编辑请求
    }
    formVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
