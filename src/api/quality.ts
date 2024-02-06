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
  /** 样本量简码 */
  simpleCode?: string;
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
  /** 抽样样本数 */
  sampleQty?: number;
  /** 允收拒收数 */
  arguments?: SamplingAqlDTO[];
} | null;

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
}

/** 数据表对象 */
export type DataTableVO = {
  /** 表名 */
  tableName?: string;
  /** 表模型名称 */
  tableModelName?: string;
  /** 表描述 */
  tableDescription?: string;
  /** 文件最后修改时间戳 */
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
     * @name StateChange
     * @summary 修改状态
     * @request GET:/samplingStd/items/{id}
     * @secure
     */
    stateChange: (id: string) =>
      http.request<ResultObject['data']>(`/api/quality/samplingStd/items/${id}`, {
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
};
