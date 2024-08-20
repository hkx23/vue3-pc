export default [
  {
    path: '/mouldMaintenanceBill',
    name: 'mouldMaintenanceBill',
    component: () => import('../../pages/mouldMaintenanceBill/index.vue'),
    meta: {
      title: {
        'zh-CN': '模具保养单据',
        'en-US': 'mouldMaintenanceBill',
      },
      orderNo: 0,
    },
  },
];
