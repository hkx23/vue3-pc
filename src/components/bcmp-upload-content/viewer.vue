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
    <div v-if="fileType == 'doc'" ref="docxRef" class="word-div"></div>
    <!-- xlsx -->
    <div v-if="fileType == 'excel'" ref="xlsxRef" class="xlsx-div">
      <t-tabs v-model="activeName">
        <t-tab-panel v-for="(item, index) in excelSheet" :key="index" :label="item.name" :value="item.name">
          <div class="table" v-html="item.html"></div>
        </t-tab-panel>
      </t-tabs>
    </div>
    <!-- 图片 -->
    <div v-if="fileType == 'img'" class="img-div">
      <t-image :src="fileData.src" :alt="fileData.fileOldName" />
    </div>

    <!-- pdf -->
    <div v-if="fileType == 'pdf'" class="pdf-div">
      <vue-pdf-embed :source="iframeUrl" />
    </div>
  </t-dialog>
</template>
<script setup lang="ts">
import { renderAsync } from 'docx-preview';
import { defineProps, nextTick, ref } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';
import * as XLSX from 'xlsx';

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
// doc 文档预览
const viewDocx = async (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  fileType.value = 'doc';
  docxRef.value = '';
  if (data.src) {
    // 已上传的文件
    const response = await fetch(data.src, { method: 'GET', mode: 'cors' });
    if (response.ok) {
      const content = await response.blob();
      nextTick(() => {
        formVisible.value = true;
        renderAsync(content, docxRef.value);
        // dialogTitle.value = data.fileOldName || data.name;
      });
    }
  } else {
    // 本地文件
    const blob = new Blob([data.raw]);
    nextTick(() => {
      formVisible.value = true;
      renderAsync(blob, docxRef.value);
      // dialogTitle.value = data.fileOldName || data.name;
    });
  }
};

const excelSheet: any = ref([]);
const activeName = ref('');
const dialogClose = () => {
  formVisible.value = false;
  docxRef.value = '';
  excelSheet.value = '';
  activeName.value = '';
};
// xlsx 预览
const viewXlsx = async (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  fileType.value = 'excel';
  formVisible.value = true;
  console.log(data);
  if (data.src) {
    const response = await fetch(data.src, { method: 'GET', mode: 'cors' });
    if (response.ok) {
      const content = await response.blob();
      const arrayBuffer = await content.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const list = [];
      const sheetNames = workbook.SheetNames;
      if (sheetNames && sheetNames.length > 0) {
        [activeName.value] = sheetNames;
        for (const p of sheetNames) {
          let html = '';
          try {
            html = XLSX.utils.sheet_to_html(workbook.Sheets[p]);
          } catch (e) {
            html = '';
          }
          const map = {
            name: p,
            html,
          };
          list.push(map);
        }
        excelSheet.value = list;
      }

      // dialogTitle.value = data.fileName || data.name;
    }
  } else {
    const blob = new Blob([data.raw]);
    const arrayBuffer = await new Response(blob).arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const list = [];
    const sheetNames = workbook.SheetNames;
    // eslint-disable-next-line prefer-destructuring
    activeName.value = sheetNames[0];
    for (const p of sheetNames) {
      let html = '';
      try {
        html = XLSX.utils.sheet_to_html(workbook.Sheets[p]);
      } catch (e) {
        html = '';
      }
      const map = {
        name: p,
        html,
      };
      list.push(map);
    }
    excelSheet.value = list;
    // dialogTitle.value = data.fileName || data.name;
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

const iframeUrl: any = ref('');
// 确保在iframe加载完成后才打开对话框
const iframeLoaded = ref(false);
// PDF 预览
const viewPdf = async (data: any) => {
  dialogTitle.value = `预览-${data.fileName}`;
  fileType.value = 'pdf';

  // 确保在iframe加载完成后才打开对话框
  iframeLoaded.value = false;
  iframeUrl.value = data.src;
  formVisible.value = true;
};

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
<style lang="less" scoped>
.xlsx-div {
  table {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    width: 100%;
    // overflow: auto;

    tr {
      height: 44px;
    }

    td {
      min-width: 200px;
      max-width: 400px;
      padding: 4px 8px;
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }
  }

  .t-tabs--border-card > .t-tabs__content {
    overflow-x: auto;
  }
}
</style>
