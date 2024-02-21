export default [
  {
    path: '/importManage',
    name: 'importManage',
    component: () => import('../../pages/importManage/index.vue'),
    meta: {
      title: {
        'zh-CN': '导入配置管理',
        'en-US': 'importManage',
      },
      orderNo: 0,
    },
  },
];
