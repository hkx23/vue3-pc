export default [
  {
    path: '/supportGroup',
    name: 'supportGroup',
    component: () => import('../../pages/supportGroup/index.vue'),
    meta: {
      title: {
        'zh-CN': '处理组',
        'en-US': 'supportGroup',
      },
      orderNo: 0,
    },
  },
];
