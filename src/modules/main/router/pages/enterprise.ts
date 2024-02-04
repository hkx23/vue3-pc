export default [
  {
    path: '/enterprise',
    name: 'enterprise',
    component: () => import('../../pages/enterprise/index.vue'),
    meta: {
      title: {
        'zh-CN': '企业信息',
        'en-US': 'enterprise',
      },
      orderNo: 0,
    },
  },
];
