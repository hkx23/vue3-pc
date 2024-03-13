export default [
  {
    path: '/org',
    name: 'Org',
    component: () => import('../../pages/org/index.vue'),
    meta: {
      title: {
        'zh-CN': '组织架构',
        'en-US': 'Organization Structure',
      },
      orderNo: 0,
    },
  },
];
