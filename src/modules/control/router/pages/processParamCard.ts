export default [
  {
    path: '/processParamCard',
    name: 'processParamCard',
    component: () => import('../../pages/processParamCard/index.vue'),
    meta: {
      title: {
        'zh-CN': '工艺卡管理',
        'en-US': 'processParamCard',
      },
      orderNo: 0,
    },
  },
];
