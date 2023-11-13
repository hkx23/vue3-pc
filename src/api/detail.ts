import type { ProjectListResult, PurchaseListResult } from '@/api/model/detailModel';

const Api = {
  PurchaseList: '/api/get-purchase-list',
  ProjectList: '/api/get-project-list',
};

export function getPurchaseList() {
  return http.get<PurchaseListResult>(Api.PurchaseList);
}

export function getProjectList() {
  return http.get<ProjectListResult>(Api.ProjectList);
}
