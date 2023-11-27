export default [
  {
    path: '/processdefects',
    name: 'processdefects',
    component: () => import('../../pages/processDefects/index.vue'),
    meta: {
      title: {
        zh_CN: '工作中心',
        en_US: 'processdefects',
      },
      orderNo: 0,
    },
  },
];
