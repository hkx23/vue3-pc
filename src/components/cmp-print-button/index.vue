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
import { PrintIcon } from 'tdesign-icons-vue-next';
import { ButtonProps } from 'tdesign-vue-next';
import { computed, ref, useAttrs } from 'vue';

import { api as apiMain } from '@/api/main';

import { previewByHiPrint, printByHiPrint } from './hiPrint';
import { previewByStimulsoft, printByStimulsoft } from './stimulsoft';

export interface CmpPrintButtonProps extends Omit<ButtonProps, 'options'> {
  templateId?: String;
  templateCode?: string;
  data: Array<any>;
  showPreview?: boolean;
  showIcon?: boolean;
  printType?: 'stimulsoft' | 'hiprint';
  columns?: { columnName: string }[];
  onBeforePrint?: (e: MouseEvent) => boolean | Promise<boolean>;
}

const props = withDefaults(defineProps<CmpPrintButtonProps>(), {
  showPreview: false,
  theme: 'default',
  showIcon: false,
});
const attrs: Partial<CmpPrintButtonProps> = useAttrs();
const targetAttrs = computed<CmpPrintButtonProps>(() => {
  const onClick = async (e: MouseEvent) => {
    let result = true;
    if (props.onBeforePrint) {
      if (props.onBeforePrint.constructor.name === 'AsyncFunction') {
        result = await props.onBeforePrint(e);
      } else {
        result = props.onBeforePrint(e) as boolean;
      }
    }
    if (result) {
      await onClickPrint(e);
    }
  };
  return { ...attrs, ...props, onClick };
});

const dialogVisible = ref(false);
const viewerRef = ref<HTMLElement | null>(null);
const templateBody = ref('');
const fetchTemplateBody = async (id, code) => {
  templateBody.value = await apiMain.printTmpl.getTmplByIdOrCode({ id, code });
};

const onClickPrint = async (e: MouseEvent) => {
  await fetchTemplateBody(props.templateId, props.templateCode);

  if (props.printType === 'hiprint') {
    if (props.showPreview) {
      previewByHiPrint(templateBody.value, props.data);
    } else {
      printByHiPrint(templateBody.value, props.data);
    }
  } else if (props.showPreview) {
    dialogVisible.value = true;
    previewByStimulsoft(templateBody.value, props.data, viewerRef.value);
  } else {
    printByStimulsoft(templateBody.value, props.data);
  }

  if (props.onClick) props.onClick(e);
};
</script>

<style lang="less" scoped></style>
