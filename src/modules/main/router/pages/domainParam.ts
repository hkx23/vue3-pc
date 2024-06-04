export default [
  {
    path: '/domainParam',
    name: 'domainParam',
    component: () => import('../../pages/domainParam/index.vue'),
    meta: {
      title: {
        'zh-CN': '配置化功能',
        'en-US': 'domainParam',
      },
      orderNo: 0,
    },
  },
];
