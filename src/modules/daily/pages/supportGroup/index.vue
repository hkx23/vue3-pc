<template>
  <!-- :full-sub-index="[1, 2]" -->
  <cmp-container :full="false">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput"></cmp-query>
    </cmp-card>
    <cmp-card>
      <!-- ################# 处理组表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="groupColumns"
        active-row-type="single"
        :table-data="supportGroupInUserList.list"
        :total="supportGroupTotal"
        select-on-row-click
        :selected-row-keys="selectedRowKeys"
        @select-change="onGroupSelectChange"
        @refresh="onFetchGroupData"
      >
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ t('common.button.edit') }}</t-link>

            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onGroupDelect">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData"> 新增处理组 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onGroupDeleteBatches()">
              <t-button theme="default"> 处理组批量删除 </t-button>
            </t-popconfirm>
            <t-button theme="default"> 处理组导入 </t-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-card>
      <!-- ################# 人员表格数据 ###################### -->

      <cmp-table
        ref="tableRef"
        v-model:pagination="personPage"
        row-key="id"
        class="son-table"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="personColumns"
        active-row-type="single"
        :table-data="supportPersonInUserList.list"
        :total="supportPersonTotal"
        select-on-row-click
        :selected-row-keys="delPersonRowKeys"
        @select-change="onPersonSelectChange"
        @refresh="onFetchPersonData"
      >
        <template #actionSlot>
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelPersonConfirm()">
            <t-link theme="primary" @click="onDelPersonRow">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddPersonData"> 新增用户 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onPersondeleteBatches()">
              <t-button theme="default"> 用户批量删除 </t-button>
            </t-popconfirm>
            <t-button theme="default"> 处理组用户导入 </t-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #处理组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="supportGroupTabData.list" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="处理组编码" name="supportGroupCode">
        <t-input v-model="supportGroupTabData.list.supportGroupCode" :disabled="groupDisabled"></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="处理组名称" name="incidentName">
        <t-input v-model="supportGroupTabData.list.supportGroupName"></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="处理组类型" name="supportGroupType">
        <t-select v-model="supportGroupTabData.list.supportGroupType">
          <t-option v-for="item in DropDownData.list" :key="item.id" :label="item.paramValue" :value="item.paramCode" />
        </t-select>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
    </template>
  </t-dialog>
  <!-- #人员 DiaLog 弹窗 -->
  <t-dialog v-model:visible="personVisible" :cancel-btn="null" :confirm-btn="null" header="添加处理组用户" width="95%">
    <!-- #新增表格数据 -->
    <t-row justify="space-around">
      <t-col :span="5">
        <t-row>
          <t-col
            ><cmp-query :opts="optsAdd" :bool-enter="true" :show-button="false" @submit="onInputAdd"></cmp-query
          ></t-col>
        </t-row>
        <cmp-table
          ref="tableRef"
          v-model:pagination="addPage"
          row-key="id"
          height="400px"
          :table-column="addPersonColumns"
          :table-data="onAddPersonTabList.list"
          :total="addPersonTotal"
          @refresh="onFetchAddData"
        >
          <template #addPerson="{ row }">
            <t-button size="small" variant="text" @click="addPerson(row)">
              <icon name="add" class="black-icon" />
            </t-button>
          </template>
          <template #button>
            <h3>选择用户</h3>
          </template>
        </cmp-table></t-col
      >
      <!-- # 删除 表格数据 -->
      <t-col :span="5">
        <t-row>
          <t-col
            ><cmp-query :opts="optsDel" :bool-enter="true" :show-button="false" @submit="onInputDel"></cmp-query
          ></t-col>
        </t-row>
        <cmp-table
          ref="tableRef"
          v-model:pagination="delPage"
          row-key="id"
          height="400px"
          :table-column="delPersonColumns"
          :table-data="onDelPersonTabList.list"
          :total="delPersonTotal"
          @refresh="onFetchDelData"
        >
          <template #delPerson="{ row }">
            <t-button size="small" variant="text" @click="delPerson(row)">
              <icon name="remove" class="black-icon" />
            </t-button>
          </template>
          <template #button>
            <h3>已选用户</h3>
          </template>
        </cmp-table></t-col
      >
    </t-row>
    <template #footer>
      <t-button theme="default" variant="base" @click="personVisible = false">取消</t-button>
      <t-button theme="primary" type="submit" :loading="personSaveLoading" @click="onAddPersons">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref, watch } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const DropDownData = reactive({ list: [] }); // 下拉框数据
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: personPage } = usePage();
const { pageUI: addPage } = usePage();
const { pageUI: delPage } = usePage();
const formVisible = ref(false); // 控制 处理组dialog 弹窗显示隐藏
const personVisible = ref(false); // 控制 人员 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const groupDisabled = ref(false); // 处理组表单禁用开关
const submitFalg = ref(false);
const personSaveLoading = ref(false);

// 编辑回填 ID
const incidentID = ref('');
// $处理组 表格数据
const supportGroupInUserList = reactive({ list: [] });
// 处理组表格数据总条数
const supportGroupTotal = ref(0);
// $人员 表格数据
const supportPersonInUserList = reactive({ list: [] });
// 人员表格数据总条数
const supportPersonTotal = ref(0);
// dialog 弹框数据
const supportGroupTabData = reactive({
  list: {
    supportGroupCode: '', // 处理组编码
    supportGroupName: '', // 处理组名称
    supportGroupType: '', // 处理组类型
  },
});

// # 处理组刷新按钮
const onFetchGroupData = async () => {
  await supportGroupInUserTabData(); // 获取 处理组表格 数据
};
// # 人员刷新按钮
const onFetchPersonData = async () => {
  await supportPersonInUserTabData(); // 获取 人员表格 数据
};
// # 人员添加刷新按钮
const onFetchAddData = async () => {
  await onAddPersonTabData();
};
// # 人员删除刷新按钮
const onFetchDelData = async () => {
  await onDelPersonTabData();
};
// ####处理组 表头
const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'supportGroupCode',
    title: '处理组编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'supportGroupName',
    title: '处理组名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'supportGroupTypeName',
    title: '处理组类型',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'userCount',
    title: '处理组人员',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// ####人员 表头
const personColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'userName',
    title: '用户账号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'userDisplayName',
    title: '姓名',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'mobilePhone',
    title: '联系方式',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'email',
    title: '邮箱',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'enterprise',
    title: '隶属企业',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'organization',
    title: '组织架构',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    cell: 'actionSlot', // 引用具名插槽
  },
];
// ####人员新增 表头
const addPersonColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'userName',
    title: '用户账号',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'userDisplayName',
    title: '姓名',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'mobilePhone',
    title: '联系方式',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'email',
    title: '邮箱',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'enterprise',
    title: '隶属企业',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'organization',
    title: '组织架构',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
    cell: 'addPerson', // 引用具名插槽
  },
];
// ####人员删除 表头
const delPersonColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'userName',
    title: '用户账号',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'userDisplayName',
    title: '姓名',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'mobilePhone',
    title: '联系方式',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'email',
    title: '邮箱',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'enterprise',
    title: '隶属企业',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'organization',
    title: '组织架构',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
    cell: 'delPerson', // 引用具名插槽
  },
];
// 表单定义规则
const rules: FormRules = {
  supportGroupCode: [{ required: true, message: '处理组编码不能为空', trigger: 'blur' }],
  supportGroupName: [{ required: true, message: '处理组名称不能为空', trigger: 'blur' }],
  supportGroupTypeName: [{ required: true, message: '处理组类型不能为空', trigger: 'change' }],
};
// # 初始渲染
onMounted(async () => {
  await supportGroupInUserTabData(); // 获取 处理组表格 数据
  await onGetDropDownData(); // 组件下拉 数据
});

// #搜索
const opts = computed(() => {
  return {
    categoryName: { label: '处理组', comp: 't-input', event: 'input', defaultval: '' },
    methodCodeName: { label: '用户', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  personPage.value.page = 1;
  const res = await api.supportGroup.getGroupList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    groupKeyword: data.categoryName,
    userKeyword: data.methodCodeName,
  });
  supportGroupInUserList.list = res.list;
  supportGroupTotal.value = res.total;
  selectedRowKeys.value = [];
};

// ## 添加             员工                    搜索
const optsAdd = computed(() => {
  return {
    categoryName: { label: '查询用户', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInputAdd = async (data: any) => {
  addPage.value.page = 1;
  const res = await api.supportGroup.getOutPerson({
    pageNum: addPage.value.page,
    pageSize: addPage.value.rows,
    userKeyword: data.categoryName,
    supportGroupId: selectedRowKeys.value[0],
  });
  onAddPersonTabList.list = res.list;
  addPersonTotal.value = res.total;
};

// ## 删除             员工                   搜索

const optsDel = computed(() => {
  return {
    categoryName: { label: '已选用户', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInputDel = async (data: any) => {
  delPage.value.page = 1;
  const res = await api.supportGroup.getInnerPerson({
    pageNum: delPage.value.page,
    pageSize: delPage.value.rows,
    userKeyword: data.categoryName,
    supportGroupId: selectedRowKeys.value[0],
  });
  onDelPersonTabList.list = res.list;
  delPersonTotal.value = res.total;
};
const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #获取 处理组表格 数据
const supportGroupInUserTabData = async () => {
  const res = await api.supportGroup.getGroupList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    groupKeyword: '',
  });
  supportGroupInUserList.list = res.list;
  supportGroupTotal.value = res.total;
};

// #添加 处理组 数据请求
const onAddSupportGroup = async () => {
  await api.supportGroup.addSupportGroup(supportGroupTabData.list);
  await supportGroupInUserTabData(); // 获取 处理组表格 数据
  MessagePlugin.success('新增成功');
};

// #获取下拉框数据;
const onGetDropDownData = async () => {
  const res = await api.supportGroup.getSupportGroupType();
  DropDownData.list = res.list;
};

// #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  supportGroupTabData.list.supportGroupCode = ''; // 处理组代码
  supportGroupTabData.list.supportGroupName = ''; // 处理组名称
  supportGroupTabData.list.supportGroupType = ''; // 处理组类型
  groupDisabled.value = false; // 关闭表单禁用
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = '新增处理组';
};

// #编辑 点击 处理组右侧表格编辑按钮
const onEditRow = (row: any) => {
  groupDisabled.value = true; // 启用表单禁用
  supportGroupTabData.list.supportGroupCode = row.supportGroupCode; // 处理组代码
  supportGroupTabData.list.supportGroupName = row.supportGroupName; // 处理组名称
  supportGroupTabData.list.supportGroupType = row.supportGroupType; // 处理组类型
  incidentID.value = row.id; // 编辑回填 ID
  submitFalg.value = false; // 编辑为 false
  formVisible.value = true;
  diaLogTitle.value = '编辑异常类型';
};

// #编辑 处理组 表格数据 请求
const onGroupRequest = async () => {
  await api.supportGroup.modifySupportGroup({ ...supportGroupTabData.list, id: incidentID.value });
  await supportGroupInUserTabData(); // 获取 处理组表格 数据
  MessagePlugin.success('编辑成功');
};

// ！删除 获取 处理组 批量删除数组
const onGroupSelectChange = async (value: any[]) => {
  selectedRowKeys.value = value;
  await supportPersonInUserTabData(); // 获取 人员表格 数据
};

// #获取 人员表格 数据
const supportPersonInUserTabData = async () => {
  const res = await api.supportGroup.getPersonList({
    pageNum: personPage.value.page,
    pageSize: personPage.value.rows,
    groupKeyword: '',
    supportGroupId: selectedRowKeys.value[0],
  });
  supportPersonInUserList.list = res.list;
  supportPersonTotal.value = res.total;
};

// ！ 删除 单项删除 处理组 点击
const onGroupDelect = () => {
  selectedRowKeys.value = [];
};

// ！处理组表格删除确认按钮
const onDelConfirm = async () => {
  await api.supportGroup.removeSupportGroupBatch({ ids: selectedRowKeys.value[0] });
  if (supportGroupInUserList.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await supportGroupInUserTabData(); // 获取 处理组表格 数据
  MessagePlugin.success('删除成功');
  selectedRowKeys.value = []; // 置空
};

// ！处理组表格批量删除按钮
const onGroupDeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = supportGroupInUserList.list.length;
  // 步骤 2: 执行删除操作
  await api.supportGroup.removeSupportGroupBatch({ ids: selectedRowKeys.value });
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === supportGroupInUserList.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
    selectedRowKeys.value = [];
    MessagePlugin.success('批量删除成功');
  }
  await supportGroupInUserTabData(); // 获取 处理组表格 数据
  selectedRowKeys.value = []; // 置空
};

/* $*@ *************************  人员部分  ****************************** */
// ！删除员工数组
const delPersonRowKeys: Ref<any[]> = ref([]);
// ！获取员工批量删除数组
const onPersonSelectChange = async (value: any[]) => {
  delPersonRowKeys.value = value;
};

// ！删除员工 点击获取 ID
const onDelPersonRow = () => {
  delPersonRowKeys.value = [];
};
// ！删除 员工 单个 气泡框
const onDelPersonConfirm = async () => {
  await api.supportGroup.removePersonBatch({ supportGroupId: selectedRowKeys.value[0], ids: delPersonRowKeys.value });
  if (supportPersonInUserList.list.length <= 1 && personPage.value.page > 1) {
    personPage.value.page--;
  }
  await supportPersonInUserTabData(); // 获取 人员表格 数据
  await onAddPersonTabData(); // 获取 添加 表格人员数据
  await onDelPersonTabData(); // 获取 删除 表格人员数据
  MessagePlugin.success('删除成功');
  delPersonRowKeys.value = [];
};
// ！多个删除 员工 气泡框
const onPersondeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = supportPersonInUserList.list.length;
  // 步骤 2: 执行删除操作
  await api.supportGroup.removePersonBatch({ supportGroupId: selectedRowKeys.value[0], ids: delPersonRowKeys.value });
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === supportPersonInUserList.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
    MessagePlugin.success('批量删除成功');
  }
  delPersonRowKeys.value = [];
  await supportPersonInUserTabData(); // 获取 人员表格 数据
  await onAddPersonTabData(); // 获取 添加 表格人员数据
  await onDelPersonTabData(); // 获取 删除 表格人员数据
};

// #添加 人员点击 按钮
const onAddPersonData = async () => {
  console.log('🚀 ~ file: index.vue:646 ~ onAddPersonData ~   selectedRowKeys.value:', selectedRowKeys.value);
  if (selectedRowKeys.value.length > 1) {
    MessagePlugin.warning('只能选择一个处理组！');
    return;
  }
  if (selectedRowKeys.value.length < 1) {
    MessagePlugin.warning('请选择一个处理组处理组！');
    return;
  }
  await onAddPersonTabData(); // 获取 添加 表格人员数据
  await onDelPersonTabData(); // 获取 删除 表格人员数据
  personVisible.value = true;
};

// # 获取 添加 人员信息
const onAddPersonTabList = reactive({ list: [] });
const addPersonTotal = ref(null);
const onAddPersonTabData = async () => {
  const res = await api.supportGroup.getOutPerson({
    supportGroupId: selectedRowKeys.value[0],
    pageNum: addPage.value.page,
    pageSize: addPage.value.rows,
  });
  onAddPersonTabList.list = res.list;
  addPersonTotal.value = res.total;
};

// # 获取 删除 人员信息
const onDelPersonTabList = reactive({ list: [] });
const delPersonTotal = ref(null);
const onDelPersonTabData = async () => {
  const res = await api.supportGroup.getInnerPerson({
    supportGroupId: selectedRowKeys.value[0],
    pageNum: delPage.value.page,
    pageSize: delPage.value.rows,
  });
  onDelPersonTabList.list = res.list;
  delPersonTotal.value = res.total;
};

// 变更后的全部 ID
const arrPersonID = ref([]);

// #点击 加号图标 事件
const addPerson = (row: { id: any }) => {
  arrPersonID.value = [];
  // 从 '添加' 表格中移除选中的行
  onAddPersonTabList.list = onAddPersonTabList.list.filter((item) => item.id !== row.id);
  // 将选中的行添加到 '删除' 表格
  onDelPersonTabList.list.push(row);
};
// #点击 减号图标 事件
const delPerson = (row: { id: any }) => {
  arrPersonID.value = [];
  // 从 '添加' 表格中移除选中的行
  onDelPersonTabList.list = onDelPersonTabList.list.filter((item) => item.id !== row.id);
  // 将选中的行添加到 '删除' 表格
  onAddPersonTabList.list.push(row);
};

// #监听 onDelPersonTabList.list 的变化
watch(
  () => onDelPersonTabList.list,
  (newList) => {
    // 提取 newList 中每个元素的 id 并更新 arrPersonID
    arrPersonID.value = newList.map((item) => item.id);
  },
  { deep: true },
);

// #添加变更后员工事件
const onAddPersons = async () => {
  try {
    personSaveLoading.value = true;
    await api.supportGroup.addSupportGroupPerson({ supportGroupId: selectedRowKeys.value[0], ids: arrPersonID.value });
    MessagePlugin.success('变更成功');
    await supportPersonInUserTabData(); // 获取 人员表格 数据
    personVisible.value = false;
  } catch (error) {
    console.error('Error occurred:', error);
    MessagePlugin.error('变更失败');
  } finally {
    personSaveLoading.value = false;
  }
};

// @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    if (submitFalg.value) {
      await onAddSupportGroup(); // 新增请求
    } else {
      await onGroupRequest(); // 编辑请求
    }
    formVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
