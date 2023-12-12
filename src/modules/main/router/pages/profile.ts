export default [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../../pages/profile/index.vue'),
    meta: {
      title: {
        'zh-CN': '功能配置项',
        'en-US': 'profile',
      },
      orderNo: 0,
    },
  },
];
