export default [
  {
    path: '/mitemForwardTrace',
    name: 'mitemForwardTrace',
    component: () => import('../../pages/mitemForwardTrace/index.vue'),
    meta: {
      title: {
        'zh-CN': '关键物料正向追溯',
        'en-US': 'mitemForwardTrace',
      },
      orderNo: 0,
    },
  },
];
