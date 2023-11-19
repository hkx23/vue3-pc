const Api = {
  getCustomer: '/api/modeling/customer/items/def',
  customerSearch: '/api/modeling/customer/items',
  customerModify: 'api/modeling/customer/items/modify',
  customerSelect: `api/modeling/customer/items/select`,
  customerTurn: '/api/modeling/customer/items/turn',
};

// 客户信息全部数据
export function getCustomer(params: { keyword: string; pagenum: number; pagesize: number }) {
  const data = {
    keyword: params.keyword,
    pagenum: params.pagenum,
    pagesize: params.pagesize,
  };
  return http.get<CustomerList>(Api.getCustomer, data);
}

// 查询
export function customerSearch(params: {
  pageNum: string;
  pageSize: string;
  keyword: string;
  sorts: any;
  filters: any;
}) {
  const data = {
    keyword: params.keyword,
    pageNum: params.pageNum,
    pageSize: params.pageSize,
    sorts: params.sorts,
    filters: params.filters,
  };
  return http.post<CustomerList>(Api.customerSearch, data);
}

// 编辑
export function customerSelect(params: { code: any }) {
  const data = {
    code: params.code,
  };
  return http.post<CustomerModel>(Api.customerSelect, data);
}

// 保存修改
export function customerModify(params: { oid: string; customerCode: string; customerName: string; shortName: string }) {
  const data = {
    oid: params.oid,
    customerCode: params.customerCode,
    customerName: params.customerName,
    shortName: params.shortName,
  };
  return http.post<DataModify>(Api.customerModify, data);
}

export function customerTurn(params: { pagesize: number; pagenum: number }) {
  const data = {
    pagesize: params.pagesize,
    pagenum: params.pagenum,
  };
  return http.post(Api.customerTurn, data);
}
// 查询
export interface CustomerList {
  list: Array<CustomerModel>;
  total: number;
}

// 保存修改
export interface CustomerModel {
  id: string;
  timeCreate: string;
  creator: string;
  timeModified: string;
  modifier: string;
  state: number;
  eid: string;
  oid: string;
  customerCode: string;
  customerName: string;
  shortName: string;
}

export interface DataModify {
  total: number;
  mes: string;
}
