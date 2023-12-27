export default [
  {
    path: '/labelManage',
    name: 'labelManage',
    component: () => import('../../pages/labelManage/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品标签管理',
        'en-US': 'labelManage',
      },
      orderNo: 0,
    },
  },
];
