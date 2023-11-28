export default [
  {
    path: '/org',
    name: 'org',
    component: () => import('../../pages/org/index.vue'),
    meta: {
      title: {
        'zh-CN': '生产组织架构',
        'en-US': 'Production Organization Structure',
      },
      orderNo: 0,
    },
  },
];
