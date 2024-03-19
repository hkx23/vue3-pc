import Layout from '@/layouts/index.vue';
import { dynamicParamRoutes } from '@/utils/route';

export default [
  {
    path: '/dynamic',
    name: 'dynamic',
    meta: {
      title: {
        'zh-CN': '动态页',
        'en-US': 'Dynamic Page',
      },
    },
    component: Layout,
    children: (async () => {
      const routes = await dynamicParamRoutes;
      return [...routes];
    })(),
  },
];
