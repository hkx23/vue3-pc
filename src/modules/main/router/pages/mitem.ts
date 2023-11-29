export default [
  {
    path: '/mitem',
    name: 'mitem',
    component: () => import('../../pages/mitem/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料',
        'en-US': 'Mitem',
      },
      orderNo: 0,
    },
  },
];
