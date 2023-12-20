export default [
  {
    path: '/labelBarcode',
    name: 'labelBarcode',
    component: () => import('../../pages/labelBarcode/index.vue'),
    meta: {
      title: {
        'zh-CN': '标签条码管理',
        'en-US': 'labelBarcode',
      },
      orderNo: 0,
    },
  },
];
