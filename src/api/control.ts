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

/** 完工入库标签实体 */
export interface WipCompletionLabelDTO {
  id?: string;
  /** 单据号 */
  billNo?: string;
  /** 业务类型编码 */
  businessCategoryCode?: string;
  mitemId?: string;
  /** 物料名称 */
  mitemName?: string;
  mitemCategoryId?: string;
  /** 物料类型名称 */
  mitemCategoryName?: string;
  warehouseId?: string;
  /** 仓库名称 */
  warehouseName?: string;
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

/** 响应数据 */
export type PagingDataMoSchedule = {
  list?: MoSchedule[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMoSchedule {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMoSchedule;
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
   * 开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 结束日期
   * @format date-time
   */
  dateEnd?: string;
  workshopId?: string;
  workcenterId?: string;
  mitemId?: string;
  /** 工单状态 */
  moStatus?: string;
  /** 是否仅显示已打印 */
  isFinishDisplay?: boolean;
  moScheduleId?: string;
  /** 是否仅显示已生成 */
  isCreated?: boolean;
  /** 多个id */
  ids?: string[];
  /** 状态 */
  state?: number[];
  moId?: string;
}

/** 显示工单投料标签扫描 */
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
  /** 工单 */
  scheCode?: string;
  /** 工单状态 */
  moStatus?: string;
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
  /** 计量单位 */
  uom?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 计量单位名称 */
  uomName?: string;
  /** 条码序列号 */
  serialNumber?: string;
  /** 条码状态 */
  barcodeStatus?: string;
  /**
   * 在制品数量
   * @format int32
   */
  wipNum?: number;
  /** 创建人名称 */
  creatorName?: string;
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
  /** 流程卡号 */
  runCard?: string;
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
  /** 扫码类型(SCANEXT,KEYPART) */
  uom?: string;
  uomName?: string;
  scanType?: string;
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
  /** 下个工序代码 */
  nextProcessCode?: string;
  /** 下个工序名称 */
  nextProcessName?: string;
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
  workshopName?: string;
  workshopId?: string;
  workshopCode?: string;
  /** @format date-time */
  datetimeSche?: string;
  stateName?: string;
  /** 扫描状态 */
  scanSuccess?: boolean;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  isState?: boolean;
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
  /** 关键条码信息 */
  keyPartList?: WipKeypart[];
  isScanFinish?: boolean;
  getkeyPartCodeStr?: string;
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
  /** 流程卡号 */
  runCard?: string;
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
  workshopName?: string;
  workshopId?: string;
  workshopCode?: string;
  /** @format date-time */
  datetimeSche?: string;
  stateName?: string;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  isState?: boolean;
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
  selectKeyword?: string[];
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

export interface WipCompletionBillVO {
  id?: string;
  billNo?: string;
  warehouse?: string;
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

/**
 * @title scm项目
 * @version v1
 *
 * scm项目API汇总
 */

export const api = {
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
  },
  wip: {
    /**
     * No description
     *
     * @tags 在制品表
     * @name SaveByWipCompletionLabel
     * @summary 通过扫描标签保存完工入库单据
     * @request POST:/wip/saveByWipCompletionLabel
     * @secure
     */
    saveByWipCompletionLabel: (data: WipCompletionLabelDTO) =>
      http.request<ResultObject['data']>(`/api/control/wip/saveByWipCompletionLabel`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品表
     * @name GetWipCompletionLabelList
     * @summary 根据单据ID获取已扫入的完工入库条码
     * @request GET:/wip/getWipCompletionLabelList
     * @secure
     */
    getWipCompletionLabelList: (query: { id: string }) =>
      http.request<ResultListWipCompletionLabelDTO['data']>(`/api/control/wip/getWipCompletionLabelList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 在制品表
     * @name GetDraftWipCompletionBillList
     * @summary 获取未提交的完工入库单据
     * @request GET:/wip/getDraftWipCompletionBillList
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
      http.request<ResultPagingDataWipCompletionBillVO['data']>(`/api/control/wip/getDraftWipCompletionBillList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 在制品表
     * @name DeleteBarcode
     * @summary 根据交易明细标签ID删除对应的明细标签
     * @request DELETE:/wip/deleteBarcode
     * @secure
     */
    deleteBarcode: (query: { barcodeId: string }) =>
      http.request<ResultObject['data']>(`/api/control/wip/deleteBarcode`, {
        method: 'DELETE',
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
  moSchedule: {
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
      http.request<ResultPagingDataMoSchedule['data']>(`/api/control/moSchedule/items`, {
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
      http.request<ResultMoSchedule['data']>(`/api/control/moSchedule/items/${id}`, {
        method: 'POST',
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
      http.request<ResultObject['data']>(`/api/control/mo/updateMoRouting`, {
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
      http.request<ResultPagingDataMo['data']>(`/api/control/mo/items`, {
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
      http.request<ResultMo['data']>(`/api/control/mo/items/${id}`, {
        method: 'POST',
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
      http.request<ResultObject['data']>(`/api/control/mo/getmolist`, {
        method: 'GET',
        params: query,
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
     * @name GetMoScheduleList
     * @summary 查询工单排产
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
     * @name GetBarcodeWipList
     * @summary 查询在制品条码
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
      http.request<ResultObject['data']>(`/api/control/barcodeRuleInMitem/removeMitemBatch`, {
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
      http.request<ResultObject['data']>(`/api/control/barcodeRuleInMitem/modifyBarcodeRule`, {
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
      http.request<ResultPagingDataBarcodeRuleInMitemVO['data']>(`/api/control/barcodeRuleInMitem/getMitemList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品条码生成规则表
     * @name GetBarcodeRuleList
     * @summary 查询条码类型
     * @request POST:/barcodeRuleInMitem/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: (data: BarcodeRuleInMitemSearch) =>
      http.request<ResultPagingDataBarcodeRuleInMitemVO['data']>(`/api/control/barcodeRuleInMitem/getBarcodeRuleList`, {
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
      http.request<ResultObject['data']>(`/api/control/barcodeRuleInMitem/addBarcodeRule`, {
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
      http.request<ResultObject['data']>(`/api/control/barcodeRuleInMitem/addBarcodeRuleMitem`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultPagingDataBarcodeSegmentDTO['data']>(`/api/control/barcodeRuleInMitem/getRuleSegment`, {
        method: 'GET',
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
