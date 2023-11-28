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

/** 显示计量单位 */
export interface MitemUomVo {
  id?: string;
  /** 计量单位 */
  uom?: string;
  /** 计量单位符号 */
  uomSymbol?: string;
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
  uom?: string;
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
  /** 计量单位 */
  uom?: string;
  /** 计量单位符号 */
  uomSymbol?: string;
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
  isProductChecked?: boolean;
  isInProcessChecked?: boolean;
  isState?: boolean;
  stateName?: string;
  isRawName?: string;
  isRawChecked?: boolean;
  isBatchName?: string;
  isInProcessName?: string;
  isProductName?: string;
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
  objectPropertyCategory: {
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
      http.request<ResultListShowModuleVO['data']>(`/api/main/module/show`, {
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
