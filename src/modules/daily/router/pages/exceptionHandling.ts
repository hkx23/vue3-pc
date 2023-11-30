export default [
  {
    path: '/exceptionHandling',
    name: 'exceptionHandling',
    component: () => import('../../pages/exceptionHandling/index.vue'),
    meta: {
      title: {
        'zh-CN': '工序',
        'en-US': 'exceptionHandling',
      },
      orderNo: 0,
    },
  },
];
