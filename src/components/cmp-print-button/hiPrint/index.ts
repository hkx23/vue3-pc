import { defaultElementTypeProvider, hiprint } from 'vue-plugin-hiprint';

/**
 * 预览报表
 */
export const previewByHiPrint = (templateBody: string, printData: any) => {
  hiprint.init({
    // eslint-disable-next-line new-cap
    providers: [new defaultElementTypeProvider()],
  });
  const hiprintTemplate = new hiprint.PrintTemplate({
    templateBody,
  });
  hiprintTemplate.print(...printData);
  return hiprintTemplate;
};

/**
 * 打印报表
 */
export const printByHiPrint = (templateBody: string, printData: any) => {
  hiprint.init({
    // eslint-disable-next-line new-cap
    providers: [new defaultElementTypeProvider()],
  });
  const hiprintTemplate = new hiprint.PrintTemplate({
    templateBody,
  });
  hiprintTemplate.print2(...printData);
  return hiprintTemplate;
};
