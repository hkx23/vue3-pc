export default [
  {
    path: '/sparePartTransfer',
    name: 'sparePartTransfer',
    component: () => import('../../pages/sparePartTransfer/index.vue'),
    meta: {
      title: {
        'zh-CN': '备品备件出入库',
        'en-US': 'sparePartTransfer',
      },
      orderNo: 0,
    },
  },
];
