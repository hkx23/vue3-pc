export default [
  {
    path: '/paramGroup',
    name: 'paramGroup',
    component: () => import('../../pages/paramGroup/index.vue'),
    meta: {
      title: {
        'zh-CN': '系统字典',
        'en-US': 'paramGroup',
      },
      orderNo: 0,
    },
  },
];
