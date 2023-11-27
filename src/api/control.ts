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

/** 筛选字段 */
export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE';
  value?: string;
}

/** 排序字段 */
export interface SortParam {
  sortBy?: string;
  descending?: boolean;
}

export interface WorkstationAuthSearch {
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
  id?: string;
  userId?: string;
  /** 多个工站权限id */
  ids?: string[];
  /** 模糊关键词 */
  keyword?: string;
  /** 工站编码名称模糊查询 */
  workstationWord?: string;
  /** 用户编码名称模糊查询 */
  userWord?: string;
  /** 工作中心编码名称模糊 */
  workcenterWord?: string;
  /** 工序编码名称模糊 */
  processWord?: string;
  /** 排序字段 */
  sorts?: SortParam[];
  /** 筛选字段 */
  filters?: Filter[];
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

/** 工站权限 */
export interface WorkstationAuth {
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
  userId?: string;
  workstationId?: string;
}

/** 响应数据 */
export type PagingDataWorkstationAuthVO = {
  list?: WorkstationAuthVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkstationAuthVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkstationAuthVO;
}

/** 工站权限显示 */
export interface WorkstationAuthVO {
  id?: string;
  eid?: string;
  oid?: string;
  userId?: string;
  /** 用户名 */
  userName?: string;
  /** 姓名 */
  personName?: string;
  workstationId?: string;
  /** 工站编码 */
  workstationCode?: string;
  /** 工站名称 */
  workstationName?: string;
  /** 工站描述 */
  workstationDesc?: string;
  /** 工作中心编码 */
  workcenterCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 工序编码 */
  processCode?: string;
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
}

/** 响应数据 */
export type PagingDataLong = {
  list?: string[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLong {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLong;
}

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

/** 响应数据 */
export type PagingDataWorkstation = {
  list?: Workstation[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkstation {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkstation;
}

/** 工站 */
export interface Workstation {
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
  /** 工站代码 */
  workstationCode?: string;
  /** 工站名称 */
  workstationName?: string;
  /** 工站描述 */
  workstationDesc?: string;
  processId?: string;
  workcenterId?: string;
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
  /** 工站 */
  data?: Workstation;
}

export interface WorkstationSearch {
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
  /** 工站编码名称模糊 */
  workstaion?: string;
  /** 工站-状态 */
  state?: number[];
  /** 工作中心编码名称模糊 */
  workcenter?: string;
  /** 工序编码名称模糊 */
  process?: string;
  /** 排序字段 */
  sorts?: SortParam[];
  /** 筛选字段 */
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
  processId?: string;
  workcenterId?: string;
}

/** 工作中心 */
export interface Workcenter {
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
  /** 工站代码 */
  wcCode?: string;
  /** 工站名称 */
  wcName?: string;
  /** 工站描述 */
  wcDesc?: string;
  workshopId?: string;
  parentWcId?: string;
  /**
   * 顺序
   * @format int32
   */
  wcSeq?: number;
  /**
   * 类型
   * @format int32
   */
  wcObjectType?: number;
  wcObjectId?: string;
  /** 地点 */
  wcLocation?: string;
  /** 负责人 */
  wcOwner?: string;
}

export interface WorkcenterSearch {
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
  id?: string;
  /** 多个id */
  ids?: string[];
  /** 多条记录 */
  allRecord?: Workcenter[];
  /** 工作中心-类别 */
  category?: number[];
  /** 工作中心编码名称模糊查询 */
  workcenterword?: string;
  workshopID?: string;
  /** 工作中心-状态 */
  state?: number[];
  /** 排序字段 */
  sorts?: SortParam[];
  /** 筛选字段 */
  filters?: Filter[];
}

/** 响应数据 */
export type PagingDataWorkcenter = {
  list?: Workcenter[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkcenter {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkcenter;
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
  /** 工作中心 */
  data?: Workcenter;
}

/** 响应数据 */
export type PagingDataWorkcenterVO = {
  list?: WorkcenterVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkcenterVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkcenterVO;
}

/** 工作中心显示 */
export interface WorkcenterVO {
  id?: string;
  eid?: string;
  oid?: string;
  /** 工作中心编号 */
  wcCode?: string;
  /** 工作中心名称 */
  wcName?: string;
  /**
   * 工作中心类型
   * @format int32
   */
  wcObjectType?: number;
  /** 工作中心类型 */
  wcType?: string;
  workshopID?: string;
  /** 所属车间编码 */
  workshopCode?: string;
  /** 所属车间名称 */
  workshopName?: string;
  /** 工作中心地点 */
  wcLocation?: string;
  parentWcId?: string;
  /** 父工作中心编码 */
  parentWcCode?: string;
  /** 负责人名称 */
  wcOwner?: string;
  wcObjectId?: string;
  /** 关联设备编码 */
  wcObjectCode?: string;
  /**
   * 顺序号
   * @format int32
   */
  wcSeq?: number;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /**
   * 工作中心-工作区总记录数
   * @format int32
   */
  area?: number;
  /**
   * 工作中心-生产线总记录数
   * @format int32
   */
  line?: number;
  /**
   * 工作中心-工段总记录数
   * @format int32
   */
  section?: number;
  /**
   * 工作中心-设备总记录数
   * @format int32
   */
  device?: number;
}

/** 响应数据 */
export type PagingDataRouting = {
  list?: Routing[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataRouting {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataRouting;
}

/** 工艺路线 */
export interface Routing {
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
  /** 工艺路线代码 */
  routingCode?: string;
  /** 工艺路线名称 */
  routingName?: string;
  /** 工艺路线描述 */
  routingDesc?: string;
}

/** 响应数据 */
export type PagingDataProcess = {
  list?: Process[];
  /** @format int32 */
  total?: number;
} | null;

/** 工序 */
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
  /** 工序代码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 工序描述 */
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
  /** 工序 */
  data?: Process;
}

export interface ProcessVO {
  /** 工序代码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 工序描述 */
  processDesc?: string;
  /**
   * 工序状态
   * @format int32
   */
  state?: number;
}

/** 工单排产表 */
export interface MoSchedule {
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
  /** 工单ID */
  moId?: string;
  mitemId?: string;
  /** 工单类型 */
  moClass?: string;
  /** 销售订单 */
  soNo?: string;
  /**
   * 销售订单行号
   * @format int32
   */
  soSeq?: number;
  /**
   * 是否暂挂
   * @format int32
   */
  isHold?: number;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 下线数量
   * @format int32
   */
  offlineQty?: number;
  /**
   * 完工数量
   * @format int32
   */
  completedQty?: number;
  /**
   * 入库数量
   * @format int32
   */
  stockinQty?: number;
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
  warehouseId?: string;
  parentMoId?: string;
  workshopId?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /** 工单来源 */
  moSource?: string;
  workcenterId?: string;
  /**
   * 排产日期
   * @format date-time
   */
  datetimeSche?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  routingRevisionId?: string;
  /** 排产工单 */
  scheCode?: string;
}

/** 响应数据 */
export type PagingDataMoSchedule = {
  list?: MoSchedule[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMoSchedule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMoSchedule;
}

/** 通用响应类 */
export interface ResultMoSchedule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 工单排产表 */
  data?: MoSchedule;
}

/** 工单表 */
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
  /** 工单名称 */
  moCode?: string;
  mitemId?: string;
  /** 工单类型 */
  moClass?: string;
  /** 销售订单 */
  soNo?: string;
  /**
   * 销售订单行号
   * @format int32
   */
  soSeq?: number;
  /**
   * 是否暂挂
   * @format int32
   */
  isHold?: number;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 下线数量
   * @format int32
   */
  offlineQty?: number;
  /**
   * 完工数量
   * @format int32
   */
  completedQty?: number;
  /**
   * 入库数量
   * @format int32
   */
  stockinQty?: number;
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
  /**
   * 工单关闭时间
   * @format date-time
   */
  datetimeMoClose?: string;
  warehouseId?: string;
  parentMoId?: string;
  workshopId?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /** 工单来源 */
  moSource?: string;
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
  /** 工单表 */
  data?: Mo;
}

/** 通用响应类 */
export interface ResultWorkcenterVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 工作中心显示 */
  data?: WorkcenterVO;
}

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  workstationAuth: {
    /**
     * No description
     *
     * @tags 工站权限
     * @name Save
     * @summary 保存工站权限
     * @request POST:/workstationAuth/save
     * @secure
     */
    save: (data: WorkstationAuthSearch) =>
      http.request<ResultObject['data']>(`/api/control/workstationAuth/save`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name Remove
     * @summary 删除工站权限
     * @request POST:/workstationAuth/remove
     * @secure
     */
    remove: (data: WorkstationAuthSearch) =>
      http.request<ResultObject['data']>(`/api/control/workstationAuth/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name RemoveBatch
     * @summary 批量删除工站权限
     * @request POST:/workstationAuth/removeBatch
     * @secure
     */
    removeBatch: (data: WorkstationAuthSearch) =>
      http.request<ResultObject['data']>(`/api/control/workstationAuth/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name Input
     * @summary 导入工站权限
     * @request POST:/workstationAuth/input
     * @secure
     */
    input: (data: WorkstationAuth) =>
      http.request<ResultObject['data']>(`/api/control/workstationAuth/input`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name GetUserList
     * @summary 获得用户列表
     * @request POST:/workstationAuth/getUserList
     * @secure
     */
    getUserList: (data: WorkstationAuthSearch) =>
      http.request<ResultPagingDataWorkstationAuthVO['data']>(`/api/control/workstationAuth/getUserList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name GetUserAuth
     * @summary 获得选中用户所拥有的工站权限
     * @request POST:/workstationAuth/getUserAuth
     * @secure
     */
    getUserAuth: (data: WorkstationAuthSearch) =>
      http.request<ResultPagingDataLong['data']>(`/api/control/workstationAuth/getUserAuth`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name Getlist
     * @summary 查询主界面信息
     * @request POST:/workstationAuth/getList
     * @secure
     */
    getlist: (data: WorkstationAuthSearch) =>
      http.request<ResultPagingDataWorkstationAuthVO['data']>(`/api/control/workstationAuth/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
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
      http.request<ResultPagingDataWorkstation['data']>(`/api/control/workstation/items`, {
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
     * @name Edit
     * @summary 工站修改
     * @request POST:/workstation/items/modify
     * @secure
     */
    edit: (data: Workstation) =>
      http.request<ResultObject['data']>(`/api/control/workstation/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name Add
     * @summary 工站新增
     * @request POST:/workstation/items/add
     * @secure
     */
    add: (data: Workstation) =>
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
     * @name Remove
     * @summary 删除工作中心
     * @request POST:/workcenter/remove
     * @secure
     */
    remove: (data: WorkcenterSearch) =>
      http.request<ResultObject['data']>(`/api/control/workcenter/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name Modify
     * @summary 编辑工作中心
     * @request POST:/workcenter/modify
     * @secure
     */
    modify: (data: Workcenter) =>
      http.request<ResultObject['data']>(`/api/control/workcenter/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name Modify2
     * @summary 修改多条工作中心
     * @request POST:/workcenter/modifyAll
     * @originalName modify
     * @duplicate
     * @secure
     */
    modify2: (data: WorkcenterSearch) =>
      http.request<ResultObject['data']>(`/api/control/workcenter/modifyAll`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name Search
     * @request POST:/workcenter/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataWorkcenter['data']>(`/api/control/workcenter/items`, {
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

    /**
     * No description
     *
     * @tags 工作中心
     * @name HaveChildCenter
     * @summary 查询是否有子工作中心
     * @request POST:/workcenter/haveChildCenter
     * @secure
     */
    haveChildCenter: (data: WorkcenterSearch) =>
      http.request<ResultPagingDataLong['data']>(`/api/control/workcenter/haveChildCenter`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name Getlist
     * @summary 查询工作中心
     * @request POST:/workcenter/getList
     * @secure
     */
    getlist: (data: WorkcenterSearch) =>
      http.request<ResultPagingDataWorkcenterVO['data']>(`/api/control/workcenter/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name GetChildCenter
     * @summary 查询子工作中心
     * @request POST:/workcenter/getChildCenter
     * @secure
     */
    getChildCenter: (data: WorkcenterSearch) =>
      http.request<ResultPagingDataWorkcenterVO['data']>(`/api/control/workcenter/getChildCenter`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name Add
     * @summary 新增工作中心
     * @request POST:/workcenter/add
     * @secure
     */
    add: (data: Workcenter) =>
      http.request<ResultObject['data']>(`/api/control/workcenter/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name GetTagCount
     * @summary 工作中心获取tag总记录数
     * @request GET:/workcenter/getTagCount
     * @secure
     */
    getTagCount: () =>
      http.request<ResultWorkcenterVO['data']>(`/api/control/workcenter/getTagCount`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name GetCategory
     * @summary 工作中心获取组织层级
     * @request GET:/workcenter/getCategory
     * @secure
     */
    getCategory: () =>
      http.request<ResultObject['data']>(`/api/control/workcenter/getCategory`, {
        method: 'GET',
      }),
  },
  routing: {
    /**
     * No description
     *
     * @tags 工艺路线
     * @name Search
     * @summary 工艺路线信息查询
     * @request POST:/routing/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataRouting['data']>(`/api/control/routing/items`, {
        method: 'POST',
        body: data as any,
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

    /**
     * No description
     *
     * @tags 工序
     * @name EditById
     * @summary 工序编辑
     * @request POST:/process/editById
     * @secure
     */
    editById: (data: ProcessVO) =>
      http.request<ResultObject['data']>(`/api/control/process/editById`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序
     * @name AddById
     * @summary 工序新增
     * @request POST:/process/addById
     * @secure
     */
    addById: (data: ProcessVO) =>
      http.request<ResultObject['data']>(`/api/control/process/addById`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultPagingDataMoSchedule['data']>(`/api/control/moSchedule/items`, {
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
     * @name UpdateMoRouting
     * @summary 工单的工艺路线修改
     * @request POST:/mo/updateMoRouting
     * @secure
     */
    updateMoRouting: (data: MoSchedule) =>
      http.request<ResultObject['data']>(`/api/control/mo/updateMoRouting`, {
        method: 'POST',
        body: data as any,
      }),

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
     * @name Getmolist
     * @summary 获取工单管理列表
     * @request GET:/mo/getmolist
     * @secure
     */
    getmolist: (query?: {
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
      moCode?: string;
      /** @default "" */
      moClass?: string;
      /** @default "" */
      status?: string;
      /** @default "" */
      datetimePlanStart?: string;
      /** @default "" */
      datetimePlanEnd?: string;
      /** @default "" */
      workshopCode?: string;
      /** @default "" */
      workCenterCode?: string;
      /** @default "" */
      rootingCode?: string;
      /** @default "" */
      categoryCode?: string;
      /** @default "" */
      mitemCode?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/control/mo/getmolist`, {
        method: 'GET',
        params: query,
      }),
  },
  routingRevision: {
    /**
     * No description
     *
     * @tags 工艺路线版本
     * @name GetRoutRevisionByRoutingCode
     * @summary 根据工艺路线编码获取有效的工艺路线版本信息
     * @request GET:/routingRevision/getRoutRevisionByRoutingCode
     * @secure
     */
    getRoutRevisionByRoutingCode: (query: { routingCode: string }) =>
      http.request<ResultObject['data']>(`/api/control/routingRevision/getRoutRevisionByRoutingCode`, {
        method: 'GET',
        params: query,
      }),
  },
  moLog: {
    /**
     * No description
     *
     * @tags 工单日志
     * @name GetMoLogListByMoCode
     * @summary 根据工单号获取工单日志信息
     * @request GET:/moLog/getMoLogListByMoId
     * @secure
     */
    getMoLogListByMoCode: (query: { moId: string }) =>
      http.request<ResultObject['data']>(`/api/control/moLog/getMoLogListByMoId`, {
        method: 'GET',
        params: query,
      }),
  },
  moBom: {
    /**
     * No description
     *
     * @tags 工单BOM
     * @name GetMoBomListByMoCode
     * @summary 根据工单号获取工单BOM信息
     * @request GET:/moBom/getMoBomListByMoCode
     * @secure
     */
    getMoBomListByMoCode: (query: { moId: string }) =>
      http.request<ResultObject['data']>(`/api/control/moBom/getMoBomListByMoCode`, {
        method: 'GET',
        params: query,
      }),
  },
};
