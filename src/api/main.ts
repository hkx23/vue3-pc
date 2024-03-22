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

/** 工艺路线图形化 */
export interface Graph {
  nodes?: GraphNode[];
  edges?: GraphEdge[];
}

export interface GraphBom {
  id?: string;
  categoryCode?: string;
  categoryName?: string;
  categoryDesc?: string;
  keyPart?: boolean;
}

export interface GraphEdge {
  id?: string;
  sourceNodeId?: string;
  targetNodeId?: string;
  endPoint?: GraphPoint;
  startPoint?: GraphPoint;
  pointsList?: GraphPoint[];
  text?: GraphText;
  type?: string;
}

export interface GraphNode {
  id?: string;
  properties?: GraphProperties;
  text?: GraphText;
  type?: string;
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
}

export interface GraphPoint {
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
}

export interface GraphProperties {
  id?: string;
  processId?: string;
  processName?: string;
  /** @format int32 */
  processStep?: number;
  processType?: string;
  bomList?: GraphBom[];
  backgroundColor?: string;
}

export interface GraphText {
  value?: string;
  /** @format int32 */
  x?: number;
  /** @format int32 */
  y?: number;
}

/** 工艺路线实体 */
export interface RoutingDTO {
  /** 工艺路线编码 */
  routingCode?: string;
  /** 工艺路线名称 */
  routingName?: string;
  /** 工艺路线描述 */
  routingDesc?: string;
  /** 工艺路线类型 */
  routingType?: string;
  /**
   * 工艺路线版本
   * @format int32
   */
  routingVersion?: number;
  /**
   * 启用时间
   * @format date-time
   */
  enableDate?: string;
  /**
   * 失效时间
   * @format date-time
   */
  invailDate?: string;
  /** 工艺路线图形化 */
  routingGraph?: Graph;
  /** 工艺路线图形化JSON */
  routingGraphStr?: string;
  /**
   * 工艺路线状态
   * @format int32
   */
  state?: number;
}

/** 产品包装规则明细 */
export interface ProductPackRuleDtl {
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
  packRuleId?: string;
  /** 包装类型 */
  packType?: string;
  /**
   * 包装数量
   * @format int32
   */
  packQty?: number;
  /** 单位 */
  uom?: string;
  parentPackId?: string;
  /**
   * 包装层级
   * @format int32
   */
  packLevel?: number;
}

/** 产品包装规则 */
export interface ProductPackRule {
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
  /** 包装规则代码 */
  packRuleCode?: string;
  /** 包装规则名称 */
  packRuleName?: string;
}

/** 标签模板关联 */
export interface PrintTmplMap {
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
  printTmplId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
}

/** 打印模板实体 */
export interface PrintTmplDTO {
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
  tmplCode?: string;
  tmplName?: string;
  tmplDesc?: string;
  tmplBodyPath?: string;
  tmplCategory?: string;
  tmplType?: string;
  /** 打印模板文件 */
  fileContent?: string;
  /** 打印模板下载地址 */
  fileUrl?: string;
}

/** 组织层级表 */
export interface OrgLevel {
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
  /** 层级编号 */
  levelCode?: string;
  /** 层级名称 */
  levelName?: string;
  parentLevelId?: string;
  /**
   * 层级序列
   * @format int32
   */
  levelSeq?: number;
  /**
   * 区隔标记，1表示库存组织，默认0
   * @format int32
   */
  divisionFlag?: number;
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

/** 筛选字段 */
export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN';
  value?: string;
  valuesList?: string[];
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
  /** 需要新增的关系 */
  inseartList?: string[];
  /** 需要删除的关系 */
  removeList?: string[];
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
  /** 用户显示名 */
  userDisplayName?: string;
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
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
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
  /** @format int32 */
  state?: number;
  parentId?: string;
  category?: string;
  sorts?: SortParam[];
  filters?: Filter[];
  customerConditions?: Filter[];
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
  /**
   * 是否暂挂
   * @format int32
   */
  isHold?: number;
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
  /** 模糊关键词 */
  keyword?: string;
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
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 修改人 */
  modifierName?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  processId?: string;
  workcenterId?: string;
}

/** 品质控制-工站 */
export interface WorkstationQcHoldSearch {
  /** 按唯一键集合查询 */
  keyList?: string[];
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
  workshopId?: string;
  processId?: string;
  workCenterId?: string;
  workstationId?: string;
  equipmentId?: string;
  /** @format int32 */
  isHold?: number;
}

/** 响应数据 */
export type PagingDataWorkstationQcHoldVO = {
  list?: WorkstationQcHoldVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkstationQcHoldVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkstationQcHoldVO;
}

/** 品质控制-工站 */
export interface WorkstationQcHoldVO {
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
  /**
   * 是否暂挂
   * @format int32
   */
  isHold?: number;
  /** 车间编码 */
  workshopCode?: string;
  /** 车间名称 */
  workshopName?: string;
  workCenterCode?: string;
  workCenterName?: string;
  processCode?: string;
  processName?: string;
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
  /**
   * 工作中心-类别
   * @format int32
   */
  category?: number;
  /** 工作中心编码名称模糊查询 */
  workcenterword?: string;
  workshopId?: string;
  /** 工作中心-状态 */
  state?: number[];
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
  workshopId?: string;
  /** 所属车间编码 */
  workshopCode?: string;
  /** 所属车间名称 */
  workshopName?: string;
  /** 工作中心地点 */
  wcLocation?: string;
  parentWcId?: string;
  /** 父工作中心编码 */
  parentWcCode?: string;
  /** 父工作中心名称 */
  parentWcName?: string;
  /** 负责人名称 */
  wcOwner?: string;
  wcObjectId?: string;
  /** 关联设备编码 */
  wcObjectCode?: string;
  /** 关联设备名称 */
  wcObjectName?: string;
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
   * @format int64
   */
  area?: number;
  /**
   * 工作中心-生产线总记录数
   * @format int64
   */
  line?: number;
  /**
   * 工作中心-工段总记录数
   * @format int64
   */
  section?: number;
  /**
   * 工作中心-设备总记录数
   * @format int64
   */
  device?: number;
  /** 是否有子工作中心 */
  children?: boolean;
}

export interface WorkbenchTodoVO {
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
  /** 标题 */
  titleName?: string;
  /** 待办URL */
  todoUrl?: string;
  dataId?: string;
  /** 状态 */
  status?: string;
  todoUserId?: string;
  todoId?: string;
  userId?: string;
  /**
   * 是否处理
   * @format int32
   */
  isRead?: number;
  statusName?: string;
  isReadName?: string;
}

/** 工作台布局表 */
export interface WorkbenchLayout {
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
  userId?: string;
  /** 布局内容 */
  layout?: string;
}

export interface WarehouseSearch {
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
  keyword?: string;
  /** @format int32 */
  state?: number;
}

/** 通用响应类 */
export interface ResultMapStringObject {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Record<string, object | null>;
}

/** 响应数据 */
export type PagingDataWarehouse = {
  list?: Warehouse[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWarehouse {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWarehouse;
}

/** 仓库 */
export interface Warehouse {
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
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库描述 */
  warehouseDesc?: string;
  /** 仓库类型 */
  warehouseCategory?: string;
  /** 仓库属性 */
  warehouseAttribute?: string;
  /**
   * 是否启用交易上传
   * @format int32
   */
  isEnableUpload?: number;
  /**
   * 交易上传时间
   * @format date-time
   */
  datetimeUpload?: string;
  /**
   * 是否启用货位管理
   * @format int32
   */
  isEnableLocation?: number;
  /** ERP仓库 */
  erpWarehouse?: string;
  /**
   * 是否先进先出
   * @format int32
   */
  isFifo?: number;
}

/** 通用响应类 */
export interface ResultWarehouse {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 仓库 */
  data?: Warehouse;
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

/** 通用响应类 */
export interface ResultListWarehouseFeignDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WarehouseFeignDTO[] | null;
}

/** 仓库服务间调用标准实体 */
export type WarehouseFeignDTO = {
  id?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库描述 */
  warehouseDesc?: string;
  /** 仓库类型 */
  warehouseCategory?: string;
  /** 仓库属性 */
  warehouseAttribute?: string;
  /**
   * 是否启用交易上传
   * @format int32
   */
  isEnableUpload?: number;
  /**
   * 交易上传时间
   * @format date-time
   */
  datetimeUpload?: string;
  /**
   * 是否启用货位管理
   * @format int32
   */
  isEnableLocation?: number;
  /** ERP仓库 */
  erpWarehouse?: string;
} | null;

/** 角色用户操作实体 */
export interface UserRoleDTO {
  userId?: string;
  roleIds?: string[];
}

/** 角色用户操作实体 */
export interface RoleUserDTO {
  roleId?: string;
  userIds?: string[];
}

/** 用户组织操作实体 */
export interface UserOrgDTO {
  userId?: string;
  orgIds?: string[];
  defaultOrgId?: string;
}

/** 角色权限操作实体 */
export interface UserAuthDTO {
  userId?: string;
  permissionIds?: string[];
}

/** 用户 */
export interface User {
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
  /** 用户名 */
  userName?: string;
  /** 显示名 */
  displayName?: string;
  /** 密码 */
  password?: string;
  /**
   * 用户上次进行身份验证时间
   * @format date-time
   */
  timeLastActivity?: string;
  /**
   * 用户上次登录时间
   * @format date-time
   */
  timeLastLogin?: string;
  /**
   * 上次更新成员资格用户的密码的日期和时间
   * @format date-time
   */
  timeLastPasswordChanged?: string;
  /**
   * 用户当前是否联机
   * @format int32
   */
  isOnline?: number;
  /**
   * 指示成员资格用户是否因被锁定而无法进行验证
   * @format int32
   */
  isLockedOut?: number;
  /**
   * 最近一次锁定成员资格用户的日期和时间
   * @format date-time
   */
  timeLastLockedOut?: string;
  /**
   * 输入密码尝试失败的次数
   * @format int32
   */
  failedAttemptCount?: number;
  /**
   * 输入密码尝试失败的起始时间
   * @format date-time
   */
  timeFailedAttemptStart?: string;
  /**
   * 用户帐号类型
   * @format int32
   */
  accountType?: number;
  /**
   * 用户失效时间
   * @format date-time
   */
  timeExpiration?: string;
  personId?: string;
  orgId?: string;
}

/** 响应数据 */
export type PagingDataUserVO = {
  list?: UserVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataUserVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataUserVO;
}

/** 当前用户关联实体 */
export interface UserVO {
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
  /** 用户名 */
  userName?: string;
  /** 显示名 */
  displayName?: string;
  /** 密码 */
  password?: string;
  /**
   * 用户上次进行身份验证时间
   * @format date-time
   */
  timeLastActivity?: string;
  /**
   * 用户上次登录时间
   * @format date-time
   */
  timeLastLogin?: string;
  /**
   * 上次更新成员资格用户的密码的日期和时间
   * @format date-time
   */
  timeLastPasswordChanged?: string;
  /**
   * 用户当前是否联机
   * @format int32
   */
  isOnline?: number;
  /**
   * 指示成员资格用户是否因被锁定而无法进行验证
   * @format int32
   */
  isLockedOut?: number;
  /**
   * 最近一次锁定成员资格用户的日期和时间
   * @format date-time
   */
  timeLastLockedOut?: string;
  /**
   * 输入密码尝试失败的次数
   * @format int32
   */
  failedAttemptCount?: number;
  /**
   * 输入密码尝试失败的起始时间
   * @format date-time
   */
  timeFailedAttemptStart?: string;
  /**
   * 用户帐号类型
   * @format int32
   */
  accountType?: number;
  /**
   * 用户失效时间
   * @format date-time
   */
  timeExpiration?: string;
  personId?: string;
  orgId?: string;
  /** 企业编码 */
  epCode?: string;
  /** 企业名称 */
  epName?: string;
  /** 组织编码 */
  orgCode?: string;
  /** 组织名称 */
  orgName?: string;
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
  /** 用户 */
  data?: User;
}

export interface TransactionDetailSearch {
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
  businessCategoryId?: string;
  moScheId?: string;
  mitemId?: string;
  /** MES业务单号 */
  billNo?: string;
  /** ERP单据号 */
  erpLineNo?: string;
  /** 操作人 */
  creator?: string;
  /** 交接人ID */
  transferId?: string;
  /** 采购订单号 */
  purchaseNo?: string;
  /** 送货单号 */
  deliveryNo?: string;
  /** 标签 */
  scanBarcode?: string;
  warehouseId?: string;
  toWarehouseId?: string;
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

/** 响应数据 */
export type PagingDataTransactionDetailVO = {
  list?: TransactionDetailVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataTransactionDetailVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataTransactionDetailVO;
}

/** 显示工站 */
export interface TransactionDetailVO {
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
  businessCategoryId?: string;
  /** 业务类型编码 */
  businessCategoryCode?: string;
  /** 业务类型名称 */
  businessCategoryName?: string;
  /** ERP业务类型ID */
  erpBusinessCategoryId?: string;
  /** 单据号 */
  billNo?: string;
  /** ERP单据号 */
  erpBillNo?: string;
  /** 采购订单号 */
  purchaseNo?: string;
  /** 送货单号 */
  deliveryNo?: string;
  warehouseId?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 源仓库名称 */
  warehouseName?: string;
  districtId?: string;
  /** 货区编码 */
  districtCode?: string;
  /** 源货区名称 */
  districtName?: string;
  locId?: string;
  /** 货位编码 */
  locCode?: string;
  /** 货位名称 */
  locName?: string;
  toOid?: string;
  toWarehouseId?: string;
  /** 目标仓库编码 */
  toWarehouseCode?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  toDistrictId?: string;
  /** 目标货区编码 */
  toDistrictCode?: string;
  /** 目标货区名称 */
  toDistrictName?: string;
  toLocId?: string;
  /** 目标货位编码 */
  toLocCode?: string;
  /** 目标货位名称 */
  toLocName?: string;
  /** ERP来源仓库ID */
  erpWarehouseId?: string;
  /** ERP来源货区ID */
  erpDistrictId?: string;
  /** ERP来源货区ID */
  erpLocId?: string;
  /** ERP目标组织ID */
  toErpOid?: string;
  /** ERP目标仓库ID */
  toErpWarehouseId?: string;
  /** ERP目标货区ID */
  toErpDistrictId?: string;
  /** ERP目标货区ID */
  toErpLocId?: string;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** ERP物料ID */
  erpMitemId?: string;
  supplierId?: string;
  /** 供应商ID */
  erpSupplierId?: string;
  /** 工单号 */
  moCode?: string;
  /** ERP工单号 */
  erpMoId?: string;
  moScheId?: string;
  /**
   * 交易时间
   * @format date-time
   */
  datetimeTrans?: string;
  /** 交易数量 */
  transQty?: number;
  /**
   * 上传顺序
   * @format int32
   */
  ulSeq?: number;
  /** ERP单据头表 */
  erpBillId?: string;
  /** ERP单据明细表 */
  erpBillDtlId?: string;
  userTransferId?: string;
  /** 业务类型名称 */
  categoryName?: string;
  /** 标签 */
  scanBarcode?: string;
  /** 标签数量 */
  barcodeQty?: number;
  /** 物料描述 */
  mitemDesc?: string;
  /** 计量单位符号名称 */
  uomName?: string;
  /** 源货位名称 */
  locationName?: string;
  /** 目标货位名称 */
  toLocationName?: string;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 操作人 */
  creatorName?: string;
  /** 排产工单 */
  scheCode?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
}

/** 自定义表格配置 */
export interface TableSetting {
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
  userId?: string;
  /** 功能路径 */
  behaviorPath?: string;
  /** 表格唯一键 */
  tableKeyCode?: string;
  /** 表格配置 */
  jsonConfig?: string;
  /** 视图标签 */
  viewLable?: string;
  /**
   * 是否默认显示
   * @format int32
   */
  isDefault?: number;
}

/** 通用响应类 */
export interface ResultListTableSetting {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: TableSetting[] | null;
}

export interface SupportGroupSearch {
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
  userId?: string;
  /** 多个id */
  ids?: string[];
  /** 模糊关键词 */
  groupKeyword?: string;
  /** 模糊关键词 */
  userKeyword?: string;
  /** 新增的 */
  insertList?: string[];
  /** 删除的 */
  deleteList?: string[];
  supportGroupId?: string;
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

/** 响应数据 */
export type PagingDataSupportGroupVO = {
  list?: SupportGroupVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSupportGroupVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSupportGroupVO;
}

/** 工站权限显示 */
export interface SupportGroupVO {
  id?: string;
  eid?: string;
  oid?: string;
  userId?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /** 处理组代码 */
  supportGroupCode?: string;
  /** 处理组名称 */
  supportGroupName?: string;
  /** 处理组类型 */
  supportGroupType?: string;
  /** 处理组类型名称 */
  supportGroupTypeName?: string;
  userCount?: string;
  /** 用户账号 */
  userName?: string;
  /** 用户显示名 */
  userDisplayName?: string;
  /** 手机号 */
  mobilePhone?: string;
  /** 邮箱 */
  email?: string;
  /** 隶属企业 */
  enterprise?: string;
  /** 组织架构 */
  organization?: string;
}

/** 响应数据 */
export type PagingDataSupplier = {
  list?: Supplier[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSupplier {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSupplier;
}

/** 供应商 */
export interface Supplier {
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
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商联系人 */
  contactPerson?: string;
  /** 供应商联系电话 */
  contactTel?: string;
}

/** 通用响应类 */
export interface ResultSupplier {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 供应商 */
  data?: Supplier;
}

/** 消息发送日志表 */
export interface MsgSendLog {
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
  /** 标题 */
  title?: string;
  /** 内容 */
  content?: string;
  /** 发送方式 */
  sendType?: string;
  /** 发送地址 */
  sendAddress?: string;
  /** 发送结果 */
  sendResult?: string;
}

/** 响应数据 */
export type PagingDataMsgSendLog = {
  list?: MsgSendLog[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMsgSendLog {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMsgSendLog;
}

/** 工艺路线映射表 */
export interface RoutingMap {
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
  mitemId?: string;
  mitemCategoryId?: string;
  workcenterId?: string;
  /**
   * 是否默认
   * @format int32
   */
  isDefault?: number;
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
  /** 工艺路线类型 */
  routingType?: string;
}

/** 角色权限操作实体 */
export interface RoleAuthDTO {
  roleId?: string;
  permissionIds?: string[];
}

/** 响应数据 */
export type PagingDataRoleVO = {
  list?: RoleVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataRoleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataRoleVO;
}

/** 权限实体 */
export interface RoleVO {
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
  /** 角色代码 */
  roleCode?: string;
  /** 角色名称 */
  roleName?: string;
  /** 角色描述 */
  roleDesc?: string;
  /** 企业名称 */
  enName?: string;
  /** 企业编码 */
  enCode?: string;
  /** 组织名称 */
  plantName?: string;
  /** 组织编码 */
  plantCode?: string;
  /** 企业组织名称 */
  enPlantName?: string;
}

/** 通用响应类 */
export interface ResultRole {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 角色 */
  data?: Role;
}

/** 角色 */
export type Role = {
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
  /** 角色代码 */
  roleCode?: string;
  /** 角色名称 */
  roleName?: string;
  /** 角色描述 */
  roleDesc?: string;
} | null;

export interface ProfileSearch {
  /** 模糊搜索字段 */
  key?: string;
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
  nodeId?: string;
  /**
   * 节点类型
   * @format int32
   */
  attribute?: number;
}

/** 响应数据 */
export type PagingDataProfileValueSearchVO = {
  list?: ProfileValueSearchVO[];
  /** @format int32 */
  total?: number;
} | null;

export interface ProfileValueSearchVO {
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
  moduleId?: string;
  /** 配置项编码 */
  profileCode?: string;
  /** 配置项名称 */
  profileName?: string;
  /** 配置项描述 */
  profileDesc?: string;
  /** 配置项值类型 */
  valueType?: string;
  /** 配置项值范围 */
  valueRange?: string;
  /** 模块名称 */
  moduleName?: string;
  profileId?: string;
  /** 配置项维度 */
  profileCategory?: string;
  /** 配置项维度值id */
  profileCategoryValue?: string;
  /** 配置项维度值名称 */
  profileCategoryValueName?: string;
  /** 配置项值 */
  profileValue?: string;
}

/** 通用响应类 */
export interface ResultPagingDataProfileValueSearchVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProfileValueSearchVO;
}

/** 配置项值 */
export interface ProfileValue {
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
}

/** 包装关联物料提交的模型 */
export interface ProductPackRuleMapDTO {
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
  packRuleId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemCategoryName?: string;
  mitemCategoryCode?: string;
  packRuleCode?: string;
  packRuleName?: string;
  packRelationType?: string;
  ids?: string[];
}

/** 工序业务执行单元库明细表 */
export interface ProcessBusinessLibDtl {
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
  processBusinessLibId?: string;
  businessUnitId?: string;
  /**
   * 执行顺序
   * @format int32
   */
  execSeq?: number;
}

/** 工序业务执行单元库头表 */
export type ProcessBusinessLib = {
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
  routingProcessId?: string;
  processId?: string;
  /** 条码类型 */
  barcodeCategory?: string;
} | null;

/** 通用响应类 */
export interface ResultListProcessBusinessLib {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ProcessBusinessLib[] | null;
}

/** 通用响应类 */
export interface ResultListProcessBusinessLibDtl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ProcessBusinessLibDtl[] | null;
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

/** 业务模板添加实体类型 */
export interface ProcessBusinessAddVO {
  /** 工序业务执行单元库头表 */
  head?: ProcessBusinessLib;
  /** 详细步骤信息 */
  list?: ProcessBusinessLibDtl[];
}

/** 响应数据 */
export type PagingDataProcessVO = {
  list?: ProcessVO[];
  /** @format int32 */
  total?: number;
} | null;

export interface ProcessVO {
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
  /** 工序别名 */
  processAlias?: string;
  /** 工序类别 */
  processCategory?: string;
  /** 创建人名称 */
  creatorName?: string;
  /** 修改人名称 */
  modifierName?: string;
  /** 工序类型 */
  processCategoryName?: string;
  stateName?: string;
  isState?: boolean;
}

/** 通用响应类 */
export interface ResultPagingDataProcessVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProcessVO;
}

/** 工序 */
export type Process = {
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
  /** 工序别名 */
  processAlias?: string;
  /** 工序类别 */
  processCategory?: string;
} | null;

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

/** 打印模板关联实体 */
export interface PrintTmplMapDTO {
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
  printTmplId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 物料类别编码 */
  mitemCategoryCode?: string;
  /** 物料类别名称 */
  mitemCategoryName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  keyword?: string;
}

/** 响应数据 */
export type PagingDataPrintTmplMapDTO = {
  list?: PrintTmplMapDTO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataPrintTmplMapDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPrintTmplMapDTO;
}

/** 响应数据 */
export type PagingDataPrintTmpl = {
  list?: PrintTmpl[];
  /** @format int32 */
  total?: number;
} | null;

/** 标签模板 */
export interface PrintTmpl {
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
  tmplCode?: string;
  tmplName?: string;
  tmplDesc?: string;
  tmplBodyPath?: string;
  tmplCategory?: string;
  tmplType?: string;
}

/** 通用响应类 */
export interface ResultPagingDataPrintTmpl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPrintTmpl;
}

/** 响应数据 */
export type PagingDataPost = {
  list?: Post[];
  /** @format int32 */
  total?: number;
} | null;

/** 岗位 */
export interface Post {
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
  /** 岗位代码 */
  postCode?: string;
  /** 岗位名称 */
  postName?: string;
  /** 岗位描述 */
  postDesc?: string;
}

/** 通用响应类 */
export interface ResultPagingDataPost {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPost;
}

/** 通用响应类 */
export interface ResultPost {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 岗位 */
  data?: Post;
}

/** 响应数据 */
export type PagingDataPersonVO = {
  list?: PersonVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 显示员工实体 */
export interface PersonVO {
  id?: string;
  /** 人员编码 */
  personCode?: string;
  /** 姓名 */
  personName?: string;
  /**
   * 性别
   * @format int32
   */
  gender?: number;
  /** 手机 */
  mobilePhone?: string;
  /** 邮箱 */
  email?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /** 性别别名 */
  genderName?: string;
  /** 状态别名 */
  stateName?: string;
  /** 是否启用 */
  isState?: boolean;
}

/** 通用响应类 */
export interface ResultPagingDataPersonVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPersonVO;
}

/** 员工表 */
export type Person = {
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
  /** 人员编号 */
  personCode?: string;
  /** 姓名 */
  personName?: string;
  /**
   * 性别，1男，0女
   * @format int32
   */
  gender?: number;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobilePhone?: string;
  adminOrgId?: string;
} | null;

/** 通用响应类 */
export interface ResultPerson {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 员工表 */
  data?: Person;
}

/** 系统字典组 */
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
  /** 业务领域 */
  paramDomain?: string;
  /** 字典组代码 */
  paramGroupCode?: string;
  /** 字典组名称 */
  paramGroupName?: string;
  /** 字典组描述 */
  paramGroupDesc?: string;
  /**
   * 是否系统字典
   * @format int32
   */
  isSys?: number;
  /** 字典数据类型 */
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
  /** 系统字典组 */
  data?: ParamGroup;
}

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

export interface ParamInfoDTO {
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
  details?: Param[];
}

/** 通用响应类 */
export interface ResultParam {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 系统字典明细 */
  data?: Param;
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
export interface ResultOrg {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 组织架构表 */
  data?: Org;
}

export interface ObjectPropertyCategorySearch {
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
  /** 左侧列表模糊关键词 */
  keyword?: string;
  /** 扩展属性分类-状态 */
  state?: number[];
  id?: string;
  /** 多个id */
  ids?: string[];
  /** 领域编码 */
  objectCode?: string;
}

/** 领域对象扩展属性分类 */
export interface ObjectPropertyCategoryVO {
  id?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  paramGroupId?: string;
  /** 字典代码 */
  paramCode?: string;
  /** 字典值 */
  paramValue?: string;
  /** 字典组名称 */
  getParamGroupName?: string;
  /** 领域属性名称 */
  objectCode?: string;
  categoryId?: string;
  /** 属性代码 */
  propertyCode?: string;
  /** 属性值类型 */
  propertyValueType?: string;
  /** 显示在界面上的名词 */
  displayName?: string;
  /**
   * 属性中的显示顺序
   * @format int32
   */
  displaySequence?: number;
  /**
   * 是否必填项
   * @format int32
   */
  isRequire?: number;
  /**
   * 是否允许存在多个同类项
   * @format int32
   */
  isMultiple?: number;
  /**
   * 是否需要校验输入
   * @format int32
   */
  needValidation?: number;
  /** 校验的正则表达式 */
  validExpression?: string;
  /** 扩展属性数据来源 */
  dataSource?: string;
  /** 数据取值路径 */
  dataSourcePath?: string;
  /** 备注 */
  memo?: string;
  /**
   * 是否数据源多选
   * @format int32
   */
  isDataMultiple?: number;
  /** 领域属性分类名称 */
  categoryName?: string;
}

/** 响应数据 */
export type PagingDataObjectPropertyCategoryVO = {
  list?: ObjectPropertyCategoryVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataObjectPropertyCategoryVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataObjectPropertyCategoryVO;
}

/** 领域扩展属性 */
export interface ObjectProperty {
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
  /** 领域对象编码 */
  objectCode?: string;
  categoryId?: string;
  /** 属性代码 */
  propertyCode?: string;
  /** 属性值类型 */
  propertyValueType?: string;
  /** 显示在界面上的名词 */
  displayName?: string;
  /**
   * 属性中的显示顺序
   * @format int32
   */
  displaySequence?: number;
  /**
   * 是否必填项
   * @format int32
   */
  isRequire?: number;
  /**
   * 是否允许存在多个同类项
   * @format int32
   */
  isMultiple?: number;
  /**
   * 是否需要校验输入
   * @format int32
   */
  needValidation?: number;
  /** 校验的正则表达式 */
  validExpression?: string;
  /** 扩展属性数据来源 */
  dataSource?: string;
  /** 数据取值路径 */
  dataSourcePath?: string;
  /** 备注 */
  memo?: string;
  /**
   * 是否数据源多选
   * @format int32
   */
  isDataMultiple?: number;
}

/** 信息推送主表 */
export interface MsgDTO {
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
  /** 消息来源表 */
  sourceTableName?: string;
  sourceRowId?: string;
  /** 标题 */
  title?: string;
  /** 内容 */
  content?: string;
  /** 备注 */
  remark?: string;
  /** 子层级 */
  msgDtlList?: MsgDtlDTO[];
}

/** 信息推送明细表 */
export interface MsgDtlDTO {
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
  msgId?: string;
  /** 消息推送类型 */
  pushType?: string;
  /** 消息推送目标 */
  pushTarget?: string;
  /**
   * 预计发送时间
   * @format date-time
   */
  datetimePushPlan?: string;
  /**
   * 最后推送时间
   * @format date-time
   */
  datetimePushLast?: string;
  /**
   * 发送间隔周期
   * @format int32
   */
  pushIntervalCycle?: number;
  /**
   * 计划发送次数
   * @format int32
   */
  pushCount?: number;
  /**
   * 已发送次数
   * @format int32
   */
  pushSendCount?: number;
  /**
   * 失效时间
   * @format date-time
   */
  datetimePushDisable?: string;
  personId?: string;
  userId?: string;
  /**
   * 是否有效
   * @format int32
   */
  isDisable?: number;
  /**
   * 是否已读
   * @format int32
   */
  isRead?: number;
}

/** 通用响应类 */
export interface ResultResponseEntityString {
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

export interface ModuleSearch {
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
  /** 状态 */
  state?: number[];
  id?: string;
  /** 多个ID */
  ids?: string[];
  /**
   * 客户端类型
   * @format int32
   */
  clientType?: number;
}

/** 系统模块表 */
export interface Module {
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
  /**
   * 客户端类型
   * @format int32
   */
  clientType?: number;
  /** 模块层次代码 */
  moduleLevel?: string;
  /** 模块编码 */
  moduleCode?: string;
  /** 模块名称 */
  moduleName?: string;
  /** 模块描述 */
  moduleDesc?: string;
  parentModuleId?: string;
  /**
   * 显示顺序
   * @format int32
   */
  sortIndex?: number;
  /** 模块访问地址 */
  behaviorPath?: string;
  /** 图标地址 */
  iconPath?: string;
  /** 图标颜色 */
  iconColor?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 模块版本号 */
  moduleVersion?: number;
  /** 模块包标识 */
  modulePackageIdentify?: string;
  /** 模块包名称 */
  packageName?: string;
}

/** 菜单元数据 */
export interface ModuleMetaVO {
  /** 名称，多语言 */
  title?: Record<string, string>;
  /** 图标路径 */
  icon?: string;
  /** 图标颜色 */
  iconColor?: string;
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
  id?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /** 模块编码 */
  moduleCode?: string;
  /** 名称 */
  name?: string;
  /** 模块描述 */
  moduleDesc?: string;
  /**
   * 客户端类型
   * @format int32
   */
  clientType?: number;
  /**
   * 顺序
   * @format int32
   */
  sortIndex?: number;
  /** 图标地址 */
  iconPath?: string;
  /** 模块层次代码 */
  moduleLevel?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 模块版本号 */
  moduleVersion?: number;
  /** 模块包标识 */
  modulePackageIdentify?: string;
  parentModuleId?: string;
  /** 父模块Name */
  parentModuleName?: string;
  grandpaId?: string;
  /** 所在一级菜单名称 */
  grandpaName?: string;
  /** 模块访问地址 */
  behaviorPath?: string;
  /** 模块包名称 */
  packageName?: string;
  /** 下载地址 */
  downloadUrl?: string;
  /**
   * 是否PC端
   * @format int32
   */
  isPC?: number;
  /**
   * 是否移动端
   * @format int32
   */
  isMobile?: number;
  /**
   * 是否电视端
   * @format int32
   */
  isTV?: number;
  /**
   * 是否手表端
   * @format int32
   */
  isWatch?: number;
  /**
   * 是否微信端
   * @format int32
   */
  isWeChat?: number;
  /** 地址 */
  path?: string;
  /** 类型 */
  component?: string;
  /** 重定向地址 */
  redirect?: string;
  /** 菜单元数据 */
  meta?: ModuleMetaVO;
  /** 子菜单 */
  children?: ShowModuleVO[];
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

/** 响应数据 */
export type PagingDataShowModuleVO = {
  list?: ShowModuleVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataShowModuleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataShowModuleVO;
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

/** 显示工单投料的视图 */
export interface MoScheduleVO {
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
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uomName?: string;
  statusName?: string;
  moCode?: string;
  routingCode?: string;
  routingName?: string;
  uom?: string;
  workshopCode?: string;
  workshopName?: string;
  routingId?: string;
  workCenterCode?: string;
  workCenterName?: string;
  uomSymbol?: string;
  categoryId?: string;
  categoryCode?: string;
  categoryName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  moClassName?: string;
}

/** 响应数据 */
export type PagingDataMoScheduleVO = {
  list?: MoScheduleVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMoScheduleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMoScheduleVO;
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

/** 排产单 */
export interface MoScheduleDTO {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  isHold?: number;
  keyList?: string[];
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

/** 显示计量单位 */
export interface MitemUomVo {
  id?: string;
  /** 计量单位 */
  uomName?: string;
  /** 计量单位符号 */
  uom?: string;
}

export interface MitemUomSearch {
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
  /** 计量单位精确查询 */
  uomName?: string;
  /** 排序字段 */
  sorts?: SortParam[];
  /** 筛选字段 */
  filters?: Filter[];
}

/** 计量单位 */
export interface MitemUom {
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
}

/** 响应数据 */
export type PagingDataMitemUom = {
  list?: MitemUom[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemUom {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemUom;
}

export interface MitemInSupplierSearch {
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
  mitemKeyword?: string;
  supplierKeyword?: string;
}

/** 显示物料与供应商关系实体 */
export interface MitemInSupplierVO {
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
  supplierId?: string;
  mitemId?: string;
  /**
   * 最小包装数量
   * @format int32
   */
  qty?: number;
  /** 检验严格度 */
  inspectionStringency?: string;
  /**
   * 是否免检
   * @format int32
   */
  isExemptionInspection?: number;
  /**
   * 是否强制供方检验
   * @format int32
   */
  isForceInspection?: number;
  /**
   * 免检失效日期
   * @format date-time
   */
  dateExemptionExpired?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  stateName?: string;
  isState?: boolean;
  isExemptionInspectionChecked?: boolean;
  isExemptionInspectionName?: string;
  isForceInspectionChecked?: boolean;
  isForceInspectionName?: string;
  dateExemptionExpiredStr?: string;
}

/** 响应数据 */
export type PagingDataMitemInSupplierVO = {
  list?: MitemInSupplierVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemInSupplierVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemInSupplierVO;
}

/** 物料供应商关系 */
export interface MitemInSupplier {
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
  supplierId?: string;
  mitemId?: string;
  /**
   * 最小包装数量
   * @format int32
   */
  qty?: number;
  /** 检验严格度 */
  inspectionStringency?: string;
  /**
   * 是否免检
   * @format int32
   */
  isExemptionInspection?: number;
  /**
   * 是否强制供方检验
   * @format int32
   */
  isForceInspection?: number;
  /**
   * 免检失效日期
   * @format date-time
   */
  dateExemptionExpired?: string;
}

/** 物料分类 */
export interface MitemCategory {
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
  /** 物料分类代码 */
  categoryCode?: string;
  /** 物料分类名称 */
  categoryName?: string;
  /** 物料分类描述 */
  categoryDesc?: string;
  /** 小数位计算类型 */
  reqCalcRule?: string;
  /** 物料投料规则 */
  onboardRuleCode?: string;
  /**
   * 是否手工创建
   * @format int32
   */
  isManual?: number;
}

/** 响应数据 */
export type PagingDataMitemCategory = {
  list?: MitemCategory[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemCategory;
}

/** 通用响应类 */
export interface ResultMitemCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 物料分类 */
  data?: MitemCategory;
}

export interface CommonImportMitemCategory {
  title?: string;
  tableName?: string;
  data?: MitemCategory[];
  columns?: ImportColumn[];
  /** @format int32 */
  batchSize?: number;
}

export interface ImportColumn {
  field?: string;
  title?: string;
  isRequired?: boolean;
  isValidateRepeat?: boolean;
  validateExpression?: string;
  items?: string[];
  required?: boolean;
  validateRepeat?: boolean;
}

/** 响应数据 */
export type ImportSummary = {
  /** @format int32 */
  successCount?: number;
  /** @format int32 */
  failCount?: number;
  errorListFilePath?: string;
  allSuccess?: boolean;
} | null;

/** 通用响应类 */
export interface ResultImportSummary {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ImportSummary;
}

/** 显示物料实体 */
export interface MitemVO {
  id?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  mitemCategoryId?: string;
  /** 物料类别编码 */
  mitemCategoryCode?: string;
  /** 物料类别名称 */
  mitemCategoryName?: string;
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
  warehouseId?: string;
  /** 完工默认仓库 */
  warehouseCode?: string;
  /** 完工默认仓库 */
  warehouseName?: string;
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
  stateName?: string;
  isState?: boolean;
  isProductChecked?: boolean;
  isInProcessChecked?: boolean;
  isBatchName?: string;
  isRawName?: string;
  isProductName?: string;
  isRawChecked?: boolean;
  isInProcessName?: string;
}

/** 响应数据 */
export type PagingDataMitemVO = {
  list?: MitemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemVO;
}

/** 物料 */
export type Mitem = {
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
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 单位 */
  uom?: string;
  /**
   * 保质期天数
   * @format int32
   */
  shelfLifeDays?: number;
} | null;

/** 通用响应类 */
export interface ResultMitem {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 物料 */
  data?: Mitem;
}

export interface MitemSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  keyword?: string;
  mitemCategoryKeyword?: string;
  /** @format int32 */
  isRaw?: number;
  /** @format int32 */
  isInProcess?: number;
  /** @format int32 */
  isProduct?: number;
  sorts?: SortParam[];
  filters?: Filter[];
}

/** 物料服务间调用标准实体 */
export type MitemFeignDTO = {
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
} | null;

/** 通用响应类 */
export interface ResultListMitemFeignDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MitemFeignDTO[] | null;
}

/** 显示产品条码管理 */
export interface LabelVO {
  id?: string;
  /**
   * 收货时间
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
  /** 标签号 */
  labelNo?: string;
  /** 标签类别 */
  labelCategory?: string;
  mitemId?: string;
  /** 生产批次号 */
  lotNo?: string;
  /** 到货批次号 */
  batchLot?: string;
  supplierId?: string;
  /** 数量 */
  qty?: number;
  /** 结余数量 */
  balanceQty?: number;
  onhandId?: string;
  moScheId?: string;
  printTmplId?: string;
  /**
   * 标签顺序号
   * @format int32
   */
  printSeq?: number;
  deliveryDtlId?: string;
  /** 接收单号 */
  receiveNo?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
  /** 状态 */
  status?: string;
  /**
   * 是否暂挂
   * @format int32
   */
  isHold?: number;
  /** 送货单 */
  billNo?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /**
   * 已打印数量
   * @format int32
   */
  printedQty?: number;
  /**
   * 已生成数量
   * @format int32
   */
  createdQty?: number;
  /**
   * 最小包装数
   * @format int32
   */
  minPkgQty?: number;
  /** 条码规则 */
  barcodeRule?: string;
  /** 打印模板 */
  printTmpl?: string;
  /** 计量单位名称 */
  uomName?: string;
  /** 计量单位 */
  uom?: string;
  deliveryId?: string;
  /** 条码状态 */
  barcodeStatusName?: string;
  /** 收货人名称 */
  creatorName?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位名称 */
  locationName?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 货区编码 */
  districtCode?: string;
  /** 货位编码 */
  locationCode?: string;
  /**
   * 送货单行号
   * @format int32
   */
  lineSeq?: number;
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
  /**
   * 送货时间
   * @format date-time
   */
  dataDelivery?: string;
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  newOnhandId?: string;
  /** 标签新状态 */
  newStatus?: string;
}

export interface LabelSearch {
  barcodeWipId?: string;
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
   * 收货开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 收货结束日期
   * @format date-time
   */
  dateEnd?: string;
  supplierId?: string;
  mitemId?: string;
  /** 批次号 */
  lotNo?: string;
  /** 送货单 */
  billNo?: string;
  /** 是否仅显示未打印完成 */
  isFinishDisplay?: boolean;
  deliveryId?: string;
  deliveryDtlId?: string;
  labelId?: string;
  /** 是否仅显示已生成 */
  isCreated?: boolean;
  /** 条码状态 */
  barcodeStatus?: string;
  /** 条码 */
  labelNo?: string;
  /**
   * 生成开始日期
   * @format date-time
   */
  timeCreatedStart?: string;
  /**
   * 生成结束日期
   * @format date-time
   */
  timeCreatedEnd?: string;
  barcodeRuleId?: string;
  /** 条码 */
  barcode?: string;
  /**
   * 生成数量
   * @format int32
   */
  createNum?: number;
  /**
   * 拆分数量
   * @format int32
   */
  splitNum?: number;
  /**
   * 行号
   * @format int32
   */
  lineSeq?: number;
  printTempId?: string;
  /** 原因 */
  reason?: string;
  /** 批量ID */
  ids?: string[];
  /** 显示产品条码管理 */
  deliveryLabel?: LabelVO;
}

/** 标签日志表 */
export type LabelLog = {
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
  /** 标签号 */
  labelNo?: string;
  /** 原因 */
  reason?: string;
  /** 条码模板代码 */
  tmplCode?: string;
  /** 条码模板名称 */
  tmplName?: string;
  /** 条码模板类别 */
  tmplCategory?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区代码 */
  districtCode?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位代码 */
  locationCode?: string;
  /** 货位名称 */
  locationName?: string;
  /** 数量 */
  qty?: number;
  /** 客户端机器名 */
  hostname?: string;
  /** 客户端IP */
  ipaddress?: string;
  /** 备注 */
  memo?: string;
  /** 操作类型 */
  operateType?: string;
  /** 状态 */
  status?: string;
} | null;

/** 通用响应类 */
export interface ResultListLabelLog {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: LabelLog[] | null;
}

/** 响应数据 */
export type PagingDataLabelVO = {
  list?: LabelVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLabelVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLabelVO;
}

/** 通用响应类 */
export interface ResultListLabelVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: LabelVO[] | null;
}

/** 标签表 */
export interface Label {
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
  /** 标签号 */
  labelNo?: string;
  /** 标签类别 */
  labelCategory?: string;
  mitemId?: string;
  /** 批次号 */
  lotNo?: string;
  /** 到货批次 */
  batchLot?: string;
  supplierId?: string;
  /** 标签初始化数量 */
  qty?: number;
  /** 结余数量 */
  balanceQty?: number;
  onhandId?: string;
  moScheId?: string;
  printTmplId?: string;
  /**
   * 标签顺序号
   * @format int32
   */
  printSeq?: number;
  deliveryDtlId?: string;
  /** 接收单号 */
  receiveNo?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
  /** 状态 */
  status?: string;
  /**
   * 是否暂挂
   * @format int32
   */
  isHold?: number;
}

export interface IntegratedConsoleSearch {
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
  /** 接口分类 */
  msgCategory?: string;
  /** 接口领域分类 */
  msgDomainCategory?: string;
  businessCategoryId?: string;
  /** MES业务单号 */
  billNo?: string;
  /** ERP单据号 */
  erpBillNo?: string;
  /** 执行结果 */
  imsgQueueStatus?: string;
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

/** 显示工站 */
export interface IntegratedConsoleVO {
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
  businessCategoryId?: string;
  /** 业务类型编码 */
  businessCategoryCode?: string;
  /** 业务类型名称 */
  businessCategoryName?: string;
  /** ERP业务类型ID */
  erpBusinessCategoryId?: string;
  /** 单据号 */
  billNo?: string;
  /** ERP单据号 */
  erpBillNo?: string;
  /** 采购订单号 */
  purchaseNo?: string;
  /** 送货单号 */
  deliveryNo?: string;
  warehouseId?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  districtId?: string;
  /** 货区编码 */
  districtCode?: string;
  /** 货区名称 */
  districtName?: string;
  locId?: string;
  /** 货位编码 */
  locCode?: string;
  /** 货位名称 */
  locName?: string;
  toOid?: string;
  toWarehouseId?: string;
  /** 目标仓库编码 */
  toWarehouseCode?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  toDistrictId?: string;
  /** 目标货区编码 */
  toDistrictCode?: string;
  /** 目标货区名称 */
  toDistrictName?: string;
  toLocId?: string;
  /** 目标货位编码 */
  toLocCode?: string;
  /** 目标货位名称 */
  toLocName?: string;
  /** ERP来源仓库ID */
  erpWarehouseId?: string;
  /** ERP来源货区ID */
  erpDistrictId?: string;
  /** ERP来源货区ID */
  erpLocId?: string;
  /** ERP目标组织ID */
  toErpOid?: string;
  /** ERP目标仓库ID */
  toErpWarehouseId?: string;
  /** ERP目标货区ID */
  toErpDistrictId?: string;
  /** ERP目标货区ID */
  toErpLocId?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** ERP物料ID */
  erpMitemId?: string;
  supplierId?: string;
  /** 供应商ID */
  erpSupplierId?: string;
  /** 工单号 */
  moCode?: string;
  /** ERP工单号 */
  erpMoId?: string;
  moScheId?: string;
  /**
   * 交易时间
   * @format date-time
   */
  datetimeTrans?: string;
  /** 交易数量 */
  transQty?: number;
  /**
   * 上传顺序
   * @format int32
   */
  ulSeq?: number;
  /** ERP单据头表 */
  erpBillId?: string;
  /** ERP单据明细表 */
  erpBillDtlId?: string;
  userTransferId?: string;
  /** 消息分类名称 */
  msgCategoryName?: string;
  /** 消息领域分类名称 */
  msgDomainCategoryName?: string;
  /** 业务类型名称 */
  categoryName?: string;
  /**
   * 交易开始时间
   * @format date-time
   */
  datetimeExecuteStart?: string;
  /**
   * 交易结束时间
   * @format date-time
   */
  datetimeExecuteEnd?: string;
  /** 执行结果 */
  status?: string;
  /** 执行结果名称 */
  statusName?: string;
  /**
   * 执行次数
   * @format int32
   */
  executionTimes?: number;
  /** 上次失败请求参数 */
  paramIn?: string;
  /** 上次失败错误信息 */
  failContent?: string;
}

/** 响应数据 */
export type PagingDataIntegratedConsoleVO = {
  list?: IntegratedConsoleVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataIntegratedConsoleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataIntegratedConsoleVO;
}

/** 导入配置表 */
export interface ImportSetting {
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
  /** 导入关键编码 */
  importKeyCode?: string;
  /** 业务领域 */
  businessDomain?: string;
  /** 数据表名 */
  tableName?: string;
  /** 导入说明 */
  importDesc?: string;
  /** 导入模板地址 */
  importTemplateUrl?: string;
  /**
   * 导入数据条数
   * @format int32
   */
  batchCount?: number;
  /** 数据表名 */
  sourceType?: string;
}

/** 响应数据 */
export type PagingDataImportSetting = {
  list?: ImportSetting[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataImportSetting {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataImportSetting;
}

export interface CommonImportAuto {
  importKey?: string;
  title?: string;
  tableName?: string;
  data?: Record<string, object>[];
  columns?: ImportColumn[];
  /** @format int32 */
  batchSize?: number;
  setting?: ImportSettingDTO;
  settingType?: string;
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

export interface ImportSettingDTO {
  /** 导入配置表 */
  settingModel?: ImportSetting;
  columnList?: ImportSettingColumn[];
  ruleList?: ImportSettingRule[];
  genTemplateName?: string;
}

/** 导入校验表 */
export interface ImportSettingRule {
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
  /** 校验类型 */
  validateType?: string;
  /** 校验名称 */
  validateName?: string;
  /** 唯一键字段列表 */
  uniqueColumns?: string;
  /** 数据转换配置 */
  datatransferJson?: string;
}

/** 上传控件文件VO */
export type AddFileTypeVO = {
  serialNumber?: string;
  fullFileName?: string;
  fileName?: string;
  fileType?: string;
  fileSizeShow?: string;
  fileSize?: number;
  timeUpload?: string;
  signedUrl?: string;
  percent?: number;
  id?: string;
} | null;

/** 通用响应类 */
export interface ResultAddFileTypeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 上传控件文件VO */
  data?: AddFileTypeVO;
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

export interface FileVO {
  path?: string;
  fileNames?: string[];
}

/** 菜单收藏夹表 */
export interface Favorite {
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
  userId?: string;
  moduleId?: string;
}

/** 设备 */
export interface Equipment {
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
  /**
   * 资产型号ID
   * @format int32
   */
  assetModelId?: number;
  /** 设备编码 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 设备描述 */
  equipmentDesc?: string;
  /** 资产编码 */
  assetCode?: string;
  /**
   * 生效时间
   * @format date-time
   */
  dateEffective?: string;
  /**
   * 失效时间
   * @format date-time
   */
  dateInvalid?: string;
  /** 存放位置 */
  position?: string;
  /** 保管部门 */
  departmentOwner?: string;
  /** 保管人 */
  userOwner?: string;
  /** 设备供应商 */
  equipmentSupplier?: string;
  /** 维保供应商 */
  maintenanceOwner?: string;
  /** 维保联系方式 */
  maintenanceOwnerContact?: string;
}

/** 响应数据 */
export type PagingDataEquipment = {
  list?: Equipment[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataEquipment {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataEquipment;
}

/** 企业表 */
export interface Enterprise {
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
  /** 企业编号 */
  epCode?: string;
  /** 企业简称 */
  epName?: string;
  /** 企业全称 */
  epFullName?: string;
  /** 企业地址 */
  epAddress?: string;
}

/** 响应数据 */
export type PagingDataEnterprise = {
  list?: Enterprise[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataEnterprise {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataEnterprise;
}

/** 企业信息表 */
export interface EnterpriseSearch {
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
  /** 模糊关键词 */
  keyword?: string;
}

/** 企业信息表 */
export interface EnterpriseVO {
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
  /** 企业编号 */
  epCode?: string;
  /** 企业简称 */
  epName?: string;
  /** 企业全称 */
  epFullName?: string;
  /** 企业地址 */
  epAddress?: string;
}

/** 响应数据 */
export type PagingDataEnterpriseVO = {
  list?: EnterpriseVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataEnterpriseVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataEnterpriseVO;
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

/** 系统下载任务表 */
export type DlTask = {
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
  /** 功能路径 */
  behaviorPath?: string;
  /** 表格唯一键 */
  tableKeyCode?: string;
  /** 下载配置 */
  jsonConfig?: string;
  /** excel路径 */
  excelPath?: string;
  /** 状态 */
  status?: string;
} | null;

/** 通用响应类 */
export interface ResultListDlTask {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: DlTask[] | null;
}

/** 查询条码信息 */
export type BarcodeDTO = {
  id?: string;
  barcode?: string;
  moScheId?: string;
  qty?: number;
  barcodeType?: string;
  status?: string;
  statusName?: string;
  parentBarcode?: string;
} | null;

/** 通用响应类 */
export interface ResultListBarcodeDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BarcodeDTO[] | null;
}

export interface DeliveryCardSearch {
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
   * 计划开始日期
   * @format date-time
   */
  planDateStart?: string;
  /**
   * 计划结束日期
   * @format date-time
   */
  planDateEnd?: string;
  workshopId?: string;
  workcenterId?: string;
  mitemId?: string;
  /** 排产单状态 */
  scheStatus?: string;
  /** 是否仅显示已打印 */
  isFinishDisplay?: boolean;
  /** 是否仅显示已生成 */
  isCreated?: boolean;
  moScheduleId?: string;
  /**
   * 生成开始日期
   * @format date-time
   */
  createDateStart?: string;
  /**
   * 生成结束日期
   * @format date-time
   */
  createDateEnd?: string;
  /** 配送卡状态 */
  deliveryStatus?: string;
  /** 配送卡条码 */
  deliveryCardNo?: string;
  barcodeRuleId?: string;
  /**
   * 本次生成数量
   * @format int32
   */
  createNum?: number;
  /**
   * 规格数量
   * @format int32
   */
  createSize?: number;
  /** 批量ID */
  ids?: string[];
  /** 原因 */
  reason?: string;
  deliveryCardId?: string;
  /**
   * 拆分数量
   * @format int32
   */
  splitNum?: number;
}

/** 配送卡输出类 */
export interface DeliveryCardVO {
  /**
   * 标签顺序号
   * @format int32
   */
  printSeq?: number;
  moScheduleId?: string;
  /** 排产单编码 */
  scheCode?: string;
  /** 排产单状态名称 */
  scheStatusName?: string;
  /**
   * 计划生产日期
   * @format date-time
   */
  datetimeSche?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 已生成数量
   * @format int32
   */
  generateQty?: number;
  /**
   * 已打印数量
   * @format int32
   */
  displayQty?: number;
  /**
   * 本次生成数量
   * @format int32
   */
  thisTimeQty?: number;
  /** 计量单位名称 */
  uomName?: string;
  /** 车间名称 */
  workshopName?: string;
  workcenterId?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  deliveryCardId?: string;
  /** deliveryCard条码 */
  deliveryCardNo?: string;
  /** deliveryCard状态名称 */
  deliveryCardStatuName?: string;
  /** deliveryCard数量 */
  qty?: number;
  /** 创建人名称 */
  creatorName?: string;
  /** @format date-time */
  timeCreate?: string;
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
  orgName?: string;
}

/** 响应数据 */
export type PagingDataDeliveryCardVO = {
  list?: DeliveryCardVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDeliveryCardVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDeliveryCardVO;
}

export interface DefectDealMethodSearch {
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
  /** 缺陷处理方法类别 */
  dealMethodType?: string;
  id?: string;
  /** 多个id */
  ids?: string[];
  defectDealMethod?: string;
}

/** 缺陷处理方法 */
export interface DefectDealMethod {
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
  /** 处理方法代码 */
  methodCode?: string;
  /** 处理方法名称 */
  methodName?: string;
  /** 处理方法类别 */
  dealMethodType?: string;
}

/** 显示缺陷处理方法 */
export interface DefectDealMethodVO {
  id?: string;
  /** 处理方法代码 */
  methodCode?: string;
  /** 处理方法名称 */
  methodName?: string;
  /** 缺陷处理方法类别 */
  dealMethodType?: string;
  /** 缺陷处理方法类别名称 */
  dealMethodTypeName?: string;
}

/** 响应数据 */
export type PagingDataDefectDealMethodVO = {
  list?: DefectDealMethodVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDefectDealMethodVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDefectDealMethodVO;
}

export interface DefectCodeSearch {
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
  id?: string;
  /** 多个ID */
  ids?: string[];
  /** 缺陷代码 */
  defectCode?: string;
  /** 缺陷名称 */
  defectName?: string;
  parentDefectId?: string;
}

/** 缺陷代码 */
export interface DefectCode {
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
  /** 缺陷代码 */
  defectCode?: string;
  /** 缺陷名称 */
  defectName?: string;
  parentDefectId?: string;
  /**
   * 层级序号
   * @format int32
   */
  levelSeq?: number;
  /** 不合格分类 */
  classification?: string;
}

/** 显示缺陷代码实体 */
export interface DefectCodeVO {
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
  /** 缺陷代码 */
  defectCode?: string;
  /** 缺陷名称 */
  defectName?: string;
  parentDefectId?: string;
  /**
   * 层级序号
   * @format int32
   */
  levelSeq?: number;
  /** 不合格分类 */
  classification?: string;
  /** 前端按钮样式 */
  themeButton?: string;
  /** 工序id */
  processId?: string;
  /** 子元素 */
  child?: DefectCodeVO[];
  stateName?: string;
  isState?: boolean;
}

/** 响应数据 */
export type PagingDataDefectCodeVO = {
  list?: DefectCodeVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDefectCodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDefectCodeVO;
}

/** 响应数据 */
export type PagingDataDefectCode = {
  list?: DefectCode[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDefectCode {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDefectCode;
}

/** 客户 */
export interface Customer {
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
  /** 客户代码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户简称 */
  shortName?: string;
}

/** 响应数据 */
export type PagingDataCustomer = {
  list?: Customer[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataCustomer {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataCustomer;
}

/** 通用响应类 */
export interface ResultCustomer {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 客户 */
  data?: Customer;
}

export interface JSONObject {
  empty?: boolean;
  [key: string]: any;
}

/** 容器类型表 */
export interface ContainerType {
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
  /** 容器类型代码 */
  containerTypeCode?: string;
  /** 容器类型名称 */
  containerTypeName?: string;
  /** 容器类型描述 */
  containerTypeDesc?: string;
}

export interface ContainerTypeSearch {
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
  /** 状态 */
  state?: number[];
  /** 模糊关键词 */
  keyword?: string;
}

/** 显示工站 */
export interface ContainerTypeVO {
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
  /** 容器类型代码 */
  containerTypeCode?: string;
  /** 容器类型名称 */
  containerTypeName?: string;
  /** 容器类型描述 */
  containerTypeDesc?: string;
  /** 状态 */
  stateName?: string;
  /** 创建人 */
  creatorName?: string;
  /** 修改人 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataContainerTypeVO = {
  list?: ContainerTypeVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataContainerTypeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataContainerTypeVO;
}

/** 容器与物料表 */
export interface ContainerInMitem {
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
  containerTypeId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 标准数量 */
  qty?: number;
}

export interface ContainerInMitemSearch {
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
  /** 状态 */
  state?: number[];
  containerTypeId?: string;
  /** 模糊关键词 */
  keyword?: string;
}

/** 显示工站 */
export interface ContainerInMitemVO {
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
  containerTypeId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 标准数量 */
  qty?: number;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 物料分类代码 */
  categoryCode?: string;
  /** 物料分类名称 */
  categoryName?: string;
  /** 创建人 */
  creatorName?: string;
  /** 修改人 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataContainerInMitemVO = {
  list?: ContainerInMitemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataContainerInMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataContainerInMitemVO;
}

export interface ContainerSearch {
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
  /** 状态 */
  status?: string;
  containerTypeId?: string;
  /** 模糊关键词 */
  keyword?: string;
  barcodeRuleId?: string;
  /**
   * 生成数量
   * @format int32
   */
  createNum?: number;
}

/** 显示工站 */
export interface ContainerVO {
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
  /** 容器类型代码 */
  containerCode?: string;
  /** 容器类型名称 */
  containerName?: string;
  containerTypeId?: string;
  /** 状态 */
  status?: string;
  /** 状态 */
  statusName?: string;
  /** 创建人 */
  creatorName?: string;
  /** 修改人 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataContainerVO = {
  list?: ContainerVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataContainerVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataContainerVO;
}

/** 业务单元模板库明细表 */
export interface BusinessTmplLibDtl {
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
  businessTmplId?: string;
  /**
   * 执行顺序
   * @format int32
   */
  execSeq?: number;
  businessUnitId?: string;
}

/** 业务单元模板库表 */
export interface BusinessTmplLib {
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
  /** 模板名称 */
  tmplName?: string;
}

/** 通用响应类 */
export interface ResultListBusinessTmplLibDtl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BusinessTmplLibDtl[] | null;
}

/** 通用响应类 */
export interface ResultListBusinessTmplLib {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BusinessTmplLib[] | null;
}

/** 在制品条码日志表 */
export interface BarcodeWipLog {
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
  /** 条码序列号 */
  serialNumber?: string;
  /** 原因 */
  reason?: string;
  /** 条码模板代码 */
  tmplCode?: string;
  /** 条码模板名称 */
  tmplName?: string;
  /** 条码模板类别 */
  tmplCategory?: string;
  /** 客户端机器名 */
  hostname?: string;
  /** 客户端IP */
  ipaddress?: string;
  /** 备注 */
  memo?: string;
  /** 操作类型 */
  operateType?: string;
  /** 状态 */
  status?: string;
}

/** 在制品条码表 */
export interface BarcodeWip {
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
  /** 条码序列号 */
  serialNumber?: string;
  moScheId?: string;
  workcenterId?: string;
  processId?: string;
  workstationId?: string;
  /**
   * 顺序
   * @format int32
   */
  seq?: number;
  /** 在制品数量 */
  qty?: number;
  /** 结余数量 */
  balanceQty?: number;
  /**
   * 缺陷次数
   * @format int32
   */
  ngTimes?: number;
  /**
   * 是否完工
   * @format int32
   */
  isCompleted?: number;
  /** 状态 */
  status?: string;
  onhandId?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
}

export interface BarcodeWipSearch {
  /**
   * 拆分数量
   * @format int32
   */
  splitNum?: number;
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
   * 计划开始日期
   * @format date-time
   */
  planDateStart?: string;
  /**
   * 计划结束日期
   * @format date-time
   */
  planDateEnd?: string;
  workshopId?: string;
  workcenterId?: string;
  mitemId?: string;
  /** 排产单状态 */
  scheStatus?: string;
  /** 是否仅显示已打印 */
  isFinishDisplay?: boolean;
  moScheduleId?: string;
  /** 是否仅显示已生成 */
  isCreated?: boolean;
  /** 条码状态 */
  barcodeStatus?: string;
  /** 条码 */
  barcode?: string;
  /**
   * 生成开始日期
   * @format date-time
   */
  createDateStart?: string;
  /**
   * 生成结束日期
   * @format date-time
   */
  createDateEnd?: string;
  barcodeRuleId?: string;
  /**
   * 生成数量
   * @format int32
   */
  createNum?: number;
  barcodeWipId?: string;
  /** 在制品条码 */
  serialNumber?: string;
  /** 在制品条码状态 */
  barcodeWipStatus?: string;
  /** 原因 */
  reason?: string;
  /** 批量ID */
  ids?: string[];
}

/** 显示产品条码管理 */
export interface BarcodeWipVO {
  /** 排产单编码 */
  scheCode?: string;
  /** 排产单状态 */
  scheStatusName?: string;
  /**
   * 计划生产日期
   * @format date-time
   */
  datetimeSche?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 已生成数量
   * @format int32
   */
  generateQty?: number;
  /**
   * 已打印数量
   * @format int32
   */
  displayQty?: number;
  /**
   * 本次生成数量
   * @format int32
   */
  thisTimeQty?: number;
  /** 条码规则 */
  barcodeRule?: string;
  /** 打印模板 */
  printTmpl?: string;
  /** 车间名称 */
  workshopName?: string;
  orgName?: string;
  workcenterId?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 计量单位名称 */
  uomName?: string;
  /** 计量单位 */
  uom?: string;
  barcodeWipId?: string;
  /** 条码 */
  serialNumber?: string;
  /** 在制品条码状态 */
  barcodeWipStatusName?: string;
  /**
   * 在制品数量
   * @format int32
   */
  wipNum?: number;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  moScheduleId?: string;
  /** 条码状态 */
  status?: string;
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
}

/** 响应数据 */
export type PagingDataBarcodeWipVO = {
  list?: BarcodeWipVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBarcodeWipVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBarcodeWipVO;
}

export interface BarcodeVaildateRuleSearch {
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
  /** 规则模糊查询关键词 */
  ruleKeyword?: string;
  /** 条码类型 */
  barcodeTypeCode?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  /** 条码验证分组 */
  barcodeValidateGroup?: string;
  id?: string;
  /** 多个id */
  ids?: string[];
  /** 状态 */
  state?: number[];
}

/** 条码验证规则表 */
export interface BarcodeValidateRule {
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
  /** 规则代码 */
  ruleCode?: string;
  /** 规则名称 */
  ruleName?: string;
  /**
   * 优先级
   * @format int32
   */
  pri?: number;
  /** 条码类型 */
  barcodeType?: string;
  /** 条码验证分组 */
  barcodeValidateGroup?: string;
  /** 条码规则 */
  barcodeExpression?: string;
  /**
   * 最小
   * @format int32
   */
  minLength?: number;
  /**
   * 最大
   * @format int32
   */
  maxLength?: number;
  /** 备注 */
  memo?: string;
  mitemCategoryId?: string;
  mitemId?: string;
}

/** 条码规则显示 */
export interface BarcodeVaildateRuleVO {
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
   * 状态
   * @format int32
   */
  state?: number;
  eid?: string;
  oid?: string;
  /** 规则代码 */
  ruleCode?: string;
  /** 规则名称 */
  ruleName?: string;
  /**
   * 优先级
   * @format int32
   */
  pri?: number;
  /** 条码类型 */
  barcodeType?: string;
  /** 条码验证分组 */
  barcodeValidateGroup?: string;
  /** 条码规则 */
  barcodeExpression?: string;
  /**
   * 最小
   * @format int32
   */
  minLength?: number;
  /**
   * 最大
   * @format int32
   */
  maxLength?: number;
  /** 备注 */
  memo?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 条码类型名称 */
  barcodeTypeName?: string;
  /** 条码验证分组名称 */
  barcodeValidateGroupName?: string;
  /** 物料分类名称 */
  categoryName?: string;
  /** 物料名称 */
  mitemName?: string;
}

/** 响应数据 */
export type PagingDataBarcodeVaildateRuleVO = {
  list?: BarcodeVaildateRuleVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBarcodeVaildateRuleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBarcodeVaildateRuleVO;
}

export interface BarcodeSequenceDTO {
  currentNum?: string;
  barcodeType?: string;
  prefix?: string;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

/** 条码生成序列号表 */
export interface BarcodeSequence {
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
  /** 条码类别 */
  barcodeType?: string;
  /** 前辍 */
  prefix?: string;
  currentValue?: string;
  barcodeRuleId?: string;
}

export interface BarcodeRuleInMitemSearch {
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
  /** 规则模糊查询关键词 */
  ruleKeyword?: string;
  /** 规则模糊查询关键词 */
  mitemKeyword?: string;
  /** 下拉模糊查询关键词 */
  selectKeyword?: string;
  ruleId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 多个id */
  ids?: string[];
  /** 状态 */
  state?: number[];
}

/** 条码生成规则 */
export interface BarcodeRule {
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
  /** 条码规则代码 */
  ruleCode?: string;
  /** 条码规则名称 */
  ruleName?: string;
  /** 条码规则描述 */
  ruleDesc?: string;
  /** 条码类型 */
  barcodeType?: string;
  /** 条码规则表达式 */
  ruleExpression?: string;
}

/** 条码规则显示 */
export interface BarcodeRuleInMitemVO {
  id?: string;
  barcodeRuleId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  /** 条码规则代码 */
  ruleCode?: string;
  /** 条码规则名称 */
  ruleName?: string;
  /** 条码规则描述 */
  ruleDesc?: string;
  /** 条码类型 */
  barcodeType?: string;
  /** 条码类型名称 */
  barcodeTypeName?: string;
  /** 条码规则表达式 */
  ruleExpression?: string;
  /** 物料分类代码 */
  categoryCode?: string;
  /** 物料分类名称 */
  categoryName?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
}

/** 响应数据 */
export type PagingDataBarcodeRuleInMitemVO = {
  list?: BarcodeRuleInMitemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBarcodeRuleInMitemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBarcodeRuleInMitemVO;
}

/** 产品条码生成规则表 */
export interface BarcodeRuleInMitem {
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
  barcodeRuleId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
}

export interface BarcodePkgSearch {
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
   * 计划开始日期
   * @format date-time
   */
  planDateStart?: string;
  /**
   * 计划结束日期
   * @format date-time
   */
  planDateEnd?: string;
  workshopId?: string;
  workcenterId?: string;
  mitemId?: string;
  /** 排产单单状态 */
  scheStatus?: string;
  moScheduleId?: string;
  /** 是否仅显示已生成 */
  isCreated?: boolean;
  barcodeRuleId?: string;
  /**
   * 生成数量
   * @format int32
   */
  createNum?: number;
  /**
   * 生成规格
   * @format int32
   */
  packQty?: number;
  /** 包装类型 */
  packType?: string;
  /**
   * 生成开始日期
   * @format date-time
   */
  createDateStart?: string;
  /**
   * 生成结束日期
   * @format date-time
   */
  createDateEnd?: string;
  /** 条码类型 */
  barcodeType?: string;
  barcodePkgId?: string;
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码状态 */
  barcodePkgStatus?: string;
  /** 批量ID */
  ids?: string[];
  /** 原因 */
  reason?: string;
}

/** 显示包装条码管理 */
export interface BarcodePkgVO {
  moScheduleId?: string;
  /** 排产单编码 */
  scheCode?: string;
  /** 排产单状态名称 */
  scheStatusName?: string;
  /**
   * 计划生产日期
   * @format date-time
   */
  datetimeSche?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /** 计量单位名称 */
  uomName?: string;
  /** 车间名称 */
  workshopName?: string;
  workcenterId?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 包装类型名称 */
  packTypeName?: string;
  /** 包装类型TAG名称 */
  packTypeTagName?: string;
  /**
   * 包装规格
   * @format int32
   */
  packQty?: number;
  /** 包装规格展示 */
  packQtyShow?: string;
  /**
   * 已生成数量
   * @format int32
   */
  generateQty?: number;
  /**
   * 已打印数量
   * @format int32
   */
  displayQty?: number;
  /**
   * 计划数量张数
   * @format int32
   */
  planSheet?: number;
  /**
   * 已生成数量张数
   * @format int32
   */
  generateSheet?: number;
  /**
   * 已打印数量张数
   * @format int32
   */
  displaySheet?: number;
  /**
   * 本次生成数量
   * @format int32
   */
  thisTimeQty?: number;
  /**
   * 包装层级
   * @format int32
   */
  packLevel?: number;
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码状态 */
  pkgBarcodeStatusName?: string;
  /**
   * 包装条码数量
   * @format int32
   */
  qty?: number;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 包装类型 */
  packType?: string;
  /** 包装规则代码 */
  packRuleCode?: string;
  /** 包装规则名称 */
  packRuleName?: string;
  /** 包装条码类型 */
  pkgBarcodeType?: string;
  /** 包装条码类型名称 */
  pkgBarcodeTypeName?: string;
  /** 子包装条码类型 */
  subPkgBarcodeType?: string;
  /** 子包装条码类型名称 */
  subPkgBarcodeTypeName?: string;
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
  barcodePkgId?: string;
  ruleDtlId?: string;
}

/** 响应数据 */
export type PagingDataBarcodePkgVO = {
  list?: BarcodePkgVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBarcodePkgVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBarcodePkgVO;
}

/** 完工入库标签实体 */
export interface WipCompletionLabelDTO {
  dtlBarcodeId?: string;
  billId?: string;
  /** 单据号 */
  billNo?: string;
  /** 业务类型编码 */
  businessCategoryCode?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  mitemCategoryId?: string;
  warehouseId?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  moScheId?: string;
  /** 工单编码 */
  moCode?: string;
  workshopId?: string;
  /** 车间名称 */
  workshopName?: string;
  workcenterId?: string;
  /** 工作中心名称 */
  workcenterName?: string;
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
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  onhandId?: string;
}

/** 出勤模式 */
export interface AttendanceMode {
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
  /** 出勤模式代码 */
  modeCode?: string;
  /** 出勤模式名称 */
  modeName?: string;
  /** 出勤模式描述 */
  modeDesc?: string;
  /** 出勤模式表达式 */
  expression?: string;
  /** 班次 */
  shiftCode?: string;
  /** 备注 */
  memo?: string;
}

/** 显示工站 */
export interface AttendanceModeVO {
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
  /** 出勤模式代码 */
  modeCode?: string;
  /** 出勤模式名称 */
  modeName?: string;
  /** 出勤模式描述 */
  modeDesc?: string;
  /** 出勤模式表达式 */
  expression?: string;
  /** 班次 */
  shiftCode?: string;
  /** 备注 */
  memo?: string;
  /** 班次名称 */
  shiftName?: string;
  /** 时间段拆分 */
  expressionSpilt?: string[][];
}

/** 响应数据 */
export type PagingDataAttendanceModeVO = {
  list?: AttendanceModeVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataAttendanceModeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataAttendanceModeVO;
}

/** 通用响应类 */
export interface ResultAttendanceMode {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 出勤模式 */
  data?: AttendanceMode;
}

export interface AttendanceModeSearch {
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
  /** 模糊关键词 */
  keyword?: string;
  /** 班次 */
  shiftCode?: string;
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

/** 通用响应类 */
export interface ResultWorkbenchLayout {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 工作台布局表 */
  data?: WorkbenchLayout;
}

/** 通用响应类 */
export interface ResultListWorkbenchIndex {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WorkbenchIndex[] | null;
}

/** 工作台指标表 */
export type WorkbenchIndex = {
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
  /** 指标编码 */
  indexCode?: string;
  /** 指标名称 */
  indexName?: string;
  /** 指标描述 */
  indexDesc?: string;
  /** 指标地址 */
  indexUrl?: string;
  /**
   * 指标宽
   * @format int32
   */
  indexWidth?: number;
  /**
   * 指标高
   * @format int32
   */
  indexHeigth?: number;
  /** 指标分类 */
  indexCategory?: string;
  /** 指标图标 */
  indexIcon?: string;
} | null;

/** 通用响应类 */
export interface ResultListUserInRoleVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: UserInRoleVO[] | null;
}

/** 响应数据 */
export type UserInRoleVO = {
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
  /** 角色代码 */
  roleCode?: string;
  /** 角色名称 */
  roleName?: string;
  /** 角色描述 */
  roleDesc?: string;
  /** 用户名 */
  userName?: string;
  /** 用户id */
  userId?: string;
  relate?: boolean;
} | null;

/** 通用响应类 */
export interface ResultListUserInOrgVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: UserInOrgVO[] | null;
}

/** 响应数据 */
export type UserInOrgVO = {
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
  /** 用户名 */
  userName?: string;
  /** 用户id */
  userId?: string;
  default?: boolean;
  relate?: boolean;
} | null;

/** 通用响应类 */
export interface ResultListUser {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: User[] | null;
}

/** 当前用户实体 */
export type CurrentUserVO = {
  userId?: string;
  /** 用户名 */
  userName?: string;
  /** 显示名称 */
  displayName?: string;
  eid?: string;
  defaultOrgId?: string;
  /** 授权组织 */
  orgList?: OrgVO[];
  /** 关联角色 */
  roleList?: UserRoleVO[];
  personId?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobilePhone?: string;
  /**
   * 上次更新成员资格用户的密码的日期和时间
   * @format date-time
   */
  timeLastPasswordChanged?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
} | null;

/** 组织基础实体 */
export interface OrgVO {
  /** 组织ID */
  id?: string;
  /** 组织编码 */
  code?: string;
  /** 组织名称 */
  name?: string;
}

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

/**  用户角色实体 */
export interface UserRoleVO {
  id?: string;
  /** 角色编码 */
  code?: string;
  /** 角色名称 */
  name?: string;
}

/** 响应数据 */
export type PagingDataParam = {
  list?: Param[];
  /** @format int32 */
  total?: number;
} | null;

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
export interface ResultInteger {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /**
   * 响应数据
   * @format int32
   */
  data?: number | null;
}

/** 响应数据 */
export type PagingDataRoutingMapVO = {
  list?: RoutingMapVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataRoutingMapVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataRoutingMapVO;
}

/** 工艺路线关联产品实体 */
export interface RoutingMapVO {
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
  /** 类型编码 */
  mitemCategoryCode?: string;
  /** 类型名称 */
  mitemCategoryName?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 产品名称 */
  mitemName?: string;
  /** 工作中心 */
  workcenter?: string;
  /**
   * 是否默认
   * @format int32
   */
  isDefault?: number;
}

/** 响应数据 */
export type PagingDataRoutingVO = {
  list?: RoutingVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataRoutingVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataRoutingVO;
}

/** 工艺路线展示实体 */
export interface RoutingVO {
  id?: string;
  /** 工艺路线编码 */
  routingCode?: string;
  /** 工艺路线名称 */
  routingName?: string;
  /** 工艺路线描述 */
  routingDesc?: string;
  /** 工艺路线类型 */
  routingType?: string;
  routingVersionId?: string;
  /**
   * 工艺路线版本
   * @format int32
   */
  routingVersion?: number;
  /**
   * 启用时间
   * @format date-time
   */
  enableDate?: string;
  /**
   * 失效时间
   * @format date-time
   */
  invailDate?: string;
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
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
}

/** 通用响应类 */
export interface ResultRoutingDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 工艺路线实体 */
  data?: RoutingDTO;
}

/** 通用响应类 */
export interface ResultListRoutingProcessTreeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: RoutingProcessTreeVO[] | null;
}

/** 响应数据 */
export type RoutingProcessTreeVO = {
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
  /** 工艺路线类型 */
  routingType?: string;
  routingRevisionId?: string;
  /**
   * 版本
   * @format int32
   */
  version?: number;
  /** 显示名称 */
  title?: string;
  /** 子层级 */
  children?: RoutingProcessVO[];
} | null;

/** 子层级 */
export interface RoutingProcessVO {
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
  routingRevisionId?: string;
  processId?: string;
  /** 工序类型 */
  processType?: string;
  /** 工序显示名称 */
  title?: string;
}

/** 配置项 */
export type Profile = {
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
  moduleId?: string;
  /** 配置项编码 */
  profileCode?: string;
  /** 配置项名称 */
  profileName?: string;
  /** 配置项描述 */
  profileDesc?: string;
  /** 配置项值类型 */
  valueType?: string;
  /** 配置项值范围 */
  valueRange?: string;
} | null;

/** 通用响应类 */
export interface ResultProfile {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 配置项 */
  data?: Profile;
}

/** 配置左侧树形实体 */
export type ProfileLeftTreeTopVO = {
  id?: string;
  /** 级别名称 */
  modelName?: string;
  parentModuleId?: string;
  /**
   * 属性
   * @format int32
   */
  attribute?: number;
  /** 子模块 */
  childList?: object[];
} | null;

/** 通用响应类 */
export interface ResultListProfileLeftTreeTopVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ProfileLeftTreeTopVO[] | null;
}

/** 显示包装规则明细列表 */
export type ProductPackRuleDtlVO = {
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
  packRuleId?: string;
  /** 包装类型 */
  packType?: string;
  /**
   * 包装数量
   * @format int32
   */
  packQty?: number;
  /** 单位 */
  uom?: string;
  parentPackId?: string;
  /**
   * 包装层级
   * @format int32
   */
  packLevel?: number;
  packTypeName?: string;
  packLevelName?: string;
  uomName?: string;
  /** 子层级 */
  children?: ProductPackRuleDtlVO[];
} | null;

/** 通用响应类 */
export interface ResultListProductPackRuleDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ProductPackRuleDtlVO[] | null;
}

/** 权限功能实体 */
export type ModulePermissionDTO = {
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
  /**
   * 客户端类型
   * @format int32
   */
  clientType?: number;
  /** 模块层次代码 */
  moduleLevel?: string;
  /** 模块编码 */
  moduleCode?: string;
  /** 模块名称 */
  moduleName?: string;
  /** 模块描述 */
  moduleDesc?: string;
  parentModuleId?: string;
  /**
   * 显示顺序
   * @format int32
   */
  sortIndex?: number;
  /** 模块访问地址 */
  behaviorPath?: string;
  /** 图标地址 */
  iconPath?: string;
  /** 图标颜色 */
  iconColor?: string;
  /** 模块类型 */
  moduleType?: string;
  /** 模块版本号 */
  moduleVersion?: number;
  /** 模块包标识 */
  modulePackageIdentify?: string;
  /** 模块包名称 */
  packageName?: string;
  permissionId?: string;
  /** 权限名称 */
  permissionName?: string;
  /** 权限描述 */
  permissionDescription?: string;
  /** 权限转改 */
  permissionState?: string;
  /** 权限URL */
  operationUri?: string;
  /** 是否禁用 */
  isForbidden?: string;
  /** 支持设备 */
  supportDevice?: string;
  /** 是否角色禁用 */
  isForbiddenRole?: string;
  /** 是否继承角色 */
  isFromRole?: string;
  /** 继承角色 */
  fromRoleName?: string;
  /** 功能名称-按语言 */
  moduleNameT?: string;
  /** 功能描述-按语言 */
  moduleDescriptionT?: string;
  /** 子级 */
  children?: ModulePermissionDTO[];
  /** 按钮权限 */
  buttons?: ModulePermissionDTO[];
  /** 是否可用 */
  enabled?: boolean;
  /** 是否不可编辑 */
  disable?: boolean;
  /** 是否拒绝 */
  refuse?: boolean;
  /** 拒绝是否不可编辑 */
  refuseDisable?: boolean;
} | null;

/** 通用响应类 */
export interface ResultListModulePermissionDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ModulePermissionDTO[] | null;
}

/** 显示系统字典组 */
export type ParamGroupTreeVO = {
  domain?: string;
  value?: string;
  label?: string;
  children?: ParamGroupVO[];
} | null;

/** 显示系统字典组 */
export interface ParamGroupVO {
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
  /** 业务领域 */
  paramDomain?: string;
  /** 字典组代码 */
  paramGroupCode?: string;
  /** 字典组名称 */
  paramGroupName?: string;
  /** 字典组描述 */
  paramGroupDesc?: string;
  /**
   * 是否系统字典
   * @format int32
   */
  isSys?: number;
  /** 字典数据类型 */
  paramDataType?: string;
  value?: string;
  label?: string;
  isState?: boolean;
}

/** 通用响应类 */
export interface ResultListParamGroupTreeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ParamGroupTreeVO[] | null;
}

/** 通用响应类 */
export interface ResultListParam {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Param[] | null;
}

/** 响应数据 */
export type KeyValuePairStringString = {
  value?: string;
  label?: string;
  /** @format int32 */
  num?: number;
  id?: string;
  res?: string[];
} | null;

/** 通用响应类 */
export interface ResultListKeyValuePairStringString {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: KeyValuePairStringString[] | null;
}

/** 显示组织层级实体 */
export type OrgLevelTreeVO = {
  id?: string;
  /** 组织层级编码 */
  levelCode?: string;
  /** 组织层级名称 */
  levelName?: string;
  /**
   * 层级序列
   * @format int32
   */
  levelSeq?: number;
  /**
   * 区隔标记，1表示库存组织，默认0
   * @format int32
   */
  divisionFlag?: number;
  /** 子层级 */
  children?: OrgLevelTreeVO[];
} | null;

/** 通用响应类 */
export interface ResultListOrgLevelTreeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: OrgLevelTreeVO[] | null;
}

/** 显示组织层级实体 */
export type OrgTreeVO = {
  id?: string;
  eid?: string;
  oid?: string;
  /** 组织层级编码 */
  levelCode?: string;
  /** 组织层级名称 */
  levelName?: string;
  /** 子层级 */
  children?: OrgTreeVO[];
  /** 组织编号 */
  orgCode?: string;
  /** 组织名称 */
  orgName?: string;
  /** 组织描述 */
  orgDesc?: string;
  parentOrgId?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
} | null;

/** 通用响应类 */
export interface ResultListOrgTreeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: OrgTreeVO[] | null;
}

/** 通用响应类 */
export interface ResultListOrg {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Org[] | null;
}

/** 响应数据 */
export type PagingDataParamGroup = {
  list?: ParamGroup[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataParamGroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataParamGroup;
}

/** 领域对象扩展属性分类 */
export type ObjectPropertyCategory = {
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
  /** 领域名称编码 */
  objectCode?: string;
  /** 类别编码 */
  categoryCode?: string;
  /** 类别名称 */
  categoryName?: string;
} | null;

/** 通用响应类 */
export interface ResultListObjectPropertyCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ObjectPropertyCategory[] | null;
}

/** 响应数据 */
export type PagingDataObjectPropertyCategory = {
  list?: ObjectPropertyCategory[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataObjectPropertyCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataObjectPropertyCategory;
}

/** 响应数据 */
export type ObjectPropertyValueVO = {
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
  /** 领域对象编码 */
  objectCode?: string;
  categoryId?: string;
  /** 属性代码 */
  propertyCode?: string;
  /** 属性值类型 */
  propertyValueType?: string;
  /** 显示在界面上的名词 */
  displayName?: string;
  /**
   * 属性中的显示顺序
   * @format int32
   */
  displaySequence?: number;
  /**
   * 是否必填项
   * @format int32
   */
  isRequire?: number;
  /**
   * 是否允许存在多个同类项
   * @format int32
   */
  isMultiple?: number;
  /**
   * 是否需要校验输入
   * @format int32
   */
  needValidation?: number;
  /** 校验的正则表达式 */
  validExpression?: string;
  /** 扩展属性数据来源 */
  dataSource?: string;
  /** 数据取值路径 */
  dataSourcePath?: string;
  /** 备注 */
  memo?: string;
  /**
   * 是否数据源多选
   * @format int32
   */
  isDataMultiple?: number;
  /** 对象ID */
  objectId?: string;
  /** 对象属性值 */
  propertyValue?: string;
  /** 扩展属性类型编码 */
  categoryCode?: string;
  /** 扩展属性类型名称 */
  categoryName?: string;
} | null;

/** 通用响应类 */
export interface ResultListObjectPropertyValueVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ObjectPropertyValueVO[] | null;
}

/** 响应数据 */
export type PagingDataModule = {
  list?: Module[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataModule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataModule;
}

/** 通用响应类 */
export interface ResultListPrintTmpl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PrintTmpl[] | null;
}

/** 通用响应类 */
export interface ResultListBarcodeRule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BarcodeRule[] | null;
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
export interface ResultImportSettingDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: ImportSettingDTO;
}

/** 响应数据 */
export type Dropdown = {
  value?: string;
  label?: string;
} | null;

/** 通用响应类 */
export interface ResultListDropdown {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Dropdown[] | null;
}

/** 通用响应类 */
export interface ResultListFavorite {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Favorite[] | null;
}

/** 响应数据 */
export type PagingDataBarcodeRule = {
  list?: BarcodeRule[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBarcodeRule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBarcodeRule;
}

/** 业务执行单元表 */
export type BusinessUnit = {
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
  /** 服务名称 */
  apiName?: string;
  /** 服务描述 */
  apiDesc?: string;
  /** 服务路径 */
  apiPath?: string;
  /** 入参列表 */
  paramInput?: string;
  /** 出参列表 */
  paramOutput?: string;
  /** 服务分类 */
  paramCategory?: string;
} | null;

/** 通用响应类 */
export interface ResultListBusinessUnit {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BusinessUnit[] | null;
}

/** 条码段 */
export interface BarcodeSegment {
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
  /** 条码段名称 */
  segmentName?: string;
  /** 条码段类型 */
  segmentType?: string;
  /** 条码段格式值 */
  segmentFormat?: string;
  /** 备注 */
  memo?: string;
}

/** 输出条码规则片段 */
export interface BarcodeSegmentDTO {
  /** 规则类别 */
  segmentName?: string;
  /** 规则 */
  rules?: BarcodeSegment[];
}

/** 响应数据 */
export type PagingDataBarcodeSegmentDTO = {
  list?: BarcodeSegmentDTO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBarcodeSegmentDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBarcodeSegmentDTO;
}

/** APP底座表 */
export type AppBase = {
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
  /** APP名称 */
  appName?: string;
  /** APP版本号 */
  appVersion?: string;
  /** APP类型 */
  appType?: string;
  /** APP地址 */
  appPath?: string;
  /** APP构建版本号 */
  appBuild?: number;
  /** 包名称 */
  packageName?: string;
  /** 备注 */
  memo?: string;
} | null;

/** 通用响应类 */
export interface ResultAppBase {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** APP底座表 */
  data?: AppBase;
}

/** APP底座显示实体 */
export interface AppBaseVO {
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
  /** APP名称 */
  appName?: string;
  /** APP版本号 */
  appVersion?: string;
  /** APP类型 */
  appType?: string;
  /** APP地址 */
  appPath?: string;
  /** APP构建版本号 */
  appBuild?: number;
  /** 包名称 */
  packageName?: string;
  /** 备注 */
  memo?: string;
  creatorName?: string;
}

/** 响应数据 */
export type PagingDataAppBaseVO = {
  list?: AppBaseVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataAppBaseVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataAppBaseVO;
}

/** 显示行政组织层级实体 */
export type AdminOrgVO = {
  id?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 组织编号 */
  orgCode?: string;
  /** 组织名称 */
  orgName?: string;
  /** 组织描述 */
  orgDesc?: string;
  parentOrgId?: string;
  /**
   * 是否生效（1是，0否）
   * @format int32
   */
  isActive?: number;
  /** 子层级 */
  children?: AdminOrgVO[];
} | null;

/** 通用响应类 */
export interface ResultListAdminOrgVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: AdminOrgVO[] | null;
}

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  routingMap: {
    /**
     * No description
     *
     * @tags 工艺路线映射表
     * @name SetDefault
     * @summary 工艺路线关联产品设置默认
     * @request PUT:/routingMap/setDefault/{id}
     * @secure
     */
    setDefault: (
      id: string,
      query: {
        /** @format int32 */
        isDefault: number;
      },
    ) =>
      http.request<ResultObject['data']>(`/api/main/routingMap/setDefault/${id}`, {
        method: 'PUT',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 工艺路线映射表
     * @name Add
     * @summary 添加工艺路线关联产品
     * @request POST:/routingMap/add
     * @secure
     */
    add: (data: RoutingMap) =>
      http.request<ResultObject['data']>(`/api/main/routingMap/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工艺路线映射表
     * @name ListByRoutingCode
     * @summary 工艺路线关联产品
     * @request GET:/routingMap/listByRoutingCode
     * @secure
     */
    listByRoutingCode: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      routingCode: string;
      keyword?: string;
    }) =>
      http.request<ResultPagingDataRoutingMapVO['data']>(`/api/main/routingMap/listByRoutingCode`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 工艺路线映射表
     * @name DeleteBatch
     * @summary 批量删除工艺路线关联产品
     * @request DELETE:/routingMap/deleteBatch
     * @secure
     */
    deleteBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/routingMap/deleteBatch`, {
        method: 'DELETE',
        body: data as any,
      }),
  },
  routing: {
    /**
     * No description
     *
     * @tags 工艺路线
     * @name Update
     * @summary 更新工艺路线
     * @request PUT:/routing/update/{id}
     * @secure
     */
    update: (id: string, data: RoutingDTO) =>
      http.request<ResultObject['data']>(`/api/main/routing/update/${id}`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工艺路线
     * @name Enable
     * @summary 启用
     * @request PUT:/routing/enable/{id}
     * @secure
     */
    enable: (id: string, data: RoutingDTO) =>
      http.request<ResultObject['data']>(`/api/main/routing/enable/${id}`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工艺路线
     * @name Disable
     * @summary 禁用
     * @request PUT:/routing/disable/{id}
     * @secure
     */
    disable: (id: string) =>
      http.request<ResultObject['data']>(`/api/main/routing/disable/${id}`, {
        method: 'PUT',
      }),

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
      http.request<ResultPagingDataRouting['data']>(`/api/main/routing/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工艺路线
     * @name Add
     * @summary 新增工艺路线
     * @request POST:/routing/add
     * @secure
     */
    add: (data: RoutingDTO) =>
      http.request<ResultObject['data']>(`/api/main/routing/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工艺路线
     * @name MainPage
     * @summary 工艺路线主数据
     * @request GET:/routing/mainPage
     * @secure
     */
    mainPage: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      keyword?: string;
      routingType?: string;
      workcenterId?: string;
      productCategoryId?: string;
      productId?: string;
      /** @format int32 */
      state?: number;
    }) =>
      http.request<ResultPagingDataRoutingVO['data']>(`/api/main/routing/mainPage`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 工艺路线
     * @name Item
     * @summary 根据ID获取工艺路线
     * @request GET:/routing/item/{id}
     * @secure
     */
    item: (id: string) =>
      http.request<ResultRoutingDTO['data']>(`/api/main/routing/item/${id}`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 工艺路线
     * @name GetProcessTree
     * @summary 获取工艺路线工序树
     * @request GET:/routing/getProcessTree
     * @secure
     */
    getProcessTree: () =>
      http.request<ResultListRoutingProcessTreeVO['data']>(`/api/main/routing/getProcessTree`, {
        method: 'GET',
      }),
  },
  productPackRuleDtl: {
    /**
     * No description
     *
     * @tags 产品包装规则明细
     * @name Update
     * @summary 修改包装规则明细
     * @request PUT:/productPackRuleDtl/update
     * @secure
     */
    update: (data: ProductPackRuleDtl) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleDtl/update`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则明细
     * @name Add
     * @summary 新增包装规则明细
     * @request POST:/productPackRuleDtl/add
     * @secure
     */
    add: (data: ProductPackRuleDtl) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleDtl/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则明细
     * @name Tree
     * @summary 获取包装规则明细
     * @request GET:/productPackRuleDtl/tree
     * @secure
     */
    tree: (query: { productPackRuleId: string }) =>
      http.request<ResultListProductPackRuleDtlVO['data']>(`/api/main/productPackRuleDtl/tree`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则明细
     * @name Delete
     * @summary 删除包装规则明细，包括子集
     * @request DELETE:/productPackRuleDtl/delete
     * @secure
     */
    delete: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleDtl/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
  productPackRule: {
    /**
     * No description
     *
     * @tags 产品包装规则
     * @name Update
     * @summary 修改包装规则
     * @request PUT:/productPackRule/update
     * @secure
     */
    update: (data: ProductPackRule) =>
      http.request<ResultObject['data']>(`/api/main/productPackRule/update`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则
     * @name Add
     * @summary 新增包装规则
     * @request POST:/productPackRule/add
     * @secure
     */
    add: (data: ProductPackRule) =>
      http.request<ResultObject['data']>(`/api/main/productPackRule/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则
     * @name List
     * @summary 获取包装规则
     * @request GET:/productPackRule/list
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
       * @default 20
       */
      pageSize?: number;
      /** @default "" */
      packRuleCode?: string;
      /** @default "" */
      mitemCode?: string;
      /** @default "" */
      mitemCategory?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/main/productPackRule/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则
     * @name Delete
     * @summary 删除包装规则
     * @request DELETE:/productPackRule/delete
     * @secure
     */
    delete: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/main/productPackRule/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
  printTmplMap: {
    /**
     * No description
     *
     * @tags 标签模板关联
     * @name Update
     * @summary 更新打印模板
     * @request PUT:/printTmplMap/update/{id}
     * @secure
     */
    update: (id: string, data: PrintTmplMap) =>
      http.request<ResultObject['data']>(`/api/main/printTmplMap/update/${id}`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板关联
     * @name Search
     * @summary 获取模板关联
     * @request POST:/printTmplMap/items
     * @secure
     */
    search: (data: PrintTmplMapDTO) =>
      http.request<ResultPagingDataPrintTmplMapDTO['data']>(`/api/main/printTmplMap/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板关联
     * @name BatchDelete
     * @summary 批量删除
     * @request POST:/printTmplMap/batchDelete
     * @secure
     */
    batchDelete: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/printTmplMap/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板关联
     * @name Add
     * @summary 新增模板关联
     * @request POST:/printTmplMap/add
     * @secure
     */
    add: (data: PrintTmplMap) =>
      http.request<ResultObject['data']>(`/api/main/printTmplMap/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  printTmpl: {
    /**
     * No description
     *
     * @tags 标签模板
     * @name Update
     * @summary 更新打印模板
     * @request PUT:/printTmpl/update/{id}
     * @secure
     */
    update: (id: string, data: PrintTmplDTO) =>
      http.request<ResultObject['data']>(`/api/main/printTmpl/update/${id}`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板
     * @name Search
     * @summary 获取模板清单
     * @request POST:/printTmpl/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataPrintTmpl['data']>(`/api/main/printTmpl/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板
     * @name BatchDelete
     * @summary 批量删除
     * @request POST:/printTmpl/batchDelete
     * @secure
     */
    batchDelete: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/printTmpl/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板
     * @name Add
     * @summary 新增打印模板
     * @request POST:/printTmpl/add
     * @secure
     */
    add: (data: PrintTmplDTO) =>
      http.request<ResultObject['data']>(`/api/main/printTmpl/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签模板
     * @name GetTmplByPath
     * @summary 获取模板
     * @request GET:/printTmpl/getTmplByPath
     * @secure
     */
    getTmplByPath: (query: { path: string }) =>
      http.request<ResultString['data']>(`/api/main/printTmpl/getTmplByPath`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 标签模板
     * @name GetTmplByIdOrCode
     * @summary 获取模板根据Id或Code
     * @request GET:/printTmpl/getTmplByIdOrCode
     * @secure
     */
    getTmplByIdOrCode: (query: { id: string; code: string }) =>
      http.request<ResultString['data']>(`/api/main/printTmpl/getTmplByIdOrCode`, {
        method: 'GET',
        params: query,
      }),
  },
  orgLevel: {
    /**
     * No description
     *
     * @tags 组织层级
     * @name Update
     * @summary 修改组织层级
     * @request PUT:/orgLevel/update
     * @secure
     */
    update: (data: OrgLevel) =>
      http.request<ResultObject['data']>(`/api/main/orgLevel/update`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 组织层级
     * @name Add
     * @summary 新增组织层级
     * @request POST:/orgLevel/add
     * @secure
     */
    add: (data: OrgLevel) =>
      http.request<ResultObject['data']>(`/api/main/orgLevel/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 组织层级
     * @name Tree
     * @summary 获取组织层级树
     * @request GET:/orgLevel/tree
     * @secure
     */
    tree: () =>
      http.request<ResultListOrgLevelTreeVO['data']>(`/api/main/orgLevel/tree`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 组织层级
     * @name Delete
     * @summary 删除组织层级，包括子集
     * @request DELETE:/orgLevel/delete
     * @secure
     */
    delete: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/main/orgLevel/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
  org: {
    /**
     * No description
     *
     * @tags 组织架构表
     * @name Update
     * @summary 修改组织
     * @request PUT:/org/update
     * @secure
     */
    update: (data: Org) =>
      http.request<ResultObject['data']>(`/api/main/org/update`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 组织架构表
     * @name Search
     * @request POST:/org/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataOrg['data']>(`/api/main/org/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 组织架构表
     * @name GetItemById
     * @request POST:/org/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultOrg['data']>(`/api/main/org/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 组织架构表
     * @name Add
     * @summary 新增组织
     * @request POST:/org/add
     * @secure
     */
    add: (data: Org) =>
      http.request<ResultObject['data']>(`/api/main/org/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 组织架构表
     * @name Tree
     * @summary 获取组织树
     * @request GET:/org/tree
     * @secure
     */
    tree: () =>
      http.request<ResultListOrgTreeVO['data']>(`/api/main/org/tree`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 组织架构表
     * @name GetlistByLevelCode
     * @summary 根据levelCode获取组织信息
     * @request GET:/org/getlistByLevelCode
     * @secure
     */
    getlistByLevelCode: (query: { search: string; levelCode: string }) =>
      http.request<ResultListOrg['data']>(`/api/main/org/getlistByLevelCode`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 组织架构表
     * @name Delete
     * @summary 删除组织，包括子集
     * @request DELETE:/org/delete
     * @secure
     */
    delete: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/main/org/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
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
      http.request<ResultObject['data']>(`/api/main/workstationAuth/save`, {
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
      http.request<ResultObject['data']>(`/api/main/workstationAuth/remove`, {
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
      http.request<ResultObject['data']>(`/api/main/workstationAuth/removeBatch`, {
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
      http.request<ResultObject['data']>(`/api/main/workstationAuth/input`, {
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
      http.request<ResultPagingDataWorkstationAuthVO['data']>(`/api/main/workstationAuth/getUserList`, {
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
      http.request<ResultPagingDataLong['data']>(`/api/main/workstationAuth/getUserAuth`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name GetList
     * @summary 查询主界面信息
     * @request POST:/workstationAuth/getList
     * @secure
     */
    getList: (data: WorkstationAuthSearch) =>
      http.request<ResultPagingDataWorkstationAuthVO['data']>(`/api/main/workstationAuth/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name CurrentUserWorkstation
     * @summary 获得当前用户所拥有权限的工站
     * @request POST:/workstationAuth/currentUserWorkstation
     * @secure
     */
    currentUserWorkstation: (data: CommonSearch) =>
      http.request<ResultPagingDataWorkstation['data']>(`/api/main/workstationAuth/currentUserWorkstation`, {
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
      http.request<ResultPagingDataWorkstation['data']>(`/api/main/workstation/items`, {
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
      http.request<ResultWorkstation['data']>(`/api/main/workstation/items/${id}`, {
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
      http.request<ResultObject['data']>(`/api/main/workstation/items/modify`, {
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
      http.request<ResultObject['data']>(`/api/main/workstation/items/add`, {
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
      http.request<ResultPagingDataWorkstationVO['data']>(`/api/main/workstation/getlist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name GetQcHoldWorkStationList
     * @summary 机台列表-应用于品质控制查询
     * @request POST:/workstation/getQcHoldWorkStationList
     * @secure
     */
    getQcHoldWorkStationList: (data: WorkstationQcHoldSearch) =>
      http.request<ResultPagingDataWorkstationQcHoldVO['data']>(`/api/main/workstation/getQcHoldWorkStationList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站
     * @name GetProcessCategory
     * @summary 获取当前工站的工序类型
     * @request GET:/workstation/getProcessCategory
     * @secure
     */
    getProcessCategory: (query: { workstationId: string }) =>
      http.request<ResultString['data']>(`/api/main/workstation/getProcessCategory`, {
        method: 'GET',
        params: query,
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
      http.request<ResultObject['data']>(`/api/main/workcenter/remove`, {
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
      http.request<ResultObject['data']>(`/api/main/workcenter/modify`, {
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
      http.request<ResultPagingDataWorkcenter['data']>(`/api/main/workcenter/items`, {
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
      http.request<ResultWorkcenter['data']>(`/api/main/workcenter/items/${id}`, {
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
      http.request<ResultPagingDataLong['data']>(`/api/main/workcenter/haveChildCenter`, {
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
      http.request<ResultPagingDataWorkcenterVO['data']>(`/api/main/workcenter/getList`, {
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
      http.request<ResultObject['data']>(`/api/main/workcenter/add`, {
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
      http.request<ResultWorkcenterVO['data']>(`/api/main/workcenter/getTagCount`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 工作中心
     * @name GetChildCenter
     * @summary 查询子工作中心
     * @request GET:/workcenter/getChildCenter
     * @secure
     */
    getChildCenter: (query: { id: string }) =>
      http.request<ResultPagingDataWorkcenterVO['data']>(`/api/main/workcenter/getChildCenter`, {
        method: 'GET',
        params: query,
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
      http.request<ResultPagingDataWorkcenterVO['data']>(`/api/main/workcenter/getCategory`, {
        method: 'GET',
      }),
  },
  workbenchTodo: {
    /**
     * No description
     *
     * @tags 个人工作台待办表
     * @name UpdateStatus
     * @summary 设置待办已处理
     * @request POST:/workbenchTodo/updateStatus
     * @secure
     */
    updateStatus: (data: WorkbenchTodoVO) =>
      http.request<ResultObject['data']>(`/api/main/workbenchTodo/updateStatus`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 个人工作台待办表
     * @name UpdateIsRead
     * @summary 设置待办已读
     * @request POST:/workbenchTodo/updateIsRead
     * @secure
     */
    updateIsRead: (data: WorkbenchTodoVO) =>
      http.request<ResultObject['data']>(`/api/main/workbenchTodo/updateIsRead`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 个人工作台待办表
     * @name List
     * @summary 获取待办
     * @request GET:/workbenchTodo/list
     * @secure
     */
    list: (query?: {
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
      title?: string;
      /** @default "" */
      status?: string;
      /** @default "" */
      datetimeStart?: string;
      /** @default "" */
      datetimeEnd?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/main/workbenchTodo/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 个人工作台待办表
     * @name ListCount
     * @summary 获取待办数量
     * @request GET:/workbenchTodo/listCount
     * @secure
     */
    listCount: () =>
      http.request<ResultObject['data']>(`/api/main/workbenchTodo/listCount`, {
        method: 'GET',
      }),
  },
  workbenchLayout: {
    /**
     * No description
     *
     * @tags 工作台布局表
     * @name SaveByCurrentUser
     * @summary 保存当前用户工作台配置
     * @request POST:/workbenchLayout/saveByCurrentUser
     * @secure
     */
    saveByCurrentUser: (data: WorkbenchLayout) =>
      http.request<ResultObject['data']>(`/api/main/workbenchLayout/saveByCurrentUser`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工作台布局表
     * @name GetByCurrentUser
     * @summary 获取当前用户工作台配置
     * @request GET:/workbenchLayout/getByCurrentUser
     * @secure
     */
    getByCurrentUser: () =>
      http.request<ResultWorkbenchLayout['data']>(`/api/main/workbenchLayout/getByCurrentUser`, {
        method: 'GET',
      }),
  },
  warehouse: {
    /**
     * No description
     *
     * @tags 仓库
     * @name SearchList
     * @request POST:/warehouse/searchList
     * @secure
     */
    searchList: (data: WarehouseSearch) =>
      http.request<ResultMapStringObject['data']>(`/api/main/warehouse/searchList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库
     * @name Search
     * @request POST:/warehouse/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataWarehouse['data']>(`/api/main/warehouse/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库
     * @name StateChange
     * @summary 修改状态
     * @request GET:/warehouse/items/{id}
     * @secure
     */
    stateChange: (id: string) =>
      http.request<ResultObject['data']>(`/api/main/warehouse/items/${id}`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 仓库
     * @name GetItemById
     * @request POST:/warehouse/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultWarehouse['data']>(`/api/main/warehouse/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 仓库
     * @name ModifyWareHouse
     * @summary 修改仓库
     * @request POST:/warehouse/items/modify
     * @secure
     */
    modifyWareHouse: (data: Warehouse) =>
      http.request<Result['data']>(`/api/main/warehouse/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库
     * @name AddWareHouse
     * @summary 新增仓库
     * @request POST:/warehouse/items/add
     * @secure
     */
    addWareHouse: (data: Warehouse) =>
      http.request<Result['data']>(`/api/main/warehouse/items/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库
     * @name FeignListByIds
     * @summary 服务间调用标准仓库信息
     * @request POST:/warehouse/feignListByIds
     * @secure
     */
    feignListByIds: (data: string[]) =>
      http.request<ResultListWarehouseFeignDTO['data']>(`/api/main/warehouse/feignListByIds`, {
        method: 'POST',
        body: data as any,
      }),
  },
  userInRole: {
    /**
     * No description
     *
     * @tags 用户角色关系表
     * @name ModifyUserInRoleFromUser
     * @summary 新增用户的角色
     * @request POST:/userInRole/modifyUserInRoleFromUser
     * @secure
     */
    modifyUserInRoleFromUser: (data: UserRoleDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInRole/modifyUserInRoleFromUser`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户角色关系表
     * @name DeleteUserInRole
     * @summary 删除角色的用户
     * @request POST:/userInRole/deleteUserInRole
     * @secure
     */
    deleteUserInRole: (data: RoleUserDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInRole/deleteUserInRole`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户角色关系表
     * @name DeleteUserInRoleFromUser
     * @summary 删除用户的角色
     * @request POST:/userInRole/deleteUserInRoleFromUser
     * @secure
     */
    deleteUserInRoleFromUser: (data: UserRoleDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInRole/deleteUserInRoleFromUser`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户角色关系表
     * @name AddUserInRole
     * @summary 新增角色的用户
     * @request POST:/userInRole/addUserInRole
     * @secure
     */
    addUserInRole: (data: RoleUserDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInRole/addUserInRole`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户角色关系表
     * @name GetUserInRoleListByUserId
     * @summary 根据用户ID查询用户在组织中的信息
     * @request GET:/userInRole/getUserInRoleListByUserId
     * @secure
     */
    getUserInRoleListByUserId: (query: { userId: string }) =>
      http.request<ResultListUserInRoleVO['data']>(`/api/main/userInRole/getUserInRoleListByUserId`, {
        method: 'GET',
        params: query,
      }),
  },
  userInOrg: {
    /**
     * No description
     *
     * @tags 用户组织关系表
     * @name DeleteUserInOrg
     * @summary 删除用户在组织中的信息
     * @request POST:/userInOrg/deleteUserInOrg
     * @secure
     */
    deleteUserInOrg: (data: UserOrgDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInOrg/deleteUserInOrg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户组织关系表
     * @name AddUserInOrg
     * @summary 新增用户在组织中的信息
     * @request POST:/userInOrg/addUserInOrg
     * @secure
     */
    addUserInOrg: (data: UserOrgDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInOrg/addUserInOrg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户组织关系表
     * @name GetUserInOrgByUserId
     * @summary 根据用户ID查询用户在组织中的信息
     * @request GET:/userInOrg/getUserInOrgByUserId
     * @secure
     */
    getUserInOrgByUserId: (query: { userId: string }) =>
      http.request<ResultListUserInOrgVO['data']>(`/api/main/userInOrg/getUserInOrgByUserId`, {
        method: 'GET',
        params: query,
      }),
  },
  userAuthorization: {
    /**
     * No description
     *
     * @tags 用户授权表
     * @name Forbidden
     * @summary 用户权限-设置拒绝
     * @request POST:/userAuthorization/forbidden
     * @secure
     */
    forbidden: (data: UserAuthDTO) =>
      http.request<ResultObject['data']>(`/api/main/userAuthorization/forbidden`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户授权表
     * @name BatchDelete
     * @summary 批量删除用户权限
     * @request POST:/userAuthorization/batchDelete
     * @secure
     */
    batchDelete: (data: UserAuthDTO) =>
      http.request<ResultObject['data']>(`/api/main/userAuthorization/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户授权表
     * @name BatchAdd
     * @summary 批量新增用户权限
     * @request POST:/userAuthorization/batchAdd
     * @secure
     */
    batchAdd: (data: UserAuthDTO) =>
      http.request<ResultObject['data']>(`/api/main/userAuthorization/batchAdd`, {
        method: 'POST',
        body: data as any,
      }),
  },
  user: {
    /**
     * No description
     *
     * @tags 用户
     * @name SetState
     * @summary 禁用/启用用户
     * @request POST:/user/setState
     * @secure
     */
    setState: (data: User) =>
      http.request<ResultObject['data']>(`/api/main/user/setState`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name SetDefaultOrg
     * @summary 设置用户默认库存组织
     * @request POST:/user/setDefaultOrg
     * @secure
     */
    setDefaultOrg: (data: User) =>
      http.request<ResultObject['data']>(`/api/main/user/setDefaultOrg`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name ResetPassword
     * @summary 重置用户密码
     * @request POST:/user/resetPassword
     * @secure
     */
    resetPassword: (data: User) =>
      http.request<ResultObject['data']>(`/api/main/user/resetPassword`, {
        method: 'POST',
        body: data as any,
      }),

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
      http.request<ResultPagingDataUserVO['data']>(`/api/main/user/items`, {
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
      http.request<ResultUser['data']>(`/api/main/user/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetUserList
     * @summary 获取用户信息
     * @request POST:/user/getUserList
     * @secure
     */
    getUserList: (data: CommonSearch) =>
      http.request<ResultPagingDataUserVO['data']>(`/api/main/user/getUserList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name Edit
     * @summary 编辑用户信息
     * @request POST:/user/edit
     * @secure
     */
    edit: (data: User) =>
      http.request<ResultObject['data']>(`/api/main/user/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name Add
     * @summary 新增用户信息
     * @request POST:/user/add
     * @secure
     */
    add: (data: User) =>
      http.request<ResultObject['data']>(`/api/main/user/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetUsersByRoleId
     * @summary 根据roleId获取用户列表，用户表为User
     * @request GET:/user/getUsersByRoleId
     * @secure
     */
    getUsersByRoleId: (query?: {
      /** @default "0" */
      roleId?: string;
    }) =>
      http.request<ResultListUser['data']>(`/api/main/user/getUsersByRoleId`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetUserByRoleIdNotIn
     * @summary 根据roleId获取没关联当前roleId的用户列表，用户表为User
     * @request GET:/user/getUserByRoleIdNotIn
     * @secure
     */
    getUserByRoleIdNotIn: (query?: {
      /** @default "0" */
      roleId?: string;
    }) =>
      http.request<ResultListUser['data']>(`/api/main/user/getUserByRoleIdNotIn`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetByUsername
     * @summary 根據用户名获取用户
     * @request GET:/user/getByUsername
     * @secure
     */
    getByUsername: (query?: {
      /** @default "0" */
      id?: string;
      /** @default "" */
      userName?: string;
    }) =>
      http.request<ResultLong['data']>(`/api/main/user/getByUsername`, {
        method: 'GET',
        params: query,
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
      http.request<ResultCurrentUserVO['data']>(`/api/main/user/currentUserInfo`, {
        method: 'GET',
      }),
  },
  transactionDetail: {
    /**
     * No description
     *
     * @tags 事务明细查询
     * @name GetList
     * @summary 查询主页数据
     * @request POST:/transactionDetail/getList
     * @secure
     */
    getList: (data: TransactionDetailSearch) =>
      http.request<ResultPagingDataTransactionDetailVO['data']>(`/api/main/transactionDetail/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  tableSetting: {
    /**
     * No description
     *
     * @tags 用户自定义表格设置表
     * @name SaveSingle
     * @summary 保存单个表格设置
     * @request POST:/tableSetting/saveSingle
     * @secure
     */
    saveSingle: (data: TableSetting) =>
      http.request<ResultObject['data']>(`/api/main/tableSetting/saveSingle`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户自定义表格设置表
     * @name GetCurrentUserTable
     * @summary 获取当前用户对应表格的设置
     * @request POST:/tableSetting/getCurrentUserTable
     * @secure
     */
    getCurrentUserTable: (query: { tableKey: string; behaviorPath: string }) =>
      http.request<ResultListTableSetting['data']>(`/api/main/tableSetting/getCurrentUserTable`, {
        method: 'POST',
        params: query,
      }),
  },
  supportGroup: {
    /**
     * No description
     *
     * @tags 处理组表
     * @name RemoveSupportGroupBatch
     * @summary 批量删除处理组
     * @request POST:/supportGroup/removeSupportGroupBatch
     * @secure
     */
    removeSupportGroupBatch: (data: SupportGroupSearch) =>
      http.request<ResultObject['data']>(`/api/main/supportGroup/removeSupportGroupBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name RemovePersonBatch
     * @summary 批量删除处理组人员
     * @request POST:/supportGroup/removePersonBatch
     * @secure
     */
    removePersonBatch: (data: SupportGroupSearch) =>
      http.request<ResultObject['data']>(`/api/main/supportGroup/removePersonBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name ModifySupportGroup
     * @summary 编辑处理组
     * @request POST:/supportGroup/modifySupportGroup
     * @secure
     */
    modifySupportGroup: (data: SupportGroup) =>
      http.request<ResultObject['data']>(`/api/main/supportGroup/modifySupportGroup`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name GetPersonList
     * @summary 查询人员信息
     * @request POST:/supportGroup/getPersonList
     * @secure
     */
    getPersonList: (data: SupportGroupSearch) =>
      http.request<ResultPagingDataSupportGroupVO['data']>(`/api/main/supportGroup/getPersonList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name GetOutPerson
     * @summary 查询未进组人员
     * @request POST:/supportGroup/getOutPerson
     * @secure
     */
    getOutPerson: (data: SupportGroupSearch) =>
      http.request<ResultPagingDataSupportGroupVO['data']>(`/api/main/supportGroup/getOutPerson`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name GetInnerPerson
     * @summary 查询已进组人员
     * @request POST:/supportGroup/getInnerPerson
     * @secure
     */
    getInnerPerson: (data: SupportGroupSearch) =>
      http.request<ResultPagingDataSupportGroupVO['data']>(`/api/main/supportGroup/getInnerPerson`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name GetGroupList
     * @summary 查询处理组信息
     * @request POST:/supportGroup/getGroupList
     * @secure
     */
    getGroupList: (data: SupportGroupSearch) =>
      http.request<ResultPagingDataSupportGroupVO['data']>(`/api/main/supportGroup/getGroupList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name AddSupportGroup
     * @summary 新增处理组
     * @request POST:/supportGroup/addSupportGroup
     * @secure
     */
    addSupportGroup: (data: SupportGroup) =>
      http.request<ResultObject['data']>(`/api/main/supportGroup/addSupportGroup`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name AddSupportGroupPerson
     * @summary 新增处理组人员
     * @request POST:/supportGroup/addSupportGroupPerson
     * @secure
     */
    addSupportGroupPerson: (data: SupportGroupSearch) =>
      http.request<ResultObject['data']>(`/api/main/supportGroup/addSupportGroupPerson`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 处理组表
     * @name GetSupportGroupType
     * @summary 获取下拉列表(处理组类型)
     * @request GET:/supportGroup/getSupportGroupType
     * @secure
     */
    getSupportGroupType: () =>
      http.request<ResultPagingDataParam['data']>(`/api/main/supportGroup/getSupportGroupType`, {
        method: 'GET',
      }),
  },
  supplier: {
    /**
     * No description
     *
     * @tags 供应商
     * @name Search
     * @request POST:/supplier/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataSupplier['data']>(`/api/main/supplier/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 供应商
     * @name GetItemById
     * @request POST:/supplier/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultSupplier['data']>(`/api/main/supplier/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 供应商
     * @name GetSupplierList
     * @summary 获取供应商列表
     * @request POST:/supplier/getSupplierList
     * @secure
     */
    getSupplierList: (data: CommonSearch) =>
      http.request<ResultPagingDataSupplier['data']>(`/api/main/supplier/getSupplierList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 供应商
     * @name Edit
     * @summary 供应商编辑
     * @request POST:/supplier/edit
     * @secure
     */
    edit: (data: Supplier) =>
      http.request<ResultObject['data']>(`/api/main/supplier/edit`, {
        method: 'POST',
        body: data as any,
      }),
  },
  stressTest: {
    /**
     * No description
     *
     * @tags 压力测试
     * @name SelectAndInsertWipLog
     * @summary 数据库交易型：查询和插入日志
     * @request POST:/stressTest/selectAndInsertWipLog
     * @secure
     */
    selectAndInsertWipLog: () =>
      http.request<ResultMapStringObject['data']>(`/api/main/stressTest/selectAndInsertWipLog`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 压力测试
     * @name SearchLog
     * @summary 数据库交易型：查询日志
     * @request POST:/stressTest/searchLog
     * @secure
     */
    searchLog: (data: string[]) =>
      http.request<ResultPagingDataMsgSendLog['data']>(`/api/main/stressTest/searchLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 压力测试
     * @name InsertBatch
     * @summary 数据库交易型：Mitem插数据
     * @request POST:/stressTest/insertBatch
     * @secure
     */
    insertBatch: (query: {
      /** @format int32 */
      num: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/stressTest/insertBatch`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 压力测试
     * @name MemoryUsageLog
     * @summary 内存使用型(打印日志)
     * @request POST:/stressTest/MemoryUsageLog
     * @secure
     */
    memoryUsageLog: (query: {
      /** @format int32 */
      num: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/stressTest/MemoryUsageLog`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 压力测试
     * @name Test
     * @summary 本地测试
     * @request GET:/stressTest/test
     * @secure
     */
    test: (query: { input: string }) =>
      http.request<ResultObject['data']>(`/api/main/stressTest/test`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 压力测试
     * @name CountLog
     * @summary 查询日志表总数
     * @request GET:/stressTest/countLog
     * @secure
     */
    countLog: () =>
      http.request<ResultLong['data']>(`/api/main/stressTest/countLog`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 压力测试
     * @name CpuCompute
     * @summary CPU计算型
     * @request GET:/stressTest/CPUCompute
     * @secure
     */
    cpuCompute: () =>
      http.request<ResultInteger['data']>(`/api/main/stressTest/CPUCompute`, {
        method: 'GET',
      }),
  },
  roleAuthorization: {
    /**
     * No description
     *
     * @tags 角色授权表
     * @name Delete
     * @summary 批量删除角色权限
     * @request POST:/roleAuthorization/batchDelete
     * @secure
     */
    delete: (data: RoleAuthDTO) =>
      http.request<ResultObject['data']>(`/api/main/roleAuthorization/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 角色授权表
     * @name Add
     * @summary 批量新增角色权限
     * @request POST:/roleAuthorization/batchAdd
     * @secure
     */
    add: (data: RoleAuthDTO) =>
      http.request<ResultObject['data']>(`/api/main/roleAuthorization/batchAdd`, {
        method: 'POST',
        body: data as any,
      }),
  },
  role: {
    /**
     * No description
     *
     * @tags 角色
     * @name Search
     * @summary 獲取角色列表
     * @request POST:/role/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataRoleVO['data']>(`/api/main/role/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 角色
     * @name GetItemById
     * @summary 根據ID獲取角色
     * @request POST:/role/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultRole['data']>(`/api/main/role/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 角色
     * @name Edit
     * @summary 编辑角色信息
     * @request POST:/role/edit
     * @secure
     */
    edit: (data: Role) =>
      http.request<ResultObject['data']>(`/api/main/role/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 角色
     * @name Delete
     * @summary 删除角色信息
     * @request POST:/role/delete
     * @secure
     */
    delete: (data: Role) =>
      http.request<ResultObject['data']>(`/api/main/role/delete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 角色
     * @name Add
     * @summary 新增角色信息
     * @request POST:/role/add
     * @secure
     */
    add: (data: Role) =>
      http.request<ResultObject['data']>(`/api/main/role/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 角色
     * @name GetItemByName
     * @summary 根據名称獲取角色
     * @request GET:/role/getbyname
     * @secure
     */
    getItemByName: (query?: {
      /** @default "0" */
      id?: string;
      /** @default "" */
      roleName?: string;
    }) =>
      http.request<ResultLong['data']>(`/api/main/role/getbyname`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 角色
     * @name GetItemByCode
     * @summary 根據编码获取角色
     * @request GET:/role/getbycode
     * @secure
     */
    getItemByCode: (query?: {
      /** @default "0" */
      id?: string;
      /** @default "" */
      roleCode?: string;
    }) =>
      http.request<ResultLong['data']>(`/api/main/role/getbycode`, {
        method: 'GET',
        params: query,
      }),
  },
  profileValue: {
    /**
     * No description
     *
     * @tags 配置项值
     * @name GetProfileValueList
     * @summary 获取配置项列表
     * @request POST:/profileValue/items/getProfileValueList
     * @secure
     */
    getProfileValueList: (data: ProfileSearch) =>
      http.request<ResultPagingDataProfileValueSearchVO['data']>(`/api/main/profileValue/items/getProfileValueList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配置项值
     * @name ChangeProfileValue
     * @summary 修改配置项值
     * @request POST:/profileValue/items/changeProfileValue
     * @secure
     */
    changeProfileValue: (data: ProfileValue) =>
      http.request<Result['data']>(`/api/main/profileValue/items/changeProfileValue`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配置项值
     * @name AddProfileValue
     * @summary 新增配置项值
     * @request POST:/profileValue/items/addProfileValue
     * @secure
     */
    addProfileValue: (data: ProfileValue) =>
      http.request<Result['data']>(`/api/main/profileValue/items/addProfileValue`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配置项值
     * @name GetValueByProfileCode
     * @summary 根据配置编码获取配置的值
     * @request GET:/profileValue/getValueByProfileCode
     * @secure
     */
    getValueByProfileCode: (query: {
      code: string;
      orgId?: string;
      workshopId?: string;
      workcenterId?: string;
      workstationId?: string;
    }) =>
      http.request<ResultString['data']>(`/api/main/profileValue/getValueByProfileCode`, {
        method: 'GET',
        params: query,
      }),
  },
  productPackRuleMap: {
    /**
     * No description
     *
     * @tags 产品包装规则映射
     * @name BatchDelete
     * @summary 批量删除包装规则关联的物料信息
     * @request POST:/productPackRuleMap/batchDelete
     * @secure
     */
    batchDelete: (data: ProductPackRuleMapDTO) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleMap/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则映射
     * @name Add
     * @summary 新增包装规则关联的物料信息
     * @request POST:/productPackRuleMap/add
     * @secure
     */
    add: (data: ProductPackRuleMapDTO) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleMap/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则映射
     * @name List
     * @summary 获取包装规则关联的物料信息
     * @request GET:/productPackRuleMap/list
     * @secure
     */
    list: (query?: {
      /** @default "" */
      packRuleId?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleMap/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品包装规则映射
     * @name Delete
     * @summary 删除包装规则关联的物料信息
     * @request DELETE:/productPackRuleMap/delete
     * @secure
     */
    delete: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/main/productPackRuleMap/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
  processBusinessLibDtl: {
    /**
     * No description
     *
     * @tags 工序业务执行单元库明细表
     * @name AddList
     * @summary 新增明细清单
     * @request POST:/processBusinessLibDtl/addList
     * @secure
     */
    addList: (data: ProcessBusinessLibDtl[]) =>
      http.request<ResultObject['data']>(`/api/main/processBusinessLibDtl/addList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  processBusinessLib: {
    /**
     * No description
     *
     * @tags 工序业务执行单元库头表
     * @name List
     * @summary 根据头表明细
     * @request POST:/processBusinessLib/list
     * @secure
     */
    list: () =>
      http.request<ResultListProcessBusinessLib['data']>(`/api/main/processBusinessLib/list`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 工序业务执行单元库头表
     * @name ListByIds
     * @summary 根据工序和分类获取明细
     * @request POST:/processBusinessLib/listByIds
     * @secure
     */
    listByIds: (data: ProcessBusinessLib) =>
      http.request<ResultListProcessBusinessLibDtl['data']>(`/api/main/processBusinessLib/listByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序业务执行单元库头表
     * @name BatchDelete
     * @summary 批量删除
     * @request POST:/processBusinessLib/batchDelete
     * @secure
     */
    batchDelete: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/processBusinessLib/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序业务执行单元库头表
     * @name Add
     * @summary 新增工序业务执行单元库头表
     * @request POST:/processBusinessLib/add
     * @secure
     */
    add: (data: ProcessBusinessLib) =>
      http.request<ResultLong['data']>(`/api/main/processBusinessLib/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序业务执行单元库头表
     * @name AddList
     * @summary 新增明细清单
     * @request POST:/processBusinessLib/addList
     * @secure
     */
    addList: (data: ProcessBusinessAddVO) =>
      http.request<ResultObject['data']>(`/api/main/processBusinessLib/addList`, {
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
      http.request<ResultPagingDataProcessVO['data']>(`/api/main/process/items`, {
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
      http.request<ResultProcess['data']>(`/api/main/process/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 工序
     * @name GetProcessAll
     * @request POST:/process/getProcessAll
     * @secure
     */
    getProcessAll: (data: CommonSearch) =>
      http.request<ResultPagingDataProcessVO['data']>(`/api/main/process/getProcessAll`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序
     * @name Edit
     * @summary 工序编辑
     * @request POST:/process/edit
     * @secure
     */
    edit: (data: ProcessVO) =>
      http.request<ResultObject['data']>(`/api/main/process/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序
     * @name Add
     * @summary 工序新增
     * @request POST:/process/add
     * @secure
     */
    add: (data: ProcessVO) =>
      http.request<ResultObject['data']>(`/api/main/process/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  post: {
    /**
     * No description
     *
     * @tags 岗位
     * @name Search
     * @request POST:/post/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataPost['data']>(`/api/main/post/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 岗位
     * @name GetItemById
     * @request POST:/post/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultPost['data']>(`/api/main/post/items/${id}`, {
        method: 'POST',
      }),
  },
  person: {
    /**
     * No description
     *
     * @tags 员工表
     * @name Search
     * @summary 获取员工信息
     * @request POST:/person/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataPersonVO['data']>(`/api/main/person/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 员工表
     * @name GetItemById
     * @summary 根据ID获取员工信息
     * @request POST:/person/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultPerson['data']>(`/api/main/person/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 员工表
     * @name Edit
     * @summary 编辑员工信息
     * @request POST:/person/edit
     * @secure
     */
    edit: (data: PersonVO) =>
      http.request<ResultObject['data']>(`/api/main/person/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 员工表
     * @name Delete
     * @summary 删除员工信息
     * @request POST:/person/delete
     * @secure
     */
    delete: (data: PersonVO) =>
      http.request<ResultObject['data']>(`/api/main/person/delete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 员工表
     * @name Getlist
     * @summary 获取员工信息
     * @request GET:/person/getlist
     * @secure
     */
    getlist: (query: {
      personcode: string;
      personname: string;
      /** @format int32 */
      state: number;
      /** @format int32 */
      adminorgid: number;
      sortfield: string;
      sorttype: string;
      filterfield: string;
      filter: string;
      /** @format int32 */
      pagenum: number;
      /** @format int32 */
      pagesize: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/person/getlist`, {
        method: 'GET',
        params: query,
      }),
  },
  paramGroup: {
    /**
     * No description
     *
     * @tags 系统字典组
     * @name Search
     * @summary 弹出框公共方法
     * @request POST:/paramGroup/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/main/paramGroup/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name GetItemById
     * @summary 弹出框公共方法-根据id获取数据
     * @request POST:/paramGroup/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultParamGroup['data']>(`/api/main/paramGroup/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name List
     * @summary 系统字典功能-获取所有列表数据
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
      http.request<ResultObject['data']>(`/api/main/paramGroup/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name Getlist
     * @summary 系统字典功能-查询所有参数组数据
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
      http.request<ResultObject['data']>(`/api/main/paramGroup/getlist`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name Getdomainlist
     * @summary 系统字典功能-按领域分组获取所有系统参数组
     * @request GET:/paramGroup/getdomainlist
     * @secure
     */
    getdomainlist: () =>
      http.request<ResultObject['data']>(`/api/main/paramGroup/getdomainlist`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 系统字典组
     * @name GetTreeList
     * @summary 系统字典功能-按领域分组获取所有系统参数组
     * @request GET:/paramGroup/getTreeList
     * @secure
     */
    getTreeList: (query?: {
      /** @default "" */
      keyword?: string;
    }) =>
      http.request<ResultListParamGroupTreeVO['data']>(`/api/main/paramGroup/getTreeList`, {
        method: 'GET',
        params: query,
      }),
  },
  param: {
    /**
     * No description
     *
     * @tags 系统字典明细
     * @name Save
     * @summary 保存系统字典数据
     * @request POST:/param/save
     * @secure
     */
    save: (data: ParamInfoDTO) =>
      http.request<ResultObject['data']>(`/api/main/param/save`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name Search
     * @summary 弹出框公共方法
     * @request POST:/param/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/main/param/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name GetItemById
     * @summary 弹出框公共方法
     * @request POST:/param/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultParam['data']>(`/api/main/param/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name List
     * @summary 弹出框公共方法
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
      http.request<ResultObject['data']>(`/api/main/param/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name Getlist
     * @summary 系统字典功能-查询所有参数数据
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
      http.request<ResultObject['data']>(`/api/main/param/getlist`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name GetParamListByGroupCode
     * @summary 根据系统参数组获取参数明细
     * @request GET:/param/getParamListByGroupCode
     * @secure
     */
    getParamListByGroupCode: (query?: {
      /** @default "" */
      parmGroupCode?: string;
    }) =>
      http.request<ResultListParam['data']>(`/api/main/param/getParamListByGroupCode`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统字典明细
     * @name GetListByGroupCode
     * @summary 根据系统参数组获取参数明细
     * @request GET:/param/getListByGroupCode
     * @secure
     */
    getListByGroupCode: (query?: {
      /** @default "" */
      parmGroupCode?: string;
    }) =>
      http.request<ResultListKeyValuePairStringString['data']>(`/api/main/param/getListByGroupCode`, {
        method: 'GET',
        params: query,
      }),
  },
  objectPropertyCategory: {
    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name GetObjectList
     * @summary 查询左侧object列表
     * @request POST:/objectPropertyCategory/getObjectList
     * @secure
     */
    getObjectList: (data: ObjectPropertyCategorySearch) =>
      http.request<ResultPagingDataObjectPropertyCategoryVO['data']>(`/api/main/objectPropertyCategory/getObjectList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name GetObjectCategoryList
     * @summary 查询各object的扩展属性
     * @request POST:/objectPropertyCategory/getObjectCategoryList
     * @secure
     */
    getObjectCategoryList: (data: ObjectPropertyCategorySearch) =>
      http.request<ResultPagingDataObjectPropertyCategoryVO['data']>(
        `/api/main/objectPropertyCategory/getObjectCategoryList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name EditObjectCategory
     * @summary 编辑领域对象
     * @request POST:/objectPropertyCategory/editObjectCategory
     * @secure
     */
    editObjectCategory: (data: ObjectProperty) =>
      http.request<ResultPagingDataObjectPropertyCategoryVO['data']>(
        `/api/main/objectPropertyCategory/editObjectCategory`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name AddObjectCategory
     * @summary 新增领域对象
     * @request POST:/objectPropertyCategory/addObjectCategory
     * @secure
     */
    addObjectCategory: (data: ObjectProperty) =>
      http.request<ResultPagingDataObjectPropertyCategoryVO['data']>(
        `/api/main/objectPropertyCategory/addObjectCategory`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name GetParamGroup
     * @summary 获得数据字典组所有组
     * @request GET:/objectPropertyCategory/getParamGroup
     * @secure
     */
    getParamGroup: () =>
      http.request<ResultPagingDataParamGroup['data']>(`/api/main/objectPropertyCategory/getParamGroup`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name GetObjectCategory
     * @summary 查询项目扩展属性分类Tag
     * @request GET:/objectPropertyCategory/getObjectCategory
     * @secure
     */
    getObjectCategory: (query?: {
      /** @default "" */
      objectCode?: string;
    }) =>
      http.request<ResultPagingDataObjectPropertyCategoryVO['data']>(
        `/api/main/objectPropertyCategory/getObjectCategory`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name GetListByObjectName
     * @summary 根据领域对象编码获取分类
     * @request GET:/objectPropertyCategory/getListByObjectName
     * @secure
     */
    getListByObjectName: (query: { objectCode: string }) =>
      http.request<ResultListObjectPropertyCategory['data']>(`/api/main/objectPropertyCategory/getListByObjectName`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 领域对象扩展属性分类
     * @name GetCategory
     * @summary 获取领域对象扩展属性分类
     * @request GET:/objectPropertyCategory/getCategory
     * @secure
     */
    getCategory: (query: { objectCode: string }) =>
      http.request<ResultPagingDataObjectPropertyCategory['data']>(`/api/main/objectPropertyCategory/getCategory`, {
        method: 'GET',
        params: query,
      }),
  },
  msg: {
    /**
     * No description
     *
     * @tags 消息主表
     * @name GetLastSendBySource
     * @summary 查询安灯报障的消息推送
     * @request POST:/msg/getLastSendBySource
     * @secure
     */
    getLastSendBySource: (query: { sourceTableName: string; sourceRowId: string; remark: string }) =>
      http.request<ResultObject['data']>(`/api/main/msg/getLastSendBySource`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 消息主表
     * @name AddMsg
     * @summary 新增消息推送
     * @request POST:/msg/addMsg
     * @secure
     */
    addMsg: (data: MsgDTO) =>
      http.request<ResultObject['data']>(`/api/main/msg/addMsg`, {
        method: 'POST',
        body: data as any,
      }),
  },
  module: {
    /**
     * No description
     *
     * @tags 菜单
     * @name UploadFile
     * @summary 菜单文件上传
     * @request POST:/module/uploadFile
     * @secure
     */
    uploadFile: (
      query: {
        path: string;
      },
      data: {
        /** @format binary */
        file: File;
      },
    ) =>
      http.request<ResultResponseEntityString['data']>(`/api/main/module/uploadFile`, {
        method: 'POST',
        params: query,
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name SortThisLevelAll
     * @summary 菜单拖拽排序
     * @request POST:/module/sortThisLevelAll
     * @secure
     */
    sortThisLevelAll: (data: ModuleSearch) =>
      http.request<ResultObject['data']>(`/api/main/module/sortThisLevelAll`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name Remove
     * @summary 删除菜单模块
     * @request POST:/module/remove
     * @secure
     */
    remove: (data: Module) =>
      http.request<ResultObject['data']>(`/api/main/module/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name Modify
     * @summary 编辑菜单模块
     * @request POST:/module/modify
     * @secure
     */
    modify: (data: Module) =>
      http.request<ResultObject['data']>(`/api/main/module/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name GetTree
     * @summary 查询菜单模块左侧菜单树
     * @request POST:/module/getTree
     * @secure
     */
    getTree: (data: ModuleSearch) =>
      http.request<ResultListShowModuleVO['data']>(`/api/main/module/getTree`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name GetSignedUrl
     * @summary 获取菜单文件URL
     * @request POST:/module/getSignedUrl
     * @secure
     */
    getSignedUrl: (query: { packageName: string; behaviorPath: string }) =>
      http.request<ResultString['data']>(`/api/main/module/getSignedUrl`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name GetList
     * @summary 查询菜单模块右侧列表
     * @request POST:/module/getList
     * @secure
     */
    getList: (data: ModuleSearch) =>
      http.request<ResultPagingDataShowModuleVO['data']>(`/api/main/module/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name DeleteFile
     * @summary 删除菜单上传文件
     * @request POST:/module/deleteFile
     * @secure
     */
    deleteFile: (query: { id: string; packageName: string; behaviorPath: string }) =>
      http.request<ResultResponseEntityString['data']>(`/api/main/module/deleteFile`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name AddModule
     * @summary 新增菜单模块
     * @request POST:/module/addModule
     * @secure
     */
    addModule: (data: Module) =>
      http.request<ResultObject['data']>(`/api/main/module/addModule`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name Show
     * @summary 系统框架菜单显示调用接口
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
      http.request<ResultListShowModuleVO['data']>(`/api/main/module/show`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name GetRootModules
     * @summary 获取所有一级菜单模块
     * @request GET:/module/getROOTModules
     * @secure
     */
    getRootModules: () =>
      http.request<ResultPagingDataModule['data']>(`/api/main/module/getROOTModules`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name GetBackfill
     * @summary 获取所有二级菜单模块(回填)
     * @request GET:/module/getBackfill
     * @secure
     */
    getBackfill: (query: { id: string }) =>
      http.request<ResultPagingDataModule['data']>(`/api/main/module/getBackfill`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name GetAllModules
     * @summary 获取所有二级菜单模块
     * @request GET:/module/getAllModules
     * @secure
     */
    getAllModules: (query: { id: string }) =>
      http.request<ResultPagingDataModule['data']>(`/api/main/module/getAllModules`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name FindChild
     * @summary 查询是否存在子菜单
     * @request GET:/module/findChild
     * @secure
     */
    findChild: (query: { id: string }) =>
      http.request<ResultPagingDataLong['data']>(`/api/main/module/findChild`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 菜单
     * @name CheckBehaviorPath
     * @summary 判断三级菜单的菜单地址是否重复
     * @request GET:/module/checkBehaviorPath
     * @secure
     */
    checkBehaviorPath: (query: { isAdd: boolean; id: string; behaviorPath: string }) =>
      http.request<ResultBoolean['data']>(`/api/main/module/checkBehaviorPath`, {
        method: 'GET',
        params: query,
      }),
  },
  moSchedule: {
    /**
     * No description
     *
     * @tags 工单排产表
     * @name UpdateMoScheInfo
     * @summary 更新排产单信息-完成数量，状态等字段信息
     * @request POST:/moSchedule/updateMoScheInfo
     * @secure
     */
    updateMoScheInfo: (data: MoSchedule) =>
      http.request<ResultObject['data']>(`/api/main/moSchedule/updateMoScheInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name SearchRunningMoSche
     * @summary 弹出框公共方法-查询有效的排产单信息-已排产，已备料，已上线
     * @request POST:/moSchedule/searchRunningMoSche
     * @secure
     */
    searchRunningMoSche: (data: CommonSearch) =>
      http.request<ResultPagingDataMoScheduleVO['data']>(`/api/main/moSchedule/searchRunningMoSche`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name Search
     * @summary 弹出框公共方法
     * @request POST:/moSchedule/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataMoScheduleVO['data']>(`/api/main/moSchedule/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name GetItemById
     * @summary 弹出框公共方法
     * @request POST:/moSchedule/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMoSchedule['data']>(`/api/main/moSchedule/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name GetMoScheduleList
     * @summary 获取排产工单管理列表-应用于品质控制查询
     * @request GET:/moSchedule/getMoScheduleList
     * @secure
     */
    getMoScheduleList: (query?: {
      /**
       * @format int32
       * @default 1
       */
      pageNum?: number;
      /**
       * @format int32
       * @default 20
       */
      pageSize?: number;
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
      /** @format int32 */
      isHold?: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/moSchedule/getMoScheduleList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name GetMoScheduleListByIds
     * @summary 获取排产工单管理列表-应用于品质控制查询-按id集合查询
     * @request POST:/moSchedule/getMoScheduleList
     * @secure
     */
    getMoScheduleListByIds: (data: MoScheduleDTO) =>
      http.request<ResultObject['data']>(`/api/main/moSchedule/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name AddStockInQty
     * @summary 加入入库数量
     * @request POST:/moSchedule/addStockInQty
     * @secure
     */
    addStockInQty: (data: MoSchedule[]) =>
      http.request<ResultObject['data']>(`/api/main/moSchedule/addStockInQty`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单排产表
     * @name AddCompleteQty
     * @summary 增加完工数量
     * @request POST:/moSchedule/addCompleteQty
     * @secure
     */
    addCompleteQty: (data: MoSchedule[]) =>
      http.request<ResultObject['data']>(`/api/main/moSchedule/addCompleteQty`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultObject['data']>(`/api/main/mo/updateMoRouting`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单表
     * @name UpdateMoInfo
     * @summary 更新工单信息-完成数量，状态等信息
     * @request POST:/mo/updateMoInfo
     * @secure
     */
    updateMoInfo: (data: Mo) =>
      http.request<ResultObject['data']>(`/api/main/mo/updateMoInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单表
     * @name Search
     * @summary 弹出框公共方法
     * @request POST:/mo/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataMo['data']>(`/api/main/mo/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单表
     * @name GetItemById
     * @summary 弹出框公共方法
     * @request POST:/mo/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMo['data']>(`/api/main/mo/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 工单表
     * @name SearchRunningMo
     * @summary 弹出框公共方法-查询有效的工单信息-已排产，已备料，已上线
     * @request POST:/mo/itemRunningMo
     * @secure
     */
    searchRunningMo: (data: CommonSearch) =>
      http.request<ResultPagingDataMo['data']>(`/api/main/mo/itemRunningMo`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultObject['data']>(`/api/main/mo/getmolist`, {
        method: 'GET',
        params: query,
      }),
  },
  mitemUom: {
    /**
     * No description
     *
     * @tags 计量单位
     * @name Search
     * @request POST:/mitemUom/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/main/mitemUom/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 计量单位
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/mitemUom/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/mitemUom/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 计量单位
     * @name UpdateItemByCode
     * @summary 修改
     * @request POST:/mitemUom/items/modify
     * @secure
     */
    updateItemByCode: (data: MitemUomVo) =>
      http.request<ResultObject['data']>(`/api/main/mitemUom/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 计量单位
     * @name AddItem
     * @summary 新增
     * @request POST:/mitemUom/items/add
     * @secure
     */
    addItem: (data: MitemUomVo) =>
      http.request<ResultObject['data']>(`/api/main/mitemUom/items/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 计量单位
     * @name Getlist
     * @summary 计量单位名称查询
     * @request POST:/mitemUom/getlist
     * @secure
     */
    getlist: (data: MitemUomSearch) =>
      http.request<ResultPagingDataMitemUom['data']>(`/api/main/mitemUom/getlist`, {
        method: 'POST',
        body: data as any,
      }),
  },
  mitemInSupplier: {
    /**
     * No description
     *
     * @tags 物料供应商关系
     * @name GetMitemInSupplierList
     * @summary 获取物料与供应商关系
     * @request POST:/mitemInSupplier/getmiteminsupplierlist
     * @secure
     */
    getMitemInSupplierList: (data: MitemInSupplierSearch) =>
      http.request<ResultObject['data']>(`/api/main/mitemInSupplier/getmiteminsupplierlist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料供应商关系
     * @name GetMitemInSupplierListByMitemId
     * @summary 根据物料获取供应商信息
     * @request POST:/mitemInSupplier/getMitemInSupplierListByMitemId
     * @secure
     */
    getMitemInSupplierListByMitemId: (data: MitemInSupplierSearch) =>
      http.request<ResultPagingDataMitemInSupplierVO['data']>(
        `/api/main/mitemInSupplier/getMitemInSupplierListByMitemId`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 物料供应商关系
     * @name Edit
     * @summary 编辑物料与供应商关系
     * @request POST:/mitemInSupplier/edit
     * @secure
     */
    edit: (data: MitemInSupplier) =>
      http.request<ResultObject['data']>(`/api/main/mitemInSupplier/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料供应商关系
     * @name Delete
     * @summary 删除物料与供应商关系
     * @request POST:/mitemInSupplier/delete
     * @secure
     */
    delete: (data: MitemInSupplier) =>
      http.request<ResultObject['data']>(`/api/main/mitemInSupplier/delete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料供应商关系
     * @name Add
     * @summary 新增物料与供应商关系
     * @request POST:/mitemInSupplier/add
     * @secure
     */
    add: (data: MitemInSupplier) =>
      http.request<ResultObject['data']>(`/api/main/mitemInSupplier/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  mitemCategory: {
    /**
     * No description
     *
     * @tags 物料分类
     * @name Search
     * @summary 获取物料分类信息(筛选用)
     * @request POST:/mitemCategory/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataMitemCategory['data']>(`/api/main/mitemCategory/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name GetItemById
     * @summary 根据id获取物料分类信息
     * @request POST:/mitemCategory/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMitemCategory['data']>(`/api/main/mitemCategory/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name ImportData
     * @summary 导入物料分类
     * @request POST:/mitemCategory/import
     * @secure
     */
    importData: (data: CommonImportMitemCategory) =>
      http.request<ResultImportSummary['data']>(`/api/main/mitemCategory/import`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name Edit
     * @summary 编辑物料分类
     * @request POST:/mitemCategory/edit
     * @secure
     */
    edit: (data: MitemCategory) =>
      http.request<ResultObject['data']>(`/api/main/mitemCategory/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name Delete
     * @summary 删除物料分类
     * @request POST:/mitemCategory/delete
     * @secure
     */
    delete: (data: MitemCategory) =>
      http.request<ResultObject['data']>(`/api/main/mitemCategory/delete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name List
     * @summary 获取物料分类信息
     * @request GET:/mitemCategory/list
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
      http.request<ResultObject['data']>(`/api/main/mitemCategory/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name Getlist
     * @request GET:/mitemCategory/getlist
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
    }) =>
      http.request<ResultObject['data']>(`/api/main/mitemCategory/getlist`, {
        method: 'GET',
        params: query,
      }),
  },
  mitem: {
    /**
     * No description
     *
     * @tags 物料
     * @name Search
     * @summary 获取物料（筛选用）
     * @request POST:/mitem/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataMitemVO['data']>(`/api/main/mitem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name GetItemById
     * @summary 根据ID获取物料
     * @request POST:/mitem/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMitem['data']>(`/api/main/mitem/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name GetList
     * @summary 根据物料
     * @request POST:/mitem/getlist
     * @secure
     */
    getList: (data: MitemSearch) =>
      http.request<ResultObject['data']>(`/api/main/mitem/getlist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name FeignListByIds
     * @summary 服务间调用标准物料信息
     * @request POST:/mitem/feignListByIds
     * @secure
     */
    feignListByIds: (data: string[]) =>
      http.request<ResultListMitemFeignDTO['data']>(`/api/main/mitem/feignListByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name Edit
     * @summary 编辑物料
     * @request POST:/mitem/edit
     * @secure
     */
    edit: (data: MitemVO) =>
      http.request<ResultObject['data']>(`/api/main/mitem/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name List
     * @summary 获取物料
     * @request GET:/mitem/list
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
      http.request<ResultObject['data']>(`/api/main/mitem/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name GetListByMitemCategory
     * @summary 根据物料分类获取物料
     * @request GET:/mitem/getListByMitemCategory
     * @secure
     */
    getListByMitemCategory: (query: {
      keyword: string;
      mitemcategoryid: string;
      /** @format int32 */
      pagenum: number;
      /** @format int32 */
      pagesize: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/mitem/getListByMitemCategory`, {
        method: 'GET',
        params: query,
      }),
  },
  label: {
    /**
     * No description
     *
     * @tags 标签表
     * @name UpdateLabelStatusAndOnhandId
     * @summary 更新条码状态和库存现有量ID
     * @request POST:/label/updateLabelStatusAndOnhandId
     * @secure
     */
    updateLabelStatusAndOnhandId: (data: LabelVO[]) =>
      http.request<ResultObject['data']>(`/api/main/label/updateLabelStatusAndOnhandId`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name SplitBarcode
     * @summary 拆分条码
     * @request POST:/label/splitBarcode
     * @secure
     */
    splitBarcode: (data: LabelSearch) =>
      http.request<ResultObject['data']>(`/api/main/label/splitBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name ReprintBarcode
     * @summary 补打条码
     * @request POST:/label/reprintBarcode
     * @secure
     */
    reprintBarcode: (data: LabelSearch) =>
      http.request<ResultObject['data']>(`/api/main/label/reprintBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name PrintBarcode
     * @summary 打印条码
     * @request POST:/label/printBarcode
     * @secure
     */
    printBarcode: (data: LabelSearch) =>
      http.request<ResultObject['data']>(`/api/main/label/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetNewLogByLabelNo
     * @summary 根据标签查询最新的日志
     * @request POST:/label/getNewLogByLabelNo
     * @secure
     */
    getNewLogByLabelNo: (data: string[]) =>
      http.request<ResultListLabelLog['data']>(`/api/main/label/getNewLogByLabelNo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelLog
     * @summary 查询日志
     * @request POST:/label/getLabelLog
     * @secure
     */
    getLabelLog: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/main/label/getLabelLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelList
     * @summary 获取打印页标签数据
     * @request POST:/label/getLabelList
     * @secure
     */
    getLabelList: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/main/label/getLabelList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetCount
     * @request POST:/label/getCount
     * @secure
     */
    getCount: (data: string[]) =>
      http.request<ResultListLabelVO['data']>(`/api/main/label/getCount`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GenerateBarcode
     * @summary 生成条码
     * @request POST:/label/generateBarcode
     * @secure
     */
    generateBarcode: (data: LabelSearch) =>
      http.request<ResultObject['data']>(`/api/main/label/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name CancellationBarcode
     * @summary 作废条码
     * @request POST:/label/cancellationBarcode
     * @secure
     */
    cancellationBarcode: (data: LabelSearch) =>
      http.request<ResultObject['data']>(`/api/main/label/cancellationBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name BatchInsertLabel
     * @summary 批量插入条码
     * @request POST:/label/batchInsertLabel
     * @secure
     */
    batchInsertLabel: (data: Label[]) =>
      http.request<ResultObject['data']>(`/api/main/label/batchInsertLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name BatchChange
     * @summary 批量修改状态
     * @request POST:/label/batchChangeStatus
     * @secure
     */
    batchChange: (data: Label[]) =>
      http.request<ResultObject['data']>(`/api/main/label/batchChangeStatus`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelPrintTmplList
     * @summary 获取条码打印模板
     * @request GET:/label/getLabelPrintTmplList
     * @secure
     */
    getLabelPrintTmplList: () =>
      http.request<ResultListPrintTmpl['data']>(`/api/main/label/getLabelPrintTmplList`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelBarcodeRuleList
     * @summary 获取条码规则数据
     * @request GET:/label/getLabelBarcodeRuleList
     * @secure
     */
    getLabelBarcodeRuleList: () =>
      http.request<ResultListBarcodeRule['data']>(`/api/main/label/getLabelBarcodeRuleList`, {
        method: 'GET',
      }),
  },
  integratedConsole: {
    /**
     * No description
     *
     * @tags 集成控制台
     * @name GetList
     * @summary 查询主页数据
     * @request POST:/integratedConsole/getList
     * @secure
     */
    getList: (data: IntegratedConsoleSearch) =>
      http.request<ResultPagingDataIntegratedConsoleVO['data']>(`/api/main/integratedConsole/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  importManage: {
    /**
     * No description
     *
     * @tags 用户
     * @name Search
     * @summary 获取导入配置信息列表
     * @request POST:/importManage/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataImportSetting['data']>(`/api/main/importManage/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name ImportData
     * @summary 通用导入接口
     * @request POST:/importManage/import
     * @secure
     */
    importData: (data: CommonImportAuto) =>
      http.request<ResultImportSummary['data']>(`/api/main/importManage/import`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GenerateImportTemplate
     * @summary 新增导入配置信息
     * @request POST:/importManage/generateImportTemplate
     * @secure
     */
    generateImportTemplate: (data: ImportSettingDTO) =>
      http.request<ResultAddFileTypeVO['data']>(`/api/main/importManage/generateImportTemplate`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name Edit
     * @summary 编辑导入配置信息
     * @request POST:/importManage/edit
     * @secure
     */
    edit: (data: ImportSettingDTO) =>
      http.request<ResultObject['data']>(`/api/main/importManage/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name CheckExist
     * @summary 检查是否有重复Key
     * @request POST:/importManage/checkExist
     * @secure
     */
    checkExist: (data: ImportSetting) =>
      http.request<ResultBoolean['data']>(`/api/main/importManage/checkExist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name Add
     * @summary 新增导入配置信息
     * @request POST:/importManage/add
     * @secure
     */
    add: (data: ImportSettingDTO) =>
      http.request<ResultObject['data']>(`/api/main/importManage/add`, {
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
    tables: (query: { businessCode: string }) =>
      http.request<ResultListDataTableVO['data']>(`/api/main/importManage/tables`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetSettingFileByKey
     * @summary 根据key获取导入配置信息-文件
     * @request GET:/importManage/settingFileByKey
     * @secure
     */
    getSettingFileByKey: (query: { key: string }) =>
      http.request<ResultString['data']>(`/api/main/importManage/settingFileByKey`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetItemByKey
     * @summary 根据key获取导入配置信息
     * @request GET:/importManage/itemByKey
     * @secure
     */
    getItemByKey: (query: { key: string }) =>
      http.request<ResultImportSettingDTO['data']>(`/api/main/importManage/itemByKey`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name GetItemById
     * @summary 根据ID获取导入配置信息
     * @request GET:/importManage/itemByID
     * @secure
     */
    getItemById: (query: { id: string }) =>
      http.request<ResultImportSettingDTO['data']>(`/api/main/importManage/itemByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name DeleteById
     * @summary 根据ID获取导入配置信息
     * @request GET:/importManage/deleteByID
     * @secure
     */
    deleteById: (query: { id: string }) =>
      http.request<ResultImportSettingDTO['data']>(`/api/main/importManage/deleteByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name BusinessDomain
     * @summary 业务领域
     * @request GET:/importManage/businessDomain
     * @secure
     */
    businessDomain: () =>
      http.request<ResultListDropdown['data']>(`/api/main/importManage/businessDomain`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 用户
     * @name Delete
     * @summary 删除导入配置，包括子表
     * @request DELETE:/importManage/delete
     * @secure
     */
    delete: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/main/importManage/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
  file: {
    /**
     * No description
     *
     * @tags 文件上传操作
     * @name UploadFile
     * @summary 文件上传
     * @request POST:/file/uploadFile
     * @secure
     */
    uploadFile: (
      query: {
        path: string;
      },
      data: {
        /** @format binary */
        file: File;
      },
    ) =>
      http.request<ResultString['data']>(`/api/main/file/uploadFile`, {
        method: 'POST',
        params: query,
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 文件上传操作
     * @name GetSignedUrl
     * @summary 获取文件下载路径
     * @request POST:/file/getSignedUrl
     * @secure
     */
    getSignedUrl: (query: { file: string; path: string }) =>
      http.request<ResultString['data']>(`/api/main/file/getSignedUrl`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 文件上传操作
     * @name DeleteFile
     * @summary 文件删除
     * @request POST:/file/deleteFile
     * @secure
     */
    deleteFile: (query: { path: string; fileName: string }) =>
      http.request<ResultObject['data']>(`/api/main/file/deleteFile`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 文件上传操作
     * @name BatchDeleteFile
     * @summary 文件批量删除
     * @request POST:/file/batchDeleteFile
     * @secure
     */
    batchDeleteFile: (data: FileVO) =>
      http.request<ResultObject['data']>(`/api/main/file/batchDeleteFile`, {
        method: 'POST',
        body: data as any,
      }),
  },
  favorite: {
    /**
     * No description
     *
     * @tags 菜单收藏夹表
     * @name Delete
     * @summary 删除菜单收藏
     * @request POST:/favorite/delete
     * @secure
     */
    delete: (data: Favorite) =>
      http.request<ResultObject['data']>(`/api/main/favorite/delete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单收藏夹表
     * @name Add
     * @summary 新增菜单收藏
     * @request POST:/favorite/add
     * @secure
     */
    add: (data: Favorite) =>
      http.request<ResultObject['data']>(`/api/main/favorite/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 菜单收藏夹表
     * @name List
     * @summary 获取菜单收藏
     * @request GET:/favorite/list
     * @secure
     */
    list: () =>
      http.request<ResultListFavorite['data']>(`/api/main/favorite/list`, {
        method: 'GET',
      }),
  },
  equipment: {
    /**
     * No description
     *
     * @tags 设备
     * @name Search
     * @request POST:/equipment/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataEquipment['data']>(`/api/main/equipment/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备
     * @name GetList
     * @request POST:/equipment/getList
     * @secure
     */
    getList: (data: CommonSearch) =>
      http.request<ResultPagingDataEquipment['data']>(`/api/main/equipment/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  enterprise: {
    /**
     * No description
     *
     * @tags 企业表
     * @name Modify
     * @summary 编辑企业信息
     * @request POST:/enterprise/modify
     * @secure
     */
    modify: (data: Enterprise) =>
      http.request<ResultObject['data']>(`/api/main/enterprise/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业表
     * @name Search
     * @request POST:/enterprise/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataEnterprise['data']>(`/api/main/enterprise/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 企业表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/enterprise/getList
     * @secure
     */
    getList: (data: EnterpriseSearch) =>
      http.request<ResultPagingDataEnterpriseVO['data']>(`/api/main/enterprise/getList`, {
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
      http.request<ResultObject['data']>(`/api/main/dynamicManage/batchUpdateData`, {
        method: 'POST',
        body: data as any,
      }),
  },
  dlTask: {
    /**
     * No description
     *
     * @tags 系统下载任务表
     * @name GetCurrentUserFile
     * @summary 获取当前用户对应表格文件下载历史
     * @request POST:/dlTask/getCurrentUserFile
     * @secure
     */
    getCurrentUserFile: (query: { tableKey: string; behaviorPath: string }) =>
      http.request<ResultListDlTask['data']>(`/api/main/dlTask/getCurrentUserFile`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 系统下载任务表
     * @name DownloadFile
     * @summary 下载文件
     * @request POST:/dlTask/downloadFile
     * @secure
     */
    downloadFile: (data: DlTask) =>
      http.request<ResultString['data']>(`/api/main/dlTask/downloadFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统下载任务表
     * @name BatchDelete
     * @summary 批量删除
     * @request POST:/dlTask/batchDelete
     * @secure
     */
    batchDelete: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/dlTask/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 系统下载任务表
     * @name Add
     * @summary 新增任务
     * @request POST:/dlTask/add
     * @secure
     */
    add: (data: DlTask) =>
      http.request<ResultObject['data']>(`/api/main/dlTask/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  deliveryCard: {
    /**
     * No description
     *
     * @tags 配送卡表
     * @name WipCompletionScanList
     * @summary 完工入库扫描配送卡
     * @request POST:/deliveryCard/wipCompletionScanList
     * @secure
     */
    wipCompletionScanList: (data: string[]) =>
      http.request<ResultListBarcodeDTO['data']>(`/api/main/deliveryCard/wipCompletionScanList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name UpdateDeliveryCardStatusAndOnhandId
     * @summary 更新条码状态和库存现有量ID
     * @request POST:/deliveryCard/updateDeliveryCardStatusAndOnhandId
     * @secure
     */
    updateDeliveryCardStatusAndOnhandId: (data: LabelVO[]) =>
      http.request<ResultObject['data']>(`/api/main/deliveryCard/updateDeliveryCardStatusAndOnhandId`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name SplitBarcode
     * @summary 配送卡拆分
     * @request POST:/deliveryCard/splitBarcode
     * @secure
     */
    splitBarcode: (data: DeliveryCardSearch) =>
      http.request<ResultObject['data']>(`/api/main/deliveryCard/splitBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name ReprintBarcode
     * @summary 补打条码
     * @request POST:/deliveryCard/reprintBarcode
     * @secure
     */
    reprintBarcode: (data: DeliveryCardSearch) =>
      http.request<ResultObject['data']>(`/api/main/deliveryCard/reprintBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name PrintBarcode
     * @summary 打印条码
     * @request POST:/deliveryCard/printBarcode
     * @secure
     */
    printBarcode: (data: DeliveryCardSearch) =>
      http.request<ResultObject['data']>(`/api/main/deliveryCard/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GetMoScheduleList
     * @summary 查询工单排产
     * @request POST:/deliveryCard/getMoScheduleList
     * @secure
     */
    getMoScheduleList: (data: DeliveryCardSearch) =>
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/main/deliveryCard/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GetDeliveryCardManagerList
     * @summary 查询在制品条码(标签管理表格)
     * @request POST:/deliveryCard/getDeliveryCardManagerList
     * @secure
     */
    getDeliveryCardManagerList: (data: DeliveryCardSearch) =>
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/main/deliveryCard/getDeliveryCardManagerList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GetDeliveryCardLog
     * @summary 查询日志
     * @request POST:/deliveryCard/getDeliveryCardLog
     * @secure
     */
    getDeliveryCardLog: (data: DeliveryCardSearch) =>
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/main/deliveryCard/getDeliveryCardLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GetDeliveryCardList
     * @summary 查询在制品条码(打印下表格)
     * @request POST:/deliveryCard/getDeliveryCardList
     * @secure
     */
    getDeliveryCardList: (data: DeliveryCardSearch) =>
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/main/deliveryCard/getDeliveryCardList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GenerateBarcode
     * @summary 生成条码
     * @request POST:/deliveryCard/generateBarcode
     * @secure
     */
    generateBarcode: (data: DeliveryCardSearch) =>
      http.request<ResultObject['data']>(`/api/main/deliveryCard/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name CancellationBarcode
     * @summary 作废条码
     * @request POST:/deliveryCard/cancellationBarcode
     * @secure
     */
    cancellationBarcode: (data: DeliveryCardSearch) =>
      http.request<ResultObject['data']>(`/api/main/deliveryCard/cancellationBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/deliveryCard/getPrintTmplList
     * @secure
     */
    getPrintTmplList: (query: { moScheId: string }) =>
      http.request<ResultPagingDataPrintTmpl['data']>(`/api/main/deliveryCard/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 配送卡表
     * @name GetBarcodeRuleList
     * @summary 获得条码规则下拉数据
     * @request GET:/deliveryCard/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: (query: { moScheId: string }) =>
      http.request<ResultPagingDataBarcodeRule['data']>(`/api/main/deliveryCard/getBarcodeRuleList`, {
        method: 'GET',
        params: query,
      }),
  },
  defectDealMethod: {
    /**
     * No description
     *
     * @tags 缺陷处理方法
     * @name RemoveDefectDealMethod
     * @summary 删除缺陷处理方法
     * @request POST:/defectDealMethod/removeDefectDealMethod
     * @secure
     */
    removeDefectDealMethod: (data: DefectDealMethodSearch) =>
      http.request<ResultObject['data']>(`/api/main/defectDealMethod/removeDefectDealMethod`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷处理方法
     * @name RemoveDefectDealMethodBatch
     * @summary 批量删除缺陷处理方法
     * @request POST:/defectDealMethod/removeDefectDealMethodBatch
     * @secure
     */
    removeDefectDealMethodBatch: (data: DefectDealMethodSearch) =>
      http.request<ResultObject['data']>(`/api/main/defectDealMethod/removeDefectDealMethodBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷处理方法
     * @name ModifyDefectDealMethod
     * @summary 编辑缺陷处理方法
     * @request POST:/defectDealMethod/modifyDefectDealMethod
     * @secure
     */
    modifyDefectDealMethod: (data: DefectDealMethod) =>
      http.request<ResultObject['data']>(`/api/main/defectDealMethod/modifyDefectDealMethod`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷处理方法
     * @name GetList
     * @summary 查询缺陷处理方法
     * @request POST:/defectDealMethod/getList
     * @secure
     */
    getList: (data: DefectDealMethodSearch) =>
      http.request<ResultPagingDataDefectDealMethodVO['data']>(`/api/main/defectDealMethod/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷处理方法
     * @name AddDefectDealMethod
     * @summary 新增缺陷处理方法
     * @request POST:/defectDealMethod/addDefectDealMethod
     * @secure
     */
    addDefectDealMethod: (data: DefectDealMethod) =>
      http.request<ResultObject['data']>(`/api/main/defectDealMethod/addDefectDealMethod`, {
        method: 'POST',
        body: data as any,
      }),
  },
  defectCode: {
    /**
     * No description
     *
     * @tags 缺陷代码
     * @name RemoveDefectCode
     * @summary 删除缺陷代码
     * @request POST:/defectCode/removeDefectCode
     * @secure
     */
    removeDefectCode: (data: DefectCodeSearch) =>
      http.request<ResultObject['data']>(`/api/main/defectCode/removeDefectCode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name RemoveDefectCodeBatch
     * @summary 批量删除缺陷代码
     * @request POST:/defectCode/removeDefectCodeBatch
     * @secure
     */
    removeDefectCodeBatch: (data: DefectCodeSearch) =>
      http.request<ResultObject['data']>(`/api/main/defectCode/removeDefectCodeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name ModifyDefectCode
     * @summary 编辑缺陷代码
     * @request POST:/defectCode/modifyDefectCode
     * @secure
     */
    modifyDefectCode: (data: DefectCode) =>
      http.request<ResultObject['data']>(`/api/main/defectCode/modifyDefectCode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name Search
     * @summary 获取缺陷代码(业务组件)
     * @request POST:/defectCode/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataDefectCodeVO['data']>(`/api/main/defectCode/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name GetParent
     * @summary 查询父级缺陷
     * @request POST:/defectCode/getParent
     * @secure
     */
    getParent: (data: DefectCodeSearch) =>
      http.request<ResultPagingDataDefectCode['data']>(`/api/main/defectCode/getParent`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name GetList
     * @summary 查询缺陷代码
     * @request POST:/defectCode/getList
     * @secure
     */
    getList: (data: DefectCodeSearch) =>
      http.request<ResultPagingDataDefectCodeVO['data']>(`/api/main/defectCode/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name AddDefectCode
     * @summary 新增缺陷代码
     * @request POST:/defectCode/addDefectCode
     * @secure
     */
    addDefectCode: (data: DefectCodeSearch) =>
      http.request<ResultObject['data']>(`/api/main/defectCode/addDefectCode`, {
        method: 'POST',
        body: data as any,
      }),
  },
  customer: {
    /**
     * No description
     *
     * @tags 客户
     * @name Search
     * @summary 客户信息查询
     * @request POST:/customer/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataCustomer['data']>(`/api/main/customer/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 客户
     * @name GetItemById
     * @request POST:/customer/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultCustomer['data']>(`/api/main/customer/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 客户
     * @name GetItemByCode
     * @summary 列表编辑单记录查询
     * @request POST:/customer/items/select
     * @secure
     */
    getItemByCode: (data: JSONObject) =>
      http.request<ResultCustomer['data']>(`/api/main/customer/items/select`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 客户
     * @name UpdateItemByCode
     * @summary 列表编辑单记录修改
     * @request POST:/customer/items/modify
     * @secure
     */
    updateItemByCode: (data: Customer) =>
      http.request<ResultObject['data']>(`/api/main/customer/items/modify`, {
        method: 'POST',
        body: data as any,
      }),
  },
  containerType: {
    /**
     * No description
     *
     * @tags 容器类型表
     * @name Modify
     * @summary 编辑容器类型
     * @request POST:/containerType/modify
     * @secure
     */
    modify: (data: ContainerType) =>
      http.request<ResultObject['data']>(`/api/main/containerType/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器类型表
     * @name GetList
     * @summary 查询容器类型
     * @request POST:/containerType/getList
     * @secure
     */
    getList: (data: ContainerTypeSearch) =>
      http.request<ResultPagingDataContainerTypeVO['data']>(`/api/main/containerType/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器类型表
     * @name Add
     * @summary 新增容器类型
     * @request POST:/containerType/add
     * @secure
     */
    add: (data: ContainerType) =>
      http.request<ResultObject['data']>(`/api/main/containerType/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  containerInMitem: {
    /**
     * No description
     *
     * @tags 容器与物料表
     * @name RemoveBatch
     * @summary 删除容器类型关联物料
     * @request POST:/containerInMitem/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/containerInMitem/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器与物料表
     * @name Modify
     * @summary 编辑容器类型关联物料
     * @request POST:/containerInMitem/modify
     * @secure
     */
    modify: (data: ContainerInMitem) =>
      http.request<ResultObject['data']>(`/api/main/containerInMitem/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器与物料表
     * @name GetList
     * @summary 查询容器类型与物料
     * @request POST:/containerInMitem/getList
     * @secure
     */
    getList: (data: ContainerInMitemSearch) =>
      http.request<ResultPagingDataContainerInMitemVO['data']>(`/api/main/containerInMitem/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器与物料表
     * @name Add
     * @summary 新增容器类型关联物料
     * @request POST:/containerInMitem/add
     * @secure
     */
    add: (data: ContainerInMitem) =>
      http.request<ResultObject['data']>(`/api/main/containerInMitem/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  container: {
    /**
     * No description
     *
     * @tags 容器表
     * @name RemoveBatch
     * @summary 删除容器
     * @request POST:/container/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/container/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器表
     * @name PrintBarcode
     * @summary 打印条码
     * @request POST:/container/printBarcode
     * @secure
     */
    printBarcode: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/container/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器表
     * @name GetList
     * @summary 查询容器
     * @request POST:/container/getList
     * @secure
     */
    getList: (data: ContainerSearch) =>
      http.request<ResultPagingDataContainerVO['data']>(`/api/main/container/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器表
     * @name GenerateBarcode
     * @summary 生成条码
     * @request POST:/container/generateBarcode
     * @secure
     */
    generateBarcode: (data: ContainerSearch) =>
      http.request<ResultObject['data']>(`/api/main/container/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 容器表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/container/getPrintTmplList
     * @secure
     */
    getPrintTmplList: () =>
      http.request<ResultListPrintTmpl['data']>(`/api/main/container/getPrintTmplList`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 容器表
     * @name GetBarcodeRuleList
     * @summary 获得条码规则下拉数据
     * @request GET:/container/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: () =>
      http.request<ResultListBarcodeRule['data']>(`/api/main/container/getBarcodeRuleList`, {
        method: 'GET',
      }),
  },
  businessTmplLibDtl: {
    /**
     * No description
     *
     * @tags 业务单元模板库明细表
     * @name BatchDelete
     * @summary 批量删除
     * @request POST:/businessTmplLibDtl/batchDelete
     * @secure
     */
    batchDelete: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/businessTmplLibDtl/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 业务单元模板库明细表
     * @name AddList
     * @summary 新增明细清单
     * @request POST:/businessTmplLibDtl/addList
     * @secure
     */
    addList: (data: BusinessTmplLibDtl[]) =>
      http.request<ResultObject['data']>(`/api/main/businessTmplLibDtl/addList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  businessTmplLib: {
    /**
     * No description
     *
     * @tags 业务单元模板库表
     * @name ListByIds
     * @summary 根据名称获取明细
     * @request POST:/businessTmplLib/listByIds
     * @secure
     */
    listByIds: (data: BusinessTmplLib) =>
      http.request<ResultListBusinessTmplLibDtl['data']>(`/api/main/businessTmplLib/listByIds`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 业务单元模板库表
     * @name Items
     * @summary 获取模板清单
     * @request POST:/businessTmplLib/items
     * @secure
     */
    items: () =>
      http.request<ResultListBusinessTmplLib['data']>(`/api/main/businessTmplLib/items`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 业务单元模板库表
     * @name BatchDelete
     * @summary 批量删除
     * @request POST:/businessTmplLib/batchDelete
     * @secure
     */
    batchDelete: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/businessTmplLib/batchDelete`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 业务单元模板库表
     * @name Add
     * @summary 新增工序业务执行单元库头表
     * @request POST:/businessTmplLib/add
     * @secure
     */
    add: (data: BusinessTmplLib) =>
      http.request<ResultLong['data']>(`/api/main/businessTmplLib/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  barcodeWipLog: {
    /**
     * No description
     *
     * @tags 在制品条码日志表
     * @name Save
     * @summary 保存在制品条码日志
     * @request POST:/barcodeWipLog/save
     * @secure
     */
    save: (data: BarcodeWipLog) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWipLog/save`, {
        method: 'POST',
        body: data as any,
      }),
  },
  barcodeWip: {
    /**
     * No description
     *
     * @tags 在制品条码表
     * @name UpdateById
     * @summary 根据ID更新条码
     * @request POST:/barcodeWip/updateById
     * @secure
     */
    updateById: (data: BarcodeWip) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/updateById`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name UpdateBarcodeStatusAndOnhandId
     * @summary 更新条码状态和库存现有量ID
     * @request POST:/barcodeWip/updateBarcodeStatusAndOnhandId
     * @secure
     */
    updateBarcodeStatusAndOnhandId: (data: LabelVO[]) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/updateBarcodeStatusAndOnhandId`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name SplitBarcode
     * @summary 拆分条码
     * @request POST:/barcodeWip/splitBarcode
     * @secure
     */
    splitBarcode: (data: LabelSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/splitBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name ReprintBarcode
     * @summary 补打产品条码
     * @request POST:/barcodeWip/reprintBarcode
     * @secure
     */
    reprintBarcode: (data: BarcodeWipSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/reprintBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name PrintBarcode
     * @summary 打印产品条码
     * @request POST:/barcodeWip/printBarcode
     * @secure
     */
    printBarcode: (data: BarcodeWipSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetMoScheduleList
     * @summary 查询工单排产(标签打印上表格)
     * @request POST:/barcodeWip/getMoScheduleList
     * @secure
     */
    getMoScheduleList: (data: BarcodeWipSearch) =>
      http.request<ResultPagingDataBarcodeWipVO['data']>(`/api/main/barcodeWip/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetBarcodeWipManagerList
     * @summary 查询在制品条码(标签管理表格)
     * @request POST:/barcodeWip/getBarcodeWipManagerList
     * @secure
     */
    getBarcodeWipManagerList: (data: BarcodeWipSearch) =>
      http.request<ResultPagingDataBarcodeWipVO['data']>(`/api/main/barcodeWip/getBarcodeWipManagerList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetBarcodeWipLog
     * @summary 查询产品条码日志
     * @request POST:/barcodeWip/getBarcodeWipLog
     * @secure
     */
    getBarcodeWipLog: (data: BarcodeWipSearch) =>
      http.request<ResultPagingDataBarcodeWipVO['data']>(`/api/main/barcodeWip/getBarcodeWipLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetBarcodeWipList
     * @summary 查询在制品条码(标签打印下表格)
     * @request POST:/barcodeWip/getBarcodeWipList
     * @secure
     */
    getBarcodeWipList: (data: BarcodeWipSearch) =>
      http.request<ResultPagingDataBarcodeWipVO['data']>(`/api/main/barcodeWip/getBarcodeWipList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GenerateBarcode
     * @summary 生成产品条码
     * @request POST:/barcodeWip/generateBarcode
     * @secure
     */
    generateBarcode: (data: BarcodeWipSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name CancellationBarcode
     * @summary 作废产品条码
     * @request POST:/barcodeWip/cancellationBarcode
     * @secure
     */
    cancellationBarcode: (data: BarcodeWipSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeWip/cancellationBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/barcodeWip/getPrintTmplList
     * @secure
     */
    getPrintTmplList: (query: { moScheId: string }) =>
      http.request<ResultListPrintTmpl['data']>(`/api/main/barcodeWip/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetBarcodeRuleList
     * @summary 获得条码规则下拉数据
     * @request GET:/barcodeWip/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: (query: { moScheId: string }) =>
      http.request<ResultListBarcodeRule['data']>(`/api/main/barcodeWip/getBarcodeRuleList`, {
        method: 'GET',
        params: query,
      }),
  },
  barcodeValidateRule: {
    /**
     * No description
     *
     * @tags 条码验证规则表
     * @name RemoveBarcodeVaildateRule
     * @summary 删除条码验证规则(逻辑删除)
     * @request POST:/barcodeValidateRule/removeBarcodeVaildateRule
     * @secure
     */
    removeBarcodeVaildateRule: (data: BarcodeVaildateRuleSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeValidateRule/removeBarcodeVaildateRule`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 条码验证规则表
     * @name ModifyBarcodeVaildateRule
     * @summary 编辑条码验证规则
     * @request POST:/barcodeValidateRule/modifyBarcodeVaildateRule
     * @secure
     */
    modifyBarcodeVaildateRule: (data: BarcodeValidateRule) =>
      http.request<ResultObject['data']>(`/api/main/barcodeValidateRule/modifyBarcodeVaildateRule`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 条码验证规则表
     * @name GetBarcodeVaildateRuleList
     * @summary 查询条码验证规则
     * @request POST:/barcodeValidateRule/getBarcodeVaildateRuleList
     * @secure
     */
    getBarcodeVaildateRuleList: (data: BarcodeVaildateRuleSearch) =>
      http.request<ResultPagingDataBarcodeVaildateRuleVO['data']>(
        `/api/main/barcodeValidateRule/getBarcodeVaildateRuleList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 条码验证规则表
     * @name AddBarcodeVaildateRule
     * @summary 新增条码验证规则
     * @request POST:/barcodeValidateRule/addBarcodeVaildateRule
     * @secure
     */
    addBarcodeVaildateRule: (data: BarcodeValidateRule) =>
      http.request<ResultObject['data']>(`/api/main/barcodeValidateRule/addBarcodeVaildateRule`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 条码验证规则表
     * @name VaildateBarcodeRule
     * @summary 验证条码是否与条码规则匹配
     * @request GET:/barcodeValidateRule/VaildateBarcodeRule
     * @secure
     */
    vaildateBarcodeRule: (query: { expression: string; barcode: string }) =>
      http.request<ResultBoolean['data']>(`/api/main/barcodeValidateRule/VaildateBarcodeRule`, {
        method: 'GET',
        params: query,
      }),
  },
  barcodeSequence: {
    /**
     * No description
     *
     * @tags 条码生成序列号表
     * @name UpdateSeq
     * @summary 生成条码时更新条码seq表
     * @request POST:/barcodeSequence/updateSeq
     * @secure
     */
    updateSeq: (data: BarcodeSequenceDTO) =>
      http.request<ResultObject['data']>(`/api/main/barcodeSequence/updateSeq`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 条码生成序列号表
     * @name SearchSeq
     * @summary 查询指定seq是否有记录
     * @request POST:/barcodeSequence/searchSeq
     * @secure
     */
    searchSeq: (data: BarcodeSequenceDTO) =>
      http.request<ResultBoolean['data']>(`/api/main/barcodeSequence/searchSeq`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 条码生成序列号表
     * @name InsertSeq
     * @summary 生成条码时插条码seq表
     * @request POST:/barcodeSequence/insertSeq
     * @secure
     */
    insertSeq: (data: BarcodeSequence) =>
      http.request<ResultObject['data']>(`/api/main/barcodeSequence/insertSeq`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 条码生成序列号表
     * @name GetCurrentValue
     * @summary 获取seq当前的最大值
     * @request POST:/barcodeSequence/getCurrentValue
     * @secure
     */
    getCurrentValue: (data: BarcodeSequenceDTO) =>
      http.request<ResultLong['data']>(`/api/main/barcodeSequence/getCurrentValue`, {
        method: 'POST',
        body: data as any,
      }),
  },
  barcodeRuleInMitem: {
    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name RemoveMitemBatch
     * @summary 批量删除关联物料
     * @request POST:/barcodeRuleInMitem/removeMitemBatch
     * @secure
     */
    removeMitemBatch: (data: BarcodeRuleInMitemSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodeRuleInMitem/removeMitemBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name ModifyBarcodeRule
     * @summary 编辑条码规则
     * @request POST:/barcodeRuleInMitem/modifyBarcodeRule
     * @secure
     */
    modifyBarcodeRule: (data: BarcodeRule) =>
      http.request<ResultObject['data']>(`/api/main/barcodeRuleInMitem/modifyBarcodeRule`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name GetMitemList
     * @summary 查询物料信息
     * @request POST:/barcodeRuleInMitem/getMitemList
     * @secure
     */
    getMitemList: (data: BarcodeRuleInMitemSearch) =>
      http.request<ResultPagingDataBarcodeRuleInMitemVO['data']>(`/api/main/barcodeRuleInMitem/getMitemList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name GetBarcodeRuleList
     * @summary 查询条码规则
     * @request POST:/barcodeRuleInMitem/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: (data: BarcodeRuleInMitemSearch) =>
      http.request<ResultPagingDataBarcodeRuleInMitemVO['data']>(`/api/main/barcodeRuleInMitem/getBarcodeRuleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name AddBarcodeRule
     * @summary 新增条码规则
     * @request POST:/barcodeRuleInMitem/addBarcodeRule
     * @secure
     */
    addBarcodeRule: (data: BarcodeRule) =>
      http.request<ResultObject['data']>(`/api/main/barcodeRuleInMitem/addBarcodeRule`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name AddBarcodeRuleMitem
     * @summary 新增关联物料
     * @request POST:/barcodeRuleInMitem/addBarcodeRuleMitem
     * @secure
     */
    addBarcodeRuleMitem: (data: BarcodeRuleInMitem) =>
      http.request<ResultObject['data']>(`/api/main/barcodeRuleInMitem/addBarcodeRuleMitem`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name PreviewBarcode
     * @summary 预览条码
     * @request GET:/barcodeRuleInMitem/previewBarcode
     * @secure
     */
    previewBarcode: (query: { expression: string; barcodeType: string }) =>
      http.request<ResultString['data']>(`/api/main/barcodeRuleInMitem/previewBarcode`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name GetRuleSegment
     * @summary 新增规则界面：条码规则片段
     * @request GET:/barcodeRuleInMitem/getRuleSegment
     * @secure
     */
    getRuleSegment: () =>
      http.request<ResultPagingDataBarcodeSegmentDTO['data']>(`/api/main/barcodeRuleInMitem/getRuleSegment`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name CheckExpression
     * @summary 检查规则表达式是否合法
     * @request GET:/barcodeRuleInMitem/checkExpression
     * @secure
     */
    checkExpression: (query: { expression: string }) =>
      http.request<ResultBoolean['data']>(`/api/main/barcodeRuleInMitem/checkExpression`, {
        method: 'GET',
        params: query,
      }),
  },
  barcodePkg: {
    /**
     * No description
     *
     * @tags 包装条码表
     * @name ReprintBarcode
     * @summary 补打条码
     * @request POST:/barcodePkg/reprintBarcode
     * @secure
     */
    reprintBarcode: (data: BarcodePkgSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodePkg/reprintBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name PrintBarcode
     * @summary 打印条码
     * @request POST:/barcodePkg/printBarcode
     * @secure
     */
    printBarcode: (data: BarcodePkgSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodePkg/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetTagList
     * @summary 查询包装条码下表格Tag
     * @request POST:/barcodePkg/getTagList
     * @secure
     */
    getTagList: (data: BarcodePkgSearch) =>
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/main/barcodePkg/getTagList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetMoScheduleList
     * @summary 查询工单排产(标签打印上表格)
     * @request POST:/barcodePkg/getMoScheduleList
     * @secure
     */
    getMoScheduleList: (data: BarcodePkgSearch) =>
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/main/barcodePkg/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetBarcodePkgManagerList
     * @summary 查询在制品条码(标签管理表格)
     * @request POST:/barcodePkg/getBarcodePkgManagerList
     * @secure
     */
    getBarcodePkgManagerList: (data: BarcodePkgSearch) =>
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/main/barcodePkg/getBarcodePkgManagerList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetBarcodePkgLog
     * @summary 查询日志
     * @request POST:/barcodePkg/getBarcodePkgLog
     * @secure
     */
    getBarcodePkgLog: (data: BarcodePkgSearch) =>
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/main/barcodePkg/getBarcodePkgLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetBarcodePkgList
     * @summary 查询包装条码(标签打印下表格)
     * @request POST:/barcodePkg/getBarcodePkgList
     * @secure
     */
    getBarcodePkgList: (data: BarcodePkgSearch) =>
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/main/barcodePkg/getBarcodePkgList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GenerateBarcode
     * @summary 生成条码
     * @request POST:/barcodePkg/generateBarcode
     * @secure
     */
    generateBarcode: (data: BarcodePkgSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodePkg/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name CancellationBarcode
     * @summary 作废条码
     * @request POST:/barcodePkg/cancellationBarcode
     * @secure
     */
    cancellationBarcode: (data: BarcodePkgSearch) =>
      http.request<ResultObject['data']>(`/api/main/barcodePkg/cancellationBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/barcodePkg/getPrintTmplList
     * @secure
     */
    getPrintTmplList: (query: { moScheId: string; packType: string }) =>
      http.request<ResultPagingDataPrintTmpl['data']>(`/api/main/barcodePkg/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetBarcodeRuleList
     * @summary 获得条码规则下拉数据
     * @request GET:/barcodePkg/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: (query: { moScheId: string; packType: string }) =>
      http.request<ResultPagingDataBarcodeRule['data']>(`/api/main/barcodePkg/getBarcodeRuleList`, {
        method: 'GET',
        params: query,
      }),
  },
  barcode: {
    /**
     * No description
     *
     * @tags 条码公共方法
     * @name WipCompletionUpdateBarcode
     * @summary 完工入库更新条码信息
     * @request POST:/barcode/wipCompletionUpdateBarcode
     * @secure
     */
    wipCompletionUpdateBarcode: (data: WipCompletionLabelDTO[]) =>
      http.request<ResultObject['data']>(`/api/main/barcode/wipCompletionUpdateBarcode`, {
        method: 'POST',
        body: data as any,
      }),
  },
  attendanceMode: {
    /**
     * No description
     *
     * @tags 出勤模式
     * @name RemoveBatch
     * @summary 删除出勤模式
     * @request POST:/attendanceMode/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/main/attendanceMode/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 出勤模式
     * @name ModifyAttendanceMode
     * @summary 编辑出勤
     * @request POST:/attendanceMode/modifyAttendanceMode
     * @secure
     */
    modifyAttendanceMode: (data: AttendanceMode) =>
      http.request<ResultObject['data']>(`/api/main/attendanceMode/modifyAttendanceMode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 出勤模式
     * @name Search
     * @summary 出勤模式业务组件接口
     * @request POST:/attendanceMode/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataAttendanceModeVO['data']>(`/api/main/attendanceMode/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 出勤模式
     * @name GetItemById
     * @summary 根据ID查找出勤模式
     * @request POST:/attendanceMode/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultAttendanceMode['data']>(`/api/main/attendanceMode/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 出勤模式
     * @name GetList
     * @summary 查询出勤
     * @request POST:/attendanceMode/getList
     * @secure
     */
    getList: (data: AttendanceModeSearch) =>
      http.request<ResultPagingDataAttendanceModeVO['data']>(`/api/main/attendanceMode/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 出勤模式
     * @name AddAttendanceMode
     * @summary 新增出勤
     * @request POST:/attendanceMode/addAttendanceMode
     * @secure
     */
    addAttendanceMode: (data: AttendanceMode) =>
      http.request<ResultObject['data']>(`/api/main/attendanceMode/addAttendanceMode`, {
        method: 'POST',
        body: data as any,
      }),
  },
  appBase: {
    /**
     * No description
     *
     * @tags APP底座表
     * @name Add
     * @summary 新增底座
     * @request POST:/appBase/add
     * @secure
     */
    add: (
      query: {
        appName: string;
        appVersion: string;
        appType: string;
        /** @format int32 */
        appBuild: number;
        packageName: string;
        memo: string;
      },
      data: {
        /** @format binary */
        file: File;
      },
    ) =>
      http.request<ResultObject['data']>(`/api/main/appBase/add`, {
        method: 'POST',
        params: query,
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags APP底座表
     * @name GetNewApp
     * @summary 获取最新底座
     * @request GET:/appBase/getNewApp
     * @secure
     */
    getNewApp: (query: {
      packageName: string;
      /** @format int32 */
      appBuild: number;
    }) =>
      http.request<ResultAppBase['data']>(`/api/main/appBase/getNewApp`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags APP底座表
     * @name GetList
     * @summary 获取底座列表
     * @request GET:/appBase/getList
     * @secure
     */
    getList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      appName: string;
      appType: string;
    }) =>
      http.request<ResultPagingDataAppBaseVO['data']>(`/api/main/appBase/getList`, {
        method: 'GET',
        params: query,
      }),
  },
  adminOrg: {
    /**
     * No description
     *
     * @tags 行政组织架构表
     * @name GetAllListNoTree
     * @summary 获取员工信息
     * @request POST:/adminOrg/getAllListNoTree
     * @secure
     */
    getAllListNoTree: () =>
      http.request<ResultObject['data']>(`/api/main/adminOrg/getAllListNoTree`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 行政组织架构表
     * @name Tree
     * @summary 获取行政组织树
     * @request GET:/adminOrg/tree
     * @secure
     */
    tree: () =>
      http.request<ResultListAdminOrgVO['data']>(`/api/main/adminOrg/tree`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 行政组织架构表
     * @name Getlist
     * @summary 获取员工信息
     * @request GET:/adminOrg/getlist
     * @secure
     */
    getlist: (query: {
      /** @format int32 */
      parent_org_id: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/adminOrg/getlist`, {
        method: 'GET',
        params: query,
      }),
  },
  workbenchIndex: {
    /**
     * No description
     *
     * @tags 工作台指标表
     * @name GetAll
     * @summary 获取所有指标
     * @request GET:/workbenchIndex/getAll
     * @secure
     */
    getAll: () =>
      http.request<ResultListWorkbenchIndex['data']>(`/api/main/workbenchIndex/getAll`, {
        method: 'GET',
      }),
  },
  routingRevision: {
    /**
     * No description
     *
     * @tags 工艺路线版本
     * @name GetRoutRevisionByRoutingCode
     * @summary 获取工单的工艺路线版本信息(工单匹配规则:按产线和按物料类型或按物料)
     * @request GET:/routingRevision/getRoutRevisionByRoutingCode
     * @secure
     */
    getRoutRevisionByRoutingCode: (query: {
      routingCode: string;
      routingType: string;
      workcenterId: string;
      mitemId: string;
      mitemcategoryId: string;
    }) =>
      http.request<ResultObject['data']>(`/api/main/routingRevision/getRoutRevisionByRoutingCode`, {
        method: 'GET',
        params: query,
      }),
  },
  profile: {
    /**
     * No description
     *
     * @tags 配置项
     * @name SelectById
     * @request GET:/profile/items/{id}
     * @secure
     */
    selectById: (id: number) =>
      http.request<ResultProfile['data']>(`/api/main/profile/items/${id}`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 配置项
     * @name GetAllTree
     * @summary 主界面树形区域
     * @request GET:/profile/items/tree
     * @secure
     */
    getAllTree: () =>
      http.request<ResultListProfileLeftTreeTopVO['data']>(`/api/main/profile/items/tree`, {
        method: 'GET',
      }),
  },
  permission: {
    /**
     * No description
     *
     * @tags 权限字
     * @name GetTreePermissionsByUserId
     * @summary 根据用户ID获取权限树
     * @request GET:/permission/getTreePermissionsByUserId
     * @secure
     */
    getTreePermissionsByUserId: (query: { userId: string }) =>
      http.request<ResultListModulePermissionDTO['data']>(`/api/main/permission/getTreePermissionsByUserId`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 权限字
     * @name GetTreePermissionsByRoleId
     * @summary 根据角色ID获取权限树
     * @request GET:/permission/getTreePermissionsByRoleId
     * @secure
     */
    getTreePermissionsByRoleId: (query: { roleId: string }) =>
      http.request<ResultListModulePermissionDTO['data']>(`/api/main/permission/getTreePermissionsByRoleId`, {
        method: 'GET',
        params: query,
      }),
  },
  objectProperty: {
    /**
     * No description
     *
     * @tags 领域扩展属性
     * @name GetObjectValueList
     * @summary 获取领域扩展属性列表与值
     * @request GET:/objectProperty/getObjectValueList
     * @secure
     */
    getObjectValueList: (query: { objectId: string; objectCode: string; propertyCode: string }) =>
      http.request<ResultListObjectPropertyValueVO['data']>(`/api/main/objectProperty/getObjectValueList`, {
        method: 'GET',
        params: query,
      }),
  },
  notice: {
    /**
     * No description
     *
     * @tags 系统通知表
     * @name List
     * @summary 获取系统通知
     * @request GET:/notice/list
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
       * @default 20
       */
      pageSize?: number;
      /** @default "" */
      title?: string;
      /** @default "" */
      datetimeStart?: string;
      /** @default "" */
      datetimeEnd?: string;
      /** @default "" */
      id?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/main/notice/list`, {
        method: 'GET',
        params: query,
      }),
  },
  businessUnit: {
    /**
     * No description
     *
     * @tags 业务执行单元表
     * @name Items
     * @summary 获取原子清单
     * @request GET:/businessUnit/items
     * @secure
     */
    items: () =>
      http.request<ResultListBusinessUnit['data']>(`/api/main/businessUnit/items`, {
        method: 'GET',
      }),
  },
};
