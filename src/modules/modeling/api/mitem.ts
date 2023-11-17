const Api = {
  getList: '/api/modeling/mitemCategory/getlist',
};

export function getList(params: { keyword?: string; pagenum: number; pagesize: number }) {
  const data = {
    keyword: params.keyword,
    pagenum: params.pagenum,
    pagesize: params.pagesize,
  };

  return http.get<MitemCategoryList>(Api.getList, data);
}
export interface MitemCategoryList {
  list: Array<MitemCategoryModel>;
  total: number;
}

export interface MitemCategoryModel {
  id: number;
  state: number;
  stateName: string;
  isState: boolean;

  categoryCode: string;
  categoryName: string;
  categoryDesc: string;
  reqCalcRule: string;
  onboardRuleCode: number;
}

export interface MitemList {
  list: Array<MitemModel>;
  total: number;
}

export interface MitemModel {
  id: number;
  state: number;
  stateName: string;
  isState: boolean;

  mitemCode: string;
  mitemName: string;
  mitemDesc: string;
}
