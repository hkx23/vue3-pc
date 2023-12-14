export default [
  {
    path: '/barcodePkg',
    name: 'barcodePkg',
    component: () => import('../../pages/barcodePkg/index.vue'),
    meta: {
      title: {
        'zh-CN': '包装标签管理',
        'en-US': 'barcodePkg',
      },
      orderNo: 0,
    },
  },
];
