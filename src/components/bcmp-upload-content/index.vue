<template>
  <!-- #region 上传附件主界面 -->
  <cmp-card :ghost="true">
    <cmp-table
      ref="tableRef"
      :row-key="rowKey"
      :table-column="columns"
      :table-data="tableData"
      :is-fixed-height="true"
      :loading="isLoading"
      :show-setting="false"
      :show-pagination="false"
      @refresh="fetchData"
    >
      <template #op>
        <t-space :size="8">
          <t-link theme="primary">{{ '下载' }}</t-link>
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
            <t-link theme="primary">{{ '删除' }}</t-link>
          </t-popconfirm>
        </t-space>
      </template>

      <template #button>
        <t-button theme="primary" @click="uploadFile">上传</t-button>
        <t-button theme="default" @click="batchDelete">批量删除</t-button>
        <t-button theme="default" @click="batchDownload">批量下载</t-button>
      </template>
    </cmp-table>

    <!-- <div class="table-box">
      <div class="table-box_header">
  
        <t-space size="small" :align="'center'">
          <slot name="operate"></slot>
          <t-space size="small" :align="'center'">
            <slot name="button"></slot>
          </t-space>
          <t-space v-if="showSetting" size="small" :align="'center'">
            <t-button v-if="props.enableExport" shape="square" variant="outline" @click="onExport">
              <template #icon>
                <t-icon name="file-export" />
              </template>
            </t-button>
            <t-button shape="square" variant="outline" :disabled="loading" @click="onRefresh">
              <template #icon>
                <t-icon name="refresh" />
              </template>
            </t-button>
            <t-button shape="square" variant="outline" @click="data.visible = true">
              <template #icon>
                <t-icon name="adjustment" />
              </template>
            </t-button>
          </t-space>
        </t-space>
      </div>
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
    >
      <template #operate>
        <t-space :size="8">
          <t-link theme="primary">{{ '下载' }}</t-link>
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm()">
            <t-link theme="primary">{{ '删除' }}</t-link>
          </t-popconfirm>
        </t-space>
      </template>
    </t-table> -->
  </cmp-card>
  <!-- #endregion -->
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
      width: 50,
    },
    {
      colKey: 'serial-number',
      title: '序号',
      width: 60,
      align: 'center',
    },
    // {
    //   colKey: 'fileType',
    //   title: '文件类型',
    //   ellipsis: true,
    //   align: 'center',
    // },
    {
      colKey: 'fileName',
      title: '附件名称',
      ellipsis: true,
      align: 'center',
    },
    {
      colKey: 'fileSize',
      title: '文件大小',
      ellipsis: true,
      align: 'center',
    },
    {
      colKey: 'timeUpload',
      title: '上传时间',
      ellipsis: true,
      align: 'center',
    },
    {
      colKey: 'op',
      title: '操作',
      align: 'center',
      ellipsis: true,
    },
  ];
  return tableColumn;
});

const rowKey = 'id';
const isLoading = ref(false);
const selectedRowKeys = ref([]);

const tableData = ref([]);

const mockAttachments = [
  {
    id: 1,
    fileName: 'example.pdf',
    fileSize: '1.23 MB',
    timeUpload: '2022-01-01',
  },
  {
    id: 2,
    fileName: 'project-plan.xlsx',
    fileSize: '456 KB',
    timeUpload: '2022-02-15',
  },
  {
    id: 3,
    fileName: 'presentation.pptx',
    fileSize: '3.89 MB',
    timeUpload: '2022-03-10',
  },
  {
    id: 4,
    fileName: 'team-photo.jpg',
    fileSize: '1.54 MB',
    timeUpload: '2022-04-22',
  },
  // 更多附件...
];

const fetchData = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    tableData.value = mockAttachments.map((attachment, index) => ({
      id: attachment.id.toString(),
      serialNumber: index + 1,
      fileName: attachment.fileName,
      fileSize: attachment.fileSize,
      timeUpload: attachment.timeUpload,
    }));
  }, 1000);
};

const uploadFile = () => {
  console.log('上传附件');
};
const batchDelete = () => {
  console.log('批量删除附件：', selectedRowKeys.value);
};
const batchDownload = () => {
  console.log('批量下载附件：', selectedRowKeys.value);
};
// 然后在onMounted钩子中转换并填充tableData
onMounted(() => {
  fetchData();
});
const onDelConfirm = () => {
  console.log('删除附件：', selectedRowKeys.value);
};
</script>

<style scoped lang="less"></style>
