export interface CommonImportMoodel {
  title?: string;
  tableName?: string;
  data?: any[];
  columns?: ImportColumn[];
  /** @format int32 */
  batchSize?: number;
}

export interface ImportColumn {
  filed?: string;
  title?: string;
  isRequired?: boolean;
  isValidateRepeat?: boolean;
  validateExpression?: string;
  required?: boolean;
  validateRepeat?: boolean;
}

/** 响应数据 */
export type ImportSummary = {
  /** @format int32 */
  successCount?: number;
  /** @format int32 */
  failCount?: number;
  errorListFilePath?: string;
  allSuccess?: boolean;
} | null;

/** 通用响应类 */
export interface ResultImportSummary {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ImportSummary;
}
