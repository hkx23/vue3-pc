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

export interface UserWarehouseAuthoritySearch {
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
  warehouseId?: string;
  /** 多个用户ID */
  userIds?: string[];
  /** 需要新增的关系 */
  inseartList?: string[];
  /** 需要删除的关系 */
  removeList?: string[];
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

/** 用户权限信息 */
export interface UserWarehouseSearch {
  categoryCodes?: string[];
  warehouseId?: string;
  toWarehouseId?: string;
}

/** 通用响应类 */
export interface ResultListUserWarehouseVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: UserWarehouseVO[] | null;
}

/** 用户权限信息 */
export type UserWarehouseVO = {
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
  warehouseId?: string;
  warehouseName?: string;
  warehouseCategory?: string;
  toWarehouseName?: string;
  toWarehouseId?: string;
  toWarehouseCategory?: string;
} | null;

/** 响应数据 */
export type PagingDataUserWarehouseAuthorityVO = {
  list?: UserWarehouseAuthorityVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataUserWarehouseAuthorityVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataUserWarehouseAuthorityVO;
}

export interface UserWarehouseAuthorityVO {
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
  warehouseId?: string;
  /** 库存组织名称 */
  orgName?: string;
  /** 用户名 */
  userName?: string;
  /** 用户显示名 */
  userDisplayName?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
}

/** 杂项管理 */
export interface MiscellaneousManageSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** 单据号 */
  billNo?: string;
  /** 原因 */
  reason?: string;
  creatorId?: string;
  warehouseId?: string;
}

/** 杂项管理VO */
export interface MiscellaneousManageVO {
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
  /**
   * 单身行数
   * @format int32
   */
  lineCount?: number;
  /** ERP单据号 */
  erpBillNo?: string;
  /** 来源单据号 */
  sourceBillNo?: string;
  /** 用途 */
  purpose?: string;
  /** 相关凭证 */
  voucherNo?: string;
  /** 通知凭证 */
  noticeVoucherNo?: string;
  supplierId?: string;
  /** 备注 */
  memo?: string;
  /** 原因 */
  reason?: string;
  /** 科目 */
  account?: string;
  /** 费用部门 */
  costDepartment?: string;
  /** 单据状态 */
  billNoStatusName?: string;
  /** 交易事务 */
  businessCategoryName?: string;
  /** 业务类型 */
  businessTypeName?: string;
  /** 创建人 */
  creatorName?: string;
  warehouseName?: string;
  /** 更新人 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataMiscellaneousManageVO = {
  list?: MiscellaneousManageVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMiscellaneousManageVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMiscellaneousManageVO;
}

/** 交易明细标签表查询 */
export interface TransferDtlBarcodeSearch {
  /** 单号 */
  billNo?: string;
  transferDtlId?: string;
}

/** 通用响应类 */
export interface ResultListTransferDtlBarcodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: TransferDtlBarcodeVO[] | null;
}

/** 交易明细标签表 */
export type TransferDtlBarcodeVO = {
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
  transferDtlId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  supplierId?: string;
  /** 数量 */
  qty?: number;
  /** 单位 */
  uom?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 扫描的条形码 */
  scanBarcode?: string;
  /** 条码类型 */
  barcodeType?: string;
  /** 工单号 */
  moCode?: string;
  workshopId?: string;
  workcenterId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uomName?: string;
} | null;

/** 显示产品条码管理 */
export type LabelVO = {
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
} | null;

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

/** 品质控制-物料标签 */
export interface LabelQcHoldSearch {
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
  mitemId?: string;
  supplierId?: string;
  workCenterId?: string;
  /** 排产单编码 */
  moCode?: string;
  /** 批次号 */
  batchNo?: string;
  /** 标签号 */
  label?: string;
  /** @format int32 */
  isHold?: number;
}

/** 品质控制-产品 */
export interface LabelQcHoldVO {
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
  /** 工单号 */
  scheCode?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 产品名称 */
  mitemName?: string;
  /** 产品描述 */
  mitemDesc?: string;
  /** 物料编码 */
  mitemCodeLabel?: string;
  /** 物料名称 */
  mitemNameLabel?: string;
  /** 物料述 */
  mitemDescLabel?: string;
  labelStatus?: string;
  workshopCode?: string;
  workshopName?: string;
  workCenterCode?: string;
  workCenterName?: string;
  uom?: string;
  uomName?: string;
  supplierCode?: string;
  supplierName?: string;
  batchNo?: string;
}

/** 响应数据 */
export type PagingDataLabelQcHoldVO = {
  list?: LabelQcHoldVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLabelQcHoldVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLabelQcHoldVO;
}

/** 关键物料追溯（反向）-查询 */
export interface ReverseTraceabilityReportSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  page2Num?: number;
  /** @format int32 */
  page2Size?: number;
  /** 产品条码 */
  serialNumber?: string;
  /** 工单号 */
  moCode?: string;
  /** 包装箱码 */
  parentPkgBarcode?: string;
}

/** 响应数据 */
export type PagingDataTransferStockInOutVO = {
  list?: TransferStockInOutVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataTransferStockInOutVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataTransferStockInOutVO;
}

/** 关键物料追溯（反向）-出入库查询 */
export interface TransferStockInOutVO {
  /** 用户名 */
  userTransferName?: string;
  /** 显示名 */
  displayTransferName?: string;
  /** 业务类型代码 */
  businessCategoryCode?: string;
  /** 业务类型名称 */
  businessCategoryName?: string;
  businessCategoryId?: string;
  /**
   * 过帐时间
   * @format date-time
   */
  datetimeTransfer?: string;
  eid?: string;
  oid?: string;
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  /** 仓库代码 */
  toWarehouseCode?: string;
  /** 仓库名称 */
  toWarehouseName?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
}

/** 通用响应类 */
export interface ResultTransferDtl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 交易单身表 */
  data?: TransferDtl;
}

/** 交易单身表 */
export type TransferDtl = {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
} | null;

/** 杂项管理生成单据后返回对象 */
export interface BillInfoMMVO {
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
  billNo?: string;
  labelNo?: string;
  labelId?: string;
  mitemId?: string;
  reqQty?: number;
  transferDtlId?: string;
  warehouseId?: string;
  toWarehouseId?: string;
  warehouseName?: string;
  toWarehouseName?: string;
  locId?: string;
  toLocId?: string;
  locationName?: string;
  toLocationName?: string;
  /** 费用部门 */
  costDepartmentValue?: string;
  costDepartmentName?: string;
  /** 备注 */
  memo?: string;
  labelIdList?: string[];
}

export interface TransferHeadConfirmSubmit {
  billNo?: string;
  labelNo?: string;
  mitemCode?: string;
  transferTypeValue?: string;
  warehouseId?: string;
  toWarehouseId?: string;
  businessCategoryId?: string;
  locId?: string;
  toLocId?: string;
  /** 费用部门 */
  costDepartmentValue?: string;
  accountValue?: string;
  /** 费用部门 */
  reasonValue?: string;
  list?: BillInfoMMVO[];
}

/** 杂项管理物料标签检验 */
export interface LabelMMSearch {
  /** 物料标签 */
  labelNo?: string;
  /** 单据号 */
  billNo?: string;
  businessCategoryId?: string;
  warehouseId?: string;
  toWarehouseId?: string;
  toLocId?: string;
  locId?: string;
  dtlId?: string;
  /** 科目 */
  accountValue?: string;
  /** 原因 */
  reasonValue?: string;
  /** 费用部门 */
  costDepartmentValue?: string;
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
export interface ResultTransferHeadVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 交易事务头表 */
  data?: TransferHeadVO;
}

/** 交易单身表 */
export interface TransferDtlVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  /** 交易单身标签表 */
  transferDtlBarcodeList?: TransferDtlBarcodeVO[];
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  locationName?: string;
  toLocationName?: string;
  uomName?: string;
  /** @format int32 */
  isBatchNo?: number;
}

/** 交易事务头表 */
export type TransferHeadVO = {
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
  /**
   * 单身行数
   * @format int32
   */
  lineCount?: number;
  /** ERP单据号 */
  erpBillNo?: string;
  /** 来源单据号 */
  sourceBillNo?: string;
  /** 用途 */
  purpose?: string;
  /** 相关凭证 */
  voucherNo?: string;
  /** 通知凭证 */
  noticeVoucherNo?: string;
  supplierId?: string;
  /** 备注 */
  memo?: string;
  /** 原因 */
  reason?: string;
  /** 科目 */
  account?: string;
  /** 费用部门 */
  costDepartment?: string;
  /** 状态 */
  status?: string;
  /** 状态名称 */
  statusName?: string;
  /** 创建人名称 */
  userName?: string;
  /** 创建人姓名 */
  displayName?: string;
  businessCategoryId?: string;
  /** 单据业务类型编码 */
  businessCategoryCode?: string;
  /** 单据业务类型名称 */
  businessCategoryName?: string;
  userTransferId?: string;
  /** 过帐人名称 */
  userTransferName?: string;
  /** 过帐人姓名 */
  displayTransferName?: string;
  /**
   * 过帐时间
   * @format date-time
   */
  datetimeTransfer?: string;
  /** 数量 */
  qty?: number;
  /** 工单 */
  moCode?: string;
  warehouseId?: string;
  /** 来源仓库编码 */
  warehouseCode?: string;
  /** 来源仓库名称 */
  warehouseName?: string;
  toWarehouseId?: string;
  /** 目标仓库编码 */
  toWarehouseCode?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  /** 交易单身表 */
  transferDtlList?: TransferDtlVO[];
} | null;

/** 仓库移转约束表 */
export interface TransferConstraint {
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
  businessCategoryId?: string;
  warehouseId?: string;
  toOid?: string;
  toWWarehouseId?: string;
}

export interface TransferConstraintSearch {
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
  /** 仓库ID */
  warehouseKeyword?: string;
  businessCategoryId?: string;
}

/** 响应数据 */
export type PagingDataTransferConstraintVO = {
  list?: TransferConstraintVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataTransferConstraintVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataTransferConstraintVO;
}

export interface TransferConstraintVO {
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
  businessCategoryId?: string;
  warehouseId?: string;
  toOid?: string;
  toWWarehouseId?: string;
  /** 业务类型名称 */
  categoryName?: string;
  /** 原组织名称 */
  oidOrgName?: string;
  /** 原仓库名称 */
  oidWarehouseName?: string;
  /** 目标组织名称 */
  toOrgName?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  /** 转入库存地类型名称 */
  transferInTypeName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
}

export interface StorageAgeQuerySearch {
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
  warehouseId?: string;
  districtId?: string;
  locationId?: string;
  mitemId?: string;
  /**
   * 入库开始日期
   * @format date-time
   */
  stockInDateStart?: string;
  /**
   * 入库结束日期
   * @format date-time
   */
  stockInDateEnd?: string;
}

/** 响应数据 */
export type PagingDataStorageAgeQueryVO = {
  list?: StorageAgeQueryVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataStorageAgeQueryVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataStorageAgeQueryVO;
}

export interface StorageAgeQueryVO {
  onhandId?: string;
  /** 接收单号 */
  receiveNo?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区编码 */
  districtCode?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位编码 */
  locationCode?: string;
  /** 货位名称 */
  locationName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 单位 */
  uomName?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  /**
   * 库存量
   * @format int32
   */
  stockNum?: number;
  threeYears?: string;
  twoToThreeYears?: string;
  oneToTwoYears?: string;
  sixToTwelveMonths?: string;
  threeToSixMonths?: string;
  onwToThreeMonths?: string;
  thirtyDays?: string;
  /** 标签条码 */
  labelNo?: string;
  /** 标签数量 */
  balanceQty?: number;
  expiredDays?: string;
}

export interface StockCheckBillExecuteSearch {
  locId?: string;
  /** 货区编码 */
  locCode?: string;
  /** 单据号 */
  billNo?: string;
  stockCheckBillId?: string;
  warehouseId?: string;
  /** 物料标签或物料编码 */
  key?: string;
  mitemId?: string;
  dtlId?: string;
  /** 实盘数 */
  checkQty?: number;
}

/** 通用响应类 */
export interface ResultStockCheckBillExecuteVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: StockCheckBillExecuteVO;
}

/** 详情集合 */
export interface StockCheckBillExecuteSubVO {
  billId?: string;
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 盘点类型名称 */
  stockCheckBillTypeName?: string;
  /** 盘点状态名称 */
  stockCheckBillStatusName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 最小包装数 */
  minPkgQty?: number;
  /** 计量单位 */
  uomName?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位名称 */
  locationName?: string;
  /** 帐面数 */
  onhandQty?: number;
  /** 实盘数 */
  checkQty?: number;
  labelCount?: string;
  /** 差异数 */
  differenceQty?: number;
  /** 差异原因 */
  diffReason?: string;
  /** 扫描的标签号 */
  scanBarcode?: string;
  onhandId?: string;
  pdDtlId?: string;
  /**
   * 是否启用批次
   * @format int32
   */
  isBatchNo?: number;
}

/** 响应数据 */
export type StockCheckBillExecuteVO = {
  billId?: string;
  barcodeDtlId?: string;
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
  /** 状态 */
  status?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库类型 */
  warehouseCategoryName?: string;
  /** 盘点类型名称 */
  stockCheckBillTypeName?: string;
  stockCheckBillTypeCode?: string;
  /** 盘点状态名称 */
  stockCheckBillStatusName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 详情集合 */
  list?: StockCheckBillExecuteSubVO[];
} | null;

/** 通用响应类 */
export interface ResultListStockCheckBillExecuteSubVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: StockCheckBillExecuteSubVO[] | null;
}

/** 通用响应类 */
export interface ResultStockCheckBillDtl {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 盘点单据明细表 */
  data?: StockCheckBillDtl;
}

/** 盘点单据明细表 */
export type StockCheckBillDtl = {
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
  stockCheckBillId?: string;
  districtId?: string;
  locId?: string;
  mitemId?: string;
  /** 帐面数 */
  onhandQty?: number;
  /** 实盘数 */
  checkQty?: number;
  /** 差异原因 */
  diffReason?: string;
  /** 差异调整原因 */
  diffAdjustReason?: string;
} | null;

export interface StockCheckBillSearch {
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
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
  /** 状态 */
  status?: string;
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
  billId?: string;
  mitemId?: string;
  districtId?: string;
  locationId?: string;
  /** 盘点类型 */
  stockCheckType?: string;
  /** 新增勾选的库存现有量记录ID */
  onHandIds?: string[];
  /** 盘点保存的明细记录修改 */
  dtls?: StockCheckBillDtl[];
}

/** 响应数据 */
export type PagingDataStockCheckBillVO = {
  list?: StockCheckBillVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataStockCheckBillVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataStockCheckBillVO;
}

export interface StockCheckBillVO {
  billId?: string;
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 盘点类型名称 */
  stockCheckBillTypeName?: string;
  /** 盘点状态名称 */
  stockCheckBillStatusName?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 修改人名称 */
  modifier?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 计量单位 */
  uomName?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位名称 */
  locationName?: string;
  /** 帐面数 */
  onhandQty?: number;
  /** 实盘数 */
  checkQty?: number;
  /** 差异数 */
  differenceQty?: number;
  /** 差异原因 */
  diffReason?: string;
  /** 扫描的标签号 */
  scanBarcode?: string;
  onhandId?: string;
  pdDtlId?: string;
  /**
   * 是否启用批次,1：是；0：否
   * @format int32
   */
  isBatchNo?: number;
  /** 是否条码管控，启用批次=非条码管控 */
  isBatchNoName?: string;
}

/** 销售订单明细查询 */
export interface SaleOrderSearch {
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
  customerId?: string;
}

/** 响应数据 */
export type PagingDataSaleOrderDtlVO = {
  list?: SaleOrderDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSaleOrderDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSaleOrderDtlVO;
}

/** 销售订单明细 */
export interface SaleOrderDtlVO {
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
  saleOrderId?: string;
  /**
   * 销售订单行号
   * @format int32
   */
  lineSeq?: number;
  mitemId?: string;
  /** 要求发货数量 */
  requireQty?: number;
  /**
   * 要求发货时间
   * @format date-time
   */
  datetimeDelivery?: string;
  /** 已发货数量 */
  deliveriedQty?: number;
  /** erp数据源ID */
  erpId?: string;
  /** 备注 */
  memo?: string;
  /** 销售订单号 */
  billNo?: string;
  customerId?: string;
  /** 客户代码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 客户简称 */
  shortName?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 单位 */
  uom?: string;
  /** 计量单位符号 */
  uomName?: string;
  warehouseId?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  districtId?: string;
  /** 货区代码 */
  districtCode?: string;
  /** 货区名称 */
  districtName?: string;
  /** 库存现有量 */
  onhandQty?: number;
  /** 库存可用量 */
  canOnhandQty?: number;
  /** 本次需求量 */
  reqQty?: number;
  /** 仓库物料汇总key */
  sumKey?: string;
}

/** 响应数据 */
export type PagingDataSaleOrderVO = {
  list?: SaleOrderVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSaleOrderVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSaleOrderVO;
}

/** 销售订单 */
export interface SaleOrderVO {
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
  /** 销售订单号 */
  billNo?: string;
  customerId?: string;
  /** 发货地址 */
  deliveryAddress?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /** 客户代码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 状态 */
  statusName?: string;
}

/** 销售发货单明细 */
export interface SaleDeliveryDtlSearch {
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
  saleDeliveryId?: string;
}

/** 响应数据 */
export type PagingDataSaleDeliveryDtlVO = {
  list?: SaleDeliveryDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSaleDeliveryDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSaleDeliveryDtlVO;
}

/** 销售发货单明细 */
export interface SaleDeliveryDtlVO {
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
  saleDeliveryId?: string;
  warehouseId?: string;
  /**
   * 发货单行号
   * @format int32
   */
  lineSeq?: number;
  mitemId?: string;
  /** 要求发货数量 */
  requireQty?: number;
  /** 已发货数量 */
  deliveriedQty?: number;
  /** 本次发货数量 */
  qty?: number;
  /** 销售订单号 */
  saleOrderNo?: string;
  saleOrderDtlId?: string;
  districtId?: string;
  locId?: string;
  /** 备注 */
  memo?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 计量单位符号 */
  uomName?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区编码 */
  districtCode?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位编码 */
  locCode?: string;
  /** 货位名称 */
  locName?: string;
}

/** 销售发货单 */
export interface SaleDeliveryVO {
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
  /** 发货单单据号 */
  billNo?: string;
  customerId?: string;
  /**
   * 发货时间
   * @format date-time
   */
  datetimeDelivery?: string;
  /** 发货地址 */
  deliveryAddress?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /** 客户代码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 创建人 */
  creatorName?: string;
  /** 修改人 */
  modifierName?: string;
  /** 作废ID */
  cancelledIds?: string[];
  /** 状态 */
  statusName?: string;
}

/** 销售发货单 */
export interface SaleDeliverySubmitVO {
  /** 发货单号 */
  billNo?: string;
  customerId?: string;
  warehouseId?: string;
  /** 发货地址 */
  address?: string;
  /** 发货时间 */
  salesTime?: string;
  /** 备注 */
  memo?: string;
  /** 销售发货明细 */
  saleOrderDtlVOList?: SaleOrderDtlVO[];
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

/** 销售发货单 */
export interface SaleDeliverySearch {
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
  /** 单据号 */
  billNo?: string;
  customerId?: string;
  mitemId?: string;
  /** 销售订单 */
  saleOrderNo?: string;
  /** 状态 */
  status?: string;
  /** 开始时间 */
  salesTimeBegin?: string;
  /** 结束时间 */
  salesTimeEnd?: string;
}

/** 响应数据 */
export type PagingDataSaleDeliveryVO = {
  list?: SaleDeliveryVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataSaleDeliveryVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataSaleDeliveryVO;
}

/** 退货出库单条码信息 */
export interface ReturnStockOutDtlBarcodeVO {
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
  transferDtlId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  supplierId?: string;
  /** 数量 */
  qty?: number;
  /** 单位 */
  uom?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 扫描的条形码 */
  scanBarcode?: string;
  /** 条码类型 */
  barcodeType?: string;
  /** 工单号 */
  moCode?: string;
  workshopId?: string;
  workcenterId?: string;
}

/** 退货出库 */
export interface ReturnStockOutDtlVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  /** 交易单身标签表 */
  transferDtlBarcodeList?: ReturnStockOutDtlBarcodeVO[];
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  locationName?: string;
  uomName?: string;
  /** 当前已扫标签数量 */
  scanQty?: number;
  /** 是否接收完成 */
  scanComplete?: boolean;
  /** 交易事务单号 */
  transferBillNo?: string;
  /** 交易事务单号 */
  transferBillNoStatus?: string;
  transferDtlId?: string;
  /** 待扫数量 */
  waitScanQty?: number;
}

/** 退货单扫描 */
export interface ReturnStockOutSearch {
  /** 单号 */
  billNo?: string;
  billDtlId?: string;
  /** pr单号 */
  prBillNo?: string;
  /** 物料标签 */
  labelNo?: string;
  supplierId?: string;
  /** 退货出库 */
  returnStockOutDtl?: ReturnStockOutDtlVO;
}

/** 送货单明细 */
export interface DeliveryDtlVO {
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
  deliveryId?: string;
  /**
   * 送货单行号
   * @format int32
   */
  lineSeq?: number;
  mitemId?: string;
  /** 送货数量 */
  qty?: number;
  /** 接收数量 */
  receivedQty?: number;
  /** 采购订单号 */
  poNo?: string;
  /**
   * 采购日期
   * @format date-time
   */
  datePo?: string;
  /** 备注 */
  memo?: string;
  /** 交易事务单号 */
  transferBillNo?: string;
  /** 交易事务单号 */
  transferBillNoStatus?: string;
  /** 送货单单号 */
  deliveryNo?: string;
  /** 送货单状态 */
  status?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 单位 */
  uom?: string;
  supplierId?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 已扫数量 */
  scanQty?: number;
  transferDtlId?: string;
  /** 待扫数量 */
  waitScanQty?: number;
  /** 是否接收完成 */
  isComplete?: boolean;
}

/** 采购单明细 */
export interface PurchaseOrderDtlVO {
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
  purchaseOrderId?: string;
  /** 订单行号 */
  billLineNo?: string;
  /** erp数据源行号 */
  erpLineNo?: string;
  /**
   * 要求到货时间
   * @format date-time
   */
  datetimeArrive?: string;
  mitemId?: string;
  /** 需求数量 */
  qty?: number;
  /** 已到货数量 */
  arrivaledQty?: number;
  /** 退货数量 */
  returnQty?: number;
  /** 备注 */
  memo?: string;
  /** 交易事务单号 */
  transferBillNo?: string;
  /** 交易事务单号 */
  transferBillNoStatus?: string;
  /** 采购单单号 */
  purchaseOrderNo?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 单位 */
  uom?: string;
  supplierId?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 已扫数量 */
  scanQty?: number;
  transferDtlId?: string;
  /** 待扫数量 */
  waitScanQty?: number;
  /** 是否接收完成 */
  isComplete?: boolean;
}

/** 退货管理VO */
export interface ReturnManagementVO {
  /** 退货单号 */
  billNo?: string;
  /** 退货单描述 */
  billNoDesc?: string;
  /** 备注 */
  memo?: string;
  /** 交易事务头表 */
  billTransferHeadVO?: TransferHeadVO;
  /** 送货单 */
  deliveryDtlList?: DeliveryDtlVO[];
  /** 采购单 */
  purchaseOrderDtlList?: PurchaseOrderDtlVO[];
}

/** 退货管理VO */
export interface ReturnManagementSearch {
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
  /** 退货单号 */
  returnBillNo?: string;
  /** 送货单号 */
  asnBillNo?: string;
  /** 采购订单号 */
  poBillNo?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 退货类型(INSPECTION_RETURN、WAREHOUSE_RETURN) */
  returnType?: string;
  /** 单据状态 */
  billStatus?: string;
  /** 用户信息 */
  userName?: string;
  /**
   * 开始时间
   * @format date-time
   */
  beginTime?: string;
  /**
   * 结束时间
   * @format date-time
   */
  endTime?: string;
}

/** 响应数据 */
export type PagingDataTransferHeadVO = {
  list?: TransferHeadVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataTransferHeadVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataTransferHeadVO;
}

/** 通用响应类 */
export interface ResultReturnStockOutHeadVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 退货出库单头信息 */
  data?: ReturnStockOutHeadVO;
}

/** 退货出库单头信息 */
export type ReturnStockOutHeadVO = {
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
  /**
   * 单身行数
   * @format int32
   */
  lineCount?: number;
  /** ERP单据号 */
  erpBillNo?: string;
  /** 来源单据号 */
  sourceBillNo?: string;
  /** 用途 */
  purpose?: string;
  /** 相关凭证 */
  voucherNo?: string;
  /** 通知凭证 */
  noticeVoucherNo?: string;
  supplierId?: string;
  /** 备注 */
  memo?: string;
  /** 原因 */
  reason?: string;
  /** 科目 */
  account?: string;
  /** 费用部门 */
  costDepartment?: string;
  /** 状态 */
  status?: string;
  /** 状态名称 */
  statusName?: string;
  /** 创建人名称 */
  userName?: string;
  /** 创建人姓名 */
  displayName?: string;
  businessCategoryId?: string;
  /** 单据业务类型编码 */
  businessCategoryCode?: string;
  /** 单据业务类型名称 */
  businessCategoryName?: string;
  userTransferId?: string;
  /** 过帐人名称 */
  userTransferName?: string;
  /** 过帐人姓名 */
  displayTransferName?: string;
  /**
   * 过帐时间
   * @format date-time
   */
  datetimeTransfer?: string;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 交易单身表 */
  transferDtlList?: ReturnStockOutDtlVO[];
} | null;

/** 通用响应类 */
export interface ResultReturnManagementVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 退货管理VO */
  data?: ReturnManagementVO;
}

export interface PurchaseOrderSearch {
  /** 交易事务单号 */
  billNo?: string;
  /** 采购单号 */
  purchaseOrderNo?: string;
  purchaseOrderDtlId?: string;
  /** 物料标签 */
  labelNo?: string;
}

/** 响应数据 */
export type PagingDataPurchaseOrderVO = {
  list?: PurchaseOrderVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 采购单 */
export interface PurchaseOrderVO {
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
  /** 采购单号 */
  billNo?: string;
  /** ERP行号 */
  erpNo?: string;
  supplierId?: string;
  /** 交货地址 */
  deliverAddress?: string;
  /** 备注 */
  memo?: string;
  /** 供应商代码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** 通用响应类 */
export interface ResultPagingDataPurchaseOrderVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPurchaseOrderVO;
}

export interface PurchaseOrderBatchSubmit {
  batchList?: PurchaseOrderSearch[];
}

export interface OnhandQtySearch {
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
  warehouseId?: string;
  districtId?: string;
  locationId?: string;
  /** 物料Id */
  mitemIds?: string[];
}

export interface OnhandQtyVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  mitemId?: string;
  /** 库存现有量 */
  qty?: number;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位名称 */
  locationName?: string;
  /** ERP仓库编码 */
  erpWarehouseCode?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 计量单位 */
  uomName?: string;
}

/** 响应数据 */
export type PagingDataOnhandQtyVO = {
  list?: OnhandQtyVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOnhandQtyVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOnhandQtyVO;
}

/** 配送卡表 */
export interface DeliveryCard {
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
  /** 配送卡号 */
  deliveryCardNo?: string;
  mitemId?: string;
  workcenterId?: string;
  /** 标签初始化数量 */
  qty?: number;
  /** 结余数量 */
  balanceQty?: number;
  moScheId?: string;
  printTmplId?: string;
  /**
   * 标签顺序号
   * @format int32
   */
  printSeq?: number;
  /** 状态 */
  status?: string;
  onhandId?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
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

/** 工单发料提交模型 */
export interface MoIssuanceDTO {
  /** 排产单号 */
  moScheCode?: string;
  moScheId?: string;
  /** 发料单号 */
  billNo?: string;
  /** 发料原因 */
  reason?: string;
  /** 提交的模型-明细信息 */
  submitList?: MoIssuanceDtlVO[];
  /** 明细id */
  tranDtlId?: string;
  /** 标签号码 */
  labelNo?: string;
  /**
   * 是否启用先进先出
   * @format int32
   */
  isFifo?: number;
  /** 扫描条码型-明细信息 */
  dtlInfo?: MoIssuanceDtlVO;
  /** 标签类型 */
  labelCategory?: string;
  /** 标签表 */
  labelInfo?: Label;
  /** 配送卡表 */
  deliveryCardInfo?: DeliveryCard;
}

/** 扫描条码型-明细信息 */
export interface MoIssuanceDtlVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  /**
   * 行号
   * @format int32
   */
  index?: number;
  tranDtlId?: string;
  moBomId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uom?: string;
  uomName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  /**
   * 是否来源仓库启用货位管理
   * @format int32
   */
  isEnableLocation?: number;
  /**
   * 是否来源仓库先进先出
   * @format int32
   */
  isFifo?: number;
  districtCode?: string;
  districtName?: string;
  locationCode?: string;
  locationName?: string;
  toWarehouseCode?: string;
  toWarehouseName?: string;
  /**
   * 是否目标仓库启用货位管理
   * @format int32
   */
  isToEnableLocation?: number;
  /**
   * 是否目标仓库先进先出
   * @format int32
   */
  isToFifo?: number;
  workshopId?: string;
  /**
   * 是否启用批次,1：是；0：否
   * @format int32
   */
  isBatchNo?: number;
  /**
   * 分子用量
   * @format int32
   */
  numeratorQty?: number;
  /**
   * 分母用量
   * @format int32
   */
  denomainatorQty?: number;
  scheCode?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  /** 库存可用量 */
  handQty?: number;
  /** 交易单标签表 */
  transferDtlBarcodeList?: TransferDtlBarcodeVO[];
  /**
   * 已扫描数量
   * @format double
   */
  scanQty?: number;
  flpickQty?: number;
  tlpickQty?: number;
  bfpickQty?: number;
  /**
   * 需求用量
   * @format int32
   */
  moRequestQty?: number;
  /** 已发料量 */
  alreadyPickQty?: number;
  /**
   * 待扫数量
   * @format double
   */
  waitingScanQty?: number;
}

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

export interface MitemShelflifeReportSearch {
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
  warehouseId?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  /** 批次号 */
  lotNo?: string;
  /** 是否仅显示已过期 */
  isExpired?: boolean;
  /**
   * 接收开始日期
   * @format date-time
   */
  receiveDateStart?: string;
  /**
   * 接收结束日期
   * @format date-time
   */
  receiveDateEnd?: string;
}

export interface MitemShelflifeReportVO {
  /** 批次号 */
  lotNo?: string;
  /** 接收单号 */
  receiveNo?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位名称 */
  locationName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料类型编码 */
  categoryCode?: string;
  /** 物料类型名称 */
  categoryName?: string;
  /** 单位 */
  uomName?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  /**
   * 保质期天数
   * @format int32
   */
  shelfLifeDays?: number;
  /**
   * 库存量
   * @format int32
   */
  stockNum?: number;
  /** 标签条码 */
  labelNo?: string;
  /** 标签数量 */
  qty?: number;
  onhandId?: string;
  expiredDays?: string;
}

/** 响应数据 */
export type PagingDataMitemShelflifeReportVO = {
  list?: MitemShelflifeReportVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemShelflifeReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemShelflifeReportVO;
}

export interface MitemPutVO {
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
  districtId?: string;
  /** 货区名称 */
  districtName?: string;
  locationId?: string;
  /** 货位 */
  locationCode?: string;
  /** 货位名称 */
  locationName?: string;
  /** 标签 */
  label?: string;
  /** 上架标签 */
  putList?: LabelVO[];
}

/** 通用响应类 */
export interface ResultLabelVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示产品条码管理 */
  data?: LabelVO;
}

/** 显示产品条码管理 */
export type LocationVO = {
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
  /** 货位代码 */
  locationCode?: string;
  /** 货位名称 */
  locationName?: string;
  /** 货位描述 */
  locationDesc?: string;
  warehouseId?: string;
  districtId?: string;
  /** 货位代码 */
  districtCode?: string;
  /** 货位名称 */
  districtName?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 修改人 */
  modifierName?: string;
} | null;

/** 通用响应类 */
export interface ResultLocationVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示产品条码管理 */
  data?: LocationVO;
}

/** 领料执行提交模型 */
export interface MaterialRequisitionExcuteDTO {
  /** 领料单号 */
  billNo?: string;
  toWarehouseId?: string;
  /** 提交的模型-明细信息 */
  submitList?: MaterialRequisitionExcuteDtlVO[];
}

/** 提交的模型-明细信息 */
export interface MaterialRequisitionExcuteDtlVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  moMitemCode?: string;
  moMitemName?: string;
  moMitemDesc?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uom?: string;
  uomName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  /**
   * 是否来源仓库启用货位管理
   * @format int32
   */
  isEnableLocation?: number;
  /**
   * 是否来源仓库先进先出
   * @format int32
   */
  isFifo?: number;
  districtCode?: string;
  districtName?: string;
  locationCode?: string;
  locationName?: string;
  toWarehouseCode?: string;
  toWarehouseName?: string;
  /**
   * 是否目标仓库启用货位管理
   * @format int32
   */
  isToEnableLocation?: number;
  /**
   * 是否目标仓库先进先出
   * @format int32
   */
  isToFifo?: number;
  workshopId?: string;
  /**
   * 是否启用批次,1：是；0：否
   * @format int32
   */
  isBatchNo?: number;
  /**
   * 分子用量
   * @format int32
   */
  numeratorQty?: number;
  /**
   * 分母用量
   * @format int32
   */
  denomainatorQty?: number;
  scheCode?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  /**
   * 排产日期
   * @format date-time
   */
  datetimeSche?: string;
  /** 库存可用量 */
  handQty?: number;
  /** 交易单标签表 */
  transferDtlBarcodeList?: TransferDtlBarcodeVO[];
  /**
   * 已扫描数量
   * @format double
   */
  scanQty?: number;
  /**
   * 待扫数量
   * @format double
   */
  waitingScanQty?: number;
}

/** 查询排产单维度，BOM物料的单据执行数量信息 */
export interface AlreadyRequisitionVO {
  moScheId?: string;
  mitemId?: string;
  /** 申请数量 */
  reqQty?: number;
  /** 已领料数量 */
  pickQty?: number;
}

/** 配送制单获取明细实体 */
export interface GetMaterialsDtlDTO {
  moscheId?: string;
  mitemId?: string;
}

/** 领料制单提交模型 */
export interface MaterialRequisitionDTO {
  /** 作废的单据id集合 */
  cancelledIds?: string[];
  /** 新增界面-获取明细 */
  moScheCodeList?: string[];
  warehouseId?: string;
  toWarehouseId?: string;
  /** 新增界面-备注 */
  remark?: string;
  /** 查询库存模型 */
  onHandInfo?: OnHandVO;
  /** 查询排产单维度，BOM物料的单据执行数量信息 */
  alreadyRequisitionVO?: AlreadyRequisitionVO;
  /** 新增界面-提交的模型-明细信息 */
  submitList?: MaterialRequisitionDtlVO[];
  /** 配送指令-配送制单-获取明细请求参数实体列表 */
  materialList?: GetMaterialsDtlDTO[];
}

/** 新增界面-提交的模型-明细信息 */
export interface MaterialRequisitionDtlVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  /** 子层级 */
  children?: MaterialRequisitionDtlVO[];
  index?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uom?: string;
  uomName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  districtCode?: string;
  districtName?: string;
  locationCode?: string;
  locationName?: string;
  toWarehouseCode?: string;
  toWarehouseName?: string;
  workshopId?: string;
  /**
   * 分子用量
   * @format int32
   */
  numeratorQty?: number;
  /**
   * 分母用量
   * @format int32
   */
  denomainatorQty?: number;
  scheCode?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  /** 库存可用量 */
  handQty?: number;
  /** 申请中数量 */
  applyingQty?: number;
  /** 已领用量 */
  alreadyPickQty?: number;
  supplierId?: string;
  /**
   * 需求用量
   * @format int32
   */
  moRequestQty?: number;
  /** 仓库物料汇总key */
  sumKey?: string;
}

/** 查询库存模型 */
export interface OnHandVO {
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  mitemId?: string;
  /** 库存现有量 */
  qty?: number;
}

/** 通用响应类 */
export interface ResultListMaterialRequisitionDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MaterialRequisitionDtlVO[] | null;
}

/** 通用响应类 */
export interface ResultListOnHandVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: OnHandVO[] | null;
}

/** 通用响应类 */
export interface ResultOnHandVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 查询库存模型 */
  data?: OnHandVO;
}

/** 通用响应类 */
export interface ResultListAlreadyRequisitionVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: AlreadyRequisitionVO[] | null;
}

/** 货位 */
export interface Location {
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
  /** 货位代码 */
  locationCode?: string;
  /** 货位名称 */
  locationName?: string;
  /** 货位描述 */
  locationDesc?: string;
  warehouseId?: string;
  districtId?: string;
}

/** 通用响应类 */
export interface ResultLocation {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 货位 */
  data?: Location;
}

/** 通用响应类 */
export interface ResultListLocationVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: LocationVO[] | null;
}

export interface LocationSearch {
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
  warehouseId?: string;
  /** 货区Id */
  districtKeyword?: string;
  /** 货位搜索关键字 */
  locationKeyword?: string;
}

/** 响应数据 */
export type PagingDataLocationVO = {
  list?: LocationVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLocationVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLocationVO;
}

/** 线边仓水位表 */
export interface LineWarehouseWaterLevel {
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
  warehouseId?: string;
  mitemId?: string;
  /** 安全库存量 */
  safeStockVolume?: number;
  /** 经济批量 */
  lotQty?: number;
}

export interface LineWarehouseWaterLevelSearch {
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
  id?: string;
  warehouseId?: string;
  mitemId?: string;
  /** 多个工作中心ID */
  workcenterIds?: string[];
}

/** 显示产品条码管理 */
export interface LineWarehouseWaterLevelVO {
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
  warehouseId?: string;
  mitemId?: string;
  /** 安全库存量 */
  safeStockVolume?: number;
  /** 经济批量 */
  lotQty?: number;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 计量单位符号名称 */
  uomName?: string;
  /** 组织名称 */
  orgName?: string;
}

/** 响应数据 */
export type PagingDataLineWarehouseWaterLevelVO = {
  list?: LineWarehouseWaterLevelVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLineWarehouseWaterLevelVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLineWarehouseWaterLevelVO;
}

export interface LineWarehouseSearch {
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
  id?: string;
  warehouseId?: string;
  workcenterId?: string;
  /** 多个工作中心ID */
  workcenterIds?: string[];
}

/** 显示产品条码管理 */
export interface LineWarehouseVO {
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
  workcenterId?: string;
  warehouseId?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 仓库描述 */
  warehouseDesc?: string;
  /** 工作中心名称 */
  wcName?: string;
}

/** 响应数据 */
export type PagingDataLineWarehouseVO = {
  list?: LineWarehouseVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLineWarehouseVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLineWarehouseVO;
}

export interface MitemForwardTraceSearch {
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
  /** 物料批次 */
  mitemLotNo?: string;
  /** 物料标签 */
  mitemLabelNo?: string;
  mitemId?: string;
  /** 物料id */
  ids?: string[];
}

/** 关键物料正向追溯VO */
export interface MFTSubVO {
  /** 物料标签 */
  mitemLabelNo?: string;
  /** 批次 */
  lotNo?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 供应商联系人 */
  contactPerson?: string;
  /** 供应商联系电话 */
  contactTel?: string;
  /** 检验单号 */
  billNo?: string;
  /** 检验类型 */
  inspectType?: string;
  /** 质检结果 */
  inspectResult?: string;
  /** 数量 */
  qty?: number;
  /** 操作员 */
  operatorName?: string;
  /** 产品编码 */
  pdCode?: string;
  /** 来源仓库名称 */
  warehouseName?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  /** 工作中心 */
  workcenterName?: string;
  /** 工单号 */
  moCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 物料描述 */
  mitemCode?: string;
  /** 绑定工序 */
  processName?: string;
  /** 操作类型 */
  operateType?: string;
  /**
   * 加工时间
   * @format date-time
   */
  processDate?: string;
}

/** 关键物料正向追溯VO */
export type MFTVO = {
  /** 物料编码 */
  mitemCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 批次 */
  lotNo?: string;
  /** 数量 */
  qty?: number;
  /** 当前状态 */
  statusName?: string;
  /**
   * 接收时间
   * @format date-time
   */
  receiveTime?: string;
  tableData?: PagingDataMFTSubVO;
} | null;

export interface PagingDataMFTSubVO {
  list?: MFTSubVO[];
  /** @format int32 */
  total?: number;
}

/** 通用响应类 */
export interface ResultMFTVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 关键物料正向追溯VO */
  data?: MFTVO;
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
export interface ResultPagingDataMFTSubVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: PagingDataMFTSubVO;
}

/** 入厂检验搜索条件 */
export interface MitemReceiveBillSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  billNo?: string;
  /** @format date-time */
  beginDatetimeReceipted?: string;
  /** @format date-time */
  endDatetimeReceipted?: string;
  mitemCategoryId?: string;
  mitemId?: string;
  iqcBillNo?: string;
  prefix?: string;
  inspectGroupId?: string;
  inspectGroupMitemCategoryId?: string[];
}

/** 交易单身表 */
export interface MitemReceiveBillVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  businessCategoryId?: string;
  businessCategoryCode?: string;
  businessCategoryName?: string;
  status?: string;
  statusName?: string;
  supplierId?: string;
  supplierCode?: string;
  supplierName?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  mitemCategoryCode?: string;
  mitemCategoryName?: string;
  locationName?: string;
  toLocationName?: string;
  userReceiptedId?: string;
  /** 接收人姓名 */
  userReceiptedDisplayName?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  uomName?: string;
  /** @format int32 */
  isBatchNo?: number;
  /** 检验严格度 */
  inspectionStringency?: string;
  /** 检验严格度 */
  inspectionStringencyName?: string;
  /** IQC单据号 */
  iqcBillNo?: string;
  waitTime?: string;
}

/** 响应数据 */
export type PagingDataMitemReceiveBillVO = {
  list?: MitemReceiveBillVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMitemReceiveBillVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMitemReceiveBillVO;
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
export interface ResultListT {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: T[] | null;
}

/** 响应数据 */
export type T = object | null;

export interface DynamicCheckUniqueDTO {
  mapTable?: string;
  businessDomain?: string;
  uniqueFields?: string[];
  checkRow?: Record<string, object>;
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

/** 货区 */
export interface District {
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
  /** 货位代码 */
  districtCode?: string;
  /** 货位名称 */
  districtName?: string;
  /** 货位描述 */
  districtDesc?: string;
  warehouseId?: string;
}

/** 通用响应类 */
export interface ResultDistrict {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 货区 */
  data?: District;
}

export interface DistrictSearch {
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
  warehouseId?: string;
  /** 货区搜索关键字 */
  districtKeyword?: string;
}

/** 公共方法输出类 */
export interface DistrictVO {
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
  /** 货位代码 */
  districtCode?: string;
  /** 货位名称 */
  districtName?: string;
  /** 货位描述 */
  districtDesc?: string;
  warehouseId?: string;
  /** 仓库代码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 修改人 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataDistrictVO = {
  list?: DistrictVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDistrictVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDistrictVO;
}

export interface DeliveryCommandSearch {
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
  warehouseId?: string;
  mitemId?: string;
  /** 配送单据号 */
  deliveryBillNo?: string;
  /** 状态 */
  status?: string[];
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

/** 显示产品条码管理 */
export interface DeliveryCommandJobDTO {
  moscheId?: string;
  warehouseId?: string;
  mitemId?: string;
  /** Bom物料需求 */
  bomRequirement?: number;
  /** 经济批量 */
  lotQty?: number;
  /** 安全库存量 */
  safeStockVolume?: number;
  /** 已配数量 */
  pickQty?: number;
  /** 库存现有量 */
  qty?: number;
  /** 缺料数 */
  deliveryQty?: number;
  /** 建议配送数 */
  suggest?: number;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 已配/需求 */
  show?: number[];
}

/** 响应数据 */
export type PagingDataDeliveryCommandJobDTO = {
  list?: DeliveryCommandJobDTO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDeliveryCommandJobDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDeliveryCommandJobDTO;
}

/** 配送指令表 */
export interface DeliveryCommand {
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
  warehouseId?: string;
  mitemId?: string;
  moScheId?: string;
  /** 配送数量 */
  deliveryQty?: number;
  /** 配送单据号 */
  deliveryBillNo?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /**
   * 是否自动(1是，0否)
   * @format int32
   */
  isAuto?: number;
}

/** 显示产品条码管理 */
export interface DeliveryCommandVO {
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
  warehouseId?: string;
  mitemId?: string;
  moScheId?: string;
  /** 配送数量 */
  deliveryQty?: number;
  /** 配送单据号 */
  deliveryBillNo?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /**
   * 是否自动(1是，0否)
   * @format int32
   */
  isAuto?: number;
  /** 线边仓编码 */
  warehouseCode?: string;
  /** 线边仓名称 */
  warehouseName?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 计量单位名称 */
  uomName?: string;
  /** 状态名称 */
  statusName?: string;
  /** 修改人 */
  modifierName?: string;
}

/** 响应数据 */
export type PagingDataDeliveryCommandVO = {
  list?: DeliveryCommandVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDeliveryCommandVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDeliveryCommandVO;
}

/** 送货单扫描 */
export interface DeliverySearch {
  /** 交易事务单号 */
  billNo?: string;
  /** 送货单号 */
  deliveryNo?: string;
  deliveryDtlId?: string;
  /** 物料标签 */
  labelNo?: string;
}

/** 送货单 */
export interface DeliveryVO {
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
  /** 送货单号码 */
  billNo?: string;
  /**
   * 送货日期
   * @format date-time
   */
  dateDelivery?: string;
  supplierId?: string;
  /** 备注 */
  memo?: string;
  /** 状态 */
  status?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 送货单状态 */
  statusName?: string;
}

/** 响应数据 */
export type PagingDataDeliveryVO = {
  list?: DeliveryVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDeliveryVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDeliveryVO;
}

/** 送货单扫描 */
export interface DeliveryBatchSubmit {
  batchList?: DeliverySearch[];
}

/** 仓库业务类型 */
export interface BusinessCategory {
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
  /** 业务类型代码 */
  categoryCode?: string;
  /** 业务类型名称 */
  categoryName?: string;
  /**
   * 业务交易方向
   * @format int32
   */
  businessDirection?: number;
  /** 转出库存地类型 */
  transferOutType?: string;
  /** 转入库存地类型 */
  transferInType?: string;
  /** 业务单据前辍 */
  perfix?: string;
}

/** 响应数据 */
export type PagingDataBusinessCategory = {
  list?: BusinessCategory[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBusinessCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBusinessCategory;
}

export interface BusinessCategorySearch {
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
  /** 仓库业务类型模糊 */
  keyword?: string;
  /** 多个ID */
  ids?: string[];
}

export interface BusinessCategoryVO {
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
  /** 业务类型代码 */
  categoryCode?: string;
  /** 业务类型名称 */
  categoryName?: string;
  /**
   * 业务交易方向
   * @format int32
   */
  businessDirection?: number;
  /** 转出库存地类型 */
  transferOutType?: string;
  /** 转入库存地类型 */
  transferInType?: string;
  /** 业务单据前辍 */
  perfix?: string;
  /** 业务交易方向名称 */
  businessDirectionName?: string;
  /** 转出库存地类型名称 */
  transferOutTypeName?: string;
  /** 转入库存地类型名称 */
  transferInTypeName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
}

/** 响应数据 */
export type PagingDataBusinessCategoryVO = {
  list?: BusinessCategoryVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBusinessCategoryVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBusinessCategoryVO;
}

/** 通用响应类 */
export interface ResultListBusinessCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BusinessCategory[] | null;
}

export interface BillManagementSearch {
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
  /** 仓库业务类型ID */
  businessCategoryIds?: string[];
  mitemId?: string;
  supplierId?: string;
  /** 单据号 */
  billNo?: string;
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

export interface BillManagementVO {
  /** 事务类型 */
  categoryName?: string;
  /** 单据号 */
  billNo?: string;
  /** 关联单号 */
  sourceBillNo?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 交易数量 */
  pickQty?: number;
  /** 单位 */
  uomName?: string;
  /** ERP单号 */
  erpBillNo?: string;
  /** ERP行号 */
  erpLineNo?: string;
  /** 上传状态名称 */
  uploadStatusName?: string;
  /** 备注 */
  memo?: string;
  /** 供应商 */
  supplierName?: string;
  /** 源仓库名称 */
  warehouseName?: string;
  /** 源货区名称 */
  districtName?: string;
  /** 源货位名称 */
  locationName?: string;
  /** 目标仓库名称 */
  toWarehouseName?: string;
  /** 目标货区名称 */
  toDistrictName?: string;
  /** 目标货位名称 */
  toLocationName?: string;
  /** 单据状态 */
  billStatusName?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 修改人名称 */
  modifier?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 原因 */
  reason?: string;
  /** 科目 */
  account?: string;
  /** 费用部门 */
  costDepartment?: string;
  /** 标签条码 */
  scanBarcode?: string;
  /** 标签数量 */
  qty?: number;
}

/** 响应数据 */
export type PagingDataBillManagementVO = {
  list?: BillManagementVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataBillManagementVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataBillManagementVO;
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

export interface AcceptSendSaveReportSearch {
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
  warehouseId?: string;
  mitemCategoryId?: string;
  /** 物料ID */
  mitemIds?: string[];
  /** 是否按货位汇总 */
  isDistrict?: boolean;
  /**
   * 接收开始日期
   * @format date-time
   */
  receiveDateStart?: string;
  /**
   * 接收结束日期
   * @format date-time
   */
  receiveDateEnd?: string;
}

export interface AcceptSendSaveReportVO {
  /** 仓库名称 */
  warehouseName?: string;
  /** 货区名称 */
  districtName?: string;
  /** 货位名称 */
  locationName?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料类型编码 */
  categoryCode?: string;
  /** 物料类型名称 */
  categoryName?: string;
  /** 单位 */
  uomName?: string;
  /** 入库 */
  searchOut?: number;
  /** 出库 */
  searchIn?: number;
  /** 上月库存 */
  beforeMonth?: number;
  /** 期初库存 */
  primaryNum?: number;
  /** 期末库存 */
  lastNum?: number;
  beforeIn?: number;
  beforeOut?: number;
}

/** 响应数据 */
export type PagingDataAcceptSendSaveReportVO = {
  list?: AcceptSendSaveReportVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataAcceptSendSaveReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataAcceptSendSaveReportVO;
}

/** 发料执行提交模型 */
export interface GoodsSentOutDTO {
  /** 发货单-单据号 */
  saleDeliveryBillNo?: string;
  saleDeliveryId?: string;
  /** 交易事务-单据号 */
  billNo?: string;
  /** 交易事务-源单据号即发货单号 */
  sourceBillNo?: string;
  /** 提交的模型-明细信息 */
  submitList?: GoodsSentOutDtlVO[];
  /** 发货单明细id */
  saleDeliveryDtlId?: string;
  /** 标签号码 */
  barcode?: string;
  /**
   * 是否启用先进先出
   * @format int32
   */
  isFifo?: number;
  /** 扫描条码型-明细信息 */
  dtlInfo?: MoIssuanceDtlVO;
}

/** 提交的模型-明细信息 */
export interface GoodsSentOutDtlVO {
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
  warehouseId?: string;
  districtId?: string;
  locId?: string;
  toOid?: string;
  toWarehouseId?: string;
  toDistrictId?: string;
  toLocId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  moScheId?: string;
  /** 需求数量 */
  reqQty?: number;
  /** 实际拣料数量 */
  pickQty?: number;
  /** 原因 */
  reason?: string;
  /** 相关凭证号 */
  voucherLineNo?: string;
  /** 通知凭证 */
  noticeVoucherLineNo?: string;
  /** 到货批次 */
  batchNo?: string;
  /** 采购订单号 */
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  /** 备注 */
  memo?: string;
  /** 来源单据行号 */
  sourceBillLineNo?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uom?: string;
  uomName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  /**
   * 是否来源仓库启用货位管理
   * @format int32
   */
  isEnableLocation?: number;
  /**
   * 是否来源仓库先进先出
   * @format int32
   */
  isFifo?: number;
  districtCode?: string;
  districtName?: string;
  locationCode?: string;
  locationName?: string;
  workshopId?: string;
  /** 库存可用量 */
  handQty?: number;
  tranDtlId?: string;
  /** 交易单标签表 */
  transferDtlBarcodeList?: TransferDtlBarcodeVO[];
  /**
   * 已扫描数量
   * @format double
   */
  scanQty?: number;
  /**
   * 待扫数量
   * @format double
   */
  waitingScanQty?: number;
}

/** 通用响应类 */
export interface ResultListLong {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: string[] | null;
}

/** 通用响应类 */
export interface ResultBigDecimal {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: number | null;
}

/** 通用响应类 */
export interface ResultListWarehouse {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Warehouse[] | null;
}

/** 组织架构表 */
export type Org = {
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
} | null;

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

/** 通用响应类 */
export interface ResultListStockCheckBillExecuteBarcodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: StockCheckBillExecuteBarcodeVO[] | null;
}

/** 响应数据 */
export type StockCheckBillExecuteBarcodeVO = {
  id?: string;
  /** 物料标签 */
  labelNo?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 帐面数 */
  onhandQty?: number;
  /** 实盘数 */
  checkQty?: number;
} | null;

/** 响应数据 */
export type PagingDataStockCheckBillExecuteVO = {
  list?: StockCheckBillExecuteVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataStockCheckBillExecuteVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataStockCheckBillExecuteVO;
}

/** 通用响应类 */
export interface ResultListLocation {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Location[] | null;
}

/** 通用响应类 */
export interface ResultListDistrict {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: District[] | null;
}

/** 响应数据 */
export type PagingDataPurchaseOrderDtlVO = {
  list?: PurchaseOrderDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataPurchaseOrderDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPurchaseOrderDtlVO;
}

/** 通用响应类 */
export interface ResultListPurchaseOrderDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PurchaseOrderDtlVO[] | null;
}

/** 通用响应类 */
export interface ResultSaleDeliveryOnhandQtyVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 仓库可用量 */
  data?: SaleDeliveryOnhandQtyVO;
}

/** 仓库可用量 */
export type SaleDeliveryOnhandQtyVO = {
  /** 库存现有量 */
  onhandQty?: number;
  /** 库存可用量 */
  canOnhandQty?: number;
} | null;

export interface OnhandQtyDtlVO {
  /** 条码 */
  serialNumber?: string;
  /** 批次号 */
  lotNo?: string;
  /** 数量 */
  balanceQty?: number;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
}

/** 响应数据 */
export type PagingDataOnhandQtyDtlVO = {
  list?: OnhandQtyDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataOnhandQtyDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataOnhandQtyDtlVO;
}

/** 响应数据 */
export type MoIssuanceVO = {
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
  businessCategoryId?: string;
  /** 状态 */
  status?: string;
  /**
   * 打印次数
   * @format int32
   */
  printCount?: number;
  /**
   * 最后打印时间
   * @format date-time
   */
  datetimeLastPrint?: string;
  userLastPrintId?: string;
  /**
   * 批准时间
   * @format date-time
   */
  datetimeApproved?: string;
  userApprovedId?: string;
  /**
   * 驳回时间
   * @format date-time
   */
  datetimeRejected?: string;
  userRejectedId?: string;
  /**
   * 取消时间
   * @format date-time
   */
  datetimeCanceled?: string;
  userCanceledId?: string;
  /**
   * 过帐时间
   * @format date-time
   */
  datetimeTransfer?: string;
  userTransferId?: string;
  /**
   * 作业完成时间
   * @format date-time
   */
  datetimePicked?: string;
  userPickedId?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  userReceiptedId?: string;
  moScheId?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 车间代码 */
  workshopCode?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 修改人名称 */
  modifierName?: string;
  /**
   * 修改人时间
   * @format date-time
   */
  modifiedTime?: string;
  dtls?: MoIssuanceDtlVO[];
  /** 单据状态名称 */
  statusName?: string;
} | null;

/** 通用响应类 */
export interface ResultListMoIssuanceVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MoIssuanceVO[] | null;
}

/** 通用响应类 */
export interface ResultMoIssuanceVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MoIssuanceVO;
}

/** 响应数据 */
export type MaterialRequisitionVO = {
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
  businessCategoryId?: string;
  /** 状态 */
  status?: string;
  /**
   * 打印次数
   * @format int32
   */
  printCount?: number;
  /**
   * 最后打印时间
   * @format date-time
   */
  datetimeLastPrint?: string;
  userLastPrintId?: string;
  /**
   * 批准时间
   * @format date-time
   */
  datetimeApproved?: string;
  userApprovedId?: string;
  /**
   * 驳回时间
   * @format date-time
   */
  datetimeRejected?: string;
  userRejectedId?: string;
  /**
   * 取消时间
   * @format date-time
   */
  datetimeCanceled?: string;
  userCanceledId?: string;
  /**
   * 过帐时间
   * @format date-time
   */
  datetimeTransfer?: string;
  userTransferId?: string;
  /**
   * 作业完成时间
   * @format date-time
   */
  datetimePicked?: string;
  userPickedId?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  userReceiptedId?: string;
  toWarehouseCode?: string;
  toWarehouseName?: string;
  /** 车间代码 */
  workshopCode?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 修改人名称 */
  modifierName?: string;
  /**
   * 修改人时间
   * @format date-time
   */
  modifiedTime?: string;
  dtls?: MaterialRequisitionExcuteDtlVO[];
  /** 单据状态名称 */
  statusName?: string;
} | null;

/** 通用响应类 */
export interface ResultListMaterialRequisitionVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MaterialRequisitionVO[] | null;
}

/** 通用响应类 */
export interface ResultMaterialRequisitionExcuteDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 提交的模型-明细信息 */
  data?: MaterialRequisitionExcuteDtlVO;
}

/** 通用响应类 */
export interface ResultMaterialRequisitionVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MaterialRequisitionVO;
}

/** 响应数据 */
export type PagingDataMaterialRequisitionVO = {
  list?: MaterialRequisitionVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMaterialRequisitionVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMaterialRequisitionVO;
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

/** 响应数据 */
export type PagingDataDeliveryDtlVO = {
  list?: DeliveryDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataDeliveryDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataDeliveryDtlVO;
}

/** 通用响应类 */
export interface ResultListDeliveryDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: DeliveryDtlVO[] | null;
}

/** 通用响应类 */
export interface ResultListBillManagementVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: BillManagementVO[] | null;
}

/** 通用响应类 */
export interface ResultListWipCompletionLabelDTO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WipCompletionLabelDTO[] | null;
}

/** 响应数据 */
export type PagingDataWipCompletionBillVO = {
  list?: WipCompletionBillVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipCompletionBillVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipCompletionBillVO;
}

/** 完工入库单据实体 */
export interface WipCompletionBillVO {
  id?: string;
  /** 单据号 */
  billNo?: string;
  /** 仓库 */
  warehouse?: string;
  /** 创建人 */
  creator?: string;
  /** 创建人（显示名称） */
  creatorDisplay?: string;
  /** 是否自己的单据 */
  self?: boolean;
}

/** 响应数据 */
export type GoodsSentOutVO = {
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
  businessCategoryId?: string;
  /** 状态 */
  status?: string;
  /**
   * 打印次数
   * @format int32
   */
  printCount?: number;
  /**
   * 最后打印时间
   * @format date-time
   */
  datetimeLastPrint?: string;
  userLastPrintId?: string;
  /**
   * 批准时间
   * @format date-time
   */
  datetimeApproved?: string;
  userApprovedId?: string;
  /**
   * 驳回时间
   * @format date-time
   */
  datetimeRejected?: string;
  userRejectedId?: string;
  /**
   * 取消时间
   * @format date-time
   */
  datetimeCanceled?: string;
  userCanceledId?: string;
  /**
   * 过帐时间
   * @format date-time
   */
  datetimeTransfer?: string;
  userTransferId?: string;
  /**
   * 作业完成时间
   * @format date-time
   */
  datetimePicked?: string;
  userPickedId?: string;
  /**
   * 接收时间
   * @format date-time
   */
  datetimeReceipted?: string;
  userReceiptedId?: string;
  /** 客户编码 */
  customerCode?: string;
  /** 客户名称 */
  customerName?: string;
  /** 创建人名称 */
  creatorName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 修改人名称 */
  modifierName?: string;
  /**
   * 修改人时间
   * @format date-time
   */
  modifiedTime?: string;
  /** 交易事务表-来源单据号 */
  sourceBillNo?: string;
  /** 交易事务表-单据号 */
  transBillNo?: string;
  dtls?: GoodsSentOutDtlVO[];
  /** 单据状态名称 */
  statusName?: string;
} | null;

/** 通用响应类 */
export interface ResultListGoodsSentOutVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: GoodsSentOutVO[] | null;
}

/** 通用响应类 */
export interface ResultGoodsSentOutVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: GoodsSentOutVO;
}

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  billInfo: {
    /**
     * No description
     *
     * @tags 单据信息表
     * @name Submit
     * @summary 根据单据ID提交单据状态
     * @request PUT:/billInfo/submit/{id}
     * @secure
     */
    submit: (id: string, data: WipCompletionLabelDTO[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/billInfo/submit/${id}`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name SaveByWipCompletionLabel
     * @summary 通过扫描标签保存完工入库单据
     * @request POST:/billInfo/saveByWipCompletionLabel
     * @secure
     */
    saveByWipCompletionLabel: (data: WipCompletionLabelDTO) =>
      http.request<ResultLong['data']>(`/api/warehouse/billInfo/saveByWipCompletionLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name Search
     * @summary 获取单据信息（通用控件使用）
     * @request POST:/billInfo/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/billInfo/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name GetWipCompletionLabelList
     * @summary 根据单据ID获取已扫入的完工入库条码
     * @request GET:/billInfo/getWipCompletionLabelList
     * @secure
     */
    getWipCompletionLabelList: (query: { id: string }) =>
      http.request<ResultListWipCompletionLabelDTO['data']>(`/api/warehouse/billInfo/getWipCompletionLabelList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name GetDraftWipCompletionBillList
     * @summary 获取未提交的完工入库单据
     * @request GET:/billInfo/getDraftWipCompletionBillList
     * @secure
     */
    getDraftWipCompletionBillList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      categoryCode: string;
      isSelf: boolean;
    }) =>
      http.request<ResultPagingDataWipCompletionBillVO['data']>(
        `/api/warehouse/billInfo/getDraftWipCompletionBillList`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name DeleteBill
     * @summary 删除入库单
     * @request DELETE:/billInfo/deleteBill
     * @secure
     */
    deleteBill: (query: { billId: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/billInfo/deleteBill`, {
        method: 'DELETE',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 单据信息表
     * @name DeleteBarcode
     * @summary 根据交易明细标签ID删除对应的明细标签
     * @request DELETE:/billInfo/deleteBarcode
     * @secure
     */
    deleteBarcode: (query: { dtlBarcodeId: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/billInfo/deleteBarcode`, {
        method: 'DELETE',
        params: query,
      }),
  },
  userWarehouseAuthority: {
    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name SaveAuthority
     * @summary 保存用户仓库权限
     * @request POST:/userWarehouseAuthority/saveAuthority
     * @secure
     */
    saveAuthority: (data: UserWarehouseAuthoritySearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/userWarehouseAuthority/saveAuthority`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name RemoveBatch
     * @summary 删除仓库权限
     * @request POST:/userWarehouseAuthority/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/userWarehouseAuthority/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name SearchAuth
     * @request POST:/userWarehouseAuthority/itemsAuth
     * @secure
     */
    searchAuth: (data: CommonSearch) =>
      http.request<ResultPagingDataWarehouse['data']>(`/api/warehouse/userWarehouseAuthority/itemsAuth`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name GetUserWarehouseByUser
     * @summary 获取登录用户仓库权限-满足仓库转移规则
     * @request POST:/userWarehouseAuthority/getUserWarehouseByUser
     * @secure
     */
    getUserWarehouseByUser: (data: UserWarehouseSearch) =>
      http.request<ResultListUserWarehouseVO['data']>(`/api/warehouse/userWarehouseAuthority/getUserWarehouseByUser`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name GetOdiUserWarehouseByUser
     * @summary 获取登录用户仓库权限-满足仓库转移规则入库
     * @request POST:/userWarehouseAuthority/getODIUserWarehouseByUser
     * @secure
     */
    getOdiUserWarehouseByUser: (data: UserWarehouseSearch) =>
      http.request<ResultListUserWarehouseVO['data']>(
        `/api/warehouse/userWarehouseAuthority/getODIUserWarehouseByUser`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name GetList
     * @summary 获得页面数据
     * @request POST:/userWarehouseAuthority/getList
     * @secure
     */
    getList: (data: UserWarehouseAuthoritySearch) =>
      http.request<ResultPagingDataUserWarehouseAuthorityVO['data']>(`/api/warehouse/userWarehouseAuthority/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 用户仓库权限表
     * @name GetUserAuthority
     * @summary 获得该用户所拥有的仓库权限
     * @request GET:/userWarehouseAuthority/getUserAuthority
     * @secure
     */
    getUserAuthority: (query: { userId: string }) =>
      http.request<ResultListLong['data']>(`/api/warehouse/userWarehouseAuthority/getUserAuthority`, {
        method: 'GET',
        params: query,
      }),
  },
  transferHead: {
    /**
     * No description
     *
     * @tags 交易单头表
     * @name GetMiscellaneousList
     * @summary 获取杂项管理主表
     * @request POST:/transferHead/getMiscellaneousList
     * @secure
     */
    getMiscellaneousList: (data: MiscellaneousManageSearch) =>
      http.request<ResultPagingDataMiscellaneousManageVO['data']>(`/api/warehouse/transferHead/getMiscellaneousList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  transferDtlBarcode: {
    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name SetStateToDown
     * @summary 禁用杂项管理物料标签
     * @request POST:/transferDtlBarcode/setStateToDown
     * @secure
     */
    setStateToDown: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/transferDtlBarcode/setStateToDown`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name GetTransferDtlBarcode
     * @summary 获取标签扫描信息
     * @request POST:/transferDtlBarcode/getTransferDtlBarcode
     * @secure
     */
    getTransferDtlBarcode: (data: TransferDtlBarcodeSearch) =>
      http.request<ResultListTransferDtlBarcodeVO['data']>(`/api/warehouse/transferDtlBarcode/getTransferDtlBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name GetTransferDtlBarcodeByMm
     * @summary 获取杂项管理标签信息
     * @request POST:/transferDtlBarcode/getTransferDtlBarcodeByMM
     * @secure
     */
    getTransferDtlBarcodeByMm: (data: string) =>
      http.request<ResultListLabelVO['data']>(`/api/warehouse/transferDtlBarcode/getTransferDtlBarcodeByMM`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name GetQcHoldLabelList
     * @summary 标签列表-应用于品质控制查询-仅工单领料类型
     * @request POST:/transferDtlBarcode/getQcHoldLabelList
     * @secure
     */
    getQcHoldLabelList: (data: LabelQcHoldSearch) =>
      http.request<ResultPagingDataLabelQcHoldVO['data']>(`/api/warehouse/transferDtlBarcode/getQcHoldLabelList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name SelectByLabelNoOrBillNo
     * @summary 物料标签或杂项单据扫描获取单据信息
     * @request GET:/transferDtlBarcode/selectByLabelNo
     * @secure
     */
    selectByLabelNoOrBillNo: (query: { key: string }) =>
      http.request<ResultTransferHeadVO['data']>(`/api/warehouse/transferDtlBarcode/selectByLabelNo`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name GetQtyByBillNo
     * @summary 根据单据号获取标签数量
     * @request GET:/transferDtlBarcode/getQtyByBillNo
     * @secure
     */
    getQtyByBillNo: (query: { BillNo: string }) =>
      http.request<ResultBigDecimal['data']>(`/api/warehouse/transferDtlBarcode/getQtyByBillNo`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 交易明细标签表
     * @name GetNameByBillNo
     * @summary 根据单据号获取标签名称
     * @request GET:/transferDtlBarcode/getNameByBillNo
     * @secure
     */
    getNameByBillNo: (query: { BillNo: string }) =>
      http.request<ResultString['data']>(`/api/warehouse/transferDtlBarcode/getNameByBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
  transferDtl: {
    /**
     * No description
     *
     * @tags 交易单身表
     * @name GetTransferStockInOutList
     * @summary 关键物料追溯报表-出入库信息
     * @request POST:/transferDtl/getTransferStockInOutList
     * @secure
     */
    getTransferStockInOutList: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataTransferStockInOutVO['data']>(
        `/api/warehouse/transferDtl/getTransferStockInOutList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 交易单身表
     * @name GetById
     * @request POST:/transferDtl/getById
     * @secure
     */
    getById: (data: string) =>
      http.request<ResultTransferDtl['data']>(`/api/warehouse/transferDtl/getById`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易单身表
     * @name ConfirmBillNoMm
     * @summary 杂项管理单据确认
     * @request POST:/transferDtl/confirmBillNoMM
     * @secure
     */
    confirmBillNoMm: (data: TransferHeadConfirmSubmit) =>
      http.request<ResultObject['data']>(`/api/warehouse/transferDtl/confirmBillNoMM`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易单身表
     * @name ChangLocIdByDtl
     * @request POST:/transferDtl/changLocIdByDtl
     * @secure
     */
    changLocIdByDtl: (data: LabelMMSearch) =>
      http.request<Result['data']>(`/api/warehouse/transferDtl/changLocIdByDtl`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易单身表
     * @name BatchDelDtlByMm
     * @summary 杂项管理批量删出明细
     * @request POST:/transferDtl/batchDelDtlByMM
     * @secure
     */
    batchDelDtlByMm: (data: string[]) =>
      http.request<Result['data']>(`/api/warehouse/transferDtl/batchDelDtlByMM`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 交易单身表
     * @name AddDtlByMitem
     * @request POST:/transferDtl/addDtlByMitem
     * @secure
     */
    addDtlByMitem: (data: TransferHeadConfirmSubmit) =>
      http.request<ResultTransferHeadVO['data']>(`/api/warehouse/transferDtl/addDtlByMitem`, {
        method: 'POST',
        body: data as any,
      }),
  },
  transferConstraint: {
    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name RemoveBatch
     * @summary 删除仓库转移规则
     * @request POST:/transferConstraint/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/transferConstraint/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name ModifyTransferConstraint
     * @summary 编辑仓库转移规则
     * @request POST:/transferConstraint/modifyTransferConstraint
     * @secure
     */
    modifyTransferConstraint: (data: TransferConstraint) =>
      http.request<ResultObject['data']>(`/api/warehouse/transferConstraint/modifyTransferConstraint`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name GetList
     * @summary 获取主界面数据
     * @request POST:/transferConstraint/getList
     * @secure
     */
    getList: (data: TransferConstraintSearch) =>
      http.request<ResultPagingDataTransferConstraintVO['data']>(`/api/warehouse/transferConstraint/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name AddTransferConstraint
     * @summary 新增仓库转移规则
     * @request POST:/transferConstraint/addTransferConstraint
     * @secure
     */
    addTransferConstraint: (data: TransferConstraint) =>
      http.request<ResultObject['data']>(`/api/warehouse/transferConstraint/addTransferConstraint`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name GetWarehouses
     * @summary 根据组织获得仓库（新增编辑界面下拉）
     * @request GET:/transferConstraint/getWarehouses
     * @secure
     */
    getWarehouses: (query: { id: string }) =>
      http.request<ResultListWarehouse['data']>(`/api/warehouse/transferConstraint/getWarehouses`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name GetOrgs
     * @summary 获取该用户有权限的所有组织（新增编辑界面下拉）
     * @request GET:/transferConstraint/getOrgs
     * @secure
     */
    getOrgs: () =>
      http.request<ResultListOrg['data']>(`/api/warehouse/transferConstraint/getOrgs`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 仓库移转约束表
     * @name GetCurrentOrg
     * @summary 获取该用户当前组织
     * @request GET:/transferConstraint/getCurrentOrg
     * @secure
     */
    getCurrentOrg: () =>
      http.request<ResultListOrg['data']>(`/api/warehouse/transferConstraint/getCurrentOrg`, {
        method: 'GET',
      }),
  },
  storageAgeQuery: {
    /**
     * No description
     *
     * @tags 库龄查询
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/storageAgeQuery/getList
     * @secure
     */
    getList: (data: StorageAgeQuerySearch) =>
      http.request<ResultPagingDataStorageAgeQueryVO['data']>(`/api/warehouse/storageAgeQuery/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 库龄查询
     * @name GetDtl
     * @summary 查询标签明细数据
     * @request GET:/storageAgeQuery/getDtl
     * @secure
     */
    getDtl: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      onhandId: string;
    }) =>
      http.request<ResultPagingDataStorageAgeQueryVO['data']>(`/api/warehouse/storageAgeQuery/getDtl`, {
        method: 'GET',
        params: query,
      }),
  },
  stockCheckBillDtl: {
    /**
     * No description
     *
     * @tags 盘点单据明细表
     * @name ScanLabelNoOrMitemCode
     * @summary 校验标签或物料编码
     * @request POST:/stockCheckBillDtl/scanLabelNoOrMitemCode
     * @secure
     */
    scanLabelNoOrMitemCode: (data: StockCheckBillExecuteSearch) =>
      http.request<ResultStockCheckBillExecuteVO['data']>(`/api/warehouse/stockCheckBillDtl/scanLabelNoOrMitemCode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据明细表
     * @name SacnLocCode
     * @summary 盘点执行扫描货位编码
     * @request POST:/stockCheckBillDtl/sacnLocCode
     * @secure
     */
    sacnLocCode: (data: StockCheckBillExecuteSearch) =>
      http.request<ResultListStockCheckBillExecuteSubVO['data']>(`/api/warehouse/stockCheckBillDtl/sacnLocCode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据明细表
     * @name GetStockCheckBillDtlByScan
     * @summary 扫描盘点单号获取详情信息
     * @request POST:/stockCheckBillDtl/getStockCheckBillDtlByScan
     * @secure
     */
    getStockCheckBillDtlByScan: (data: StockCheckBillExecuteSearch) =>
      http.request<ResultStockCheckBillExecuteVO['data']>(
        `/api/warehouse/stockCheckBillDtl/getStockCheckBillDtlByScan`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 盘点单据明细表
     * @name GetStockCheckBillDtlByBillNo
     * @summary 根据盘点单号获取详情信息
     * @request POST:/stockCheckBillDtl/getStockCheckBillDtlByBillNo
     * @secure
     */
    getStockCheckBillDtlByBillNo: (data: StockCheckBillExecuteSearch) =>
      http.request<ResultListStockCheckBillExecuteSubVO['data']>(
        `/api/warehouse/stockCheckBillDtl/getStockCheckBillDtlByBillNo`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 盘点单据明细表
     * @name GetById
     * @request POST:/stockCheckBillDtl/getById
     * @secure
     */
    getById: (data: string) =>
      http.request<ResultStockCheckBillDtl['data']>(`/api/warehouse/stockCheckBillDtl/getById`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据明细表
     * @name ChangeCheckQtyByDtlId
     * @summary 更改实盘数
     * @request POST:/stockCheckBillDtl/changeCheckQtyByDtlId
     * @secure
     */
    changeCheckQtyByDtlId: (data: StockCheckBillExecuteSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBillDtl/changeCheckQtyByDtlId`, {
        method: 'POST',
        body: data as any,
      }),
  },
  stockCheckBillBarcode: {
    /**
     * No description
     *
     * @tags 盘点单据标签表
     * @name SetStateToDown
     * @summary 删除盘点执行物料标签
     * @request POST:/stockCheckBillBarcode/setStateToDown
     * @secure
     */
    setStateToDown: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBillBarcode/setStateToDown`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据标签表
     * @name GetBarcodeByBillDtlId
     * @summary 根据详情id获取标签
     * @request GET:/stockCheckBillBarcode/getBarcodeByBillDtlId
     * @secure
     */
    getBarcodeByBillDtlId: (query: { dtlId: string }) =>
      http.request<ResultListStockCheckBillExecuteBarcodeVO['data']>(
        `/api/warehouse/stockCheckBillBarcode/getBarcodeByBillDtlId`,
        {
          method: 'GET',
          params: query,
        },
      ),
  },
  stockCheckBill: {
    /**
     * No description
     *
     * @tags 盘点单据表
     * @name StockCheckFinish
     * @summary 盘点完成操作
     * @request POST:/stockCheckBill/stockCheckFinish
     * @secure
     */
    stockCheckFinish: (query: { billId: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/stockCheckFinish`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name StockCheckClose
     * @summary 关闭单据操作
     * @request POST:/stockCheckBill/stockCheckClose
     * @secure
     */
    stockCheckClose: (query: { billId: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/stockCheckClose`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name ScrappedBill
     * @summary 作废单据操作
     * @request POST:/stockCheckBill/scrappedBill
     * @secure
     */
    scrappedBill: (query: { billId: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/scrappedBill`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name Save
     * @summary 保存操作
     * @request POST:/stockCheckBill/save
     * @secure
     */
    save: (data: StockCheckBillSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/save`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name RemoveBatch
     * @summary 删除库存记录
     * @request POST:/stockCheckBill/removeBatch
     * @secure
     */
    removeBatch: (data: StockCheckBillSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetPdList
     * @summary 查询主界面盘点单据
     * @request POST:/stockCheckBill/getPDList
     * @secure
     */
    getPdList: (data: StockCheckBillSearch) =>
      http.request<ResultPagingDataStockCheckBillVO['data']>(`/api/warehouse/stockCheckBill/getPDList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetOnHand
     * @summary 新增界面查询库存现有量
     * @request POST:/stockCheckBill/getOnHand
     * @secure
     */
    getOnHand: (data: StockCheckBillSearch) =>
      http.request<ResultPagingDataStockCheckBillVO['data']>(`/api/warehouse/stockCheckBill/getOnHand`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name Adjustment
     * @summary 差异调整操作
     * @request POST:/stockCheckBill/adjustment
     * @secure
     */
    adjustment: (data: StockCheckBillSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/adjustment`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name AddPd
     * @summary 新增盘点单据
     * @request POST:/stockCheckBill/addPD
     * @secure
     */
    addPd: (data: StockCheckBillSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/stockCheckBill/addPD`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetWarehouse
     * @summary 获取有权限的仓库（下拉）
     * @request GET:/stockCheckBill/getWarehouse
     * @secure
     */
    getWarehouse: () =>
      http.request<ResultListWarehouse['data']>(`/api/warehouse/stockCheckBill/getWarehouse`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetStockCheckByUser
     * @summary 根据用户获取盘点单信息
     * @request GET:/stockCheckBill/getStockCheckByUser
     * @secure
     */
    getStockCheckByUser: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
    }) =>
      http.request<ResultPagingDataStockCheckBillExecuteVO['data']>(
        `/api/warehouse/stockCheckBill/getStockCheckByUser`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetLocation
     * @summary 获取所选货区的货位（下拉）
     * @request GET:/stockCheckBill/getLocation
     * @secure
     */
    getLocation: (query: { districtId: string }) =>
      http.request<ResultListLocation['data']>(`/api/warehouse/stockCheckBill/getLocation`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetDtlList
     * @summary 查询主界面盘点明细
     * @request GET:/stockCheckBill/getDtlList
     * @secure
     */
    getDtlList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      billId: string;
    }) =>
      http.request<ResultPagingDataStockCheckBillVO['data']>(`/api/warehouse/stockCheckBill/getDtlList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetDistrict
     * @summary 获取所选仓库的货区（下拉）
     * @request GET:/stockCheckBill/getDistrict
     * @secure
     */
    getDistrict: (query: { warehouseId: string }) =>
      http.request<ResultListDistrict['data']>(`/api/warehouse/stockCheckBill/getDistrict`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name GetBarcodes
     * @summary 获得标签明细记录
     * @request GET:/stockCheckBill/getBarcodes
     * @secure
     */
    getBarcodes: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      dtlId: string;
    }) =>
      http.request<ResultPagingDataStockCheckBillVO['data']>(`/api/warehouse/stockCheckBill/getBarcodes`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 盘点单据表
     * @name ConfirmBillNo
     * @summary 盘点单据确认
     * @request GET:/stockCheckBill/confirmBillNo
     * @secure
     */
    confirmBillNo: (query: { billNo: string }) =>
      http.request<ResultPagingDataStockCheckBillExecuteVO['data']>(`/api/warehouse/stockCheckBill/confirmBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
  saleOrderDtl: {
    /**
     * No description
     *
     * @tags 销售订单明细表
     * @name GetSaleOrderDtlList
     * @summary 获取销售订单明细
     * @request POST:/saleOrderDtl/getSaleOrderDtlList
     * @secure
     */
    getSaleOrderDtlList: (data: SaleOrderSearch) =>
      http.request<ResultPagingDataSaleOrderDtlVO['data']>(`/api/warehouse/saleOrderDtl/getSaleOrderDtlList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  saleOrder: {
    /**
     * No description
     *
     * @tags 销售订单表
     * @name Search
     * @summary 获取销售订单(业务组件)
     * @request POST:/saleOrder/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataSaleOrderVO['data']>(`/api/warehouse/saleOrder/items`, {
        method: 'POST',
        body: data as any,
      }),
  },
  saleDeliveryDtl: {
    /**
     * No description
     *
     * @tags 发货单明细表
     * @name GetSalesDeliveryDtlList
     * @summary 查询销售发货单
     * @request POST:/saleDeliveryDtl/getSalesDeliveryDtlList
     * @secure
     */
    getSalesDeliveryDtlList: (data: SaleDeliveryDtlSearch) =>
      http.request<ResultPagingDataSaleDeliveryDtlVO['data']>(
        `/api/warehouse/saleDeliveryDtl/getSalesDeliveryDtlList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),
  },
  saleDelivery: {
    /**
     * No description
     *
     * @tags 销售发货
     * @name UpdateBillNoByCancelled
     * @summary 单据作废
     * @request POST:/saleDelivery/updateBillNoByCancelled
     * @secure
     */
    updateBillNoByCancelled: (data: SaleDeliveryVO) =>
      http.request<ResultObject['data']>(`/api/warehouse/saleDelivery/updateBillNoByCancelled`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 销售发货
     * @name SubmitSalesDelivery
     * @summary 获取销售发货单
     * @request POST:/saleDelivery/submitSalesDelivery
     * @secure
     */
    submitSalesDelivery: (data: SaleDeliverySubmitVO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/saleDelivery/submitSalesDelivery`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 销售发货
     * @name GetSalesDeliveryList
     * @summary 查询销售发货单
     * @request POST:/saleDelivery/getSalesDeliveryList
     * @secure
     */
    getSalesDeliveryList: (data: SaleDeliverySearch) =>
      http.request<ResultPagingDataSaleDeliveryVO['data']>(`/api/warehouse/saleDelivery/getSalesDeliveryList`, {
        method: 'POST',
        body: data as any,
      }),
  },
  returnManagement: {
    /**
     * No description
     *
     * @tags 退货管理
     * @name UpdateBillStatusByCanceled
     * @summary 查询退货单
     * @request POST:/returnManagement/updateBillStatusByCanceled
     * @secure
     */
    updateBillStatusByCanceled: (data: string[]) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/returnManagement/updateBillStatusByCanceled`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name SubmitPurchaseReturnt
     * @summary 提交PR单据
     * @request POST:/returnManagement/submitPurchaseReturnt
     * @secure
     */
    submitPurchaseReturnt: (data: ReturnStockOutSearch) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/returnManagement/submitPurchaseReturnt`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name SubmitBillNoByPurchaseOrder
     * @summary 退货单提交（采购单）
     * @request POST:/returnManagement/submitBillNoByPurchaseOrder
     * @secure
     */
    submitBillNoByPurchaseOrder: (data: ReturnManagementVO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/returnManagement/submitBillNoByPurchaseOrder`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name SubmitBillNoByDelivery
     * @summary 退货单提交（送货单）
     * @request POST:/returnManagement/submitBillNoByDelivery
     * @secure
     */
    submitBillNoByDelivery: (data: ReturnManagementVO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/returnManagement/submitBillNoByDelivery`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name ScanMitemLabel
     * @summary 扫描退货单物料标签
     * @request POST:/returnManagement/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (data: ReturnStockOutSearch) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/returnManagement/scanMitemLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name GetReturnStockOutBillList
     * @summary 查询退货单接收日志
     * @request POST:/returnManagement/getReturnStockOutBillList
     * @secure
     */
    getReturnStockOutBillList: (data: ReturnManagementSearch) =>
      http.request<ResultPagingDataTransferHeadVO['data']>(
        `/api/warehouse/returnManagement/getReturnStockOutBillList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 退货管理
     * @name GetReturnManagementList
     * @summary 查询退货单
     * @request POST:/returnManagement/getReturnManagementList
     * @secure
     */
    getReturnManagementList: (data: ReturnManagementSearch) =>
      http.request<ResultPagingDataTransferHeadVO['data']>(`/api/warehouse/returnManagement/getReturnManagementList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name GetRerurnStockOut
     * @summary 扫描退货单
     * @request POST:/returnManagement/getRerurnStockOut
     * @secure
     */
    getRerurnStockOut: (query: { billNo: string }) =>
      http.request<ResultReturnStockOutHeadVO['data']>(`/api/warehouse/returnManagement/getRerurnStockOut`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 退货管理
     * @name GetPurchaseOrderReturnManagementByBillNo
     * @summary 获取已勾选的采购单
     * @request POST:/returnManagement/getPurchaseOrderReturnManagementByBillNo
     * @secure
     */
    getPurchaseOrderReturnManagementByBillNo: (query: { billNo: string }) =>
      http.request<ResultReturnManagementVO['data']>(
        `/api/warehouse/returnManagement/getPurchaseOrderReturnManagementByBillNo`,
        {
          method: 'POST',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 退货管理
     * @name GetDeliveryReturnManagementByBillNo
     * @summary 获取已勾选的送货单
     * @request POST:/returnManagement/getDeliveryReturnManagementByBillNo
     * @secure
     */
    getDeliveryReturnManagementByBillNo: (query: { billNo: string }) =>
      http.request<ResultReturnManagementVO['data']>(
        `/api/warehouse/returnManagement/getDeliveryReturnManagementByBillNo`,
        {
          method: 'POST',
          params: query,
        },
      ),
  },
  purchaseOrder: {
    /**
     * No description
     *
     * @tags 采购单表
     * @name SubmitMitemReceipt
     * @summary 提交来料接收单
     * @request POST:/purchaseOrder/submitMitemReceipt
     * @secure
     */
    submitMitemReceipt: (data: PurchaseOrderSearch) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/purchaseOrder/submitMitemReceipt`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 采购单表
     * @name ScanMitemLabel
     * @summary 扫描物料标签
     * @request POST:/purchaseOrder/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (data: PurchaseOrderSearch) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/purchaseOrder/scanMitemLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 采购单表
     * @name Search
     * @summary 获取采购单(业务组件)
     * @request POST:/purchaseOrder/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataPurchaseOrderVO['data']>(`/api/warehouse/purchaseOrder/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 采购单表
     * @name BatchSubmitMitemReceipt
     * @summary 批量提交
     * @request POST:/purchaseOrder/batchSubmitMitemReceipt
     * @secure
     */
    batchSubmitMitemReceipt: (data: PurchaseOrderBatchSubmit) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/purchaseOrder/batchSubmitMitemReceipt`, {
        method: 'POST',
        body: data as any,
      }),
  },
  onhandQty: {
    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/onhandQty/getList
     * @secure
     */
    getList: (data: OnhandQtySearch) =>
      http.request<ResultPagingDataOnhandQtyVO['data']>(`/api/warehouse/onhandQty/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetWarehouse
     * @summary 获取有权限的仓库（下拉）
     * @request GET:/onhandQty/getWarehouse
     * @secure
     */
    getWarehouse: () =>
      http.request<ResultListWarehouse['data']>(`/api/warehouse/onhandQty/getWarehouse`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetMitemOnhandQty
     * @summary 获取物料库存数量
     * @request GET:/onhandQty/getMitemOnhandQty
     * @secure
     */
    getMitemOnhandQty: (query: { warehouseId: string; locationId: string; mitemId: string }) =>
      http.request<ResultBigDecimal['data']>(`/api/warehouse/onhandQty/getMitemOnhandQty`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetMitemOnhandQtyByWarehouse
     * @summary 获取物料库存数量
     * @request GET:/onhandQty/getMitemOnhandQtyByWarehouse
     * @secure
     */
    getMitemOnhandQtyByWarehouse: (query: { warehouseId: string; mitemId: string }) =>
      http.request<ResultSaleDeliveryOnhandQtyVO['data']>(`/api/warehouse/onhandQty/getMitemOnhandQtyByWarehouse`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetMitemOnhandQtyByWarehouseAndDistrict
     * @summary 获取物料库存数量
     * @request GET:/onhandQty/getMitemOnhandQtyByWarehouseAndDistrict
     * @secure
     */
    getMitemOnhandQtyByWarehouseAndDistrict: (query: { warehouseId: string; districtId: string; mitemId: string }) =>
      http.request<ResultBigDecimal['data']>(`/api/warehouse/onhandQty/getMitemOnhandQtyByWarehouseAndDistrict`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetLocation
     * @summary 获取所选货区的货位（下拉）
     * @request GET:/onhandQty/getLocation
     * @secure
     */
    getLocation: (query: { districtId: string }) =>
      http.request<ResultListLocation['data']>(`/api/warehouse/onhandQty/getLocation`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetDtl
     * @summary 查询明细数据
     * @request GET:/onhandQty/getDtl
     * @secure
     */
    getDtl: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      id: string;
    }) =>
      http.request<ResultPagingDataOnhandQtyDtlVO['data']>(`/api/warehouse/onhandQty/getDtl`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 库存现有量表
     * @name GetDistrict
     * @summary 获取所选仓库的货区（下拉）
     * @request GET:/onhandQty/getDistrict
     * @secure
     */
    getDistrict: (query: { warehouseId: string }) =>
      http.request<ResultListDistrict['data']>(`/api/warehouse/onhandQty/getDistrict`, {
        method: 'GET',
        params: query,
      }),
  },
  moReturnMaterial: {
    /**
     * No description
     *
     * @tags 工单退料
     * @name Submit
     * @summary 工单退料-提交
     * @request POST:/moReturnMaterial/submit
     * @secure
     */
    submit: (data: MoIssuanceDTO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/moReturnMaterial/submit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单退料
     * @name ScanMitemLabel
     * @summary 扫描物料标签
     * @request POST:/moReturnMaterial/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (data: MoIssuanceDTO) =>
      http.request<ResultString['data']>(`/api/warehouse/moReturnMaterial/scanMitemLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单退料
     * @name GetMoReturnMaterialList
     * @summary 工单退料-获取退料制单列表
     * @request GET:/moReturnMaterial/getMoReturnMaterialList
     * @secure
     */
    getMoReturnMaterialList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      billNo: string;
    }) =>
      http.request<ResultListMoIssuanceVO['data']>(`/api/warehouse/moReturnMaterial/getMoReturnMaterialList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 工单退料
     * @name GetMoReturnMaterialByBillNo
     * @summary 工单退料-根据单据号获取退料单
     * @request GET:/moReturnMaterial/getMoReturnMaterialByBillNo
     * @secure
     */
    getMoReturnMaterialByBillNo: (query: { billNo: string; moScheId: string; queryType: string }) =>
      http.request<ResultMoIssuanceVO['data']>(`/api/warehouse/moReturnMaterial/getMoReturnMaterialByBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
  moIssuance: {
    /**
     * No description
     *
     * @tags 工单发料
     * @name Submit
     * @summary 工单发料-提交
     * @request POST:/moIssuance/submit
     * @secure
     */
    submit: (data: MoIssuanceDTO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/moIssuance/submit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单发料
     * @name ScanMitemLabel
     * @summary 扫描物料标签
     * @request POST:/moIssuance/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (data: MoIssuanceDTO) =>
      http.request<ResultString['data']>(`/api/warehouse/moIssuance/scanMitemLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工单发料
     * @name GetMoIssuanceList
     * @summary 工单发料-获取领料制单列表
     * @request GET:/moIssuance/getMoIssuanceList
     * @secure
     */
    getMoIssuanceList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      billNo: string;
    }) =>
      http.request<ResultListMoIssuanceVO['data']>(`/api/warehouse/moIssuance/getMoIssuanceList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 工单发料
     * @name GetMoIssuanceByBillNo
     * @summary 工单发料-根据单据号获取领料单
     * @request GET:/moIssuance/getMoIssuanceByBillNo
     * @secure
     */
    getMoIssuanceByBillNo: (query: { billNo: string; moScheId: string; queryType: string }) =>
      http.request<ResultMoIssuanceVO['data']>(`/api/warehouse/moIssuance/getMoIssuanceByBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
  mitemShelflifeReport: {
    /**
     * No description
     *
     * @tags 物料保质期报表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/mitemShelflifeReport/getList
     * @secure
     */
    getList: (data: MitemShelflifeReportSearch) =>
      http.request<ResultPagingDataMitemShelflifeReportVO['data']>(`/api/warehouse/mitemShelflifeReport/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料保质期报表
     * @name GetDtl
     * @summary 查询标签明细数据
     * @request GET:/mitemShelflifeReport/getDtl
     * @secure
     */
    getDtl: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      onhandId: string;
      lotNo: string;
      receiveNo: string;
    }) =>
      http.request<ResultPagingDataMitemShelflifeReportVO['data']>(`/api/warehouse/mitemShelflifeReport/getDtl`, {
        method: 'GET',
        params: query,
      }),
  },
  mitemPut: {
    /**
     * No description
     *
     * @tags 收货上架
     * @name SubmitMitemPut
     * @summary 物料上架
     * @request POST:/mitemPut/submitMitemPut
     * @secure
     */
    submitMitemPut: (data: MitemPutVO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/mitemPut/submitMitemPut`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 收货上架
     * @name ScanMitemLabel
     * @summary 扫描物料标签
     * @request POST:/mitemPut/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (data: MitemPutVO) =>
      http.request<ResultLabelVO['data']>(`/api/warehouse/mitemPut/scanMitemLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 收货上架
     * @name ScanLocationLabel
     * @summary 扫描货位
     * @request POST:/mitemPut/scanLocationLabel
     * @secure
     */
    scanLocationLabel: (data: MitemPutVO) =>
      http.request<ResultLocationVO['data']>(`/api/warehouse/mitemPut/scanLocationLabel`, {
        method: 'POST',
        body: data as any,
      }),
  },
  materialRequisitionExcute: {
    /**
     * No description
     *
     * @tags 领料执行
     * @name Submit
     * @summary 领料执行-提交
     * @request POST:/materialRequisitionExcute/submit
     * @secure
     */
    submit: (data: MaterialRequisitionExcuteDTO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/materialRequisitionExcute/submit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料执行
     * @name ScanMitemLabel
     * @summary 扫描物料标签
     * @request GET:/materialRequisitionExcute/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (query: {
      billNo: string;
      tranDtlId: string;
      labelNo: string;
      /** @format int32 */
      isFifo: number;
    }) =>
      http.request<ResultString['data']>(`/api/warehouse/materialRequisitionExcute/scanMitemLabel`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 领料执行
     * @name GetMaterialRequisitionList
     * @summary 领料执行-获取领料制单列表
     * @request GET:/materialRequisitionExcute/getMaterialRequisitionList
     * @secure
     */
    getMaterialRequisitionList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      billNo: string;
    }) =>
      http.request<ResultListMaterialRequisitionVO['data']>(
        `/api/warehouse/materialRequisitionExcute/getMaterialRequisitionList`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 领料执行
     * @name GetMaterialRequisitionDtl
     * @summary 领料执行-获取领料单明细列表行信息
     * @request GET:/materialRequisitionExcute/getMaterialRequisitionDtl
     * @secure
     */
    getMaterialRequisitionDtl: (query: { billNo: string; trandtlId: string }) =>
      http.request<ResultMaterialRequisitionExcuteDtlVO['data']>(
        `/api/warehouse/materialRequisitionExcute/getMaterialRequisitionDtl`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 领料执行
     * @name GetMaterialRequisitionByBillNo
     * @summary 领料执行-根据单据号获取领料单
     * @request GET:/materialRequisitionExcute/getMaterialRequisitionByBillNo
     * @secure
     */
    getMaterialRequisitionByBillNo: (query: { billNo: string; isNeedCheck: boolean }) =>
      http.request<ResultMaterialRequisitionVO['data']>(
        `/api/warehouse/materialRequisitionExcute/getMaterialRequisitionByBillNo`,
        {
          method: 'GET',
          params: query,
        },
      ),
  },
  materialRequisition: {
    /**
     * No description
     *
     * @tags 领料制单
     * @name SaveData
     * @summary 新增领料单界面-提交
     * @request POST:/materialRequisition/saveData
     * @secure
     */
    saveData: (data: MaterialRequisitionDTO) =>
      http.request<ResultObject['data']>(`/api/warehouse/materialRequisition/saveData`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name MaterialRequisitionCanceled
     * @summary 主界面-领料单作废
     * @request POST:/materialRequisition/materialRequisitionCanceled
     * @secure
     */
    materialRequisitionCanceled: (data: MaterialRequisitionDTO) =>
      http.request<ResultObject['data']>(`/api/warehouse/materialRequisition/materialRequisitionCanceled`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name GetReqDtls
     * @summary 新增领料单界面-获取领料明细
     * @request POST:/materialRequisition/getReqDtls
     * @secure
     */
    getReqDtls: (data: MaterialRequisitionDTO) =>
      http.request<ResultListMaterialRequisitionDtlVO['data']>(`/api/warehouse/materialRequisition/getReqDtls`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name GetOnHandList
     * @summary 获取仓库物料的库存信息-支持批量查询
     * @request POST:/materialRequisition/getOnHandList
     * @secure
     */
    getOnHandList: (data: OnHandVO) =>
      http.request<ResultListOnHandVO['data']>(`/api/warehouse/materialRequisition/getOnHandList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name GetOnHandInfo
     * @summary 获取仓库物料的库存信息-单笔查询(多维度)
     * @request POST:/materialRequisition/getOnHandInfo
     * @secure
     */
    getOnHandInfo: (data: OnHandVO) =>
      http.request<ResultOnHandVO['data']>(`/api/warehouse/materialRequisition/getOnHandInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name GetCommandReqDtls
     * @summary 配送指令新增领料单界面-获取领料明细
     * @request POST:/materialRequisition/getCommandReqDtls
     * @secure
     */
    getCommandReqDtls: (data: MaterialRequisitionDTO) =>
      http.request<ResultListMaterialRequisitionDtlVO['data']>(`/api/warehouse/materialRequisition/getCommandReqDtls`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name GetAlreadyReqInfo
     * @summary 新增领料单界面-获取领料明细
     * @request POST:/materialRequisition/getAlreadyReqInfo
     * @secure
     */
    getAlreadyReqInfo: (data: MaterialRequisitionDTO) =>
      http.request<ResultListAlreadyRequisitionVO['data']>(`/api/warehouse/materialRequisition/getAlreadyReqInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name Tree
     * @summary 主界面-获取领料单明细
     * @request GET:/materialRequisition/tree
     * @secure
     */
    tree: (query: { billNo: string }) =>
      http.request<ResultListMaterialRequisitionDtlVO['data']>(`/api/warehouse/materialRequisition/tree`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 领料制单
     * @name GetMaterialRequisitionList
     * @summary 主界面-获取领料制单列表
     * @request GET:/materialRequisition/getMaterialRequisitionList
     * @secure
     */
    getMaterialRequisitionList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      billNo: string;
      workshopCode: string;
      statusList: string;
      /** @default "" */
      datetimeStart?: string;
      /** @default "" */
      datetimeEnd?: string;
      moCodeList: string;
    }) =>
      http.request<ResultPagingDataMaterialRequisitionVO['data']>(
        `/api/warehouse/materialRequisition/getMaterialRequisitionList`,
        {
          method: 'GET',
          params: query,
        },
      ),
  },
  location: {
    /**
     * No description
     *
     * @tags 货位
     * @name RemoveLocation
     * @summary 删除货区
     * @request POST:/location/removeLocation
     * @secure
     */
    removeLocation: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/location/removeLocation`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name ModifyLocation
     * @summary 编辑货区
     * @request POST:/location/modifyLocation
     * @secure
     */
    modifyLocation: (data: Location) =>
      http.request<ResultObject['data']>(`/api/warehouse/location/modifyLocation`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name Search
     * @request POST:/location/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/location/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetItemById
     * @request POST:/location/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultLocation['data']>(`/api/warehouse/location/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetLocationByWarehouse
     * @summary 根据仓库获取货位
     * @request POST:/location/getLocationByWarehouse
     * @secure
     */
    getLocationByWarehouse: (data: string) =>
      http.request<ResultListLocationVO['data']>(`/api/warehouse/location/getLocationByWarehouse`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetLocationByCode
     * @request POST:/location/getLocationByCode
     * @secure
     */
    getLocationByCode: (query: { code: string }) =>
      http.request<ResultLocationVO['data']>(`/api/warehouse/location/getLocationByCode`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetList
     * @summary 查询货位
     * @request POST:/location/getList
     * @secure
     */
    getList: (data: LocationSearch) =>
      http.request<ResultPagingDataLocationVO['data']>(`/api/warehouse/location/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name AddLocation
     * @summary 新增货位
     * @request POST:/location/addLocation
     * @secure
     */
    addLocation: (data: Location) =>
      http.request<ResultObject['data']>(`/api/warehouse/location/addLocation`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetNameById
     * @summary 根据ID获得名称
     * @request GET:/location/getNameById
     * @secure
     */
    getNameById: (query: { id: string }) =>
      http.request<ResultString['data']>(`/api/warehouse/location/getNameById`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 货位
     * @name GetDistrict
     * @summary 获取所选仓库的货区（下拉）
     * @request GET:/location/getDistrict
     * @secure
     */
    getDistrict: (query: { warehouseId: string }) =>
      http.request<ResultListDistrict['data']>(`/api/warehouse/location/getDistrict`, {
        method: 'GET',
        params: query,
      }),
  },
  lineWarehouseWaterLevel: {
    /**
     * No description
     *
     * @tags 线边仓水位表
     * @name RemoveBatch
     * @summary 删除线边仓水位
     * @request POST:/lineWarehouseWaterLevel/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/lineWarehouseWaterLevel/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 线边仓水位表
     * @name ModifyLineWarehouseWaterLevel
     * @summary 编辑线边仓水位
     * @request POST:/lineWarehouseWaterLevel/modifyLineWarehouseWaterLevel
     * @secure
     */
    modifyLineWarehouseWaterLevel: (data: LineWarehouseWaterLevel) =>
      http.request<ResultObject['data']>(`/api/warehouse/lineWarehouseWaterLevel/modifyLineWarehouseWaterLevel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 线边仓水位表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/lineWarehouseWaterLevel/getList
     * @secure
     */
    getList: (data: LineWarehouseWaterLevelSearch) =>
      http.request<ResultPagingDataLineWarehouseWaterLevelVO['data']>(
        `/api/warehouse/lineWarehouseWaterLevel/getList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 线边仓水位表
     * @name AddLineWarehouseWaterLevel
     * @summary 新增线边仓水位
     * @request POST:/lineWarehouseWaterLevel/addLineWarehouseWaterLevel
     * @secure
     */
    addLineWarehouseWaterLevel: (data: LineWarehouseWaterLevel) =>
      http.request<ResultObject['data']>(`/api/warehouse/lineWarehouseWaterLevel/addLineWarehouseWaterLevel`, {
        method: 'POST',
        body: data as any,
      }),
  },
  lineWarehouse: {
    /**
     * No description
     *
     * @tags 线边仓表
     * @name RemoveBatch
     * @summary 删除线边仓
     * @request POST:/lineWarehouse/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/lineWarehouse/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 线边仓表
     * @name ModifyLineWarehouse
     * @summary 编辑线边仓
     * @request POST:/lineWarehouse/modifyLineWarehouse
     * @secure
     */
    modifyLineWarehouse: (data: LineWarehouseSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/lineWarehouse/modifyLineWarehouse`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 线边仓表
     * @name Search
     * @summary 线边仓业务组件接口
     * @request POST:/lineWarehouse/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataLineWarehouseVO['data']>(`/api/warehouse/lineWarehouse/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 线边仓表
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/lineWarehouse/getList
     * @secure
     */
    getList: (data: LineWarehouseSearch) =>
      http.request<ResultPagingDataLineWarehouseVO['data']>(`/api/warehouse/lineWarehouse/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 线边仓表
     * @name AddLineWarehouse
     * @summary 新增线边仓
     * @request POST:/lineWarehouse/addLineWarehouse
     * @secure
     */
    addLineWarehouse: (data: LineWarehouseSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/lineWarehouse/addLineWarehouse`, {
        method: 'POST',
        body: data as any,
      }),
  },
  label: {
    /**
     * No description
     *
     * @tags 标签表
     * @name ScanLabelByMm
     * @summary 杂项管理扫描标签
     * @request POST:/label/scanLabelByMM
     * @secure
     */
    scanLabelByMm: (data: LabelMMSearch) =>
      http.request<ResultTransferHeadVO['data']>(`/api/warehouse/label/scanLabelByMM`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetMitemBasicInfo
     * @summary 物料基础信息
     * @request POST:/label/getMitemBasicInfo
     * @secure
     */
    getMitemBasicInfo: (data: MitemForwardTraceSearch) =>
      http.request<ResultMFTVO['data']>(`/api/warehouse/label/getMitemBasicInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelVo
     * @summary 获取日志插入信息
     * @request POST:/label/getLabelVO
     * @secure
     */
    getLabelVo: (data: string[]) =>
      http.request<ResultListLabelVO['data']>(`/api/warehouse/label/getLabelVO`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelManageList
     * @summary 获取管理页标签数据
     * @request POST:/label/getLabelManageList
     * @secure
     */
    getLabelManageList: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/warehouse/label/getLabelManageList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetIoInfo
     * @summary 出入库信息
     * @request POST:/label/getIOInfo
     * @secure
     */
    getIoInfo: (data: MitemForwardTraceSearch) =>
      http.request<ResultPagingDataMFTSubVO['data']>(`/api/warehouse/label/getIOInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetDeliveryList
     * @summary 获取打印页送货单数据
     * @request POST:/label/getDeliveryList
     * @secure
     */
    getDeliveryList: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/warehouse/label/getDeliveryList`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/label/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),
  },
  iqcInspect: {
    /**
     * No description
     *
     * @tags 品质检验接口
     * @name GetMitemReceiveBillVo
     * @request POST:/iqcInspect/getMitemReceiveBillVO
     * @secure
     */
    getMitemReceiveBillVo: (data: MitemReceiveBillSearch) =>
      http.request<ResultPagingDataMitemReceiveBillVO['data']>(`/api/warehouse/iqcInspect/getMitemReceiveBillVO`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 品质检验接口
     * @name CreatedStockInBillByMitemReceipt
     * @request POST:/iqcInspect/CreatedStockInBillByMitemReceipt
     * @secure
     */
    createdStockInBillByMitemReceipt: (data: string) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/iqcInspect/CreatedStockInBillByMitemReceipt`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/importManage/batchImportData`, {
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
      http.request<ResultListT['data']>(`/api/warehouse/importManage/batchDynamicQuery`, {
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
      http.request<ResultBoolean['data']>(`/api/warehouse/importManage/CheckUniqueExist`, {
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
      http.request<ResultListDataTableVO['data']>(`/api/warehouse/importManage/tables`, {
        method: 'GET',
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
      http.request<ResultObject['data']>(`/api/warehouse/dynamicManage/batchUpdateData`, {
        method: 'POST',
        body: data as any,
      }),
  },
  district: {
    /**
     * No description
     *
     * @tags 货区
     * @name RemoveDistrict
     * @summary 删除货区
     * @request POST:/district/removeDistrict
     * @secure
     */
    removeDistrict: (query: { id: string }) =>
      http.request<ResultObject['data']>(`/api/warehouse/district/removeDistrict`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name ModifyDistrict
     * @summary 编辑货区
     * @request POST:/district/modifyDistrict
     * @secure
     */
    modifyDistrict: (data: District) =>
      http.request<ResultObject['data']>(`/api/warehouse/district/modifyDistrict`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name Search
     * @request POST:/district/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/warehouse/district/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name GetItemById
     * @request POST:/district/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultDistrict['data']>(`/api/warehouse/district/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name GetList
     * @summary 查询货区
     * @request POST:/district/getList
     * @secure
     */
    getList: (data: DistrictSearch) =>
      http.request<ResultPagingDataDistrictVO['data']>(`/api/warehouse/district/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name AddDistrict
     * @summary 新增货区
     * @request POST:/district/addDistrict
     * @secure
     */
    addDistrict: (data: District) =>
      http.request<ResultObject['data']>(`/api/warehouse/district/addDistrict`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 货区
     * @name GetNameById
     * @summary 根据ID获得名称
     * @request GET:/district/getNameById
     * @secure
     */
    getNameById: (query: { id: string }) =>
      http.request<ResultString['data']>(`/api/warehouse/district/getNameById`, {
        method: 'GET',
        params: query,
      }),
  },
  deliveryCommand: {
    /**
     * No description
     *
     * @tags 配送指令表
     * @name WatchBoard
     * @summary 配送指令水位看板接口
     * @request POST:/deliveryCommand/watchBoard
     * @secure
     */
    watchBoard: (data: DeliveryCommandSearch) =>
      http.request<ResultPagingDataDeliveryCommandJobDTO['data']>(`/api/warehouse/deliveryCommand/watchBoard`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送指令表
     * @name RemoveBatch
     * @summary 删除配送指令
     * @request POST:/deliveryCommand/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCommand/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送指令表
     * @name Modify
     * @summary 修改配送指令
     * @request POST:/deliveryCommand/modify
     * @secure
     */
    modify: (data: DeliveryCommand) =>
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCommand/modify`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送指令表
     * @name GetList
     * @summary 查询主页数据
     * @request POST:/deliveryCommand/getList
     * @secure
     */
    getList: (data: DeliveryCommandSearch) =>
      http.request<ResultPagingDataDeliveryCommandVO['data']>(`/api/warehouse/deliveryCommand/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送指令表
     * @name Add
     * @summary 新增配送指令
     * @request POST:/deliveryCommand/add
     * @secure
     */
    add: (data: DeliveryCommand) =>
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCommand/add`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 配送指令表
     * @name Test
     * @summary JOB方法测试
     * @request GET:/deliveryCommand/test
     * @secure
     */
    test: () =>
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCommand/test`, {
        method: 'GET',
      }),
  },
  delivery: {
    /**
     * No description
     *
     * @tags 送货单表
     * @name SubmitMitemReceipt
     * @summary 提交来料接收单
     * @request POST:/delivery/submitMitemReceipt
     * @secure
     */
    submitMitemReceipt: (data: DeliverySearch) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/delivery/submitMitemReceipt`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 送货单表
     * @name ScanMitemLabel
     * @summary 扫描物料标签
     * @request POST:/delivery/scanMitemLabel
     * @secure
     */
    scanMitemLabel: (data: DeliverySearch) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/delivery/scanMitemLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 送货单表
     * @name Search
     * @summary 获取送货单(业务组件)
     * @request POST:/delivery/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataDeliveryVO['data']>(`/api/warehouse/delivery/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 送货单表
     * @name BatchSubmitMitemReceipt
     * @summary 批量提交
     * @request POST:/delivery/batchSubmitMitemReceipt
     * @secure
     */
    batchSubmitMitemReceipt: (data: DeliveryBatchSubmit) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/delivery/batchSubmitMitemReceipt`, {
        method: 'POST',
        body: data as any,
      }),
  },
  businessCategory: {
    /**
     * No description
     *
     * @tags 仓库业务类型
     * @name RemoveBatch
     * @summary 删除仓库业务类型
     * @request POST:/businessCategory/removeBatch
     * @secure
     */
    removeBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/warehouse/businessCategory/removeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库业务类型
     * @name Search
     * @request POST:/businessCategory/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataBusinessCategory['data']>(`/api/warehouse/businessCategory/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库业务类型
     * @name GetList
     * @summary 获取主界面数据
     * @request POST:/businessCategory/getList
     * @secure
     */
    getList: (data: BusinessCategorySearch) =>
      http.request<ResultPagingDataBusinessCategoryVO['data']>(`/api/warehouse/businessCategory/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库业务类型
     * @name GetBusinessCategory
     * @summary 获取交易事务
     * @request POST:/businessCategory/getBusinessCategory
     * @secure
     */
    getBusinessCategory: (data: string[]) =>
      http.request<ResultListBusinessCategory['data']>(`/api/warehouse/businessCategory/getBusinessCategory`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库业务类型
     * @name AddBusinessCategory
     * @summary 新增仓库业务类型
     * @request POST:/businessCategory/addBusinessCategory
     * @secure
     */
    addBusinessCategory: (data: BusinessCategory) =>
      http.request<ResultObject['data']>(`/api/warehouse/businessCategory/addBusinessCategory`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 仓库业务类型
     * @name GetBusinessCategoryById
     * @summary 根据ID获得仓库业务规则名称
     * @request GET:/businessCategory/getBusinessCategoryById
     * @secure
     */
    getBusinessCategoryById: (query: { id: string }) =>
      http.request<ResultString['data']>(`/api/warehouse/businessCategory/getBusinessCategoryById`, {
        method: 'GET',
        params: query,
      }),
  },
  billManagement: {
    /**
     * No description
     *
     * @tags 单据管理
     * @name GetList
     * @summary 查询主界面数据
     * @request POST:/billManagement/getList
     * @secure
     */
    getList: (data: BillManagementSearch) =>
      http.request<ResultPagingDataBillManagementVO['data']>(`/api/warehouse/billManagement/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 单据管理
     * @name GetLabel
     * @summary 查询标签明细数据
     * @request GET:/billManagement/getLabel
     * @secure
     */
    getLabel: (query: { billNo: string }) =>
      http.request<ResultListBillManagementVO['data']>(`/api/warehouse/billManagement/getLabel`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 单据管理
     * @name GetHeader
     * @summary 查询明细界面头部数据
     * @request GET:/billManagement/getHeader
     * @secure
     */
    getHeader: (query: { billNo: string }) =>
      http.request<ResultListBillManagementVO['data']>(`/api/warehouse/billManagement/getHeader`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 单据管理
     * @name GetDtl
     * @summary 查询单据明细数据
     * @request GET:/billManagement/getDtl
     * @secure
     */
    getDtl: (query: { billNo: string }) =>
      http.request<ResultListBillManagementVO['data']>(`/api/warehouse/billManagement/getDtl`, {
        method: 'GET',
        params: query,
      }),
  },
  acceptSendSaveReport: {
    /**
     * No description
     *
     * @tags 收发存报表
     * @name GetList
     * @summary 获取主界面数据
     * @request POST:/acceptSendSaveReport/getList
     * @secure
     */
    getList: (data: AcceptSendSaveReportSearch) =>
      http.request<ResultPagingDataAcceptSendSaveReportVO['data']>(`/api/warehouse/acceptSendSaveReport/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 收发存报表
     * @name Test
     * @summary JOB方法测试
     * @request GET:/acceptSendSaveReport/test
     * @secure
     */
    test: () =>
      http.request<ResultObject['data']>(`/api/warehouse/acceptSendSaveReport/test`, {
        method: 'GET',
      }),
  },
  goodsSentOut: {
    /**
     * No description
     *
     * @tags 成品发货
     * @name Submit
     * @summary 成品发货-提交
     * @request POST:/GoodsSentOut/submit
     * @secure
     */
    submit: (data: GoodsSentOutDTO) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/GoodsSentOut/submit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 成品发货
     * @name ScanMitemBarcode
     * @summary 扫描物料条码
     * @request POST:/GoodsSentOut/scanMitemBarcode
     * @secure
     */
    scanMitemBarcode: (data: GoodsSentOutDTO) =>
      http.request<ResultString['data']>(`/api/warehouse/GoodsSentOut/scanMitemBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 成品发货
     * @name GetGoodsSentOutList
     * @summary 成品发货-获取发货制单列表
     * @request GET:/GoodsSentOut/getGoodsSentOutList
     * @secure
     */
    getGoodsSentOutList: (query: {
      /** @format int32 */
      pageNum: number;
      /** @format int32 */
      pageSize: number;
      billNo: string;
    }) =>
      http.request<ResultListGoodsSentOutVO['data']>(`/api/warehouse/GoodsSentOut/getGoodsSentOutList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 成品发货
     * @name GetGoodsSentOutByBillNo
     * @summary 成品发货-根据单据号获取发货单
     * @request GET:/GoodsSentOut/getGoodsSentOutByBillNo
     * @secure
     */
    getGoodsSentOutByBillNo: (query: { billNo: string; isNeedCheck: boolean }) =>
      http.request<ResultGoodsSentOutVO['data']>(`/api/warehouse/GoodsSentOut/getGoodsSentOutByBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
  purchaseOrderDtl: {
    /**
     * No description
     *
     * @tags 采购单明细表
     * @name GetReturnPurchaseDtl
     * @summary 根据送货的号获取送货单的明细
     * @request GET:/purchaseOrderDtl/getReturnPurchaseDtl
     * @secure
     */
    getReturnPurchaseDtl: (query: { billNo: string }) =>
      http.request<ResultPagingDataPurchaseOrderDtlVO['data']>(`/api/warehouse/purchaseOrderDtl/getReturnPurchaseDtl`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 采购单明细表
     * @name GetPurchaseDtlByPurchaseNo
     * @summary 根据送货的号获取送货单的明细
     * @request GET:/purchaseOrderDtl/getPurchaseDtlByPurchaseNo
     * @secure
     */
    getPurchaseDtlByPurchaseNo: (query: { billNo: string }) =>
      http.request<ResultListPurchaseOrderDtlVO['data']>(`/api/warehouse/purchaseOrderDtl/getPurchaseDtlByPurchaseNo`, {
        method: 'GET',
        params: query,
      }),
  },
  deliveryDtl: {
    /**
     * No description
     *
     * @tags 送货单明细表
     * @name GetReturnDeliveryDtl
     * @summary 获取需要退货的送货单明细
     * @request GET:/deliveryDtl/getReturnDeliveryDtl
     * @secure
     */
    getReturnDeliveryDtl: (query: { billNo: string }) =>
      http.request<ResultPagingDataDeliveryDtlVO['data']>(`/api/warehouse/deliveryDtl/getReturnDeliveryDtl`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 送货单明细表
     * @name GetDeliveryDtlByDeliveryNo
     * @summary 根据送货单号获取送货单的明细
     * @request GET:/deliveryDtl/getDeliveryDtlByDeliveryNo
     * @secure
     */
    getDeliveryDtlByDeliveryNo: (query: { billNo: string }) =>
      http.request<ResultListDeliveryDtlVO['data']>(`/api/warehouse/deliveryDtl/getDeliveryDtlByDeliveryNo`, {
        method: 'GET',
        params: query,
      }),
  },
  billSeq: {
    /**
     * No description
     *
     * @tags 单据流程水号表
     * @name GetBillNo
     * @summary 根据前缀获取流水单号
     * @request GET:/billSeq/getBillNo
     * @secure
     */
    getBillNo: (query: { prefix: string }) =>
      http.request<ResultString['data']>(`/api/warehouse/billSeq/getBillNo`, {
        method: 'GET',
        params: query,
      }),
  },
};
