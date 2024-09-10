export default [
  {
    path: '/mouldRepairBill',
    name: 'mouldRepairBill',
    component: () => import('../../pages/mouldRepairBill/index.vue'),
    meta: {
      title: {
        'zh-CN': '模具维修单据',
        'en-US': 'mouldRepairBill',
      },
      orderNo: 0,
    },
  },
];
