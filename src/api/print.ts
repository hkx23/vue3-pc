import { Http } from '@/assets/libs/web-core';
import { Http as HttpType } from '@/types/web-core';

import { api as apiMain } from './main';
import { stimulsoftTemplate } from './model/printModel';

const Api = {
  GetPrinters: '/printer',
  PrintByTemplate: '/printer/printByTemplate',
  GetPrintFile: '/printer/getPrintFile',
};

const printHttp: HttpType = new Http(http.options);
printHttp.options.baseURL = () => {
  return 'http://localhost:6310';
};

/**
 * 获取可用的打印机列表
 * @returns Promise<string[]>
 */
export function GetPrinters(): Promise<string[]> {
  return printHttp.get(Api.GetPrinters) as Promise<string[]>;
}

/**
 * 根据模板打印
 */
export function PrintByTemplate(data: stimulsoftTemplate) {
  printHttp.post(Api.PrintByTemplate, data);
}

/**
 * 根据模板id或code打印
 */
export async function PrintByIdOrCode(data: stimulsoftTemplate, id?: string, code?: string) {
  data.templateBody = await apiMain.printTmpl.getTmplByIdOrCode({ id, code });
  printHttp.post(Api.PrintByTemplate, data);
}

/**
 * 根据模板获取打印文件
 */
export function GetPrintFile(data: stimulsoftTemplate): Promise<string> {
  return printHttp.post(Api.GetPrintFile, data) as Promise<string>;
}

/**
 * 根据模板id或code获取打印文件
 */
export async function GetPrintFileByIdOrCode(data: stimulsoftTemplate, id?: string, code?: string): Promise<string> {
  data.templateBody = await apiMain.printTmpl.getTmplByIdOrCode({ id, code });
  return printHttp.post(Api.GetPrintFile, data) as Promise<string>;
}
