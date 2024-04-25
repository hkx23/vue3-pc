export default [
  {
    path: '/conferenceIndex',
    name: 'conferenceIndex',
    component: () => import('../../pages/conferenceIndex/index.vue'),
    meta: {
      title: {
        zh_CN: '会议指标管理',
        en_US: 'conferenceIndex',
      },
      orderNo: 0,
    },
  },
];
