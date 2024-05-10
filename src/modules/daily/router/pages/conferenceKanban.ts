export default [
  {
    path: '/conferenceKanban',
    name: 'conferenceKanban',
    component: () => import('../../pages/conferenceKanban/index.vue'),
    meta: {
      title: {
        zh_CN: '会议看板',
        en_US: 'conferenceKanban',
      },
      orderNo: 0,
    },
  },
];
