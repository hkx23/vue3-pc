export default [
  {
    path: '/pqcInspectPatrol',
    name: 'pqcInspectPatrol',
    component: () => import('../../pages/pqcInspectPatrol/index.vue'),
    meta: {
      title: {
        'zh-CN': '巡检查询',
        'en-US': 'pqcInspectPatrol',
      },
      orderNo: 0,
    },
  },
];
