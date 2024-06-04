export default [
  {
    path: '/restfulTool',
    name: 'restfulTool',
    component: () => import('../../pages/restfulTool/index.vue'),
    meta: {
      title: {
        'zh-CN': 'restful工具管理',
        'en-US': 'restful tool manage',
      },
      orderNo: 0,
    },
  },
];
