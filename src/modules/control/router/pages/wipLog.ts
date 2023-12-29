export default [
  {
    path: '/wipLog',
    name: 'wipLog',
    component: () => import('../../pages/wipLog/index.vue'),
    meta: {
      title: {
        'zh-CN': '过站记录报表',
        'en-US': 'wipLog',
      },
      orderNo: 0,
    },
  },
];
