export default [
  {
    path: '/onhandQtyLabelPrint',
    name: 'onhandQtyLabelPrint',
    component: () => import('../../pages/onhandQtyLabelPrint/index.vue'),
    meta: {
      title: {
        'zh-CN': '库存标签打印',
        'en-US': 'onhandQtyLabelPrint',
      },
      orderNo: 0,
    },
  },
];
