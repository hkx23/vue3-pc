export default [
  {
    path: '/conferenceLayout',
    name: 'conferenceLayout',
    component: () => import('../../pages/conferenceLayout/index.vue'),
    meta: {
      title: {
        zh_CN: '会议布局配置',
        en_US: 'conferenceLayout',
      },
      orderNo: 0,
    },
  },
];
