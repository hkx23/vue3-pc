export default [
  {
    path: '/workcenter',
    name: 'workcenter',
    component: () => import('../../pages/workCenter/index.vue'),
    meta: {
      title: {
        'zh-CN': '工作中心',
        'en-US': 'workCenter',
      },
      orderNo: 0,
    },
  },
];
