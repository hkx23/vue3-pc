const Api = {
  getList: '/api/modeling/adminOrg/getlist',
};

export function getList(params: { parent_org_id?: number }) {
  const data = {
    parent_org_id: params.parent_org_id,
  };

  return http.get<AdminOrgList>(Api.getList, data);
}

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
