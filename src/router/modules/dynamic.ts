import Layout from '@/layouts/index.vue';
import { dynamicParamRoutes } from '@/utils/route';

console.log('🚀 ~ dynamicParamRoutes:', dynamicParamRoutes);

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
    children: [...(await dynamicParamRoutes)],
  },
];
