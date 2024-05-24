/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 严格度转移规则表 */
export interface StringencyTransferRule {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 源检验严格度 */
  sourceInspectStringency?: string;
  /** 目标检验严格度 */
  targetInspectStringency?: string;
  /**
   * 连续检验批次数
   * @format int32
   */
  inspectBatchTimes?: number;
  /**
   * 不合格次数
   * @format int32
   */
  ngTimes?: number;
  /** 备注 */
  memo?: string;
}

/** 通用响应类 */
export interface ResultObject {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: object | null;
}

/** 严格度转移规则表 */
export interface StringencyTransferRuleSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
}

/** 响应数据 */
export type PagingDataStringencyTransferRuleVO = {
  list?: StringencyTransferRuleVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataStringencyTransferRuleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataStringencyTransferRuleVO;
}

/** 严格度转移规则表 */
export interface StringencyTransferRuleVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 源检验严格度 */
  sourceInspectStringency?: string;
  /** 目标检验严格度 */
  targetInspectStringency?: string;
  /**
   * 连续检验批次数
   * @format int32
   */
  inspectBatchTimes?: number;
  /**
   * 不合格次数
   * @format int32
   */
  ngTimes?: number;
  /** 备注 */
  memo?: string;
  /** 源检验严格度 */
  sourceInspectStringencyName?: string;
  /** 目标检验严格度 */
  targetInspectStringencyName?: string;
}

export interface CommonImportSamplingStdDtlDTO {
  title?: string;
  tableName?: string;
  data?: SamplingStdDtlDTO[];
  columns?: ImportColumn[];
  /** @format int32 */
  batchSize?: number;
}

export interface ImportColumn {
  field?: string;
  fieldType?: string;
  title?: string;
  isRequired?: boolean;
  isValidateRepeat?: boolean;
  validateExpression?: string;
  items?: string[];
  list?: ImportColumn[];
  required?: boolean;
  validateRepeat?: boolean;
}

export interface SamplingStdDtlDTO {
  id?: string;
  sampingStdId: string;
  sampingStdCode?: string;
  /** 批量范围起始值 */
  lotFrom: number;
  /** 批量范围结束值 */
  lotTo: number;
  /** 抽样比例 */
  samplingPer?: number;
  /** 抽样数量 */
  samplingNum?: number;
  /** A类允收数 */
  acceptQtyClassA: number;
  /** A类拒收数 */
  rejectQtyClassA: number;
  /** B类允收数 */
  acceptQtyClassB: number;
  /** B类拒收数 */
  rejectQtyClassB: number;
  /** C类允收数 */
  acceptQtyClassC: number;
  /** C类拒收数 */
  rejectQtyClassC: number;
  /** D类允收数 */
  acceptQtyClassD: number;
  /** D类拒收数 */
  rejectQtyClassD: number;
}

/** 响应数据 */
export type ImportSummaryObject = {
  /** @format int32 */
  successCount?: number;
  /** @format int32 */
  failCount?: number;
  errorListFilePath?: string;
  returnData?: object[];
  allSuccess?: boolean;
} | null;

/** 通用响应类 */
export interface ResultImportSummaryObject {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ImportSummaryObject;
}

export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN';
  value?: string;
  valuesList?: string[];
}

export interface SamplingStdDtlSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  sampingStdId?: string;
  sorts?: SortParam[];
  filters?: Filter[];
}

export interface SortParam {
  sortBy?: string;
  descending?: boolean;
}

/** 通用响应类 */
export interface Result {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: object | null;
}

export interface CommonSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  selectedField?: string;
  selectedValue?: string;
  keyword?: string;
  /** @format int32 */
  state?: number;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
  customerConditions?: Filter[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
}

/** 响应数据 */
export type PagingDataSamplingStdVO = {
  list?: SamplingStdVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSamplingStdVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSamplingStdVO;
}

export interface SamplingStdVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 标准编号 */
  sampingStdCode?: string;
  /**
   * 应用范围，1：物注，2：产品，3：物料+产品
   * @format int32
   */
  operationScope?: number;
  /**
   * 检验方法，0：按样品量抽样，1：按比例抽样
   * @format int32
   */
  operationMethod?: number;
  /** 备注 */
  memo?: string;
  operationScopeName?: string;
  operationMethodName?: string;
  creatorName?: string;
  samplingStdVO?: SamplingStdVO;
}

export interface SamplingStdSearch {
  sampingStdCode?: string;
  /** @format int32 */
  operationScope?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNum?: number;
}

export interface SamplingAqlSearch {
  /** 检验水平 */
  checkLevel?: string;
  /** 抽样严格度 */
  inspectionStringency?: string;
  /** 接收质量限 */
  aql?: number;
  /**
   * 报批数量
   * @format int32
   */
  approvalNum?: number;
}

/** 通用响应类 */
export interface ResultListSamplingAqlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: SamplingAqlVO[] | null;
}

/** 国标抽样方案渲染 */
export type SamplingAqlVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  /** 标准编号 */
  sampingStdCode?: string;
  /** 严格度 */
  stringency?: string;
  /** 样本量简码 */
  simpleCode?: string;
  /** 接收质量限 */
  aql?: number;
  /** 抽样样本数 */
  sampleQty?: number;
  /** 抽样比例 */
  samplingPersent?: number;
  /** 允收数 */
  acceptQty?: number;
  /** 拒收数 */
  rejectQty?: number;
  /**
   * 批量-star
   * @format int32
   */
  batchStart?: number;
  /**
   * 批量-end
   * @format int32
   */
  batchEnd?: number;
} | null;

/** 通用响应类 */
export interface ResultListBigDecimal {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: (number | null)[];
}

/** 巡回检验明细附件 */
export interface PqcInspectPatrolDtlFileVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  pqcInspectPatrolDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  serialNumber?: string;
  fullFileName?: string;
  fileType?: string;
  fileSizeShow?: string;
  fileSize?: number;
  timeUpload?: string;
  signedUrl?: string;
  percent?: number;
  name?: string;
  url?: string;
}

/** 通用响应类 */
export interface ResultBoolean {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: boolean | null;
}

/** 上传控件文件VO */
export interface AddFileTypeVO {
  serialNumber?: string;
  fullFileName?: string;
  fileName?: string;
  fileType?: string;
  fileSizeShow?: string;
  fileSize?: number;
  timeUpload?: string;
  signedUrl?: string;
  percent?: number;
  id?: string;
}

/** 检验测量值 */
export interface OqcInspectMeasureVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  oqcInspectId?: string;
  oqcInspectItemId?: string;
  /**
   * 检测值序号
   * @format int32
   */
  inspectSeq?: number;
  /** 检测值 */
  inspectValue?: number;
  /** 测量值 */
  measureValue?: number;
  /** 样本数 */
  sampleQty?: number;
  /** 检验工具 */
  inspectTool?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
}

/** 产品检验标准全信息表 */
export interface OqcInspectStdFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 产品检验标准表ID */
  oqcInspectStdId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 单位 */
  uom?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 抽样标准编码 */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /** 首件级别 */
  firstInspectLevel?: string;
  /** 检验频率 */
  inspectFrequency?: string;
  processId?: string;
  oqcInspectItemId?: string;
  /** 标准ID */
  inspectStdId?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 标准状态 */
  stdStatus?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 样本数 */
  sampleQty?: number;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 不合格分类 */
  unqualifyCategoryName?: string;
  /** 接收质量限 */
  aql?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 测量值 */
  measureList?: OqcInspectMeasureVO[];
  /** 不良数 */
  ngQty?: number;
  /** 不良描述 */
  ngReason?: string;
  /** AC值 */
  acValue?: number;
  /** RE值 */
  reValue?: number;
  /** AC/RE */
  acRe?: string;
  /** 文件列表 */
  fileList?: AddFileTypeVO[];
  /** 检验分类名称 */
  itemCategoryName?: string;
  /** 扫描的条形码 */
  scanBarcode?: string;
  /** 检验标准项目的标准附件 */
  inspectStdDtlAttachment?: ViewFileVO[];
  /** 项目特性 */
  characteristicsName?: string;
}

/** 巡回检验 */
export interface PqcInspectPatrolVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 首检单号 */
  billNo?: string;
  moScheId?: string;
  /**
   * 检验完成时间
   * @format date-time
   */
  datetimeInspectEnd?: string;
  userInspectId?: string;
  oqcInspectStdId?: string;
  workcenterId?: string;
  /** 不合格分类 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  deptResponsibilityId?: string;
  /** 备注 */
  memo?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 工作中心编码 */
  workcenterCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 工单 */
  moCode?: string;
  /** 排产单 */
  scheCode?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  /**
   * 计划开始时间
   * @format date-time
   */
  datetimePlanStart?: string;
  /**
   * 计划完成时间
   * @format date-time
   */
  datetimePlanEnd?: string;
  /**
   * 实际开始时间
   * @format date-time
   */
  datetimeActualStart?: string;
  /**
   * 实际完成时间
   * @format date-time
   */
  datetimeActualEnd?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  mitemCategoryId?: string;
  /** 物料分类编码 */
  mitemCategoryCode?: string;
  /** 物料分类描述 */
  mitemCategoryName?: string;
  /** 检验标准编码 */
  oqcInspectStdCode?: string;
  /** 检验标准名称 */
  oqcInspectStdName?: string;
  /** 单据状态 */
  statusName?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 工作中心名称 */
  wcName?: string;
  /** 质检人员 */
  userInspectName?: string;
  /** 不合格分类名称 */
  defectCategoryName?: string;
  /** 检验结果名称 */
  inspectResultName?: string;
  /** 改善单据 */
  improveNos?: string[];
  /** 项目分类名称 */
  itemCategoryName?: string;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 技术要求 */
  technicalRequest?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 项目特性名称 */
  characteristicsName?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 检测值 */
  inspectValue?: number;
  /** 不良原因 */
  ngReason?: string;
  /** 检验依据 */
  inspectBasis?: string;
  oqcInspectStdFullList?: OqcInspectStdFullVO[];
  /** 检验项目执行的文件列表 */
  fileList?: ViewFileVO[];
}

/** 移动端附件查看 */
export interface ViewFileVO {
  id?: string;
  /** 文件名 */
  fileName?: string;
  /** 文件尺寸 */
  path?: string;
  /**
   * 文件最后修改时间戳
   * @format date-time
   */
  lastModified?: string;
}

/** 通用响应类 */
export interface ResultString {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: string | null;
}

/** 巡回检验明细（根据item分类） */
export interface PqcInspectPatrolDtlItemCategoryVO {
  itemCategory?: string;
  itemCategoryName?: string;
  pqcInspectPatrolDtlVOList?: PqcInspectPatrolDtlVO[];
}

/** 巡回检验明细 */
export interface PqcInspectPatrolDtlVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  pqcInspectPatrolId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
  /** 技术要求 */
  technicalRequest?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /** 检测值 */
  inspectValue?: number;
  /** 不良原因 */
  ngReason?: string;
  /** 检验结果 */
  inspectResult?: string;
  inspectStdDtlId?: string;
  /** 项目分类 */
  itemCategoryName?: string;
  /** 检验类型 */
  inspectTypeName?: string;
  /** 项目特性 */
  characteristicsName?: string;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 上传的图片 */
  pqcInspectPatrolDtlFileVOList?: PqcInspectPatrolDtlFileVO[];
  /** 检验标准项目的标准附件 */
  inspectStdDtlAttachment?: ViewFileVO[];
}

/** 巡回检验全信息 */
export interface PqcInspectPatrolFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 首检单号 */
  billNo?: string;
  moScheId?: string;
  /**
   * 检验完成时间
   * @format date-time
   */
  datetimeInspectEnd?: string;
  userInspectId?: string;
  oqcInspectStdId?: string;
  workcenterId?: string;
  /** 不合格分类 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  deptResponsibilityId?: string;
  /** 备注 */
  memo?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 工单 */
  moCode?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 工作中心编码 */
  workcenterCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 检验标准编码 */
  oqcInspectStdCode?: string;
  /** 检验标准描述 */
  oqcInspectStdName?: string;
  /** 是否暂存 */
  isHold?: boolean;
  /** 巡回检验不合格处理意见VO */
  pqcInspectPatrolNgVO?: PqcInspectPatrolNgVO;
  /** 责任部门编码 */
  deptResponsibilityCode?: string;
  /** 责任部门名称 */
  deptResponsibilityName?: string;
  /** 责任人编码 */
  personResponsibilityCode?: string;
  /** 责任人名称 */
  personResponsibilityName?: string;
  /** 不合格分类 */
  defectCategoryName?: string;
  pqcInspectPatrolDtlItemCategoryVOList?: PqcInspectPatrolDtlItemCategoryVO[];
  /** 检验标准头表附件 */
  inspectStdHeadAttachment?: ViewFileVO[];
}

/** 巡回检验不合格处理意见VO */
export interface PqcInspectPatrolNgVO {
  /** 不合格分类 */
  defectCategory?: string;
  deptResponsibilityId?: string;
  personResponsibilityId?: string;
  /**
   * 是否启动品质改善
   * @format int32
   */
  isStartImprove?: number;
  /** 处理意见或方法 */
  handleMethod?: string;
}

/** 巡回检验查询 */
export interface PqcInspectPatrolSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  selectedField?: string;
  selectedValue?: string;
  keyword?: string;
  /** @format int32 */
  state?: number;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
  customerConditions?: Filter[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
  /** 检验单据 */
  billNo?: string;
  /** 待取消的检验单据 */
  cancelBillNoList?: string[];
  /**
   * 开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 结束日期
   * @format date-time
   */
  dateEnd?: string;
  moScheId?: string;
  mitemId?: string;
  workshopId?: string;
  workcenterId?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 检验状态 */
  status?: string;
  /** 质检人员 */
  userId?: string;
  pqcInspectPatrolId?: string;
  /** 项目分类 */
  itemCategory?: string;
  /** 是否仅显示不合格 */
  isNg?: boolean;
  /** 项目名称或内容 */
  itemName?: string;
}

/** 通用响应类 */
export interface ResultListPqcInspectPatrolVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PqcInspectPatrolVO[] | null;
}

/** 通用响应类 */
export interface ResultPqcInspectPatrolFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 巡回检验全信息 */
  data?: PqcInspectPatrolFullVO;
}

/** 巡回检验全数据查询 */
export interface PqcInspectPatrolBillSearch {
  /** 关键字 */
  keyWord?: string;
  /** 是否显示本人的单据 0:表示本人 */
  isMySelf?: string;
  /** 模式：EXECUTE 首末检执行, HISTORY 首末检历史单据 */
  viewType?: string;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** 检验单号 */
  billNo?: string;
  moScheId?: string;
  /** 报检员 */
  creator?: string;
  /** 检验结果 */
  inspectResult?: string;
  /**
   * 创建开始时间
   * @format date-time
   */
  beginDatetimeCreate?: string;
  /**
   * 创建结束时间
   * @format date-time
   */
  endDatetimeCreate?: string;
  workCenterId?: string;
  /** 单据状态集合 */
  statusList?: string[];
  /** 单据状态 */
  status?: string;
}

/** 响应数据 */
export type PagingDataPqcInspectPatrolBillFullVO = {
  list?: PqcInspectPatrolBillFullVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 巡回检验全数据 */
export interface PqcInspectPatrolBillFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 首检单号 */
  billNo?: string;
  moScheId?: string;
  /**
   * 检验完成时间
   * @format date-time
   */
  datetimeInspectEnd?: string;
  userInspectId?: string;
  oqcInspectStdId?: string;
  workcenterId?: string;
  /** 不合格分类 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  deptResponsibilityId?: string;
  /** 备注 */
  memo?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 车间编码 */
  workShopCode?: string;
  /** 车间名称 */
  workShopName?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 标准编码 */
  oqcInspectStdCode?: string;
  /** 标准名称 */
  oqcInspectStdName?: string;
  /** 单据状态名称 */
  statusName?: string;
  mitemCategoryId?: string;
  /** 物料类别编码 */
  mitemCategoryCode?: string;
  /** 物料类别名称 */
  mitemCategoryName?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 不合格分类名称 */
  defectCategoryName?: string;
  handleMethodName?: string;
  /** 责任方 */
  getDeptResponsibilityId?: string;
  /** 计量单位符号 */
  uomName?: string;
  displayName?: string;
  /** 产线编码 */
  workCenterCode?: string;
  /** 产线名称 */
  workCenterName?: string;
  /** 检验结果名称 */
  inspectResultName?: string;
}

/** 通用响应类 */
export interface ResultPagingDataPqcInspectPatrolBillFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPqcInspectPatrolBillFullVO;
}

/** 响应数据 */
export type PagingDataPqcInspectPatrolVO = {
  list?: PqcInspectPatrolVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataPqcInspectPatrolVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPqcInspectPatrolVO;
}

/** 产品检验标准全信息搜索类 */
export interface OqcInspectStdFullSearch {
  /** 模式：BJ 报检, JY 检验 */
  viewType?: string;
  /** OQC单据号 */
  billNo?: string;
  oqcInspectId?: string;
  /** 产检验明细表 */
  oqcInspectDtlId?: string;
  /** 产检验条码明细表 */
  oqcInspectBarcodeId?: string;
  /** 检验类型 */
  inspectType?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 严格度 */
  inspectionStringency?: string;
  /** 一键合格 */
  directInspectOk?: boolean;
  /** 一键判退 */
  directInspectNg?: boolean;
  supplierId?: string;
  /** 标签号码集合 */
  scanBarcode?: string;
  /** 检验类型转换(1：首检 2：巡检 4：抽检 8：复检) */
  convertInspectType?: string;
}

/** 响应数据 */
export type OqcInspectStdItemCategoryVO = {
  itemCategory?: string;
  itemCategoryName?: string;
  itemName?: string;
  checkStdList?: string[];
  checkAll?: boolean;
  oqcInspectStdFullList?: OqcInspectStdFullVO[];
} | null;

/** 通用响应类 */
export interface ResultListOqcInspectStdItemCategoryVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: OqcInspectStdItemCategoryVO[] | null;
}

/** 显示在首末检实体 */
export interface PqcBarcodeVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  pqcInspectFirstId?: string;
  /** 扫描的条码 */
  scanBarcode?: string;
  /** 检验结果 */
  inspectResult?: string;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 单位 */
  uom?: string;
  mitemCategoryId?: string;
  /** 状态 */
  status?: string;
  pqcInspectBarcodeId?: string;
  moScheId?: string;
  /** 按条码的检验类型分组 */
  pqcStdItemCategoryVOList?: PqcStdItemCategoryVO[];
  /** 检验结果名称 */
  inspectResultName?: string;
}

/** 首末检提交模型 */
export interface PqcInspectBillDTO {
  pqcInspectFirstId?: string;
  /** 单据号 */
  billNo?: string;
  /** 模式：BJ 报检, JY 检验 */
  viewType?: string;
  /** 首末检全数据 */
  pqcInspectBillInfo?: PqcInspectFirstBillFullVO;
  /** 是否暂存 */
  isTempSave?: boolean;
  /** 开始检索的检验项目 */
  startInspectItems?: PqcInspectFirstStdFullVO[];
  /** 条码列表 */
  barcodeList?: PqcBarcodeVO[];
  moScheId?: string;
  /** 标签号码 */
  scanBarcode?: string;
  /** 删除条码-明细表id */
  oqcInspectDtlIds?: string[];
  oqcInspectDtlBarcodeIds?: string[];
  /** 作废的单据id集合 */
  cancelledIds?: string[];
}

/** 首末检全数据 */
export interface PqcInspectFirstBillFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 检验单号 */
  billNo?: string;
  moScheId?: string;
  /**
   * 检验完成时间
   * @format date-time
   */
  datetimeInspectEnd?: string;
  userInspectId?: string;
  oqcInspectStdId?: string;
  /** 检验时机 */
  inspectOpportunity?: string;
  /** 检验数量 */
  inspectQty?: number;
  workgroupId?: string;
  workcenterId?: string;
  /** 不合格分类 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  deptResponsibilityId?: string;
  /** 备注 */
  memo?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  workShopCode?: string;
  workShopName?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 排产工单排产数量 */
  scheQty?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /** 单据状态名称 */
  statusName?: string;
  mitemCategoryId?: string;
  /** 物料类别编码 */
  mitemCategoryCode?: string;
  /** 物料类别名称 */
  mitemCategoryName?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 班组编码 */
  workgroupCode?: string;
  /** 班组名称 */
  workgroupName?: string;
  /** 不合格分类名称 */
  defectCategoryName?: string;
  /** 检验时机名称 */
  inspectOpportunityName?: string;
  handleMethodName?: string;
  /** 整改意见 */
  correctOpinionName?: string;
  /** 计量单位符号 */
  uomName?: string;
  displayName?: string;
  /** 产线编码 */
  workCenterCode?: string;
  /** 产线名称 */
  workCenterName?: string;
  /** 跟进人编码 */
  personResponsibilityCode?: string;
  /** 跟进人名称 */
  personResponsibilityName?: string;
  /** 责任部门编码 */
  deptResponsibilityCode?: string;
  /** 责任部门名称 */
  deptResponsibilityName?: string;
  /**
   * 是否启动改善
   * @format int32
   */
  isStartImprove?: number;
  /** 检验标准头表附件 */
  inspectStdHeadAttachment?: ViewFileVO[];
  /** 检验结果名称 */
  inspectResultName?: string;
}

/** 产品检验标准全信息表 */
export interface PqcInspectFirstStdFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  pqcInspectFirstBarcodeId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
  /** 技术要求 */
  technicalRequest?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /** 检测值 */
  inspectValue?: number;
  /** 不良描述 */
  ngReason?: string;
  /** 检验结果 */
  inspectResult?: string;
  pqcInspectFirstId?: string;
  oqcInspectStdDtlId?: string;
  oqcInspectItemId?: string;
  /** 标准ID */
  inspectStdId?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 标准状态 */
  stdStatus?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 样本数 */
  sampleQty?: number;
  /** 条码 */
  scanBarcode?: string;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 不合格分类 */
  unqualifyCategoryName?: string;
  /** 接收质量限 */
  aql?: string;
  /** 不良数 */
  ngQty?: number;
  /** AC值 */
  acValue?: number;
  /** 检验类型 */
  inspectTypeName?: string;
  /** 项目分类名称 */
  itemCategoryName?: string;
  /** 产品检验项目执行的文件列表 */
  fileList?: UploadFile[];
  /** 检验标准项目的标准附件 */
  inspectStdDtlAttachment?: ViewFileVO[];
  /** 项目特性 */
  characteristicsName?: string;
}

/** 首检明细（根据item分类） */
export interface PqcStdItemCategoryVO {
  itemCategory?: string;
  itemCategoryName?: string;
  inspectItems?: PqcInspectFirstStdFullVO[];
}

/** 前端文件VO */
export interface UploadFile {
  id?: string;
  /** 文件名 */
  name?: string;
  size?: string;
  /** 文件MIME类型 */
  type?: string;
  lastModified?: string;
  /** 文件相对路径 */
  webkitRelativePath?: string;
  /** 文件路径（也可能是Base64数据） */
  url?: string;
  /** 上传状态 */
  status?: string;
  /** 文件内容 */
  fileContent?: string;
}

/** 通用响应类 */
export interface ResultPqcBarcodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示在首末检实体 */
  data?: PqcBarcodeVO;
}

/** 响应数据 */
export type PagingDataPqcInspectFirstBillFullVO = {
  list?: PqcInspectFirstBillFullVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataPqcInspectFirstBillFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPqcInspectFirstBillFullVO;
}

export interface PqcInspectFirstSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  /**
   * 开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 结束日期
   * @format date-time
   */
  dateEnd?: string;
  /** 首检单号 */
  billNo?: string;
  /** 检验时机 */
  inspectOpportunity?: string;
  moScheId?: string;
  mitemId?: string;
  workshopId?: string;
  workcenterId?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 是否品质改善 */
  isImprove?: string;
  pqcInspectFirstId?: string;
  pqcInspectFirstBarcodeId?: string;
  /** 项目分类 */
  itemCategory?: string;
  /** 是否仅显示不合格 */
  isNg?: boolean;
  /** 项目名称或内容 */
  itemName?: string;
}

/** 响应数据 */
export type PqcInspectFirstVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 首检单号 */
  billNo?: string;
  moScheId?: string;
  /**
   * 检验完成时间
   * @format date-time
   */
  datetimeInspectEnd?: string;
  userInspectId?: string;
  oqcInspectStdId?: string;
  /** 检验时机 */
  inspectOpportunity?: string;
  /** 检验数量 */
  inspectQty?: number;
  workgroupId?: string;
  workcenterId?: string;
  /** 不合格分类 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  deptResponsibilityId?: string;
  /** 备注 */
  memo?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 检验时机名称 */
  inspectOpportunityName?: string;
  /** 排产工单 */
  scheCode?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  /**
   * 计划开始时间
   * @format date-time
   */
  datetimePlanStart?: string;
  /**
   * 计划完成时间
   * @format date-time
   */
  datetimePlanEnd?: string;
  /**
   * 实际开始时间
   * @format date-time
   */
  datetimeActualStart?: string;
  /**
   * 实际完成时间
   * @format date-time
   */
  datetimeActualEnd?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 单据状态名称 */
  statusName?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 工作中心名称 */
  wcName?: string;
  /** 检验人 */
  userInspectName?: string;
  /** 创建人 */
  creatorName?: string;
  /** 检验结果名称 */
  inspectResultName?: string;
  /** 改善单据 */
  improveNos?: string[];
  /** 标准名称 */
  inspectStdName?: string;
  /** 扫描的条码 */
  scanBarcode?: string;
  pqcInspectFirstId?: string;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目分类名称 */
  itemCategoryName?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 技术要求 */
  technicalRequest?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 项目特性名称 */
  characteristicsName?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 检测值 */
  inspectValue?: number;
  /** 不良原因 */
  ngReason?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 不合格分类名称 */
  defectCategoryName?: string;
  /** 产品检验项目执行的文件列表 */
  fileList?: ViewFileVO[];
} | null;

/** 通用响应类 */
export interface ResultListPqcInspectFirstVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PqcInspectFirstVO[] | null;
}

/** 首末检全数据查询 */
export interface PqcInspectBillSearch {
  /** 关键字 */
  keyWord?: string;
  /** 是否显示本人的单据 0:表示本人 */
  isMySelf?: string;
  /** 模式：EXECUTE 首末检执行, HISTORY 首末检历史单据 */
  viewType?: string;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** 检验单号 */
  billNo?: string;
  moScheId?: string;
  /** 报检员 */
  creator?: string;
  /** 检验结果 */
  inspectResult?: string;
  /**
   * 创建开始时间
   * @format date-time
   */
  beginDatetimeCreate?: string;
  /**
   * 创建结束时间
   * @format date-time
   */
  endDatetimeCreate?: string;
  workCenterId?: string;
  /** 单据状态集合 */
  statusList?: string[];
  /** 单据状态 */
  status?: string;
}

/** 通用响应类 */
export interface ResultPqcInspectFirstBillFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 首末检全数据 */
  data?: PqcInspectFirstBillFullVO;
}

/** 响应数据 */
export type PagingDataPqcInspectFirstVO = {
  list?: PqcInspectFirstVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataPqcInspectFirstVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPqcInspectFirstVO;
}

/** 产品检验标准全信息搜索类 */
export interface PqcInspectStdFullSearch {
  /** 模式：BJ 报检, JY 检验 */
  viewType?: string;
  /** pqc单据号 */
  billNo?: string;
  /** 条码 */
  barcode?: string;
  pqcInspectFirstId?: string;
  /** 检验条码表 */
  pqcInspectFirstBarcodeId?: string;
  /** 检验条码明细表 */
  pqcInspectFirstBarcodeDtlId?: string;
  /** 检验类型 */
  inspectType?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 严格度 */
  inspectionStringency?: string;
  /** 一键合格 */
  directInspectOk?: boolean;
  /** 一键判退 */
  directInspectNg?: boolean;
  supplierId?: string;
}

/** 通用响应类 */
export interface ResultListPqcInspectFirstStdFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PqcInspectFirstStdFullVO[] | null;
}

/** 通用响应类 */
export interface ResultListPqcBarcodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PqcBarcodeVO[] | null;
}

/** 首检条码检验明细附件表 */
export interface PqcInspectFirstBarcodeDtlFile {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  pqcInspectFirstBarcodeDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  pqcInspectFirstId?: string;
}

export interface OqcInspectStdMitemSearch {
  mitemId?: string;
  inspectStdCode?: string;
  mitemCategoryId?: string;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNum?: number;
}

export interface OqcInspectStdMitemVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  oqcInspectStdId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  categoryName?: string;
  categoryCode?: string;
  mitemCode?: string;
  mitemName?: string;
  inspectStdCode?: string;
  revision?: number;
  revisionName?: string;
  creatorName?: string;
  modifierName?: string;
  inspectStdName?: string;
  mitemCategortArr?: Record<string, string>;
}

/** 响应数据 */
export type PagingDataOqcInspectStdMitemVO = {
  list?: OqcInspectStdMitemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOqcInspectStdMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOqcInspectStdMitemVO;
}

export interface OqcInspectStdMitemAssign {
  stdId?: string;
  mitemId?: string;
  mitemCategoryIds?: string[];
}

export interface OqcInspectStdSearch {
  stdId?: string;
  inspectStdCode?: string;
  status?: string[];
  userNames?: string[];
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNum?: number;
}

export interface FileUpload {
  filePath?: string;
  fileName?: string;
  signedUrl?: string;
  operateType?: string;
  /** @format date-time */
  timeUpload?: string;
  /** @format double */
  fileSize?: number;
}

export interface OqcInspectStdDtlDTO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 产品检验标准表ID */
  oqcInspectStdId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 单位 */
  uom?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 抽样标准编码 */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /** 首件级别 */
  firstInspectLevel?: string;
  /** 检验频率 */
  inspectFrequency?: string;
  processId?: string;
  itemCategoryName?: string;
  unqualifyCategoryName?: string;
  inspectLevelName?: string;
  inspectTypeName?: string;
  samplingStandardTypeName?: string;
  uomName?: string;
  characteristicsName?: string;
  inspectPropertyName?: string;
  processName?: string;
  fileList?: FileUpload[];
  fileListVo?: OqcInspectStdDtlFile[];
}

/** 产品检验标准明细附件表 */
export interface OqcInspectStdDtlFile {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  oqcInspectStdDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

/** 响应数据 */
export type PagingDataOqcInspectStdDtlDTO = {
  list?: OqcInspectStdDtlDTO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOqcInspectStdDtlDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOqcInspectStdDtlDTO;
}

/** 产品检验标准头表 */
export interface OqcInspectStd {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  groupInspectStdId?: string;
  /** 版本号 */
  revision?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 状态 */
  status?: string;
  /**
   * 检验类型
   * @format int32
   */
  inspectType?: number;
}

/** 响应数据 */
export type PagingDataOqcInspectStd = {
  list?: OqcInspectStd[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOqcInspectStd {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOqcInspectStd;
}

export interface CommonImportOqcInspectStdFullImport {
  title?: string;
  tableName?: string;
  data?: OqcInspectStdFullImport[];
  columns?: ImportColumn[];
  /** @format int32 */
  batchSize?: number;
}

export interface OqcInspectStdDtlImport {
  itemCategoryName?: string;
  itemName?: string;
  itemSeq?: string;
  unqualifyCategoryName?: string;
  inspectLevelName?: string;
  inspectTypeName?: string;
  samplingStandardTypeName?: string;
  samplingStandardCode?: string;
  uomName?: string;
  characteristicsName?: string;
  inspectPropertyName?: string;
  processName?: string;
  baseValue?: string;
  maxValue?: string;
  minValue?: string;
  technicalRequest?: string;
  inspectTool?: string;
  inspectBasis?: string;
  inspectFrequency?: string;
}

export interface OqcInspectStdFullImport {
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /** 版本号 */
  revision?: string;
  /** 生效时间 */
  timeEffective?: string;
  /** 失效时间 */
  timeInvalid?: string;
  list?: OqcInspectStdDtlImport[];
}

/** 产品检验标准附件表 */
export interface OqcInspectStdFile {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  oqcInspectStdId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

export interface OqcInspectStdVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  groupInspectStdId?: string;
  /** 版本号 */
  revision?: number;
  revisionName?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 状态 */
  status?: string;
  /**
   * 检验类型
   * @format int32
   */
  inspectType?: number;
  creatorName?: string;
  statusName?: string;
  isGroupName?: string;
  /** 最后修订人 */
  modifierName?: string;
  /**
   * 最后修订时间
   * @format date-time
   */
  timeModified?: string;
  inspectTypeList?: number[];
  fileList?: OqcInspectStdFile[];
}

/** 响应数据 */
export type PagingDataOqcInspectStdVO = {
  list?: OqcInspectStdVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOqcInspectStdVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOqcInspectStdVO;
}

export interface OqcInspectStdFullDTO {
  id?: string;
  perId?: string;
  /** 标准编码 */
  inspectStdCode: string;
  /** 标准名称 */
  inspectStdName: string;
  groupInspectStdId?: string;
  /** 版本号 */
  revision: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid: string;
  /** 状态 */
  status?: string;
  operateTpye?: string;
  /** 检验类型 */
  inspectTypeList: number[];
  inspectType?: string;
  list?: OqcInspectStdDtlDTO[];
  /** @format int32 */
  total?: number;
  ids?: string[];
  fileList?: FileUpload[];
}

/** 显示在成品发货实体 */
export interface BarcodeVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  oqcInspectId?: string;
  /** 扫描的条形码 */
  scanBarcode?: string;
  moScheId?: string;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 单位 */
  uom?: string;
  mitemCategoryId?: string;
  /** 状态 */
  status?: string;
  oqcInspectBarcodeId?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 条码检验项 */
  inspectItems?: OqcInspectStdFullVO[];
  /** 是否检验扫码 */
  isScan?: string;
}

/** 缺陷类型 */
export interface Dropdown {
  value?: string;
  label?: string;
}

/** 产品检验提交模型 */
export interface OqcInspectBillDTO {
  oqcInspectId?: string;
  /** 单据号 */
  billNo?: string;
  /** 模式：BJ 报检, JY 检验 */
  viewType?: string;
  /** 业务类型：MO 按工单, BARCODE 按条码 */
  businessCategory?: string;
  /** 产品检验全数据 */
  oqcInspectBillInfo?: OqcInspectBillFullVO;
  /** 是否暂存 */
  isTempSave?: boolean;
  /** 默认匹配到的检验项目 */
  defaultInspectItems?: OqcInspectStdFullVO[];
  /** 条码列表 */
  barcodeList?: BarcodeVO[];
  /** 是否启用审批流程 */
  enableProcessApproval?: string;
  moScheId?: string;
  /** 标签号码 */
  scanBarcode?: string;
  /** 删除条码-明细表id */
  oqcInspectDtlIds?: string[];
  oqcInspectDtlBarcodeIds?: string[];
}

/** 产品检验全数据 */
export interface OqcInspectBillFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 检验单号 */
  billNo?: string;
  /** 关联检验单号 */
  relateBillNo?: string;
  oqcInspectStdId?: string;
  /** 检验类型 */
  inspectCategory?: string;
  /** 业务类型 */
  businessCategory?: string;
  moScheId?: string;
  mitemId?: string;
  /** 检验数量 */
  inspectQty?: number;
  /**
   * 检验完成时间
   * @format date-time
   */
  datetimeInspect?: string;
  inspectUserId?: string;
  /** 检验严格度 */
  inspectStringency?: string;
  /** 缺陷等级 */
  defectCategory?: string;
  /** 报检数量 */
  qty?: number;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 备注 */
  memo?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 抽样标准编码 */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  deptResponsibilityId?: string;
  /** 报批数量-按工单 */
  checkMoTotalQty?: number;
  /** 报批数量-按条码 */
  checkBarcodeTotalQty?: number;
  workShopCode?: string;
  workShopName?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /** 单据状态名称 */
  statusName?: string;
  mitemCategoryId?: string;
  /** 物料类别编码 */
  mitemCategoryCode?: string;
  /** 物料类别名称 */
  mitemCategoryName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 检验严格度 */
  inspectStringencyName?: string;
  defectCategoryName?: string;
  handleMethodName?: string;
  /** 整改意见 */
  correctOpinionName?: string;
  /** 计量单位符号 */
  uomName?: string;
  displayName?: string;
  /** 缺陷类型 */
  defectCodeList?: Dropdown[];
  /** 检验结果名称 */
  inspectResultName?: string;
  /** 检验类型名称 */
  inspectCategoryName?: string;
  /** 业务类型名称 */
  businessCategoryName?: string;
}

/** 通用响应类 */
export interface ResultBarcodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示在成品发货实体 */
  data?: BarcodeVO;
}

/** 通用响应类 */
export interface ResultListBarcodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BarcodeVO[] | null;
}

/** 响应数据 */
export type PagingDataOqcInspectBillFullVO = {
  list?: OqcInspectBillFullVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOqcInspectBillFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOqcInspectBillFullVO;
}

/** 通用响应类 */
export interface ResultListOqcInspectStdFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: OqcInspectStdFullVO[] | null;
}

/** 物料检验单全数据查询 */
export interface OqcInspectBillSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** 检验单号 */
  billNo?: string;
  moScheId?: string;
  mitemId?: string;
  /** 检验类型 */
  inspectCategory?: string;
  /**
   * 是否发起品质改善
   * @format int32
   */
  isStartImprove?: number;
  inspectUserId?: string;
  /** 检验结果 */
  inspectResult?: string;
  /**
   * 检验开始日期
   * @format date-time
   */
  beginDatetimeInspection?: string;
  /**
   * 检验结束日期
   * @format date-time
   */
  endDatetimeInspection?: string;
  /**
   * 创建开始时间
   * @format date-time
   */
  beginDatetimeCreate?: string;
  /**
   * 创建结束时间
   * @format date-time
   */
  endDatetimeCreate?: string;
  inspectGroupId?: string;
  /** 单据状态 */
  status?: string;
  inspectGroupMitemCategoryId?: string[];
}

/** 产品检验模型 */
export interface OqcInspectDTO {
  /** 作废的单据id集合 */
  cancelledIds?: string[];
}

/** 成品检验明细附件表 */
export interface OqcInspectItemFile {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  oqcInspectId?: string;
  oqcInspectItemId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

/** 通用响应类 */
export interface ResultListAddFileTypeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: AddFileTypeVO[] | null;
}

export interface JobCommonDTO {
  /** 公共JOB参数 */
  jobCommonParams?: JobCommonParam[];
  /** 物料复检单生成JOB参数 */
  materialReInspectionJobParams?: MaterialReInspectionJobParam[];
  /** 物料复检单生成JOB参数 */
  productionReInspectionJobParams?: ProductionReInspectionJobParam[];
}

/** 公共JOB参数 */
export interface JobCommonParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

/** 物料复检单生成JOB参数 */
export interface MaterialReInspectionJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

/** 物料复检单生成JOB参数 */
export interface ProductionReInspectionJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 检验严格度 */
  inspectStringency?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 抽样标准编码 */
  samplingStandardCode?: string;
}

/** 物料检验标准分配表 */
export interface IqcInspectStdMitem {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectStdId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
}

export interface IqcInspectStdMitemSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  /** 标准编码名称模糊 */
  keyword?: string;
  mitemCategoryId?: string;
  /** 物料类别ID列表 */
  mitemCategoryIds?: string[];
  mitemId?: string;
  iqcInspectStdId?: string;
}

/** 物料检验标准头表 */
export interface IqcInspectStdMitemVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectStdId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /** 版本号 */
  revision?: number;
  /** 物料分类代码 */
  categoryCode?: string;
  /** 物料分类名称 */
  categoryName?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 创建人 */
  creatorName?: string;
}

/** 响应数据 */
export type PagingDataIqcInspectStdMitemVO = {
  list?: IqcInspectStdMitemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectStdMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectStdMitemVO;
}

/** 单据明细附件 */
export interface IqcInspectStdDtlFileVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectStdDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  serialNumber?: string;
  fullFileName?: string;
  fileType?: string;
  fileSizeShow?: string;
  fileSize?: number;
  timeUpload?: string;
  signedUrl?: string;
  percent?: number;
  name?: string;
  url?: string;
}

/** 物料检验标准头表 */
export interface IqcInspectStdDtlVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectStdId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 单位 */
  uom?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 抽样标准ID */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /**
   * 是否CTQ
   * @format int32
   */
  isCtq?: number;
  /** 项目分类名称 */
  itemCategoryName?: string;
  /** 检验类型名称 */
  inspectTypeName?: string;
  /** 不合格分类名称 */
  unqualifyCategoryName?: string;
  /** 项目特性名称 */
  characteristicsName?: string;
  /** 检验水平名称 */
  inspectLevelName?: string;
  /** 单位名称 */
  uomName?: string;
  /** 其附件记录列表 */
  fileList?: IqcInspectStdDtlFileVO[];
  /** 上传的附件信息列表 */
  files?: FileUpload[];
}

/** 物料检验标准全信息搜索类 */
export interface IqcInspectStdFullSearch {
  /** 复检单据号 */
  recheckBillNo?: string;
  /** IQC单据号 */
  iqcBillNo?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  uom?: string;
  pickQty?: string;
  /** 严格度 */
  inspectionStringency?: string;
  /** 一键合格 */
  directInspectOk?: boolean;
  /** 一键判退 */
  directInspectNg?: boolean;
  /** 是否免检 */
  isExemptionInspection?: boolean;
  supplierId?: string;
  /** 接收单号信息 */
  billNoList?: IqcInspectSubmitDeliveryNoVO[];
  /** 是否创建入库单据 */
  isCreatedStockIn?: boolean;
  /** 是否创建IQC检验单据 */
  isCreatedIqcInspect?: boolean;
}

/** 物料检验头表 */
export interface IqcInspectSubmitDeliveryNoVO {
  /** IQC单号 */
  iqcBillNo?: string;
  /** 接收单号 */
  billNo?: string;
  billNoDtlId?: string;
  /** 业务单据号 */
  businessBillNo?: string;
  /** 业务单据行号 */
  businessBillLineNo?: string;
}

/** 检验测量值 */
export interface IqcInspectMeasureVO {
  /**
   * 标准的明细行ID
   * @format int64
   */
  stdDtlId?: number;
  /**
   * 检测值序号
   * @format int32
   */
  inspectSeq?: number;
  /** 测量值 */
  measureValue?: number;
  /** 样本数 */
  sampleQty?: number;
  /** 检验工具 */
  inspectTool?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
}

/** 物料检验标准全信息表 */
export type IqcInspectStdFullVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectStdId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 单位 */
  uom?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 抽样标准ID */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /**
   * 是否CTQ
   * @format int32
   */
  isCtq?: number;
  iqcInspectDtlId?: string;
  iqcInspectRecheckDtlId?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 标准状态 */
  stdStatus?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 样本数 */
  sampleQty?: number;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 不合格分类 */
  unqualifyCategoryName?: string;
  /** 接收质量限 */
  aql?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 检验结果 */
  inspectResultSwitch?: boolean;
  /** 测量值 */
  measureList?: IqcInspectMeasureVO[];
  /** 不良数 */
  ngQty?: number;
  /** 不良描述 */
  ngReason?: string;
  /** AC值 */
  acValue?: number;
  /** RE值 */
  reValue?: number;
  /** AC/RE */
  acRe?: string;
  /** 文件列表 */
  fileList?: AddFileTypeVO[];
  /** 项目特性 */
  characteristicsName?: string;
  /** 是否CTQ */
  isCtqName?: string;
} | null;

/** 通用响应类 */
export interface ResultListIqcInspectStdFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IqcInspectStdFullVO[] | null;
}

export interface IqcInspectStdDtlSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  /** 标准编码名称模糊 */
  keyword?: string;
  /** 标准状态 */
  status?: string[];
  /** 创建人名称 */
  userNames?: string[];
  iqcInspectStdId?: string;
  iqcInspectStdDtlId?: string;
}

/** 响应数据 */
export type PagingDataIqcInspectStdDtlVO = {
  list?: IqcInspectStdDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectStdDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectStdDtlVO;
}

/** 物料检验标准头表 */
export interface IqcInspectStdVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 最后修订时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  groupInspectStdId?: string;
  /** 版本号 */
  revision?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 状态 */
  status?: string;
  /** 是否集团标准 */
  isGroupInspectStd?: string;
  /** 创建人 */
  creatorName?: string;
  /** 最后修订人 */
  modifierName?: string;
  /** 标准状态名称 */
  statusName?: string;
  files?: FileUpload[];
  dtls?: IqcInspectStdDtlVO[];
  isTemporaryStorage?: boolean;
}

/** 物料检验标准头表 */
export interface IqcInspectStd {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  groupInspectStdId?: string;
  /** 版本号 */
  revision?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 状态 */
  status?: string;
}

/** 响应数据 */
export type PagingDataIqcInspectStd = {
  list?: IqcInspectStd[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectStd {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectStd;
}

/** 通用响应类 */
export interface ResultListIqcInspectStdDtlFileVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IqcInspectStdDtlFileVO[] | null;
}

/** 单据附件 */
export type IqcInspectStdFileVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectStdId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  serialNumber?: string;
  fullFileName?: string;
  fileType?: string;
  fileSizeShow?: string;
  fileSize?: number;
  timeUpload?: string;
  signedUrl?: string;
  percent?: number;
  name?: string;
  url?: string;
} | null;

/** 通用响应类 */
export interface ResultListIqcInspectStdFileVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IqcInspectStdFileVO[] | null;
}

export interface IqcInspectStdSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  /** 标准编码名称模糊 */
  keyword?: string;
  /** 标准状态 */
  status?: string[];
  /** 创建人名称 */
  userNames?: string[];
}

/** 响应数据 */
export type PagingDataIqcInspectStdVO = {
  list?: IqcInspectStdVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectStdVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectStdVO;
}

/** 通用响应类 */
export interface ResultLong {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: string;
}

/** 复检单明细文件上传 */
export interface IqcInspectRecheckDtlFileVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectRecheckDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

/** 检验单明细文件上传查询 */
export interface IqcInspectDtlFileSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  selectedField?: string;
  selectedValue?: string;
  keyword?: string;
  /** @format int32 */
  state?: number;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
  customerConditions?: Filter[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
  iqcInspectDtlId?: string;
  uploadPath?: string;
}

/** 复检处理意见VO */
export interface IqcInspectRecheckNgVO {
  /** 缺陷类型 */
  defectCodeList?: Dropdown[];
  /** 缺陷等级 */
  iqcDefectCategoryCode?: string;
  /** 物料处理意见 */
  iqcHandleMethodCode?: string;
  /** 责任判定 */
  iqcResponsibilityCode?: string;
  /** 供方整改意见 */
  iqcCorrectCode?: string;
  personResponsibilityId?: string;
  /** 供方处理意见 */
  supplyHandleMethod?: string;
  /**
   * 是否启动品质改善
   * @format int32
   */
  isStartImprove?: number;
  memo?: string;
}

/** 物料复检头表 */
export interface IqcInspectRecheckSubmitVO {
  /** 是否新增 */
  isAdd?: boolean;
  /** IQC单号 */
  iqcBillNo?: string;
  /** IQC复检单号 */
  recheckBillNo?: string;
  /** IQC合并复检单号 */
  iqcBillNoList?: string[];
  mitemId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  mitemCategoryId?: string;
  mitemCategoryCode?: string;
  mitemCategoryName?: string;
  inspectQty?: number;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  inspectionStringency?: string;
  /** 复检类型 */
  recheckType?: string;
  /** 复检原因 */
  recheckReason?: string;
  /** 备注 */
  memo?: string;
  /** 单据状态 */
  status?: string;
  id?: string;
  /** 批次号 */
  lotNo?: string;
  eid?: string;
  oid?: string;
  /** 复检处理意见VO */
  iqcInspectRecheckNg?: IqcInspectRecheckNgVO;
  iqcInspectStdList?: IqcInspectStdFullVO[];
}

/** 物料复检单查询 */
export interface IqcInspectRecheckSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  selectedField?: string;
  selectedValue?: string;
  keyword?: string;
  /** @format int32 */
  state?: number;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
  customerConditions?: Filter[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
  /** 复检单号 */
  recheckBillNo?: string;
  iqcInspectStdId?: string;
}

/** 物料复检检验明细表 */
export interface IqcInspectRecheckDtlFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectRecheckId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 抽样标准编码 */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /**
   * 是否CTQ
   * @format int32
   */
  isCtq?: number;
  /** 不良数 */
  ngQty?: number;
  /** 不良描述 */
  ngReason?: string;
  /** 样本数 */
  sampleQty?: number;
  /** AC值 */
  acValue?: number;
  /** RE值 */
  reValue?: number;
  /** 检验结果 */
  inspectResult?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 标准状态 */
  stdStatus?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 不合格分类 */
  unqualifyCategoryName?: string;
  /** 接收质量限 */
  aql?: string;
  /** 测量值 */
  measureList?: IqcInspectRecheckMeasureVO[];
  /** AC/RE */
  acRe?: string;
  /** 文件列表 */
  fileList?: AddFileTypeVO[];
  /** 检验严格度 */
  inspectionStringency?: string;
  /** 检验严格度 */
  inspectionStringencyName?: string;
  /** 计量单位符号 */
  uom?: string;
  /** 计量单位符号 */
  uomName?: string;
  /** 项目分类 */
  itemCategoryName?: string;
  iqcInspectStdDtlId?: string;
  iqcInspectRecheckDtlId?: string;
  /** 项目特性 */
  characteristicsName?: string;
  /** 是否CTQ */
  isCtqName?: string;
}

/** 检验测量值 */
export interface IqcInspectRecheckMeasureVO {
  /**
   * 标准的明细行ID
   * @format int64
   */
  stdDtlId?: number;
  /**
   * 检测值序号
   * @format int32
   */
  inspectSeq?: number;
  /** 测量值 */
  measureValue?: number;
  /** 样本数 */
  sampleQty?: number;
  /** 检验工具 */
  inspectTool?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
}

/** 响应数据 */
export type PagingDataIqcInspectRecheckDtlFullVO = {
  list?: IqcInspectRecheckDtlFullVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectRecheckDtlFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectRecheckDtlFullVO;
}

/** 复检搜索条件 */
export interface MitemInspectionBillSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  recheckBillNo?: string;
  iqcBillNo?: string;
  /** @format date-time */
  beginDatetimeRecheck?: string;
  /** @format date-time */
  endDatetimeRecheck?: string;
  mitemId?: string;
  supplierId?: string;
  status?: string;
  personResponsibilityId?: string;
  inspectGroupId?: string;
  inspectGroupMitemCategoryId?: string[];
}

/** 复检用的物料入厂检验信息表 */
export interface MitemInspectionBillVO {
  id?: string;
  /**
   * 报检时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** IQC单据号 */
  iqcBillNo?: string;
  /** 复检单据号 */
  recheckBillNo?: string;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  mitemId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  mitemCategoryId?: string;
  mitemCategoryCode?: string;
  mitemCategoryName?: string;
  /** 检验数量 */
  inspectQty?: number;
  /** 复检类型 */
  recheckType?: string;
  /** 复检原因 */
  recheckReason?: string;
  status?: string;
  statusName?: string;
  /** 检验严格度 */
  inspectionStringency?: string;
  /** 检验严格度 */
  inspectionStringencyName?: string;
  /** 报检人 */
  displayName?: string;
  /** 复检类型名称 */
  recheckTypeName?: string;
}

/** 响应数据 */
export type PagingDataMitemInspectionBillVO = {
  list?: MitemInspectionBillVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemInspectionBillVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemInspectionBillVO;
}

/** 检验单明细文件上传 */
export interface IqcInspectDtlFileVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

export interface MitemForwardTraceSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  /** 物料批次 */
  mitemLotNo?: string;
  /** 物料标签 */
  mitemLabelNo?: string;
  mitemId?: string;
  /** 物料id */
  ids?: string[];
}

/** 关键物料正向追溯VO */
export interface MFTSubVO {
  /** 物料标签 */
  mitemLabelNo?: string;
  /** 批次 */
  lotNo?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商联系人 */
  contactPerson?: string;
  /** 供应商联系电话 */
  contactTel?: string;
  /** 检验单号 */
  billNo?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 质检结果 */
  inspectResult?: string;
  /** 数量 */
  qty?: number;
  /** 操作员 */
  operatorName?: string;
  /** 产品编码 */
  pdCode?: string;
  /** 来源仓库名称 */
  warehouseName?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  /** 工作中心 */
  workcenterName?: string;
  /** 工单号 */
  moCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 物料描述 */
  mitemCode?: string;
  /** 绑定工序 */
  processName?: string;
  /** 操作类型 */
  operateType?: string;
  /**
   * 加工时间
   * @format date-time
   */
  processDate?: string;
}

/** 响应数据 */
export type PagingDataMFTSubVO = {
  list?: MFTSubVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMFTSubVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMFTSubVO;
}

/** 物料检验单全数据查询 */
export interface IqcInspectBillSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  personResponsibilityId?: string;
  inspectGroupId?: string;
  /**
   * 接收开始时间
   * @format date-time
   */
  beginDatetimeReceipted?: string;
  /**
   * 接收结束时间
   * @format date-time
   */
  endDatetimeReceipted?: string;
  /**
   * 检验开始日期
   * @format date-time
   */
  beginDatetimeInspectTion?: string;
  /**
   * 检验结束日期
   * @format date-time
   */
  endDatetimeInspectTion?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 检验状态 */
  inspectStatus?: string;
  /** 处理方式 */
  handleMethod?: string;
  /** 检验单号 */
  iqcBillNo?: string;
  /** 接收单号 */
  billNo?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  supplierId?: string;
  /** 检验标准 */
  inspectStdCode?: string;
  inspectGroupMitemCategoryId?: string[];
}

/** 物料检验单全数据 */
export interface IqcInspectBillFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectId?: string;
  /** 接收单号 */
  deliveryNo?: string;
  deliveryDtlId?: string;
  /** IQC检验单 */
  iqcBillNo?: string;
  /** 接收单号 */
  billNo?: string;
  iqcInspectStdId?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /** 显示名 */
  displayName?: string;
  /** 单据状态 */
  status?: string;
  /** 单据状态名称 */
  statusName?: string;
  mitemCategoryId?: string;
  /** 物料类别编码 */
  mitemCategoryCode?: string;
  /** 物料类别名称 */
  mitemCategoryName?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  supplierId?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 检验数量 */
  pickQty?: number;
  /** 检验严格度 */
  inspectionStringency?: string;
  inspectionStringencyName?: string;
  /** 缺陷等级 */
  defectCategory?: string;
  defectCategoryName?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  handleMethodName?: string;
  /** 供方处理意见 */
  supplyHandleMethod?: string;
  supplyHandleMethodName?: string;
  /** 责任方 */
  responsibility?: string;
  /** 整改意见 */
  correctOpinion?: string;
  correctOpinionName?: string;
  personResponsibilityId?: string;
  /**
   * 是否启动品质改善
   * @format int32
   */
  isStartImprove?: number;
  /** 让步接收数量 */
  concessQty?: number;
  /** 检验结果 */
  inspectResult?: string;
  /** 计量单位符号 */
  uomName?: string;
  /**
   * 是否免检
   * @format int32
   */
  isExemptionInspection?: number;
  /** 检验结果名称 */
  inspectResultName?: string;
  /** 停留时长 */
  waitTime?: string;
}

/** 响应数据 */
export type PagingDataIqcInspectBillFullVO = {
  list?: IqcInspectBillFullVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectBillFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectBillFullVO;
}

/** 处理意见VO */
export interface IqcInspectNgVO {
  /** 缺陷类型 */
  defectCodeList?: Dropdown[];
  /** 缺陷等级 */
  iqcDefectCategoryCode?: string;
  /** 物料处理意见 */
  iqcHandleMethodCode?: string;
  /** 责任判定 */
  iqcResponsibilityCode?: string;
  /** 供方整改意见 */
  iqcCorrectCode?: string;
  personResponsibilityId?: string;
  /** 供方处理意见 */
  supplyHandleMethod?: string;
  /**
   * 是否启动品质改善
   * @format int32
   */
  isStartImprove?: number;
  memo?: string;
}

/** 物料检验头表 */
export interface IqcInspectSubmitVO {
  /** IQC单号 */
  iqcBillNo?: string;
  /** 接收单号 */
  billNoList?: IqcInspectSubmitDeliveryNoVO[];
  mitemId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uom?: string;
  mitemCategoryId?: string;
  mitemCategoryCode?: string;
  mitemCategoryName?: string;
  pickQty?: number;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  /** 严格度 */
  inspectionStringency?: string;
  /** 一键合格 */
  directInspectOk?: boolean;
  /** 一键判退 */
  directInspectNg?: boolean;
  /** 是否免检 */
  isExemptionInspection?: boolean;
  /** 处理意见VO */
  iqcInspectNg?: IqcInspectNgVO;
  iqcInspectStdList?: IqcInspectStdFullVO[];
  /** 是否创建入库单据 */
  isCreatedStockIn?: boolean;
}

/** 物料检验单查询 */
export interface IqcInspectSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  selectedField?: string;
  selectedValue?: string;
  keyword?: string;
  /** @format int32 */
  state?: number;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
  customerConditions?: Filter[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
  /** IQC单号 */
  iqcBillNo?: string;
  mitemId?: string;
  supplierId?: string;
  /**
   * 送检开始日期
   * @format date-time
   */
  timeCreateStart?: string;
  /**
   * 送检结束日期
   * @format date-time
   */
  timeCreateEnd?: string;
  /** 供应商IDS */
  supplierIds?: string[];
  iqcInspectStdId?: string;
}

/** 物料检验关联单据表 */
export interface IqcInspectBillVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectId?: string;
  /** 接收单号 */
  deliveryNo?: string;
  deliveryDtlId?: string;
  /** 检验单号 */
  iqcBillNo?: string;
}

/** 物料检验关联单据表 */
export interface IqcInspectDtlVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 检验标准编码 */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /**
   * 是否CTQ
   * @format int32
   */
  isCtq?: number;
  /** 不良数 */
  ngQty?: number;
  /** 不良原因 */
  ngReason?: string;
  /** 样本数 */
  sampleQty?: number;
  /** AC值 */
  acValue?: number;
  /** RE值 */
  reValue?: number;
  /** 检验结果 */
  inspectResult?: string;
}

/** 物料检验头表 */
export interface IqcInspectVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 检验单号 */
  billNo?: string;
  iqcInspectStdId?: string;
  mitemId?: string;
  supplierId?: string;
  /** 检验数量 */
  inspectQty?: number;
  /** 检验严格度 */
  inspectStringency?: string;
  /** 缺陷等级 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 供方处理意见 */
  supplyHandleMethod?: string;
  /** 责任方 */
  responsibility?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  /**
   * 是否启动品质改善
   * @format int32
   */
  isStartImprove?: number;
  /** 让步接收数量 */
  concessQty?: number;
  /** 备注 */
  memo?: string;
  /** 检验结果 */
  inspectResult?: string;
  /** 单据状态 */
  status?: string;
  /** 显示名 */
  displayName?: string;
  /** 单据状态名称 */
  statusName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 检验严格度 */
  inspectionStringency?: string;
  /** 送货单号 */
  deliveryNo?: string;
  mitemCategoryId?: string;
  /** 物料分类编码 */
  mitemCategoryCode?: string;
  /** 物料分类名称 */
  mitemCategoryName?: string;
  /** 物料检验关联单据表 */
  iqcInspectBillVOList?: IqcInspectBillVO[];
  /** 物料检验明细表 */
  iqcInspectDtlList?: IqcInspectDtlVO[];
  /**
   * 总送检批次
   * @format int32
   */
  totalCheckBatch?: number;
  /**
   * 合格批次
   * @format int32
   */
  qualifiedBatch?: number;
  /**
   * 不合格批次
   * @format int32
   */
  unQualifiedBatch?: number;
  /** 批次合格率 */
  qualificationRate?: string;
  /** 单据总不合格数量 */
  sumNgQty?: number;
  /** 本次可退数量 */
  curReturnQty?: number;
}

/** 响应数据 */
export type PagingDataIqcInspectVO = {
  list?: IqcInspectVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectVO;
}

/** 入厂检验搜索条件 */
export interface MitemReceiveBillSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  billNo?: string;
  /** @format date-time */
  beginDatetimeReceipted?: string;
  /** @format date-time */
  endDatetimeReceipted?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  iqcBillNo?: string;
  prefix?: string;
  inspectGroupId?: string;
  inspectGroupMitemCategoryId?: string[];
}

/** 交易单身表 */
export interface MitemReceiveBillVO {
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** IQC单据号 */
  iqcBillNo?: string;
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  userReceiptedId?: string;
  /** 接收人姓名 */
  userReceiptedDisplayName?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  businessCategoryId?: string;
  businessCategoryCode?: string;
  businessCategoryName?: string;
  status?: string;
  statusName?: string;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  mitemCategoryCode?: string;
  mitemCategoryName?: string;
  locationName?: string;
  toLocationName?: string;
  uomName?: string;
  /** @format int32 */
  isBatchNo?: number;
  waitTime?: string;
  /** 检验严格度 */
  inspectionStringency?: string;
  /** 检验严格度 */
  inspectionStringencyName?: string;
  iqcInspectStdId?: string;
  id?: string;
}

/** 响应数据 */
export type PagingDataMitemReceiveBillVO = {
  list?: MitemReceiveBillVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemReceiveBillVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemReceiveBillVO;
}

/** 物料检验明细表 */
export interface IqcInspectDtlFullVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  iqcInspectId?: string;
  /**
   * 项目行号
   * @format int32
   */
  itemSeq?: number;
  /** 项目分类 */
  itemCategory?: string;
  /** 项目名称或内容 */
  itemName?: string;
  /** 项目特性 */
  characteristics?: string;
  /** 基准值 */
  baseValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 技术要求 */
  technicalRequest?: string;
  /** 抽样标准类型 */
  samplingStandardType?: string;
  /** 检验标准编码 */
  samplingStandardCode?: string;
  /** 检验水平 */
  inspectLevel?: string;
  /** 检验工具 */
  inspectTool?: string;
  /** 不合格分类 */
  unqualifyCategory?: string;
  /** 检验依据 */
  inspectBasis?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 检验属性 */
  inspectProperty?: string;
  /**
   * 是否CTQ
   * @format int32
   */
  isCtq?: number;
  /** 不良数 */
  ngQty?: number;
  /** 不良描述 */
  ngReason?: string;
  /** 样本数 */
  sampleQty?: number;
  /** AC值 */
  acValue?: number;
  /** RE值 */
  reValue?: number;
  /** 检验结果 */
  inspectResult?: string;
  /** 标准编码 */
  inspectStdCode?: string;
  /** 标准名称 */
  inspectStdName?: string;
  /**
   * 生效时间
   * @format date-time
   */
  timeEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  timeInvalid?: string;
  /** 标准状态 */
  stdStatus?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 不合格分类 */
  unqualifyCategoryName?: string;
  /** 接收质量限 */
  aql?: string;
  /** 检验结果 */
  inspectResultSwitch?: boolean;
  /** 测量值 */
  measureList?: IqcInspectMeasureVO[];
  /** AC/RE */
  acRe?: string;
  /** 文件列表 */
  fileList?: AddFileTypeVO[];
  /** 检验严格度 */
  inspectionStringency?: string;
  /** 检验严格度 */
  inspectionStringencyName?: string;
  /** 计量单位符号 */
  uom?: string;
  /** 计量单位符号 */
  uomName?: string;
  /** 项目分类 */
  itemCategoryName?: string;
  iqcInspectStdDtlId?: string;
  iqcInspectDtlId?: string;
  /** 项目特性 */
  characteristicsName?: string;
  /** 是否CTQ */
  isCtqName?: string;
}

/** 响应数据 */
export type PagingDataIqcInspectDtlFullVO = {
  list?: IqcInspectDtlFullVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIqcInspectDtlFullVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIqcInspectDtlFullVO;
}

/** 通用响应类 */
export interface ResultIqcInspectVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 物料检验头表 */
  data?: IqcInspectVO;
}

export interface InspectGroupSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  keyword?: string;
  userId?: string;
  userIds?: string[];
  mitemCategoryIds?: string[];
  inspectGroupId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
}

export interface InspectGroupUserVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  /** 用户名 */
  userName?: string;
  /** 显示名 */
  displayName?: string;
  /** 密码 */
  password?: string;
  /**
   * 用户上次进行身份验证时间
   * @format date-time
   */
  timeLastActivity?: string;
  /**
   * 用户上次登录时间
   * @format date-time
   */
  timeLastLogin?: string;
  /**
   * 上次更新成员资格用户的密码的日期和时间
   * @format date-time
   */
  timeLastPasswordChanged?: string;
  /**
   * 用户当前是否联机
   * @format int32
   */
  isOnline?: number;
  /**
   * 指示成员资格用户是否因被锁定而无法进行验证
   * @format int32
   */
  isLockedOut?: number;
  /**
   * 最近一次锁定成员资格用户的日期和时间
   * @format date-time
   */
  timeLastLockedOut?: string;
  /**
   * 输入密码尝试失败的次数
   * @format int32
   */
  failedAttemptCount?: number;
  /**
   * 输入密码尝试失败的起始时间
   * @format date-time
   */
  timeFailedAttemptStart?: string;
  /**
   * 用户帐号类型
   * @format int32
   */
  accountType?: number;
  /**
   * 用户失效时间
   * @format date-time
   */
  timeExpiration?: string;
  personId?: string;
  orgId?: string;
  userId?: string;
  /** @format int32 */
  isAdd?: number;
}

/** 响应数据 */
export type PagingDataInspectGroupUserVO = {
  list?: InspectGroupUserVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectGroupUserVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectGroupUserVO;
}

/** 品质检验组用户表 */
export interface InspectGroupInUserVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  inspectGroupId?: string;
  userId?: string;
  /** 检验组用户名 */
  inspectGroupDisplayName?: string;
  /** 检验组人员工号 */
  personCode?: string;
  /** 检验组人员姓名 */
  personName?: string;
}

/** 响应数据 */
export type PagingDataInspectGroupInUserVO = {
  list?: InspectGroupInUserVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectGroupInUserVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectGroupInUserVO;
}

/** 品质检验组用户表 */
export interface InspectGroupInMitemVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  inspectGroupId?: string;
  mitemCategoryId?: string;
  /** 检验组类别编码 */
  categoryCode?: string;
  /** 检验组类别名称 */
  categoryName?: string;
}

/** 响应数据 */
export type PagingDataInspectGroupInMitemVO = {
  list?: InspectGroupInMitemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectGroupInMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectGroupInMitemVO;
}

/** 物料分类 */
export interface MitemCategory {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 物料分类代码 */
  categoryCode?: string;
  /** 物料分类名称 */
  categoryName?: string;
  /** 物料分类描述 */
  categoryDesc?: string;
  /** 小数位计算类型 */
  reqCalcRule?: string;
  /** 物料投料规则 */
  onboardRuleCode?: string;
  /**
   * 是否手工创建
   * @format int32
   */
  isManual?: number;
}

/** 响应数据 */
export type PagingDataMitemCategory = {
  list?: MitemCategory[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemCategory;
}

export interface InspectGroupVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 检验组编码 */
  inspectGroupCode?: string;
  /** 检验组名称 */
  inspectGroupName?: string;
  /** 检验组描述 */
  inspectGroupDesc?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 修改人名称 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataInspectGroupVO = {
  list?: InspectGroupVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectGroupVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectGroupVO;
}

/** 品质检验组表 */
export interface InspectGroup {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 检验组编码 */
  inspectGroupCode?: string;
  /** 检验组名称 */
  inspectGroupName?: string;
  /** 检验组描述 */
  inspectGroupDesc?: string;
}

export interface Improve8DVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  improveId?: string;
  /** D1说明 */
  d1Desc?: string;
  userD1Id?: string;
  /**
   * D1填写时间
   * @format date-time
   */
  datetimeD1?: string;
  /** D2说明 */
  d2Desc?: string;
  userD2Id?: string;
  /**
   * D2填写时间
   * @format date-time
   */
  datetimeD2?: string;
  /** D3说明 */
  d3Desc?: string;
  userD3Id?: string;
  /**
   * D3填写时间
   * @format date-time
   */
  datetimeD3?: string;
  /** D4说明 */
  d4Desc?: string;
  userD4Id?: string;
  /**
   * D4填写时间
   * @format date-time
   */
  datetimeD4?: string;
  /** D5说明 */
  d5Desc?: string;
  userD5Id?: string;
  /**
   * D5填写时间
   * @format date-time
   */
  datetimeD5?: string;
  /** D6说明 */
  d6Desc?: string;
  userD6Id?: string;
  /**
   * D6填写时间
   * @format date-time
   */
  datetimeD6?: string;
  /** D7说明 */
  d7Desc?: string;
  userD7Id?: string;
  /**
   * D7填写时间
   * @format date-time
   */
  datetimeD7?: string;
  /** D8说明 */
  d8Desc?: string;
  userD8Id?: string;
  /**
   * D8填写时间
   * @format date-time
   */
  datetimeD8?: string;
  /** 状态 */
  status?: string;
  fileListD1?: FileUpload[];
  fileListD2?: FileUpload[];
  fileListD3?: FileUpload[];
  fileListD4?: FileUpload[];
  fileListD5?: FileUpload[];
  fileListD6?: FileUpload[];
  fileListD7?: FileUpload[];
  fileListD8?: FileUpload[];
  userD1Name?: string;
  userD2Name?: string;
  userD3Name?: string;
  userD4Name?: string;
  userD5Name?: string;
  userD6Name?: string;
  userD7Name?: string;
  userD8Name?: string;
}

export interface ImprovePdcaVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  improveId?: string;
  /** 计划说明 */
  planDesc?: string;
  userPlanId?: string;
  /**
   * 计划填写时间
   * @format date-time
   */
  datetimePlan?: string;
  /** 执行说明 */
  doDesc?: string;
  userDoId?: string;
  /**
   * 执行填写时间
   * @format date-time
   */
  datetimeDo?: string;
  /** 检查说明 */
  checkDesc?: string;
  userCheckId?: string;
  /**
   * 检查填写时间
   * @format date-time
   */
  datetimeCheck?: string;
  /** 行动说明 */
  actDesc?: string;
  userActId?: string;
  /**
   * 行动填写时间
   * @format date-time
   */
  datetimeAct?: string;
  /** 状态 */
  status?: string;
  fileListP?: FileUpload[];
  fileListD?: FileUpload[];
  fileListC?: FileUpload[];
  fileListA?: FileUpload[];
  userPlanName?: string;
  userDoName?: string;
  userCheckName?: string;
  userActName?: string;
}

export interface ImproveVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 改善单号 */
  billNo?: string;
  /** 关联单号 */
  relateBillNo?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 改善工具 */
  improveTool?: string;
  supplierId?: string;
  mitemId?: string;
  workshopId?: string;
  moScheId?: string;
  /** 问题描述 */
  problemDesc?: string;
  /** 问题描述补充 */
  problemDescAdd?: string;
  /** 不合格分类 */
  defectCategory?: string;
  /** 处理意见或方法 */
  handleMethod?: string;
  /** 整改意见 */
  correctOpinion?: string;
  personResponsibilityId?: string;
  userResponsibilityId?: string;
  deptResponsibilityId?: string;
  /** 发生性质 */
  occurNature?: string;
  /**
   * 是否批量
   * @format int32
   */
  isBatch?: number;
  /**
   * 要求完成时间
   * @format date-time
   */
  datetimeRequireFinish?: string;
  /** 状态 */
  status?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 车间 */
  workshopName?: string;
  /** 工作中心 */
  workcenterName?: string;
  workcenteId?: string;
  /** 不合格分类 */
  defectCategoryName?: string;
  responsibility?: string;
  /** 排产单号 */
  scheCode?: string;
  /** 创建人 */
  creatorName?: string;
  /** 责任人 */
  userResponsibilityName?: string;
  /** 责任部门 */
  deptResponsibilityName?: string;
  /** 检验类型 */
  inspectTypeName?: string;
  /** 修改人 */
  modifierName?: string;
  /** 跟进人 */
  personResponsibilityName?: string;
  /** 状态 */
  statusName?: string;
  currentStage?: string;
  improvePdca?: ImprovePdcaVO;
  improve8d?: Improve8DVO;
  isSave?: boolean;
  fileList?: FileUpload[];
}

export interface ImproveSearch {
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  supplierId?: string;
  workshopId?: string;
  id?: string;
  mitemId?: string;
  /** 检验单号 */
  relateBillNo?: string;
  /** 整改单号 */
  billNo?: string;
  /** 状态 */
  status?: string;
  /**
   * 发起开始日期
   * @format date-time
   */
  timeCreateStart?: string;
  /**
   * 发起结束日期
   * @format date-time
   */
  timeCreateEnd?: string;
  /** 检验类型 */
  inspectType?: string;
  keyword?: string;
  rejectType?: string;
  reason?: string;
}

/** 响应数据 */
export type PagingDataImproveVO = {
  list?: ImproveVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataImproveVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataImproveVO;
}

/** 通用响应类 */
export interface ResultListImproveVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ImproveVO[] | null;
}

export interface BatchDynamicInsertDTO {
  businessDomain?: string;
  tableName?: string;
  columnList?: ImportSettingColumn[];
  rows?: Record<string, object>[];
}

/** 导入列配置表 */
export interface ImportSettingColumn {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  importId?: string;
  /**
   * 列排序
   * @format int32
   */
  seq?: number;
  /** 列来源（数据表/手动添加） */
  fromTable?: string;
  /** 导入字段 */
  columnField?: string;
  /** 导入字段描述 */
  columnDesc?: string;
  /** 列数据类型 */
  columnDatetype?: string;
  /**
   * 是否必填项
   * @format int32
   */
  isRequired?: number;
  /**
   * 是否导入列
   * @format int32
   */
  isImport?: number;
  /**
   * 是否模块列
   * @format int32
   */
  isTemplate?: number;
  /** 默认值 */
  defaultValue?: string;
  /** 数据转换配置 */
  datatransferJson?: string;
  /** 正则表达式 */
  regularExpression?: string;
}

export interface BatchDynamicQueryDTO {
  dataTable?: DataTable;
  rows?: Record<string, object>[];
  eid?: string;
  oid?: string;
}

export interface ConditionData {
  field?: string;
  operator?: string;
  valueType?: string;
  value?: string;
}

export interface DataTable {
  mapBusinessDomain?: string;
  mapTable?: string;
  conditionData?: ConditionData[];
  tableQueryField?: string;
}

/** 通用响应类 */
export interface ResultListMapStringObject {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Record<string, object | null>[];
}

export interface DynamicCheckUniqueDTO {
  mapTable?: string;
  businessDomain?: string;
  uniqueFields?: string[];
  checkRow?: Record<string, object>;
}

/** 品质控制提交模型 */
export interface QcHoldDTO {
  /** 保存类型-LOCK(冻结) & UNLOCK(解冻) */
  saveType?: 'LOCK' | 'UNLOCK';
  /** 主表信息 */
  qcHoldInfo?: QcHoldVO;
  /** 明细信息 */
  qcHoldDtls?: QcHoldDtlVO[];
  /** 明细信息唯一Key */
  keyList?: string[];
}

/** 明细信息 */
export interface QcHoldDtlVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  holdId?: string;
  moScheId?: string;
  /** 产品条码 */
  serialNumber?: string;
  workstationId?: string;
  /** 标签号 */
  labelNo?: string;
}

/** 主表信息 */
export interface QcHoldVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 单据号 */
  billNo?: string;
  /** 原因类别 */
  reasonCategory?: string;
  /**
   * 计划处理时间
   * @format date-time
   */
  datetimePlanHandle?: string;
  customerId?: string;
  personResponsibilityId?: string;
  personHandleId?: string;
  personFollowUpId?: string;
  /**
   * 锁定时间
   * @format date-time
   */
  datetimeLock?: string;
  /**
   * 解锁时间
   * @format date-time
   */
  datetimeUnlock?: string;
  /** 备注或说明 */
  memo?: string;
  /** 品质控制类别 */
  holdCategory?: string;
  /** 状态 */
  status?: string;
  workCenterId?: string;
  workCenterCode?: string;
  workCenterName?: string;
  customerCode?: string;
  customerName?: string;
  /** 创建人名称-操作人 */
  creatorName?: string;
  /** 责任人 */
  personResponsibilityName?: string;
  /** 处理人 */
  personHandleName?: string;
  /** 跟进人 */
  personFollowUpName?: string;
  reasonCategoryName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 修改人名称 */
  modifierName?: string;
  /**
   * 修改人时间
   * @format date-time
   */
  modifiedTime?: string;
  dtls?: QcHoldDtlVO[];
  /** 状态名称 */
  statusName?: string;
  /** 操作类别名称 */
  holdCategoryName?: string;
}

/** 品质控制 */
export interface QcHoldSearch {
  holdId?: string;
  /**
   * 页码
   * @format int32
   */
  pageNum?: number;
  /**
   * 页最大记录条数
   * @format int32
   */
  pageSize?: number;
  workCenterId?: string;
  reasonCategory?: string;
  /** hold开始时间 */
  datetimeLockStart?: string;
  /** hold结束 */
  datetimeLockEnd?: string;
  /** 操作人 */
  creator?: string;
  personResponsibilityId?: string;
  personHandleId?: string;
  personFollowUpId?: string;
}

/** 响应数据 */
export type PagingDataQcHoldVO = {
  list?: QcHoldVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataQcHoldVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataQcHoldVO;
}

/** 通用响应类 */
export interface ResultListQcHoldDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: QcHoldDtlVO[] | null;
}

export interface BatchDynamicUpdateDTO {
  /** 表唯一主键 */
  primaryKey?: string;
  /** 领域名称 */
  businessDomain?: string;
  /** 表名 */
  tableName?: string;
  /** 更新的字段列表 */
  columnList?: DynamicColumn[];
  /** 更新的数据信息 */
  rows?: Record<string, object>[];
}

/** 动态列字段 */
export interface DynamicColumn {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  /** 字段名称 */
  columnField?: string;
  /** 字段描述 */
  columnDesc?: string;
  /** 列数据类型 */
  columnDateType?: string;
  /**
   * 是否必填项
   * @format int32
   */
  isRequired?: number;
  /** 默认值 */
  defaultValue?: string;
}

/** 通用响应类 */
export interface ResultListSamplingStd {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: SamplingStd[] | null;
}

/** 企业抽样方案表 */
export type SamplingStd = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 标准编号 */
  sampingStdCode?: string;
  /**
   * 应用范围，1：物注，2：产品，3：物料+产品
   * @format int32
   */
  operationScope?: number;
  /**
   * 检验方法，0：按样品量抽样，1：按比例抽样
   * @format int32
   */
  operationMethod?: number;
  /** 备注 */
  memo?: string;
} | null;

/** 通用响应类 */
export interface ResultListSampleCodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: SampleCodeVO[] | null;
}

/** 样本字码表 */
export type SampleCodeVO = {
  /**
   * 批量-star
   * @format int32
   */
  batchStart?: number;
  /**
   * 批量-end
   * @format int32
   */
  batchEnd?: number;
  s4?: string;
  i?: string;
  iii?: string;
  s3?: string;
  s1?: string;
  ii?: string;
  s2?: string;
} | null;

/** 标签模板 */
export type PrintTmpl = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  tmplCode?: string;
  tmplName?: string;
  tmplDesc?: string;
  tmplBodyPath?: string;
  tmplCategory?: string;
  tmplType?: string;
} | null;

/** 通用响应类 */
export interface ResultListPrintTmpl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PrintTmpl[] | null;
}

/** 计量单位 */
export type MitemUom = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  /** 计量单位符号 */
  uom?: string;
  /** 计量单位符号 */
  uomName?: string;
} | null;

/** 通用响应类 */
export interface ResultMitemUom {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 计量单位 */
  data?: MitemUom;
}

/** 配置项值 */
export type ProfileValue = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  profileId?: string;
  /** 配置项分类 */
  profileCategory?: string;
  /** 配置项分类值 */
  profileCategoryValue?: string;
  /** 配置项值 */
  profileValue?: string;
} | null;

/** 通用响应类 */
export interface ResultListProfileValue {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ProfileValue[] | null;
}

/** 通用响应类 */
export interface ResultBigDecimal {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: number | null;
}

/** 通用响应类 */
export interface ResultListFileUpload {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: FileUpload[] | null;
}

/** 通用响应类 */
export interface ResultListInspectGroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: InspectGroup[] | null;
}

/** 通用响应类 */
export interface ResultImproveVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: ImproveVO;
}

/** 通用响应类 */
export interface ResultListDataTableVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: DataTableVO[] | null;
}

/** 数据表列对象 */
export interface DataTableColumnVO {
  /** 列名 */
  columnName?: string;
  /** 列描述 */
  columnDesc?: string;
  /** 列类型 */
  columnType?: string;
  default?: boolean;
}

/** 数据表对象 */
export type DataTableVO = {
  /** 表名 */
  tableName?: string;
  /** 表模型名称 */
  tableModelName?: string;
  /** 表描述 */
  tableDescription?: string;
  /** 列设置 */
  columns?: DataTableColumnVO[];
} | null;

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  stringencyTransferRule: {
    /**
     * No description
     *
     * @tags 严格度转移规则表
     * @name Modify
     * @summary 编辑严格度转移规则
     * @request POST:/stringencyTransferRule/modify
     * @secure
     */
    modify: (data: StringencyTransferRule) =>
      http.request<ResultObject['data']>(`/api/quality/stringencyTransferRule/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 严格度转移规则表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/stringencyTransferRule/getList
     * @secure
     */
    getList: (data: StringencyTransferRuleSearch) =>
      http.request<ResultPagingDataStringencyTransferRuleVO['data']>(`/api/quality/stringencyTransferRule/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  samplingStdDtl: {
    /**
     * No description
     *
     * @tags 企业抽样方案明细表
     * @name ImportData
     * @summary 导入
     * @request POST:/samplingStdDtl/import
     * @secure
     */
    importData: (data: CommonImportSamplingStdDtlDTO) =>
      http.request<ResultImportSummaryObject['data']>(`/api/quality/samplingStdDtl/import`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案明细表
     * @name GetList
     * @summary 根据抽样标准Id
     * @request POST:/samplingStdDtl/getlist
     * @secure
     */
    getList: (data: SamplingStdDtlSearch) =>
      http.request<ResultObject['data']>(`/api/quality/samplingStdDtl/getlist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案明细表
     * @name ChangeOrAddDtl
     * @summary 修改或新增明细
     * @request POST:/samplingStdDtl/changeOrAddDtl
     * @secure
     */
    changeOrAddDtl: (data: SamplingStdDtlDTO) =>
      http.request<Result['data']>(`/api/quality/samplingStdDtl/changeOrAddDtl`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案明细表
     * @name DeleteById
     * @summary 删除明细
     * @request DELETE:/samplingStdDtl/deleteById/{id}
     * @secure
     */
    deleteById: (id: string) =>
      http.request<Result['data']>(`/api/quality/samplingStdDtl/deleteById/${id}`, {
        method: 'DELETE',
      }),
  },
  samplingStd: {
    /**
     * No description
     *
     * @tags 企业抽样方案表
     * @name SearchSamplingStd
     * @summary 弹出框公共方法-
     * @request POST:/samplingStd/items
     * @secure
     */
    searchSamplingStd: (data: CommonSearch) =>
      http.request<ResultPagingDataSamplingStdVO['data']>(`/api/quality/samplingStd/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案表
     * @name GetList
     * @summary 获取抽样标准列表
     * @request POST:/samplingStd/getList
     * @secure
     */
    getList: (data: SamplingStdSearch) =>
      http.request<ResultPagingDataSamplingStdVO['data']>(`/api/quality/samplingStd/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案表
     * @name StateChangeBefore
     * @summary 修改状态前校验引用数量
     * @request GET:/samplingStd/stateChangeBefore/{id}
     * @secure
     */
    stateChangeBefore: (id: string) =>
      http.request<ResultLong['data']>(`/api/quality/samplingStd/stateChangeBefore/${id}`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案表
     * @name StateChange
     * @summary 修改状态
     * @request GET:/samplingStd/stateChange/{id}
     * @secure
     */
    stateChange: (id: string) =>
      http.request<ResultObject['data']>(`/api/quality/samplingStd/stateChange/${id}`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 企业抽样方案表
     * @name GetSampingStdCode
     * @summary 获取标准编码下拉数据
     * @request GET:/samplingStd/getSampingStdCode
     * @secure
     */
    getSampingStdCode: (query?: { key?: string }) =>
      http.request<ResultListSamplingStd['data']>(`/api/quality/samplingStd/getSampingStdCode`, {
        method: 'GET',
        params: query,
      }),
  },
  samplingAql: {
    /**
     * No description
     *
     * @tags 国标抽样方案表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/samplingAql/getList
     * @secure
     */
    getList: (data: SamplingAqlSearch) =>
      http.request<ResultListSamplingAqlVO['data']>(`/api/quality/samplingAql/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 国标抽样方案表
     * @name GetAqlList
     * @summary 下拉框数据-AQL
     * @request POST:/samplingAql/getAqlList
     * @secure
     */
    getAqlList: (data: SamplingAqlSearch) =>
      http.request<ResultListBigDecimal['data']>(`/api/quality/samplingAql/getAqlList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  pqcInspectPatrolDtlFile: {
    /**
     * No description
     *
     * @tags 巡检检验明细附件表
     * @name DeleteFile
     * @summary 删除图片
     * @request POST:/pqcInspectPatrolDtlFile/deleteFile
     * @secure
     */
    deleteFile: (data: PqcInspectPatrolDtlFileVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectPatrolDtlFile/deleteFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验明细附件表
     * @name AddFile
     * @summary 添加图片
     * @request POST:/pqcInspectPatrolDtlFile/addFile
     * @secure
     */
    addFile: (data: PqcInspectPatrolDtlFileVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectPatrolDtlFile/addFile`, {
        method: 'POST',
        body: data as any,
      }),
  },
  pqcInspectPatrol: {
    /**
     * No description
     *
     * @tags 巡检检验表
     * @name SubmitPqcInspectPatrol
     * @summary 新增巡回检验
     * @request POST:/pqcInspectPatrol/submitPqcInspectPatrol
     * @secure
     */
    submitPqcInspectPatrol: (data: PqcInspectPatrolVO) =>
      http.request<ResultString['data']>(`/api/quality/pqcInspectPatrol/submitPqcInspectPatrol`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name SubmitPqcInspectPatrolDtl
     * @summary 巡检开始检验
     * @request POST:/pqcInspectPatrol/submitPqcInspectPatrolDtl
     * @secure
     */
    submitPqcInspectPatrolDtl: (data: PqcInspectPatrolFullVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectPatrol/submitPqcInspectPatrolDtl`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name Print
     * @summary 打印产品条码
     * @request POST:/pqcInspectPatrol/print
     * @secure
     */
    print: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/pqcInspectPatrol/print`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetTabs
     * @summary 获得检验项目的分组Tab
     * @request POST:/pqcInspectPatrol/getTabs
     * @secure
     */
    getTabs: (data: PqcInspectPatrolSearch) =>
      http.request<ResultListPqcInspectPatrolVO['data']>(`/api/quality/pqcInspectPatrol/getTabs`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetPqcInspectPatrolInfo
     * @summary 根据单号获取明细和附件信息
     * @request POST:/pqcInspectPatrol/getPqcInspectPatrolInfo
     * @secure
     */
    getPqcInspectPatrolInfo: (data: PqcInspectPatrolSearch) =>
      http.request<ResultPqcInspectPatrolFullVO['data']>(`/api/quality/pqcInspectPatrol/getPqcInspectPatrolInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetPqcInspectPatrolFullBillList
     * @summary 待检验列表
     * @request POST:/pqcInspectPatrol/getPqcInspectPatrolFullBillList
     * @secure
     */
    getPqcInspectPatrolFullBillList: (data: PqcInspectPatrolBillSearch) =>
      http.request<ResultPagingDataPqcInspectPatrolBillFullVO['data']>(
        `/api/quality/pqcInspectPatrol/getPqcInspectPatrolFullBillList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetPatrolItems
     * @summary 获得检验项目
     * @request POST:/pqcInspectPatrol/getPatrolItems
     * @secure
     */
    getPatrolItems: (data: PqcInspectPatrolSearch) =>
      http.request<ResultPagingDataPqcInspectPatrolVO['data']>(`/api/quality/pqcInspectPatrol/getPatrolItems`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetOqcInspectStdByItemCategory
     * @summary 根据物料ID和物料分类，获取标准集合，并根据标准分类返回
     * @request POST:/pqcInspectPatrol/getOqcInspectStdByItemCategory
     * @secure
     */
    getOqcInspectStdByItemCategory: (data: OqcInspectStdFullSearch) =>
      http.request<ResultListOqcInspectStdItemCategoryVO['data']>(
        `/api/quality/pqcInspectPatrol/getOqcInspectStdByItemCategory`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetList
     * @summary 获得主界面列表数据
     * @request POST:/pqcInspectPatrol/getList
     * @secure
     */
    getList: (data: PqcInspectPatrolSearch) =>
      http.request<ResultPagingDataPqcInspectPatrolVO['data']>(`/api/quality/pqcInspectPatrol/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name Cancelled
     * @summary 单据取消
     * @request POST:/pqcInspectPatrol/cancelled
     * @secure
     */
    cancelled: (data: PqcInspectPatrolSearch) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectPatrol/cancelled`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 巡检检验表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/pqcInspectPatrol/getPrintTmplList
     * @secure
     */
    getPrintTmplList: (query: { moScheId: string }) =>
      http.request<ResultListPrintTmpl['data']>(`/api/quality/pqcInspectPatrol/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),
  },
  pqcInspectFirst: {
    /**
     * No description
     *
     * @tags 首检检验表
     * @name SubmitStartInspect
     * @summary 开始检索-提交后返回单号
     * @request POST:/pqcInspectFirst/submitStartInspect
     * @secure
     */
    submitStartInspect: (data: PqcInspectBillDTO) =>
      http.request<ResultString['data']>(`/api/quality/pqcInspectFirst/submitStartInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name SubmitInspect
     * @summary 暂存与提交
     * @request POST:/pqcInspectFirst/submitInspect
     * @secure
     */
    submitInspect: (data: PqcInspectBillDTO) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectFirst/submitInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name ScanPqcYjProductBarcode
     * @summary 检验执行-扫描产品条码
     * @request POST:/pqcInspectFirst/scanPqcYJProductBarcode
     * @secure
     */
    scanPqcYjProductBarcode: (data: PqcInspectBillDTO) =>
      http.request<ResultPqcBarcodeVO['data']>(`/api/quality/pqcInspectFirst/scanPqcYJProductBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name Print
     * @summary 打印产品条码
     * @request POST:/pqcInspectFirst/print
     * @secure
     */
    print: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/pqcInspectFirst/print`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name Search
     * @summary 获取产品检验单据（筛选用）-公共组件 - 仅显示状态为已完成
     * @request POST:/pqcInspectFirst/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataPqcInspectFirstBillFullVO['data']>(`/api/quality/pqcInspectFirst/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetTabs
     * @summary 获得检验项目的分组Tab
     * @request POST:/pqcInspectFirst/getTabs
     * @secure
     */
    getTabs: (data: PqcInspectFirstSearch) =>
      http.request<ResultListPqcInspectFirstVO['data']>(`/api/quality/pqcInspectFirst/getTabs`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetPqcInspectFullBillNo
     * @summary 主界面-根据单号查询
     * @request POST:/pqcInspectFirst/getPqcInspectFullBillNo
     * @secure
     */
    getPqcInspectFullBillNo: (data: PqcInspectBillSearch) =>
      http.request<ResultPqcInspectFirstBillFullVO['data']>(`/api/quality/pqcInspectFirst/getPqcInspectFullBillNo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetPqcInspectFullBillList
     * @summary 主界面-查询集合
     * @request POST:/pqcInspectFirst/getPqcInspectFullBillList
     * @secure
     */
    getPqcInspectFullBillList: (data: PqcInspectBillSearch) =>
      http.request<ResultPagingDataPqcInspectFirstBillFullVO['data']>(
        `/api/quality/pqcInspectFirst/getPqcInspectFullBillList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetList
     * @summary 获得主界面列表数据
     * @request POST:/pqcInspectFirst/getList
     * @secure
     */
    getList: (data: PqcInspectFirstSearch) =>
      http.request<ResultPagingDataPqcInspectFirstVO['data']>(`/api/quality/pqcInspectFirst/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetDefaultStdList
     * @summary 获取开始检索设置的检验项目
     * @request POST:/pqcInspectFirst/getDefaultStdList
     * @secure
     */
    getDefaultStdList: (data: PqcInspectStdFullSearch) =>
      http.request<ResultListPqcInspectFirstStdFullVO['data']>(`/api/quality/pqcInspectFirst/getDefaultStdList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetBarcodes
     * @summary 获得明细的条码数据
     * @request POST:/pqcInspectFirst/getBarcodes
     * @secure
     */
    getBarcodes: (data: string) =>
      http.request<ResultListPqcInspectFirstVO['data']>(`/api/quality/pqcInspectFirst/getBarcodes`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetBarcodeTableList
     * @summary 获取条码列表和条码对应的明细信息
     * @request POST:/pqcInspectFirst/getBarcodeTableList
     * @secure
     */
    getBarcodeTableList: (data: PqcInspectStdFullSearch) =>
      http.request<ResultListPqcBarcodeVO['data']>(`/api/quality/pqcInspectFirst/getBarcodeTableList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetBarcodeItems
     * @summary 获得检验项目
     * @request POST:/pqcInspectFirst/getBarcodeItems
     * @secure
     */
    getBarcodeItems: (data: PqcInspectFirstSearch) =>
      http.request<ResultPagingDataPqcInspectFirstVO['data']>(`/api/quality/pqcInspectFirst/getBarcodeItems`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name DeleteFile
     * @summary 删除文件
     * @request POST:/pqcInspectFirst/deleteFile
     * @secure
     */
    deleteFile: (data: PqcInspectFirstBarcodeDtlFile) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectFirst/deleteFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name DeleteBatchFiles
     * @summary 批量删除文件
     * @request POST:/pqcInspectFirst/deleteBatchFile
     * @secure
     */
    deleteBatchFiles: (data: PqcInspectFirstBarcodeDtlFile[]) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectFirst/deleteBatchFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name CheckJyPreSubmit
     * @summary 检验执行-保存前的校验
     * @request POST:/pqcInspectFirst/checkJYPreSubmit
     * @secure
     */
    checkJyPreSubmit: (data: PqcInspectBillDTO) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectFirst/checkJYPreSubmit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name Cancelled
     * @summary 主界面-作废
     * @request POST:/pqcInspectFirst/cancelled
     * @secure
     */
    cancelled: (data: PqcInspectBillDTO) =>
      http.request<ResultObject['data']>(`/api/quality/pqcInspectFirst/cancelled`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name AddFile
     * @summary 新增文件
     * @request POST:/pqcInspectFirst/addFile
     * @secure
     */
    addFile: (data: PqcInspectFirstBarcodeDtlFile) =>
      http.request<ResultBoolean['data']>(`/api/quality/pqcInspectFirst/addFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 首检检验表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/pqcInspectFirst/getPrintTmplList
     * @secure
     */
    getPrintTmplList: (query: { moScheId: string }) =>
      http.request<ResultListPrintTmpl['data']>(`/api/quality/pqcInspectFirst/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),
  },
  oqcInspectStdMitem: {
    /**
     * No description
     *
     * @tags 产品检验标准分配表
     * @name GetOqcInspectStdMitemList
     * @summary 产品检验标准分配页面列表
     * @request POST:/oqcInspectStdMitem/getOqcInspectStdMitemList
     * @secure
     */
    getOqcInspectStdMitemList: (data: OqcInspectStdMitemSearch) =>
      http.request<ResultPagingDataOqcInspectStdMitemVO['data']>(
        `/api/quality/oqcInspectStdMitem/getOqcInspectStdMitemList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 产品检验标准分配表
     * @name DelByIds
     * @summary 批量删除
     * @request POST:/oqcInspectStdMitem/delByIds
     * @secure
     */
    delByIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStdMitem/delByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准分配表
     * @name AssignOqcInspectStdMitem
     * @summary 产品检验标准分配
     * @request POST:/oqcInspectStdMitem/assignOqcInspectStdMitem
     * @secure
     */
    assignOqcInspectStdMitem: (data: OqcInspectStdMitemAssign) =>
      http.request<Result['data']>(`/api/quality/oqcInspectStdMitem/assignOqcInspectStdMitem`, {
        method: 'POST',
        body: data as any,
      }),
  },
  oqcInspectStdDtl: {
    /**
     * No description
     *
     * @tags 产品检验标准明细表
     * @name GetAllDtlByStdId
     * @summary 根据标准id获取明细数据
     * @request POST:/oqcInspectStdDtl/getAllDtlByStdId
     * @secure
     */
    getAllDtlByStdId: (data: OqcInspectStdSearch) =>
      http.request<ResultPagingDataOqcInspectStdDtlDTO['data']>(`/api/quality/oqcInspectStdDtl/getAllDtlByStdId`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准明细表
     * @name GetUom
     * @summary 获取单位信息
     * @request GET:/oqcInspectStdDtl/getUom
     * @secure
     */
    getUom: (query: { uom: string }) =>
      http.request<ResultMitemUom['data']>(`/api/quality/oqcInspectStdDtl/getUom`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准明细表
     * @name GetProfileGbDropList
     * @summary 获取当前配置项设置的国标方案
     * @request GET:/oqcInspectStdDtl/getProfileGBDropList
     * @secure
     */
    getProfileGbDropList: (query?: { key?: string }) =>
      http.request<ResultListProfileValue['data']>(`/api/quality/oqcInspectStdDtl/getProfileGBDropList`, {
        method: 'GET',
        params: query,
      }),
  },
  oqcInspectStd: {
    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name Search
     * @summary 检验标准业务组件接口
     * @request POST:/oqcInspectStd/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataOqcInspectStd['data']>(`/api/quality/oqcInspectStd/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name ImportData
     * @summary 导入
     * @request POST:/oqcInspectStd/import
     * @secure
     */
    importData: (data: CommonImportOqcInspectStdFullImport) =>
      http.request<ResultImportSummaryObject['data']>(`/api/quality/oqcInspectStd/import`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name GetOqcInspectList
     * @summary 产品检验标准头表数据
     * @request POST:/oqcInspectStd/getOqcInspectList
     * @secure
     */
    getOqcInspectList: (data: OqcInspectStdSearch) =>
      http.request<ResultPagingDataOqcInspectStdVO['data']>(`/api/quality/oqcInspectStd/getOqcInspectList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name DelById
     * @summary 删除产品检验标准
     * @request POST:/oqcInspectStd/delById
     * @secure
     */
    delById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStd/delById`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name ChangeStd
     * @summary 更改产品检验标准
     * @request POST:/oqcInspectStd/changeStd
     * @secure
     */
    changeStd: (data: OqcInspectStdFullDTO) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStd/changeStd`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name ChangStatus
     * @summary 修改状态
     * @request POST:/oqcInspectStd/changStatus
     * @secure
     */
    changStatus: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStd/changStatus`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name AddOqcInspectStd
     * @summary 新增产品检验标准
     * @request POST:/oqcInspectStd/addOqcInspectStd
     * @secure
     */
    addOqcInspectStd: (data: OqcInspectStdFullDTO) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStd/addOqcInspectStd`, {
        method: 'POST',
        body: data as any,
      }),
  },
  oqcInspect: {
    /**
     * No description
     *
     * @tags 产品检验
     * @name SubmitJyQqcInspect
     * @summary 检验执行-暂存与提交
     * @request POST:/oqcInspect/submitJyQqcInspect
     * @secure
     */
    submitJyQqcInspect: (data: OqcInspectBillDTO) =>
      http.request<ResultBoolean['data']>(`/api/quality/oqcInspect/submitJyQqcInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name SubmitBjQqcInspect
     * @summary 报检-新增产品检验单据-暂存与提交
     * @request POST:/oqcInspect/submitBjQqcInspect
     * @secure
     */
    submitBjQqcInspect: (data: OqcInspectBillDTO) =>
      http.request<ResultBoolean['data']>(`/api/quality/oqcInspect/submitBjQqcInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name ScanYjProductBarcode
     * @summary 检验执行-仅扫描产品条码
     * @request POST:/oqcInspect/scanYJProductBarcode
     * @secure
     */
    scanYjProductBarcode: (data: OqcInspectBillDTO) =>
      http.request<ResultBarcodeVO['data']>(`/api/quality/oqcInspect/scanYJProductBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name ScanProductBarcode
     * @summary 报检-扫描产品条码或包装条码
     * @request POST:/oqcInspect/scanProductBarcode
     * @secure
     */
    scanProductBarcode: (data: OqcInspectBillDTO) =>
      http.request<ResultListBarcodeVO['data']>(`/api/quality/oqcInspect/scanProductBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name Search
     * @summary 获取产品检验单据（筛选用）-公共组件 - 仅显示状态为已完成
     * @request POST:/oqcInspect/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataOqcInspectBillFullVO['data']>(`/api/quality/oqcInspect/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetStdDtlListByMitem
     * @summary 根据物料或者物料分类获取产品检验项目
     * @request POST:/oqcInspect/getStdDtlListByMitem
     * @secure
     */
    getStdDtlListByMitem: (data: OqcInspectStdFullSearch) =>
      http.request<ResultListOqcInspectStdFullVO['data']>(`/api/quality/oqcInspect/getStdDtlListByMitem`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetOqcInspectDtlFullBillList
     * @summary 主界面-查询
     * @request POST:/oqcInspect/getOqcInspectDtlFullBillList
     * @secure
     */
    getOqcInspectDtlFullBillList: (data: OqcInspectBillSearch) =>
      http.request<ResultPagingDataOqcInspectBillFullVO['data']>(
        `/api/quality/oqcInspect/getOqcInspectDtlFullBillList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetBarcodeTableList
     * @summary 获取条码列表
     * @request POST:/oqcInspect/getBarcodeTableList
     * @secure
     */
    getBarcodeTableList: (data: OqcInspectStdFullSearch) =>
      http.request<ResultListBarcodeVO['data']>(`/api/quality/oqcInspect/getBarcodeTableList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name DeleteYjProductBarcode
     * @summary 检验执行-删除产品条码
     * @request POST:/oqcInspect/deleteYJProductBarcode
     * @secure
     */
    deleteYjProductBarcode: (data: OqcInspectBillDTO) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspect/deleteYJProductBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name DeleteList
     * @summary 主界面-删除
     * @request POST:/oqcInspect/deleteList
     * @secure
     */
    deleteList: (data: OqcInspectDTO) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspect/deleteList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name DeleteFile
     * @summary 删除文件
     * @request POST:/oqcInspect/deleteFile
     * @secure
     */
    deleteFile: (data: OqcInspectItemFile) =>
      http.request<ResultBoolean['data']>(`/api/quality/oqcInspect/deleteFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name DeleteBatchFiles
     * @summary 批量删除文件
     * @request POST:/oqcInspect/deleteBatchFile
     * @secure
     */
    deleteBatchFiles: (data: OqcInspectItemFile[]) =>
      http.request<ResultBoolean['data']>(`/api/quality/oqcInspect/deleteBatchFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name CheckJyPreSubmit
     * @summary 检验执行-提交前的校验
     * @request POST:/oqcInspect/checkJyPreSubmit
     * @secure
     */
    checkJyPreSubmit: (data: OqcInspectBillDTO) =>
      http.request<ResultBoolean['data']>(`/api/quality/oqcInspect/checkJyPreSubmit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name AddFile
     * @summary 新增文件
     * @request POST:/oqcInspect/addFile
     * @secure
     */
    addFile: (data: OqcInspectItemFile) =>
      http.request<ResultBoolean['data']>(`/api/quality/oqcInspect/addFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetOqcInspectItemFileList
     * @summary 根据ID获取文件信息
     * @request POST:/oqcInspect/GetOqcInspectItemFileList
     * @secure
     */
    getOqcInspectItemFileList: (data: string) =>
      http.request<ResultListAddFileTypeVO['data']>(`/api/quality/oqcInspect/GetOqcInspectItemFileList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetProductSampleQtyByNational
     * @summary 国标-获取产品检验的样本数
     * @request GET:/oqcInspect/getProductSampleQtyByNational
     * @secure
     */
    getProductSampleQtyByNational: (query: {
      inspectQty: string;
      inspectLevel: string;
      inspectionStringency: string;
      sampingStdCode: string;
    }) =>
      http.request<ResultBigDecimal['data']>(`/api/quality/oqcInspect/getProductSampleQtyByNational`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetProductSampleQtyByEnterprise
     * @summary 企标-获取产品检验的样本数
     * @request GET:/oqcInspect/getProductInspectQtyByEnterprise
     * @secure
     */
    getProductSampleQtyByEnterprise: (query: { inspectQty: string; samplingStandardId: string }) =>
      http.request<ResultBigDecimal['data']>(`/api/quality/oqcInspect/getProductInspectQtyByEnterprise`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品检验
     * @name GetDefectNames
     * @summary 获取缺陷信息
     * @request GET:/oqcInspect/getDefectNames
     * @secure
     */
    getDefectNames: (query: { oqcInspectId: string }) =>
      http.request<ResultString['data']>(`/api/quality/oqcInspect/getDefectNames`, {
        method: 'GET',
        params: query,
      }),
  },
  jobCommon: {
    /**
     * No description
     *
     * @tags 公用JOB业务组件接口
     * @name ProductionlReinspectionListJob
     * @summary 产品复检单生成JOB
     * @request POST:/jobCommon/productionlReinspectionListJob
     * @secure
     */
    productionlReinspectionListJob: (data: JobCommonDTO) =>
      http.request<ResultObject['data']>(`/api/quality/jobCommon/productionlReinspectionListJob`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 公用JOB业务组件接口
     * @name MaterialReinspectionListJob
     * @summary 物料复检单生成JOB
     * @request POST:/jobCommon/materialRinspectionListJob
     * @secure
     */
    materialReinspectionListJob: (data: JobCommonDTO) =>
      http.request<ResultString['data']>(`/api/quality/jobCommon/materialRinspectionListJob`, {
        method: 'POST',
        body: data as any,
      }),
  },
  iqcInspectStdMitem: {
    /**
     * No description
     *
     * @tags 物料检验标准分配表
     * @name RemoveBatch
     * @summary 删除标准物料关系
     * @request POST:/iqcInspectStdMitem/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStdMitem/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准分配表
     * @name Modify
     * @summary 编辑标准物料关系
     * @request POST:/iqcInspectStdMitem/modify
     * @secure
     */
    modify: (data: IqcInspectStdMitem) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStdMitem/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准分配表
     * @name GetList
     * @summary 查询标准物料关系
     * @request POST:/iqcInspectStdMitem/getList
     * @secure
     */
    getList: (data: IqcInspectStdMitemSearch) =>
      http.request<ResultPagingDataIqcInspectStdMitemVO['data']>(`/api/quality/iqcInspectStdMitem/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准分配表
     * @name Add
     * @summary 新增标准物料关系
     * @request POST:/iqcInspectStdMitem/add
     * @secure
     */
    add: (data: IqcInspectStdMitemSearch) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStdMitem/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  iqcInspectStdDtl: {
    /**
     * No description
     *
     * @tags 物料检验标准明细表
     * @name UpdateDtlById
     * @summary 更新明细
     * @request POST:/iqcInspectStdDtl/updateDtlById
     * @secure
     */
    updateDtlById: (data: IqcInspectStdDtlVO) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStdDtl/updateDtlById`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准明细表
     * @name RemoveBatch
     * @summary 删除标准明细
     * @request POST:/iqcInspectStdDtl/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStdDtl/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准明细表
     * @name GetStdDtlListByMitem
     * @summary 根据物料或者物料分类获取物料检验项目
     * @request POST:/iqcInspectStdDtl/getStdDtlListByMitem
     * @secure
     */
    getStdDtlListByMitem: (data: IqcInspectStdFullSearch) =>
      http.request<ResultListIqcInspectStdFullVO['data']>(`/api/quality/iqcInspectStdDtl/getStdDtlListByMitem`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准明细表
     * @name GetInspectStdDtlList
     * @summary 查询检验标准明细
     * @request POST:/iqcInspectStdDtl/getInspectStdDtlList
     * @secure
     */
    getInspectStdDtlList: (data: IqcInspectStdDtlSearch) =>
      http.request<ResultPagingDataIqcInspectStdDtlVO['data']>(`/api/quality/iqcInspectStdDtl/getInspectStdDtlList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准明细表
     * @name AddDtl
     * @summary 新增明细
     * @request POST:/iqcInspectStdDtl/addDtl
     * @secure
     */
    addDtl: (data: IqcInspectStdDtlVO) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStdDtl/addDtl`, {
        method: 'POST',
        body: data as any,
      }),
  },
  iqcInspectStd: {
    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name UploadFile
     * @summary 上传附件接口
     * @request POST:/iqcInspectStd/uploadFile
     * @secure
     */
    uploadFile: (data: IqcInspectStdVO) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStd/uploadFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name RemoveBatch
     * @summary 删除操作
     * @request POST:/iqcInspectStd/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStd/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name ModifyAndTemporaryStorage
     * @summary 编辑提交及暂存
     * @request POST:/iqcInspectStd/modifyAndTemporaryStorage
     * @secure
     */
    modifyAndTemporaryStorage: (data: IqcInspectStdVO) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStd/modifyAndTemporaryStorage`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name LoseEffectiveness
     * @summary 失效操作
     * @request POST:/iqcInspectStd/loseEffectiveness
     * @secure
     */
    loseEffectiveness: (data: string) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStd/loseEffectiveness`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name Search
     * @summary 物料检验标准业务组件接口
     * @request POST:/iqcInspectStd/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataIqcInspectStd['data']>(`/api/quality/iqcInspectStd/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name GetStdDtlAttachList
     * @summary 获取标准项的附件
     * @request POST:/iqcInspectStd/getStdDtlAttachList
     * @secure
     */
    getStdDtlAttachList: (data: IqcInspectStdDtlVO) =>
      http.request<ResultListIqcInspectStdDtlFileVO['data']>(`/api/quality/iqcInspectStd/getStdDtlAttachList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name GetStdAttachList
     * @summary 获取主表的附件
     * @request POST:/iqcInspectStd/getStdAttachList
     * @secure
     */
    getStdAttachList: (data: IqcInspectStdVO) =>
      http.request<ResultListIqcInspectStdFileVO['data']>(`/api/quality/iqcInspectStd/getStdAttachList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name GetList
     * @summary 查询检验标准主界面数据
     * @request POST:/iqcInspectStd/getList
     * @secure
     */
    getList: (data: IqcInspectStdSearch) =>
      http.request<ResultPagingDataIqcInspectStdVO['data']>(`/api/quality/iqcInspectStd/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name CountInspect
     * @summary 查询使用了该标准的单据数
     * @request POST:/iqcInspectStd/countInspect
     * @secure
     */
    countInspect: (data: string) =>
      http.request<ResultLong['data']>(`/api/quality/iqcInspectStd/countInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name Copy
     * @summary 复制操作
     * @request POST:/iqcInspectStd/copy
     * @secure
     */
    copy: (data: IqcInspectStdVO) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStd/copy`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name AddAndTemporaryStorage
     * @summary 新增提交及暂存
     * @request POST:/iqcInspectStd/addAndTemporaryStorage
     * @secure
     */
    addAndTemporaryStorage: (data: IqcInspectStdVO) =>
      http.request<ResultLong['data']>(`/api/quality/iqcInspectStd/addAndTemporaryStorage`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验标准头表
     * @name GetStdFile
     * @summary 获取标准的附件
     * @request GET:/iqcInspectStd/getStdFile
     * @secure
     */
    getStdFile: (query: { inspectionId: string }) =>
      http.request<ResultListFileUpload['data']>(`/api/quality/iqcInspectStd/getStdFile`, {
        method: 'GET',
        params: query,
      }),
  },
  iqcInspectRecheckDtlFile: {
    /**
     * No description
     *
     * @tags 物料复检明细附件表
     * @name DeleteIqcInspectRecheckDtlFile
     * @summary 删除文件
     * @request POST:/iqcInspectRecheckDtlFile/deleteIqcInspectRecheckDtlFile
     * @secure
     */
    deleteIqcInspectRecheckDtlFile: (data: IqcInspectRecheckDtlFileVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectRecheckDtlFile/deleteIqcInspectRecheckDtlFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料复检明细附件表
     * @name DeleteBatchIqcInspectRecheckDtlFile
     * @summary 批量删除文件
     * @request POST:/iqcInspectRecheckDtlFile/deleteBatchIqcInspectRecheckDtlFile
     * @secure
     */
    deleteBatchIqcInspectRecheckDtlFile: (data: IqcInspectRecheckDtlFileVO[]) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectRecheckDtlFile/deleteBatchIqcInspectRecheckDtlFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料复检明细附件表
     * @name AddIqcInspectRecheckDtlFile
     * @summary 新增文件
     * @request POST:/iqcInspectRecheckDtlFile/addIqcInspectRecheckDtlFile
     * @secure
     */
    addIqcInspectRecheckDtlFile: (data: IqcInspectRecheckDtlFileVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectRecheckDtlFile/addIqcInspectRecheckDtlFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料复检明细附件表
     * @name GetIqcInspectRecheckDtlFileList
     * @summary 根据ID获取文件信息
     * @request POST:/iqcInspectRecheckDtlFile/GetIqcInspectRecheckDtlFileList
     * @secure
     */
    getIqcInspectRecheckDtlFileList: (data: IqcInspectDtlFileSearch) =>
      http.request<ResultListAddFileTypeVO['data']>(
        `/api/quality/iqcInspectRecheckDtlFile/GetIqcInspectRecheckDtlFileList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),
  },
  iqcInspectRecheck: {
    /**
     * No description
     *
     * @tags 物料复检头表
     * @name SubmitIqcInspectRecheck
     * @summary 新增复检单据
     * @request POST:/iqcInspectRecheck/submitIqcInspectRecheck
     * @secure
     */
    submitIqcInspectRecheck: (data: IqcInspectRecheckSubmitVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectRecheck/submitIqcInspectRecheck`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料复检头表
     * @name Search
     * @summary 获取复检单信息（通用控件使用）
     * @request POST:/iqcInspectRecheck/items
     * @secure
     */
    search: (data: IqcInspectRecheckSearch) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectRecheck/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料复检头表
     * @name GetIqcRecheckDtlInfoByBillVo
     * @summary 根据单号查询现有IQC复检单据
     * @request POST:/iqcInspectRecheck/getIqcRecheckDtlInfoByBillVO
     * @secure
     */
    getIqcRecheckDtlInfoByBillVo: (data: IqcInspectRecheckSearch) =>
      http.request<ResultPagingDataIqcInspectRecheckDtlFullVO['data']>(
        `/api/quality/iqcInspectRecheck/getIqcRecheckDtlInfoByBillVO`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 物料复检头表
     * @name GetIqcInspectBillVoByRecheck
     * @summary 获取仓库IQC检验单数据
     * @request POST:/iqcInspectRecheck/getIqcInspectBillVOByRecheck
     * @secure
     */
    getIqcInspectBillVoByRecheck: (data: MitemInspectionBillSearch) =>
      http.request<ResultPagingDataMitemInspectionBillVO['data']>(
        `/api/quality/iqcInspectRecheck/getIqcInspectBillVOByRecheck`,
        {
          method: 'POST',
          body: data as any,
        },
      ),
  },
  iqcInspectDtlFile: {
    /**
     * No description
     *
     * @tags 物料检验明细附件表
     * @name DeleteIqcInspectDtlFile
     * @summary 删除文件
     * @request POST:/iqcInspectDtlFile/deleteIqcInspectDtlFile
     * @secure
     */
    deleteIqcInspectDtlFile: (data: IqcInspectDtlFileVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectDtlFile/deleteIqcInspectDtlFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验明细附件表
     * @name DeleteBatchIqcInspectDtlFile
     * @summary 批量删除文件
     * @request POST:/iqcInspectDtlFile/deleteBatchIqcInspectDtlFile
     * @secure
     */
    deleteBatchIqcInspectDtlFile: (data: IqcInspectDtlFileVO[]) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectDtlFile/deleteBatchIqcInspectDtlFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验明细附件表
     * @name AddIqcInspectDtlFile
     * @summary 新增文件
     * @request POST:/iqcInspectDtlFile/addIqcInspectDtlFile
     * @secure
     */
    addIqcInspectDtlFile: (data: IqcInspectDtlFileVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspectDtlFile/addIqcInspectDtlFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验明细附件表
     * @name GetIqcInspectDtlFileList
     * @summary 根据ID获取文件信息
     * @request POST:/iqcInspectDtlFile/GetIqcInspectDtlFileList
     * @secure
     */
    getIqcInspectDtlFileList: (data: string) =>
      http.request<ResultListAddFileTypeVO['data']>(`/api/quality/iqcInspectDtlFile/GetIqcInspectDtlFileList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  iqcInspectBill: {
    /**
     * No description
     *
     * @tags 物料检验关联单据表
     * @name GetMitemQualityInfo
     * @request POST:/iqcInspectBill/getMitemQualityInfo
     * @secure
     */
    getMitemQualityInfo: (data: MitemForwardTraceSearch) =>
      http.request<ResultPagingDataMFTSubVO['data']>(`/api/quality/iqcInspectBill/getMitemQualityInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验关联单据表
     * @name GetIqcInspectDtlFullBillList
     * @request POST:/iqcInspectBill/getIqcInspectDtlFullBillList
     * @secure
     */
    getIqcInspectDtlFullBillList: (data: IqcInspectBillSearch) =>
      http.request<ResultPagingDataIqcInspectBillFullVO['data']>(
        `/api/quality/iqcInspectBill/getIqcInspectDtlFullBillList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),
  },
  iqcInspect: {
    /**
     * No description
     *
     * @tags 物料检验头表
     * @name SubmitIqcInspect
     * @summary 新增入厂检验单据
     * @request POST:/iqcInspect/submitIqcInspect
     * @secure
     */
    submitIqcInspect: (data: IqcInspectSubmitVO) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspect/submitIqcInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name Search
     * @summary 获取检验单信息（通用控件使用）
     * @request POST:/iqcInspect/items
     * @secure
     */
    search: (data: IqcInspectSearch) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspect/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name GetSupplierQualified
     * @summary 获取供应商合格率报表
     * @request POST:/iqcInspect/getSupplierQualified
     * @secure
     */
    getSupplierQualified: (data: IqcInspectSearch) =>
      http.request<ResultPagingDataIqcInspectVO['data']>(`/api/quality/iqcInspect/getSupplierQualified`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name GetMitemReceiveByUnInspect
     * @summary 获取仓库接收单数据
     * @request POST:/iqcInspect/getMitemReceiveByUnInspect
     * @secure
     */
    getMitemReceiveByUnInspect: (data: MitemReceiveBillSearch) =>
      http.request<ResultPagingDataMitemReceiveBillVO['data']>(`/api/quality/iqcInspect/getMitemReceiveByUnInspect`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/iqcInspect/getList
     * @secure
     */
    getList: (data: IqcInspectSearch) =>
      http.request<ResultPagingDataIqcInspectVO['data']>(`/api/quality/iqcInspect/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name GetIqcDtlInfoByBillVo
     * @summary 根据IQC单号获取明细
     * @request POST:/iqcInspect/getIqcDtlInfoByBillVO
     * @secure
     */
    getIqcDtlInfoByBillVo: (data: IqcInspectSearch) =>
      http.request<ResultPagingDataIqcInspectDtlFullVO['data']>(`/api/quality/iqcInspect/getIqcDtlInfoByBillVO`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name GetIqcBillInfo
     * @summary 根据IQC单号获取信息
     * @request POST:/iqcInspect/getIqcBillInfo
     * @secure
     */
    getIqcBillInfo: (data: IqcInspectSearch) =>
      http.request<ResultIqcInspectVO['data']>(`/api/quality/iqcInspect/getIqcBillInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name CreatedIqcInspectByMitemReceipt
     * @summary 根据来料接收生成检验单（跨库调用）
     * @request POST:/iqcInspect/CreatedIqcInspectByMitemReceipt
     * @secure
     */
    createdIqcInspectByMitemReceipt: (data: IqcInspectStdFullSearch) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspect/CreatedIqcInspectByMitemReceipt`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料检验头表
     * @name CreatedIqcInspectAndStockIn
     * @summary 一键判退或者一键合格，同时生成检验单和入库单
     * @request POST:/iqcInspect/CreatedIqcInspectAndStockIn
     * @secure
     */
    createdIqcInspectAndStockIn: (data: IqcInspectStdFullSearch) =>
      http.request<ResultBoolean['data']>(`/api/quality/iqcInspect/CreatedIqcInspectAndStockIn`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectGroupInUser: {
    /**
     * No description
     *
     * @tags 品质检验组用户表
     * @name GetPersonList
     * @summary 品质检验新增获取人员列表
     * @request POST:/inspectGroupInUser/getPersonList
     * @secure
     */
    getPersonList: (data: InspectGroupSearch) =>
      http.request<ResultPagingDataInspectGroupUserVO['data']>(`/api/quality/inspectGroupInUser/getPersonList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组用户表
     * @name GetList
     * @summary 品质检验组子表组内人员数据
     * @request POST:/inspectGroupInUser/getList
     * @secure
     */
    getList: (data: InspectGroupSearch) =>
      http.request<ResultPagingDataInspectGroupInUserVO['data']>(`/api/quality/inspectGroupInUser/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组用户表
     * @name DelByIds
     * @summary 删除品质检验组人员
     * @request POST:/inspectGroupInUser/delByIds
     * @secure
     */
    delByIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroupInUser/delByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组用户表
     * @name Add
     * @summary 新增检验组
     * @request POST:/inspectGroupInUser/add
     * @secure
     */
    add: (data: InspectGroupSearch) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroupInUser/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectGroupInMitem: {
    /**
     * No description
     *
     * @tags 品质检验组物料表
     * @name GetList
     * @summary 品质检验组子表检验物料类数据
     * @request POST:/inspectGroupInMitem/getList
     * @secure
     */
    getList: (data: InspectGroupSearch) =>
      http.request<ResultPagingDataInspectGroupInMitemVO['data']>(`/api/quality/inspectGroupInMitem/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组物料表
     * @name GetCategoryList
     * @summary 品质检验新增获取物料类别列表
     * @request POST:/inspectGroupInMitem/getCategoryList
     * @secure
     */
    getCategoryList: (data: InspectGroupSearch) =>
      http.request<ResultPagingDataMitemCategory['data']>(`/api/quality/inspectGroupInMitem/getCategoryList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组物料表
     * @name DelByIds
     * @summary 删除品质检验组物料类别
     * @request POST:/inspectGroupInMitem/delByIds
     * @secure
     */
    delByIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroupInMitem/delByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组物料表
     * @name Add
     * @summary 新增检验组物料类别
     * @request POST:/inspectGroupInMitem/add
     * @secure
     */
    add: (data: InspectGroupSearch) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroupInMitem/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectGroup: {
    /**
     * No description
     *
     * @tags 品质检验组表
     * @name GetList
     * @summary 品质检验组主表数据
     * @request POST:/inspectGroup/getList
     * @secure
     */
    getList: (data: InspectGroupSearch) =>
      http.request<ResultPagingDataInspectGroupVO['data']>(`/api/quality/inspectGroup/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组表
     * @name DelByIds
     * @summary 删除品质检验组
     * @request POST:/inspectGroup/delByIds
     * @secure
     */
    delByIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroup/delByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组表
     * @name Change
     * @summary 修改品质检验组
     * @request POST:/inspectGroup/change
     * @secure
     */
    change: (data: InspectGroup) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroup/change`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组表
     * @name Add
     * @summary 新增检验组
     * @request POST:/inspectGroup/add
     * @secure
     */
    add: (data: InspectGroup) =>
      http.request<ResultObject['data']>(`/api/quality/inspectGroup/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验组表
     * @name GetInspectGroupByUser
     * @summary 根据登录用户获取检验组
     * @request GET:/inspectGroup/tables
     * @secure
     */
    getInspectGroupByUser: () =>
      http.request<ResultListInspectGroup['data']>(`/api/quality/inspectGroup/tables`, {
        method: 'GET',
      }),
  },
  improve: {
    /**
     * No description
     *
     * @tags 品质改善表
     * @name StagingBillNo
     * @summary 品质改善暂存
     * @request POST:/improve/stagingBillNo
     * @secure
     */
    stagingBillNo: (data: ImproveVO) =>
      http.request<ResultObject['data']>(`/api/quality/improve/stagingBillNo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质改善表
     * @name Reject
     * @summary 品质改善报告页面驳回
     * @request POST:/improve/reject
     * @secure
     */
    reject: (data: ImproveSearch) =>
      http.request<ResultPagingDataImproveVO['data']>(`/api/quality/improve/reject`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质改善表
     * @name GetRelateBillNo
     * @summary 品质改善获取检验单号
     * @request POST:/improve/getRelateBillNo
     * @secure
     */
    getRelateBillNo: (data: ImproveSearch) =>
      http.request<ResultListImproveVO['data']>(`/api/quality/improve/getRelateBillNo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质改善表
     * @name GetLog
     * @summary 品质改善报告页面查看流程
     * @request POST:/improve/getLog
     * @secure
     */
    getLog: (data: ImproveSearch) =>
      http.request<ResultPagingDataImproveVO['data']>(`/api/quality/improve/getLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质改善表
     * @name GetList
     * @summary 品质改善主表数据
     * @request POST:/improve/getList
     * @secure
     */
    getList: (data: ImproveSearch) =>
      http.request<ResultPagingDataImproveVO['data']>(`/api/quality/improve/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质改善表
     * @name GetById
     * @summary 品质改善发起界面回填
     * @request GET:/improve/getById
     * @secure
     */
    getById: (query: { id: string }) =>
      http.request<ResultImproveVO['data']>(`/api/quality/improve/getById`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 品质改善表
     * @name CancelById
     * @summary 品质改善取消
     * @request GET:/improve/cancelById
     * @secure
     */
    cancelById: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/quality/improve/cancelById`, {
        method: 'GET',
        params: query,
      }),
  },
  importManage: {
    /**
     * No description
     *
     * @tags 用户
     * @name BatchImportData
     * @summary 根据领域进行动态查询
     * @request POST:/importManage/batchImportData
     * @secure
     */
    batchImportData: (data: BatchDynamicInsertDTO) =>
      http.request<ResultObject['data']>(`/api/quality/importManage/batchImportData`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name BatchDynamicQuery
     * @summary 根据领域进行动态查询
     * @request POST:/importManage/batchDynamicQuery
     * @secure
     */
    batchDynamicQuery: (data: BatchDynamicQueryDTO) =>
      http.request<ResultListMapStringObject['data']>(`/api/quality/importManage/batchDynamicQuery`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name CheckUniqueExist
     * @summary 根据领域进行动态查询
     * @request POST:/importManage/CheckUniqueExist
     * @secure
     */
    checkUniqueExist: (data: DynamicCheckUniqueDTO) =>
      http.request<ResultBoolean['data']>(`/api/quality/importManage/CheckUniqueExist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name Tables
     * @summary 根据领域获取数据表列表
     * @request GET:/importManage/tables
     * @secure
     */
    tables: () =>
      http.request<ResultListDataTableVO['data']>(`/api/quality/importManage/tables`, {
        method: 'GET',
      }),
  },
  hold: {
    /**
     * No description
     *
     * @tags 品质控制头表
     * @name SaveData
     * @summary 品质控制-冻结与解冻保存
     * @request POST:/hold/saveData
     * @secure
     */
    saveData: (data: QcHoldDTO) =>
      http.request<ResultObject['data']>(`/api/quality/hold/saveData`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质控制头表
     * @name GetQcHoldList
     * @summary 获取Hold单据列表
     * @request POST:/hold/getQcHoldList
     * @secure
     */
    getQcHoldList: (data: QcHoldSearch) =>
      http.request<ResultPagingDataQcHoldVO['data']>(`/api/quality/hold/getQcHoldList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质控制头表
     * @name GetQcHoldDtlList
     * @summary 获取单据明细列表
     * @request POST:/hold/getQcHoldDtlList
     * @secure
     */
    getQcHoldDtlList: (data: QcHoldSearch) =>
      http.request<ResultListQcHoldDtlVO['data']>(`/api/quality/hold/getQcHoldDtlList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  dynamicManage: {
    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicQueryData
     * @summary 根据领域进行动态表字段查询
     * @request POST:/dynamicManage/dynamicQueryData
     * @secure
     */
    dynamicQueryData: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/quality/dynamicManage/dynamicQueryData`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name BatchUpdateData
     * @summary 根据领域进行动态表字段更新
     * @request POST:/dynamicManage/batchUpdateData
     * @secure
     */
    batchUpdateData: (data: BatchDynamicUpdateDTO) =>
      http.request<ResultObject['data']>(`/api/quality/dynamicManage/batchUpdateData`, {
        method: 'POST',
        body: data as any,
      }),
  },
  sampleCode: {
    /**
     * No description
     *
     * @tags 样本字码表
     * @name GetList
     * @summary 查询主界面数据
     * @request GET:/sampleCode/getList
     * @secure
     */
    getList: () =>
      http.request<ResultListSampleCodeVO['data']>(`/api/quality/sampleCode/getList`, {
        method: 'GET',
      }),
  },
  billSeq: {
    /**
     * No description
     *
     * @tags 单据流程水号表
     * @name GetBillNo
     * @summary 根据前缀获取流水单号
     * @request GET:/billSeq/getBillNo
     * @secure
     */
    getBillNo: (query: { prefix: string }) =>
      http.request<ResultString['data']>(`/api/quality/billSeq/getBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
};
