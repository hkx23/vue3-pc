<template>
  <div id="s-viewer"></div>
</template>

<script setup lang="ts">
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Loading Viewer view');

  console.log('Creating the report viewer with default options');
  const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);

  // console.log('Creating a new report instance');
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

  // // console.log("Load report from url");
  // // report.loadFile("reports/SimpleListWithProtectedJson.mrt");

  // console.log('Load report from url');
  // report.loadFile('/reports/SimpleList.mrt');

  // console.log('Assigning report to the viewer, the report will be built automatically after rendering the viewer');
  // viewer.report = report;

  console.log('Rendering the viewer to selected element');
  viewer.renderHtml('s-viewer');

  console.log('Loading completed successfully!');
});
</script>

<style lang="less" scoped></style>
