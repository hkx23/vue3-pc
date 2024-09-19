export default [
  {
    path: '/mouldInspectBill',
    name: 'mouldInspectBill',
    component: () => import('../../pages/mouldInspectBill/index.vue'),
    meta: {
      title: {
        zh_CN: '模具点检单据',
        en_US: 'mouldInspectBill',
      },
      orderNo: 0,
    },
  },
];
