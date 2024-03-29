export default [
  {
    path: '/assetBrand',
    name: 'assetBrand',
    component: () => import('../../pages/assetBrand/index.vue'),
    meta: {
      title: {
        zh_CN: '资产品牌',
        en_US: 'assetBrand',
      },
      orderNo: 0,
    },
  },
];
