export default [
  {
    path: '/craftRoute',
    name: 'craftRoute',
    component: () => import('../../pages/craftRoute/index.vue'),
    meta: {
      title: {
        'zh-CN': '工艺路线',
        'en-US': 'Craft Route',
      },
      orderNo: 0,
    },
  },
];
