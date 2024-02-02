<template>
  <t-button v-bind="targetAttrs">
    <template v-for="(item, key) in $slots" :key="key" #[key]>
      <slot :name="key"></slot>
    </template>
    <template v-if="showIcon && !$slots.icon" #icon>
      <print-icon />
    </template>
  </t-button>
  <t-dialog v-model:visible="dialogVisible" mode="full-screen" title="打印预览" :footer="false">
    <div ref="viewerRef"></div>
  </t-dialog>
</template>

<script setup lang="ts">
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';
import { PrintIcon } from 'tdesign-icons-vue-next';
import { ButtonProps } from 'tdesign-vue-next';
import { computed, ref, useAttrs } from 'vue';

import { api as apiMain } from '@/api/main';

export interface CmpPrintButtonProps extends Omit<ButtonProps, 'options'> {
  templateId?: string;
  templateCode?: string;
  data: object;
  showPreview?: boolean;
  showIcon?: boolean;
  columns?: { columnName: string }[];
  onBeforePrint?: (e: MouseEvent) => void;
}

const props = withDefaults(defineProps<CmpPrintButtonProps>(), {
  showPreview: false,
  // shape: 'circle',
  variant: 'outline',
  showIcon: true,
});
const attrs: Partial<CmpPrintButtonProps> = useAttrs();
const targetAttrs = computed<CmpPrintButtonProps>(() => {
  const onClick = async (e: MouseEvent) => {
    if (props.onBeforePrint) {
      if (props.onBeforePrint.constructor.name === 'AsyncFunction') {
        await props.onBeforePrint(e);
      } else {
        props.onBeforePrint(e);
      }
    }
    await onClickPrint(e);
  };
  return { ...attrs, ...props, onClick };
});

const dialogVisible = ref(false);
const viewerRef = ref<HTMLElement | null>(null);
const report = ref<Stimulsoft.Report.StiReport>(null);
const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
const templateBody = ref('');
const fetchTemplateBody = async (id, code) => {
  templateBody.value = await apiMain.printTmpl.getTmplByIdOrCode({ id, code });
};

const onClickPrint = async (e: MouseEvent) => {
  await fetchTemplateBody(props.templateId, props.templateCode);
  createReportByTemplate();
  if (!report.value) return;
  report.value.render();
  if (props.showPreview) {
    dialogVisible.value = true;
    viewer.report = report.value as Stimulsoft.Report.StiReport;
    viewer.renderHtml(viewerRef.value);
  } else {
    report.value.print();
  }
  if (props.onClick) props.onClick(e);
};

const createReportByTemplate = () => {
  report.value = new Stimulsoft.Report.StiReport();
  report.value.load(templateBody.value);
  report.value.regData('data', 'data', props.data);
};
</script>

<style lang="less" scoped></style>
