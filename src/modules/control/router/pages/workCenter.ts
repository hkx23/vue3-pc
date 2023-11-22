export default [
  {
    path: '/workcenter',
    name: 'workcenter',
    component: () => import('../../pages/workCenter/index.vue'),
    meta: {
      title: {
        zh_CN: '工作中心',
        en_US: 'workCenter',
      },
      orderNo: 0,
    },
  },
];
