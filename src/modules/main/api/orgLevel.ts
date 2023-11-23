import { OrgLevel, OrgLevelTreeVO } from './model/orgLevelModel';

const Api = {
  tree: '/api/modeling/orgLevel/tree',
  add: '/api/modeling/orgLevel/add',
  update: '/api/modeling/orgLevel/update',
  delete: '/api/modeling/orgLevel/delete',
};

/**
 * 获取组织层级树
 * @returns Promise<any>
 */
export function getOrgLevelTree() {
  return http.get<Array<OrgLevelTreeVO>>(Api.tree);
}

/**
 * 新增组织层级
 * @param data
 * @returns
 */
export function addOrgLevel(data: OrgLevel) {
  return http.post<any>(Api.add, data);
}

/**
 * 更新组织层级
 * @param data
 * @returns
 */
export function updateOrgLevel(data: OrgLevel) {
  return http.put<any>(Api.update, { body: data as any });
}

/**
 * 删除组织层级
 * @param id
 * @returns
 */
export function deleteOrgLevel(id: string) {
  return http.delete<any>(Api.delete, { params: { id } as any });
}

/**
 * 获取组织层级字典
 * @returns
 */
export function getOrgLevelDic(): Promise<Array<{ value: string; label: string }>> {
  return new Promise((resolve) => {
    const dictionary = [
      { value: 'GROUP', label: '集团' },
      { value: 'PLANT', label: '工厂' },
      { value: 'WORKSHOP', label: '车间' },
      { value: 'WORKSPACE', label: '工作区' },
      { value: 'LINE', label: '产线' },
      { value: 'PROCESS', label: '工段' },
      { value: 'EQUIPMENT', label: '设备' },
    ];
    resolve(dictionary);
  });
}
