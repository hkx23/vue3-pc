export default [
  {
    path: '/mitemcategory',
    name: 'mitemcategory',
    component: () => import('../../pages/mitemCategory/index.vue'),
    meta: {
      title: {
        zh_CN: '物料分类',
        en_US: 'mitemcategory',
      },
      orderNo: 0,
    },
  },
];
