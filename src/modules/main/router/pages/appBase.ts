export default [
  {
    path: '/appBase',
    name: 'appBase',
    component: () => import('../../pages/appBase/index.vue'),
    meta: {
      title: {
        'zh-CN': 'App底座管理',
        'en-US': 'AppBase',
      },
      orderNo: 0,
    },
  },
];
