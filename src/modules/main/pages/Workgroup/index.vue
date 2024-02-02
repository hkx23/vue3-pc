<!-- 班组信息 -->
<template>
  <!-- :full-sub-index="[1, 2]" -->
  <cmp-container :full="false">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput"></cmp-query>
    </cmp-card>
    <cmp-card>
      <!-- ################# 班组表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        empty="没有符合条件的数据"
        row-key="id"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="teamColumns"
        active-row-type="single"
        :table-data="teamList.list"
        :total="teamTotal"
        :selected-row-keys="selectedRowKeys"
        @row-click="onGroupSelectChange"
        @select-change="onSelectChange"
        @refresh="onFetchGroupData"
      >
        <template #title>
          {{ '班组列表' }}
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ '编辑' }}</t-link>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
              <t-link theme="primary" @click="onGroupDelect(row)">{{ '删除' }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddTypeData"> 新增班组 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onTeamDeleteBatches()">
              <t-button theme="default"> 班组批量删除 </t-button>
            </t-popconfirm>
            <t-button theme="default"> 班组导入 </t-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
    <cmp-card>
      <!-- ################# 班组人员表格数据 ###################### -->

      <cmp-table
        ref="tableRef"
        v-model:pagination="personPage"
        empty="没有符合条件的数据"
        row-key="id"
        class="son-table"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="personColumns"
        active-row-type="single"
        :table-data="supportPersonInUserList.list"
        :total="supportPersonTotal"
        :selected-row-keys="delPersonRowKeys"
        @select-change="onPersonSelectChange"
        @refresh="onFetchPersonData"
      >
        <template #gender="{ row }">
          {{ row.gender ? '男' : '女' }}
        </template>
        <template #title>
          {{ '班组人员列表' }}
        </template>
        <template #actionSlot="{ row }">
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelPersonConfirm()">
            <t-link theme="primary" @click="onDelPersonRow(row)">{{ '删除' }}</t-link>
          </t-popconfirm>
        </template>
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddPersonData"> 新增员工 </t-button>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="onPersondeleteBatches()">
              <t-button theme="default"> 员工批量删除 </t-button>
            </t-popconfirm>
            <t-button theme="default"> 班组员工导入 </t-button>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #班组 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="teamFormData" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="班组编码" name="workgroupCode">
        <t-input v-model="teamFormData.workgroupCode" :disabled="groupDisabled"></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="班组名称" name="workgroupName">
        <t-input v-model="teamFormData.workgroupName"></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="班组描述" name="workgroupDesc">
        <t-input v-model="teamFormData.workgroupDesc"></t-input>
      </t-form-item>
      <!-- 第 4️⃣ 行数据 -->
      <t-form-item label="所属车间" name="workshopId">
        <bcmp-select-business v-model="teamFormData.workshopId" label="" type="workshop"></bcmp-select-business>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
    </template>
  </t-dialog>
  <!-- #人员 DiaLog 弹窗 -->
  <t-dialog v-model:visible="personVisible" :cancel-btn="null" :confirm-btn="null" header="添加班组员工" width="95%">
    <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!新增表格数据 -->
    <t-row justify="space-around">
      <t-col :span="5">
        <cmp-table
          ref="tableRef"
          v-model:pagination="addPage"
          empty="没有符合条件的数据"
          row-key="id"
          height="400px"
          :table-column="addPersonColumns"
          :table-data="onAddPersonTabList.list"
          :total="addPersonTotal"
          @refresh="onFetchAddData"
        >
          <template #gender="{ row }">
            {{ row.gender ? '男' : '女' }}
          </template>
          <template #addPerson="{ row }">
            <t-button v-if="!commonPersonId.includes(row.id)" size="small" variant="text" @click="addPerson(row)">
              <icon name="add" class="black-icon" />
            </t-button>
            <t-button v-if="commonPersonId.includes(row.id)" size="small" variant="text">
              <icon name="check-circle-filled" class="filled-icon" />
            </t-button>
          </template>
          <template #operate>
            <cmp-query :opts="optsAdd" :bool-enter="true" :show-button="false" @submit="onInputAdd"></cmp-query>
          </template>
          <template #title> 选择员工 </template>
        </cmp-table>
      </t-col>
      <!-- !!!!!!!!!!!!!!!!!!!!!!! 删除 表格数据 -->
      <t-col :span="5">
        <cmp-table
          ref="tableRef"
          v-model:pagination="delPage"
          empty="没有符合条件的数据"
          row-key="id"
          height="400px"
          :table-column="delPersonColumns"
          :table-data="filteredData"
          :total="delPersonTotal"
          :show-pagination="false"
          @refresh="onFetchDelData"
        >
          <template #gender="{ row }">
            {{ row.gender ? '男' : '女' }}
          </template>
          <template #delPerson="{ row }">
            <t-button size="small" variant="text" @click="delPerson(row)">
              <icon name="remove" class="black-icon" />
            </t-button>
          </template>
          <template #operate>
            <cmp-query :opts="optsDel" :bool-enter="true" :show-button="false" @submit="onInputDel"></cmp-query>
          </template>
          <template #title> 已选员工 </template>
        </cmp-table>
      </t-col>
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

// import { useLang } from './lang';

// const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: personPage } = usePage();
const { pageUI: addPage } = usePage();
const { pageUI: delPage } = usePage();
const formVisible = ref(false); // 控制 班组dialog 弹窗显示隐藏
const personVisible = ref(false); // 控制 人员 dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
const groupDisabled = ref(false); // 班组表单禁用开关
const submitFalg = ref(false);
const personSaveLoading = ref(false);

// $班组 表格数据
const teamList = reactive({ list: [] });
// 班组表格数据总条数
const teamTotal = ref(0);
// $人员 表格数据
const supportPersonInUserList = reactive({ list: [] });
// 人员表格数据总条数
const supportPersonTotal = ref(0);
// dialog 弹框数据
const teamFormData = ref({
  workgroupCode: '', // 班组编码
  workgroupName: '', // 班组名称
  workgroupDesc: '', // 班组描述
  workshopId: '', // 所属车间
});

// ####班组 表头
const teamColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'workgroupCode',
    title: '班组编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'workgroupName',
    title: '班组名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'workgroupDesc',
    title: '班组描述',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workshopName',
    title: '所属车间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'personCount',
    title: '班组人员',
    align: 'center',
    width: '80',
  },
  {
    colKey: 'actionSlot',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
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
    colKey: 'personCode',
    title: '员工编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'personName',
    title: '姓名',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'gender',
    title: '性别',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mobilePhone',
    title: '手机号码',
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
    colKey: 'actionSlot',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
  },
];
// ####人员新增 表头
const addPersonColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'personCode',
    title: '员工编码',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'personName',
    title: '姓名',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'gender',
    title: '性别',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'mobilePhone',
    title: '手机号码',
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
    colKey: 'addPerson',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
  },
];
// ####人员删除 表头
const delPersonColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'personCode',
    title: '员工编码',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'personName',
    title: '姓名',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'gender',
    title: '性别',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'mobilePhone',
    title: '手机号码',
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
    colKey: 'delPerson',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
    cell: 'delPerson', // 引用具名插槽
  },
];

// # 班组刷新按钮
const onFetchGroupData = async () => {
  await onTeamTabData(); // 获取 班组表格 数据
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
  rowGroupId.value = '';
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

// 表单定义规则
const rules: FormRules = {
  workgroupCode: [{ required: true, message: '班组编码不能为空', trigger: 'blur' }],
  workgroupName: [{ required: true, message: '班组名称不能为空', trigger: 'blur' }],
  workshopId: [{ required: true, message: '班组类型不能为空', trigger: 'change' }],
};
// # 初始渲染
onMounted(async () => {
  await onTeamTabData(); // 获取 班组表格 数据
});

// #班组搜索
const opts = computed(() => {
  return {
    workgroupKeyword: { label: '班组名称', comp: 't-input', event: 'input', defaultval: '' },
    workshopId: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  personPage.value.page = 1;
  teamParam.value.workgroupKeyword = data.workgroupKeyword;
  teamParam.value.workshopId = data.workshopId;
  await onTeamTabData();
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
  rowGroupId.value = '';
};

// ## 添加             员工                    搜索
const optsAdd = computed(() => {
  return {
    categoryName: { label: '查询员工', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInputAdd = async (data: any) => {
  addPage.value.page = 1;
  const res = await api.workgroup.getOutPerson({
    pageNum: addPage.value.page,
    pageSize: addPage.value.rows,
    personKeyword: data.categoryName,
    workgroupId: rowGroupId.value,
  });
  onAddPersonTabList.list = res.list;
  addPersonTotal.value = res.total;
};

// ## 删除             员工                   搜索
const optsDel = computed(() => {
  return {
    categoryName: { label: '已选员工', comp: 't-input', event: 'input', defaultval: '' },
  };
});

const searchQuery = ref('');
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return onDelPersonTabList.list;
  }
  return onDelPersonTabList.list.filter((item) => {
    const query = searchQuery.value.toLowerCase();
    const nameMatches = item.personName.toLowerCase().includes(query);
    const codeMatches = item.personCode.toLowerCase().includes(query);
    return nameMatches || codeMatches;
  });
});
// 上侧搜索提交事件
const onInputDel = async (data: any) => {
  searchQuery.value = data.categoryName.trim();
};
const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #班组表格 参数
const teamParam = ref({
  pageNum: 1,
  pageSize: 20,
  workgroupKeyword: '', // 班组名称
  workshopId: '', // 车间
});

// #获取 班组表格 数据
const onTeamTabData = async () => {
  teamParam.value.pageNum = pageUI.value.page;
  teamParam.value.pageSize = pageUI.value.rows;
  const res = await api.workgroup.getList(teamParam.value);
  teamList.list = res.list;
  teamTotal.value = res.total;
};

// #添加 班组 数据请求
const onAddSupportGroup = async () => {
  await api.workgroup.addWorkgroup(teamFormData.value);
  await onTeamTabData(); // 获取 班组表格 数据
  MessagePlugin.success('新增成功');
};

// #添加按钮点击事件
const onAddTypeData = async () => {
  formRef.value.reset({ type: 'empty' });
  groupDisabled.value = false; // 关闭表单禁用
  submitFalg.value = true; // true为新增
  formVisible.value = true;
  diaLogTitle.value = '新增班组';
};

// #编辑 点击 班组右侧表格编辑按钮
const workGroupRowId = ref('');
const onEditRow = (row: any) => {
  groupDisabled.value = true; // 启用表单禁用
  teamFormData.value.workgroupCode = row.workgroupCode; // 班组代码
  teamFormData.value.workgroupName = row.workgroupName; // 班组名称
  teamFormData.value.workgroupDesc = row.workgroupDesc; // 班组描述
  teamFormData.value.workshopId = row.workshopId; // 车间 ID
  workGroupRowId.value = row.id;
  submitFalg.value = false; // 编辑为 false
  formVisible.value = true;
  diaLogTitle.value = '编辑班组';
};

// #编辑 班组 表格数据 请求
const onGroupRequest = async () => {
  await api.workgroup.modifyWorkgroup({ ...teamFormData.value, id: workGroupRowId.value });
  await onTeamTabData(); // 获取 班组表格 数据
  MessagePlugin.success('编辑成功');
};

// ！删除 获取 班组 批量删除数组
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};

const rowGroupId = ref(''); // 点击行ID
const onGroupSelectChange = async ({ row }) => {
  rowGroupId.value = row.id;
  // if (context.currentRowKey === 'CHECK_ALL_BOX') {
  //   return;
  // }
  await supportPersonInUserTabData(); // 获取 人员表格 数据
};

// #获取 人员表格 数据
const supportPersonInUserTabData = async () => {
  const res = await api.workgroup.getPersonList({
    pageNum: personPage.value.page,
    pageSize: personPage.value.rows,
    workgroupId: rowGroupId.value,
  });
  supportPersonInUserList.list = res.list;
  supportPersonTotal.value = res.total;
};

// ！ 删除 单项删除 班组 点击
const onGroupDelect = (row: any) => {
  selectedRowKeys.value = [];
  selectedRowKeys.value.push(row.id);
};

// ！班组表格删除确认按钮
const onDelConfirm = async () => {
  await api.workgroup.removeWorkgroupBatch([rowGroupId.value]);
  if (teamList.list.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await onTeamTabData(); // 获取 班组表格 数据
  MessagePlugin.success('删除成功');
  selectedRowKeys.value = []; // 置空
};

// ！班组表格批量删除按钮
const onTeamDeleteBatches = async () => {
  // 步骤 1: 检查删除前的数据总量
  const initialLength = teamList.list.length;
  // 步骤 2: 执行删除操作
  await api.workgroup.removeWorkgroupBatch(selectedRowKeys.value);
  // 步骤 3: 检查当前页是否还有数据
  if (initialLength === teamList.list.length && pageUI.value.page > 1) {
    // 如果删除的数据量等于当前页的数据量，并且不在第一页，则页码减一
    pageUI.value.page--;
  }
  MessagePlugin.success('批量删除成功');
  await onTeamTabData(); // 获取 班组表格 数据
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
const onDelPersonRow = (row) => {
  delPersonRowKeys.value = [];
  delPersonRowKeys.value.push(row.id);
};
// ！删除 员工 单个 气泡框
const onDelPersonConfirm = async () => {
  await api.workgroup.removePersonBatch({ personIds: delPersonRowKeys.value, workgroupId: rowGroupId.value });
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
  await api.workgroup.removePersonBatch({ personIds: delPersonRowKeys.value, workgroupId: rowGroupId.value });
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
  if (!rowGroupId.value) {
    MessagePlugin.warning('请选择一个班组班组！');
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
  const res = await api.workgroup.getOutPerson({
    workgroupId: rowGroupId.value,
    pageNum: addPage.value.page,
    pageSize: addPage.value.rows,
  });
  onAddPersonTabList.list = res.list;
  addPersonTotal.value = res.total;
};

// # 获取 删除 人员信息
const delOldArr = ref([]);
const onDelPersonTabList = reactive({ list: [] });
const delPersonTotal = ref(null);
const onDelPersonTabData = async () => {
  const res = await api.workgroup.getInnerPerson({
    workgroupId: rowGroupId.value,
    pageNum: 1,
    pageSize: 999999,
  });
  onDelPersonTabList.list = res.list;
  delPersonTotal.value = res.total;
  delOldArr.value = res.list.map((item) => item.id);
};

// 变更后的全部 ID
const arrPersonID = ref([]);

// #点击 加号图标 事件
const addPerson = (row: { id: any }) => {
  arrPersonID.value = [];
  // 从 '添加' 表格中移除选中的行
  // onAddPersonTabList.list = onAddPersonTabList.list.filter((item) => item.id !== row.id);
  // 将选中的行添加到 '删除' 表格
  onDelPersonTabList.list.push(row);
};
// #点击 减号图标 事件
const delPerson = (row: { id: any }) => {
  arrPersonID.value = [];
  // 从 '添加' 表格中移除选中的行
  onDelPersonTabList.list = onDelPersonTabList.list.filter((item) => item.id !== row.id);
  // 将选中的行添加到 '删除' 表格
  // onAddPersonTabList.list.push(row);
};

const commonPersonId = ref([]);
// #监听 onDelPersonTabList.list 的变化
watch(
  () => onDelPersonTabList.list,
  (newList) => {
    // 提取 newList 中每个元素的 id 并更新 arrPersonID
    arrPersonID.value = newList.map((item) => item.id);
    // addPersonTotal.value = onAddPersonTabList.list.length; // 页数变化
    delPersonTotal.value = onDelPersonTabList.list.length; // 页数变化
    // 获取新增和添加数组公共的 ID,用来判断图标样式
    commonPersonId.value = onAddPersonTabList.list
      .filter((obj1) => onDelPersonTabList.list.some((obj2) => obj1.id === obj2.id))
      .map((obj) => obj.id);
  },
  { deep: true },
);

// 筛选删除数组
function findElementsNotInA(a, b) {
  // 创建集合 setA 包含数组 a 的所有元素
  const setA = new Set(a);
  // 使用 filter 方法过滤数组 b，只保留不在集合 setA 中的元素
  return b.filter((item) => !setA.has(item));
}
// 筛选新增数组
function findElementsNotInB(a, b) {
  // 创建集合 setB 包含数组 b 的所有元素
  const setB = new Set(b);
  // 使用 filter 方法过滤数组 a，只保留不在集合 setB 中的元素
  return a.filter((item) => !setB.has(item));
}

// #添加变更后员工事件
const onAddPersons = async () => {
  const delNewArr = onDelPersonTabList.list.map((item) => item.id);
  const delArr = findElementsNotInA(delNewArr, delOldArr.value);
  const addArr = findElementsNotInB(delNewArr, delOldArr.value);
  try {
    personSaveLoading.value = true;
    await api.workgroup.addWorkgroupPerson({
      workgroupId: rowGroupId.value,
      insertList: addArr,
      deleteList: delArr,
    });
    MessagePlugin.success('变更成功');
    await supportPersonInUserTabData(); // 获取 人员表格 数据
    await onTeamTabData();
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

.filled-icon {
  color: var(--td-success-color);
}
</style>
