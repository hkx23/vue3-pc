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

/** 交易明细标签表 */
export interface TransferDtlBarcodeVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  transferDtlId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  supplierId?: string;
  /** 数量 */
  qty?: number;
  uom?: string;
  batchNo?: string;
  scanBarcode?: string;
  barcodeType?: string;
  moCode?: string;
  workshopId?: string;
  workcenterId?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  uomName?: string;
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
  reason?: string;
  voucherLineNo?: string;
  noticeVoucherLineNo?: string;
  batchNo?: string;
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  memo?: string;
  /** 交易单身标签表 */
  transferDtlBarcodeList?: TransferDtlBarcodeVO[];
}

/** 交易事务头表 */
export interface TransferHeadVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /**
   * 单身行数
   * @format int32
   */
  lineCount?: number;
  erpBillNo?: string;
  /** 来源单据号 */
  sourceBillNo?: string;
  purpose?: string;
  voucherNo?: string;
  noticeVoucherNo?: string;
  supplierId?: string;
  memo?: string;
  /** 原因 */
  reason?: string;
  /** 科目 */
  account?: string;
  /** 费用部门 */
  costDepartment?: string;
  status?: string;
  businessCategoryId?: string;
  /** 单据业务类型编码 */
  businessCategoryCode?: string;
  /** 单据业务类型名称 */
  businessCategoryName?: string;
  userTransferId?: string;
  userTransferName?: string;
  displayTransferName?: string;
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
  /** 交易单身表 */
  transferDtlList?: TransferDtlVO[];
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
  erpBillNo?: string;
  /** 来源单据号 */
  sourceBillNo?: string;
  purpose?: string;
  voucherNo?: string;
  noticeVoucherNo?: string;
  supplierId?: string;
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

export interface PurchaseOrderSearch {
  /** 送货单明细ID */
  purchaseOrderDtlId?: string;
  /** 物料标签 */
  labelNo?: string;
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
  receiveNo?: string;
  status?: string;
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
  /** 接收数量 */
  receivedQty?: number;
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
  locationCode?: string;
  locationName?: string;
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

/** 领料制单提交模型 */
export interface MaterialRequisitionDTO {
  cancelledIds?: string[];
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
  locationCode?: string;
  locationName?: string;
  locationDesc?: string;
  warehouseId?: string;
  districtId?: string;
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

/** 标签日志表 */
export interface LabelLog {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  labelNo?: string;
  reason?: string;
  tmplCode?: string;
  tmplName?: string;
  tmplCategory?: string;
  warehouseCode?: string;
  warehouseName?: string;
  districtCode?: string;
  districtName?: string;
  locationCode?: string;
  locationName?: string;
  /** 数量 */
  qty?: number;
  hostname?: string;
  ipaddress?: string;
  memo?: string;
  operateType?: string;
  status?: string;
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
  /** 仓库名称 */
  pdCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
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
  printTempId?: string;
  /** 原因 */
  reason?: string;
  /** 批量ID */
  ids?: string[];
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
  districtCode?: string;
  districtName?: string;
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
  districtCode?: string;
  districtName?: string;
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

/** 查询条码信息 */
export type BarcodeDTO = {
  id?: string;
  barcode?: string;
  moScheId?: string;
  qty?: number;
  barcodeType?: string;
  status?: string;
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
  moId?: string;
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
  /** 工单编码 */
  moCode?: string;
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
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
  categoryCode?: string;
  categoryName?: string;
  /**
   * 业务交易方向
   * @format int32
   */
  businessDirection?: number;
  transferOutType?: string;
  transferInType?: string;
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
  categoryCode?: string;
  categoryName?: string;
  /**
   * 业务交易方向
   * @format int32
   */
  businessDirection?: number;
  transferOutType?: string;
  transferInType?: string;
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
   * 计划开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 计划结束日期
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
} | null;

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
  warehouseCode?: string;
  warehouseName?: string;
  warehouseDesc?: string;
  warehouseCategory?: string;
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
  erpWarehouse?: string;
  /**
   * 是否先进先出
   * @format int32
   */
  isFifo?: number;
} | null;

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
  orgCode?: string;
  orgName?: string;
  orgDesc?: string;
  parentOrgId?: string;
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

/** 采购单明细 */
export type PurchaseOrderDtlVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /** 是否接收完成 */
  isComplete?: boolean;
  /** 待扫数量 */
  waitScanQty?: number;
} | null;

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

/** 响应数据 */
export type MaterialRequisitionDtlVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  reason?: string;
  voucherLineNo?: string;
  noticeVoucherLineNo?: string;
  batchNo?: string;
  poNum?: string;
  /** ERP单据明细号 */
  erpLineNo?: string;
  memo?: string;
  /** 子层级 */
  children?: MaterialRequisitionDtlVO[];
  /**
   * 树状表格需要，否则展开有问题
   * @format int32
   */
  index?: number;
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
   * 需求用量
   * @format int32
   */
  moRequestQty?: number;
} | null;

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

export interface MaterialRequisitionVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  businessCategoryId?: string;
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
  /** 单据状态名称 */
  statusName?: string;
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

/** 标签模板 */
export type PrintTmpl = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
} | null;

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

/** 条码生成规则 */
export type BarcodeRule = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  ruleCode?: string;
  ruleName?: string;
  ruleDesc?: string;
  barcodeType?: string;
  ruleExpression?: string;
} | null;

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

/** 送货单明细 */
export type DeliveryDtlVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  poNo?: string;
  /**
   * 采购日期
   * @format date-time
   */
  datePo?: string;
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
  /** 是否接收完成 */
  isComplete?: boolean;
  /** 待扫数量 */
  waitScanQty?: number;
} | null;

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

/** 响应数据 */
export type PagingDataPrintTmpl = {
  list?: PrintTmpl[];
  /** @format int32 */
  total?: number;
} | null;

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
      http.request<ResultListWipCompletionLabelDTO['data']>(`/api/warehouse/billInfo/submit/${id}`, {
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
     * @name GetUserWarehouseByUser
     * @summary 获取登录用户仓库权限
     * @request GET:/userWarehouseAuthority/getUserWarehouseByUser
     * @secure
     */
    getUserWarehouseByUser: () =>
      http.request<ResultListUserWarehouseVO['data']>(`/api/warehouse/userWarehouseAuthority/getUserWarehouseByUser`, {
        method: 'GET',
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
     * @name GetTransferHeadList
     * @summary 获取出入库信息
     * @request POST:/transferHead/getTransferHeadList
     * @secure
     */
    getTransferHeadList: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataTransferHeadVO['data']>(`/api/warehouse/transferHead/getTransferHeadList`, {
        method: 'POST',
        body: data as any,
      }),

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
    submitMitemReceipt: (query: { billNo: string }) =>
      http.request<ResultBoolean['data']>(`/api/warehouse/purchaseOrder/submitMitemReceipt`, {
        method: 'POST',
        params: query,
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
  materialRequisition: {
    /**
     * No description
     *
     * @tags 领料制单
     * @name MaterialRequisitionCanceled
     * @summary 领料单作废
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
     * @name Tree
     * @summary 获取领料单明细
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
     * @summary 获取领料制单列表
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
      http.request<ResultListLocation['data']>(`/api/warehouse/location/getLocationByWarehouse`, {
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
  },
  labelLog: {
    /**
     * No description
     *
     * @tags 标签日志表
     * @name BatchSaveLog
     * @request POST:/labelLog/batchSaveLog
     * @secure
     */
    batchSaveLog: (data: LabelLog[]) =>
      http.request<Result['data']>(`/api/warehouse/labelLog/batchSaveLog`, {
        method: 'POST',
        body: data as any,
      }),
  },
  label: {
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
    getLabelVo: (data: string) =>
      http.request<ResultObject['data']>(`/api/warehouse/label/getLabelVO`, {
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
     * @name GetLabelLog
     * @summary 查询日志
     * @request POST:/label/getLabelLog
     * @secure
     */
    getLabelLog: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/warehouse/label/getLabelLog`, {
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
      http.request<ResultPagingDataLabelVO['data']>(`/api/warehouse/label/getLabelList`, {
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

    /**
     * No description
     *
     * @tags 标签表
     * @name GetLabelPrintTmplList
     * @summary 获取条码规则数据
     * @request GET:/label/getLabelPrintTmplList
     * @secure
     */
    getLabelPrintTmplList: () =>
      http.request<ResultListPrintTmpl['data']>(`/api/warehouse/label/getLabelPrintTmplList`, {
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
      http.request<ResultListBarcodeRule['data']>(`/api/warehouse/label/getLabelBarcodeRuleList`, {
        method: 'GET',
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
      http.request<ResultListBarcodeDTO['data']>(`/api/warehouse/deliveryCard/wipCompletionScanList`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCard/splitBarcode`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCard/reprintBarcode`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCard/printBarcode`, {
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
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/warehouse/deliveryCard/getMoScheduleList`, {
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
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/warehouse/deliveryCard/getDeliveryCardManagerList`, {
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
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/warehouse/deliveryCard/getDeliveryCardLog`, {
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
      http.request<ResultPagingDataDeliveryCardVO['data']>(`/api/warehouse/deliveryCard/getDeliveryCardList`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCard/generateBarcode`, {
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
      http.request<ResultObject['data']>(`/api/warehouse/deliveryCard/cancellationBarcode`, {
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
    getPrintTmplList: () =>
      http.request<ResultPagingDataPrintTmpl['data']>(`/api/warehouse/deliveryCard/getPrintTmplList`, {
        method: 'GET',
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
    getBarcodeRuleList: () =>
      http.request<ResultPagingDataBarcodeRule['data']>(`/api/warehouse/deliveryCard/getBarcodeRuleList`, {
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
     * @name GetBusinessCategory
     * @summary 杂项管理获取交易事务
     * @request GET:/businessCategory/getBusinessCategory
     * @secure
     */
    getBusinessCategory: () =>
      http.request<ResultListBusinessCategory['data']>(`/api/warehouse/businessCategory/getBusinessCategory`, {
        method: 'GET',
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
  },
  purchaseOrderDtl: {
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
     * @name GetDeliveryDtlByDeliveryNo
     * @summary 根据送货的号获取送货单的明细
     * @request GET:/deliveryDtl/getDeliveryDtlByDeliveryNo
     * @secure
     */
    getDeliveryDtlByDeliveryNo: (query: { billNo: string }) =>
      http.request<ResultListDeliveryDtlVO['data']>(`/api/warehouse/deliveryDtl/getDeliveryDtlByDeliveryNo`, {
        method: 'GET',
        params: query,
      }),
  },
};
