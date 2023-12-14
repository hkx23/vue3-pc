export default [
  {
    path: '/businessListExample',
    name: 'businessListExample',
    component: () => import('../../pages/businessListExample/index.vue'),
    meta: {
      title: {
        'zh-CN': '业务选择组件例子',
        'en-US': 'bussiness example',
      },
    },
  },
];
