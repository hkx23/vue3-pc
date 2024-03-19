import Layout from '@/layouts/index.vue';

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
    children: [],
  },
];
