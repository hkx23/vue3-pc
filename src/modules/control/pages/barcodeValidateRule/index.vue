<!-- 条码验证规则 -->
<template>
  <cmp-container :full="true">
    <cmp-card class="full-tab">
      <t-tabs v-model="tabValue" @change="tabChange">
        <!-- $$$$$$$$$$$    文本验证分组  $$$$$$$$$$$$$$-->
        <t-tab-panel :value="0" label="文本验证分组" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="opts" @submit="onInput">
                  <template #cellType>
                    <t-select v-model="barcodeData.barcodeType" label="条码类型">
                      <t-option v-for="item in BarcodeTypeArr" :key="item.id" :label="item.label" :value="item.value" />
                    </t-select>
                  </template>
                  <template #cellMaterial>
                    <bcmp-select-business
                      v-model="barcodeData.mitemCategoryId"
                      :disabled="radioValue"
                      :is-multiple="false"
                      type="mitemCategory"
                      label="物料分类"
                    ></bcmp-select-business>
                  </template>
                </cmp-query>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16">
                <cmp-table
                  ref="tableRefForm"
                  v-model:pagination="pageUI"
                  row-key="id"
                  :fixed-height="true"
                  :table-column="columnsText"
                  :table-data="textTabData.list"
                  :total="totalText"
                  @refresh="onLeftFetchData"
                >
                  <template #actionSlot="{ row }">
                    <t-link theme="primary" style="margin-right: 10px" @click="onTextEditRow(row)"> 编辑 </t-link>
                    <t-popconfirm theme="default" content="确认删除吗" @confirm="onTextDelConfirm(row)">
                      <t-link theme="primary"> 删除 </t-link>
                    </t-popconfirm>
                  </template>
                  <template #button>
                    <t-space>
                      <t-button theme="primary" @click="onAddRuleData"> 新增 </t-button>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <!-- ###############    关键件验证分组   ######## -->
        <t-tab-panel :value="1" label="关键件验证分组" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="opts" @submit="onInput">
                  <template #cellType>
                    <t-select v-model="barcodeData.barcodeType" label="条码类型">
                      <t-option v-for="item in BarcodeTypeArr" :key="item.id" :label="item.label" :value="item.value" />
                    </t-select>
                  </template>
                  <template #cellMaterial>
                    <bcmp-select-business
                      v-model="barcodeData.mitemCategoryId"
                      :disabled="radioValue"
                      :is-multiple="false"
                      type="mitemCategory"
                      label="物料分类"
                    ></bcmp-select-business>
                  </template>
                </cmp-query>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16">
                <cmp-table
                  ref="tableRef"
                  v-model:pagination="pageUITwo"
                  row-key="id"
                  :fixed-height="true"
                  :table-column="columnsKey"
                  :table-data="keyTabData.list"
                  :total="totalKey"
                  @refresh="onRightFetchData"
                >
                  <template #actionSlot="{ row }">
                    <t-link theme="primary" style="margin-right: 10px" @click="onKeyEditRow(row)"> 编辑 </t-link>
                    <t-popconfirm theme="default" content="确认删除吗" @confirm="onKeyDelConfirm(row)">
                      <t-link theme="primary"> 删除 </t-link>
                    </t-popconfirm>
                  </template>
                  <template #button>
                    <t-space>
                      <t-button theme="primary" @click="onAddRuleData"> 新增 </t-button>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
  <!-- dialog 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :cancel-btn="null"
    :confirm-btn="null"
    :header="diaLogTitle"
    top="60px"
    width="750px"
    @close="onSecondaryReset"
  >
    <t-form ref="formRef" :rules="rules" :data="barcodeData" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-row :gutter="[32, 16]">
        <t-col :span="6">
          <t-form-item label="编码规则" name="ruleCode">
            <t-input v-model="barcodeData.ruleCode"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="规则名称" name="ruleName">
            <t-input v-model="barcodeData.ruleName"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="优先级" name="pri">
            <t-input-number v-model="barcodeData.pri" theme="column" style="width: 100%"></t-input-number>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="验证分组" name="barcodeValidateGroup">
            <t-select v-model="barcodeData.barcodeValidateGroup">
              <t-option v-for="item in ValidationGroupsArr" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <!-- 第 3️⃣ 行数据 -->
        <t-col v-if="barcodeData?.barcodeValidateGroup === 'SCANTEXT'" :span="12">
          <t-form-item label="条码类型" name="barcodeType">
            <t-select v-model="barcodeData.barcodeType">
              <t-option v-for="item in BarcodeTypeArr" :key="item.id" :label="item.label" :value="item.value" />
            </t-select>
          </t-form-item>
        </t-col>
        <t-col v-if="barcodeData?.barcodeValidateGroup === 'KEYPART'" :span="12">
          <t-form-item label="关联纬度" name="incidentName">
            <t-radio-group v-model="radioValue">
              <t-radio :value="0">物料类别</t-radio>
              <t-radio :value="1">物料</t-radio>
            </t-radio-group>
          </t-form-item>
        </t-col>
        <!-- 第 4️⃣ 行数据 -->
        <t-col v-if="barcodeData.barcodeValidateGroup === 'KEYPART'" :span="6">
          <t-form-item label="物料类别" name="mitemCategoryId">
            <bcmp-select-business
              v-model="barcodeData.mitemCategoryId"
              :disabled="radioValue"
              :is-multiple="false"
              type="mitemCategory"
              label=""
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col v-if="barcodeData.barcodeValidateGroup === 'KEYPART'" :span="6">
          <t-form-item label="物料编码" name="mitemId">
            <bcmp-select-business
              v-model="barcodeData.mitemId"
              :disabled="!radioValue"
              type="mitem"
              label=""
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <!-- 第 5️⃣ 行数据 -->
        <t-col :span="12">
          <t-form-item label="条码规则" name="barcodeExpression">
            <t-textarea
              v-model="barcodeData.barcodeExpression"
              placeholder="请输入条码规则"
              name="description"
              :autosize="{ minRows: 5, maxRows: 7 }"
            />
          </t-form-item>
        </t-col>
        <!-- 第 6️⃣ 行数据 -->
        <t-col :span="9">
          <t-form-item label="条码示例" name="sampleBarcode">
            <t-input v-model="sampleBarcode"></t-input>
          </t-form-item>
        </t-col>
        <t-col :span="3" align="right">
          <t-button @click="onBarcodeVerification">验证</t-button>
        </t-col>
        <!-- 第 7️⃣ 行数据 -->
        <t-col :span="6">
          <t-form-item label="最小长度" name="minLength">
            <t-input-number v-model="barcodeData.minLength" theme="column" style="width: 100%"></t-input-number>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item label="最大长度" name="maxLength">
            <t-input-number v-model="barcodeData.maxLength" theme="column" style="width: 100%"></t-input-number>
          </t-form-item>
        </t-col>
        <!-- 第 8️⃣ 行数据 -->
        <t-col :span="12">
          <t-form-item label="备注" name="memo">
            <t-textarea
              v-model="barcodeData.memo"
              placeholder="请输入备注"
              name="description"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import {
  CustomValidateResolveType,
  FormInstanceFunctions,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, ComputedRef, onMounted, reactive, Ref, ref, watch } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUITwo } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
// const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const submitFalg = ref(false);

// 表格数据总条数

// 编辑回填 ID
// const incidentID = ref('');
// tab 表格?
// 条码示例
const sampleBarcode = ref('');
const tabValue = ref(0);
const barcodeData = ref({
  ruleCode: '', // 规则编码
  ruleName: '', // 规则名称
  pri: null, // 优先级
  barcodeValidateGroup: '', // 验证分组
  barcodeType: '', // 条码类型
  mitemCategoryId: '', // 物料类别 ID
  mitemId: '', // 物料编码 ID
  barcodeExpression: '', // 条码规则
  minLength: null, // 最小长度
  maxLength: null, // 最大长度
  memo: '', // 备注
});
// 控制 单选框
const radioValue = ref(0);
// 文本表格数据
const textTabData = reactive({ list: [] });
const totalText = ref(null);
// 表格数据
const keyTabData = reactive({ list: [] });
const totalKey = ref(null);
// 文本验证分组 表格列表数据
const columnsText: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'ruleCode',
    title: '编码规则',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'ruleName',
    title: '编码名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'pri',
    title: '优先级',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'barcodeValidateGroupName',
    title: '验证分组名称',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'barcodeTypeName',
    title: '验证类型名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'operations',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// 关键件验证分组
const columnsKey: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'ruleCode',
    title: '编码规则',
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
    colKey: 'barcodeValidateGroupName',
    title: '验证分组名称',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'categoryName',
    title: '物料类别名称',
    align: 'center',
    width: '100',
    cell: 'stateSwitch',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'Operations',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// 监听 mitemCategoryId 的变化
watch(
  () => barcodeData.value.mitemCategoryId,
  (newVal) => {
    if (newVal) {
      barcodeData.value.mitemId = '';
    }
  },
);

// 监听 mitemId 的变化
watch(
  () => barcodeData.value.mitemId,
  (newVal) => {
    if (newVal) {
      barcodeData.value.mitemCategoryId = '';
    }
  },
);
// 表单验证规则
// form效验
function validateNumber(value: any): boolean | CustomValidateResolveType {
  if (Number.isNaN(Number(value))) {
    return { result: false, message: '该字段必须是数字', type: 'error' };
  }
  return true;
}

const rules: ComputedRef<FormRules> = computed(() => {
  return {
    ruleCode: [{ required: true, message: '编码规则不能为空', trigger: 'change' }],
    ruleName: [{ required: true, message: '规则名称不能为空', trigger: 'blur' }],
    pri: [
      { required: true, message: '优先级不能为空', trigger: 'blur' },
      { validator: validateNumber, trigger: 'blur', message: '优先级必须是数字' },
    ],
    barcodeValidateGroup: [{ required: true, message: '验证分组不能为空', trigger: 'change' }],
    barcodeType: [{ required: true, message: '条码类型不能为空', trigger: 'change' }],
    mitemCategoryId: [{ required: radioValue.value === 0, message: '物料分类不能为空', trigger: 'change' }],
    mitemId: [
      // 根据 radioValue 的值动态改变 required 属性
      { required: radioValue.value === 1, message: '物料编码不能为空', trigger: 'change' },
    ],
    barcodeExpression: [{ required: true, message: '条码规则不能为空', trigger: 'blur' }],
    minLength: [
      { required: true, message: '最小长度不能为空', trigger: 'blur' },
      { validator: validateNumber, trigger: 'blur', message: '最小长度必须是数字' },
    ],
    maxLength: [{ required: true, message: '最大长度不能为空', trigger: 'blur' }],
  };
});

// 初始渲染
onMounted(async () => {
  await onGetTextDataList(); // 获取 文本 数据
  await onGetKeyDataList(); // 获取 关键件 数据
  await onGetValidationGroups(); // 获取验证分组 下列 数组
  await onGetBarcodeType(); // 获取条码类型 下列 数组
});

// 获取 验证分组 下拉框 数组
const ValidationGroupsArr = ref([]);
const onGetValidationGroups = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'BARCODE_VALIDATE_GROUP' });
  ValidationGroupsArr.value = res;
};

// 获取条码类型 下拉框 数组
const BarcodeTypeArr = ref([]);
const onGetBarcodeType = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'BARCODE_TYPE' });
  BarcodeTypeArr.value = res;
};

// 获取 文本表格数据
const onGetTextDataList = async () => {
  const res = await api.barcodeValidateRule.getBarcodeVaildateRuleList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    barcodeValidateGroup: 'SCANTEXT',
  });
  textTabData.list = res.list;
  totalText.value = res.total;
};
// 获取 关键件 表格数据
const onGetKeyDataList = async () => {
  const res = await api.barcodeValidateRule.getBarcodeVaildateRuleList({
    pageNum: pageUITwo.value.page,
    pageSize: pageUITwo.value.rows,
    barcodeValidateGroup: 'KEYPART',
  });
  keyTabData.list = res.list;
  totalKey.value = res.total;
};

// left 刷新按钮
const onLeftFetchData = async () => {
  await onGetTextDataList();
};
// right 刷新按钮
const onRightFetchData = async () => {
  await onGetKeyDataList();
};

// tab 栏切换点击事件
const tabChangValue = ref(0);
const tabChange = (data: number) => {
  tabChangValue.value = data;
};

// 新增按钮点击
const onAddRuleData = () => {
  sampleBarcode.value = '';
  diaLogTitle.value = '新增规则';
  formRef.value.reset({ type: 'empty' });
  formVisible.value = true;
  submitFalg.value = true;
};

// 新增请求事件
const onAddRuleCode = async () => {
  await api.barcodeValidateRule.addBarcodeVaildateRule(barcodeData.value);
  MessagePlugin.success('新增成功');
};

const RuleCodeID = ref(null);
// 文本验证 编辑事件
const onTextEditRow = (row: { id: any }) => {
  RuleCodeID.value = row.id;
  Object.keys(barcodeData.value).reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      acc[key] = row[key];
    }
    return acc;
  }, barcodeData.value);
  formVisible.value = true;
  submitFalg.value = false;
};

// 关键件 编辑事件
const onKeyEditRow = (row: any) => {
  console.log('🚀 ~ file: index.vue:498 ~ onKeyEditRow ~ row:', row);
  diaLogTitle.value = '编辑规则';
  if (!+row.mitemCategoryId) {
    radioValue.value = 1;
  } else {
    radioValue.value = 0;
  }
  if (row.mitemId === '0') {
    barcodeData.value.mitemId = '';
  } else {
    barcodeData.value.mitemId = row.mitemId; // 物料编码 ID
  }
  if (row.mitemCategoryId === '0') {
    barcodeData.value.mitemCategoryId = '';
  } else {
    barcodeData.value.mitemCategoryId = row.mitemCategoryId; // 物料类别 ID
  }
  RuleCodeID.value = row.id;
  sampleBarcode.value = '';
  barcodeData.value.ruleCode = row.ruleCode; // 规则编码
  barcodeData.value.ruleName = row.ruleName; // 规则名称
  barcodeData.value.pri = row.pri; // 优先级
  barcodeData.value.barcodeValidateGroup = row.barcodeValidateGroup; // 验证分组
  barcodeData.value.barcodeType = row.barcodeType; // 条码类型
  barcodeData.value.barcodeExpression = row.barcodeExpression; // 条码规则
  barcodeData.value.minLength = row.minLength; // 最小长度
  barcodeData.value.maxLength = row.maxLength; // 最大长度
  barcodeData.value.memo = row.memo; // 备注
  console.log('🚀 ~ file: index.vue:525 ~ onKeyEditRow ~ barcodeData.value:', barcodeData.value);
  formVisible.value = true;
  submitFalg.value = false;
};

// 编辑请求
const onEditRuleCode = async () => {
  await api.barcodeValidateRule.modifyBarcodeVaildateRule({ ...barcodeData.value, id: RuleCodeID.value });
  MessagePlugin.success('编辑成功');
};

// ！文本验证 删除
const onTextDelConfirm = async (row: { id: any }) => {
  await api.barcodeValidateRule.removeBarcodeVaildateRule({ id: row.id });
  if (textTabData.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onGetTextDataList(); // 获取 文本 数据
  MessagePlugin.success('删除成功');
};

// ！关键件验证 删除
const onKeyDelConfirm = async (row: { id: any }) => {
  await api.barcodeValidateRule.removeBarcodeVaildateRule({ id: row.id });
  if (textTabData.list.length <= 1 && pageUITwo.value.page > 1) {
    pageUITwo.value.page--;
  }
  await onGetKeyDataList(); // 获取 关键件 数据
  MessagePlugin.success('删除成功');
};

// 条码验证 ""按钮 ""点击事件
const onBarcodeVerification = async () => {
  const res = await api.barcodeValidateRule.vaildateBarcodeRule({
    expression: barcodeData.value.barcodeExpression,
    barcode: sampleBarcode.value,
  });
  if (res) {
    MessagePlugin.success('验证成功');
  } else {
    MessagePlugin.error('验证失败');
  }
};

// #query 查询参数
const opts = computed(() => {
  return {
    code: {
      label: '规则',
      labelWidth: '120',
      placeholder: '请输入规则名称/编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    type: {
      label: '条码类型',
      labelWidth: '60',
      isHide: tabValue.value,
      event: 'select',
      defaultVal: '',
      slotName: 'cellType',
    },
    material: {
      label: '物料名称',
      labelWidth: '60',
      isHide: !tabValue.value,
      event: 'select',
      defaultVal: '',
      slotName: 'cellMaterial',
    },
  };
});

const onInput = async (data: any) => {
  if (!tabValue.value) {
    pageUITwo.value.page = 1;
    const res = await api.barcodeValidateRule.getBarcodeVaildateRuleList({
      pageNum: pageUITwo.value.page,
      pageSize: pageUITwo.value.rows,
      ruleKeyword: data.code,
      barcodeTypeCode: barcodeData.value.barcodeType,
      barcodeValidateGroup: 'SCANTEXT',
    });
    textTabData.list = res.list;
    totalText.value = res.total;
  } else {
    pageUI.value.page = 1;
    const res = await api.barcodeValidateRule.getBarcodeVaildateRuleList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ruleKeyword: data.code,
      mitemId: barcodeData.value.mitemCategoryId,
      barcodeValidateGroup: 'KEYPART',
    });
    keyTabData.list = res.list;
    totalKey.value = res.total;
  }
};

// 关闭模态框事件
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'empty' });
  formVisible.value = false;
};
const onSecondarySubmit = () => {
  formRef.value.submit();
};

// 表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddRuleCode(); // 新增请求
    } else {
      await onEditRuleCode(); // 编辑请求
    }
    if (barcodeData.value.barcodeValidateGroup === 'SCANTEXT') {
      await onGetTextDataList(); // 获取 文本 数据
    } else {
      await onGetKeyDataList(); // 获取 关键件 数据
    }
    // if (!tabValue.value) {
    //   await onGetValidationGroups(); // 获取验证分组 下列 数组
    // } else {
    //   await onGetBarcodeType(); // 获取条码类型 下列 数组
    // }
    formVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
