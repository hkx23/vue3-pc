<template>
  <t-button :theme="importTheme" variant="base" @click="formUserVisible = true">{{ importText }}</t-button>

  <t-dialog v-model:visible="formUserVisible" top="25px" width="800px" :confirm-btn="null" header="导入数据">
    <cmp-container>
      <t-steps :current="current" readonly>
        <t-step-item title="选择EXCEL" content="选择EXCEL" />
        <t-step-item title="预览数据" content="预览数据" />
        <t-step-item title="导入数据" content="导入数据" />
      </t-steps>
      <div>
        <t-space direction="vertical" style="width: 100%">
          <ul class="import-tip">
            <li>
              <span>支持 5MB 以内的xls、xlsx格式文件</span>
            </li>
            <li><span>文件中数据不能超过50000行、500列</span></li>
            <li><span>导入前请下载模板文件，收集数据后导入</span></li>
          </ul>
          <t-upload
            ref="uploadRef"
            v-model="files"
            style="width: 100%"
            :request-method="requestSuccessMethod"
            draggable
            theme="custom"
            @change="handleChange"
          >
            <template #dragContent="params">
              {{ JSON.stringify(params) }}
              <div
                v-if="
                  (params && params.files.length == 0 && !params.dragActive) ||
                  (params && params.files.length > 0 && params.files[0].status == 'fail')
                "
                class="upload-btn"
              >
                <t-space direction="vertical" :size="8">
                  <cloud-upload-icon class="upload-icon" />
                  <span>将文件拖拽到此区域，或 <t-link theme="primary">点击添加</t-link></span
                  ><span class="size-text">文件大小不得超过 5 MB</span>
                </t-space>
              </div>
              <p v-if="params && params.dragActive">释放鼠标</p>
              <t-progress
                v-if="params && params.files.length > 0 && params.files[0].status == 'progress'"
                theme="line"
                :percentage="params.files[0].percent"
              />

              <!-- <ul v-if="files && files.length" style="padding: 0">
                <li v-for="file in files" :key="file.name" style="list-style-type: none">{{ file.name }}</li>
              </ul>
              <template v-else>
                <p v-if="params && params.dragActive">释放鼠标</p>
                <t-button v-else-if="progress < 1"> <cloud-upload-icon /></t-button>
              </template>
              <t-button v-if="files && files.length" size="small" style="margin-top: 36px">更换文件</t-button> -->
              <!-- <span>数据状态：{{params}}</span> -->
            </template>
          </t-upload>
        </t-space>
      </div>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="tsx" name="BcmpSelectBusiness">
import _ from 'lodash';
import { CloudUploadIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, RequestMethodResponse, UploadFile } from 'tdesign-vue-next';
import { PropType, ref } from 'vue';
import * as XLSX from 'xlsx';

const files = ref([]);
const uploadRef = ref();
const progress = ref(0);
type RequestMethod = (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
// / 00-组件属性定义
const props = defineProps({
  // 导入按钮文字
  importText: {
    type: String,
    default: '导入',
  },
  // 导入按钮图标
  importIcon: {
    type: [String],
    default: '',
  },
  // 导入按钮样式
  importTheme: {
    type: String as PropType<'default' | 'success' | 'primary' | 'warning' | 'danger'>,
    default: 'default',
  },
});
// 示例代码：自定义上传方法，一个请求上传一个文件
// eslint-disable-next-line
// file 为等待上传的文件信息，用于提供给上传接口。file.raw 表示原始文件
const requestSuccessMethod: RequestMethod = (file: UploadFile) => {
  return new Promise((resolve) => {
    // 校验逻辑
    if (file.size / 1024 / 1024 > 5) {
      MessagePlugin.error('只能上传小于5M的文件');
      resolve({ status: 'fail', response: {} });
      return;
    }
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      MessagePlugin.error('只能上传xlsx格式文件');
      resolve({ status: 'fail', response: {} });
      return;
    }
    loadFile(file);

    // 上传进度控制示例

    // const timer = setTimeout(() => {
    //   // resolve 参数为关键代码
    //   resolve({ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } });

    //   clearTimeout(timer);
    //   clearInterval(percentTimer);
    // }, 1000000);
  });
};
const worksheetData = ref<any[]>([]);
const worksheetHeaderData = ref<any[]>([]);
// 上传成功读取数据，走验证接口
const loadFile = (res) => {
  const reader = new FileReader();
  reader.readAsBinaryString(res.raw);
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = e.target?.result;
    if (typeof data === 'string') {
      const workbook = XLSX.read(data, { type: 'binary' });
      if (typeof workbook.Sheets[workbook.SheetNames[0]] === 'undefined') {
        MessagePlugin.error('导入文件格式错误');
        return;
      }
      // 初始化JSON数组和标题行
      const jsonData: any[] = [];
      const headers: string[] = [];

      const sheetName = workbook.SheetNames[0]; // 假设我们只处理第一个工作表
      const worksheet = workbook.Sheets[sheetName];
      // 获取单元格范围和合并单元格信息
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      const merges = worksheet['!merges'] || [];

      if (range.e.c > 500) {
        MessagePlugin.error('导入文件列数不能超过500列');
        return;
      }
      if (range.e.r > 5000) {
        MessagePlugin.error('导入文件行数不能超过5000行');
        return;
      }
      if (range.e.r < 1) {
        MessagePlugin.error('不存在导入数据行,请检查导入文件');
        return;
      }

      for (let col = range.s.c; col <= range.e.c; col++) {
        const columnHeader = String.fromCharCode(65 + col); // 将列索引转换为字母（A, B, C...）
        headers.push(columnHeader);
      }
      let tempPercent = 0;
      // 遍历数据行，并考虑合并单元格的情况
      for (let row = range.s.r; row <= range.e.r; row++) {
        const rowData: Record<string, string> = {};
        const currentPercent = Math.round((row / range.e.r) * 100);
        if (currentPercent !== tempPercent) {
          uploadRef.value.uploadFilePercent({ file: res, percent: currentPercent });
          tempPercent = currentPercent;
        }

        for (let col = range.s.c; col <= range.e.c; col++) {
          let cellValue = '';

          // 检查当前单元格是否在合并范围内
          for (const merge of merges) {
            const mergedRangeStart = XLSX.utils.decode_cell(merge.s.toString());

            if (mergedRangeStart.r === row && mergedRangeStart.c === col) {
              const mergedRange = XLSX.utils.decode_range(merge.toString());
              cellValue = getMergedCellValue(worksheet, mergedRange);
              break;
            }
          }

          // 如果不在合并范围内，则获取常规单元格值
          if (!cellValue) {
            const cellAddress = { r: row, c: col };
            const encodedCellAddress = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[encodedCellAddress];
            cellValue = cell ? cell.v : null;
          }

          if (cellValue !== null) {
            rowData[headers[col - range.s.c]] = cellValue; // 使用当前列对应的标题
          }
        }

        jsonData.push(rowData);
      }
      const filteredData = jsonData.filter((rowItem) => Object.keys(rowItem).length > 1);
      console.log(`arrData${filteredData}`);
      worksheetData.value = filteredData;
      worksheetHeaderData.value = headers;
    }
  };
};
const getMergedCellValue: any = (worksheet: XLSX.WorkSheet, mergedRange: XLSX.Range) => {
  for (let { r } = mergedRange.s; r <= mergedRange.e.r; r++) {
    for (let { c } = mergedRange.s; c <= mergedRange.e.c; c++) {
      const cellAddress = { r, c };
      const cell = XLSX.utils.encode_cell(cellAddress);
      const cellValue = worksheet[cell]?.v;

      if (cellValue) {
        return cellValue;
      }
    }
  }
  return '';
};
const handleChange = (value: any, context: any) => {
  console.log(`valueG:${JSON.stringify(value)}`);
  console.log(`progress:${JSON.stringify(progress.value)}`);
  console.log(`context:${JSON.stringify(context)}`);
  if (context.trigger === 'progress-fail') {
    files.value = [];
  } else {
    MessagePlugin.success(`文件  上传成功`);
    files.value = [];
  }
};

// const upload = () => {
//   uploadRef.value.triggerUpload();
// };
console.log(props);
const current = ref(0);
const formUserVisible = ref(false);
</script>
<style scoped lang="less">
.import-tip {
  background: #f5f6f8;
  border-radius: 3px;
  color: #141e31;
  font-size: 14px;
  line-height: 22px;
  padding: 20px 20px 20px 40px;

  li {
    list-style-type: disc;
  }
}

:deep(.t-upload__dragger) {
  width: 100%;
  border: 1px dashed var(--td-brand-color-light);
}

.upload-btn {
  text-align: center;

  .upload-icon {
    font-size: 42px;
    color: var(--td-brand-color);
  }

  .size-text {
    color: #838892;
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>
