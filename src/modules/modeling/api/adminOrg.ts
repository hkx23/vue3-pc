import { AdminOrgList } from './model/adminOrgModel';

const Api = {
  getList: '/api/modeling/adminOrg/getlist',
};

export function getAdminOrgList(params: { parent_org_id: number }) {
  const data = {
    parent_org_id: params.parent_org_id,
  };

  return http.get<AdminOrgList>(Api.getList, data);
}
