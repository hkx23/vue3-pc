export default [
  {
    path: '/assetLedger',
    name: 'assetLedger',
    component: () => import('../../pages/assetLedger/index.vue'),
    meta: {
      title: {
        zh_CN: '资产台账',
        en_US: 'assetLedger',
      },
      orderNo: 0,
    },
  },
];
