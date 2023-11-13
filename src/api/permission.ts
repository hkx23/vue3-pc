import type { MenuListResult } from '@/api/model/permissionModel';

const Api = {
  MenuList: '/api/get-menu-list-i18n',
};

export function getMenuList() {
  return http.get<MenuListResult>(Api.MenuList);
}
