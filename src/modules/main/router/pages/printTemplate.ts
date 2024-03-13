import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/printTemplate',
    name: 'PrintTemplate',
    component: () => import('../../pages/printTemplate/index.vue'),
    meta: {
      title: {
        'zh-CN': '打印模板',
        'en-US': 'Print Template',
      },
      orderNo: 0,
    },
  },
  {
    path: '/printTemplateDesigner',
    name: 'printTemplateDesigner',
    component: () => import('../../pages/printTemplate/designer.vue'),
    meta: {
      title: {
        'zh-CN': '打印模板设计器',
        'en-US': 'Print Template Designer',
      },
    },
  },
] as Array<RouteRecordRaw>;
