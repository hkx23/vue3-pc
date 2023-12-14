export default [
  {
    path: '/label',
    name: 'label',
    component: () => import('../../pages/label/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品标签管理',
        'en-US': 'label',
      },
      orderNo: 0,
    },
  },
];
