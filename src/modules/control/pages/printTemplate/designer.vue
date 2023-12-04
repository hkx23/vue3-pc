<template>
  <div class="container">
    <div class="toolbar">123</div>
    <div id="s-designer"></div>
  </div>
</template>

<script setup lang="ts">
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Loading Designer view');

  console.log('Set full screen mode for the designer');
  const options = new Stimulsoft.Designer.StiDesignerOptions();
  options.appearance.fullScreenMode = false;

  console.log('Create the report designer with specified options');
  const designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

  // console.log('Create a new report instance');
  // const report = new Stimulsoft.Report.StiReport();

  // console.log('Load report from url');
  // report.loadFile('reports/SimpleList.mrt');

  // console.log('Edit report template in the designer');
  // designer.report = report;

  console.log('Rendering the designer to selected element');
  designer.renderHtml('s-designer');

  console.log('Loading completed successfully!');
});
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}

.toolbar {
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: var(--td-radius-default);
}
</style>
