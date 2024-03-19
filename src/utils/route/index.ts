import { upperFirst } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { pathToRegexp } from 'path-to-regexp';
import { shallowRef } from 'vue';
import { RouteRecordRaw } from 'vue-router';

import { RouteItem } from '@/api/model/permissionModel';
import { RouteMeta } from '@/types/interface';
import {
  BLANK_LAYOUT,
  EXCEPTION_COMPONENT,
  IFRAME,
  LAYOUT,
  NOT_FOUNT,
  PAGE_NOT_FOUND_ROUTE,
  PARENT_LAYOUT,
} from '@/utils/route/constant';

// vite 3+ support dynamic import from node_modules
const iconsPath = import.meta.glob('../../../node_modules/tdesign-icons-vue-next/esm/components/*.js');

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('BLANK', BLANK_LAYOUT);
LayoutMap.set('IFRAME', IFRAME);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

const moduleRouterMap = import.meta.glob('../../modules/**/router/pages/*.ts');

const dynamicModules: Record<string, any> = {};
const dynamicParamsModules: Record<string, any> = {};
const dynamicParamsRoutes: Array<RouteRecordRaw> = [];
async function transformRouterToModules(path: string) {
  if (Object.prototype.hasOwnProperty.call(moduleRouterMap, path)) {
    const router = moduleRouterMap[path];
    const moduleName = path.split('/')[3];
    const routerList = ((await router()) as any).default as Array<RouteRecordRaw>;
    for (const item of routerList) {
      if (item.path.lastIndexOf(':') > 0) {
        dynamicParamsModules[`/${moduleName}#${item.path}`.toLowerCase()] = item;
        dynamicParamsRoutes.push(item);
      } else {
        dynamicModules[`/${moduleName}#${item.path}`.toLowerCase()] = item;
      }
    }
  }
}
export const dynamicParamRoutes = (async function loadDynamicModules() {
  await Promise.all(Object.keys(moduleRouterMap).map((path) => transformRouterToModules(path)));
  return dynamicParamsRoutes.map((t) => {
    t.path = t.path.substring(1);
    return t;
  });
})();

export function getParamsModules(path: string): RouteRecordRaw {
  const value = dynamicModules[path];
  if (value) return value;
  for (const key in dynamicParamsModules) {
    const regexp = pathToRegexp(key);
    const isMatch = regexp.test(path);

    if (isMatch) {
      return dynamicParamsModules[key];
    }
  }
  return undefined;
}

// 动态从包内引入单个Icon
async function getMenuIcon(iconName: string): Promise<string> {
  const RenderIcon = iconsPath[`../../../node_modules/tdesign-icons-vue-next/esm/components/${iconName}.js`];

  if (!RenderIcon) return null;

  const Icon = await RenderIcon();
  // @ts-ignore
  return shallowRef(Icon.default);
}

// 动态引入路由组件
async function asyncImportRoute(routes: RouteItem[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../pages/**/*.vue');
  if (!routes) return;

  for await (const item of routes) {
    const { component, name } = item;
    const { children } = item;

    if (component) {
      const componentName = component.toUpperCase();
      const layoutFound = LayoutMap.get(componentName);
      if (layoutFound) {
        if (componentName === 'IFRAME' || item.meta?.frameSrc) {
          item.meta.sourcePath = item.meta?.frameSrc;
          const cmp = getParamsModules(item.meta.frameSrc.toLowerCase());
          if (cmp?.component) {
            item.meta.frameSrc = null;
          }
          if (cmp?.name) {
            item.name = upperFirst(cmp.name.toString());
          }
          item.component = cmp?.component || layoutFound;
          item.meta.title = {
            ...(cmp?.meta.title as any),
            ...(item.meta.title as any),
          };
        } else if (componentName === 'LAYOUT' && (children === null || children.length === 0)) {
          item.component = NOT_FOUNT;
        } else {
          item.component = BLANK_LAYOUT;
        }
      } else {
        item.component = dynamicImport(dynamicViewsModules, component);
      }
    } else if (name) {
      item.component = PARENT_LAYOUT();
    }
    item.meta.iconName = item.meta.icon;
    if (item.meta.icon) {
      item.meta.icon = await getMenuIcon(item.meta.icon);
    }
    if ((item as any).id) {
      item.meta.id = (item as any).id;
    }
    item.redirect = '';

    // eslint-disable-next-line no-unused-expressions
    children && (await asyncImportRoute(children));
  }
}

function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../pages', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    throw new Error(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
  } else {
    console.warn(`Can't find ${component} in pages folder`);
  }
  return EXCEPTION_COMPONENT;
}

// 将背景对象变成路由对象
export async function transformObjectToRoute<T = RouteItem>(routeList: RouteItem[]): Promise<T[]> {
  for await (const route of routeList) {
    await transformItemToRoute(route);
  }

  return [PAGE_NOT_FOUND_ROUTE, ...routeList] as unknown as T[];
}

export async function transformItemToRoute<T = RouteItem>(route: RouteItem): Promise<T> {
  const component = route.component as string;

  if (component) {
    if (component.toUpperCase() === 'LAYOUT') {
      route.component = LayoutMap.get(component.toUpperCase());
    } else {
      route.children = [cloneDeep(route)];
      route.component = LAYOUT;
      route.name = `${route.name}Parent`;
      route.path = '';
      route.meta = (route.meta || {}) as RouteMeta;
    }
  } else {
    throw new Error('component is undefined');
  }
  // eslint-disable-next-line no-unused-expressions
  route.children && (await asyncImportRoute(route.children));
  route.meta.iconName = route.meta.icon;
  if (route.meta.icon) {
    route.meta.icon = await getMenuIcon(route.meta.icon);
  }
  if ((route as any).id) {
    route.meta.id = (route as any).id;
  }
  route.redirect = '';
  return route as unknown as T;
}
