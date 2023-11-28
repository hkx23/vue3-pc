export default [
  {
    path: '/process',
    name: 'process',
    component: () => import('../../pages/process/index.vue'),
    meta: {
      title: {
        'zh-CN': '工序',
        'en-US': 'process',
      },
      orderNo: 0,
    },
  },
];
