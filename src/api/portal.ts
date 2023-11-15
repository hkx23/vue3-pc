import type { OAuth2Result, RouteItem } from '@/api/model/permissionModel';

const Api = {
  GetToken: '/api/auth/oauth2/token',
  GetMenuList: '/api/system/module/show',
};

/**
 * 获取菜单
 * @returns Promise<MenuListResult>
 */
export function getMenuList(): Promise<RouteItem[]> {
  return http.get<Array<RouteItem>>(Api.GetMenuList, { clientType: '1' });
}

/**
 * 获取令牌
 * @param params - 参数对象
 * @param grant_type - 授权类型
 * @param client_id - 客户端ID
 * @param client_secret - 客户端密钥
 * @param username - 用户名
 * @param password - 密码
 * @returns Promise<OAuth2Result> - OAuth2Result对象的Promise
 */
export function getToken(params: {
  grant_type?: string;
  client_id?: string;
  client_secret?: string;
  username: string;
  password: string;
}) {
  if (!params.grant_type) {
    params.grant_type = 'password';
  }
  if (!params.client_id) {
    params.client_id = 'public';
  }
  if (!params.client_secret) {
    params.client_secret = 'public';
  }
  const data = new URLSearchParams();
  data.append('grant_type', params.grant_type);
  data.append('username', params.username);
  data.append('password', params.password);
  return http.post<OAuth2Result>(Api.GetToken, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${params.client_id}:${params.client_secret}`)}`,
    },
  });
}
