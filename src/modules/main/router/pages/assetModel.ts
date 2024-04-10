export default [
  {
    path: '/assetModel',
    name: 'assetModel',
    component: () => import('../../pages/assetModel/index.vue'),
    meta: {
      title: {
        zh_CN: '资产型号',
        en_US: 'assetModel',
      },
      orderNo: 0,
    },
  },
];
