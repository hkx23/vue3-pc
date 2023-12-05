export default [
  {
    path: '/barcodeRule',
    name: 'barcodeRule',
    component: () => import('../../pages/barcodeRule/index.vue'),
    meta: {
      title: {
        'zh-CN': '条码生成规则',
        'en-US': 'barcodeRule',
      },
      orderNo: 0,
    },
  },
];
