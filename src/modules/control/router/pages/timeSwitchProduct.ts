export default [
  {
    path: '/timeSwitchProduct',
    name: 'TimeSwitchProduct',
    component: () => import('../../pages/timeSwitchProduct/index.vue'),
    meta: {
      title: {
        'zh-CN': '转产换型时间',
        'en-US': 'timeSwitchProduct',
      },
      orderNo: 0,
    },
  },
];
