export default [
  {
    path: '/devent',
    name: 'devent',
    component: () => import('../../pages/devent/index.vue'),
    meta: {
      title: {
        zh_CN: '事件管理',
        en_US: 'devent',
      },
      orderNo: 0,
    },
  },
];
