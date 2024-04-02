<template>
  <cmp-container v-if="pageShow" :full="true">
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        active-row-type="single"
        :fixed-height="true"
        :table-column="falg ? tableColumns2 : tableColumns"
        :editable-cell-state="editableCellState"
        :table-data="tableDataWarehouse"
        :loading="loading"
        :total="dataTotal"
        @row-click="onRowClick"
        @refresh="onRefresh"
      >
        <template #title>标准明细列表</template>
        <template #button>
          <t-button theme="primary" @click="onRefresh">刷新</t-button>
          <t-button theme="default" @click="onAdd">新增</t-button>
          <t-button theme="default">导入</t-button>
          <t-button theme="default" @click="onClose">返回</t-button>
        </template>
        <template #op="slotProps">
          <div @click.stop>
            <t-button
              v-if="!slotProps.row.flag"
              :icon="editIcon"
              size="small"
              theme="primary"
              variant="text"
              @click="onEdit(slotProps)"
            />
            <t-button
              v-if="slotProps.row.flag"
              :icon="saveIcon"
              size="small"
              theme="primary"
              variant="text"
              @click="onSave(slotProps)"
            />
            <t-popconfirm content="是否确认删除" @confirm="onDel(slotProps)">
              <t-button :icon="deleIcon" size="small" theme="primary" variant="text" />
            </t-popconfirm>
          </div>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import { DeleteIcon, EditIcon, SaveIcon } from 'tdesign-icons-vue-next';
import { Input, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { h, onMounted, ref } from 'vue';

import { api } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const formData = ref({
  sampingStdId: '',
  operationMethod: null,
  sampingStdCode: '',
});
// 父方法
const emit = defineEmits(['permissionShow']);
const onClose = async () => {
  pageShow.value = false;
  emit('permissionShow', false); // 回到父
};
const editIcon = () => h(EditIcon, { size: '18px' });
const deleIcon = () => h(DeleteIcon, { size: '18px' });
const saveIcon = () => h(SaveIcon, { size: '18px' });
const { loading, setLoading } = useLoading();
const { pageUI } = usePage();
const tableDataWarehouse = ref([]);
const falg = ref(false);
const pageShow = ref(false);
const dataTotal = ref(0);
const curIndex = ref(-1);
const sortList = ref({ sorters: [] });
const filterList = ref({ filters: [] });

const tableColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'sampingStdCode',
    title: '抽样编码',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
  },
  {
    colKey: 'samplingNum',
    title: '抽样数量',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
        showColumn: !falg.value,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'lotFrom',
    title: '批量下限',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'lotTo',
    title: '批量上限',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: async (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
        return Promise.resolve();
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassA',
    title: 'A类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        console.log(context.newRowData, '1111111111');
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassA',
    title: 'A类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassB',
    title: 'B类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassB',
    title: 'B类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassC',
    title: 'C类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassC',
    title: 'C类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassD',
    title: 'D类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassD',
    title: 'D类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'op',
    title: '操作',
    width: '110',
    align: 'left',
    fixed: 'right',
  },
];
const tableColumns2: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'sampingStdCode',
    title: '抽样编码',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
  },
  {
    colKey: 'samplingPer',
    title: '抽样比例(%)',
    width: '130',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
        showColumn: falg.value,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'lotFrom',
    title: '批量下限',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'lotTo',
    title: '批量上限',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: async (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
        return Promise.resolve();
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassA',
    title: 'A类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        console.log(context.newRowData, '1111111111');
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassA',
    title: 'A类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassB',
    title: 'B类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassB',
    title: 'B类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassC',
    title: 'C类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassC',
    title: 'C类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'acceptQtyClassD',
    title: 'D类AC',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      on: (editContext) => ({
        onBlur: () => {
          console.log('失去焦点', editContext);
        },
        onEnter: (ctx) => {
          ctx?.e?.preventDefault();
          console.log('onEnter', ctx);
        },
      }),
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'rejectQtyClassD',
    title: 'D类RE',
    width: '110',
    // sorter: true,
    // filter: { type: 'input' },
    edit: {
      component: Input,
      // props, 透传全部属性到 Input 组件。可以是一个函数，不同行有不同的 props 属性 时，使用 Function）
      props: {
        clearable: true,
        autoWidth: true,
      },
      // 触发校验的时机（when to validate)
      validateTrigger: 'change',
      // 透传给 component: Input 的事件（也可以在 edit.props 中添加）
      // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
      abortEditOnEvent: ['onBlur'],
      // 编辑完成，退出编辑态后触发
      onEdited: (context) => {
        const newData = [...tableDataWarehouse.value];
        newData.splice(context.rowIndex, 1, context.newRowData);
        tableDataWarehouse.value = newData;
      },
      // 校验规则，此处同 Form 表单。https://tdesign.tencent.com/vue-next/components/form

      // 默认是否为编辑状态
      showEditIcon: false,
      keepEditMode: true,
    },
  },
  {
    colKey: 'op',
    title: '操作',
    width: '110',
    align: 'left',
    fixed: 'right',
  },
];
const onDel = async (slotProps) => {
  if (slotProps.row.id) {
    await api.samplingStdDtl.deleteById(slotProps.row.id);
    onRefresh();
  } else {
    tableDataWarehouse.value.splice(slotProps.rowIndex, 1);
  }
  MessagePlugin.success('删除成功');
};
const onEdit = async (slotProps) => {
  // 定义一个 Promise 包装的 onRowClick 函数
  const onRowClickPromise = new Promise((resolve) => {
    onRowClick({ index: slotProps.rowIndex }, resolve);
  });

  // 等待 onRowClickPromise 的完成
  await onRowClickPromise;

  console.log('00000000000000');
  const item = tableDataWarehouse.value[curIndex.value];
  if (!item || !item.flag) {
    slotProps.row.flag = true;
    curIndex.value = slotProps.rowIndex;
  }
};
const onSave = async (slotProps) => {
  if (slotProps.row.flag) {
    const item = tableDataWarehouse.value[curIndex.value];
    await changeOrAddDtl(item, curIndex.value);
  }
};
const onRowClick = async (rowIndex, callback) => {
  console.log(rowIndex);
  console.log(curIndex.value);
  if (curIndex.value !== -1 && rowIndex.index !== curIndex.value) {
    // 设置一个延迟操作，延迟时间为500ms
    const item = tableDataWarehouse.value[curIndex.value];
    if (item && item.flag) {
      await changeOrAddDtl(item, curIndex.value);
    }
    // 延迟操作完成后执行回调
    if (callback) {
      callback();
    }
  } else {
    // 如果不需要延迟操作，则直接执行回调
    callback();
  }
};

const changeOrAddDtl = async (item, rowIndex) => {
  if (!Number(item.lotFrom) || item.lotFrom <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：批量下限必须为正整数且不得为空`);
    return;
  }
  if (
    formData.value.operationMethod === 1 &&
    (Number.isNaN(item.samplingPer) || item.samplingPer <= 0 || item.samplingPer > 100)
  ) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：抽样比例必须为大于0且小于或等于100的数值且不得为空`);
    return;
  }
  if (!Number(item.lotTo) || item.lotTo <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：批量上限必须为正整数且不得为空`);
    return;
  }
  if (formData.value.operationMethod === 0 && (!Number(item.samplingNum) || item.samplingNum <= 0)) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：抽样数量必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.acceptQtyClassA) || item.acceptQtyClassA <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：A类允收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.rejectQtyClassA) || item.rejectQtyClassA <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：A类拒收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.acceptQtyClassB) || item.acceptQtyClassB <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：B类允收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.rejectQtyClassB) || item.rejectQtyClassB <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：B类拒收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.acceptQtyClassC) || item.acceptQtyClassC <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：C类允收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.rejectQtyClassC) || item.rejectQtyClassC <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：C类拒收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.acceptQtyClassD) || item.acceptQtyClassD <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：D类允收数必须为正整数且不得为空`);
    return;
  }
  if (!Number(item.rejectQtyClassD) || item.rejectQtyClassD <= 0) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：D类拒收数必须为正整数且不得为空`);
    return;
  }
  if (Number(item.lotTo) <= Number(item.lotFrom)) {
    MessagePlugin.warning(`第${rowIndex + 1}行数据操作失败，原因：批量上限不得低于下限`);
    return;
  }
  await api.samplingStdDtl.changeOrAddDtl(item);
  MessagePlugin.success('操作成功');
  item.flag = false;
  if (!item.id) {
    onRefresh();
  }
};
// const onEdit = async (slotProps) => {
//   const item = tableDataWarehouse.value[curIndex.value];
//   slotProps.row.flag = true;
//   curIndex.value = slotProps.rowIndex;
// };
const onRefresh = async () => {
  const data = (await api.samplingStdDtl.getList({
    sampingStdId: formData.value.sampingStdId,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    sorts: sortList.value.sorters,
    filters: filterList.value.filters,
  })) as any;
  tableDataWarehouse.value = data.list;
  tableDataWarehouse.value.forEach((element) => {
    element.flag = false;
  });
  dataTotal.value = data.total;
};
const onAdd = () => {
  if (tableDataWarehouse.value) {
    const flag = tableDataWarehouse.value.some((item) => !item.id);
    if (flag) {
      MessagePlugin.warning('请先提交先前的空白行数据');
      return;
    }
  }
  tableDataWarehouse.value.push({
    ...CmpTable,
    sampingStdCode: formData.value.sampingStdCode,
    sampingStdId: formData.value.sampingStdId,
    flag: true,
  });
  curIndex.value = tableDataWarehouse.value.length - 1;
};
// 用于控制哪些行或哪些单元格不允许出现编辑态，参数有 { row, col, rowIndex, colIndex }
const editableCellState = (cellParams) => {
  const { row } = cellParams;
  return row.flag === true;
};
onMounted(() => {
  console.log('123123');
});
const fetchTable = async () => {
  setLoading(true);
  try {
    const data = (await api.samplingStdDtl.getList({
      sampingStdId: formData.value.sampingStdId,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: sortList.value.sorters,
      filters: filterList.value.filters,
    })) as any;
    tableDataWarehouse.value = data.list;
    tableDataWarehouse.value.forEach((element) => {
      element.flag = false;
    });
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
const setRow = (data) => {
  formData.value = {
    sampingStdId: data.id,
    operationMethod: data.operationMethod,
    sampingStdCode: data.sampingStdCode,
  };
  falg.value = formData.value.operationMethod === 1;
};
defineExpose({
  formData,
  setRow,
  pageShow,
  fetchTable,
});
</script>

<style scoped>
.table-title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}
</style>
