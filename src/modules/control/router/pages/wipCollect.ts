export default [
  {
    path: '/wipCollect',
    name: 'wipCollect',
    component: () => import('../../pages/wipCollect/index.vue'),
    meta: {
      title: {
        'zh-CN': '过站采集',
        'en-US': 'wipCollect',
      },
      orderNo: 0,
    },
  },
];
