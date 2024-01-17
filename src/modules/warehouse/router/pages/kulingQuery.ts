export default [
  {
    path: '/kulingQuery',
    name: 'kulingQuery',
    component: () => import('../../pages/kulingQuery/index.vue'),
    meta: {
      title: {
        'zh-CN': '库龄查询',
        'en-US': 'kulingQuery',
      },
      orderNo: 0,
    },
  },
];
