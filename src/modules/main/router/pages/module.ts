export default [
  {
    path: '/module',
    name: 'module',
    component: () => import('../../pages/module/index.vue'),
    meta: {
      title: {
        'zh-CN': '',
        'en-US': 'module',
      },
      orderNo: 0,
    },
  },
];
