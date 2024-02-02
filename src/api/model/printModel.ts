export interface stimulsoftTemplate {
  /** 模板内容 */
  templateBody?: string;
  /** 模板中数据节点名称 (默认DataBase) */
  dataName?: string;
  /** 模板需要的数据 */
  data?: object;
  /** 打印机名称（windows为空则取默认，linux必填） */
  printerName?: string;
}
