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
    fileName: props.fileName || e.fileName,
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
