export default [
  {
    path: '/onhandQty',
    name: 'onhandQty',
    component: () => import('../../pages/onhandQty/index.vue'),
    meta: {
      title: {
        'zh-CN': '库存现有量报表',
        'en-US': 'onhandQty',
      },
      orderNo: 0,
    },
  },
];
