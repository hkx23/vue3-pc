import { MitemCategoryList } from './model/mitemCategoryModel';
import { MitemList } from './model/mitemModel';

const Api = {
  getList: '/api/modeling/mitemCategory/getlist',
  getMitemByCategory: '/api/modeling/mitem/getlistbymitemcategory',
};

export function getList(params: { keyword: string; pagenum: number; pagesize: number }) {
  const data = {
    keyword: params.keyword,
    pagenum: params.pagenum,
    pagesize: params.pagesize,
  };

  return http.get<MitemCategoryList>(Api.getList, data);
}

export function getMitemList(params: { keyword: string; mitemcategoryid: number; pagenum: number; pagesize: number }) {
  const data = {
    keyword: params.keyword,
    mitemcategoryid: params.mitemcategoryid,
    pagenum: params.pagenum,
    pagesize: params.pagesize,
  };

  return http.get<MitemList>(Api.getMitemByCategory, data);
}
