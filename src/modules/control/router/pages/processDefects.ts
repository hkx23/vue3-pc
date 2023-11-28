export default [
  {
    path: '/processdefects',
    name: 'processdefects',
    component: () => import('../../pages/processDefects/index.vue'),
    meta: {
      title: {
        'zh-CN': '工序缺陷',
        'en-US': 'processdefects',
      },
      orderNo: 0,
    },
  },
];
