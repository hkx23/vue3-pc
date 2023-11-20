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
  levelCode?: string;
  levelName?: string;
  parentLevelId?: string;
  /** @format int32 */
  levelSeq?: number;
  /** @format int32 */
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
  orgCode?: string;
  orgName?: string;
  orgDesc?: string;
  parentOrgId?: string;
  levelCode?: string;
  /** @format int32 */
  isActive?: number;
}

export interface CommonSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
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

/** 通用响应类 */
export interface ResultWorkgroup {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Workgroup;
}

/** 响应数据 */
export type Workgroup = {
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
  workgroupCode?: string;
  workgroupName?: string;
  workgroupDesc?: string;
  mworkshopId?: string;
} | null;

export interface WorkcenterSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  keyword?: string;
  /** @format int32 */
  workshopid?: number;
  sorts?: SortParam[];
  filters?: Filter[];
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
  /** 响应数据 */
  data?: Supplier;
}

/** 响应数据 */
export type Supplier = {
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
  supplierCode?: string;
  supplierName?: string;
  contactPerson?: string;
  contactTel?: string;
} | null;

/** 响应数据 */
export type Post = {
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
  postCode?: string;
  postName?: string;
  postDesc?: string;
} | null;

/** 通用响应类 */
export interface ResultPost {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Post;
}

/** 响应数据 */
export type Person = {
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
  personCode?: string;
  personName?: string;
  /** @format int32 */
  gender?: number;
  email?: string;
  mobilePhone?: string;
  madminOrgId?: string;
} | null;

/** 通用响应类 */
export interface ResultPerson {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
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

/** 通用响应类 */
export interface ResultOrg {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  data?: Org;
}

/** 响应数据 */
export type MitemCategory = {
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
  categoryDesc?: string;
  reqCalcRule?: string;
  onboardRuleCode?: string;
} | null;

/** 通用响应类 */
export interface ResultMitemCategory {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: MitemCategory;
}

/** 响应数据 */
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
  oid?: string;
  mitemCode?: string;
  mitemName?: string;
  mitemDesc?: string;
  supplyCategory?: string;
  uom?: string;
  /** @format int32 */
  isProduct?: number;
  /** @format int32 */
  isRaw?: number;
  /** @format int32 */
  isInProcess?: number;
  /** @format int32 */
  shelfLifeDays?: number;
  /** @format int32 */
  isBatchNo?: number;
  mmitemCategoryId?: string;
  wwarehouseId?: string;
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
  /** 响应数据 */
  data?: Mitem;
}

export interface MitemSearch {
  /** @format int32 */
  pageNum?: number;
  /** @format int32 */
  pageSize?: number;
  keyword?: string;
  /** @format int32 */
  isRaw?: number;
  /** @format int32 */
  isInProcess?: number;
  /** @format int32 */
  isProduct?: number;
  sorts?: SortParam[];
  filters?: Filter[];
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
  mmitemCategoryName?: string;
  isState?: boolean;
  /** @format int32 */
  wwarehouseCode?: number;
  /** @format int32 */
  wwarehouseName?: number;
  isProductName?: string;
  isProductChecked?: boolean;
  isRawName?: string;
  isRawChecked?: boolean;
  isInProcessName?: string;
  isInProcessChecked?: boolean;
  isBatchName?: string;
  stateName?: string;
}

/** 响应数据 */
export type Customer = {
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
  customerCode?: string;
  customerName?: string;
  shortName?: string;
} | null;

/** 通用响应类 */
export interface ResultCustomer {
  /**
   * 响应代码
   * @format int32
   */
  code?: number;
  /** 提示信息 */
  message?: string;
  /** 响应数据 */
  data?: Customer;
}

export interface JSONObject {
  empty?: boolean;
  innerMap?: Record<string, object>;
  [key: string]: any;
}

/** 响应数据 */
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
  modeCode?: string;
  modeName?: string;
  modeDesc?: string;
  expression?: string;
  shiftCode?: string;
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
  /** 响应数据 */
  data?: AttendanceMode;
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

/**
 * @title gc项目
 * @version v1
 * @baseUrl http://localhost:7300
 *
 * gc项目API汇总
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
      http.request<ResultObject['data']>(`/api/modeling/orgLevel/update`, {
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
      http.request<ResultObject['data']>(`/api/modeling/orgLevel/add`, {
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
      http.request<ResultListOrgLevelTreeVO['data']>(`/api/modeling/orgLevel/tree`, {
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
      http.request<ResultObject['data']>(`/api/modeling/orgLevel/delete`, {
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
      http.request<ResultObject['data']>(`/api/modeling/org/update`, {
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
      http.request<ResultObject['data']>(`/api/modeling/org/items`, {
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
      http.request<ResultOrg['data']>(`/api/modeling/org/items/${id}`, {
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
      http.request<ResultObject['data']>(`/api/modeling/org/add`, {
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
      http.request<ResultListOrgTreeVO['data']>(`/api/modeling/org/tree`, {
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
      http.request<ResultObject['data']>(`/api/modeling/org/delete`, {
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
      http.request<ResultObject['data']>(`/api/modeling/workgroup/items`, {
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
      http.request<ResultWorkgroup['data']>(`/api/modeling/workgroup/items/${id}`, {
        method: 'POST',
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
      http.request<ResultObject['data']>(`/api/modeling/supplier/items`, {
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
      http.request<ResultSupplier['data']>(`/api/modeling/supplier/items/${id}`, {
        method: 'POST',
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
      http.request<ResultObject['data']>(`/api/modeling/post/items`, {
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
      http.request<ResultPost['data']>(`/api/modeling/post/items/${id}`, {
        method: 'POST',
      }),
  },
  person: {
    /**
     * No description
     *
     * @tags 员工表
     * @name Search
     * @request POST:/person/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/modeling/person/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 员工表
     * @name GetItemById
     * @request POST:/person/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultPerson['data']>(`/api/modeling/person/items/${id}`, {
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
      http.request<ResultObject['data']>(`/api/modeling/person/edit`, {
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
      http.request<ResultObject['data']>(`/api/modeling/person/delete`, {
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
      sortfield: string;
      sorttype: string;
      filterfield: string;
      filter: string;
      /** @format int32 */
      pagenum: number;
      /** @format int32 */
      pagesize: number;
    }) =>
      http.request<ResultObject['data']>(`/api/modeling/person/getlist`, {
        method: 'GET',
        params: query,
      }),
  },
  mitemCategory: {
    /**
     * No description
     *
     * @tags 物料分类
     * @name Search
     * @request POST:/mitemCategory/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/modeling/mitemCategory/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name GetItemById
     * @request POST:/mitemCategory/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMitemCategory['data']>(`/api/modeling/mitemCategory/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name Edit
     * @request POST:/mitemCategory/edit/{id}
     * @secure
     */
    edit: (id: string, data: MitemCategory) =>
      http.request<ResultObject['data']>(`/api/modeling/mitemCategory/edit/${id}`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料分类
     * @name List
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
      http.request<ResultObject['data']>(`/api/modeling/mitemCategory/list`, {
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
      http.request<ResultObject['data']>(`/api/modeling/mitemCategory/getlist`, {
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
     * @request POST:/mitem/items
     * @secure
     */
    search: (data: CommonSearch) =>
      http.request<ResultObject['data']>(`/api/modeling/mitem/items`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name GetItemById
     * @request POST:/mitem/items/{id}
     * @secure
     */
    getItemById: (id: string) =>
      http.request<ResultMitem['data']>(`/api/modeling/mitem/items/${id}`, {
        method: 'POST',
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name GetList
     * @request POST:/mitem/getlist
     * @secure
     */
    getList: (data: MitemSearch) =>
      http.request<ResultObject['data']>(`/api/modeling/mitem/getlist`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name Edit
     * @request POST:/mitem/edit
     * @secure
     */
    edit: (data: MitemVO) =>
      http.request<ResultObject['data']>(`/api/modeling/mitem/edit`, {
        method: 'POST',
        body: data as any,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name List
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
      http.request<ResultObject['data']>(`/api/modeling/mitem/list`, {
        method: 'GET',
        params: query,
      }),

    /**
     * No description
     *
     * @tags 物料
     * @name GetListByMitemCategory
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
      http.request<ResultObject['data']>(`/api/modeling/mitem/getlistbymitemcategory`, {
        method: 'GET',
        params: query,
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
      http.request<ResultObject['data']>(`/api/modeling/customer/items`, {
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
      http.request<ResultCustomer['data']>(`/api/modeling/customer/items/${id}`, {
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
      http.request<ResultCustomer['data']>(`/api/modeling/customer/items/select`, {
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
      http.request<ResultObject['data']>(`/api/modeling/customer/items/modify`, {
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
      http.request<ResultObject['data']>(`/api/modeling/attendanceMode/items`, {
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
      http.request<ResultAttendanceMode['data']>(`/api/modeling/attendanceMode/items/${id}`, {
        method: 'POST',
      }),
  },
  adminOrg: {
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
      http.request<ResultObject['data']>(`/api/modeling/adminOrg/getlist`, {
        method: 'GET',
        params: query,
      }),
  },
};
