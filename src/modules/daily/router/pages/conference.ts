export default [
  {
    path: '/conference',
    name: 'conference',
    component: () => import('../../pages/conference/index.vue'),
    meta: {
      title: {
        zh_CN: '会议配置',
        en_US: 'conference',
      },
      orderNo: 0,
    },
  },
];
