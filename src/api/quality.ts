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

/** 物料检验标准全信息搜索类 */
export interface IqcInspectStdFullSearch {
  mitemCategoryId?: string;
  mitemId?: string;
  pickQty?: string;
  /** 严格度 */
  inspectionStringency?: string;
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
  /** 物料检验标准表ID */
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
  sampleQty?: string;
  /** AC/RE */
  acRe?: string;
  /** 检验水平 */
  inspectLevelName?: string;
  /** 不合格分类 */
  unqualifyCategoryName?: string;
  /** 接收质量限 */
  aql?: string;
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
  /** 物料检验标准表ID */
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
  holdCategoryName?: string;
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
  /** 单据状态名称 */
  statusName?: string;
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
  ii?: string;
  s1?: string;
  i?: string;
  iii?: string;
  s4?: string;
  s3?: string;
  s2?: string;
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

/** 品质控制 */
export interface QcHoldSearch {
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
  },
  iqcInspectStdDtl: {
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
     * @name GetDtl
     * @summary 查询检验标准明细
     * @request POST:/iqcInspectStdDtl/getDtl
     * @secure
     */
    getDtl: (data: IqcInspectStdDtlSearch) =>
      http.request<ResultPagingDataIqcInspectStdDtlVO['data']>(`/api/quality/iqcInspectStdDtl/getDtl`, {
        method: 'POST',
        body: data as any,
      }),
  },
  iqcInspectStd: {
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
  },
  iqcInspect: {
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
     * @summary 获取解锁列表列表
     * @request GET:/hold/getQcHoldList
     * @secure
     */
    getQcHoldList: (query: {
      /** 品质控制 */
      search: QcHoldSearch;
    }) =>
      http.request<ResultPagingDataQcHoldVO['data']>(`/api/quality/hold/getQcHoldList`, {
        method: 'GET',
        params: query,
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
  importManage: {
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
