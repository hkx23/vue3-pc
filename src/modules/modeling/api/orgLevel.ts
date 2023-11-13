const Api = {
  OrgLevel: '/api/modeling/orgLevel/all',
};

/**
 * 获取组织层级
 * @returns Promise<any>
 */
export function getOrgLevel() {
  return http.get<any>(Api.OrgLevel);
}
