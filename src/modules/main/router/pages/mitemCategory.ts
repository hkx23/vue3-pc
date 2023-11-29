export default [
  {
    path: '/mitemcategory',
    name: 'mitemcategory',
    component: () => import('../../pages/mitemCategory/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料分类',
        'en-US': 'Mitem Category',
      },
      orderNo: 0,
    },
  },
];
