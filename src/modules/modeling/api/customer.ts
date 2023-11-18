const Api = {
  getCustomer: '/api/modeling/customer/items/all',
  customerSearch: '/api/modeling/customer/items',
  customerModify: 'api/modeling/customer/items/modify',
  customerSelect: `api/modeling/customer/items/select`,
};

// 客户信息全部数据
export function getCustomer() {
  return http.get<CustomerList>(Api.getCustomer);
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
