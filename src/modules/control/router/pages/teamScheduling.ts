export default [
  {
    path: '/teamScheduling',
    name: 'teamScheduling',
    component: () => import('../../pages/teamScheduling/index.vue'),
    meta: {
      title: {
        'zh-CN': '班组排班',
        'en-US': 'teamScheduling',
      },
      orderNo: 0,
    },
  },
];
