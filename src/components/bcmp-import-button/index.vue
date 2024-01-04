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
              <div v-if="params && params.files.length == 0 && !params.dragActive" class="upload-btn">
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
import { CloudUploadIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, RequestMethodResponse, UploadFile } from 'tdesign-vue-next';
import { PropType, ref } from 'vue';

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
const requestSuccessMethod: RequestMethod = (file) => {
  // debugger;
  return new Promise((resolve) => {
    // 上传进度控制示例
    let percent = 0;
    const percentTimer = setInterval(() => {
      if (percent + 10 < 99) {
        percent += 10;
        uploadRef.value.uploadFilePercent({ file, percent });
      } else {
        clearInterval(percentTimer);
      }
    }, 10000);

    const timer = setTimeout(() => {
      // resolve 参数为关键代码
      resolve({ status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } });

      clearTimeout(timer);
      clearInterval(percentTimer);
    }, 1000000);
  });
};
const files = ref([]);
const uploadRef = ref();
const progress = ref(0);

const handleChange = (value: any, context: any) => {
  console.log(value);
  console.log(progress);
  console.log(context);
  MessagePlugin.success(`文件  上传成功`);
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
