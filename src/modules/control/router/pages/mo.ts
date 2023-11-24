export default [
  {
    path: '/mo',
    name: 'mo',
    component: () => import('../../pages/mo/index.vue'),
    meta: {
      title: {
        zh_CN: '工单管理',
        en_US: 'mo',
      },
      orderNo: 0,
    },
  },
];
