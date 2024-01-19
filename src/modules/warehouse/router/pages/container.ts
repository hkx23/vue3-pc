export default [
  {
    path: '/container',
    name: 'container',
    component: () => import('../../pages/container/index.vue'),
    meta: {
      title: {
        'zh-CN': '容器',
        'en-US': 'location',
      },
      orderNo: 0,
    },
  },
];
