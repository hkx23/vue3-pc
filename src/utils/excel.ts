import { cloneDeep } from 'lodash';
import * as XLSX from 'xlsx';

/**
 * @description: 生成随机字符串ID 不包含数字
 * @param {length} 长度
 * @return {String} 随机字符串
 */
const randomString = (length = 6) => {
  const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const len = str.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += str.charAt(Math.floor(Math.random() * len));
  }
  return result;
};

/**
 * @description: 导出表格数据为excel
 * @param {selectedRowKeys} 选中的行
 * @param {columns} 表格列
 * @param {list} 表格数据
 */
const exportExcel = ({ columns, tableData }) => {
  // if (selectedRowKeys.length > 0) {
  //   tableData = cloneDeep(tableData.filter((item) => selectedRowKeys.includes(item[rowKey])));
  // } else {

  // }
  tableData = cloneDeep(tableData);
  tableData.forEach((item) => {
    for (const key in item) {
      item[key] += '';
    }
  });
  const header = columns.map((item) => item.title);
  const data = [header];
  const keys = columns.map((item) => item.colKey);
  tableData.forEach((item) => {
    const array = keys.map((key) => item[key]);
    data.push(array);
  });
  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  sheet['!cols'] = columns.map((item) => {
    return { wch: item.width ? item.width / 8 : 15 };
  });
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  XLSX.writeFile(workbook, `表格数据${randomString()}.xlsx`);
};

export default {
  randomString,
  exportExcel,
};
