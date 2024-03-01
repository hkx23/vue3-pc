export default [
  {
    path: '/inspectGroup',
    name: 'inspectGroup',
    component: () => import('../../pages/inspectGroup/index.vue'),
    meta: {
      title: {
        'zh-CN': '品质检验组',
        'en-US': 'inspectGroup',
      },
      orderNo: 0,
    },
  },
];
