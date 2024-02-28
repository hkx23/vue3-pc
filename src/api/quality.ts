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

export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE';
  value?: string;
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

export interface SamplingStdDtlDTO {
  id?: string;
  sampingStdId: string;
  /** 批量范围起始值 */
  lotFrom: number;
  /** 批量范围结束值 */
  lotTo: number;
  /** 抽样比例 */
  samplingPer: number;
  /** 抽样数量 */
  samplingNum: number;
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

export interface SamplingStdSearch {
  sampingStdCode?: string;
  /** @format int32 */
  operationScope?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNum?: number;
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

export interface SamplingAqlSearch {
  /** 检验水平 */
  checkLevel?: string;
  /** 抽样严格度 */
  inspectionStringency?: string;
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

/** 国标抽样方案装aql的容器 */
export interface SamplingAqlDTO {
  /** 接收质量限 */
  aql?: number;
  /** 允收数 */
  acceptQty?: number;
  /** 拒收数 */
  rejectQty?: number;
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
  oid?: string;
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
  /** 允收拒收数 */
  arguments?: SamplingAqlDTO[];
} | null;

export interface OqcInspectStdMitemAssign {
  stdId?: string;
  mitemId?: string;
  mitemCategoryIds?: string[];
}

/** 响应数据 */
export type OqcInspectStdMitemVO = {
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
  inspectStdName?: string;
  mitemCategortArr?: Record<string, string>;
} | null;

/** 通用响应类 */
export interface ResultListOqcInspectStdMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: OqcInspectStdMitemVO[] | null;
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

export interface FileUpload {
  fileName?: string;
  signedUrl?: string;
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
  inspectTypeList: number[];
  itemCategoryName?: string;
  unqualifyCategoryName?: string;
  inspectLevelName?: string;
  uomName?: string;
  characteristicsName?: string;
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

export interface OqcInspectStdSearch {
  stdId?: string;
  inspectStdCode?: string;
  status?: string;
  creator?: string;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNum?: number;
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
  revision: number;
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
  /** 检验类型 */
  inspectTypeList: number[];
  list?: OqcInspectStdDtlDTO[];
  /** @format int32 */
  total?: number;
  ids?: string[];
  fileList?: FileUpload[];
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

/** 物料检验标准明细附件表 */
export interface IqcInspectStdDtlFile {
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
  fileList?: IqcInspectStdDtlFile[];
  /** 上传的附件信息列表 */
  files?: FileUpload[];
}

/** 物料检验标准全信息搜索类 */
export interface IqcInspectStdFullSearch {
  /** IQC单据号 */
  iqcBillNo?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  pickQty?: string;
  /** 严格度 */
  inspectionStringency?: string;
}

/** 检验测量值 */
export interface IqcInspectMeasureVO {
  /**
   * 主键ID
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
  iqcInspectDtlId?: string;
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
  inspectResult?: boolean;
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
  revision?: number;
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
  files?: FileUpload[];
  dtls?: IqcInspectStdDtlVO[];
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
  revision?: number;
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
  inspectQty?: number;
  /** 检验严格度 */
  inspectStringency?: string;
  inspectStringencyName?: string;
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
  /** 停留时长 */
  waitTime?: string;
  /** 检验结果名称 */
  inspectResultName?: string;
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

/** 缺陷类型 */
export interface Dropdown {
  value?: string;
  label?: string;
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
export interface IqcInspectSubmitDeliveryNoVO {
  /** 接收单号 */
  billNo?: string;
  /** 接收单号行号 */
  erpLineNo?: string;
  billNoDtlId?: string;
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
  mitemCategoryId?: string;
  mitemCategoryCode?: string;
  mitemCategoryName?: string;
  pickQty?: number;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  inspectionStringency?: string;
  /** 处理意见VO */
  iqcInspectNg?: IqcInspectNgVO;
  iqcInspectStdList?: IqcInspectStdFullVO[];
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
export interface ResultListT {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: T[] | null;
}

/** 响应数据 */
export type T = object | null;

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
  i?: string;
  ii?: string;
  iii?: string;
  s1?: string;
  s2?: string;
  s3?: string;
  s4?: string;
} | null;

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
export interface ResultOqcInspectStdDtlDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: OqcInspectStdDtlDTO;
}

/** 品质检验组表 */
export type InspectGroup = {
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
  /** 检验组名称 */
  inspectGroupName?: string;
} | null;

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
  },
  oqcInspectStdMitem: {
    /**
     * No description
     *
     * @tags 产品检验标准分配表
     * @name GetOqcInspectStdMitem
     * @summary 产品检验标准分配页面回填
     * @request POST:/oqcInspectStdMitem/getOqcInspectStdMitem
     * @secure
     */
    getOqcInspectStdMitem: (data: OqcInspectStdMitemAssign) =>
      http.request<ResultListOqcInspectStdMitemVO['data']>(`/api/quality/oqcInspectStdMitem/getOqcInspectStdMitem`, {
        method: 'POST',
        body: data as any,
      }),

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
     * @name UpdateDtlById
     * @summary 更新明细
     * @request POST:/oqcInspectStdDtl/updateDtlById
     * @secure
     */
    updateDtlById: (data: OqcInspectStdDtlDTO) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStdDtl/updateDtlById`, {
        method: 'POST',
        body: data as any,
      }),

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
     * @name DelByIds
     * @summary 删除明细
     * @request POST:/oqcInspectStdDtl/delByIds
     * @secure
     */
    delByIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStdDtl/delByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品检验标准明细表
     * @name AddDtl
     * @summary 新增明细
     * @request POST:/oqcInspectStdDtl/addDtl
     * @secure
     */
    addDtl: (data: OqcInspectStdDtlDTO) =>
      http.request<ResultObject['data']>(`/api/quality/oqcInspectStdDtl/addDtl`, {
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

    /**
     * No description
     *
     * @tags 产品检验标准明细表
     * @name GetDtlById
     * @summary 根据id获取明细数据
     * @request GET:/oqcInspectStdDtl/getDtlById
     * @secure
     */
    getDtlById: (query: { id: string }) =>
      http.request<ResultOqcInspectStdDtlDTO['data']>(`/api/quality/oqcInspectStdDtl/getDtlById`, {
        method: 'GET',
        params: query,
      }),
  },
  oqcInspectStd: {
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

    /**
     * No description
     *
     * @tags 产品检验标准头表
     * @name CopyOqcInspectStd
     * @summary 复制产品检验标准
     * @request GET:/oqcInspectStd/copyOqcInspectStd
     * @secure
     */
    copyOqcInspectStd: (query: { id: string }) =>
      http.request<ResultLong['data']>(`/api/quality/oqcInspectStd/copyOqcInspectStd`, {
        method: 'GET',
        params: query,
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
     * @summary 新增标准物料关系
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
    add: (data: IqcInspectStdMitem) =>
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
     * @name Modify
     * @summary 编辑标准(提交)
     * @request POST:/iqcInspectStd/modify
     * @secure
     */
    modify: (data: IqcInspectStdVO) =>
      http.request<ResultObject['data']>(`/api/quality/iqcInspectStd/modify`, {
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
     * @name TemporaryStorage
     * @summary 暂存标准
     * @request POST:/iqcInspectStd/TemporaryStorage
     * @secure
     */
    temporaryStorage: (data: IqcInspectStd) =>
      http.request<ResultLong['data']>(`/api/quality/iqcInspectStd/TemporaryStorage`, {
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
     * @name GetMitemReceiveBillVo
     * @summary 获取仓库接收单数据
     * @request POST:/iqcInspect/getMitemReceiveBillVO
     * @secure
     */
    getMitemReceiveBillVo: (data: MitemReceiveBillSearch) =>
      http.request<ResultPagingDataMitemReceiveBillVO['data']>(`/api/quality/iqcInspect/getMitemReceiveBillVO`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultListT['data']>(`/api/quality/importManage/batchDynamicQuery`, {
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
  inspectGroup: {
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
