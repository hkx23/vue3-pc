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
  incidentCode?: string;
  incidentName?: string;
  incidentModule?: string;
}

/** 领域对象扩展属性分类 */
export interface IncidentTypeVO {
  id?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 异常代码 */
  incidentCode?: string;
  /** 异常名称 */
  incidentName?: string;
  /** 异常模块 */
  incidentModule?: string;
  /** 创建人 */
  creatorName?: string;
  /** 异常模块名称 */
  incidentModuleName?: string;
  /** 子层级 */
  children?: IncidentTypeVO[];
  /** 前端按钮样式 */
  themeButton?: string;
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

/** 通用响应类 */
export interface ResultArrayListIncidentTypeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IncidentTypeVO[] | null;
}

/** 领域对象扩展属性分类 */
export type IncidentTypeUserVO = {
  /** 异常模块 */
  incidentModule?: string;
  /** 异常模块名称 */
  incidentModuleName?: string;
  /** 子层级 */
  childrenSupportGroup?: SupportGroupVO[];
} | null;

/** 通用响应类 */
export interface ResultArrayListIncidentTypeUserVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IncidentTypeUserVO[] | null;
}

/** 处理组与用户VO */
export interface SupportGroupInUserVO {
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
  supportGroupId?: string;
  userId?: string;
  /** 处理组代码 */
  supportGroupCode?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 处理组顺序 */
  levelSeq?: string;
  /** 用户名 */
  userName?: string;
  /** 显示名 */
  displayName?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobilePhone?: string;
  /** 前端按钮样式 */
  themeButton?: string;
}

/** 处理组VO */
export interface SupportGroupVO {
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
  /** 处理组代码 */
  supportGroupCode?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 处理组类型 */
  supportGroupType?: string;
  /** 子层级 */
  childrenUser?: SupportGroupInUserVO[];
}

/** 安灯警报配置 */
export interface AlertCfgVO {
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
  alertType?: string;
  /**
   * 响应时间
   * @format int32
   */
  sla?: number;
  /**
   * 处理时间
   * @format int32
   */
  ola?: number;
  /** 前端按钮样式 */
  themeButton?: string;
  /** 前端按钮样式 */
  variantButton?: string;
}

/** 前端文件VO */
export interface FileVO {
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

/** 异常处理输出 */
export interface IncidentDealVO {
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
  billNo?: string;
  incidentTypeId?: string;
  orgId?: string;
  workcenterId?: string;
  alertCfgId?: string;
  curSupportGroupId?: string;
  curUserId?: string;
  /**
   * 是否允许转单
   * @format int32
   */
  isSolveOvertime?: number;
  /** 异常备注 */
  memo?: string;
  status?: string;
  incidentReason?: string;
  dealMethod?: string;
  dealDetail?: string;
  /** 用户名 */
  userName?: string;
  /** 显示名 */
  displayName?: string;
  /** 最后处理用户名 */
  curUserName?: string;
  /** 最后处理显示名 */
  curDisplayName?: string;
  /** 工作中心编码 */
  workcenterCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  localId?: string;
  /** 当前组织或者设备编码 */
  localCode?: string;
  /** 当前组织或者设备名称 */
  localName?: string;
  /** 当前类型 */
  localType?: string;
  /** 领域对象扩展属性分类 */
  selectIncidentTypeVO?: IncidentTypeVO;
  /** 异常名称 */
  incidentName?: string;
  /** 异常代码 */
  incidentCode?: string;
  /** 异常模块 */
  incidentModule?: string;
  /** 安灯警报配置 */
  selectAlertCfgVO?: AlertCfgVO;
  /** 警报类型 */
  alertType?: string;
  /**
   * 响应时间
   * @format int32
   */
  sla?: number;
  /**
   * 处理时间
   * @format int32
   */
  ola?: number;
  /** 处理组代码 */
  supportGroupCode?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 处理组类型 */
  supportGroupType?: string;
  /** 报障组织 */
  orgCode?: string;
  /** 报障组织名称 */
  orgName?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobilePhone?: string;
  /** 单据状态名称 */
  statusName?: string;
  /** 上传的图片 */
  uploadFiles?: FileVO[];
  /** 报障图片 */
  submitUploadFiles?: FileVO[];
  /** 处理后图片 */
  processedUploadFiles?: FileVO[];
  /** 异常模块名称 */
  incidentModuleName?: string;
  /**
   * 异常模块数量
   * @format int32
   */
  incidentModuleNum?: number;
  /**
   * 异常总数
   * @format int32
   */
  incidentModuleTotal?: number;
  /**
   * 异常模块占比
   * @format double
   */
  incidentModuleProportion?: number;
}

export interface IncidentDealSearch {
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
  /** 创建人 */
  creator?: string;
  /** 报障单状态 */
  statusList?: string[];
  curUserId?: string;
  /** 是否查询处理组 */
  isSearchSupportGroup?: boolean;
}

/** 响应数据 */
export type PagingDataIncidentDealVO = {
  list?: IncidentDealVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIncidentDealVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIncidentDealVO;
}

/** 领域对象扩展属性分类 */
export type IncidentDealSumVO = {
  dealNum1?: string;
  dealNum2?: string;
  dealNum3?: string;
} | null;

/** 通用响应类 */
export interface ResultIncidentDealSumVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 领域对象扩展属性分类 */
  data?: IncidentDealSumVO;
}

/** 通用响应类 */
export interface ResultIncidentDealVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 异常处理输出 */
  data?: IncidentDealVO;
}

export interface IncidentCfgSearch {
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
  /** 异常配置-状态 */
  state?: number[];
  id?: string;
  /** 多个id */
  ids?: string[];
}

/** 安灯异常配置表 */
export interface IncidentCfg {
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
  orgId?: string;
  incidentModule?: string;
  supportGroupId?: string;
  /**
   * 层级序号
   * @format int32
   */
  levelSeq?: number;
  /**
   * 是否允许转单
   * @format int32
   */
  isAllowTransfer?: number;
}

/** 领域对象扩展属性分类 */
export interface IncidentCfgVO {
  id?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  orgId?: string;
  /** 安灯组织名称 */
  orgName?: string;
  supportGroupId?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 处理组编码 */
  supportGroupCode?: string;
  /** 异常模块 */
  incidentModule?: string;
  /** 异常模块名称 */
  incidentModuleName?: string;
  userId?: string;
  /** 处理组用户名 */
  userName?: string;
  /** 处理组用户显示名 */
  displayName?: string;
  /**
   * 层级序号
   * @format int32
   */
  levelSeq?: number;
  /**
   * 是否允许转单
   * @format int32
   */
  isAllowTransfer?: number;
}

/** 响应数据 */
export type PagingDataIncidentCfgVO = {
  list?: IncidentCfgVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIncidentCfgVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIncidentCfgVO;
}

/** 安灯警报配置表 */
export interface AlertCfg {
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
  alertType?: string;
  /**
   * 响应时间
   * @format int32
   */
  sla?: number;
  /**
   * 处理时间
   * @format int32
   */
  ola?: number;
}

export interface AlertCfgSearch {
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
  /** 异常类型-状态 */
  state?: number[];
  id?: string;
  /** 多个id */
  ids?: string[];
}

/** 响应数据 */
export type PagingDataAlertCfgVO = {
  list?: AlertCfgVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataAlertCfgVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataAlertCfgVO;
}

/** 响应数据 */
export type PagingDataAlertCfg = {
  list?: AlertCfg[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataAlertCfg {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataAlertCfg;
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

/** 通用响应类 */
export interface ResultListIncidentDealVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IncidentDealVO[] | null;
}

/** 响应数据 */
export type PagingDataSupportGroup = {
  list?: SupportGroup[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSupportGroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSupportGroup;
}

/** 处理组表 */
export interface SupportGroup {
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
  /** 处理组代码 */
  supportGroupCode?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 处理组类型 */
  supportGroupType?: string;
}

/** 组织架构表 */
export interface Org {
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
  /** 组织编号 */
  orgCode?: string;
  /** 组织名称 */
  orgName?: string;
  /** 组织描述 */
  orgDesc?: string;
  parentOrgId?: string;
  /** 组织层级代码 */
  levelCode?: string;
  /**
   * 是否生效，1是，0否
   * @format int32
   */
  isActive?: number;
}

/** 响应数据 */
export type PagingDataOrg = {
  list?: Org[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOrg {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOrg;
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
     * @name GetIncidentTypeGroupIncidentModule
     * @summary 根据异常模块分组查询异常类型
     * @request POST:/incidentType/getIncidentTypeGroupIncidentModule
     * @secure
     */
    getIncidentTypeGroupIncidentModule: (data: IncidentTypeSearch) =>
      http.request<ResultArrayListIncidentTypeVO['data']>(
        `/api/daily/incidentType/getIncidentTypeGroupIncidentModule`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 安灯异常类型表
     * @name GetIncidentTypeBySupportGroupInUser
     * @summary 根据异常模块查询对应的处理组和用户信息
     * @request POST:/incidentType/getIncidentTypeBySupportGroupInUser
     * @secure
     */
    getIncidentTypeBySupportGroupInUser: (data: IncidentTypeSearch) =>
      http.request<ResultArrayListIncidentTypeUserVO['data']>(
        `/api/daily/incidentType/getIncidentTypeBySupportGroupInUser`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

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
  incidentDeal: {
    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealTransfering
     * @summary 安灯报障单据更新转单待处理（转单）状态
     * @request POST:/incidentDeal/updateIncidentDealTransfering
     * @secure
     */
    updateIncidentDealTransfering: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealTransfering`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealReject
     * @summary 安灯报障单据更新已报障（驳回）状态
     * @request POST:/incidentDeal/updateIncidentDealReject
     * @secure
     */
    updateIncidentDealReject: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealReject`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealProcessing
     * @summary 安灯报障单据更新待处理（响应）状态
     * @request POST:/incidentDeal/updateIncidentDealProcessing
     * @secure
     */
    updateIncidentDealProcessing: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealProcessing`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealProcessed
     * @summary 安灯报障单据更新已处理（解决）状态
     * @request POST:/incidentDeal/updateIncidentDealProcessed
     * @secure
     */
    updateIncidentDealProcessed: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealProcessed`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealLevelUp
     * @summary 安灯报障单据更新待处理（升级）状态
     * @request POST:/incidentDeal/updateIncidentDealLevelUp
     * @secure
     */
    updateIncidentDealLevelUp: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealLevelUp`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealClose
     * @summary 安灯报障单据更新已关闭（验收）状态
     * @request POST:/incidentDeal/updateIncidentDealClose
     * @secure
     */
    updateIncidentDealClose: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealClose`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name UpdateIncidentDealCanceled
     * @summary 安灯报障单据更新取消（超时相应）状态
     * @request POST:/incidentDeal/updateIncidentDealCanceled
     * @secure
     */
    updateIncidentDealCanceled: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/updateIncidentDealCanceled`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name GetVoList
     * @summary 查询报障单据
     * @request POST:/incidentDeal/getVoList
     * @secure
     */
    getVoList: (data: IncidentDealSearch) =>
      http.request<ResultPagingDataIncidentDealVO['data']>(`/api/daily/incidentDeal/getVoList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name GetVoListByUser
     * @summary 查询报障单据（当前用户单据）
     * @request POST:/incidentDeal/getVoListByUser
     * @secure
     */
    getVoListByUser: (data: IncidentDealSearch) =>
      http.request<ResultPagingDataIncidentDealVO['data']>(`/api/daily/incidentDeal/getVoListByUser`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name GetVoListByTimeOut
     * @summary 查询报障单据（当前用户的超时单据）
     * @request POST:/incidentDeal/getVoListByTimeOut
     * @secure
     */
    getVoListByTimeOut: (data: IncidentDealSearch) =>
      http.request<ResultPagingDataIncidentDealVO['data']>(`/api/daily/incidentDeal/getVoListByTimeOut`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name GetSumList
     * @summary 查询报障单据（汇总单据）
     * @request POST:/incidentDeal/getSumList
     * @secure
     */
    getSumList: () =>
      http.request<ResultIncidentDealSumVO['data']>(`/api/daily/incidentDeal/getSumList`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name GetIncidentDealDtl
     * @summary 获取报障明细
     * @request POST:/incidentDeal/getIncidentDealDtl
     * @secure
     */
    getIncidentDealDtl: (query: { billNo: string }) =>
      http.request<ResultIncidentDealVO['data']>(`/api/daily/incidentDeal/getIncidentDealDtl`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name AddIncidentDeal
     * @summary 提交报障单
     * @request POST:/incidentDeal/addIncidentDeal
     * @secure
     */
    addIncidentDeal: (data: IncidentDealVO) =>
      http.request<ResultObject['data']>(`/api/daily/incidentDeal/addIncidentDeal`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常处理表
     * @name GetIncidentModuleProportion
     * @summary 工作台指标安灯单据状态
     * @request GET:/incidentDeal/getIncidentModuleProportion
     * @secure
     */
    getIncidentModuleProportion: () =>
      http.request<ResultListIncidentDealVO['data']>(`/api/daily/incidentDeal/getIncidentModuleProportion`, {
        method: 'GET',
      }),
  },
  incidentCfg: {
    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name RemoveIncidentCfg
     * @summary 删除异常类型
     * @request POST:/incidentCfg/removeIncidentCfg
     * @secure
     */
    removeIncidentCfg: (data: IncidentCfgSearch) =>
      http.request<ResultObject['data']>(`/api/daily/incidentCfg/removeIncidentCfg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name RemoveIncidentCfgBatch
     * @summary 批量删除异常类型
     * @request POST:/incidentCfg/removeIncidentCfgBatch
     * @secure
     */
    removeIncidentCfgBatch: (data: IncidentCfgSearch) =>
      http.request<ResultObject['data']>(`/api/daily/incidentCfg/removeIncidentCfgBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name ModifyIncidentType
     * @summary 编辑异常配置
     * @request POST:/incidentCfg/modifyIncidentCfg
     * @secure
     */
    modifyIncidentType: (data: IncidentCfg) =>
      http.request<ResultObject['data']>(`/api/daily/incidentCfg/modifyIncidentCfg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name GetList
     * @summary 查询异常配置
     * @request POST:/incidentCfg/getList
     * @secure
     */
    getList: (data: IncidentCfgSearch) =>
      http.request<ResultPagingDataIncidentCfgVO['data']>(`/api/daily/incidentCfg/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name AddIncidentCfg
     * @summary 新增异常配置
     * @request POST:/incidentCfg/addIncidentCfg
     * @secure
     */
    addIncidentCfg: (data: IncidentCfg) =>
      http.request<ResultObject['data']>(`/api/daily/incidentCfg/addIncidentCfg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name GetSupportGroup
     * @summary 获取新增页面下拉列表(处理组)
     * @request GET:/incidentCfg/getSupportGroup
     * @secure
     */
    getSupportGroup: () =>
      http.request<ResultPagingDataSupportGroup['data']>(`/api/daily/incidentCfg/getSupportGroup`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name GetOrg
     * @summary 获取新增页面下拉列表(组织)
     * @request GET:/incidentCfg/getOrg
     * @secure
     */
    getOrg: () =>
      http.request<ResultPagingDataOrg['data']>(`/api/daily/incidentCfg/getOrg`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 安灯异常配置表
     * @name GetIncidentModule
     * @summary 获取新增页面下拉列表(异常模块)
     * @request GET:/incidentCfg/getIncidentModule
     * @secure
     */
    getIncidentModule: () =>
      http.request<ResultPagingDataParam['data']>(`/api/daily/incidentCfg/getIncidentModule`, {
        method: 'GET',
      }),
  },
  alertCfg: {
    /**
     * No description
     *
     * @tags 安灯警报配置表
     * @name RemoveAlertCfgBatch
     * @summary 批量删除异常类型
     * @request POST:/alertCfg/removeAlertCfgBatch
     * @secure
     */
    removeAlertCfgBatch: (data: IncidentTypeSearch) =>
      http.request<ResultObject['data']>(`/api/daily/alertCfg/removeAlertCfgBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯警报配置表
     * @name ModifyAlertCfg
     * @summary 编辑异常类型
     * @request POST:/alertCfg/modifyAlertCfg
     * @secure
     */
    modifyAlertCfg: (data: AlertCfg) =>
      http.request<ResultObject['data']>(`/api/daily/alertCfg/modifyAlertCfg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯警报配置表
     * @name GetVoList
     * @summary 查询预警机制
     * @request POST:/alertCfg/getVoList
     * @secure
     */
    getVoList: (data: AlertCfgSearch) =>
      http.request<ResultPagingDataAlertCfgVO['data']>(`/api/daily/alertCfg/getVoList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯警报配置表
     * @name GetList
     * @summary 查询预警机制
     * @request POST:/alertCfg/getList
     * @secure
     */
    getList: (data: AlertCfgSearch) =>
      http.request<ResultPagingDataAlertCfg['data']>(`/api/daily/alertCfg/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 安灯警报配置表
     * @name AddAlertCfg
     * @summary 新增异常类型
     * @request POST:/alertCfg/addAlertCfg
     * @secure
     */
    addAlertCfg: (data: AlertCfg) =>
      http.request<ResultObject['data']>(`/api/daily/alertCfg/addAlertCfg`, {
        method: 'POST',
        body: data as any,
      }),
  },
};
