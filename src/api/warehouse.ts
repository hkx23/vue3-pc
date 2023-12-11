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
  /** @format int32 */
  state?: number;
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

/** 货位 */
export type Location = {
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
  /** 货位代码 */
  locationCode?: string;
  /** 货位名称 */
  locationName?: string;
  /** 货位描述 */
  locationDesc?: string;
  warehouseId?: string;
  districtId?: string;
} | null;

/** 通用响应类 */
export interface ResultLocation {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 货位 */
  data?: Location;
}

/** 货区 */
export type District = {
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
  /** 货位代码 */
  districtCode?: string;
  /** 货位名称 */
  districtName?: string;
  /** 货位描述 */
  districtDesc?: string;
  warehouseId?: string;
} | null;

/** 通用响应类 */
export interface ResultDistrict {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 货区 */
  data?: District;
}

/** 完工入库标签实体 */
export interface WipCompletionLabelDTO {
  id?: string;
  /** 单据号 */
  billNo?: string;
  /** 业务类型编码 */
  businessCategoryCode?: string;
  mitemId?: string;
  /** 物料名称 */
  mitemName?: string;
  mitemCategoryId?: string;
  /** 物料类型名称 */
  mitemCategoryName?: string;
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 数量 */
  qty?: number;
  /** 单位 */
  uom?: string;
  /** 扫描的条形码 */
  scanBarcode?: string;
  /** 条码类型 */
  barcodeType?: string;
  /** 状态 */
  status?: string;
}

/** 通用响应类 */
export interface ResultListWipCompletionLabelDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WipCompletionLabelDTO[] | null;
}

/** 响应数据 */
export type PagingDataWipCompletionBillVO = {
  list?: WipCompletionBillVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipCompletionBillVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipCompletionBillVO;
}

export interface WipCompletionBillVO {
  id?: string;
  billNo?: string;
  warehouse?: string;
  creator?: string;
}

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  location: {
    /**
     * No description
     *
     * @tags 货位
     * @name Search
     * @request POST:/location/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/location/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetItemById
     * @request POST:/location/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultLocation['data']>(`/api/warehouse/location/items/${id}`, {
        method: 'POST',
      }),
  },
  district: {
    /**
     * No description
     *
     * @tags 货区
     * @name Search
     * @request POST:/district/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/district/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name GetItemById
     * @request POST:/district/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultDistrict['data']>(`/api/warehouse/district/items/${id}`, {
        method: 'POST',
      }),
  },
  billInfo: {
    /**
     * No description
     *
     * @tags 单据信息表
     * @name SaveByWipCompletionLabel
     * @summary 通过扫描标签保存完工入库单据
     * @request POST:/billInfo/saveByWipCompletionLabel
     * @secure
     */
    saveByWipCompletionLabel: (data: WipCompletionLabelDTO) =>
      http.request<ResultObject['data']>(`/api/warehouse/billInfo/saveByWipCompletionLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name GetWipCompletionLabelList
     * @summary 根据单据ID获取已扫入的完工入库条码
     * @request GET:/billInfo/getWipCompletionLabelList
     * @secure
     */
    getWipCompletionLabelList: (query: { id: string }) =>
      http.request<ResultListWipCompletionLabelDTO['data']>(`/api/warehouse/billInfo/getWipCompletionLabelList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name GetDraftWipCompletionBillList
     * @summary 获取未提交的完工入库单据
     * @request GET:/billInfo/getDraftWipCompletionBillList
     * @secure
     */
    getDraftWipCompletionBillList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      categoryCode: string;
      isSelf: boolean;
    }) =>
      http.request<ResultPagingDataWipCompletionBillVO['data']>(
        `/api/warehouse/billInfo/getDraftWipCompletionBillList`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name DeleteBarcode
     * @summary 根据交易明细标签ID删除对应的明细标签
     * @request DELETE:/billInfo/deleteBarcode
     * @secure
     */
    deleteBarcode: (query: { barcodeId: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/billInfo/deleteBarcode`, {
        method: 'DELETE',
        params: query,
      }),
  },
};
