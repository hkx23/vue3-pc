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
}

export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN';
  value?: string;
  valuesList?: string[];
}

export interface SortParam {
  sortBy?: string;
  descending?: boolean;
}

/** 响应数据 */
export type PagingDataIncidentType = {
  list?: IncidentType[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIncidentType {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIncidentType;
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
  /** 前端按钮样式 */
  themeButton?: string;
  /** 前端按钮样式 */
  variantButton?: string;
}

/** 前端文件VO */
export interface FileVO {
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
  /** 单据号 */
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
  /** 状态 */
  status?: string;
  /** 异常原因 */
  incidentReason?: string;
  /** 处理方法 */
  dealMethod?: string;
  /** 处理详情 */
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
  /** 异常类型名称 */
  incidentTypeName?: string;
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
  orgId?: string;
  /** 异常模块 */
  incidentModule?: string;
  incidentTypeId?: string;
  /** 单据状态 */
  status?: string;
  /** 单据号 */
  billNo?: string;
  /**
   * 开始时间
   * @format date-time
   */
  timeCreateStart?: string;
  /**
   * 结束时间
   * @format date-time
   */
  timeCreateEnd?: string;
  /** 按日期汇总 */
  isDateSummary?: boolean;
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

/** 异常处理输出 */
export type IncidentDealAndonDailyVO = {
  date?: string;
  incidentTypeName?: string;
  incidentTypeNameArr?: string[];
  reportingObstaclesNumArr?: number[];
  closeBillNumArr?: number[];
  /** @format int32 */
  reportingObstaclesNum?: number;
  /** @format int32 */
  reportingObstaclesTotal?: number;
  /** @format int32 */
  closeBillNum?: number;
  /** @format int32 */
  closeBillTotal?: number;
  closeBillRate?: number;
  closeBillRateName?: string;
  /** @format int32 */
  processingTimeout?: number;
  processingTimeoutName?: string;
} | null;

/** 通用响应类 */
export interface ResultListIncidentDealAndonDailyVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: IncidentDealAndonDailyVO[] | null;
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
  /** 异常模块 */
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

/** 事件管理输出 */
export interface EventDTO {
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
  /** 事件类型 */
  eventType?: string;
  /** 事件来源 */
  eventSource?: string;
  conferenceResponsibilityId?: string;
  deptProposeId?: string;
  userProposeId?: string;
  /**
   * 提出时间
   * @format date-time
   */
  datetimePropose?: string;
  /**
   * 计划解决时间
   * @format date-time
   */
  datetimePlanSolve?: string;
  /**
   * 实际解决时间
   * @format date-time
   */
  datetimeActualSolve?: string;
  deptResponsibilityId?: string;
  userResponsibilityId?: string;
  supportGroupId?: string;
  moShceId?: string;
  /** 重要程度 */
  importantDegree?: string;
  /** 事件描述 */
  eventDesc?: string;
  /** 原因分析 */
  causeAnalysis?: string;
  /** 改善对策 */
  improveMeasure?: string;
  isOverdue?: string;
  /** 状态 */
  status?: string;
  /** 责任会议 */
  conferenceResponsibilityName?: string;
  /** 提出部门 */
  deptProposeName?: string;
  /** 提出人 */
  userProposeName?: string;
  /** 责任部门 */
  deptResponsibilityName?: string;
  /** 责任人 */
  userResponsibilityName?: string;
  /** 关联工单 */
  moShceCode?: string;
  /** 文件列表 */
  fileList?: EventFile[];
  /** 文件列表 */
  deleteFileList?: EventFile[];
}

/** 事件文件表 */
export interface EventFile {
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
  eventId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

/** 事件管理输出 */
export interface EventVO {
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
  /** 事件类型 */
  eventType?: string;
  /** 事件来源 */
  eventSource?: string;
  conferenceResponsibilityId?: string;
  deptProposeId?: string;
  userProposeId?: string;
  /**
   * 提出时间
   * @format date-time
   */
  datetimePropose?: string;
  /**
   * 计划解决时间
   * @format date-time
   */
  datetimePlanSolve?: string;
  /**
   * 实际解决时间
   * @format date-time
   */
  datetimeActualSolve?: string;
  deptResponsibilityId?: string;
  userResponsibilityId?: string;
  supportGroupId?: string;
  moShceId?: string;
  /** 重要程度 */
  importantDegree?: string;
  /** 事件描述 */
  eventDesc?: string;
  /** 原因分析 */
  causeAnalysis?: string;
  /** 改善对策 */
  improveMeasure?: string;
  isOverdue?: string;
  /** 状态 */
  status?: string;
  /** 责任会议 */
  conferenceResponsibilityName?: string;
  /** 提出部门 */
  deptProposeName?: string;
  /** 提出人 */
  userProposeName?: string;
  /** 责任部门 */
  deptResponsibilityName?: string;
  /** 责任人 */
  userResponsibilityName?: string;
  /** 关联工单 */
  moShceCode?: string;
  /** 事件来源名称 */
  eventSourceName?: string;
  /** 事件类型名称 */
  eventTypeName?: string;
  /** 事件状态名称 */
  statusName?: string;
  /** 重要程度名称 */
  importantDegreeName?: string;
}

/** 响应数据 */
export type PagingDataEventVO = {
  list?: EventVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataEventVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataEventVO;
}

/** 通用响应类 */
export interface ResultEventDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 事件管理输出 */
  data?: EventDTO;
}

/** 通用响应类 */
export interface ResultListEventFile {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: EventFile[] | null;
}

export interface ConferenceLayoutSearch {
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
  /** 布局维度 */
  layoutDimension?: string;
  /** 布局分类 */
  layoutType?: string;
  /** 布局代码 */
  layoutCode?: string;
}

export interface ConferenceLayoutVO {
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
  /** 布局代码 */
  layoutCode?: string;
  /** 布局名称 */
  layoutName?: string;
  /** 布局内容 */
  layoutBody?: string;
  /** 布局尺寸 */
  layoutSize?: string;
  /** 布局分类名称 */
  layoutTypeName?: string;
  /** 布局维度名称 */
  layoutDimensionName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 修改人名称 */
  modifierName?: string;
  /** 有效值转换 */
  isState?: boolean;
}

/** 响应数据 */
export type PagingDataConferenceLayoutVO = {
  list?: ConferenceLayoutVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataConferenceLayoutVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataConferenceLayoutVO;
}

export interface ConferenceLayoutDTO {
  conferenceLayoutVO?: ConferenceLayoutVO;
  /** id集合 */
  ids?: string[];
}

export interface ConferenceIndexSearch {
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
  /** 指标维度 */
  indexDimension?: string;
  /** 指标分类 */
  indexType?: string;
  /** 指标代码 */
  indexCode?: string;
}

export interface ConferenceIndexVO {
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
  /** 指标代码 */
  indexCode?: string;
  /** 指标名称 */
  indexName?: string;
  /** 指标描述 */
  indexDesc?: string;
  /** 指标分类 */
  indexType?: string;
  /** 指标维度 */
  indexDimension?: string;
  /** 缩略图地址 */
  indexIconPath?: string;
  /** 缩略图名称 */
  indexIconName?: string;
  /** 指标地址 */
  indexUrl?: string;
  /** 指标分类名称 */
  indexTypeName?: string;
  /** 指标维度名称 */
  indexDimensionName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 修改人名称 */
  modifierName?: string;
  /** 有效值转换 */
  isState?: boolean;
}

/** 响应数据 */
export type PagingDataConferenceIndexVO = {
  list?: ConferenceIndexVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataConferenceIndexVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataConferenceIndexVO;
}

export interface ConferenceIndexDTO {
  conferenceIndexVO?: ConferenceIndexVO;
  /** id集合 */
  ids?: string[];
}

/** 会议表 */
export interface Conference {
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
  /** 会议编码 */
  conferenceCode?: string;
  /** 会议名称 */
  conferenceName?: string;
  conferenceTemplateId?: string;
  /** 模板维度 */
  templateDimension?: string;
}

/** 响应数据 */
export type PagingDataConference = {
  list?: Conference[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataConference {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataConference;
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

/** 异常处理输出 */
export interface IncidentDealLogVO {
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
  /** 处理事件 */
  dealEvent?: string;
  /**
   * 处理时间
   * @format date-time
   */
  datetimeDeal?: string;
  userDealId?: string;
  supportGroupId?: string;
  /** 备注 */
  memo?: string;
  /** 异常原因 */
  incidentReason?: string;
  /** 处理方法 */
  dealMethod?: string;
  /** 处理详情 */
  dealDetail?: string;
  /** 显示名 */
  displayName?: string;
  /** 最后处理用户名 */
  curUserName?: string;
  /** 最后处理显示名 */
  curDisplayName?: string;
  /** 异常模块 */
  incidentModule?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 异常类型名称 */
  incidentTypeName?: string;
  /** 异常描述 */
  incidentMemo?: string;
  statusName?: string;
}

/** 响应数据 */
export type PagingDataIncidentDealLogVO = {
  list?: IncidentDealLogVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIncidentDealLogVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIncidentDealLogVO;
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
     * @name Search
     * @request POST:/incidentType/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataIncidentType['data']>(`/api/daily/incidentType/items`, {
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
     * @name GetList
     * @summary 安灯单据报表查询
     * @request POST:/incidentDeal/getList
     * @secure
     */
    getList: (data: IncidentDealSearch) =>
      http.request<ResultPagingDataIncidentDealVO['data']>(`/api/daily/incidentDeal/getList`, {
        method: 'POST',
        body: data as any,
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
     * @name GetAndonDailyList
     * @summary 安灯日报表查询
     * @request POST:/incidentDeal/getAndonDailyList
     * @secure
     */
    getAndonDailyList: (data: IncidentDealSearch) =>
      http.request<ResultListIncidentDealAndonDailyVO['data']>(`/api/daily/incidentDeal/getAndonDailyList`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultObject['data']>(`/api/daily/importManage/batchImportData`, {
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
      http.request<ResultListMapStringObject['data']>(`/api/daily/importManage/batchDynamicQuery`, {
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
      http.request<ResultBoolean['data']>(`/api/daily/importManage/CheckUniqueExist`, {
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
      http.request<ResultListDataTableVO['data']>(`/api/daily/importManage/tables`, {
        method: 'GET',
      }),
  },
  event: {
    /**
     * No description
     *
     * @tags 事件表
     * @name UpdateStatus
     * @summary 更新事件状态
     * @request POST:/event/updateStatus
     * @secure
     */
    updateStatus: (data: EventDTO) =>
      http.request<ResultObject['data']>(`/api/daily/event/updateStatus`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 事件表
     * @name Search
     * @summary 获取事件列表
     * @request POST:/event/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataEventVO['data']>(`/api/daily/event/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 事件表
     * @name GetItemById
     * @summary 根据ID获取事件信息
     * @request POST:/event/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultEventDTO['data']>(`/api/daily/event/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 事件表
     * @name GetFileListByItemId
     * @summary 根据ID获取事件信息
     * @request POST:/event/files/{id}
     * @secure
     */
    getFileListByItemId: (id: string) =>
      http.request<ResultListEventFile['data']>(`/api/daily/event/files/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 事件表
     * @name Edit
     * @summary 编辑事件
     * @request POST:/event/edit
     * @secure
     */
    edit: (data: EventDTO) =>
      http.request<ResultObject['data']>(`/api/daily/event/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 事件表
     * @name DelById
     * @summary 删除事件
     * @request POST:/event/delById/{id}
     * @secure
     */
    delById: (id: string) =>
      http.request<ResultObject['data']>(`/api/daily/event/delById/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 事件表
     * @name Add
     * @summary 新增事件
     * @request POST:/event/add
     * @secure
     */
    add: (data: EventDTO) =>
      http.request<ResultObject['data']>(`/api/daily/event/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  conferenceLayout: {
    /**
     * No description
     *
     * @tags 会议布局表
     * @name List
     * @summary 获取会议布局
     * @request POST:/conferenceLayout/list
     * @secure
     */
    list: (data: ConferenceLayoutSearch) =>
      http.request<ResultPagingDataConferenceLayoutVO['data']>(`/api/daily/conferenceLayout/list`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议布局表
     * @name Edit
     * @summary 编辑会议布局
     * @request POST:/conferenceLayout/edit
     * @secure
     */
    edit: (data: ConferenceLayoutDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceLayout/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议布局表
     * @name DeleteList
     * @summary 删除会议布局
     * @request POST:/conferenceLayout/deleteList
     * @secure
     */
    deleteList: (data: ConferenceLayoutDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceLayout/deleteList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议布局表
     * @name Cancel
     * @summary 设置会议布局有效或失效
     * @request POST:/conferenceLayout/cancel
     * @secure
     */
    cancel: (data: ConferenceLayoutDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceLayout/cancel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议布局表
     * @name Add
     * @summary 新增会议布局
     * @request POST:/conferenceLayout/add
     * @secure
     */
    add: (data: ConferenceLayoutDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceLayout/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  conferenceIndex: {
    /**
     * No description
     *
     * @tags 会议指标表
     * @name List
     * @summary 获取会议指标
     * @request POST:/conferenceIndex/list
     * @secure
     */
    list: (data: ConferenceIndexSearch) =>
      http.request<ResultPagingDataConferenceIndexVO['data']>(`/api/daily/conferenceIndex/list`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议指标表
     * @name Edit
     * @summary 编辑会议指标
     * @request POST:/conferenceIndex/edit
     * @secure
     */
    edit: (data: ConferenceIndexDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceIndex/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议指标表
     * @name DeleteList
     * @summary 删除会议指标
     * @request POST:/conferenceIndex/deleteList
     * @secure
     */
    deleteList: (data: ConferenceIndexDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceIndex/deleteList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议指标表
     * @name Cancel
     * @summary 设置会议指标有效或失效
     * @request POST:/conferenceIndex/cancel
     * @secure
     */
    cancel: (data: ConferenceIndexDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceIndex/cancel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 会议指标表
     * @name Add
     * @summary 新增会议指标
     * @request POST:/conferenceIndex/add
     * @secure
     */
    add: (data: ConferenceIndexDTO) =>
      http.request<ResultObject['data']>(`/api/daily/conferenceIndex/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  conference: {
    /**
     * No description
     *
     * @tags 会议表
     * @name Search
     * @summary 获取会议列表
     * @request POST:/conference/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataConference['data']>(`/api/daily/conference/items`, {
        method: 'POST',
        body: data as any,
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
  incidentDealLog: {
    /**
     * No description
     *
     * @tags 安灯异常处理日志表
     * @name GetList
     * @request GET:/incidentDealLog/getList
     * @secure
     */
    getList: (query: {
      billNo: string;
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
    }) =>
      http.request<ResultPagingDataIncidentDealLogVO['data']>(`/api/daily/incidentDealLog/getList`, {
        method: 'GET',
        params: query,
      }),
  },
};
