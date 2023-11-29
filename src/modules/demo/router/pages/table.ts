export default [
  {
    path: '/table',
    name: 'table',
    component: () => import('../../pages/table/index.vue'),
    meta: {
      title: {
        'zh-CN': '表格组件例子',
        'en-US': 'table example',
      },
    },
  },
];
