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
