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

export interface IncidentTypeSearch {
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
  /** 模糊查询关键词 */
  keyword?: string;
  /** 下拉框查询 */
  selectKeyword?: string;
  /** 异常类型-状态 */
  state?: number[];
  id?: string;
  /** 多个id */
  ids?: string[];
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

/** 安灯异常类型表 */
export interface IncidentType {
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
  /** 异常代码 */
  incidentCode?: string;
  /** 异常名称 */
  incidentName?: string;
  /** 异常模块 */
  incidentModule?: string;
}

/** 领域对象扩展属性分类 */
export interface IncidentTypeVO {
  id?: string;
  /** 异常代码 */
  incidentCode?: string;
  /** 异常名称 */
  incidentName?: string;
  /** 异常模块 */
  incidentModule?: string;
  /** 创建人 */
  creatorName?: string;
}

/** 响应数据 */
export type PagingDataIncidentTypeVO = {
  list?: IncidentTypeVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIncidentTypeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIncidentTypeVO;
}

/** 响应数据 */
export type PagingDataParam = {
  list?: Param[];
  /** @format int32 */
  total?: number;
} | null;

/** 系统字典明细 */
export interface Param {
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
  paramGroupId?: string;
  /** 字典名称 */
  paramName?: string;
  /** 字典代码 */
  paramCode?: string;
  /** 字典值 */
  paramValue?: string;
  /** 字典描述 */
  paramDesc?: string;
  /**
   * 字典序号
   * @format int32
   */
  seq?: number;
}

/** 通用响应类 */
export interface ResultPagingDataParam {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataParam;
}

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  incidentType: {
    /**
     * No description
     *
     * @tags 安灯异常类型表
     * @name RemoveIncidentTypeBatch
     * @summary 批量删除异常类型
     * @request POST:/incidentType/removeDefectCodeBatch
     * @secure
     */
    removeIncidentTypeBatch: (data: IncidentTypeSearch) =>
      http.request<ResultObject['data']>(`/api/daily/incidentType/removeDefectCodeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常类型表
     * @name ModifyIncidentType
     * @summary 编辑异常类型
     * @request POST:/incidentType/modifyIncidentType
     * @secure
     */
    modifyIncidentType: (data: IncidentType) =>
      http.request<ResultObject['data']>(`/api/daily/incidentType/modifyIncidentType`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常类型表
     * @name GetList
     * @summary 查询异常类型
     * @request POST:/incidentType/getList
     * @secure
     */
    getList: (data: IncidentTypeSearch) =>
      http.request<ResultPagingDataIncidentTypeVO['data']>(`/api/daily/incidentType/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常类型表
     * @name AddIncidentType
     * @summary 新增异常类型
     * @request POST:/incidentType/addIncidentType
     * @secure
     */
    addIncidentType: (data: IncidentType) =>
      http.request<ResultObject['data']>(`/api/daily/incidentType/addIncidentType`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常类型表
     * @name GetIncidentType
     * @summary 获取下拉列表(异常模块)
     * @request GET:/incidentType/getIncidentType
     * @secure
     */
    getIncidentType: () =>
      http.request<ResultPagingDataParam['data']>(`/api/daily/incidentType/getIncidentType`, {
        method: 'GET',
      }),
  },
};
