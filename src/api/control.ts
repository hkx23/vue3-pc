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

/** 筛选字段 */
export interface Filter {
  field?: string;
  operator?: 'EQ' | 'GT' | 'LT' | 'LTE' | 'GTE' | 'LIKE';
  value?: string;
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
}

/** 通用响应类 */
export interface ResultListWipRepairDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WipRepairDtlVO[] | null;
}

/** 维修单 */
export type WipRepairDtlVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  wipRepairId?: string;
  defectCodeId?: string;
  /** 缺陷原因 */
  defectReason?: string;
  /** 缺陷责任别 */
  defectBlame?: string;
  /** 维修人 */
  userNameRepair?: string;
  /** 维修人名称 */
  displayNameRepair?: string;
  /** 维修结束时间 */
  datetimeRepaired?: string;
  wipRepairMethodId?: string;
  /** 产品条形码 */
  scanBarcode?: string;
  /** 缺陷代码编码 */
  defectCode?: string;
  /** 缺陷代码 */
  defectName?: string;
  /** 缺陷处理方法编码 */
  defectDealMethodCode?: string;
  /** 缺陷处理方法 */
  defectDealMethodName?: string;
} | null;

/** 维修单查询 */
export interface WipRepairSearch {
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
  moScheId?: string;
  /** 开始时间 */
  beginDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 已返修 */
  isRepair?: string;
  /** 登录工序 */
  processId?: string;
  /** 批量维修ID */
  wipRepairIds?: string[];
  /** 维修状态 */
  statusList?: string[];
  loginProcessId?: string;
  loginWorkstationId?: string;
  /** 是否报废 */
  isScrapped?: boolean;
}

/** 响应数据 */
export type PagingDataWipRepairVO = {
  list?: WipRepairVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipRepairVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipRepairVO;
}

/** 维修单 */
export interface WipRepairVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /** 流程卡号 */
  runCard?: string;
  /** 产品条形码 */
  scanBarcode?: string;
  moScheId?: string;
  /**
   * 维修次数
   * @format int32
   */
  repairTimes?: number;
  /**
   * 不合格次数
   * @format int32
   */
  ngTimes?: number;
  fromRoutingProcessId?: string;
  fromWorkstationId?: string;
  /** 维修开始时间 */
  datetimeRepairing?: string;
  /** 维修结束时间 */
  datetimeRepaired?: string;
  userRepairId?: string;
  returnRoutingProcessId?: string;
  /** 维修结果 */
  repairResult?: string;
  /** 状态 */
  status?: string;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 排产工单编码 */
  moScheCode?: string;
  /** 来源工艺路线工序编码 */
  fromRoutingProcessCode?: string;
  /** 来源工艺路线工序 */
  fromRoutingProcessName?: string;
  /** 来源工站编码 */
  fromWorkstationCode?: string;
  /** 来源工站 */
  fromWorkstationName?: string;
  /** 维修用户 */
  userNameRepair?: string;
  /** 维修用户名称 */
  displayNameRepair?: string;
  /** 回流工艺路线工序编码 */
  returnRoutingProcessCode?: string;
  /** 回流工艺路线工序 */
  returnRoutingProcessName?: string;
  /** 维修状态 */
  repairStatusName?: string;
  routingRevisionId?: string;
  /** 维修中ID */
  idsRepairingList?: string[];
  curRepairProcessId?: string;
  curWorkstationId?: string;
  loginProcessId?: string;
  loginWorkstationId?: string;
  /** 缺陷原因 */
  defectReason?: string;
  /** 缺陷责任别 */
  defectBlame?: string;
  defectCodeId?: string;
  /** 缺陷处理方法ID */
  defectDealMethodIdList?: string[];
  mttr?: string;
  /** 是否报废 */
  isScrapped?: boolean;
  wipRepairId?: string;
  /** 维修中提交的ID */
  wipRepairIdList?: string[];
  retentionTime?: string;
  outTimeShowColor?: string;
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

/** 显示缺陷处理方法 */
export interface DefectDealMethodVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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

/** 完工入库单据实体 */
export interface ScanLabelDTO {
  /** 业务类型编码 */
  businessCategoryCode?: string;
  /** 扫描条码 */
  barcode?: string;
  billId?: string;
  /** 单据号 */
  billNo?: string;
  warehouseId?: string;
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

/** 产品返工返工前配置信息 */
export interface ProductReworkPreSettingDTO {
  isSameProcess?: boolean;
  isSameMo?: boolean;
  isByReworkMo?: boolean;
  reworkRoutingRevisionId?: string;
  reworkMoSheId?: string;
  reworkMoId?: string;
  reworkRouting?: string;
  reworkRoutingName?: string;
  reworkLine?: string;
  reworkProcess?: string;
  scanType?: string;
  curProcessId?: string;
  curMoScheId?: string;
  curMitemId?: string;
}

/** 显示产品返工实体 */
export interface ProductReworkVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  onhandId?: string;
  /** 状态 */
  status?: string;
  uom?: string;
  uomName?: string;
  keypartCode?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 工单排产状态 */
  scheStatus?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  routingRevisionId?: string;
  moId?: string;
  /** 工单名称 */
  moCode?: string;
  /**
   * 完工数量
   * @format int32
   */
  completedQty?: number;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 工序代码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 下个工序ID */
  nextProcessId?: string;
  /** 下个工序代码 */
  nextProcessCode?: string;
  /** 下个工序名称 */
  nextProcessName?: string;
  /** 下个工序类型 */
  nextProcessType?: string;
  /** 扫描信息 */
  scanMessage?: string;
  /** 工作中心代码 */
  workCenterCode?: string;
  /** 工作中心名称 */
  workCenterName?: string;
  routingProcessId?: string;
  nextPRoutingProcessId?: string;
  /** 关键件数量汇总信息 */
  keyPartSumList?: WipKeyPartCollectVO[];
  /** 产品返工返工前配置信息 */
  preSetting?: ProductReworkPreSettingDTO;
  /** 是否提交事务 */
  isCommit?: boolean;
  /** @format date-time */
  datetimeSche?: string;
  workshopId?: string;
  workshopName?: string;
  workshopCode?: string;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  /** 扫描状态 */
  scanSuccess?: boolean;
}

/** 显示过站采集关键件实体 */
export interface WipKeyPartCollectVO {
  moScheId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 工序id */
  processId?: string;
  /** 工序编码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 扫描信息 */
  scanMessage?: string;
  /** 扫描状态 */
  scanSuccess?: boolean;
  /**
   * 工单需求量
   * @format int32
   */
  moRequestQty?: number;
  /**
   * 关键件已扫数量
   * @format int32
   */
  scanQty?: number;
  /** 产品返工：是否需要删除 */
  isDeleteKeyPart?: boolean;
  /** 关键条码信息 */
  keyPartList?: WipKeypart[];
  isScanFinish?: boolean;
  keyPartCodeStr?: string;
}

/** 在制品关键件采集表 */
export interface WipKeypart {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /** 流程卡号 */
  runCard?: string;
  /** 关键件条码 */
  keypartBarcode?: string;
  /** 关键件条码类型 */
  keypartBarcodeType?: string;
  moScheId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  supplierId?: string;
  /** 生产批次 */
  lotNo?: string;
  /** 使用数量 */
  qty?: number;
  workstationId?: string;
  processId?: string;
}

/** 通用响应类 */
export interface ResultProductReworkVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示产品返工实体 */
  data?: ProductReworkVO;
}

/** 产品返工执行模型 */
export interface ProductReworkDTO {
  /** 条码集合信息 */
  barcodeList?: ProductReworkVO[];
  /** 产品返工返工前配置信息 */
  preSetting?: ProductReworkPreSettingDTO;
  /** 关键件数量汇总信息 */
  keyPartSumList?: WipKeyPartCollectVO[];
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
  /** 创建人名称 */
  creatorName?: string;
  /** 修改人名称 */
  modifierName?: string;
  isState?: boolean;
  stateName?: string;
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

export interface ProcessInDefectCodeSearch {
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
  /** 工序模糊关键词 */
  process?: string;
  /** 工序缺陷-状态 */
  state?: number[];
  id?: string;
  /** 多个id */
  ids?: string[];
}

/** 工序与缺陷代码关系 */
export interface ProcessInDefectCode {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  processId?: string;
  defectCodeId?: string;
  /**
   *  显示顺序
   * @format int32
   */
  displaySeq?: number;
}

/** 响应数据 */
export type PagingDataProcessInDefectCodeVO = {
  list?: ProcessInDefectCodeVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 领域对象扩展属性分类 */
export interface ProcessInDefectCodeVO {
  id?: string;
  processId?: string;
  /** 工序代码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  defectCodeId?: string;
  /** 缺陷代码 */
  defectCode?: string;
  /** 缺陷名称 */
  defectName?: string;
  /**
   * 状态
   * @format int32
   */
  state?: number;
  /**
   *  显示顺序
   * @format int32
   */
  displaySeq?: number;
}

/** 通用响应类 */
export interface ResultPagingDataProcessInDefectCodeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProcessInDefectCodeVO;
}

/** 装箱关系实体 */
export interface PkgRelationDTO {
  moScheId?: string;
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码类型 */
  pkgBarcodeType?: string;
  /** 父包装条码 */
  parentPkgBarcode?: string;
  /** 父包装条码类型 */
  parentPkgType?: string;
  workstationId?: string;
  workcenterId?: string;
  workshopId?: string;
  pkgRuleId?: string;
}

/** 物料使用信息 */
export interface LabelNoSearch {
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
  /** 标签集合 */
  list?: string[];
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
  /** 数量 */
  qty?: number;
  /** 操作员 */
  operatorName?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 工作中心 */
  workcenterName?: string;
  /** 产品编码 */
  pdCode?: string;
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

/** 响应数据 */
export type PagingDataMFTSubVO = {
  list?: MFTSubVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMFTSubVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMFTSubVO;
}

/** 工单投料信息提交模型 */
export interface MitemOnboardDTO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  processId?: string;
  mitemId?: string;
  workcenterId?: string;
  supplierId?: string;
  /** 扫描条码 */
  scanBarcode?: string;
  /** 条码类型 */
  barcodeType?: string;
  /**
   * 顺序
   * @format int32
   */
  seq?: number;
  /** 数量 */
  qty?: number;
  /** 结余数量 */
  balanceQty?: number;
  /** 单位 */
  uom?: string;
  /**
   * 投料时间
   * @format date-time
   */
  datetimeOnboard?: string;
  /** 投料器 */
  feeder?: string;
  /** 状态 */
  status?: string;
  bomMitemId?: string;
  bomMitemCode?: string;
  bomMitemName?: string;
  bomMitemDesc?: string;
  bomUom?: string;
  bomUomName?: string;
  moMitemId?: string;
  moMitemCode?: string;
  moMitemName?: string;
  moMitemDesc?: string;
  moUom?: string;
  moUomName?: string;
  workshopCode?: string;
  workshopName?: string;
  workCenterId?: string;
  workCenterCode?: string;
  workCenterName?: string;
  categoryCode?: string;
  categoryName?: string;
  moScheduleId?: string;
  statusName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  mitemOnboardId?: string;
  moScheId?: string;
  lotNo?: string;
  labelNo?: string;
}

/** 工单投料信息提交模型 */
export interface MitemOnboardSubmitDTO {
  workcenterId?: string;
  processId?: string;
  moScheId?: string;
  modelList?: MitemOnboardDTO[];
  ids?: string[];
}

/** 工单投料信息卸料与转料模型 */
export interface MitemOnboardUnbindDTO {
  workcenterId?: string;
  processId?: string;
  moScheId?: string;
  ids?: string[];
  boardListIds?: string[];
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
export interface LabelVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /** 送货单号 */
  deliveryNo?: string;
  /** 接收单号 */
  receiveNo?: string;
  /** 状态 */
  status?: string;
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
  moScheduleId?: string;
  /** 工单编码 */
  moCode?: string;
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
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

/** 显示过站采集实体 */
export interface BarcodeWipCollectVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  onhandId?: string;
  /** 状态 */
  status?: string;
  /** 扫码类型(SCANTEXT,KEYPART) */
  uom?: string;
  uomName?: string;
  scanType?: string;
  keypartCode?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 工单排产状态 */
  scheStatus?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  routingRevisionId?: string;
  moId?: string;
  /** 工单名称 */
  moCode?: string;
  /**
   * 完工数量
   * @format int32
   */
  completedQty?: number;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 工序代码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 下个工序ID */
  nextProcessId?: string;
  /** 下个工序代码 */
  nextProcessCode?: string;
  /** 下个工序名称 */
  nextProcessName?: string;
  /** 下个工序类型 */
  nextProcessType?: string;
  /** 扫描信息 */
  scanMessage?: string;
  /** 工作中心代码 */
  workCenterCode?: string;
  /** 工作中心名称 */
  workCenterName?: string;
  routingProcessId?: string;
  nextPRoutingProcessId?: string;
  /** 关键件数量汇总信息 */
  keyPartSumList?: WipKeyPartCollectVO[];
  /** 是否提交事务 */
  isCommit?: boolean;
  /** @format date-time */
  datetimeSche?: string;
  workshopId?: string;
  workshopName?: string;
  workshopCode?: string;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  isState?: boolean;
  stateName?: string;
  /** 扫描状态 */
  scanSuccess?: boolean;
}

/** 通用响应类 */
export interface ResultBarcodeWipCollectVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示过站采集实体 */
  data?: BarcodeWipCollectVO;
}

/** 显示在制品条码实体 */
export interface BarcodeWipVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  onhandId?: string;
  /** 状态 */
  status?: string;
  /** 排产工单 */
  scheCode?: string;
  /** 工单排产状态 */
  scheStatus?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  routingRevisionId?: string;
  moId?: string;
  /** 工单名称 */
  moCode?: string;
  /**
   * 完工数量
   * @format int32
   */
  completedQty?: number;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 工序代码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 扫描信息 */
  scanMessage?: string;
  /** 扫描状态 */
  scanSuccess?: boolean;
  /** 工作中心代码 */
  workCenterCode?: string;
  /** 工作中心名称 */
  workCenterName?: string;
  /** 扫描选中的缺陷列表 */
  defectCodeList?: DefectCode[];
  /** @format date-time */
  datetimeSche?: string;
  workshopId?: string;
  workshopName?: string;
  workshopCode?: string;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  isState?: boolean;
  stateName?: string;
  defectCodeStr?: string;
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

/** 通用响应类 */
export interface ResultBarcodeWipVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 显示在制品条码实体 */
  data?: BarcodeWipVO;
}

/** 通用响应类 */
export interface ResultWipPkgInfoVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 产品箱包规格信息 */
  data?: WipPkgInfoVO;
}

/** 产品箱包规格信息 */
export type WipPkgInfoVO = {
  /** 条码 */
  barcode?: string;
  /** 条码类型 */
  barcodeType?: string;
  /** 条码状态 */
  status?: string;
  /** 工单号 */
  moCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  mitemCategoryId?: string;
  /** 单位 */
  uom?: string;
  moScheId?: string;
  /** 条码数量 */
  barcodeQty?: number;
  packRuleId?: string;
  /** 包装类型 */
  packType?: string;
  /**
   * 包装数量
   * @format int32
   */
  packQty?: number;
  /** 包装单位 */
  packUom?: string;
} | null;

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
  barcodePkgId?: string;
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码状态 */
  barcodePkgStatus?: string;
  /** 批量ID */
  ids?: string[];
  /** 原因 */
  reason?: string;
  moId?: string;
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
  /** 工单编码 */
  moCode?: string;
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
  ruleDtlId?: string;
  barcodePkgId?: string;
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

/** 包装条码表 */
export type BarcodePkg = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码类型 */
  pkgBarcodeType?: string;
  /** 子包装条码类型 */
  subPkgBarcodeType?: string;
  moScheId?: string;
  packRuleId?: string;
  /** 数量 */
  qty?: number;
  /** 状态 */
  status?: string;
} | null;

/** 通用响应类 */
export interface ResultBarcodePkg {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 包装条码表 */
  data?: BarcodePkg;
}

/** 原子模型定义-Context上下文定义 */
export interface AtomicContext {
  /** 是否执行成功 */
  success?: boolean;
  /** 执行描述 */
  message?: string;
  /** 执行描述 */
  hashMaps?: Record<string, object>;
}

/** 通用响应类 */
export interface ResultAtomicContext {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 原子模型定义-Context上下文定义 */
  data?: AtomicContext;
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

/** 箱包关系前端显示 */
export type PkgRelationVO = {
  id?: string;
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码类型 */
  pkgBarcodeType?: string;
  /**
   * 包装序号
   * @format int32
   */
  seq?: number;
} | null;

/** 通用响应类 */
export interface ResultListPkgRelationVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PkgRelationVO[] | null;
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

/** 箱包关系外箱信息 */
export type PkgInfoRelationVO = {
  /** 外箱条码 */
  barcode?: string;
  /** 外箱条码类型 */
  barcodeType?: string;
  /**
   * 包装数量
   * @format int32
   */
  packQty?: number;
  /**
   * 产品规则包装数量
   * @format int32
   */
  packRuleQty?: number;
  /** 产品编码 */
  mitemCode?: string;
  /** 产品描述 */
  mitemDesc?: string;
  /** 箱包关系 */
  relation?: PkgRelationVO[];
  /** 是否尾数装箱 */
  whole?: boolean;
} | null;

/** 通用响应类 */
export interface ResultPkgInfoRelationVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 箱包关系外箱信息 */
  data?: PkgInfoRelationVO;
}

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
  wipCompletion: {
    /**
     * No description
     *
     * @tags 完工入库
     * @name Submit
     * @summary 根据单据ID提交单据状态
     * @request PUT:/wipCompletion/submit/{id}
     * @secure
     */
    submit: (id: string, data: WipCompletionLabelDTO[]) =>
      http.request<ResultObject['data']>(`/api/control/wipCompletion/submit/${id}`, {
        method: 'PUT',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 完工入库
     * @name ScanLabel
     * @summary 扫描标签
     * @request POST:/wipCompletion/scanLabel
     * @secure
     */
    scanLabel: (data: ScanLabelDTO) =>
      http.request<ResultLong['data']>(`/api/control/wipCompletion/scanLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 完工入库
     * @name GetWipCompletionLabelList
     * @summary 根据单据ID获取已扫入的完工入库条码
     * @request GET:/wipCompletion/getWipCompletionLabelList
     * @secure
     */
    getWipCompletionLabelList: (query: { id: string }) =>
      http.request<ResultListWipCompletionLabelDTO['data']>(`/api/control/wipCompletion/getWipCompletionLabelList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 完工入库
     * @name GetDraftWipCompletionBillList
     * @summary 获取未提交的完工入库单据
     * @request GET:/wipCompletion/getDraftWipCompletionBillList
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
        `/api/control/wipCompletion/getDraftWipCompletionBillList`,
        {
          method: 'GET',
          params: query,
        },
      ),

    /**
     * No description
     *
     * @tags 完工入库
     * @name DeleteBarcode
     * @summary 根据交易明细标签ID删除对应的明细标签
     * @request DELETE:/wipCompletion/deleteBarcode
     * @secure
     */
    deleteBarcode: (query: { dtlBarcodeId: string }) =>
      http.request<ResultObject['data']>(`/api/control/wipCompletion/deleteBarcode`, {
        method: 'DELETE',
        params: query,
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleDtl/update`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleDtl/add`, {
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
      http.request<ResultListProductPackRuleDtlVO['data']>(`/api/control/productPackRuleDtl/tree`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleDtl/delete`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRule/update`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRule/add`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRule/list`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRule/delete`, {
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
      http.request<ResultObject['data']>(`/api/control/workstationAuth/save`, {
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
      http.request<ResultObject['data']>(`/api/control/workstationAuth/remove`, {
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
      http.request<ResultObject['data']>(`/api/control/workstationAuth/removeBatch`, {
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
      http.request<ResultObject['data']>(`/api/control/workstationAuth/input`, {
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
      http.request<ResultPagingDataWorkstationAuthVO['data']>(`/api/control/workstationAuth/getUserList`, {
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
      http.request<ResultPagingDataLong['data']>(`/api/control/workstationAuth/getUserAuth`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工站权限
     * @name Getlist
     * @summary 查询主界面信息
     * @request POST:/workstationAuth/getList
     * @secure
     */
    getlist: (data: WorkstationAuthSearch) =>
      http.request<ResultPagingDataWorkstationAuthVO['data']>(`/api/control/workstationAuth/getList`, {
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
      http.request<ResultPagingDataWorkstation['data']>(`/api/control/workstationAuth/currentUserWorkstation`, {
        method: 'POST',
        body: data as any,
      }),
  },
  wipRepairDtl: {
    /**
     * No description
     *
     * @tags 产品维修明细表
     * @name GetListByWipRepairId
     * @summary 获返工工单
     * @request POST:/wipRepairDtl/GetListByWipRepairId
     * @secure
     */
    getListByWipRepairId: (query: { wipRepairId: string }) =>
      http.request<ResultListWipRepairDtlVO['data']>(`/api/control/wipRepairDtl/GetListByWipRepairId`, {
        method: 'POST',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 产品维修明细表
     * @name GetListByRepairing
     * @summary 获维修工单明细
     * @request POST:/wipRepairDtl/GetListByRepairing
     * @secure
     */
    getListByRepairing: (data: WipRepairSearch) =>
      http.request<ResultPagingDataWipRepairVO['data']>(`/api/control/wipRepairDtl/GetListByRepairing`, {
        method: 'POST',
        body: data as any,
      }),
  },
  wipRepair: {
    /**
     * No description
     *
     * @tags 产品维修表
     * @name Search
     * @summary 获取维修工单
     * @request POST:/wipRepair/items
     * @secure
     */
    search: (data: WipRepairSearch) =>
      http.request<ResultPagingDataWipRepairVO['data']>(`/api/control/wipRepair/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品维修表
     * @name GetDefectDealMethodList
     * @summary 查询缺陷处理方法
     * @request POST:/wipRepair/getDefectDealMethodList
     * @secure
     */
    getDefectDealMethodList: (data: DefectDealMethodSearch) =>
      http.request<ResultPagingDataDefectDealMethodVO['data']>(`/api/control/wipRepair/getDefectDealMethodList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品维修表
     * @name UpdateWipRepairUnRepair
     * @summary 从维修中改为待维修状态
     * @request POST:/wipRepair/UpdateWipRepairUnRepair
     * @secure
     */
    updateWipRepairUnRepair: (data: WipRepairSearch) =>
      http.request<ResultObject['data']>(`/api/control/wipRepair/UpdateWipRepairUnRepair`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品维修表
     * @name UpdateWipRepairStatus
     * @summary 更新维修单状态
     * @request POST:/wipRepair/UpdateWipRepairStatus
     * @secure
     */
    updateWipRepairStatus: (data: WipRepairSearch) =>
      http.request<ResultObject['data']>(`/api/control/wipRepair/UpdateWipRepairStatus`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品维修表
     * @name UpdateRepaired
     * @summary 维修完成
     * @request POST:/wipRepair/UpdateRepaired
     * @secure
     */
    updateRepaired: (data: WipRepairVO) =>
      http.request<ResultObject['data']>(`/api/control/wipRepair/UpdateRepaired`, {
        method: 'POST',
        body: data as any,
      }),
  },
  productRework: {
    /**
     * No description
     *
     * @tags 产品返工
     * @name ScanProductNo
     * @summary 产品返工扫码
     * @request POST:/productRework/scanProductNo
     * @secure
     */
    scanProductNo: (data: ProductReworkVO) =>
      http.request<ResultProductReworkVO['data']>(`/api/control/productRework/scanProductNo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品返工
     * @name Save
     * @summary 产品返工执行
     * @request POST:/productRework/save
     * @secure
     */
    save: (data: ProductReworkDTO) =>
      http.request<ResultObject['data']>(`/api/control/productRework/save`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品返工
     * @name Search
     * @request POST:/productRework/itemsProcess
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataProcessVO['data']>(`/api/control/productRework/itemsProcess`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleMap/batchDelete`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleMap/add`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleMap/list`, {
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
      http.request<ResultObject['data']>(`/api/control/productPackRuleMap/delete`, {
        method: 'DELETE',
        params: query,
      }),
  },
  processInDefectCode: {
    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name RemoveProcessInDefectCode
     * @summary 删除工序缺陷
     * @request POST:/processInDefectCode/removeProcessInDefectCode
     * @secure
     */
    removeProcessInDefectCode: (data: ProcessInDefectCodeSearch) =>
      http.request<ResultObject['data']>(`/api/control/processInDefectCode/removeProcessInDefectCode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name RemoveProcessInDefectCodeBatch
     * @summary 批量删除工序缺陷
     * @request POST:/processInDefectCode/removeProcessInDefectCodeBatch
     * @secure
     */
    removeProcessInDefectCodeBatch: (data: ProcessInDefectCodeSearch) =>
      http.request<ResultObject['data']>(`/api/control/processInDefectCode/removeProcessInDefectCodeBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name ModifyProcessInDefectCode
     * @summary 编辑工序缺陷
     * @request POST:/processInDefectCode/modifyProcessInDefectCode
     * @secure
     */
    modifyProcessInDefectCode: (data: ProcessInDefectCode) =>
      http.request<ResultObject['data']>(`/api/control/processInDefectCode/modifyProcessInDefectCode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name GetList
     * @summary 查询工序缺陷
     * @request POST:/processInDefectCode/getList
     * @secure
     */
    getList: (data: ProcessInDefectCodeSearch) =>
      http.request<ResultPagingDataProcessInDefectCodeVO['data']>(`/api/control/processInDefectCode/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name AddProcessInDefectCode
     * @summary 新增缺陷代码
     * @request POST:/processInDefectCode/addProcessInDefectCode
     * @secure
     */
    addProcessInDefectCode: (data: ProcessInDefectCode) =>
      http.request<ResultObject['data']>(`/api/control/processInDefectCode/addProcessInDefectCode`, {
        method: 'POST',
        body: data as any,
      }),
  },
  pkgRelation: {
    /**
     * No description
     *
     * @tags 在制品箱包关系表
     * @name Save
     * @summary 保存箱包关系
     * @request POST:/pkgRelation/save
     * @secure
     */
    save: (data: PkgRelationDTO[]) =>
      http.request<ResultObject['data']>(`/api/control/pkgRelation/save`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品箱包关系表
     * @name GetPkgRelationByParentBarcode
     * @summary 根据父条码获取包装关系
     * @request GET:/pkgRelation/getPkgRelationByParentBarcode
     * @secure
     */
    getPkgRelationByParentBarcode: (query: { barcode: string }) =>
      http.request<ResultListPkgRelationVO['data']>(`/api/control/pkgRelation/getPkgRelationByParentBarcode`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 在制品箱包关系表
     * @name Release
     * @summary 解除箱包关系
     * @request DELETE:/pkgRelation/release
     * @secure
     */
    release: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/control/pkgRelation/release`, {
        method: 'DELETE',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品箱包关系表
     * @name ReleaseAll
     * @summary 解除所有箱包关系
     * @request DELETE:/pkgRelation/releaseAll
     * @secure
     */
    releaseAll: (query: { parentBarcode: string }) =>
      http.request<ResultObject['data']>(`/api/control/pkgRelation/releaseAll`, {
        method: 'DELETE',
        params: query,
      }),
  },
  moOnboard: {
    /**
     * No description
     *
     * @tags 工单投料表
     * @name GetMitemUseInfo
     * @summary 根据物料标签查询投料
     * @request POST:/moOnboard/getMitemUseInfo
     * @secure
     */
    getMitemUseInfo: (data: LabelNoSearch) =>
      http.request<ResultPagingDataMFTSubVO['data']>(`/api/control/moOnboard/getMitemUseInfo`, {
        method: 'POST',
        body: data as any,
      }),
  },
  mitemOnboard: {
    /**
     * No description
     *
     * @tags 投料表
     * @name Sumbit
     * @summary 工单投料-提交
     * @request POST:/mitemOnboard/save
     * @secure
     */
    sumbit: (data: MitemOnboardSubmitDTO) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/save`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 投料表
     * @name SaveUnbind
     * @summary 工单投料-卸料
     * @request POST:/mitemOnboard/saveUnbind
     * @secure
     */
    saveUnbind: (data: MitemOnboardUnbindDTO) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/saveUnbind`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 投料表
     * @name SaveTransferMo
     * @summary 工单投料-转料
     * @request POST:/mitemOnboard/saveTransferMo
     * @secure
     */
    saveTransferMo: (data: MitemOnboardUnbindDTO) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/saveTransferMo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 投料表
     * @name Scanlabel
     * @summary 工单投料-标签扫描
     * @request GET:/mitemOnboard/scanlabel
     * @secure
     */
    scanlabel: (query: {
      /** @default "" */
      labelNo?: string;
      processId: string;
      workcenterId: string;
      scheId: string;
    }) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/scanlabel`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 投料表
     * @name MoSchelist
     * @summary 查询近一周内的有效的排产工单
     * @request GET:/mitemOnboard/moSchelist
     * @secure
     */
    moSchelist: (query?: {
      /** @default "" */
      scheCode?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/moSchelist`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 投料表
     * @name List
     * @summary 根据工站id和工作中心id获取投料信息
     * @request GET:/mitemOnboard/list
     * @secure
     */
    list: (query?: {
      workcenterId?: string;
      workStationId?: string;
      /** @default "" */
      scheId?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 投料表
     * @name GetProccesByWorkStationId
     * @summary 工单投料-根据工站获取工序信息
     * @request GET:/mitemOnboard/getProccesByWorkStationId
     * @secure
     */
    getProccesByWorkStationId: (query?: {
      /** @default "" */
      workStationId?: string;
    }) =>
      http.request<ResultObject['data']>(`/api/control/mitemOnboard/getProccesByWorkStationId`, {
        method: 'GET',
        params: query,
      }),
  },
  label: {
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
      http.request<ResultObject['data']>(`/api/control/label/reprintBarcode`, {
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
      http.request<ResultObject['data']>(`/api/control/label/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetMoScheduleList
     * @summary 查询工单排产(标签打印上表格)
     * @request POST:/label/getMoScheduleList
     * @secure
     */
    getMoScheduleList: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/control/label/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeWipManagerList
     * @summary 查询在制品条码(标签管理表格)
     * @request POST:/label/getBarcodeWipManagerList
     * @secure
     */
    getBarcodeWipManagerList: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/control/label/getBarcodeWipManagerList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeWipLog
     * @summary 查询日志
     * @request POST:/label/getBarcodeWipLog
     * @secure
     */
    getBarcodeWipLog: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/control/label/getBarcodeWipLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeWipList
     * @summary 查询在制品条码(标签打印下表格)
     * @request POST:/label/getBarcodeWipList
     * @secure
     */
    getBarcodeWipList: (data: LabelSearch) =>
      http.request<ResultPagingDataLabelVO['data']>(`/api/control/label/getBarcodeWipList`, {
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
      http.request<ResultObject['data']>(`/api/control/label/generateBarcode`, {
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
      http.request<ResultObject['data']>(`/api/control/label/cancellationBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/label/getPrintTmplList
     * @secure
     */
    getPrintTmplList: () =>
      http.request<ResultPagingDataPrintTmpl['data']>(`/api/control/label/getPrintTmplList`, {
        method: 'GET',
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeRuleList
     * @summary 获得条码规则下拉数据
     * @request GET:/label/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: () =>
      http.request<ResultPagingDataBarcodeRule['data']>(`/api/control/label/getBarcodeRuleList`, {
        method: 'GET',
      }),
  },
  barcodeWipCollect: {
    /**
     * No description
     *
     * @tags 过站采集
     * @name ScanBarcodeWipCollect
     * @summary 过站采集扫码
     * @request POST:/barcodeWipCollect/scanBarcodeWipCollect
     * @secure
     */
    scanBarcodeWipCollect: (data: BarcodeWipCollectVO) =>
      http.request<ResultBarcodeWipCollectVO['data']>(`/api/control/barcodeWipCollect/scanBarcodeWipCollect`, {
        method: 'POST',
        body: data as any,
      }),
  },
  barcodeWip: {
    /**
     * No description
     *
     * @tags 在制品条码表
     * @name ScanBarcodeWip
     * @summary 获取在制品条码信息
     * @request POST:/barcodeWip/scanBarcodeWip
     * @secure
     */
    scanBarcodeWip: (data: BarcodeWipVO) =>
      http.request<ResultBarcodeWipVO['data']>(`/api/control/barcodeWip/scanBarcodeWip`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品条码表
     * @name GetWipPkgInfo
     * @summary 获取条码包装规格信息
     * @request POST:/barcodeWip/getWipPkgInfo
     * @secure
     */
    getWipPkgInfo: (query: { barcode: string }) =>
      http.request<ResultWipPkgInfoVO['data']>(`/api/control/barcodeWip/getWipPkgInfo`, {
        method: 'POST',
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
      http.request<ResultObject['data']>(`/api/control/barcodePkg/reprintBarcode`, {
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
      http.request<ResultObject['data']>(`/api/control/barcodePkg/printBarcode`, {
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
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/control/barcodePkg/getTagList`, {
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
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/control/barcodePkg/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetByBarcode
     * @summary 根据条码获取包装信息
     * @request POST:/barcodePkg/getByBarcode
     * @secure
     */
    getByBarcode: (query: { barcode: string }) =>
      http.request<ResultBarcodePkg['data']>(`/api/control/barcodePkg/getByBarcode`, {
        method: 'POST',
        params: query,
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
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/control/barcodePkg/getBarcodePkgManagerList`, {
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
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/control/barcodePkg/getBarcodePkgLog`, {
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
      http.request<ResultPagingDataBarcodePkgVO['data']>(`/api/control/barcodePkg/getBarcodePkgList`, {
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
      http.request<ResultObject['data']>(`/api/control/barcodePkg/generateBarcode`, {
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
      http.request<ResultObject['data']>(`/api/control/barcodePkg/cancellationBarcode`, {
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
    getPrintTmplList: (query: { packType: string }) =>
      http.request<ResultPagingDataPrintTmpl['data']>(`/api/control/barcodePkg/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 包装条码表
     * @name GetPkgInfoRelation
     * @summary 根据外箱条码获取箱包关系信息
     * @request GET:/barcodePkg/getPkgInfoRelation
     * @secure
     */
    getPkgInfoRelation: (query: { barcode: string }) =>
      http.request<ResultPkgInfoRelationVO['data']>(`/api/control/barcodePkg/getPkgInfoRelation`, {
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
    getBarcodeRuleList: (query: { packType: string }) =>
      http.request<ResultPagingDataBarcodeRule['data']>(`/api/control/barcodePkg/getBarcodeRuleList`, {
        method: 'GET',
        params: query,
      }),
  },
  atomicSaveKeypart: {
    /**
     * No description
     *
     * @tags 原子相关方法-保存关键件信息
     * @name ExcuteAtomic
     * @summary 保存关键件信息
     * @request POST:/atomicSaveKeypart/excuteAtomic
     * @secure
     */
    excuteAtomic: (data: AtomicContext) =>
      http.request<ResultAtomicContext['data']>(`/api/control/atomicSaveKeypart/excuteAtomic`, {
        method: 'POST',
        body: data as any,
      }),
  },
  atomicMoBarcodCheck: {
    /**
     * No description
     *
     * @tags 原子相关方法-校验条码状态、工单状态
     * @name ExcuteAtomic
     * @summary 校验条码状态、工单状态
     * @request POST:/atomicMoBarcodCheck/excuteAtomic
     * @secure
     */
    excuteAtomic: (data: AtomicContext) =>
      http.request<ResultAtomicContext['data']>(`/api/control/atomicMoBarcodCheck/excuteAtomic`, {
        method: 'POST',
        body: data as any,
      }),
  },
  atomicCheckKeypart: {
    /**
     * No description
     *
     * @tags 原子相关方法-校验关键件
     * @name ExcuteAtomic
     * @summary 校验关键件
     * @request POST:/atomicCheckKeypart/excuteAtomic
     * @secure
     */
    excuteAtomic: (data: AtomicContext) =>
      http.request<ResultAtomicContext['data']>(`/api/control/atomicCheckKeypart/excuteAtomic`, {
        method: 'POST',
        body: data as any,
      }),
  },
  atomicCheckBarcodeRouting: {
    /**
     * No description
     *
     * @tags 原子相关方法-校验扫描站点工艺路线是否正确
     * @name ExcuteAtomic
     * @summary 校验扫描站点工艺路线是否正确
     * @request POST:/atomicCheckBarcodeRouting/excuteAtomic
     * @secure
     */
    excuteAtomic: (data: AtomicContext) =>
      http.request<ResultAtomicContext['data']>(`/api/control/atomicCheckBarcodeRouting/excuteAtomic`, {
        method: 'POST',
        body: data as any,
      }),
  },
  atomicCheckBarcodeRepeat: {
    /**
     * No description
     *
     * @tags 原子相关方法-校验条码是否重复扫描
     * @name ExcuteAtomic
     * @summary 校验条码是否重复扫描
     * @request POST:/atomicCheckBarcodeRepeat/excuteAtomic
     * @secure
     */
    excuteAtomic: (data: AtomicContext) =>
      http.request<ResultAtomicContext['data']>(`/api/control/atomicCheckBarcodeRepeat/excuteAtomic`, {
        method: 'POST',
        body: data as any,
      }),
  },
  moLog: {
    /**
     * No description
     *
     * @tags 工单日志
     * @name GetMoLogListByMoCode
     * @summary 根据工单号获取工单日志信息
     * @request GET:/moLog/getMoLogListByMoId
     * @secure
     */
    getMoLogListByMoCode: (query: { moId: string }) =>
      http.request<ResultObject['data']>(`/api/control/moLog/getMoLogListByMoId`, {
        method: 'GET',
        params: query,
      }),
  },
  moBom: {
    /**
     * No description
     *
     * @tags 工单BOM
     * @name GetMoBomListByMoCode
     * @summary 根据工单号获取工单BOM信息
     * @request GET:/moBom/getMoBomListByMoCode
     * @secure
     */
    getMoBomListByMoCode: (query: { moId: string }) =>
      http.request<ResultObject['data']>(`/api/control/moBom/getMoBomListByMoCode`, {
        method: 'GET',
        params: query,
      }),
  },
};
