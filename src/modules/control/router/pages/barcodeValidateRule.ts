export default [
  {
    path: '/barcodeValidateRule',
    name: 'barcodeValidateRule',
    component: () => import('../../pages/barcodeValidateRule/index.vue'),
    meta: {
      title: {
        'zh-CN': '条码验证规则',
        'en-US': 'barcodeValidateRule',
      },
      orderNo: 0,
    },
  },
];
