export default [
  {
    path: '/wipReport',
    name: 'wipReport',
    component: () => import('../../pages/wipReport/index.vue'),
    meta: {
      title: {
        'zh-CN': 'WIP报表',
        'en-US': 'wipReport',
      },
      orderNo: 0,
    },
  },
];
