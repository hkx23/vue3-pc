export default [
  {
    path: '/console',
    name: 'console',
    component: () => import('../../pages/console/index.vue'),
    meta: {
      title: {
        'zh-CN': '控制台',
        'en-US': 'console',
      },
      orderNo: 0,
    },
  },
];
