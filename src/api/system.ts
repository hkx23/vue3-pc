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

export interface CommonSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  selectedField?: string;
  selectedValue?: string;
  keyword?: string;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
}

export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE';
  value?: string;
}

export interface SortParam {
  sortBy?: string;
  descending?: boolean;
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

/** 通用响应类 */
export interface ResultUser {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: User;
}

/** 响应数据 */
export type User = {
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
  userName?: string;
  displayName?: string;
  password?: string;
  /** @format date-time */
  timeLastActivity?: string;
  /** @format date-time */
  timeLastLogin?: string;
  /** @format date-time */
  timeLastPasswordChanged?: string;
  /** @format int32 */
  isOnline?: number;
  /** @format int32 */
  isLockedOut?: number;
  /** @format date-time */
  timeLastLockedOut?: string;
  /** @format int32 */
  failedAttemptCount?: number;
  /** @format date-time */
  timeFailedAttemptStart?: string;
  /** @format int32 */
  accountType?: number;
  /** @format date-time */
  timeExpiration?: string;
  mpersonId?: string;
} | null;

/** 响应数据 */
export type ParamGroup = {
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
  paramDomain?: string;
  paramGroupCode?: string;
  paramGroupName?: string;
  paramGroupDesc?: string;
  /** @format int32 */
  isSys?: number;
  paramDataType?: string;
} | null;

/** 通用响应类 */
export interface ResultParamGroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ParamGroup;
}

/** 响应数据 */
export type Param = {
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
  paramCode?: string;
  paramValue?: string;
  paramDesc?: string;
  /** @format int32 */
  seq?: number;
  sparamGroupId?: string;
} | null;

/** 通用响应类 */
export interface ResultParam {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Param;
}

/** 当前用户实体 */
export type CurrentUserVO = {
  /** 用户名 */
  userName?: string;
  /** 显示名称 */
  displayName?: string;
  mpersonId?: string;
} | null;

/** 通用响应类 */
export interface ResultCurrentUserVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 当前用户实体 */
  data?: CurrentUserVO;
}

/** 菜单元数据 */
export interface ModuleMetaVO {
  /** 名称，多语言 */
  title?: Record<string, string>;
  /** 图标路径 */
  icon?: string;
  /** frame路径 */
  frameSrc?: string;
}

/** 通用响应类 */
export interface ResultListShowModuleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ShowModuleVO[] | null;
}

/** 显示菜单实体 */
export type ShowModuleVO = {
  /** 地址 */
  path?: string;
  /** 名称 */
  name?: string;
  /** 类型 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 菜单元数据 */
  meta?: ModuleMetaVO;
  /** 子菜单 */
  children?: ShowModuleVO[];
} | null;

/**
 * @title scm项目
 * @version v1
 * @baseUrl http://192.168.1.6:7200
 *
 * scm项目API汇总
 */

export const api = {
  user: {
    /**
     * No description
     *
     * @tags 用户
     * @name Search
     * @summary 获取用户信息列表
     * @request POST:/user/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/system/user/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetItemById
     * @summary 根据ID获取用户信息
     * @request POST:/user/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultUser['data']>(`/api/system/user/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name CurrentUserInfo
     * @summary 获取当前用户
     * @request GET:/user/currentUserInfo
     * @secure
     */
    currentUserInfo: () =>
      http.request<ResultCurrentUserVO['data']>(`/api/system/user/currentUserInfo`, {
        method: 'GET',
      }),
  },
  paramGroup: {
    /**
     * No description
     *
     * @tags 系统字典组
     * @name Search
     * @request POST:/paramGroup/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/system/paramGroup/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name GetItemById
     * @request POST:/paramGroup/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultParamGroup['data']>(`/api/system/paramGroup/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name List
     * @request GET:/paramGroup/list
     * @secure
     */
    list: (query?: {
      /**
       * @format int32
       * @default 1
       */
      pageNum?: number;
      /**
       * @format int32
       * @default 10
       */
      pageSize?: number;
      /** @default "" */
      keyword?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/system/paramGroup/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name Getlist
     * @request GET:/paramGroup/getlist
     * @secure
     */
    getlist: (query?: {
      /** @default "" */
      keyword?: string;
      /**
       * @format int32
       * @default 1
       */
      pagenum?: number;
      /**
       * @format int32
       * @default 20
       */
      pagesize?: number;
      /** @default "" */
      paramDomain?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/system/paramGroup/getlist`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name Getdomainlist
     * @request GET:/paramGroup/getdomainlist
     * @secure
     */
    getdomainlist: () =>
      http.request<ResultObject['data']>(`/api/system/paramGroup/getdomainlist`, {
        method: 'GET',
      }),
  },
  param: {
    /**
     * No description
     *
     * @tags 系统字典明细
     * @name Search
     * @request POST:/param/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/system/param/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name GetItemById
     * @request POST:/param/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultParam['data']>(`/api/system/param/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name List
     * @request GET:/param/list
     * @secure
     */
    list: (query?: {
      /**
       * @format int32
       * @default 1
       */
      pageNum?: number;
      /**
       * @format int32
       * @default 10
       */
      pageSize?: number;
      /** @default "" */
      keyword?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/system/param/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name Getlist
     * @request GET:/param/getlist
     * @secure
     */
    getlist: (query?: {
      /** @default "" */
      keyword?: string;
      /**
       * @format int32
       * @default 1
       */
      pagenum?: number;
      /**
       * @format int32
       * @default 20
       */
      pagesize?: number;
      /** @default "" */
      parmGroupId?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/system/param/getlist`, {
        method: 'GET',
        params: query,
      }),
  },
  module: {
    /**
     * No description
     *
     * @tags 菜单
     * @name Show
     * @summary 显示菜单
     * @request GET:/module/show
     * @secure
     */
    show: (query: {
      /**
       * 客户端类型
       * @format int32
       */
      clientType: number;
    }) =>
      http.request<ResultListShowModuleVO['data']>(`/api/system/module/show`, {
        method: 'GET',
        params: query,
      }),
  },
};
