export default [
  {
    path: '/TeamScheduling',
    name: 'TeamScheduling',
    component: () => import('../../pages/TeamScheduling/index.vue'),
    meta: {
      title: {
        'zh-CN': '班组排班',
        'en-US': 'TeamScheduling',
      },
      orderNo: 0,
    },
  },
];
