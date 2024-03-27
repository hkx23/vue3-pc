export default [
  {
    path: '/workCalenar',
    name: 'WorkCalenar',
    component: () => import('../../pages/workCalenar/index.vue'),
    meta: {
      title: {
        'zh-CN': '工作日历',
        'en-US': 'workCalenar',
      },
      orderNo: 0,
    },
  },
];
