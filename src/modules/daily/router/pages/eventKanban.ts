export default [
  {
    path: '/eventKanban',
    name: 'eventKanban',
    component: () => import('../../pages/eventKanban/index.vue'),
    meta: {
      title: {
        zh_CN: '事件看板',
        en_US: 'eventKanban',
      },
      orderNo: 0,
    },
  },
];
