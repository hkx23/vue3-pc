export default [
  {
    path: '/businessExample',
    name: 'businessExample',
    component: () => import('@/modules/demo/pages/componentExample/index.vue'),
    meta: {
      title: {
        zh_CN: '业务选择组件例子',
        en_US: 'bussiness example',
      },
    },
  },
];
