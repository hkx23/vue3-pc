export default [
  {
    path: '/conferenceTemplate',
    name: 'conferenceTemplate',
    component: () => import('../../pages/conferenceTemplate/index.vue'),
    meta: {
      title: {
        zh_CN: '会议模板配置',
        en_US: 'conferenceTemplate',
      },
      orderNo: 0,
    },
  },
];
