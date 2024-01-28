<template>
  <div class="container">
    <div class="toolbar">
      <t-button shape="square" variant="text" @click="onClickExit">
        <template #icon><close-icon /></template>
      </t-button>
    </div>
    <div id="s-designer"></div>
  </div>
</template>

<script setup lang="ts">
import { StiDesigner, Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { onMounted } from 'vue';

import { DesignerArgs } from './constants';

Stimulsoft.Base.StiLicense.Key =
  '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkrLyWoNKqkTY1XgUpo2eVfPZDTuBkdCQBJ7ewY23s24RzWm3' +
  'Kqvz1M0Ic8q/gLB8OtHfyeGIFVvS/CcdBtJkURBywzrcEqWttjvuHIqql+oxdA21Mjw4uOPnFo+ocQ/1bmqGQbEdlB' +
  'ArJdu3YQSNFiCMsPzlIOqgYlMy8sQ42PJkhkgZnfovFlWBww9HYqjz9wEwCkwAVIPhQ9ojlx88EY3Sopl/MiHRWcgS' +
  'RDF5bxvzxN91Mk3W6/cFLU1rmM+T8eJwjSO4XARHnoVoC/RwTx8x34ILCZBVRbKSVJpdI+Beafwy+PE0LTBJaxyPx8' +
  'BZ8koPGOv6lhmqHTQJX1h6kbc9Dhbo3QMFum3LxNn2bYw7MVcEZMyuqSgLdVQJkOQYi8vW/Q5Ooig8QIBkLBErIpbX' +
  'Kgy7ESnRuuaDV2cLJ6ODyI2wv+ugM6QbpgyeDrcn0+a/lCx6ilfWqTu77SX5tYyHRQC+hqk0l/XY/FQOORSxbmRlOG' +
  'mPov3Gg5rL3RYD2a11iO6Q5/ow9+clGQ+58bLNcqUNIvdDBLohP3qUS5xcu1ytqsocwPLYHGyMkmOu5HnIqGLgM5DJ' +
  'DlqFlHCj5itkIo3nCSrWwRCu26aKzxCXGnn9WRYab6bBM61+PFWyY=';

const props = defineProps({
  fileName: {
    type: String,
  },
  fileContent: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:visible', 'save']);

let designer: StiDesigner;
onMounted(() => {
  const options = new Stimulsoft.Designer.StiDesignerOptions();
  options.appearance.fullScreenMode = true;
  // options.appearance.showLocalization = true;

  Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(`./libs/stimulsoft/locales/${fw.getLanguage()}.xml`);
  designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

  designer.onSaveReport = onSaveReport;

  setTimeout(() => {
    if (props.fileName && props.fileContent) {
      const report = new Stimulsoft.Report.StiReport();
      report.reportName = props.fileName;
      report.load(props.fileContent);
      designer.report = report;
    }
  }, 800);

  designer.renderHtml('s-designer');
});

const onSaveReport = (e) => {
  e.preventDefault = true;
  const args = {
    fileName: e.fileName,
    fileContent: e.report.saveToJsonString(),
  } as DesignerArgs;

  emit('save', args);
  onClickExit();
};

const onClickExit = () => {
  emit('update:visible', false);
};
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}

.toolbar {
  padding: 8px;
  background-color: #fff;
  border-radius: var(--td-radius-default);
  z-index: 10001;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
