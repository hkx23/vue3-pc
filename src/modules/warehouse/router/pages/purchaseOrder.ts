export default [
  {
    path: '/purchaseOrder',
    name: 'purchaseOrder',
    component: () => import('../../pages/purchaseOrder/index.vue'),
    meta: {
      title: {
        'zh-CN': '采购订单查询',
        'en-US': 'purchaseOrder',
      },
      orderNo: 0,
    },
  },
];
