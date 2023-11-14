const Api = {
  getList: '/api/modeling/person/getlist',
  edit: '/api/modeling/person/edit',
  delete: '/api/modeling/person/delete',
};

export function getList(params: {
  personcode?: string;
  personname?: string;
  sortfield?: string; // 排序字段
  sorttype: string; // 排序类型 asc，desc
  filterfield: string; // 筛选字段
  filter: string; // 筛选内容
  pagenum: number; // 筛选字段
  pagesize: number; // 筛选字段
}) {
  const data = {
    personcode: params.personcode,
    personname: params.personname,
    sortfield: params.sortfield,
    sorttype: params.sorttype,
    filterfield: params.filterfield,
    filter: params.filter,
    pagenum: params.pagenum,
    pagesize: params.pagesize,
  };

  return http.get<PersonList>(Api.getList, data);
}

export function postEdit(params: {
  id?: string;
  personcode?: string;
  personname?: string;
  gender?: string;
  mobilephone?: string;
  email?: string;
  state?: string;
}) {
  const data = {
    id: params.id,
    personCode: params.personcode,
    personName: params.personname,
    gender: params.gender,
    mobilePhone: params.mobilephone,
    email: params.email,
    state: params.state ? 1 : 0,
  };

  return http.post<any>(Api.edit, data);
}

export function postDelete(params: { id?: number }) {
  const data = {
    id: params.id,
  };

  return http.post<any>(Api.delete, data);
}

export interface PersonList {
  list: Array<PersonModel>;
  total: number;
}

export interface PersonModel {
  id: number;
  personCode: string;
  personName: string;
  mobilePhone: string;
  email: string;
  gender: number;
  state: number;
  genderName: string;
  stateName: string;
}
