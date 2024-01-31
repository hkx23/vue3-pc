export default [
  {
    path: '/integratedConsole',
    name: 'integratedConsole',
    component: () => import('../../pages/integratedConsole/index.vue'),
    meta: {
      title: {
        'zh-CN': '集成控制台',
        'en-US': 'integratedConsole',
      },
      orderNo: 0,
    },
  },
];
