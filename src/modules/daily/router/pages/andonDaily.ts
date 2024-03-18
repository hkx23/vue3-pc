export default [
  {
    path: '/andonDaily',
    name: 'AndonDaily',
    component: () => import('../../pages/andonDaily/index.vue'),
    meta: {
      title: {
        zh_CN: '安灯日报表',
        en_US: 'andonDaily',
      },
      orderNo: 0,
    },
  },
];
