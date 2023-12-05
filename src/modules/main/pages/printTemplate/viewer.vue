<template>
  <div id="s-viewer"></div>
</template>

<script setup lang="ts">
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
import { onMounted } from 'vue';

onMounted(() => {
  const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);

  // const report = new Stimulsoft.Report.StiReport();

  // // // In `onBeginProcessData` event handler add custom HTTP headers
  // // report.onBeginProcessData = (args: any) => {
  // //   if (
  // //       args.database === "JSON" &&
  // //       args.command === "GetData" &&
  // //       args.pathData && args.pathData.endsWith("/ProtectedDemo.json")
  // //   ) {
  // //       // Add custom header to pass through server protection
  // //       args.headers.push({key: "X-Auth-Token", value: "*YOUR TOKEN*"});
  // //   }
  // // };

  // // report.loadFile("reports/SimpleListWithProtectedJson.mrt");

  // report.loadFile('/reports/SimpleList.mrt');

  // viewer.report = report;

  viewer.renderHtml('s-viewer');
});
</script>

<style lang="less" scoped></style>
