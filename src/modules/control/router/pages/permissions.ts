export default [
  {
    path: '/permissions',
    name: 'permissions',
    component: () => import('../../pages/permissions/index.vue'),
    meta: {
      title: {
        zh_CN: '工作中心',
        en_US: 'permissions',
      },
      orderNo: 0,
    },
  },
];
