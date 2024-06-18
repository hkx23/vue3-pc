import { Stimulsoft, StiOptions } from 'stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor';

StiOptions.Engine.barcodeQRCodeAllowUnicodeBOM = true;

/**
 * 预览报表
 */
export const previewByStimulsoft = (templateBody: string, printData: any, viewElement?: string | HTMLElement) => {
  const report = createReportByStimulsoft(templateBody, printData);
  const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
  viewer.report = report;
  viewer.renderHtml(viewElement);
};

/**
 * 打印报表
 * @param report 报表对象
 */
export const printByStimulsoft = (templateBody: string, printData: any) => {
  const report = createReportByStimulsoft(templateBody, printData);
  report.print();
};

/**
 * 根据模板和数据源创建报表
 *   printData = [{col1:col1value,col2:col2value,...},{col1:col1value,col2:col2value,...}] //数组->兼容批量打印
    1、数据源为variable或者单 dataSource 时，传入 printData即可
    2、数据源为 dataSource，并且大于1个时，需区分不同数据源，传入[{dataSourceName1:printData1,dataSourceName2:printData2},...]
    3、数据源为variable+单个 dataSource时，传入[{variable:printData(字典),dataSource:printData(字典)}]
    4、数据源为variable+多个 dataSource时，传入[{variable:printData(字典), dataSource:{ dataSourceName1:printData1, dataSourceName2:printData2}}]
 * @param templateBody 模板内容
 * @param printData 打印数据源
 * @returns 报表对象
 */
const createReportByStimulsoft = (templateBody: string, printData: any) => {
  // report.value = new Stimulsoft.Report.StiReport();
  // report.value.load(templateBody.value);
  // report.value.regData('data', 'data', props.data);
  // report.value.render();

  const jsonBody = JSON.parse(templateBody);
  const type = getPrintDataType(jsonBody);
  let dsCount = 0;
  if (type === printDataType.dataSource || type === printDataType.all) {
    dsCount = getDataSourceCount(jsonBody);
  }

  const reportPages = new Stimulsoft.Report.StiReport();
  reportPages.render();
  reportPages.renderedPages.clear();

  printData.forEach((item: any) => {
    const reportItem = new Stimulsoft.Report.StiReport();
    reportItem.load(templateBody);
    switch (type) {
      case printDataType.variable:
        fillVariableData(reportItem, item);
        break;
      case printDataType.dataSource:
        if (dsCount <= 0) {
          throw new Error('模板dataSource解析出错,数据源个数为0');
        }
        fillDataSourceData(reportItem, dsCount.toString(), item);
        reportItem.dictionary.synchronize();
        break;
      case printDataType.all:
        if (!item.variable || !item.dataSource)
          throw new Error('数据源为variable+dataSource,缺少variable或者dataSource数据源');

        fillDataSourceData(reportItem, dsCount.toString(), item.dataSource);
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
  return reportPages;
};

// 传入的数据类型
const printDataType = {
  // 数据源是变量
  variable: 0,
  // 数据源是dataSource
  dataSource: 1,
  // 变量+dataSource混合
  all: 2,
};

// 取打印模板的数据源类型
const getPrintDataType = (jsonBody: any) => {
  if (!jsonBody || JSON.stringify(jsonBody) === '{}') throw new Error('打印模板不能为空');

  if (!jsonBody.Dictionary) throw new Error('模板解析出错,找不到Dictionary节点');

  const isVariable = jsonBody.Dictionary.Variables && Object.keys(jsonBody.Dictionary.Variables).length >= 1;
  const isDataSource = jsonBody.Dictionary.DataSources && Object.keys(jsonBody.Dictionary.DataSources).length >= 1;
  if (isVariable && isDataSource) return printDataType.all;

  if (isVariable) return printDataType.variable;

  if (isDataSource) return printDataType.dataSource;

  throw new Error('打印模板数据源识别失败');
};

// 取模板dataSource数据源个数
const getDataSourceCount = (jsonBody) => {
  if (!jsonBody || JSON.stringify(jsonBody) === '{}') throw new Error('打印模板不能为空');

  if (!jsonBody.Dictionary) throw new Error('模板解析出错,找不到Dictionary节点');

  if (!jsonBody.Dictionary.DataSources) throw new Error('模板解析出错,找不到Dictionary->DataSources节点');

  return Object.keys(jsonBody.Dictionary.DataSources).length;
};

// 填充variable数据
const fillVariableData = (reportItem: Stimulsoft.Report.StiReport, item: Object) => {
  Object.keys(item).forEach((key: any) => {
    const variable = reportItem.dictionary.variables.list.find((x) => x.getValue() === key); // 对应编码
    if (variable) variable.value = item[key];
  });
};

// 填充dataSource数据
const fillDataSourceData = (reportItem: Stimulsoft.Report.StiReport, dsCount: String, item: any) => {
  reportItem.dictionary.databases.clear();
  if (dsCount === '1') {
    // 这里的数据源名字可以随便取，不需要读取模板！！！
    reportItem.regData('dataSource', 'dataSource', item);
  } else {
    const dataSet = new Stimulsoft.System.Data.DataSet('root');
    dataSet.readJson(JSON.stringify(item));
    reportItem.regData('root', 'root', dataSet);
  }
};
