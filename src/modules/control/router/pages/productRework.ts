export default [
  {
    path: '/productRework',
    name: 'productRework',
    component: () => import('../../pages/productRework/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品返工',
        'en-US': 'productRework',
      },
      orderNo: 0,
    },
  },
];
