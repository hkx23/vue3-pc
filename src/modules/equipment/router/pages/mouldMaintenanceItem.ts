export default [
  {
    path: '/mouldMaintenanceItem',
    name: 'mouldMaintenanceItem',
    component: () => import('../../pages/mouldMaintenanceItem/index.vue'),
    meta: {
      title: {
        'zh-CN': '模具保养项目',
        'en-US': 'mouldMaintenanceItem',
      },
      orderNo: 0,
    },
  },
];
