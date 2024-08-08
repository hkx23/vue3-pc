export default [
  {
    path: '/mouldMaintenancePlan',
    name: 'mouldMaintenancePlan',
    component: () => import('../../pages/mouldMaintenancePlan/index.vue'),
    meta: {
      title: {
        'zh-CN': '模具保养计划',
        'en-US': 'mouldMaintenancePlan',
      },
      orderNo: 0,
    },
  },
];
