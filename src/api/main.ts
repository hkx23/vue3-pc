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
  /** 模板代码 */
  tmplCode?: string;
  /** 模板名称 */
  tmplName?: string;
  /** 模板描述 */
  tmplDesc?: string;
  /** 模板内容地址 */
  tmplBodyPath?: string;
  /** 模板类别 */
  tmplCategory?: string;
  /** 模板类型 */
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

/** 响应数据 */
export type PagingDataWorkgroup = {
  list?: Workgroup[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkgroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkgroup;
}

/** 班组 */
export interface Workgroup {
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
  /** 班组代码 */
  workgroupCode?: string;
  /** 班组名称 */
  workgroupName?: string;
  /** 班组描述 */
  workgroupDesc?: string;
  workshopId?: string;
}

/** 通用响应类 */
export interface ResultWorkgroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 班组 */
  data?: Workgroup;
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

/** 仓库 */
export type Warehouse = {
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
} | null;

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
export interface RoleUserDTO {
  roleId?: string;
  userIds?: string[];
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

/** 用户 */
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
} | null;

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
  /** 人员编号 */
  personCode?: string;
  /** 姓名 */
  personName?: string;
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
  /** 模板代码 */
  tmplCode?: string;
  /** 模板名称 */
  tmplName?: string;
  /** 模板描述 */
  tmplDesc?: string;
  /** 模板内容地址 */
  tmplBodyPath?: string;
  /** 模板类别 */
  tmplCategory?: string;
  /** 模板类型 */
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
export type PagingDataPerson = {
  list?: Person[];
  /** @format int32 */
  total?: number;
} | null;

/** 员工表 */
export interface Person {
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
}

/** 通用响应类 */
export interface ResultPagingDataPerson {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPerson;
}

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
  /** 模块类型 */
  moduleType?: string;
  /** 模块版本号 */
  moduleVersion?: number;
  /** 模块包标识 */
  modulePackageIdentify?: string;
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
  /**
   * 客户端类型
   * @format int32
   */
  clientType?: number;
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
  /**
   * 模块类型
   * @format int32
   */
  moduleType?: number;
  /** 模块版本号 */
  moduleVersion?: number;
  /** 模块包标识 */
  modulePackageIdentify?: string;
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
  oid?: string;
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
  mitemKeyword?: string;
  supplierKeyword?: string;
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  sorts?: SortParam[];
  filters?: Filter[];
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
  isState?: boolean;
  isInProcessChecked?: boolean;
  isProductChecked?: boolean;
  stateName?: string;
  isInProcessName?: string;
  isProductName?: string;
  isRawChecked?: boolean;
  isBatchName?: string;
  isRawName?: string;
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
  mitemCategoryId?: string;
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
  wwarehouseId?: string;
  mmitemCategoryId?: string;
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
  /** 子元素 */
  child?: DefectCodeVO[];
  isState?: boolean;
  stateName?: string;
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
  mitemId?: string;
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

/** 出勤模式 */
export type AttendanceMode = {
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
} | null;

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
  /** 用户名 */
  userName?: string;
  /** 显示名称 */
  displayName?: string;
  defaultOrgId?: string;
  /** 授权组织 */
  orgList?: OrgVO[];
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
  /** 模块类型 */
  moduleType?: string;
  /** 模块版本号 */
  moduleVersion?: number;
  /** 模块包标识 */
  modulePackageIdentify?: string;
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
  /** 是否不可编辑 */
  isDisable?: string;
  /** 功能名称-按语言 */
  moduleNameT?: string;
  /** 功能描述-按语言 */
  moduleDescriptionT?: string;
  /** 子级 */
  children?: ModulePermissionDTO[];
  /** 是否可用 */
  enabled?: boolean;
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

/** 响应数据 */
export type KeyValuePairStringString = {
  value?: string;
  label?: string;
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

/** 通用响应类 */
export interface ResultListDefectCodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: DefectCodeVO[] | null;
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
     * @summary 获取模板
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
  workgroup: {
    /**
     * No description
     *
     * @tags 班组
     * @name Search
     * @request POST:/workgroup/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataWorkgroup['data']>(`/api/main/workgroup/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name GetItemById
     * @request POST:/workgroup/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultWorkgroup['data']>(`/api/main/workgroup/items/${id}`, {
        method: 'POST',
      }),
  },
  warehouse: {
    /**
     * No description
     *
     * @tags 仓库
     * @name Search
     * @request POST:/warehouse/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/main/warehouse/items`, {
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
     * @name DeleteUserInRole
     * @summary 传入roleId与useIdList,删除
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
     * @name AddUserInRole
     * @summary 传入roleId与useIdList,新增
     * @request POST:/userInRole/addUserInRole
     * @secure
     */
    addUserInRole: (data: RoleUserDTO) =>
      http.request<ResultObject['data']>(`/api/main/userInRole/addUserInRole`, {
        method: 'POST',
        body: data as any,
      }),
  },
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
      http.request<ResultObject['data']>(`/api/main/user/items`, {
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
      http.request<ResultPagingDataPerson['data']>(`/api/main/person/items`, {
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
  module: {
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
     * @request GET:/mitem/getlistbymitemcategory
     * @secure
     */
    getListByMitemCategory: (query: {
      keyword: string;
      /** @format int32 */
      mitemcategoryid: number;
      /** @format int32 */
      pagenum: number;
      /** @format int32 */
      pagesize: number;
    }) =>
      http.request<ResultObject['data']>(`/api/main/mitem/getlistbymitemcategory`, {
        method: 'GET',
        params: query,
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
     * @name Search
     * @request POST:/enterprise/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataEnterprise['data']>(`/api/main/enterprise/items`, {
        method: 'POST',
        body: data as any,
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

    /**
     * No description
     *
     * @tags 缺陷处理方法
     * @name GetIncidentType
     * @summary 获取下拉列表(缺陷处理方法类别)
     * @request GET:/defectDealMethod/getDefectDealMethodType
     * @secure
     */
    getIncidentType: () =>
      http.request<ResultPagingDataParam['data']>(`/api/main/defectDealMethod/getDefectDealMethodType`, {
        method: 'GET',
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

    /**
     * No description
     *
     * @tags 缺陷代码
     * @name Tree
     * @summary 获取缺陷树
     * @request GET:/defectCode/tree
     * @secure
     */
    tree: () =>
      http.request<ResultListDefectCodeVO['data']>(`/api/main/defectCode/tree`, {
        method: 'GET',
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
  },
  attendanceMode: {
    /**
     * No description
     *
     * @tags 出勤模式
     * @name Search
     * @request POST:/attendanceMode/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/main/attendanceMode/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 出勤模式
     * @name GetItemById
     * @request POST:/attendanceMode/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultAttendanceMode['data']>(`/api/main/attendanceMode/items/${id}`, {
        method: 'POST',
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
    getTreePermissionsByRoleId: (query: {
      /** @format int64 */
      roleId: number;
    }) =>
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
  adminOrg: {
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
};
