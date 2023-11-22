import { MitemList } from './model/mitemModel';

const Api = {
  getList: '/api/modeling/mitem/getlist',
  postEdit: '/api/modeling/mitem/edit',
};

export function getList(params: {
  keyword: string;
  isRaw: number;
  isInProcess: number;
  isProduct: number;
  pagenum: number;
  pagesize: number;
  sortlist: any[];
  filterlist: any[];
}) {
  const data = {
    keyword: params.keyword,
    isRaw: params.isRaw,
    isInProcess: params.isInProcess,
    isProduct: params.isProduct,
    pageNum: params.pagenum,
    pageSize: params.pagesize,
    sorts: params.sortlist,
    filters: params.filterlist,
  };

  return http.post<MitemList>(Api.getList, data);
}

export function postEdit(model: any) {
  const data = model;
  return http.post<any>(Api.postEdit, data);
}
