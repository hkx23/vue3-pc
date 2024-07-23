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
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN';
  relateType?: string;
  aliasName?: string;
  relateFieldName?: string;
  relateValue?: string;
}

export interface Filter {
  tableName?: string;
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE' | 'IN';
  value?: string;
  valuesList?: string[];
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

export interface SortParam {
  sortBy?: string;
  descending?: boolean;
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
