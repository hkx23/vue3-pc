export default [
  {
    path: '/baggage',
    name: 'baggage',
    component: () => import('../../pages/baggage/index.vue'),
    meta: {
      title: {
        'zh-CN': '箱包关系报表',
        'en-US': 'baggage',
      },
      orderNo: 0,
    },
  },
];
