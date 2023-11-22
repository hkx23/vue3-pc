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
export interface ResultWorkstation {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Workstation;
}

/** 响应数据 */
export type Workstation = {
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
  workstationCode?: string;
  workstationName?: string;
  workstationDesc?: string;
  pworkcenterId?: string;
  pprocessId?: string;
} | null;

/** 显示工站 */
export interface WorkstationVO {
  id?: string;
  eid?: string;
  oid?: string;
  /** 工站代码 */
  workstationCode?: string;
  /** 工站名称 */
  workstationName?: string;
  /** 工站描述 */
  workstationDesc?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 工序名称 */
  processName?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /** 创建人 */
  creator?: string;
  /** 创建时间 */
  timeCreate?: string;
  /** 修改人 */
  modifier?: string;
  /** 修改时间 */
  timeModified?: string;
  pworkcenterId?: string;
  pprocessId?: string;
}

export interface WorkstationSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  workstaion?: string;
  state?: number[];
  workcenter?: string;
  process?: string;
  sorts?: SortParam[];
  filters?: Filter[];
}

/** 响应数据 */
export type PagingDataWorkstationVO = {
  list?: WorkstationVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkstationVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkstationVO;
}

export interface WorkcenterSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  category?: string;
  state?: number[];
  sorts?: SortParam[];
  filters?: Filter[];
}

/** 通用响应类 */
export interface ResultWorkcenter {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Workcenter;
}

/** 响应数据 */
export type Workcenter = {
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
  wcCode?: string;
  wcName?: string;
  wcDesc?: string;
  parentWcId?: string;
  /** @format int32 */
  wcSeq?: number;
  /** @format int32 */
  wcObjectType?: number;
  wcObjectId?: string;
  wcLocation?: string;
  mworkshopId?: string;
  mdirectorId?: string;
} | null;

/** 响应数据 */
export type PagingDataProcess = {
  list?: Process[];
  /** @format int32 */
  total?: number;
} | null;

export interface Process {
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
  processCode?: string;
  processName?: string;
  processDesc?: string;
}

/** 通用响应类 */
export interface ResultPagingDataProcess {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProcess;
}

/** 通用响应类 */
export interface ResultProcess {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: Process;
}

/** 响应数据 */
export type MoSchedule = {
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
  moCode?: string;
  moClass?: string;
  soNo?: string;
  /** @format int32 */
  soSeq?: number;
  /** @format int32 */
  isHold?: number;
  /** @format int32 */
  planQty?: number;
  /** @format int32 */
  offlineQty?: number;
  /** @format int32 */
  completedQty?: number;
  /** @format int32 */
  stockinQty?: number;
  /** @format date-time */
  datetimePlanStart?: string;
  /** @format date-time */
  datetimePlanEnd?: string;
  /** @format date-time */
  datetimeActualStart?: string;
  /** @format date-time */
  datetimeActualEnd?: string;
  parentMoId?: string;
  memo?: string;
  status?: string;
  moSource?: string;
  /** @format date-time */
  datetimeSche?: string;
  /** @format int32 */
  scheQty?: number;
  scheCode?: string;
  mmitemId?: string;
  pworkcenterId?: string;
  proutingRevisionId?: string;
  mworkshopId?: string;
  wwarehouseId?: string;
} | null;

/** 通用响应类 */
export interface ResultMoSchedule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MoSchedule;
}

export interface Mo {
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
  moCode?: string;
  moClass?: string;
  soNo?: string;
  /** @format int32 */
  soSeq?: number;
  /** @format int32 */
  isHold?: number;
  /** @format int32 */
  planQty?: number;
  /** @format int32 */
  offlineQty?: number;
  /** @format int32 */
  completedQty?: number;
  /** @format int32 */
  stockinQty?: number;
  /** @format date-time */
  datetimePlanStart?: string;
  /** @format date-time */
  datetimePlanEnd?: string;
  /** @format date-time */
  datetimeActualStart?: string;
  /** @format date-time */
  datetimeActualEnd?: string;
  parentMoId?: string;
  memo?: string;
  status?: string;
  moSource?: string;
  mmitemId?: string;
  mworkshopId?: string;
  wwarehouseId?: string;
}

/** 响应数据 */
export type PagingDataMo = {
  list?: Mo[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMo {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMo;
}

/** 通用响应类 */
export interface ResultMo {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: Mo;
}

/** 物料服务间调用标准实体 */
export interface MitemFeignDTO {
  id?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 物料类别编码 */
  categoryCode?: string;
  /** 物料类别名称 */
  categoryName?: string;
  /** 物料类别描述 */
  categoryDesc?: string;
  /** 供应方式 */
  supplyCategory?: string;
  /** 单位 */
  uom?: string;
  /**
   * 是否成品，1：是；0：否
   * @format int32
   */
  isProduct?: number;
  /**
   * 是否原材料，1：是；0：否
   * @format int32
   */
  isRaw?: number;
  /**
   * 是否半成品,1：是；0：否
   * @format int32
   */
  isInProcess?: number;
  /**
   * 保质期天数
   * @format int32
   */
  shelfLifeDays?: number;
  /**
   * 是否启用批次,1：是；0：否
   * @format int32
   */
  isBatchNo?: number;
  mmitemCategoryId?: string;
  wwarehouseId?: string;
}

/** 响应数据 */
export type MoTestDTO = {
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
  moCode?: string;
  moClass?: string;
  soNo?: string;
  /** @format int32 */
  soSeq?: number;
  /** @format int32 */
  isHold?: number;
  /** @format int32 */
  planQty?: number;
  /** @format int32 */
  offlineQty?: number;
  /** @format int32 */
  completedQty?: number;
  /** @format int32 */
  stockinQty?: number;
  /** @format date-time */
  datetimePlanStart?: string;
  /** @format date-time */
  datetimePlanEnd?: string;
  /** @format date-time */
  datetimeActualStart?: string;
  /** @format date-time */
  datetimeActualEnd?: string;
  parentMoId?: string;
  memo?: string;
  status?: string;
  moSource?: string;
  /** 物料服务间调用标准实体 */
  mitemObject?: MitemFeignDTO;
  mmitemId?: string;
  mworkshopId?: string;
  wwarehouseId?: string;
} | null;

/** 通用响应类 */
export interface ResultListMoTestDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MoTestDTO[] | null;
}

/**
 * @title scm项目
 * @version v1
 * @baseUrl http://localhost:7500
 *
 * scm项目API汇总
 */

export const api = {
  workstation: {
    /**
     * No description
     *
     * @tags 工站
     * @name Search
     * @request POST:/workstation/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/control/workstation/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name GetItemById
     * @request POST:/workstation/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultWorkstation['data']>(`/api/control/workstation/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name UpdateItemByCode
     * @summary 修改
     * @request POST:/workstation/items/modify
     * @secure
     */
    updateItemByCode: (data: WorkstationVO) =>
      http.request<ResultObject['data']>(`/api/control/workstation/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name AddItem
     * @summary 新增工站
     * @request POST:/workstation/items/add
     * @secure
     */
    addItem: (data: WorkstationVO) =>
      http.request<ResultObject['data']>(`/api/control/workstation/items/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name Getlist
     * @summary 工站查询
     * @request POST:/workstation/getlist
     * @secure
     */
    getlist: (data: WorkstationSearch) =>
      http.request<ResultPagingDataWorkstationVO['data']>(`/api/control/workstation/getlist`, {
        method: 'POST',
        body: data as any,
      }),
  },
  workcenter: {
    /**
     * No description
     *
     * @tags 工作中心
     * @name Search
     * @summary 工作中心查询
     * @request POST:/workcenter/items
     * @secure
     */
    search: (data: WorkcenterSearch) =>
      http.request<ResultObject['data']>(`/api/control/workcenter/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name GetItemById
     * @request POST:/workcenter/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultWorkcenter['data']>(`/api/control/workcenter/items/${id}`, {
        method: 'POST',
      }),
  },
  process: {
    /**
     * No description
     *
     * @tags 工序
     * @name Search
     * @request POST:/process/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataProcess['data']>(`/api/control/process/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序
     * @name GetItemById
     * @request POST:/process/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultProcess['data']>(`/api/control/process/items/${id}`, {
        method: 'POST',
      }),
  },
  moSchedule: {
    /**
     * No description
     *
     * @tags 工单排产表
     * @name Search
     * @request POST:/moSchedule/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/control/moSchedule/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name GetItemById
     * @request POST:/moSchedule/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMoSchedule['data']>(`/api/control/moSchedule/items/${id}`, {
        method: 'POST',
      }),
  },
  mo: {
    /**
     * No description
     *
     * @tags 工单表
     * @name Search
     * @request POST:/mo/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataMo['data']>(`/api/control/mo/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单表
     * @name GetItemById
     * @request POST:/mo/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMo['data']>(`/api/control/mo/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 工单表
     * @name FeignTest
     * @summary feign关联物料测试
     * @request GET:/mo/feignTest
     * @secure
     */
    feignTest: () =>
      http.request<ResultListMoTestDTO['data']>(`/api/control/mo/feignTest`, {
        method: 'GET',
      }),
  },
};
