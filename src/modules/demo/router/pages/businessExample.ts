export default [
  {
    path: '/businessExample',
    name: 'businessExample',
    component: () => import('../../pages/businessExample/index.vue'),
    meta: {
      title: {
        'zh-CN': '业务选择组件例子',
        'en-US': 'bussiness example',
      },
    },
  },
];
