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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
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
  /** 保养项目代码 */
  maintenanceItemCode?: string;
  /** 保养项目名称 */
  maintenanceItemName?: string;
  /** 保养项目要求 */
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
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
  /** 保养项目代码 */
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
  /** 保养项目代码 */
  maintenanceItemCode?: string;
  /** 保养项目名称 */
  maintenanceItemName?: string;
  /** 保养项目要求 */
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
  /** 资产类型编码 */
  assetTypeCode?: string;
  /** 资产类型名称 */
  assetTypeName?: string;
  /** 设备编码 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  assetTypeId?: string;
  equipmentId?: string;
  ids?: string[];
}

/** 响应数据 */
export type PagingDataInspectPlanVO = {
  list?: InspectPlanVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataInspectPlanVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataInspectPlanVO;
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
  /** 点检项目代码 */
  inspectItemCode?: string;
  /** 点检项目名称 */
  inspectItemName?: string;
  /** 资产类型 */
  assetTypeCode?: string;
  assetTypeName?: string;
  /** 资产品牌 */
  assetBrandCode?: string;
  assetBrandName?: string;
  /** 资产型号 */
  assetModelCode?: string;
  assetModelName?: string;
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
  selectedFields?: DatasourceField[];
  datasourceSetting?: DatasourceSetting[];
  ids?: string[];
  inspectItemId?: string;
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
  dynamicTableName?: string;
  dynamicBusinessDomain?: string;
  dynamicKeywordFields?: string[];
  dynamicDefaultSortFiled?: string;
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
  fieldType?: string;
  columnType?: string;
  verifyExp?: string;
  componentSource?: DomainParamComponentSource;
  isVisible?: boolean;
  isDisabled?: boolean;
  isMutiple?: boolean;
  isRequired?: boolean;
  isKeyField?: boolean;
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
  inspectPlan: {
    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name Update
     * @summary 编辑点检项目
     * @request POST:/inspectPlan/update
     * @secure
     */
    update: (data: InspectPlanVO) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectPlan/update`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name Search
     * @request POST:/inspectPlan/items
     * @secure
     */
    search: (data: InspectPlanSearch) =>
      http.request<ResultPagingDataInspectPlanVO['data']>(`/api/equipment/inspectPlan/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name Insert
     * @summary 新增点检项目
     * @request POST:/inspectPlan/insert
     * @secure
     */
    insert: (data: InspectPlanVO[]) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectPlan/insert`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name GetList
     * @summary 获得主界面数据
     * @request POST:/inspectPlan/getList
     * @secure
     */
    getList: (data: InspectPlanSearch) =>
      http.request<ResultPagingDataInspectPlanVO['data']>(`/api/equipment/inspectPlan/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 设备点检计划表
     * @name BatchUpdateState
     * @summary 批量删除点检项目
     * @request POST:/inspectPlan/batchUpdateState
     * @secure
     */
    batchUpdateState: (data: InspectPlanSearch) =>
      http.request<ResultBoolean['data']>(`/api/equipment/inspectPlan/batchUpdateState`, {
        method: 'POST',
        body: data as any,
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
     * @name BatchUpdateData
     * @summary 根据领域进行动态表字段更新
     * @request POST:/dynamicManage/batchUpdateData
     * @secure
     */
    batchUpdateData: (data: BatchDynamicUpdateDTO) =>
      http.request<ResultObject['data']>(`/api/equipment/dynamicManage/batchUpdateData`, {
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
