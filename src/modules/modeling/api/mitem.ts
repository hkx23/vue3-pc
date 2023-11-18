const Api = {
  getList: '/api/modeling/mitem/getlist',
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
  mitemCategoryId: number;
  mitemCategoryCode: number;
  mitemCategoryName: number;
  supplyCategory: string;
  uom: string;
  isProduct: number;
  isRaw: number;
  isInProcess: number;
  wWarehouseId: number;
  shelfLifeDays: number;
  isBatchNo: number;
}
