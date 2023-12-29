export default [
  {
    path: '/productRepairReport',
    name: 'productRepairReport',
    component: () => import('../../pages/productRepairReport/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品维修报表',
        'en-US': 'productRepairReport',
      },
      orderNo: 0,
    },
  },
];
