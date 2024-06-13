export default [
  {
    path: '/processParam',
    name: 'processParam',
    component: () => import('../../pages/processParam/index.vue'),
    meta: {
      title: {
        'zh-CN': '工艺参数卡',
        'en-US': 'processParam',
      },
      orderNo: 0,
    },
  },
];
