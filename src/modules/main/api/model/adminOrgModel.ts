export interface AdminOrgList {
  list: Array<AdminOrgModel>;
  total: number;
}

export interface AdminOrgModel {
  id: number;
  state: number;
  stateName: string;
  orgCode: string;
  orgName: string;
  orgDesc: string;
  parentOrgId: number;
  isActive: number;
}
