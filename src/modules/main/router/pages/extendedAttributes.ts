export default [
  {
    path: '/extendedAttributes',
    name: 'extendedAttributes',
    component: () => import('../../pages/extendedAttributes/index.vue'),
    meta: {
      title: {
        'zh-CN': '扩展属性',
        'en-US': 'extendedAttributes',
      },
      orderNo: 0,
    },
  },
];
