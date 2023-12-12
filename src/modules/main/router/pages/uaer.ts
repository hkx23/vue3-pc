export default [
  {
    path: '/user',
    name: 'user',
    component: () => import('../../pages/user/index.vue'),
    meta: {
      title: {
        'zh-CN': '用户',
        'en-US': 'user',
      },
      orderNo: 0,
    },
  },
];
