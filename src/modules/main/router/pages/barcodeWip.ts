export default [
  {
    path: '/barcodeWip',
    name: 'barcodeWip',
    component: () => import('../../pages/barcodeWip/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品标签管理',
        'en-US': 'barcodeWip',
      },
      orderNo: 0,
    },
  },
];
