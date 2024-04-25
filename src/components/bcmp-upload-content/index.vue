<template>
  <!-- #region 上传附件主界面 -->
  <cmp-card :ghost="props.ghost">
    <cmp-table
      ref="tableRef"
      :row-key="rowKey"
      :table-column="columns"
      :table-data="tableData"
      :is-fixed-height="true"
      :loading="isLoading"
      :selected-row-keys="selectedRowKeys"
      :select-on-row-click="false"
      :show-setting="false"
      :show-pagination="false"
      @refresh="fetchData"
      @select-change="rehandleSelectChange"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #fileName="{ row }">
        <t-link v-show="row.percent === 100" theme="primary" @click="previewFun(row)"
          ><t-icon :name="getFileIcon(row.fileName)"></t-icon>{{ row.fileName }}</t-link
        >
        <t-space v-show="row.percent !== 100" direction="vertical" :size="8">
          <span> 上传中</span>
          <t-progress :percentage="50" :label="false" />
        </t-space>
      </template>

      <template #op="{ row }">
        <t-space :size="8">
          <t-link theme="primary" @click="downAtta(row)">{{ '下载' }}</t-link>
          <t-popconfirm v-if="!$props.readonly" theme="default" content="确认删除吗" @confirm="onDelConfirm(row)">
            <t-link theme="primary">{{ '删除' }}</t-link>
          </t-popconfirm>
        </t-space>
      </template>
      <template #button>
        <t-space :size="8">
          <t-upload
            v-if="!$props.readonly"
            ref="uploadRef"
            v-model="files"
            :allow-upload-duplicate-file="true"
            :request-method="requestMethod"
            theme="custom"
            :multiple="false"
            :before-upload="beforeUpload"
            @fail="handleFail"
          >
            <t-button theme="primary" :disabled="tableData?.length >= props.uploadCountLimit">上传</t-button>
          </t-upload>
          <slot name="buttons"></slot>
          <t-popconfirm
            v-if="!$props.readonly"
            theme="default"
            :disabled="selectedRowKeys?.length <= 0"
            content="确认删除已选中文件吗"
            @confirm="batchDelete()"
          >
            <t-button theme="default" :disabled="selectedRowKeys?.length <= 0">批量删除</t-button>
          </t-popconfirm>
          <t-button theme="default" :disabled="selectedRowKeys?.length <= 0" @click="batchDownload">批量下载</t-button>
        </t-space>
      </template>
    </cmp-table>
  </cmp-card>
  <!-- #endregion -->
  <!-- 查看 -->
  <docViewer ref="fileViewerRef"></docViewer>
</template>

<script setup lang="tsx" name="BcmpUploadContent">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, RequestMethodResponse, TableRowData, UploadFile } from 'tdesign-vue-next';
import { computed, onMounted, PropType, ref, watch } from 'vue';

import { api } from '@/api/main';

// import { AddFileType } from './constants';
import docViewer from './docViewer.vue';

// / 00-组件属性定义

// 读取附件清单-初始化列表，dataList作为参数传入
// 上传附件成功事件-上传绑定数据方法前端调用，返回成功上传的ID
// 批量删除成功事件-返回成功删除的ID列表
// 抛出事件
const emits = defineEmits(['fileChange', 'uploadSuccess', 'uploadfail', 'deleteSuccess', 'batchDeleteSuccess']);

const props = defineProps({
  // 上传文件大小限制，单位为M，默认为5
  uploadFileSizeLimit: {
    type: Number,
    default: 5,
  },
  uploadTypeLimit: {
    type: String,
    default: '',
  },
  uploadCountLimit: {
    type: Number,
    default: 999,
  },
  // 上传文件夹路径
  uploadPath: {
    type: String,
    default: 'Common',
  },
  // 附件列表
  fileList: {
    type: Array as PropType<any[]>,
    default: () => [] as any[],
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  isHandDelete: {
    type: Boolean,
    default: false,
  },
});
// const previewType = 'doc,docx,jpg,jpeg,png,xlsx';
const previewType = 'jpg,jpeg,png,docx,xlsx,pdf';
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
      align: 'left',
    },
    {
      colKey: 'fileName',
      title: '附件名称',
      ellipsis: true,
      align: 'left',
    },
    {
      colKey: 'fileSizeShow',
      title: '文件大小',
      ellipsis: true,
      align: 'left',
    },
    {
      colKey: 'timeUpload',
      title: '上传时间',
      ellipsis: true,
      align: 'left',
    },
    {
      colKey: 'op',
      title: '操作',
      align: 'left',
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
const uploadPath = ref(props.uploadPath);

const tableData = ref<any[]>([]);

// 查询数据
const fetchData = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    tableData.value = _.cloneDeep(props.fileList);
    tableData.value.forEach((item) => {
      item.fileSizeShow = item.fileSize ? formatBytes(item.fileSize) : '-';
      item.timeUpload = item.timeUpload || '-';
      item.percent = 100;
    });

    // tableData.value = mockAttachments.map((attachment, index) => ({
    //   id: attachment.id.toString(),
    //   serialNumber: index + 1,
    //   fileName: attachment.fileName,
    //   fileSize: formatBytes(attachment.fileSize),
    //   timeUpload: attachment.timeUpload,
    // }));
  }, 1000);
};

// 上传失败后，表格对应行需要删除
const handleFail = ({ file }) => {
  tableData.value = tableData.value.filter((item) => item.fileName !== file.name);
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
  files.value = [];
  emits('uploadfail', file);
};

// 选择行变化
const rehandleSelectChange = (value, _ctx) => {
  selectedRowKeys.value = value;
  // console.log(value, ctx);
};

// 上传前校验
const beforeUpload = (file: UploadFile) => {
  if (file.size / 1024 / 1024 > props.uploadFileSizeLimit) {
    MessagePlugin.error(`只能上传小于${props.uploadFileSizeLimit}M的文件`);
    return false;
  }
  const fileCount = tableData.value.length;
  if (fileCount >= props.uploadCountLimit) {
    MessagePlugin.error(`只能上传${props.uploadCountLimit}个文件`);
    return false;
  }

  if (props.uploadTypeLimit) {
    // 判断上传文件是否在限制文件类型里面
    // 文件类型使用文件名截取最后一部分
    const fileType = file.name.split('.').pop();
    if (!props.uploadTypeLimit.includes(fileType)) {
      MessagePlugin.error(`只能上传[${props.uploadTypeLimit}]类型的文件`);
      return false;
    }
  }

  // 判断选择文件是否已存在于列表中
  for (let i = 0; i < tableData.value.length; i++) {
    if (tableData.value[i].fileName === file.name) {
      MessagePlugin.error(`文件 ${file.name} 已经存在`);
      return false;
    }
  }
  // console.log(file);
  // 将file复制成tableData的一个项目，加入到tableData中
  // todo:ID问题

  const addFile: any = {
    id: Math.floor(Math.random() * 1999990),
    serialNumber: tableData.value.length + 1,
    fullFileName: `${uploadPath.value}/${file.name}`,
    fileName: file.name,
    filePath: uploadPath.value,
    fileSize: file.size,
    fileSizeShow: formatBytes(file.size),
    timeUpload: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    signedUrl: '',
    percent: 0,
    fileType: file.type,
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
    lastItem.percent = 100;
    // console.log(lastItem);
    emits('uploadSuccess', lastItem);

    return { status: 'success', response: { url: 'none' } };
  } catch (error) {
    MessagePlugin.error(error.message);
    // 在这里可以根据错误类型返回失败状态
    return { status: 'fail', response: {} };
  } finally {
    files.value = [];
  }
};

// 文件上传
const upLoadFile = async (file: UploadFile) => {
  const res = await api.file.uploadFile(
    {
      path: uploadPath.value,
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
  // console.log('下载附件：', row);
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
  // console.log('删除附件：', row);
  try {
    if (!props.isHandDelete) {
      await api.file.deleteFile({ path: uploadPath.value, fileName: row.fileName });
      tableData.value = tableData.value.filter((item) => item.id !== row.id);
      emits('deleteSuccess', row);
    } else {
      tableData.value = tableData.value.filter((item) => item.id !== row.id);
      emits('deleteSuccess', row);
    }
  } catch (error) {
    MessagePlugin.error(error.message);
  }
};
const batchDelete = async () => {
  if (!(selectedRowKeys?.value?.length > 0)) {
    MessagePlugin.warning('请选择至少一行数据！');
    return;
  }
  // console.log('批量删除附件：', selectedRowKeys.value);

  if (selectedRowKeys.value.length > 0) {
    const deleteRows = tableData.value.filter((item) => selectedRowKeys.value.includes(item.id));
    if (!props.isHandDelete) {
      const deleteFileNames = deleteRows.map((item) => item.fileName);
      // 批量删除
      await api.file.batchDeleteFile({ path: uploadPath.value, fileNames: deleteFileNames });
      tableData.value = tableData.value.filter((item) => !selectedRowKeys.value.includes(item.id));
      emits('batchDeleteSuccess', deleteRows);
    } else {
      emits('batchDeleteSuccess', deleteRows);
    }
    selectedRowKeys.value = [];
  }
};
const batchDownload = () => {
  if (!(selectedRowKeys?.value?.length > 0)) {
    MessagePlugin.warning('请选择一行数据！');
    return;
  }
  // console.log('批量下载附件：', selectedRowKeys.value);
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
  //   await api.file.downloadSelectedFilesAsZip({ path: uploadPath.value, fileNames: downFileNames });
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
  if (fileName) {
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
  }

  return iconName;
};
const previewFun = (file: any) => {
  // console.log(file.signedUrl);
  dialogDoc.value = true;
  const data = file;
  // 上传过的文件组成完成的网络路径
  if (file.signedUrl) {
    data.src = file.signedUrl;
  }

  const suffix = data.fileName.split('.')[1];
  if (previewType.indexOf(suffix) === -1) {
    MessagePlugin.warning(`预览格式不支持,支持格式:${previewType}!`);
    return;
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

watch(
  () => props.fileList,
  () => {
    fetchData();
  },
  { deep: true },
);

watch(
  () => props.uploadPath,
  (val) => {
    uploadPath.value = val;
  },
  { deep: true },
);

const getFileList = () => {
  return tableData.value;
};
const setFileList = (files) => {
  tableData.value = files;
};
defineExpose({
  getFileList,
  setFileList,
});
</script>

<style scoped lang="less"></style>
