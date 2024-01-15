<template>
  <!-- 上传附件主界面 -->
  <cmp-container>
    <!-- #region 上传附件主界面 -->
    <cmp-card>
      <t-table
        :data="tableData"
        :columns="columns"
        :row-key="rowKey"
        :loading="isLoading"
        :selected-row-keys="selectedRowKeys"
        bordered
        stripe
        lazy-load
        @change="rehandleChange"
        @select-change="onSelectChange"
      />
    </cmp-card>
    <!-- #endregion -->
  </cmp-container>
</template>

<script setup lang="tsx" name="BcmpUploadContent">
import _ from 'lodash';
import { TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

// 计算属性 - 根据解析的数据计算出表格头
const columns = computed(() => {
  const tableColumn: Array<TableRowData> = [
    {
      colKey: 'row-select',
      type: 'multiple',
      width: 46,
    },
    {
      colKey: 'serial-number',
    },
    {
      colKey: 'fileName',
      title: '附件名称',
      ellipsis: true,
    },
    {
      colKey: 'fileSize',
      title: '文件大小',
      ellipsis: true,
    },
    {
      colKey: 'timeUpload',
      title: '上传时间',
      ellipsis: true,
    },
    {
      colKey: 'operate',
      title: '操作',
      ellipsis: true,
    },
  ];
  return tableColumn;
});

const rowKey = 'id';
const isLoading = ref(false);
const selectedRowKeys = ref([]);

const tableData = ref([]);

// BaseTable 中只有 page-change 事件，没有 change 事件
const rehandleChange = (changeParams, triggerAndData) => {
  console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
};
// 勾选后变化
const onSelectChange = (value, params) => {
  selectedRowKeys.value = value;
  console.log(value, params);
};

const mockAttachments = [
  {
    id: 1,
    fileName: 'example.pdf',
    fileSize: '1.23 MB',
    timeUpload: '2022-01-01',
    operations: ['查看', '下载', '删除'],
  },
  {
    id: 2,
    fileName: 'project-plan.xlsx',
    fileSize: '456 KB',
    timeUpload: '2022-02-15',
    operations: ['查看', '下载', '删除'],
  },
  {
    id: 3,
    fileName: 'presentation.pptx',
    fileSize: '3.89 MB',
    timeUpload: '2022-03-10',
    operations: ['查看', '下载', '删除'],
  },
  {
    id: 4,
    fileName: 'team-photo.jpg',
    fileSize: '1.54 MB',
    timeUpload: '2022-04-22',
    operations: ['查看', '下载', '删除'],
  },
  // 更多附件...
];

// 然后在onMounted钩子中转换并填充tableData
onMounted(() => {
  tableData.value = mockAttachments.map((attachment, index) => ({
    rowKey: attachment.id.toString(),
    serialNumber: index + 1,
    fileName: attachment.fileName,
    fileSize: attachment.fileSize,
    timeUpload: attachment.timeUpload,
    operate: attachment.operations.join(' / '),
  }));
});
</script>

<style scoped lang="less"></style>
