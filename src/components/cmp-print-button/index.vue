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
  templateId?: String;
  templateCode?: string;
  data: Array<any>;
  showPreview?: boolean;
  showIcon?: boolean;
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
  if (props.showPreview) {
    dialogVisible.value = true;
    viewer.report = report.value as Stimulsoft.Report.StiReport;
    viewer.renderHtml(viewerRef.value);
  } else {
    report.value.print();
  }
  if (props.onClick) props.onClick(e);
};

/*
    打印函数
    printdata = [{col1:col1value,col2:col2value,...},{col1:col1value,col2:col2value,...}] //数组->兼容批量打印
    1、数据源为variable或者单datasource时，传入printdata即可
    2、数据源为datasource，并且大于1个时，需区分不同数据源，传入[{datasourceName1:printdata1,datasourceName2:printdata2},...]
    3、数据源为variable+单个datasource时，传入[{variable:printdata(字典),datasource:printdata(字典)}]
    4、数据源为variable+多个datasource时，传入[{variable:printdata(字典),datasource:{datasourceName1:printdata1,datasourceName2:printdata2}}]
    */
const createReportByTemplate = () => {
  // jessic 代码
  // report.value = new Stimulsoft.Report.StiReport();
  // report.value.load(templateBody.value);
  // report.value.regData('data', 'data', props.data);
  // report.value.render();

  // ben 20240203
  const jsonBody = JSON.parse(templateBody.value);
  const type = getPrintTmplDsType(jsonBody);
  let dsCount = 0;
  if (type === printDataType.dataSource || type === printDataType.all) {
    dsCount = getDataSourceCount(jsonBody);
  }

  const reportPages = new Stimulsoft.Report.StiReport();
  reportPages.render();
  reportPages.renderedPages.clear();

  props.data.forEach((item: any) => {
    const reportItem = new Stimulsoft.Report.StiReport();
    reportItem.load(templateBody.value);
    switch (type) {
      case printDataType.variable:
        fillVariableData(reportItem, item);
        break;
      case printDataType.dataSource:
        if (dsCount <= 0) {
          throw new Error('模板datasource解析出错,数据源个数为0');
        }
        fillDataSourceData(reportItem, dsCount.toString(), item);
        reportItem.dictionary.synchronize();
        break;
      case printDataType.all:
        if (!item.variable || !item.datasource)
          throw new Error('数据源为variable+datasource,缺少variable或者datasource数据源');

        fillDataSourceData(reportItem, dsCount.toString(), item.datasource);
        fillVariableData(reportItem, item.variable);
        reportItem.dictionary.synchronize();
        break;
      default:
        break;
    }

    reportItem.render();
    reportItem.renderedPages.list.forEach((_item) => {
      reportPages.renderedPages.list.push(_item);
    });
  });
  report.value = reportPages;
};

// 传入的数据类型
const printDataType = {
  // 数据源是变量
  variable: 0,
  // 数据源是datasource
  dataSource: 1,
  // 变量+datasource混合
  all: 2,
};

// 取打印模板的数据源类型
const getPrintTmplDsType = (tmpl) => {
  if (!tmpl || JSON.stringify(tmpl) === '{}') throw new Error('打印模板不能为空');

  if (!tmpl.Dictionary) throw new Error('模板解析出错,找不到Dictionary节点');

  const isVariable = tmpl.Dictionary.Variables && Object.keys(tmpl.Dictionary.Variables).length >= 1;
  const isDataSource = tmpl.Dictionary.DataSources && Object.keys(tmpl.Dictionary.DataSources).length >= 1;
  if (isVariable && isDataSource) return printDataType.all;

  if (isVariable) return printDataType.variable;

  if (isDataSource) return printDataType.dataSource;

  throw new Error('打印模板数据源识别失败');
};

// 取模板datasource数据源个数
const getDataSourceCount = (tmpl) => {
  if (!tmpl || JSON.stringify(tmpl) === '{}') throw new Error('打印模板不能为空');

  if (!tmpl.Dictionary) throw new Error('模板解析出错,找不到Dictionary节点');

  if (!tmpl.Dictionary.DataSources) throw new Error('模板解析出错,找不到Dictionary->DataSources节点');

  return Object.keys(tmpl.Dictionary.DataSources).length;
};

// 填充variable数据
const fillVariableData = (reportItem: Stimulsoft.Report.StiReport, item: Object) => {
  Object.keys(item).forEach((key: any) => {
    const variable = reportItem.dictionary.variables.list.find((x) => x.getValue() === key); // 对应编码
    if (variable) variable.value = item[key];
  });
};

// 填充datasource数据
const fillDataSourceData = (reportItem: Stimulsoft.Report.StiReport, dsCount: String, item: any) => {
  reportItem.dictionary.databases.clear();
  if (dsCount === '1') {
    // 这里的数据源名字可以随便取，不需要读取模板！！！
    reportItem.regData('datasource', 'datasource', item);
  } else {
    const dataSet = new Stimulsoft.System.Data.DataSet('root');
    dataSet.readJson(JSON.stringify(item));
    reportItem.regData('root', 'root', dataSet);
  }
};
</script>

<style lang="less" scoped></style>
