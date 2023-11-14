export default [
  {
    path: '/orgLevel',
    name: 'orgLevel',
    component: () => import('../../pages/orgLevel/index.vue'),
    meta: {
      title: {
        zh_CN: '组织层级',
        en_US: 'Organizational Level',
      },
      orderNo: 0,
    },
  },
];
