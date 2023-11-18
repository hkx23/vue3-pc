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
