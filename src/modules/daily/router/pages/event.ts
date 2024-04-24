export default [
  {
    path: '/event',
    name: 'event',
    component: () => import('../../pages/event/index.vue'),
    meta: {
      title: {
        zh_CN: '事件管理',
        en_US: 'event',
      },
      orderNo: 0,
    },
  },
];
