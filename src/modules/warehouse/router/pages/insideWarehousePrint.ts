export default [
  {
    path: '/insideWarehousePrint',
    name: 'insideWarehousePrint',
    component: () => import('../../pages/insideWarehousePrint/index.vue'),
    meta: {
      title: {
        'zh-CN': '库内标签打印',
        'en-US': 'insideWarehousePrint',
      },
      orderNo: 0,
    },
  },
];
