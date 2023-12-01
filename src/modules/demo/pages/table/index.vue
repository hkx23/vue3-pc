<template>
  <div class="main-page">
    <tm-table
      ref="tableRef"
      v-model:pagination="pageUI"
      :table-column="tableColumn"
      :table-data="data.list"
      :enable-export="enableExport"
      :is-fixed-height="isFixedHeight"
      :loading="loading"
      :total="data.total"
      :export-function="exportFunction"
      @refresh="fetchData"
    >
      <template #op="{ row }">
        <icon name="edit-1" @click="onHandleEdit(row)"></icon>
      </template>

      <template #button>
        <t-button theme="success" @click="onExportEnable">插槽例子-是否显示导入</t-button>
        <!-- <t-button theme="success" @click="onFixHeight">插槽例子-是否固定高度</t-button> -->
        <t-button theme="success" @click="onViewKeys">插槽例子-已选中行</t-button>
      </template>
      <template #oprate>
        <!-- <t-button shape="circle" theme="primary" ghost> 插槽 </t-button> -->
      </template>
    </tm-table>
  </div>
</template>

<script setup lang="tsx" name="TablePreview">
import { DialogPlugin, Icon } from 'tdesign-vue-next';
import { onActivated, reactive, ref } from 'vue';

import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const tableRef = ref();

const enableExport = ref(false);
const isFixedHeight = ref(false);

const data = reactive({
  total: 0,
  list: [],
});

// 数据列表
const fetchData = () => {
  setLoading(true);
  setTimeout(() => {
    data.list = apiMockData(pageUI.value.rows);
    data.total = data.list.length * 30;
    setLoading(false);
  }, 600);
};

// 激活页面加载数据
onActivated(() => {
  fetchData();
});

// 导出全部
const exportFunction = async () => {
  return new Promise((resolve) => {
    resolve(apiMockData(300));
  });
};
// 切换是否显示导出
const onExportEnable = () => {
  enableExport.value = !enableExport.value;
};
// const onFixHeight = () => {
//   isFixedHeight.value = !isFixedHeight.value;
// };

// 查看已选中行
const onViewKeys = () => {
  const keys = tableRef.value.getSelectedRowKeys();
  const dialog = DialogPlugin.alert({
    header: '已选中行key',
    body: JSON.stringify(keys),
    placement: 'center',
    onConfirm() {
      dialog.destroy();
    },
  });
};

const onHandleEdit = (row: any) => {
  console.log(row);
};

// 模拟数据
const apiMockData = (length: number) => {
  return Array.from({ length }).map((item, index) => {
    return {
      id: `${pageUI.value.page}-${index + 1}`,
      name: `user${index + 1}`,
      age: Math.floor(Math.random() * 100),
      avatar: 'https://th.bing.com/th/id/OIP.5CeSOSjy8zeN7nj56XMbqQHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7',
      address: '北京市朝阳区',
      phone: '13888888888',
      email: '13888888888@163.com',
      company: `上海功能测试无限公司${index + 1}`,
      remark: '自定义tr属性',
      inviteNum: Math.floor(Math.random() * 100),
      inviteCode: '123456',
      createTime: '2020-01-01 12:00:00',
      updateTime: '2020-01-01 12:00:00',
    };
  });
};

// 表格配置
const tableColumn = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  { colKey: 'id', title: '用户ID', width: 120, align: 'center' },
  { colKey: 'avatar', title: '用户头像', width: 120, align: 'center' },
  { colKey: 'age', title: '用户年龄', width: 120, align: 'center' },
  { colKey: 'phone', title: '联系方式', width: 150, align: 'center' },
  { colKey: 'email', title: '邮箱地址', width: 200, align: 'center', ellipsis: true },
  { colKey: 'company', title: '公司名称', width: 200, align: 'center' },
  {
    colKey: 'remark',
    title: '用户备注',
    width: 120,
    align: 'center',
    attrs: { style: { background: 'var(--td-brand-color-1)' } },
  },
  { colKey: 'inviteNum', title: '邀请数量', width: 120, align: 'center' },
  { colKey: 'inviteCode', title: '邀请码', width: 120, align: 'center' },
  { colKey: 'createTime', title: '创建时间', width: 200, align: 'center' },
  { colKey: 'updateTime', title: '更新时间', width: 200, align: 'center' },
  { colKey: 'op', title: '操作', width: 100, align: 'center', fixed: 'right' },
];
</script>

<style lang="less" scoped></style>
