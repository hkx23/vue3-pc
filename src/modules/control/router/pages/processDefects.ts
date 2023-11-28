export default [
  {
    path: '/processdefects',
    name: 'processdefects',
    component: () => import('../../pages/processDefects/index.vue'),
    meta: {
      title: {
        zh_CN: '工序缺陷',
        en_US: 'processdefects',
      },
      orderNo: 0,
    },
  },
];
