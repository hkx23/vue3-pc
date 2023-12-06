export default [
  {
    path: '/warehouse',
    name: 'warehouse',
    component: () => import('../../pages/warehouse/index.vue'),
    meta: {
      title: {
        'zh-CN': '仓库',
        'en-US': 'Warehouse',
      },
      orderNo: 0,
    },
  },
];
