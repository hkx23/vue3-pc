import { defineComponent } from 'vue';

import { RouteMeta } from '@/types/interface';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteItem {
  path: string;
  name: string;
  component?: Component | string;
  components?: Component;
  redirect?: string;
  meta: RouteMeta;
  children?: Array<RouteItem>;
}

export interface OAuth2Result {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}
