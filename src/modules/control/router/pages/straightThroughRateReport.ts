export default [
  {
    path: '/straightThroughRateReport',
    name: 'straightThroughRateReport',
    component: () => import('../../pages/straightThroughRateReport/index.vue'),
    meta: {
      title: {
        'zh-CN': '直通率报表',
        'en-US': 'straightThroughRateReport',
      },
      orderNo: 0,
    },
  },
];
