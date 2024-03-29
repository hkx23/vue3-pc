export default [
  {
    path: '/moRelease',
    name: 'moRelease',
    component: () => import('../../pages/moRelease/index.vue'),
    meta: {
      title: {
        zh_CN: '排产下发历史查询',
        en_US: 'moRelease',
      },
      orderNo: 0,
    },
  },
];
