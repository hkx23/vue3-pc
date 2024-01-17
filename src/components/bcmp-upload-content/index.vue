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
      :selected-row-keys="selectedRowKeys"
      :active-row-type="'multiple'"
      :select-on-row-click="false"
      :show-setting="false"
      :show-pagination="false"
      @refresh="fetchData"
      @select-change="rehandleSelectChange"
    >
      <template #fileName="{ row }">
        <t-link theme="primary" @click="previewFun(row)"
          ><t-icon :name="getFileIcon(row.fileName)"></t-icon>{{ row.fileName }}</t-link
        >
      </template>

      <template #op="{ row }">
        <t-space :size="8">
          <t-link theme="primary" @click="downAtta(row)">{{ '下载' }}</t-link>
          <t-popconfirm theme="default" content="确认删除吗" @confirm="onDelConfirm(row)">
            <t-link theme="primary">{{ '删除' }}</t-link>
          </t-popconfirm>
        </t-space>
      </template>
      <template #button>
        <t-space :size="8">
          <t-upload
            ref="uploadRef"
            v-model="files"
            :request-method="requestMethod"
            theme="custom"
            :before-upload="beforeUpload"
            @fail="handleFail"
          >
            <t-button theme="primary">上传</t-button>
          </t-upload>
          <t-button theme="default" @click="batchDelete">批量删除</t-button>
          <t-button theme="default" @click="batchDownload">批量下载</t-button>
        </t-space>
      </template>
    </cmp-table>
  </cmp-card>
  <!-- #endregion -->
  <!-- 查看 -->
  <viewer ref="fileViewerRef" />
</template>

<script setup lang="tsx" name="BcmpUploadContent">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, RequestMethodResponse, TableRowData, UploadFile } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';

import Viewer from './viewer.vue';

// / 00-组件属性定义

// 读取附件清单URL
// 上传附件URL
// 批量下载URL?
// 批量删除URL?
// 删除URL-提交后再一起删除？如果删除了又没有按提交，如何恢复？
// 上传文件类型限制
const props = defineProps({
  // 上传文件大小限制，单位为M，默认为5
  uploadFileSizeLimit: {
    type: Number,
    default: 5,
  },
  // 上传文件夹路径
  uploadPath: {
    type: String,
    default: 'Common',
  },
  // 上传文件类型限制
  uploadFileTypeLimit: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const previewType = 'doc,docx,jpg,jpeg,png,xlsx,pdf';
type RequestMethod = (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
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
const files = ref([]);

// const tips = '上传文件大小在 5M 以内';
const rowKey = 'id';
const isLoading = ref(false);
const selectedRowKeys = ref([]);

const tableData = ref([]);

const mockAttachments = [
  // {
  //   id: 1,
  //   fileName: 'example.pdf',
  //   fileSize: 4423123323,
  //   timeUpload: '2022-01-01',
  // },
  // {
  //   id: 2,
  //   fileName: 'project-plan.xlsx',
  //   fileSize: 123123123,
  //   timeUpload: '2022-02-15',
  // },
  // {
  //   id: 3,
  //   fileName: 'presentation.pptx',
  //   fileSize: 2776231,
  //   timeUpload: '2022-03-10',
  // },
  // {
  //   id: 4,
  //   fileName: 'team-photo.jpg',
  //   fileSize: 23412323,
  //   timeUpload: '2022-04-22',
  // },
  // 更多附件...
];

// 查询数据
const fetchData = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    tableData.value = mockAttachments.map((attachment, index) => ({
      id: attachment.id.toString(),
      serialNumber: index + 1,
      fileName: attachment.fileName,
      fileSize: formatBytes(attachment.fileSize),
      timeUpload: attachment.timeUpload,
    }));
  }, 1000);
};

// 上传失败后，表格对应行需要删除
const handleFail = ({ file }) => {
  tableData.value = tableData.value.filter((item) => item.id !== file.id);
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

// 选择行变化
const rehandleSelectChange = (value, ctx) => {
  selectedRowKeys.value = value;
  console.log(value, ctx);
};

// 上传前校验
const beforeUpload = (file: { size: number; name: any }) => {
  if (file.size / 1024 / 1024 > props.uploadFileSizeLimit) {
    MessagePlugin.error(`只能上传小于${props.uploadFileSizeLimit}M的文件`);
    return false;
  }

  console.log(file);
  // 将file复制成tableData的一个项目，加入到tableData中
  const addFile = {
    id: Math.floor(Math.random() * 1999990),
    serialNumber: tableData.value.length + 1,
    fileName: file.name,
    fileSize: formatBytes(file.size),
    timeUpload: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    signedUrl: '',
    percent: 0, // 上传进度
  };
  tableData.value.push(addFile);
  return true;
};

// 上传文件处理
const requestMethod: RequestMethod = async (file: UploadFile) => {
  try {
    const res = await upLoadFile(file);
    // 解析成功后，返回成功状态
    const lastItem = tableData.value[tableData.value.length - 1];
    lastItem.signedUrl = res;
    return { status: 'success', response: { url: 'none' } };
  } catch (error) {
    MessagePlugin.error(error.message);
    // 在这里可以根据错误类型返回失败状态
    return { status: 'fail', response: {} };
  }
};

// 文件上传
const upLoadFile = async (file: UploadFile) => {
  const res = await api.file.uploadFile(
    {
      path: props.uploadPath,
    },
    {
      file: file.raw,
    },
  );
  return res;
};

// 计算文件大小显示
const formatBytes = (sizeInBytes: number, decimalPlaces = 2) => {
  if (sizeInBytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = Math.floor(Math.log(sizeInBytes) / Math.log(1024));

  // ToFixed() 方法用于保留指定位数的小数
  const formattedSize = (sizeInBytes / 1024 ** index).toFixed(decimalPlaces);

  return `${formattedSize} ${units[index]}`;
};

// 下载附件
const downAtta = (row: any) => {
  // 通过URL下载附件
  const link = document.createElement('a');
  const downLink = row.signedUrl;
  const fileName = downLink.substring(downLink.lastIndexOf('/') + 1);
  link.href = downLink;
  link.download = fileName; // 自定义文件名，根据实际情况调整
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const onDelConfirm = async (row: any) => {
  console.log('删除附件：', row);
  try {
    await api.file.deleteFile({ path: props.uploadPath, fileName: row.fileName });
    tableData.value = tableData.value.filter((item) => item.id !== row.id);
  } catch (error) {
    MessagePlugin.error(error.message);
  }
};
const batchDelete = async () => {
  console.log('批量删除附件：', selectedRowKeys.value);

  if (selectedRowKeys.value.length > 0) {
    const deleteRows = tableData.value.filter((item) => selectedRowKeys.value.includes(item.id));
    const deleteFileNames = deleteRows.map((item) => item.fileName);
    // 批量删除
    await api.file.batchDeleteFile({ path: props.uploadPath, fileNames: deleteFileNames });
    tableData.value = tableData.value.filter((item) => !selectedRowKeys.value.includes(item.id));
  }
};
const batchDownload = () => {
  console.log('批量下载附件：', selectedRowKeys.value);
  if (selectedRowKeys.value.length > 0) {
    const downRows = tableData.value.filter((item) => selectedRowKeys.value.includes(item.id));

    // 创建一个队列来保存待下载的资源信息
    const downloadQueue = downRows.map((row) => ({
      link: row.signedUrl,
      fileName: row.signedUrl.substring(row.signedUrl.lastIndexOf('/') + 1),
    }));

    // 定义一个递归方法来处理下载队列
    let currentDownloadIndex = 0;
    const processDownloadQueue = () => {
      if (currentDownloadIndex < downloadQueue.length) {
        const { link, fileName } = downloadQueue[currentDownloadIndex];

        // 创建临时下载链接元素并触发下载
        const tempLink = document.createElement('a');
        tempLink.href = link;
        tempLink.download = fileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        // 延迟处理下一个下载任务，确保浏览器有足够的时间开始下载
        setTimeout(() => {
          currentDownloadIndex++;
          processDownloadQueue();
        }, 500); // 调整延迟时间以适应实际需求
      }
    };

    // 启动下载队列处理
    processDownloadQueue();
  }

  // if (selectedRowKeys.value.length > 0) {
  //   const downRows = tableData.value.filter((item) => selectedRowKeys.value.includes(item.id));
  //   const downFileNames = downRows.map((item) => item.fileName);
  //   // 批量下载
  //   await api.file.downloadSelectedFilesAsZip({ path: props.uploadPath, fileNames: downFileNames });
  //   // tableData.value = tableData.value.filter((item) => !selectedRowKeys.value.includes(item.id));
  // }
};
// 然后在onMounted钩子中转换并填充tableData
onMounted(() => {
  fetchData();
});

const dialogDoc: any = ref(false);
const fileViewerRef = ref<any>(null);
const getFileIcon = (fileName: any) => {
  let iconName = 'file-unknown';
  const suffix = fileName.split('.')[1];
  switch (suffix) {
    case 'docx':
      iconName = 'file-word';
      break;
    case 'xlsx':
      iconName = 'file-excel';
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
      iconName = 'file-image';
      break;
    case 'pdf':
      iconName = 'file-pdf';
      break;
    default:
      break;
  }
  return iconName;
};
const previewFun = (file: any) => {
  console.log(file.signedUrl);
  dialogDoc.value = true;
  const data = file;
  // 上传过的文件组成完成的网络路径
  if (file.signedUrl) {
    data.src = file.signedUrl;
  }

  const suffix = data.fileName.split('.')[1];
  if (previewType.indexOf(suffix) === -1) {
    MessagePlugin.warning(`预览格式不支持,支持格式:${previewType}!`);
  }
  if (suffix === 'docx') {
    fileViewerRef.value?.viewDocx(data);
  } else if (suffix === 'xlsx') {
    fileViewerRef.value?.viewXlsx(data);
  } else if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'png') {
    fileViewerRef.value?.viewImg(data);
  } else if (suffix === 'pdf') {
    fileViewerRef.value?.viewPdf(data);
  }
};
</script>

<style scoped lang="less"></style>
