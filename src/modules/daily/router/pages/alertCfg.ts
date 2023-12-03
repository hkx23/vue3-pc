export default [
  {
    path: '/alertCfg',
    name: 'alertCfg',
    component: () => import('../../pages/alertCfg/index.vue'),
    meta: {
      title: {
        zh_CN: '预警机制',
        en_US: 'alertCfg',
      },
      orderNo: 0,
    },
  },
];
