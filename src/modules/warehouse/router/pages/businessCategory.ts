export default [
  {
    path: '/businessCategory',
    name: 'businessCategory',
    component: () => import('../../pages/businessCategory/index.vue'),
    meta: {
      title: {
        'zh-CN': '仓库业务类型',
        'en-US': 'businessCategory',
      },
      orderNo: 0,
    },
  },
];
