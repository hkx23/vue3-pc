export default [
  {
    path: '/checkItem',
    name: 'CheckItem',
    component: () => import('../../pages/checkItem/index.vue'),
    meta: {
      title: {
        zh_CN: '点检项目',
        en_US: 'checkItem',
      },
      orderNo: 0,
    },
  },
];
