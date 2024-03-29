export default [
  {
    path: '/assetType',
    name: 'assetType',
    component: () => import('../../pages/assetType/index.vue'),
    meta: {
      title: {
        zh_CN: '资产类型',
        en_US: 'assetType',
      },
      orderNo: 0,
    },
  },
];
