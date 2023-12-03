export default [
  {
    path: '/craftRoute',
    name: 'craftRoute',
    component: () => import('../../pages/craftRoute/index.vue'),
    meta: {
      title: {
        zh_CN: '工艺路线',
        en_US: 'Craft Route',
      },
      orderNo: 0,
    },
  },
];
