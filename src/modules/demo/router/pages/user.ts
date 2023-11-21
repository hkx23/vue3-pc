export default [
  {
    path: '/user',
    name: 'user',
    component: () => import('../../pages/user/index.vue'),
    meta: {
      title: {
        zh_CN: '用户',
        en_US: 'User',
      },
      orderNo: 0,
    },
  },
];
