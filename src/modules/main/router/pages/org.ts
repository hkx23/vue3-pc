export default [
  {
    path: '/org',
    name: 'org',
    component: () => import('../../pages/org/index.vue'),
    meta: {
      title: {
        zh_CN: '生产组织架构',
        en_US: 'Production Organization Structure',
      },
      orderNo: 0,
    },
  },
];
