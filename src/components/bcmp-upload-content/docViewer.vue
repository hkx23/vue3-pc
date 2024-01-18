<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="dialogTitle"
    :confirm-btn="null"
    cancel-btn="关闭"
    width="80%"
    @close="dialogClose"
  >
    <!-- doc -->
    <div v-if="fileType == 'doc'" ref="docxRef" class="word-div">
      <!-- <vue-office-docx :src="previewAddress"></vue-office-docx> -->
    </div>
    <!-- xlsx -->
    <div v-if="fileType == 'excel'" ref="xlsxRef" class="xlsx-div">
      <!-- <vue-office-excel :src="previewAddress" /> -->
      <!-- <t-tabs v-model="activeName">
        <t-tab-panel v-for="(item, index) in excelSheet" :key="index" :label="item.name" :value="item.name">
          <div class="table" v-html="item.html"></div>
        </t-tab-panel>
      </t-tabs> -->
    </div>
    <!-- 图片 -->
    <div v-if="fileType == 'img'" class="img-div">
      <t-image :src="fileData.src" :alt="fileData.fileName" />
    </div>

    <!-- pdf -->
    <!-- <div v-if="fileType == 'pdf'" class="pdf-div">
      <vue-office-pdf :src="previewAddress" @rendered="renderedHandler" @error="errorHandler" />
    </div> -->
  </t-dialog>
</template>
<script setup lang="ts" name="docViewer">
// import '@vue-office/docx/lib/index.css';

// import '@vue-office/excel/lib/index.css';
// 引入VueOfficeDocx组件
// import VueOfficeDocx from '@vue-office/docx';
// 引入VueOfficeExcel组件
// import VueOfficeExcel from '@vue-office/excel';
// 引入VueOfficePdf组件
// import VueOfficePdf from '@vue-office/pdf';
import { defineProps, ref } from 'vue';

interface Props {
  visible?: boolean;
  type?: string;
}
const props: any = withDefaults(defineProps<Props>(), {
  visible: false,
  type: 'doc',
});
// const fileHtml = ref('');
// 导入表单是否显示
const formVisible = ref(props.visible);
const fileType = ref(props.type);
const dialogTitle = ref(props.dialogTitle);
const docxRef = ref<any>();
const previewAddress = ref('');
const dialogClose = () => {
  formVisible.value = false;
  docxRef.value = '';
};
// doc 文档预览
const viewDocx = async (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  fileType.value = 'doc';
  formVisible.value = true;
  console.log(data);
  if (data.src) {
    previewAddress.value = data.src;
  }
};

// xlsx 预览
const viewXlsx = async (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  fileType.value = 'excel';
  formVisible.value = true;
  console.log(data);
  if (data.src) {
    previewAddress.value = data.src;
  }
};

const fileData: any = ref({});
// 图片预览
const viewImg = (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  formVisible.value = true;
  fileType.value = 'img';
  if (data.src) {
    // 已上传的图片
    fileData.value = data;
  } else {
    // 本地图片
    const freader = new FileReader();
    freader.readAsDataURL(data.raw);
    freader.onload = (e: any) => {
      fileData.value = {
        src: e.target.result,
        id: new Date(),
        fileName: data.fileOldName || data.name,
      };
    };
  }
  // dialogTitle.value = data.fileOldName || data.name;
};
// PDF 预览
const viewPdf = async (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  fileType.value = 'pdf';
  formVisible.value = true;
  console.log(data);
  if (data.src) {
    previewAddress.value = data.src;
  }
};
// const renderedHandler = () => {
//   console.log('PDF渲染完成');
// };
// const errorHandler = () => {
//   console.log('PDF渲染失败');
// };

defineExpose({
  viewDocx,
  viewXlsx,
  viewImg,
  viewPdf,
});
</script>
<style scoped lang="less">
.word-div {
  height: calc(50vh);
  overflow: auto;
}

.xlsx-div {
  height: calc(50vh);
  overflow: auto;
}

.img-div {
  overflow: auto;

  img {
    width: 100%;
    height: 100%;
  }
}

.pdf-div {
  height: calc(50vh);
  overflow: auto;
}
</style>
