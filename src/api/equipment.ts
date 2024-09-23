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

export interface SparePartTransferHeadSearch {
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
  /** 单据号模糊 */
  billNo?: string;
  /** 单据类型 */
  billCategory?: string;
  creatorId?: string;
}

/** 响应数据 */
export type PagingDataSparePartTransferHeadVO = {
  list?: SparePartTransferHeadVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSparePartTransferHeadVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSparePartTransferHeadVO;
}

export interface SparePartTransferHeadVO {
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
  /** 单据业务类型 */
  billBusinessType?: string;
  /** 单据类型 */
  billCategory?: string;
  /** 关联单据号 */
  relateBillNo?: string;
  /** 备注 */
  memo?: string;
  /** 单据类型名称 */
  billCategoryName?: string;
  /** 单据业务类型名称 */
  billBusinessTypeName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
}

export interface SparePartTransferDtlSearch {
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
  transferHeadId?: string;
}

/** 响应数据 */
export type PagingDataSparePartTransferDtlVO = {
  list?: SparePartTransferDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSparePartTransferDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSparePartTransferDtlVO;
}

export interface SparePartTransferDtlVO {
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
  transferHeadId?: string;
  sparePartId?: string;
  warehouseId?: string;
  districtId?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  /** 数量 */
  qty?: number;
  /** 单位 */
  uom?: string;
  /** 备注 */
  memo?: string;
  /** 备品备件编码 */
  sparePartCode?: string;
  /** 备品备件名称 */
  sparePartName?: string;
  /** 源仓库名称 */
  warehouseName?: string;
  /** 源货位名称 */
  districtName?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  /** 目标货位名称 */
  toDistrictName?: string;
  /** 计量单位符号 */
  uomName?: string;
}

export interface DatasourceField {
  tableName?: string;
  fieldName?: string;
}

export interface DatasourceSetting {
  /** @format int32 */
  seq?: number;
  datasourceType?: string;
  datasourceName?: string;
  aliasName?: string;
  relatedType?: string;
  conditionData?: DatasourceSettingCondition[];
}

export interface DatasourceSettingCondition {
  /** @format int32 */
  seq?: number;
  fieldName?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN' | 'BETWEEN';
  relateType?: string;
  aliasName?: string;
  relateFieldName?: string;
  relateValue?: string;
}

export interface Filter {
  tableName?: string;
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN' | 'BETWEEN';
  value?: string;
  valuesList?: string[];
}

export interface RepairItemInEquipmentSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  repairItemId?: string;
  relateType?: string;
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

/** 设备与点检项目关系表 */
export interface RepairItemInEquipmentVO {
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
  repairItemId?: string;
  assetTypeId?: string;
  assetBrandId?: string;
  assetModelId?: string;
  /** 模具类型 */
  mouldType?: string;
  mouldId?: string;
  /** 点检项目代码 */
  repairItemCode?: string;
  /** 点检项目名称 */
  repairItemName?: string;
  /** 资产类型 */
  assetTypeCode?: string;
  assetTypeName?: string;
  /** 资产品牌 */
  assetBrandCode?: string;
  assetBrandName?: string;
  /** 资产型号 */
  assetModelCode?: string;
  assetModelName?: string;
  /** 模具类型名称 */
  mouldTypeName?: string;
  /** 模具 */
  mouldCode?: string;
  mouldName?: string;
  mouldDesc?: string;
  /** 关联类型 */
  relateType?: string;
}

/** 设备维修项目文件表 */
export type RepairItemFile = {
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
  repairItemId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
} | null;

/** 通用响应类 */
export interface ResultListRepairItemFile {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: RepairItemFile[] | null;
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
}

/** 模具展示模型 */
export interface RepairItemVo {
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
  /** 故障代码 */
  repairItemCode?: string;
  /** 故障描述 */
  repairItemName?: string;
  /** 维修方法 */
  repairItemMethod?: string;
  /** 文件列表 */
  fileList?: RepairItemFile[];
  /** 文件列表 */
  deleteFileList?: RepairItemFile[];
}

export interface RepairBillHeadSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  relateType?: string;
  userGroupIds?: string[];
}

/** 设备维修明细文件表 */
export interface RepairBillDtlFile {
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
  repairBillDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  /** 文件类型 */
  fileCategory?: string;
}

export interface RepairBillDtlSparePartVO {
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
  repairBillDtlId?: string;
  sparePartId?: string;
  changeCount?: number;
  sparePartName?: string;
  sparePartCode?: string;
  sparePartModel?: string;
  uom?: string;
}

export interface RepairBillDtlVO {
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
  repairBillHeadId?: string;
  /** 维修项目代码 */
  repairItemCode?: string;
  /** 维修项目描述 */
  repairItemDesc?: string;
  /** 维修项目方法 */
  repairItemMethod?: string;
  /** 解决方法 */
  solveItemMethod?: string;
  /** 备注 */
  memo?: string;
  billDtlFiles?: RepairBillDtlFile[];
  billDtlSpareParts?: RepairBillDtlSparePartVO[];
  repairItemFiles?: RepairItemFile[];
  repairItemId?: string;
}

/** 设备维修单据文件表 */
export interface RepairBillHeadFile {
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
  repairBillHeadId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
}

export interface RepairBillHeadVO {
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
  workcenterId?: string;
  repairDealId?: string;
  repairAcceptId?: string;
  equipmentId?: string;
  userRepairId?: string;
  /**
   * 维修开始时间
   * @format date-time
   */
  datetimeRepairStart?: string;
  /**
   * 维修完成时间
   * @format date-time
   */
  datetimeRepairEnd?: string;
  userAcceptId?: string;
  /**
   * 验收时间
   * @format date-time
   */
  datetimeAccept?: string;
  /** 备注 */
  memo?: string;
  status?: string;
  mouldId?: string;
  userCreatorName?: string;
  userRepairName?: string;
  userAcceptName?: string;
  mouldCode?: string;
  mouldName?: string;
  mouldType?: string;
  mouldTypeName?: string;
  equipmentCode?: string;
  equipmentName?: string;
  assetModelId?: string;
  assetModelCode?: string;
  assetModelName?: string;
  assetBrandId?: string;
  assetBrandCode?: string;
  assetBrandName?: string;
  assetTypeId?: string;
  assetTypeCode?: string;
  assetTypeName?: string;
  positionName?: string;
  billHeadFiles?: RepairBillHeadFile[];
  billDetails?: RepairBillDtlVO[];
  statusName?: string;
  workcenterName?: string;
  workshopName?: string;
  billType?: string;
  repairDealGroupName?: string;
  repairAcceptGroupName?: string;
  repairItemCode?: string;
  repairItemDesc?: string;
  repairItemMethod?: string;
  solveItemMethod?: string;
  positionPath?: string;
}

export interface RepairBillAcceptDTO {
  billId?: string;
  isAccepted?: boolean;
  memo?: string;
}

export interface MaintenancePlanItemSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  maintenancePlanId?: string;
  relateType?: string;
}

/** 设备与保养项目关系表 */
export interface MaintenancePlanItemBatchDTO {
  maintenancePlanId?: string;
  /** 设备保养项目表ID */
  maintenanceItemIds?: string[];
}

/** 设备与保养项目关系表 */
export interface MaintenancePlanItemVO {
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
  maintenancePlanId?: string;
  maintenanceItemId?: string;
  /** 保养项目编码 */
  maintenanceItemCode?: string;
  /** 保养项目名称 */
  maintenanceItemName?: string;
  /** 保养要求 */
  maintenanceItemRequire?: string;
  /** 保养周期 */
  maintenancePeriod?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
  /** 保养计划代码 */
  maintenancePlanCode?: string;
  /** 保养计划名称 */
  maintenancePlanName?: string;
}

export interface MaintenancePlanSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  relateType?: string;
}

/** 保养计划 */
export interface MaintenancePlanVO {
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
  /** 保养计划代码 */
  maintenancePlanCode?: string;
  /** 保养计划名称 */
  maintenancePlanName?: string;
  /** 保养计划方式 */
  maintenancePlanType?: string;
  /**
   * 保计划养周期（天）
   * @format int32
   */
  dayMaintenancePeriod?: number;
  /**
   * 预警提前期（天）
   * @format int32
   */
  dayEarlyWarn?: number;
  /**
   * 运行时长（小时）
   * @format int32
   */
  hourRun?: number;
  /**
   * 提前运行时间（小时）
   * @format int32
   */
  hourRunEarly?: number;
  /**
   * 生效时间
   * @format date-time
   */
  datetimeEffect?: string;
  assetTypeId?: string;
  assetBrandId?: string;
  assetModelId?: string;
  /** 模具类型 */
  mouldType?: string;
  mouldId?: string;
  /** 资产类型 */
  assetTypeCode?: string;
  assetTypeName?: string;
  /** 资产品牌 */
  assetBrandCode?: string;
  assetBrandName?: string;
  /** 资产型号 */
  assetModelCode?: string;
  assetModelName?: string;
  /** 模具类型名称 */
  mouldTypeName?: string;
  /** 模具 */
  mouldCode?: string;
  mouldName?: string;
  mouldDesc?: string;
  /** 关联类型 */
  relateType?: string;
}

export interface MaintenanceItemInEquipmentSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  maintenanceItemId?: string;
  relateType?: string;
}

/** 设备与保养项目关系表 */
export interface MaintenanceItemInEquipmentVO {
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
  maintenanceItemId?: string;
  assetTypeId?: string;
  assetBrandId?: string;
  assetModelId?: string;
  /** 模具类型 */
  mouldType?: string;
  mouldId?: string;
  /** 保养项目编码 */
  maintenanceItemCode?: string;
  /** 保养项目名称 */
  maintenanceItemName?: string;
  /** 资产类型 */
  assetTypeCode?: string;
  assetTypeName?: string;
  /** 资产品牌 */
  assetBrandCode?: string;
  assetBrandName?: string;
  /** 资产型号 */
  assetModelCode?: string;
  assetModelName?: string;
  /** 模具类型名称 */
  mouldTypeName?: string;
  /** 模具 */
  mouldCode?: string;
  mouldName?: string;
  mouldDesc?: string;
  /** 关联类型 */
  relateType?: string;
}

/** 设备保养项目文件表 */
export type MaintenanceItemFile = {
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
  maintenanceItemId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
} | null;

/** 通用响应类 */
export interface ResultListMaintenanceItemFile {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MaintenanceItemFile[] | null;
}

/** 模具展示模型 */
export interface MaintenanceItemVo {
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
  /** 保养项目编码 */
  maintenanceItemCode?: string;
  /** 保养项目名称 */
  maintenanceItemName?: string;
  /** 保养要求 */
  maintenanceItemRequire?: string;
  /** 保养周期 */
  maintenancePeriod?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
  /** 文件列表 */
  fileList?: MaintenanceItemFile[];
  /** 文件列表 */
  deleteFileList?: MaintenanceItemFile[];
  maintenancePeriodName?: string;
  memo?: string;
}

/** 设备保养明细文件表 */
export interface MaintenanceBillDtlFile {
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
  maintenanceBillDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  /** 文件类型 */
  fileCategory?: string;
}

export interface MaintenanceBillDtlSparePartVO {
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
  maintenanceBillDtlId?: string;
  sparePartId?: string;
  changeCount?: number;
  sparePartName?: string;
  sparePartCode?: string;
  sparePartModel?: string;
  uom?: string;
}

export interface MaintenanceBillDtlVO {
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
  maintenanceBillHeadId?: string;
  /** 保养项目编码 */
  maintenanceItemCode?: string;
  /** 保养项目名称 */
  maintenanceItemName?: string;
  /** 保养要求 */
  maintenanceItemRequire?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  maintenancePeriodName?: string;
  maintenancePeriod?: string;
  billDtlFiles?: MaintenanceBillDtlFile[];
  maintenanceItemFiles?: MaintenanceItemFile[];
  billDtlSpareParts?: MaintenanceBillDtlSparePartVO[];
  maintenanceItemId?: string;
}

export interface MaintenanceBillHeadVO {
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
  /** 保养计划编码 */
  maintenancePlanCode?: string;
  /** 保养计划名称 */
  maintenancePlanName?: string;
  /** 保养计划方式 */
  maintenancePlanType?: string;
  workshopId?: string;
  equipmentId?: string;
  /**
   * 计划开始时间
   * @format date-time
   */
  datetimePlanStart?: string;
  /**
   * 要求完成时间
   * @format date-time
   */
  datetimeRequireEnd?: string;
  /**
   * 保养时间
   * @format date-time
   */
  datetimeMaintenance?: string;
  userMaintenanceId?: string;
  /**
   * 验收时间
   * @format date-time
   */
  datetimeAccept?: string;
  userAcceptId?: string;
  /**
   * 下次保养时间
   * @format date-time
   */
  datetimeMaintenanceNext?: string;
  /**
   * 计划保养小时
   * @format int32
   */
  hourMaintenancePlan?: number;
  /**
   * 实际保养小时
   * @format int32
   */
  hourMaintenanceActual?: number;
  /**
   * 计划保养次数
   * @format int32
   */
  numberMaintenancePlan?: number;
  /**
   * 实际保养次数
   * @format int32
   */
  numberMaintenanceActual?: number;
  /** 备注 */
  memo?: string;
  status?: string;
  mouldId?: string;
  /**
   * 下次保养次数
   * @format int32
   */
  useTimeMaintenanceNext?: number;
  userMaintenanceName?: string;
  userAcceptName?: string;
  mouldCode?: string;
  mouldName?: string;
  equipmentCode?: string;
  equipmentName?: string;
  workcenterName?: string;
  workshopName?: string;
  positionPath?: string;
  mouldMaintenanceDealId?: string;
  mouldMaintenanceAcceptId?: string;
  equipmentMaintenanceDealId?: string;
  equipmentMaintenanceAcceptId?: string;
  billDetails?: MaintenanceBillDtlVO[];
  statusName?: string;
}

export interface MaintenanceBillHeadSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  relateType?: string;
}

export interface MaintenanceBillAcceptDTO {
  billId?: string;
  isAccepted?: boolean;
  memo?: string;
}

/** DemoJOB参数 */
export interface DemoJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

/** 设备点检单据参数 */
export interface EquipmentInspectCreateJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

/** 设备保养单据参数 */
export interface EquipmentMaintenanceCreateJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

export interface JobCommonDTO {
  /** 公共JOB参数 */
  jobCommonParams?: JobCommonParam[];
  /** DemoJOB参数 */
  demoJobParam?: DemoJobParam[];
  /** 模具保养单据参数 */
  mouldMaintenanceCreateJobParam?: MouldMaintenanceCreateJobParam[];
  /** 设备保养单据参数 */
  equipmentMaintenanceCreateJobParam?: EquipmentMaintenanceCreateJobParam[];
  /** 模具点检单据参数 */
  mouldInspectCreateJobParam?: MouldInspectCreateJobParam[];
  /** 设备点检单据参数 */
  equipmentInspectCreateJobParam?: EquipmentInspectCreateJobParam[];
}

/** 公共JOB参数 */
export interface JobCommonParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

/** 模具点检单据参数 */
export interface MouldInspectCreateJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

/** 模具保养单据参数 */
export interface MouldMaintenanceCreateJobParam {
  /** 集团编码 */
  epCode?: string;
  /** 组织编码 */
  orgCode?: string;
}

export interface InspectPlanSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  relateType?: string;
}

export interface InspectPlanItemVO {
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
  assetTypeId?: string;
  equipmentId?: string;
  /**
   * 点检周期(天)
   * @format int32
   */
  dayInspectPeriod?: number;
  /**
   * 生效时间
   * @format date-time
   */
  datetimeEffect?: string;
  /** 模具类型 */
  mouldType?: string;
  mouldId?: string;
  inspectItemId?: string;
  /** 点检项目代码 */
  inspectItemCode?: string;
  /** 点检项目名称 */
  inspectItemName?: string;
  /** 点检标准 */
  inspectItemStandard?: string;
  /** 点检方式或方法 */
  inspectMethod?: string;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
  /** 点检类型 */
  inspectItemType?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
}

/** 设备点检计划表 */
export interface InspectPlanVO {
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
  assetTypeId?: string;
  equipmentId?: string;
  /**
   * 点检周期(天)
   * @format int32
   */
  dayInspectPeriod?: number;
  /**
   * 生效时间
   * @format date-time
   */
  datetimeEffect?: string;
  /** 模具类型 */
  mouldType?: string;
  mouldId?: string;
  insertMouldIds?: string;
  insertEquipmentIds?: string;
  /** 设备 */
  equipmentCode?: string;
  equipmentName?: string;
  /** 位置名称 */
  positionName?: string;
  /** 保管部门名称 */
  departmentOwnerName?: string;
  inspectDealId?: string;
  /** 点检处理组名称 */
  inspectDealName?: string;
  inspectAcceptId?: string;
  /** 点检验收组名称 */
  inspectAcceptName?: string;
  /** 资产类型 */
  assetTypeCode?: string;
  assetTypeName?: string;
  /** 资产品牌 */
  assetBrandCode?: string;
  assetBrandName?: string;
  /** 资产型号 */
  assetModelCode?: string;
  assetModelName?: string;
  /** 模具类型名称 */
  mouldTypeName?: string;
  /** 模具 */
  mouldCode?: string;
  mouldName?: string;
  mouldDesc?: string;
  /** 关联类型 */
  relateType?: string;
  /**
   * 下次点检日期
   * @format date-time
   */
  datetimeNextInspect?: string;
  planItems?: InspectPlanItemVO[];
}

/** 设备与点检项目关系表 */
export interface InspectItemInEquipmentVO {
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
  inspectItemId?: string;
  assetTypeId?: string;
  assetBrandId?: string;
  assetModelId?: string;
  mouldId?: string;
  /** 模具类型 */
  mouldType?: string;
  /** 点检项目代码 */
  inspectItemCode?: string;
  /** 点检项目名称 */
  inspectItemName?: string;
  /** 点检标准 */
  inspectItemStandard?: string;
  /** 点检方式或方法 */
  inspectMethod?: string;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
  /** 点检类型 */
  inspectItemType?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
  /** 资产类型 */
  assetTypeCode?: string;
  assetTypeName?: string;
  /** 资产品牌 */
  assetBrandCode?: string;
  assetBrandName?: string;
  /** 资产型号 */
  assetModelCode?: string;
  assetModelName?: string;
  /** 模具类型名称 */
  mouldTypeName?: string;
  /** 模具 */
  mouldCode?: string;
  mouldName?: string;
  mouldDesc?: string;
  /** 关联类型 */
  relateType?: string;
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

export interface InspectItemInEquipmentSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  inspectItemId?: string;
  relateType?: string;
}

/** 响应数据 */
export type PagingDataInspectItemInEquipmentVO = {
  list?: InspectItemInEquipmentVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectItemInEquipmentVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectItemInEquipmentVO;
}

/** 设备点检项目文件表 */
export interface InspectItemFileVO {
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
  inspectItemId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
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
export interface ResultListAddFileTypeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: AddFileTypeVO[] | null;
}

/** 设备点检项目表 */
export interface InspectItemVO {
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
  /** 点检项目代码 */
  inspectItemCode?: string;
  /** 点检项目名称 */
  inspectItemName?: string;
  /** 点检标准 */
  inspectItemStandard?: string;
  /** 点检方式或方法 */
  inspectMethod?: string;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
  /** 点检类型 */
  inspectItemType?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
  /** 点检方式或方法 */
  inspectMethodName?: string;
  /** 点检类型 */
  inspectItemTypeName?: string;
  /** 计量单位符号 */
  uomName?: string;
  /** 文件列表 */
  fileList?: AddFileTypeVO[];
}

export interface InspectItemSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  /** 点检项目名称 */
  inspectItemName?: string;
  assetTypeId?: string;
  assetBrandId?: string;
  assetModelId?: string;
  ids?: string[];
}

/** 响应数据 */
export type PagingDataInspectItemVO = {
  list?: InspectItemVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectItemVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectItemVO;
}

export interface InspectBillHeadSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  relateType?: string;
}

export interface InspectBillDtlSearch {
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
  exceptIds?: string[];
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  isKeyWordEqSearch?: boolean;
  dynamicDefaultSortFiled?: string;
  dynamicSortType?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  relateType?: string;
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

export interface DomainParamButtonFormColumn {
  /** @format int32 */
  seq?: number;
  id?: string;
  field?: string;
  label?: string;
  component?: string;
  componentParam?: string;
  placeholder?: string;
  defaultValue?: string;
  isVisible?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  fieldType?: string;
  columnType?: string;
  parentField?: string;
  isRequired?: boolean;
  isKeyField?: boolean;
  verifyExp?: string;
  componentSource?: DomainParamComponentSource;
}

export interface DomainParamComponentSource {
  sourceType?: string;
  customDict?: DomainParamComponentSourceCustomDict;
  dataTable?: DomainParamComponentSourceDatatable;
}

export interface DomainParamComponentSourceCustomDict {
  dicData?: Record<string, object>[];
}

export interface DomainParamComponentSourceDatatable {
  mapBusinessDomain?: string;
  mapTable?: string;
  conditionData?: DomainParamComponentSourceDatatableFilter[];
  valueField?: string;
  showField?: string;
}

export interface DomainParamComponentSourceDatatableFilter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN' | 'BETWEEN';
  value?: string;
}

export interface InsertOrUpdateModel {
  columnSetting?: DomainParamButtonFormColumn[];
  tableName?: string;
  fieldValues?: Record<string, object>;
}

export interface DeleteModel {
  tableName?: string;
  ids?: string[];
}

export interface AssetLedgerSearch {
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
  equipmentId?: string;
  assetTypeId?: string;
  assetBrandId?: string;
  assetModelId?: string;
  /** 排除设备ID */
  expectedEquipmentIds?: string[];
}

export interface AssetLedgerVO {
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
  assetModelId?: string;
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
  /** 维保联系人 */
  maintenanceOwner?: string;
  /** 维保联系方式 */
  maintenanceOwnerContact?: string;
  /**
   * 进场时间
   * @format date-time
   */
  datetimeEntry?: string;
  repairDealId?: string;
  repairAcceptId?: string;
  maintenanceDealId?: string;
  maintenanceAcceptId?: string;
  inspectDealId?: string;
  inspectAcceptId?: string;
  /** 状态 */
  status?: string;
  /** 资产型号名称 */
  modelName?: string;
  /** 状态名称 */
  statusName?: string;
  /** 管理状态名称 */
  stateName?: string;
  assetBrandId?: string;
  /** 资产品牌名称 */
  brandName?: string;
  assetTypeId?: string;
  /** 单据号 */
  billNo?: string;
  /** 单据类型 */
  billCategory?: string;
  /** 单据类型名称 */
  billCategoryName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 位置名称 */
  positionName?: string;
  /** 保管部门名称 */
  departmentOwnerName?: string;
}

/** 响应数据 */
export type PagingDataAssetLedgerVO = {
  list?: AssetLedgerVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataAssetLedgerVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataAssetLedgerVO;
}

/** 通用响应类 */
export interface ResultRepairBillHeadVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: RepairBillHeadVO;
}

/** 通用响应类 */
export interface ResultMaintenanceBillHeadVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: MaintenanceBillHeadVO;
}

/** 通用响应类 */
export interface ResultInspectPlanVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 设备点检计划表 */
  data?: InspectPlanVO;
}

/** 设备点检明细文件表 */
export interface InspectBillDtlFile {
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
  inspectBillDtlId?: string;
  /** 文件名称 */
  fileName?: string;
  /** 文件地址 */
  filePath?: string;
  /** 文件类型 */
  fileCategory?: string;
}

export interface InspectBillDtlVo {
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
  inspectBillHeadId?: string;
  /** 点检项目代码 */
  inspectItemCode?: string;
  /** 点检项目名称 */
  inspectItemName?: string;
  /** 点检标准 */
  inspectItemStandard?: string;
  /** 点检方法 */
  inspectItemMethod?: string;
  /** 最大值 */
  maxValue?: number;
  /** 最小值 */
  minValue?: number;
  /** 单位 */
  uom?: string;
  /** 点检项目类型 */
  inspectItemType?: string;
  /**
   * 是否拍照
   * @format int32
   */
  isPhoto?: number;
  /** 点检结果 */
  inspectResult?: string;
  billDtlFiles?: InspectBillDtlFile[];
  inspectItemId?: string;
}

/** 响应数据 */
export type InspectBillHeadVo = {
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
  equipmentId?: string;
  /** 点检结果 */
  inspectResult?: string;
  userInspectId?: string;
  /**
   * 点检开始时间
   * @format date-time
   */
  datetimeInspectStart?: string;
  /**
   * 点检完成时间
   * @format date-time
   */
  datetimeInspectEnd?: string;
  /** 维修单据号 */
  repairBillNo?: string;
  /** 状态 */
  status?: string;
  mouldId?: string;
  /**
   * 下次点检开始时间
   * @format date-time
   */
  datetimeInspectNext?: string;
  /**  单据创建来源:JOB;HAND; */
  billSource?: string;
  /** 点检执行人 */
  userInspectName?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 设备编码 */
  equipmentCode?: string;
  /** 设备类型 */
  equipmentTypeName?: string;
  /** 存放位置 */
  workCenterName?: string;
  /** 管理部门 */
  workshopName?: string;
  /** 模具名称 */
  mouldName?: string;
  /** 模具代码 */
  mouldCode?: string;
  /** 模具类型 */
  mouldType?: string;
  billDetails?: InspectBillDtlVo[];
} | null;

/** 通用响应类 */
export interface ResultInspectBillHeadVo {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: InspectBillHeadVo;
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
  /** 是否为空 */
  nullable?: string;
  /** KEY */
  columnKey?: string;
  /** 默认值 */
  columnDefault?: string;
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
  sparePartTransferHead: {
    /**
     * No description
     *
     * @tags 备品备件库存交易头表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/sparePartTransferHead/getList
     * @secure
     */
    getList: (data: SparePartTransferHeadSearch) =>
      http.request<ResultPagingDataSparePartTransferHeadVO['data']>(`/api/equipment/sparePartTransferHead/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  sparePartTransferDtl: {
    /**
     * No description
     *
     * @tags 备品备件库存交易明细表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/sparePartTransferDtl/getList
     * @secure
     */
    getList: (data: SparePartTransferDtlSearch) =>
      http.request<ResultPagingDataSparePartTransferDtlVO['data']>(`/api/equipment/sparePartTransferDtl/getList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  repairItemInEquipment: {
    /**
     * No description
     *
     * @tags 设备与维修项目关系表
     * @name Search
     * @request POST:/repairItemInEquipment/items
     * @secure
     */
    search: (data: RepairItemInEquipmentSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItemInEquipment/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与维修项目关系表
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/repairItemInEquipment/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItemInEquipment/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与维修项目关系表
     * @name AddItem
     * @summary 新增
     * @request POST:/repairItemInEquipment/items/add
     * @secure
     */
    addItem: (data: RepairItemInEquipmentVO) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItemInEquipment/items/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  repairItemFile: {
    /**
     * No description
     *
     * @tags 设备维修项目文件表
     * @name GetFileListByItemId
     * @summary 根据ID获取模具附件信息
     * @request POST:/repairItemFile/file/{id}
     * @secure
     */
    getFileListByItemId: (id: string) =>
      http.request<ResultListRepairItemFile['data']>(`/api/equipment/repairItemFile/file/${id}`, {
        method: 'POST',
      }),
  },
  repairItem: {
    /**
     * No description
     *
     * @tags 设备维修项目表
     * @name Search
     * @request POST:/repairItem/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修项目表
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/repairItem/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItem/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修项目表
     * @name UpdateItemByCode
     * @summary 修改
     * @request POST:/repairItem/items/modify
     * @secure
     */
    updateItemByCode: (data: RepairItemVo) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItem/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修项目表
     * @name AddItem
     * @summary 新增
     * @request POST:/repairItem/items/add
     * @secure
     */
    addItem: (data: RepairItemVo) =>
      http.request<ResultObject['data']>(`/api/equipment/repairItem/items/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  repairBillHead: {
    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name Search
     * @summary 获取设备/模具维修单据
     * @request POST:/repairBillHead/items
     * @secure
     */
    search: (data: RepairBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetCurrentUserMouldTodoBills
     * @summary 根据当前的登录用户获取 我的待处理 单据(带分页,带查询条件)
     * @request POST:/repairBillHead/getCurrentUserMouldTodoBills
     * @secure
     */
    getCurrentUserMouldTodoBills: (data: RepairBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/getCurrentUserMouldTodoBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetCurrentUserMouldCreateBills
     * @summary 根据当前的登录用户获取 我的报障 单据(带分页,带查询条件)
     * @request POST:/repairBillHead/getCurrentUserMouldCreateBills
     * @secure
     */
    getCurrentUserMouldCreateBills: (data: RepairBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/getCurrentUserMouldCreateBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetCurrentUserEquipmentTodoBills
     * @summary 根据当前的登录用户获取 我的待处理 单据(带分页,带查询条件)
     * @request POST:/repairBillHead/getCurrentUserEquipmentTodoBills
     * @secure
     */
    getCurrentUserEquipmentTodoBills: (data: RepairBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/getCurrentUserEquipmentTodoBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetCurrentUserEquipmentCreateBills
     * @summary 根据当前的登录用户获取 我的报障 单据(带分页,带查询条件)
     * @request POST:/repairBillHead/getCurrentUserEquipmentCreateBills
     * @secure
     */
    getCurrentUserEquipmentCreateBills: (data: RepairBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/getCurrentUserEquipmentCreateBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name CompleteRepair
     * @summary 完成维修单据
     * @request POST:/repairBillHead/completeRepair
     * @secure
     */
    completeRepair: (data: RepairBillHeadVO) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/completeRepair`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name AddRepairBill
     * @summary 报障-新增维修单据
     * @request POST:/repairBillHead/addRepairBill
     * @secure
     */
    addRepairBill: (data: RepairBillHeadVO) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/addRepairBill`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name AcceptRepair
     * @summary 验收/驳回保养单据
     * @request POST:/repairBillHead/acceptRepair
     * @secure
     */
    acceptRepair: (data: RepairBillAcceptDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/acceptRepair`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name StartRepair
     * @summary 开始维修
     * @request GET:/repairBillHead/startRepair
     * @secure
     */
    startRepair: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/equipment/repairBillHead/startRepair`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetMouldBillInfoById
     * @summary 根据模具维修单据ID,获取维修明细(包含单据头信息+维修项目信息+照片列表+维修项目作业指导书)
     * @request GET:/repairBillHead/getMouldBillInfoByID
     * @secure
     */
    getMouldBillInfoById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultRepairBillHeadVO['data']>(`/api/equipment/repairBillHead/getMouldBillInfoByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetEquipmentBillInfoById
     * @summary 根据设备维修单据ID,获取维修明细(包含单据头信息+维修项目信息+照片列表+维修项目作业指导书)
     * @request GET:/repairBillHead/getEquipmentBillInfoByID
     * @secure
     */
    getEquipmentBillInfoById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultRepairBillHeadVO['data']>(`/api/equipment/repairBillHead/getEquipmentBillInfoByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备维修单据头表
     * @name GetBillInfoById
     * @summary 根据模具/设备维修单据ID,获取维修明细(包含单据头信息+维修项目信息+照片列表+维修项目作业指导书)
     * @request GET:/repairBillHead/getBillInfoByID
     * @secure
     */
    getBillInfoById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultRepairBillHeadVO['data']>(`/api/equipment/repairBillHead/getBillInfoByID`, {
        method: 'GET',
        params: query,
      }),
  },
  maintenancePlanItem: {
    /**
     * No description
     *
     * @tags 设备保养计划项目表
     * @name Search
     * @request POST:/maintenancePlanItem/items
     * @secure
     */
    search: (data: MaintenancePlanItemSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlanItem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划项目表
     * @name RemoveItemsById
     * @request POST:/maintenancePlanItem/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlanItem/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划项目表
     * @name BatchAdd
     * @summary 新增
     * @request POST:/maintenancePlanItem/items/batchAdd
     * @secure
     */
    batchAdd: (data: MaintenancePlanItemBatchDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlanItem/items/batchAdd`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划项目表
     * @name AddItem
     * @summary 新增
     * @request POST:/maintenancePlanItem/items/add
     * @secure
     */
    addItem: (data: MaintenancePlanItemVO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlanItem/items/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划项目表
     * @name GetExceptPlanItems
     * @summary 获取设备保养计划项目表-除计划外
     * @request POST:/maintenancePlanItem/getExceptPlanItems
     * @secure
     */
    getExceptPlanItems: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlanItem/getExceptPlanItems`, {
        method: 'POST',
        body: data as any,
      }),
  },
  maintenancePlan: {
    /**
     * No description
     *
     * @tags 设备保养计划表
     * @name Search
     * @request POST:/maintenancePlan/items
     * @secure
     */
    search: (data: MaintenancePlanSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlan/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划表
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/maintenancePlan/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlan/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划表
     * @name UpdateItemByCode
     * @summary 修改
     * @request POST:/maintenancePlan/items/modify
     * @secure
     */
    updateItemByCode: (data: MaintenancePlanVO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlan/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养计划表
     * @name AddItem
     * @summary 新增
     * @request POST:/maintenancePlan/items/add
     * @secure
     */
    addItem: (data: MaintenancePlanVO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenancePlan/items/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  maintenanceItemInEquipment: {
    /**
     * No description
     *
     * @tags 设备与保养项目关系表
     * @name Search
     * @request POST:/maintenanceItemInEquipment/items
     * @secure
     */
    search: (data: MaintenanceItemInEquipmentSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItemInEquipment/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与保养项目关系表
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/maintenanceItemInEquipment/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItemInEquipment/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与保养项目关系表
     * @name AddItem
     * @summary 新增
     * @request POST:/maintenanceItemInEquipment/items/add
     * @secure
     */
    addItem: (data: MaintenanceItemInEquipmentVO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItemInEquipment/items/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  maintenanceItemFile: {
    /**
     * No description
     *
     * @tags 设备保养项目文件表
     * @name GetFileListByItemId
     * @summary 根据ID获取模具附件信息
     * @request POST:/maintenanceItemFile/file/{id}
     * @secure
     */
    getFileListByItemId: (id: string) =>
      http.request<ResultListMaintenanceItemFile['data']>(`/api/equipment/maintenanceItemFile/file/${id}`, {
        method: 'POST',
      }),
  },
  maintenanceItem: {
    /**
     * No description
     *
     * @tags 设备保养项目表
     * @name Search
     * @request POST:/maintenanceItem/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养项目表
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/maintenanceItem/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItem/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养项目表
     * @name UpdateItemByCode
     * @summary 修改
     * @request POST:/maintenanceItem/items/modify
     * @secure
     */
    updateItemByCode: (data: MaintenanceItemVo) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItem/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养项目表
     * @name AddItem
     * @summary 新增
     * @request POST:/maintenanceItem/items/add
     * @secure
     */
    addItem: (data: MaintenanceItemVo) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceItem/items/add`, {
        method: 'POST',
        body: data as any,
      }),
  },
  maintenanceBillHead: {
    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name PendingMaintenance
     * @summary 暂存保养单据
     * @request POST:/maintenanceBillHead/pendingMaintenance
     * @secure
     */
    pendingMaintenance: (data: MaintenanceBillHeadVO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/pendingMaintenance`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name Search
     * @summary 获取设备/模具保养单据
     * @request POST:/maintenanceBillHead/items
     * @secure
     */
    search: (data: MaintenanceBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name GetCurrentUserMouldTodoBills
     * @summary 根据当前的登录用户获取待处理的模具保养单据(带分页,带查询条件)
     * @request POST:/maintenanceBillHead/getCurrentUserMouldTodoBills
     * @secure
     */
    getCurrentUserMouldTodoBills: (data: MaintenanceBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/getCurrentUserMouldTodoBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name GetCurrentUserMouldToCheckBills
     * @summary 根据当前的登录用户获取待验收的模具保养单据(带分页,带查询条件)
     * @request POST:/maintenanceBillHead/getCurrentUserMouldToCheckBills
     * @secure
     */
    getCurrentUserMouldToCheckBills: (data: MaintenanceBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/getCurrentUserMouldToCheckBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name GetCurrentUserEquipmentTodoBills
     * @summary 根据当前的登录用户获取待处理的设备保养单据(带分页,带查询条件)
     * @request POST:/maintenanceBillHead/getCurrentUserEquipmentTodoBills
     * @secure
     */
    getCurrentUserEquipmentTodoBills: (data: MaintenanceBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/getCurrentUserEquipmentTodoBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name GetCurrentUserEquipmentToCheckBills
     * @summary 根据当前的登录用户获取待验收的设备保养单据(带分页,带查询条件)
     * @request POST:/maintenanceBillHead/getCurrentUserEquipmentToCheckBills
     * @secure
     */
    getCurrentUserEquipmentToCheckBills: (data: MaintenanceBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/getCurrentUserEquipmentToCheckBills`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name CompleteMaintenance
     * @summary 完成保养单据
     * @request POST:/maintenanceBillHead/completeMaintenance
     * @secure
     */
    completeMaintenance: (data: MaintenanceBillHeadVO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/completeMaintenance`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name AcceptMaintenance
     * @summary 验收保养单据
     * @request POST:/maintenanceBillHead/acceptMaintenance
     * @secure
     */
    acceptMaintenance: (data: MaintenanceBillAcceptDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/acceptMaintenance`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name StartMaintenance
     * @summary 开始保养
     * @request GET:/maintenanceBillHead/startMaintenance
     * @secure
     */
    startMaintenance: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillHead/startMaintenance`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name GetMouldBillInfoById
     * @summary 根据模具/设备保养单据ID,获取保养明细(包含单据头信息+模具项目信息+照片列表+保养项目作业指导书)
     * @request GET:/maintenanceBillHead/getMouldBillInfoByID
     * @secure
     */
    getMouldBillInfoByID: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultMaintenanceBillHeadVO['data']>(`/api/equipment/maintenanceBillHead/getMouldBillInfoByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备保养单据头表
     * @name GetEquipmentBillInfoById
     * @summary 根据模具/设备保养单据ID,获取保养明细(包含单据头信息+模具项目信息+照片列表+保养项目作业指导书)
     * @request GET:/maintenanceBillHead/getEquipmentBillInfoByID
     * @secure
     */
    getEquipmentBillInfoByID: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultMaintenanceBillHeadVO['data']>(`/api/equipment/maintenanceBillHead/getEquipmentBillInfoByID`, {
        method: 'GET',
        params: query,
      }),
  },
  maintenanceBillDtlSparePart: {
    /**
     * No description
     *
     * @tags
     * @name GetItemsByBillId
     * @summary 获取设备保养计划项目对应备品备件表-除计划外
     * @request POST:/maintenanceBillDtlSparePart/getItemsByBillId
     * @secure
     */
    getItemsByBillId: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillDtlSparePart/getItemsByBillId`, {
        method: 'POST',
        body: data as any,
      }),
  },
  maintenanceBillDtlFile: {
    /**
     * No description
     *
     * @tags 设备保养明细文件表
     * @name GetFilesByDtlIds
     * @summary 获取设备保养计划项目表-除计划外
     * @request POST:/maintenanceBillDtlFile/getFilesByDtlIds
     * @secure
     */
    getFilesByDtlIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillDtlFile/getFilesByDtlIds`, {
        method: 'POST',
        body: data as any,
      }),
  },
  maintenanceBillDtl: {
    /**
     * No description
     *
     * @tags 设备保养单据明细表
     * @name GetItemsByBillId
     * @summary 获取设备保养计划项目表-除计划外
     * @request POST:/maintenanceBillDtl/getItemsByBillId
     * @secure
     */
    getItemsByBillId: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/maintenanceBillDtl/getItemsByBillId`, {
        method: 'POST',
        body: data as any,
      }),
  },
  jobCommon: {
    /**
     * No description
     *
     * @tags 公用JOB业务组件接口
     * @name MouldMaintenanceBillCreateJob
     * @summary 模具保养单据生成JOB
     * @request POST:/jobCommon/mouldMaintenanceBillCreateJob
     * @secure
     */
    mouldMaintenanceBillCreateJob: (data: JobCommonDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/jobCommon/mouldMaintenanceBillCreateJob`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 公用JOB业务组件接口
     * @name MouldInspectBillCreateJob
     * @summary 模具点检单据生成JOB
     * @request POST:/jobCommon/mouldInspectBillCreateJob
     * @secure
     */
    mouldInspectBillCreateJob: (data: JobCommonDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/jobCommon/mouldInspectBillCreateJob`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 公用JOB业务组件接口
     * @name EquipmentMaintenanceBillCreateJob
     * @summary 设备保养单据生成JOB
     * @request POST:/jobCommon/equipmentMaintenanceBillCreateJob
     * @secure
     */
    equipmentMaintenanceBillCreateJob: (data: JobCommonDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/jobCommon/equipmentMaintenanceBillCreateJob`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 公用JOB业务组件接口
     * @name EquipmentInspectBillCreateJob
     * @summary 设备点检单据生成JOB
     * @request POST:/jobCommon/equipmentInspectBillCreateJob
     * @secure
     */
    equipmentInspectBillCreateJob: (data: JobCommonDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/jobCommon/equipmentInspectBillCreateJob`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectPlanItem: {
    /**
     * No description
     *
     * @tags 设备点检计划项目表
     * @name Search
     * @request POST:/inspectPlanItem/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectPlanItem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划项目表
     * @name GetItemsByPlanId
     * @summary 获取设备点检计划项目表
     * @request POST:/inspectPlanItem/getItemsByPlanId
     * @secure
     */
    getItemsByPlanId: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectPlanItem/getItemsByPlanId`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectPlan: {
    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name Search
     * @request POST:/inspectPlan/items
     * @secure
     */
    search: (data: InspectPlanSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectPlan/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name RemoveItemsById
     * @summary 删除数据
     * @request POST:/inspectPlan/items/remove
     * @secure
     */
    removeItemsById: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectPlan/items/remove`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name UpdateItemByCode
     * @summary 修改
     * @request POST:/inspectPlan/items/modify
     * @secure
     */
    updateItemByCode: (data: InspectPlanVO) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectPlan/items/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name AddItem
     * @summary 新增
     * @request POST:/inspectPlan/items/add
     * @secure
     */
    addItem: (data: InspectPlanVO) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectPlan/items/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name GetMouldInspectPlanById
     * @summary 根据ID,获取模具点检计划
     * @request GET:/inspectPlan/getMouldInspectPlanByID
     * @secure
     */
    getMouldInspectPlanById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultInspectPlanVO['data']>(`/api/equipment/inspectPlan/getMouldInspectPlanByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name GetEquipmentInspectPlanById
     * @summary 根据ID,获取设备点检计划
     * @request GET:/inspectPlan/getEquipmentInspectPlanByID
     * @secure
     */
    getEquipmentInspectPlanById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultInspectPlanVO['data']>(`/api/equipment/inspectPlan/getEquipmentInspectPlanByID`, {
        method: 'GET',
        params: query,
      }),
  },
  inspectItemInEquipment: {
    /**
     * No description
     *
     * @tags 设备与点检项目关系表
     * @name Update
     * @summary 编辑资产关联
     * @request POST:/inspectItemInEquipment/update
     * @secure
     */
    update: (data: InspectItemInEquipmentVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItemInEquipment/update`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与点检项目关系表
     * @name Insert
     * @summary 新增资产关联
     * @request POST:/inspectItemInEquipment/insert
     * @secure
     */
    insert: (data: InspectItemInEquipmentVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItemInEquipment/insert`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与点检项目关系表
     * @name GetList
     * @summary 根据项目ID获取资产关联信息
     * @request POST:/inspectItemInEquipment/getList
     * @secure
     */
    getList: (data: InspectItemInEquipmentSearch) =>
      http.request<ResultPagingDataInspectItemInEquipmentVO['data']>(`/api/equipment/inspectItemInEquipment/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备与点检项目关系表
     * @name BatchDeleteItem
     * @summary 批量删除资产关联
     * @request POST:/inspectItemInEquipment/batchDeleteItem
     * @secure
     */
    batchDeleteItem: (data: InspectItemInEquipmentSearch) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItemInEquipment/batchDeleteItem`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectItemFile: {
    /**
     * No description
     *
     * @tags 设备点检项目文件表
     * @name DeleteInspectItemFile
     * @summary 删除文件
     * @request POST:/inspectItemFile/deleteInspectItemFile
     * @secure
     */
    deleteInspectItemFile: (data: InspectItemFileVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItemFile/deleteInspectItemFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目文件表
     * @name DeleteBatchInspectItemFile
     * @summary 批量删除文件
     * @request POST:/inspectItemFile/deleteBatchInspectItemFile
     * @secure
     */
    deleteBatchInspectItemFile: (data: InspectItemFileVO[]) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItemFile/deleteBatchInspectItemFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目文件表
     * @name AddInspectItemFile
     * @summary 新增文件
     * @request POST:/inspectItemFile/addInspectItemFile
     * @secure
     */
    addInspectItemFile: (data: InspectItemFileVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItemFile/addInspectItemFile`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目文件表
     * @name GetInspectItemFileList
     * @summary 根据ID获取文件信息
     * @request POST:/inspectItemFile/GetInspectItemFileList
     * @secure
     */
    getInspectItemFileList: (data: string) =>
      http.request<ResultListAddFileTypeVO['data']>(`/api/equipment/inspectItemFile/GetInspectItemFileList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectItem: {
    /**
     * No description
     *
     * @tags 设备点检项目表
     * @name Update
     * @summary 编辑点检项目
     * @request POST:/inspectItem/update
     * @secure
     */
    update: (data: InspectItemVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItem/update`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目表
     * @name Search
     * @request POST:/inspectItem/items
     * @secure
     */
    search: (data: InspectItemSearch) =>
      http.request<ResultPagingDataInspectItemVO['data']>(`/api/equipment/inspectItem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目表
     * @name Insert
     * @summary 新增点检项目
     * @request POST:/inspectItem/insert
     * @secure
     */
    insert: (data: InspectItemVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItem/insert`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目表
     * @name GetList
     * @summary 获得主界面数据
     * @request POST:/inspectItem/getList
     * @secure
     */
    getList: (data: InspectItemSearch) =>
      http.request<ResultPagingDataInspectItemVO['data']>(`/api/equipment/inspectItem/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检项目表
     * @name BatchUpdateState
     * @summary 批量删除点检项目
     * @request POST:/inspectItem/batchUpdateState
     * @secure
     */
    batchUpdateState: (data: InspectItemSearch) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectItem/batchUpdateState`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectBillHead: {
    /**
     * No description
     *
     * @tags 设备点检单据头表
     * @name Search
     * @summary 设备点检单据
     * @request POST:/inspectBillHead/items
     * @secure
     */
    search: (data: InspectBillHeadSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectBillHead/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检单据头表
     * @name GetMouldInspectById
     * @summary 根据ID,获取模具点检计划
     * @request GET:/inspectBillHead/getMouldInspectByID
     * @secure
     */
    getMouldInspectById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultInspectBillHeadVo['data']>(`/api/equipment/inspectBillHead/getMouldInspectByID`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 设备点检单据头表
     * @name GetEquipmentInspectById
     * @summary 根据ID,获取设备点检计划
     * @request GET:/inspectBillHead/getEquipmentInspectByID
     * @secure
     */
    getEquipmentInspectById: (query?: {
      /** @default "0" */
      id?: string;
    }) =>
      http.request<ResultInspectBillHeadVo['data']>(`/api/equipment/inspectBillHead/getEquipmentInspectByID`, {
        method: 'GET',
        params: query,
      }),
  },
  inspectBillDtlFile: {
    /**
     * No description
     *
     * @tags 设备点检明细文件表
     * @name GetFilesByDtlIds
     * @summary 获取设备点检
     * @request POST:/inspectBillDtlFile/getFilesByDtlIds
     * @secure
     */
    getFilesByDtlIds: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectBillDtlFile/getFilesByDtlIds`, {
        method: 'POST',
        body: data as any,
      }),
  },
  inspectBillDtl: {
    /**
     * No description
     *
     * @tags 设备点检单据明细表
     * @name Search
     * @request POST:/inspectBillDtl/items
     * @secure
     */
    search: (data: InspectBillDtlSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectBillDtl/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检单据明细表
     * @name GetItemsByBillId
     * @summary 获取点检单据明细表
     * @request POST:/inspectBillDtl/getItemsByBillId
     * @secure
     */
    getItemsByBillId: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/equipment/inspectBillDtl/getItemsByBillId`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultObject['data']>(`/api/equipment/importManage/batchImportData`, {
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
      http.request<ResultListMapStringObject['data']>(`/api/equipment/importManage/batchDynamicQuery`, {
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
      http.request<ResultBoolean['data']>(`/api/equipment/importManage/CheckUniqueExist`, {
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
      http.request<ResultListDataTableVO['data']>(`/api/equipment/importManage/tables`, {
        method: 'GET',
      }),
  },
  dynamicManage: {
    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicUpdateDataSql
     * @summary 动态更新数据-SQL方式-免实体类
     * @request POST:/dynamicManage/dynamicUpdateDataSql
     * @secure
     */
    dynamicUpdateDataSql: (data: InsertOrUpdateModel) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicUpdateDataSql`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicQueryDropdownListSql
     * @summary 通用查询下拉列表-SQL方式-免实体类
     * @request POST:/dynamicManage/dynamicQueryDropdownListSql
     * @secure
     */
    dynamicQueryDropdownListSql: (data: DomainParamComponentSourceDatatable) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicQueryDropdownListSql`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicQueryData
     * @summary 根据领域进行动态表字段查询
     * @request POST:/dynamicManage/dynamicQueryData
     * @secure
     */
    dynamicQueryData: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicQueryData`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicQueryDataSql
     * @summary 根据领域进行动态表字段查询
     * @request POST:/dynamicManage/dynamicQueryDataSql
     * @secure
     */
    dynamicQueryDataSql: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicQueryDataSql`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicLogicDeleteDataSql
     * @summary 逻辑删除数据-SQL方式-免实体类
     * @request POST:/dynamicManage/dynamicLogicDeleteDataSql
     * @secure
     */
    dynamicLogicDeleteDataSql: (data: DeleteModel) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicLogicDeleteDataSql`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicInsertDataSql
     * @summary 动态插入数据-SQL方式-免实体类
     * @request POST:/dynamicManage/dynamicInsertDataSql
     * @secure
     */
    dynamicInsertDataSql: (data: InsertOrUpdateModel) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicInsertDataSql`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name DynamicDeleteDataSql
     * @summary 物理删除数据-SQL方式-免实体类
     * @request POST:/dynamicManage/dynamicDeleteDataSql
     * @secure
     */
    dynamicDeleteDataSql: (data: DeleteModel) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/dynamicDeleteDataSql`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name SqlTables
     * @summary 根据领域获取数据表列表-SQL方式
     * @request GET:/dynamicManage/sqlTables
     * @secure
     */
    sqlTables: () =>
      http.request<ResultListDataTableVO['data']>(`/api/equipment/dynamicManage/sqlTables`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 动态服务
     * @name SqlTableColumns
     * @summary 根据领域获取数据表列表-SQL方式
     * @request GET:/dynamicManage/sqlTableColumns
     * @secure
     */
    sqlTableColumns: (query: { tableName: string }) =>
      http.request<ResultListDataTableVO['data']>(`/api/equipment/dynamicManage/sqlTableColumns`, {
        method: 'GET',
        params: query,
      }),
  },
  assetLedger: {
    /**
     * No description
     *
     * @tags 资产台账
     * @name GetMaintenanceList
     * @summary 查询维保履历
     * @request POST:/assetLedger/getMaintenanceList
     * @secure
     */
    getMaintenanceList: (data: AssetLedgerSearch) =>
      http.request<ResultPagingDataAssetLedgerVO['data']>(`/api/equipment/assetLedger/getMaintenanceList`, {
        method: 'POST',
        body: data as any,
      }),
  },
};
