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

/** 班组排班表 */
export interface WorkgroupArrange {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  workgroupId?: string;
  /**
   * 排班日期
   * @format date-time
   */
  datetimeArrange?: string;
  attendanceModeId?: string;
  /** 班次 */
  shiftCode?: string;
  /** 出勤模式表达式 */
  attendanceExpression?: string;
}

export interface WorkgroupArrangeSearch {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  workgroupId?: string;
  /**
   * 排班日期
   * @format date-time
   */
  datetimeArrange?: string;
  attendanceModeId?: string;
  /** 班次 */
  shiftCode?: string;
  /** 出勤模式表达式 */
  attendanceExpression?: string;
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
  /** 班组模糊关键词 */
  workgroupKeyword?: string;
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

/** 通用响应类 */
export interface ResultListWorkgroupArrangeVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WorkgroupArrangeVO[] | null;
}

/** 班组排班输出类 */
export interface WorkgroupArrangeDTO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  workgroupId?: string;
  /**
   * 排班日期
   * @format date-time
   */
  datetimeArrange?: string;
  attendanceModeId?: string;
  /** 班次 */
  shiftCode?: string;
  /** 出勤模式表达式 */
  attendanceExpression?: string;
  /** 班组名称 */
  workgroupName?: string;
  /** 工作中心名称 */
  wcName?: string;
  /** 出勤模式名称 */
  modeName?: string;
  /** 班次名称 */
  shiftName?: string;
  /** 表达式 */
  expression?: string;
  /** 时间段拆分 */
  expressionSpilt?: string[];
}

/** 班组排班输出类 */
export type WorkgroupArrangeVO = {
  /**
   * 排班日期
   * @format date-time
   */
  datetimeArrange?: string;
  /** 当日排班数据 */
  data?: WorkgroupArrangeDTO[];
} | null;

/** 响应数据 */
export type KeyValuePairLongInteger = {
  value?: string;
  label?: string;
  /** @format int32 */
  num?: number;
  id?: string;
  res?: number[];
} | null;

/** 通用响应类 */
export interface ResultListKeyValuePairLongInteger {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: KeyValuePairLongInteger[] | null;
}

export interface WorkgroupSearch {
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
  /** 班组模糊关键词 */
  workgroupKeyword?: string;
  /** 员工模糊关键词 */
  personKeyword?: string;
  workgroupId?: string;
  /** 多个ID */
  personIds?: string[];
  /** 新增的 */
  insertList?: string[];
  /** 删除的 */
  deleteList?: string[];
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

/** 响应数据 */
export type PagingDataPersonOfWorkgroupVO = {
  list?: PersonOfWorkgroupVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 显示工站 */
export interface PersonOfWorkgroupVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
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
  /** 性别，1男，0女 */
  genderName?: string;
}

/** 通用响应类 */
export interface ResultPagingDataPersonOfWorkgroupVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPersonOfWorkgroupVO;
}

/** 响应数据 */
export type PagingDataWorkgroupVO = {
  list?: WorkgroupVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWorkgroupVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWorkgroupVO;
}

/** 显示工站 */
export interface WorkgroupVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  /** 所属车间名称 */
  workshopName?: string;
  /**
   * 班组人员数
   * @format int32
   */
  personCount?: number;
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
  /**
   * 维修次数
   * @format int32
   */
  repairTimes?: number;
  /** 维修状态 */
  repairStatusName?: string;
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
  customerConditions?: Filter[];
  moScheId?: string;
  /** 开始时间 */
  beginDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 维修状态 */
  repairStatus?: string[];
  /** 批量维修ID */
  wipRepairIds?: string[];
  /** 维修状态 */
  statusList?: string[];
  loginProcessId?: string;
  loginWorkstationId?: string;
  loginWorkCenterId?: string;
  /** 是否报废 */
  isScrapped?: boolean;
  /** 产品条码 */
  scanBarcode?: string;
  mitemId?: string;
  /** 维修人 */
  repairUser?: string;
  /**
   * 维修开始日期
   * @format date-time
   */
  repairDateStart?: string;
  /**
   * 维修结束日期
   * @format date-time
   */
  repairDateEnd?: string;
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

/** 维修单IDS */
export interface WipRepairIds {
  wipRepairId?: string;
  /** 提交的维修中明细ID */
  idsRepairingList?: string[];
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
  userRepairId?: string;
  returnRoutingProcessId?: string;
  /** 维修结果 */
  repairResult?: string;
  /** 状态 */
  status?: string;
  /**
   * 维修开始时间
   * @format date-time
   */
  datetimeRepairing?: string;
  /**
   * 维修结束时间
   * @format date-time
   */
  datetimeRepaired?: string;
  /** 不合格数据 */
  ngQty?: number;
  mitemId?: string;
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 排产工单编码 */
  moScheCode?: string;
  /** 工单编码 */
  moCode?: string;
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
  curRepairProcessId?: string;
  curWorkstationId?: string;
  loginProcessId?: string;
  loginWorkstationId?: string;
  /** 缺陷编码 */
  defectCode?: string;
  /** 缺陷名称 */
  defectName?: string;
  /** 缺陷原因 */
  defectReason?: string;
  /** 缺陷责任别 */
  defectBlame?: string;
  defectCodeId?: string;
  /** 缺陷处理方法名称 */
  methodName?: string;
  /** 缺陷处理方法ID */
  defectDealMethodIdList?: string[];
  mttr?: string;
  /** 是否报废 */
  isScrapped?: boolean;
  wipRepairId?: string;
  /** 维修中提交的ID */
  wipRepairIdList?: WipRepairIds[];
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

export interface WipLogSearch {
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
   * 过站开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 过站结束日期
   * @format date-time
   */
  dateEnd?: string;
  moId?: string;
  workCenterId?: string;
  workstationId?: string;
  workshopId?: string;
  mitemId?: string;
  /** 产品条码 */
  serialNumber?: string;
}

/** 响应数据 */
export type PagingDataWipLogSearchVO = {
  list?: WipLogSearchVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipLogSearchVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipLogSearchVO;
}

export interface WipLogSearchVO {
  id?: string;
  /** 排产单号 */
  moScheCode?: string;
  /** 产品编码 */
  pdCode?: string;
  /** 产品条码 */
  serialNumber?: string;
  /** 工单号 */
  moCode?: string;
  /** 工作中心编码 */
  workcenterCode?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 上一个工站名称 */
  preWorkstationrName?: string;
  /** 当前工站名称 */
  curWorkstationrName?: string;
  /** 工作中心描述 */
  workcenterName?: string;
  /** 产品描述 */
  pdDesc?: string;
  /** 过站人 */
  creatorName?: string;
  /**
   * 过站时间
   * @format date-time
   */
  timeCreate?: string;
}

/** 关键件查询 */
export interface WipKeypartVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  /** 物料代码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 新关键件条码 */
  newKeypartBarcode?: string;
  /** 启用编辑 */
  isEdit?: boolean;
  curWorkstationId?: string;
  curProcessId?: string;
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

/** 关键件查询 */
export interface WipKeypartSearch {
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
  /** 产品条码 */
  scanBarcodeList?: string[];
}

/** 响应数据 */
export type PagingDataWipKeypartVO = {
  list?: WipKeypartVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipKeypartVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipKeypartVO;
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

/** 品质控制-产品 */
export interface WipQcHoldSearch {
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
  mitemCategroyId?: string;
  mitemId?: string;
  workshopId?: string;
  /** 排产单编码 */
  moCode?: string;
  processId?: string;
  workCenterId?: string;
  workstationId?: string;
  /** 产品条码 */
  barcode?: string;
  /** 物料标签 */
  label?: string;
  /** 关键件条码 */
  keyPart?: string;
  /** 加工开始时间 */
  datetimeStart?: string;
  /** 加工结束时间 */
  datetimeEnd?: string;
  /** @format int32 */
  isHold?: number;
}

/** 响应数据 */
export type PagingDataWipQcHoldVO = {
  list?: WipQcHoldVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipQcHoldVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipQcHoldVO;
}

/** 品质控制-产品 */
export interface WipQcHoldVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  moId?: string;
  workcenterId?: string;
  preProcessId?: string;
  preWorkstationId?: string;
  mitemId?: string;
  curProcessId?: string;
  curWorkstationId?: string;
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
  /**
   * 是否合格 0：合格；1：不合格
   * @format int32
   */
  isNg?: number;
  /**
   * 是否暂停
   * @format int32
   */
  isHold?: number;
  /** 终端计算机名 */
  terminal?: string;
  /** 工单号 */
  scheCode?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  moClass?: string;
  /** 车间编码 */
  workshopCode?: string;
  /** 车间名称 */
  workshopName?: string;
  workCenterCode?: string;
  workCenterName?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 完工数量
   * @format int32
   */
  completedNum?: number;
  barcode?: string;
  barcodeStatus?: string;
  barcodeStatusName?: string;
  uom?: string;
  uomName?: string;
  curProcessCode?: string;
  curProcessName?: string;
  curWorkStationCode?: string;
  curWorkStationName?: string;
  /** 产品加工时间 */
  processTime?: string;
  /** 计划结束时间 */
  datetimePlanEnd?: string;
  productStatus?: string;
}

/** 维修单查询 */
export interface WipSearch {
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
  workshopId?: string;
  moId?: string;
  /**
   * 加工开始日期
   * @format date-time
   */
  processingDateStart?: string;
  /**
   * 加工结束日期
   * @format date-time
   */
  processingDateEnd?: string;
  processId?: string;
}

/** 响应数据 */
export type PagingDataMapStringObject = {
  list?: Record<string, object>[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMapStringObject {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMapStringObject;
}

/** 响应数据 */
export type PagingDataWipProcessDtlVO = {
  list?: WipProcessDtlVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipProcessDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipProcessDtlVO;
}

/** WIP报表产品明细 */
export interface WipProcessDtlVO {
  /** 工单号 */
  moCode?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 产品条码 */
  serialNumber?: string;
  /** 当前工作中心名称 */
  workcenterName?: string;
  /** 当前工站名称 */
  workstationName?: string;
  /**
   * 是否合格
   * @format int32
   */
  isNg?: number;
  /** 产品状态名称 */
  status?: string;
  /**
   * 加工时间
   * @format date-time
   */
  timeProcessing?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /**
   * 停留时间
   * @format int32
   */
  timeStay?: number;
}

export interface StraightThroughRateReportSearch {
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
  /** 工序ID */
  processIds?: string[];
  /** 物料ID */
  mitemIds?: string[];
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

/** 通用响应类 */
export interface ResultListStraightThroughRateReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: StraightThroughRateReportVO[] | null;
}

/** 直通率报表 */
export type StraightThroughRateReportVO = {
  processId?: string;
  /** 工序名称 */
  processName?: string;
  mitemId?: string;
  /** 产品名称 */
  mitemName?: string;
  /**
   * 合格品数量
   * @format int32
   */
  passQuantity?: number;
  /**
   * 投入总量
   * @format int32
   */
  putTotal?: number;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /**
   * 当日结束时间
   * @format date-time
   */
  dayFinish?: string;
  /**
   * 两位日数
   * @format int32
   */
  days?: number;
  /**
   * 是否合格 0：合格；1：不合格
   * @format int32
   */
  dcResult?: number;
  /**
   * 工序直通率
   * @format double
   */
  processRate?: number;
  /**
   * 产品直通率
   * @format double
   */
  mitemRate?: number;
} | null;

/** 关键物料追溯（反向）-查询 */
export interface ReverseTraceabilityReportSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  /** 产品条码 */
  serialNumber?: string;
  /** 工单号 */
  moCode?: string;
  /** 包装箱码 */
  parentPkgBarcode?: string;
}

/** 响应数据 */
export type PagingDataProductWipRepairVO = {
  list?: ProductWipRepairVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 追溯维修单 */
export interface ProductWipRepairVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  userRepairId?: string;
  returnRoutingProcessId?: string;
  /** 维修结果 */
  repairResult?: string;
  /** 状态 */
  status?: string;
  /**
   * 维修开始时间
   * @format date-time
   */
  datetimeRepairing?: string;
  /**
   * 维修结束时间
   * @format date-time
   */
  datetimeRepaired?: string;
  /** 不合格数据 */
  ngQty?: number;
  /**
   * 采集时间
   * @format date-time
   */
  timeScanBarcode?: string;
  /** 父级包装条码 */
  parentPkgBarcode?: string;
  /** 工单 */
  moCode?: string;
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

/** 通用响应类 */
export interface ResultPagingDataProductWipRepairVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProductWipRepairVO;
}

/** 响应数据 */
export type PagingDataWipKeypartReportVO = {
  list?: WipKeypartReportVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataWipKeypartReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataWipKeypartReportVO;
}

/** 关键物料追溯（反向）-关键件信息 */
export interface WipKeypartReportVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 产品条码 */
  serialNumber?: string;
  /** 工单号 */
  moCode?: string;
  /** 排产单号 */
  moScheCode?: string;
  /** 包装箱码 */
  parentPkgBarcode?: string;
  /** 工序编码 */
  processCode?: string;
  /** 工序名称 */
  processName?: string;
  /** 工站编码 */
  workstationCode?: string;
  /** 工站名称 */
  workstationName?: string;
  /** 状态 */
  status?: string;
  /** 状态名称 */
  statusName?: string;
  /**
   * 数量
   * @format double
   */
  qty?: number;
  /** 员工 */
  userName?: string;
  /** 员工名称 */
  displayName?: string;
  /** 关键件条码 */
  keypartBarcode?: string;
  /** 关键件条码类型 */
  keypartBarcodeType?: string;
  moScheId?: string;
  mitemId?: string;
  mitemCategoryId?: string;
  supplierId?: string;
  /** 批次号 */
  lotNo?: string;
  workstationId?: string;
  processId?: string;
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

/** 生产历史信息 */
export interface PagingDataWipLog {
  list?: WipLog[];
  /** @format int32 */
  total?: number;
}

/** 关键物料追溯（反向）-产品基础信息 */
export type ProductBaseReportVO = {
  /** 用户名 */
  userName?: string;
  /** 姓名 */
  displayName?: string;
  /** 产品条码 */
  serialNumber?: string;
  /** 工单号 */
  moCode?: string;
  /** 包装箱码 */
  parentPkgBarcode?: string;
  /**
   * 产品创建时间
   * @format date-time
   */
  serialNumberTimeCreate?: string;
  /**
   * 在制品最后修改时间
   * @format date-time
   */
  lastTimeModified?: string;
  /** 排产单号 */
  moScheCode?: string;
  /** 当前工序编码 */
  curProcessCode?: string;
  /** 当前工序名称 */
  curProcessName?: string;
  /** 当前工站编码 */
  curWorkstationCode?: string;
  /** 当前工站名称 */
  curWorkstationName?: string;
  /** 当前车间编码 */
  curWorkshopCode?: string;
  /** 当前车间名称 */
  curWorkshopName?: string;
  /** 当前工作中心编码 */
  curWorkcenterCode?: string;
  /** 当前工作中心间名称 */
  curWorkcenterName?: string;
  /** 生产历史信息 */
  wipLogList?: PagingDataWipLog;
} | null;

/** 通用响应类 */
export interface ResultProductBaseReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 关键物料追溯（反向）-产品基础信息 */
  data?: ProductBaseReportVO;
}

/** 在制品日志表 */
export interface WipLog {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  moId?: string;
  /** 工单号 */
  moCode?: string;
  mitemId?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  workcenterId?: string;
  /** 工作中心编码 */
  workcenterCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  preProcessId?: string;
  /** 来源工序编码 */
  preProcessCode?: string;
  /** 来源工序名称 */
  preProcessName?: string;
  preWorkstationId?: string;
  /** 来源工站编码 */
  preWorkstationCode?: string;
  /** 来源工站名称 */
  preWorkstationName?: string;
  curProcessId?: string;
  /** 当前工序编码 */
  curProcessCode?: string;
  /** 当前工序名称 */
  curProcessName?: string;
  curWorkstationId?: string;
  /** 当前工站编码 */
  curWorkstationCode?: string;
  /** 当前工站名称 */
  curWorkstationName?: string;
  /** 车间编码 */
  workshopCode?: string;
  /** 车间名称 */
  workshopName?: string;
  /** 班组编码 */
  workgroupCode?: string;
  /** 班组名称 */
  workgroupName?: string;
  /** 班次编码 */
  shiftCode?: string;
  /**
   * 排班日期
   * @format date-time
   */
  shiftDay?: string;
  /**
   * 年
   * @format int32
   */
  scanYear?: number;
  /**
   * 月
   * @format int32
   */
  scanMonth?: number;
  /**
   * 日
   * @format int32
   */
  scanDay?: number;
  /**
   * 时
   * @format int32
   */
  scanHour?: number;
  /**
   * 分
   * @format int32
   */
  scanMinute?: number;
  /**
   * 周
   * @format int32
   */
  scanWeek?: number;
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
  /**
   * 是否合格 0：合格；1：不合格
   * @format int32
   */
  dcResult?: number;
  /**
   * 是否暂停
   * @format int32
   */
  isHold?: number;
  /** 终端计算机名 */
  terminal?: string;
}

/** 响应数据 */
export type PagingDataPkgRelationReportVO = {
  list?: PkgRelationReportVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 箱包关系报表前端显示 */
export interface PkgRelationReportVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
  modifier?: string;
  /**
   * 状态，1可用；0禁用
   * @format int32
   * @default 1
   */
  state?: number;
  eid?: string;
  oid?: string;
  moScheId?: string;
  /** 包装条码 */
  pkgBarcode?: string;
  /** 包装条码类型 */
  pkgBarcodeType?: string;
  /** 父级包装条码 */
  parentPkgBarcode?: string;
  /** 父级包装条码类型 */
  parentPkgType?: string;
  /**
   * 包装序号
   * @format int32
   */
  seq?: number;
  workstationId?: string;
  workcenterId?: string;
  workshopId?: string;
  /** 状态 */
  status?: string;
  /** 工单号 */
  moCode?: string;
  /** 工单状态 */
  moStatusName?: string;
  /** 排产单号 */
  scheCode?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 产品名称 */
  mitemName?: string;
  /** 产品描述 */
  mitemDesc?: string;
  /** 用户名 */
  userName?: string;
  /** 包装条码类型名称 */
  pkgBarcodeTypeName?: string;
  /** 父级包装条码类型名称 */
  parentPkgTypeName?: string;
  /** 状态名称 */
  statusName?: string;
  /** 父级包装条码的上级条码（如果为空说明是顶级） */
  topParentPkgBarcode?: string;
  /** 是否存在子集 */
  existPkgRelationReportcChildren?: boolean;
  /** 报表子集 */
  children?: PkgRelationReportVO[];
}

/** 通用响应类 */
export interface ResultPagingDataPkgRelationReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataPkgRelationReportVO;
}

/** 关键物料追溯（反向）-关键件信息 */
export interface MoOnboardReportVO {
  /** 生产批次 */
  lotNo?: string;
  /** 物料条码 */
  serialNumber?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 物料名称 */
  mitemName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 排产单号 */
  moScheCode?: string;
  /** 工单号 */
  moCode?: string;
  /** 包装箱码 */
  parentPkgBarcode?: string;
  /** 绑定工序 */
  processCode?: string;
  /** 绑定工序名称 */
  processName?: string;
  /** 绑定工站 */
  workstationCode?: string;
  /** 绑定工站名称 */
  workstationName?: string;
  /** 员工 */
  userName?: string;
  /** 员工名称 */
  displayName?: string;
  /** 产品编码 */
  moMitemCode?: string;
  /** 供应商编码 */
  supplierCode?: string;
  /** 供应商名称 */
  supplierName?: string;
  /** 投料状态 */
  status?: string;
  /** 投料状态 */
  statusName?: string;
  /** 工作中心 */
  workcenterCode?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /**
   * 投料时间
   * @format date-time
   */
  datetimeOnboard?: string;
  /** 物料投料条码 */
  scanBarcode?: string;
}

/** 响应数据 */
export type PagingDataMoOnboardReportVO = {
  list?: MoOnboardReportVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMoOnboardReportVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMoOnboardReportVO;
}

/** 维修单 */
export type ProductWipRepairDtlVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  /**
   * 维修次数
   * @format int32
   */
  repairTimes?: number;
  /** 维修状态 */
  repairStatusName?: string;
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

/** 通用响应类 */
export interface ResultListProductWipRepairDtlVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: ProductWipRepairDtlVO[] | null;
}

export interface ProductionDefectStatisticsSearch {
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
  workcenterId?: string;
  moscheduleId?: string;
  /** 条码模糊 */
  barcode?: string;
  mitemId?: string;
  defectId?: string;
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
export type PagingDataProductionDefectStatisticsVO = {
  list?: ProductionDefectStatisticsVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 产品缺陷不良统计报表 */
export interface ProductionDefectStatisticsVO {
  /** 车间名称 */
  workshopName?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 条码 */
  scanBarcode?: string;
  /** 排产单号 */
  scheCode?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 产品名称 */
  mitemName?: string;
  /** 产品描述 */
  mitemDesc?: string;
  /** 缺陷描述 */
  defectName?: string;
  /** 不合格数量 */
  ngQty?: number;
  /** 工站名称 */
  workstationName?: string;
  /** 缺陷原因名称 */
  defectReasonName?: string;
  /** 处理方法名称 */
  methodName?: string;
  /** 缺陷责任别名称 */
  defectBlameName?: string;
  /** 录入人 */
  creatorName?: string;
  /**
   * 录入时间
   * @format date-time
   */
  timeCreate?: string;
  /** 维修用户名称 */
  userRepairName?: string;
  /**
   * 维修时间
   * @format date-time
   */
  datetimeRepaired?: string;
  /**
   * 排产日期
   * @format date-time
   */
  datetimeSche?: string;
  /** 工序名称 */
  processName?: string;
  /**
   * 缺陷总数
   * @format int32
   */
  defectTotal?: number;
  /**
   * 实际产量
   * @format int32
   */
  actualOutput?: number;
  /**
   * 合格数量
   * @format int32
   */
  qualifiedQuantity?: number;
  /**
   * 良率
   * @format double
   */
  passRate?: number;
  /**
   * 缺陷原因数量
   * @format int32
   */
  defectReasonQuantity?: number;
  /**
   * 缺陷原因总数量
   * @format int32
   */
  defectReasonTotal?: number;
  /**
   * 缺陷占比
   * @format double
   */
  defectProportion?: number;
  /**
   * 维修数量
   * @format int32
   */
  repairQuantity?: number;
  /**
   * 维修总数量
   * @format int32
   */
  repairTotal?: number;
  /**
   * 维修占比
   * @format double
   */
  repairProportion?: number;
  /**
   * 责任数量
   * @format int32
   */
  dutyQuantity?: number;
  /**
   * 责任总数量
   * @format int32
   */
  dutyTotal?: number;
  /**
   * 责任占比
   * @format double
   */
  dutyProportion?: number;
}

/** 通用响应类 */
export interface ResultPagingDataProductionDefectStatisticsVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProductionDefectStatisticsVO;
}

/** 产品返工返工前配置信息 */
export interface ProductReworkPreSettingDTO {
  isSameProcess?: boolean;
  isSameMo?: boolean;
  isByReworkMo?: boolean;
  reworkRoutingRevisionId?: string;
  reworkMoSheId?: string;
  reworkMoId?: string;
  reworkMoCode?: string;
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
  /** 状态 */
  status?: string;
  onhandId?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
  uom?: string;
  uomName?: string;
  keypartCode?: string;
  wipId?: string;
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
  preProcessId?: string;
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
  workshopCode?: string;
  workshopName?: string;
  /** @format date-time */
  datetimeSche?: string;
  workshopId?: string;
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
   * 用量分子
   * @format int32
   */
  numeratorQty?: number;
  /**
   * 用量分母
   * @format int32
   */
  denomainatorQty?: number;
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
  /** @format int32 */
  requestQty?: number;
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

/** 个人中心配置相关属性 */
export interface PersonalCenterSettingDTO {
  workshopCode?: string;
  workshopName?: string;
  workCenterId?: string;
  workCenterCode?: string;
  workCenterName?: string;
  workStationId?: string;
  workStationCode?: string;
  workStationName?: string;
  processId?: string;
}

/** 产品返工执行模型 */
export interface ProductReworkDTO {
  /** 条码集合信息 */
  barcodeList?: ProductReworkVO[];
  /** 产品返工返工前配置信息 */
  preSetting?: ProductReworkPreSettingDTO;
  /** 关键件数量汇总信息 */
  keyPartSumList?: WipKeyPartCollectVO[];
  /** 个人中心配置相关属性 */
  centersetting?: PersonalCenterSettingDTO;
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

/** 维修回流工序 */
export interface ProcessSearch {
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
  /** 缺陷模糊关键词 */
  keyWord?: string;
  /** 工序ID */
  processId?: string;
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
  /** 模糊关键词 */
  keyWord?: string;
  /** 工序ID */
  processId?: string;
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

export interface ProcessInDefectDTO {
  processId?: string;
  defectIds?: string[];
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

export interface PkgRelationSearch {
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
  /** 产品条码 */
  barcode?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 工单号 */
  moCode?: string;
  /** 排产单号 */
  moScheCode?: string;
  /** 箱条码 */
  pkgBarcode?: string;
  /** 开始时间 */
  beginDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 父级包装条码 */
  parentPkgBarcode?: string;
}

export interface ProductionProgressSearch {
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
  dateStart?: string;
  /**
   * 计划结束日期
   * @format date-time
   */
  dateEnd?: string;
  moScheId?: string;
  mitemId?: string;
}

/** 响应数据 */
export type PagingDataProductionProgressVO = {
  list?: ProductionProgressVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 生产进度报表 */
export interface ProductionProgressVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  completionProgress?: number;
}

/** 通用响应类 */
export interface ResultPagingDataProductionProgressVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataProductionProgressVO;
}

export interface MoOnboardSearch {
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
   * 投料开始日期
   * @format date-time
   */
  dateStart?: string;
  /**
   * 投料结束日期
   * @format date-time
   */
  dateEnd?: string;
  moId?: string;
  workCenterId?: string;
  mitemId?: string;
  /** 产品编码id */
  mitemLabelNo?: string;
}

export interface MoOnboardSearchVO {
  id?: string;
  /** 物料编码 */
  mitemCode?: string;
  /** 产品编码 */
  pdCode?: string;
  /** 物料标签 */
  mitemLabelNo?: string;
  /** 工单号 */
  moCode?: string;
  moMitemId?: string;
  /** 工作中心名称 */
  workcenterName?: string;
  /** 工序名称 */
  processName?: string;
  /** 工站名称 */
  workstationrName?: string;
  /** 物料描述 */
  mitemDesc?: string;
  /** 作业员名称 */
  creatorName?: string;
  /**
   * 投料时间
   * @format date-time
   */
  timeCreate?: string;
}

/** 响应数据 */
export type PagingDataMoOnboardSearchVO = {
  list?: MoOnboardSearchVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataMoOnboardSearchVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataMoOnboardSearchVO;
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
  workstationId?: string;
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
  workStationId?: string;
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
export type MFTSubVO = {
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
} | null;

/** 通用响应类 */
export interface ResultMFTSubVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 关键物料正向追溯VO */
  data?: MFTSubVO;
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

export interface LabelManageSearch {
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
export interface LabelManageVO {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  /** 操作类型 */
  operateType?: string;
  /** 原因 */
  reason?: string;
}

/** 响应数据 */
export type PagingDataLabelManageVO = {
  list?: LabelManageVO[];
  /** @format int32 */
  total?: number;
} | null;

/** 通用响应类 */
export interface ResultPagingDataLabelManageVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PagingDataLabelManageVO;
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
  /** 状态 */
  status?: string;
  onhandId?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
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
   * 实际完成时间
   * @format date-time
   */
  datetimeActualEnd?: string;
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
  workshopCode?: string;
  workshopName?: string;
  /** @format date-time */
  datetimeSche?: string;
  workshopId?: string;
  stateName?: string;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  /** 扫描状态 */
  scanSuccess?: boolean;
  isState?: boolean;
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
  /** 状态 */
  status?: string;
  onhandId?: string;
  /**
   * 入库时间
   * @format date-time
   */
  datetimeStockin?: string;
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
  workshopCode?: string;
  workshopName?: string;
  /** @format date-time */
  datetimeSche?: string;
  workshopId?: string;
  stateName?: string;
  datetimeScheStr?: string;
  scanDatetimeStr?: string;
  defectCodeStr?: string;
  isState?: boolean;
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

/** 响应数据 */
export type PkgExtendVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  moCode?: string;
} | null;

/** 通用响应类 */
export interface ResultPkgExtendVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: PkgExtendVO;
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
export interface ResultListWipRepairDtlTop5VO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WipRepairDtlTop5VO[] | null;
}

/** 维修单的缺陷明细TOP5 */
export type WipRepairDtlTop5VO = {
  defectCode?: string;
  defectName?: string;
  /** @format double */
  defectCodePercent?: number;
  /** @format int32 */
  defectCodeTotal?: number;
  /** @format date-time */
  beginDate?: string;
  /** @format date-time */
  endDate?: string;
  defectCodePercentStr?: string;
} | null;

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

/** 通用响应类 */
export interface ResultListWipVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: WipVO[] | null;
}

/** 产品维修单 */
export type WipVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  moId?: string;
  workcenterId?: string;
  preProcessId?: string;
  preWorkstationId?: string;
  mitemId?: string;
  curProcessId?: string;
  curWorkstationId?: string;
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
  /**
   * 是否合格 0：合格；1：不合格
   * @format int32
   */
  isNg?: number;
  /**
   * 是否暂停
   * @format int32
   */
  isHold?: number;
  /** 终端计算机名 */
  terminal?: string;
  /** 工单号 */
  moCode?: string;
  /** 产品编码 */
  mitemCode?: string;
  /** 工单类型 */
  moClass?: string;
  /** 车间名称 */
  workshopName?: string;
  /**
   * 计划数量
   * @format int32
   */
  planQty?: number;
  /**
   * 完工数量
   * @format int32
   */
  completedNum?: number;
  /** 产品名称 */
  mitemName?: string;
  /**
   * 当日计划完成数量
   * @format int32
   */
  planOfToday?: number;
  /**
   * 当日已完成数量
   * @format int32
   */
  completeOfToday?: number;
  /**
   * 当日产品达成率
   * @format double
   */
  achievingRateOfToday?: number;
  /**
   * 排产日期
   * @format date-time
   */
  datetimeSche?: string;
  routingRevisionId?: string;
} | null;

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

/** 显示缺陷代码实体 */
export type DefectCodeVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
} | null;

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

/** 显示排产工单BOM */
export type MoScheBomVO = {
  id?: string;
  /**
   * 创建时间
   * @format date-time
   */
  timeCreate?: string;
  /** 创建人 */
  creator?: string;
  /**
   * 修改时间
   * @format date-time
   */
  timeModified?: string;
  /** 修改人 */
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
  /** 工单需求量 */
  moRequestQty?: number;
  /**
   * 用量分子
   * @format int32
   */
  numeratorQty?: number;
  /**
   * 用量分母
   * @format int32
   */
  denomainatorQty?: number;
  parentMitemId?: string;
  /** 单位 */
  uom?: string;
  /** ERP BOM对应ID */
  erpBomId?: string;
  /** BOM版本 */
  bomVersion?: string;
  /** 实发数量 */
  pickQty?: number;
  /** 损耗率 */
  lossRate?: number;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  /**
   * 排产数量
   * @format int32
   */
  scheQty?: number;
  /** @format int32 */
  moScheRequestQty?: number;
} | null;

/** 通用响应类 */
export interface ResultListMoScheBomVO {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MoScheBomVO[] | null;
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
  workgroupArrange: {
    /**
     * No description
     *
     * @tags 班组排班表
     * @name RemoveWorkgroupArrange
     * @summary 删除班组排班
     * @request POST:/workgroupArrange/removeWorkgroupArrange
     * @secure
     */
    removeWorkgroupArrange: (data: string) =>
      http.request<ResultObject['data']>(`/api/control/workgroupArrange/removeWorkgroupArrange`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组排班表
     * @name ModifyWorkgroupArrange
     * @summary 编辑班组排班
     * @request POST:/workgroupArrange/modifyWorkgroupArrange
     * @secure
     */
    modifyWorkgroupArrange: (data: WorkgroupArrange) =>
      http.request<ResultObject['data']>(`/api/control/workgroupArrange/modifyWorkgroupArrange`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组排班表
     * @name GetList
     * @summary 查询班组排班数据
     * @request POST:/workgroupArrange/getList
     * @secure
     */
    getList: (data: WorkgroupArrangeSearch) =>
      http.request<ResultListWorkgroupArrangeVO['data']>(`/api/control/workgroupArrange/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组排班表
     * @name GetArrangeCount
     * @summary 查询班组排班计数
     * @request POST:/workgroupArrange/getArrangeCount
     * @secure
     */
    getArrangeCount: (data: WorkgroupArrangeSearch) =>
      http.request<ResultListKeyValuePairLongInteger['data']>(`/api/control/workgroupArrange/getArrangeCount`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组排班表
     * @name AddWorkgroupArrange
     * @summary 新增班组排班
     * @request POST:/workgroupArrange/addWorkgroupArrange
     * @secure
     */
    addWorkgroupArrange: (data: WorkgroupArrangeSearch) =>
      http.request<ResultObject['data']>(`/api/control/workgroupArrange/addWorkgroupArrange`, {
        method: 'POST',
        body: data as any,
      }),
  },
  workgroup: {
    /**
     * No description
     *
     * @tags 班组
     * @name RemoveWorkgroupBatch
     * @summary 删除班组
     * @request POST:/workgroup/removeWorkgroupBatch
     * @secure
     */
    removeWorkgroupBatch: (data: string[]) =>
      http.request<ResultObject['data']>(`/api/control/workgroup/removeWorkgroupBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name RemovePersonBatch
     * @summary 删除员工
     * @request POST:/workgroup/removePersonBatch
     * @secure
     */
    removePersonBatch: (data: WorkgroupSearch) =>
      http.request<ResultObject['data']>(`/api/control/workgroup/removePersonBatch`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name ModifyWorkgroup
     * @summary 编辑班组
     * @request POST:/workgroup/modifyWorkgroup
     * @secure
     */
    modifyWorkgroup: (data: Workgroup) =>
      http.request<ResultObject['data']>(`/api/control/workgroup/modifyWorkgroup`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name Search
     * @request POST:/workgroup/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultPagingDataWorkgroup['data']>(`/api/control/workgroup/items`, {
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
      http.request<ResultWorkgroup['data']>(`/api/control/workgroup/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name GetPersonList
     * @summary 查询班组人员
     * @request POST:/workgroup/getPersonList
     * @secure
     */
    getPersonList: (data: WorkgroupSearch) =>
      http.request<ResultPagingDataPersonOfWorkgroupVO['data']>(`/api/control/workgroup/getPersonList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name GetOutPerson
     * @summary 查询未进组人员
     * @request POST:/workgroup/getOutPerson
     * @secure
     */
    getOutPerson: (data: WorkgroupSearch) =>
      http.request<ResultPagingDataPersonOfWorkgroupVO['data']>(`/api/control/workgroup/getOutPerson`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name GetList
     * @summary 查询班组
     * @request POST:/workgroup/getList
     * @secure
     */
    getList: (data: WorkgroupSearch) =>
      http.request<ResultPagingDataWorkgroupVO['data']>(`/api/control/workgroup/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name GetInnerPerson
     * @summary 查询已进组人员
     * @request POST:/workgroup/getInnerPerson
     * @secure
     */
    getInnerPerson: (data: WorkgroupSearch) =>
      http.request<ResultPagingDataPersonOfWorkgroupVO['data']>(`/api/control/workgroup/getInnerPerson`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name AddWorkgroup
     * @summary 新增班组
     * @request POST:/workgroup/addWorkgroup
     * @secure
     */
    addWorkgroup: (data: Workgroup) =>
      http.request<ResultObject['data']>(`/api/control/workgroup/addWorkgroup`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 班组
     * @name AddWorkgroupPerson
     * @summary 新增处理组人员
     * @request POST:/workgroup/addWorkgroupPerson
     * @secure
     */
    addWorkgroupPerson: (data: WorkgroupSearch) =>
      http.request<ResultObject['data']>(`/api/control/workgroup/addWorkgroupPerson`, {
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
     * @name List
     * @summary 获取维修工单
     * @request POST:/wipRepair/items
     * @secure
     */
    list: (data: WipRepairSearch) =>
      http.request<ResultPagingDataWipRepairVO['data']>(`/api/control/wipRepair/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品维修表
     * @name GetVerifyProcessCategory
     * @summary 检验是否维修工序
     * @request POST:/wipRepair/getVerifyProcessCategory
     * @secure
     */
    getVerifyProcessCategory: (data: WipRepairSearch) =>
      http.request<ResultObject['data']>(`/api/control/wipRepair/getVerifyProcessCategory`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 产品维修表
     * @name GetReportData
     * @summary 获取产品维修报表数据
     * @request POST:/wipRepair/getReportData
     * @secure
     */
    getReportData: (data: WipRepairSearch) =>
      http.request<ResultPagingDataWipRepairVO['data']>(`/api/control/wipRepair/getReportData`, {
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

    /**
     * No description
     *
     * @tags 产品维修表
     * @name GetRepairTop5
     * @summary 本周缺陷TOP5
     * @request GET:/wipRepair/getRepairTop5
     * @secure
     */
    getRepairTop5: () =>
      http.request<ResultListWipRepairDtlTop5VO['data']>(`/api/control/wipRepair/getRepairTop5`, {
        method: 'GET',
      }),
  },
  wipLog: {
    /**
     * No description
     *
     * @tags 在制品日志表
     * @name Search
     * @request POST:/wipLog/search
     * @secure
     */
    search: (data: WipLogSearch) =>
      http.request<ResultPagingDataWipLogSearchVO['data']>(`/api/control/wipLog/search`, {
        method: 'POST',
        body: data as any,
      }),
  },
  wipKeypart: {
    /**
     * No description
     *
     * @tags 在制品关键件采集表
     * @name ReplaceWipKeypart
     * @summary 关键件替换
     * @request POST:/wipKeypart/replaceWipKeypart
     * @secure
     */
    replaceWipKeypart: (data: WipKeypartVO) =>
      http.request<ResultBoolean['data']>(`/api/control/wipKeypart/replaceWipKeypart`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品关键件采集表
     * @name RemoveWipKeypart
     * @summary 关键件移除
     * @request POST:/wipKeypart/removeWipKeypart
     * @secure
     */
    removeWipKeypart: (data: WipKeypartVO) =>
      http.request<ResultBoolean['data']>(`/api/control/wipKeypart/removeWipKeypart`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品关键件采集表
     * @name GetWipKeypartByRunCard
     * @summary 关键件查询
     * @request POST:/wipKeypart/getWipKeypartByRunCard
     * @secure
     */
    getWipKeypartByRunCard: (data: WipKeypartSearch) =>
      http.request<ResultPagingDataWipKeypartVO['data']>(`/api/control/wipKeypart/getWipKeypartByRunCard`, {
        method: 'POST',
        body: data as any,
      }),
  },
  wip: {
    /**
     * No description
     *
     * @tags 在制品表
     * @name GetQcHoldWipList
     * @summary 产品在制品条码列表-应用于品质控制查询
     * @request POST:/wip/getQcHoldWipList
     * @secure
     */
    getQcHoldWipList: (data: WipQcHoldSearch) =>
      http.request<ResultPagingDataWipQcHoldVO['data']>(`/api/control/wip/getQcHoldWipList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品表
     * @name GetList
     * @summary 获取主界面数据
     * @request POST:/wip/getList
     * @secure
     */
    getList: (data: WipSearch) =>
      http.request<ResultPagingDataMapStringObject['data']>(`/api/control/wip/getList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品表
     * @name GetDtlList
     * @summary 获取产品明细界面数据
     * @request POST:/wip/getDtlList
     * @secure
     */
    getDtlList: (data: WipSearch) =>
      http.request<ResultPagingDataWipProcessDtlVO['data']>(`/api/control/wip/getDtlList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 在制品表
     * @name GetAchievingRate
     * @summary 工作台指标计划达成率
     * @request GET:/wip/getAchievingRate
     * @secure
     */
    getAchievingRate: () =>
      http.request<ResultListWipVO['data']>(`/api/control/wip/getAchievingRate`, {
        method: 'GET',
      }),
  },
  straightThroughRateReport: {
    /**
     * No description
     *
     * @tags 直通率报表
     * @name GetSingle
     * @summary 单工序单产品查询
     * @request POST:/straightThroughRateReport/getSingle
     * @secure
     */
    getSingle: (data: StraightThroughRateReportSearch) =>
      http.request<ResultListStraightThroughRateReportVO['data']>(`/api/control/straightThroughRateReport/getSingle`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 直通率报表
     * @name GetProducts
     * @summary 多选产品查询
     * @request POST:/straightThroughRateReport/getProducts
     * @secure
     */
    getProducts: (data: StraightThroughRateReportSearch) =>
      http.request<ResultListStraightThroughRateReportVO['data']>(
        `/api/control/straightThroughRateReport/getProducts`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 直通率报表
     * @name GetProcesses
     * @summary 多选工序查询
     * @request POST:/straightThroughRateReport/getProcesses
     * @secure
     */
    getProcesses: (data: StraightThroughRateReportSearch) =>
      http.request<ResultListStraightThroughRateReportVO['data']>(
        `/api/control/straightThroughRateReport/getProcesses`,
        {
          method: 'POST',
          body: data as any,
        },
      ),
  },
  reversetraceability: {
    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetWipRepairList
     * @summary 获取维修单信息
     * @request POST:/reversetraceability/getWipRepairList
     * @secure
     */
    getWipRepairList: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataProductWipRepairVO['data']>(`/api/control/reversetraceability/getWipRepairList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetWipKeypartInfo
     * @summary 获取关键件物料信息
     * @request POST:/reversetraceability/getWipKeypartInfo
     * @secure
     */
    getWipKeypartInfo: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataWipKeypartReportVO['data']>(`/api/control/reversetraceability/getWipKeypartInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetTransferStockInOutList
     * @summary 获取出入库数据
     * @request POST:/reversetraceability/getTransferStockInOutList
     * @secure
     */
    getTransferStockInOutList: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataTransferStockInOutVO['data']>(
        `/api/control/reversetraceability/getTransferStockInOutList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetProductBaseInfo
     * @summary 获取产品基础信息
     * @request POST:/reversetraceability/getProductBaseInfo
     * @secure
     */
    getProductBaseInfo: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultProductBaseReportVO['data']>(`/api/control/reversetraceability/getProductBaseInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetPkgRelationReportList
     * @summary 获取箱包关系报表
     * @request POST:/reversetraceability/getPkgRelationReportList
     * @secure
     */
    getPkgRelationReportList: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataPkgRelationReportVO['data']>(
        `/api/control/reversetraceability/getPkgRelationReportList`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetMoOnboardInfo
     * @summary 获取物料投料信息
     * @request POST:/reversetraceability/getMoOnboardInfo
     * @secure
     */
    getMoOnboardInfo: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultPagingDataMoOnboardReportVO['data']>(`/api/control/reversetraceability/getMoOnboardInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetMoBaseInfo
     * @summary 获取工单信息
     * @request POST:/reversetraceability/getMoBaseInfo
     * @secure
     */
    getMoBaseInfo: (data: ReverseTraceabilityReportSearch) =>
      http.request<ResultObject['data']>(`/api/control/reversetraceability/getMoBaseInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料追溯（反向）
     * @name GetListByWipRepairId
     * @summary 获取维修单明细
     * @request POST:/reversetraceability/getListByWipRepairId
     * @secure
     */
    getListByWipRepairId: (query: { wipRepairId: string }) =>
      http.request<ResultListProductWipRepairDtlVO['data']>(`/api/control/reversetraceability/getListByWipRepairId`, {
        method: 'POST',
        params: query,
      }),
  },
  productionDefectStatistics: {
    /**
     * No description
     *
     * @tags 生产缺陷不良统计报表
     * @name GetRepairMethodCollect
     * @summary 维修方法汇总
     * @request POST:/productionDefectStatistics/getRepairMethodCollect
     * @secure
     */
    getRepairMethodCollect: (data: ProductionDefectStatisticsSearch) =>
      http.request<ResultPagingDataProductionDefectStatisticsVO['data']>(
        `/api/control/productionDefectStatistics/getRepairMethodCollect`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 生产缺陷不良统计报表
     * @name GetDutyCollect
     * @summary 责任汇总
     * @request POST:/productionDefectStatistics/getDutyCollect
     * @secure
     */
    getDutyCollect: (data: ProductionDefectStatisticsSearch) =>
      http.request<ResultPagingDataProductionDefectStatisticsVO['data']>(
        `/api/control/productionDefectStatistics/getDutyCollect`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 生产缺陷不良统计报表
     * @name GetDefectReasonCollect
     * @summary 缺陷原因汇总
     * @request POST:/productionDefectStatistics/getDefectReasonCollect
     * @secure
     */
    getDefectReasonCollect: (data: ProductionDefectStatisticsSearch) =>
      http.request<ResultPagingDataProductionDefectStatisticsVO['data']>(
        `/api/control/productionDefectStatistics/getDefectReasonCollect`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 生产缺陷不良统计报表
     * @name GetDefectDetail
     * @summary 查询不良明细
     * @request POST:/productionDefectStatistics/getDefectDetail
     * @secure
     */
    getDefectDetail: (data: ProductionDefectStatisticsSearch) =>
      http.request<ResultPagingDataProductionDefectStatisticsVO['data']>(
        `/api/control/productionDefectStatistics/getDefectDetail`,
        {
          method: 'POST',
          body: data as any,
        },
      ),

    /**
     * No description
     *
     * @tags 生产缺陷不良统计报表
     * @name GetDefectCollect
     * @summary 查询不良汇总
     * @request POST:/productionDefectStatistics/getDefectCollect
     * @secure
     */
    getDefectCollect: (data: ProductionDefectStatisticsSearch) =>
      http.request<ResultPagingDataProductionDefectStatisticsVO['data']>(
        `/api/control/productionDefectStatistics/getDefectCollect`,
        {
          method: 'POST',
          body: data as any,
        },
      ),
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

    /**
     * No description
     *
     * @tags 产品返工
     * @name GetReturnProcessByBarcode
     * @summary 根据排产工单和扫描条码，获取历史已扫的工序信息
     * @request POST:/productRework/getReturnProcessByBarcode
     * @secure
     */
    getReturnProcessByBarcode: (data: ProcessSearch) =>
      http.request<ResultPagingDataProcessVO['data']>(`/api/control/productRework/getReturnProcessByBarcode`, {
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
     * @name GetNotRelateList
     * @summary 查询指定工序未关联的缺陷列表
     * @request POST:/processInDefectCode/getNotRelateList
     * @secure
     */
    getNotRelateList: (data: DefectCodeSearch) =>
      http.request<ResultPagingDataDefectCode['data']>(`/api/control/processInDefectCode/getNotRelateList`, {
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
     * @name ChangeSeq
     * @summary 根据工序批量添加缺陷代码
     * @request POST:/processInDefectCode/changeSeq
     * @secure
     */
    changeSeq: (data: ProcessInDefectCodeVO[]) =>
      http.request<ResultObject['data']>(`/api/control/processInDefectCode/changeSeq`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name BatchAdd
     * @summary 根据工序批量添加缺陷代码
     * @request POST:/processInDefectCode/batchAdd
     * @secure
     */
    batchAdd: (data: ProcessInDefectDTO) =>
      http.request<ResultObject['data']>(`/api/control/processInDefectCode/batchAdd`, {
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

    /**
     * No description
     *
     * @tags 工序与缺陷代码关系
     * @name GetDefectCodeByProcessId
     * @summary 获取缺陷树
     * @request GET:/processInDefectCode/getDefectCodeByProcessId
     * @secure
     */
    getDefectCodeByProcessId: (query: { processId: string }) =>
      http.request<ResultListDefectCodeVO['data']>(`/api/control/processInDefectCode/getDefectCodeByProcessId`, {
        method: 'GET',
        params: query,
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
     * @name GetPkgRelationReportList
     * @summary 获取箱包关系报表
     * @request POST:/pkgRelation/getPkgRelationReportList
     * @secure
     */
    getPkgRelationReportList: (data: PkgRelationSearch) =>
      http.request<ResultPagingDataPkgRelationReportVO['data']>(`/api/control/pkgRelation/getPkgRelationReportList`, {
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
  moSchedule: {
    /**
     * No description
     *
     * @tags 工单排产表
     * @name GetProductionProgress
     * @summary 生产进度报表
     * @request POST:/moSchedule/getProductionProgress
     * @secure
     */
    getProductionProgress: (data: ProductionProgressSearch) =>
      http.request<ResultPagingDataProductionProgressVO['data']>(`/api/control/moSchedule/getProductionProgress`, {
        method: 'POST',
        body: data as any,
      }),
  },
  moOnboard: {
    /**
     * No description
     *
     * @tags 工单投料表
     * @name GetMoOnboardList
     * @summary 工单投料报表
     * @request POST:/moOnboard/getMoOnboardList
     * @secure
     */
    getMoOnboardList: (data: MoOnboardSearch) =>
      http.request<ResultPagingDataMoOnboardSearchVO['data']>(`/api/control/moOnboard/getMoOnboardList`, {
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
      lineId?: string;
      /** @default "" */
      scheCode?: string;
      mitemId?: string;
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

    /**
     * No description
     *
     * @tags 投料表
     * @name GetMoBom
     * @summary 根据排产单ID获取工单BOM信息
     * @request GET:/mitemOnboard/getMoBomByMoScheId
     * @secure
     */
    getMoBom: (query?: {
      /** @default "" */
      scheId?: string;
    }) =>
      http.request<ResultListMoScheBomVO['data']>(`/api/control/mitemOnboard/getMoBomByMoScheId`, {
        method: 'GET',
        params: query,
      }),
  },
  mitemForwardTrace: {
    /**
     * No description
     *
     * @tags 关键物料正向追溯
     * @name GetSupplierInfo
     * @summary 物料供应商信息
     * @request POST:/mitemForwardTrace/getSupplierInfo
     * @secure
     */
    getSupplierInfo: (data: MitemForwardTraceSearch) =>
      http.request<ResultMFTSubVO['data']>(`/api/control/mitemForwardTrace/getSupplierInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料正向追溯
     * @name GetMitemUseInfo
     * @summary 物料使用信息
     * @request POST:/mitemForwardTrace/getMitemUseInfo
     * @secure
     */
    getMitemUseInfo: (data: MitemForwardTraceSearch) =>
      http.request<ResultPagingDataMFTSubVO['data']>(`/api/control/mitemForwardTrace/getMitemUseInfo`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 关键物料正向追溯
     * @name GetMitemQualityInfo
     * @summary 物料质量信息
     * @request POST:/mitemForwardTrace/getMitemQualityInfo
     * @secure
     */
    getMitemQualityInfo: (data: MitemForwardTraceSearch) =>
      http.request<ResultPagingDataMFTSubVO['data']>(`/api/control/mitemForwardTrace/getMitemQualityInfo`, {
        method: 'POST',
        body: data as any,
      }),
  },
  labelManage: {
    /**
     * No description
     *
     * @tags 标签表
     * @name ReprintBarcode
     * @summary 补打产品条码
     * @request POST:/labelManage/reprintBarcode
     * @secure
     */
    reprintBarcode: (data: LabelManageSearch) =>
      http.request<ResultObject['data']>(`/api/control/labelManage/reprintBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name PrintBarcode
     * @summary 打印产品条码
     * @request POST:/labelManage/printBarcode
     * @secure
     */
    printBarcode: (data: LabelManageSearch) =>
      http.request<ResultObject['data']>(`/api/control/labelManage/printBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetMoScheduleList
     * @summary 查询工单排产(标签打印上表格)
     * @request POST:/labelManage/getMoScheduleList
     * @secure
     */
    getMoScheduleList: (data: LabelManageSearch) =>
      http.request<ResultPagingDataLabelManageVO['data']>(`/api/control/labelManage/getMoScheduleList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeWipManagerList
     * @summary 查询在制品条码(标签管理表格)
     * @request POST:/labelManage/getBarcodeWipManagerList
     * @secure
     */
    getBarcodeWipManagerList: (data: LabelManageSearch) =>
      http.request<ResultPagingDataLabelManageVO['data']>(`/api/control/labelManage/getBarcodeWipManagerList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeWipLog
     * @summary 查询产品条码日志
     * @request POST:/labelManage/getBarcodeWipLog
     * @secure
     */
    getBarcodeWipLog: (data: LabelManageSearch) =>
      http.request<ResultPagingDataLabelManageVO['data']>(`/api/control/labelManage/getBarcodeWipLog`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeWipList
     * @summary 查询在制品条码(标签打印下表格)
     * @request POST:/labelManage/getBarcodeWipList
     * @secure
     */
    getBarcodeWipList: (data: LabelManageSearch) =>
      http.request<ResultPagingDataLabelManageVO['data']>(`/api/control/labelManage/getBarcodeWipList`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GenerateBarcode
     * @summary 生成产品条码
     * @request POST:/labelManage/generateBarcode
     * @secure
     */
    generateBarcode: (data: LabelManageSearch) =>
      http.request<ResultObject['data']>(`/api/control/labelManage/generateBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name CancellationBarcode
     * @summary 作废产品条码
     * @request POST:/labelManage/cancellationBarcode
     * @secure
     */
    cancellationBarcode: (data: LabelManageSearch) =>
      http.request<ResultObject['data']>(`/api/control/labelManage/cancellationBarcode`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetPrintTmplList
     * @summary 获得打印模板下拉数据
     * @request GET:/labelManage/getPrintTmplList
     * @secure
     */
    getPrintTmplList: (query: { moScheId: string }) =>
      http.request<ResultListPrintTmpl['data']>(`/api/control/labelManage/getPrintTmplList`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 标签表
     * @name GetBarcodeRuleList
     * @summary 获得条码规则下拉数据
     * @request GET:/labelManage/getBarcodeRuleList
     * @secure
     */
    getBarcodeRuleList: (query: { moScheId: string }) =>
      http.request<ResultListBarcodeRule['data']>(`/api/control/labelManage/getBarcodeRuleList`, {
        method: 'GET',
        params: query,
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
      http.request<ResultObject['data']>(`/api/control/importManage/batchImportData`, {
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
      http.request<ResultListT['data']>(`/api/control/importManage/batchDynamicQuery`, {
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
      http.request<ResultBoolean['data']>(`/api/control/importManage/CheckUniqueExist`, {
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
      http.request<ResultListDataTableVO['data']>(`/api/control/importManage/tables`, {
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
      http.request<ResultObject['data']>(`/api/control/dynamicManage/batchUpdateData`, {
        method: 'POST',
        body: data as any,
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
      http.request<ResultPkgExtendVO['data']>(`/api/control/barcodePkg/getByBarcode`, {
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
    getPrintTmplList: (query: { moScheId: string; packType: string }) =>
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
    getBarcodeRuleList: (query: { moScheId: string; packType: string }) =>
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
  atomicBarcodeComplete: {
    /**
     * No description
     *
     * @tags 原子相关方法-完工原子
     * @name ExcuteAtomic
     * @summary 完工原子
     * @request POST:/atomicBarcodeComplete/excuteAtomic
     * @secure
     */
    excuteAtomic: (data: AtomicContext) =>
      http.request<ResultAtomicContext['data']>(`/api/control/atomicBarcodeComplete/excuteAtomic`, {
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
  defectCode: {
    /**
     * No description
     *
     * @tags 缺陷代码
     * @name Tree
     * @summary 获取缺陷树
     * @request GET:/defectCode/tree
     * @secure
     */
    tree: (query: { processId: string }) =>
      http.request<ResultListDefectCodeVO['data']>(`/api/control/defectCode/tree`, {
        method: 'GET',
        params: query,
      }),
  },
};
